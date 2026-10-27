// src/game/proceduralEnemies.js
// Procedural Mathematical 100x100 Pixel Sprite Generator for "These Hands"

export class MathPixelCanvas {
  constructor(width = 100, height = 100) {
    this.w = width;
    this.h = height;
    this.grid = Array.from({ length: height }, () => Array(width).fill('.'));
    this.zBuffer = Array.from({ length: height }, () => Array(width).fill(-Infinity));
  }

  set(x, y, ch, z = 0) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    if (z >= this.zBuffer[y][x]) {
      this.grid[y][x] = ch;
      this.zBuffer[y][x] = z;
    }
  }

  get(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return '.';
    return this.grid[y][x];
  }

  circle(cx, cy, r, ch, { z = 0, condition = null } = {}) {
    this.ellipse(cx, cy, r, r, ch, { z, condition });
  }

  ellipse(cx, cy, rx, ry, ch, { angle = 0, z = 0, condition = null } = {}) {
    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);
    const maxR = Math.max(rx, ry);
    const minX = Math.max(0, Math.floor(cx - maxR - 2));
    const maxX = Math.min(this.w - 1, Math.ceil(cx + maxR + 2));
    const minY = Math.max(0, Math.floor(cy - maxR - 2));
    const maxY = Math.min(this.h - 1, Math.ceil(cy + maxR + 2));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const u = dx * cos - dy * sin;
        const v = dx * sin + dy * cos;
        const distSq = (u * u) / (rx * rx) + (v * v) / (ry * ry);
        if (distSq <= 1.0) {
          if (!condition || condition(x, y, u, v, distSq)) {
            this.set(x, y, ch, z);
          }
        }
      }
    }
  }

  rect(x0, y0, w, h, ch, { z = 0, condition = null } = {}) {
    const minX = Math.max(0, Math.floor(x0));
    const maxX = Math.min(this.w - 1, Math.ceil(x0 + w));
    const minY = Math.max(0, Math.floor(y0));
    const maxY = Math.min(this.h - 1, Math.ceil(y0 + h));
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (!condition || condition(x, y)) {
          this.set(x, y, ch, z);
        }
      }
    }
  }

  capsule(x1, y1, x2, y2, r, ch, { z = 0, condition = null } = {}) {
    const minX = Math.max(0, Math.floor(Math.min(x1, x2) - r - 1));
    const maxX = Math.min(this.w - 1, Math.ceil(Math.max(x1, x2) + r + 1));
    const minY = Math.max(0, Math.floor(Math.min(y1, y2) - r - 1));
    const maxY = Math.min(this.h - 1, Math.ceil(Math.max(y1, y2) + r + 1));

    const abx = x2 - x1;
    const aby = y2 - y1;
    const lenSq = abx * abx + aby * aby;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        let t = 0;
        if (lenSq > 0) {
          t = Math.max(0, Math.min(1, ((x - x1) * abx + (y - y1) * aby) / lenSq));
        }
        const qx = x1 + t * abx;
        const qy = y1 + t * aby;
        const distSq = (x - qx) * (x - qx) + (y - qy) * (y - qy);
        if (distSq <= r * r) {
          if (!condition || condition(x, y, t, Math.sqrt(distSq))) {
            this.set(x, y, ch, z);
          }
        }
      }
    }
  }

  polygon(pts, ch, { z = 0, condition = null } = {}) {
    let minX = this.w, maxX = 0, minY = this.h, maxY = 0;
    for (const [px, py] of pts) {
      if (px < minX) minX = Math.floor(px);
      if (px > maxX) maxX = Math.ceil(px);
      if (py < minY) minY = Math.floor(py);
      if (py > maxY) maxY = Math.ceil(py);
    }
    minX = Math.max(0, minX);
    maxX = Math.min(this.w - 1, maxX);
    minY = Math.max(0, minY);
    maxY = Math.min(this.h - 1, maxY);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        let inside = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
          const xi = pts[i][0], yi = pts[i][1];
          const xj = pts[j][0], yj = pts[j][1];
          const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
        if (inside) {
          if (!condition || condition(x, y)) {
            this.set(x, y, ch, z);
          }
        }
      }
    }
  }

  bezier(p0, p1, p2, r, ch, { steps = 50, z = 0 } = {}) {
    let prev = p0;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const inv = 1 - t;
      const cur = [
        inv * inv * p0[0] + 2 * inv * t * p1[0] + t * t * p2[0],
        inv * inv * p0[1] + 2 * inv * t * p1[1] + t * t * p2[1]
      ];
      this.capsule(prev[0], prev[1], cur[0], cur[1], r, ch, { z });
      prev = cur;
    }
  }

  applySphericalShading(cx, cy, rx, ry, baseCh, highCh, shadowCh, { z = 0, lightAngle = -Math.PI * 0.75, deepShadowCh = null, highThreshold = 0.45, shadowThreshold = -0.15 } = {}) {
    const lx = Math.cos(lightAngle);
    const ly = Math.sin(lightAngle);
    const lz = 0.75;
    const lLen = Math.hypot(lx, ly, lz);
    const L = [lx / lLen, ly / lLen, lz / lLen];

    const bayer4 = [
      [ 0,  8,  2, 10],
      [12,  4, 14,  6],
      [ 3, 11,  1,  9],
      [15,  7, 13,  5]
    ];

    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.grid[y][x] !== baseCh) continue;
        const u = (x - cx) / rx;
        const v = (y - cy) / ry;
        const dSq = u * u + v * v;
        if (dSq > 1.0) continue;

        const nz = Math.sqrt(Math.max(0, 1.0 - dSq));
        const dot = u * L[0] + v * L[1] + nz * L[2];
        const dither = (bayer4[y % 4][x % 4] / 16 - 0.5) * 0.22;
        const val = dot + dither;

        if (highCh && val > highThreshold) {
          this.set(x, y, highCh, z + 0.1);
        } else if (deepShadowCh && val < -0.45) {
          this.set(x, y, deepShadowCh, z + 0.1);
        } else if (shadowCh && val < shadowThreshold) {
          this.set(x, y, shadowCh, z + 0.1);
        }
      }
    }
  }

  addOutline(outlineCh) {
    const copy = this.grid.map(row => [...row]);
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]];
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (copy[y][x] === '.') {
          for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < this.w && ny >= 0 && ny < this.h) {
              if (copy[ny][nx] !== '.') {
                this.grid[y][x] = outlineCh;
                break;
              }
            }
          }
        }
      }
    }
  }

  toMap() {
    return this.grid.map(row => row.join(''));
  }
}

// ============================================================================
// 1. SASSY GOBLIN SPROUT (Idx 5 / Enemy #6) — 100x100
// ============================================================================

export function generateGoblinSproutOption1(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#113018", // Dark outline
    g: "#48c75e", // Goblin skin
    h: "#8aee98", // Highlight
    s: "#2d853e", // Shadow
    p: "#fca5a5", // Peach/pink inner ear & blush
    l: "#bbf452", // Sprout lime green
    L: "#dcfce7", // Sprout leaf shine
    d: "#3f8022", // Stem dark
    f: "#fb7185", // Flower bud pink
    y: "#fef08a", // Flower center yellow
    w: "#d97706", // Amber loincloth
    t: "#92400e", // Loincloth shadow
    v: "#15803d"  // Vine details
  };

  const isAtk = mode === 'attack';

  // Body: chubby pear
  c.ellipse(50, 68, 22, 20, 'g', { z: 1 });
  c.applySphericalShading(50, 68, 22, 20, 'g', 'h', 's', { z: 1 });
  // Belly highlight
  c.ellipse(50, 70, 14, 12, 'h', { z: 1.5 });

  // Loincloth waistband & apron
  c.capsule(34, 72, 66, 72, 4, 'w', { z: 2 });
  c.polygon([[44, 72], [56, 72], [52, 85], [48, 85]], 'w', { z: 2.2 });
  c.capsule(46, 81, 52, 81, 2, 't', { z: 2.4 });

  // Feet/Legs
  c.ellipse(38, 88, 8, 6, 's', { z: 1.5 });
  c.ellipse(62, 88, 8, 6, 's', { z: 1.5 });
  c.ellipse(36, 88, 6, 4, 'g', { z: 1.8 });
  c.ellipse(64, 88, 6, 4, 'g', { z: 1.8 });

  if (!isAtk) {
    // IDLE: Sassy hands on hips
    c.capsule(32, 56, 20, 64, 5, 'g', { z: 2.5 });
    c.capsule(20, 64, 32, 70, 5, 'g', { z: 2.5 });
    c.capsule(68, 56, 80, 64, 5, 'g', { z: 2.5 });
    c.capsule(80, 64, 68, 70, 5, 'g', { z: 2.5 });
    // Vine cuffs
    c.circle(32, 70, 4, 'w', { z: 3 });
    c.circle(68, 70, 4, 'w', { z: 3 });
  } else {
    // ATTACK: Crack a thorny vine whip forward!
    // Left arm planted on hip
    c.capsule(32, 56, 20, 64, 5, 'g', { z: 2.5 });
    c.capsule(20, 64, 32, 70, 5, 'g', { z: 2.5 });
    // Right arm whipped forward
    c.capsule(66, 56, 82, 52, 5, 'g', { z: 3 });
    c.circle(84, 51, 5, 'g', { z: 3.2 });
    // Whipping vine trailing outward with thorn nodes
    c.bezier([84, 51], [92, 40], [78, 25], 3, 'v', { z: 5 });
    c.bezier([78, 25], [60, 15], [88, 12], 2.5, 'v', { z: 5 });
    // Thorns on vine
    c.polygon([[85, 45], [92, 43], [87, 48]], 'l', { z: 5.5 });
    c.polygon([[75, 22], [70, 16], [78, 20]], 'l', { z: 5.5 });
    // Pollen spark bursts
    c.circle(88, 12, 3.5, 'y', { z: 6 });
    c.circle(94, 16, 2, 'f', { z: 6 });
    c.circle(82, 8, 2, 'y', { z: 6 });
  }

  // Head: large rounded expressive goblin head
  c.ellipse(50, 44, 24, 20, 'g', { z: 4 });
  c.applySphericalShading(50, 44, 24, 20, 'g', 'h', 's', { z: 4 });

  // Big horizontal goblin ears with inner pink/peach
  // Left ear
  c.polygon([[30, 46], [8, 38], [28, 34]], 'g', { z: 3.5 });
  c.polygon([[28, 44], [14, 38], [28, 36]], 'p', { z: 3.7 });
  // Right ear
  c.polygon([[70, 46], [92, 38], [72, 34]], 'g', { z: 3.5 });
  c.polygon([[72, 44], [86, 38], [72, 36]], 'p', { z: 3.7 });

  // Sprout on head!
  c.bezier([50, 24], [54, 16], [48, 8], 3.5, 'd', { z: 5 });
  // Left leaf with vein
  c.ellipse(40, 10, 10, 5, 'l', { angle: -0.4, z: 5.5 });
  c.capsule(42, 10, 34, 10, 1.5, 'd', { z: 5.7 });
  // Right leaf
  c.ellipse(56, 8, 12, 5.5, 'l', { angle: 0.3, z: 5.5 });
  c.capsule(54, 8, 64, 8, 1.5, 'd', { z: 5.7 });
  // Blooming flower atop sprout
  c.circle(48, 6, 5, 'f', { z: 6 });
  c.circle(48, 6, 2.5, 'y', { z: 6.5 });

  // Cheeks & nose
  c.ellipse(34, 48, 4.5, 3, 'p', { z: 4.8 });
  c.ellipse(66, 48, 4.5, 3, 'p', { z: 4.8 });
  c.circle(50, 42, 3, 's', { z: 4.8 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [39.0, 40.0],
    eyeR: [61.0, 40.0],
    eyeR_: 0.40,
    mouth: [50.0, 51.0],
    cheek: [34.0, 47.0],
    eyeColor: "#113018"
  };
}

export function generateGoblinSproutOption2(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#102618", // Deep outline
    g: "#38b26e", // Jade goblin skin
    h: "#7aefab", // Lime highlight
    s: "#1b6e42", // Forest shadow
    e: "#fed7aa", // Peach inner ear
    l: "#10b981", // Emerald leaf
    L: "#6ee7b7", // Leaf highlight
    v: "#78350f", // Vine brown
    r: "#f43f5e", // Rose blossom
    y: "#fde047", // Gold berry
    b: "#047857"  // Dark leaf cape
  };

  const isAtk = mode === 'attack';

  // Leafy cape behind
  c.polygon([[40, 56], [60, 56], [74, 88], [50, 92], [26, 88]], 'b', { z: 0.5 });
  c.capsule(50, 56, 50, 90, 2, 'l', { z: 0.6 });

  // Body
  c.ellipse(50, 68, 18, 18, 'g', { z: 1 });
  c.applySphericalShading(50, 68, 18, 18, 'g', 'h', 's', { z: 1 });

  // Legs with leafy anklets
  c.capsule(42, 76, 38, 88, 5, 'g', { z: 1.5 });
  c.capsule(58, 76, 62, 88, 5, 'g', { z: 1.5 });
  c.circle(38, 86, 4, 'l', { z: 2 });
  c.circle(62, 86, 4, 'l', { z: 2 });

  if (!isAtk) {
    // IDLE: Sassy cocked stance
    c.capsule(34, 56, 22, 62, 4.5, 'g', { z: 2.5 });
    c.capsule(22, 62, 34, 68, 4.5, 'g', { z: 2.5 }); // Left on hip
    c.capsule(66, 56, 82, 50, 4.5, 'g', { z: 2.5 }); // Right arm raised sassy wave
    c.circle(84, 48, 4.5, 'g', { z: 3 });
  } else {
    // ATTACK: Bramble rapier thrust forward!
    c.capsule(34, 56, 22, 62, 4.5, 'g', { z: 2.5 });
    c.capsule(66, 56, 86, 54, 4.5, 'g', { z: 3 });
    // Wooden thorn rapier extending forward
    c.capsule(86, 54, 98, 46, 2.5, 'v', { z: 4 });
    c.polygon([[96, 47], [99, 44], [97, 49]], 'l', { z: 4.5 }); // Needle tip
    // Petal whirlwind swirls
    c.circle(92, 42, 3, 'r', { z: 5 });
    c.circle(84, 38, 2.5, 'y', { z: 5 });
    c.circle(95, 52, 2.5, 'L', { z: 5 });
  }

  // Vine scarf around collar
  c.capsule(32, 54, 68, 54, 5, 'l', { z: 3.5 });
  c.ellipse(42, 60, 8, 4, 'L', { angle: 0.3, z: 3.8 });
  c.ellipse(56, 62, 6, 4, 'l', { angle: -0.2, z: 3.8 });
  c.circle(50, 56, 3, 'r', { z: 4 });

  // Head: tilted sassily
  c.ellipse(50, 38, 22, 19, 'g', { angle: 0.08, z: 4 });
  c.applySphericalShading(50, 38, 22, 19, 'g', 'h', 's', { z: 4, lightAngle: -Math.PI * 0.7 });

  // Asymmetric ears: one drooping, one perked up sharply
  c.polygon([[30, 40], [10, 46], [28, 32]], 'g', { z: 3.5 });
  c.polygon([[28, 40], [16, 44], [28, 34]], 'e', { z: 3.7 });
  c.polygon([[70, 38], [92, 24], [68, 28]], 'g', { z: 3.5 });
  c.polygon([[70, 36], [86, 28], [70, 30]], 'e', { z: 3.7 });

  // Sprout Crown: 3 fanned leaves
  c.bezier([50, 20], [48, 12], [46, 4], 3.2, 'v', { z: 5 });
  c.ellipse(38, 6, 10, 5, 'l', { angle: -0.6, z: 5.5 });
  c.ellipse(50, 2, 10, 5, 'L', { angle: 0, z: 5.6 });
  c.ellipse(62, 6, 10, 5, 'l', { angle: 0.6, z: 5.5 });
  c.circle(46, 4, 4, 'r', { z: 6 });
  c.circle(46, 4, 2, 'y', { z: 6.5 });

  // Blush
  c.circle(36, 42, 3.5, 'e', { z: 4.8 });
  c.circle(64, 44, 3.5, 'e', { z: 4.8 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [40.0, 35.0],
    eyeR: [60.0, 36.0],
    eyeR_: 0.38,
    mouth: [50.0, 46.0],
    cheek: [35.0, 42.0],
    eyeColor: "#102618"
  };
}

// ============================================================================
// 2. MIME (Idx 6 / Enemy #7) — 100x100
// ============================================================================

export function generateMimeOption1(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#09090b", // Outline
    w: "#f8fafc", // White face & shirt
    s: "#cbd5e1", // White shading
    b: "#18181b", // Black stripes & beret
    c: "#3f3f46", // Charcoal highlight
    r: "#ef4444", // Ruby red scarf
    d: "#991b1b", // Scarf shadow
    p: "#27272a", // Trousers
    l: "#52525b", // Suspenders
    g: "#67e8f9", // Invisible glass glow
    G: "#cffafe"  // Glass reflection
  };

  const isAtk = mode === 'attack';

  // Trousers
  c.rect(38, 72, 24, 18, 'p', { z: 1 });
  c.capsule(42, 88, 40, 92, 5, 'b', { z: 1.5 });
  c.capsule(58, 88, 60, 92, 5, 'b', { z: 1.5 });

  // Torso with horizontal Breton stripes
  c.ellipse(50, 60, 18, 16, 'w', { z: 1 });
  c.applySphericalShading(50, 60, 18, 16, 'w', null, 's', { z: 1 });
  // Fine mathematical stripes
  for (let y = 48; y <= 70; y++) {
    if (Math.floor(y / 3) % 2 === 0) {
      for (let x = 32; x <= 68; x++) {
        if (c.get(x, y) === 'w' || c.get(x, y) === 's') {
          c.set(x, y, 'b', 1.5);
        }
      }
    }
  }

  // Suspenders with buckles
  c.capsule(40, 50, 40, 72, 2, 'l', { z: 2.2 });
  c.capsule(60, 50, 60, 72, 2, 'l', { z: 2.2 });
  c.rect(39, 62, 3, 2, 's', { z: 2.4 });
  c.rect(59, 62, 3, 2, 's', { z: 2.4 });

  // Ruby neckerchief
  c.capsule(38, 46, 62, 46, 4, 'r', { z: 3 });
  c.polygon([[48, 48], [52, 48], [54, 56], [46, 56]], 'r', { z: 3.2 });
  c.circle(50, 48, 3, 'd', { z: 3.5 });

  if (!isAtk) {
    // IDLE: Hands flat on invisible glass box
    c.capsule(36, 50, 22, 56, 4.5, 'w', { z: 2 });
    c.capsule(22, 56, 18, 44, 4.5, 'w', { z: 2 });
    c.rect(14, 36, 6, 14, 'w', { z: 3 }); // Left glove flat
    c.rect(16, 38, 4, 10, 's', { z: 3.1 });

    c.capsule(64, 50, 78, 56, 4.5, 'w', { z: 2 });
    c.capsule(78, 56, 82, 44, 4.5, 'w', { z: 2 });
    c.rect(80, 36, 6, 14, 'w', { z: 3 }); // Right glove flat
    c.rect(80, 38, 4, 10, 's', { z: 3.1 });

    // Subtle faint cyan glint of invisible glass
    c.capsule(15, 30, 15, 60, 1, 'g', { z: 3.8 });
    c.capsule(85, 30, 85, 60, 1, 'g', { z: 3.8 });
  } else {
    // ATTACK: Glass box violently shatters forward!
    c.capsule(36, 50, 26, 48, 4.5, 'w', { z: 2 });
    c.capsule(26, 48, 16, 46, 4.5, 'w', { z: 2 });
    c.circle(14, 46, 5, 'w', { z: 3 });

    c.capsule(64, 50, 74, 48, 4.5, 'w', { z: 2 });
    c.capsule(74, 48, 84, 46, 4.5, 'w', { z: 2 });
    c.circle(86, 46, 5, 'w', { z: 3 });

    // Shattering glass shards erupting outward
    c.polygon([[8, 20], [18, 28], [12, 34]], 'G', { z: 5 });
    c.polygon([[82, 18], [94, 26], [88, 32]], 'G', { z: 5 });
    c.polygon([[45, 12], [55, 10], [52, 18]], 'g', { z: 5 });
    c.polygon([[3, 48], [10, 52], [6, 58]], 'g', { z: 5 });
    c.polygon([[90, 48], [98, 52], [94, 58]], 'g', { z: 5 });
  }

  // Head: white oval
  c.ellipse(50, 32, 18, 20, 'w', { z: 4 });
  c.applySphericalShading(50, 32, 18, 20, 'w', null, 's', { z: 4 });

  // Makeup: diamond teardrop under eye
  c.polygon([[40, 32], [42, 36], [40, 40], [38, 36]], 'b', { z: 4.8 });
  c.polygon([[60, 32], [62, 36], [60, 40], [58, 36]], 'b', { z: 4.8 });

  // Beret: classic tilted French beret
  c.ellipse(52, 18, 26, 10, 'b', { angle: 0.22, z: 5 });
  c.ellipse(50, 16, 20, 7, 'c', { angle: 0.22, z: 5.2 });
  c.capsule(36, 22, 62, 26, 3.5, 'b', { z: 5.5 });
  c.capsule(54, 10, 56, 6, 2, 'b', { z: 5.8 }); // Beret center tab

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [40.0, 30.0],
    eyeR: [60.0, 30.0],
    eyeR_: 0.32,
    mouth: [50.0, 41.0],
    cheek: [35.0, 37.0],
    eyeColor: "#09090b"
  };
}

export function generateMimeOption2(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#0b0f19", // Midnight outline
    w: "#ffffff", // Pure white face & ruff
    s: "#c7d2fe", // Lilac-gray shadow
    b: "#1e1b4b", // Velvet midnight suit
    v: "#3730a3", // Velvet highlight
    r: "#e11d48", // Royal crimson
    d: "#881337", // Wine shadow
    g: "#f59e0b", // Gold brooch
    p: "#fecdd3"  // Mime cheek blush
  };

  const isAtk = mode === 'attack';

  // Body
  c.ellipse(50, 62, 17, 18, 'b', { z: 1 });
  c.applySphericalShading(50, 62, 17, 18, 'b', 'v', 'k', { z: 1 });

  // Center white shirt panel with gold studs
  c.rect(46, 48, 8, 22, 'w', { z: 1.5 });
  c.circle(50, 54, 1.5, 'g', { z: 1.8 });
  c.circle(50, 60, 1.5, 'g', { z: 1.8 });
  c.circle(50, 66, 1.5, 'g', { z: 1.8 });

  // Trousers
  c.capsule(42, 76, 38, 92, 5, 'b', { z: 1.2 });
  c.capsule(58, 76, 62, 92, 5, 'b', { z: 1.2 });
  c.ellipse(36, 92, 6, 4, 'k', { z: 1.5 });
  c.ellipse(64, 92, 6, 4, 'k', { z: 1.5 });

  // Pleated Accordion Ruff Collar
  c.ellipse(50, 46, 22, 8, 'w', { z: 2 });
  c.ellipse(50, 48, 18, 6, 's', { z: 2.1 });
  c.circle(50, 46, 3.5, 'g', { z: 2.5 }); // Gold jewel brooch

  if (!isAtk) {
    // IDLE: Dramatic bowing & shushing pose
    c.capsule(36, 50, 24, 66, 4, 'b', { z: 1.5 });
    c.circle(24, 68, 5, 'w', { z: 1.8 });
    c.capsule(62, 50, 76, 48, 4, 'b', { z: 2.5 });
    c.capsule(76, 48, 68, 36, 4, 'w', { z: 3 });
    c.circle(66, 32, 4.5, 'w', { z: 3.5 }); // Shushing finger
  } else {
    // ATTACK: Cane tap & soundless sonic ring!
    c.capsule(36, 50, 24, 54, 4, 'b', { z: 2 });
    c.capsule(24, 54, 18, 58, 4, 'w', { z: 2.5 });
    // Silver Cane held in hand
    c.capsule(18, 36, 18, 86, 2, 's', { z: 3 });
    c.circle(18, 36, 4, 'g', { z: 3.2 }); // Gold cane head
    // Sonic wave rings radiating outward
    c.ellipse(18, 86, 14, 5, 's', { z: 4 });
    c.ellipse(18, 86, 24, 9, 's', { z: 4 });
    c.ellipse(18, 86, 34, 13, 's', { z: 4 });
  }

  // Head: porcelain white
  c.ellipse(50, 28, 17, 19, 'w', { z: 4 });
  c.applySphericalShading(50, 28, 17, 19, 'w', null, 's', { z: 4 });

  // Delicate blush
  c.circle(38, 32, 3.5, 'p', { z: 4.5 });
  c.circle(62, 32, 3.5, 'p', { z: 4.5 });

  // Arched brows & teardrop
  c.capsule(36, 20, 44, 20, 1.5, 'k', { z: 4.8 });
  c.capsule(56, 20, 64, 20, 1.5, 'k', { z: 4.8 });
  c.polygon([[40, 28], [42, 32], [40, 36], [38, 32]], 'r', { z: 4.8 });

  // Beret with ruby pompom
  c.ellipse(50, 14, 24, 9, 'b', { angle: -0.15, z: 5 });
  c.ellipse(50, 12, 18, 6, 'v', { angle: -0.15, z: 5.2 });
  c.circle(56, 6, 5, 'r', { z: 5.8 });
  c.circle(56, 6, 2.5, 'd', { z: 6 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [40.0, 25.0],
    eyeR: [60.0, 25.0],
    eyeR_: 0.32,
    mouth: [50.0, 36.0],
    cheek: [36.0, 32.0],
    eyeColor: "#0b0f19"
  };
}

// ============================================================================
// 3. COCKY GOOSE (Idx 7 / Enemy #8) — 100x100
// ============================================================================

export function generateGooseOption1(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#0f172a", // Deep outline
    w: "#ffffff", // Pure white plumage
    s: "#cbd5e1", // Feather shading
    d: "#94a3b8", // Feather deep shadow
    o: "#f97316", // Bill orange
    y: "#facc15", // Bill highlight
    r: "#c2410c", // Bill shadow / feet
    b: "#020617"  // Smug eye
  };

  const isAtk = mode === 'attack';

  // Feet: wide planted power stance
  c.capsule(40, 84, 36, 94, 3.5, 'r', { z: 1 });
  c.polygon([[30, 94], [44, 94], [36, 88]], 'o', { z: 1.2 });
  c.capsule(60, 84, 64, 94, 3.5, 'r', { z: 1 });
  c.polygon([[56, 94], [70, 94], [64, 88]], 'o', { z: 1.2 });

  // Fluffy goose body: puffed out proudly
  c.ellipse(50, 64, 26, 22, 'w', { z: 2 });
  c.applySphericalShading(50, 64, 26, 22, 'w', null, 's', { z: 2, lightAngle: -Math.PI * 0.75 });

  // Tail feathers
  c.polygon([[30, 60], [16, 50], [28, 70]], 'w', { z: 1.8 });
  c.polygon([[26, 62], [18, 54], [28, 68]], 's', { z: 1.9 });

  // Folded wing with detailed feather scallops
  c.ellipse(54, 66, 18, 14, 'w', { angle: 0.1, z: 2.5 });
  c.capsule(40, 72, 64, 72, 2.4, 's', { z: 2.8 });
  c.capsule(44, 78, 60, 78, 2.4, 'd', { z: 2.8 });

  if (!isAtk) {
    // IDLE: S-neck held high & proud
    c.bezier([50, 50], [60, 40], [56, 28], 9, 'w', { z: 3 });
    c.applySphericalShading(56, 36, 10, 16, 'w', null, 's', { z: 3.3 });

    // Head
    c.ellipse(56, 24, 15, 13, 'w', { angle: -0.15, z: 4 });
    c.applySphericalShading(56, 24, 15, 13, 'w', null, 's', { z: 4 });

    // Smug orange bill pointing up at 15°
    c.polygon([[66, 20], [88, 18], [84, 28], [66, 28]], 'o', { z: 5 });
    c.capsule(68, 22, 84, 20, 2.4, 'y', { z: 5.2 });
    c.capsule(68, 26, 82, 26, 2, 'r', { z: 5.2 });
    c.circle(72, 22, 1.6, 'r', { z: 5.5 }); // Nostril
  } else {
    // ATTACK: Neck strikes forward like a cobra!
    c.bezier([50, 50], [65, 45], [78, 35], 9, 'w', { z: 3 });
    c.ellipse(78, 30, 15, 13, 'w', { z: 4 });

    // Open striking beak!
    c.polygon([[88, 24], [100, 20], [96, 28], [88, 28]], 'o', { z: 5 });
    c.polygon([[88, 30], [98, 34], [94, 38], [88, 34]], 'o', { z: 5 });
    c.polygon([[90, 28], [94, 30], [90, 32]], 'r', { z: 5.2 }); // Tongue
    // Flying down feathers
    c.ellipse(35, 45, 6, 3, 's', { angle: 0.5, z: 6 });
    c.ellipse(45, 30, 5, 2.5, 's', { angle: -0.8, z: 6 });
    c.ellipse(70, 15, 6, 3, 's', { angle: 0.3, z: 6 });
  }

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [isAtk ? 74.0 : 54.0, isAtk ? 28.0 : 22.0],
    eyeR: [isAtk ? 82.0 : 64.0, isAtk ? 28.0 : 22.0],
    eyeR_: 0.28,
    mouth: [isAtk ? 90.0 : 76.0, isAtk ? 32.0 : 27.0],
    cheek: [isAtk ? 72.0 : 52.0, isAtk ? 32.0 : 29.0],
    eyeColor: "#020617"
  };
}

export function generateGooseOption2(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#020617", // Jet black outline
    w: "#f8fafc", // White body
    s: "#bae6fd", // Sky-tinted feather shadow
    d: "#7dd3fc", // Deep blue wing shadow
    o: "#ea580c", // Tangerine bill
    y: "#fbbf24", // Golden crown/beak
    r: "#dc2626", // Red bowtie
    p: "#f472b6"  // Pink tongue
  };

  const isAtk = mode === 'attack';

  // Feet
  c.capsule(36, 84, 30, 94, 4, 'o', { z: 1 });
  c.polygon([[24, 94], [38, 94], [30, 88]], 'o', { z: 1.2 });
  c.capsule(64, 84, 70, 94, 4, 'o', { z: 1 });
  c.polygon([[62, 94], [76, 94], [68, 88]], 'o', { z: 1.2 });

  // Flared wings (ready for chaos)
  c.polygon([[36, 56], [14, 40], [28, 76]], 'w', { z: 1.5 });
  c.polygon([[32, 58], [18, 44], [28, 72]], 's', { z: 1.6 });
  c.polygon([[64, 56], [86, 40], [72, 76]], 'w', { z: 1.5 });
  c.polygon([[66, 58], [82, 44], [72, 72]], 'd', { z: 1.6 });

  // Body
  c.ellipse(50, 66, 22, 20, 'w', { z: 2 });
  c.applySphericalShading(50, 66, 22, 20, 'w', null, 's', { z: 2 });

  // Red Bowtie at throat!
  c.polygon([[50, 46], [42, 42], [42, 50]], 'r', { z: 3.5 });
  c.polygon([[50, 46], [58, 42], [58, 50]], 'r', { z: 3.5 });
  c.circle(50, 46, 2.5, 'y', { z: 3.8 });

  // Neck
  c.bezier([50, 46], [50, 34], [52, 24], 8, 'w', { z: 3 });
  c.applySphericalShading(52, 34, 8, 14, 'w', null, 's', { z: 3.1 });

  // Head
  c.ellipse(52, 22, 14, 12, 'w', { z: 4 });
  c.applySphericalShading(52, 22, 14, 12, 'w', null, 's', { z: 4 });

  // Open HONK beak!
  c.polygon([[62, 18], [84, 14], [76, 22], [62, 22]], 'o', { z: 5 });
  c.capsule(64, 18, 82, 16, 2, 'y', { z: 5.2 });
  c.polygon([[62, 24], [78, 26], [72, 30], [62, 28]], 'o', { z: 5 });
  c.capsule(66, 23, 74, 24, 2, 'k', { z: 5.3 });
  c.circle(70, 24, 2, 'p', { z: 5.5 });

  if (isAtk) {
    // Attack: Golden HONK shockwave text & rings!
    c.ellipse(88, 20, 10, 16, 'y', { z: 6 });
    c.ellipse(88, 20, 8, 14, 's', { z: 6.1 });
  }

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [50.0, 20.0],
    eyeR: [60.0, 20.0],
    eyeR_: 0.28,
    mouth: [70.0, 24.0],
    cheek: [48.0, 26.0],
    eyeColor: "#020617"
  };
}

// ============================================================================
// 4. TRASH PANDA (Idx 8 / Enemy #9) — 100x100
// ============================================================================

export function generateTrashPandaOption1(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#0f172a", // Outline
    f: "#475569", // Slate gray fur
    h: "#94a3b8", // Silver fur highlight
    d: "#1e293b", // Fur shadow
    m: "#09090b", // Bandit mask black
    w: "#f8fafc", // White muzzle & brows
    s: "#cbd5e1", // White shading
    l: "#60a5fa", // Aluminum lid blue-silver
    L: "#dbeafe", // Lid highlight
    t: "#2563eb", // Lid shadow
    y: "#facc15"  // Sparks
  };

  const isAtk = mode === 'attack';

  // Striped raccoon tail curling on left
  const tailPts = [[28, 76], [16, 68], [12, 52], [20, 40], [30, 42]];
  c.bezier(tailPts[0], tailPts[1], tailPts[2], 7, 'd', { z: 0.5 });
  c.bezier(tailPts[2], tailPts[3], tailPts[4], 7, 'd', { z: 0.5 });
  // Ring bands
  c.circle(16, 66, 6, 'h', { z: 0.7 });
  c.circle(12, 52, 6, 'h', { z: 0.7 });
  c.circle(26, 42, 5, 'h', { z: 0.7 });

  // Body
  c.ellipse(50, 66, 22, 20, 'f', { z: 1 });
  c.applySphericalShading(50, 66, 22, 20, 'f', 'h', 'd', { z: 1 });
  c.ellipse(50, 68, 14, 14, 'h', { z: 1.5 });

  // Feet
  c.ellipse(40, 88, 7, 5, 'd', { z: 1.8 });
  c.ellipse(60, 88, 7, 5, 'd', { z: 1.8 });

  if (!isAtk) {
    // IDLE: Holding trash can lid shield
    const lidX = 70, lidY = 64, lidR = 18;
    c.circle(lidX, lidY, lidR, 'l', { z: 3 });
    c.circle(lidX, lidY, lidR - 4, 't', { z: 3.1 });
    c.circle(lidX, lidY, lidR - 7, 'l', { z: 3.2 });
    c.circle(lidX, lidY, 5, 'L', { z: 3.3 }); // Handle
    c.capsule(lidX - 4, lidY, lidX + 4, lidY, 2, 'k', { z: 3.5 });

    c.circle(36, 64, 5, 'd', { z: 2.5 }); // Left paw
  } else {
    // ATTACK: Trash lid shield BASH with sparks!
    const lidX = 76, lidY = 56, lidR = 21;
    c.circle(lidX, lidY, lidR, 'l', { z: 4 });
    c.circle(lidX, lidY, lidR - 5, 't', { z: 4.1 });
    c.circle(lidX, lidY, 6, 'L', { z: 4.3 });
    // Sparks & impact shockwave
    c.polygon([[96, 50], [100, 56], [94, 54]], 'y', { z: 5 });
    c.polygon([[92, 42], [98, 38], [94, 46]], 'y', { z: 5 });
    c.polygon([[90, 70], [98, 74], [92, 66]], 'y', { z: 5 });
  }

  // Head
  c.ellipse(50, 38, 23, 18, 'f', { z: 4 });
  c.applySphericalShading(50, 38, 23, 18, 'f', 'h', 'd', { z: 4 });

  // White cheek ruffs
  c.polygon([[30, 40], [18, 46], [32, 50]], 'w', { z: 4.2 });
  c.polygon([[70, 40], [82, 46], [68, 50]], 'w', { z: 4.2 });

  // Ears
  c.polygon([[34, 26], [26, 12], [42, 22]], 'd', { z: 3.5 });
  c.polygon([[32, 24], [28, 16], [38, 22]], 'w', { z: 3.6 });
  c.polygon([[66, 26], [74, 12], [58, 22]], 'd', { z: 3.5 });
  c.polygon([[68, 24], [72, 16], [62, 22]], 'w', { z: 3.6 });

  // Bandit eye mask
  c.ellipse(40, 36, 9, 6.4, 'm', { angle: 0.15, z: 4.5 });
  c.ellipse(60, 36, 9, 6.4, 'm', { angle: -0.15, z: 4.5 });
  c.capsule(40, 36, 60, 36, 4.4, 'm', { z: 4.5 });

  // White eyebrow spots
  c.circle(38, 28, 2.8, 'w', { z: 4.8 });
  c.circle(62, 28, 2.8, 'w', { z: 4.8 });

  // Snout & nose
  c.ellipse(50, 44, 9, 6.4, 'w', { z: 5 });
  c.circle(50, 41, 2.6, 'k', { z: 5.5 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [40.0, 35.0],
    eyeR: [60.0, 35.0],
    eyeR_: 0.35,
    mouth: [50.0, 47.0],
    cheek: [32.0, 42.0],
    eyeColor: "#f8fafc"
  };
}

export function generateTrashPandaOption2(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#18181b", // Outline
    f: "#52525b", // Warm gray
    h: "#a1a1aa", // Highlight
    d: "#27272a", // Shadow
    m: "#09090b", // Bandit mask
    w: "#fafafa", // White muzzle
    s: "#d4d4d8", // Shading
    c: "#eab308", // Tin crown gold
    C: "#fef08a", // Crown shine
    a: "#84cc16", // Apple core green
    b: "#fed7aa"  // Fishbone tan
  };

  const isAtk = mode === 'attack';

  // Fluffy striped tail arched behind
  const tailPts = [[64, 76], [84, 64], [86, 40], [76, 28], [68, 32]];
  c.bezier(tailPts[0], tailPts[1], tailPts[2], 9, 'd', { z: 0.5 });
  c.bezier(tailPts[2], tailPts[3], tailPts[4], 9, 'd', { z: 0.5 });
  c.circle(82, 62, 7, 'h', { z: 0.7 });
  c.circle(84, 44, 7, 'h', { z: 0.7 });
  c.circle(72, 30, 6, 'h', { z: 0.7 });

  // Body
  c.ellipse(50, 68, 24, 20, 'f', { z: 1 });
  c.applySphericalShading(50, 68, 24, 20, 'f', 'h', 'd', { z: 1 });
  c.ellipse(50, 70, 14, 14, 'w', { z: 1.5 });

  // Feet
  c.ellipse(38, 90, 7, 5, 'd', { z: 1.8 });
  c.ellipse(62, 90, 7, 5, 'd', { z: 1.8 });

  if (!isAtk) {
    // Left paw holding apple core
    c.circle(30, 64, 5.5, 'd', { z: 2.5 });
    c.capsule(30, 60, 30, 70, 3.5, 'w', { z: 3 });
    c.circle(30, 58, 4, 'a', { z: 3.2 });
    c.circle(30, 72, 4, 'a', { z: 3.2 });
    c.circle(60, 68, 5, 'd', { z: 2 }); // Right paw
  } else {
    // ATTACK: Hurl a barrage of junk (tin can, fishbone, apple)!
    c.circle(26, 56, 5, 'd', { z: 2.5 });
    c.circle(68, 56, 5, 'd', { z: 2.5 });

    // Flying fishbone projectile
    c.capsule(82, 50, 96, 50, 2, 'b', { z: 5 });
    c.polygon([[96, 46], [100, 50], [96, 54]], 'b', { z: 5.2 }); // Tail
    c.circle(82, 50, 3, 'b', { z: 5.2 });                         // Head
    // Flying tin can
    c.rect(84, 30, 10, 12, 's', { z: 5 });
  }

  // Head
  c.ellipse(50, 40, 23, 19, 'f', { z: 4 });
  c.applySphericalShading(50, 40, 23, 19, 'f', 'h', 'd', { z: 4 });

  // Ruffs & ears
  c.polygon([[30, 42], [16, 48], [32, 54]], 'w', { z: 4.2 });
  c.polygon([[70, 42], [84, 48], [68, 54]], 'w', { z: 4.2 });
  c.polygon([[34, 28], [24, 14], [44, 22]], 'd', { z: 3.5 });
  c.polygon([[32, 26], [28, 18], [38, 22]], 'w', { z: 3.6 });
  c.polygon([[66, 28], [76, 14], [56, 22]], 'd', { z: 3.5 });
  c.polygon([[68, 26], [72, 18], [62, 22]], 'w', { z: 3.6 });

  // Bandit mask
  c.ellipse(38, 38, 9.6, 7, 'm', { angle: 0.12, z: 4.5 });
  c.ellipse(62, 38, 9.6, 7, 'm', { angle: -0.12, z: 4.5 });
  c.capsule(38, 38, 62, 38, 5, 'm', { z: 4.5 });

  // Eyebrows & muzzle
  c.circle(36, 30, 3, 'w', { z: 4.8 });
  c.circle(64, 30, 3, 'w', { z: 4.8 });
  c.ellipse(50, 46, 9, 6.4, 'w', { z: 5 });
  c.circle(50, 43, 2.8, 'k', { z: 5.5 });

  // Dented gold tin-can crown!
  c.polygon([[40, 22], [60, 22], [62, 10], [56, 14], [50, 8], [44, 14], [38, 10]], 'c', { z: 6 });
  c.capsule(42, 20, 58, 20, 2, 'C', { z: 6.2 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [38.0, 37.0],
    eyeR: [62.0, 37.0],
    eyeR_: 0.35,
    mouth: [50.0, 49.0],
    cheek: [30.0, 44.0],
    eyeColor: "#fafafa"
  };
}

// ============================================================================
// 5. MISCHIEVOUS MONKEY (Idx 9 / Enemy #10 - MINI BOSS) — 100x100
// ============================================================================

export function generateMonkeyOption1(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#2b1406", // Dark mahogany outline
    b: "#78350f", // Chestnut brown fur
    h: "#b45309", // Caramel highlight
    d: "#451a03", // Deep roast shadow
    f: "#fed7aa", // Peach face plate
    s: "#fba05a", // Face shadow
    y: "#facc15", // Banana bright yellow
    w: "#fef9c3", // Banana cream fruit
    e: "#f87171", // Ear inner
    c: "#eab308", // Golden boss crown
    r: "#ef4444"  // Special attack fire
  };

  const isAtk = mode === 'attack';
  const isSpec = mode === 'special';

  // Large prehensile curly tail looping up high
  const tailPts = [[34, 72], [14, 66], [10, 36], [22, 20], [36, 24]];
  c.bezier(tailPts[0], tailPts[1], tailPts[2], 6.5, 'b', { z: 0.5 });
  c.bezier(tailPts[2], tailPts[3], tailPts[4], 6, 'b', { z: 0.5 });
  c.circle(36, 24, 6, 'h', { z: 0.6 });

  // Muscular yet plump monkey body
  c.ellipse(50, 66, 22, 20, 'b', { z: 1 });
  c.applySphericalShading(50, 66, 22, 20, 'b', 'h', 'd', { z: 1 });
  c.ellipse(50, 68, 14, 14, 'f', { z: 1.5 });
  c.circle(50, 70, 2, 's', { z: 1.8 });

  // Feet
  c.ellipse(38, 88, 8, 5, 'd', { z: 1.8 });
  c.ellipse(62, 88, 8, 5, 'd', { z: 1.8 });

  if (mode === 'idle') {
    // Left arm on hip
    c.capsule(34, 54, 24, 62, 4.5, 'b', { z: 2 });
    c.capsule(24, 62, 34, 68, 4.5, 'b', { z: 2 });
    c.circle(34, 68, 4, 'f', { z: 2.2 });

    // Right arm holding a peeled golden banana!
    c.capsule(66, 54, 78, 56, 4.5, 'b', { z: 2 });
    c.circle(78, 56, 5, 'f', { z: 2.2 });
    c.bezier([78, 68], [86, 56], [80, 40], 4.5, 'y', { z: 3 });
    c.capsule(80, 40, 78, 32, 3.5, 'w', { z: 3.2 });
    c.capsule(78, 44, 72, 48, 2.5, 'y', { z: 3.3 });
    c.capsule(82, 44, 88, 48, 2.5, 'y', { z: 3.3 });
  } else if (mode === 'attack') {
    // ATTACK: Banana Boomerang throw with speed trails!
    c.capsule(34, 54, 24, 62, 4.5, 'b', { z: 2 });
    c.capsule(66, 54, 84, 50, 4.5, 'b', { z: 3 }); // Arm thrown forward
    c.circle(86, 48, 4.5, 'f', { z: 3.2 });
    // Spinning golden banana projectile in air
    c.ellipse(92, 32, 12, 5, 'y', { angle: 0.8, z: 5 });
    c.capsule(90, 32, 94, 32, 3, 'w', { z: 5.2 });
    // Yellow motion streaks
    c.capsule(80, 38, 92, 32, 1.5, 'y', { z: 4.8 });
    c.capsule(76, 44, 88, 38, 1.5, 'y', { z: 4.8 });
  } else if (mode === 'special') {
    // MINI BOSS SPECIAL ATTACK: BANANA SLING MAYHEM!
    // Left arm holding wooden Y-slingshot forward
    c.capsule(34, 54, 20, 48, 5, 'b', { z: 6 });
    c.circle(20, 48, 5, 'f', { z: 6.2 });
    
    // Slingshot fork (wooden)
    c.capsule(20, 48, 20, 32, 3.5, 'd', { z: 7 }); // handle
    c.capsule(20, 32, 10, 18, 3, 'd', { z: 7 });   // left fork
    c.capsule(20, 32, 30, 18, 3, 'd', { z: 7 });   // right fork

    // Right arm pulled back drawing the elastic band
    c.capsule(66, 54, 84, 52, 5, 'b', { z: 6 });
    c.circle(84, 52, 5.5, 'f', { z: 6.2 });

    // Stretched elastic slingshot cords
    c.capsule(10, 18, 60, 24, 1.8, 'r', { z: 7.5 }); // cord to banana pouch
    c.capsule(30, 18, 60, 24, 1.8, 'r', { z: 7.5 });
    c.capsule(60, 24, 84, 52, 1.8, 'r', { z: 7.5 });

    // GIANT MEGA BANANA loaded in slingshot, ready to fly!
    c.bezier([40, 26], [62, 12], [82, 24], 6.5, 'y', { z: 8 });
    c.bezier([42, 25], [62, 14], [80, 23], 3, 'w', { z: 8.2 }); // shine
    c.circle(82, 24, 3.5, 'd', { z: 8.3 }); // stem

    // Blazing sparks & flying peels around the projectile
    c.circle(8, 14, 2.5, 'y', { z: 8.5 });
    c.circle(32, 12, 3, 'r', { z: 8.5 });
    c.circle(68, 8, 3.5, 'y', { z: 8.5 });
    c.circle(90, 20, 3, 'r', { z: 8.5 });
    c.capsule(44, 26, 36, 34, 2.5, 'y', { z: 8.2 }); // flying peel
    c.capsule(76, 24, 86, 32, 2.5, 'y', { z: 8.2 });
  }

  // Giant protruding monkey ears with pink inner
  c.circle(24, 36, 11, 'b', { z: 3.5 });
  c.circle(24, 36, 7, 'f', { z: 3.6 });
  c.circle(24, 36, 4, 'e', { z: 3.7 });

  c.circle(76, 36, 11, 'b', { z: 3.5 });
  c.circle(76, 36, 7, 'f', { z: 3.6 });
  c.circle(76, 36, 4, 'e', { z: 3.7 });

  // Head
  c.circle(50, 36, 21, 'b', { z: 4 });
  c.applySphericalShading(50, 36, 21, 21, 'b', 'h', 'd', { z: 4 });

  // Mini Boss: Golden Leaf Crown!
  c.polygon([[36, 20], [42, 10], [50, 16], [58, 10], [64, 20]], 'c', { z: 5.5 });
  c.capsule(38, 19, 62, 19, 2, 'y', { z: 5.7 });

  // Heart-shaped peach face plate
  c.circle(43, 32, 9, 'f', { z: 4.8 });
  c.circle(57, 32, 9, 'f', { z: 4.8 });
  c.ellipse(50, 40, 13, 11, 'f', { z: 4.8 });
  c.applySphericalShading(50, 38, 13, 11, 'f', null, 's', { z: 4.9 });

  // Nostrils
  c.circle(47, 38, 1.6, 'd', { z: 5.2 });
  c.circle(53, 38, 1.6, 'd', { z: 5.2 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [43.0, 31.0],
    eyeR: [57.0, 31.0],
    eyeR_: 0.35,
    mouth: [50.0, 45.0],
    cheek: [33.0, 39.0],
    eyeColor: isSpec ? "#ef4444" : "#2b1406"
  };
}

export function generateMonkeyOption2(mode = 'idle') {
  const c = new MathPixelCanvas(100, 100);
  const palette = {
    k: "#261308", // Outline
    b: "#854d0e", // Bronze-brown fur
    h: "#ca8a04", // Amber highlight
    d: "#422006", // Dark shadow
    f: "#fde68a", // Peach face
    s: "#f59e0b", // Face shade
    r: "#dc2626", // Red ninja headband
    R: "#f87171", // Headband highlight
    w: "#e2e8f0", // Wrist wraps
    y: "#facc15"  // Energy blast
  };

  const isAtk = mode === 'attack';
  const isSpec = mode === 'special';

  // Coiled tail ready to spring
  const tailPts = [[36, 76], [16, 68], [12, 44], [26, 28], [40, 32]];
  c.bezier(tailPts[0], tailPts[1], tailPts[2], 6, 'b', { z: 0.5 });
  c.bezier(tailPts[2], tailPts[3], tailPts[4], 6, 'b', { z: 0.5 });
  c.circle(40, 32, 6, 'h', { z: 0.6 });

  // Body in dynamic crouch
  c.ellipse(50, 66, 20, 18, 'b', { z: 1 });
  c.applySphericalShading(50, 66, 20, 18, 'b', 'h', 'd', { z: 1 });
  c.ellipse(50, 68, 12, 12, 'f', { z: 1.5 });

  // Wide agile martial arts stance
  c.capsule(38, 74, 28, 90, 5.5, 'b', { z: 1.5 });
  c.capsule(62, 74, 72, 90, 5.5, 'b', { z: 1.5 });
  c.ellipse(26, 92, 8, 4.5, 'd', { z: 1.8 });
  c.ellipse(74, 92, 8, 4.5, 'd', { z: 1.8 });

  if (mode === 'idle') {
    // IDLE: Kung-fu guard
    c.capsule(36, 54, 24, 56, 4.5, 'b', { z: 2 });
    c.capsule(24, 56, 24, 48, 4.5, 'w', { z: 2.5 }); // Wrist wrap
    c.circle(24, 44, 5, 'f', { z: 2.8 });

    c.capsule(64, 54, 76, 44, 4.5, 'b', { z: 2 });
    c.capsule(76, 44, 80, 34, 4.5, 'w', { z: 2.5 });
    c.circle(82, 30, 5, 'f', { z: 2.8 });
  } else if (mode === 'attack') {
    // ATTACK: Tail-vault flying kick!
    c.capsule(36, 54, 24, 48, 4.5, 'b', { z: 2 });
    c.capsule(64, 54, 86, 58, 4.5, 'b', { z: 3 }); // Flying kick leg!
    c.ellipse(90, 60, 7, 5, 'd', { z: 3.2 });
    // Speed lines
    c.capsule(10, 54, 24, 54, 1.5, 'r', { z: 4 });
    c.capsule(15, 62, 30, 62, 1.5, 'r', { z: 4 });
  } else if (mode === 'special') {
    // MINI BOSS SPECIAL: JUNGLE SHADOW SLAM!
    c.capsule(36, 54, 18, 40, 5, 'b', { z: 3 });
    c.capsule(64, 54, 82, 40, 5, 'b', { z: 3 });
    // Glowing energy fists
    c.circle(18, 38, 8, 'y', { z: 6 });
    c.circle(18, 38, 5, 'w', { z: 6.2 });
    c.circle(82, 38, 8, 'y', { z: 6 });
    c.circle(82, 38, 5, 'w', { z: 6.2 });
    // Hanging jungle vines with lush foliage
    c.capsule(10, 0, 18, 90, 4.5, 'd', { z: 0.8 });
    c.capsule(90, 0, 82, 90, 4.5, 'd', { z: 0.8 });
    c.circle(12, 25, 4.5, 's', { z: 1.2 });
    c.circle(16, 55, 5, 's', { z: 1.2 });
    c.circle(88, 30, 4.5, 's', { z: 1.2 });
    c.circle(84, 65, 5, 's', { z: 1.2 });
    // Twin shockwave blast rings on ground
    c.ellipse(50, 92, 42, 7, 'y', { z: 2 });
    c.ellipse(50, 92, 30, 4.5, 'w', { z: 2.2 });
    c.ellipse(50, 92, 16, 2.5, 'r', { z: 2.3 });
  }

  // Ears
  c.circle(26, 34, 10, 'b', { z: 3.5 });
  c.circle(26, 34, 6, 'f', { z: 3.6 });
  c.circle(74, 34, 10, 'b', { z: 3.5 });
  c.circle(74, 34, 6, 'f', { z: 3.6 });

  // Head
  c.circle(50, 34, 20, 'b', { z: 4 });
  c.applySphericalShading(50, 34, 20, 20, 'b', 'h', 'd', { z: 4 });

  // Red Ninja Headband across brow!
  c.capsule(30, 26, 70, 26, 4.5, 'r', { z: 4.8 });
  c.capsule(32, 25, 68, 25, 2, 'R', { z: 5 });
  // Fluttering headband tails
  c.bezier([68, 26], [84, 22], [92, 12], 3, 'r', { z: 4.7 });
  c.bezier([70, 28], [86, 30], [94, 22], 3, 'r', { z: 4.7 });

  // Spiky hair crest
  c.polygon([[44, 20], [50, 8], [56, 20]], 'b', { z: 5.2 });
  c.polygon([[48, 20], [52, 10], [56, 20]], 'h', { z: 5.3 });

  // Face plate
  c.circle(43, 34, 8, 'f', { z: 4.5 });
  c.circle(57, 34, 8, 'f', { z: 4.5 });
  c.ellipse(50, 40, 12, 10, 'f', { z: 4.5 });
  c.applySphericalShading(50, 38, 12, 10, 'f', null, 's', { z: 4.6 });

  // Nostrils
  c.circle(47, 40, 1.6, 'd', { z: 5.2 });
  c.circle(53, 40, 1.6, 'd', { z: 5.2 });

  c.addOutline('k');

  return {
    map: c.toMap(),
    palette,
    eyeL: [43.0, 33.0],
    eyeR: [57.0, 33.0],
    eyeR_: 0.35,
    mouth: [50.0, 44.0],
    cheek: [33.0, 38.0],
    eyeColor: isSpec ? "#facc15" : "#261308"
  };
}

// ============================================================================
// CATALOGUE EXPORT — 100x100 High-Fidelity
// ============================================================================

export const PROCEDURAL_OPTIONS_100 = {
  // Enemy #6 (idx 5): Sassy Goblin Sprout
  5: {
    name: "Sassy Goblin Sprout",
    group: "Backyard Bunch",
    isBoss: false,
    opt1: {
      title: "Option 1: Cheeky Chibi Sproutling",
      desc: "Plump pear-shaped body with hands on hips, large pointy ears, blooming pink petal sprout on head with golden pollen, warm amber loincloth.",
      attackName: "Vine Whip & Pollen Burst",
      attackDesc: "Pivots and cracks a thorny vine whip forward with a flurry of sparkling pollen and petal particles!",
      idle: generateGoblinSproutOption1('idle'),
      attack: generateGoblinSproutOption1('attack')
    },
    opt2: {
      title: "Option 2: Floral Thorn Rogue",
      desc: "Cocked sassy stance, asymmetric ears, thorn-vine scarf with rosehip berry, emerald leaf cape, and 3-leaf fanned crown.",
      attackName: "Bramble Rapier Thrust",
      attackDesc: "Lunges forward with a thorn rapier in a fencing duelist pose, creating a swirling wind petal vortex!",
      idle: generateGoblinSproutOption2('idle'),
      attack: generateGoblinSproutOption2('attack')
    }
  },

  // Enemy #7 (idx 6): Mime
  6: {
    name: "Mime",
    group: "Backyard Bunch",
    isBoss: false,
    opt1: {
      title: "Option 1: Classic Parisian Street Mime",
      desc: "Tilted beret, horizontal black & white Breton striped shirt, suspenders with silver clasps, ruby neckerchief, and white gloves on an invisible glass wall.",
      attackName: "Glass Barrier Shatter",
      attackDesc: "Thrusts palms into the invisible barrier, violently shattering translucent cyan glass shards outward at the player!",
      idle: generateMimeOption1('idle'),
      attack: generateMimeOption1('attack')
    },
    opt2: {
      title: "Option 2: Theatrical Pierrot Mime",
      desc: "Pleated accordion ruff collar with golden jewel brooch, porcelain white mask with crimson teardrop, velvet midnight suit, and shushing gesture.",
      attackName: "Soundless Cane Tap",
      attackDesc: "Strikes a silver-tipped walking cane against the floor, releasing expanding silent sonic shockwave rings!",
      idle: generateMimeOption2('idle'),
      attack: generateMimeOption2('attack')
    }
  },

  // Enemy #8 (idx 7): Cocky Goose
  7: {
    name: "Cocky Goose",
    group: "Backyard Bunch",
    isBoss: false,
    opt1: {
      title: "Option 1: Puffed-Chest Swagger Goose",
      desc: "Puffed out chest, proud S-neck, golden-orange smug bill at a 15° angle, layered wing scallops, and wide webbed power-stance.",
      attackName: "Lightning Cobra Peck",
      attackDesc: "Snaps neck forward at lightning speed with an open serrated beak strike and flying feather down!",
      idle: generateGooseOption1('idle'),
      attack: generateGooseOption1('attack')
    },
    opt2: {
      title: "Option 2: Backyard Tyrant (Bowtie Honk)",
      desc: "Forward menace posture, flared wings ready for chaos, dapper red bowtie, and open beak HONKING with pink tongue.",
      attackName: "Sonic HONK! & Wing Gust",
      attackDesc: "Flaps wings aggressively, unleashing an expanding golden-ringed 'HONK!' sonic blast wave!",
      idle: generateGooseOption2('idle'),
      attack: generateGooseOption2('attack')
    }
  },

  // Enemy #9 (idx 8): Trash Panda
  8: {
    name: "Trash Panda",
    group: "Backyard Bunch",
    isBoss: false,
    opt1: {
      title: "Option 1: Bandit with Trash Lid Shield",
      desc: "Classic jet-black bandit eye mask, silver brow tufts, chubby raccoon body holding an aluminum trash can lid shield, and thick striped ringed tail.",
      attackName: "Trash Lid Shield Bash",
      attackDesc: "Charges forward slamming the corrugated aluminum trash lid into the screen with exploding yellow sparks!",
      idle: generateTrashPandaOption1('idle'),
      attack: generateTrashPandaOption1('attack')
    },
    opt2: {
      title: "Option 2: Trash King (Tin Crown & Apple Core)",
      desc: "Fluffy side cheek ruffs, holding a green apple core, wearing a dented gold tin-can crown, with a huge fluffy tail arched overhead.",
      attackName: "Scavenger Junk Barrage",
      attackDesc: "Spins and hurls a flying barrage of garbage projectiles (tin cans, fishbones, and apple cores)!",
      idle: generateTrashPandaOption2('idle'),
      attack: generateTrashPandaOption2('attack')
    }
  },

  // Enemy #10 (idx 9 - MINI BOSS!): Mischievous Monkey
  9: {
    name: "Mischievous Monkey",
    group: "Backyard Bunch Mini Boss",
    isBoss: true,
    opt1: {
      title: "Option 1: The Banana Sovereign (Prankster King)",
      desc: "Mini Boss King: Muscular chimp with golden tribal leaf crown, heart-shaped peach face plate, prehensile spiral tail overhead, holding a peeled golden banana scepter.",
      attackName: "Banana Boomerang",
      attackDesc: "Flips backward and whips a high-speed spinning golden banana with glowing yellow/orange light trails!",
      specialName: "★ MINI BOSS SPECIAL: BANANA SLING MAYHEM ★",
      specialDesc: "Draws back an oversized dual-handled MEGA BANANA slingshot, eyes blazing fiery red, unleashing a giant exploding banana missile with flying peels!",
      idle: generateMonkeyOption1('idle'),
      attack: generateMonkeyOption1('attack'),
      special: generateMonkeyOption1('special')
    },
    opt2: {
      title: "Option 2: Shadow Simian Shinobi (Acrobat Ninja)",
      desc: "Mini Boss Shinobi: Crouched martial arts stance, red ninja headband with long fluttering ribbons, white wrist & ankle wraps, coiled spring tail.",
      attackName: "Tail-Vault Flying Kick",
      attackDesc: "Vaults off coiled tail into an aerial spinning flying kick with blazing red speed-lines!",
      specialName: "★ MINI BOSS SPECIAL: JUNGLE SHADOW SLAM ★",
      specialDesc: "Summons giant ceiling jungle vines while unleashing twin glowing energy fists that smash into the ground with shockwave rings!",
      idle: generateMonkeyOption2('idle'),
      attack: generateMonkeyOption2('attack'),
      special: generateMonkeyOption2('special')
    }
  }
};
