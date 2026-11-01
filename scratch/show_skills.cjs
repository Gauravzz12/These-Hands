const fs = require('fs');
const src = fs.readFileSync('src/game/gameEngine.js', 'utf8');
const i = src.indexOf('function renderSkills');
process.stdout.write(src.slice(i, i + 1500) + '\n');
