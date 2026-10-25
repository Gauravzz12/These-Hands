import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { CONFIG } from '../game/config.js';
import { HomeIcon, CoinIcon, GemIcon } from './Icons.jsx';

function fmtNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return Math.floor(n).toLocaleString();
}

const SKIN_DATA = [
  {
    id: 'classic',
    name: 'Classic Hand',
    emoji: '🫱',
    rarity: 'DEFAULT',
    desc: 'The original knuckles. Reliable, pure, and ready to slap.',
    bonus: 'Standard stats',
    price: 0,
  },
  {
    id: 'stone',
    name: 'Stone Hand',
    emoji: '🪨',
    rarity: 'RARE',
    desc: 'Solid cracked granite. Slaps hit with earthquake momentum.',
    bonus: '+12% MAX HP · 10th slap deals 2.5x damage',
    price: 50,
  },
  {
    id: 'cyber',
    name: 'Cyber Hand',
    emoji: '🤖',
    rarity: 'EPIC',
    desc: 'Bionic hydraulic pistons. Supercharges strike frequency.',
    bonus: '+15% ATTACK SPEED · Overclock chance',
    price: 120,
  },
  {
    id: 'dragon',
    name: 'Dragon Claw',
    emoji: '🐉',
    rarity: 'LEGENDARY',
    desc: 'Molten dragon scales. Each slap scorches the victim.',
    bonus: '+20% DAMAGE · Deals burn damage over time',
    price: 250,
  },
  {
    id: 'gold',
    name: 'Midas Hand',
    emoji: '✨',
    rarity: 'LEGENDARY',
    desc: 'Pure spun gold. Every impact showers coins like rain.',
    bonus: '+50% COINS from every strike and KO',
    price: 500,
  },
];

const COIN_PACKS = [
  { id: 'pouch', name: 'Coin Pouch', coins: 5000, gems: 20 },
  { id: 'chest', name: 'Treasure Chest', coins: 35000, gems: 100 },
  { id: 'vault', name: 'Royal Vault', coins: 250000, gems: 500 },
];

export default function ShopScreen() {
  const { state, dispatch, go } = useGame();
  const s = state.save;

  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleEquip = (id) => {
    dispatch({ type: 'EQUIP_SKIN', id });
    showToast(`Equipped ${id.toUpperCase()} skin!`);
  };

  const handleBuySkin = (skin) => {
    if (s.gems < skin.price) {
      showToast('Not enough Gems!');
      return;
    }
    dispatch({ type: 'BUY_SKIN', id: skin.id });
    dispatch({ type: 'EQUIP_SKIN', id: skin.id });
    showToast(`Unlocked & equipped ${skin.name}!`);
  };

  const handleUnlockOffline = () => {
    if (s.gems < CONFIG.offline.price) {
      showToast('Need 10 Gems to unlock!');
      return;
    }
    dispatch({ type: 'UNLOCK_OFFLINE' });
    showToast('Offline earnings unlocked!');
  };

  const handleBuyCoins = (pack) => {
    if (s.gems < pack.gems) {
      showToast('Not enough Gems!');
      return;
    }
    dispatch({ type: 'SPEND_GEMS', amount: pack.gems });
    dispatch({ type: 'ADD_COINS', amount: pack.coins });
    showToast(`Purchased +${fmtNum(pack.coins)} Coins!`);
  };

  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home">
          <HomeIcon />
        </button>
        <div>
          <div className="sel-title">SHOP</div>
          <div className="sel-sub">HAND SKINS & BONUSES</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <div className="pill mini">
            <CoinIcon className="coin-ico" />
            <span>{fmtNum(s.coins)}</span>
          </div>
          <div className="pill gem mini">
            <GemIcon className="gem-ico" />
            <span>{fmtNum(s.gems)}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Shop Content */}
      <div className="scroll-content" style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 24px' }}>
        
        {/* Offline Earnings Feature Card */}
        <div
          style={{
            border: '3px solid var(--chrome-edge)',
            borderRadius: '14px',
            padding: '12px 14px',
            background: 'var(--chrome)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '14px',
            boxShadow: '0 2px 0 rgba(43,28,16,.15)'
          }}
        >
          <div>
            <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '14px' }}>
              OFFLINE EARNINGS
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)', marginTop: '2px' }}>
              Your hands keep slapping & earning coins while you're away (up to 8h).
            </div>
          </div>

          {s.offlineEarningsUnlocked ? (
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#43b04c', whiteSpace: 'nowrap' }}>
              ACTIVE ✓
            </span>
          ) : (
            <button
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}
              onClick={handleUnlockOffline}
            >
              10 💎 UNLOCK
            </button>
          )}
        </div>

        {/* Section: Hand Skins */}
        <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '15px', color: 'var(--gold-dark)', marginBottom: '8px' }}>
          HAND SKINS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', marginBottom: '18px' }}>
          {SKIN_DATA.map((skin) => {
            const isOwned = s.ownedSkins?.includes(skin.id) || skin.id === 'classic';
            const isEquipped = s.equippedSkin === skin.id;

            return (
              <div
                key={skin.id}
                className="skin-card"
                style={{
                  border: isEquipped ? '2px solid var(--gold-dark)' : '2px solid var(--chrome-edge)',
                  background: isEquipped ? 'rgba(242,176,30,.12)' : 'var(--chrome)',
                  padding: '10px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '48px', margin: '4px 0' }}>
                  {skin.emoji}
                </div>
                <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '13px', lineHeight: 1.1 }}>
                  {skin.name}
                </div>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 900,
                    letterSpacing: '.08em',
                    color: skin.rarity === 'LEGENDARY' ? '#b97e08' : skin.rarity === 'EPIC' ? '#7a5aa0' : 'var(--ink-soft)'
                  }}
                >
                  {skin.rarity}
                </span>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)', lineHeight: 1.25, minHeight: '26px' }}>
                  {skin.bonus}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
                  {isEquipped ? (
                    <button
                      className="skin-btn equipped"
                      style={{
                        width: '100%',
                        background: 'transparent',
                        color: 'var(--gold-dark)',
                        border: '2px solid var(--gold-dark)',
                        padding: '6px',
                        fontSize: '11px',
                        fontWeight: 900,
                        cursor: 'default'
                      }}
                    >
                      EQUIPPED ✓
                    </button>
                  ) : isOwned ? (
                    <button
                      className="btn-primary"
                      style={{ width: '100%', padding: '6px', fontSize: '12px' }}
                      onClick={() => handleEquip(skin.id)}
                    >
                      EQUIP
                    </button>
                  ) : (
                    <button
                      className="btn-primary"
                      style={{ width: '100%', padding: '6px', fontSize: '12px' }}
                      onClick={() => handleBuySkin(skin)}
                    >
                      {skin.price} 💎 BUY
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: Coin Packs */}
        <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '15px', color: 'var(--gold-dark)', marginBottom: '8px' }}>
          COIN PACKS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '18px' }}>
          {COIN_PACKS.map((pack) => (
            <div
              key={pack.id}
              style={{
                border: '2px solid var(--chrome-edge)',
                borderRadius: '12px',
                padding: '10px 8px',
                background: 'var(--chrome)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '11px' }}>
                {pack.name}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontFamily: 'Bungee, sans-serif', fontSize: '14px', margin: '4px 0' }}>
                <CoinIcon className="coin-ico" />
                <span>{fmtNum(pack.coins)}</span>
              </div>
              <button
                className="btn-primary"
                style={{ width: '100%', padding: '6px 4px', fontSize: '11px' }}
                onClick={() => handleBuyCoins(pack)}
              >
                {pack.gems} 💎
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.4 }}>
          Gems are earned from achievements, defeating bosses, and daily rewards.
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            bottom: '24px',
            transform: 'translateX(-50%)',
            background: 'var(--track)',
            color: '#ffe9bd',
            border: '2px solid var(--gold-dark)',
            borderRadius: '12px',
            padding: '9px 18px',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,.45)',
            zIndex: 100,
            animation: 'popIn .2s ease-out'
          }}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
