# Graph Report - these-hands  (2026-11-11)

## Corpus Check
- 51 files · ~76,751 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 617 nodes · 1748 edges · 31 communities (21 shown, 10 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 114 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `199db63c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GameContext.jsx
- package.json
- initGameEngine
- config.js
- ref_fs
- fmtNum
- renderHub
- claimChest
- renderWorlds
- MathPixelCanvas
- draw
- switchTab
- dependencies
- applySkinVisuals
- main.jsx
- ExampleInstrumentedTest.java
- MainActivity.java
- tutShow
- GameAudio
- vite
- .oxlintrc.json
- scripts
- applyHit
- .unlock

## God Nodes (most connected - your core abstractions)
1. `initGameEngine()` - 302 edges
2. `fmtNum()` - 37 edges
3. `applyHit()` - 34 edges
4. `switchTab()` - 29 edges
5. `update()` - 29 edges
6. `useGame()` - 28 edges
7. `spawnEnemy()` - 25 edges
8. `MathPixelCanvas` - 23 edges
9. `hasSkill()` - 22 edges
10. `renderHub()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `initGameEngine()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `levelUpCost()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `initGameEngine()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `attrCost()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `buildAllEnemies()` --calls--> `calcEnemyHp()`  [EXTRACTED]
  src/game/enemies.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (31 total, 10 thin omitted)

### Community 0 - "GameContext.jsx"
Cohesion: 0.06
Nodes (76): react, AchToast(), ATTR_DESCS, AttrsScreen(), ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS (+68 more)

### Community 1 - "package.json"
Cohesion: 0.17
Nodes (15): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, name, private (+7 more)

### Community 2 - "initGameEngine"
Cohesion: 0.07
Nodes (43): initGameEngine(), atkRefDps(), closeMockCheckout(), closeStoreCheckoutModal(), confirmMockPurchase(), confirmStoreCheckoutModal(), dailyStage(), dailyStageMult() (+35 more)

### Community 3 - "config.js"
Cohesion: 0.08
Nodes (38): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl(), makeSprite() (+30 more)

### Community 4 - "ref_fs"
Cohesion: 0.06
Nodes (25): code, fs, fs, i, src, fs, i, src (+17 more)

### Community 5 - "fmtNum"
Cohesion: 0.18
Nodes (28): buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), creditCoinsQuiet(), fmtNum(), grantGems(), grantStorePurchaseReward() (+20 more)

### Community 6 - "renderHub"
Cohesion: 0.12
Nodes (37): attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort(), attrNextText() (+29 more)

### Community 7 - "claimChest"
Cohesion: 0.23
Nodes (14): activateCoinBoost(), activateDmgBoost(), chestPreview(), chestUnlocked(), claimChest(), dailyLevelMult(), frontierBounty(), getDayReward() (+6 more)

### Community 8 - "renderWorlds"
Cohesion: 0.25
Nodes (11): buyArt(), relicDef(), relicDescText(), relicEquipped(), relicStars(), renderWorlds(), startWorldFight(), toggleRelic() (+3 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "draw"
Cohesion: 0.13
Nodes (18): bossBgImg(), draw(), drawBossSpecialFx(), drawEnemy(), drawFx(), drawSpecialFx(), drawStage(), drawWeakSpot() (+10 more)

### Community 11 - "switchTab"
Cohesion: 0.22
Nodes (13): checkAchievements(), hideEndOverlay(), hideFightLoader(), preloadAllSkins(), renderAwards(), claimAllAchievements(), renderDebug(), resize() (+5 more)

### Community 12 - "dependencies"
Cohesion: 0.12
Nodes (19): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4 (+11 more)

### Community 13 - "applySkinVisuals"
Cohesion: 0.32
Nodes (8): applySkinVisuals(), buildSkinArt(), ensureHubReady(), ensureSkinArt(), equipSkin(), greyCopyOf(), renderStartShowcase(), setHubState()

### Community 14 - "main.jsx"
Cohesion: 0.33
Nodes (4): react-dom@^19.3.1, react-dom, App(), NativeBridge

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

### Community 31 - "applyHit"
Cohesion: 0.06
Nodes (87): abilitiesHtml(), abilityDef(), activateFrenzy(), advanceEndless(), advanceGauntlet(), advanceRush(), applyBossEffect(), applyHit() (+79 more)

### Community 33 - ".unlock"
Cohesion: 0.14
Nodes (19): chooseEnemy(), enemyUnlocked(), fmtMinSec(), fmtTime(), grantGroupReward(), groupComplete(), groupRewardCoins(), hardUnlocked() (+11 more)

## Knowledge Gaps
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `GameContext.jsx`, `.unlock`, `config.js`, `fmtNum`, `renderHub`, `claimChest`, `renderWorlds`, `draw`, `switchTab`, `applySkinVisuals`, `main.jsx`, `tutShow`, `applyHit`?**
  _High betweenness centrality (0.612) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `initGameEngine()` (e.g. with `buyLevel()` and `castSpecial()`) actually correct?**
  _`initGameEngine()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Should `GameContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05911949685534591 - nodes in this community are weakly interconnected._
- **Why does `react` connect `GameContext.jsx` to `package.json`, `dependencies`, `main.jsx`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.06561085972850679 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `package.json` to `ref_fs`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `config.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07585568917668825 - nodes in this community are weakly interconnected._