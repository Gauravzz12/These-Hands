const fs = require('fs');
const lines = fs.readFileSync('src/components/SpecialsScreen.jsx', 'utf8').split('\n');
for (let i = 63; i <= 76; i++) {
  process.stdout.write('L' + i + ': ' + JSON.stringify(lines[i - 1]) + '\n');
}
