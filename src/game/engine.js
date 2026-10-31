// Game Engine — core logic for "These Hands"
import {
  CONFIG,
  ALL_ENEMIES,
  calcLevelUpCost,
  calcAttrCost,
  calcAttrCap,
  calcEnemyHp,
  calcEnemyDamage,
  calcEnemyInterval,
  calcEnemyBounty,
  calcPlayerMaxHp
} from './config.js';

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
    attrs: { power:0, speed:0, critChance:0, critDamage:0, defense:0, stun:0, combo:0, coinMult:0, accuracy:0, bossDamage:0, vampirism:0, luck:0, special:0 },
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
    adCoinBoostUntil: 0,
    adDmgBoostUntil: 0,
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
    const initial = createInitialSave();
    return {
      ...initial,
      ...parsed,
      attrs: { ...initial.attrs, ...(parsed.attrs || {}) },
      stats: { ...initial.stats, ...(parsed.stats || {}) },
    };
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
export function attrCost(key, currentLevel) {
  return calcAttrCost(key, currentLevel);
}

export function attrCap(playerLevel) {
  return calcAttrCap(playerLevel);
}

export function levelUpCost(currentLevel) {
  return calcLevelUpCost(currentLevel);
}

// ──────────────────────────────────────────────
// Derived player stats from save
// ──────────────────────────────────────────────
export function computePlayerStats(save) {
  const a = save.attrs || {};
  const s = save.skills || {};
  const ab = save.playerLevel || 1;
  const fx = CONFIG.fx;
  const sfx = CONFIG.skillFx;
  const afxMap = CONFIG.abilityFx;

  // Active ad damage boost (strictly 2x outgoing damage)
  const adDmgMult = (save.adDmgBoostUntil && save.adDmgBoostUntil > Date.now()) ? 2.0 : 1.0;

  // Base damage matching runtime combat engine
  let dmg = (CONFIG.playerBase.damage + (a.power || 0) * 2);
  if (s.strongerHands) dmg *= sfx.strongerDmg;
  if (ab >= 2) dmg *= afxMap.ironPalm;
  if (ab >= 20) dmg *= afxMap.godhandDmg || 1.15;
  if (ab > 20) dmg *= 1 + (afxMap.masteryPer || 0.02) * (ab - 20);
  dmg *= adDmgMult;

  // Attack interval (lower = faster)
  let interval = CONFIG.playerBase.attackInterval;
  interval *= Math.max(fx.speedFloor, Math.pow(fx.speedPerLevel, a.speed || 0));
  if (s.quickReflexes) interval *= sfx.quickSpeed;
  if (s.dualHand) interval *= sfx.dualSpeed;
  if (ab >= 3) interval *= afxMap.quickening;
  if (ab >= 20) interval *= afxMap.godhandSpeed || 0.92;
  if (s.secondHand) interval *= 0.5; // two hands = half interval per hand
  interval = Math.max(0.12, interval);

  // Crit
  let critChance = CONFIG.playerBase.critChance + (a.critChance || 0) * fx.critChancePerLevel;
  if (s.criticalSlaps) critChance += sfx.critSlaps;
  if (ab >= 7) critChance += afxMap.critSurge;
  critChance = Math.min(0.60, critChance);

  let critMult = CONFIG.playerBase.critMult + (a.critDamage || 0) * fx.critDamagePerLevel;

  // Combo
  const comboBaseStacks = fx.comboBaseStacks + (s.comboMastery ? sfx.comboMasteryStacks : 0);
  const comboPerStack = (a.combo || 0) * fx.comboPerStackPerLevel + (s.comboMastery ? sfx.comboMasteryPer : 0);

  // Active ad coin boost (strictly 2x coin rewards)
  const adCoinMult = (save.adCoinBoostUntil && save.adCoinBoostUntil > Date.now()) ? 2.0 : 1.0;
  let coinMult = 1 + (a.coinMult || 0) * fx.coinPerLevel;
  if (ab >= 5) coinMult *= afxMap.greed;
  if (ab >= 9) coinMult *= afxMap.goldenAura;
  if (s.coinMagnet) coinMult *= sfx.magnetCoins;
  if (s.goldenTouch) coinMult *= sfx.goldenCoins;
  coinMult *= adCoinMult;

  // Accuracy
  let accuracy = Math.min(fx.accuracyCap, fx.accuracyBase + (a.accuracy || 0) * fx.accuracyPerLevel);

  // Boss damage multiplier
  let bossDmgMult = 1 + (a.bossDamage || 0) * fx.bossDmgPerLevel;
  if (s.bossHunter) bossDmgMult *= sfx.bossMult;
  if (ab >= 8) bossDmgMult *= afxMap.bossBane;

  // HP
  let maxHp = CONFIG.playerHp.base + (ab - 1) * CONFIG.playerHp.perLevel;
  if (s.staminaTraining) maxHp += sfx.staminaHp;
  if (s.unstoppable) maxHp += sfx.unstoppableHp;

  // Theoretical DPS with heavy hits, combos, and crits
  const pH = s.heavySlap ? sfx.heavyChance : 0;
  const maxStacks = comboBaseStacks + Math.round((a.combo || 0) * 0.4);
  const avgComboMult = 1 + (maxStacks * 0.7) * comboPerStack;
  let dps = (dmg * avgComboMult * ((1 - pH) * (1 + critChance * (critMult - 1)) + pH * sfx.heavyMult)) / interval;
  if (s.rapidBarrage) dps *= 1 + sfx.barrageHits * sfx.barrageMult / sfx.barrageEvery;

  return { dmg, interval, critChance, critMult, comboBaseStacks, comboPerStack, coinMult, accuracy, bossDmgMult, maxHp, dps };
}

// ──────────────────────────────────────────────
// Enemy helpers
// ──────────────────────────────────────────────
export function computeEnemyHp(enemyId) {
  const enemy = ALL_ENEMIES ? ALL_ENEMIES[enemyId] : null;
  return calcEnemyHp(enemyId, enemy?.boss, enemy?.elite);
}

export function computeEnemyAttack(enemyId) {
  const enemy = ALL_ENEMIES ? ALL_ENEMIES[enemyId] : null;
  const interval = calcEnemyInterval(enemyId, enemy?.boss, enemy?.elite && !enemy?.boss);
  const atkDmg = calcEnemyDamage(enemyId, enemy?.boss, enemy?.elite);
  return { interval, atkDmg };
}

export function getEnemyCoinReward(enemyId, coinMult) {
  const enemy = ALL_ENEMIES ? ALL_ENEMIES[enemyId] : null;
  const hp = enemy ? enemy.hp : calcEnemyHp(enemyId);
  const { bounty } = calcEnemyBounty(hp, enemyId);
  return Math.floor(bounty * (coinMult || 1));
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
  { id:'slapper10',  name:'Slapper',            desc:'Land 2,500 slaps',                    target:2500, stat:'totalSlaps',reward:5  },
  { id:'slapper50',  name:'Slap Machine',       desc:'Land 25,000 slaps',                   target:25000,stat:'totalSlaps',reward:15 },
  { id:'kos10',      name:'Fighter',            desc:'KO 100 enemies',                      target:100, stat:'totalKOs',  reward:10 },
  { id:'kos50',      name:'Champion',           desc:'KO 500 enemies',                      target:500, stat:'totalKOs',  reward:25 },
  { id:'coins1k',    name:'Penny Pincher',      desc:'Earn 50,000 coins total',             target:50000,stat:'totalCoins',reward:10 },
  { id:'coins100k',  name:'Money Bags',         desc:'Earn 500,000 coins total',            target:500000,stat:'totalCoins',reward:25 },
  { id:'level5',     name:'Rising Star',        desc:'Reach player level 7',                target:7,   stat:'playerLevel',reward:10 },
  { id:'level10',    name:'Veteran Slapper',    desc:'Reach player level 15',               target:15,  stat:'playerLevel',reward:25 },
  { id:'crits100',   name:'Crit Happy',         desc:'Score 250 critical hits',             target:250, stat:'totalCrits', reward:10 },
];

// ──────────────────────────────────────────────
// Offline earnings
// ──────────────────────────────────────────────
export function calcOfflineEarnings(save) {
  const cfg = CONFIG.offline;
  if (!save.offlineEarningsUnlocked) return 0;
  const now = Date.now();
  const lastSeen = save.lastSeen || now;
  if (now <= lastSeen) return 0; // clock manipulation protection
  
  const rawAwaySecs = Math.max(0, (now - lastSeen) / 1000);
  if (rawAwaySecs < cfg.minAway) return 0; // anti-exploit threshold
  const totalAwaySecs = Math.min(rawAwaySecs, cfg.capSeconds);

  // Base player stats without temporary ad coin boost
  const baseSave = { ...save, adCoinBoostUntil: 0 };
  const stats = computePlayerStats(baseSave);
  const baseCoinsPerSec = stats.dps * cfg.rate * stats.coinMult;

  // Split away time into boosted and unboosted portions
  const boostExpiry = save.adCoinBoostUntil || 0;
  let boostedSecs = 0;
  if (boostExpiry > lastSeen) {
    const boostEndMs = Math.min(lastSeen + totalAwaySecs * 1000, boostExpiry);
    boostedSecs = Math.max(0, (boostEndMs - lastSeen) / 1000);
  }
  const unboostedSecs = Math.max(0, totalAwaySecs - boostedSecs);

  // 2x Coins applies strictly to the boostedSecs portion
  const unboostedCoins = Math.floor(baseCoinsPerSec * unboostedSecs);
  const boostedCoins = Math.floor(baseCoinsPerSec * 2.0 * boostedSecs);
  const totalCoins = unboostedCoins + boostedCoins;

  return totalCoins;
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
  if (typeof code !== 'string' || !code.trim() || code.length > 65536) return null;
  try {
    const json = atob(code.trim());
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;

    const base = createInitialSave();
    const clean = Object.create(null);

    const safeNum = (v, min, max, dflt) =>
      typeof v === 'number' && Number.isFinite(v) ? Math.max(min, Math.min(max, Math.floor(v))) : dflt;

    clean.coins = safeNum(parsed.coins, 0, 1e15, base.coins);
    clean.kills = safeNum(parsed.kills, 0, 1000000, base.kills);
    clean.playerLevel = safeNum(parsed.playerLevel, 1, 100, base.playerLevel);
    clean.highestClearedEnemy = safeNum(parsed.highestClearedEnemy, 0, 1000, base.highestClearedEnemy);
    clean.currentEnemyId = safeNum(parsed.currentEnemyId, 0, 1000, base.currentEnemyId);
    clean.lastSeen = safeNum(parsed.lastSeen, 0, Date.now() + 86400000, Date.now());
    clean.offlineEarningsUnlocked = Boolean(parsed.offlineEarningsUnlocked);

    clean.attrs = { ...base.attrs };
    if (parsed.attrs && typeof parsed.attrs === 'object' && !Array.isArray(parsed.attrs)) {
      for (const k of Object.keys(base.attrs)) {
        if (typeof parsed.attrs[k] === 'number' && Number.isFinite(parsed.attrs[k])) {
          clean.attrs[k] = Math.max(0, Math.min(100, Math.floor(parsed.attrs[k])));
        }
      }
    }

    clean.skills = { ...base.skills };
    if (parsed.skills && typeof parsed.skills === 'object' && !Array.isArray(parsed.skills)) {
      for (const k of Object.keys(base.skills)) {
        if (typeof parsed.skills[k] === 'boolean') {
          clean.skills[k] = parsed.skills[k];
        }
      }
    }

    clean.stats = { ...base.stats };
    if (parsed.stats && typeof parsed.stats === 'object' && !Array.isArray(parsed.stats)) {
      for (const k of Object.keys(base.stats)) {
        if (typeof parsed.stats[k] === 'number' && Number.isFinite(parsed.stats[k])) {
          clean.stats[k] = Math.max(0, Math.floor(parsed.stats[k]));
        }
      }
    }

    return { ...base, ...clean };
  } catch { return null; }
}
