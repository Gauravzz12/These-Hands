// These Hands — WORLDS (post-game realms beyond the Dragon Lord)
// Two original realms, 6 enemies each: slot 3 (index 2) is the mini-boss,
// slot 6 (index 5) is the world final boss. Virtual idx 200-205 / 210-215
// keep world enemies clear of the main roster (0-49) and the reserved
// 50-99 expansion. Stats follow Balance v2.6.5 Audited Final Section 12
// (numbers by slot): strictly monotonic scaling above the Dragon Lord
// (343M HP / 57M bounty) — W0 S0 starts at 357.5M HP / 62M bounty and
// W1 S5 ends at 26.5B HP / 455M bounty. Guardian names/sprites stay with
// the shipped art (Ravana, Dark Slapper et al.); stats/embers by slot.
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
      { name: 'Asura Footman',     slug: 'w1-01-asura-footman',     hp: 6500000000,  atkDmg: 19500,  atkInterval: 1.38, bounty: 60000000,  evasion: 0.15, embersFirst: 3, embersRepeat: 1, scale: 1.0 },
      { name: 'Rakshasa Huntress', slug: 'w1-02-rakshasa-huntress', hp: 10500000000,  atkDmg: 22500,  atkInterval: 1.36, bounty: 80000000,  evasion: 0.15, embersFirst: 4, embersRepeat: 1, scale: 1.0 },
      { name: 'Kumbhakaran',       slug: 'w1-03-kumbhakaran',       hp: 17500000000,  atkDmg: 25500,  atkInterval: 1.35, bounty: 105000000, evasion: 0.15, embersFirst: 5, embersRepeat: 2, scale: 1.3,  role: 'MINI BOSS', title: 'The Sleeping Giant' },
      { name: 'Mahishasura',       slug: 'w1-04-mahishasura',       hp: 26000000000,  atkDmg: 29000,  atkInterval: 1.34, bounty: 135000000, evasion: 0.16, embersFirst: 5, embersRepeat: 2, scale: 1.3 },
      { name: 'Vetala Warlock',    slug: 'w1-05-vetala-warlock',    hp: 38000000000, atkDmg: 32500, atkInterval: 1.32, bounty: 170000000, evasion: 0.16, embersFirst: 6, embersRepeat: 2, scale: 1.1 },
      { name: 'Ravana',            slug: 'w1-06-ravana',            hp: 55000000000, atkDmg: 36000, atkInterval: 1.30, bounty: 215000000, evasion: 0.16, embersFirst: 10, embersRepeat: 3, scale: 1.45, role: 'WORLD BOSS', title: 'The Ten-Headed King' },
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
      { name: 'Shade of the Dummy',  slug: 'w2-01-shade-dummy',      hp: 65000000000,  atkDmg: 40500, atkInterval: 1.30, bounty: 300000000,  evasion: 0.16, embersFirst: 6,  embersRepeat: 2, scale: 1.0 },
      { name: 'Umbral Mime',         slug: 'w2-02-umbral-mime',      hp: 100000000000,  atkDmg: 45500, atkInterval: 1.28, bounty: 420000000,  evasion: 0.16, embersFirst: 7,  embersRepeat: 3, scale: 1.0 },
      { name: 'Umbral Puppeteer',    slug: 'w2-03-umbral-puppeteer', hp: 155000000000,  atkDmg: 51000, atkInterval: 1.26, bounty: 575000000,  evasion: 0.17, embersFirst: 8,  embersRepeat: 3, scale: 1.25, role: 'MINI BOSS', title: 'Master of Strings' },
      { name: 'Gloom Serpent',       slug: 'w2-04-gloom-serpent',    hp: 225000000000, atkDmg: 56500, atkInterval: 1.25, bounty: 780000000,  evasion: 0.17, embersFirst: 9,  embersRepeat: 4, scale: 1.2 },
      { name: 'The Hollow Monk',     slug: 'w2-05-hollow-monk',      hp: 310000000000, atkDmg: 62000, atkInterval: 1.24, bounty: 1050000000, evasion: 0.18, embersFirst: 10, embersRepeat: 5, scale: 1.1 },
      { name: 'The Dark Slapper',    slug: 'w2-06-dark-slapper',     hp: 420000000000, atkDmg: 68000, atkInterval: 1.22, bounty: 1380000000, evasion: 0.18, embersFirst: 15, embersRepeat: 6, scale: 1.5,  role: 'WORLD BOSS', title: 'Your Shadow, Perfected' },
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
    evasion: e.evasion || 0,
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
