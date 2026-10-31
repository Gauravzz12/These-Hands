// These Hands — Authentic Enemies Definition & Sprite Generation
import { CONFIG, ROSTER, GROUPS } from './config.js';
import { ENEMY_ART, makeSprite } from './artData.js';
import { getV2Sprite, isV2Enemy } from './enemySpritesV2.js';

export const GIANT_SCALE = {"Giant Rooster":1.6,"Giant Spider":1.6,"Giant Serpent":1.6,"Giant Scorpion":1.6,"Storm Giant":1.65,"Kraken Spawn":1.6,"T-Rex King":1.6,"Glacier Titan":1.65};

export const ALL_ENEMIES = (() => {
  let runningHp = 45;
  return ROSTER.map((r, i) => {
    const pos = i % 5;
    const elite = pos === 4;
    const boss = i % 10 === 9;
    const miniBoss = elite && !boss;
    let stepMult;
    if (i === 0) {
      stepMult = 1;
    } else if (i < 10) {
      stepMult = boss ? 2.0 : miniBoss ? 1.5 : ((i - 1) % 5 === 4) ? 1.15 : 1.28;
    } else if (i < 30) {
      const prevWasBoss = (i - 1) % 10 === 9;
      const prevWasMini = (i - 1) % 5 === 4 && !prevWasBoss;
      stepMult = boss ? 1.85 : miniBoss ? 1.45 : prevWasBoss ? 1.10 : prevWasMini ? 1.12 : 1.20;
    } else {
      const prevWasBoss = (i - 1) % 10 === 9;
      const prevWasMini = (i - 1) % 5 === 4 && !prevWasBoss;
      stepMult = boss ? 1.75 : miniBoss ? 1.40 : prevWasBoss ? 1.08 : prevWasMini ? 1.10 : 1.16;
    }
    if (i > 0) runningHp = Math.round(runningHp * stepMult);
    const hp = runningHp;

    let bounty;
    if (i < 10) {
      bounty = Math.max(20, Math.round(hp * 0.38));
    } else if (i < 30) {
      bounty = Math.round(hp * Math.max(0.12, 0.35 * Math.pow(0.97, i)));
    } else {
      bounty = Math.round(hp * Math.max(0.04, 0.15 * Math.pow(0.98, i - 30)));
    }
    const coinRate = Math.round((bounty / hp) * 1000) / 1000;

    let interval = Math.max(1.2, 3.0 * Math.pow(0.985, i));
    if (boss) interval = Math.max(1.1, interval * 0.88);
    else if (miniBoss) interval = Math.max(1.15, interval * 0.92);
    interval = Math.round(interval * 100) / 100;

    const expectedLevel = Math.min(50, 1 + Math.floor(i / 1.4));
    const playerHp = 100 + 25 * (expectedLevel - 1);
    let dmgFraction;
    if (i < 10) {
      dmgFraction = (boss ? 0.18 : miniBoss ? 0.14 : 0.09) + 0.005 * i;
    } else if (i < 30) {
      dmgFraction = (boss ? 0.35 : miniBoss ? 0.28 : 0.22) + 0.003 * (i - 10);
    } else {
      dmgFraction = (boss ? 0.52 : miniBoss ? 0.42 : 0.34) + 0.003 * (i - 30);
    }
    const atkDmg = Math.max(6, Math.round(playerHp * dmgFraction));

    const built = {
      idx: i,
      name: r[0],
      group: Math.floor(i / 5),
      elite,
      hp,
      coinRate,
      bounty,
      atkInterval: interval,
      atkDmg,
      boss,
      bossAnim: i === 9 ? "vine" : i === 19 ? "rubble" : i === 29 ? "drop" : i === 39 ? "burrow" : i === 49 ? "fly" : i === 59 ? "assemble" : i === 69 ? "sarcophagus" : i === 79 ? "shatter" : i === 89 ? "bolt" : i === 99 ? "descend" : null,
      scale: r[0] === "Final Dragon Boss" ? 1.65 : r[0] === "The Almighty Hand" ? 1.7 : (/giant|titan|dragon|golem|king|colossus|almighty/i.test(r[0]) ? (GIANT_SCALE[r[0]] || 1.45) : (boss ? 1.15 : (elite ? 1.08 : 1.0)))
    };
    let sprCache = null;
    Object.defineProperty(built, "spr", {
      enumerable: true,
      get() {
        if (!sprCache) sprCache = isV2Enemy(i) ? getV2Sprite(i) : makeSprite(ENEMY_ART[i]);
        return sprCache;
      }
    });
    return built;
  });
})();
export const ENEMIES = ALL_ENEMIES;
