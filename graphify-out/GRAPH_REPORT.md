# Graph Report - these-hands  (2026-11-28)

## Corpus Check
- 50 files · ~104,234 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 914 nodes · 2558 edges · 49 communities (39 shown, 10 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `296c2b53`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useGame
- package.json
- initGameEngine
- cloudSave.js
- renderHub
- fmtNum
- renderHub
- SkillEffectType
- renderSelect
- MathPixelCanvas
- update
- .store
- dependencies
- castSpecial
- gameEngine.js
- ExampleInstrumentedTest.java
- MainActivity.java
- renderWorlds
- .unlock
- Icons.jsx
- .oxlintrc.json
- scripts
- GameContext.jsx
- PerkEffectType
- claimChest
- BalanceConfig.cs
- sync_engine.cjs
- BalanceConfig
- BattleScreen.jsx
- AttributeType
- RelicEffectType
- nativeBridge.js
- SpecialMoveEffectType
- EnemyTag
- CornermanCardId
- enemySpritesV2.js
- StreetBrawlAnomaly
- SkillActivationTrigger
- artData.js
- generate_android_icons.cjs
- SkinId
- AwardsScreen.jsx

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 416 edges
2. `fmtNum()` - 51 edges
3. `switchTab()` - 41 edges
4. `update()` - 39 edges
5. `applyHit()` - 37 edges
6. `BalanceConfig` - 36 edges
7. `hasSkill()` - 33 edges
8. `stats()` - 33 edges
9. `spawnEnemy()` - 29 edges
10. `renderHub()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --indirect_call--> `cloudGetStatus()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --indirect_call--> `compareSaveObjs()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `App()` --calls--> `initGameEngine()`  [EXTRACTED]
  src/App.jsx → src/game/gameEngine.js
- `initGameEngine()` --calls--> `cloudNotifySaved()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --calls--> `cloudBoot()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/cloudSave.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (49 total, 10 thin omitted)

### Community 0 - "useGame"
Cohesion: 0.12
Nodes (24): react, ATTR_DESCS, AttrsScreen(), HELP_CARDS, HelpScreen(), CoinIcon(), HomeIcon(), LevelsScreen() (+16 more)

### Community 1 - "package.json"
Cohesion: 0.13
Nodes (19): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, vite@^8.3.4, @vitejs/plugin-react@^6.1.2 (+11 more)

### Community 2 - "initGameEngine"
Cohesion: 0.05
Nodes (51): initGameEngine(), abilityDef(), atkRefDps(), blitzPayText(), bossBgImg(), btLeague(), buildBlitzTiersPanel(), claimSpecialUnlock() (+43 more)

### Community 3 - "cloudSave.js"
Cohesion: 0.18
Nodes (21): @capacitor-firebase/authentication, clearedCount(), cloudBoot(), cloudGetStatus(), cloudGoogle(), cloudNotifySaved(), cloudSignOut(), cloudSyncNow() (+13 more)

### Community 4 - "renderHub"
Cohesion: 0.14
Nodes (29): activateCoinBoost(), activateDmgBoost(), endlessPick(), endlessPool(), endTraining(), fmtMinSec(), fmtTime(), modeSnapshot() (+21 more)

### Community 5 - "fmtNum"
Cohesion: 0.10
Nodes (48): applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), defaultAttrs() (+40 more)

### Community 6 - "renderHub"
Cohesion: 0.09
Nodes (50): abilitiesHtml(), attrCap(), attrCost(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort(), attrNextText() (+42 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.07
Nodes (27): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+19 more)

### Community 8 - "renderSelect"
Cohesion: 0.14
Nodes (23): chooseEnemy(), claimContract(), contractsHtml(), creditCoinsQuiet(), enemyUnlocked(), frontierBounty(), grantGroupReward(), groupComplete() (+15 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "update"
Cohesion: 0.07
Nodes (87): activateFrenzy(), adDmgBoostActive(), advanceEndless(), advanceRush(), applyBossEffect(), applyHit(), applySignatureHit(), applySpecialHit() (+79 more)

### Community 11 - ".store"
Cohesion: 0.11
Nodes (34): checkAchievements(), closeIntro(), consumeAdDmgAttempt(), consumeAdDmgWin(), endBlitz(), endReflex(), ensureHubReady(), fireBossSpecial() (+26 more)

### Community 12 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor-firebase/authentication@^8.6.0, firebase@^12.19.0, react@^19.3.1 (+7 more)

### Community 13 - "castSpecial"
Cohesion: 0.27
Nodes (15): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+7 more)

### Community 14 - "gameEngine.js"
Cohesion: 0.10
Nodes (42): LevelUpModal(), ENEMY_ART, makeSprite(), ATTRIBUTE_COSTS_V33, BELT_RANKS, buildCumulativeContract(), buildShowdownContract(), calcAttrCap() (+34 more)

### Community 17 - "renderWorlds"
Cohesion: 0.16
Nodes (18): ascendRelic(), buyArt(), closeSigIntel(), openSigIntelWorld(), relicAscendReq(), relicDef(), relicDescText(), relicEquipped() (+10 more)

### Community 18 - ".unlock"
Cohesion: 0.18
Nodes (13): initShopFilters(), setShopFilter(), Sound, startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutGate() (+5 more)

### Community 19 - "Icons.jsx"
Cohesion: 0.18
Nodes (15): AchToast(), ENEMY_EMOJIS, fmtNum(), HomeScreen(), BoltIcon(), GemIcon(), GridIcon(), HelpIcon() (+7 more)

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "GameContext.jsx"
Cohesion: 0.35
Nodes (11): GameCtx, GameProvider(), reducer(), attrCap(), attrCost(), calcOfflineEarnings(), computePlayerStats(), createInitialSave() (+3 more)

### Community 30 - "PerkEffectType"
Cohesion: 0.09
Nodes (22): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+14 more)

### Community 31 - "claimChest"
Cohesion: 0.27
Nodes (11): chestPreview(), chestUnlocked(), claimChest(), dailyLevelMult(), enemiesByStageMap(), ensureContracts(), getDayReward(), getHighestStageCleared() (+3 more)

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.15
Nodes (11): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, EnemyConfig, SlapCoinBandConfig, WorldId (+3 more)

### Community 33 - "sync_engine.cjs"
Cohesion: 0.25
Nodes (5): code, fs, cfgStart, code, fs

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
Cohesion: 0.14
Nodes (11): @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4, react-dom@^19.3.1, @capacitor/core, @capacitor/splash-screen, @capacitor/status-bar, react-dom (+3 more)

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.15
Nodes (11): SpecialMoveConfig, SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration, SpecialMoveId (+3 more)

### Community 40 - "EnemyTag"
Cohesion: 0.29
Nodes (7): EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 43 - "enemySpritesV2.js"
Cohesion: 0.13
Nodes (15): GameAudio, buildSilhouetteCanvas(), canvasBlank(), getV2Sprite(), healV2Sprites(), isV2Enemy(), loadPoseImage(), preloadV2Sprites() (+7 more)

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
- **111 isolated node(s):** `CoinMult`, `CounterSlapDamageMult`, `CritChance`, `DamageMult`, `DamageReduction` (+106 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 232 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `cloudSave.js`, `renderHub`, `fmtNum`, `renderHub`, `nativeBridge.js`, `renderSelect`, `update`, `enemySpritesV2.js`, `.store`, `castSpecial`, `gameEngine.js`, `renderWorlds`, `.unlock`, `claimChest`?**
  _High betweenness centrality (0.441) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CoinMult`, `CounterSlapDamageMult`, `CritChance` to the rest of the system?**
  _111 weakly-connected nodes found - possible missing edges._
- **Should `useGame` be split into smaller, more focused modules?**
  _Cohesion score 0.12162162162162163 - nodes in this community are weakly interconnected._
- **Why does `react` connect `useGame` to `package.json`, `BattleScreen.jsx`, `nativeBridge.js`, `dependencies`, `Icons.jsx`, `GameContext.jsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.12554112554112554 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `cloudSave.js` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._