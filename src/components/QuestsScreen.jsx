import { useEffect } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { HomeIcon, CoinIcon } from './Icons.jsx';
import { todayKey, generateQuests } from '../game/engine.js';

function fmtNum(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return Math.floor(n).toLocaleString();
}

export default function QuestsScreen() {
  const { state, dispatch, go } = useGame();
  const s = state.save;

  const today = todayKey();

  // Initialize quests if new day or not present
  useEffect(() => {
    if (s.questLastDay !== today || !s.quests || s.quests.length === 0) {
      dispatch({ type: 'INIT_QUESTS', dayKey: today });
    }
  }, [s.questLastDay, s.quests, today, dispatch]);

  const quests = s.quests || generateQuests(Date.now());

  const handleClaim = (id) => {
    dispatch({ type: 'CLAIM_QUEST', id });
  };

  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home">
          <HomeIcon />
        </button>
        <div>
          <div className="sel-title">DAILY QUESTS</div>
          <div className="sel-sub">FRESH CHALLENGES EVERY DAY</div>
        </div>
        <div className="pill mini" style={{ marginLeft: 'auto' }}>
          <CoinIcon className="coin-ico" />
          <span>{fmtNum(s.coins)}</span>
        </div>
      </div>

      {/* Quests List */}
      <div className="scroll-content" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
        {quests.map((q) => {
          const isDone = q.progress >= q.target;
          const isClaimed = q.claimed;
          const pct = Math.min(100, Math.floor((q.progress / q.target) * 100));

          return (
            <div key={q.id} className={`quest-row ${isDone ? 'done' : ''}`}>
              <div className="quest-top">
                <span className="quest-name">{q.name}</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gold-dark)' }}>
                  +{fmtNum(q.reward)} 🪙
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 700, marginTop: '2px' }}>
                {q.desc}
              </div>

              {/* Progress Bar */}
              <div className="quest-bar">
                <i style={{ width: `${pct}%` }} />
              </div>

              {/* Bottom Action */}
              <div className="quest-bot">
                <span className="quest-prog">
                  {q.progress} / {q.target} ({pct}%)
                </span>

                {isClaimed ? (
                  <span className="quest-claimed-tag">CLAIMED ✓</span>
                ) : isDone ? (
                  <button className="quest-claim" onClick={() => handleClaim(q.id)}>
                    CLAIM REWARD
                  </button>
                ) : (
                  <button className="quest-claim" style={{ opacity: 0.5, cursor: 'default' }} disabled>
                    IN PROGRESS
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)', textAlign: 'center', marginTop: '14px', lineHeight: 1.4 }}>
          Quest progress counts today's play only. Rewards land immediately when claimed; a new day brings a brand new set.
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '16px', padding: '12px' }}
          onClick={() => go('home')}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
