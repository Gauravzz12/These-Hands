# Graph Report - these-hands  (2026-11-28)

## Corpus Check
- 30 files · ~78,382 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 23 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 778 nodes · 2074 edges · 46 communities (34 shown, 12 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d1ee1f0f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- package.json
- initGameEngine
- cloudSave.js
- draw
- fmtNum
- renderHub
- SkillEffectType
- stats
- hasSkill
- update
- .store
- dependencies
- applyHit
- gameEngine.js
- ExampleInstrumentedTest.java
- MainActivity.java
- renderWorlds
- .unlock
- castSpecial
- .oxlintrc.json
- scripts
- dailyAdd
- PerkEffectType
- loseFight
- BalanceConfig.cs
- @revenuecat/purchases-capacitor
- BalanceConfig
- AttributeType
- RelicEffectType
- nativeBridge.js
- SpecialMoveEffectType
- EnemyTag
- CornermanCardId
- StreetBrawlAnomaly
- SkillActivationTrigger
- generate_android_icons.cjs
- SkinId
- atkRefDps

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 416 edges
2. `fmtNum()` - 51 edges
3. `switchTab()` - 43 edges
4. `update()` - 39 edges
5. `applyHit()` - 37 edges
6. `BalanceConfig` - 36 edges
7. `hasSkill()` - 33 edges
8. `stats()` - 33 edges
9. `SkillEffectType` - 29 edges
10. `spawnEnemy()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --indirect_call--> `cloudGetStatus()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --indirect_call--> `compareSaveObjs()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --calls--> `cloudNotifySaved()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --calls--> `cloudBoot()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --calls--> `cloudSyncNow()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/cloudSave.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (46 total, 12 thin omitted)

### Community 1 - "package.json"
Cohesion: 0.13
Nodes (19): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, vite@^8.3.4, @vitejs/plugin-react@^6.1.2 (+11 more)

### Community 2 - "initGameEngine"
Cohesion: 0.06
Nodes (48): initGameEngine(), blitzPayText(), bossBgImg(), btLeague(), buildBlitzTiersPanel(), claimSpecialUnlock(), closeMockCheckout(), closeStoreCheckoutModal() (+40 more)

### Community 3 - "cloudSave.js"
Cohesion: 0.18
Nodes (21): @capacitor-firebase/authentication, clearedCount(), cloudBoot(), cloudGetStatus(), cloudGoogle(), cloudNotifySaved(), cloudSignOut(), cloudSyncNow() (+13 more)

### Community 4 - "draw"
Cohesion: 0.15
Nodes (18): draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawHands(), drawHandSprite(), drawSpecialFx(), drawWeakSpot() (+10 more)

### Community 5 - "fmtNum"
Cohesion: 0.07
Nodes (62): getDojoMasterChestReward(), applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward() (+54 more)

### Community 6 - "renderHub"
Cohesion: 0.09
Nodes (47): abilitiesHtml(), attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort() (+39 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.07
Nodes (27): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+19 more)

### Community 8 - "stats"
Cohesion: 0.28
Nodes (9): adDmgBoostActive(), cycleInterval(), groupComplete(), hardUnlocked(), rewardCardHtml(), showEndOverlay(), skinBonus(), slapBounds() (+1 more)

### Community 9 - "hasSkill"
Cohesion: 0.21
Nodes (17): activateFrenzy(), hasPrecision(), hasSkill(), parryBlock(), parryCdTotal(), parryCounterMult(), parryWhiffLockSec(), parryWindowSec() (+9 more)

### Community 10 - "update"
Cohesion: 0.12
Nodes (37): abilityDef(), advanceEndless(), advanceRush(), applyBossEffect(), applySignatureHit(), effLevel(), endBossIntro(), enemyAttack() (+29 more)

### Community 11 - ".store"
Cohesion: 0.07
Nodes (68): activateCoinBoost(), activateDmgBoost(), checkAchievements(), chestPreview(), chestUnlocked(), claimChest(), closeIntro(), consumeAdDmgAttempt() (+60 more)

### Community 12 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @capacitor/android@^8.6.0, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor-firebase/authentication@^8.6.0, @capacitor/splash-screen@^8.0.2, firebase@^12.19.0, react-dom@^19.3.1 (+6 more)

### Community 13 - "applyHit"
Cohesion: 0.24
Nodes (17): applyHit(), applySpecialHit(), checkDojoShowdown(), claimSkillReward(), coinTarget(), hasArt(), killEnemy(), relicVal() (+9 more)

### Community 14 - "gameEngine.js"
Cohesion: 0.05
Nodes (68): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl(), makeSprite() (+60 more)

### Community 17 - "renderWorlds"
Cohesion: 0.18
Nodes (16): ascendRelic(), buyArt(), closeSigIntel(), openSigIntelWorld(), relicAscendReq(), relicDef(), relicDescText(), relicEquipped() (+8 more)

### Community 18 - ".unlock"
Cohesion: 0.31
Nodes (9): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutGate(), tutNav(), tutPlace(), tutShow() (+1 more)

### Community 19 - "castSpecial"
Cohesion: 0.33
Nodes (13): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+5 more)

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "dailyAdd"
Cohesion: 0.61
Nodes (8): claimQuest(), dailyAdd(), ensureDaily(), questClaimableCount(), questsUnlocked(), renderQuestBadge(), renderQuests(), updateMoreSheet()

### Community 30 - "PerkEffectType"
Cohesion: 0.09
Nodes (22): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+14 more)

### Community 31 - "loseFight"
Cohesion: 0.40
Nodes (5): clearAttackTimeouts(), consumeAdDmgWin(), fireBossSpecial(), hideBossWarn(), loseFight()

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.15
Nodes (11): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, EnemyConfig, SlapCoinBandConfig, WorldId (+3 more)

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "nativeBridge.js"
Cohesion: 0.16
Nodes (9): @capacitor/app@^8.1.2, @capacitor/core@^8.6.0, @capacitor/status-bar@^8.0.4, @capacitor/app, @capacitor/core, @capacitor/status-bar, App(), NativeBridge (+1 more)

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.15
Nodes (11): SpecialMoveConfig, SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration, SpecialMoveId (+3 more)

### Community 40 - "EnemyTag"
Cohesion: 0.29
Nodes (7): EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 44 - "StreetBrawlAnomaly"
Cohesion: 0.29
Nodes (7): AnomalyConfig, StreetBrawlAnomaly, Berserker, None, Pinata, SlapStorm, SuddenDeath

### Community 45 - "SkillActivationTrigger"
Cohesion: 0.33
Nodes (6): SkillActivationTrigger, ActiveDurationState, AlwaysOn, OnLowHpState, ProcEveryNSlaps, ProcOnHit

### Community 47 - "generate_android_icons.cjs"
Cohesion: 0.22
Nodes (7): densities, fs, generate(), path, resDir, sharp, srcIcon

### Community 48 - "SkinId"
Cohesion: 0.22
Nodes (9): HandSkinConfig, RealMoneyBundleConfig, SkinId, Classic, Hulk, InfinityGauntlet, SpiderMan, Thor (+1 more)

### Community 55 - "atkRefDps"
Cohesion: 0.67
Nodes (4): atkRefDps(), designMult(), expectedBuild(), expectedDps()

## Knowledge Gaps
- **111 isolated node(s):** `CoinMult`, `CounterSlapDamageMult`, `CritChance`, `DamageMult`, `DamageReduction` (+106 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 205 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `cloudSave.js`, `draw`, `fmtNum`, `renderHub`, `nativeBridge.js`, `stats`, `hasSkill`, `update`, `.store`, `applyHit`, `gameEngine.js`, `renderWorlds`, `.unlock`, `castSpecial`, `atkRefDps`, `dailyAdd`, `loseFight`?**
  _High betweenness centrality (0.467) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CoinMult`, `CounterSlapDamageMult`, `CritChance` to the rest of the system?**
  _111 weakly-connected nodes found - possible missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.12554112554112554 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `cloudSave.js` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.05536723163841808 - nodes in this community are weakly interconnected._
- **Why does `cloudGoogle()` connect `cloudSave.js` to `initGameEngine`, `gameEngine.js`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._