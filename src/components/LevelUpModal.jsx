import { useGame } from '../context/GameContext.jsx';
import { getLevelUpFeedback } from '../game/config.js';

export default function LevelUpModal() {
  const { state, dispatch } = useGame();
  const lvl = state.levelUpPending;

  if (!lvl) return null;

  const feedback = getLevelUpFeedback(lvl);
  if (feedback.type !== 'MODAL') return null;

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
          🥋
        </div>
        <div className="lu-head" style={{ fontFamily: 'Bungee, sans-serif', fontSize: '30px', color: 'var(--gold-dark)' }}>
          {feedback.title}
        </div>
        <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '.12em', marginTop: '2px' }}>
          {feedback.subtitle}
        </div>

        <div
          style={{
            marginTop: '16px',
            border: '2px solid var(--chrome-edge)',
            borderRadius: '12px',
            padding: '12px',
            background: 'rgba(242,176,30,.10)',
          }}
        >
          <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '16px', marginTop: '4px' }}>
            {feedback.headline}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginTop: '6px', lineHeight: 1.4 }}>
            {feedback.description}
          </div>
        </div>

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
