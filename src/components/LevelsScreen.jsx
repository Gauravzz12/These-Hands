import { useGame } from '../context/GameContext.jsx';
import { CONFIG, ALL_ENEMIES, ENEMY_GROUPS } from '../game/config.js';
import { computeEnemyHp, computeEnemyAttack } from '../game/engine.js';
import { HomeIcon, CoinIcon } from './Icons.jsx';

export default function LevelsScreen() {
  const { state, dispatch, go } = useGame();
  const { save } = state;

  function fmtNum(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
    return Math.round(n).toString();
  }

  const startFight = (enemyId, hard = false) => {
    dispatch({ type: 'DEFEAT_ENEMY', id: enemyId - 1, hard: false, coins: 0, gems: 0 }); // pre-set current
    // Actually just navigate to battle with the chosen enemy
    dispatch({ type: 'SET_CURRENT_ENEMY', enemyId, isHard: hard });
    go('battle');
  };

  return (
    <div className="page">
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home"><HomeIcon/></button>
        <div>
          <div className="sel-title">CHOOSE YOUR VICTIM</div>
          <div className="sel-sub">
            {state.testMode ? 100 : save.currentEnemyId + 1} / 50 UNLOCKED {state.testMode ? '· ⚡ TEST MODE' : ''}
          </div>
        </div>
        <button
          className={`set-toggle mini ${!state.testMode ? 'off' : ''}`}
          style={{ marginLeft: 'auto', fontSize: 11, padding: '5px 10px', background: state.testMode ? 'var(--gold)' : '', color: state.testMode ? '#2b1c10' : '' }}
          onClick={() => dispatch({ type: 'TOGGLE_TEST_MODE' })}
        >
          {state.testMode ? 'TEST: ON' : 'TEST MODE'}
        </button>
      </div>

      <div className="scroll-content" style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {ENEMY_GROUPS.map((group, gi) => {
          const groupStart = gi * 5;
          const groupUnlocked = state.testMode || save.currentEnemyId >= groupStart;
          if (!groupUnlocked) return null;

          return (
            <div key={gi} className={`sel-group ${group.bg}`} style={{ borderRadius:14, padding:'10px 10px 12px', color:'#2b1c10' }}>
              <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8 }}>
                <h3 style={{ margin:0, fontFamily:'Bungee,sans-serif', fontSize:15, fontWeight:400 }}>{group.name}</h3>
                <span style={{ fontSize:11, fontWeight:800, color:'rgba(43,28,16,.65)', whiteSpace:'nowrap' }}>
                  {group.enemies.filter(e => save.defeatedEnemies[e.id]).length} / 5
                </span>
              </div>
              <div style={{ fontSize:11, fontWeight:800, color:'rgba(43,28,16,.6)', marginBottom:8 }}>{group.theme}</div>

              {/* Track dots */}
              <div style={{ display:'flex', alignItems:'center', margin:'7px 2px 10px' }}>
                {group.enemies.map((enemy, i) => {
                  const done = save.defeatedEnemies[enemy.id];
                  const isCur = enemy.id === save.currentEnemyId;
                  const unlocked = state.testMode || enemy.id <= save.currentEnemyId;
                  return (
                    <div key={i} style={{ display:'flex', flex:1, alignItems:'center' }}>
                      <div style={{
                        width:14, height:14, borderRadius:'50%', flex:'none',
                        border: `2.5px solid ${done ? '#2e7d32' : isCur ? '#d63c30' : 'rgba(43,28,16,.45)'}`,
                        background: done ? '#2e7d32' : isCur ? '#fff' : 'transparent',
                        boxShadow: isCur ? '0 0 0 3px rgba(214,60,48,.35)' : 'none',
                      }}/>
                      {i < group.enemies.length - 1 && (
                        <div style={{ flex:1, height:3, background: done ? '#2e7d32' : 'rgba(43,28,16,.25)', borderRadius:2 }}/>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(102px, 1fr))', gap:8 }}>
                {group.enemies.map(enemy => {
                  const unlocked = state.testMode || enemy.id <= save.currentEnemyId;
                  const done = save.defeatedEnemies[enemy.id];
                  const isCurrent = enemy.id === save.currentEnemyId;
                  const hardDone = save.hardDefeatedEnemies[enemy.id];
                  const groupCleared = group.enemies.every(e => save.defeatedEnemies[e.id]);
                  const hardAvail = (state.testMode || groupCleared) && done;
                  const hp = computeEnemyHp(enemy.id);

                  let stateLabel = 'LOCKED';
                  let stateClass = 'locked';
                  if (done) { stateLabel = 'DEFEATED'; stateClass = 'done'; }
                  if (isCurrent && !done) { stateLabel = 'FIGHT!'; stateClass = 'current'; }

                  return (
                    <div
                      key={enemy.id}
                      className={`ecard ${stateClass} ${hardAvail && !hardDone ? 'hard-avail' : ''}`}
                      onClick={() => unlocked ? startFight(enemy.id) : null}
                    >
                      <div className="enemy-icon" style={{ fontSize:36, lineHeight:1, margin:'4px 0' }}>
                        {unlocked ? ['🎯','😤','🐦','😠','🟢','🐩','🧗','🥏','🏃','🐒','🤡','📋','🍔','🎯','👨‍🏫','💼','📊','👔','🕴️','🤵','🦜','🐒','🐍','🦍','👑','🦀','⚡','🐙','🦈','🐙','👺','🧌','🗡️','🧙','🐲','⚔️','🛡️','⛩️','🏛️','𓂀','🤖','👽','🦾','🏴‍☠️','👾','💀','👻','🧟','😈','🐉','🎨','💃','🎩','🥊','🌟','🔥','💧','🪨','⛈️','🌪️','🦣','⚔️','🎩','⏱️','⌛','🤹','🎪','💪','🦁','🎭','🐐','❄️','🪨','🐺','🏔️','🦂','👻','🐫','🏺','🦁','🏛️','🌋','⚔️','😇','🌀','👾','💻','🦠','🕷️','🖥️','🌑','🌊','🌌','🏛️','🌀','🌑','😈','💀','🙌','🐲'][enemy.id] : '🔒'}
                      </div>
                      <div className="nm">{unlocked ? enemy.name : '???'}</div>
                      {done && CONFIG.bossSpecials && CONFIG.bossSpecials[enemy.id] && (
                        <div className="st spec-line" style={{ color: '#d63c30', fontWeight: 900, fontSize: 10 }}>
                          ⚠ SPECIAL: {CONFIG.bossSpecials[enemy.id].name} — {CONFIG.bossSpecials[enemy.id].blurb}
                        </div>
                      )}
                      {unlocked && (
                        <div className="st">HP: {fmtNum(hp)}</div>
                      )}
                      <div className="state">{stateLabel}</div>
                      {unlocked && isCurrent && !done && (
                        <button className="ecard-fight" onClick={(e) => { e.stopPropagation(); startFight(enemy.id); }}>
                          FIGHT!
                        </button>
                      )}
                      {hardAvail && !isCurrent ? (
                        <button
                          className={`ecard-hard ${hardDone ? 'done' : ''}`}
                          onClick={(e) => { e.stopPropagation(); startFight(enemy.id, true); }}
                        >
                          <svg viewBox="0 0 24 24" width="13" height="13"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                          {hardDone ? 'HARD ✓' : 'HARD MODE'}
                        </button>
                      ) : done && !isCurrent ? (
                        <div className="ecard-hard locked">CLEAR STAGE FIRST</div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
