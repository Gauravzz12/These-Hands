import { useGame } from '../context/GameContext.jsx';
import { CONFIG } from '../game/config.js';

export default function LevelUpModal() {
  const { state, dispatch } = useGame();
  const lvl = state.levelUpPending;

  if (!lvl) return null;

  const perk = CONFIG.levelAbilities.find((a) => a.level === lvl);

  const handleDismiss = () => {
    dispatch({ type: 'CLEAR_LEVEL_UP_PENDING' });
  };

  return (
    <div
      onClick={handleDismiss}
      className="overlay-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(24, 12, 4, .82)',
        cursor: 'pointer',
      }}
    >
      <div
        className="overlay-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '340px',
          background: 'var(--chrome)',
          border: '3px solid var(--gold-dark)',
          borderRadius: '20px',
          padding: '24px 20px',
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(0,0,0,.6)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>
          🎉
        </div>
        <div className="lu-head" style={{ fontFamily: 'Bungee, sans-serif', fontSize: '32px', color: 'var(--gold-dark)' }}>
          LEVEL {lvl}!
        </div>

        {perk ? (
          <div
            style={{
              marginTop: '16px',
              border: '2px solid var(--chrome-edge)',
              borderRadius: '12px',
              padding: '12px',
              background: 'rgba(242,176,30,.10)',
            }}
          >
            <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '.1em' }}>
              NEW PERMANENT ABILITY
            </div>
            <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '16px', marginTop: '4px' }}>
              {perk.name}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginTop: '4px' }}>
              {perk.fx}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '12px', fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)' }}>
            All attribute caps increased to <b>{lvl * CONFIG.capPerLevel}</b>!
          </div>
        )}

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '20px', padding: '12px' }}
          onClick={handleDismiss}
        >
          KEEP SLAPPING
        </button>
      </div>
    </div>
  );
}
