# Graph Report - these-hands  (2026-11-05)

## Corpus Check
- 50 files · ~62,156 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 577 nodes · 1610 edges · 32 communities (22 shown, 10 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 110 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `40346775`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GameContext.jsx
- package.json
- initGameEngine
- config.js
- ref_fs
- fmtNum
- renderAttrs
- applyHit
- switchTab
- MathPixelCanvas
- claimChest
- spawnEnemy
- renderHub
- switchTab
- castSpecial
- ExampleInstrumentedTest.java
- MainActivity.java
- enemyGeom
- GameAudio
- .unlock
- .oxlintrc.json
- hasSkill
- update
- showCombatBanner
- renderAwards

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 269 edges
2. `fmtNum()` - 36 edges
3. `applyHit()` - 30 edges
4. `useGame()` - 28 edges
5. `switchTab()` - 25 edges
6. `update()` - 25 edges
7. `spawnEnemy()` - 24 edges
8. `MathPixelCanvas` - 23 edges
9. `renderHub()` - 21 edges
10. `doReset()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `levelUpCost()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/engine.js → src/game/config.js
- `initGameEngine()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `levelUpCost()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `attrCost()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/engine.js → src/game/config.js
- `initGameEngine()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (32 total, 10 thin omitted)

### Community 0 - "GameContext.jsx"
Cohesion: 0.06
Nodes (69): react, AchToast(), ATTR_DESCS, AttrsScreen(), ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS (+61 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (51): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4 (+43 more)

### Community 2 - "initGameEngine"
Cohesion: 0.08
Nodes (32): initGameEngine(), atkRefDps(), dailyLevelMult(), dailyStage(), dailyStageMult(), dailyTier(), designMult(), dismissLevelUp() (+24 more)

### Community 3 - "config.js"
Cohesion: 0.08
Nodes (41): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl(), makeSprite() (+33 more)

### Community 4 - "ref_fs"
Cohesion: 0.06
Nodes (25): code, fs, fs, i, src, fs, i, src (+17 more)

### Community 5 - "fmtNum"
Cohesion: 0.21
Nodes (25): buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), closeMockCheckout(), confirmMockPurchase(), creditCoinsQuiet(), equipSkin() (+17 more)

### Community 6 - "renderAttrs"
Cohesion: 0.15
Nodes (29): attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort(), attrNextText() (+21 more)

### Community 7 - "applyHit"
Cohesion: 0.22
Nodes (19): abilityDef(), applyHit(), applySpecialHit(), coinTarget(), hasAbility(), hurtPlayer(), killEnemy(), masteryMult() (+11 more)

### Community 8 - "switchTab"
Cohesion: 0.14
Nodes (20): applySkinVisuals(), buildSkinArt(), defaultAttrs(), defaultChest(), defaultDaily(), defaultStats(), doReset(), ensureHubReady() (+12 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "claimChest"
Cohesion: 0.31
Nodes (11): activateCoinBoost(), activateDmgBoost(), chestPreview(), chestUnlocked(), claimChest(), playRewardedAd(), renderChest(), showWebAdModal() (+3 more)

### Community 11 - "spawnEnemy"
Cohesion: 0.14
Nodes (18): advanceGauntlet(), advanceRush(), bossBgImg(), clearAttackTimeouts(), drawStage(), evictStageBgs(), fireBossSpecial(), hideBossWarn() (+10 more)

### Community 12 - "renderHub"
Cohesion: 0.36
Nodes (8): advanceEndless(), endlessPick(), endlessPool(), renderHub(), rushBosses(), startBossRush(), startEndless(), updateCoinHud()

### Community 13 - "switchTab"
Cohesion: 0.24
Nodes (12): chooseEnemy(), enemyUnlocked(), grantGroupReward(), groupComplete(), groupRewardCoins(), hardUnlocked(), renderSelect(), selectGroupHtml() (+4 more)

### Community 14 - "castSpecial"
Cohesion: 0.33
Nodes (13): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+5 more)

### Community 17 - "enemyGeom"
Cohesion: 0.18
Nodes (16): draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawHands(), drawHandSprite(), drawSpecialFx(), drawWeakSpot() (+8 more)

### Community 19 - ".unlock"
Cohesion: 0.19
Nodes (12): initShopFilters(), setShopFilter(), Sound, startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutNav() (+4 more)

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "hasSkill"
Cohesion: 0.27
Nodes (14): abilitiesHtml(), activateFrenzy(), buySkill(), hasSkill(), iconUrl(), makeSprite(), renderAbilities(), renderSkillDetail() (+6 more)

### Community 29 - "update"
Cohesion: 0.25
Nodes (9): cycleInterval(), endBossIntro(), enemyAttack(), enemyCurInterval(), frame(), slapBounds(), tickSpecials(), update() (+1 more)

### Community 30 - "showCombatBanner"
Cohesion: 0.36
Nodes (8): applyBossEffect(), hasPrecision(), precisionSlap(), showCombatBanner(), tickWeakSpot(), updateFxChips(), weakCap(), weakInterval()

### Community 31 - "renderAwards"
Cohesion: 0.32
Nodes (8): checkAchievements(), fmtMinSec(), fmtTime(), renderAwards(), claimAllAchievements(), showAchToast(), showEndOverlay(), updateAwardsBadge()

## Knowledge Gaps
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `package.json`, `config.js`, `fmtNum`, `renderAttrs`, `applyHit`, `switchTab`, `claimChest`, `spawnEnemy`, `renderHub`, `switchTab`, `castSpecial`, `enemyGeom`, `.unlock`, `hasSkill`, `update`, `showCombatBanner`, `renderAwards`?**
  _High betweenness centrality (0.588) - this node is a cross-community bridge._
- **Are the 17 inferred relationships involving `initGameEngine()` (e.g. with `buyLevel()` and `castSpecial()`) actually correct?**
  _`initGameEngine()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Should `GameContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0627147766323024 - nodes in this community are weakly interconnected._
- **Why does `react` connect `GameContext.jsx` to `package.json`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05075187969924812 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `package.json` to `ref_fs`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.08048780487804878 - nodes in this community are weakly interconnected._