# IDLE SLAPPER — Complete Game Values & Numbers Reference

Every system, value and number in the game, extracted from the live build's own configuration (`src/game/config.js`, `worlds.js`, `gameEngine.js`). Generated 2026-11-14. If a number here disagrees with the game, the game code wins — this file is a mirror, not a source.

## 1. Enemy Roster (50)

Groups of 5. Every 10th enemy (idx 9/19/29/39) is a boss pair finale; idx 49 is the Dragon Lord. `Interval` = seconds between enemy attacks.

| # | Enemy | Group | HP | ATK dmg | Attack interval | Bounty (coins) | Tags |
|---|-------|-------|----|---------|-----------------|----------------|------|
| 1 | Training Dummy | Cozy Corner | 65 | 8 | 2.4s | 30 |  |
| 2 | Rubber Duck | Cozy Corner | 97 | 12 | 2.35s | 30 |  |
| 3 | Rubber Chicken | Cozy Corner | 145 | 15 | 2.3s | 36 |  |
| 4 | Cardboard Knight | Cozy Corner | 220 | 20 | 2.25s | 55 |  |
| 5 | Grumpy Teddy | Cozy Corner | 363 | 26 | 2.05s | 88 | ELITE MINI-BOSS |
| 6 | Sassy Goblin Sprout | Backyard Bunch | 455 | 28 | 2.2s | 109 |  |
| 7 | Mime | Backyard Bunch | 638 | 32 | 2.15s | 151 |  |
| 8 | Cocky Goose | Backyard Bunch | 893 | 38 | 2.1s | 208 |  |
| 9 | Trash Panda | Backyard Bunch | 1,303 | 46 | 2.05s | 299 | ELITE |
| 10 | Mischievous Monkey | Backyard Bunch | 2,415 | 54 | 1.95s | 737 | ELITE BOSS |
| 11 | Bodybuilder | Fight Club | 4,150 | 64 | 2.13s | 1,150 |  |
| 12 | Luchador Wrestler | Fight Club | 5,582 | 72 | 2.1s | 1,501 |  |
| 13 | Kickboxer | Fight Club | 7,507 | 81 | 2.08s | 1,958 |  |
| 14 | Adult Boxer | Fight Club | 10,098 | 91 | 2.05s | 2,556 |  |
| 15 | Sumo Champion | Fight Club | 16,297 | 138 | 2.03s | 3,736 | ELITE MINI-BOSS |
| 16 | Castle Guard | Castle Guard | 18,267 | 115 | 2s | 4,353 |  |
| 17 | Royal Executioner | Castle Guard | 24,569 | 130 | 1.98s | 5,680 |  |
| 18 | Knight | Castle Guard | 33,045 | 146 | 1.95s | 7,413 |  |
| 19 | Barbarian | Castle Guard | 49,779 | 222 | 1.93s | 10,254 | ELITE |
| 20 | Dark Knight | Castle Guard | 77,713 | 305 | 1.84s | 15,780 | ELITE BOSS |
| 21 | Skeleton Warrior | Graveyard Shift | 80,403 | 208 | 1.88s | 16,474 |  |
| 22 | Zombie | Graveyard Shift | 108,142 | 234 | 1.86s | 21,499 |  |
| 23 | Armored Skeleton | Graveyard Shift | 145,451 | 263 | 1.84s | 28,056 |  |
| 24 | Scarab Swarm | Graveyard Shift | 195,631 | 296 | 1.82s | 36,613 |  |
| 25 | Mummy Guard | Graveyard Shift | 315,749 | 449 | 1.79s | 53,513 | ELITE MINI-BOSS |
| 26 | Ninja Recruit | Shadow Dojo | 353,901 | 375 | 1.77s | 62,353 |  |
| 27 | Shuriken Master | Shadow Dojo | 475,997 | 421 | 1.75s | 81,370 |  |
| 28 | Samurai Duelist | Shadow Dojo | 640,217 | 474 | 1.73s | 106,188 |  |
| 29 | Shadow Assassin | Shadow Dojo | 964,422 | 720 | 1.71s | 146,890 | ELITE |
| 30 | Shogun Warlord | Shadow Dojo | 1,505,618 | 990 | 1.63s | 226,052 | ELITE BOSS |
| 31 | Werewolf | Dark Woods | 1,708,298 | 663 | 1.67s | 259,507 |  |
| 32 | Giant Spider | Dark Woods | 2,519,739 | 732 | 1.65s | 372,393 |  |
| 33 | Orc Warrior | Dark Woods | 3,716,615 | 809 | 1.63s | 534,384 |  |
| 34 | Bog Witch | Dark Woods | 5,482,007 | 894 | 1.61s | 766,841 |  |
| 35 | Shadow Beast | Dark Woods | 9,703,152 | 1,334 | 1.59s | 1,232,466 | ELITE MINI-BOSS |
| 36 | Giant Serpent | Pharaoh's Tomb | 11,926,791 | 1,092 | 1.57s | 1,579,098 |  |
| 37 | Anubis Warrior | Pharaoh's Tomb | 17,592,017 | 1,207 | 1.55s | 2,266,005 |  |
| 38 | Sphinx Riddler | Pharaoh's Tomb | 25,948,225 | 1,333 | 1.53s | 3,251,717 |  |
| 39 | Giant Scorpion | Pharaoh's Tomb | 42,866,468 | 1,989 | 1.51s | 4,946,187 | ELITE |
| 40 | Pharaoh Revenant | Pharaoh's Tomb | 73,389,690 | 2,686 | 1.44s | 8,370,022 | ELITE BOSS |
| 41 | Troll | Mountain Stronghold | 83,269,072 | 1,799 | 1.48s | 9,608,785 |  |
| 42 | Ogre | Mountain Stronghold | 122,821,881 | 1,988 | 1.46s | 13,788,606 |  |
| 43 | Minotaur | Mountain Stronghold | 181,162,274 | 2,197 | 1.44s | 19,786,650 |  |
| 44 | Cyclops | Mountain Stronghold | 267,214,354 | 2,427 | 1.42s | 28,393,843 |  |
| 45 | Stone Golem | Mountain Stronghold | 472,969,407 | 3,621 | 1.4s | 45,634,585 | ELITE MINI-BOSS |
| 46 | Elder Dragon | Dragon Lair | 581,358,229 | 2,964 | 1.4s | 58,469,311 |  |
| 47 | Dragon Champion | Dragon Lair | 857,503,388 | 3,275 | 1.4s | 83,903,462 |  |
| 48 | Crystal Dragon | Dragon Lair | 1,264,817,497 | 3,619 | 1.4s | 120,401,468 |  |
| 49 | Ancient Dragon | Dragon Lair | 1,820,000,000 | 5,399 | 1.4s | 183,142,673 | ELITE |
| 50 | Dragon Lord | Dragon Lair | 2,150,000,000 | 4,650 | 1.4s | 309,917,141 | ELITE BOSS |
| 51 | Frost Wolf Alpha | 10 | 1,328,058,372 | 7,091 | 1.4s | 129,925,900 |  |
| 52 | Ice Witch | 10 | 1,394,461,291 | 8,084 | 1.4s | 187,353,149 |  |
| 53 | Snow Golem | 10 | 1,464,184,356 | 9,216 | 1.4s | 270,163,240 |  |
| 54 | Yeti Brute | 10 | 1,537,393,574 | 10,506 | 1.4s | 389,575,392 |  |
| 55 | Glacier Titan | 10 | 3,044,545,312 | 16,768 | 1.4s | 870,739,959 | ELITE MINI-BOSS |
| 56 | Raptor Rascal | 11 | 2,832,409,251 | 13,654 | 1.4s | 810,069,046 |  |
| 57 | Triceratops Tank | 11 | 4,084,334,141 | 15,566 | 1.4s | 1,168,119,564 |  |
| 58 | Pterodactyl Diver | 11 | 5,889,609,831 | 17,745 | 1.4s | 1,684,428,412 |  |
| 59 | Spinosaurus Brute | 11 | 13,163,866,933 | 28,321 | 1.4s | 3,764,865,943 | ELITE |
| 60 | T-Rex King | 11 | 30,616,606,640 | 41,510 | 1.4s | 11,821,071,824 | ELITE BOSS |
| 61 | Fire Elemental | 12 | 17,659,658,710 | 26,290 | 1.4s | 5,050,662,391 |  |
| 62 | Ice Golem | 12 | 25,465,227,860 | 29,970 | 1.4s | 7,283,055,168 |  |
| 63 | Demon Warrior | 12 | 36,720,858,574 | 34,166 | 1.4s | 10,502,165,552 |  |
| 64 | Demon Brute | 12 | 52,951,478,064 | 38,949 | 1.4s | 15,144,122,726 |  |
| 65 | Cerberus | 12 | 118,351,848,620 | 62,163 | 1.4s | 33,848,628,705 | ELITE MINI-BOSS |
| 66 | Satyr Trickster | 13 | 110,105,397,233 | 50,619 | 1.4s | 31,490,143,609 |  |
| 67 | Centaur Archer | 13 | 158,771,982,809 | 57,705 | 1.4s | 45,408,787,083 |  |
| 68 | Griffon | 13 | 228,949,199,211 | 65,784 | 1.4s | 65,479,470,974 |  |
| 69 | Medusa | 13 | 511,724,355,157 | 104,991 | 1.4s | 146,353,165,575 | ELITE |
| 70 | Zeus Thunderer | 13 | 1,190,171,806,671 | 153,887 | 1.4s | 459,525,334,556 | ELITE BOSS |
| 71 | Rusty Bot | 14 | 686,491,098,088 | 97,462 | 1.4s | 196,336,454,053 |  |
| 72 | Welder Drone | 14 | 989,920,163,442 | 111,106 | 1.4s | 283,117,166,744 |  |
| 73 | Crusher Mech | 14 | 1,427,464,875,684 | 126,661 | 1.4s | 408,254,954,446 |  |
| 74 | Sawblade Sentinel | 14 | 2,058,404,350,736 | 144,394 | 1.4s | 588,703,644,310 |  |
| 75 | Factory Overlord | 14 | 4,600,739,564,331 | 230,452 | 1.4s | 1,315,811,515,399 | ELITE MINI-BOSS |
| 76 | Little Grey | 15 | 4,280,171,904,365 | 187,654 | 1.4s | 1,224,129,164,648 |  |
| 77 | Martian Soldier | 15 | 6,172,007,886,094 | 213,926 | 1.4s | 1,765,194,255,423 |  |
| 78 | UFO Pilot | 15 | 8,900,035,371,747 | 243,875 | 1.4s | 2,545,410,116,320 |  |
| 79 | Xeno Hunter | 15 | 19,892,469,059,392 | 389,225 | 1.4s | 5,689,246,150,986 | ELITE |
| 80 | Alien Warlord | 15 | 46,266,032,876,844 | 570,492 | 1.4s | 17,863,315,293,749 | ELITE BOSS |
| 81 | Ancient Guardian | 16 | 26,686,247,763,364 | 361,312 | 1.4s | 7,632,266,860,322 |  |
| 82 | Crystal Titan | 16 | 38,481,569,274,770 | 411,895 | 1.4s | 11,005,728,812,584 |  |
| 83 | Void Knight | 16 | 55,490,422,894,219 | 469,561 | 1.4s | 15,870,260,947,747 |  |
| 84 | Storm Giant | 16 | 80,017,189,813,463 | 535,299 | 1.4s | 22,884,916,286,650 |  |
| 85 | Phoenix | 16 | 178,846,420,952,072 | 854,338 | 1.4s | 51,150,076,392,293 | ELITE MINI-BOSS |
| 86 | Bubble Crab | 17 | 166,384,863,879,283 | 695,675 | 1.4s | 47,586,071,069,475 |  |
| 87 | Sailor Squid | 17 | 239,926,973,713,925 | 793,069 | 1.4s | 68,619,114,482,183 |  |
| 88 | Hammerhead Brawler | 17 | 345,974,696,095,480 | 904,099 | 1.4s | 98,948,763,083,307 |  |
| 89 | Angler Horror | 17 | 773,288,043,243,008 | 1,442,942 | 1.4s | 221,160,380,367,500 | ELITE |
| 90 | Kraken Spawn | 17 | 1,798,518,319,929,706 | 2,114,941 | 1.4s | 694,407,923,324,860 | ELITE BOSS |
| 91 | Void Walker | 18 | 1,037,385,366,935,455 | 1,339,463 | 1.4s | 296,692,214,943,540 |  |
| 92 | Star Eater | 18 | 1,495,909,699,120,926 | 1,526,987 | 1.4s | 427,830,173,948,585 |  |
| 93 | Nebula Serpent | 18 | 2,157,101,786,132,374 | 1,740,766 | 1.4s | 616,931,110,833,859 |  |
| 94 | Dark Matter Knight | 18 | 3,110,540,775,602,884 | 1,984,473 | 1.4s | 889,614,661,822,425 |  |
| 95 | Eldritch Horror | 18 | 6,952,369,687,550,006 | 3,167,219 | 1.4s | 1,988,377,730,639,302 | ELITE MINI-BOSS |
| 96 | Celestial Knight | 19 | 6,467,946,509,320,714 | 2,579,021 | 1.4s | 1,849,832,701,665,725 |  |
| 97 | Archangel of War | 19 | 9,326,778,866,440,470 | 2,940,084 | 1.4s | 2,667,458,755,801,975 |  |
| 98 | Seraphim Judge | 19 | 13,449,215,125,407,156 | 3,351,696 | 1.4s | 3,846,475,525,866,447 |  |
| 99 | The Gatekeeper | 19 | 30,060,340,726,797,536 | 5,349,306 | 1.4s | 8,597,257,447,864,096 | ELITE |
| 100 | The Almighty Hand | 19 | 69,914,534,400,067,820 | 7,840,555 | 1.4s | 26,994,001,731,866,190 | ELITE BOSS |

## 2. Player Progression

- **Level cap:** 80 (attribute cap rises with level; staged Power ceiling 70 → 75 after Dragon Lord → 80 after Ravana)
- **Player HP:** base 100 + 25/level, then exponential: `HP = (100 + 25×(Lv−1)) + 15 × 1.16^(Lv−1)` growth (expBase 15, expGrowth 1.16)
- **Level-up cost:** base 150, growth ×1.95 early; piecewise anchors — Lv10 ramp, mid anchor 46,000 @ Lv25 (×1.33), late anchor 4,400,000 @ Lv45 (×1.21), end anchor 240,000,000 (×1.26), world segment from Lv50 (×1.22)
- **Level-up cost samples:** Lv1→2: 150, Lv2→3: 263, Lv3→4: 459, Lv4→5: 804, Lv5→6: 1,407, Lv6→7: 2,462, Lv7→8: 4,308, Lv8→9: 7,540, Lv9→10: 13,195, Lv10→11: 18,500, Lv11→12: 23,680, Lv12→13: 30,310, Lv13→14: 38,797, Lv14→15: 49,661, Lv15→16: 63,566, Lv16→17: 81,364, Lv17→18: 104,146, Lv18→19: 133,307, Lv19→20: 170,632, Lv20→21: 218,409 …

### Level perks (one permanent perk per level)

| Level | Perk | Effect |
|-------|------|--------|
| 2 | Iron Palm | +25% damage on every slap permanently. |
| 3 | Quickening | +10% slap speed. |
| 4 | Thick Skin | Reduces incoming enemy attack damage by 15%. |
| 5 | Greed | +20% coins from all sources. |
| 6 | Vampire Slap | Every 10th slap heals you for 1% of Max HP (min 10 HP). |
| 7 | Crit Surge | +8% critical strike chance. |
| 8 | Second Wind | Once per fight, when HP drops to 0, immediately recover 30% HP. |
| 9 | Boss Bane | +25% damage against Group Elites, Mini-Bosses, and Bosses. |
| 10 | Golden Aura | +30% coins earned. |
| 11 | Counter Cadence | After taking a hit, your next slap deals 2x damage. |
| 12 | Battle Focus | At combo stack 8+, your slaps gain +15% stun chance. |
| 13 | Tough Grit | When below 50% HP, take 25% less damage. |
| 14 | Overcharge | Critical hits discharge kinetic defense, dealing bonus damage equal to 50% of your Defense stat. |
| 15 | Giant Stature | +150 Max HP, and striking an Elite or Boss grants +1 extra combo stack. |
| 16 | Swift Recovery | Dodging or blocking an enemy attack boosts your slap speed by +30% for 2.5s. |
| 17 | Midas Strike | Slaps landed within 0.8s of an enemy's attack timer grant 2x coins. |
| 18 | Iron Resolve | Every 25th slap cleanses all active debuffs (Burn, Slow, Daze, Specials Lock) and heals 4% Max HP. |
| 19 | Executioner | Slaps deal +50% damage against enemies below 25% HP. |
| 20 | Godhand Awakening | Every 30th slap triggers Godhand Awakening: deals 3x damage, stuns for 1.5s, and shakes the screen. |

## 3. Attributes

Cost of the next level = baseCost × growth per level, switching to `lateGrowth` in the late band; price is capped at `maxCost`. Attribute levels are capped by player level (capPerLevel) and the staged mastery ceiling for Power.

| Attribute | Base cost | Growth | Late growth | Max cost | Max level |
|-----------|-----------|--------|-------------|----------|-----------|
| Power | 60 | ×1.16 | ×1.4 | 45,000,000,000 | 80 |
| Speed | 110 | ×1.16 | ×1.51 | 75,000,000 | 40 |
| Crit Chance | 130 | ×1.18 | ×1.58 | 85,000,000 | 55 |
| Crit Damage | 90 | ×1.16 | ×1.51 | 65,000,000 | 65 |
| Defense | 220 | ×1.16 | ×1.51 | 95,000,000 | 40 |
| Stun | 130 | ×1.2 | ×1.69 | 80,000,000 | 50 |
| Combo | 75 | ×1.16 | ×1.51 | 60,000,000 | 65 |
| Coin Mult. | 80 | ×1.16 | ×1.51 | 65,000,000 | 65 |
| Accuracy | 95 | ×1.3 | ×3.9 | 30,000,000 | 14 |
| Giant Slayer | 220 | ×1.16 | ×1.51 | 95,000,000 | 40 |
| Life Leech | 380 | ×1.18 | ×1.58 | 150,000,000 | 40 |
| Fortune Luck | 140 | ×1.2 | ×1.69 | 85,000,000 | 50 |

Per-level effects come from the damage/stats formulas (§5) — e.g. Power damage per level: `(10 + 2.2×lvl) × 1.076^lvl × 1.28^⌊lvl/10⌋`; Crit Damage +5%/level of the crit-damage attribute (critDamagePerLevel 0.05).

## 4. Slap Economy & Combat Constants (CONFIG.fx + friends)

| Constant | Value |
|----------|-------|
| fx.skillCostMult | 1 |
| fx.speedPerLevel | 0.98114 |
| fx.speedFloor | 0.7 |
| fx.critChancePerLevel | 0.01 |
| fx.critChanceCap | 0.75 |
| fx.critDamagePerLevel | 0.05 |
| fx.comboPerStackPerLevel | 0.01 |
| fx.comboBaseStacks | 4 |
| fx.coinPerLevel | 0.05 |
| fx.accuracyBase | 0.85 |
| fx.accuracyPerLevel | 0.01 |
| fx.powerGrowth | 1.076 |
| fx.powerFlatPerLvl | 2.2 |
| fx.powerMilestoneMult | 1.28 |
| fx.accuracyCap | 0.99 |
| fx.bossDmgPerLevel | 0.015 |
| fx.bossDmgCap | 0.6 |
| fx.luckPerLevel | 0.005 |
| fx.luckChanceCap | 0.25 |
| fx.luckDmgMult | 1.5 |
| fx.strikeCoinMult | 0.32 |
| fx.killBountyMult | 1.3 |
| fx.critCoinMult | 0.5 |
| fx.slapBaseFrac | 0.1 |
| fx.slapEarlyBaseFrac | 0.07 |
| fx.slapMidBaseFrac | 0.055 |
| fx.slapLateBaseFrac | 0.055 |
| fx.slapDmgBonusScale | 4 |
| fx.slapDmgBonusCap | 1 |
| fx.slapFightCapFrac | 1.15 |
| fx.slapTaperFrac | 0.25 |
| fx.stunCooldownSec | 4 |
| fx.stunImmunitySec | 2.5 |
| fx.bossStunMult | 0.5 |
| fx.slapEarlyMult | 2.2 |
| fx.slapEarlyBossMult | 1.65 |
| fx.slapMidMult | 1.5 |
| fx.slapMidBossMult | 1.2 |
| fx.slapLateMult | 1.35 |
| fx.slapLateBossMult | 1.1 |
| fx.worldSlapCapFrac | 1.35 |
| fx.slapEarlyCapFrac | 1.75 |
| fx.slapMidCapFrac | 1.15 |
| fx.slapCritPayFrac | 0.35 |
| fx.luckCoinMult | 2.5 |
| fx.vampPerLevel | 0.0008 |
| fx.speedCostLateMult | 3 |
| fx.speedCostLatePow | 6 |
| fx.specialPerLevel | 0.005 |
| fx.stunChanceBase | 0.05 |
| fx.stunChancePerLevel | 0.005 |
| fx.stunChanceCap | 0.25 |
| fx.stunDurBase | 0.5 |
| fx.stunDurPerLevel | 0.02 |
| fx.stunDurCap | 1.4 |
| fx.defensePerLevel | 0.01 |
| fx.defenseCap | 0.4 |

KO payout: bounty × killBountyMult (1.30) × Coin Multiplier attribute × world multiplier. Slap coins per hit use the tiered base fraction of the enemy's bounty (early/mid/late), the stage multiplier, a damage bonus up to the cap, then the per-fight earning cap; past the cap, slaps pay the taper fraction. Hard fights pay NO slap coins — the knockout pays 4.75×.

**frenzy:** `{"cadence": 25, "duration": 10, "dmgMult": 1.5, "speedMult": 1.3}`

**timeStop:** `{"duration": 5, "dmgMult": 2, "speedMult": 1.3}`

**weakSpot:** `{"mult": 8.5, "dur": 1.5, "durHard": 1.2, "firstAt": 2.2, "everyMin": 5, "everyMax": 8, "frenzyGain": 12, "capBase": 3, "capPerLuck": 5, "capMax": 6, "luckScale": 0.06}`

**hard:** `{"hpMult": 1.75, "atkMult": 1.25, "dmgMult": 1.25, "intervalMult": 1, "coinMult": 4.75, "noSlapCoins": true, "gemReward": 5, "emberBonus": 1.5, "groupMasteryGems": 15, "groupMasteryCoinPct": 0.02}`

**gems:** `{"elite": 1, "pairBoss": 3, "finalDragon": 100}`

**groupReward:** `{"bountyMult": 1}`

**offline:** `{"rate": 0.375, "capSeconds": 28800, "minAway": 60, "price": 200}`

**ads:** `{"enabled": true, "interstitialEveryFights": 3, "interstitialEveryWins": 3, "interstitialFightPoints": 3, "interstitialMinGapSec": 75, "placements": {"rewarded_revive_boss": true, "rewarded_offline_double": true}}`

## 5. Skills (27)

| Tier | Skill | Cost (coins) | Requires | Effect |
|------|-------|--------------|----------|--------|
| 1 | Basic Slap | 0 | — | The slap everything starts with. Already yours. |
| 1 | Stamina Training | 250 | basic | +50 max HP. |
| 1 | Stronger Hands | 600 | basic | +20% damage on every slap. |
| 1 | Second Hand | 1,000 | basic | Alternates L / R hands, doubling your cycle rate. |
| 2 | Twin Mastery | 3,200 | secondHand | Off-hand slaps strike +25% faster and grant +10% combo charge. |
| 2 | On Target | 6,500 | twinMastery | Combo stacks survive switching enemies (resets on loss). |
| 2 | Quick Reflexes | 11,000 | twinMastery | +10% attack speed. |
| 2 | Deflect | 16,500 | basic | Mini-Boss, Elite and Boss attacks — plus every 3rd-attack Group Signature Move — spawn a parry ring at a random spot; tap it exactly as the ring closes into the gold circle to deflect the blow completely. Random spot every time; boss specials cannot be deflected. |
| 2 | Critical Slaps | 24,000 | strongerHands | +5% crit chance. |
| 2 | Seismic Slam | 35,000 | staminaTraining | Every 8th slap lands a devastating SEISMIC SLAM dealing 4x damage and dazing the enemy for 1s! |
| 2 | Heavy Slap | 55,000 | strongerHands | 12% chance a slap lands HEAVY for 3x damage. |
| 2 | Precision Instinct | 85,000 | strongerHands | Unlocks PRECISION strikes: a gold weak spot flashes on the enemy mid-fight — tap it for a devastating 8.5x critical strike! Fortune Luck makes it appear more often. Max 3 per fight (+1 per 5 Luck, max 6). |
| 3 | Combo Mastery | 150,000 | onTarget | Combo cap +5 stacks and +0.5% damage per stack. |
| 3 | Opportunist | 260,000 | quickReflexes | Slaps deal +35% damage to Stunned enemies. |
| 3 | Adrenaline Rush | 450,000 | thunderclap | Below 35% HP: gain +20% attack speed and +25% damage. |
| 3 | Coin Magnet | 750,000 | criticalSlaps | +20% coins from every KO. |
| 3 | Boss Hunter | 1,250,000 | heavySlap | +25% damage vs group elites and bosses. |
| 4 | Acoustic Echo | 2,400,000 | comboMastery | Critical slaps have a 25% chance to echo for 160% bonus damage. |
| 4 | Dual-Hand Technique | 4,500,000 | dizzyPunisher | +15% attack speed — both hands blur. |
| 4 | Unstoppable Hands | 8,500,000 | clutchSurge | +250 max HP and regenerate 0.75% Max HP/s during fights. |
| 4 | Kinetic Barrier | 16,000,000 | clutchSurge | Every 20 slaps builds a shield absorbing 15% of Max HP damage (max 45% of Max HP). |
| 4 | Treasure Hunter | 32,000,000 | coinMagnet | Elites and Bosses drop +50% bonus coins, and defeat grants +1 extra Gem. |
| 4 | Frenzy | 65,000,000 | bossHunter | Slaps charge FRENZY: 10s of +50% damage and +30% speed. |
| 4 | Colossus Bane | 140,000,000 | bossHunter | +35% damage vs Giant, Titan, and Dragon enemies. |
| 5 | Rapid Barrage | 320,000,000 | dualHand | Every 10th slap unleashes a barrage: 3 extra hits at 50% damage. |
| 5 | Bulwark Guard | 750,000,000 | kineticShield | When Defense or Barrier mitigates damage, 50% of the blocked damage is reflected back. |
| 5 | Godhand Strike | 2,500,000,000 | titanSlayer | Slaps charge the Godhand Ultimate: a 20x screen-shattering strike. |

## 6. Special Abilities

Unlocked by defeating the listed boss; 5 upgrade levels each (damage multiplier grows toward `multMax`, cooldown shrinks toward `cdMax`).

| Special | Unlock (boss #) | Dmg mult (Lv1→max) | Cooldown (Lv1→max) | Effect |
|---------|-----------------|--------------------|--------------------|--------|
| Double Slap | #10 | 7→15 | 25s→15s | Both hands slam together for one crushing hit. |
| Guard | #30 | —→— | 26s→20s | Cross both hands in an iron guard that completely blocks 100% of incoming attack damage. |
| Uppercut Punch | #40 | 18→32 | 32s→20s | A ferocious rising uppercut that deals massive damage and knocks the enemy dizzy! |

### Boss signature moves (what bosses hit YOU with)

| Boss # | Move | Kind | Numbers |
|--------|------|------|---------|
| #10 | BANANA SLING | acc | dur=6, blurb=Accuracy -40% for 6s — your slaps can MISS! |
| #20 | IRON BULWARK | shield | hits=8, blurb=Iron fortress — absorbs 8 slaps at 60% damage! |
| #30 | KATANA OMNISLASH | heavy | mult=6.5, stun=2.2, blurb=Devastating blade strike dealing 6.5× damage and 2.2s stagger! |
| #40 | PHARAOH'S SAND CURSE | slow | dur=7, amt=0.5, blurb=Ancient sands reduce your slap speed by 50% for 7s! |
| #50 | DRAGON HELLFIRE | burn | dur=6, mult=8, blurb=Caldera blaze burns you fiercely over 6s! |
| #203 | SEISMIC STOMP | heavy | mult=2, stun=1, blurb=A colossal stomp dealing 2× damage and stunning your slaps for 1s! |
| #206 | CHANDRAHASA STRIKE | heavy | mult=2, stun=1, blurb=The moon-blade's gift — 2× damage and a 1s stagger! |
| #213 | MARIONETTE GRIP | shield | hits=5, blurb=Strings weave into a barrier — absorbs 5 slaps at 50% damage! |
| #216 | COUNTER SLAP | heavy | mult=2.2, stun=1.6, blurb=Your own perfected slap, returned — 2.2× damage and a 1.6s stagger! |

**First-clear chests (bonus coins the first time you beat each enemy):** {"4": {"coins": 200, "gems": 2}, "9": {"coins": 1850, "gems": 5}, "14": {"coins": 6500, "gems": 2}, "19": {"coins": 32000, "gems": 5}, "24": {"coins": 110000, "gems": 2}, "29": {"coins": 450000, "gems": 5}, "34": {"coins": 2500000, "gems": 3}, "39": {"coins": 16500000, "gems": 5}, "44": {"coins": 90000000, "gems": 3}, "49": {"coins": 650000000, "gems": 10}}

## 7. Game Modes

### Trio Gauntlet (any cleared group; purely optional — not part of progression)
- 3 toughest of the group (slots 3–5) back-to-back; your HP carries over with a **+15% breather heal** banked between rounds
- Kill bounties pay **0** during the run and slap coins pay **50%**; winning pays a completion bonus of **1.0× the trio's combined bounties** × your coin multiplier, plus **1 💎 on first clear** of each group
- Rounds get harder: round 2 enemies **+15% HP / +10% ATK**, round 3 **+30% HP / +20% ATK**
- A **Cornerman draft** (below) runs between rounds

### Boss Rush (unlock: defeat 2 bosses)
- Queue = your defeated bosses among #10/#20/#30/#40/#50; each kill pays its bounty × coin multiplier
- Completion bonus: **3× the queue's combined bounties** × coin multiplier, + **5 💎 first clear / 2 💎 repeats**; best time is recorded

### Endless (unlock: defeat any enemy)
- Waves scale: enemy **HP ×1.32, coin rate ×1.25, ATK ×1.16 per wave**; boss every 5th wave; **+30% heal** between waves; kill pays bounty × (0.5 + 0.25×wave) × coin multiplier; a Cornerman draft runs between waves

### Golden Dummy Blitz (unlock: 10 defeats · 2-hour cooldown)
- 20 seconds vs the indestructible Golden Dummy. **Slaps pay NO coins** — all rewards come from the tier ladder (+ achievements). Each tier reached adds **+3 seconds**
- Damage thresholds are multiples of your current theoretical DPS; coin rewards are multiples of your frontier enemy's bounty; every 4th tier pays 2 💎

| Tier | Name | DMG needed (× your DPS) | Coins (× frontier bounty) | Gems |
|------|------|--------------------------|----------------------------|------|
| 1 | BRONZE I | ×2 | ×0.15 | 0 |
| 2 | BRONZE II | ×4 | ×0.3 | 0 |
| 3 | BRONZE III | ×6 | ×0.45 | 0 |
| 4 | BRONZE IV | ×9 | ×0.6 | 2 |
| 5 | SILVER I | ×12 | ×0.75 | 0 |
| 6 | SILVER II | ×16 | ×0.9 | 0 |
| 7 | SILVER III | ×20 | ×1.05 | 0 |
| 8 | SILVER IV | ×25 | ×1.2 | 2 |
| 9 | GOLD I | ×30 | ×1.35 | 0 |
| 10 | GOLD II | ×36 | ×1.5 | 0 |
| 11 | GOLD III | ×43 | ×1.65 | 0 |
| 12 | GOLD IV | ×51 | ×1.8 | 2 |
| 13 | PLATINUM I | ×60 | ×1.95 | 0 |
| 14 | PLATINUM II | ×70 | ×2.1 | 0 |
| 15 | DIAMOND I | ×82 | ×2.25 | 0 |
| 16 | DIAMOND II | ×95 | ×2.4 | 2 |
| 17 | MASTER I | ×110 | ×2.55 | 0 |
| 18 | MASTER II | ×128 | ×2.7 | 0 |
| 19 | GRANDMASTER | ×148 | ×2.85 | 0 |
| 20 | LEGEND | ×175 | ×3.0 | 2 |

### Reflex Slap-Off (unlock: 5 defeats)
- Duel vs your strongest defeated enemy; the duel pool is that enemy's real HP. Your slaps deal **2%** of normal damage
- **Parry rings** (every enemy attack, 0.7s window) deal **12%** of the pool; **Precision weak spots** deal **8%**; missing a ring costs 12% of YOUR max HP, and **2 missed rings in a row loses** the duel
- Win pays **3× the enemy's bounty** × coin multiplier + **1 💎**; slap coins earned during the duel are kept either way

### Street Brawl Anomalies (25% chance on repeat & Hard fights)

| Anomaly | Effect |
|---------|--------|
| 🪅 Golden Piñata | You take 50% damage; slap coins ×3; the enemy **flees at 12s** (you keep slapped coins, no bounty) |
| 💀 Sudden Death | Both sides deal ×2.5 damage |
| 🎯 Weak-Spot Storm | Weak spots every 1.5s; your slaps deal ×0.5 |
| 😤 Berserk Challenger | Enemy attacks 30% faster, immune to stun; +1 💎 on the kill |

### Cornerman Draft buffs (run-only, Gauntlet & Endless)

| Buff | Effect |
|------|--------|
| Double Trouble | Every 5th slap is a free 3× Double Slap |
| Second Breath | A successful Deflect parry heals 20% of Max HP |
| Glass Cannon | Crit damage +200%, but your Defense counts as 0 |
| Swift Hands | +25% slap speed |
| Blood Pact | Every 8th slap heals 2% of Max HP |
| Greedy Palms | +50% slap coins |
| Heavy Hands | +30% damage |
| Dizzy Touch | +10% stun chance |

### Dojo Bounties (4 on the board, refresh on completion or after 30 min)
Completing one pays a bonus of **2× the target's bounty** × coin multiplier (≈3× total for the fight) plus gems. 13 challenge types, 53 distinct definitions:

| Bounty | Variants |
|--------|----------|
| NO SPECIALS | Win using 0 Specials |
| SPECIAL SHOW | Use 2 / 3 / 4 / 6 Specials |
| PARRY MASTER | Land 1 / 2 / 3 / 4 / 5 Deflect parries (needs Deflect) |
| CRIT HUNTER | Land 5 / 8 / 12 / 16 / 20 / 30 critical hits |
| COMBO KING | Reach a 15 / 25 / 35 / 50 / 70 / 100 combo |
| DAZE & CONFUSE | Stun the enemy 1 / 2 / 3 / 4 / 6 times |
| BULLSEYE | Hit 1 / 2 / 3 / 4 Precision weak spots (needs Precision Instinct) |
| FRENZY! | Activate FRENZY (needs Frenzy) |
| CLOSE CALL | Win with under 30% / 25% / 15% / 10% HP left |
| UNTOUCHABLE | Win with at least 50% / 65% / 75% / 90% HP left |
| SPEEDRUN | Win in under 90 / 60 / 45 / 30 / 20 / 12 seconds |
| COIN SHOWER | Earn 0.5× / 1× / 1.5× / 2× the bounty in slap coins during the fight |
| ENDURANCE | Win after a fight lasting at least 45 / 75 / 120 seconds |
Gems per bounty: 2–6 depending on the variant's difficulty and the target's tier. The board never shows two of the same type, and a completed type can't reappear immediately.

### Turf Tribute
- Each fully-cleared group pays **1% of its combined bounties per minute**, accruing offline too, capped at **8 hours**; collect per group on the Stages screen; stationing a world relic on a turf boosts it **×1.5**

### Revive (defeat screen)
- Watch an ad to revive at **50% Max HP** with the enemy's HP unchanged — **once per enemy, ever** (not in Gauntlet/Boss Rush/Endless)

## 8. Worlds (post-game)

### Asura Realm

| Slot | Enemy | HP | ATK dmg | Interval | Bounty | Embers (first / repeat) | Role |
|------|-------|----|---------|----------|--------|--------------------------|------|
| 1 | Asura Footman | 3,100,000,000 | 5,200 | 1.38s | 365,000,000 | 3 / 1 |  |
| 2 | Rakshasa Huntress | 4,550,000,000 | 5,800 | 1.36s | 525,000,000 | 4 / 1 |  |
| 3 | Kumbhakaran | 6,700,000,000 | 6,600 | 1.35s | 755,000,000 | 5 / 2 | MINI BOSS |
| 4 | Mahishasura | 9,850,000,000 | 7,400 | 1.34s | 1,085,000,000 | 5 / 2 |  |
| 5 | Vetala Warlock | 14,500,000,000 | 8,450 | 1.32s | 1,560,000,000 | 6 / 2 |  |
| 6 | Ravana | 21,500,000,000 | 9,900 | 1.30s | 2,850,000,000 | 10 / 3 | WORLD BOSS |

### Shadow Verse

| Slot | Enemy | HP | ATK dmg | Interval | Bounty | Embers (first / repeat) | Role |
|------|-------|----|---------|----------|--------|--------------------------|------|
| 1 | Shade of the Dummy | 31,500,000,000 | 11,000 | 1.30s | 3,250,000,000 | 6 / 2 |  |
| 2 | Umbral Mime | 46,500,000,000 | 12,300 | 1.28s | 4,680,000,000 | 7 / 3 |  |
| 3 | Umbral Puppeteer | 68,500,000,000 | 13,900 | 1.26s | 6,750,000,000 | 8 / 3 | MINI BOSS |
| 4 | Gloom Serpent | 101,000,000,000 | 15,600 | 1.25s | 9,720,000,000 | 9 / 4 |  |
| 5 | The Hollow Monk | 149,000,000,000 | 17,800 | 1.24s | 14,000,000,000 | 10 / 5 |  |
| 6 | The Dark Slapper | 225,000,000,000 | 21,200 | 1.22s | 28,500,000,000 | 15 / 6 | WORLD BOSS |

World kills also pay gems: mini-boss first clear +5 💎, world boss first clear +30 💎. Hard world fights pay embers ×1.5 (ceil).

### World Arts (bought with Soul Embers 🔥)

| Art | Cost 🔥 | Effect |
|-----|---------|--------|
| Echo Palm | 20 | Every 8th slap echoes — a phantom slap lands at 60% damage. |
| Frenzy Heart | 15 | Your frenzy meter fills 30% faster. |
| Phoenix Heart | 35 | Once per fight, a fatal blow leaves you standing at 25% HP + 1.5s invulnerability. |
| Battle Trance | 25 | +12% slap speed and +25% critical damage across all fights. |
| Giant's Grip | 15 | +1 max precision crits per fight (weak-spot cap). |
| Eagle Eye | 12 | Weak spots stay open 0.6s longer. |
| Greed Mantra | 18 | +25% coins from world fights. |
| Sovereign's Bane | 25 | +15% damage against all bosses. |

### World Relics (one per world enemy; equip up to 3)
Ascension is deterministic: **★2 = 3 clears of its enemy + 10 🔥**, **★3 = 8 clears + 25 🔥** (420 🔥 for all 12 at ★3).

| Relic | Drops from | Effect by star (★1/★2/★3) |
|-------|------------|---------------------------|
| Bronze War Bell | Asura Footman | +10% / 20% / 30% coins in world fights |
| Rakshasa Fang | Rakshasa Huntress | +8% / 16% / 24% crit damage |
| Horn of the Stampede | Kumbhakaran | +10% / 20% / 30% damage in world fights |
| Slumber Bell | Mahishasura | Enemies attack 4% / 8% / 12% slower |
| Skull of Whispers | Vetala Warlock | Weak spots appear 10% / 20% / 30% sooner |
| Crown of Ten Kings | Ravana | +15% / 25% / 40% damage vs world final bosses |
| Splinter of the First Foe | Shade of the Dummy | +8% / 16% / 24% damage vs non-bosses |
| Silent Glove | Umbral Mime | +4% / 7% / 10% slap speed |
| Puppet Strings | Umbral Puppeteer | Enemy specials & signature moves charge 15% / 30% / 45% slower |
| Venomfang Coil | Gloom Serpent | +10% / 20% / 30% damage vs stunned enemies |
| Beads of the Void | Hollow Monk | +20% / 40% / 60% Soul Embers earned |
| Mirror Palm | Dark Slapper | Skin power triggers every 9 / 8 / 7 slaps |

## 9. Shop

| Hand skin | Rarity | Price |
|-----------|--------|-------|
| Classic | DEFAULT | Default |
| Spider-Man | RARE | {'cur': 'gems', 'amt': 300} |
| Wolverine | EPIC | {'cur': 'gems', 'amt': 1000} |
| Thor | LEGENDARY | {'cur': 'gems', 'amt': 2000} |
| Hulk | LEGENDARY | {'cur': 'gems', 'amt': 3500} |
| Infinity Gauntlet | MYTHIC | {'cur': 'gems', 'amt': 9000} |

**Coin packs:** [{"name": "Pocket of Coins", "coins": 50000, "gems": 120, "bonus": "", "tag": "QUICK BOOST", "desc": "A handful of freshly minted gold coins to jumpstart your DPS."}, {"name": "Bag of Gold", "coins": 250000, "gems": 350, "bonus": "+25% BONUS", "tag": "POPULAR", "desc": "Sturdy leather coin sack packed tight. Great for mid-tier attribute upgrades."}, {"name": "Chest of Gold", "coins": 1500000, "gems": 900, "bonus": "+45% BONUS", "tag": "GREAT VALUE", "desc": "Reinforced wooden chest filled with golden coins. Crush boss walls with ease."}, {"name": "Royal Treasury", "coins": 8000000, "gems": 2400, "bonus": "+70% BONUS", "tag": "BEST VALUE", "desc": "Massive palace vault shipment. Skyrocket attributes and clear gauntlets."}, {"name": "Dragon's Hoard", "coins": 35000000, "gems": 6000, "bonus": "+100% 2X BONUS", "tag": "WHALE TIER", "desc": "Legendary dragon lair fortune. Max out high-tier mastery and attributes."}]

**Gem packs:** [{"id": "gem_pouch", "name": "Pouch of Gems", "gems": 80, "bonusGems": 0, "price": "\u20b949", "tag": "STARTER", "desc": "A gleaming starter pouch of rare cut diamonds."}, {"id": "gem_sack", "name": "Sack of Gems", "gems": 240, "bonusGems": 35, "price": "\u20b9149", "tag": "POPULAR", "desc": "A traveler's gem pouch with 35 bonus diamonds included."}, {"id": "gem_chest", "name": "Chest of Gems", "gems": 700, "bonusGems": 150, "price": "\u20b9399", "tag": "+25% BONUS", "desc": "An iron-bound chest brimming with sparkling blue gems."}, {"id": "gem_vault", "name": "Vault of Gems", "gems": 1600, "bonusGems": 500, "price": "\u20b9799", "tag": "BEST VALUE", "desc": "Heavily fortified vault crate. Affords top-tier hero skins and perks."}, {"id": "gem_treasury", "name": "Titan's Treasury", "gems": 3800, "bonusGems": 1800, "price": "\u20b91,699", "tag": "+50% BONUS", "desc": "Ancient mountain treasure chamber filled with mystical crystals."}, {"id": "gem_mountain", "name": "Cosmic Hoard", "gems": 9000, "bonusGems": 6000, "price": "\u20b93,499", "tag": "65% BONUS \u00b7 ULTIMATE", "desc": "Infinite cosmic crystal fortune. Instantly unlock the Mythic Gauntlet & all perks!"}]

**Bundles:** [{"id": "starter", "name": "Starter Bundle", "badge": "STARTER DEAL", "price": "\u20b9149", "valPrice": "\u20b9499", "skin": "spidey", "coins": 25000, "gems": 200, "tagline": "The Webbed Crusader Set", "desc": "Equip the Spider-Man glove (+10% Slap Speed & Web Yank stun) plus instant coin and gem boost!"}, {"id": "weapon_x", "name": "Weapon X Bundle", "badge": "FEROCIOUS DEAL", "price": "\u20b9249", "valPrice": "\u20b9799", "skin": "logan", "coins": 80000, "gems": 400, "tagline": "Adamantium Rage Set", "desc": "Unleash Wolverine (+8% Crit Chance & Berserker Barrage bleeding slashes) with heavy gold and gems."}, {"id": "inferno", "name": "Thunder Bundle", "badge": "HOT DEAL", "price": "\u20b9399", "valPrice": "\u20b91,199", "skin": "thor", "coins": 250000, "gems": 800, "tagline": "Lord of Asgard Set", "desc": "Harness Thor (+10% Damage & Mjolnir Slam lightning strikes) with massive coin and gem reserves."}, {"id": "dragon", "name": "Hero Bundle", "badge": "MOST POPULAR", "price": "\u20b9799", "valPrice": "\u20b92,499", "skin": "hulk", "coins": 1000000, "gems": 1600, "tagline": "Gamma Breaker Set", "desc": "Smash obstacles with Hulk (+20% Damage & screen-shaking Gamma Punch) alongside a colossal treasury."}, {"id": "cosmic", "name": "Cosmic Infinity Bundle", "badge": "SUPREME \u00b7 5X VALUE", "price": "\u20b92,499", "valPrice": "\u20b99,999", "skin": "gauntlet", "coins": 10000000, "gems": 3000, "tagline": "Omnipotent Snap Set", "desc": "Wield the Mythic Infinity Gauntlet (all 6 stones, true Time Stop) with ultimate coin and gem fortune!"}]

**Remove Ads:** ₹199 one-time (home-screen icon + Shop card) — removes interstitial/banner ads permanently; rewarded ads stay available for boosts.

## 10. Daily Systems

**7-day login chest** (unlocks after Grumpy Teddy, #5): day amounts scale with your frontier enemy's bounty — chestDayMult 0.525, day-7 multiplier 2.5 plus 80 💎, minimum 60 coins.

**Daily quests** (unlock after Mischievous Monkey, #10) — pool:

| Quest | Targets | Reward |
|-------|---------|--------|
| Defeat N enemies today | 8 / 16 / 28 / 45 | coins = 85% of your best defeated bounty × level/stage multipliers (min 100) |
| Earn N coins in battle today | scales with progress | 2 💎 |
| Land N critical slaps today | 20 / 45 / 90 / 180 | coins = 65% of best defeated bounty × multipliers (min 100) |
| Clear N HARD fights today | 1 / 2 / 3 / 4 | 3 💎 |
| Trigger FRENZY N times today | 2 / 4 / 7 / 12 | 2 💎 |
| Buy N upgrades today | 5 / 10 / 18 / 30 | coins = 65% of best defeated bounty × multipliers (min 100) |

## 11. Achievements

133 achievements (singles + ladder rungs), each paying gems once:

| Achievement | Requirement | Target | 💎 | Category |
|-------------|-------------|--------|-----|----------|
| First Knockout | Win your first fight. | 1 | 1 | Victories |
| Slap Machine | Land 500 slaps. | 500 | 2 | Slaps |
| Slap Storm | Land 5,000 slaps. | 5,000 | 3 | Slaps |
| Combo King | Reach a x25 combo. | 25 | 2 | Frenzy & Combo |
| Crit Happens | Land 100 critical slaps. | 100 | 2 | Crits & Luck |
| Giant Slayer | Defeat any Giant enemy. | 1 | 3 | Bosses & Elites |
| Group Graduate | Defeat every enemy in any one group. | 1 | 3 | Collection |
| Dragon Slayer | Defeat the Dragon Lord. | 1 | 5 | Bosses & Elites |
| Grand Champion | Defeat all 50 enemies. | 50 | 10 | Victories |
| Hard 25 | Clear 25 Hard Mode fights. | 25 | 3 | Hard Mode |
| Hard 50 | Clear 50 Hard Mode fights. | 50 | 5 | Hard Mode |
| Hard Mastery | Clear all 50 Hard Mode fights. | 50 | 10 | Hard Mode |
| Untouchable | Win a fight without taking any damage. | 1 | 2 | Victories |
| High Five | Defeat 5 different enemies. | 5 | 1 | Ladder |
| Double Digits | Defeat 10 different enemies. | 10 | 2 | Ladder |
| Twenty Toppled | Defeat 20 different enemies. | 20 | 3 | Ladder |
| Thirty Slapped | Defeat 30 different enemies. | 30 | 3 | Ladder |
| Road Warrior | Defeat 40 different enemies. | 40 | 4 | Ladder |
| Halfway There | Defeat 50 different enemies. | 50 | 5 | Ladder |
| Eighty Down | Defeat 80 different enemies. | 80 | 6 | Ladder |
| Almost Everyone | Defeat 90 different enemies. | 90 | 8 | Ladder |
| Getting Warm | Win 25 fights. | 25 | 1 | Ladder |
| Century Club | Win 100 fights. | 100 | 2 | Ladder |
| Two Thousand Wins | Win 2,000 fights. | 2,000 | 5 | Ladder |
| Arena Legend | Win 10,000 fights. | 10,000 | 8 | Ladder |
| Twenty-Five Thousand | Win 25,000 fights. | 25,000 | 9 | Ladder |
| Warm Palms | Land 500 slaps. | 500 | 1 | Ladder |
| Busy Hands | Land 3,000 slaps. | 3,000 | 2 | Ladder |
| Slap Blizzard | Land 25,000 slaps. | 25,000 | 4 | Ladder |
| The Quarter-Million Slap | Land 250,000 slaps. | 250,000 | 9 | Ladder |
| Million Slapper | Land 1,000,000 slaps. | 1,000,000 | 15 | Ladder |
| Real Dent | Deal 50,000 total damage. | 50,000 | 2 | Ladder |
| Two Million | Deal 2,000,000 total damage. | 2,000,000 | 4 | Ladder |
| Twenty-Five Million | Deal 25,000,000 total damage. | 25,000,000 | 6 | Ladder |
| Quarter Billion | Deal 250,000,000 total damage. | 250,000,000 | 8 | Ladder |
| Two Billion | Deal 2,000,000,000 total damage. | 2,000,000,000 | 12 | Ladder |
| Ten Billion | Deal 10,000,000,000 total damage. | 10,000,000,000 | 16 | Ladder |
| Fifty Billion | Deal 50,000,000,000 total damage. | 50,000,000,000 | 25 | Ladder |
| Crit Hobbyist | Land 1,000 critical slaps. | 1,000 | 2 | Ladder |
| Crit Habit | Land 5,000 critical slaps. | 5,000 | 4 | Ladder |
| Crit Connoisseur | Land 25,000 critical slaps. | 25,000 | 7 | Ladder |
| Crit Phenomenon | Land 100,000 critical slaps. | 100,000 | 12 | Ladder |
| Sledgehammer | Land 250 HEAVY slaps. | 250 | 3 | Ladder |
| Demolition Crew | Land 1,200 HEAVY slaps. | 1,200 | 5 | Ladder |
| Wrecking Ball | Land 6,000 HEAVY slaps. | 6,000 | 9 | Ladder |
| Ultimate Regular | Land 100 ULTIMATE slaps. | 100 | 4 | Ladder |
| Ultimate Storm | Land 500 ULTIMATE slaps. | 500 | 8 | Ladder |
| Ultimate Apocalypse | Land 2,000 ULTIMATE slaps. | 2,000 | 15 | Ladder |
| Lucky Break | Land 50 LUCKY hits. | 50 | 2 | Ladder |
| Four-Leaf Palms | Land 250 LUCKY hits. | 250 | 4 | Ladder |
| Born Lucky | Land 1,000 LUCKY hits. | 1,000 | 8 | Ladder |
| Sharp Eye | Land 10 Precision Strikes. | 10 | 2 | Ladder |
| Bullseye Master | Land 50 Precision Strikes. | 50 | 4 | Ladder |
| Sniper Palms | Land 200 Precision Strikes. | 200 | 7 | Ladder |
| Hawkeye Legend | Land 500 Precision Strikes. | 500 | 12 | Ladder |
| Frenzy Starter | Trigger FRENZY 20 times. | 20 | 2 | Ladder |
| Frenzy Habit | Trigger FRENZY 100 times. | 100 | 4 | Ladder |
| Frenzy Fiend | Trigger FRENZY 400 times. | 400 | 8 | Ladder |
| Combo x50 | Reach a x50 combo. | 50 | 3 | Ladder |
| Combo x75 | Reach a x75 combo. | 75 | 5 | Ladder |
| Combo x100 | Reach a x100 combo. | 100 | 9 | Ladder |
| Coin Collector | Earn 200,000 coins all-time. | 200,000 | 3 | Ladder |
| Millionaire Hands | Earn 5,000,000 coins all-time. | 5,000,000 | 5 | Ladder |
| Coin Magnate | Earn 75,000,000 coins all-time. | 75,000,000 | 9 | Ladder |
| Coin Emperor | Earn 1.5 Billion coins all-time. | 1,500,000,000 | 12 | Ladder |
| Ten Billionaire | Earn 10,000,000,000 coins all-time. | 10,000,000,000 | 16 | Ladder |
| Dragon Hoarder | Earn 100,000,000,000 coins all-time. | 100,000,000,000 | 25 | Ladder |
| Gem Hoard | Earn 100 gems all-time. | 100 | 4 | Ladder |
| Gem Vault | Earn 300 gems all-time. | 300 | 7 | Ladder |
| Gem Tycoon | Earn 800 gems all-time. | 800 | 9 | Ladder |
| Gem Overlord | Earn 2,000 gems all-time. | 2,000 | 15 | Ladder |
| First Hard Clear | Clear 1 HARD fight. | 1 | 2 | Ladder |
| Hard Five | Clear 5 HARD fights. | 5 | 3 | Ladder |
| Hard Ten | Clear 10 HARD fights. | 10 | 4 | Ladder |
| Hard Twenty | Clear 20 HARD fights. | 20 | 6 | Ladder |
| Hard Thirty-Five | Clear 35 HARD fights. | 35 | 9 | Ladder |
| Hard Conqueror | Clear all 50 HARD fights. | 50 | 16 | Ladder |
| Hard Grinder | Win 250 HARD fights. | 250 | 7 | Ladder |
| Hard Annihilator | Win 1,000 HARD fights. | 1,000 | 15 | Ladder |
| Boss Breaker | Defeat a boss. | 1 | 2 | Ladder |
| Boss Hunter | Defeat bosses 5 times. | 5 | 5 | Ladder |
| Boss Regular | Defeat bosses 10 times. | 10 | 6 | Ladder |
| Boss Nemesis | Defeat bosses 25 times. | 25 | 10 | Ladder |
| Dragon Vanquisher | Slay the Almighty Dragon. | 1 | 5 | Ladder |
| Dragon Hunter | Slay the Almighty Dragon 5 times. | 5 | 8 | Ladder |
| Dragon Slayer Master | Slay the Almighty Dragon 15 times. | 15 | 12 | Ladder |
| Lord of Dragons | Slay the Almighty Dragon 30 times. | 30 | 20 | Ladder |
| Rush Novice | Clear Boss Rush mode once. | 1 | 3 | Ladder |
| Rush Veteran | Clear Boss Rush 5 times. | 5 | 6 | Ladder |
| Rush Champion | Clear Boss Rush 15 times. | 15 | 10 | Ladder |
| Endless Ten | Reach wave 10 in Endless mode. | 10 | 3 | Ladder |
| Endless Wavemaster | Reach wave 25 in Endless mode. | 25 | 6 | Ladder |
| Endless Titan | Reach wave 50 in Endless mode. | 50 | 12 | Ladder |
| Elite Menace | Defeat elites 50 times. | 50 | 5 | Ladder |
| Elite End | Defeat elites 250 times. | 250 | 9 | Ladder |
| Giant Trouble | Defeat 50 Giant enemies. | 50 | 6 | Ladder |
| Titan Breaker | Defeat 200 Giant enemies. | 200 | 10 | Ladder |
| Level 3 | Reach player level 3. | 3 | 1 | Ladder |
| Level 8 | Reach player level 8. | 8 | 2 | Ladder |
| Level 15 | Reach player level 15. | 15 | 3 | Ladder |
| Level 22 | Reach player level 22. | 22 | 4 | Ladder |
| Level 35 | Reach player level 35. | 35 | 8 | Ladder |
| Maximum Level | Reach player level 50. | 50 | 15 | Ladder |
| Builder | Buy 150 attribute levels. | 150 | 4 | Ladder |
| Engineer | Buy 450 attribute levels. | 450 | 6 | Ladder |
| Architect | Buy 1,000 attribute levels. | 1,000 | 8 | Ladder |
| Maximalist | Buy 1,800 attribute levels. | 1,800 | 11 | Ladder |
| Transcendence | Buy 3,000 attribute levels. | 3,000 | 18 | Ladder |
| First Max | Max out an attribute at your level cap. | 1 | 3 | Ladder |
| Four Maxed | Have 4 attributes at your level cap. | 4 | 6 | Ladder |
| Fully Maxed | Have all 10 attributes at your level cap. | 10 | 9 | Ladder |
| Skill Adept | Own 8 skills. | 8 | 4 | Ladder |
| Skill Master | Own 12 skills. | 12 | 6 | Ladder |
| Full Tree | Own all 16 skills. | 16 | 8 | Ladder |
| Omnipotent Slapper | Own all skills in the tree. | 24 | 15 | Ladder |
| Style Collector | Own 3 premium skins. | 4 | 5 | Ladder |
| Full Wardrobe | Own all 5 premium skins. | 6 | 8 | Ladder |
| Errand Runner | Claim 5 daily quests. | 5 | 2 | Ladder |
| Quest Regular | Claim 25 daily quests. | 25 | 4 | Ladder |
| Quest Centurion | Claim 100 daily quests. | 100 | 8 | Ladder |
| A Week of Chests | Open 7 daily chests. | 7 | 3 | Ladder |
| A Month of Chests | Open 30 daily chests. | 30 | 6 | Ladder |
| Chest Devotee | Open 90 daily chests. | 90 | 8 | Ladder |
| Perfect Week | Reach day 7 of the login streak. | 7 | 5 | Ladder |
| Four Perfect Weeks | Finish the 7-day login streak 4 times. | 4 | 8 | Ladder |
| While You Slept | Claim offline earnings once. | 1 | 2 | Ladder |
| Dream Earner | Claim offline earnings 25 times. | 25 | 7 | Ladder |
| Slumber Tycoon | Claim offline earnings 100 times. | 100 | 12 | Ladder |
| Five Hours In | Play for 5 hours total. | 18,000 | 4 | Ladder |
| Twenty-Five Hours | Play for 25 hours total. | 90,000 | 8 | Ladder |
| Hundred Hours | Play for 100 hours total. | 360,000 | 11 | Ladder |
| Ghost Hands | Win 25 fights without taking any damage. | 25 | 7 | Ladder |
| Untouchable Master | Win 100 fights without taking damage. | 100 | 12 | Ladder |

## 12. Ads & Boosts

`{"enabled": true, "interstitialEveryFights": 3, "interstitialEveryWins": 3, "interstitialFightPoints": 3, "interstitialMinGapSec": 75, "placements": {"rewarded_revive_boss": true, "rewarded_offline_double": true}}` — rewarded-ad boosters: **2× Coins** and **2× Damage** (durations in the ads config), plus the defeat-screen offers (§7 Revive, 2× Damage next fight).

---
*Mirror of the shipped configuration as of the Blitz/Gauntlet rebalance. Mode rules (Gauntlet/Blitz/Reflex/bounties/turf) live in `gameEngine.js`; economy in `config.js`; worlds in `worlds.js`.*
