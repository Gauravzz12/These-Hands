const fs = require('fs');

console.log('--- Step 1: Updating src/game/config.js ---');
let cfgCode = fs.readFileSync('src/game/config.js', 'utf8');

// Replace attrs object in config.js
const newAttrsStr = `attrs:{
    power:{name:"Power",baseCost:30,growth:1.35,maxLevel:50},
    speed:{name:"Speed",baseCost:75,growth:1.45,maxLevel:20},
    critChance:{name:"Crit Chance",baseCost:60,growth:1.42,maxLevel:20},
    critDamage:{name:"Crit Damage",baseCost:60,growth:1.42,maxLevel:20},
    defense:{name:"Defense",baseCost:55,growth:1.40,maxLevel:20},
    stun:{name:"Stun",baseCost:70,growth:1.45,maxLevel:15},
    combo:{name:"Combo",baseCost:65,growth:1.42,maxLevel:20},
    coinMult:{name:"Coin Mult.",baseCost:50,growth:1.38,maxLevel:20},
    bossDamage:{name:"Boss Hunter",baseCost:70,growth:1.40,maxLevel:20},
    vampirism:{name:"Life Leech",baseCost:80,growth:1.45,maxLevel:15},
    luck:{name:"Fortune Luck",baseCost:75,growth:1.42,maxLevel:15},
    tenacity:{name:"Tenacity",baseCost:65,growth:1.38,maxLevel:15}
  },
  attrOrder:["power","speed","critChance","critDamage","defense","stun","combo","coinMult","bossDamage","vampirism","luck","tenacity"],`;

cfgCode = cfgCode.replace(/attrs:\{[\s\S]*?attrOrder:\[[\s\S]*?\],/, newAttrsStr);

// Make sure fx has new stats
const newFxProps = `bossDmgPerLevel:0.025,luckPerLevel:0.008,luckDmgMult:1.75,luckCoinMult:2.5,vampPerLevel:1,tenacityPerLevel:0.02,tenacityCap:0.30,`;
if (!cfgCode.includes('tenacityPerLevel')) {
  cfgCode = cfgCode.replace('bossDmgPerLevel:0.02,', newFxProps);
}

fs.writeFileSync('src/game/config.js', cfgCode, 'utf8');
console.log('config.js updated successfully.');
