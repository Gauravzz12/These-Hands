# Graph Report - these-hands  (2026-11-10)

## Corpus Check
- 51 files · ~77,316 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .xml 10, (none) 3, .properties 2)

## Summary
- 615 nodes · 1742 edges · 32 communities (22 shown, 10 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 114 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `834a9b8e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GameContext.jsx
- package.json
- initGameEngine
- config.js
- ref_fs
- renderAttrs
- fmtNum
- claimChest
- dailyAdd
- MathPixelCanvas
- atkRefDps
- dependencies
- renderSkills
- nativeBridge.js
- ExampleInstrumentedTest.java
- MainActivity.java
- castSpecial
- GameAudio
- .unlock
- .oxlintrc.json
- scripts
- generate_android_icons.cjs
- applyHit
- wireSelectCards
- switchTab

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
- `App()` --calls--> `initGameEngine()`  [EXTRACTED]
  src/App.jsx → src/game/gameEngine.js
- `initGameEngine()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `levelUpCost()` --calls--> `calcLevelUpCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `initGameEngine()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js
- `attrCost()` --calls--> `calcAttrCost()`  [EXTRACTED]
  src/game/gameEngine.js → src/game/config.js

## Import Cycles
- 2-file cycle: `src/game/config.js -> src/game/enemies.js -> src/game/config.js`

## Communities (32 total, 10 thin omitted)

### Community 0 - "GameContext.jsx"
Cohesion: 0.06
Nodes (72): react, AchToast(), ATTR_DESCS, AttrsScreen(), ACH_EMOJIS, AwardsScreen(), fmtNum(), STAT_DEFS (+64 more)

### Community 1 - "package.json"
Cohesion: 0.13
Nodes (19): devDependencies, oxlint@^1.88.0, puppeteer-core@^25.16.0, sharp@^0.35.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, vite@^8.3.4, @vitejs/plugin-react@^6.1.2 (+11 more)

### Community 2 - "initGameEngine"
Cohesion: 0.06
Nodes (48): initGameEngine(), applySkinVisuals(), buildSkinArt(), closeMockCheckout(), closeStoreCheckoutModal(), confirmMockPurchase(), confirmStoreCheckoutModal(), dailyStage() (+40 more)

### Community 3 - "config.js"
Cohesion: 0.08
Nodes (42): ABILITY_ICONS, ACH_ICON_FALLBACK, ACH_ICONS, ENEMY_ART, HAND_URI, ICON_URL_CACHE, iconUrl(), makeSprite() (+34 more)

### Community 4 - "ref_fs"
Cohesion: 0.08
Nodes (18): code, fs, fs, i, src, fs, i, src (+10 more)

### Community 5 - "renderAttrs"
Cohesion: 0.17
Nodes (23): attrCap(), attrCost(), attrCurText(), attrEffectiveCap(), attrFxText(), attrLevelGate(), attrNextShort(), attrNextText() (+15 more)

### Community 6 - "fmtNum"
Cohesion: 0.22
Nodes (25): buyCoinPack(), buyOffline(), buySkin(), checkCollectionReward(), equipSkin(), fmtNum(), grantStorePurchaseReward(), openStoreCheckoutModal() (+17 more)

### Community 7 - "claimChest"
Cohesion: 0.23
Nodes (14): activateCoinBoost(), activateDmgBoost(), chestPreview(), chestUnlocked(), claimChest(), dailyLevelMult(), frontierBounty(), getDayReward() (+6 more)

### Community 8 - "dailyAdd"
Cohesion: 0.36
Nodes (11): claimQuest(), creditCoinsQuiet(), dailyAdd(), ensureDaily(), grantGroupReward(), groupRewardCoins(), questClaimableCount(), questsUnlocked() (+3 more)

### Community 9 - "MathPixelCanvas"
Cohesion: 0.40
Nodes (12): generateGoblinSproutOption1(), generateGoblinSproutOption2(), generateGooseOption1(), generateGooseOption2(), generateMimeOption1(), generateMimeOption2(), generateMonkeyOption1(), generateMonkeyOption2() (+4 more)

### Community 10 - "atkRefDps"
Cohesion: 0.67
Nodes (4): atkRefDps(), designMult(), expectedBuild(), expectedDps()

### Community 12 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @capacitor/android@^8.6.0, @capacitor/app@^8.1.2, @capacitor/cli@^8.6.0, @capacitor-community/admob@^8.3.0, react@^19.3.1, react-dom@^19.3.1, @revenuecat/purchases-capacitor@^14.0.0 (+6 more)

### Community 13 - "renderSkills"
Cohesion: 0.33
Nodes (11): abilitiesHtml(), buySkill(), iconUrl(), makeSprite(), renderAbilities(), renderSkillDetail(), renderSkills(), renderSprite() (+3 more)

### Community 14 - "nativeBridge.js"
Cohesion: 0.18
Nodes (9): @capacitor/core@^8.6.0, @capacitor/splash-screen@^8.0.2, @capacitor/status-bar@^8.0.4, @capacitor/core, @capacitor/splash-screen, @capacitor/status-bar, App(), NativeBridge (+1 more)

### Community 17 - "castSpecial"
Cohesion: 0.33
Nodes (13): barrierStats(), buySpecUpgrade(), castSpecial(), fmtMult(), renderSpecials(), renderSpecRail(), renderSpecRailCd(), specCdOf() (+5 more)

### Community 19 - ".unlock"
Cohesion: 0.43
Nodes (7): startTutorial(), tutAdvance(), tutBuild(), tutEnd(), tutNav(), tutPlace(), tutShow()

### Community 20 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, build:apk, build:bundle, cap:open, cap:sync, dev, lint (+2 more)

### Community 29 - "generate_android_icons.cjs"
Cohesion: 0.25
Nodes (7): densities, fs, generate(), path, resDir, sharp, srcIcon

### Community 31 - "applyHit"
Cohesion: 0.05
Nodes (89): abilityDef(), activateFrenzy(), advanceGauntlet(), advanceRush(), applyBossEffect(), applyHit(), applySpecialHit(), bossBgImg() (+81 more)

### Community 33 - "wireSelectCards"
Cohesion: 0.13
Nodes (21): chooseEnemy(), enemyUnlocked(), fmtMinSec(), fmtTime(), groupComplete(), hardUnlocked(), initShopFilters(), renderSelect() (+13 more)

### Community 34 - "switchTab"
Cohesion: 0.16
Nodes (20): advanceEndless(), checkAchievements(), endlessPick(), endlessPool(), grantGems(), hideEndOverlay(), hideFightLoader(), renderAwards() (+12 more)

## Knowledge Gaps
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGameEngine()` connect `initGameEngine` to `GameContext.jsx`, `wireSelectCards`, `switchTab`, `config.js`, `renderAttrs`, `fmtNum`, `claimChest`, `dailyAdd`, `atkRefDps`, `renderSkills`, `nativeBridge.js`, `castSpecial`, `.unlock`, `applyHit`?**
  _High betweenness centrality (0.612) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `initGameEngine()` (e.g. with `buyLevel()` and `castSpecial()`) actually correct?**
  _`initGameEngine()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Should `GameContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0594059405940594 - nodes in this community are weakly interconnected._
- **Why does `react` connect `GameContext.jsx` to `package.json`, `dependencies`, `nativeBridge.js`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `package.json` to `generate_android_icons.cjs`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `initGameEngine` be split into smaller, more focused modules?**
  _Cohesion score 0.06077694235588972 - nodes in this community are weakly interconnected._