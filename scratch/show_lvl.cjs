const fs = require('fs');
const lines = fs.readFileSync('src/game/config.js', 'utf8').split('\n');
for (let i = 9; i <= 19; i++) {
  process.stdout.write(JSON.stringify(lines[i - 1]) + '\n');
}
