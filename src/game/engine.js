// Game Engine — core logic for "These Hands"
import { CONFIG, ALL_ENEMIES } from './config.js';

// ──────────────────────────────────────────────
// Save / Load
// ──────────────────────────────────────────────
const SAVE_KEY = 'theseHands_save_v1';

export function createInitialSave() {
  return {
    coins: 0,
    gems: 0,
    playerLevel: 1,
    xp: 0,
    attrs: { power:0, speed:0, critChance:0, critDamage:0, combo:0, coinMult:0, accuracy:0, bossDamage:0, luck:0, special:0 },
    skills: { basic: true },
    defeatedEnemies: {},       // { [enemyId]: true }
    hardDefeatedEnemies: {},   // { [enemyId]: true }
    currentEnemyId: 0,
    equippedSkin: 'classic',
    ownedSkins: ['classic'],
    stats: { totalSlaps:0, totalDamage:0, totalCoins:0, totalKOs:0, totalCrits:0, playSecs:0 },
    achievements: {},
    quests: null,
    questLastDay: null,
    dailyChest: { streak:0, lastDay:null },
    offlineEarningsUnlocked: false,
    lastSeen: Date.now(),
    specials: {},
    music: true,
    sfx: true,
  };
}

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createInitialSave();
    const parsed = JSON.parse(raw);
    return { ...createInitialSave(), ...parsed };
  } catch {
    return createInitialSave();
  }
}

export function persistSave(save) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...save, lastSeen: Date.now() }));
  } catch { /* storage full or private mode */ }
}

// ──────────────────────────────────────────────
// Attribute helpers
// ──────────────────────────────────────────────
export function attrCost(key, currentLevel, playerLevel) {
  const { baseCost, growth } = CONFIG.attrs[key];
  const raw = Math.floor(baseCost * Math.pow(growth, currentLevel));
  if (playerLevel != null) {
    const maxAllowed = Math.round(levelUpCost(playerLevel) * 0.85);
    return Math.min(raw, maxAllowed);
  }
  return raw;
}

export function attrCap(playerLevel) {
  return playerLevel * CONFIG.capPerLevel;
}

export function levelUpCost(currentLevel) {
  return Math.floor(CONFIG.levelUp.base * Math.pow(CONFIG.levelUp.growth, currentLevel - 1));
}

// ──────────────────────────────────────────────
// Derived player stats from save
// ──────────────────────────────────────────────
export function computePlayerStats(save) {
  const a = save.attrs;
  const s = save.skills;
  const ab = save.playerLevel;
  const fx = CONFIG.fx;
  const sfx = CONFIG.skillFx;
  const afxMap = CONFIG.abilityFx;

  // Base damage
  let dmg = CONFIG.playerBase.damage;
  if (s.strongerHands) dmg *= sfx.strongerDmg;
  if (ab >= 2) dmg *= afxMap.ironPalm;
  dmg *= 1 + a.power * 0.15;

  // Attack interval (lower = faster)
  let interval = CONFIG.playerBase.attackInterval;
  interval *= Math.max(fx.speedFloor, Math.pow(fx.speedPerLevel, a.speed));
  if (s.quickReflexes) interval *= sfx.quickSpeed;
  if (s.dualHand) interval *= sfx.dualSpeed;
  if (ab >= 3) interval *= afxMap.quickening;
  if (s.secondHand) interval *= 0.5; // two hands = half the interval per hand

  // Crit
  let critChance = CONFIG.playerBase.critChance + a.critChance * fx.critChancePerLevel;
  if (s.criticalSlaps) critChance += sfx.critSlaps;
  if (ab >= 7) critChance += afxMap.critSurge;
  critChance = Math.min(0.95, critChance);

  let critMult = CONFIG.playerBase.critMult + a.critDamage * fx.critDamagePerLevel;

  // Combo
  const comboBaseStacks = fx.comboBaseStacks + (s.comboMastery ? sfx.comboMasteryStacks : 0);
  const comboPerStack = a.combo * fx.comboPerStackPerLevel + (s.comboMastery ? sfx.comboMasteryPer : 0);

  // Coins
  let coinMult = 1 + a.coinMult * fx.coinPerLevel;
  if (ab >= 5) coinMult *= afxMap.greed;
  if (ab >= 10) coinMult *= afxMap.goldenAura;
  if (s.coinMagnet) coinMult *= sfx.magnetCoins;
  if (s.goldenTouch) coinMult *= sfx.goldenCoins;

  // Accuracy
  let accuracy = Math.min(fx.accuracyCap, fx.accuracyBase + a.accuracy * fx.accuracyPerLevel);

  // Boss damage multiplier
  let bossDmgMult = 1 + a.bossDamage * fx.bossDmgPerLevel;
  if (s.bossHunter) bossDmgMult *= sfx.bossMult;
  if (ab >= 9) bossDmgMult *= afxMap.bossBane;

  // HP
  let maxHp = CONFIG.playerHp.base + (ab - 1) * CONFIG.playerHp.perLevel;
  if (s.staminaTraining) maxHp += sfx.staminaHp;
  if (s.unstoppable) maxHp += sfx.unstoppableHp;

  const dps = dmg / interval;

  return { dmg, interval, critChance, critMult, comboBaseStacks, comboPerStack, coinMult, accuracy, bossDmgMult, maxHp, dps };
}

// ──────────────────────────────────────────────
// Enemy helpers
// ──────────────────────────────────────────────
export function computeEnemyHp(enemyId) {
  const sc = CONFIG.enemyScale;
  let hp = sc.hpBase;
  const early = sc.hpEarly;
  for (let i = 0; i < enemyId; i++) {
    let mult;
    if (i < early.length) {
      mult = early[i];
    } else if (i < 59) {
      mult = sc.hpLateStart + (sc.hpLateEnd - sc.hpLateStart) * (i - early.length) / (59 - early.length);
    } else if (i < 79) {
      mult = sc.hpTailStart + (sc.hpTailMid - sc.hpTailStart) * (i - 59) / 20;
    } else if (i < 89) {
      mult = sc.hpTailMid + (sc.hpTailMid2 - sc.hpTailMid) * (i - 79) / 10;
    } else {
      mult = sc.hpTailMid2 + (sc.hpTailEnd2 - sc.hpTailMid2) * (i - 89) / 10;
    }
    const enemy = ALL_ENEMIES[i];
    if (enemy?.elite) mult *= sc.eliteHp;
    hp *= mult;
  }
  return Math.ceil(hp);
}

export function computeEnemyAttack(enemyId) {
  const sc = CONFIG.enemyScale;
  const ea = CONFIG.enemyAttack;
  const isBoss = ALL_ENEMIES[enemyId]?.elite;

  let interval = ea.intervalStart * Math.pow(ea.intervalDecay, enemyId);
  interval = Math.max(ea.intervalFloor, interval);
  if (isBoss) {
    interval *= ea.eliteIntervalMult;
    interval = Math.max(ea.eliteIntervalFloor, interval);
  }

  const atkRatio = Math.min(ea.ratioCap, ea.ratioBase + ea.ratioSlope * (enemyId / 99) + (isBoss ? ea.bossRatioBonus : 0));
  const basePlayerDmg = CONFIG.playerBase.damage;
  const atkDmg = Math.ceil(basePlayerDmg * atkRatio * (1 + enemyId * 0.018));

  return { interval, atkDmg };
}

export function getEnemyCoinReward(enemyId, coinMult) {
  const enemy = ALL_ENEMIES[enemyId];
  const base = 3 + enemyId * 0.8;
  let reward = base * coinMult;
  if (enemy?.elite) reward *= CONFIG.groupReward.bountyMult;
  return Math.floor(reward);
}

// ──────────────────────────────────────────────
// Quest helpers
// ──────────────────────────────────────────────
const QUEST_TEMPLATES = [
  { id:'slaps',   name:'Slap Attack',      desc:'Land {n} slaps',         target:n=>n, values:[100,200,500] },
  { id:'crits',   name:'Critical Hitter',  desc:'Score {n} critical hits', target:n=>n, values:[20,50,100] },
  { id:'kos',     name:'Knockout Artist',  desc:'KO {n} enemies',          target:n=>n, values:[5,10,20] },
  { id:'coins',   name:'Coin Collector',   desc:'Earn {n} coins',          target:n=>n, values:[500,1000,2500] },
];

export function generateQuests(day) {
  const rng = (seed) => { let x=Math.sin(seed)*10000; return x-Math.floor(x); };
  return QUEST_TEMPLATES.map((t, i) => {
    const pick = Math.floor(rng(day * 13 + i * 7) * t.values.length);
    const n = t.values[pick];
    return { id: t.id, name: t.name, desc: t.desc.replace('{n}', n), target: n, progress: 0, claimed: false, reward: Math.floor(n * 2) };
  });
}

export function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ──────────────────────────────────────────────
// Achievement definitions
// ──────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id:'firstKO',    name:'First Blood',       desc:'KO your first enemy',                 target:1,   stat:'totalKOs',  reward:5  },
  { id:'slapper10',  name:'Slapper',            desc:'Land 1,000 slaps',                    target:1000, stat:'totalSlaps',reward:5  },
  { id:'slapper50',  name:'Slap Machine',       desc:'Land 10,000 slaps',                   target:10000,stat:'totalSlaps',reward:15 },
  { id:'kos10',      name:'Fighter',            desc:'KO 50 enemies',                       target:50,  stat:'totalKOs',  reward:10 },
  { id:'kos50',      name:'Champion',           desc:'KO 250 enemies',                      target:250, stat:'totalKOs',  reward:25 },
  { id:'coins1k',    name:'Penny Pincher',      desc:'Earn 10,000 coins total',             target:10000,stat:'totalCoins',reward:10 },
  { id:'coins100k',  name:'Money Bags',         desc:'Earn 100,000 coins total',            target:100000,stat:'totalCoins',reward:25 },
  { id:'level5',     name:'Rising Star',        desc:'Reach player level 5',                target:5,   stat:'playerLevel',reward:10 },
  { id:'level10',    name:'Veteran Slapper',    desc:'Reach player level 10',               target:10,  stat:'playerLevel',reward:25 },
  { id:'crits100',   name:'Crit Happy',         desc:'Score 100 critical hits',             target:100, stat:'totalCrits', reward:10 },
];

// ──────────────────────────────────────────────
// Offline earnings
// ──────────────────────────────────────────────
export function calcOfflineEarnings(save) {
  const cfg = CONFIG.offline;
  if (!save.offlineEarningsUnlocked) return 0;
  const now = Date.now();
  const awayMs = now - (save.lastSeen || now);
  const awaySecs = Math.min(awayMs / 1000, cfg.capSeconds);
  if (awaySecs < cfg.minAway) return 0;
  const stats = computePlayerStats(save);
  const coinsPerSec = stats.dps * cfg.rate * stats.coinMult;
  return Math.floor(coinsPerSec * awaySecs);
}

// ──────────────────────────────────────────────
// Export / Import save
// ──────────────────────────────────────────────
export function exportSave(save) {
  try {
    const json = JSON.stringify(save);
    return btoa(json);
  } catch { return ''; }
}

export function importSave(code) {
  try {
    const json = atob(code.trim());
    const parsed = JSON.parse(json);
    return { ...createInitialSave(), ...parsed };
  } catch { return null; }
}
