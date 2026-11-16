# Graph Report - these-hands  (2026-11-16)

## Corpus Check
- 52 files · ~104,202 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 831 nodes · 2172 edges · 48 communities (37 shown, 11 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `122a1ecc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useGame
- package.json
- initGameEngine
- gameEngine.js
- ref_fs
- fmtNum
- renderHub
- SkillEffectType
- GameContext.jsx
- MathPixelCanvas
- Icons.jsx
- switchTab
- dependencies
- castSpecial
- nativeBridge.js
- ExampleInstrumentedTest.java
- MainActivity.java
- tutShow
- GameAudio
- vite
- .oxlintrc.json
- scripts
- generate_android_icons.cjs
- PerkEffectType
- update
- BalanceConfig.cs
- applyHit
- BalanceConfig
- BattleScreen.jsx
- AttributeType
- RelicEffectType
- artData.js
- SpecialMoveEffectType
- EnemyTag
- doReset
- CornermanCardId
- hasSkill
- StreetBrawlAnomaly
- SkillActivationTrigger
- loseFight
- AwardsScreen.jsx

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 356 edges
2. `fmtNum()` - 45 edges
3. `update()` - 37 edges
4. `switchTab()` - 36 edges
5. `BalanceConfig` - 35 edges
6. `applyHit()` - 35 edges
7. `stats()` - 29 edges
8. `SkillEffectType` - 28 edges
9. `useGame()` - 28 edges
10. `hasSkill()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `initGameEngine()`  [EXTRACTED]
  src/App.jsx → src/game/gameEngine.js
- `BattleScreen()` --calls--> `useGame()`  [EXTRACTED]
  src/components/BattleScreen.jsx → src/context/GameContext.jsx
- `BattleScreen()` --calls--> `computeEnemyHp()`  [EXTRACTED]
  src/components/BattleScreen.jsx → src/game/engine.js
- `initGameEngine()` --calls--> `getProgressionCaps()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `progressionCaps()` --calls--> `getProgressionCaps()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (48 total, 11 thin omitted)

### Community 0 - "useGame"
Cohesion: 0.14
Nodes (19): HELP_CARDS, HelpScreen(), CoinIcon(), HomeIcon(), LevelsScreen(), LevelUpModal(), SettingsScreen(), fmtCoins() (+11 more)

### Community 1 - "package.json"
Cohesion: 0.17
Nodes (15): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, name, private (+7 more)

### Community 2 - "initGameEngine"
Cohesion: 0.05
Nodes (55): initGameEngine(), atkRefDps(), blitzPayText(), bossBgImg(), btLeague(), buildBlitzTiersPanel(), closeMockCheckout(), closeStoreCheckoutModal() (+47 more)

### Community 3 - "gameEngine.js"
Cohesion: 0.11
Nodes (34): ENEMY_ART, makeSprite(), calcAttrCap(), calcAttrCost(), calcEnemyBounty(), calcEnemyDamage(), calcEnemyHp(), calcEnemyInterval() (+26 more)

### Community 4 - "ref_fs"
Cohesion: 0.08
Nodes (18): code, fs, fs, i, src, fs, i, src (+10 more)

### Community 5 - "fmtNum"
Cohesion: 0.12
Nodes (43): applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), creditCoinsQuiet() (+35 more)

### Community 6 - "renderHub"
Cohesion: 0.09
Nodes (48): abilitiesHtml(), attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort() (+40 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.08
Nodes (26): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+18 more)

### Community 8 - "GameContext.jsx"
Cohesion: 0.21
Nodes (20): ATTR_DESCS, AttrsScreen(), fmtNum(), QuestsScreen(), GameCtx, GameProvider(), reducer(), ACHIEVEMENTS (+12 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "Icons.jsx"
Cohesion: 0.18
Nodes (15): react, AchToast(), ENEMY_EMOJIS, fmtNum(), HomeScreen(), BoltIcon(), GemIcon(), GridIcon() (+7 more)

### Community 11 - "switchTab"
Cohesion: 0.05
Nodes (71): activateCoinBoost(), activateDmgBoost(), ascendRelic(), buyArt(), checkAchievements(), chestPreview(), chestUnlocked(), chooseEnemy() (+63 more)

### Community 12 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor/splash-screen@^8.0.2, react@^19.3.1, react-dom@^19.3.1 (+6 more)

### Community 13 - "castSpecial"
Cohesion: 0.25
Nodes (16): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+8 more)

### Community 14 - "nativeBridge.js"
Cohesion: 0.16
Nodes (9): @capacitor/core@^8.6.0, @capacitor/status-bar@^8.0.4, @revenuecat/purchases-capacitor@^14.0.0, @capacitor/core, @capacitor/status-bar, @revenuecat/purchases-capacitor, App(), NativeBridge (+1 more)

### Community 17 - "tutShow"
Cohesion: 0.31
Nodes (9): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutGate(), tutNav(), tutPlace(), tutShow() (+1 more)

### Community 19 - "vite"
Cohesion: 0.33
Nodes (4): vite@^8.3.4, @vitejs/plugin-react@^6.1.2, vite, @vitejs/plugin-react

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "generate_android_icons.cjs"
Cohesion: 0.25
Nodes (7): densities, fs, generate(), path, resDir, sharp, srcIcon

### Community 30 - "PerkEffectType"
Cohesion: 0.10
Nodes (21): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+13 more)

### Community 31 - "update"
Cohesion: 0.12
Nodes (38): abilityDef(), advanceEndless(), advanceGauntlet(), advanceRush(), applyBossEffect(), applySignatureHit(), braceBlock(), braceCdTotal() (+30 more)

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.12
Nodes (14): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, HandSkinConfig, RealMoneyBundleConfig, SkinId (+6 more)

### Community 33 - "applyHit"
Cohesion: 0.14
Nodes (29): adDmgBoostActive(), applyHit(), applySpecialHit(), bountyTpl(), coinTarget(), contractsHtml(), enemyGeom(), frontierIdx() (+21 more)

### Community 35 - "BattleScreen.jsx"
Cohesion: 0.22
Nodes (12): audio, BattleScreen(), ENEMY_EMOJIS, HeartIcon(), PauseIcon(), PlayIcon(), SoundIcon(), SoundOffIcon() (+4 more)

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "artData.js"
Cohesion: 0.15
Nodes (12): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, HAND_URI, ICON_URL_CACHE, iconUrl(), PRINT_URI, renderSprite() (+4 more)

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.15
Nodes (11): SpecialMoveConfig, SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration, SpecialMoveId (+3 more)

### Community 40 - "EnemyTag"
Cohesion: 0.15
Nodes (13): EnemyConfig, EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss (+5 more)

### Community 41 - "doReset"
Cohesion: 0.18
Nodes (11): defaultAttrs(), defaultChest(), defaultDaily(), defaultStats(), doReset(), hideEndOverlay(), setRunning(), setSfx() (+3 more)

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 43 - "hasSkill"
Cohesion: 0.31
Nodes (10): activateFrenzy(), claimSkillReward(), hasArt(), hasPrecision(), hasSkill(), precisionSlap(), tickWeakSpot(), updateFrenzyBar() (+2 more)

### Community 44 - "StreetBrawlAnomaly"
Cohesion: 0.29
Nodes (7): AnomalyConfig, StreetBrawlAnomaly, Berserker, None, Pinata, SlapStorm, SuddenDeath

### Community 45 - "SkillActivationTrigger"
Cohesion: 0.33
Nodes (6): SkillActivationTrigger, ActiveDurationState, AlwaysOn, OnLowHpState, ProcEveryNSlaps, ProcOnHit

### Community 46 - "loseFight"
Cohesion: 0.33
Nodes (6): clearAttackTimeouts(), consumeAdDmgAttempt(), consumeAdDmgWin(), fireBossSpecial(), hideBossWarn(), loseFight()

### Community 47 - "AwardsScreen.jsx"
Cohesion: 0.50
Nodes (4): ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS

## Knowledge Gaps
- **109 isolated node(s):** `Power`, `Speed`, `CritChance`, `CritDamage`, `Defense` (+104 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 233 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `applyHit`, `gameEngine.js`, `fmtNum`, `renderHub`, `doReset`, `switchTab`, `hasSkill`, `castSpecial`, `nativeBridge.js`, `loseFight`, `tutShow`, `update`?**
  _High betweenness centrality (0.423) - this node is a cross-community bridge._
- **Are the 30 inferred relationships involving `initGameEngine()` (e.g. with `attrCost()` and `buyLevel()`) actually correct?**
  _`initGameEngine()` has 30 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Power`, `Speed`, `CritChance` to the rest of the system?**
  _109 weakly-connected nodes found - possible missing edges._
- **Should `useGame` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Icons.jsx` to `useGame`, `package.json`, `BattleScreen.jsx`, `GameContext.jsx`, `dependencies`, `nativeBridge.js`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.052464947987336044 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `package.json` to `generate_android_icons.cjs`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._