import { useEffect, useRef, useCallback, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { CONFIG, ALL_ENEMIES } from '../game/config.js';
import { computeEnemyHp, computeEnemyAttack, getEnemyCoinReward } from '../game/engine.js';
import { CoinIcon, GemIcon, BoltIcon, HeartIcon, PauseIcon, PlayIcon, SoundIcon, SoundOffIcon, HomeIcon } from './Icons.jsx';

// Emoji map for enemies
const ENEMY_EMOJIS = [
  '🎯','😤','🐦','😠','🟢',  // 0-4
  '🐩','🧗','🥏','🏃','🐒',  // 5-9
  '🤡','📋','🍔','🎯','👨‍🏫', // 10-14
  '💼','📊','👔','🕴️','🤵',   // 15-19
  '🦜','🐒','🐍','🦍','👑',   // 20-24
  '🦀','⚡','🐙','🦈','🐙',   // 25-29
  '👺','🧌','🗡️','🧙','🐲',   // 30-34
  '⚔️','🛡️','⛩️','🏛️','𓂀',  // 35-39
  '🤖','👽','🦾','🏴‍☠️','👾',  // 40-44
  '💀','👻','🧟','😈','🐉',   // 45-49
  '🎨','💃','🎩','🥊','🌟',   // 50-54
  '🔥','💧','🪨','⛈️','🌪️',  // 55-59
  '🦣','⚔️','🎩','⏱️','⌛',   // 60-64
  '🤹','🎪','💪','🦁','🎭',   // 65-69
  '🐐','❄️','🪨','🐺','🏔️',  // 70-74
  '🦂','👻','🐫','🏺','🦁',   // 75-79
  '🏛️','🌋','⚔️','😇','🌀',   // 80-84
  '👾','💻','🦠','🕷️','🖥️',  // 85-89
  '🌑','🌊','🌌','🏛️','🌀',   // 90-94
  '🌑','😈','💀','🙌','🐲',   // 95-99
];

// Audio synthesis (lightweight, no library needed)
class GameAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  getCtx() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }
  playTone(freq, type = 'sine', dur = 0.08, vol = 0.18, start = 0) {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(vol, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.01);
  }
  slap(isCrit, isHeavy, isUlt) {
    if (isUlt)   { this.playTone(90, 'sawtooth', .25, .35); this.playTone(180, 'square', .12, .2, .04); }
    else if (isHeavy) { this.playTone(120, 'sawtooth', .14, .28); this.playTone(240, 'square', .08, .15, .02); }
    else if (isCrit)  { this.playTone(220, 'square', .08, .2); this.playTone(330, 'sine', .06, .12, .02); }
    else { this.playTone(180, 'sine', .06, .15); }
  }
  coin() { this.playTone(880, 'sine', .07, .1); this.playTone(1100, 'sine', .05, .08, .04); }
  win()  { [523,659,784,1047].forEach((f,i)=>this.playTone(f,'sine',.12,.15,i*.1)); }
  lose() { [330,262,196,165].forEach((f,i)=>this.playTone(f,'sawtooth',.15,.15,i*.1)); }
  levelUp() { [523,659,784,880,1047].forEach((f,i)=>this.playTone(f,'sine',.1,.18,i*.08)); }
}

const audio = new GameAudio();

export default function BattleScreen() {
  const { state, dispatch, go, playerStats } = useGame();
  const { save } = state;
  const canvasRef = useRef(null);
  const stageRef  = useRef(null);
  const animRef   = useRef(null);
  const gameRef   = useRef(null);

  const [battleState, setBattleState] = useState({
    phase: 'fight',     // 'boss-intro' | 'fight' | 'win' | 'lose' | 'paused'
    enemyId: save.currentEnemyId,
    isHard: false,
    enemyHp: 0,
    enemyMaxHp: 0,
    playerHp: 0,
    playerMaxHp: 0,
    atkProgress: 0,     // 0-1
    atkInterval: 3.4,
    comboStack: 0,
    killCount: 0,
    frenzyCharge: 0,    // 0-1
    frenzyActive: false,
    frenzyTimer: 0,
    activeEffects: [],  // [{kind, label, timer}]
    dmgNumbers: [],     // [{id,x,y,val,type}]
    lastDmg: 0,
    lastActualDps: 0,
    bossEnraged: false,
    secondWind: false,
  });

  const bs = battleState;
  const setBs = setBattleState;

  const enemy = ALL_ENEMIES[bs.enemyId] || ALL_ENEMIES[0];
  const isBoss = !!enemy.elite;
  const bossSpec = isBoss ? CONFIG.bossSpecials[bs.enemyId] : null;

  // ── Initialize fight ──
  const initFight = useCallback((enemyId, isHard = false) => {
    const maxHp = playerStats.maxHp;
    let enemyHp = computeEnemyHp(enemyId);
    if (isHard) enemyHp = Math.ceil(enemyHp * CONFIG.hard.hpMult);
    const { interval, atkDmg } = computeEnemyAttack(enemyId);
    const atkInt = isHard ? interval * CONFIG.hard.intervalMult : interval;

    audio.enabled = save.sfx;

    setBs({
      phase: isBoss ? 'boss-intro' : 'fight',
      enemyId,
      isHard,
      enemyHp,
      enemyMaxHp: enemyHp,
      playerHp: maxHp,
      playerMaxHp: maxHp,
      atkProgress: 0,
      atkInterval: atkInt,
      atkDmg: isHard ? Math.ceil(atkDmg * CONFIG.hard.atkMult) : atkDmg,
      comboStack: 0,
      killCount: 0,
      frenzyCharge: 0,
      frenzyActive: false,
      frenzyTimer: 0,
      activeEffects: [],
      dmgNumbers: [],
      lastDmg: 0,
      lastActualDps: 0,
      bossEnraged: false,
      secondWind: save.playerLevel >= 8,
      slapCount: 0,
      ultTimer: 0,
      barrageCount: 0,
      regenTimer: 0,
      vampCount: 0,
      combatSecs: 0,
    });
  }, [playerStats, save]);

  // Initialize when enemy changes
  useEffect(() => {
    initFight(save.currentEnemyId, false);
  }, []);

  // ── Game loop (requestAnimationFrame) ──
  useEffect(() => {
    let last = performance.now();
    let state = battleState;
    let accDmg = 0;
    let accTime = 0;

    function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      setBs(prev => {
        if (prev.phase !== 'fight') return prev;
        let s = { ...prev };

        // Enemy attack timer
        s.atkProgress = s.atkProgress + dt / s.atkInterval;

        // Enrage check
        const hpFrac = s.enemyHp / s.enemyMaxHp;
        if (isBoss && !s.bossEnraged && hpFrac < CONFIG.boss.enrageBelow) {
          s.bossEnraged = true;
          s.atkInterval = Math.max(s.atkInterval * CONFIG.boss.enrageIntervalMult, 0.8);
        }

        // Enemy attacks
        if (s.atkProgress >= 1) {
          s.atkProgress = 0;
          let dmg = s.atkDmg;

          // Apply effects
          const shieldEffect = s.activeEffects.find(e => e.kind === 'shield');
          if (shieldEffect && shieldEffect.hitsLeft > 0) {
            dmg = Math.ceil(dmg * 0.5);
            shieldEffect.hitsLeft--;
            if (shieldEffect.hitsLeft <= 0) {
              s.activeEffects = s.activeEffects.filter(e => e.kind !== 'shield');
            }
          }

          // Thick Skin (lv4)
          if (save.playerLevel >= 4) dmg = Math.max(1, Math.floor(dmg * CONFIG.abilityFx.thickSkin));

          s.playerHp = Math.max(0, s.playerHp - dmg);

          // Second Wind
          if (s.playerHp === 0 && s.secondWind) {
            s.playerHp = Math.ceil(s.playerMaxHp * CONFIG.abilityFx.secondWindFrac);
            s.secondWind = false;
          }

          // Boss special
          if (isBoss && bossSpec && Math.random() < 0.35) {
            const spec = bossSpec;
            const existing = s.activeEffects.find(e => e.kind === spec.kind);
            if (!existing) {
              const eff = { kind: spec.kind, label: spec.name, timer: spec.dur || 6 };
              if (spec.kind === 'shield') eff.hitsLeft = spec.hits || 5;
              s.activeEffects = [...s.activeEffects, eff];
            }
          }

          if (s.playerHp <= 0) {
            s.phase = 'lose';
            audio.lose();
          }
        }

        // Tick effects
        s.activeEffects = s.activeEffects
          .map(e => ({ ...e, timer: e.timer - dt }))
          .filter(e => e.timer > 0 || e.hitsLeft > 0);

        // Frenzy timer
        if (s.frenzyActive) {
          s.frenzyTimer -= dt;
          if (s.frenzyTimer <= 0) { s.frenzyActive = false; s.frenzyTimer = 0; }
        }

        // Regen (Unstoppable skill)
        if (save.skills.unstoppable) {
          s.regenTimer = (s.regenTimer || 0) + dt;
          if (s.regenTimer >= 1) {
            s.regenTimer -= 1;
            s.playerHp = Math.min(s.playerMaxHp, s.playerHp + CONFIG.skillFx.regen);
          }
        }

        // Ultimate timer
        if (save.skills.ultimateSlap) {
          s.ultTimer = (s.ultTimer || 0) + dt;
        }

        return s;
      });

      animRef.current = requestAnimationFrame(loop);
    }

    if (battleState.phase === 'fight') {
      animRef.current = requestAnimationFrame(loop);
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [battleState.phase, isBoss]);

  // ── Handle slap (click/tap on stage) ──
  const handleSlap = useCallback((e) => {
    setBs(prev => {
      if (prev.phase !== 'fight') return prev;

      const stunEffect = prev.activeEffects.find(e2 => e2.kind === 'stun');
      const lockEffect = prev.activeEffects.find(e2 => e2.kind === 'lock');
      if (stunEffect) return prev; // stunned, no slap

      let s = { ...prev };

      // Accuracy check
      let acc = playerStats.accuracy;
      const accEffect = s.activeEffects.find(ef => ef.kind === 'acc');
      if (accEffect) acc *= (1 - (accEffect.amt || 0.3));
      if (Math.random() > acc) {
        // Miss
        return s;
      }

      // Determine damage type
      let dmg = playerStats.dmg;
      let isUlt = false, isHeavy = false, isCrit = false;

      // Ultimate
      if (save.skills.ultimateSlap && s.ultTimer >= CONFIG.skillFx.ultEvery) {
        isUlt = true;
        dmg *= CONFIG.skillFx.ultMult;
        s.ultTimer = 0;
      }
      // Heavy
      else if (save.skills.heavySlap && Math.random() < CONFIG.skillFx.heavyChance) {
        isHeavy = true;
        dmg *= CONFIG.skillFx.heavyMult;
      }
      // Crit
      else if (Math.random() < playerStats.critChance) {
        isCrit = true;
        dmg *= playerStats.critMult;
      }

      // Frenzy bonus
      if (s.frenzyActive) { dmg *= 1.5; }

      // Slow effect
      const slowEffect = s.activeEffects.find(ef => ef.kind === 'slow');
      // (slow affects enemy attack speed actually, handled above)

      // Combo
      s.comboStack = Math.min(playerStats.comboBaseStacks, (s.comboStack || 0) + 1);
      dmg *= 1 + s.comboStack * playerStats.comboPerStack;

      // Boss damage
      if (isBoss) dmg *= playerStats.bossDmgMult;

      // Luck
      const luck = save.attrs.luck * CONFIG.fx.luckPerLevel;
      if (Math.random() < luck) { dmg *= CONFIG.fx.luckDmgMult; }

      dmg = Math.max(1, Math.round(dmg));

      s.enemyHp = Math.max(0, s.enemyHp - dmg);
      s.lastDmg = dmg;
      s.slapCount = (s.slapCount || 0) + 1;

      // Vampire Slap (lv6)
      if (save.playerLevel >= 6) {
        s.vampCount = (s.vampCount || 0) + 1;
        if (s.vampCount >= CONFIG.abilityFx.vampEvery) {
          s.playerHp = Math.min(s.playerMaxHp, s.playerHp + CONFIG.abilityFx.vampHeal);
          s.vampCount = 0;
        }
      }

      // Barrage
      if (save.skills.rapidBarrage) {
        s.barrageCount = (s.barrageCount || 0) + 1;
        if (s.barrageCount >= CONFIG.skillFx.barrageEvery) {
          s.barrageCount = 0;
          const barrageDmg = Math.round(playerStats.dmg * CONFIG.skillFx.barrageMult * CONFIG.skillFx.barrageHits);
          s.enemyHp = Math.max(0, s.enemyHp - barrageDmg);
        }
      }

      // Frenzy charge
      if (save.skills.frenzy && !s.frenzyActive) {
        s.frenzyCharge = Math.min(1, s.frenzyCharge + 0.04);
      }

      audio.slap(isCrit, isHeavy, isUlt);

      // Win check
      if (s.enemyHp <= 0) {
        const coinMult = s.isHard ? CONFIG.hard.coinMult : 1;
        const coins = getEnemyCoinReward(s.enemyId, playerStats.coinMult * coinMult);
        const gemsReward = isBoss ? (s.isHard ? 0 : CONFIG.gems.pairBoss) : 0;
        s.phase = 'win';
        s.wonCoins = coins;
        s.wonGems = gemsReward;
        s.killCount = (s.killCount || 0) + 1;
        audio.win();

        dispatch({ type: 'DEFEAT_ENEMY', id: s.enemyId, hard: s.isHard, coins, gems: gemsReward });
        dispatch({ type: 'UPDATE_STATS', delta: { totalSlaps: prev.slapCount || 0, totalKOs: 1 } });
      }

      return s;
    });
  }, [playerStats, isBoss, save, dispatch]);

  // ── Frenzy trigger ──
  const triggerFrenzy = useCallback(() => {
    setBs(prev => {
      if (prev.frenzyCharge < 1 || prev.frenzyActive) return prev;
      return { ...prev, frenzyActive: true, frenzyTimer: 10, frenzyCharge: 0 };
    });
  }, []);

  // ── Pause ──
  const [paused, setPaused] = useState(false);
  const togglePause = () => {
    setPaused(p => !p);
    setBs(prev => ({ ...prev, phase: prev.phase === 'paused' ? 'fight' : (prev.phase === 'fight' ? 'paused' : prev.phase) }));
  };

  // Fight again
  const fightAgain = () => initFight(bs.enemyId, bs.isHard);
  // Next enemy
  const nextEnemy = () => {
    const nextId = Math.min(99, bs.enemyId + 1);
    initFight(nextId, false);
  };
  // Choose enemy → go to levels
  const chooseEnemy = () => go('levels');

  const hpPct      = bs.enemyMaxHp ? (bs.enemyHp / bs.enemyMaxHp) * 100 : 100;
  const playerPct  = bs.playerMaxHp ? (bs.playerHp / bs.playerMaxHp) * 100 : 100;
  const atkPct     = bs.atkProgress * 100;
  const atkWarn    = bs.atkProgress > 0.75;

  function fmtNum(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
    return Math.round(n).toString();
  }

  return (
    <div className="page" style={{ display:'flex', flexDirection:'column' }}>

      {/* ── Enemy Bar ── */}
      <div style={{ padding: '2px 14px 8px' }}>
        <div style={{ fontFamily:'Bungee,sans-serif', fontSize:20, textAlign:'center', letterSpacing:'.01em' }}>
          {enemy.name}
        </div>
        <div style={{ textAlign:'center', fontSize:11, fontWeight:800, letterSpacing:'.06em', color:'var(--ink-soft)', marginTop:1 }}>
          {isBoss ? <span style={{ color:'var(--accent)' }}>BOSS · </span> : null}
          {bs.isHard ? <span style={{ color:'#d63c30', marginLeft:2, fontWeight:900 }}>HARD MODE</span> : `Enemy #${bs.enemyId + 1}`}
        </div>

        {/* HP Bar */}
        <div id="hpTrack" style={{ marginTop:5, borderColor: isBoss ? '#7e1f18' : undefined, background: isBoss ? '#26090b' : undefined }}>
          <div id="hpFill" style={{
            width: hpPct + '%',
            background: isBoss ? '#a11a12' : bs.isHard ? '#d63c30' : undefined,
          }}/>
          <span id="hpText">{fmtNum(bs.enemyHp)} / {fmtNum(bs.enemyMaxHp)}</span>
        </div>

        {/* ATK Row */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:5 }}>
          <span style={{ fontSize:'9.5px', fontWeight:800, letterSpacing:'.09em', color: atkWarn ? 'var(--accent)' : 'var(--ink-soft)', whiteSpace:'nowrap' }}>ENEMY ATK</span>
          <div style={{ flex:1, height:9, background:'var(--track)', borderRadius:5, overflow:'hidden', border:'1.5px solid rgba(0,0,0,.35)' }}>
            <div style={{ height:'100%', width: atkPct+'%', background: atkWarn ? 'var(--accent)' : '#e08a2e', transition: atkWarn ? 'none' : undefined }}/>
          </div>
          <span style={{ fontSize:11, fontWeight:800, color: atkWarn ? 'var(--accent)' : 'var(--ink-soft)', minWidth:30, textAlign:'right' }}>
            {((1 - bs.atkProgress) * bs.atkInterval).toFixed(1)}s
          </span>
        </div>
      </div>

      {/* ── Stage (tap area) ── */}
      <div
        ref={stageRef}
        style={{
          position:'relative', flex:1, minHeight:170,
          background: enemy.group?.bg ? undefined : '#a8c6d8',
          touchAction:'none', cursor:'pointer', display:'flex',
          flexDirection:'column', alignItems:'center', justifyContent:'center',
          overflow:'hidden',
        }}
        className={enemy.group?.bg || ''}
        onPointerDown={bs.phase === 'fight' ? handleSlap : undefined}
      >
        {/* Enemy emoji */}
        <div style={{
          fontSize: 96, lineHeight:1, userSelect:'none',
          animation: bs.phase === 'fight' ? 'menuBob 1.8s ease-in-out infinite' : 'none',
          filter: bs.enemyHp <= 0 ? 'grayscale(1) brightness(.4)' : undefined,
        }}>
          {ENEMY_EMOJIS[bs.enemyId] || '😤'}
        </div>

        {/* Combo */}
        {bs.comboStack > 1 && bs.phase === 'fight' && (
          <div style={{ position:'absolute', top:8, left:10, fontFamily:'Bungee,sans-serif', fontSize:13, color:'var(--accent)', textShadow:'0 1px 0 rgba(255,255,255,.5)' }}>
            {bs.comboStack}× COMBO
          </div>
        )}

        {/* Boss intro */}
        {bs.phase === 'boss-intro' && (
          <div className="boss-intro" onClick={() => setBs(p => ({ ...p, phase: 'fight' }))}>
            <div className="bi-warn">⚠ BOSS FIGHT ⚠</div>
            <div style={{ fontSize:80, marginTop:16 }}>{ENEMY_EMOJIS[bs.enemyId]}</div>
            <div className="bi-name">{enemy.name}</div>
            {bossSpec && <div style={{ marginTop:7, fontWeight:900, fontSize:'12.5px', letterSpacing:'.04em', color:'#ffb59d', textAlign:'center', padding:'0 18px', lineHeight:1.35 }}>{bossSpec.name}: {bossSpec.blurb}</div>}
            <div className="bi-sub">TAP TO SKIP</div>
          </div>
        )}

        {/* Win overlay */}
        {bs.phase === 'win' && (
          <div className="overlay-backdrop">
            <div className="end-rays"/>
            <div className="overlay-card end-card">
              <div style={{ fontSize:48, marginBottom:4 }}>🏆</div>
              <div className="end-head">KNOCKOUT!</div>
              <div style={{ fontSize:72, margin:'8px 0' }}>{ENEMY_EMOJIS[bs.enemyId]}</div>
              <div className="end-sub">You beat {enemy.name}!</div>
              <div className="end-stats">
                <div className="es"><span>COINS</span><b>+{fmtNum(bs.wonCoins || 0)}</b></div>
                {bs.wonGems ? <div className="es"><span>GEMS</span><b>+{bs.wonGems}</b></div> : null}
                <div className="es"><span>SLAPS</span><b>{fmtNum(bs.slapCount || 0)}</b></div>
              </div>
              <div className="end-btns">
                {bs.enemyId < 99 && !bs.isHard && (
                  <button className="btn-primary" style={{ width:'100%', fontSize:17, padding:'14px 16px' }} onClick={nextEnemy}>NEXT VICTIM →</button>
                )}
                <button className="btn-dark" style={{ width:'100%', justifyContent:'center' }} onClick={fightAgain}>FIGHT AGAIN</button>
                <button className="btn-dark" style={{ width:'100%', justifyContent:'center', background:'transparent', color:'var(--ink)', border:'2px solid var(--chrome-edge)' }} onClick={chooseEnemy}>CHOOSE ENEMY</button>
              </div>
            </div>
          </div>
        )}

        {/* Lose overlay */}
        {bs.phase === 'lose' && (
          <div className="overlay-backdrop" style={{ background:'rgba(30,6,4,.82)' }}>
            <div className="overlay-card">
              <div className="end-head lose">KNOCKED OUT</div>
              <div style={{ fontSize:72, margin:'8px 0', filter:'saturate(.4)' }}>{ENEMY_EMOJIS[bs.enemyId]}</div>
              <div className="end-sub">Defeated by {enemy.name}</div>
              <div className="end-btns">
                <button className="btn-primary" style={{ width:'100%', background:'var(--accent)', color:'#fff', fontSize:16, padding:'13px 16px' }} onClick={fightAgain}>TRY AGAIN</button>
                <button className="btn-dark" style={{ width:'100%', justifyContent:'center', background:'transparent', color:'var(--ink)', border:'2px solid var(--chrome-edge)' }} onClick={chooseEnemy}>CHOOSE ENEMY</button>
              </div>
            </div>
          </div>
        )}

        {/* Paused overlay */}
        {bs.phase === 'paused' && (
          <div className="overlay-backdrop">
            <div className="overlay-card">
              <div style={{ fontFamily:'Bungee,sans-serif', fontSize:28, color:'var(--ink)' }}>PAUSED</div>
              <div className="end-btns" style={{ marginTop:16 }}>
                <button className="btn-primary" style={{ width:'100%', fontSize:16 }} onClick={togglePause}>RESUME</button>
                <button className="btn-dark" style={{ width:'100%', justifyContent:'center' }} onClick={() => go('home')}>HOME</button>
              </div>
            </div>
          </div>
        )}

        {/* Right rail — frenzy */}
        {save.skills.frenzy && (
          <div style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:10, zIndex:6 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
              <button
                className={`rail-circle ${bs.frenzyCharge >= 1 && !bs.frenzyActive ? 'ready' : ''} ${bs.frenzyActive ? '' : ''}`}
                style={{ borderColor: bs.frenzyActive ? '#ff5f1f' : '#b3540a', background: bs.frenzyActive ? 'rgba(120,40,4,.82)' : undefined, animation: bs.frenzyActive ? 'frenzyPulse .3s ease-in-out infinite alternate' : undefined }}
                onClick={triggerFrenzy}
                disabled={bs.frenzyCharge < 1 || bs.frenzyActive}
                aria-label="Trigger FRENZY"
              >
                {/* Ring progress */}
                <div style={{
                  position:'absolute', inset:0, borderRadius:'50%',
                  background: `conic-gradient(#ff7a1e ${bs.frenzyCharge * 100}%, rgba(255,233,189,.18) 0)`,
                  WebkitMask: 'radial-gradient(circle, transparent 57%, #000 58%)',
                  mask: 'radial-gradient(circle, transparent 57%, #000 58%)',
                }}/>
                <span className="rc-ico" style={{ background:'rgba(30,19,8,.88)' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20"><path d="M13 2 4.5 13.5H11L9.8 22 19 10h-6.5L13 2z" fill="#ffb03a"/></svg>
                </span>
              </button>
              <span className="rc-sub">{bs.frenzyActive ? `${bs.frenzyTimer.toFixed(1)}s` : bs.frenzyCharge >= 1 ? 'READY!' : ''}</span>
            </div>
          </div>
        )}

        {/* Active FX chips */}
        {bs.activeEffects.length > 0 && (
          <div style={{ position:'absolute', bottom:8, left:0, right:0, display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center', padding:'5px 10px 1px' }}>
            {bs.activeEffects.map((ef, i) => (
              <span key={i} className={`fx-chip ${ef.kind}`}>{ef.label}</span>
            ))}
          </div>
        )}
      </div>

      {/* ── Player HP bar ── */}
      <div style={{ display:'flex', alignItems:'center', gap:7, padding:'6px 12px 0' }}>
        <HeartIcon size={18}/>
        <div style={{ position:'relative', flex:1, height:16, background:'var(--track)', borderRadius:6, overflow:'hidden', border:'2px solid rgba(0,0,0,.35)' }}>
          <div id="playerFill" className={playerPct < 25 ? 'low' : ''} style={{ width: playerPct+'%' }}/>
          <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:'11.5px', textShadow:'0 1px 2px rgba(0,0,0,.6)' }}>
            {Math.ceil(bs.playerHp)} / {bs.playerMaxHp}
          </span>
        </div>
      </div>

      {/* ── Controls ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, padding:'8px 12px 10px' }}>
        <button className="btn-dark" onClick={togglePause} aria-label={paused ? 'Resume' : 'Pause'}>
          {bs.phase === 'paused' ? <PlayIcon/> : <PauseIcon/>}
          <span>{bs.phase === 'paused' ? 'Resume' : 'Pause'}</span>
        </button>
        <div style={{ fontWeight:800, fontSize:13, color:'var(--ink-soft)', textAlign:'center' }}>KOs {bs.killCount}</div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn-icon" onClick={() => dispatch({ type:'SET_SFX', value:!save.sfx })} aria-label="Toggle sound">
            {save.sfx ? <SoundIcon/> : <SoundOffIcon/>}
          </button>
        </div>
      </div>
    </div>
  );
}
