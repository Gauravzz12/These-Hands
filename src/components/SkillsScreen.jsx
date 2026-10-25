import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { CONFIG } from '../game/config.js';
import { HomeIcon, CoinIcon } from './Icons.jsx';

// Skill node positions for a tree layout
const NODE_POSITIONS = {
  basic:          { x: 50, y: 8  },
  secondHand:     { x: 25, y: 26 },
  strongerHands:  { x: 50, y: 26 },
  quickReflexes:  { x: 75, y: 26 },
  onTarget:       { x: 25, y: 48 },
  criticalSlaps:  { x: 40, y: 48 },
  heavySlap:      { x: 60, y: 48 },
  staminaTraining:{ x: 70, y: 48 },
  frenzy:         { x: 80, y: 48 },
  comboMastery:   { x: 20, y: 70 },
  dualHand:       { x: 33, y: 70 },
  bossHunter:     { x: 55, y: 70 },
  coinMagnet:     { x: 43, y: 70 },
  rapidBarrage:   { x: 28, y: 90 },
  unstoppable:    { x: 60, y: 90 },
  goldenTouch:    { x: 45, y: 90 },
  ultimateSlap:   { x: 65, y: 90 },
};

function fmtCoins(n) {
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
  return Math.round(n).toString();
}

export default function SkillsScreen() {
  const { state, dispatch, go } = useGame();
  const { save } = state;
  const [selected, setSelected] = useState('basic');

  const selectedSkill = CONFIG.skills.find(s => s.id === selected);
  const isOwned   = save.skills[selected];
  const prereqMet = !selectedSkill?.prereq || save.skills[selectedSkill.prereq];
  const canAfford = save.coins >= (selectedSkill?.cost || 0);
  const canBuy    = prereqMet && canAfford && !isOwned && selectedSkill?.cost > 0;

  const getNodeClass = (skill) => {
    if (save.skills[skill.id]) return 'owned';
    const prereqOwned = !skill.prereq || save.skills[skill.prereq];
    if (!prereqOwned) return 'locked';
    if (save.coins >= skill.cost) return 'ready';
    return 'poor';
  };

  // Skill emojis
  const SKILL_ICONS = {
    basic:'🤚', secondHand:'🙌', strongerHands:'💪', quickReflexes:'⚡',
    criticalSlaps:'🎯', heavySlap:'🔨', onTarget:'🎳', staminaTraining:'🛡️',
    frenzy:'🌀', comboMastery:'🔥', dualHand:'✌️', bossHunter:'🏹',
    coinMagnet:'🪙', rapidBarrage:'💥', unstoppable:'🦾', goldenTouch:'✨',
    ultimateSlap:'⚡',
  };

  const owned = CONFIG.skills.filter(s => save.skills[s.id]).length;

  return (
    <div className="page">
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home"><HomeIcon/></button>
        <div>
          <div className="sel-title">SKILL TREE</div>
          <div className="sel-sub">{owned} / {CONFIG.skills.length} SKILLS</div>
        </div>
        <div className="pill" style={{ marginLeft:'auto' }}>
          <CoinIcon className="coin-ico"/>
          <span>{fmtCoins(save.coins)}</span>
        </div>
      </div>

      {/* Skill grid */}
      <div style={{ overflowY:'auto', padding:'12px', flex:1, minHeight:0, display:'flex', flexDirection:'column', gap:14 }}>
        {[1,2,3,4].map(tier => {
          const tierSkills = CONFIG.skills.filter(s => s.tier === tier);
          return (
            <div key={tier}>
              <h3 style={{ margin:'0 0 7px', fontFamily:'Bungee,sans-serif', fontSize:14, fontWeight:400, color:'var(--ink-soft)', letterSpacing:'.04em' }}>
                TIER {tier}
              </h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(158px, 1fr))', gap:8 }}>
                {tierSkills.map(skill => {
                  const cls = getNodeClass(skill);
                  return (
                    <div
                      key={skill.id}
                      className={`skill-card ${cls} ${selected === skill.id ? 'selected' : ''}`}
                      onClick={() => setSelected(skill.id)}
                      style={{ outline: selected === skill.id ? '3px solid var(--ink)' : undefined, outlineOffset: selected === skill.id ? 2 : undefined }}
                    >
                      <div style={{ fontSize:24, marginBottom:2 }}>{SKILL_ICONS[skill.id] || '⭐'}</div>
                      <div className="sk-name">{skill.name}</div>
                      <div className="sk-fx">{skill.fx}</div>
                      <div className="sk-state">
                        {cls === 'owned'  && <><span>✓</span> OWNED</>}
                        {cls === 'ready'  && <><span>💰</span> {fmtCoins(skill.cost)} coins</>}
                        {cls === 'poor'   && <><span>⚠</span> {fmtCoins(skill.cost)} coins</>}
                        {cls === 'locked' && <>🔒 LOCKED</>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Level abilities */}
        <div>
          <h3 style={{ margin:'4px 0 7px', fontFamily:'Bungee,sans-serif', fontSize:14, fontWeight:400, color:'var(--ink-soft)', letterSpacing:'.04em' }}>
            LEVEL ABILITIES
          </h3>
          <p style={{ margin:'0 0 10px', fontSize:'11px', fontWeight:700, color:'var(--ink-soft)' }}>Granted automatically as you level up — permanent, no purchase needed.</p>
          {CONFIG.levelAbilities.map(ab => {
            const unlocked = ab.level <= save.playerLevel;
            return (
              <div key={ab.id} className={`attr-row ${unlocked ? '' : ''}`} style={{ marginBottom:7, opacity: unlocked ? 1 : 0.5 }}>
                <div style={{ fontSize:24 }}>{['✨','⚡','🛡️','💰','🩸','🎯','💚','🏹','✨'][CONFIG.levelAbilities.indexOf(ab)] || '⭐'}</div>
                <div className="ar-main">
                  <div className="ar-name">
                    {ab.name}
                    <span className="at-lv">LV {ab.level}</span>
                  </div>
                  <div className="ar-desc">{ab.fx}</div>
                </div>
                {unlocked
                  ? <span style={{ fontSize:11, fontWeight:900, color:'#2e7d32', letterSpacing:'.07em' }}>✓ ACTIVE</span>
                  : <span style={{ fontSize:11, fontWeight:900, color:'var(--ink-soft)' }}>LOCKED</span>
                }
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom detail panel */}
      {selectedSkill && (
        <div style={{ borderTop:'2px solid var(--chrome-edge)', padding:'11px 12px 16px', display:'flex', gap:12, alignItems:'center', flex:'none' }}>
          <div style={{ width:56, height:56, flexNone:true, border:'2px solid var(--chrome-edge)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--chrome)', fontSize:28 }}>
            {SKILL_ICONS[selectedSkill.id] || '⭐'}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'Bungee,sans-serif', fontSize:16, lineHeight:1.15 }}>{selectedSkill.name}</div>
            <div style={{ fontSize:12, fontWeight:700, color:'var(--ink-soft)', lineHeight:1.35, marginTop:2 }}>{selectedSkill.fx}</div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.04em', color:'var(--ink-soft)', marginTop:3 }}>
              {selectedSkill.prereq && `Requires: ${CONFIG.skills.find(s => s.id === selectedSkill.prereq)?.name}`}
            </div>
          </div>
          {isOwned ? (
            <div style={{ flex:'none', fontFamily:'Bungee,sans-serif', fontSize:14, color:'#2e7d32', border:'2px solid #43b04c', borderRadius:10, padding:'9px 13px' }}>✓ OWNED</div>
          ) : (
            <button
              className="btn-primary"
              style={{ flex:'none', fontSize:13, padding:'9px 14px' }}
              disabled={!canBuy}
              onClick={() => dispatch({ type:'BUY_SKILL', id: selected })}
            >
              {selectedSkill.cost === 0 ? 'FREE' : `${fmtCoins(selectedSkill.cost)} 🪙`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
