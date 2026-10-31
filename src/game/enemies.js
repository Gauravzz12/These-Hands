// These Hands — Authentic Enemies Definition & Sprite Generation
import { CONFIG, ROSTER, GROUPS } from './config.js';
import { ENEMY_ART, makeSprite } from './artData.js';
import { getV2Sprite, isV2Enemy } from './enemySpritesV2.js';

export const GIANT_SCALE = {"Giant Rooster":1.6,"Giant Spider":1.6,"Giant Serpent":1.6,"Giant Scorpion":1.6,"Storm Giant":1.65,"Kraken Spawn":1.6,"T-Rex King":1.6,"Glacier Titan":1.65};

export const ALL_ENEMIES = (() => {
  return ROSTER.map((r, i) => {
    const pos = i % 5;
    const elite = pos === 4;
    const boss = i % 10 === 9;
    const miniBoss = elite && !boss;

    let hp;
    if (i === 0) {
      hp = 55;
    } else if (i < 10) {
      const earlyMult = [1, 1.35, 1.38, 1.42, 1.70, 1.25, 1.30, 1.35, 1.40, 2.20];
      let h = 55;
      for (let k = 1; k <= i; k++) h = Math.round(h * earlyMult[k]);
      hp = h;
    } else {
      // Start Bodybuilder at 17,500 and scale exponentially to ~1.6B at Final Dragon
      const base10 = 17500;
      const step = i - 10;
      let h = base10 * Math.pow(1.328, step);
      if (boss) h *= 1.45;
      else if (elite) h *= 1.25;
      hp = Math.round(h);
    }

    // Money earning: generous coin rate so earning money is easy!
    let coinRate = i < 10 ? 0.48 : Math.max(0.38, 0.50 * Math.pow(0.995, i - 10));
    coinRate = Math.round(coinRate * 1000) / 1000;
    const bounty = Math.max(25, Math.round(hp * coinRate));

    let interval = Math.max(1.15, 2.8 * Math.pow(0.982, i));
    if (boss) interval = Math.max(1.1, interval * 0.90);
    else if (miniBoss) interval = Math.max(1.15, interval * 0.94);
    interval = Math.round(interval * 100) / 100;

    let atkDmg;
    if (i < 10) {
      const earlyDmg = [12, 16, 20, 24, 35, 40, 48, 55, 65, 95];
      atkDmg = earlyDmg[i];
    } else {
      // Bodybuilder at i=10 starts at 130, scaling to ~5,600 at i=49
      const baseDmg10 = 130;
      const dmgStep = i - 10;
      let d = baseDmg10 * Math.pow(1.092, dmgStep);
      if (boss) d *= 1.40;
      else if (elite) d *= 1.20;
      atkDmg = Math.round(d);
    }

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
