# Graph Report - these-hands  (2026-11-22)

## Corpus Check
- 50 files · ~103,263 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 890 nodes · 2493 edges · 50 communities (39 shown, 11 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e08b99b9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useGame
- package.json
- initGameEngine
- cloudSave.js
- hasSkill
- fmtNum
- renderHub
- SkillEffectType
- enemyGeom
- MathPixelCanvas
- update
- .store
- dependencies
- castSpecial
- gameEngine.js
- ExampleInstrumentedTest.java
- MainActivity.java
- main.jsx
- GameAudio
- Icons.jsx
- .oxlintrc.json
- scripts
- GameContext.jsx
- PerkEffectType
- loseFight
- BalanceConfig.cs
- applyHit
- BalanceConfig
- BattleScreen.jsx
- AttributeType
- RelicEffectType
- nativeBridge.js
- SpecialMoveEffectType
- EnemyTag
- vite
- CornermanCardId
- enemySpritesV2.js
- StreetBrawlAnomaly
- SkillActivationTrigger
- artData.js
- generate_android_icons.cjs
- SkinId
- AwardsScreen.jsx

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 399 edges
2. `fmtNum()` - 47 edges
3. `switchTab()` - 39 edges
4. `update()` - 38 edges
5. `applyHit()` - 37 edges
6. `BalanceConfig` - 36 edges
7. `hasSkill()` - 32 edges
8. `stats()` - 32 edges
9. `renderHub()` - 31 edges
10. `SkillEffectType` - 29 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --indirect_call--> `cloudGetStatus()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --indirect_call--> `compareSaveObjs()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --calls--> `getProgressionCaps()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `initGameEngine()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `attrCost()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (50 total, 11 thin omitted)

### Community 0 - "useGame"
Cohesion: 0.13
Nodes (21): react, HELP_CARDS, HelpScreen(), CoinIcon(), HomeIcon(), LevelsScreen(), LevelUpModal(), SettingsScreen() (+13 more)

### Community 1 - "package.json"
Cohesion: 0.17
Nodes (15): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, name, private (+7 more)

### Community 2 - "initGameEngine"
Cohesion: 0.04
Nodes (67): getLevelMasteryMultiplier(), initGameEngine(), abilityDef(), atkRefDps(), blitzPayText(), bossBgImg(), btLeague(), buildBlitzTiersPanel() (+59 more)

### Community 3 - "cloudSave.js"
Cohesion: 0.17
Nodes (21): @capacitor-firebase/authentication, clearedCount(), cloudBoot(), cloudGetStatus(), cloudGoogle(), cloudNotifySaved(), cloudSignOut(), cloudSyncNow() (+13 more)

### Community 4 - "hasSkill"
Cohesion: 0.19
Nodes (16): activateFrenzy(), claimSkillReward(), cycleInterval(), drawHands(), drawHandSprite(), hasPrecision(), hasSkill(), mix() (+8 more)

### Community 5 - "fmtNum"
Cohesion: 0.10
Nodes (48): getDojoMasterChestReward(), applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward() (+40 more)

### Community 6 - "renderHub"
Cohesion: 0.08
Nodes (54): getProgressionCaps(), abilitiesHtml(), attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate() (+46 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.07
Nodes (27): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+19 more)

### Community 8 - "enemyGeom"
Cohesion: 0.16
Nodes (14): draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawSpecialFx(), drawWeakSpot(), frame(), fxDraw() (+6 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "update"
Cohesion: 0.14
Nodes (30): applyHit(), applySpecialHit(), checkDojoShowdown(), coinTarget(), endBossIntro(), enemyCurInterval(), enemyGeom(), hasArt() (+22 more)

### Community 11 - ".store"
Cohesion: 0.05
Nodes (85): activateCoinBoost(), activateDmgBoost(), ascendRelic(), buyArt(), checkAchievements(), chestPreview(), chestUnlocked(), chooseEnemy() (+77 more)

### Community 12 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, @capacitor/android@^8.6.0, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor-firebase/authentication@^8.6.0, firebase@^12.19.0, react@^19.3.1, @revenuecat/purchases-capacitor@^14.0.0 (+5 more)

### Community 13 - "castSpecial"
Cohesion: 0.24
Nodes (17): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), progressDojoCumulative(), renderSpecials(), renderSpecRail(), renderSpecRailCd() (+9 more)

### Community 14 - "gameEngine.js"
Cohesion: 0.15
Nodes (22): ATTRIBUTE_COSTS_V33, BELT_RANKS, buildCumulativeContract(), buildShowdownContract(), calcPlayerMaxHp(), calculateSlapCoins(), canLevelUp(), CHAPTER_CAPS (+14 more)

### Community 17 - "main.jsx"
Cohesion: 0.33
Nodes (4): react-dom@^19.3.1, react-dom, App(), NativeBridge

### Community 19 - "Icons.jsx"
Cohesion: 0.19
Nodes (14): AchToast(), ENEMY_EMOJIS, fmtNum(), HomeScreen(), BoltIcon(), GemIcon(), GridIcon(), HelpIcon() (+6 more)

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "GameContext.jsx"
Cohesion: 0.18
Nodes (23): ATTR_DESCS, AttrsScreen(), fmtNum(), QuestsScreen(), GameCtx, GameProvider(), reducer(), calcAttrCap() (+15 more)

### Community 30 - "PerkEffectType"
Cohesion: 0.09
Nodes (22): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+14 more)

### Community 31 - "loseFight"
Cohesion: 0.33
Nodes (6): clearAttackTimeouts(), consumeAdDmgAttempt(), consumeAdDmgWin(), fireBossSpecial(), hideBossWarn(), loseFight()

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.15
Nodes (11): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, EnemyConfig, SlapCoinBandConfig, WorldId (+3 more)

### Community 33 - "applyHit"
Cohesion: 0.22
Nodes (25): adDmgBoostActive(), advanceEndless(), advanceGauntlet(), advanceRush(), applyBossEffect(), applySignatureHit(), effLevel(), enemyAttack() (+17 more)

### Community 35 - "BattleScreen.jsx"
Cohesion: 0.22
Nodes (12): audio, BattleScreen(), ENEMY_EMOJIS, HeartIcon(), PauseIcon(), PlayIcon(), SoundIcon(), SoundOffIcon() (+4 more)

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "nativeBridge.js"
Cohesion: 0.18
Nodes (9): @capacitor/app@^8.1.2, @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4, @capacitor/app, @capacitor/core, @capacitor/splash-screen, @capacitor/status-bar (+1 more)

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.15
Nodes (11): SpecialMoveConfig, SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration, SpecialMoveId (+3 more)

### Community 40 - "EnemyTag"
Cohesion: 0.29
Nodes (7): EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss

### Community 41 - "vite"
Cohesion: 0.33
Nodes (4): vite@^8.3.4, @vitejs/plugin-react@^6.1.2, vite, @vitejs/plugin-react

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 43 - "enemySpritesV2.js"
Cohesion: 0.14
Nodes (23): ENEMY_ART, makeSprite(), calcEnemyBounty(), calcEnemyDamage(), calcEnemyHp(), calcEnemyInterval(), buildAllEnemies(), GIANT_SCALE (+15 more)

### Community 44 - "StreetBrawlAnomaly"
Cohesion: 0.29
Nodes (7): AnomalyConfig, StreetBrawlAnomaly, Berserker, None, Pinata, SlapStorm, SuddenDeath

### Community 45 - "SkillActivationTrigger"
Cohesion: 0.33
Nodes (6): SkillActivationTrigger, ActiveDurationState, AlwaysOn, OnLowHpState, ProcEveryNSlaps, ProcOnHit

### Community 46 - "artData.js"
Cohesion: 0.15
Nodes (12): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, HAND_URI, ICON_URL_CACHE, iconUrl(), PRINT_URI, renderSprite() (+4 more)

### Community 47 - "generate_android_icons.cjs"
Cohesion: 0.12
Nodes (12): code, fs, densities, fs, generate(), path, resDir, sharp (+4 more)

### Community 48 - "SkinId"
Cohesion: 0.22
Nodes (9): HandSkinConfig, RealMoneyBundleConfig, SkinId, Classic, Hulk, InfinityGauntlet, SpiderMan, Thor (+1 more)

### Community 49 - "AwardsScreen.jsx"
Cohesion: 0.40
Nodes (5): ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS, ACHIEVEMENTS

## Knowledge Gaps
- **111 isolated node(s):** `Power`, `Speed`, `CritChance`, `CritDamage`, `Defense` (+106 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 228 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `applyHit`, `cloudSave.js`, `hasSkill`, `fmtNum`, `renderHub`, `enemyGeom`, `update`, `enemySpritesV2.js`, `.store`, `castSpecial`, `gameEngine.js`, `main.jsx`, `GameContext.jsx`, `loseFight`?**
  _High betweenness centrality (0.432) - this node is a cross-community bridge._
- **Are the 34 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 34 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Power`, `Speed`, `CritChance` to the rest of the system?**
  _111 weakly-connected nodes found - possible missing edges._
- **Should `useGame` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useGame` to `package.json`, `BattleScreen.jsx`, `dependencies`, `main.jsx`, `Icons.jsx`, `GameContext.jsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.04316780266147355 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `cloudSave.js` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._