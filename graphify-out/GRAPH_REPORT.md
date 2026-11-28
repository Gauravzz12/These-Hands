# Graph Report - these-hands  (2026-11-28)

## Corpus Check
- 30 files · ~78,853 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 23 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 782 nodes · 2080 edges · 50 communities (39 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `321b2056`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- enemySpritesV2.js
- package.json
- initGameEngine
- cloudSave.js
- draw
- fmtNum
- renderHub
- SkillEffectType
- artData.js
- enemies.js
- update
- .store
- package.json
- enterHub
- gameEngine.js
- ExampleInstrumentedTest.java
- MainActivity.java
- renderWorlds
- .unlock
- castSpecial
- .oxlintrc.json
- scripts
- renderSelect
- PerkEffectType
- rerollDojoBounty
- BalanceConfig.cs
- nativeBridge.js
- BalanceConfig
- genQuests
- AttributeType
- RelicEffectType
- nativeBridge.js
- SpecialMoveEffectType
- EnemyTag
- handleContractReroll
- CornermanCardId
- StreetBrawlAnomaly
- SkillActivationTrigger
- SpecialMoveId
- generate_android_icons.cjs
- SkinId
- confirmStoreCheckoutModal
- atkRefDps

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 420 edges
2. `fmtNum()` - 51 edges
3. `switchTab()` - 42 edges
4. `update()` - 38 edges
5. `applyHit()` - 37 edges
6. `BalanceConfig` - 36 edges
7. `stats()` - 34 edges
8. `hasSkill()` - 33 edges
9. `spawnEnemy()` - 29 edges
10. `SkillEffectType` - 29 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --indirect_call--> `cloudGetStatus()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --indirect_call--> `compareSaveObjs()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `App()` --calls--> `initGameEngine()`  [EXTRACTED]
  src/App.jsx → src/game/gameEngine.js
- `initGameEngine()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `attrCost()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (50 total, 11 thin omitted)

### Community 0 - "enemySpritesV2.js"
Cohesion: 0.18
Nodes (16): buildSilhouetteCanvas(), canvasBlank(), getV2Sprite(), healV2Sprites(), isV2Enemy(), loadPoseImage(), preloadV2Sprites(), _prevKeep (+8 more)

### Community 1 - "package.json"
Cohesion: 0.14
Nodes (13): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, @types/react@^19.3.0, @types/react-dom@^19.3.0, vite@^8.3.4, @vitejs/plugin-react@^6.1.2, oxlint (+5 more)

### Community 2 - "initGameEngine"
Cohesion: 0.06
Nodes (33): initGameEngine(), abilityDef(), blitzPayText(), btLeague(), buildBlitzTiersPanel(), defaultAttrs(), defaultChest(), defaultDaily() (+25 more)

### Community 3 - "cloudSave.js"
Cohesion: 0.18
Nodes (21): @capacitor-firebase/authentication, clearedCount(), cloudBoot(), cloudGetStatus(), cloudGoogle(), cloudNotifySaved(), cloudSignOut(), cloudSyncNow() (+13 more)

### Community 4 - "draw"
Cohesion: 0.10
Nodes (21): bossBgImg(), draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawHands(), drawHandSprite(), drawSpecialFx() (+13 more)

### Community 5 - "fmtNum"
Cohesion: 0.11
Nodes (45): applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), claimContract() (+37 more)

### Community 6 - "renderHub"
Cohesion: 0.10
Nodes (45): abilitiesHtml(), attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort() (+37 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.07
Nodes (27): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+19 more)

### Community 8 - "artData.js"
Cohesion: 0.14
Nodes (13): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl(), PRINT_URI (+5 more)

### Community 9 - "enemies.js"
Cohesion: 0.26
Nodes (10): makeSprite(), calcEnemyBounty(), calcEnemyDamage(), calcEnemyHp(), calcEnemyInterval(), ALL_ENEMIES, buildAllEnemies(), ENEMIES (+2 more)

### Community 10 - "update"
Cohesion: 0.08
Nodes (78): activateFrenzy(), adDmgBoostActive(), advanceEndless(), advanceRush(), applyBossEffect(), applyHit(), applySignatureHit(), applySpecialHit() (+70 more)

### Community 11 - ".store"
Cohesion: 0.07
Nodes (68): activateCoinBoost(), activateDmgBoost(), checkAchievements(), chestPreview(), chestUnlocked(), claimChest(), claimQuest(), closeIntro() (+60 more)

### Community 12 - "package.json"
Cohesion: 0.11
Nodes (24): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor/core@^8.6.0, @capacitor-firebase/authentication@^8.6.0, @capacitor/splash-screen@^8.0.2 (+16 more)

### Community 13 - "enterHub"
Cohesion: 0.25
Nodes (8): enterHub(), fmtAway(), hidePlayLoader(), maybeShowAwayCard(), renderIntroCard(), setPlayProgress(), showIntro(), showPlayLoader()

### Community 14 - "gameEngine.js"
Cohesion: 0.13
Nodes (23): ATTRIBUTE_COSTS_V33, BELT_RANKS, calcAttrCap(), calcAttrCost(), calcAvgUpgradeCost(), calcLevelUpCost, calcPlayerMaxHp(), calculateSlapCoins() (+15 more)

### Community 17 - "renderWorlds"
Cohesion: 0.17
Nodes (17): ascendRelic(), bossSpecTip(), buyArt(), closeSigIntel(), openSigIntelWorld(), relicAscendReq(), relicDef(), relicDescText() (+9 more)

### Community 18 - ".unlock"
Cohesion: 0.36
Nodes (8): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutNav(), tutPlace(), tutShow(), tutSteps()

### Community 19 - "castSpecial"
Cohesion: 0.20
Nodes (19): acknowledgeSpecialUnlock(), barrierStats(), buySpecUpgrade(), castSpecial(), claimSpecialUnlock(), fmtMult(), maybeShowSpecialUnlock(), renderSpecials() (+11 more)

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "renderSelect"
Cohesion: 0.15
Nodes (19): bossSpecialFor(), chooseEnemy(), enemyUnlocked(), groupComplete(), groupRewardCoins(), hardUnlocked(), initShopFilters(), openSigIntel() (+11 more)

### Community 30 - "PerkEffectType"
Cohesion: 0.09
Nodes (22): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+14 more)

### Community 31 - "rerollDojoBounty"
Cohesion: 0.48
Nodes (7): buildCumulativeContract(), buildShowdownContract(), generateDailyDojoBounties(), getBountyTierIndex(), pickRandom(), pickShowdownTarget(), rerollDojoBounty()

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.15
Nodes (11): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, EnemyConfig, SlapCoinBandConfig, WorldId (+3 more)

### Community 35 - "genQuests"
Cohesion: 0.33
Nodes (6): dailyStage(), dailyStageMult(), dailyTier(), genQuests(), highestDefeatedBounty(), seededPick()

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "nativeBridge.js"
Cohesion: 0.25
Nodes (6): react@^19.3.1, react-dom@^19.3.1, react, react-dom, App(), NativeBridge

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.33
Nodes (6): SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration

### Community 40 - "EnemyTag"
Cohesion: 0.29
Nodes (7): EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss

### Community 41 - "handleContractReroll"
Cohesion: 0.67
Nodes (4): enemiesByStageMap(), ensureContracts(), getHighestStageCleared(), handleContractReroll()

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 44 - "StreetBrawlAnomaly"
Cohesion: 0.29
Nodes (7): AnomalyConfig, StreetBrawlAnomaly, Berserker, None, Pinata, SlapStorm, SuddenDeath

### Community 45 - "SkillActivationTrigger"
Cohesion: 0.25
Nodes (7): SkillActivationTrigger, ActiveDurationState, AlwaysOn, OnLowHpState, ProcEveryNSlaps, ProcOnHit, SkillConfig

### Community 46 - "SpecialMoveId"
Cohesion: 0.50
Nodes (4): SpecialMoveId, DoubleSlap, Guard, UppercutPunch

### Community 47 - "generate_android_icons.cjs"
Cohesion: 0.18
Nodes (9): sharp@^0.35.5, sharp, densities, fs, generate(), path, resDir, sharp (+1 more)

### Community 48 - "SkinId"
Cohesion: 0.22
Nodes (9): HandSkinConfig, RealMoneyBundleConfig, SkinId, Classic, Hulk, InfinityGauntlet, SpiderMan, Thor (+1 more)

### Community 49 - "confirmStoreCheckoutModal"
Cohesion: 0.50
Nodes (4): closeMockCheckout(), closeStoreCheckoutModal(), confirmMockPurchase(), confirmStoreCheckoutModal()

### Community 55 - "atkRefDps"
Cohesion: 0.67
Nodes (4): atkRefDps(), designMult(), expectedBuild(), expectedDps()

## Knowledge Gaps
- **111 isolated node(s):** `CoinMult`, `CounterSlapDamageMult`, `CritChance`, `DamageMult`, `DamageReduction` (+106 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 206 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `enemySpritesV2.js`, `cloudSave.js`, `draw`, `fmtNum`, `renderHub`, `update`, `.store`, `enterHub`, `gameEngine.js`, `renderWorlds`, `.unlock`, `castSpecial`, `renderSelect`, `rerollDojoBounty`, `genQuests`, `nativeBridge.js`, `handleContractReroll`, `confirmStoreCheckoutModal`, `atkRefDps`?**
  _High betweenness centrality (0.470) - this node is a cross-community bridge._
- **Are the 32 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 32 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CoinMult`, `CounterSlapDamageMult`, `CritChance` to the rest of the system?**
  _111 weakly-connected nodes found - possible missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `cloudSave.js` to `package.json`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.05990338164251208 - nodes in this community are weakly interconnected._
- **Why does `cloudGoogle()` connect `cloudSave.js` to `initGameEngine`, `gameEngine.js`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._