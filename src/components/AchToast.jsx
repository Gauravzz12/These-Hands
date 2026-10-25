import { useEffect } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { TrophyIcon } from './Icons.jsx';

export default function AchToast() {
  const { state, dispatch } = useGame();
  const ach = state.toastAch;

  useEffect(() => {
    if (!ach) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_ACH_TOAST' });
    }, 3200);
    return () => clearTimeout(timer);
  }, [ach, dispatch]);

  if (!ach) return null;

  return (
    <div
      className="ach-toast show"
      onClick={() => dispatch({ type: 'CLEAR_ACH_TOAST' })}
      style={{
        position: 'fixed',
        top: '64px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--track)',
        color: '#ffe9bd',
        border: '2px solid var(--gold-dark)',
        borderRadius: '14px',
        padding: '10px 18px',
        maxWidth: '90%',
        boxShadow: '0 8px 30px rgba(0,0,0,.5)',
        cursor: 'pointer',
      }}
    >
      <TrophyIcon style={{ width: '24px', height: '24px', color: 'var(--gold)', flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--gold)', letterSpacing: '.08em' }}>
          ACHIEVEMENT UNLOCKED!
        </div>
        <div style={{ fontWeight: 800, fontSize: '13.5px' }}>
          {ach.name} (+{ach.reward} 💎)
        </div>
      </div>
    </div>
  );
}
