import { useGame } from '../context/GameContext.jsx';
import { ACHIEVEMENTS } from '../game/engine.js';
import { HomeIcon } from './Icons.jsx';

function fmtNum(n) {
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
  return Math.round(n).toString();
}

const STAT_DEFS = [
  { key:'totalSlaps',  label:'TOTAL SLAPS'  },
  { key:'totalDamage', label:'TOTAL DAMAGE'  },
  { key:'totalCoins',  label:'COINS EARNED'  },
  { key:'totalKOs',    label:'TOTAL KOs'     },
  { key:'totalCrits',  label:'CRITS LANDED'  },
  { key:'playSecs',    label:'PLAY TIME',    fmt: v => { const m=Math.floor(v/60),h=Math.floor(m/60); return h>0?`${h}h ${m%60}m`:`${m}m`; } },
];

const ACH_EMOJIS = {
  firstKO:'🥊', slapper10:'👋', slapper50:'🖐️', kos10:'🏆', kos50:'👑',
  coins1k:'💰', coins100k:'💎', level5:'⭐', level10:'🌟', crits100:'🎯',
};

export default function AwardsScreen() {
  const { state, go } = useGame();
  const { save } = state;
  const stats = save.stats;

  return (
    <div className="page">
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home"><HomeIcon/></button>
        <div>
          <div className="sel-title">AWARDS</div>
          <div className="sel-sub">LIFETIME STATS + ACHIEVEMENTS</div>
        </div>
      </div>

      <div className="scroll-content">
        {/* Stats grid */}
        <div className="aw-sec" style={{ fontFamily:'Bungee,sans-serif', fontSize:15, margin:'4px 0 8px' }}>LIFETIME STATS</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:7 }}>
          {STAT_DEFS.map(({ key, label, fmt }) => (
            <div key={key} className="stat-tile">
              <span>{label}</span>
              <b>{fmt ? fmt(stats[key] || 0) : fmtNum(stats[key] || 0)}</b>
            </div>
          ))}
          <div className="stat-tile">
            <span>PLAYER LV</span>
            <b>{save.playerLevel}</b>
          </div>
          <div className="stat-tile">
            <span>ENEMIES BEATEN</span>
            <b>{Object.keys(save.defeatedEnemies).length}</b>
          </div>
          <div className="stat-tile">
            <span>HARD BEATEN</span>
            <b>{Object.keys(save.hardDefeatedEnemies).length}</b>
          </div>
          <div className="stat-tile">
            <span>SKILLS OWNED</span>
            <b>{Object.keys(save.skills).length}</b>
          </div>
        </div>

        {/* Achievements */}
        <div className="aw-sec" style={{ fontFamily:'Bungee,sans-serif', fontSize:15, margin:'16px 0 0' }}>ACHIEVEMENTS</div>
        {ACHIEVEMENTS.map(ach => {
          const unlocked = save.achievements[ach.id];
          const val = ach.stat === 'playerLevel' ? save.playerLevel : (save.stats[ach.stat] || 0);
          const progress = Math.min(1, val / ach.target);

          return (
            <div key={ach.id} className={`ach-row ${unlocked ? 'unlocked' : ''}`}>
              <div style={{ fontSize:32, flex:'none', filter: unlocked ? undefined : 'grayscale(1) brightness(.6)', opacity: unlocked ? 1 : 0.55 }}>
                {ACH_EMOJIS[ach.id] || '🏅'}
              </div>
              <div className="ach-main">
                <div className="ach-name">{ach.name}</div>
                <div className="ach-desc">{ach.desc}</div>
                {!unlocked && (
                  <div className="ach-bar" style={{ marginTop:5 }}>
                    <i style={{ width:(progress*100)+'%' }}/>
                  </div>
                )}
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
                <span className="ach-state">{unlocked ? '✓ DONE' : `${fmtNum(val)} / ${fmtNum(ach.target)}`}</span>
                <span style={{ fontSize:10, fontWeight:800, color:'var(--ink-soft)' }}>+{ach.reward}💎</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
