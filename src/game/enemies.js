// These Hands — Authentic Enemies Definition & Sprite Generation
import { ROSTER } from './roster.js';
import { CONFIG, calcEnemyHp, calcEnemyDamage, calcEnemyInterval, calcEnemyBounty } from './config.js';
import { ENEMY_ART, makeSprite } from './artData.js';
import { getV2Sprite, isV2Enemy } from './enemySpritesV2.js';

export const GIANT_SCALE = {"Giant Rooster":1.6,"Giant Spider":1.6,"Giant Serpent":1.6,"Giant Scorpion":1.6,"Storm Giant":1.65,"Kraken Spawn":1.6,"T-Rex King":1.6,"Glacier Titan":1.65};

let _allEnemies = null;

function buildAllEnemies() {
  if (_allEnemies) return _allEnemies;
  _allEnemies = ROSTER.map((r, i) => {
    const pos = i % 5;
    const boss = i % 10 === 9;
    const miniBoss = pos === 4 && !boss;
    const elite = pos === 4 || i % 10 === 8;

    const hp = calcEnemyHp(i, boss, elite);
    const { coinRate, bounty } = calcEnemyBounty(hp, i, boss);
    const interval = calcEnemyInterval(i, boss, miniBoss);
    const atkDmg = calcEnemyDamage(i, boss, elite);

    const evasion = i < 20 ? 0 : i < 24 ? 0.05 : i < 28 ? 0.06 : i < 30 ? 0.08 : i < 38 ? 0.10 : i < 48 ? 0.12 : i === 48 ? 0.14 : i < 59 ? 0.15 : i < 69 ? 0.16 : i < 79 ? 0.17 : i < 89 ? 0.18 : i < 99 ? 0.19 : 0.20;
    const built = {
      idx: i,
      evasion,
      name: r[0],
      group: Math.floor(i / 5),
      elite,
      miniBoss,
      hp,
      coinRate,
      bounty,
      atkInterval: interval,
      atkDmg,
      boss,
      bossAnim: i === 9 ? "vine" : i === 19 ? "rubble" : i === 29 ? "drop" : i === 39 ? "burrow" : i === 49 ? "fly" : i === 59 ? "assemble" : i === 69 ? "sarcophagus" : i === 79 ? "shatter" : i === 89 ? "bolt" : i === 99 ? "descend" : null,
      scale: r[0] === "Dragon Lord" ? 1.65 : r[0] === "The Almighty Hand" ? 1.7 : (/giant|titan|dragon|golem|king|colossus|almighty/i.test(r[0]) ? (GIANT_SCALE[r[0]] || 1.45) : (boss ? 1.15 : (elite ? 1.08 : 1.0)))
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

  // Ensure monotonic progression between normal enemies
  for (let i = 1; i < _allEnemies.length; i++) {
    const c = _allEnemies[i];
    if (!c.boss && !c.elite) {
      for (let j = i - 1; j >= 0; j--) {
        const p = _allEnemies[j];
        if (!p.boss && !p.elite) {
          if (c.hp < p.hp) c.hp = p.hp;
          if (c.bounty < p.bounty) c.bounty = p.bounty;
          /* v2.7.6: no atkDmg clamp — chapter-entry enemies intentionally dip (easing) */
          break;
        }
      }
    }
  }

  return _allEnemies;
}

export const ALL_ENEMIES = new Proxy([], {
  get(target, prop, receiver) {
    const list = buildAllEnemies();
    const val = Reflect.get(list, prop, receiver);
    if (typeof val === 'function') {
      return val.bind(list);
    }
    return val;
  },
  set(target, prop, value, receiver) {
    return Reflect.set(buildAllEnemies(), prop, value, receiver);
  },
  has(target, prop) {
    return Reflect.has(buildAllEnemies(), prop);
  },
  ownKeys(target) {
    return Reflect.ownKeys(buildAllEnemies());
  },
  getOwnPropertyDescriptor(target, prop) {
    return Object.getOwnPropertyDescriptor(buildAllEnemies(), prop);
  }
});

export const ENEMIES = ALL_ENEMIES;
