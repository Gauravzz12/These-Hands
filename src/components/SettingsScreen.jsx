import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import { exportSave } from '../game/engine.js';
import { HomeIcon } from './Icons.jsx';

export default function SettingsScreen() {
  const { state, dispatch, go } = useGame();
  const s = state.save;

  const [exportCode, setExportCode] = useState('');
  const [importCode, setImportCode] = useState('');
  const [saveMsg, setSaveMsg] = useState('');
  const [resetArmed, setResetArmed] = useState(false);

  const toggleMusic = () => {
    dispatch({ type: 'SET_MUSIC', value: !s.music });
  };

  const toggleSfx = () => {
    dispatch({ type: 'SET_SFX', value: !s.sfx });
  };

  const handleExport = () => {
    const code = exportSave(s);
    setExportCode(code);
    setSaveMsg('Save code generated! Copy to clipboard.');
  };

  const handleCopy = () => {
    if (!exportCode) return;
    navigator.clipboard?.writeText(exportCode);
    setSaveMsg('Save code copied to clipboard!');
  };

  const handleImport = () => {
    if (!importCode.trim()) {
      setSaveMsg('Please paste a save code first.');
      return;
    }
    dispatch({ type: 'IMPORT_SAVE', code: importCode.trim() });
    setSaveMsg('Save data successfully imported!');
  };

  const handleReset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      setTimeout(() => setResetArmed(false), 4000);
      return;
    }
    dispatch({ type: 'RESET_SAVE' });
    setSaveMsg('Save data wiped. Started fresh!');
    setResetArmed(false);
  };

  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home">
          <HomeIcon />
        </button>
        <div>
          <div className="sel-title">SETTINGS</div>
          <div className="sel-sub">AUDIO · SAVE DATA · ABOUT</div>
        </div>
      </div>

      {/* Settings list */}
      <div className="scroll-content" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Music Row */}
        <div className="set-row">
          <div className="set-main">
            <div className="set-name">MUSIC</div>
            <div className="set-desc">Synthesized audio loops for menus and battles.</div>
          </div>
          <button
            className={`set-toggle ${!s.music ? 'off' : ''}`}
            onClick={toggleMusic}
          >
            {s.music ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* SFX Row */}
        <div className="set-row">
          <div className="set-main">
            <div className="set-name">SOUND FX</div>
            <div className="set-desc">Slap impacts, critical hits, coin chimes and roars.</div>
          </div>
          <button
            className={`set-toggle ${!s.sfx ? 'off' : ''}`}
            onClick={toggleSfx}
          >
            {s.sfx ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* How to play link */}
        <div className="set-row">
          <div className="set-main">
            <div className="set-name">HOW TO PLAY</div>
            <div className="set-desc">The rules of slapping — frenzy, growth, bosses and hard mode.</div>
          </div>
          <button className="set-toggle" onClick={() => go('help')}>
            READ
          </button>
        </div>

        {/* Test Mode */}
        <div className="set-row">
          <div className="set-main">
            <div className="set-name">TEST MODE</div>
            <div className="set-desc">Instantly unlocks all 100 enemies for testing and fighting.</div>
          </div>
          <button
            className={`set-toggle ${!state.testMode ? 'off' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_TEST_MODE' })}
          >
            {state.testMode ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Unlock All Enemies */}
        <div className="set-row">
          <div className="set-main">
            <div className="set-name">UNLOCK ALL ENEMIES</div>
            <div className="set-desc">Permanently set roster unlock count to 100.</div>
          </div>
          <button
            className="set-toggle"
            style={{ background: '#4a3b2c', color: '#f2b01e' }}
            onClick={() => {
              dispatch({ type: 'UNLOCK_ALL_ENEMIES' });
              setSaveMsg('All 100 enemies unlocked in save data!');
            }}
          >
            UNLOCK ALL
          </button>
        </div>

        {/* Export / Import Save Data */}
        <div className="set-row col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
          <div className="set-main">
            <div className="set-name">SAVE DATA · EXPORT / IMPORT</div>
            <div className="set-desc">
              Backup your save code to move it to another device or browser.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button className="set-toggle" style={{ flex: 1 }} onClick={handleExport}>
              EXPORT SAVE
            </button>
            {exportCode && (
              <button className="set-toggle" style={{ flex: 1, background: 'var(--chrome)', border: '2px solid var(--chrome-edge)', color: 'var(--ink)' }} onClick={handleCopy}>
                COPY CODE
              </button>
            )}
          </div>

          {exportCode && (
            <textarea
              readOnly
              value={exportCode}
              rows={3}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'monospace',
                fontSize: '11px',
                padding: '8px',
                borderRadius: '8px',
                border: '2px solid var(--chrome-edge)',
                background: '#fffdf6',
                color: 'var(--ink)'
              }}
            />
          )}

          <div style={{ marginTop: '8px' }}>
            <textarea
              placeholder="Paste a save code here to import it..."
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              rows={2}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'monospace',
                fontSize: '11px',
                padding: '8px',
                borderRadius: '8px',
                border: '2px solid var(--chrome-edge)',
                background: '#fffdf6',
                color: 'var(--ink)'
              }}
            />
            <button
              className="set-toggle"
              style={{ width: '100%', marginTop: '6px' }}
              onClick={handleImport}
            >
              IMPORT SAVE
            </button>
          </div>

          {saveMsg && (
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#3d7a24', marginTop: '4px', textAlign: 'center' }}>
              {saveMsg}
            </div>
          )}
        </div>

        {/* Reset Save Data */}
        <div className="set-row">
          <div className="set-main">
            <div className="set-name">RESET SAVE</div>
            <div className="set-desc">Wipe coins, gems, progress and skins. Cannot be undone!</div>
          </div>
          <button
            className={`set-toggle danger-btn ${resetArmed ? 'armed' : ''}`}
            onClick={handleReset}
          >
            {resetArmed ? 'CONFIRM RESET?' : 'RESET SAVE'}
          </button>
        </div>

        {/* About Block */}
        <div style={{ textAlign: 'center', padding: '16px 8px', marginTop: '10px' }}>
          <div style={{ fontFamily: 'Bungee, sans-serif', fontSize: '16px', letterSpacing: '.05em' }}>
            THESE HANDS
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink-soft)', marginTop: '4px' }}>
            Version 1.1.0 · React Edition
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-soft)', marginTop: '2px' }}>
            Progress auto-saved in local browser storage.
          </div>
        </div>

      </div>
    </div>
  );
}
