# Graph Report - these-hands  (2026-11-05)

## Corpus Check
- 51 files · ~66,063 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 613 nodes · 1737 edges · 32 communities (22 shown, 10 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 114 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a516c38f`
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
- update
- switchTab
- MathPixelCanvas
- claimChest
- renderWorlds
- dependencies
- applyHit
- nativeBridge.js
- ExampleInstrumentedTest.java
- MainActivity.java
- castSpecial
- GameAudio
- .unlock
- .oxlintrc.json
- scripts
- generate_android_icons.cjs
- tickBossSpecial
- atkRefDps

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 302 edges
2. `fmtNum()` - 37 edges
3. `applyHit()` - 34 edges
4. `update()` - 29 edges
5. `switchTab()` - 29 edges
6. `useGame()` - 28 edges
7. `spawnEnemy()` - 25 edges
8. `MathPixelCanvas` - 23 edges
9. `hasSkill()` - 22 edges
10. `renderHub()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `LevelUpModal()` --calls--> `useGame()`  [EXTRACTED]
  src/components/LevelUpModal.jsx → src/context/GameContext.jsx
- `initGameEngine()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `attrCost()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `buildAllEnemies()` --calls--> `calcEnemyHp()`  [EXTRACTED]
  src/game/enemies.js → src/game/config.js
- `initGameEngine()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (32 total, 10 thin omitted)

### Community 0 - "GameContext.jsx"
Cohesion: 0.06
Nodes (76): react, AchToast(), ATTR_DESCS, AttrsScreen(), ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS (+68 more)

### Community 1 - "package.json"
Cohesion: 0.13
Nodes (19): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, vite@^8.3.4, @vitejs/plugin-react@^6.1.2 (+11 more)

### Community 2 - "initGameEngine"
Cohesion: 0.06
Nodes (47): initGameEngine(), bossBgImg(), closeMockCheckout(), closeStoreCheckoutModal(), confirmMockPurchase(), confirmStoreCheckoutModal(), dailyStage(), dailyStageMult() (+39 more)

### Community 3 - "config.js"
Cohesion: 0.08
Nodes (37): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl(), makeSprite() (+29 more)

### Community 4 - "ref_fs"
Cohesion: 0.08
Nodes (18): code, fs, fs, i, src, fs, i, src (+10 more)

### Community 5 - "fmtNum"
Cohesion: 0.11
Nodes (42): applySkinVisuals(), buildSkinArt(), buyCoinPack(), buyOffline(), buySkin(), checkAchievements(), checkCollectionReward(), creditCoinsQuiet() (+34 more)

### Community 6 - "renderAttrs"
Cohesion: 0.11
Nodes (40): abilitiesHtml(), attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort() (+32 more)

### Community 7 - "update"
Cohesion: 0.15
Nodes (29): abilityDef(), activateFrenzy(), advanceEndless(), advanceGauntlet(), advanceRush(), cycleInterval(), endBossIntro(), enemyAttack() (+21 more)

### Community 8 - "switchTab"
Cohesion: 0.07
Nodes (44): chooseEnemy(), defaultAttrs(), defaultChest(), defaultDaily(), defaultStats(), doReset(), endlessPick(), endlessPool() (+36 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "claimChest"
Cohesion: 0.23
Nodes (14): activateCoinBoost(), activateDmgBoost(), chestPreview(), chestUnlocked(), claimChest(), dailyLevelMult(), frontierBounty(), getDayReward() (+6 more)

### Community 11 - "renderWorlds"
Cohesion: 0.17
Nodes (18): buyArt(), hasArt(), procEvery(), relicDef(), relicDescText(), relicEquipped(), relicStars(), relicVal() (+10 more)

### Community 12 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, react@^19.3.1, react-dom@^19.3.1, @revenuecat/purchases-capacitor@^14.0.0 (+6 more)

### Community 13 - "applyHit"
Cohesion: 0.24
Nodes (17): applyHit(), applySpecialHit(), clearAttackTimeouts(), coinTarget(), enemyGeom(), hideBossWarn(), killEnemy(), loseFight() (+9 more)

### Community 14 - "nativeBridge.js"
Cohesion: 0.18
Nodes (9): @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4, @capacitor/core, @capacitor/splash-screen, @capacitor/status-bar, App(), NativeBridge (+1 more)

### Community 17 - "castSpecial"
Cohesion: 0.33
Nodes (13): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+5 more)

### Community 19 - ".unlock"
Cohesion: 0.36
Nodes (8): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutNav(), tutPlace(), tutShow(), tutSteps()

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "generate_android_icons.cjs"
Cohesion: 0.25
Nodes (7): densities, fs, generate(), path, resDir, sharp, srcIcon

### Community 30 - "tickBossSpecial"
Cohesion: 0.22
Nodes (10): applyBossEffect(), enemyCurInterval(), fireBossSpecial(), startBossTelegraph(), stunReady(), tickBossSpecial(), tickPFX(), trySpecialStun() (+2 more)

### Community 31 - "atkRefDps"
Cohesion: 0.67
Nodes (4): atkRefDps(), designMult(), expectedBuild(), expectedDps()

## Knowledge Gaps
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `GameContext.jsx`, `config.js`, `fmtNum`, `renderAttrs`, `update`, `switchTab`, `claimChest`, `renderWorlds`, `applyHit`, `nativeBridge.js`, `castSpecial`, `.unlock`, `tickBossSpecial`, `atkRefDps`?**
  _High betweenness centrality (0.613) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `initGameEngine()` (e.g. with `buyLevel()` and `castSpecial()`) actually correct?**
  _`initGameEngine()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Should `GameContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05989010989010989 - nodes in this community are weakly interconnected._
- **Why does `react` connect `GameContext.jsx` to `package.json`, `dependencies`, `nativeBridge.js`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `package.json` to `generate_android_icons.cjs`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.06233766233766234 - nodes in this community are weakly interconnected._