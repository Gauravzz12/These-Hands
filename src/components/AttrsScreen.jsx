import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { CONFIG } from '../game/config.js';
import { attrCost, attrCap, levelUpCost, computePlayerStats } from '../game/engine.js';
import { HomeIcon, CoinIcon } from './Icons.jsx';

const ATTR_DESCS = {
  power:      { desc: 'Base slap damage',   effectFn: (lv) => `+${lv * 2} dmg (${Math.pow(1.145, lv).toFixed(2)}x)` },
  speed:      { desc: 'Attack interval',    effectFn: (lv) => `${Math.max(0.6, Math.pow(0.9813, lv)).toFixed(2)}s` },
  critChance: { desc: 'Crit probability',   effectFn: (lv) => `+${lv}% crit` },
  critDamage: { desc: 'Critical power',     effectFn: (lv) => `+${lv * 6}% crit dmg` },
  defense:    { desc: 'Damage reduction',   effectFn: (lv) => `-${Math.min(50, lv * 1)}% dmg taken` },
  stun:       { desc: 'Stun on hit',        effectFn: (lv) => `${Math.min(30, (5 + lv * 0.556)).toFixed(1)}% stun` },
  combo:      { desc: 'Stacking damage',    effectFn: (lv) => `+${(lv * 0.6).toFixed(1)}% per stack` },
  coinMult:   { desc: 'Coin income',        effectFn: (lv) => `+${lv * 4}% coins` },
  accuracy:   { desc: 'Hit accuracy',       effectFn: (lv) => `${Math.min(99, Math.round(80 + lv * 0.633))}% hit rate` },
  bossDamage: { desc: 'Elite & boss damage',effectFn: (lv) => `+${Math.min(30, (lv * 0.6)).toFixed(1)}% vs boss` },
  vampirism:  { desc: 'Life leech',         effectFn: (lv) => `+${(lv * 0.334).toFixed(1)} HP / 6 hits` },
  luck:       { desc: 'Lucky strike chance',effectFn: (lv) => `+${(lv * 0.333).toFixed(1)}% lucky strike` },
  special:    { desc: 'Special power',      effectFn: (lv) => `+${(lv * 0.5).toFixed(1)}% special` },
};

export default function AttrsScreen() {
  const { state, dispatch, go } = useGame();
  const { save } = state;
  const ps = computePlayerStats(save);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cap = attrCap(save.playerLevel);
  const luCost = levelUpCost(save.playerLevel);
  const isMaxLevel = save.playerLevel >= (CONFIG.levelCap || 50);
  const canLevelUp = !isMaxLevel && save.coins >= luCost;

  const boostUntil = save.adCoinBoostUntil || 0;
  const boostLeftSecs = Math.max(0, Math.ceil((boostUntil - now) / 1000));
  const isBoostActive = boostLeftSecs > 0;

  function fmtCoins(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
    return Math.round(n).toString();
  }

  function fmtTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  const handleActivateBoost = () => {
    dispatch({ type: 'ACTIVATE_COIN_BOOST' });
  };

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
            {isMaxLevel ? 'MAX LEVEL (50)' : `LEVEL UP — ${fmtCoins(luCost)} coins`}
          </button>
        </div>

        {/* 2x Coins Boost Banner */}
        <div style={{
          border: isBoostActive ? '2px solid #22c55e' : '2px solid var(--gold-dark)',
          borderRadius: 12,
          padding: '9px 12px',
          background: isBoostActive ? 'rgba(34, 197, 94, 0.12)' : 'rgba(242, 176, 30, 0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize: 24 }}>💰</span>
            <div>
              <div style={{ fontWeight: 900, fontSize: 13, color: isBoostActive ? '#15803d' : 'var(--ink)' }}>
                {isBoostActive ? `2× COINS ACTIVE (${fmtTime(boostLeftSecs)})` : '2× COINS BOOST (10 MINS)'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)', fontWeight: 600 }}>
                {isBoostActive ? 'Tap to refresh timer to 10 mins' : 'Double coins earned from all slaps & KOs'}
              </div>
            </div>
          </div>
          <button
            className="btn-secondary"
            style={{ fontSize: 12, padding: '7px 12px', fontWeight: 800, whiteSpace: 'nowrap' }}
            onClick={handleActivateBoost}
          >
            {isBoostActive ? 'REFRESH' : 'WATCH AD'}
          </button>
        </div>

        {/* Attr list */}
        {CONFIG.attrOrder.map(key => {
          const attr = CONFIG.attrs[key];
          if (!attr) return null;
          const cur = save.attrs[key] || 0;
          const pMax = attr.maxLevel || 50;
          const effCap = Math.min(pMax, cap);
          const cost = attrCost(key, cur);
          const canBuy = save.coins >= cost && cur < effCap;
          const atCap = cur >= effCap;
          const info = ATTR_DESCS[key] || { desc: attr.name, effectFn: (lv) => `LV ${lv}` };

          return (
            <div key={key} className="attr-row">
              <div className="ar-main">
                <div className="ar-name">
                  {attr.name}
                  <span className="at-lv">LV {cur} / {effCap}</span>
                </div>
                <div className="ar-desc">{info.desc}</div>
                <div className="ar-cur">
                  <b>{info.effectFn(cur)}</b>
                  {cur < effCap && <span style={{ marginLeft:6, fontSize:11 }}>→ {info.effectFn(cur + 1)}</span>}
                </div>
              </div>
              <button
                className={`up-btn ar-btn ${atCap ? 'max' : ''}`}
                disabled={atCap || !canBuy}
                onClick={() => dispatch({ type:'UPGRADE_ATTR', key })}
              >
                {atCap ? (cur >= pMax ? 'MAX' : 'CAP') : (
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
