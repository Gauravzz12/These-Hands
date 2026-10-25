import { useGame } from '../context/GameContext.jsx';
import { CONFIG } from '../game/config.js';
import { attrCost, attrCap, levelUpCost, computePlayerStats } from '../game/engine.js';
import { HomeIcon, CoinIcon } from './Icons.jsx';

const ATTR_DESCS = {
  power:      { desc: 'Base slap damage', effectFn: (lv) => `+${(lv * 15).toFixed(0)}% damage` },
  speed:      { desc: 'Attack rate',      effectFn: (lv) => `×${(Math.pow(0.96, lv)).toFixed(2)} interval` },
  critChance: { desc: 'Crit probability', effectFn: (lv) => `+${(lv * 2).toFixed(0)}% crit` },
  critDamage: { desc: 'Critical power',   effectFn: (lv) => `+${(lv * 25).toFixed(0)}% crit dmg` },
  combo:      { desc: 'Stacking damage',  effectFn: (lv) => `+${(lv * 2).toFixed(0)}% per stack` },
  coinMult:   { desc: 'Coin income',      effectFn: (lv) => `+${(lv * 10).toFixed(0)}% coins` },
  accuracy:   { desc: 'Hit accuracy',     effectFn: (lv) => `${Math.min(99, (90 + lv)).toFixed(0)}% hit rate` },
  bossDamage: { desc: 'Elite damage',     effectFn: (lv) => `+${(lv * 2).toFixed(0)}% boss dmg` },
  luck:       { desc: 'Lucky procs',      effectFn: (lv) => `${(lv * 0.6).toFixed(1)}% lucky chance` },
  special:    { desc: 'Special power',    effectFn: (lv) => `+${(lv * 0.5).toFixed(1)}% special` },
};

export default function AttrsScreen() {
  const { state, dispatch, go } = useGame();
  const { save } = state;
  const ps = computePlayerStats(save);

  const cap = attrCap(save.playerLevel);
  const luCost = levelUpCost(save.playerLevel);
  const canLevelUp = save.coins >= luCost;

  function fmtCoins(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
    return Math.round(n).toString();
  }

  return (
    <div className="page">
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home"><HomeIcon/></button>
        <div>
          <div className="sel-title">ATTRIBUTES</div>
          <div className="sel-sub" id="attrsSub">LEVEL {save.playerLevel} · DPS {fmtCoins(ps.dps)}</div>
        </div>
        <div className="pill mini" style={{ marginLeft:'auto' }}>
          <CoinIcon className="coin-ico"/>
          <span>{fmtCoins(save.coins)}</span>
        </div>
      </div>

      <div style={{ overflowY:'auto', flex:1, minHeight:0, padding:'12px', display:'flex', flexDirection:'column', gap:8 }}>
        {/* Top card */}
        <div style={{ border:'3px solid var(--gold-dark)', borderRadius:13, padding:'10px 12px', background:'rgba(242,176,30,.10)', display:'flex', flexDirection:'column', gap:5 }}>
          <div style={{ fontWeight:800, fontSize:'12.5px', color:'var(--ink-soft)', letterSpacing:'.03em' }}>
            PLAYER LEVEL <b style={{ color:'var(--ink)' }}>{save.playerLevel}</b> · CAP <b style={{ color:'var(--ink)' }}>{cap}</b> PER ATTRIBUTE
          </div>
          <div style={{ fontWeight:800, fontSize:'12.5px', color:'var(--ink-soft)', letterSpacing:'.03em' }}>
            DPS <b style={{ color:'var(--ink)' }}>{fmtCoins(ps.dps)}</b> · MAX HP <b style={{ color:'var(--ink)' }}>{ps.maxHp}</b>
          </div>
          <button
            className="btn-primary"
            style={{ marginTop:2, fontSize:14, padding:'10px 12px', gap:6 }}
            disabled={!canLevelUp}
            onClick={() => dispatch({ type:'LEVEL_UP' })}
          >
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/></svg>
            LEVEL UP — {fmtCoins(luCost)} coins
          </button>
        </div>

        {/* Attr list */}
        {CONFIG.attrOrder.map(key => {
          const attr = CONFIG.attrs[key];
          const cur = save.attrs[key];
          const cost = attrCost(key, cur);
          const canBuy = save.coins >= cost && cur < cap;
          const atCap = cur >= cap;
          const info = ATTR_DESCS[key];

          return (
            <div key={key} className="attr-row">
              <div className="ar-main">
                <div className="ar-name">
                  {attr.name}
                  <span className="at-lv">LV {cur} / {cap}</span>
                </div>
                <div className="ar-desc">{info.desc}</div>
                <div className="ar-cur">
                  <b>{info.effectFn(cur)}</b>
                  {cur < cap && <span style={{ marginLeft:6, fontSize:11 }}>→ {info.effectFn(cur + 1)}</span>}
                </div>
              </div>
              <button
                className={`up-btn ar-btn ${atCap ? 'max' : ''}`}
                disabled={atCap || !canBuy}
                onClick={() => dispatch({ type:'UPGRADE_ATTR', key })}
              >
                {atCap ? 'MAX' : (
                  <>
                    <svg viewBox="0 0 24 24" width="12" height="12"><path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/></svg>
                    {fmtCoins(cost)}
                  </>
                )}
              </button>
            </div>
          );
        })}

        {/* Level perks */}
        {save.playerLevel >= 2 && (
          <>
            <div style={{ fontWeight:800, fontSize:'12.5px', color:'var(--ink-soft)', letterSpacing:'.03em', margin:'16px 2px 4px' }}>LEVEL PERKS</div>
            {CONFIG.levelAbilities
              .filter(ab => ab.level <= save.playerLevel)
              .map(ab => (
                <div key={ab.id} className="attr-row" style={{ borderColor:'var(--gold-dark)', background:'rgba(242,176,30,.08)' }}>
                  <div className="ar-main">
                    <div className="ar-name" style={{ color:'var(--gold-dark)' }}>{ab.name}</div>
                    <div className="ar-desc">{ab.fx}</div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:900, color:'#2e7d32', letterSpacing:'.07em' }}>LV{ab.level}</span>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
