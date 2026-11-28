// These Hands — Authentic Game Configuration
export const CONFIG = {
  "playerBase": {
    "damage": 12,
    "attackInterval": 1.4,
    "critChance": 0.15,
    "critMult": 2.0
  },
  "capPerLevel": 2,
  "levelUp": {
    "base": 150,
    "growth": 1.95,
    "rampStart": 9,
    "midAnchor": 46000,
    "midGrowth": 1.33,
    "midStart": 25,
    "lateAnchor": 4400000,
    "lateGrowth": 1.21,
    "grindStart": 45,
    "endAnchor": 240000000,
    "endGrowth": 1.26,
    "worldStart": 50,
    "worldGrowth": 1.22,
    "worldCap": 50,
    "mortalCap": 35
  },
  "levelCap": 50,
  "attrs": {
    "power": {
      "name": "Power",
      "baseCost": 85,
      "growth": 1.2693,
      "maxLevel": 80
    },
    "speed": {
      "name": "Speed",
      "baseCost": 135,
      "growth": 1.9837,
      "maxLevel": 25
    },
    "critChance": {
      "name": "Crit Chance",
      "baseCost": 150,
      "growth": 1.5307,
      "maxLevel": 45
    },
    "critDamage": {
      "name": "Crit Damage",
      "baseCost": 110,
      "growth": 1.3385,
      "maxLevel": 65
    },
    "defense": {
      "name": "Defense",
      "baseCost": 190,
      "growth": 1.5522,
      "maxLevel": 40
    },
    "stun": {
      "name": "Stun",
      "baseCost": 150,
      "growth": 1.4451,
      "maxLevel": 50
    },
    "combo": {
      "name": "Combo",
      "baseCost": 95,
      "growth": 1.3385,
      "maxLevel": 65
    },
    "coinMult": {
      "name": "Coin Mult.",
      "baseCost": 100,
      "growth": 1.3491,
      "maxLevel": 65
    },
    "accuracy": {
      "name": "Accuracy",
      "baseCost": 200,
      "growth": 3.0032,
      "maxLevel": 14
    },
    "bossDamage": {
      "name": "Giant Slayer",
      "baseCost": 200,
      "growth": 1.5629,
      "maxLevel": 40
    },
    "vampirism": {
      "name": "Life Leech",
      "baseCost": 270,
      "growth": 1.5522,
      "maxLevel": 40
    },
    "luck": {
      "name": "Fortune Luck",
      "baseCost": 160,
      "growth": 1.4451,
      "maxLevel": 50
    }
  },
  "attrOrder": [
    "power",
    "speed",
    "critChance",
    "critDamage",
    "defense",
    "stun",
    "combo",
    "coinMult",
    "accuracy",
    "bossDamage",
    "vampirism",
    "luck"
  ],
  "fx": {
    "skillCostMult": 1.0,
    "lossSlapCoinCapFrac": 0.40,
    "speedPerLevel": 0.98,
    "speedFloor": 0.35,
    "critChancePerLevel": 0.01,
    "critChanceCap": 0.7,
    "critDamagePerLevel": 0.05,
    "comboPerStackPerLevel": 0.0025,
    "comboBaseStacks": 4,
    "coinPerLevel": 0.04,
    "accuracyBase": 0.85,
    "accuracyPerLevel": 0.02,
    "powerGrowth": 1.08,
    "powerFlatPerLvl": 2.5,
    "powerMilestoneMult": 1.25,
    "accuracyCap": 1.25,
    "bossDmgPerLevel": 0.015,
    "bossDmgCap": 0.6,
    "luckPerLevel": 0.005,
    "luckChanceCap": 0.25,
    "luckDmgMult": 1.5,
    "strikeCoinMult": 0.32,
    "killBountyMult": 1.3,
    "critCoinMult": 0.5,
    "slapBaseFrac": 0.1,
    "slapEarlyBaseFrac": 0.07,
    "slapMidBaseFrac": 0.055,
    "slapLateBaseFrac": 0.055,
    "slapDmgBonusScale": 4,
    "slapDmgBonusCap": 1,
    "slapFightCapFrac": 0.85,
    "slapTaperFrac": 0.25,
    "stunCooldownSec": 4.0,
    "stunImmunitySec": 2.5,
    "bossStunMult": 0.5,
    "slapEarlyMult": 2.0,
    "slapEarlyBossMult": 1.5,
    "slapMidMult": 1.4,
    "slapMidBossMult": 1.15,
    "slapLateMult": 1.3,
    "slapLateBossMult": 1.1,
    "worldSlapCapFrac": 1.35,
    "slapEarlyCapFrac": 1.75,
    "slapEarlyFrontierCapFrac": 2.0,
    "slapFrontierCapFrac": 1.35,
    "worldSlapFrontierCapFrac": 1.75,
    "slapMidCapFrac": 0.85,
    "slapCritPayFrac": 0.35,
    "luckCoinMult": 2.5,
    "vampPerLevel": 0.00035,
    "speedCostLateMult": 3,
    "speedCostLatePow": 6,
    "specialPerLevel": 0.005,
    "stunChanceBase": 0.05,
    "stunChancePerLevel": 0.004,
    "stunChanceCap": 0.25,
    "stunDurBase": 0.5,
    "stunDurPerLevel": 0.018,
    "stunDurCap": 1.4,
    "defensePerLevel": 0.01,
    "defenseCap": 0.3,
    "adOverdriveMult": 2.0
  },
  "enemyProgression": {
    "hp": {
      "base0": 65,
      "early": [
        65,
        97,
        145,
        220,
        365,
        455,
        640,
        895,
        1300,
        2415
      ],
      "hpTable": [55,105,190,350,640,980,1650,2950,5200,11000,17000,29000,50000,80000,138000,210000,310000,440000,620000,1050000,1200000,1800000,2650000,3800000,5600000,7800000,10800000,14500000,19500000,27000000,31000000,42000000,57000000,76000000,102000000,128000000,158000000,192000000,230000000,275000000,350000000,510000000,740000000,1080000000,1550000000,2050000000,2600000000,3200000000,3850000000,4600000000],
      "base10": 3200,
      "growth": 1.255,
      "tailStart": 30,
      "tailGrowth": 1.442,
      "bossMult": 2.5,
      "eliteMult": 1.55
    },
    "damage": {
      "earlyDmg": [
        8,
        12,
        15,
        20,
        26,
        28,
        32,
        38,
        46,
        54
      ],
      "dmgTable": [6,9,13,18,22,24,27,31,35,38,53,62,77,89,103,115,127,139,154,168,204,248,302,369,451,539,644,759,891,1045,1180,1450,1750,2080,2450,2900,3400,3950,4550,5200,6100,7100,8200,9400,10800,13915,15410,16905,18515,20125],
      "base10": 64,
      "growth": 1.11,
      "tailStart": 30,
      "tailGrowth": 1.14,
      "bossMult": 1.8,
      "eliteMult": 1.4
    },
    "interval": {
      "early": [
        2.4,
        2.35,
        2.3,
        2.25,
        2.05,
        2.2,
        2.15,
        2.1,
        2.05,
        1.95
      ],
      "table": [
        2.3,
        2.25,
        2.2,
        2.15,
        2.05,
        2.15,
        2.1,
        2.05,
        2.0,
        1.95,
        2.08,
        2.05,
        2.02,
        1.98,
        1.95,
        1.94,
        1.91,
        1.88,
        1.85,
        1.8,
        1.84,
        1.82,
        1.8,
        1.78,
        1.75,
        1.73,
        1.71,
        1.69,
        1.66,
        1.62,
        1.65,
        1.63,
        1.61,
        1.59,
        1.56,
        1.54,
        1.52,
        1.5,
        1.48,
        1.45,
        1.46,
        1.45,
        1.43,
        1.42,
        1.4,
        1.4,
        1.39,
        1.39,
        1.38,
        1.38
      ],
      "base": 2.4,
      "decay": 0.988,
      "floor": 1.4,
      "bossMult": 0.95,
      "bossFloor": 1.4,
      "miniBossMult": 0.95
    },
    "bounty": {
      "earlyRate": 0.5,
      "baseRate": 0.55,
      "rateDecay": 1.0,
      "minRate": 0.55,
      "minBounty": 30,
      "scale": 0.52,
      "bossBonusMult": 1.35,
      "bountyTable": [
        80,
        125,
        190,
        285,
        450,
        650,
        950,
        1400,
        2000,
        3000,
        4500,
        6500,
        9200,
        13000,
        18000,
        24000,
        31500,
        41000,
        52000,
        65000,
        78000,
        98000,
        125000,
        160000,
        210000,
        270000,
        345000,
        435000,
        535000,
        650000,
        850000,
        1100000,
        1420000,
        1850000,
        2400000,
        3050000,
        3800000,
        4700000,
        5700000,
        6800000,
        8500000,
        10600000,
        13200000,
        16400000,
        20500000,
        24500000,
        28800000,
        33200000,
        37500000,
        42000000
      ],
      "normalKillBonusMult": 0.3,
      "hardKillBonusMult": 1.25
    }
  },
  "enemyScale": {
    "hpBase": 65,
    "hpEarly": [
      1.38,
      1.34,
      1.35,
      1.42
    ],
    "hpLateStart": 1.28,
    "hpLateEnd": 1.2,
    "eliteHp": 1.65,
    "hpTailStart": 1.18,
    "hpTailMid": 1.15,
    "hpTailMid2": 1.13,
    "hpTailEnd2": 1.12,
    "rateBase": 1.05,
    "rateGrowth": 1.05,
    "rateTailGrowth": 1.24,
    "bossSteps": [
      2.5,
      3.2,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7.5,
      10
    ]
  },
  "hard": {
    "hpMult": 1.75,
    "bossHpMult": 1.5,
    "atkMult": 1.25,
    "dmgMult": 1.25,
    "intervalMult": 1.0,
    "coinMult": 2.75,
    "noSlapCoins": true,
    "gemReward": 3,
    "emberBonus": 1.5,
    "groupMasteryGems": 10,
    "groupMasteryCoinPct": 0.04
  },
  "playerHp": {
    "base": 100,
    "perLevel": 35,
    "lv20Bonus": 220,
    "lv30Bonus": 1400,
    "expBase": 15,
    "expGrowth": 1.212
  },
  "enemyAttack": {
    "intervalStart": 3,
    "intervalFloor": 1.1,
    "eliteIntervalMult": 0.88,
    "eliteIntervalFloor": 1,
    "ratioBase": 2,
    "ratioSlope": 1.2,
    "bossRatioBonus": 1.2,
    "ratioCap": 4.5,
    "intervalDecay": 0.985
  },
  "expectedBuild": {
    "levelCap": 25,
    "mainFrac": 0.92,
    "subFrac": 0.6,
    "bossFrac": 0.5
  },
  "slap": {
    "windup": 0.22,
    "strikeEnd": 0.3,
    "holdEnd": 0.38,
    "recoverEnd": 0.68
  },
  "feel": {
    "dizzyBelow": 0.5,
    "coinVisualsMax": 12,
    "shakePx": 7,
    "shakeCritPx": 13,
    "shakeHeavyPx": 17,
    "shakeUltPx": 26,
    "hitStop": 0.055,
    "hitStopCrit": 0.09,
    "hitStopHeavy": 0.105,
    "hitStopUlt": 0.15
  },
  "skills": [
    {
      "id": "basic",
      "name": "Basic Slap",
      "tier": 1,
      "cost": 0,
      "prereq": null,
      "fx": "The slap everything starts with. Already yours."
    },
    {
      "id": "staminaTraining",
      "name": "Stamina Training",
      "tier": 1,
      "cost": 250,
      "prereq": "basic",
      "fx": "+15% Max HP permanently."
    },
    {
      "id": "strongerHands",
      "name": "Stronger Hands",
      "tier": 1,
      "cost": 500,
      "prereq": "basic",
      "fx": "+20% damage on every slap."
    },
    {
      "id": "secondHand",
      "name": "Second Hand",
      "tier": 1,
      "cost": 900,
      "prereq": "basic",
      "reqBoss": 4,
      "fx": "Alternates L / R hands, doubling your cycle rate."
    },
    {
      "id": "twinMastery",
      "name": "Twin Mastery",
      "tier": 2,
      "cost": 2500,
      "prereq": "secondHand",
      "fx": "Off-hand slaps strike +25% faster and grant +10% combo charge."
    },
    {
      "id": "onTarget",
      "name": "On Target",
      "tier": 2,
      "cost": 5000,
      "prereq": "twinMastery",
      "fx": "Combo stacks survive switching enemies (resets on loss)."
    },
    {
      "id": "deflect",
      "name": "Deflect",
      "tier": 2,
      "cost": 6500,
      "prereq": "basic",
      "fx": "Unlocks PARRY: tap PARRY on the enemy's strike flash to negate 100% of damage and counter for 1.5x damage. No cooldown on success \u2014 mistiming locks Parry for 5s."
    },
    {
      "id": "quickReflexes",
      "name": "Quick Reflexes",
      "tier": 2,
      "cost": 12000,
      "prereq": "twinMastery",
      "reqBoss": 9,
      "fx": "+10% attack speed."
    },
    {
      "id": "criticalSlaps",
      "name": "Critical Slaps",
      "tier": 2,
      "cost": 22000,
      "prereq": "strongerHands",
      "fx": "+5% crit chance."
    },
    {
      "id": "thunderclap",
      "name": "Seismic Slam",
      "tier": 2,
      "cost": 35000,
      "prereq": "staminaTraining",
      "reqBoss": 9,
      "fx": "Every 8th slap lands a devastating SEISMIC SLAM dealing 3x damage and dazing the enemy for 0.4s!"
    },
    {
      "id": "heavySlap",
      "name": "Heavy Slap",
      "tier": 2,
      "cost": 55000,
      "prereq": "strongerHands",
      "reqBoss": 9,
      "fx": "12% chance a slap lands HEAVY for 2.5x damage."
    },
    {
      "id": "precisionInstinct",
      "name": "Precision Instinct",
      "tier": 2,
      "cost": 80000,
      "prereq": "strongerHands",
      "reqBoss": 9,
      "fx": "Unlocks PRECISION strikes: tap weak spots for 2.5x critical damage! Max 3/fight (Fortune Luck makes weak spots appear more frequently)."
    },
    {
      "id": "comboMastery",
      "name": "Combo Mastery",
      "tier": 3,
      "cost": 220000,
      "prereq": "onTarget",
      "reqBoss": 9,
      "fx": "Combo cap +5 stacks and +0.5% damage per stack."
    },
    {
      "id": "dizzyPunisher",
      "name": "Opportunist",
      "tier": 3,
      "cost": 450000,
      "prereq": "quickReflexes",
      "fx": "Slaps deal +35% damage to Stunned enemies."
    },
    {
      "id": "clutchSurge",
      "name": "Adrenaline Rush",
      "tier": 3,
      "cost": 850000,
      "prereq": "thunderclap",
      "fx": "Below 30% HP: gain +20% attack speed and +25% damage."
    },
    {
      "id": "coinMagnet",
      "name": "Coin Magnet",
      "tier": 3,
      "cost": 1600000,
      "prereq": "criticalSlaps",
      "reqBoss": 19,
      "fx": "+20% coins from every KO."
    },
    {
      "id": "bossHunter",
      "name": "Boss Hunter",
      "tier": 3,
      "cost": 3000000,
      "prereq": "heavySlap",
      "reqBoss": 19,
      "fx": "+25% damage vs group elites and bosses."
    },
    {
      "id": "echoStrike",
      "name": "Acoustic Echo",
      "tier": 4,
      "cost": 8000000,
      "prereq": "comboMastery",
      "reqBoss": 29,
      "fx": "Critical slaps have a 20% chance to echo for +100% bonus damage."
    },
    {
      "id": "dualHand",
      "name": "Dual-Hand Technique",
      "tier": 4,
      "cost": 12000000,
      "prereq": "dizzyPunisher",
      "reqBoss": 19,
      "fx": "+15% attack speed — both hands blur."
    },
    {
      "id": "unstoppable",
      "name": "Unstoppable Hands",
      "tier": 4,
      "cost": 18000000,
      "prereq": "clutchSurge",
      "reqBoss": 29,
      "fx": "+30% Max HP and regenerate 0.25% Max HP/s during fights."
    },
    {
      "id": "kineticShield",
      "name": "Kinetic Barrier",
      "tier": 4,
      "cost": 28000000,
      "prereq": "clutchSurge",
      "reqBoss": 29,
      "fx": "Every 10 slaps builds a shield absorbing 10% of Max HP (max 12% of Max HP)."
    },
    {
      "id": "ironStance1",
      "name": "Iron Stance I",
      "tier": 4,
      "cost": 32000000,
      "prereq": "deflect",
      "reqBoss": 29,
      "fx": "Reduces Parry miss lockout from 5s to 3s."
    },
    {
      "id": "goldenTouch",
      "name": "Treasure Hunter",
      "tier": 4,
      "cost": 40000000,
      "prereq": "coinMagnet",
      "reqBoss": 29,
      "fx": "Elites and Bosses drop +25% bonus coins, and defeat grants +1 extra Gem."
    },
    {
      "id": "frenzy",
      "name": "Frenzy",
      "tier": 4,
      "cost": 55000000,
      "prereq": "bossHunter",
      "reqBoss": 29,
      "fx": "35 inactive-state slaps charge FRENZY: 10s of +50% damage and +30% speed."
    },
    {
      "id": "titanSlayer",
      "name": "Colossus Bane",
      "tier": 4,
      "cost": 95000000,
      "prereq": "bossHunter",
      "reqBoss": 34,
      "fx": "+35% damage vs Colossi — enemies #35 and up, and World guardians."
    },
    {
      "id": "rapidBarrage",
      "name": "Rapid Barrage",
      "tier": 5,
      "cost": 180000000,
      "prereq": "dualHand",
      "reqBoss": 39,
      "fx": "Every 6th slap unleashes a barrage: 3 extra hits at 40% damage."
    },
    {
      "id": "ironStance2",
      "name": "Iron Stance II",
      "tier": 5,
      "cost": 220000000,
      "prereq": "ironStance1",
      "reqBoss": 39,
      "fx": "Parry counter-slaps deal +0.5x bonus damage (2.0x base)."
    },
    {
      "id": "aegisBulwark",
      "name": "Bulwark Guard",
      "tier": 5,
      "cost": 280000000,
      "prereq": "kineticShield",
      "reqBoss": 39,
      "fx": "When Defense or Barrier mitigates damage, 50% of the blocked damage is reflected back."
    },
    {
      "id": "ultimateSlap",
      "name": "Godhand Strike",
      "tier": 5,
      "cost": 450000000,
      "prereq": "titanSlayer",
      "reqBoss": 44,
      "fx": "Slaps charge the Godhand Ultimate: an 8x screen-shattering strike."
    },
    {
      "id": "ironStance3",
      "name": "Iron Stance III",
      "tier": 5,
      "cost": 1200000000,
      "prereq": "ironStance2",
      "reqBoss": 49,
      "fx": "Parry timing window widens from 0.25s to 0.35s."
    }
  ],
  "skillFx": {
    "strongerDmg": 1.2,
    "quickSpeed": 0.9,
    "dualSpeed": 0.85,
    "critSlaps": 0.05,
    "heavyChance": 0.12,
    "heavyMult": 2.5,
    "staminaHpPct": 1.15,
    "unstoppableHpPct": 1.30,
    "regen": 0.0025,
    "comboMasteryStacks": 5,
    "comboMasteryPer": 0.005,
    "bossMult": 1.25,
    "magnetCoins": 1.2,
    "goldenCoins": 1.25,
    "barrageEvery": 6,
    "barrageHits": 3,
    "barrageMult": 0.4,
    "ultEvery": 20,
    "ultMult": 8.0,
    "retaliationMitigate": 0.2,
    "retaliationMult": 3.0,
    "parryChance": 0.15,
    "parryDeflect": 0.5,
    "parryWindowSec": 0.25,
    "parryWindowWideSec": 0.35,
    "parryCdSec": 0,
    "parryCounterMult": 1.5, "parryWhiffLockSec": 5.0, "parryWhiffLockIS1Sec": 3.0, "parryCounterIS2Bonus": 0.5,
    "dizzyMult": 1.35,
    "clutchHpFrac": 0.3,
    "clutchSpeed": 0.833,
    "clutchDmg": 1.25,
    "shieldPerHits": 10, "thunderclapEvery": 8, "thunderclapDazeSec": 0.4,
    "shieldAmt": 0.10,
    "shieldMax": 0.12,
    "echoChance": 0.2,
    "echoMult": 1.0,
    "titanMult": 1.35
  },
  "levelAbilities": [
    {
      "level": 2,
      "id": "ironPalm",
      "name": "Iron Palm",
      "fx": "1.15x permanent slap damage."
    },
    {
      "level": 4,
      "id": "quickening",
      "name": "Quickening",
      "fx": "+8% slap speed (interval x0.92)."
    },
    {
      "level": 6,
      "id": "thickSkin",
      "name": "Thick Skin",
      "fx": "-10% damage taken & +15% Max HP."
    },
    {
      "level": 8,
      "id": "greed",
      "name": "Greed",
      "fx": "1.15x coins from all sources."
    },
    {
      "level": 10,
      "id": "vampireSlap",
      "name": "Vampire Slap",
      "fx": "Every 8th slap heals 1% Max HP."
    },
    {
      "level": 12,
      "id": "critSurge",
      "name": "Crit Surge",
      "fx": "+6% crit chance & +15% crit damage."
    },
    {
      "level": 14,
      "id": "ironWill",
      "name": "Iron Will",
      "fx": "+15% Max HP and +20% healing from all sources."
    },
    {
      "level": 16,
      "id": "bossBane",
      "name": "Boss Bane",
      "fx": "1.20x damage vs Group Elites, Mini-Bosses, and Bosses."
    },
    {
      "level": 18,
      "id": "goldenAura",
      "name": "Golden Aura",
      "fx": "1.20x coins from all sources (multiplicative with Greed)."
    },
    {
      "level": 20,
      "id": "riposteMastery",
      "name": "Riposte Mastery",
      "fx": "Successful parries deal +0.5x counter damage and grant +10 Frenzy meter."
    },
    {
      "level": 22,
      "id": "battleFocus",
      "name": "Battle Focus",
      "fx": "At 10+ combo: +10% slap speed and stuns last +0.25s longer."
    },
    {
      "level": 24,
      "id": "toughGrit",
      "name": "Tough Grit",
      "fx": "Below 40% HP: take -20% damage & +15% Lifesteal sustain."
    },
    {
      "level": 26,
      "id": "ironResolve",
      "name": "Iron Resolve",
      "fx": "Every 20th slap cleanses debuffs & grants a 10% Max HP shield."
    },
    {
      "level": 28,
      "id": "overcharge",
      "name": "Overcharge",
      "fx": "Crit Damage multiplied by 1 + 0.008 x Defense Level (up to 1.32x)."
    },
    {
      "level": 30,
      "id": "titanStature",
      "name": "Titan Stature",
      "fx": "1.25x Max HP & +1 extra combo stack on Elite/Boss hits."
    },
    {
      "level": 32,
      "id": "swiftRecovery",
      "name": "Swift Recovery",
      "fx": "Successful Parry or Guard grants +25% slap speed for 3.0s."
    },
    {
      "level": 34,
      "id": "midasRhythm",
      "name": "Midas Rhythm",
      "fx": "Slaps within 0.6s of enemy swing pay 1.60x coins & deal 1.20x damage."
    },
    {
      "level": 36,
      "id": "executioner",
      "name": "Executioner",
      "fx": "1.35x damage vs enemies below 30% HP."
    },
    {
      "level": 38,
      "id": "dragonbloodVigour",
      "name": "Dragonblood Vigour",
      "fx": "1.25x Max HP & -25% damage from Boss Signatures and burns."
    },
    {
      "level": 40,
      "id": "thunderFocus",
      "name": "Thunder Focus",
      "fx": "Cadence strikes (Seismic Slam, Rapid Barrage, Yellow & Black Belt strikes) deal +25% bonus damage."
    },
    {
      "level": 42,
      "id": "momentumSurge",
      "name": "Momentum Surge",
      "fx": "Each 10 combo stacks grants +5% multiplicative Crit Damage."
    },
    {
      "level": 44,
      "id": "asuraSlayer",
      "name": "Asura Slayer",
      "fx": "1.25x damage in Worlds & +10% Accuracy overcap."
    },
    {
      "level": 46,
      "id": "frenzyEcho",
      "name": "Frenzy Echo",
      "fx": "During Frenzy, every 5th slap triggers a free 100% echo slap."
    },
    {
      "level": 48,
      "id": "sovereignsGuard",
      "name": "Sovereign's Guard",
      "fx": "Boss self-heals are reduced by 30% (15% to 10.5% HP)."
    },
    {
      "level": 50,
      "id": "transcendentHand",
      "name": "Transcendent Hand",
      "fx": "+10% slap speed and +15% crit damage."
    }
  ],
  "abilityFx": {
    "masteryPer": 0.04,
    "ironPalm": 1.15,
    "quickening": 0.92,
    "thickSkin": 0.9,
    "thickSkinHpPct": 0.15,
    "greed": 1.15,
    "vampEvery": 8,
    "vampHealPct": 0.01,
    "critSurgeChance": 0.06,
    "critSurgeMult": 0.15,
    "secondWindFrac": 0.3,
    "bossBane": 1.2,
    "goldenAura": 1.2,
    "counterCadence": 1.8,
    "battleFocusStacks": 10,
    "battleFocusSpeed": 0.9,
    "battleFocusStunDur": 0.25,
    "toughGritHp": 0.4,
    "toughGritReduction": 0.8,
    "toughGritLifesteal": 0.15,
    "ironResolveEvery": 20,
    "ironResolveShieldPct": 0.1,
    "overchargeDefScale": 0.008,
    "overchargeCap": 0.32,
    "titanStatureHpPct": 0.25,
    "swiftRecoverySpeed": 0.8,
    "swiftRecoveryDur": 3.0,
    "midasRhythmWindow": 0.6,
    "midasRhythmCoins": 1.6,
    "midasRhythmDmg": 1.2,
    "executionerHpFrac": 0.3,
    "executionerDmgMult": 1.35,
    "dragonbloodHpPct": 0.25,
    "dragonbloodSigReduction": 0.75,
    "godhandEvery": 25,
    "godhandMult": 3.0,
    "godhandStun": 1.0,
    "momentumSurgePer10": 0.05,
    "asuraSlayerDmg": 1.25,
    "asuraSlayerAcc": 0.1,
    "frenzyEchoEvery": 5,
    "frenzyEchoPct": 1.0,
    "sovereignsGuardHealCut": 0.7,
    "transcendentDmg": 1.3,
    "transcendentHpPct": 0.25,
    "transcendentSpeed": 0.9,
    "ironWillHpPct": 0.15,
    "ironWillHealPct": 0.20,
    "riposteCounterMult": 2.2,
    "riposteFrenzyGain": 10,
    "thunderFocusCadencePct": 0.25,
    "transcendentCritDmg": 0.15,
    "grandmasterDmg": 1.30
  },
  "boss": {
    "enrageBelow": 0.4,
    "enrageIntervalMult": 0.8,
    "enrageDmgMult": 1.1,
    "introSeconds": 1.8
  },
  "bossSpecials": {
    "9": {
      "name": "BANANA SLING",
      "kind": "acc",
      "dur": 5,
      "amt": 0.4,
      "blurb": "Accuracy -40% for 5s — your slaps can MISS!",
      "desc": "Launches slippery bananas that blur your vision"
    },
    "19": {
      "name": "IRON BULWARK",
      "kind": "shield",
      "hits": 6,
      "shieldAmt": 0.65,
      "reflect": 0.1,
      "blurb": "Iron fortress — absorbs 6 slaps at 65% damage and reflects 10% back!",
      "desc": "Raises an impenetrable iron shield"
    },
    "29": {
      "name": "KATANA OMNISLASH",
      "kind": "heavy",
      "mult": 1.5,
      "stun": 1.5,
      "blurb": "Unblockable blade strike dealing 1.5× damage and 1.5s stagger — Parry and Guard cannot stop it!",
      "desc": "Swift dual-blade strike leaving you staggered"
    },
    "39": {
      "name": "PHARAOH'S SAND CURSE",
      "kind": "slow",
      "dur": 5,
      "amt": 0.35,
      "blurb": "Ancient sands reduce your slap speed by 35% for 5s!",
      "desc": "Ancient cursed sands drag down your arms"
    },
    "49": {
      "name": "DRAGON HELLFIRE",
      "kind": "burn",
      "dur": 5,
      "mult": 8.0,
      "pctPerSec": 0.012,
      "blurb": "Unblockable caldera blaze burns for 1.2% of your Max HP per second over 5s!",
      "desc": "Fiery dragon breath scorching everything"
    },
    "202": {
      "name": "SEISMIC STOMP",
      "kind": "heavy",
      "mult": 2.0,
      "stun": 1.0,
      "blurb": "A colossal stomp dealing 2× damage and stunning your slaps for 1s!",
      "desc": "Kumbhakaran stomps — and the whole realm shakes"
    },
    "205": {
      "name": "CHANDRAHASA STRIKE",
      "kind": "heavy",
      "mult": 1.75,
      "stun": 1.0,
      "healCut": 0.2,
      "blurb": "Unblockable moon-blade strike — 1.75× damage, a 1s stagger, and -20% healing for 5s!",
      "desc": "Ten heads howl as the crescent strike falls"
    },
    "212": {
      "name": "MARIONETTE GRIP",
      "kind": "shield",
      "hits": 5,
      "slowAmt": 0.2,
      "blurb": "Strings weave into a barrier — absorbs 5 slaps at 50% damage and slows your slaps by 20%!",
      "desc": "The puppet lunges as a web of strings seals the Puppeteer"
    },
    "215": {
      "name": "COUNTER SLAP",
      "kind": "heavy",
      "mult": 1.75,
      "stun": 1.2,
      "stripShield": true,
      "blurb": "Unblockable perfected slap, returned — 1.75× damage, a 1.2s stagger, and strips your shields!",
      "desc": "The shadow slaps back with your own technique"
    }
  },
  "healBosses": {
    "9": {
      "name": "BANANA FEAST",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "The Monkey King gorges mid-fight — heals 15% of his HP at 50% HP (once per fight)."
    },
    "19": {
      "name": "DARK RENEWAL",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "Darkness knits his wounds shut — heals 15% of his HP at 50% HP (once per fight)."
    },
    "29": {
      "name": "RONIN'S RESOLVE",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "A warrior's second breath — heals 15% of his HP at 50% HP (once per fight)."
    },
    "39": {
      "name": "ETERNAL RENEWAL",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "The tomb restores him — heals 15% of his HP at 50% HP (once per fight)."
    },
    "49": {
      "name": "DRAGON RENEWAL",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "Ancient blood knits shut — heals 15% of his HP at 50% HP (once per fight)."
    },
    "202": {
      "name": "AMRITA OF THE NAVEL",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "The nectar of immortality — heals 15% of his HP, once at 50% HP."
    },
    "205": {
      "name": "AMRITA OF THE NAVEL",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "The nectar of immortality — heals 15% of his HP, once at 50% HP."
    },
    "212": {
      "name": "MARIONETTE MENDING",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "The puppeteer re-strings its champion — heals 15% of its HP, once at 50% HP."
    },
    "215": {
      "name": "SHADOW RENEWAL",
      "pct": 0.15,
      "at": [
        0.5
      ],
      "blurb": "The shadow knits itself whole — heals 15% of his HP, once at 50% HP."
    }
  },
  "firstClearChests": {
    "4": {
      "coins": 300,
      "gems": 2
    },
    "9": {
      "coins": 3000,
      "gems": 5
    },
    "14": {
      "coins": 18000,
      "gems": 2
    },
    "19": {
      "coins": 85000,
      "gems": 5
    },
    "24": {
      "coins": 350000,
      "gems": 2
    },
    "29": {
      "coins": 1800000,
      "gems": 5
    },
    "34": {
      "coins": 9000000,
      "gems": 3
    },
    "39": {
      "coins": 48000000,
      "gems": 5
    },
    "44": {
      "coins": 175000000,
      "gems": 3
    },
    "49": {
      "coins": 900000000,
      "gems": 15
    }
  },
  "worldArts": [
    {
      "id": "echoPalm",
      "icon": "🔁",
      "name": "Echo Palm",
      "cost": 20,
      "desc": "Every 8th slap echoes — a phantom slap lands at 60% damage."
    },
    {
      "id": "frenzyHeart",
      "icon": "💓",
      "name": "Frenzy Heart",
      "cost": 15,
      "desc": "Your frenzy meter fills 30% faster."
    },
    {
      "id": "phoenixHeart",
      "icon": "🕊️",
      "name": "Phoenix Heart",
      "cost": 35,
      "desc": "Once per fight, a fatal blow leaves you standing at 25% HP + 1.5s invulnerability."
    },
    {
      "id": "battleTrance",
      "icon": "⚡",
      "name": "Battle Trance",
      "cost": 25,
      "desc": "+12% slap speed and +25% critical damage across all fights."
    },
    {
      "id": "giantsGrip",
      "icon": "✊",
      "name": "Giant's Grip",
      "cost": 15,
      "desc": "+1 max precision crits per fight (weak-spot cap)."
    },
    {
      "id": "eagleEye",
      "icon": "👁️",
      "name": "Eagle Eye",
      "cost": 12,
      "desc": "Weak spots stay open 0.6s longer."
    },
    {
      "id": "greedMantra",
      "icon": "🪙",
      "name": "Greed Mantra",
      "cost": 18,
      "desc": "+25% coins from world fights."
    },
    {
      "id": "bossHunter",
      "icon": "🏹",
      "name": "Sovereign's Bane",
      "cost": 25,
      "desc": "+15% damage against all bosses."
    }
  ],
  "relics": [
    {
      "id": "warBell",
      "icon": "🔔",
      "name": "Bronze War Bell",
      "srcW": 0,
      "srcS": 0,
      "vals": [
        0.1,
        0.2,
        0.3
      ],
      "fmt": "pct",
      "desc": "+{v} coins in world fights"
    },
    {
      "id": "rakshasaFang",
      "icon": "🗡️",
      "name": "Rakshasa Fang",
      "srcW": 0,
      "srcS": 1,
      "vals": [
        0.08,
        0.16,
        0.24
      ],
      "fmt": "pct",
      "desc": "+{v} crit damage"
    },
    {
      "id": "stampedeHorn",
      "icon": "📯",
      "name": "Horn of the Stampede",
      "srcW": 0,
      "srcS": 3,
      "vals": [
        0.1,
        0.2,
        0.3
      ],
      "fmt": "pct",
      "desc": "+{v} damage in world fights"
    },
    {
      "id": "graveChill",
      "icon": "🔔",
      "name": "Slumber Bell",
      "srcW": 0,
      "srcS": 2,
      "vals": [
        0.04,
        0.08,
        0.12
      ],
      "fmt": "pct",
      "desc": "Enemies attack {v} slower"
    },
    {
      "id": "skullWhispers",
      "icon": "💀",
      "name": "Skull of Whispers",
      "srcW": 0,
      "srcS": 4,
      "vals": [
        0.1,
        0.2,
        0.3
      ],
      "fmt": "pct",
      "desc": "Weak spots appear {v} sooner"
    },
    {
      "id": "tenKingsCrown",
      "icon": "👑",
      "name": "Crown of Ten Kings",
      "srcW": 0,
      "srcS": 5,
      "vals": [
        0.15,
        0.25,
        0.4
      ],
      "fmt": "pct",
      "desc": "+{v} damage vs world final bosses"
    },
    {
      "id": "firstFoeSplinter",
      "icon": "🪵",
      "name": "Splinter of the First Foe",
      "srcW": 1,
      "srcS": 0,
      "vals": [
        0.08,
        0.16,
        0.24
      ],
      "fmt": "pct",
      "desc": "+{v} damage vs non-bosses"
    },
    {
      "id": "silentGlove",
      "icon": "🧤",
      "name": "Silent Glove",
      "srcW": 1,
      "srcS": 1,
      "vals": [
        0.04,
        0.07,
        0.1
      ],
      "fmt": "pct",
      "desc": "+{v} slap speed"
    },
    {
      "id": "eclipseSigil",
      "icon": "🎭",
      "name": "Puppet Strings",
      "srcW": 1,
      "srcS": 2,
      "vals": [
        0.15,
        0.3,
        0.45
      ],
      "fmt": "pct",
      "desc": "Enemy specials & signature moves charge {v} slower"
    },
    {
      "id": "venomfangCoil",
      "icon": "🐍",
      "name": "Venomfang Coil",
      "srcW": 1,
      "srcS": 3,
      "vals": [
        0.1,
        0.2,
        0.3
      ],
      "fmt": "pct",
      "desc": "+{v} damage vs stunned enemies"
    },
    {
      "id": "beadsVoid",
      "icon": "📿",
      "name": "Beads of the Void",
      "srcW": 1,
      "srcS": 4,
      "vals": [
        0.2,
        0.4,
        0.6
      ],
      "fmt": "pct",
      "desc": "+{v} Soul Embers earned"
    },
    {
      "id": "mirrorPalm",
      "icon": "🪞",
      "name": "Mirror Palm",
      "srcW": 1,
      "srcS": 5,
      "vals": [
        10,
        9,
        8
      ],
      "fmt": "count",
      "desc": "Skin power charges every {v} slaps"
    }
  ],
  "ads": {
    "enabled": true,
    "admob": {
      "rewardedId": "ca-app-pub-4838625298188198/2176399244",
      "interstitialId": "ca-app-pub-4838625298188198/4210303088",
      "bannerId": "ca-app-pub-4838625298188198/9493052378"
    },
    "interstitialEveryFights": 3,
    "interstitialEveryWins": 3,
    "interstitialFightPoints": 3.0,
    "interstitialMinGapSec": 75,
    "placements": {
      "rewarded_revive_boss": true,
      "rewarded_offline_double": true
    }
  },
  "weakSpot": {
    "mult": 2.5,
    "dur": 0.9,
    "durHard": 0.75,
    "firstAt": 2.2,
    "everyMin": 5,
    "everyMax": 8,
    "frenzyGain": 5,
    "capBase": 3,
    "capPerLuck": 5,
    "capMax": 3,
    "luckScale": 0.06
  },
  "gems": {
    "elite": 1,
    "pairBoss": 3,
    "finalDragon": 100
  },
  "groupReward": {
    "bountyMult": 1.0
  },
  "collection": {
    "gems": 25
  },
  "offline": {
    "rate": 1.2e-05,
    "capSeconds": 28800,
    "minAway": 60,
    "price": 200
  },
  "skins": [
    {
      "id": "classic",
      "name": "Classic",
      "rarity": "DEFAULT",
      "desc": "Your own hand, knuckles out. The original slap.",
      "price": null,
      "sprite": null
    },
    {
      "id": "spidey",
      "name": "Spider-Man",
      "rarity": "RARE",
      "desc": "The friendly neighbourhood slapper. Red webbed glove, reflexes included.",
      "bonus": {
        "stat": "speed",
        "amt": 0.1,
        "label": "+10% SLAP SPEED"
      },
      "power": {
        "name": "WEB SNARE",
        "desc": "Charges every {n} slaps — TAP the battle icon to unleash it: 1.5x damage and webs the enemy, slowing its swings by 25% for 2.5s. Then a 5s rest"
      },
      "price": {
        "cur": "gems",
        "amt": 300
      },
      "sprite": "data:image/webp;base64,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"
    },
    {
      "id": "logan",
      "name": "Wolverine",
      "rarity": "EPIC",
      "desc": "Three adamantium claws and a very bad temper. The slap IS the snikt.",
      "bonus": {
        "stat": "critDmg",
        "amt": 0.15,
        "label": "+15% CRIT DAMAGE"
      },
      "power": {
        "name": "BERSERKER SLASH",
        "desc": "Charges every {n} slaps — TAP the battle icon to unleash it: a guaranteed crit for 2.2x damage that heals you for 2% of Max HP. Then a 6s rest"
      },
      "price": {
        "cur": "gems",
        "amt": 1000
      },
      "sprite": "data:image/webp;base64,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"
    },
    {
      "id": "thor",
      "name": "Thor",
      "rarity": "LEGENDARY",
      "desc": "The storm answers this hand. Every slap smells faintly of thunder.",
      "bonus": {
        "stat": "dmg",
        "amt": 0.15,
        "label": "+15% DAMAGE"
      },
      "bonus2": {
        "stat": "coins",
        "amt": 0.15,
        "label": "+15% COINS"
      },
      "power": {
        "name": "THUNDER CALL",
        "desc": "Charges every {n} slaps — TAP the battle icon to unleash it: 3x damage and dazes the enemy for 0.6s. Then a 6s rest"
      },
      "price": {
        "cur": "gems",
        "amt": 2000
      },
      "sprite": "data:image/webp;base64,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"
    },
    {
      "id": "hulk",
      "name": "Hulk",
      "rarity": "LEGENDARY",
      "desc": "The biggest hand in the game. It does not knock. It claps.",
      "bonus": {
        "stat": "dmg",
        "amt": 0.25,
        "label": "+25% DAMAGE"
      },
      "bonus2": {
        "stat": "hp",
        "amt": 0.15,
        "label": "+15% MAX HP"
      },
      "power": {
        "name": "GAMMA SMASH",
        "desc": "Charges every {n} slaps — TAP the battle icon to unleash it: 4x damage, shatters half the enemy's shield and boosts your damage by 20% for 3s. Then an 8s rest"
      },
      "price": {
        "cur": "gems",
        "amt": 3500
      },
      "sprite": "data:image/webp;base64,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"
    },
    {
      "id": "gauntlet",
      "name": "Infinity Gauntlet",
      "rarity": "MYTHIC",
      "desc": "Six stones. One gauntlet. Half of everything gets slapped.",
      "bonus": {
        "stat": "dmg",
        "amt": 0.35,
        "label": "+35% DAMAGE"
      },
      "bonus2": {
        "stat": "coins",
        "amt": 0.2,
        "label": "+20% COINS"
      },
      "power": {
        "name": "TIME STOP",
        "desc": "Charges every {n} slaps — TAP the battle icon to unleash it: STOPS TIME for 5s (+30% damage, +50% slap speed). The stones then need 16s to recharge — the countdown shows on the icon"
      },
      "price": {
        "cur": "gems",
        "amt": 9000
      },
      "sprite": "data:image/webp;base64,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"
    }
  ],
  "specials": [
    {
      "id": "doubleSlap",
      "name": "Double Slap",
      "boss": 9,
      "mult": 4,
      "multMax": 10,
      "cd": 25,
      "cdMax": 15,
      "kind": "instant",
      "desc": "Both hands slam together for one crushing hit."
    },
    {
      "id": "barrier",
      "name": "Guard",
      "boss": 19,
      "cd": 24,
      "cdMax": 18,
      "kind": "barrier",
      "maxLevel": 3,
      "desc": "Cross both hands in an iron guard that completely blocks 100% of the next Normal Attack. Unblockable Signature Moves pierce it without consuming it."
    },
    {
      "id": "uppercut",
      "name": "Uppercut Punch",
      "boss": 39,
      "mult": 18,
      "multMax": 32,
      "cd": 32,
      "cdMax": 20,
      "kind": "instant",
      "stun": 2.5,
      "desc": "A ferocious rising uppercut that deals massive damage and knocks the enemy dizzy!"
    }
  ],
  "coinPacks": [
    {
      "name": "Pocket of Coins",
      "coins": 50000,
      "frontierMult": 1.5,
      "gems": 50,
      "bonus": "",
      "tag": "QUICK BOOST",
      "desc": "A handful of freshly minted gold coins to jumpstart your DPS."
    },
    {
      "name": "Bag of Gold",
      "coins": 250000,
      "frontierMult": 3.5,
      "gems": 140,
      "bonus": "+25% BONUS",
      "tag": "POPULAR",
      "desc": "Sturdy leather coin sack packed tight. Great for mid-tier attribute upgrades."
    },
    {
      "name": "Chest of Gold",
      "coins": 1500000,
      "frontierMult": 8,
      "gems": 350,
      "bonus": "+45% BONUS",
      "tag": "GREAT VALUE",
      "desc": "Reinforced wooden chest filled with golden coins. Crush boss walls with ease."
    },
    {
      "name": "Royal Treasury",
      "coins": 8000000,
      "frontierMult": 16,
      "gems": 800,
      "bonus": "+70% BONUS",
      "tag": "BEST VALUE",
      "desc": "Massive palace vault shipment. Skyrocket attributes and clear gauntlets."
    },
    {
      "name": "Dragon's Hoard",
      "coins": 35000000,
      "frontierMult": 32,
      "gems": 1800,
      "bonus": "+100% 2X BONUS",
      "tag": "WHALE TIER",
      "desc": "Legendary dragon lair fortune. Max out high-tier mastery and attributes."
    }
  ],
  "gemPacks": [
    {
      "id": "gem_pouch",
      "name": "Pouch of Gems",
      "gems": 80,
      "bonusGems": 0,
      "price": "₹49",
      "tag": "STARTER",
      "desc": "A gleaming starter pouch of rare cut diamonds."
    },
    {
      "id": "gem_sack",
      "name": "Sack of Gems",
      "gems": 240,
      "bonusGems": 35,
      "price": "₹149",
      "tag": "POPULAR",
      "desc": "A traveler's gem pouch with 35 bonus diamonds included."
    },
    {
      "id": "gem_chest",
      "name": "Chest of Gems",
      "gems": 700,
      "bonusGems": 150,
      "price": "₹399",
      "tag": "+25% BONUS",
      "desc": "An iron-bound chest brimming with sparkling blue gems."
    },
    {
      "id": "gem_vault",
      "name": "Vault of Gems",
      "gems": 1600,
      "bonusGems": 500,
      "price": "₹799",
      "tag": "BEST VALUE",
      "desc": "Heavily fortified vault crate. Affords top-tier hero skins and perks."
    },
    {
      "id": "gem_treasury",
      "name": "Titan's Treasury",
      "gems": 3800,
      "bonusGems": 1800,
      "price": "₹1,699",
      "tag": "+50% BONUS",
      "desc": "Ancient mountain treasure chamber filled with mystical crystals."
    },
    {
      "id": "gem_mountain",
      "name": "Cosmic Hoard",
      "gems": 9000,
      "bonusGems": 6000,
      "price": "₹3,499",
      "tag": "65% BONUS · ULTIMATE",
      "desc": "Infinite cosmic crystal fortune. Instantly unlock the Mythic Gauntlet & all perks!"
    }
  ],
  "bundles": [
    {
      "id": "starter",
      "name": "Starter Bundle",
      "badge": "STARTER DEAL",
      "price": "₹149",
      "valPrice": "₹499",
      "skin": "spidey",
      "coins": 25000,
      "frontierMult": 4,
      "gems": 200,
      "tagline": "The Webbed Crusader Set",
      "desc": "Equip the Spider-Man glove plus instant coin and gem boost!"
    },
    {
      "id": "weapon_x",
      "name": "Weapon X Bundle",
      "badge": "FEROCIOUS DEAL",
      "price": "₹249",
      "valPrice": "₹799",
      "skin": "logan",
      "coins": 80000,
      "frontierMult": 10,
      "gems": 400,
      "tagline": "Adamantium Rage Set",
      "desc": "Unleash Wolverine with heavy gold and gems."
    },
    {
      "id": "inferno",
      "name": "Thunder Bundle",
      "badge": "HOT DEAL",
      "price": "₹399",
      "valPrice": "₹1,199",
      "skin": "thor",
      "coins": 250000,
      "frontierMult": 22,
      "gems": 800,
      "tagline": "Lord of Asgard Set",
      "desc": "Harness Thor with massive coin and gem reserves."
    },
    {
      "id": "dragon",
      "name": "Hero Bundle",
      "badge": "MOST POPULAR",
      "price": "₹799",
      "valPrice": "₹2,499",
      "skin": "hulk",
      "coins": 1000000,
      "frontierMult": 45,
      "gems": 1600,
      "tagline": "Gamma Breaker Set",
      "desc": "Smash obstacles with Hulk alongside a colossal treasury."
    },
    {
      "id": "cosmic",
      "name": "Cosmic Infinity Bundle",
      "badge": "SUPREME · 5X VALUE",
      "price": "₹2,499",
      "valPrice": "₹9,999",
      "skin": "gauntlet",
      "coins": 10000000,
      "frontierMult": 90,
      "gems": 3000,
      "tagline": "Omnipotent Snap Set",
      "desc": "Wield the Mythic Infinity Gauntlet (all 6 stones, true Time Stop) with ultimate coin and gem fortune!"
    }
  ],
  "features": [
    {
      "id": "offline",
      "name": "Offline Slap Miner",
      "badge": "PASSIVE INCOME",
      "cur": "gems",
      "price": 200,
      "desc": "Earn coins while away at 0.0012% of your Frontier Full Payout per second, up to 34.56% over 8 hours (doubleable to 69.12% with a rewarded ad)."
    },
    {
      "id": "vip",
      "name": "Golden Slapper VIP Pass",
      "badge": "PERMANENT VIP",
      "cur": "money",
      "price": "₹199",
      "valPrice": "₹599",
      "desc": "Permanent +25% bonus coins from all enemy knockouts, prestige golden frame on your battle hand, and golden player crown!"
    },
    {
      "id": "frenzy_boost",
      "name": "Frenzy Overcharge Booster",
      "badge": "TURBO BOOST",
      "cur": "money",
      "price": "₹99",
      "valPrice": "₹299",
      "desc": "Frenzy charges 25% faster from inactive slaps (26 slaps instead of 35), and Frenzy duration extends to 13 seconds (normally 10s)!"
    },
    {
      "id": "remove_ads",
      "name": "Remove Ads",
      "badge": "NO ADS",
      "cur": "money",
      "price": "₹199",
      "valPrice": "₹499",
      "desc": "No more interstitial or banner ads, forever. Optional rewarded ads stay available whenever you want a boost."
    }
  ],
  "frenzy": {
    "cadence": 35,
    "duration": 10,
    "dmgMult": 1.5,
    "speedMult": 1.3
  },
  "timeStop": {
    "duration": 5,
    "dmgMult": 1.3,
    "speedMult": 1.5
  },
  "daily": {
    "chestDayMult": 0.25,
    "chestDayRamp": 0.2,
    "chestDay7Mult": 1.5,
    "chestDay7Gems": 25,
    "chestMinCoins": 60,
    "questPool": [
      "defeats",
      "battleCoins",
      "crits",
      "hardClear",
      "frenzies",
      "buys"
    ]
  },
  "products": [
    {
      "id": "bundle_starter",
      "kind": "bundle",
      "ref": "starter"
    },
    {
      "id": "bundle_weapon_x",
      "kind": "bundle",
      "ref": "weapon_x"
    },
    {
      "id": "bundle_inferno",
      "kind": "bundle",
      "ref": "inferno"
    },
    {
      "id": "bundle_dragon",
      "kind": "bundle",
      "ref": "dragon"
    },
    {
      "id": "bundle_cosmic",
      "kind": "bundle",
      "ref": "cosmic"
    },
    {
      "id": "feature_offline",
      "kind": "feature",
      "ref": "offline"
    },
    {
      "id": "feature_vip",
      "kind": "feature",
      "ref": "vip"
    },
    {
      "id": "feature_frenzy_boost",
      "kind": "feature",
      "ref": "frenzy_boost"
    },
    {
      "id": "feature_remove_ads",
      "kind": "feature",
      "ref": "remove_ads"
    },
    {
      "id": "gem_pouch",
      "kind": "gem",
      "ref": "gem_pouch"
    },
    {
      "id": "gem_sack",
      "kind": "gem",
      "ref": "gem_sack"
    },
    {
      "id": "gem_chest",
      "kind": "gem",
      "ref": "gem_chest"
    },
    {
      "id": "gem_vault",
      "kind": "gem",
      "ref": "gem_vault"
    },
    {
      "id": "gem_treasury",
      "kind": "gem",
      "ref": "gem_treasury"
    },
    {
      "id": "gem_mountain",
      "kind": "gem",
      "ref": "gem_mountain"
    }
  ],
  "appVersion": "3.5.0 · Combat & Blitz Balance"
};

export const GROUPS = [
  {
    "name": "Cozy Corner",
    "theme": "Soft targets, warm room, zero danger"
  },
  {
    "name": "Backyard Bunch",
    "theme": "Garden pests with attitude"
  },
  {
    "name": "Fight Club",
    "theme": "They actually hit the gym"
  },
  {
    "name": "Castle Guard",
    "theme": "Steel, armor, and the royal garrison"
  },
  {
    "name": "Graveyard Shift",
    "theme": "Dead, undead, and grumpy about it"
  },
  {
    "name": "Shadow Dojo",
    "theme": "Bamboo, lanterns, and martial arts masters"
  },
  {
    "name": "Dark Woods",
    "theme": "The trees are the least of your worries"
  },
  {
    "name": "Pharaoh's Tomb",
    "theme": "Cursed gold, ancient sands, and royal tombs"
  },
  {
    "name": "Mountain Stronghold",
    "theme": "Earth, stone, and mountain giants"
  },
  {
    "name": "Dragon Lair",
    "theme": "The supreme dragon broods atop the caldera"
  }
];


// Centralized formula calculators driven entirely by CONFIG
export const CHAPTER_CAPS = [
  { reqBossIdx: -1, maxPlayerLv: 10, maxPowerLv: 12, caps: { power: 12, speed: 8,  critChance: 10, critDamage: 12, combo: 12, coinMult: 12, defense: 10, bossDamage: 10, vampirism: 10, stun: 10, luck: 10, accuracy: 4 },  lockLabel: "DEFEAT STAGE #10 TO UNLOCK" },
  { reqBossIdx: 9,  maxPlayerLv: 18, maxPowerLv: 24, caps: { power: 24, speed: 13, critChance: 18, critDamage: 22, combo: 22, coinMult: 22, defense: 18, bossDamage: 18, vampirism: 18, stun: 18, luck: 18, accuracy: 6 },  lockLabel: "DEFEAT STAGE #20 TO UNLOCK" },
  { reqBossIdx: 19, maxPlayerLv: 26, maxPowerLv: 36, caps: { power: 36, speed: 18, critChance: 26, critDamage: 32, combo: 32, coinMult: 32, defense: 26, bossDamage: 26, vampirism: 26, stun: 26, luck: 26, accuracy: 8 },  lockLabel: "DEFEAT STAGE #30 TO UNLOCK" },
  { reqBossIdx: 29, maxPlayerLv: 35, maxPowerLv: 48, caps: { power: 48, speed: 21, critChance: 33, critDamage: 42, combo: 42, coinMult: 42, defense: 32, bossDamage: 32, vampirism: 36, stun: 34, luck: 34, accuracy: 11 }, lockLabel: "DEFEAT STAGE #40 TO UNLOCK" },
  { reqBossIdx: 39, maxPlayerLv: 40, maxPowerLv: 60, caps: { power: 60, speed: 23, critChance: 39, critDamage: 52, combo: 52, coinMult: 52, defense: 36, bossDamage: 36, vampirism: 36, stun: 42, luck: 42, accuracy: 13 }, lockLabel: "DEFEAT DRAGON LORD (#50) TO UNLOCK" },
  { reqBossIdx: 49, maxPlayerLv: 45, maxPowerLv: 70, caps: { power: 70, speed: 25, critChance: 45, critDamage: 60, combo: 60, coinMult: 60, defense: 40, bossDamage: 40, vampirism: 40, stun: 47, luck: 47, accuracy: 14 }, lockLabel: "DEFEAT RAVANA (ASURA REALM) TO UNLOCK" },
];
export function getProgressionCaps(defeated, asuraFinal) {
  if (asuraFinal) return { maxPlayerLv: 50, maxPowerLv: 80, caps: { power: 80, speed: 25, critChance: 45, critDamage: 65, combo: 65, coinMult: 65, defense: 40, bossDamage: 40, vampirism: 40, stun: 50, luck: 50, accuracy: 14 }, lockLabel: "MAX CHAPTER REACHED" };
  const has = (i) => defeated && (typeof defeated.has === "function" ? defeated.has(i) : (defeated.indexOf ? defeated.indexOf(i) >= 0 : false));
  let active = CHAPTER_CAPS[0];
  for (const tier of CHAPTER_CAPS) { if (tier.reqBossIdx === -1 || has(tier.reqBossIdx)) active = tier; }
  return active;
}

export const BELT_RANKS = {
  5:  { id: 'yellow',      name: 'Yellow Belt — Shockwave',      reqStage: 5,   desc: 'Every 5th slap deals 2x damage + screen shake.' },
  10: { id: 'orange',      name: 'Orange Belt — Vampire Grip',   reqStage: 10,  desc: 'Every 8th slap heals 3% Max HP.' },
  15: { id: 'green',       name: 'Green Belt — Second Wind',     reqStage: 15,  desc: 'Survive a fatal blow once per fight at 30% HP + 1.5s invulnerability.' },
  20: { id: 'blue',        name: 'Blue Belt — Counter Slap',     reqStage: 20,  desc: 'Taking an un-parried hit charges your next slap to 2x damage.' },
  25: { id: 'purple',      name: 'Purple Belt — Boss Breaker',   reqStage: 25,  desc: '+25% damage vs Elites/Bosses & reduces boss self-heals by 30%.' },
  30: { id: 'brown',       name: "Brown Belt — Titan's Guard",   reqStage: 30,  desc: 'Below 40% HP: take -25% damage & slap +15% faster.' },
  35: { id: 'red',         name: 'Red Belt — Executioner',       reqStage: 35,  desc: '+40% damage against enemies below 30% HP.' },
  40: { id: 'black',       name: 'Black Belt — Godhand',         reqStage: 40,  desc: 'Every 20th slap unleashes a 3x Thunder Slap + 1s stun.' },
  45: { id: 'master',      name: 'Master Belt — Realm Breaker',  reqStage: 50,  desc: '+30% damage in Worlds + 25% Crit Damage.' },
  50: { id: 'grandmaster', name: 'Grandmaster — Transcendent',   reqStage: 106, desc: '1.30x Damage, 1.25x Max HP, permanent Golden Aura.' }, // 106 = Beat W1 Ravana
};

export const ATTRIBUTE_COSTS_V33 = {
  power:       { base: 85,  growth: 1.2693, max: 80 },
  speed:       { base: 135, growth: 1.9837,  max: 25 },
  critChance:  { base: 150, growth: 1.5307,  max: 45 },
  critDamage:  { base: 110, growth: 1.3385,  max: 65 },
  defense:     { base: 190, growth: 1.5522,  max: 40 },
  stun:        { base: 150, growth: 1.4451,  max: 50 },
  combo:       { base: 95,  growth: 1.3385,  max: 65 },
  coinMult:    { base: 100, growth: 1.3491,  max: 65 },
  accuracy:    { base: 200, growth: 3.0032,  max: 14 },
  giantSlayer: { base: 200, growth: 1.5629,  max: 40 },
  lifeLeech:   { base: 270, growth: 1.5522,  max: 40 },
  fortuneLuck: { base: 160, growth: 1.4451,  max: 50 },
  bossDamage:  { base: 200, growth: 1.5629,  max: 40 },
  vampirism:   { base: 270, growth: 1.5522,  max: 40 },
  luck:        { base: 160, growth: 1.4451,  max: 50 },
};

export function getAttributeCost(attrKey, currentLevel) {
  const cfg = ATTRIBUTE_COSTS_V33[attrKey] || CONFIG.attrs[attrKey];
  if (!cfg) return 999999;
  const maxLvl = cfg.max || cfg.maxLevel || 999;
  const lvl = currentLevel != null ? currentLevel : 0;
  if (lvl >= maxLvl) return Infinity;
  return Math.round((cfg.base || cfg.baseCost) * Math.pow(cfg.growth, lvl));
}

export function calcAttrCost(key, currentLevel) {
  return getAttributeCost(key, currentLevel);
}

export function getLevelUpCost(currentLevel) {
  const lv = Math.max(1, currentLevel != null ? currentLevel : 1);
  if (lv >= 50) return Infinity;

  // v3.4.0 no-caps curve: prices are the only wall, so the segments steepen —
  // x1.70 (1-10) / step into 11 keeps x1.45 (51,586 anchor) /
  // x1.40 (12-20) / x1.38 (21-30) / x1.33 (31-40) / x1.33 (41-50)
  let baseCost;
  const costAt10 = 300 * Math.pow(1.70, 9);                // 35,576
  const costAt11 = costAt10 * 1.45;                        // 51,586 (spec anchor, unchanged)
  const costAt20 = costAt11 * Math.pow(1.40, 9);
  const costAt30 = costAt20 * Math.pow(1.38, 10);
  const costAt40 = costAt30 * Math.pow(1.33, 10);

  if (lv <= 10) {
    baseCost = 300 * Math.pow(1.70, lv - 1);
  } else if (lv <= 20) {
    baseCost = costAt11 * Math.pow(1.40, lv - 11);
  } else if (lv <= 30) {
    baseCost = costAt20 * Math.pow(1.38, lv - 20);
  } else if (lv <= 40) {
    baseCost = costAt30 * Math.pow(1.33, lv - 30);
  } else {
    baseCost = costAt40 * Math.pow(1.33, lv - 40);
  }

  // 1.5x Belt Promotion surcharge on levels 4->5, 9->10, ..., 49->50
  const nextLevel = lv + 1;
  const isBeltPromotion = nextLevel % 5 === 0;
  return Math.round(isBeltPromotion ? baseCost * 1.5 : baseCost);
}

export const calcLevelUpCost = getLevelUpCost;

export function canLevelUp(state) {
  const currentLevel = Math.max(1, state.level || state.playerLevel || 1);
  const nextLevel = currentLevel + 1;
  if (nextLevel > 50 || nextLevel > (state.chapterLevelCap || 50)) {
    return { ok: false, reason: 'CHAPTER_CAP' };
  }

  const belt = BELT_RANKS[nextLevel];
  if (belt && (state.highestStageCleared || 0) < belt.reqStage) {
    return { ok: false, reason: 'BOSS_GATE', reqStage: belt.reqStage, belt };
  }

  const cost = getLevelUpCost(currentLevel);
  if ((state.coins || 0) < cost) {
    return { ok: false, reason: 'COINS', cost };
  }

  return { ok: true, cost, belt: belt || null };
}

export function getLevelMasteryMultiplier(level) {
  const lv = Math.max(1, Number(level) || 1);
  return Math.pow(1.04, lv - 1); // +4% compounding damage EVERY level from Lv 1
}

export function getAttributeGate(level, chapterCap = 80) {
  const lv = Math.max(1, Number(level) || 1);
  // Shifted from (lv * 2) to (4 + lv * 2) so early Power upgrades feel great while leveling is costly
  return Math.min(chapterCap, 4 + lv * 2);
}

export function calcAttrCap(playerLevel, dragonMastery = 0) {
  const lv = Math.max(1, Number(playerLevel) || 1);
  return Math.min(80, 4 + lv * 2) + (dragonMastery * 5);
}

export function getLevelUpFeedback(newLevel, chapterCap = 80) {
  const belt = BELT_RANKS[newLevel];
  const newGate = getAttributeGate(newLevel, chapterCap);

  if (belt) {
    return {
      type: 'MODAL',
      title: `LEVEL ${newLevel}!`,
      subtitle: 'BELT PROMOTION',
      headline: belt.name,
      description: belt.desc,
      belt: belt,
    };
  }

  return {
    type: 'TOAST',
    text: `LEVEL ${newLevel}! +13.5% HP · +4% DMG · GATE ${newGate}`,
  };
}

export function calculateSlapCoins({
  stageBounty,
  slapDamage,
  enemyMaxHP,
  isCrit = false,
  isLucky = false,
  coinMult = 1.0,
}) {
  if (!stageBounty || !enemyMaxHP || slapDamage <= 0) return 0;

  const dmgRatio = Math.min(1.0, slapDamage / enemyMaxHP);
  let hitBonus = 1.0;
  if (isCrit) hitBonus *= 1.35;
  if (isLucky) hitBonus *= 2.50;

  // Zero taper, zero mid-fight decay:
  // Higher stageBounty immediately boosts coins/slap; higher slapDamage also boosts coins/slap
  const rawCoins = stageBounty * 0.14 * Math.pow(dmgRatio, 0.45) * hitBonus * coinMult;
  return Math.max(1, Math.round(rawCoins));
}

export function getPlayerMaxHP(state) {
  const level = Math.max(1, state.level || state.playerLevel || 1);

  // Smooth geometric base HP: Lv1 = 120, Lv7 = 257, Lv20 = 1,330, Lv50 = 59,360
  let hp = Math.round(120 * Math.pow(1.135, level - 1));

  // IMPORTANT: Always multiply by (1 + bonus), NEVER by 0.15!
  if (state.skills?.staminaTraining) {
    hp *= 1.15; // +15% Max HP (was accidentally * 0.15 -> 39 HP at Lv7)
  }
  if (state.skills?.unstoppableHands || state.skills?.unstoppable) {
    hp *= 1.30; // +30% Max HP
  }
  if (level >= 50) {
    hp *= 1.25; // Grandmaster Belt: +25% Max HP
  }

  const skinHpBonus = state.activeSkin?.hpBonus || 0; // e.g., 0.10 for +10%
  hp *= (1 + skinHpBonus);

  return Math.max(100, Math.round(hp));
}

export function calcPlayerMaxHp(playerLevel, hasStamina = false, hasUnstoppable = false) {
  const lvl = Math.max(1, playerLevel || 1);
  let hp = Math.round(120 * Math.pow(1.125, lvl - 1));
  if (hasStamina) hp *= 1.15;
  if (hasUnstoppable) hp *= 1.30;
  if (lvl >= 50) hp *= 1.25;
  return Math.max(100, Math.round(hp));
}

export function calcEnemyHp(i, isBoss = false, isElite = false) {
  const cfg = CONFIG.enemyProgression.hp;
  if (cfg.hpTable && i < cfg.hpTable.length) return cfg.hpTable[i];
  if (i === 0) return cfg.base0;
  if (i < 10) {
    if (cfg.early && cfg.early[i] != null) return cfg.early[i];
    let h = cfg.base0;
    for (let k = 1; k <= i; k++) h = Math.round(h * cfg.earlyMult[k]);
    return h;
  }
  const step = i - 10;
  const tailStart = cfg.tailStart != null ? cfg.tailStart : Infinity;
  let h;
  if (i <= tailStart) h = cfg.base10 * Math.pow(cfg.growth, step);
  else h = cfg.base10 * Math.pow(cfg.growth, tailStart - 10) * Math.pow(cfg.tailGrowth || 1.10, i - tailStart);
  if (isBoss) h *= cfg.bossMult;
  else if (isElite) h *= cfg.eliteMult;
  return Math.round(h);
}

export function calcEnemyDamage(i, isBoss = false, isElite = false) {
  const cfg = CONFIG.enemyProgression.damage;
  if (cfg.dmgTable && i < cfg.dmgTable.length) return cfg.dmgTable[i];
  if (i < 10) return cfg.earlyDmg[i];
  const step = i - 10;
  const tailStart = cfg.tailStart != null ? cfg.tailStart : Infinity;
  let d;
  if (i <= tailStart) d = cfg.base10 * Math.pow(cfg.growth, step);
  else d = cfg.base10 * Math.pow(cfg.growth, tailStart - 10) * Math.pow(cfg.tailGrowth || 1.14, i - tailStart);
  if (isBoss) d *= cfg.bossMult;
  else if (isElite) d *= cfg.eliteMult;
  return Math.round(d);
}

export function calcEnemyInterval(i, isBoss = false, isMiniBoss = false) {
  const cfg = CONFIG.enemyProgression.interval;
  if (cfg.table && i < cfg.table.length) return cfg.table[i];
  if (i < 10 && cfg.early && cfg.early[i] != null) return cfg.early[i];
  let interval = Math.max(cfg.floor, cfg.base * Math.pow(cfg.decay, i));
  if (isBoss) interval = Math.max(cfg.bossFloor, interval * cfg.bossMult);
  else if (isMiniBoss) interval = Math.max(cfg.floor, interval * (cfg.miniBossMult || 0.95));
  return Math.round(interval * 100) / 100;
}

export function calcEnemyBounty(hp, i, isBoss = false) {
  const cfg = CONFIG.enemyProgression.bounty;
  if (cfg.bountyTable && i < cfg.bountyTable.length) {
    return { coinRate: i < 10 ? (cfg.earlyRate || 0.50) : (cfg.baseRate || 0.55), bounty: cfg.bountyTable[i] };
  }
  const coinRate = i < 10 ? (cfg.earlyRate || 0.50) : (cfg.baseRate || 0.55);
  let bounty = Math.max(cfg.minBounty, Math.round(hp * coinRate * (cfg.scale || 0.52)));
  if (isBoss && cfg.bossBonusMult) bounty = Math.round(bounty * cfg.bossBonusMult);
  return { coinRate, bounty };
}


export { ROSTER } from './roster.js';
export { ALL_ENEMIES, ENEMIES } from './enemies.js';

// Lazy-mapped ENEMY_GROUPS ensuring each group always has .enemies populated
export const ENEMY_GROUPS = new Proxy(GROUPS, {
  get(target, prop, receiver) {
    if (prop === 'map') {
      return (cb) => target.map((g, gi) => {
        const enriched = {
          ...g,
          enemies: Array.isArray(ALL_ENEMIES) ? ALL_ENEMIES.slice(gi * 5, gi * 5 + 5).map((e, idx) => ({ ...e, id: gi * 5 + idx })) : []
        };
        return cb(enriched, gi, target);
      });
    }
    const val = Reflect.get(target, prop, receiver);
    if (typeof prop === 'string' && !isNaN(Number(prop))) {
      const gi = Number(prop);
      if (val && !val.enemies) {
        return {
          ...val,
          enemies: Array.isArray(ALL_ENEMIES) ? ALL_ENEMIES.slice(gi * 5, gi * 5 + 5).map((e, idx) => ({ ...e, id: gi * 5 + idx })) : []
        };
      }
    }
    return val;
  }
});

// ============================================================================
// 6. DOJO BOUNTIES 2.0 (2 Cumulative + 2 Showdown, Zero Impossible Contracts)
// ============================================================================
export const CUMULATIVE_BOUNTY_POOL = [
  {
    id: 'crit_hunter',
    title: 'Crit Hunter',
    metric: 'crits',
    goals: [15, 30, 50],
    gems: [2, 3, 4],
    coinMult: 1.25,
    isUnlocked: () => true,
    formatDesc: (g) => `Land ${g} total Crits across any fights.`,
  },
  {
    id: 'stun_brawler',
    title: 'Stun Brawler',
    metric: 'stuns',
    goals: [4, 8, 15],
    gems: [2, 3, 4],
    coinMult: 1.25,
    isUnlocked: (s) => (s?.attrs?.stun || 0) >= 1,
    formatDesc: (g) => `Trigger ${g} total Stuns across any fights.`,
  },
  {
    id: 'special_show',
    title: 'Special Show',
    metric: 'specialsUsed',
    goals: [3, 6, 10],
    gems: [2, 3, 3],
    coinMult: 1.25,
    isUnlocked: (s) => (s?.highestStageCleared || 0) >= 10 || Boolean(s?.hasNonClassicSkin),
    formatDesc: (g) => `Fire ${g} Specials or Skin Powers across any fights.`,
  },
  {
    id: 'bullseye',
    title: 'Bullseye',
    metric: 'weakSpotsHit',
    goals: [3, 6, 10],
    gems: [3, 3, 4],
    coinMult: 1.25,
    isUnlocked: (s) => Boolean(s?.skills?.precisionInstinct),
    formatDesc: (g) => `Tap ${g} Weak Spots across any fights.`,
  },
  {
    id: 'parry_master',
    title: 'Parry Master',
    metric: 'parries',
    goals: [3, 6, 10],
    gems: [3, 4, 4],
    coinMult: 1.25,
    isUnlocked: (s) => Boolean(s?.skills?.deflect),
    formatDesc: (g) => `Land ${g} Parries across any fights.`,
  },
  {
    id: 'frenzy_unleashed',
    title: 'Frenzy Unleashed',
    metric: 'frenzies',
    goals: [1, 2, 3],
    gems: [3, 4, 5],
    coinMult: 1.25,
    isUnlocked: (s) => Boolean(s?.skills?.frenzy),
    formatDesc: (g) => `Activate Frenzy ${g} time${g > 1 ? 's' : ''}.`,
  },
  {
    id: 'win_streak',
    title: 'Win Streak',
    metric: 'winStreak',
    goals: [3, 5, 8],
    gems: [2, 3, 4],
    coinMult: 1.25,
    isUnlocked: () => true,
    formatDesc: (g) => `Win ${g} fights in a row.`,
  },
  {
    id: 'combo_streak',
    title: 'Combo Streak',
    metric: 'maxCombo',
    goals: [15, 30, 60],
    gems: [2, 3, 4],
    coinMult: 1.25,
    isUnlocked: (s) => Boolean(s?.skills?.onTarget),
    formatDesc: (g) => `Reach a ${g}-hit combo streak across fights.`,
  },
];

export const SHOWDOWN_BOUNTY_POOL = [
  {
    id: 'speed_blitz',
    title: 'Speed Blitz',
    gems: [3, 3, 3],
    coinMult: 1.50,
    bossOnly: false,
    requiresMultiHit: false,
    isUnlocked: () => true,
    formatDesc: (target) => {
      const sec = target.isBoss ? 25 : 15;
      return `Defeat ${target.name} (#${target.stage}) in under ${sec}s.`;
    },
  },
  {
    id: 'untouchable',
    title: 'Untouchable',
    gems: [3, 3, 4],
    coinMult: 1.50,
    bossOnly: false,
    requiresMultiHit: false,
    isUnlocked: () => true,
    formatDesc: (target) => `Defeat ${target.name} (#${target.stage}) with at least 75% HP left.`,
  },
  {
    id: 'clean_hands',
    title: 'Clean Hands',
    gems: [3, 3, 3],
    coinMult: 1.50,
    bossOnly: false,
    requiresMultiHit: false,
    isUnlocked: () => true,
    formatDesc: (target) => `Defeat ${target.name} (#${target.stage}) without revives or ad boosts.`,
  },
  {
    id: 'no_specials',
    title: 'No Specials',
    gems: [2, 3, 3],
    coinMult: 1.50,
    bossOnly: false,
    requiresMultiHit: false,
    isUnlocked: (s) => (s?.highestStageCleared || 0) >= 10 || Boolean(s?.hasNonClassicSkin),
    formatDesc: (target) => `Defeat ${target.name} (#${target.stage}) without Specials or Skin Powers.`,
  },
  {
    id: 'hardcore_clear',
    title: 'Hardcore Clear',
    gems: [4, 4, 5],
    coinMult: 1.75,
    bossOnly: false,
    requiresMultiHit: false,
    isUnlocked: (s) => (s?.highestStageCleared || 0) >= 5,
    formatDesc: (target) => `Defeat ${target.name} (#${target.stage}) on Hard Mode.`,
  },
  {
    id: 'boss_rematch',
    title: 'Boss Rematch',
    gems: [4, 5, 5],
    coinMult: 1.75,
    bossOnly: true,
    requiresMultiHit: false,
    isUnlocked: (s) => (s?.highestStageCleared || 0) >= 10,
    formatDesc: (target) => `Defeat Boss ${target.name} (#${target.stage}).`,
  },
];

export function getBountyTierIndex(highestStageCleared) {
  if (highestStageCleared >= 36) return 2; // Late
  if (highestStageCleared >= 16) return 1; // Mid
  return 0;                                // Early
}

function pickRandom(list, rng = Math.random) {
  return list[Math.floor(rng() * list.length)];
}

export function pickShowdownTarget(state, enemiesByStage = {}, bossOnly = false, rng = Math.random, capStage = 0) {
  let highest = Math.min(50, state?.highestStageCleared || 3);
  if (capStage > 0) highest = Math.min(highest, capStage);

  if (bossOnly) {
    const bossStage = Math.max(10, Math.floor(highest / 10) * 10);
    const boss = enemiesByStage[bossStage] || enemiesByStage[bossStage - 1];
    return { stage: bossStage, name: boss?.name || `Stage ${bossStage} Boss`, hp: boss?.hp || 1, isBoss: true };
  }

  const minStage = Math.max(3, highest - 4);
  const candidates = [];
  for (let st = minStage; st <= highest; st++) {
    const enemy = enemiesByStage[st] || enemiesByStage[st - 1];
    candidates.push({
      stage: st,
      name: enemy?.name || `Stage ${st}`,
      hp: enemy?.hp || 1,
      isBoss: st % 10 === 0,
    });
  }
  return pickRandom(candidates, rng);
}

export function buildCumulativeContract(template, tierIndex) {
  const goal = template.goals[tierIndex];
  return {
    bucket: 'CUMULATIVE',
    id: template.id,
    title: template.title,
    metric: template.metric,
    goal,
    progress: 0,
    completed: false,
    claimed: false,
    coinMult: template.coinMult,
    gems: template.gems[tierIndex],
    desc: template.formatDesc(goal),
  };
}

export function buildShowdownContract(template, tierIndex, target) {
  return {
    bucket: 'SHOWDOWN',
    id: template.id,
    title: template.title,
    targetStage: target.stage,
    targetName: target.name,
    isBossTarget: target.isBoss,
    goal: 1,
    progress: 0,
    completed: false,
    claimed: false,
    coinMult: template.coinMult,
    gems: template.gems[tierIndex],
    desc: template.formatDesc(target),
  };
}

export function generateDailyDojoBounties(state, enemiesByStage = {}, rng = Math.random) {
  const highest = state?.highestStageCleared || 0;
  if (highest < 3) return null;

  const tierIndex = getBountyTierIndex(highest);
  const avgSlapDmg = Math.max(1, state?.avgSlapDmg || 1);

  // 1. Pick 2 distinct Cumulative contracts
  const cumPool = CUMULATIVE_BOUNTY_POOL.filter((c) => c.isUnlocked(state));
  const cumPicked = [];
  while (cumPicked.length < 2 && cumPool.length > 0) {
    const idx = Math.floor(rng() * cumPool.length);
    cumPicked.push(buildCumulativeContract(cumPool.splice(idx, 1)[0], tierIndex));
  }

  // 2. Pick 2 distinct Showdown contracts with TTK safety guard
  const showPool = SHOWDOWN_BOUNTY_POOL.filter((c) => c.isUnlocked(state));
  const showPicked = [];
  let attempts = 0;
  while (showPicked.length < 2 && showPool.length > 0 && attempts++ < 20) {
    const idx = Math.floor(rng() * showPool.length);
    const tpl = showPool[idx];
    let capStage = 0;
    if (tpl.id === 'hardcore_clear') {
      capStage = Math.floor((state?.highestStageCleared || 0) / 5) * 5;
      if (capStage < 3) { showPool.splice(idx, 1); continue; }
    }
    const target = pickShowdownTarget(state, enemiesByStage, tpl.bossOnly, rng, capStage);

    // TTK Safety Guard: never assign multi-hit single-fight contracts if target dies in < 8 slaps
    const estHitsToKill = target.hp / avgSlapDmg;
    if (tpl.requiresMultiHit && estHitsToKill < 8) continue;

    showPool.splice(idx, 1);
    showPicked.push(buildShowdownContract(tpl, tierIndex, target));
  }

  return {
    contracts: [...cumPicked, ...showPicked],
    freeRerollsLeft: 1,
    adRerollsLeft: 2,
    masterChestClaimed: false,
  };
}

export function rerollDojoBounty(board, slotIndex, state, enemiesByStage = {}, method = 'FREE', rng = Math.random) {
  const current = board?.contracts?.[slotIndex];
  if (!current || current.completed || current.claimed) {
    return { ok: false, reason: 'ALREADY_COMPLETED' };
  }
  if (method === 'FREE' && board.freeRerollsLeft <= 0) {
    return { ok: false, reason: 'NO_FREE_REROLLS' };
  }
  if (method === 'AD' && board.adRerollsLeft <= 0) {
    return { ok: false, reason: 'NO_AD_REROLLS' };
  }

  const tierIndex = getBountyTierIndex(state?.highestStageCleared || 3);
  const activeIds = new Set(board.contracts.map((c) => c.id));

  let replacement = null;
  if (current.bucket === 'CUMULATIVE') {
    const options = CUMULATIVE_BOUNTY_POOL.filter((c) => c.isUnlocked(state) && !activeIds.has(c.id));
    if (options.length === 0) return { ok: false, reason: 'NO_ALTERNATIVES' };
    replacement = buildCumulativeContract(pickRandom(options, rng), tierIndex);
  } else {
    const options = SHOWDOWN_BOUNTY_POOL.filter((c) => c.isUnlocked(state) && !activeIds.has(c.id));
    if (options.length === 0) return { ok: false, reason: 'NO_ALTERNATIVES' };
    let tpl = pickRandom(options, rng);
    let capStage = 0;
    if (tpl.id === 'hardcore_clear') {
      capStage = Math.floor((state?.highestStageCleared || 0) / 5) * 5;
      if (capStage < 3) {
        const rest = options.filter((o) => o.id !== 'hardcore_clear');
        if (rest.length === 0) return { ok: false, reason: 'NO_ALTERNATIVES' };
        tpl = pickRandom(rest, rng);
        capStage = 0;
      }
    }
    const target = pickShowdownTarget(state, enemiesByStage, tpl.bossOnly, rng, capStage);
    replacement = buildShowdownContract(tpl, tierIndex, target);
  }

  board.contracts[slotIndex] = replacement;
  if (method === 'FREE') board.freeRerollsLeft -= 1;
  if (method === 'AD') board.adRerollsLeft -= 1;

  return { ok: true, contract: replacement };
}

export function getDojoMasterChestReward(frontierBounty, doubledByAd = false) {
  const mult = doubledByAd ? 2 : 1;
  return {
    coins: Math.round(frontierBounty * 3 * mult),
    gems: 10 * mult,
  };
}
