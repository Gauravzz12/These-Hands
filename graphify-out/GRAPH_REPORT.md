# Graph Report - these-hands  (2026-11-22)

## Corpus Check
- 55 files · ~100,015 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 883 nodes · 2388 edges · 47 communities (35 shown, 12 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77b0ff7e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GameContext.jsx
- package.json
- initGameEngine
- gameEngine.js
- ref_fs
- fmtNum
- renderHub
- SkillEffectType
- enemyGeom
- MathPixelCanvas
- hasSkill
- .store
- dependencies
- castSpecial
- @capacitor/status-bar
- ExampleInstrumentedTest.java
- MainActivity.java
- tutShow
- GameAudio
- vite
- .oxlintrc.json
- scripts
- stats
- PerkEffectType
- update
- BalanceConfig.cs
- applyHit
- BalanceConfig
- loseFight
- AttributeType
- RelicEffectType
- nativeBridge.js
- SpecialMoveEffectType
- EnemyTag
- SpecialMoveId
- CornermanCardId
- drawHands
- StreetBrawlAnomaly
- SkillActivationTrigger
- generate_android_icons.cjs

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 388 edges
2. `fmtNum()` - 45 edges
3. `switchTab()` - 39 edges
4. `update()` - 38 edges
5. `applyHit()` - 36 edges
6. `BalanceConfig` - 35 edges
7. `hasSkill()` - 32 edges
8. `renderHub()` - 31 edges
9. `SkillEffectType` - 29 edges
10. `stats()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --indirect_call--> `cloudGetStatus()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `initGameEngine()` --indirect_call--> `compareSaveObjs()`  [INFERRED]
  src/game/gameEngine.js → src/game/cloudSave.js
- `buildAllEnemies()` --calls--> `isV2Enemy()`  [EXTRACTED]
  src/game/enemies.js → src/game/enemySpritesV2.js
- `initGameEngine()` --calls--> `preloadV2Sprites()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/enemySpritesV2.js
- `spawnEnemy()` --calls--> `preloadV2Sprites()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/enemySpritesV2.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (47 total, 12 thin omitted)

### Community 0 - "GameContext.jsx"
Cohesion: 0.05
Nodes (84): react, AchToast(), ATTR_DESCS, AttrsScreen(), ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS (+76 more)

### Community 1 - "package.json"
Cohesion: 0.17
Nodes (15): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, name, private (+7 more)

### Community 2 - "initGameEngine"
Cohesion: 0.05
Nodes (59): initGameEngine(), atkRefDps(), blitzPayText(), bossBgImg(), bountyTpl(), btLeague(), buildBlitzTiersPanel(), closeMockCheckout() (+51 more)

### Community 3 - "gameEngine.js"
Cohesion: 0.06
Nodes (49): @capacitor-firebase/authentication, ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl() (+41 more)

### Community 4 - "ref_fs"
Cohesion: 0.08
Nodes (18): code, fs, fs, i, src, fs, i, src (+10 more)

### Community 5 - "fmtNum"
Cohesion: 0.11
Nodes (45): applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), contractsHtml() (+37 more)

### Community 6 - "renderHub"
Cohesion: 0.09
Nodes (51): getProgressionCaps(), abilitiesHtml(), attrCap(), attrCost(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort() (+43 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.07
Nodes (27): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+19 more)

### Community 8 - "enemyGeom"
Cohesion: 0.16
Nodes (14): draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawSpecialFx(), drawWeakSpot(), frame(), fxDraw() (+6 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "hasSkill"
Cohesion: 0.19
Nodes (19): activateFrenzy(), applySignatureHit(), claimSkillReward(), enemyAttack(), enemyNormalHit(), hasPrecision(), hasSkill(), parryBlock() (+11 more)

### Community 11 - ".store"
Cohesion: 0.06
Nodes (78): activateCoinBoost(), activateDmgBoost(), ascendRelic(), buyArt(), checkAchievements(), chestPreview(), chestUnlocked(), chooseEnemy() (+70 more)

### Community 12 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @capacitor/android@^8.6.0, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor/core@^8.6.0, @capacitor-firebase/authentication@^8.6.0, @capacitor/splash-screen@^8.0.2, firebase@^12.19.0 (+7 more)

### Community 13 - "castSpecial"
Cohesion: 0.25
Nodes (16): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+8 more)

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

### Community 29 - "stats"
Cohesion: 0.23
Nodes (12): abilityDef(), adDmgBoostActive(), attrCurText(), effLevel(), groupComplete(), hardUnlocked(), hasAbility(), rewardCardHtml() (+4 more)

### Community 30 - "PerkEffectType"
Cohesion: 0.09
Nodes (22): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+14 more)

### Community 31 - "update"
Cohesion: 0.14
Nodes (27): advanceEndless(), advanceGauntlet(), advanceRush(), applyBossEffect(), endBossIntro(), enemyCurInterval(), evictStageBgs(), healFactor() (+19 more)

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.12
Nodes (14): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, HandSkinConfig, RealMoneyBundleConfig, SkinId (+6 more)

### Community 33 - "applyHit"
Cohesion: 0.24
Nodes (18): applyHit(), applySpecialHit(), coinTarget(), enemyGeom(), hasArt(), killEnemy(), relicVal(), reviveFight() (+10 more)

### Community 35 - "loseFight"
Cohesion: 0.33
Nodes (6): clearAttackTimeouts(), consumeAdDmgAttempt(), consumeAdDmgWin(), fireBossSpecial(), hideBossWarn(), loseFight()

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "nativeBridge.js"
Cohesion: 0.16
Nodes (9): @capacitor/app@^8.1.2, react-dom@^19.3.1, @revenuecat/purchases-capacitor@^14.0.0, @capacitor/app, react-dom, @revenuecat/purchases-capacitor, App(), NativeBridge (+1 more)

### Community 39 - "SpecialMoveEffectType"
Cohesion: 0.33
Nodes (6): SpecialMoveEffectType, BlockNext, DamageMult, None, SelfBuff, StunDuration

### Community 40 - "EnemyTag"
Cohesion: 0.15
Nodes (13): EnemyConfig, EnemyTag, Boss, Elite, FinalBoss, MiniBoss, Normal, WorldBoss (+5 more)

### Community 41 - "SpecialMoveId"
Cohesion: 0.50
Nodes (4): SpecialMoveId, DoubleSlap, Guard, UppercutPunch

### Community 42 - "CornermanCardId"
Cohesion: 0.20
Nodes (10): CornermanCardConfig, CornermanCardId, CoachsSpotter, CornermansTowel, CutmansIcePack, HighRollerPurse, LoadedWraps, SavedByTheBell (+2 more)

### Community 43 - "drawHands"
Cohesion: 0.40
Nodes (5): cycleInterval(), drawHands(), drawHandSprite(), mix(), slapBounds()

### Community 44 - "StreetBrawlAnomaly"
Cohesion: 0.29
Nodes (7): AnomalyConfig, StreetBrawlAnomaly, Berserker, None, Pinata, SlapStorm, SuddenDeath

### Community 45 - "SkillActivationTrigger"
Cohesion: 0.25
Nodes (7): SkillActivationTrigger, ActiveDurationState, AlwaysOn, OnLowHpState, ProcEveryNSlaps, ProcOnHit, SkillConfig

### Community 47 - "generate_android_icons.cjs"
Cohesion: 0.25
Nodes (7): densities, fs, generate(), path, resDir, sharp, srcIcon

## Knowledge Gaps
- **111 isolated node(s):** `CoinMult`, `CounterSlapDamageMult`, `CritChance`, `DamageMult`, `DamageReduction` (+106 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 240 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `GameContext.jsx`, `applyHit`, `gameEngine.js`, `loseFight`, `fmtNum`, `nativeBridge.js`, `renderHub`, `enemyGeom`, `hasSkill`, `.store`, `drawHands`, `castSpecial`, `tutShow`, `stats`, `update`?**
  _High betweenness centrality (0.434) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CoinMult`, `CounterSlapDamageMult`, `CritChance` to the rest of the system?**
  _111 weakly-connected nodes found - possible missing edges._
- **Should `GameContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0547673531655225 - nodes in this community are weakly interconnected._
- **Why does `react` connect `GameContext.jsx` to `package.json`, `dependencies`, `nativeBridge.js`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.04748490945674044 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `gameEngine.js` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._