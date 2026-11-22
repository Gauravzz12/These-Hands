# Graph Report - these-hands  (2026-11-22)

## Corpus Check
- 50 files · ~101,233 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 876 nodes · 2423 edges · 50 communities (40 shown, 10 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `da65715c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useGame
- package.json
- initGameEngine
- cloudSave.js
- sync_engine.cjs
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
- tutShow
- GameAudio
- Icons.jsx
- .oxlintrc.json
- scripts
- GameContext.jsx
- PerkEffectType
- spawnEnemy
- BalanceConfig.cs
- applyHit
- BalanceConfig
- BattleScreen.jsx
- AttributeType
- RelicEffectType
- nativeBridge.js
- SpecialMoveEffectType
- EnemyTag
- SpecialMoveId
- CornermanCardId
- enemySpritesV2.js
- StreetBrawlAnomaly
- SkillActivationTrigger
- artData.js
- generate_android_icons.cjs
- SkinId
- AwardsScreen.jsx

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 393 edges
2. `fmtNum()` - 45 edges
3. `switchTab()` - 39 edges
4. `update()` - 38 edges
5. `BalanceConfig` - 36 edges
6. `applyHit()` - 36 edges
7. `hasSkill()` - 32 edges
8. `renderHub()` - 31 edges
9. `SkillEffectType` - 29 edges
10. `useGame()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --indirect_call--> `cloudGetStatus()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --indirect_call--> `compareSaveObjs()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `LevelUpModal()` --calls--> `getLevelUpFeedback()`  [EXTRACTED]
  src/components/LevelUpModal.jsx → src/game/config.js
- `reducer()` --calls--> `canLevelUp()`  [EXTRACTED]
  src/context/GameContext.jsx → src/game/config.js
- `AchToast()` --calls--> `useGame()`  [EXTRACTED]
  src/components/AchToast.jsx → src/context/GameContext.jsx

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (50 total, 10 thin omitted)

### Community 0 - "useGame"
Cohesion: 0.17
Nodes (16): HELP_CARDS, HelpScreen(), CoinIcon(), HomeIcon(), LevelUpModal(), SettingsScreen(), fmtCoins(), NODE_POSITIONS (+8 more)

### Community 1 - "package.json"
Cohesion: 0.13
Nodes (19): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, vite@^8.3.4, @vitejs/plugin-react@^6.1.2 (+11 more)

### Community 2 - "initGameEngine"
Cohesion: 0.05
Nodes (52): initGameEngine(), abilityDef(), atkRefDps(), blitzPayText(), bountyTpl(), btLeague(), buildBlitzTiersPanel(), closeMockCheckout() (+44 more)

### Community 3 - "cloudSave.js"
Cohesion: 0.17
Nodes (21): @capacitor-firebase/authentication, clearedCount(), cloudBoot(), cloudGetStatus(), cloudGoogle(), cloudNotifySaved(), cloudSignOut(), cloudSyncNow() (+13 more)

### Community 4 - "sync_engine.cjs"
Cohesion: 0.25
Nodes (5): code, fs, cfgStart, code, fs

### Community 5 - "fmtNum"
Cohesion: 0.11
Nodes (45): applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), contractsHtml() (+37 more)

### Community 6 - "renderHub"
Cohesion: 0.08
Nodes (54): abilitiesHtml(), attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort() (+46 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.07
Nodes (27): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+19 more)

### Community 8 - "enemyGeom"
Cohesion: 0.14
Nodes (19): draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawHands(), drawHandSprite(), drawSpecialFx(), drawWeakSpot() (+11 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "update"
Cohesion: 0.12
Nodes (32): activateFrenzy(), adDmgBoostActive(), advanceEndless(), advanceRush(), claimSkillReward(), endBossIntro(), enemyAttack(), enemyCurInterval() (+24 more)

### Community 11 - ".store"
Cohesion: 0.05
Nodes (86): activateCoinBoost(), activateDmgBoost(), ascendRelic(), buyArt(), checkAchievements(), chestPreview(), chestUnlocked(), chooseEnemy() (+78 more)

### Community 12 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor-firebase/authentication@^8.6.0, firebase@^12.19.0, react@^19.3.1 (+7 more)

### Community 13 - "castSpecial"
Cohesion: 0.21
Nodes (18): applyBossEffect(), barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd() (+10 more)

### Community 14 - "gameEngine.js"
Cohesion: 0.15
Nodes (30): ENEMY_ART, makeSprite(), ATTRIBUTE_COSTS_V33, BELT_RANKS, calcAttrCap(), calcAttrCost(), calcEnemyBounty(), calcEnemyDamage() (+22 more)

### Community 17 - "tutShow"
Cohesion: 0.31
Nodes (9): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutGate(), tutNav(), tutPlace(), tutShow() (+1 more)

### Community 19 - "Icons.jsx"
Cohesion: 0.18
Nodes (15): react, AchToast(), ENEMY_EMOJIS, fmtNum(), HomeScreen(), BoltIcon(), GemIcon(), GridIcon() (+7 more)

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "GameContext.jsx"
Cohesion: 0.19
Nodes (18): ATTR_DESCS, AttrsScreen(), fmtNum(), QuestsScreen(), GameCtx, GameProvider(), reducer(), attrCap() (+10 more)

### Community 30 - "PerkEffectType"
Cohesion: 0.09
Nodes (22): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+14 more)

### Community 31 - "spawnEnemy"
Cohesion: 0.15
Nodes (15): bossBgImg(), clearAttackTimeouts(), drawStage(), evictStageBgs(), fireBossSpecial(), hideBossWarn(), hideEndOverlay(), rect() (+7 more)

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.15
Nodes (11): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, EnemyConfig, SlapCoinBandConfig, WorldId (+3 more)

### Community 33 - "applyHit"
Cohesion: 0.21
Nodes (27): advanceGauntlet(), applyHit(), applySignatureHit(), applySpecialHit(), coinTarget(), cycleInterval(), effLevel(), enemyNormalHit() (+19 more)

### Community 34 - "BalanceConfig"
Cohesion: 0.13
Nodes (3): BalanceConfig, SkillConfig, SpecialMoveConfig

### Community 35 - "BattleScreen.jsx"
Cohesion: 0.16
Nodes (15): audio, BattleScreen(), ENEMY_EMOJIS, HeartIcon(), PauseIcon(), PlayIcon(), SoundIcon(), SoundOffIcon() (+7 more)

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "nativeBridge.js"
Cohesion: 0.14
Nodes (11): @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4, react-dom@^19.3.1, @capacitor/core, @capacitor/splash-screen, @capacitor/status-bar, react-dom (+3 more)

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.33
Nodes (6): SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration

### Community 40 - "EnemyTag"
Cohesion: 0.29
Nodes (7): EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss

### Community 41 - "SpecialMoveId"
Cohesion: 0.50
Nodes (4): SpecialMoveId, DoubleSlap, Guard, UppercutPunch

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 43 - "enemySpritesV2.js"
Cohesion: 0.20
Nodes (14): buildSilhouetteCanvas(), canvasBlank(), getV2Sprite(), healV2Sprites(), isV2Enemy(), loadPoseImage(), preloadV2Sprites(), _prevKeep (+6 more)

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
Cohesion: 0.25
Nodes (7): densities, fs, generate(), path, resDir, sharp, srcIcon

### Community 48 - "SkinId"
Cohesion: 0.22
Nodes (9): HandSkinConfig, RealMoneyBundleConfig, SkinId, Classic, Hulk, InfinityGauntlet, SpiderMan, Thor (+1 more)

### Community 49 - "AwardsScreen.jsx"
Cohesion: 0.40
Nodes (5): ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS, ACHIEVEMENTS

## Knowledge Gaps
- **111 isolated node(s):** `Power`, `Speed`, `CritChance`, `CritDamage`, `Defense` (+106 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 227 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `applyHit`, `cloudSave.js`, `fmtNum`, `renderHub`, `nativeBridge.js`, `enemyGeom`, `update`, `enemySpritesV2.js`, `.store`, `castSpecial`, `gameEngine.js`, `tutShow`, `spawnEnemy`?**
  _High betweenness centrality (0.432) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Power`, `Speed`, `CritChance` to the rest of the system?**
  _111 weakly-connected nodes found - possible missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.12554112554112554 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Icons.jsx` to `useGame`, `package.json`, `BattleScreen.jsx`, `nativeBridge.js`, `dependencies`, `GameContext.jsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.05222734254992319 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `cloudSave.js` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._