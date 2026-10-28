const fs = require('fs');

console.log('--- Patching gameEngine.js with imported CONFIG & full attributes ---');
let code = fs.readFileSync('src/game/gameEngine.js', 'utf8');

// 1. Ensure import of CONFIG
if (!code.includes("import { CONFIG } from './config.js';")) {
  code = "import { CONFIG } from './config.js';\n" + code;
  console.log('Added import { CONFIG } from "./config.js"');
}

// 2. Remove the inline const CONFIG = { ... };
const cfgStart = code.indexOf('const CONFIG={playerBase:');
if (cfgStart !== -1) {
  // Find where this CONFIG ends
  const versionIdx = code.indexOf('appVersion:', cfgStart);
  if (versionIdx !== -1) {
    const cfgEnd = code.indexOf('};', versionIdx);
    if (cfgEnd !== -1) {
      console.log('Replacing inline CONFIG from index', cfgStart, 'to', cfgEnd + 2);
      code = code.slice(0, cfgStart) + '/* CONFIG imported from ./config.js */' + code.slice(cfgEnd + 2);
    }
  }
}

// 3. Update ATTR_DESCS
const oldAttrDescs = 'const ATTR_DESCS={power:"Raw damage on every slap.",speed:"How fast your hands cycle.",critChance:"Chance a slap lands critical.",critDamage:"How hard critical slaps hit.",defense:"Reduces incoming enemy attack damage.",stun:"Chance to stun the enemy & freeze their attack.",combo:"Damage bonus for every combo stack.",coinMult:"Multiplies every coin you earn."};';
const newAttrDescs = `const ATTR_DESCS={
  power:"Raw damage on every slap.",
  speed:"How fast your hands cycle.",
  critChance:"Chance a slap lands critical.",
  critDamage:"How hard critical slaps hit.",
  defense:"Reduces incoming enemy attack damage.",
  stun:"Chance to stun the enemy & freeze their attack.",
  combo:"Damage bonus for every combo stack.",
  coinMult:"Multiplies every coin you earn.",
  bossDamage:"Deals bonus damage against Elites & Bosses.",
  vampirism:"Leech vitality from slaps to recover your hands HP.",
  luck:"Chance for Lucky Slaps dealing 1.75x dmg & 2.5x coins.",
  tenacity:"Reduces duration of enemy debuffs and stuns taken."
};`;

if (code.includes(oldAttrDescs)) {
  code = code.replace(oldAttrDescs, newAttrDescs);
  console.log('Replaced ATTR_DESCS');
} else {
  console.log('Old ATTR_DESCS exact match not found, doing regex replace');
  code = code.replace(/const ATTR_DESCS=\{[\s\S]*?\};/, newAttrDescs);
}

// 4. Update attrCurText
const oldAttrCur = 'case"coinMult":return"<b>×"+fmtVal(st.coinMult)+"</b> coins"}';
const newAttrCur = `case"coinMult":return"<b>×"+fmtVal(st.coinMult)+"</b> coins";
    case"bossDamage":return"+<b>"+Math.round(((st.bossDmgMult||1)-1)*100)+"%</b> vs Bosses";
    case"vampirism":return"+<b>"+(G.attrs.vampirism||0)+" HP</b> / 4 hits";
    case"luck":return"<b>"+fmtVal((st.luckChance||0)*100)+"%</b> lucky strike";
    case"tenacity":return"-<b>"+Math.round(((G.attrs.tenacity||0)*0.02)*100)+"%</b> debuff time"}`;

if (code.includes(oldAttrCur)) {
  code = code.replace(oldAttrCur, newAttrCur);
  console.log('Updated attrCurText');
} else {
  console.log('attrCurText old snippet not found, checking alternatives...');
}

// 5. Update attrNextText
const oldAttrNext = 'case"coinMult":return"×"+fmtVal(st.coinMult);';
const newAttrNext = `case"coinMult":return"×"+fmtVal(st.coinMult);
    case"bossDamage":return"+"+Math.round(((st.bossDmgMult||1)-1)*100)+"% vs Boss";
    case"vampirism":return"+"+((G.attrs.vampirism||0)+1)+" HP leech";
    case"luck":return fmtVal(((st.luckChance||0)+CONFIG.fx.luckPerLevel)*100)+"% lucky";
    case"tenacity":return"-"+Math.round((((G.attrs.tenacity||0)+1)*CONFIG.fx.tenacityPerLevel)*100)+"% debuff";`;

if (code.includes(oldAttrNext)) {
  code = code.replace(oldAttrNext, newAttrNext);
  console.log('Updated attrNextText');
}

// 6. Update stats() for bossDmgMult and luckChance
code = code.replace('bossDmgMult:1.0', 'bossDmgMult:(1+(f.bossDmgPerLevel||0.025)*(a.bossDamage||0))*(hasAbility("bossBane")?af.bossBane:1)*(hasSkill("bossHunter")?sf.bossHunter:1)');
code = code.replace('luckChance:skinBonus("luck")', 'luckChance:(f.luckPerLevel||0.008)*(a.luck||0)+skinBonus("luck")');
console.log('Updated stats() with bossDmgMult and luckChance');

// 7. Update applyHit with vampirism
if (!code.includes('G.attrs.vampirism > 0')) {
  code = code.replace(
    'if(isPrimary){',
    'if(isPrimary){\n    if((G.attrs.vampirism||0)>0 && G.slapCount % 4 === 0) { healPlayer(G.attrs.vampirism); }'
  );
  console.log('Added vampirism heal to applyHit');
}

// 8. Update abilitiesHtml to support up to Lv 20 and Lv 21+ Mastery
const oldAbilitiesHtml = `function abilitiesHtml(){let html="";for(const ab of CONFIG.levelAbilities){const un=G.level>=ab.level;html+='<div class="ab-row '+(un?"unlocked":"locked")+'"><img src="'+iconUrl("ability",ab.id)+'" alt="">'+'<div class="ab-main"><div class="ab-name"><span class="ab-lv">LV '+ab.level+"</span>"+ab.name+"</div>"+'<div class="ab-fx">'+ab.fx+"</div></div>"+'<div class="ab-state">'+(un?"UNLOCKED":"REACH LEVEL "+ab.level)+"</div></div>"}const mPct=Math.max(0,G.level-10)*Math.round(CONFIG.abilityFx.masteryPer*100);const mUn=G.level>=11;html+='<div class="ab-row '+(mUn?"unlocked":"locked")+'"><img src="'+iconUrl("ability","mastery")+'" alt="">'+'<div class="ab-main"><div class="ab-name"><span class="ab-lv">LV 11+</span>Mastery</div>'+'<div class="ab-fx">+2% damage for every level above 10, stacking forever.'+(mUn?" Currently +"+mPct+"%.":"")+"</div></div>"+'<div class="ab-state">'+(mUn?"+"+mPct+"% DMG":"REACH LEVEL 11")+"</div></div>";return html}`;

const newAbilitiesHtml = `function abilitiesHtml(){
  let html="";
  for(const ab of CONFIG.levelAbilities){
    const un = G.level >= ab.level;
    html += '<div class="ab-row '+(un?"unlocked":"locked")+'">' +
      '<img src="'+iconUrl("ability",ab.id)+'" alt="">' +
      '<div class="ab-main">' +
        '<div class="ab-name"><span class="ab-lv">LV '+ab.level+'</span>'+ab.name+'</div>' +
        '<div class="ab-fx">'+ab.fx+'</div>' +
      '</div>' +
      '<div class="ab-state">'+(un?"UNLOCKED":"REACH LEVEL "+ab.level)+'</div>' +
    '</div>';
  }
  const mPct = Math.max(0, G.level - 20) * Math.round((CONFIG.abilityFx.masteryPer || 0.025) * 100);
  const mUn = G.level >= 21;
  html += '<div class="ab-row '+(mUn?"unlocked":"locked")+'">' +
    '<img src="'+iconUrl("ability","mastery")+'" alt="">' +
    '<div class="ab-main">' +
      '<div class="ab-name"><span class="ab-lv">LV 21+</span>Hands Mastery</div>' +
      '<div class="ab-fx">+2.5% damage for every level above 20, stacking forever.'+(mUn?" Currently +"+mPct+"%.":"")+'</div>' +
    '</div>' +
    '<div class="ab-state">'+(mUn?"+"+mPct+"% DMG":"REACH LEVEL 21")+'</div>' +
  '</div>';
  return html;
}`;

if (code.includes('const mPct=Math.max(0,G.level-10)')) {
  code = code.replace(/function abilitiesHtml\(\)\{[\s\S]*?return html\}/, newAbilitiesHtml);
  console.log('Replaced abilitiesHtml with Lv 20 + 21+ Mastery');
}

// 9. Ensure default values for new attributes in G.attrs
if (!code.includes('G.attrs.bossDamage =')) {
  code = code.replace(
    'G.attrs=G.attrs||{};',
    'G.attrs=G.attrs||{};["bossDamage","vampirism","luck","tenacity"].forEach(k=>{if(G.attrs[k]==null)G.attrs[k]=0;});'
  );
  console.log('Added default fallback initialization for new attrs in G.attrs');
}

fs.writeFileSync('src/game/gameEngine.js', code, 'utf8');
console.log('src/game/gameEngine.js written successfully.');
