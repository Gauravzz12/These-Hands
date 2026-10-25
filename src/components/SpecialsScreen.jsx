import { useGame } from '../context/GameContext.jsx';
import { CONFIG, ALL_ENEMIES } from '../game/config.js';
import { HomeIcon, CoinIcon } from './Icons.jsx';

const SPECIAL_DEFS = [
  { id: 'doubleSlap',  bossId: 9,  name: 'Double Slap',     emoji: '👐', desc: 'Both hands at once — doubles damage for 3s.', baseCd: 25 },
  { id: 'meteor',      bossId: 29, name: 'Meteor Strike',    emoji: '☄️', desc: 'A meteor crashes down — 800% damage to the enemy.', baseCd: 45 },
  { id: 'orbitalLaser',bossId: 49, name: 'Orbital Laser',   emoji: '🔦', desc: 'Orbital beam fires — 1200% damage over 4s.', baseCd: 60 },
  { id: 'pharaohCurse',bossId: 69, name: "Pharaoh's Curse",  emoji: '𓂀', desc: 'Ancient curse — 600% damage + slows enemy 40% for 8s.', baseCd: 50 },
  { id: 'zeusWrath',   bossId: 89, name: "Zeus's Wrath",     emoji: '⚡', desc: 'Divine thunder — 2000% damage and stuns for 2s.', baseCd: 90 },
];

function fmtCoins(n) {
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
  return Math.round(n).toString();
}

function upgradeCost(level) { return Math.floor(500 * Math.pow(2.2, level - 1)); }

export default function SpecialsScreen() {
  const { state, dispatch, go } = useGame();
  const { save } = state;

  return (
    <div className="page">
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home"><HomeIcon/></button>
        <div>
          <div className="sel-title">SPECIALS</div>
          <div className="sel-sub">DROP FROM BOSSES</div>
        </div>
        <div className="pill mini" style={{ marginLeft:'auto' }}>
          <CoinIcon className="coin-ico"/>
          <span>{fmtCoins(save.coins)}</span>
        </div>
      </div>

      <div className="scroll-content">
        {SPECIAL_DEFS.map(sp => {
          const bossDefeated = save.defeatedEnemies[sp.bossId];
          const owned = save.specials[sp.id];
          const level = owned?.level || 0;
          const maxed = level >= 5;
          const cost  = owned ? upgradeCost(level) : null;
          const canUpgrade = owned && !maxed && save.coins >= cost;
          const dmgBonus = level > 0 ? `+${(level * 25)}% effect · CD ×${(Math.pow(0.96, level)).toFixed(2)}` : '';

          return (
            <div key={sp.id} className={`spec-row ${!bossDefeated ? 'locked' : ''}`} style={{ marginBottom:8 }}>
              <div style={{ fontSize: 30, flex:'none', width:44, textAlign:'center' }}>{sp.emoji}</div>
              <div className="spec-main">
                <div className="spec-name">{sp.name}</div>
                <div className="spec-desc">{sp.desc}</div>
                {level > 0 && (
                  <>
                    <div style={{ fontSize:'11.5px', fontWeight:800, marginTop:3, color:'var(--gold-dark)' }}>{dmgBonus}</div>
                    <div className="spec-pips" style={{ display:'flex', gap:3, marginTop:4 }}>
                      {Array.from({length:5}).map((_,i)=>(
                        <i key={i} className={i < level ? 'on' : ''} style={{ width:16, height:6, borderRadius:3, display:'block', background: i < level ? 'var(--gold)' : 'rgba(128,100,60,.3)' }}/>
                      ))}
                    </div>
                  </>
                )}
                {!bossDefeated && (
                  <div style={{ fontSize:11, fontWeight:800, color:'var(--ink-soft)', marginTop:3 }}>
                    Defeat Boss #{sp.bossId + 1} to unlock
                  </div>
                )}
              </div>
              <div className="spec-upg" style={{ flex:'none' }}>
                {!bossDefeated ? (
                  <span style={{ fontSize:10, fontWeight:900, color:'var(--ink-soft)', letterSpacing:'.07em' }}>🔒</span>
                ) : !owned ? (
                  <span style={{ fontSize:11, fontWeight:900, color:'#2e7d32' }}>✓ UNLOCKED</span>
                ) : maxed ? (
                  <button className="up-btn max" disabled style={{ width:'auto', padding:'6px 10px' }}>MAX</button>
                ) : (
                  <button
                    className="up-btn"
                    disabled={!canUpgrade}
                    onClick={() => dispatch({ type:'UPGRADE_SPECIAL', id:sp.id, cost })}
                    style={{ width:'auto', padding:'6px 10px', fontSize:'11.5px' }}
                  >
                    LV{level}→{level+1}<br/>
                    <span style={{ fontSize:10 }}>{fmtCoins(cost)}🪙</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div style={{ fontSize:'11.5px', fontWeight:700, color:'var(--ink-soft)', lineHeight:1.55, padding:'0 2px', marginTop:8 }}>
          Specials drop from bosses #10, #30, #50, #70 and #90. Every upgrade adds +25% effect and trims the cooldown by 4%.
        </div>
      </div>
    </div>
  );
}
