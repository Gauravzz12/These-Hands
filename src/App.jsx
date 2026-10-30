import React, { useEffect } from 'react';
import { initGameEngine } from './game/gameEngine.js';

export default function App() {
  useEffect(() => {
    initGameEngine();
  }, []);

  return (
    <>
<div id="bootShell" role="status" aria-label="Loading Idle-Slapper">
      <div className="bs-logo">IDLE<br /><span>SLAPPER</span></div>
      <img className="bs-hand" src="data:image/webp;base64,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" alt="" />
      <div className="bs-bar"><i id="bsFill"></i></div>
      <div className="bs-pct" id="bsPct">0%</div>
      <div className="bs-tip" id="bsTip">Warming up the hands…</div>
    </div>
    
    <div id="app" data-screen="home">
      <header id="hud">
        <button className="home-btn" id="hudHomeBtn" aria-label="Back to home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg>
        </button>
        <div className="pill" id="coinPill" aria-label="Coins">
          <svg className="coin-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#fde047" stroke="#652b00" strokeWidth="1.8"/><circle cx="12" cy="12" r="6.5" fill="#eab308" stroke="#a16207" strokeWidth="1.1"/><path d="M12 8.5v7M8.5 12h7" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="1.5" fill="#ffffff"/><path d="M6 10a7 7 0 0 1 8-4" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"/></svg>
          <span id="coinCount">0</span>
        </div>
        <div className="pill gem" id="gemPill" aria-label="Gems">
          <svg className="gem-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l4 6-9 12L3 9l4-6z" fill="#39c2d8" stroke="#177e96" strokeWidth="1.6" strokeLinejoin="round"/><path d="M3 9h18M12 21 8.5 9 12 3l3.5 6L12 21" fill="none" stroke="#177e96" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          <span id="gemCount">0</span>
        </div>
        <div className="pill level" id="levelPill" aria-label="Player level">LV <span id="levelVal">1</span></div>
        <div className="hud-boosters" id="hudBoosters" style={{'display': 'none'}}>
          <span className="hud-boost-pill coin" id="hudBoostCoinPill" style={{'display': 'none'}}>
            💰 2x <b id="hudBoostCoinTime">10:00</b>
          </span>
          <span className="hud-boost-pill dmg" id="hudBoostDmgPill" style={{'display': 'none'}}>
            💥 2x <b id="hudBoostDmgTime">10:00</b>
          </span>
        </div>
      </header>

      <main id="pages">
      <section id="pageHome" className="page active" aria-label="Home">
        <div id="saveNotice" style={{'display': 'none'}} role="status" title="Tap to dismiss">Save data was corrupted — started fresh. Backup kept.<span className="sn-x" aria-hidden="true">✕</span></div>
        <div id="skinNotice" style={{'display': 'none'}} role="status" title="Tap to dismiss"><span className="sn-msg"></span><span className="sn-x" aria-hidden="true">✕</span></div>
        <div id="storageNotice" style={{'display': 'none'}} role="status" title="Tap to dismiss">Saving unavailable in this browser context — progress won't persist here.<span className="sn-x" aria-hidden="true">✕</span></div>
        
        <div className="hub-stage" id="hubStage" aria-hidden="true">
          <div className="hub-wall"></div>
          <div className="hub-floor"></div>
          <div className="hub-rug"></div>
          <span className="hub-spark s1"></span><span className="hub-spark s2"></span><span className="hub-spark s3"></span><span className="hub-spark s4"></span><span className="hub-spark s5"></span>
          <span className="hub-coin c1"></span><span className="hub-coin c2"></span><span className="hub-coin c3"></span>
          <div className="hub-guest-wrap" id="hubGuestWrap">
            <img id="hubGuest" alt="" />
            <div className="hub-podium"></div>
          </div>
          <div className="hub-burst" id="hubBurst"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 7.2L22 9.3l-5.8 4.9L18 22l-6-4.6L6 22l1.8-7.8L2 9.3l7.4-1.1L12 1z" fill="currentColor"/></svg></div>
          <div className="hub-guest-cap" id="hubGuestCap"><span className="cap-k">NEXT TARGET</span>TRAINING DUMMY</div>
          <div className="hub-hand-wrap left"><img id="hubHandL" src="data:," alt="" /></div>
          <div className="hub-hand-wrap right"><img id="hubHandR" src="data:," alt="" /></div>
        </div>

        <div className="hub-content">
          <div id="awayCard" role="dialog" aria-label="Offline earnings">
            <div className="away-inner">
              <div className="away-head">WHILE YOU WERE AWAY</div>
              <div className="away-sub" id="awayText"></div>
              <div className="away-amt" id="awayAmt"></div>
              <button id="awayClaim">CLAIM</button>
            </div>
          </div>

          <button type="button" id="chestCard" style={{'display': 'none'}} aria-label="Daily chest"></button>

          <div className="hub-boosters-row" id="hubBoostersRow">
            <div className="booster-slot">
              <button className="booster-circle-btn coin" id="boostCoinBtn" type="button" aria-label="Watch Ad for 10 min 2x Coins">
                <span className="b-ring-svg-wrap">
                  <svg viewBox="0 0 54 54" className="b-ring-svg">
                    <circle className="b-ring-bg" cx="27" cy="27" r="23" />
                    <circle className="b-ring-fill" id="boostCoinRing" cx="27" cy="27" r="23" />
                  </svg>
                </span>
                <span className="b-ico">💰</span>
                <span className="b-mult">2x</span>
                <span className="b-ad-badge">AD</span>
              </button>
              <div className="b-name">2x COINS</div>
              <div className="b-timer" id="boostCoinTimer">WATCH AD</div>
            </div>

            <div className="booster-center-showcase" id="hubBoosterShowcase">
              <div className="bcs-title">PASSIVE BUFFS</div>
              <div className="bcs-desc" id="hubBoosterShowcaseDesc">TAP TO BOOST 10 MINS</div>
            </div>

            <div className="booster-slot">
              <button className="booster-circle-btn dmg" id="boostDmgBtn" type="button" aria-label="Watch Ad for 10 min 2x Damage">
                <span className="b-ring-svg-wrap">
                  <svg viewBox="0 0 54 54" className="b-ring-svg">
                    <circle className="b-ring-bg" cx="27" cy="27" r="23" />
                    <circle className="b-ring-fill" id="boostDmgRing" cx="27" cy="27" r="23" />
                  </svg>
                </span>
                <span className="b-ico">💥</span>
                <span className="b-mult">2x</span>
                <span className="b-ad-badge">AD</span>
              </button>
              <div className="b-name">2x DAMAGE</div>
              <div className="b-timer" id="boostDmgTimer">WATCH AD</div>
            </div>
          </div>

          <button className="hub-battle-cta" data-goto="battle" id="hubBattleCta">
            <span className="hbc-ico">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M7 3 4 6l4 4 3-3-4-4zm10 0-4 4 3 3 4-4-3-3zM5 13c-1.2 1.5-2 3.4-2 5 1.9-.1 3.6-.8 5-2l-3-3zm14 0-3 3c1.4 1.2 3.1 1.9 5 2-.1-1.6-.8-3.5-2-5zM12 8l-2.5 2.5L12 13l2.5-2.5L12 8z" fill="currentColor"/></svg>
            </span>
            <span className="hbc-text">
              <span className="hbc-title">BATTLE</span>
              <span className="hbc-sub" id="hubBattleSub">VS TRAINING DUMMY</span>
            </span>
            <span className="hbc-arrow">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </span>
          </button>

          <div className="hub-grid">
            <button className="hub-card" data-goto="attrs" type="button">
              <span className="hc-ico red"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">ATTRIBUTES</span>
                <span className="hc-sub" id="hubAttrsSub">DPS 0</span>
              </span>
            </button>

            <button className="hub-card" data-goto="levels" type="button">
              <span className="hc-ico blue"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">STAGES</span>
                <span className="hc-sub" id="hubLevelsSub">1 / 100 UNLOCKED</span>
              </span>
            </button>

            <button className="hub-card" data-goto="skills" type="button">
              <span className="hc-ico gold"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">SKILLS</span>
                <span className="hc-sub" id="hubSkillsSub">1 / 24 OWNED</span>
              </span>
            </button>

            <button className="hub-card" data-goto="specials" type="button">
              <span className="hc-ico yellow"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">SPECIALS</span>
                <span className="hc-sub" id="hubSpecSub">0 / 5 UNLOCKED</span>
              </span>
            </button>

            <button className="hub-card" data-goto="quests" type="button" style={{ position: 'relative' }}>
              <span className="hc-ico purple"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 3h14a1 1 0 0 1 1 1v13.2a2 2 0 0 1-3.2 1.6L12 15.6l-4.8 3.2A2 2 0 0 1 4 17.2V4a1 1 0 0 1 1-1zm3 4v2h8V7H8zm0 4v2h5v-2H8z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">QUESTS</span>
                <span className="hc-sub" id="hubQuestsSub">DAILY CHALLENGES</span>
              </span>
              <span className="hi-badge" id="hubQuestBadge" style={{ display: 'none', position: 'absolute', top: '6px', right: '6px' }}></span>
            </button>

            <button className="hub-card" id="hubRushCard" type="button">
              <span className="hc-ico gold"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-1.6 10.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 7zm3.4 13.5h11.2V22H6.4v-1.5z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">BOSS RUSH</span>
                <span className="hc-sub" id="hubRushSub">BEAT 2 BOSSES TO UNLOCK</span>
              </span>
            </button>

            <button className="hub-card" id="hubEndlessCard" type="button">
              <span className="hc-ico blue"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M2 15c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0v3c-2-1.6-4-1.6-6 0s-4 1.6-6 0-4-1.6-6 0v-3zm0-5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0v3c-2-1.6-4-1.6-6 0s-4 1.6-6 0-4-1.6-6 0V10z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">ENDLESS</span>
                <span className="hc-sub" id="hubEndlessSub">BEST WAVE 0</span>
              </span>
            </button>

            <button className="hub-card" data-goto="shop" type="button">
              <span className="hc-ico green"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7 5.6 3h12.8L20 7H4zm0 2v10a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9h-5.5a2.75 2.75 0 0 1-5 0H4zm5.5 2.2a.8.8 0 0 1 1.5 0V13H9.5v-1.8z" fill="currentColor"/></svg></span>
              <span className="hc-main">
                <span className="hc-title">SHOP</span>
                <span className="hc-sub" id="hubShopSub">SKINS & GEMS</span>
              </span>
            </button>
          </div>

          <div className="hub-stats-card" id="hubStatsCard" data-goto="awards" style={{ cursor: 'pointer' }}>
            <div className="hsc-head">
              <span className="hsc-title">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
                  <path d="M12 2l2.4 7.2L22 9.3l-5.8 4.9 1.8 7.8L12 17.5 5.9 22l1.8-7.8L2 9.3l7.6-.1L12 2z" fill="#f59e0b"/>
                </svg>
                HERO RECORD
                <span className="hsc-claim-pill" id="hscClaimPill" style={{ display: 'none' }}>🎁 CLAIM</span>
              </span>
              <span className="hsc-badge" id="hscBadge">ROOKIE SLAPPER</span>
            </div>
            <div className="hsc-row">
              <div className="hsc-stat">
                <span className="hsc-val" id="hscKills">0</span>
                <span className="hsc-lbl">KNOCKOUTS</span>
              </div>
              <div className="hsc-stat">
                <span className="hsc-val" id="hscSlaps">0</span>
                <span className="hsc-lbl">TOTAL SLAPS</span>
              </div>
              <div className="hsc-stat">
                <span className="hsc-val" id="hscCombo">0</span>
                <span className="hsc-lbl">BEST COMBO</span>
              </div>
              <div className="hsc-stat">
                <span className="hsc-val" id="hscCoins">0</span>
                <span className="hsc-lbl">COINS WON</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'none' }} aria-hidden="true">
            <span id="hubCoinCount">0</span>
            <span id="hubGemCount">0</span>
            <span id="hubLevelVal">1</span>
            <span id="hubTestTag"></span>
            <span id="hubDoneTag"></span>
            <span id="hubDragonTag"></span>
            <span id="hubAwardsSub"></span>
            <span id="hubSettingsSub"></span>
            <span id="hubHelpSub"></span>
          </div>
        </div>
      </section>

      <section id="pageBattle" className="page" aria-label="Battle">
      <div id="enemyBar">
        <div id="enemyName">Training Dummy</div>
        <div id="enemyMeta"></div>
        <div id="hpTrack"><div id="hpFill"></div><span id="hpText"></span><span id="bossMark"><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M3 18h18l-1.5-9L14 13l-2-6-2 6-5.5-4L3 18zm0 2.2h18V22H3v-1.8z" fill="currentColor"/></svg></span></div>
      </div>


      <div id="stageWrap">
        <canvas id="game"></canvas>
        <div id="comboTag"></div>
        <div id="bossWarn" role="alert"></div>
        <div id="circleRail" aria-label="Battle actions">
          <div id="railSpecs"></div>
          <div className="rail-item" id="frenzyItem" style={{'display': 'none'}}>
            <button id="frenzyCircle" className="rail-circle" type="button" aria-label="Trigger FRENZY">
              <span className="rc-ring" aria-hidden="true"></span>
              <span className="rc-ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M13 2 4.5 13.5H11L9.8 22 19 10h-6.5L13 2z" fill="#ffb03a"/></svg></span>
            </button>
            <span className="rc-sub" id="frenzySub"></span>
          </div>
          <div className="rail-item" id="procItem" style={{'display': 'none'}}>
            <div id="procCircle" className="rail-circle" role="img" aria-label="Skin power charge">
              <img id="procCircImg" alt="" />
            </div>
            <span className="rc-sub" id="procCircTxt"></span>
          </div>
        </div>
      </div>

      <div id="fxChips" aria-live="polite"></div>
      <div id="playerBar" aria-label="Your health">
        <svg className="heart-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C6 16.5 2.5 12.8 2.5 8.9 2.5 5.9 4.9 3.5 7.9 3.5c1.7 0 3.2.8 4.1 2.1.9-1.3 2.4-2.1 4.1-2.1 3 0 5.4 2.4 5.4 5.4 0 3.9-3.5 7.6-9.5 12.1z" fill="#d63c30" stroke="#8f1f16" strokeWidth="1.4"/></svg>
        <div id="playerTrack"><div id="playerFill"></div><span id="playerText"></span></div>
        <span id="swTag" className="sw-tag" style={{'display': 'none'}}></span>
      </div>

      <div id="atkRow">
        <span className="atk-lbl">ENEMY ATTACK</span>
        <div id="atkTrack"><div id="atkFill"></div></div>
        <span id="atkTime">4.2s</span>
      </div>

      <section id="attrPanel" aria-label="Attributes">
        <div className="attr-head">
          <button id="attrToggle" aria-expanded="false" aria-controls="attrList">
            <span>ATTRIBUTES</span>
            <span className="cap" id="capNote"></span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button id="levelUpBtn"></button>
        </div>
        <div id="attrList"></div>
      </section>

      <footer id="controls">
        <button className="ctl-btn" id="pauseBtn" aria-label="Pause fight">
          <svg viewBox="0 0 24 24" id="pauseIco" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="5" height="16" rx="1" fill="currentColor"/></svg>
          <span id="pauseLbl">Pause</span>
        </button>
        <button className="ctl-btn auto-advance-btn" id="autoAdvanceBtn" aria-label="Toggle auto advance next enemy">
          <span className="auto-ico">⚡</span>
          <span id="autoAdvanceLbl">AUTO: OFF</span>
        </button>
        <div className="mid">
          <div id="killCount">KOs 0</div>
        </div>
        <div className="ctl-right">
          <button className="ctl-btn icon-btn" id="soundBtn" aria-label="Toggle sound">
            <svg viewBox="0 0 24 24" id="soundIco" aria-hidden="true"><path d="M4 9v6h4l6 5V4L8 9H4z" fill="currentColor"/><path className="wave" d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path className="wave" d="M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </footer>

      </section>

      <section id="pageAttrs" className="page" aria-label="Attributes">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">ATTRIBUTES</div>
            <div className="sel-sub" id="attrsSub"></div>
          </div>
          <div className="pill mini" id="attrsCoins" style={{'marginLeft': 'auto'}} aria-label="Coins"></div>
        </div>
        <div id="attrsScroll">
          <div className="attrs-top">
            <div className="atop-line">PLAYER LEVEL <b id="attrsLevelVal">1</b> · CAP <b id="attrsCapVal">5</b> PER ATTRIBUTE</div>
            <div className="atop-line" id="attrsDps"></div>
            <button id="attrsLevelUpBtn"></button>
          </div>
          <div id="attrsList"></div>
          <div className="aw-sec" style={{'margin': '20px 2px 6px', 'fontSize': '13px', 'letterSpacing': '1px'}}>LEVEL PERKS &amp; ABILITIES (LV 2 TO 20+)</div>
          <div id="perksHead"></div>
          <div id="perksIcons"></div>
          <div id="perksList"></div>
        </div>
      </section>

      <section id="pageLevels" className="page" aria-label="Levels">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">CHOOSE YOUR VICTIM</div>
            <div className="sel-sub" id="selProgress"></div>
          </div>
          <button className="set-toggle off mini test-mode-btn" id="levelsTestModeBtn" title="Toggle Test Mode to unlock all enemies" style={{'marginLeft': 'auto', 'fontSize': '11px', 'padding': '6px 10px'}}>TEST MODE</button>
        </div>
        <div id="selList"></div>
      </section>

      <section id="pageSkills" className="page" aria-label="Skill tree">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">SKILL TREE</div>
            <div className="sel-sub" id="skillOwned"></div>
          </div>
          <div className="pill" id="skillCoins" aria-label="Coins"></div>
        </div>
        <div id="skillTreeWrap"></div>
        <div id="skillDetail"></div>
        <div id="abilitiesWrap">
          <div className="aw-sec">LEVEL ABILITIES</div>
          <div className="sel-sub" style={{'marginBottom': '2px'}}>Granted automatically as you level up — permanent, no purchase needed.</div>
          <div id="abilitiesList"></div>
        </div>
      </section>

            <section id="pageSpecials" className="page" aria-label="Special skills">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9H21.5L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">SPECIALS</div>
            <div className="sel-sub" id="specSub"></div>
          </div>
          <div className="pill mini" id="specCoins" style={{'marginLeft': 'auto'}} aria-label="Coins"></div>
        </div>
        <div id="specScroll">
          <div id="specList"></div>
          <div className="pack-note">Specials drop from bosses #10, #30, #50, #70 and #90. Every upgrade adds +25% effect and trims the cooldown by 4%.</div>
        </div>
      </section>

<section id="pageAwards" className="page" aria-label="Awards and stats">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">AWARDS</div>
            <div className="sel-sub">LIFETIME STATS + ACHIEVEMENTS</div>
          </div>
          <button id="claimAllAwardsBtn" className="claim-all-btn" style={{'marginLeft': 'auto', 'display': 'none'}} aria-label="Claim all completed achievements">
            CLAIM ALL
          </button>
        </div>
        <div id="awardsScroll">
          <div className="aw-sec">LIFETIME STATS</div>
          <div id="statsGrid"></div>
          <div className="ach-head-row">
            <div className="aw-sec" id="achSecHead" style={{'margin': 0}}>ACHIEVEMENTS</div>
            <button id="claimAllAchBtn" className="claim-all-btn" style={{'display': 'none'}} aria-label="Claim all completed achievements">
              CLAIM ALL
            </button>
          </div>
          <div id="achList"></div>
        </div>
      </section>

      <section id="pageQuests" className="page" aria-label="Daily quests">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">DAILY QUESTS</div>
            <div className="sel-sub" id="questsSub">FRESH QUESTS EVERY DAY</div>
          </div>
        </div>
        <div id="questsScroll">
          <div id="questList"></div>
          <div className="pack-note">Quest progress counts today's play only. Rewards land the moment you claim; a new day brings a new set.</div>
          <button className="quest-done-btn" id="questsDoneBtn">DONE</button>
        </div>
      </section>

      <section id="pageHelp" className="page" aria-label="How to play">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">HOW TO PLAY</div>
            <div className="sel-sub">THE RULES OF SLAPPING</div>
          </div>
        </div>
        <div id="helpScroll">
          <div className="help-card"><div className="help-h">1 · YOUR HANDS DO THE WORK</div><p>Your hands slap on their own — your job is to make every slap count. Coins are paid on <b>every strike</b>, so even a fight you lose still earns. Unlock <b>FRENZY</b> in the skill tree, then land hits to charge its meter — misses don't charge it. When the meter is full, tap the glowing <b>FRENZY!</b> button mid-fight: 10 seconds of +50% damage and +30% speed, unleashed when YOU say so.</p></div>
          <div className="help-card"><div className="help-h">2 · GROW ON THREE FRONTS</div><p><b>Attributes</b> (Power, Speed, Crit, Combo…) are capped by your <b>player level</b> — level up to raise the cap, and every level also grants a permanent perk (Iron Palm, Thick Skin, Vampire Slap…). <b>Skills</b> from the tree are the third front: Second Hand doubles your slap rate, and bosses further in are mathematically impossible without the tree. Attributes alone won't carry you. <b>Precision Instinct</b> in the tree makes a gold weak spot flash on the enemy mid-fight — tap it for a guaranteed 2× crit. Fortune Luck makes it appear more often, with a per-fight cap so it never takes over.</p></div>
          <div className="help-card"><div className="help-h">3 · CLIMB THE ROSTER</div><p>Beat an enemy to unlock the next — 100 of them, in 20 groups, with a boss every 10th. Clearing an odd-numbered group (1, 3, 5, …) opens its <b>TRIO GAUNTLET</b> — the group's 3 toughest back-to-back, your HP carrying over — and beating it is <b>required</b> to unlock the next group. Even-numbered groups end in a boss instead — no trio needed there. Bosses enrage under 30% HP. Beaten enemies can be re-fought any time for coins, and every defeated enemy unlocks a <b>HARD</b> rematch on the Levels screen (red button): far tougher, pays 2.5× coins and a one-time gem.</p></div>
          <div className="help-card"><div className="help-h">4 · EVERY DAY COUNTS</div><p>Defeat the <b>Slime Blob (#5)</b> to unlock the <b>daily chest</b> — a 7-day login streak that pays coins every day and gems on day 7, with amounts that grow with your progress. Defeat the <b>Mischievous Monkey (#10)</b> to unlock <b>daily quests</b>. Check <b>Awards</b> for lifetime stats and achievements (every achievement pays gems), and spend gems in the <b>Shop</b> on hand skins, coin packs and the Offline Earnings unlock.</p></div>
          <div className="help-card"><div className="help-h">5 · WATCH THE COUNTDOWN</div><p>Enemies hit back on the timer under their HP bar. Your HP refills every fight, and levelling up is also defence. If you're walled, the answer is almost always: farm the best enemy you can beat, buy what's cheapest for damage, and come back.</p></div>
          <div className="help-card"><div className="help-h">6 · SPECIAL SKILLS</div><p>Bosses drop <b>special skills</b>: the Mischievous Monkey (#10) grants <b>Double Slap</b> — both hands at once — and #30, #50, #70 and #90 drop stronger ones: a meteor, an orbital laser, a pharaoh's curse, and finally <b>Zeus's Wrath</b>. Fire them from the specials rail in battle, and upgrade each one to Lv5 on the <b>Specials</b> screen. Equipped hand skins also grant small bonuses — check the Shop cards.</p></div>
        </div>
      </section>

      <section id="pageShop" className="page" aria-label="The Bazaar - Shop and Vault">
        <div className="sel-head shop-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title shop-title">THE BAZAAR</div>
            <div className="sel-sub" id="shopSub">VAULT · OFFERS · SKINS · PERKS</div>
          </div>
          <div style={{'marginLeft': 'auto', 'display': 'flex', 'gap': '6px', 'alignItems': 'center'}}>
            <div className="pill mini" id="shopCoins" aria-label="Coins"></div>
            <div className="pill gem mini" id="shopGems" aria-label="Gems"></div>
          </div>
        </div>
        <div className="shop-filter-bar" id="shopFilterBar" role="tablist">
          <button className="shop-filter-btn active" data-filter="all">ALL</button>
          <button className="shop-filter-btn" data-filter="gems">💎 GEMS</button>
          <button className="shop-filter-btn" data-filter="bundles">🎁 BUNDLES</button>
          <button className="shop-filter-btn" data-filter="perks">⚡ PERKS</button>
          <button className="shop-filter-btn" data-filter="skins">🥊 SKINS</button>
          <button className="shop-filter-btn" data-filter="coins">🪙 COIN PACKS</button>
        </div>
        <div id="shopScroll">
          <div id="shopPromo"></div>
          <div id="shopGemVault"></div>
          <div id="shopBundles"></div>
          <div id="shopFeatures"></div>
          <div id="shopList"></div>
          <div id="shopPacks"></div>
          <div id="shopFooter">
            <button className="skin-btn restore-btn" id="restoreBtn">RESTORE PURCHASES</button>
            <div className="pack-note">Re-applies any one-time bundle, VIP pass, or permanent feature previously acquired.</div>
            <div className="shop-sandbox-tag">🛡️ TEST STORE · NO REAL PAYMENT REQUIRED</div>
          </div>
        </div>
        <div id="shopToast" role="status"></div>
      </section>

      <section id="pageSettings" className="page" aria-label="Settings">
        <div className="sel-head">
          <button className="home-btn" data-goto="home" aria-label="Back to home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg></button>
          <div>
            <div className="sel-title">SETTINGS</div>
            <div className="sel-sub">MUSIC · SOUND FX · SAVE DATA</div>
          </div>
        </div>
        <div id="settingsBody">
          <div className="set-row">
            <div className="set-main"><div className="set-name">MUSIC</div><div className="set-desc">Synthesised loops — a calm one for the menus, a driving one for battle.</div></div>
            <button className="set-toggle" id="setMusicBtn" aria-pressed="true">ON</button>
          </div>
          <div className="set-row">
            <div className="set-main"><div className="set-name">SOUND FX</div><div className="set-desc">Slaps, coins, roars and clicks. The battle mute button is this same switch.</div></div>
            <button className="set-toggle" id="setSfxBtn" aria-pressed="true">ON</button>
          </div>
          <div className="set-row">
            <div className="set-main"><div className="set-name">HOW TO PLAY</div><div className="set-desc">The rules of slapping — frenzy, growth, bosses and hard mode, explained.</div></div>
            <button className="set-toggle" data-goto="help">READ</button>
          </div>
          <div className="set-row">
            <div className="set-main"><div className="set-name">GUIDED TOUR</div><div className="set-desc">Replay the first-loss walkthrough: attributes, levels and the skill tree, spotlighted step by step.</div></div>
            <button className="set-toggle" id="tutReplayBtn">START</button>
          </div>
          <div className="set-row">
            <div className="set-main"><div className="set-name">TEST MODE</div><div className="set-desc">Instantly unlocks all 100 enemies for testing and fighting. Toggle on/off anytime.</div></div>
            <button className="set-toggle off" id="setTestModeBtn" aria-pressed="false">OFF</button>
          </div>
          <div className="set-row">
            <div className="set-main"><div className="set-name">UNLOCK ALL ENEMIES</div><div className="set-desc">Permanently unlocks all 100 enemies in your save data.</div></div>
            <button className="set-toggle" id="unlockAllBtn" style={{'background': '#4a3b2c', 'color': '#f2b01e'}}>UNLOCK ALL</button>
          </div>
          <div className="set-row col">
            <div className="set-main"><div className="set-name">SAVE DATA — EXPORT / IMPORT</div><div className="set-desc">Your save lives only on this device — export a code to move it to another phone or browser. Codes are tamper-signed: an edited code won't load.</div></div>
            <div className="save-io">
              <button className="set-toggle" id="exportBtn">EXPORT SAVE</button>
              <textarea id="exportBox" className="save-box" rows="3" readOnly placeholder="Your save code appears here." style={{'display': 'none'}}></textarea>
              <button className="set-toggle ghost" id="copyCodeBtn" style={{'display': 'none'}}>COPY CODE</button>
              <textarea id="importBox" className="save-box" rows="3" placeholder="Paste a save code here to import it."></textarea>
              <button className="set-toggle" id="importBtn">IMPORT SAVE</button>
              <div className="save-msg" id="saveIoMsg" role="status"></div>
            </div>
          </div>
          <div className="set-row danger">
            <div className="set-main"><div className="set-name">RESET SAVE</div><div className="set-desc">Wipe coins, gems, progress, skills and skins — everything. Can't be undone.</div></div>
            <button className="set-toggle danger-btn" id="setResetBtn">RESET SAVE</button>
          </div>
          <div className="about-block">
            <div className="about-title">IDLE SLAPPER</div>
            <div className="about-line" id="aboutVersion">Version 1.1.0 · Specials & Frenzy</div>
            <div className="about-line">All progress is stored only on this device — nothing leaves it.</div>
            <div className="about-line">Privacy Policy — coming with the store release.</div>
          </div>
        </div>
      </section>
      </main>

      <div id="endOverlay" role="dialog" aria-label="Fight result">
        <div className="end-rays" aria-hidden="true"></div>
        <div className="end-card">
          <div id="endTrophy" style={{'display': 'none'}}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v3h4v2a5 5 0 0 1-5 5h-.42A6 6 0 0 1 13 15.92V18h4v3H7v-3h4v-2.08A6 6 0 0 1 7.42 12H7a5 5 0 0 1-5-5V5h4V2zm-2 5a3 3 0 0 0 3 3V7H4zm16 0h-3v3a3 3 0 0 0 3-3z" fill="currentColor"/></svg></div>
          <div className="end-head" id="endHead">KNOCKOUT!</div>
          <img id="endSprite" alt="" />
          <div className="end-sub" id="endSub"></div>
          <div className="end-unlock" id="endUnlock"></div>
          <div className="end-stats" id="endStats"></div>
          <div className="end-tip" id="endTip"></div>
          <div id="endAdDoubleWrap" className="end-ad-double-wrap">
            <button className="end-ad-double-btn" id="endAdDoubleBtn" type="button">
              <span className="ead-icon">🎬</span>
              <span className="ead-text" id="endAdDoubleText">WATCH AD TO DOUBLE REWARDS</span>
              <span className="ead-bonus" id="endAdDoubleBonus">+0</span>
            </button>
          </div>
          <div className="end-btns">
            <button className="ctl-btn end-next" id="nextBtn">NEXT VICTIM →</button>
            <button className="ctl-btn end-again" id="againBtn">FIGHT AGAIN</button>
            <button className="ctl-btn end-choose" id="chooseBtn">CHOOSE ENEMY</button>
            <button className="ctl-btn end-home" id="endHomeBtn" style={{'display': 'none'}}>HOME</button>
          </div>
        </div>
      </div>

      <div id="startMenu" className="open" role="dialog" aria-label="Start menu">
        <div className="menu-top-bar">
          <button id="menuMusicBtn" aria-label="Toggle music" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l6 5V4L8 9H4z" fill="currentColor"/><path className="mwave" d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path className="mwave" d="M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
        </div>
        <div className="menu-header">
          <div className="menu-logo">THESE<br /><span>HANDS</span></div>
        </div>
        <div className="menu-stage" aria-hidden="true">
          <div className="floor"></div>
          <div className="rug"></div>
          <img id="menuEnemy" alt="" />
          <img id="menuHand" alt="" />
          <div className="menu-burst"></div>
        </div>
        <div className="menu-actions">
          <button id="playBtn">PLAY</button>
        </div>
      </div>

      <div id="playLoader" role="status" aria-label="Loading">
      <div className="pl-logo">THESE<br /><span>HANDS</span></div>
      <img className="pl-hand" src="data:image/webp;base64,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" alt="" />
      <div className="pl-bar"><i id="playFill"></i></div>
      <div className="pl-pct" id="playPct"></div>
      <div className="pl-tip" id="playTip">Warming up the hands…</div>
    </div>

<div id="introOverlay" role="dialog" aria-label="Welcome to Idle-Slapper">
        <div className="intro-card" id="introCard">
          <div className="intro-k" id="introK">1 / 3</div>
          <div className="intro-h" id="introH"></div>
          <p className="intro-p" id="introP"></p>
          <div className="intro-dots" id="introDots"><i className="on"></i><i></i><i></i></div>
          <button className="ctl-btn intro-next" id="introNext">NEXT</button>
          <button className="intro-skip" id="introSkip">Skip intro</button>
        </div>
      </div>

      <div id="adModal" role="dialog" aria-label="Rewarded Advertisement" style={{'display': 'none'}}>
        <div className="ad-card">
          <div className="ad-header-row">
            <span className="ad-badge">🎬 SPONSORED AD</span>
            <span className="ad-countdown" id="adCountdown">Reward in 2s</span>
          </div>
          <div className="ad-media-box">
            <div className="ad-screen-icon" id="adScreenIcon">📺</div>
            <div className="ad-sponsor-title" id="adSponsorTitle">Slap Master 3D</div>
            <div className="ad-tagline" id="adTagline">Maximum slaps. Zero cooldown. Play now!</div>
            <div className="ad-loading-dots"><span></span><span></span><span></span></div>
          </div>
          <div className="ad-progress-bar"><div className="ad-progress-fill" id="adProgressFill"></div></div>
          <button className="ctl-btn ad-claim-btn" id="adClaimBtn" style={{'display': 'none'}}>CLAIM REWARD ✕</button>
        </div>
      </div>

      <div id="mockCheckout" role="dialog" aria-label="Mock checkout">
        <div className="mock-card">
          <div className="mock-badge">🛡️ SANDBOX TEST STORE</div>
          <div className="mock-head">CONFIRM ORDER</div>
          <div className="mock-note">Simulation Mode: No real currency is charged. Try all bundles, gem hoards, and VIP passes freely.</div>
          <div className="mock-item" id="mockItemName"></div>
          <div className="mock-lines" id="mockLines"></div>
          <div className="mock-total" id="mockTotal"></div>
          <div className="mock-btns">
            <button className="ctl-btn" id="mockCancel">CANCEL</button>
            <button className="ctl-btn end-again" id="mockConfirm">CONFIRM PURCHASE</button>
          </div>
        </div>
      </div>

      <div id="bossIntro" role="dialog" aria-label="Boss fight intro">
        <div className="bi-warn">⚠ BOSS FIGHT ⚠</div>
        <img id="biSprite" alt="" />
        <div className="bi-name" id="biName"></div>
        <div className="bi-spec" id="biSpec"></div>
        <div className="bi-sub">TAP TO SKIP</div>
      </div>

      <div id="levelUpOverlay" role="dialog" aria-label="Level up">
        <div className="lu-card">
          <div className="lu-head" id="luHead">LEVEL 2!</div>
          <div className="lu-ability">
            <div className="lu-icon"><img id="luIcon" alt="" /></div>
            <div>
              <div className="lu-new" id="luNew">NEW ABILITY</div>
              <div className="lu-name" id="luName"></div>
              <div className="lu-fx" id="luFx"></div>
            </div>
          </div>
          <div className="lu-hint">TAP TO KEEP SLAPPING</div>
        </div>
      </div>

      <div id="achToast" role="status"></div>
      <div id="hangToast" role="alert">
        <span id="hangMsg"></span>
        <button id="hangRetry" type="button">RETRY</button>
        <button id="hangDismiss" type="button" aria-label="Dismiss">✕</button>
      </div>

      <nav id="bottomNav" aria-label="Main Navigation">
        <button className="bnav-btn active" data-tab="home" data-goto="home" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg>
          <span>HOME</span>
        </button>
        <button className="bnav-btn" data-tab="attrs" data-goto="attrs" aria-label="Attributes">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/></svg>
          <span>ATTRS</span>
        </button>
        <button className="bnav-btn" data-tab="skills" data-goto="skills" aria-label="Skills">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" fill="currentColor"/></svg>
          <span>SKILLS</span>
        </button>
        <button className="bnav-btn" data-tab="levels" data-goto="levels" aria-label="Stages">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor"/></svg>
          <span>STAGES</span>
        </button>
        <button className="bnav-btn" data-tab="awards" data-goto="awards" id="bnavAwardsBtn" aria-label="Achievements">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v3h4v2a5 5 0 0 1-5 5h-.42A6 6 0 0 1 13 15.92V18h4v3H7v-3h4v-2.08A6 6 0 0 1 7.42 12H7a5 5 0 0 1-5-5V5h4V2zm-2 5a3 3 0 0 0 3 3V7H4zm16 0h-3v3a3 3 0 0 0 3-3z" fill="currentColor"/></svg>
          <span>AWARDS</span>
          <span className="bnav-badge" id="bnavAwardsBadge" style={{ display: 'none' }}>0</span>
        </button>
        <button className="bnav-btn" data-tab="more" id="bnavMoreBtn" aria-label="More sections">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="2.2" fill="currentColor"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><circle cx="19" cy="12" r="2.2" fill="currentColor"/></svg>
          <span>MORE</span>
        </button>
      </nav>

      <div id="moreSheetOverlay" className="sheet-overlay" style={{'display': 'none'}}>
        <div id="moreSheet" className="more-sheet" role="dialog" aria-label="More options">
          <div className="sheet-handle"></div>
          <div className="more-list">
            <button className="more-row" data-goto="shop">
              <span className="mr-ico gold"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7 5.6 3h12.8L20 7H4zm0 2v10a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9h-5.5a2.75 2.75 0 0 1-5 0H4zm5.5 2.2a.8.8 0 0 1 1.5 0V13H9.5v-1.8z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">SHOP</span>
                <span className="mr-sub">SKINS, GEMS & BUNDLES</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>
            <button className="more-row" data-goto="attrs">
              <span className="mr-ico orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">ATTRIBUTES</span>
                <span className="mr-sub" id="moreAttrsSub">LEVEL 1 · CAP 5 · DPS 5</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>
            <button className="more-row" data-goto="specials">
              <span className="mr-ico yellow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">SPECIALS</span>
                <span className="mr-sub" id="moreSpecSub">0 / 5 UNLOCKED</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>
            <button className="more-row" data-goto="quests">
              <span className="mr-ico orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14a1 1 0 0 1 1 1v13.2a2 2 0 0 1-3.2 1.6L12 15.6l-4.8 3.2A2 2 0 0 1 4 17.2V4a1 1 0 0 1 1-1zm3 4v2h8V7H8zm0 4v2h5v-2H8z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">QUESTS</span>
                <span className="mr-sub" id="moreQuestsSub">🔒 DEFEAT THE MONKEY (#10)</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>
            <button className="more-row" data-goto="awards">
              <span className="mr-ico gold"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v3h4v2a5 5 0 0 1-5 5h-.42A6 6 0 0 1 13 15.92V18h4v3H7v-3h4v-2.08A6 6 0 0 1 7.42 12H7a5 5 0 0 1-5-5V5h4V2zm-2 5a3 3 0 0 0 3 3V7H4zm16 0h-3v3a3 3 0 0 0 3-3z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">AWARDS</span>
                <span className="mr-sub" id="moreAwardsSub">0 / 104 DONE</span>
              </span>
              <span className="mr-badge" id="moreAwardsBadge" style={{ display: 'none' }}>0</span>
              <span className="mr-arrow">›</span>
            </button>
            <button className="more-row" data-goto="help">
              <span className="mr-ico gold"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.2 15.6a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM12 5.5c1.9 0 3.3 1.2 3.3 2.9 0 1.4-.9 2.1-1.8 2.7-.6.4-.8.6-.9 1.3h-1.7c.1-1.6.7-2.2 1.5-2.8.4-.3.7-.5.7-1 0-.6-.5-1-1.1-1-.7 0-1.2.4-1.3 1.3H8.9C9 6.6 10.2 5.5 12 5.5z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">HOW TO PLAY</span>
                <span className="mr-sub">THE RULES OF SLAPPING</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>
            <button className="more-row" data-goto="settings">
              <span className="mr-ico orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.7 7.7 0 0 0-1.7-1L14.8 3H9.2L8.7 5.6a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.7 7.7 0 0 0 1.7 1l.5 2.6h5.6l.5-2.6a7.7 7.7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">SETTINGS</span>
                <span className="mr-sub">MUSIC ON · SFX ON</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
