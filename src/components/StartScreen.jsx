import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { SoundIcon, SoundOffIcon } from './Icons.jsx';

function fmtNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return Math.floor(n).toLocaleString();
}

export default function StartScreen() {
  const { state, dispatch, go } = useGame();
  const s = state.save;

  const [musicOn, setMusicOn] = useState(s.music ?? true);

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    dispatch({ type: 'SET_MUSIC', value: next });
  };

  const handlePlay = () => {
    // If player has already beaten some enemies, go to home hub, else jump straight into first battle
    go('home');
  };

  return (
    <div
      className="page"
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 20px',
        textAlign: 'center',
        background: 'var(--chrome)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Sound / Music Toggle */}
      <button
        onClick={toggleMusic}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '2.5px solid var(--chrome-edge)',
          background: 'var(--chrome)',
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 3,
        }}
        aria-label="Toggle sound"
      >
        {musicOn ? <SoundIcon /> : <SoundOffIcon />}
      </button>

      {/* Main Logo */}
      <div style={{ marginTop: '12px' }}>
        <h1 className="menu-logo" style={{ margin: 0 }}>
          THESE<br />
          <span>HANDS</span>
        </h1>
        <div className="menu-sub">THE FAST-PACED SLAPPING IDLE GAME</div>
      </div>

      {/* Animated Arena Stage */}
      <div
        className="menu-stage"
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '240px',
          position: 'relative',
          borderRadius: '16px',
          border: '2px solid var(--chrome-edge)',
          background: '#a8c6d8',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="floor" />
        <div className="rug" />
        <div className="menu-burst" />

        {/* Dummy enemy */}
        <div className="menu-enemy" style={{ fontSize: '72px' }}>
          🎯
        </div>

        {/* Animated Hand */}
        <div
          style={{
            position: 'absolute',
            left: '12%',
            bottom: '18%',
            fontSize: '52px',
            transformOrigin: '85% 90%',
            animation: 'menuSlap 1.6s ease-in-out infinite',
          }}
        >
          🫲
        </div>
      </div>

      {/* Stats summary row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div
          style={{
            border: '2px solid var(--chrome-edge)',
            borderRadius: '999px',
            padding: '6px 14px',
            fontWeight: 800,
            fontSize: '13px',
            background: 'var(--chrome)',
          }}
        >
          LV <b style={{ color: 'var(--gold-dark)' }}>{s.playerLevel}</b>
        </div>
        <div
          style={{
            border: '2px solid var(--chrome-edge)',
            borderRadius: '999px',
            padding: '6px 14px',
            fontWeight: 800,
            fontSize: '13px',
            background: 'var(--chrome)',
          }}
        >
          COINS <b style={{ color: 'var(--gold-dark)' }}>{fmtNum(s.coins)}</b>
        </div>
        <div
          style={{
            border: '2px solid var(--chrome-edge)',
            borderRadius: '999px',
            padding: '6px 14px',
            fontWeight: 800,
            fontSize: '13px',
            background: 'var(--chrome)',
          }}
        >
          KOs <b style={{ color: 'var(--gold-dark)' }}>{s.stats?.totalKOs || 0}</b>
        </div>
      </div>

      {/* Big Play Button */}
      <button
        onClick={handlePlay}
        style={{
          border: 'none',
          cursor: 'pointer',
          background: 'var(--gold)',
          color: '#2b1c10',
          fontFamily: 'Bungee, sans-serif',
          fontSize: '28px',
          padding: '16px 64px',
          borderRadius: '16px',
          boxShadow: '0 5px 0 rgba(43,28,16,.35)',
          transition: 'transform .1s',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        PLAY NOW
      </button>

      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)' }}>
        Progress auto-saved locally on your device
      </div>
    </div>
  );
}
