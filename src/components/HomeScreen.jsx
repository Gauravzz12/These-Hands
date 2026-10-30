import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { ALL_ENEMIES, CONFIG } from '../game/config.js';
import { todayKey } from '../game/engine.js';
import {
  CoinIcon, GemIcon, BoltIcon, SwordsIcon, UpArrowIcon,
  GridIcon, StarIcon, TrophyIcon, ShopIcon, HelpIcon, SettingsIcon
} from './Icons.jsx';

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

function fmtNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return Math.floor(n).toLocaleString();
}

export default function HomeScreen() {
  const { state, dispatch, go, playerStats } = useGame();
  const s = state.save;

  const currentEnemyIndex = Math.min(ALL_ENEMIES.length - 1, s.currentEnemyId || 0);
  const currentEnemy = ALL_ENEMIES[currentEnemyIndex] || ALL_ENEMIES[0];
  const enemyEmoji = ENEMY_EMOJIS[currentEnemyIndex] || '🎯';

  const [slapEffect, setSlapEffect] = useState(false);

  // Stats for menu badges
  const defeatedCount = Object.keys(s.defeatedEnemies || {}).length;
  const unlockedSkillsCount = Object.keys(s.skills || {}).length;
  const specialsCount = Object.keys(s.specials || {}).length;

  // Quests claimable check
  const claimableQuests = (s.quests || []).filter(q => q.progress >= q.target && !q.claimed).length;

  // Daily chest check
  const isChestUnlocked = (s.currentEnemyId || 0) >= 4;
  const chestClaimedToday = s.dailyChest?.lastDay === todayKey();
  const currentStreak = s.dailyChest?.streak || 0;
  const nextStreak = chestClaimedToday ? currentStreak : (currentStreak % 7) + 1;
  const chestRewardCoins = Math.floor(200 * Math.pow(1.3, nextStreak));
  const chestRewardGems = nextStreak === 7 ? 20 : 0;

  const handleStageTap = () => {
    setSlapEffect(true);
    setTimeout(() => setSlapEffect(false), 450);
  };

  const handleClaimChest = () => {
    if (chestClaimedToday) return;
    dispatch({
      type: 'CLAIM_DAILY_CHEST',
      streak: nextStreak,
      coins: chestRewardCoins,
      gems: chestRewardGems,
    });
  };

  const handleClaimOffline = () => {
    if (!state.offlineEarnings) return;
    dispatch({ type: 'CLAIM_OFFLINE', amount: state.offlineEarnings });
  };

  const isCompleted = defeatedCount >= 100;
  const isDragonSlayer = !!s.defeatedEnemies?.[49] || !!s.defeatedEnemies?.[99];

  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top HUD */}
      <header className="hub-head" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px 6px', flex: 'none' }}>
        <div className="pill mini" aria-label="Coins">
          <CoinIcon className="coin-ico" />
          <span>{fmtNum(s.coins)}</span>
        </div>
        <div className="pill gem mini" aria-label="Gems">
          <GemIcon className="gem-ico" />
          <span>{fmtNum(s.gems)}</span>
        </div>
        <div style={{ flex: 1 }} />
        <div className="pill level" aria-label="Player level">
          LV <span>{s.playerLevel}</span>
        </div>
        {isCompleted && (
          <div className="pill level" style={{ background: 'var(--gold)', color: '#2b1c10' }}>
            COMPLETED ★
          </div>
        )}
        {isDragonSlayer && (
          <div className="pill level" style={{ background: '#8f1f16', color: '#ffe9c9' }}>
            DRAGON SLAYER ★
          </div>
        )}
      </header>

      {/* Main Scrollable Content */}
      <div className="scroll-content" style={{ flex: 1, overflowY: 'auto', padding: '6px 12px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Offline Earnings Banner (if any) */}
        {state.offlineEarnings > 0 && (
          <div
            style={{
              background: 'var(--chrome)',
              border: '3px solid var(--gold-dark)',
              borderRadius: '16px',
              padding: '14px 16px',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,.25)',
              animation: 'popIn .3s ease-out'
            }}
          >
            <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '18px', color: 'var(--gold-dark)' }}>
              WHILE YOU WERE AWAY
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ink-soft)', marginTop: '4px' }}>
              Your hands earned offline coins!
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'Bungee, sans-serif', fontSize: '24px', margin: '8px 0' }}>
              <CoinIcon className="coin-ico" />
              <span>+{fmtNum(state.offlineEarnings)}</span>
            </div>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '10px 14px', fontSize: '16px' }}
              onClick={handleClaimOffline}
            >
              CLAIM REWARD
            </button>
          </div>
        )}

        {/* Interactive Hub Stage */}
        <div
          onClick={handleStageTap}
          style={{
            position: 'relative',
            height: '190px',
            borderRadius: '16px',
            border: '2px solid var(--chrome-edge)',
            background: '#a8c6d8',
            overflow: 'hidden',
            cursor: 'pointer',
            flex: 'none'
          }}
          title="Tap to slap!"
        >
          {/* Wall, Floor, Rug */}
          <div style={{ position: 'absolute', inset: 'auto 0 18% 0', height: '12%', background: '#8fb4c9' }} />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '18%', background: '#7d4f26' }} />
          <div style={{ position: 'absolute', left: '50%', bottom: '4%', transform: 'translateX(-50%)', width: '70%', height: '12%', borderRadius: '50%', background: '#b8452f' }} />

          {/* Guest target on podium */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: '64px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.3))', transition: 'transform .1s', transform: slapEffect ? 'scale(1.18) rotate(6deg)' : 'scale(1)' }}>
              {enemyEmoji}
            </span>
            <div
              style={{
                marginTop: '4px',
                background: 'rgba(43,28,16,.82)',
                color: '#ffe9c9',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '.06em',
                padding: '3px 12px',
                borderRadius: '999px',
                border: '1.5px solid rgba(255,233,201,.5)'
              }}
            >
              TARGET: {currentEnemy.name.toUpperCase()} (#{currentEnemyIndex + 1})
            </div>
          </div>

          {/* Left Hand Floating */}
          <div
            style={{
              position: 'absolute',
              left: '6%',
              bottom: '12%',
              fontSize: '44px',
              transform: slapEffect ? 'translate(40px, -20px) rotate(25deg)' : 'rotate(-10deg)',
              transition: 'transform .15s ease-out',
              pointerEvents: 'none'
            }}
          >
            🫲
          </div>

          {/* Right Hand Floating */}
          <div
            style={{
              position: 'absolute',
              right: '6%',
              bottom: '12%',
              fontSize: '44px',
              transform: slapEffect ? 'translate(-40px, -20px) rotate(-25deg)' : 'rotate(10deg)',
              transition: 'transform .15s ease-out',
              pointerEvents: 'none'
            }}
          >
            🫱
          </div>

          {/* Slap Burst Effect */}
          {slapEffect && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
                fontSize: '48px',
                animation: 'popIn .25s ease-out',
                pointerEvents: 'none'
              }}
            >
              💥
            </div>
          )}

          <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '10px', fontWeight: 800, color: 'rgba(43,28,16,.6)', letterSpacing: '.05em' }}>
            TAP STAGE TO SLAP
          </div>
        </div>

        {/* Daily Streak Chest Card (if unlocked) */}
        {isChestUnlocked && (
          <div
            style={{
              border: '2px solid var(--chrome-edge)',
              borderRadius: '14px',
              padding: '10px 14px',
              background: 'var(--chrome)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div>
              <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '13px', color: 'var(--gold-dark)' }}>
                DAILY CHEST · DAY {nextStreak}/7
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)' }}>
                Reward: +{fmtNum(chestRewardCoins)} 🪙 {chestRewardGems > 0 ? `+${chestRewardGems} 💎` : ''}
              </div>
            </div>
            <button
              className="btn-primary"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                borderRadius: '8px',
                opacity: chestClaimedToday ? 0.6 : 1,
                cursor: chestClaimedToday ? 'default' : 'pointer'
              }}
              disabled={chestClaimedToday}
              onClick={handleClaimChest}
            >
              {chestClaimedToday ? 'CLAIMED ✓' : 'CLAIM'}
            </button>
          </div>
        )}

        {/* Navigation Menu Grid */}
        <nav style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          
          {/* BATTLE (Wide, highlighted gold) */}
          <button
            className="hub-item battle"
            style={{ gridColumn: '1 / -1', minHeight: '62px' }}
            onClick={() => go('battle')}
          >
            <SwordsIcon />
            <div className="hi-main">
              <span className="hi-name">BATTLE</span>
              <span className="hi-sub">VS {currentEnemy.name.toUpperCase()} (#{currentEnemyIndex + 1})</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* ATTRIBUTES */}
          <button className="hub-item" onClick={() => go('attrs')}>
            <UpArrowIcon />
            <div className="hi-main">
              <span className="hi-name">ATTRIBUTES</span>
              <span className="hi-sub">DPS {fmtNum(playerStats.dps)}</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* LEVELS */}
          <button className="hub-item" onClick={() => go('levels')}>
            <GridIcon />
            <div className="hi-main">
              <span className="hi-name">LEVELS</span>
              <span className="hi-sub">{defeatedCount} / 50 DEFEATED</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* SKILLS */}
          <button className="hub-item" onClick={() => go('skills')}>
            <StarIcon />
            <div className="hi-main">
              <span className="hi-name">SKILLS</span>
              <span className="hi-sub">{unlockedSkillsCount} / 17 UNLOCKED</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* SPECIALS */}
          <button className="hub-item" onClick={() => go('specials')}>
            <BoltIcon />
            <div className="hi-main">
              <span className="hi-name">SPECIALS</span>
              <span className="hi-sub">{specialsCount} UNLOCKED</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* QUESTS */}
          <button className="hub-item" onClick={() => go('quests')} style={{ position: 'relative' }}>
            <TrophyIcon />
            <div className="hi-main">
              <span className="hi-name">QUESTS</span>
              <span className="hi-sub">DAILY CHALLENGES</span>
            </div>
            {claimableQuests > 0 && (
              <span className="hi-badge" style={{ position: 'absolute', top: '8px', right: '8px' }}>
                {claimableQuests}
              </span>
            )}
            <span className="hi-arrow">›</span>
          </button>

          {/* AWARDS */}
          <button className="hub-item" onClick={() => go('awards')}>
            <TrophyIcon />
            <div className="hi-main">
              <span className="hi-name">AWARDS</span>
              <span className="hi-sub">STATS & TROPHIES</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* SHOP (Wide) */}
          <button
            className="hub-item"
            style={{ gridColumn: '1 / -1' }}
            onClick={() => go('shop')}
          >
            <ShopIcon />
            <div className="hi-main">
              <span className="hi-name">SHOP</span>
              <span className="hi-sub">HAND SKINS & COIN PACKS</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* HOW TO PLAY */}
          <button className="hub-item" onClick={() => go('help')}>
            <HelpIcon />
            <div className="hi-main">
              <span className="hi-name">RULES</span>
              <span className="hi-sub">HOW TO PLAY</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

          {/* SETTINGS */}
          <button className="hub-item" onClick={() => go('settings')}>
            <SettingsIcon />
            <div className="hi-main">
              <span className="hi-name">SETTINGS</span>
              <span className="hi-sub">AUDIO & SAVE</span>
            </div>
            <span className="hi-arrow">›</span>
          </button>

        </nav>
      </div>
    </div>
  );
}
