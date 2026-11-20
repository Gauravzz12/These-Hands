# Graph Report - these-hands  (2026-11-20)

## Corpus Check
- 55 files · ~105,593 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 880 nodes · 2384 edges · 46 communities (36 shown, 10 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f36897b5`
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
- renderWorlds
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
- stats
- PerkEffectType
- update
- BalanceConfig.cs
- applyHit
- BalanceConfig
- SkinId
- AttributeType
- RelicEffectType
- main.jsx
- SpecialMoveEffectType
- EnemyTag
- SpecialMoveId
- CornermanCardId
- hasSkill
- StreetBrawlAnomaly
- SkillActivationTrigger

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 387 edges
2. `fmtNum()` - 45 edges
3. `switchTab()` - 39 edges
4. `update()` - 38 edges
5. `applyHit()` - 36 edges
6. `BalanceConfig` - 35 edges
7. `hasSkill()` - 32 edges
8. `renderHub()` - 31 edges
9. `SkillEffectType` - 28 edges
10. `stats()` - 28 edges

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

## Communities (46 total, 10 thin omitted)

### Community 0 - "GameContext.jsx"
Cohesion: 0.06
Nodes (72): react, AchToast(), ATTR_DESCS, AttrsScreen(), ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS (+64 more)

### Community 1 - "package.json"
Cohesion: 0.17
Nodes (15): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, name, private (+7 more)

### Community 2 - "initGameEngine"
Cohesion: 0.06
Nodes (48): initGameEngine(), atkRefDps(), blitzPayText(), bountyTpl(), btLeague(), buildBlitzTiersPanel(), closeMockCheckout(), closeStoreCheckoutModal() (+40 more)

### Community 3 - "gameEngine.js"
Cohesion: 0.05
Nodes (65): @capacitor-firebase/authentication, ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl() (+57 more)

### Community 4 - "ref_fs"
Cohesion: 0.06
Nodes (25): code, fs, fs, i, src, fs, i, src (+17 more)

### Community 5 - "fmtNum"
Cohesion: 0.10
Nodes (49): applySkinVisuals(), buildSkinArt(), bundleCoinsOf(), buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), chooseEnemy() (+41 more)

### Community 6 - "renderHub"
Cohesion: 0.10
Nodes (44): abilitiesHtml(), attrCap(), attrCost(), attrEffectiveCap(), attrLevelGate(), attrNextShort(), attrNextText(), attrPermanentMax() (+36 more)

### Community 7 - "SkillEffectType"
Cohesion: 0.08
Nodes (26): SkillEffectType, BossDamage, BossSigParryMitigation, CoinMult, ColossusDamage, ComboCapBonus, ComboChargeBonus, ComboPersistOnSwitch (+18 more)

### Community 8 - "enemyGeom"
Cohesion: 0.13
Nodes (21): bossBgImg(), draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawHands(), drawHandSprite(), drawSpecialFx() (+13 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "renderWorlds"
Cohesion: 0.18
Nodes (18): ascendRelic(), buyArt(), hasArt(), relicAscendReq(), relicDef(), relicDescText(), relicEquipped(), relicStars() (+10 more)

### Community 11 - "switchTab"
Cohesion: 0.07
Nodes (63): activateCoinBoost(), activateDmgBoost(), checkAchievements(), chestPreview(), chestUnlocked(), claimChest(), claimQuest(), closeIntro() (+55 more)

### Community 12 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, @capacitor/android@^8.6.0, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor-firebase/authentication@^8.6.0, firebase@^12.19.0, react@^19.3.1, @revenuecat/purchases-capacitor@^14.0.0 (+5 more)

### Community 13 - "castSpecial"
Cohesion: 0.25
Nodes (16): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+8 more)

### Community 14 - "nativeBridge.js"
Cohesion: 0.18
Nodes (9): @capacitor/app@^8.1.2, @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4, @capacitor/app, @capacitor/core, @capacitor/splash-screen, @capacitor/status-bar (+1 more)

### Community 17 - "tutShow"
Cohesion: 0.36
Nodes (8): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutNav(), tutPlace(), tutShow(), tutSteps()

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
Cohesion: 0.18
Nodes (13): adDmgBoostActive(), attrCurText(), attrFxText(), cycleInterval(), gauntletGroup(), groupComplete(), hardUnlocked(), masteryMult() (+5 more)

### Community 30 - "PerkEffectType"
Cohesion: 0.10
Nodes (21): EvenLevelPerkConfig, PerkEffectType, CoinMult, CounterSlapDamageMult, CritChance, DamageMult, DamageReduction, DamageVsBoss (+13 more)

### Community 31 - "update"
Cohesion: 0.10
Nodes (42): abilityDef(), advanceEndless(), advanceGauntlet(), advanceRush(), applyBossEffect(), applySignatureHit(), effLevel(), endBossIntro() (+34 more)

### Community 32 - "BalanceConfig.cs"
Cohesion: 0.15
Nodes (11): IdleSlapper.Config, BlitzTierConfig, ChapterGateConfig, CoinPackConfig, EmberArtConfig, EnemyConfig, SlapCoinBandConfig, WorldId (+3 more)

### Community 33 - "applyHit"
Cohesion: 0.15
Nodes (23): applyHit(), applySpecialHit(), clearAttackTimeouts(), coinTarget(), consumeAdDmgAttempt(), consumeAdDmgWin(), dailyAdd(), fireBossSpecial() (+15 more)

### Community 34 - "BalanceConfig"
Cohesion: 0.14
Nodes (3): BalanceConfig, SkillConfig, SpecialMoveConfig

### Community 35 - "SkinId"
Cohesion: 0.22
Nodes (9): HandSkinConfig, RealMoneyBundleConfig, SkinId, Classic, Hulk, InfinityGauntlet, SpiderMan, Thor (+1 more)

### Community 36 - "AttributeType"
Cohesion: 0.13
Nodes (14): AttributeConfig, AttributeType, Accuracy, CoinMult, Combo, CritChance, CritDamage, Defense (+6 more)

### Community 37 - "RelicEffectType"
Cohesion: 0.14
Nodes (14): RelicConfig, RelicEffectType, CritBonus, EmberBonus, EnemyAttackSlow, EnemySpecialSlow, NonBossDamageMult, SetSkinSlapTriggerTo (+6 more)

### Community 38 - "main.jsx"
Cohesion: 0.33
Nodes (4): react-dom@^19.3.1, react-dom, App(), NativeBridge

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

### Community 43 - "hasSkill"
Cohesion: 0.27
Nodes (12): activateFrenzy(), claimSkillReward(), hasPrecision(), hasSkill(), parryCdTotal(), parryWindowSec(), precisionSlap(), reflexUnlocked() (+4 more)

### Community 44 - "StreetBrawlAnomaly"
Cohesion: 0.29
Nodes (7): AnomalyConfig, StreetBrawlAnomaly, Berserker, None, Pinata, SlapStorm, SuddenDeath

### Community 45 - "SkillActivationTrigger"
Cohesion: 0.33
Nodes (6): SkillActivationTrigger, ActiveDurationState, AlwaysOn, OnLowHpState, ProcEveryNSlaps, ProcOnHit

## Knowledge Gaps
- **109 isolated node(s):** `Power`, `Speed`, `CritChance`, `CritDamage`, `Defense` (+104 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 235 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `GameContext.jsx`, `applyHit`, `gameEngine.js`, `fmtNum`, `main.jsx`, `renderHub`, `enemyGeom`, `renderWorlds`, `switchTab`, `hasSkill`, `castSpecial`, `tutShow`, `stats`, `update`?**
  _High betweenness centrality (0.437) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `initGameEngine()` (e.g. with `cloudGetStatus()` and `compareSaveObjs()`) actually correct?**
  _`initGameEngine()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Power`, `Speed`, `CritChance` to the rest of the system?**
  _109 weakly-connected nodes found - possible missing edges._
- **Should `GameContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0598019801980198 - nodes in this community are weakly interconnected._
- **Why does `react` connect `GameContext.jsx` to `package.json`, `dependencies`, `main.jsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.05807622504537205 - nodes in this community are weakly interconnected._
- **Why does `@capacitor-firebase/authentication` connect `gameEngine.js` to `package.json`, `dependencies`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._