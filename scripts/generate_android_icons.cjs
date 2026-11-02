const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcIcon = path.resolve('store_assets/icon-512.png');
const resDir = path.resolve('android/app/src/main/res');

if (!fs.existsSync(srcIcon)) {
  console.error('Source icon not found:', srcIcon);
  process.exit(1);
}

const densities = [
  { folder: 'mipmap-mdpi', iconSize: 48, fgSize: 108 },
  { folder: 'mipmap-hdpi', iconSize: 72, fgSize: 162 },
  { folder: 'mipmap-xhdpi', iconSize: 96, fgSize: 216 },
  { folder: 'mipmap-xxhdpi', iconSize: 144, fgSize: 324 },
  { folder: 'mipmap-xxxhdpi', iconSize: 192, fgSize: 432 }
];

async function generate() {
  console.log('Generating Android launcher icons from:', srcIcon);

  for (const d of densities) {
    const targetDir = path.join(resDir, d.folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 1. Standard square icon (ic_launcher.png)
    const launcherPath = path.join(targetDir, 'ic_launcher.png');
    await sharp(srcIcon)
      .resize(d.iconSize, d.iconSize, { fit: 'cover' })
      .png()
      .toFile(launcherPath);
    console.log(`Generated: ${d.folder}/ic_launcher.png (${d.iconSize}x${d.iconSize})`);

    // 2. Round icon (ic_launcher_round.png)
    const radius = Math.floor(d.iconSize / 2);
    const circleSvg = Buffer.from(
      `<svg width="${d.iconSize}" height="${d.iconSize}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="#fff"/></svg>`
    );

    const roundPath = path.join(targetDir, 'ic_launcher_round.png');
    await sharp(srcIcon)
      .resize(d.iconSize, d.iconSize, { fit: 'cover' })
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .png()
      .toFile(roundPath);
    console.log(`Generated: ${d.folder}/ic_launcher_round.png (${d.iconSize}x${d.iconSize})`);

    // 3. Adaptive foreground icon (ic_launcher_foreground.png)
    // Scale the icon to ~72% of the total foreground size to keep inside the adaptive safe-zone
    const innerSize = Math.round(d.fgSize * 0.72);
    const offset = Math.round((d.fgSize - innerSize) / 2);

    const resizedInner = await sharp(srcIcon)
      .resize(innerSize, innerSize, { fit: 'contain' })
      .toBuffer();

    const fgPath = path.join(targetDir, 'ic_launcher_foreground.png');
    await sharp({
      create: {
        width: d.fgSize,
        height: d.fgSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: resizedInner, top: offset, left: offset }])
      .png()
      .toFile(fgPath);
    console.log(`Generated: ${d.folder}/ic_launcher_foreground.png (${d.fgSize}x${d.fgSize})`);
  }

  // Update background color XML to match icon warm canvas #fdf4e0
  const bgXmlPath = path.join(resDir, 'values/ic_launcher_background.xml');
  const bgXml = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#FDF4E0</color>\n</resources>\n`;
  fs.writeFileSync(bgXmlPath, bgXml, 'utf8');
  console.log('Updated ic_launcher_background.xml to #FDF4E0');

  console.log('All Android icons successfully created!');
}

generate().catch(err => {
  console.error('Failed generating icons:', err);
  process.exit(1);
});

