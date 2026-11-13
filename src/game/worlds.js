// These Hands — WORLDS (post-game realms beyond the Dragon Lord)
// Two original realms, 6 enemies each: slot 3 (index 2) is the mini-boss,
// slot 6 (index 5) is the world final boss. Virtual idx 200-205 / 210-215
// keep world enemies clear of the main roster (0-49) and the reserved
// 50-99 expansion. Stats follow Economy Bible v2.2 Section 8.1 (revised):
// strictly monotonic scaling above the Dragon Lord (780M HP / 301.16M
// bounty) — W0 S0 starts at 1.12B HP / 320.32M bounty and W1 S5 ends at
// 48B HP / 18.53B bounty. Guardian names/sprites stay with the shipped art
// (Ravana, Dark Slapper et al.); the table's stats/embers apply by slot.
import { getV2Sprite } from './enemySpritesV2.js';

export const WORLD_IDX_BASE = [200, 210];

// Bounty is stored explicitly per stage (Bible S8.1): 0.286 x HP on S0-S4, 0.286 x 1.35 on the S5 final boss.
export const WORLD_RATES = [0.286, 0.286];

export const WORLDS = [
  {
    key: 'asura',
    name: 'Asura Realm',
    tag: 'REALM OF THE DEMON KINGS',
    sub: 'Lanka burns gold under a blood-orange sky. The demon court that even dragons bow to awaits.',
    bg: '/world-art/asura-bg.webp',
    accent: '#e8862e',
    lockText: 'DEFEAT THE DRAGON LORD TO OPEN THE PORTAL',
    enemies: [
      { name: 'Asura Footman',     slug: 'w1-01-asura-footman',     hp: 1120000000,  atkDmg: 4950, atkInterval: 1.38, bounty: 320320000, embersFirst: 3, embersRepeat: 1, scale: 1.0 },
      { name: 'Rakshasa Huntress', slug: 'w1-02-rakshasa-huntress', hp: 1550000000, atkDmg: 5350, atkInterval: 1.36, bounty: 443300000, embersFirst: 4, embersRepeat: 1, scale: 1.0 },
      { name: 'Kumbhakaran',       slug: 'w1-03-kumbhakaran',       hp: 2150000000, atkDmg: 5850, atkInterval: 1.35, bounty: 614900000, embersFirst: 5, embersRepeat: 2, scale: 1.3,  role: 'MINI BOSS', title: 'The Sleeping Giant' },
      { name: 'Mahishasura',       slug: 'w1-04-mahishasura',       hp: 3000000000, atkDmg: 6350, atkInterval: 1.34, bounty: 858000000, embersFirst: 5, embersRepeat: 2, scale: 1.3 },
      { name: 'Vetala Warlock',    slug: 'w1-05-vetala-warlock',    hp: 4200000000, atkDmg: 7000, atkInterval: 1.32, bounty: 1201200000, embersFirst: 6, embersRepeat: 2, scale: 1.1 },
      { name: 'Ravana',            slug: 'w1-06-ravana',            hp: 5600000000, atkDmg: 7900, atkInterval: 1.30, bounty: 2162160000, embersFirst: 10, embersRepeat: 3, scale: 1.45, role: 'WORLD BOSS', title: 'The Ten-Headed King' },
    ],
  },
  {
    key: 'shadow',
    name: 'Shadow Verse',
    tag: 'WHERE YOUR OWN SHADOW FIGHTS BACK',
    sub: 'An eclipsed mirror-world of everything you have slapped. The last shadow wears your hands.',
    bg: '/world-art/shadow-bg.webp',
    accent: '#9a6ae0',
    lockText: 'DEFEAT RAVANA TO CROSS INTO THE SHADOW VERSE',
    enemies: [
      { name: 'Shade of the Dummy',  slug: 'w2-01-shade-dummy',      hp: 7800000000,  atkDmg: 8400, atkInterval: 1.30, bounty: 2230800000, embersFirst: 6, embersRepeat: 2, scale: 1.0 },
      { name: 'Umbral Mime',         slug: 'w2-02-umbral-mime',      hp: 11000000000, atkDmg: 9150, atkInterval: 1.28, bounty: 3146000000, embersFirst: 7, embersRepeat: 3, scale: 1.0 },
      { name: 'Umbral Puppeteer', slug: 'w2-03-umbral-puppeteer', hp: 15500000000, atkDmg: 10100, atkInterval: 1.26, bounty: 4433000000, embersFirst: 8, embersRepeat: 3, scale: 1.25, role: 'MINI BOSS', title: 'Master of Strings' },
      { name: 'Gloom Serpent',       slug: 'w2-04-gloom-serpent',    hp: 22000000000, atkDmg: 11050, atkInterval: 1.25, bounty: 6292000000, embersFirst: 9, embersRepeat: 4, scale: 1.2 },
      { name: 'The Hollow Monk',     slug: 'w2-05-hollow-monk',      hp: 31500000000, atkDmg: 12300, atkInterval: 1.24, bounty: 9009000000, embersFirst: 10, embersRepeat: 5, scale: 1.1 },
      { name: 'The Dark Slapper',    slug: 'w2-06-dark-slapper',     hp: 48000000000, atkDmg: 14200, atkInterval: 1.22, bounty: 18532800000, embersFirst: 15, embersRepeat: 6, scale: 1.5,  role: 'WORLD BOSS', title: 'Your Shadow, Perfected' },
    ],
  },
];

// Build a roster-shaped enemy definition for a world slot, so spawnEnemy /
// killEnemy / boss-special systems treat it exactly like a roster enemy.
export function worldEnemyDef(w, s) {
  const W = WORLDS[w];
  const e = W.enemies[s];
  const idx = WORLD_IDX_BASE[w] + s;
  const boss = s === 5;
  const mini = s === 2;
  const def = {
    idx,
    name: e.name,
    group: 9,
    elite: mini || boss,
    boss: mini || boss, // mini-bosses also get boss intro + special treatment
    miniBoss: mini,
    worldBoss: boss,
    hp: e.hp,
    coinRate: e.hp ? (e.bounty || 0) / e.hp : 0.286,
    bounty: e.bounty,
    embersFirst: e.embersFirst,
    embersRepeat: e.embersRepeat,
    atkInterval: e.atkInterval,
    atkDmg: e.atkDmg,
    bossAnim: null,
    scale: e.scale,
    world: w,
    wslot: s,
  };
  let sprCache = null;
  Object.defineProperty(def, 'spr', {
    enumerable: true,
    get() {
      if (!sprCache) sprCache = getV2Sprite(idx);
      return sprCache;
    },
  });
  return def;
}
