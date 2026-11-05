// These Hands — WORLDS (post-game realms beyond the Dragon Lord)
// Two original realms, 6 enemies each: slot 3 (index 2) is the mini-boss,
// slot 6 (index 5) is the world final boss. Virtual idx 200-205 / 210-215
// keep world enemies clear of the main roster (0-49) and the reserved
// 50-99 expansion. Stats are anchored to the Dragon Lord (idx 49:
// 2.14B HP, 21,880 dmg, 370M bounty) and a maxed endgame build
// (~5.6M theoretical DPS) — see pw-tools/r34-scaling-note.md.
import { getV2Sprite } from './enemySpritesV2.js';

export const WORLD_IDX_BASE = [200, 210];

const RATE = 0.1727; // Dragon Lord's coin rate (bounty = HP x rate)

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
      { name: 'Asura Footman',     slug: 'w1-01-asura-footman',     hp: 900000000,  atkDmg: 15000, atkInterval: 2.2, scale: 1.0 },
      { name: 'Rakshasa Huntress', slug: 'w1-02-rakshasa-huntress', hp: 1300000000, atkDmg: 17000, atkInterval: 2.0, scale: 1.0 },
      { name: 'Mahishasura',       slug: 'w1-03-mahishasura',       hp: 2600000000, atkDmg: 24000, atkInterval: 2.1, scale: 1.3,  role: 'MINI BOSS', title: 'The Buffalo Demon King' },
      { name: 'Pishacha Ghoul',    slug: 'w1-04-pishacha-ghoul',    hp: 1900000000, atkDmg: 20000, atkInterval: 1.9, scale: 1.05 },
      { name: 'Vetala Warlock',    slug: 'w1-05-vetala-warlock',    hp: 2400000000, atkDmg: 22000, atkInterval: 2.0, scale: 1.1 },
      { name: 'Ravana',            slug: 'w1-06-ravana',            hp: 4300000000, atkDmg: 34000, atkInterval: 1.9, scale: 1.45, role: 'WORLD BOSS', title: 'The Ten-Headed King' },
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
      { name: 'Shade of the Dummy',  slug: 'w2-01-shade-dummy',      hp: 3500000000,  atkDmg: 26000, atkInterval: 2.0, scale: 1.0 },
      { name: 'Umbral Mime',         slug: 'w2-02-umbral-mime',      hp: 4500000000,  atkDmg: 28000, atkInterval: 1.9, scale: 1.0 },
      { name: 'The Forgotten Knight', slug: 'w2-03-forgotten-knight', hp: 7500000000,  atkDmg: 36000, atkInterval: 2.0, scale: 1.25, role: 'MINI BOSS', title: 'Blade of the Eclipse' },
      { name: 'Gloom Serpent',       slug: 'w2-04-gloom-serpent',    hp: 6000000000,  atkDmg: 32000, atkInterval: 1.8, scale: 1.2 },
      { name: 'The Hollow Monk',     slug: 'w2-05-hollow-monk',      hp: 7000000000,  atkDmg: 33000, atkInterval: 1.9, scale: 1.1 },
      { name: 'The Dark Slapper',    slug: 'w2-06-dark-slapper',     hp: 12000000000, atkDmg: 48000, atkInterval: 1.8, scale: 1.5,  role: 'WORLD BOSS', title: 'Your Shadow, Perfected' },
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
    coinRate: RATE,
    bounty: Math.round(e.hp * RATE),
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
