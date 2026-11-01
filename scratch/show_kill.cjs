const fs = require('fs');
const src = fs.readFileSync('src/game/gameEngine.js', 'utf8');
const i = src.indexOf('specialUnlock=');
process.stdout.write('first specialUnlock= @' + i + '\n');
process.stdout.write(src.slice(i - 900, i + 700) + '\n');
