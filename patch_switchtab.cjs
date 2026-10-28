const fs = require('fs');

let code = fs.readFileSync('src/game/gameEngine.js', 'utf8');

const oldCheck = 'else if(name==="levels"||name==="skills"||name==="shop"){active=(tab===name)}';
const newCheck = 'else if(name==="levels"||name==="skills"||name==="attrs"||name==="shop"){active=(tab===name)}';

if (code.includes(oldCheck)) {
  code = code.replace(oldCheck, newCheck);
  console.log('Updated active tab check in switchTab');
} else {
  console.log('oldCheck not matched, checking current string...');
  const idx = code.indexOf('else if(name===');
  if (idx !== -1) console.log(code.slice(idx, idx + 100));
}

// Also update moreAttrsSub text to show CAP 3 per attribute:
code = code.replace('LEVEL 1 · CAP 5', 'LEVEL 1 · CAP 3');

fs.writeFileSync('src/game/gameEngine.js', code, 'utf8');
console.log('gameEngine.js updated.');
