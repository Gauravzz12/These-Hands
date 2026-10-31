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
    const elite = pos === 4;
    const boss = i % 10 === 9;
    const miniBoss = elite && !boss;

    const hp = calcEnemyHp(i, boss, elite);
    const { coinRate, bounty } = calcEnemyBounty(hp, i);
    const interval = calcEnemyInterval(i, boss, miniBoss);
    const atkDmg = calcEnemyDamage(i, boss, elite);

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

  for (let i = 1; i < _allEnemies.length; i++) {
    const p = _allEnemies[i - 1], c = _allEnemies[i];
    if (c.hp <= p.hp) c.hp = Math.round(p.hp * 1.15);
    if (c.bounty <= p.bounty) c.bounty = Math.round(p.bounty * 1.12);
    if (c.atkDmg < p.atkDmg) c.atkDmg = p.atkDmg;
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
