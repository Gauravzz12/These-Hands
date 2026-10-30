import { CONFIG, GROUPS, ROSTER } from './config.js';
import { ENEMY_ART } from './artData.js';
import { getV2Sprite, isV2Enemy, preloadV2Sprites, healV2Sprites } from './enemySpritesV2.js';
// These Hands — Authentic Game Engine
// Preserves 100% of the original canvas rendering, pixel art sprites, sound synthesis, and mechanics.

export function initGameEngine() {
  if (window.__gameEngineInitialized) return;
  window.__gameEngineInitialized = true;
  preloadV2Sprites();

  
      window.__bootDone=false;
      window.__bootSet=function(pct,label){var f=document.getElementById("bsFill"),p=document.getElementById("bsPct"),t=document.getElementById("bsTip");if(f)f.style.width=Math.max(0,Math.min(100,pct))+"%";if(p)p.textContent=Math.round(pct)+"%";if(label&&t)t.textContent=label};
      window.__bootSet(30,"Warming up the hands…");
    

  
"use strict";
/* Synced GROUPS, ROSTER, and ENEMY_ART imported from config.js and artData.js */;function renderSprite(def,white){const px=10;const rows=def.map.length,cols=def.map[0].length;const c=document.createElement("canvas");c.width=cols*px;c.height=rows*px;const g=c.getContext("2d");for(let y=0;y<rows;y++){const row=def.map[y].padEnd(cols,".");for(let x=0;x<cols;x++){const ch=row[x];if(ch==="."||!def.palette[ch])continue;g.fillStyle=white?"#ffffff":def.palette[ch];g.fillRect(x*px,y*px,px,px)}}return c}function makeSprite(def){const d={map:def.map,palette:def.palette,eyeL:def.eyeL,eyeR:def.eyeR,eyeR_:def.eyeR_,mouth:def.mouth,cheek:def.cheek,eyeColor:def.eyeColor||"#26221f",singleEye:!!def.singleEye};d.cols=def.map[0].length;d.rows=def.map.length;d.colors=Object.keys(def.palette).map((k)=>def.palette[k]);d.img=renderSprite(d,false);d.imgWhite=renderSprite(d,true);try{const iw=d.img.width,ih=d.img.height;const data=d.img.getContext("2d").getImageData(0,0,iw,ih).data;const rows=new Array(ih).fill(0);for(let y=0;y<ih;y++){let c=0;for(let x=0;x<iw;x++){if(data[(y*iw+x)*4+3]>24)c++}rows[y]=c}let total=0;for(let y=0;y<ih;y++)total+=rows[y];if(total>0){const act=rows.map((v,y)=>v>0||(y>0&&rows[y-1]>0&&y<ih-1&&rows[y+1]>0));let clusters=[],cur=null;for(let y=0;y<ih;y++){if(act[y]){if(!cur)cur={top:y,bot:y,mass:0};cur.bot=y;cur.mass+=rows[y]}else if(cur){clusters.push(cur);cur=null}}if(cur)clusters.push(cur);clusters.sort((a,b)=>b.mass-a.mass);const main=clusters[0];let left=iw,right=-1;for(let y=main.top;y<=main.bot;y++){for(let x=0;x<iw;x++){if(data[(y*iw+x)*4+3]>24){if(x<left)left=x;if(x>right)right=x}}}d.gTop=main.top/ih;d.gBot=Math.min(1,(main.bot+1)/ih);d.gCx=left<=right?((left+right)/2)/iw:0.5}}catch(err){}d.thumb=d.img.toDataURL();return d}function validateArt(){const problems=[];if(ENEMY_ART.length!==ROSTER.length)problems.push("art count "+ENEMY_ART.length+" != roster "+ROSTER.length);const seen={};ENEMY_ART.forEach((def,i)=>{const n="#"+(i+1)+" "+(ROSTER[i]?ROSTER[i][0]:"?");if(!def||!def.map||!def.map.length){problems.push(n+": missing map");return}const cols=def.map[0].length;if(cols<8||cols>20||def.map.length<6||def.map.length>20)problems.push(n+": bad dimensions "+cols+"x"+def.map.length);let filled=0,sig="";def.map.forEach((row)=>{if(row.length!==cols)problems.push(n+": ragged row");for(const ch of row){if(ch!=="."){filled++;sig+="1";if(!def.palette[ch])problems.push(n+": colour '"+ch+"' not in palette")}else sig+="0"}sig+="/"});if(filled<30)problems.push(n+": sprite nearly empty ("+filled+"px)");if(seen[sig])problems.push(n+": filled silhouette identical to "+seen[sig]);else seen[sig]=n;if(!def.eyeL||!def.eyeR||!def.mouth||!def.cheek)problems.push(n+": missing face anchors")});if(problems.length)console.warn("[These Hands] sprite validation: "+problems.join(" · "));else console.log("[These Hands] sprite validation: all "+ENEMY_ART.length+" sprites unique, non-empty, palette-safe");return problems}const GIANT_SCALE={"Sumo Champion":1.5,"Giant Spider":1.6,"Giant Serpent":1.6,"Giant Scorpion":1.6,"Storm Giant":1.65,"Kraken Spawn":1.6,"T-Rex King":1.6,"Glacier Titan":1.65};function expectedBuild(i){const{expectedBuild:EB,playerBase:b,fx:f,skillFx:sf,abilityFx:af}=CONFIG;const pLevel=Math.min(EB.levelCap,1+Math.floor(i/4)),cap=pLevel*5;const at={power:Math.round(cap*EB.mainFrac),speed:Math.round(cap*EB.subFrac),critChance:Math.round(cap*EB.subFrac),critDamage:Math.round(cap*EB.subFrac),combo:Math.round(cap*EB.subFrac),accuracy:Math.round(cap*EB.subFrac),bossDamage:Math.round(cap*EB.bossFrac)};const sk={stronger:i>=1,quick:i>=2,secondHand:i>=4,critSlaps:i>=5,heavy:i>=6,stamina:i>=7,dual:i>=12,bossHunter:i>=16,comboMastery:i>=16,barrage:i>=26,unstoppable:i>=26};const ab={ironPalm:pLevel>=2,quickening:pLevel>=3,thickSkin:pLevel>=4,critSurge:pLevel>=7,bossBane:pLevel>=9};const maxHp=CONFIG.playerHp.base+CONFIG.playerHp.perLevel*(pLevel-1)+(sk.stamina?sf.staminaHp:0)+(sk.unstoppable?sf.unstoppableHp:0);const damage=(b.damage+at.power)*(sk.stronger?sf.strongerDmg:1)*(ab.ironPalm?af.ironPalm:1)*(1+af.masteryPer*Math.max(0,pLevel-10));let interval=Math.max(f.speedFloor,b.attackInterval*Math.pow(f.speedPerLevel,at.speed));interval=Math.max(0.15,interval*(sk.quick?sf.quickSpeed:1)*(sk.dual?sf.dualSpeed:1)*(ab.quickening?af.quickening:1));const critCh=b.critChance+f.critChancePerLevel*at.critChance+(sk.critSlaps?sf.critSlaps:0)+(ab.critSurge?af.critSurge:0);const critMult=b.critMult+f.critDamagePerLevel*at.critDamage;const comboPer=f.comboPerStackPerLevel*at.combo+(sk.comboMastery?sf.comboMasteryPer:0);const comboMax=(at.combo>0?f.comboBaseStacks+at.combo:0)+(sk.comboMastery?sf.comboMasteryStacks:0);const comboMult=1+Math.ceil(comboMax/2)*comboPer;const hit=Math.min(f.accuracyCap,f.accuracyBase+f.accuracyPerLevel*at.accuracy);const cycle=interval/(sk.secondHand?2:1);return{pLevel,at,sk,ab,maxHp,damage,cycle,critCh,critMult,comboMult,hit}}function expectedDps(i){const bd=expectedBuild(i),sf=CONFIG.skillFx;const eliteBoss=i%5===4||i%10===9;const pH=bd.sk.heavy?sf.heavyChance:0;let per=bd.damage*bd.comboMult*((1-pH)*(1+bd.critCh*(bd.critMult-1))+pH*sf.heavyMult);if(eliteBoss){if(bd.sk.bossHunter)per*=sf.bossMult;if(bd.ab.bossBane)per*=CONFIG.abilityFx.bossBane;per*=1+CONFIG.fx.bossDmgPerLevel*bd.at.bossDamage}if(bd.sk.barrage)per*=1+sf.barrageHits*sf.barrageMult/sf.barrageEvery;return per*bd.hit/bd.cycle*designMult(i,bd)}function atkRefDps(i){const bd=expectedBuild(i),sf=CONFIG.skillFx;const eliteBoss=i%5===4||i%10===9;const pH=bd.sk.heavy?sf.heavyChance:0;let per=bd.damage*bd.comboMult*((1-pH)*(1+bd.critCh*(bd.critMult-1))+pH*sf.heavyMult);if(bd.sk.barrage)per*=1+sf.barrageHits*sf.barrageMult/sf.barrageEvery;return per*bd.hit/bd.cycle*designMult(i,bd)}function designMult(i,bd){let m=1;if(i>=7)m*=(25+10*CONFIG.frenzy.dmgMult*CONFIG.frenzy.speedMult)/35;const SP=CONFIG.specials||[];let add=0;for(const sp of SP){if(i>sp.boss){const lv=Math.min(5,1+Math.floor((i-sp.boss-1)/16));add+=sp.mult*Math.pow(1.25,lv-1)*bd.cycle/(sp.cd*Math.pow(0.96,lv-1))}}return m*(1+add)}const ENEMIES=(()=>{
  const { enemyScale: S, enemyAttack: A } = CONFIG;
  const hpBase = S.hpBase || 70;
  let runningHp = hpBase;
  let lastHp = 0;
  return ROSTER.map((r, i) => {
    const pos = i % 5;
    const elite = pos === 4;
    const boss = i % 10 === 9;
    const miniBoss = elite && !boss;
    if (i === 0) {
      runningHp = hpBase;
    } else {
      const prevPos = (i - 1) % 5;
      const prevWasBoss = (i - 1) % 10 === 9;
      const prevWasMiniBoss = prevPos === 4 && !prevWasBoss;
      const progress = i / 99;
      const regularMult = 1.34 - 0.10 * progress;
      const miniBossMult = 1.62 - 0.10 * progress;
      const bossMult = 2.25 + 0.25 * progress;
      const transMiniMult = 1.18 - 0.04 * progress;
      const transBossMult = 1.16 - 0.04 * progress;
      let stepMult;
      if (prevWasBoss) {
        stepMult = transBossMult;
      } else if (prevWasMiniBoss) {
        stepMult = transMiniMult;
      } else if (boss) {
        stepMult = bossMult;
      } else if (miniBoss) {
        stepMult = miniBossMult;
      } else {
        stepMult = regularMult;
      }
      runningHp = Math.round(runningHp * stepMult);
    }
    const hpBase2 = i === 0 ? Math.round(runningHp * 0.9) : i>=1&&i<=9 ? Math.round(runningHp*(1+0.30*(9-i)/8)) : runningHp; let stepFloor = 0; if (i > 0) { const fb = Math.max(1.10, 1.76 + (1.13 - 1.76) * Math.min(1, (i - 1) / 48)); const pPos = (i - 1) % 5; const pBoss = (i - 1) % 10 === 9; const pMini = pPos === 4 && !pBoss; stepFloor = pBoss ? fb * 0.85 : pMini ? fb * 0.93 : boss ? fb * 1.45 : miniBoss ? fb * 1.18 : fb; } const hp = i === 0 ? hpBase2 : Math.max(hpBase2, Math.round(lastHp * stepFloor)); lastHp = hp; // round-13b: Gaurav decaying ladder — per-step HP multiplier starts at 1.76 and decays to 1.13 by the Final Dragon (idx49 lands ~15B HP); boss steps spike x1.45, elite steps x1.18, steps right after a boss/elite ease to x0.85 / x0.93 of the base step. Dummy at 90% HP (tutorial fight); early-game ramp idx1-9 kept inside hpBase2
    const coinRate = S.rateBase * Math.pow(S.rateGrowth, Math.min(i, 49)) * Math.pow(S.rateTailGrowth, Math.max(0, i - 49));
    const bounty = Math.max(10, Math.round(hp * Math.min(1.5, coinRate / 10)));
    let interval = Math.max(A.intervalFloor, A.intervalStart * Math.pow(A.intervalDecay, i));
    interval = elite ? Math.max(A.eliteIntervalFloor, interval * A.eliteIntervalMult) : Math.max(A.intervalFloor, interval);
    interval = Math.round(interval * 100) / 100;
    interval = Math.max(1, Math.round(interval * (1 - 0.12 * Math.min(1, i / 10)) * 100) / 100); // faster attacks, ramped: -0% at #1 to -12% from #11 on
    const eb = expectedBuild(i);
    const targetHits = boss ? 9.0 : miniBoss ? 6.2 : 4.2;
    const thickSkinMult = (eb.ab && eb.ab.thickSkin) ? CONFIG.abilityFx.thickSkin : 1.0;
    let atkDmg = Math.max(1, Math.ceil(eb.maxHp * (1 + 0.30 * Math.min(1, i / 10)) / (targetHits * thickSkinMult))); atkDmg = Math.max(1, Math.round(atkDmg * (1 + 0.22 * Math.min(1, i / 25)))); // round-11: hits grow up to +22% by #26 // harder hits, ramped: +0% at #1 to +30% from #11 on
    if (i === 0) atkDmg = Math.max(1, Math.ceil(atkDmg * 0.88)); // Dummy discount: the tutorial fight — the guided first POWER buy must win the rematch
    const built = {
      idx: i,
      name: r[0],
      group: Math.floor(i / 5),
      elite,
      hp,
      coinRate,
      bounty,
      atkInterval: interval,
      atkDmg,
      boss,
      scale: r[0] === "Final Dragon Boss" ? 1.65 : r[0] === "The Almighty Hand" ? 1.7 : (/giant|titan|dragon|golem|king|colossus|almighty|sumo/i.test(r[0]) ? (GIANT_SCALE[r[0]] || 1.45) : (boss ? 1.15 : (elite ? 1.08 : 1.0)))
    };
    let sprCache = null;
    Object.defineProperty(built, "spr", {
      enumerable: true,
      get() {
        if (!sprCache) sprCache = isV2Enemy(i) ? getV2Sprite(i) : makeSprite(ENEMY_ART[i]);
        return sprCache;
      }
    });
    return built;
  });
})();
for(let i=1;i<ENEMIES.length;i++){
  const p=ENEMIES[i-1],c=ENEMIES[i];
  if(c.hp<=p.hp)c.hp=Math.round(p.hp*1.15);
  if(c.bounty<=p.bounty)c.bounty=Math.round(p.bounty*1.12);
  if(c.atkDmg<p.atkDmg)c.atkDmg=p.atkDmg;
}
const DEFERRED_CHECKS=[];const HAND_URI="data:image/webp;base64,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";const PRINT_URI="data:image/webp;base64,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";const HAND_IMG=new Image;HAND_IMG.src=HAND_URI;let HAND_SPRITE=null,HAND_ASLEEP=null;const PRINT_IMG=new Image;PRINT_IMG.src=PRINT_URI;HAND_IMG.onerror=()=>{window.__handImgFailed=true};PRINT_IMG.onerror=()=>{};const initHandCanvases=()=>{if(HAND_SPRITE)return;const nw=HAND_IMG.naturalWidth||92,nh=HAND_IMG.naturalHeight||92;const c=document.createElement("canvas");c.width=nw;c.height=nh;c.getContext("2d").drawImage(HAND_IMG,0,0);HAND_SPRITE=c;const g=document.createElement("canvas");g.width=c.width;g.height=c.height;const gx=g.getContext("2d");gx.drawImage(c,0,0);try{const id=gx.getImageData(0,0,g.width,g.height),d=id.data;for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const lum=0.35*d[i]+0.45*d[i+1]+0.2*d[i+2];d[i]=(d[i]*0.35+lum*0.65)*0.74+10;d[i+1]=(d[i+1]*0.35+lum*0.65)*0.74+11;d[i+2]=(d[i+2]*0.35+lum*0.65)*0.74+16}gx.putImageData(id,0,0)}catch(e){}HAND_ASLEEP=g;if(typeof buildSkinArt==="function")buildSkinArt()};HAND_IMG.onload=initHandCanvases;const Sound={ctx:null,master:null,analyser:null,muted:false,unlock(){if(this.ctx){if(this.ctx.state!=="running")this.ctx.resume();return}try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC;this.master=this.ctx.createGain();this.master.gain.value=0.5;this.analyser=this.ctx.createAnalyser();this.analyser.fftSize=512;this.master.connect(this.analyser);this.analyser.connect(this.ctx.destination);if(this.ctx.state!=="running")this.ctx.resume()}catch(e){}},rms(){if(!this.ctx||!this.analyser)return 0;const buf=new Uint8Array(this.analyser.fftSize);this.analyser.getByteTimeDomainData(buf);let s=0;for(let i=0;i<buf.length;i++){const v=(buf[i]-128)/128;s+=v*v}return Math.sqrt(s/buf.length)},tap(pitch = 1.0){
  if(!this.ctx||this.muted)return;
  try{
    const t0=this.ctx.currentTime;
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();
    o.type="sine";
    o.frequency.setValueAtTime(650*(pitch||1),t0);
    o.frequency.exponentialRampToValueAtTime(140*(pitch||1),t0+0.038);
    g.gain.setValueAtTime(0.18,t0);
    g.gain.exponentialRampToValueAtTime(0.001,t0+0.038);
    o.connect(g);g.connect(this.master);
    o.start(t0);o.stop(t0+0.042);
  }catch(e){}
},
suspend(){
  try{if(this.ctx&&this.ctx.state==="running")this.ctx.suspend();}catch(e){}
},
resume(){
  try{if(this.ctx&&this.ctx.state==="suspended"&&!this.muted)this.ctx.resume();}catch(e){}
},
tone(freqA,freqB,dur,type,vol,when){if(!this.ctx||this.muted)return;const t0=this.ctx.currentTime+(when||0);const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(freqA,t0);o.frequency.exponentialRampToValueAtTime(Math.max(freqB,1),t0+dur);g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(0.001,t0+dur);o.connect(g);g.connect(this.master);o.start(t0);o.stop(t0+dur+0.02)},slap(kind){if(!this.ctx||this.muted)return;const crit=kind==="crit",heavy=kind==="heavy",ult=kind==="ultimate";const t=this.ctx.currentTime;const len=Math.floor(this.ctx.sampleRate*(ult?0.16:heavy?0.13:0.09));const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const src=this.ctx.createBufferSource();src.buffer=buf;const bp=this.ctx.createBiquadFilter();bp.type="bandpass";bp.frequency.value=ult?700:heavy?950:crit?2600:1800;bp.Q.value=0.8;const g=this.ctx.createGain();g.gain.value=ult?1:heavy?0.95:crit?0.9:0.65;src.connect(bp);bp.connect(g);g.connect(this.master);src.start(t);this.tone(ult?140:heavy?130:crit?220:170,36,ult?0.24:0.14,"sine",ult?0.95:heavy?0.9:0.75,0);if(crit)this.tone(1200,2400,0.1,"square",0.12,0);if(ult){this.tone(300,1400,0.18,"sawtooth",0.16,0);this.tone(90,40,0.3,"sine",0.7,0.02)}},noiseBurst(dur,type,freqA,freqB,q,vol,when){if(!this.ctx||this.muted)return;const t=this.ctx.currentTime+(when||0);const len=Math.max(1,Math.floor(this.ctx.sampleRate*dur));const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const src=this.ctx.createBufferSource();src.buffer=buf;const fl=this.ctx.createBiquadFilter();fl.type=type;fl.Q.value=q;fl.frequency.setValueAtTime(freqA,t);fl.frequency.exponentialRampToValueAtTime(Math.max(freqB,20),t+dur);const g=this.ctx.createGain();g.gain.value=vol;src.connect(fl);fl.connect(g);g.connect(this.master);src.start(t)},skinSlap(id,kind){if(!this.ctx||this.muted)return;this.slap(kind);return;const big=kind==="crit"||kind==="heavy"||kind==="ultimate";const P=big?1.25:1;if(id==="spidey"){this.noiseBurst(0.07,"highpass",3000,5200,0.8,0.35,0);this.tone(900*P,240,0.11,"triangle",0.22,0.01);this.noiseBurst(0.12,"bandpass",1400,700,1.2,0.4,0.03);if(big)this.tone(180,60,0.2,"sine",0.5,0.02)}else if(id==="logan"){this.noiseBurst(0.05,"highpass",4200,6800,0.8,0.3,0);this.noiseBurst(0.05,"highpass",4600,7200,0.8,0.3,0.045);this.noiseBurst(0.06,"highpass",5000,7600,0.8,0.32,0.09);this.tone(210*P,70,0.12,"sawtooth",0.16,0);if(big)this.noiseBurst(0.16,"bandpass",2000,500,1.2,0.3,0.02)}else if(id==="thor"){this.noiseBurst(0.09,"highpass",3600,7000,0.7,0.4,0);this.tone(1400,180,0.1,"square",0.1,0);this.noiseBurst(0.34,"lowpass",900,140,0.85,0.62,0.03);this.tone(72*P,30,0.36,"sine",0.85,0.03);if(big)this.noiseBurst(0.2,"bandpass",2400,300,1,0.3,0.05)}else if(id==="hulk"){this.tone(64*P,26,0.34,"sine",1,0);this.noiseBurst(0.22,"lowpass",480,90,0.85,0.85,0);this.noiseBurst(0.08,"highpass",2400,3400,0.7,0.14,0.01);if(big){this.tone(48,22,0.44,"sine",1,0.02);this.noiseBurst(0.3,"lowpass",340,70,0.85,0.8,0.02)}}else if(id==="gauntlet"){this.tone(1568,1568,0.22,"sine",0.14,0);this.tone(1046,1046,0.3,"sine",0.12,0.05);this.tone(98*P,30,0.4,"sine",0.65,0);this.noiseBurst(0.26,"lowpass",800,120,0.8,0.4,0.02);if(big)this.tone(784,784,0.34,"triangle",0.1,0.06)}},bossWarn(){if(!this.ctx||this.muted)return;this.tone(196,196,0.14,"square",0.16,0);this.tone(196,196,0.14,"square",0.16,0.2);this.tone(147,147,0.22,"square",0.16,0.4)},bossFx(kind,idx){if(!this.ctx||this.muted)return;if(kind==="acc"||(kind==="slow"&&idx===69))this.whoosh();else if(kind==="slow")this.roar();else if(kind==="stun"&&idx===19){this.whoosh();this.noiseBurst(0.2,"lowpass",700,300,0.8,0.3,0.1)}else if(kind==="stun"){this.noiseBurst(0.18,"highpass",3200,5200,0.7,0.22,0);this.tone(880,1760,0.16,"sawtooth",0.1,0)}else if(kind==="burn"){this.roar();this.noiseBurst(0.5,"bandpass",300,2400,1,0.4,0)}else if(kind==="shield"){this.tone(660,990,0.12,"square",0.1,0);this.tone(990,1320,0.14,"square",0.08,0.08)}else if(kind==="lock"){this.tone(1250,240,0.34,"square",0.12,0)}else if(kind==="heavy"||kind==="godhand"){this.tone(220,36,0.5,"sawtooth",0.3,0);this.whoosh()}},bossHit(kind){if(!this.ctx||this.muted)return;if(kind==="stun"){this.noiseBurst(0.22,"lowpass",480,110,0.8,0.65,0);this.tone(96,34,0.3,"sine",0.8,0)}else if(kind==="acc"){this.noiseBurst(0.16,"lowpass",900,300,0.8,0.4,0);this.tone(520,180,0.14,"triangle",0.2,0)}else if(kind==="burn"){this.noiseBurst(0.4,"bandpass",500,1800,1,0.4,0)}else if(kind==="heavy"||kind==="godhand"){this.noiseBurst(0.34,"lowpass",600,90,0.8,0.8,0);this.tone(72,26,0.42,"sine",0.95,0)}else if(kind==="lock"){this.tone(340,170,0.2,"square",0.14,0)}},whoosh(){if(!this.ctx||this.muted)return;const t=this.ctx.currentTime;const len=Math.floor(this.ctx.sampleRate*0.13);const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/len);const src=this.ctx.createBufferSource();src.buffer=buf;const bp=this.ctx.createBiquadFilter();bp.type="bandpass";bp.Q.value=1.1;bp.frequency.setValueAtTime(1100,t);bp.frequency.exponentialRampToValueAtTime(320,t+0.13);const g=this.ctx.createGain();g.gain.value=0.16;src.connect(bp);bp.connect(g);g.connect(this.master);src.start(t)},whiff(){if(!this.ctx||this.muted)return;const t=this.ctx.currentTime;const len=Math.floor(this.ctx.sampleRate*0.09);const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/len);const src=this.ctx.createBufferSource();src.buffer=buf;const bp=this.ctx.createBiquadFilter();bp.type="bandpass";bp.Q.value=1.4;bp.frequency.setValueAtTime(1500,t);bp.frequency.exponentialRampToValueAtTime(500,t+0.09);const g=this.ctx.createGain();g.gain.value=0.09;src.connect(bp);bp.connect(g);g.connect(this.master);src.start(t)},coin(i){this.tone(1240+i*60,1240+i*60,0.07,"square",0.1,0);this.tone(1860+i*60,1860+i*60,0.12,"square",0.08,0.05)},pop(){this.tone(280,640,0.1,"sine",0.25,0)},ko(){this.tone(500,70,0.35,"sawtooth",0.18,0);this.tone(900,120,0.3,"sine",0.2,0.02)},hurt(){this.tone(150,55,0.2,"sawtooth",0.26,0);this.tone(95,45,0.26,"sine",0.3,0)},win(){const seq=[523,659,784,1046];for(let i=0;i<seq.length;i++)this.tone(seq[i],seq[i],0.13,"square",0.12,i*0.09)},lose(){this.tone(392,392,0.16,"square",0.13,0);this.tone(330,330,0.16,"square",0.13,0.15);this.tone(262,185,0.32,"square",0.13,0.3)},roar(){if(!this.ctx||this.muted)return;this.tone(150,38,0.75,"sawtooth",0.5,0);this.tone(105,32,0.85,"square",0.3,0.06);const t=this.ctx.currentTime;const len=Math.floor(this.ctx.sampleRate*0.6);const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const src=this.ctx.createBufferSource();src.buffer=buf;const lp=this.ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=300;const g=this.ctx.createGain();g.gain.value=0.5;src.connect(lp);lp.connect(g);g.connect(this.master);src.start(t)},buy(){this.tone(660,990,0.09,"square",0.12,0);this.tone(990,1320,0.1,"square",0.1,0.07)},levelup(){this.tone(523,523,0.1,"square",0.14,0);this.tone(659,659,0.1,"square",0.14,0.09);this.tone(784,1046,0.16,"square",0.14,0.18)}};const SAVE_KEY="theseHands.phase3.save.v2";const SAVE_SALT="th·sig·v3·9f2·slap";function saveSig(str){const s=SAVE_SALT+"|"+str+"|"+SAVE_SALT;let h1=2166136261,h2=2654435769;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,16777619);h2=Math.imul(h2^c+i,2246822507);h2=h2<<5|h2>>>27}return(h1>>>0).toString(16).padStart(8,"0")+(h2>>>0).toString(16).padStart(8,"0")}function wrapSave(json){return"TH3."+btoa(unescape(encodeURIComponent(json)))+"."+saveSig(json)}function unwrapSave(raw){if(typeof raw!=="string"||raw.indexOf("TH3.")!==0)return null;const rest=raw.slice(4),dot=rest.lastIndexOf(".");if(dot<0)return null;let json=null;try{json=decodeURIComponent(escape(atob(rest.slice(0,dot))))}catch(e){return null}return saveSig(json)===rest.slice(dot+1)?json:null}const OLD_SAVE_KEY="theseHands.phase1.save.v1";const BACKUP_KEY="theseHands_backup";function defaultAttrs(){return{power:0,speed:0,critChance:0,critDamage:0,defense:0,stun:0,combo:0,coinMult:0,accuracy:0,bossDamage:0,vampirism:0,luck:0}}function defaultStats(){return{damage:0,slaps:0,crits:0,heavies:0,ultimates:0,coinsEarned:0,fightsWon:0,fightsLost:0,bestCombo:0,fastestWin:0,playTime:0,giantKills:0,untouchableWins:0,offlineCoins:0,luckyHits:0,hardKills:0,frenzies:0,gemsEarned:0,bossKills:0,eliteKills:0,questsDone:0,chestsClaimed:0,chestBestDay:0,chestCycles:0,offlineClaims:0,precision:0}}function defaultDaily(){return{date:"",counters:{defeats:0,battleCoins:0,crits:0,hardClears:0,frenzies:0,buys:0},quests:[],claimed:[]}}function defaultChest(){return{lastClaim:"",cycleDay:0}}let lastStampMs=0;const SafeStore={ok:null,mem:Object.create(null),probe(){if(this.ok!==null)return this.ok;try{const k="__th_probe";localStorage.setItem(k,"1");localStorage.removeItem(k);this.ok=true}catch(e){this.ok=false}return this.ok},get(k){if(k==="__proto__"||k==="constructor"||k==="prototype")return null;if(this.probe()){try{return localStorage.getItem(k)}catch(e){this.ok=false}}return(k in this.mem)?this.mem[k]:null},set(k,v){if(k==="__proto__"||k==="constructor"||k==="prototype")return;if(this.probe()){try{localStorage.setItem(k,v);return}catch(e){this.ok=false}}this.mem[k]=String(v)},remove(k){if(this.probe()){try{localStorage.removeItem(k)}catch(e){this.ok=false}}delete this.mem[k]}};const Save={corrupted:false,load(){let raw=null;try{raw=SafeStore.get(SAVE_KEY)}catch(e){}if(raw){try{let json=raw;if(raw.indexOf("TH3.")===0){json=unwrapSave(raw);if(json==null)throw new Error("save signature invalid")}const s=JSON.parse(json);if(s&&typeof s.coins==="number"&&s.attrs&&typeof s.level==="number")return s;throw new Error("save shape invalid")}catch(e){try{SafeStore.set(BACKUP_KEY,raw)}catch(e2){}this.corrupted=true}}try{const rawOld=SafeStore.get(OLD_SAVE_KEY);if(rawOld){const o=JSON.parse(rawOld);if(typeof o.coins==="number"&&typeof o.kills==="number"){const defeated=[];for(let i=0;i<Math.min(o.kills,ENEMIES.length);i++)defeated.push(i);return{coins:o.coins,kills:o.kills,level:1,attrs:defaultAttrs(),unlocked:Math.min(ENEMIES.length,o.kills+1),defeated,current:Math.min(o.kills,ENEMIES.length-1)}}}}catch(e){}return null},store(keepStamp){if(typeof window!=="undefined"&&window.__thImportLock)return;try{SafeStore.set(SAVE_KEY,wrapSave(JSON.stringify({version:3,coins:G.totalCoins,kills:G.kills,level:G.level,attrs:G.attrs,unlocked:G.unlocked,defeated:Array.from(G.defeated),current:G.current,panelOpen:!!G.panelOpen,skills:G.skills,stats:G.stats,records:G.enemyRecords,achievements:G.achievements,claimedAchievements:G.claimedAchievements||[],gauntletCleared:G.gauntletCleared||[],bossRush:G.bossRush||{clears:0,best:0},endlessBest:G.endlessBest||0,weakHintDone:!!G.weakHintDone,tutorialDone:!!G.tutorialDone,gems:G.gems,skin:G.skin,ownedSkins:G.ownedSkins,groupRewards:G.groupRewards,collectionReward:!!G.collectionReward,bundlesOwned:G.bundlesOwned,hardCleared:Array.from(G.hardCleared),gameCompleted:!!G.gameCompleted,dragonMilestone:!!G.dragonMilestone,offlineUnlocked:!!G.offlineUnlocked,vipUnlocked:!!G.vipUnlocked,frenzyBoostUnlocked:!!G.frenzyBoostUnlocked,settings:G.settings,daily:G.daily,chest:G.chest,seenIntro:!!G.seenIntro,purchases:G.purchases,specials:G.specials,autoAdvance:!!G.autoAdvance,adCoinBoostUntil:G.adCoinBoostUntil||0,adDmgBoostUntil:G.adDmgBoostUntil||0,frenzyMeter:Math.round(G.frenzyMeter),lastSeen:keepStamp&&lastStampMs?lastStampMs:lastStampMs=Date.now(),pendingOffline:G.pendingOffline||null})))}catch(e){}},clear(){try{SafeStore.remove(SAVE_KEY);SafeStore.remove(OLD_SAVE_KEY);SafeStore.remove(BACKUP_KEY)}catch(e){}}};

  
"use strict";
const SKILL_ICONS={basic:{palette:{f:"#f0a868",w:"#3a4a63"},map:[".f..f..f..f.",".f..f..f..f.",".f..f..f.f..",".ffffffffff.",".ffffffffff.",".ffffffffff.","..ffffffff..","..ffffffff..","...ffffff...","...ffffff...","....wwww....","....wwww...."]},secondHand:{palette:{f:"#f0a868",w:"#3a4a63"},map:[".ff...ff....","ffff.ffff...","ffff.ffff...","ffff.ffff...",".ff...ff....",".ww...ww...."]},strongerHands:{palette:{f:"#f0a868",w:"#3a4a63"},map:["..ffff......",".ffffff.....","ffffffff....","ffffffff....",".ffffff.....","..ffff......","...ww.......","...ww......."]},quickReflexes:{palette:{b:"#f2b01e"},map:[".....bb.....","....bbb.....","...bbb......","..bbbbbb....","....bbb.....","...bbb......","..bbb.......",".bbb........",".bb........."]},criticalSlaps:{palette:{s:"#f2b01e"},map:[".....s......","....sss.....","sssssssssss.",".sssssssss..","..sssssss...","...sssss....","...ss.ss....","..ss...ss..."]},heavySlap:{palette:{y:"#ffcf3f",o:"#ef7d1a",r:"#d63c30"},map:[".....y......","....yo......","....yoo.....","...yooo.....","..yoroo.....","..orroo.....",".orrooro....",".orrrro.....","..orro......","...oo......."]},onTarget:{palette:{r:"#d63c30",w:"#f7f3e8"},map:["...rrrr.....","..r....r....",".r..ww..r...",".r.wrrw.r...",".r.wrrw.r...",".r..ww..r...","..r....r....","...rrrr....."]},staminaTraining:{palette:{h:"#d63c30"},map:[".hh..hh.....","hhhhhhhh....","hhhhhhhh....",".hhhhhh.....","..hhhh......","...hh......."]},comboMastery:{palette:{s:"#7a5aa0"},map:["..ssss......",".s....s.....","s..ss..s....","s.s..s.s....","s.s.ss.s....",".s....s.....","..ssss......"]},dualHand:{palette:{f:"#f0a868",w:"#3a4a63"},map:[".ff..ff.....","ffff.ffff...","ffff.ffff...",".ff...ff....",".ww...ww...."]},bossHunter:{palette:{g:"#f2b01e"},map:[".g..gg..g...",".gg.gggg.gg.",".ggggggggg..","..ggggggg...","..ggggggg..."]},coinMagnet:{palette:{r:"#d63c30",w:"#f7f3e8"},map:[".rr....rr...",".rr....rr...",".rr....rr...",".rr....rr...",".rrr..rrr...","..rrrrrr....",".ww....ww..."]},rapidBarrage:{palette:{c:"#3f6fb5"},map:[".c....c....c",".c....c....c","..c....c..c.","..c....c..c.","...c....c...","...c....c..."]},unstoppable:{palette:{s:"#3f6fb5"},map:[".sssssss....","sssssssss...","sssssssss...",".sssssss....","..sssss.....","...sss......","....s......."]},goldenTouch:{palette:{g:"#b97e08",w:"#ffcf3f"},map:["..gggggg....",".ggwwwwgg...",".gwwggwwg...",".gwwggwwg...",".ggwwwwgg...","..gggggg...."]},ultimateSlap:{palette:{r:"#ef7d1a",y:"#ffcf3f"},map:[".r..rr..r...","..r.yy.r....","...yyyy.....",".ryyyyyyr...",".ryyyyyyr...","...yyyy.....","..r.yy.r....",".r..rr..r..."]},frenzy:{palette:{o:"#ef7d1a",r:"#d63c30",y:"#ffcf3f"},map:[".....o......","....oyo.....","....oyo.....","...oyyo.....","...oyyr.....","..oyyrr.....","..oyrrr.....",".oyrrrr.....",".oyrrrr.....","..rrrr......","...rr.......","..rr........"]}};const ACH_ICONS={firstKo:{palette:{f:"#f2b01e",w:"#b97e08"},map:SKILL_ICONS.strongerHands.map},slapMachine:{palette:{f:"#f0a868",w:"#3a4a63"},map:SKILL_ICONS.basic.map},slapStorm:{palette:{b:"#3f6fb5"},map:SKILL_ICONS.quickReflexes.map},heavyHitter:{palette:{y:"#ffcf3f",o:"#ef7d1a",r:"#d63c30"},map:SKILL_ICONS.heavySlap.map},millionClub:{palette:{r:"#b97e08",y:"#f2b01e"},map:SKILL_ICONS.ultimateSlap.map},comboKing:{palette:{s:"#d63c30"},map:SKILL_ICONS.comboMastery.map},critHappens:{palette:{s:"#ef7d1a"},map:SKILL_ICONS.criticalSlaps.map},giantSlayer:{palette:{g:"#b97e08"},map:SKILL_ICONS.bossHunter.map},groupGraduate:{palette:{s:"#43b04c"},map:SKILL_ICONS.unstoppable.map},richHands:{palette:{g:"#b97e08",w:"#ffcf3f"},map:SKILL_ICONS.goldenTouch.map},dragonSlayer:{palette:{y:"#ef7d1a",o:"#d63c30",r:"#8f1f16"},map:SKILL_ICONS.heavySlap.map},seventyFive:{palette:{c:"#39c2d8"},map:SKILL_ICONS.rapidBarrage.map},centurySlayer:{palette:{g:"#f2b01e",w:"#ffcf3f"},map:SKILL_ICONS.goldenTouch.map},almightyHand:{palette:{f:"#f7d9a0",w:"#ffd23e"},map:SKILL_ICONS.basic.map},hard25:{palette:{s:"#d63c30"},map:SKILL_ICONS.unstoppable.map},hard50:{palette:{y:"#ffcf3f",o:"#ef7d1a",r:"#8f1f16"},map:SKILL_ICONS.heavySlap.map},hard100:{palette:{y:"#ff5347",o:"#8f1f16",r:"#5e130d"},map:SKILL_ICONS.ultimateSlap.map},untouchable:{palette:{s:"#7fb2e0"},map:SKILL_ICONS.unstoppable.map}};SKILL_ICONS.parry={palette:{b:"#3a7bd5",w:"#ffffff"},map:[".bbbbbbbb..","bbbbbbbbbb.","bb.wwww.bb.","bb.w..w.bb.","bb.w..w.bb.","bb.wwww.bb.","bb......bb.",".bbbbbbbb..","..bbbbbb..."]};SKILL_ICONS.precisionInstinct={palette:{r:"#ffd23e",w:"#d63c30"},map:SKILL_ICONS.onTarget.map};
SKILL_ICONS.dizzyPunisher={palette:{y:"#f4b426",r:"#d63c30"},map:[".rrrrrrrr..","rr.yyyy.rr.","r.y....y.r.","r.y.yy.y.r.","r.y....y.r.","rr.yyyy.rr.",".rrrrrrrr.."]};
SKILL_ICONS.clutchSurge={palette:{r:"#e83f3f",w:"#ffffff"},map:[".rrr..rrr..","rrrrrrrrrrr","rrrrrrrrrrr",".rrrrrrrrr.","..rrrrrrr..","...rrrrr...","....rrr....",".....r....."]};
SKILL_ICONS.kineticShield={palette:{c:"#00e5ff",w:"#ffffff"},map:[".cccccccc..","cc.wwww.cc.","c.w....w.c.","c.w....w.c.","c.w....w.c.","cc.wwww.cc.",".cccccccc.."]};
SKILL_ICONS.echoStrike={palette:{y:"#f4b426",w:"#ffffff"},map:[".yyy...yyy.","yyyy...yyyy",".yyy...yyy.","..yyy.yyy..","...yyyyy...","....yyy...."]};
SKILL_ICONS.titanSlayer={palette:{d:"#b82323",w:"#ffffff"},map:[".dddddddd..","dddddddddd.","dd..dd..dd.","dd..dd..dd.","dddddddddd.",".dddddddd.."]};
SKILL_ICONS.ironWill={palette:{g:"#8d99ae",w:"#edf2f4"},map:[".gggggggg..","gggggggggg.","gg.wwww.gg.","gg.wwww.gg.","gg.wwww.gg.","gggggggggg.",".gggggggg.."]};
const ABILITY_ICONS={ironPalm:{palette:{f:"#d89a55",w:"#7a4a21"},map:SKILL_ICONS.strongerHands.map},quickening:{palette:{b:"#39c2d8"},map:SKILL_ICONS.quickReflexes.map},thickSkin:{palette:{s:"#b0653a"},map:SKILL_ICONS.unstoppable.map},greed:{palette:{g:"#b97e08",w:"#ffcf3f"},map:SKILL_ICONS.goldenTouch.map},vampireSlap:{palette:{h:"#a52a5e"},map:SKILL_ICONS.staminaTraining.map},critSurge:{palette:{s:"#ef7d1a"},map:SKILL_ICONS.criticalSlaps.map},secondWind:{palette:{s:"#39c2d8"},map:SKILL_ICONS.comboMastery.map},bossBane:{palette:{g:"#d63c30"},map:SKILL_ICONS.bossHunter.map},goldenAura:{palette:{r:"#f2b01e",y:"#ffedb0"},map:SKILL_ICONS.ultimateSlap.map},counterCadence:{palette:{b:"#e05030",w:"#ffb03a"},map:SKILL_ICONS.parry.map},battleFocus:{palette:{r:"#6a40bf",y:"#39c2d8"},map:SKILL_ICONS.dizzyPunisher.map},toughGrit:{palette:{r:"#8b5a2b",w:"#dfd1b8"},map:SKILL_ICONS.clutchSurge.map},overcharge:{palette:{y:"#2da0d8",w:"#ffe066"},map:SKILL_ICONS.echoStrike.map},giantStature:{palette:{d:"#4a7c59",w:"#e9dcc3"},map:SKILL_ICONS.titanSlayer.map},swiftRecovery:{palette:{b:"#3a9ebd",w:"#ffffff"},map:SKILL_ICONS.quickReflexes.map},midasStrike:{palette:{g:"#d4af37",w:"#fff2a3"},map:SKILL_ICONS.goldenTouch.map},ironResolve:{palette:{s:"#708090",w:"#e6f2ff"},map:SKILL_ICONS.unstoppable.map},executioner:{palette:{r:"#b02020",o:"#ff7a1a",y:"#ffd23e",w:"#ffffff"},map:SKILL_ICONS.heavySlap.map},godhandAwakening:{palette:{r:"#f2b01e",y:"#ffedb0",g:"#ffd700",w:"#ffffff"},map:SKILL_ICONS.ultimateSlap.map},mastery:{palette:{g:"#f2b01e"},map:SKILL_ICONS.bossHunter.map}};const ACH_ICON_FALLBACK={palette:{g:"#f2b01e",w:"#ffcf3f"},map:SKILL_ICONS.goldenTouch.map};const ICON_URLS={};function iconUrl(kind,id){const key=kind+":"+id;if(!ICON_URLS[key]){const def=kind==="skill"?(SKILL_ICONS[id]||SKILL_ICONS.basic):kind==="ability"?ABILITY_ICONS[id]:ACH_ICONS[id]||ACH_ICON_FALLBACK;ICON_URLS[key]=renderSprite({palette:def.palette,map:def.map},false).toDataURL()}return ICON_URLS[key]}const TREE_POS={basic:[50,93],secondHand:[26,75],staminaTraining:[50,75],strongerHands:[74,75],onTarget:[14,57],quickReflexes:[34,57],parry:[50,57],criticalSlaps:[66,57],heavySlap:[86,57],precisionInstinct:[76,57],comboMastery:[14,40],dizzyPunisher:[34,40],clutchSurge:[50,40],coinMagnet:[66,40],bossHunter:[86,40],echoStrike:[14,23],dualHand:[34,23],unstoppable:[44,23],kineticShield:[56,23],goldenTouch:[66,23],frenzy:[78,23],titanSlayer:[90,23],rapidBarrage:[24,7],aegisBulwark:[50,7],ultimateSlap:[76,7]};const SKILL_CATS={basic:"Basic",secondHand:"Agility",quickReflexes:"Agility",dualHand:"Agility",rapidBarrage:"Agility",onTarget:"Combo",comboMastery:"Combo",echoStrike:"Combo",dizzyPunisher:"Tactics",staminaTraining:"Defense",parry:"Defense",clutchSurge:"Defense",unstoppable:"Defense",kineticShield:"Defense",aegisBulwark:"Defense",strongerHands:"Damage",heavySlap:"Damage",criticalSlaps:"Damage",bossHunter:"Damage",titanSlayer:"Damage",ultimateSlap:"Damage",coinMagnet:"Economy",goldenTouch:"Economy",frenzy:"Special",precisionInstinct:"Tactics"};const TREE_PILLARS=[{name:"⚡ AGILITY & COMBO",x:18,y:1.5},{name:"🛡 DEFENSE & BULWARK",x:50,y:1.5},{name:"💥 POWER & BOUNTY",x:82,y:1.5}];function hasSkill(id){if(id==="ironWill")id="aegisBulwark";return G.skills.indexOf(id)>=0||(id==="aegisBulwark"&&G.skills.indexOf("ironWill")>=0)}function abilityDef(id){return CONFIG.levelAbilities.find((x)=>x.id===id)||null}function hasAbility(id){const d=abilityDef(id);return!!d&&G.level>=d.level}function masteryMult(){return 1+CONFIG.abilityFx.masteryPer*Math.max(0,G.level-20)}function skinBonus(stat){const d=skinDef();const b=d.bonus;if(b&&b.stat===stat)return b.amt;const b2=d.bonus2;return b2&&b2.stat===stat?b2.amt:0}function stats(){const a=G.attrs,b=CONFIG.playerBase,f=CONFIG.fx,sf=CONFIG.skillFx,af=CONFIG.abilityFx;const attrInterval=Math.max(f.speedFloor,b.attackInterval*Math.pow(f.speedPerLevel,a.speed));const fz=G.frenzyT>0?CONFIG.frenzy:null;return{damage:(b.damage+(a.power||0)*2)*Math.pow(f.powerGrowth||1,a.power||0)*(hasSkill("strongerHands")?sf.strongerDmg:1)*(hasAbility("ironPalm")?af.ironPalm:1)*(hasAbility("godhandAwakening")?af.godhandDmg:1)*masteryMult()*(fz?fz.dmgMult:1)*(1+skinBonus("dmg"))*(G.adDmgBoostUntil>Date.now()?2:1),interval:Math.max(0.15,attrInterval*(hasSkill("quickReflexes")?sf.quickSpeed:1)*(hasSkill("dualHand")?sf.dualSpeed:1)*(hasAbility("quickening")?af.quickening:1)*(hasAbility("godhandAwakening")?af.godhandSpeed:1)*((G.swiftRecoveryT||0)>0?af.swiftRecoverySpeed:1)*(hasSkill("clutchSurge")&&G.playerHp/playerMaxHp()<=0.35?0.8:1)*(fz?1/fz.speedMult:1)*(1-skinBonus("speed"))),critChance:b.critChance+f.critChancePerLevel*a.critChance+(hasSkill("criticalSlaps")?sf.critSlaps:0)+(hasAbility("critSurge")?af.critSurge:0)+skinBonus("crit"),critMult:b.critMult+f.critDamagePerLevel*a.critDamage,comboPer:f.comboPerStackPerLevel*a.combo+(hasSkill("comboMastery")?sf.comboMasteryPer:0),comboMax:(a.combo>0?f.comboBaseStacks+Math.round(a.combo*0.4):0)+(hasSkill("comboMastery")?sf.comboMasteryStacks:0),coinMult:(1+f.coinPerLevel*a.coinMult)*(hasSkill("coinMagnet")?sf.magnetCoins:1)*(hasSkill("goldenTouch")?sf.goldenCoins:1)*(hasAbility("greed")?af.greed:1)*(hasAbility("goldenAura")?af.goldenAura:1)*(1+skinBonus("coins"))*(G.vipUnlocked?1.25:1)*(G.adCoinBoostUntil>Date.now()?2:1),hitChance:Math.min(f.accuracyCap,f.accuracyBase+f.accuracyPerLevel*(a.accuracy||0)),bossDmgMult:(1+Math.min(0.30,(f.bossDmgPerLevel||0.006)*(a.bossDamage||0)))*(hasAbility("bossBane")?af.bossBane:1),luckChance:(f.luckPerLevel||0.008)*(a.luck||0)+skinBonus("luck"),specialChance:0,stunChance:Math.min(f.stunChanceCap||0.30,(f.stunChanceBase||0.05)+(f.stunChancePerLevel||0.00556)*(a.stun||0)+(hasAbility("battleFocus")&&G.comboStack>=8?af.battleFocusStun:0)),stunDuration:Math.min(f.stunDurCap||1.40,(f.stunDurBase||0.5)+(f.stunDurPerLevel||0.06)*(a.stun||0)),stunDur:Math.min(f.stunDurCap||1.40,(f.stunDurBase||0.5)+(f.stunDurPerLevel||0.06)*(a.stun||0)),damageReduction:Math.min(f.defenseCap||0.50,(f.defensePerLevel||0.01)*(a.defense||0))}}function attrCost(key){const d=CONFIG.attrs[key];if(!d)return 999999;let raw=Math.round(d.baseCost*Math.pow(d.growth,G.attrs[key]||0));if(key==="speed"&&d.maxLevel){const prog=(G.attrs[key]||0)/d.maxLevel;if(prog>=0.6)raw=Math.round(raw*(1+(CONFIG.fx.speedCostLateMult||3)*Math.pow(prog,CONFIG.fx.speedCostLatePow||6)))}return raw;}function attrLevelGate(){return G.level*CONFIG.capPerLevel}function attrPermanentMax(key){return(CONFIG.attrs[key]&&CONFIG.attrs[key].maxLevel)||999}function attrEffectiveCap(key){return Math.min(attrPermanentMax(key),attrLevelGate())}function attrCap(key){return key?attrEffectiveCap(key):attrLevelGate()}function levelUpCost(){if(CONFIG.levelCap&&G.level>=CONFIG.levelCap)return Infinity;const L=CONFIG.levelUp,lv=G.level,ls=L.lateStart||4,ts=L.tailStart||25;if(lv<=ls)return Math.round(L.base*Math.pow(L.growth,lv-1));if(lv<=ts)return Math.round(L.base*Math.pow(L.growth,ls-1)*Math.pow(L.lateGrowth||L.growth,lv-ls));return Math.round(L.base*Math.pow(L.growth,ls-1)*Math.pow(L.lateGrowth||L.growth,ts-ls)*Math.pow(L.tailGrowth||L.lateGrowth||L.growth,lv-ts))}function playerMaxHp(){return Math.round((CONFIG.playerHp.base+CONFIG.playerHp.perLevel*(G.level-1)+(hasSkill("staminaTraining")?CONFIG.skillFx.staminaHp:0)+(hasSkill("unstoppable")?CONFIG.skillFx.unstoppableHp:0)+(hasAbility("giantStature")?CONFIG.abilityFx.giantStatureHp:0))*(1+skinBonus("hp")))}const PFX={stunT:0,accT:0,slowT:0,slowAmt:0,lockT:0,burnT:0,burnPer:0,burnTickT:0};let bossFx=null;let voidCrits=0;
function cycleInterval(){const iv=stats().interval/(hasSkill("secondHand")?2:1);return PFX.slowT>0?iv/(1-PFX.slowAmt):iv}const DamageCalculator={roll(kind){const st=stats(),sf=CONFIG.skillFx;const comboMult=1+Math.min(G.comboStack,st.comboMax)*st.comboPer;let tag="normal",mult=1,crit=false;if(kind==="special"){crit=Math.random()<st.critChance;if(crit)tag="crit"}else if(kind!=="barrage"){if(G.ultReady&&hasSkill("ultimateSlap")){tag="ultimate";mult=sf.ultMult}else if(hasSkill("heavySlap")&&Math.random()<sf.heavyChance){tag="heavy";mult=sf.heavyMult}else{crit=voidCrits>0?(voidCrits--,true):Math.random()<st.critChance;if(crit)tag="crit"}}let dmg=st.damage*comboMult*mult*(crit?st.critMult:1);if(hasSkill("bossHunter")&&G.enemy&&G.enemy.elite)dmg*=sf.bossMult;if(hasAbility("bossBane")&&G.enemy&&(G.enemy.elite||G.enemy.boss))dmg*=CONFIG.abilityFx.bossBane;if(G.enemy&&(G.enemy.elite||G.enemy.boss))dmg*=st.bossDmgMult*(1+skinBonus("boss"));if(kind==="barrage")dmg*=sf.barrageMult;return{damage:Math.max(1,Math.round(dmg)),crit,tag}},theoreticalDPS(){const st=stats(),sf=CONFIG.skillFx;const comboMult=1+Math.min(G.comboStack,st.comboMax)*st.comboPer;const pH=hasSkill("heavySlap")?sf.heavyChance:0;let per=st.damage*comboMult*((1-pH)*(1+st.critChance*(st.critMult-1))+pH*sf.heavyMult);if(hasSkill("bossHunter")&&G.enemy&&G.enemy.elite)per*=sf.bossMult;if(hasAbility("bossBane")&&G.enemy&&(G.enemy.elite||G.enemy.boss))per*=CONFIG.abilityFx.bossBane;if(G.enemy&&(G.enemy.elite||G.enemy.boss))per*=st.bossDmgMult*(1+skinBonus("boss"));if(hasSkill("rapidBarrage"))per*=1+sf.barrageHits*sf.barrageMult/sf.barrageEvery;per*=1+st.luckChance*(CONFIG.fx.luckDmgMult-1);per*=1+st.specialChance;return per*st.hitChance/cycleInterval()}};var SKIN_ART=null;var HAND_MAIN=null,HAND_SLEEP=null;function skinDef(id){return CONFIG.skins.find((s)=>s.id===(id||G.skin))||CONFIG.skins[0]}function greyCopyOf(src){const g=document.createElement("canvas");g.width=src.width;g.height=src.height;const gx=g.getContext("2d");gx.drawImage(src,0,0);try{const id=gx.getImageData(0,0,g.width,g.height),d=id.data;for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const lum=0.35*d[i]+0.45*d[i+1]+0.2*d[i+2];d[i]=(d[i]*0.35+lum*0.65)*0.74+10;d[i+1]=(d[i+1]*0.35+lum*0.65)*0.74+11;d[i+2]=(d[i+2]*0.35+lum*0.65)*0.74+16}gx.putImageData(id,0,0)}catch(e){}return g}function buildSkinArt(){if(!HAND_SPRITE||SKIN_ART)return;SKIN_ART={};SKIN_ART.classic={main:HAND_SPRITE,asleep:HAND_ASLEEP,url:null};for(const sk of CONFIG.skins){if(!sk.sprite)continue;SKIN_ART[sk.id]={main:null,asleep:null,url:sk.sprite,loading:false}}ensureSkinArt(G.skin);applySkinVisuals();if(typeof G==="object"&&G.tab==="shop")renderShop()}function ensureSkinArt(id){const entry=SKIN_ART&&SKIN_ART[id];if(!entry||entry.main||entry.loading||!entry.url)return;entry.loading=true;const img=new Image;img.onload=()=>{const c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext("2d").drawImage(img,0,0);entry.main=c;entry.asleep=greyCopyOf(c);entry.loading=false;applySkinVisuals();if(typeof G==="object"&&G.tab==="shop")renderShop()};img.onerror=()=>{entry.loading=false};setTimeout(()=>{entry.loading=false},6000);img.src=entry.url}function preloadAllSkins(){if(SKIN_ART)for(const id in SKIN_ART)ensureSkinArt(id)}function skinUrl(id){const sk=skinDef(id);if(sk.sprite)return sk.sprite;const art=SKIN_ART&&SKIN_ART[id];if(!art||!art.main)return HAND_URI;if(!art.url){try{art.url=art.main.toDataURL()}catch(err){art.url=HAND_URI}}return art.url}function applySkinVisuals(){const sk=skinDef();const art=SKIN_ART&&SKIN_ART[sk.id];HAND_MAIN=art&&art.main||HAND_SPRITE;HAND_SLEEP=art&&art.asleep||HAND_ASLEEP;const url=skinUrl(sk.id),size=sk.size||1;const mh=$("menuHand"),hl=$("hubHandL"),hr=$("hubHandR");if(mh){mh.src=url;mh.style.width=Math.round(38*size)+"%";mh.style.height="auto"}if(hl){hl.src=url;hl.style.width=Math.round(100*size)+"%"}if(hr){hr.src=url;hr.style.width=Math.round(100*size)+"%"}}const G={autoAdvance:false,adCoinBoostUntil:0,adDmgBoostUntil:0,adRewardClaimed:false,pendingAdDoubleCoins:0,running:true,phase:"fighting",phaseT:0,playerHp:100,enemyAtkT:0,fightTime:0,bestCombo:0,lastVictory:null,over:null,playerFlashT:0,pendingRespawn:false,totalCoins:0,shownCoins:0,kills:0,level:1,attrs:defaultAttrs(),skills:["basic"],slapHand:"R",slapCount:0,procCount:0,barrage:0,barrageT:0,ultCharge:0,ultReady:false,hitStop:0,lostLast:false,unlocked:1,defeated:new Set,current:0,enemy:null,comboStack:0,missStreak:0,slapT:0,damageDone:false,time:0,shake:0,tab:"home",menuOpen:true,gems:0,skin:"classic",ownedSkins:["classic"],groupRewards:[],gauntletCleared:[],bossRush:{clears:0,best:0},endlessBest:0,fightMode:null,carryHp:null,modeAdvance:false,weak:null,weakHintDone:false,tutorialDone:false,pendingTutorial:false,collectionReward:false,pendingGroupToast:null,bundlesOwned:[],hardCleared:new Set,hardMode:false,pendingOffline:null,offlineUnlocked:false,vipUnlocked:false,frenzyBoostUnlocked:false,specials:{},frenzyMeter:0,frenzyT:0,frenzyFlashT:0,daily:defaultDaily(),chest:defaultChest(),seenIntro:false,purchases:[],settings:{music:true,sfx:true},freshOnReturn:false,gameCompleted:false,dragonMilestone:false,secondWindUsed:false,levelUpHold:false,fightFlashT:0,swFlashT:0,doubleFlashT:0,heals:[],selectedSkill:null,wikiDetail:null,stats:defaultStats(),enemyRecords:{},achievements:[],fightHitCoins:0,fightBonus:0,fightDamageTaken:0,coinsDirty:false,panelOpen:false,leftTwitchAt:3,leftTwitchT:-1,zzz:[],dmgNums:[],coinsFx:[],impacts:[],poofs:[],frags:[],bursts:[],claws:[],venomT:0,voidT:0,dmgLog:[],coinNums:[]};const ACHIEVEMENTS=[{id:"firstKo",name:"First Knockout",desc:"Win your first fight.",target:1,gems:1,cat:"Victories",val:()=>G.kills},{id:"slapMachine",name:"Slap Machine",desc:"Land 500 slaps.",target:500,gems:2,cat:"Slaps",val:()=>G.stats.slaps},{id:"slapStorm",name:"Slap Storm",desc:"Land 5,000 slaps.",target:5000,gems:3,cat:"Slaps",val:()=>G.stats.slaps},{id:"heavyHitter",name:"Heavy Hitter",desc:"Deal 100,000 total damage.",target:1e5,gems:3,cat:"Damage",val:()=>Math.floor(G.stats.damage)},{id:"millionClub",name:"Million Club",desc:"Deal 1,000,000 total damage.",target:1e6,gems:5,cat:"Damage",val:()=>Math.floor(G.stats.damage)},{id:"comboKing",name:"Combo King",desc:"Reach a x25 combo.",target:25,gems:2,cat:"Frenzy & Combo",val:()=>G.stats.bestCombo},{id:"critHappens",name:"Crit Happens",desc:"Land 100 critical slaps.",target:100,gems:2,cat:"Crits & Luck",val:()=>G.stats.crits},{id:"giantSlayer",name:"Giant Slayer",desc:"Defeat any Giant enemy.",target:1,gems:3,cat:"Bosses & Elites",val:()=>G.stats.giantKills},{id:"groupGraduate",name:"Group Graduate",desc:"Defeat every enemy in any one group.",target:1,gems:3,cat:"Collection",val:()=>{for(let g=0;g<GROUPS.length;g++){let n=0;for(let k=0;k<5;k++)if(G.defeated.has(g*5+k))n++;if(n===5)return 1}return 0}},{id:"richHands",name:"Rich Hands",desc:"Earn 10,000 coins all-time.",target:1e4,gems:4,cat:"Riches",val:()=>G.stats.coinsEarned},{id:"dragonSlayer",name:"Dragon Slayer",desc:"Defeat the Final Dragon Boss.",target:1,gems:5,cat:"Bosses & Elites",val:()=>G.defeated.has(49)?1:0},{id:"seventyFive",name:"75 Down",desc:"Defeat 75 different enemies.",target:75,gems:5,cat:"Victories",val:()=>G.defeated.size},{id:"centurySlayer",name:"Grand Champion",desc:"Defeat all 50 enemies.",target:50,gems:10,cat:"Victories",val:()=>G.defeated.size},{id:"almightyHand",name:"The Almighty Hand",desc:"Defeat The Almighty Hand.",target:1,gems:15,cat:"Bosses & Elites",val:()=>G.defeated.has(ENEMIES.length-1)?1:0},{id:"hard25",name:"Hard 25",desc:"Clear 25 Hard Mode fights.",target:25,gems:3,cat:"Hard Mode",val:()=>G.hardCleared.size},{id:"hard50",name:"Hard 50",desc:"Clear 50 Hard Mode fights.",target:50,gems:5,cat:"Hard Mode",val:()=>G.hardCleared.size},{id:"hard100",name:"Hard Mastery",desc:"Clear all 50 Hard Mode fights.",target:50,gems:10,cat:"Hard Mode",val:()=>G.hardCleared.size},{id:"untouchable",name:"Untouchable",desc:"Win a fight without taking any damage.",target:1,gems:2,cat:"Victories",val:()=>G.stats.untouchableWins}];const ACH_LADDERS=[["defeats","Victories",()=>G.defeated.size,[[5,"High Five","Defeat 5 different enemies.",1],[10,"Double Digits","Defeat 10 different enemies.",2],[20,"Twenty Toppled","Defeat 20 different enemies.",3],[30,"Thirty Slapped","Defeat 30 different enemies.",3],[40,"Road Warrior","Defeat 40 different enemies.",4],[50,"Halfway There","Defeat 50 different enemies.",5],[80,"Eighty Down","Defeat 80 different enemies.",6],[90,"Almost Everyone","Defeat 90 different enemies.",8]]],["kos","Victories",()=>G.kills,[[10,"Getting Warm","Win 10 fights.",1],[50,"Fifty Wins","Win 50 fights.",2],[1000,"Thousand Wins","Win 1,000 fights.",5],[5000,"Arena Legend","Win 5,000 fights.",8],[1e4,"Ten Thousand","Win 10,000 fights.",9]]],["slaps","Slaps",()=>G.stats.slaps,[[100,"Warm Palms","Land 100 slaps.",1],[1000,"Busy Hands","Land 1,000 slaps.",2],[1e4,"Slap Blizzard","Land 10,000 slaps.",4],[1e5,"The Million Slap March","Land 100,000 slaps.",9]]],["damage","Damage",()=>Math.floor(G.stats.damage),[[1e4,"Real Dent","Deal 10,000 total damage.",2],[500000,"Half Million","Deal 500,000 total damage.",4],[5000000,"Five Million","Deal 5,000,000 total damage.",6],[50000000,"Fifty Million","Deal 50,000,000 total damage.",8],[500000000,"Half Billion","Deal 500,000,000 total damage.",12]]],["crits","Crits & Luck",()=>G.stats.crits,[[500,"Crit Hobbyist","Land 500 critical slaps.",2],[2500,"Crit Habit","Land 2,500 critical slaps.",4],[1e4,"Crit Connoisseur","Land 10,000 critical slaps.",7]]],["heavies","Heavy & Ultimate",()=>G.stats.heavies,[[100,"Sledgehammer","Land 100 HEAVY slaps.",3],[500,"Demolition Crew","Land 500 HEAVY slaps.",5],[2500,"Wrecking Ball","Land 2,500 HEAVY slaps.",9]]],["ults","Heavy & Ultimate",()=>G.stats.ultimates,[[50,"Ultimate Regular","Land 50 ULTIMATE slaps.",4],[250,"Ultimate Storm","Land 250 ULTIMATE slaps.",8]]],["lucky","Crits & Luck",()=>G.stats.luckyHits||0,[[25,"Lucky Break","Land 25 LUCKY hits.",2],[100,"Four-Leaf Palms","Land 100 LUCKY hits.",4],[500,"Born Lucky","Land 500 LUCKY hits.",8]]],["frenzy","Frenzy & Combo",()=>G.stats.frenzies||0,[[10,"Frenzy Starter","Trigger FRENZY 10 times.",2],[50,"Frenzy Habit","Trigger FRENZY 50 times.",4],[200,"Frenzy Fiend","Trigger FRENZY 200 times.",8]]],["combo","Frenzy & Combo",()=>G.stats.bestCombo,[[50,"Combo x50","Reach a x50 combo.",3],[75,"Combo x75","Reach a x75 combo.",5],[100,"Combo x100","Reach a x100 combo.",9]]],["coins","Riches",()=>G.stats.coinsEarned,[[50000,"Coin Collector","Earn 50,000 coins all-time.",3],[1e6,"Millionaire Hands","Earn 1,000,000 coins all-time.",5],[25000000,"Coin Magnate","Earn 25,000,000 coins all-time.",9],[500000000,"Coin Emperor","Earn 500,000,000 coins all-time.",12]]],["gemsEarned","Riches",()=>G.stats.gemsEarned||0,[[100,"Gem Hoard","Earn 100 gems all-time.",4],[300,"Gem Vault","Earn 300 gems all-time.",7],[800,"Gem Tycoon","Earn 800 gems all-time.",9]]],["hardClears","Hard Mode",()=>G.hardCleared.size,[[1,"First Hard Clear","Clear 1 HARD fight.",2],[5,"Hard Five","Clear 5 HARD fights.",3],[10,"Hard Ten","Clear 10 HARD fights.",4]]],["hardKos","Hard Mode",()=>G.stats.hardKills||0,[[250,"Hard Grinder","Win 250 HARD fights.",7]]],["bossKills","Bosses & Elites",()=>G.stats.bossKills||0,[[1,"Boss Breaker","Defeat a boss.",2],[5,"Boss Hunter","Defeat bosses 5 times.",5],[10,"Boss Regular","Defeat bosses 10 times.",6]]],["eliteKills","Bosses & Elites",()=>G.stats.eliteKills||0,[[50,"Elite Menace","Defeat elites 50 times.",5],[250,"Elite End","Defeat elites 250 times.",9]]],["giants","Bosses & Elites",()=>G.stats.giantKills,[[50,"Giant Trouble","Defeat 50 Giant enemies.",6]]],["level","Level & Upgrades",()=>G.level,[[2,"Level 2","Reach player level 2.",1],[6,"Level 6","Reach player level 6.",2],[8,"Level 8","Reach player level 8.",3],[12,"Level 12","Reach player level 12.",4],[25,"Level 25","Reach player level 25.",8]]],["upgrades","Level & Upgrades",()=>Object.keys(G.attrs).reduce((s,k)=>s+G.attrs[k],0),[[100,"Builder","Buy 100 attribute levels.",4],[300,"Engineer","Buy 300 attribute levels.",6],[700,"Architect","Buy 700 attribute levels.",8],[1200,"Maximalist","Buy 1,200 attribute levels.",11]]],["atCap","Level & Upgrades",()=>{const cap=attrCap();return Object.keys(G.attrs).filter((k)=>G.attrs[k]>=attrCap(k)).length},[[1,"First Max","Max out an attribute at your level cap.",3],[4,"Four Maxed","Have 4 attributes at your level cap.",6],[10,"Fully Maxed","Have all 10 attributes at your level cap.",9]]],["skills","Collection",()=>G.skills.length,[[8,"Skill Adept","Own 8 skills.",4],[12,"Skill Master","Own 12 skills.",6],[16,"Full Tree","Own all 16 skills.",8]]],["skins","Collection",()=>G.ownedSkins.length,[[4,"Style Collector","Own 3 premium skins.",5],[6,"Full Wardrobe","Own all 5 premium skins.",8]]],["quests","Daily Grind",()=>G.stats.questsDone||0,[[5,"Errand Runner","Claim 5 daily quests.",2],[25,"Quest Regular","Claim 25 daily quests.",4]]],["chests","Daily Grind",()=>G.stats.chestsClaimed||0,[[7,"A Week of Chests","Open 7 daily chests.",3],[30,"A Month of Chests","Open 30 daily chests.",6],[90,"Chest Devotee","Open 90 daily chests.",8]]],["streak","Daily Grind",()=>G.stats.chestBestDay||0,[[7,"Perfect Week","Reach day 7 of the login streak.",5]]],["cycles","Daily Grind",()=>G.stats.chestCycles||0,[[4,"Four Perfect Weeks","Finish the 7-day login streak 4 times.",8]]],["offline","Daily Grind",()=>G.stats.offlineClaims||0,[[1,"While You Slept","Claim offline earnings once.",2],[25,"Dream Earner","Claim offline earnings 25 times.",7]]],["playtime","Time",()=>G.stats.playTime,[[18000,"Five Hours In","Play for 5 hours total.",4],[90000,"Twenty-Five Hours","Play for 25 hours total.",8],[360000,"Hundred Hours","Play for 100 hours total.",11]]],["untouchableWins","Victories",()=>G.stats.untouchableWins,[[25,"Ghost Hands","Win 25 fights without taking any damage.",7]]]];const ACH_CAT_ORDER=["Victories","Slaps","Damage","Crits & Luck","Heavy & Ultimate","Frenzy & Combo","Hard Mode","Bosses & Elites","Riches","Level & Upgrades","Collection","Daily Grind","Time"];for(const L of ACH_LADDERS){for(const t of L[3]){ACHIEVEMENTS.push({id:"L_"+L[0]+"_"+t[0],name:t[1],desc:t[2],target:t[0],gems:t[3],cat:L[1],val:L[2]})}}let achToastTimer=0;function showAchToast(name,gems){const el=$("achToast");el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h12v3h4v2a5 5 0 0 1-5 5h-.42A6 6 0 0 1 13 15.92V18h4v3H7v-3h4v-2.08A6 6 0 0 1 7.42 12H7a5 5 0 0 1-5-5V5h4V2zm-2 5a3 3 0 0 0 3 3V7H4zm16 0h-3v3a3 3 0 0 0 3-3z" fill="currentColor"/></svg><span>Achievement unlocked: <b>'+name+"</b>"+(gems?" · +"+gems+" gems":"")+"</span>";el.classList.add("show");clearTimeout(achToastTimer);achToastTimer=setTimeout(()=>el.classList.remove("show"),3400);Sound.levelup()}function grantGems(n){if(!(n>0))return;G.gems+=n;G.stats.gemsEarned=(G.stats.gemsEarned||0)+n;updateGemHud()}function updateAwardsBadge(){if(!G.claimedAchievements)G.claimedAchievements=[];const unclaimed=G.achievements.filter((id)=>G.claimedAchievements.indexOf(id)<0);const count=unclaimed.length;const bnav=$("bnavAwardsBadge");if(bnav){bnav.textContent=count;bnav.style.display=count>0?"flex":"none";}const more=$("moreAwardsBadge");if(more){more.textContent=count;more.style.display=count>0?"flex":"none";}const hsc=$("hscClaimPill");if(hsc){hsc.textContent="🎁 "+count+" CLAIMABLE";hsc.style.display=count>0?"inline-flex":"none";}}function checkAchievements(){let anyNew=false;for(const a of ACHIEVEMENTS){if(G.achievements.indexOf(a.id)>=0)continue;if(a.val()>=a.target){G.achievements.push(a.id);anyNew=true;showAchToast(a.name,a.gems||0);Save.store();if(G.tab==="awards")renderAwards();}}updateAwardsBadge();}function spawnEnemy(initial){G.adRewardClaimed=false;if(!G.modeAdvance)G.fightMode=null;G.modeAdvance=false;if(!G.fightMode&&!enemyUnlocked(G.current)){let s=G.current;while(s>0&&!enemyUnlocked(s))s--;G.current=s}const def=ENEMIES[G.current];const HM=G.hardMode?CONFIG.hard:null;const hp0=HM?Math.round(def.hp*HM.hpMult):def.hp;const rate0=HM?def.coinRate*HM.coinMult:def.coinRate;G.enemy={idx:def.idx,name:def.name,group:def.group,elite:def.elite,boss:!!def.boss,hp:hp0,maxHp:hp0,coinRate:rate0,bounty:Math.round(hp0*rate0),spr:def.spr,scale:def.scale,atkInterval:HM?Math.round(def.atkInterval*HM.intervalMult*100)/100:def.atkInterval,atkDmg:HM?Math.max(1,Math.round(def.atkDmg*HM.atkMult)):def.atkDmg,hard:!!HM,hitT:0,squashT:0,marks:[],dead:false,fallA:0,lungeT:0,stunT:0,enraged:false};if(G.fightMode&&G.fightMode.type==="endless"){const wv=(G.fightMode.wave||1)-1;G.enemy.hp=Math.round(G.enemy.hp*Math.pow(1.32,wv));G.enemy.maxHp=G.enemy.hp;G.enemy.coinRate=G.enemy.coinRate*Math.pow(1.25,wv);G.enemy.atkDmg=Math.max(1,Math.round(G.enemy.atkDmg*Math.pow(1.16,wv)))}if(G.enemy){G.enemy.bsState="idle";G.enemy.bsT=0;G.enemy.bs70=false;G.enemy.bsShield=0;G.enemy.bsTt=0;G.enemy.bsAt=0;G.enemy.bsApplied=false}PFX.stunT=0;PFX.accT=0;PFX.slowT=0;PFX.slowAmt=0;PFX.lockT=0;PFX.burnT=0;PFX.burnPer=0;PFX.burnTickT=0;bossFx=null;hideBossWarn();updateFxChips();const inRun=G.fightMode&&(G.fightMode.type==="gauntlet"||G.fightMode.type==="bossrush");if(!inRun){SP.cd={};SP.dot=null;SP.stunT=0;SP.curseT=0;SP.bothT=0;SP.meteorT=0;SP.beamT=0;SP.burn=null;SP.venom=null;}G.procCount=0;updateProcChip();renderSpecRail();if(!hasSkill("onTarget")||G.lostLast)G.comboStack=0;G.lostLast=false;G.barrage=0;G.barrageT=0;G.ultCharge=0;G.ultReady=false;G.secondWindUsed=false;G.ironWillUsed=false;G.kineticShield=0;G.slapHand="R";G.missStreak=0;updateComboTag();G.playerHp=G.carryHp!=null?Math.min(G.carryHp,playerMaxHp()):playerMaxHp();G.carryHp=null;G.enemyAtkT=def.atkInterval;G.fightTime=0;G.bestCombo=0;G.fightHitCoins=0;G.fightBonus=0;G.weak={active:false,t:0,next:CONFIG.weakSpot?CONFIG.weakSpot.firstAt:2.5,x:0,y:0,count:0};G.fightDamageTaken=0;G.over=null;hideEndOverlay();if(def.boss&&G.tab==="battle")startBossIntro(def);else{bossIntroEl.classList.remove("open");G.phase="spawning";G.phaseT=0}if(!initial)Sound.pop();updateEnemyBar();updatePlayerBar();updateAtkBar();Music.sync()}function startBossIntro(def){G.phase="bossIntro";G.phaseT=0;biNameEl.textContent=def.name.toUpperCase();const biSpecEl=$("biSpec");if(biSpecEl){const bsd=CONFIG.bossSpecials[def.idx];biSpecEl.textContent=(bsd?("⚠ SPECIAL: "+bsd.name+" — "+bsd.blurb):"")+((CONFIG.healBosses&&CONFIG.healBosses[def.idx])?((bsd?" \u00B7 ":"\u26A0 ")+"\u2625 HEAL: "+CONFIG.healBosses[def.idx].name+" \u2014 "+CONFIG.healBosses[def.idx].blurb):"")}biSpriteEl.src=def.spr.thumb;biSpriteEl.alt=def.name;const bs=Math.round(128*Math.min(def.scale||1,1.8));biSpriteEl.style.width=bs+"px";biSpriteEl.style.height=bs+"px";bossIntroEl.classList.add("open");G.shake=Math.max(G.shake,13);Sound.roar()}function endBossIntro(){if(G.phase!=="bossIntro")return;bossIntroEl.classList.remove("open");G.phase="fighting";G.phaseT=0;G.slapT=0;G.damageDone=false;G.fightFlashT=0.55;Sound.pop()}const $=(id)=>document.getElementById(id);const coinCountEl=$("coinCount"),dpsEl=$("dpsValue"),dpsActualEl=$("dpsActual"),dpsPillEl=$("dpsPill"),levelValEl=$("levelVal"),enemyNameEl=$("enemyName"),enemyMetaEl=$("enemyMeta"),hpFillEl=$("hpFill"),hpTextEl=$("hpText"),killEl=$("killCount"),coinPillEl=$("coinPill"),comboTagEl=$("comboTag"),capNoteEl=$("capNote"),levelUpBtnEl=$("levelUpBtn"),attrListEl=$("attrList"),selListEl=$("selList"),selProgressEl=$("selProgress"),attrPanelEl=$("attrPanel"),attrToggleEl=$("attrToggle"),playerBarEl=$("playerBar"),playerFillEl=$("playerFill"),playerTextEl=$("playerText"),atkRowEl=$("atkRow"),atkFillEl=$("atkFill"),atkTimeEl=$("atkTime"),endOverlayEl=$("endOverlay"),endHeadEl=$("endHead"),endSubEl=$("endSub"),endSpriteEl=$("endSprite"),endStatsEl=$("endStats"),endUnlockEl=$("endUnlock"),endTipEl=$("endTip"),againBtnEl=$("againBtn"),chooseBtnEl=$("chooseBtn"),nextBtnEl=$("nextBtn"),skillTreeEl=$("skillTreeWrap"),skillDetailEl=$("skillDetail"),skillCoinsEl=$("skillCoins"),skillOwnedEl=$("skillOwned"),statsGridEl=$("statsGrid"),achListEl=$("achList"),startMenuEl=$("startMenu"),menuEnemyEl=$("menuEnemy"),gemCountEl=$("gemCount"),appEl=$("app"),shopListEl=$("shopList"),shopSubEl=$("shopSub"),shopCoinsEl=$("shopCoins"),shopGemsEl=$("shopGems"),shopFeaturesEl=$("shopFeatures"),awayCardEl=$("awayCard"),awayTextEl=$("awayText"),awayAmtEl=$("awayAmt"),hpTrackEl=$("hpTrack"),swTagEl=$("swTag"),bossIntroEl=$("bossIntro"),biSpriteEl=$("biSprite"),biNameEl=$("biName"),levelUpOverlayEl=$("levelUpOverlay"),luHeadEl=$("luHead"),luIconEl=$("luIcon"),luNewEl=$("luNew"),luNameEl=$("luName"),luFxEl=$("luFx"),endTrophyEl=$("endTrophy"),endHomeBtnEl=$("endHomeBtn"),abilitiesListEl=$("abilitiesList");const COIN_SVG='<svg class="coin-ico sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#fde047" stroke="#652b00" stroke-width="1.8"/><circle cx="12" cy="12" r="6.5" fill="#eab308" stroke="#a16207" stroke-width="1.1"/><path d="M12 8.5v7M8.5 12h7" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#ffffff"/><path d="M6 10a7 7 0 0 1 8-4" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/></svg>';const GEM_SVG='<svg class="gem-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l4 6-9 12L3 9l4-6z" fill="#39c2d8" stroke="#177e96" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 9h18M12 21 8.5 9 12 3l3.5 6L12 21" fill="none" stroke="#177e96" stroke-width="1.3" stroke-linejoin="round"/></svg>';const GEM_SVG_SM='<svg class="gem-ico sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l4 6-9 12L3 9l4-6z" fill="#39c2d8" stroke="#177e96" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 9h18M12 21 8.5 9 12 3l3.5 6L12 21" fill="none" stroke="#177e96" stroke-width="1.3" stroke-linejoin="round"/></svg>';function fmtDPS(v){return fmtNum(v)}function fmtNum(v){v=Math.round(v);const a=Math.abs(v);if(a<1000)return ""+v;const units=[[1000000000000000000,"Qi"],[1000000000000000,"Qa"],[1000000000000,"T"],[1e9,"B"],[1e6,"M"],[1000,"K"]];for(const[u,s]of units){if(a>=u){const x=v/u;const str=x>=100?Math.round(x).toString():x>=10?(Math.round(x*10)/10).toString():(Math.round(x*100)/100).toString();return str+s}}return v.toLocaleString("en-US")}function fmtVal(v){return(Math.round(v*10)/10).toString()}function fmt2(v){return(Math.round(v*100)/100).toString()}function fmtTime(s){const m=Math.floor(s/60),ss=Math.floor(s%60);return m>0?m+":"+String(ss).padStart(2,"0"):ss+"s"}function updateEnemyBar(){const e=G.enemy;if(!e)return;enemyNameEl.textContent=e.name;enemyMetaEl.innerHTML=GROUPS[e.group].name.toUpperCase()+" · "+(e.idx+1)+" / "+ENEMIES.length+" · ATK "+fmtNum(e.atkDmg)+" / "+e.atkInterval.toFixed(1)+"s"+(e.boss?' · <span class="boss-tag">BOSS</span>':e.elite?' · <span class="elite">GROUP ELITE</span>':"")+(e.hard?' · <span class="hard-tag">HARD</span>':"")+(e.enraged?' · <span class="boss-tag">ENRAGED</span>':"");hpTrackEl.classList.toggle("boss",!!e.boss);hpTrackEl.classList.toggle("hard",!!e.hard);const pct=Math.max(0,e.hp/e.maxHp*100);hpFillEl.style.width=pct+"%";hpTextEl.textContent=fmtNum(Math.max(0,Math.ceil(e.hp)))+" / "+fmtNum(e.maxHp)}function updatePlayerBar(hurt){const max=playerMaxHp();playerFillEl.style.width=Math.max(0,G.playerHp/max*100)+"%";playerFillEl.classList.toggle("low",G.playerHp/max<=0.3);playerTextEl.textContent=fmtNum(Math.max(0,Math.ceil(G.playerHp)))+" / "+fmtNum(max)+" HP";if(hasAbility("secondWind")){swTagEl.style.display="";swTagEl.textContent=G.secondWindUsed?"2ND WIND USED":"2ND WIND READY";swTagEl.classList.toggle("used",!!G.secondWindUsed)}else swTagEl.style.display="none";if(hurt){playerBarEl.classList.remove("hurt");playerBarEl.offsetWidth;playerBarEl.classList.add("hurt")}}function updateFrenzyBar(){const item=$("frenzyItem");if(!item)return;const owned=hasSkill("frenzy");item.style.display=owned?"":"none";if(!owned)return;const circ=$("frenzyCircle");const pct=Math.max(0,Math.min(100,G.frenzyMeter));circ.style.setProperty("--p",pct.toFixed(1));circ.classList.toggle("ready",pct>=100&&G.frenzyT<=0);circ.classList.toggle("active",G.frenzyT>0);const sub=$("frenzySub");if(sub)sub.textContent=G.frenzyT>0?"FRENZY!":Math.floor(pct)+"%"}
function activateFrenzy(){if(!hasSkill("frenzy")||G.frenzyT>0||G.frenzyMeter<100)return;if(G.tab!=="battle"||G.menuOpen||G.phase!=="fighting")return;G.frenzyT=(CONFIG.frenzy.duration+(G.frenzyBoostUnlocked?3:0));G.frenzyFlashT=0.9;G.stats.frenzies=(G.stats.frenzies||0)+1;dailyAdd("frenzies",1);Sound.levelup();updateFrenzyBar();if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS())}$("frenzyCircle").addEventListener("click",()=>{Sound.unlock();activateFrenzy()});
const SP={cd:{},dot:null,venom:null,stunT:0,curseT:0,bothT:0,meteorT:0,beamT:0};
const SPEC_MONO={doubleSlap:"DS",meteor:"MT",laser:"LZ",curse:"PC",zeus:"ZW"};
const SPEC_COLORS={doubleSlap:"#b3540a",meteor:"#7a4a21",laser:"#177e96",curse:"#7a5aa0",zeus:"#b97e08"};
function specDef(id){return CONFIG.specials.find((s)=>s.id===id)}
function specLevel(id){return G.specials[id]||0}
function specUpgCost(sp,lv){return Math.round(ENEMIES[sp.boss].bounty*2*Math.pow(3.2,lv-1))}
function specMultNow(sp){return sp.mult*Math.pow(1.25,specLevel(sp.id)-1)}
function specCdOf(sp){return sp.cd*Math.pow(0.96,specLevel(sp.id)-1)}
function fmtMult(v){return Math.round(v*10)/10}
function renderSpecRail(){const rail=$("railSpecs");if(!rail)return;const owned=CONFIG.specials.filter((sp)=>specLevel(sp.id)>0);rail.innerHTML=owned.map((sp)=>'<div class="rail-item"><button class="rail-circle spec" data-spec="'+sp.id+'" aria-label="'+sp.name+' special"><span class="rc-sweep" aria-hidden="true"></span><span class="rc-ico" style="background:'+SPEC_COLORS[sp.id]+'">'+SPEC_MONO[sp.id]+'</span></button><span class="rc-sub" data-cd></span></div>').join("");const btns=rail.querySelectorAll("[data-spec]");for(let i=0;i<btns.length;i++)btns[i].addEventListener("click",()=>{Sound.unlock();castSpecial(btns[i].getAttribute("data-spec"))});renderSpecRailCd()}
function renderSpecRailCd(){const rail=$("railSpecs");if(!rail||!rail.innerHTML)return;const btns=rail.querySelectorAll("[data-spec]");for(let i=0;i<btns.length;i++){const id=btns[i].getAttribute("data-spec"),cd=SP.cd[id]||0,sp=specDef(id),sub=btns[i].parentElement?btns[i].parentElement.querySelector("[data-cd]"):null;btns[i].style.setProperty("--cdp",(sp?Math.max(0,Math.min(1,cd/specCdOf(sp))):0).toFixed(3));btns[i].classList.toggle("cooling",cd>0);btns[i].classList.toggle("ready",cd<=0);btns[i].disabled=cd>0||PFX.lockT>0;btns[i].classList.toggle("locked",PFX.lockT>0);if(sub)sub.textContent=PFX.lockT>0?"LOCK":cd>0?Math.ceil(cd)+"s":"LV "+specLevel(id)}}
function applySpecialHit(dmg,tag,side){const e=G.enemy;if(!e||e.dead||dmg<=0)return;const st=stats();const hpBefore=e.hp;e.hp-=dmg;const recD=G.enemyRecords[e.idx]||{k:0,f:0,d:0};recD.d=(recD.d||0)+dmg;G.enemyRecords[e.idx]=recD;e.hitT=0.28;e.squashT=0.16;G.stats.damage+=dmg;G.stats.slaps+=1;if(side){/* marks removed */}G.shake=Math.max(G.shake,tag==="ultimate"?CONFIG.feel.shakeUltPx:tag==="heavy"?CONFIG.feel.shakeHeavyPx:9);const geo=enemyGeom();const gx=side==="R"?(e.spr.eyeL[0]+e.spr.eyeR[0]-e.spr.cheek[0]):e.spr.cheek[0];const cx2=geo.cx+(gx-e.spr.cols/2)*geo.px,cy2=geo.feetY-geo.h+e.spr.cheek[1]*geo.px;G.impacts.push({x:cx2,y:cy2,t:0,life:0.34,tag:tag==="ultimate"?"ultimate":"crit"});G.dmgNums.push({x:cx2+(Math.random()*24-12),y:cy2-8,vy:-66,t:0,life:1.05,text:fmtNum(dmg),tag,rot:(Math.random()*0.2-0.1)*1.6});G.dmgLog.push({t:G.time,dmg});const isHardSpec=G.hardMode||!!(e&&e.hard);let gain=Math.max(1,Math.round(Math.max(1,Math.round(Math.min(dmg,hpBefore)*e.coinRate))*st.coinMult));if(gain>0){G.totalCoins+=gain;G.stats.coinsEarned+=gain;dailyAdd("battleCoins",gain);G.fightHitCoins+=gain;G.coinsDirty=true;const tgt2=coinTarget();G.coinsFx.push({x:cx2,y:cy2,vx:(Math.random()*2-1)*50,vy:-130,t:0,state:"burst",value:gain,tx:tgt2.x,ty:tgt2.y,flyT:0,sx:0,sy:0,idx:95});}Sound.slap(tag);updateEnemyBar();if(e.boss&&!e.enraged&&e.hp>0&&e.hp<=e.maxHp*CONFIG.boss.enrageBelow){e.enraged=true;G.dmgNums.push({x:geo.cx,y:geo.feetY-geo.h-18,vy:-26,t:0,life:1.25,text:"ENRAGED!",tag:"enraged",rot:0});G.shake=Math.max(G.shake,15);Sound.roar();updateEnemyBar()}if(e.hp<=0)killEnemy()}
function castSpecial(id){const sp=specDef(id);if(!sp)return false;const lv=specLevel(id);if(!lv)return false;const e=G.enemy;if(!e||e.dead||G.tab!=="battle"||G.menuOpen||G.phase!=="fighting"||!G.running)return false;if((SP.cd[id]||0)>0)return false;if(PFX.lockT>0||PFX.stunT>0)return false;const roll=DamageCalculator.roll("special");let total=Math.max(1,Math.round(roll.damage*specMultNow(sp)));let tag=roll.crit?"crit":"heavy";if(sp.critFx){total=Math.max(1,Math.round(roll.damage*specMultNow(sp)*(roll.crit?1:stats().critMult)));tag="ultimate"}SP.cd[id]=specCdOf(sp);window.__thLastSpecial={id,dmg:total};Sound.levelup();if(sp.kind==="dot"){const ticks=Math.round(sp.dur*2);SP.dot={id,per:Math.max(1,Math.round(total/ticks)),left:ticks,tickT:0,tag};if(sp.id==="laser")SP.beamT=sp.dur;if(sp.slow)SP.curseT=sp.dur}else{applySpecialHit(total,tag,sp.id==="doubleSlap"?"L":(hasSkill("secondHand")?G.slapHand:"R"));if(sp.id==="doubleSlap"){SP.bothT=0.38;/* marks removed */}if(sp.stun){SP.stunT=sp.stun;SP.meteorT=0.55}}renderSpecRail();return true}
function tickSpecials(dt){let dirty=false;for(const id in SP.cd){if(SP.cd[id]>0){SP.cd[id]=Math.max(0,SP.cd[id]-dt);dirty=true}}if(SP.stunT>0)SP.stunT=Math.max(0,SP.stunT-dt);if(SP.curseT>0)SP.curseT=Math.max(0,SP.curseT-dt);if(SP.bothT>0)SP.bothT=Math.max(0,SP.bothT-dt);if(SP.meteorT>0)SP.meteorT=Math.max(0,SP.meteorT-dt);if(SP.beamT>0)SP.beamT=Math.max(0,SP.beamT-dt);if(SP.dot){const d=SP.dot;d.tickT+=dt;if(d.tickT>=0.5){d.tickT=0;d.left-=1;applySpecialHit(d.per,d.tag,Math.random()<0.5?"L":"R");if(d.left<=0||!G.enemy||G.enemy.dead)SP.dot=null}}if(SP.burn){const bn=SP.burn;bn.tickT+=dt;if(bn.tickT>=0.5){bn.tickT=0;bn.left-=1;applySpecialHit(bn.per,"burn",Math.random()<0.5?"L":"R");if(bn.left<=0||!G.enemy||G.enemy.dead)SP.burn=null}}if(SP.venom){const vn=SP.venom;vn.tickT+=dt;if(vn.tickT>=0.5){vn.tickT=0;vn.left-=1;applySpecialHit(vn.per,"venom",Math.random()<0.5?"L":"R");if(vn.left<=0||!G.enemy||G.enemy.dead)SP.venom=null}}if(dirty)renderSpecRailCd()}

function hurtPlayer(dmg){if(G.phase!=="fighting"||!G.enemy||G.enemy.dead||G.playerHp<=0)return;const st=stats();let mitigated=0;if(st.damageReduction){const reduced=Math.max(1,Math.round(dmg*(1-st.damageReduction)));mitigated+=(dmg-reduced);dmg=reduced;}if(hasSkill("parry")&&Math.random()<0.15){const parried=Math.max(1,Math.round(dmg*0.5));mitigated+=(dmg-parried);dmg=parried;G.dmgNums.push({x:W/2,y:H*0.4,vy:-24,t:0,life:1.0,text:"PARRY!",tag:"proc",rot:0});if(hasAbility("counterCadence")){G.counterCadenceArmed=true;G.dmgNums.push({x:W/2,y:H*0.35,vy:-28,t:0,life:1.0,text:"CADENCE ARMED!",tag:"proc",rot:0});}applyHit("normal");}if(hasAbility("toughGrit")&&G.playerHp/playerMaxHp()<=0.50){const tg=Math.max(1,Math.round(dmg*CONFIG.abilityFx.toughGritReduction));mitigated+=(dmg-tg);dmg=tg;}if(hasAbility("thickSkin")){const thick=Math.max(1,Math.round(dmg*CONFIG.abilityFx.thickSkin));mitigated+=(dmg-thick);dmg=thick;}if(G.kineticShield&&G.kineticShield>0){const abs=Math.min(G.kineticShield,dmg);G.kineticShield-=abs;dmg-=abs;mitigated+=abs;G.dmgNums.push({x:W/2,y:H*0.45,vy:-20,t:0,life:0.9,text:"ABSORB -"+fmtNum(abs),tag:"miss",rot:0});if(dmg<=0){if(hasSkill("aegisBulwark")&&mitigated>0){const reflectDmg=Math.max(1,Math.round(mitigated*0.5));G.dmgNums.push({x:W/2,y:H*0.35,vy:-26,t:0,life:1.1,text:"AEGIS REFLECT "+fmtNum(reflectDmg),tag:"proc",rot:0});applySpecialHit(reflectDmg,"proc");}updatePlayerBar();return;}}if(hasSkill("aegisBulwark")&&mitigated>0){const reflectDmg=Math.max(1,Math.round(mitigated*0.5));G.dmgNums.push({x:W/2,y:H*0.35,vy:-26,t:0,life:1.1,text:"AEGIS REFLECT "+fmtNum(reflectDmg),tag:"proc",rot:0});applySpecialHit(reflectDmg,"proc");}if(G.playerHp-dmg<=0&&hasAbility("secondWind")&&!G.secondWindUsed){G.secondWindUsed=true;G.playerHp=Math.ceil(playerMaxHp()*CONFIG.abilityFx.secondWindFrac);G.swFlashT=0.7;G.shake=Math.max(G.shake,12);G.dmgNums.push({x:W/2,y:H*0.3,vy:-18,t:0,life:1.3,text:"SECOND WIND!",tag:"secondwind",rot:0});Sound.levelup();updatePlayerBar(true);return;}G.playerHp=Math.max(0,G.playerHp-dmg);G.fightDamageTaken+=dmg;G.playerFlashT=0.4;G.shake=Math.max(G.shake,11);Sound.hurt();updatePlayerBar(true);if(G.playerHp<=0)loseFight()}
let fxHtmlCache="~";
function updateFxChips(){const el=document.getElementById("fxChips");if(!el)return;let h="";const chip=(cls,txt)=>'<span class="fx-chip '+cls+'">'+txt+"</span>";const bs=G.enemy&&CONFIG.bossSpecials&&CONFIG.bossSpecials[G.enemy.idx];const bsName=bs?bs.name:"SPECIAL";if(PFX.stunT>0)h+=chip("stun",(bs&&bs.kind==="heavy"?(bsName+" · "):"")+"STUNNED · "+PFX.stunT.toFixed(1)+"s");if(PFX.accT>0)h+=chip("acc",bsName+" · ACC −30% · "+Math.ceil(PFX.accT)+"s");if(PFX.slowT>0)h+=chip("slow",bsName+" · −"+Math.round(PFX.slowAmt*100)+"% SPEED · "+Math.ceil(PFX.slowT)+"s");if(PFX.lockT>0)h+=chip("lock","SPECIALS LOCKED · "+Math.ceil(PFX.lockT)+"s");if(PFX.burnT>0)h+=chip("burn",bsName+" · "+PFX.burnT.toFixed(1)+"s");if(G.weak&&G.weak.active)h+=chip("weak","\u25CE WEAK SPOT \u2014 TAP THE RING!");if(hasPrecision()&&G.phase==="fighting"&&G.weak&&(G.weak.count||0)>0)h+=chip("prec","\u25CE PRECISION "+(G.weak.count||0)+"/"+weakCap());const fm=G.fightMode;if(fm&&fm.type==="gauntlet")h+=chip("gauntlet","\u2694 GAUNTLET \u00B7 FIGHT "+(fm.step+1)+"/3");if(fm&&fm.type==="bossrush")h+=chip("gauntlet","\uD83D\uDC51 BOSS RUSH \u00B7 FIGHT "+(fm.step+1)+"/"+fm.queue.length);if(fm&&fm.type==="endless")h+=chip("gauntlet","\uD83C\uDF0A WAVE "+(fm.wave||1));const hbx=CONFIG.healBosses&&G.enemy&&CONFIG.healBosses[G.enemy.idx];if(hbx&&G.enemy.healLeft>0)h+=chip("heal","\u2625 "+hbx.name+" \u00D7"+G.enemy.healLeft);const e=G.enemy;if(e&&e.bsShield>0)h+=chip("shield",bsName+" · "+e.bsShield+" SLAPS AT 50%");const now=Date.now();if(G.adCoinBoostUntil>now){const left=Math.ceil((G.adCoinBoostUntil-now)/1000);const m=Math.floor(left/60),s=left%60;h+=chip("ad-coin","💰 2× COINS · "+(m>0?m+"m ":"")+s+"s");}if(G.adDmgBoostUntil>now){const left=Math.ceil((G.adDmgBoostUntil-now)/1000);const m=Math.floor(left/60),s=left%60;h+=chip("ad-dmg","💥 2× DAMAGE · "+(m>0?m+"m ":"")+s+"s");}if(h!==fxHtmlCache){fxHtmlCache=h;el.innerHTML=h}}
function hideBossWarn(){const w=document.getElementById("bossWarn");if(w)w.classList.remove("show")}
function startBossTelegraph(){const e=G.enemy;const bs=CONFIG.bossSpecials[e.idx];if(!bs||e.bsState==="telegraph"||e.bsState==="anim"||e.lungeT>0)return;e.bsState="telegraph";e.bsTt=0.8;const w=document.getElementById("bossWarn");if(w){w.textContent="⚠ "+e.name.toUpperCase()+" — "+bs.name+"!";w.classList.add("show")}Sound.bossWarn()}
function fireBossSpecial(){const e=G.enemy;const bs=CONFIG.bossSpecials[e.idx];if(!bs)return;bossFx={kind:bs.kind,t:0,dur:0.65,arc:bs.kind==="stun"&&e.idx===19?100:64,seed:Math.random()*97};Sound.bossFx(bs.kind,e.idx);hideBossWarn()}
function applyBossEffect(){const e=G.enemy;if(!e||e.dead)return;const bs=CONFIG.bossSpecials[e.idx];if(!bs)return;const durM=e.hard?1.2:1;const px=W/2,py=H*0.88;const burst=(cols,n)=>{for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=90+Math.random()*170;G.bursts.push({x:px,y:py-24,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-60,grav:520,size:5+Math.random()*6,col:cols[i%cols.length],shape:"rect",t:0,life:0.5,rot:Math.random()*3,vr:(Math.random()*2-1)*8})}};
if(bs.kind==="acc"){PFX.accT=bs.dur*durM;burst(["#ffd23e","#b97e08","#fff3b0"],10)}
else if(bs.kind==="stun"){PFX.stunT=Math.max(PFX.stunT,bs.dur*durM);burst([e.idx===19?"#8d8578":"#ffe95e","#f7f3e8","#a89e8c"],12)}
else if(bs.kind==="slow"){PFX.slowT=bs.dur*durM;PFX.slowAmt=bs.amt;burst(["#e8dcc0","#cfd8e3","#b8a678"],10)}
else if(bs.kind==="shield"){e.bsShield=bs.hits}
else if(bs.kind==="burn"){PFX.burnT=bs.dur*durM;PFX.burnPer=Math.max(1,e.atkDmg*bs.mult/(PFX.burnT*2));PFX.burnTickT=0;burst(["#ef7d1a","#d63c30","#ffcf3f"],14)}
else if(bs.kind==="lock"){PFX.lockT=bs.dur*durM;renderSpecRailCd();burst(["#7a5aa0","#b48ce0","#4a3a26"],10)}
else if(bs.kind==="heavy"){hurtPlayer(Math.round(e.atkDmg*bs.mult));PFX.stunT=Math.max(PFX.stunT,(bs.stun||0)*durM);G.shake=Math.max(G.shake,19)}
else if(bs.kind==="godhand"){hurtPlayer(Math.round(e.atkDmg*bs.mult));PFX.stunT=Math.max(PFX.stunT,bs.stun*durM);G.shake=Math.max(G.shake,26);G.playerFlashT=Math.max(G.playerFlashT,0.65)}
Sound.bossHit(bs.kind);updateFxChips()}
function tickPFX(dt){if(PFX.stunT>0)PFX.stunT=Math.max(0,PFX.stunT-dt);if(PFX.accT>0)PFX.accT=Math.max(0,PFX.accT-dt);if(PFX.slowT>0){PFX.slowT=Math.max(0,PFX.slowT-dt);if(PFX.slowT<=0)PFX.slowAmt=0}if(PFX.lockT>0){PFX.lockT=Math.max(0,PFX.lockT-dt);if(PFX.lockT<=0)renderSpecRailCd()}if(PFX.burnT>0){PFX.burnT=Math.max(0,PFX.burnT-dt);PFX.burnTickT+=dt;while(PFX.burnTickT>=0.5){PFX.burnTickT-=0.5;if(G.phase==="fighting"&&G.playerHp>0&&G.enemy&&!G.enemy.dead)hurtPlayer(Math.max(1,Math.round(PFX.burnPer)))}}if(bossFx){bossFx.t+=dt;if(bossFx.t>=bossFx.dur)bossFx=null}}
function weakInterval(){const ws=CONFIG.weakSpot;const lk=(G.attrs&&G.attrs.luck)||0;const f=1/(1+lk*(ws.luckScale||0));return (ws.everyMin+Math.random()*(ws.everyMax-ws.everyMin))*f}function weakCap(){const ws=CONFIG.weakSpot;const lk=(G.attrs&&G.attrs.luck)||0;return Math.min(ws.capMax||6,(ws.capBase||3)+Math.floor(lk/(ws.capPerLuck||5)))}function hasPrecision(){return hasSkill("precisionInstinct")}function tickWeakSpot(dt){const ws=CONFIG.weakSpot;if(!ws||!hasPrecision()||!G.enemy||G.enemy.dead||G.phase!=="fighting"||G.menuOpen)return;const wk=G.weak;if(!wk)return;if(wk.active){wk.t-=dt;if(wk.t<=0){wk.active=false;wk.next=weakInterval()}return}wk.next-=dt;if(wk.next<=0){if((wk.count||0)>=weakCap()){wk.next=9999;return}const geo=enemyGeom();const spr=G.enemy.spr;wk.x=geo.cx+(spr.cheek[0]-spr.cols/2)*geo.px+(Math.random()*30-15);wk.y=geo.feetY-geo.h+spr.cheek[1]*geo.px+(Math.random()*20-10);wk.active=true;wk.t=G.enemy.hard?ws.durHard:ws.dur;if(!G.weakHintDone)G.dmgNums.push({x:geo.cx,y:geo.feetY-geo.h-44,vy:-14,t:0,life:1.6,text:"TAP THE GOLD RING!",tag:"lucky",rot:0})}}
function precisionSlap(){const ws=CONFIG.weakSpot;const wk=G.weak;if(!ws||!wk||!hasPrecision()||!wk.active||!G.enemy||G.enemy.dead||G.phase!=="fighting")return;wk.active=false;wk.count=(wk.count||0)+1;wk.next=weakInterval();const st=stats();const dmg=Math.max(1,Math.round(st.damage*ws.mult*((G.enemy.boss||G.enemy.elite)?st.bossDmgMult:1)));G.stats.precision=(G.stats.precision||0)+1;G.weakHintDone=true;if(hasSkill("frenzy")&&G.frenzyT<=0){G.frenzyMeter=Math.min(100,G.frenzyMeter+ws.frenzyGain);updateFrenzyBar()}applySpecialHit(dmg,"crit");G.dmgNums.push({x:wk.x,y:wk.y-30,vy:-30,t:0,life:1.1,text:"PRECISION!",tag:"lucky",rot:0})}
function drawWeakSpot(){const wk=G.weak;if(!wk||!wk.active||!G.enemy||G.enemy.dead)return;const ws=CONFIG.weakSpot;const frac=Math.max(0,wk.t/(G.enemy.hard?ws.durHard:ws.dur));const pulse=1+0.12*Math.sin(G.time*10);const R=Math.max(20,enemyGeom().h*0.075)*pulse;ctx.save();ctx.globalAlpha=0.35+0.65*frac;ctx.strokeStyle="#ffd23e";ctx.lineWidth=4;ctx.beginPath();ctx.arc(wk.x,wk.y,R,0,Math.PI*2);ctx.stroke();ctx.strokeStyle="#fff3da";ctx.lineWidth=2;ctx.beginPath();ctx.arc(wk.x,wk.y,R*0.62,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#ffd23e";ctx.beginPath();ctx.arc(wk.x,wk.y,3.5,0,Math.PI*2);ctx.fill();ctx.restore()}
function tickHealBoss(dt){const e=G.enemy;if(!e||!e.boss||e.dead||G.phase!=="fighting")return;const hb=CONFIG.healBosses&&CONFIG.healBosses[e.idx];if(!hb)return;if(e.healLeft==null){e.healLeft=hb.max;e.healT=0;e.healWarnT=0}if(e.healWarnT>0){e.healWarnT-=dt;if(e.healWarnT<=0){hideBossWarn();const amt=Math.round(e.maxHp*hb.pct);e.hp=Math.min(e.maxHp,e.hp+amt);const geo=enemyGeom();G.dmgNums.push({x:geo.cx,y:geo.feetY-geo.h-26,vy:-22,t:0,life:1.3,text:"+"+fmtNum(amt)+" HP",tag:"heal",rot:0});Sound.levelup();updateEnemyBar()}return}if(e.healLeft<=0||e.hp>=e.maxHp)return;e.healT+=dt;if(e.healT>=hb.every){e.healT=0;e.healLeft-=1;e.healWarnT=0.8;const w=document.getElementById("bossWarn");if(w){w.textContent="\u26A0 "+e.name.toUpperCase()+" \u2014 "+hb.name+"!";w.classList.add("show")}Sound.bossWarn()}}
function tickBossSpecial(dt){tickPFX(dt);tickHealBoss(dt);const e=G.enemy;if(!e||!e.boss||e.dead||G.phase!=="fighting")return;const bs=CONFIG.bossSpecials[e.idx];if(!bs)return;
if(e.bsState==="telegraph"){e.bsTt-=dt;if(e.bsTt<=0){e.bsState="anim";e.bsAt=0;e.bsApplied=false;fireBossSpecial()}return}
if(e.bsState==="anim"){e.bsAt+=dt;if(!e.bsApplied&&e.bsAt>=0.5){e.bsApplied=true;applyBossEffect()}if(e.bsAt>=0.68){e.bsState="idle";e.bsT=e.hard?8:9;G.enemyAtkT=Math.max(G.enemyAtkT,enemyCurInterval())}return}
if(!e.bs70){if((e.hp<=e.maxHp*0.7||G.fightTime>=6)&&e.lungeT<=0){e.bs70=true;startBossTelegraph()}}
else{e.bsT-=dt;if(e.bsT<=0&&e.lungeT<=0)startBossTelegraph()}}
function drawBossSpecialFx(){const e=G.enemy;if(!e)return;const geo=enemyGeom();const px=W/2,py=H*0.88,bx=geo.cx,by=geo.feetY-geo.h*0.55;
if(e.bsShield>0){ctx.save();const pul=1+Math.sin(G.time*5)*0.02;ctx.strokeStyle="rgba(140,220,255,.85)";ctx.lineWidth=3;ctx.fillStyle="rgba(140,220,255,.13)";ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY-geo.h*0.48,geo.w*0.56*pul,geo.h*0.56*pul,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle="#bfe6f5";for(let i=0;i<e.bsShield;i++)ctx.fillRect(geo.cx+(i-(e.bsShield-1)/2)*13-3,geo.feetY-geo.h-16,6,6);ctx.restore()}
if(e.bsState==="telegraph"){ctx.save();ctx.globalAlpha=0.22+0.33*Math.abs(Math.sin(G.time*16));ctx.fillStyle="#d63c30";ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY-geo.h*0.48,geo.w*0.58,geo.h*0.58,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.font="900 "+Math.round(30+8*Math.sin(G.time*16))+"px Bungee, Nunito, sans-serif";ctx.textAlign="center";ctx.lineWidth=6;ctx.strokeStyle="rgba(43,20,5,.9)";const wy=geo.feetY-geo.h-24;ctx.strokeText("!",geo.cx,wy);ctx.fillStyle="#ff5a3c";ctx.fillText("!",geo.cx,wy);ctx.restore()}
const fx=bossFx;if(fx&&!(e.spr&&e.spr.poses&&e.spr.poses.spPose)){const fly=clamp01(fx.t/0.5),land=fx.t>=0.5;const mx=bx+(px-bx)*fly,my=by+(py-by)*fly-Math.sin(fly*Math.PI)*fx.arc;ctx.save();
if(fx.kind==="acc"){ctx.translate(mx,my);ctx.rotate(fx.t*14);ctx.fillStyle="#ffd23e";ctx.beginPath();ctx.arc(0,0,13,Math.PI*0.15,Math.PI*1.25);ctx.arc(5,-3,10,Math.PI*1.25,Math.PI*0.15,true);ctx.fill();ctx.fillStyle="#b97e08";ctx.fillRect(-15,-3,5,6)}
else if(fx.kind==="stun"&&e.idx===19){ctx.translate(mx,my);ctx.rotate(fx.t*5);ctx.fillStyle="#8d8578";ctx.beginPath();ctx.arc(0,0,17,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#575046";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-10,-8);ctx.lineTo(2,0);ctx.lineTo(-4,10);ctx.moveTo(2,0);ctx.lineTo(12,6);ctx.stroke()}
else if(fx.kind==="slow"&&e.idx===29){for(let i=0;i<3;i++){const rr=fx.t*170-i*26;if(rr>0){ctx.globalAlpha=Math.max(0,0.55-rr/230);ctx.strokeStyle="#cfd8e3";ctx.lineWidth=3;ctx.beginPath();ctx.arc(bx,by,rr,0,Math.PI*2);ctx.stroke()}}ctx.globalAlpha=1}
else if(fx.kind==="slow"){for(let i=0;i<3;i++){const k2=clamp01(fly-i*0.12);const rx=bx+(px-bx)*k2,ry=by+(py-by)*k2-Math.sin(k2*Math.PI)*40;ctx.save();ctx.translate(rx,ry);ctx.rotate(Math.sin(fx.t*9+i)*0.4);ctx.fillStyle=i%2?"#e8dcc0":"#d9c9a3";ctx.fillRect(-26,-4,52,8);ctx.fillStyle="#b8a678";ctx.fillRect(-26,-4,52,2);ctx.restore()}}
else if(fx.kind==="shield"){const k3=clamp01(fx.t/0.4);ctx.strokeStyle="rgba(140,220,255,"+(0.4+0.5*k3).toFixed(2)+")";ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY-geo.h*0.48,geo.w*0.56*k3,geo.h*0.56*k3,0,0,Math.PI*2);ctx.stroke()}
else if(fx.kind==="burn"){const grd=ctx.createLinearGradient(bx,by,px,py);grd.addColorStop(0,"rgba(239,125,26,.85)");grd.addColorStop(1,"rgba(214,60,48,.25)");ctx.fillStyle=grd;ctx.beginPath();ctx.moveTo(bx,by-10);ctx.lineTo(px,py-48-14*Math.sin(fx.t*40));ctx.lineTo(px,py+16);ctx.lineTo(bx,by+12);ctx.closePath();ctx.fill();ctx.fillStyle="#ffcf3f";for(let i=0;i<6;i++){const fx1=bx+(px-bx)*bossRnd(i*3.3+fx.seed),fy1=by+(py-by)*bossRnd(i*7.9+fx.seed);ctx.fillRect(fx1-3,fy1-3,6,6)}}
else if(fx.kind==="lock"){for(let i=0;i<3;i++){const rr2=20+fx.t*130-i*22;if(rr2>20){ctx.globalAlpha=Math.max(0,0.6-rr2/260);ctx.strokeStyle="#7a5aa0";ctx.lineWidth=4;ctx.beginPath();ctx.arc(px,py-30,rr2,0,Math.PI*2);ctx.stroke()}}ctx.globalAlpha=1;if(land){ctx.fillStyle="#7a5aa0";ctx.fillRect(px-11,py-54,22,18);ctx.strokeStyle="#e8dcc0";ctx.lineWidth=3;ctx.beginPath();ctx.arc(px,py-54,7,-Math.PI,0);ctx.stroke()}}
else if(fx.kind==="heavy"){const hy=-40+(py+40)*easeIn(fly);ctx.fillStyle="#bfe6f5";ctx.beginPath();ctx.moveTo(px-26,hy-64);ctx.lineTo(px+26,hy-64);ctx.lineTo(px,hy+6);ctx.closePath();ctx.fill();ctx.fillStyle="#8fd0ee";ctx.beginPath();ctx.moveTo(px-12,hy-64);ctx.lineTo(px+8,hy-64);ctx.lineTo(px,hy-12);ctx.closePath();ctx.fill()}
else if(fx.kind==="stun"){if(land){ctx.strokeStyle="#ffe95e";ctx.lineWidth=5;ctx.lineCap="round";ctx.shadowBlur=0;ctx.beginPath();let lx=px+16;ctx.moveTo(lx,-6);for(let sg=1;sg<=6;sg++){lx=px+16+(bossRnd(sg*3.1+fx.seed)-0.5)*36;ctx.lineTo(lx,py*sg/6)}ctx.stroke();ctx.shadowBlur=0}}
else if(fx.kind==="godhand"&&HAND_MAIN){const hw=H*0.62,k4=easeIn(fly);const hy2=-hw*0.4+(py+hw*0.4)*k4;const hwd=hw*(HAND_MAIN.width/HAND_MAIN.height);ctx.save();ctx.globalAlpha=0.95;ctx.translate(px,hy2);ctx.rotate(Math.PI);ctx.drawImage(HAND_MAIN,-hwd/2,-hw/2,hwd,hw);ctx.restore()}
ctx.restore()}
if(PFX.stunT>0&&G.phase==="fighting"){ctx.save();ctx.fillStyle="#ffcf3f";ctx.textAlign="center";ctx.font="900 15px Nunito, sans-serif";for(const hx of [W*0.14,W*0.86]){for(let i=0;i<3;i++){const a=G.time*4.2+i*2.094;ctx.globalAlpha=0.65+0.35*Math.sin(G.time*9+i);ctx.fillText("★",hx+Math.cos(a)*17,H*0.64+Math.sin(a)*6)}}ctx.restore();ctx.globalAlpha=1}
if(PFX.burnT>0&&G.phase==="fighting"){ctx.save();for(let i=0;i<7;i++){const ex=bossRnd(i*7.3)*W,ey=H*0.8-bossRnd(i*3.7)*30-((G.time*40+i*13)%26);ctx.globalAlpha=0.5+0.4*Math.sin(G.time*11+i);ctx.fillStyle=i%2?"#ef7d1a":"#d63c30";ctx.fillRect(ex,ey,4,4)}ctx.restore();ctx.globalAlpha=1}
if(G.venomT>0){ctx.fillStyle="rgba(67,176,76,"+Math.min(0.3,G.venomT*0.85).toFixed(3)+")";ctx.fillRect(geo.cx-geo.w/2,geo.feetY-geo.h,geo.w,geo.h)}
if(SP.venom){ctx.save();ctx.fillStyle="rgba(67,176,76,.15)";ctx.fillRect(geo.cx-geo.w/2,geo.feetY-geo.h,geo.w,geo.h);ctx.fillStyle="#43b04c";for(let i=0;i<4;i++){const dx=geo.cx+(bossRnd(i*5.1)-0.5)*geo.w*0.7,dy=geo.feetY-geo.h+bossRnd(i*9.3)*geo.h*0.5+((G.time*26+i*17)%22);ctx.fillRect(dx,dy,4,7)}ctx.restore()}}

function drawSpecialFx(){const e=G.enemy;if(!e)return;const geo=enemyGeom();if(SP.beamT>0){const bx=geo.cx;ctx.save();ctx.globalAlpha=0.3;ctx.fillStyle="#39c2d8";ctx.fillRect(bx-13,0,26,geo.feetY-geo.h*0.4);ctx.globalAlpha=0.85;ctx.fillStyle="#7ee7f5";ctx.fillRect(bx-5,0,10,geo.feetY-geo.h*0.4);ctx.fillStyle="#e8fdff";ctx.fillRect(bx-2,0,4,geo.feetY-geo.h*0.4);ctx.restore()}if(SP.curseT>0){ctx.save();ctx.strokeStyle="#b48ce0";ctx.lineWidth=3;ctx.globalAlpha=0.65+Math.sin(G.time*7)*0.2;ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY-geo.h*0.45,geo.w*0.42,geo.h*0.5,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#7a5aa0";for(let k=0;k<5;k++){const a=G.time*2.2+k*1.256;ctx.globalAlpha=0.7;ctx.fillRect(geo.cx+Math.cos(a)*geo.w*0.38-2,geo.feetY-geo.h*0.45+Math.sin(a)*geo.h*0.42-2,4,4)}ctx.restore()}if(SP.meteorT>0){const t=1-SP.meteorT/0.55;const mx=geo.cx+120-t*120,my=-30+t*(geo.feetY-geo.h*0.55+30);ctx.save();ctx.fillStyle="#7a4a21";ctx.beginPath();ctx.arc(mx,my,13,0,Math.PI*2);ctx.fill();ctx.fillStyle="#ef7d1a";ctx.beginPath();ctx.arc(mx-3,my-3,8,0,Math.PI*2);ctx.fill();ctx.fillStyle="#ffcf3f";ctx.beginPath();ctx.arc(mx-4,my-4,4,0,Math.PI*2);ctx.fill();ctx.restore();if(t>0.85){ctx.save();ctx.strokeStyle="#ffd23e";ctx.lineWidth=4;ctx.globalAlpha=Math.max(0,(1-t)*3);ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY-geo.h*0.5,30,10,0,0,Math.PI*2);ctx.stroke();ctx.restore()}}}
function renderSpecials(){const sc=$("specCoins")||$("skillCoins");if(sc)sc.innerHTML=COIN_SVG+" "+fmtNum(G.totalCoins);const un=CONFIG.specials.filter((sp)=>specLevel(sp.id)>0).length;const ss=$("specSub");if(ss)ss.textContent=un+" / "+CONFIG.specials.length+" UNLOCKED";const sl=$("specList");if(!sl)return;let html="";for(const sp of CONFIG.specials){const lv=specLevel(sp.id);const bossE=ENEMIES[sp.boss];if(!bossE)continue;if(!lv){html+='<div class="spec-row locked"><span class="spec-ico lg" style="background:#4a3a26">??</span><div class="spec-main"><div class="spec-name">???</div><div class="spec-desc">Defeat '+bossE.name+' (#'+(sp.boss+1)+') to unlock this special.</div><div class="spec-fx">AT LV 1: '+fmtMult(sp.mult)+'x damage · '+sp.cd+'s cooldown'+(sp.stun?" · stuns enemy attack "+sp.stun+"s":"")+(sp.dur?" · lasts "+sp.dur+"s":"")+(sp.slow?" · enemy half speed while active":"")+'</div></div><div class="spec-state">LOCKED</div></div>';continue}const pips=[1,2,3,4,5].map((n)=>'<i class="'+(n<=lv?"on":"")+'"></i>').join("");const fxLine="NOW: "+fmtMult(specMultNow(sp))+"x damage · "+Math.round(specCdOf(sp))+"s cooldown"+(sp.stun?" · stuns enemy attack "+sp.stun+"s":"")+(sp.dur?" · lasts "+sp.dur+"s":"")+(sp.slow?" · enemy half speed while cursed":"");const nextLine=lv<5?'<div class="spec-fx" style="color:var(--gold-dark)">NEXT LV '+(lv+1)+": "+fmtMult(specMultNow(sp)*1.25)+"x damage · "+Math.round(specCdOf(sp)*0.96)+"s cooldown</div>":'<div class="spec-fx" style="color:var(--gold-dark)">MAX LEVEL — fully upgraded</div>';let btn;if(lv>=5)btn='<button class="skin-btn equipped" disabled>MAX LV</button>';else{const cost=specUpgCost(sp,lv),gems=(sp.id==="zeus"&&lv===4)?25:0;const afford=G.totalCoins>=cost&&G.gems>=gems;btn='<button class="skin-btn spec-upg" data-specupg="'+sp.id+'"'+(afford?"":" disabled")+'>'+(afford?"UPGRADE · ":"NEED ")+COIN_SVG+" "+fmtNum(cost)+(gems?" + "+GEM_SVG_SM+" "+gems:"")+"</button>"}html+='<div class="spec-row"><span class="spec-ico lg" style="background:'+SPEC_COLORS[sp.id]+'">'+SPEC_MONO[sp.id]+'</span><div class="spec-main"><div class="spec-name">'+sp.name+' · LV '+lv+'</div><div class="spec-desc">'+sp.desc+'</div><div class="spec-fx">'+fxLine+'</div>'+nextLine+'<div class="spec-pips">'+pips+"</div></div>"+btn+"</div>"}sl.innerHTML=html;const ubs=sl.querySelectorAll("[data-specupg]");for(let i=0;i<ubs.length;i++)ubs[i].addEventListener("click",()=>buySpecUpgrade(ubs[i].getAttribute("data-specupg")))}
function buySpecUpgrade(id){const sp=specDef(id);const lv=specLevel(id);if(!sp||!lv||lv>=5)return;const cost=specUpgCost(sp,lv),gems=(id==="zeus"&&lv===4)?25:0;if(G.totalCoins<cost||G.gems<gems)return;G.totalCoins-=cost;if(gems){G.gems-=gems;updateGemHud()}G.specials[id]=lv+1;Sound.buy();syncCoinsToTruth();renderSpecials();renderSpecRail();Save.store()}
function enemyCurInterval(){const e=G.enemy;if(!e)return 1;return e.atkInterval*(e.enraged?CONFIG.boss.enrageIntervalMult:1)*(SP.curseT>0?2:1)*(SP.venom?1/0.85:1)}function updateAtkBar(){const e=G.enemy;if(!e)return;const frac=Math.max(0,Math.min(1,G.enemyAtkT/enemyCurInterval()));atkFillEl.style.width=frac*100+"%";atkRowEl.classList.toggle("warn",G.phase==="fighting"&&G.enemyAtkT<=1);atkTimeEl.textContent=Math.max(0,G.enemyAtkT).toFixed(1)+"s"}function updateCoinHud(){coinCountEl.textContent=fmtNum(G.shownCoins);coinCountEl.classList.remove("bump");coinCountEl.offsetWidth;coinCountEl.classList.add("bump")}function updateGemHud(){gemCountEl.textContent=fmtNum(G.gems);const hub=$("hubGemCount");if(hub)hub.textContent=fmtNum(G.gems)}function updateKills(){killEl.textContent="KOs "+G.kills}function updateComboTag(){const st=stats();if(G.comboStack>=2&&st.comboMax>0){comboTagEl.style.display="block";comboTagEl.textContent="COMBO x"+Math.min(G.comboStack,st.comboMax)}else comboTagEl.style.display="none"}function pulseDps(){if(!dpsPillEl)return;dpsPillEl.classList.remove("pulse");dpsPillEl.offsetWidth;dpsPillEl.classList.add("pulse")}const ATTR_DESCS={
  power:"Raw damage on every slap.",
  speed:"How fast your hands cycle.",
  critChance:"Chance a slap lands critical.",
  critDamage:"How hard critical slaps hit.",
  defense:"Reduces incoming enemy attack damage.",
  stun:"Chance to stun the enemy & freeze their attack.",
  combo:"Damage bonus for every combo stack.",
  coinMult:"Multiplies every coin you earn.",
  accuracy:"Chance a slap actually lands.",
  bossDamage:"Deals bonus damage against Elites & Bosses.",
  vampirism:"Leech vitality from slaps to recover your hands HP.",
  luck:"Chance for Lucky Slaps dealing 1.75x dmg & 2.5x coins.",
  luck:"Chance for Lucky Slaps dealing 1.75x dmg & 2.5x coins."
};
const ATTR_SVGS={
  power:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3 4 6l4 4 3-3-4-4zm10 0-4 4 3 3 4-4-3-3zM5 13c-1.2 1.5-2 3.4-2 5 1.9-.1 3.6-.8 5-2l-3-3zm14 0-3 3c1.4 1.2 3.1 1.9 5 2-.1-1.6-.8-3.5-2-5zM12 8l-2.5 2.5L12 13l2.5-2.5L12 8z" fill="#d63c30"/></svg>',
  speed:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13.5H11L9.8 22 19 10h-6.5L13 2z" fill="#39c2d8" stroke="#177e96" stroke-width="1.2"/></svg>',
  critChance:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#ef7d1a" stroke-width="2.2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#ef7d1a" stroke-width="2"/><circle cx="12" cy="12" r="1.5" fill="#ef7d1a"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="#ef7d1a" stroke-width="2" stroke-linecap="round"/></svg>',
  critDamage:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.8 5.6 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9L12 1z" fill="#ef7d1a" stroke="#b3540a" stroke-width="1.4"/></svg>',
  defense:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V5l-8-3z" fill="#4392f1" stroke="#1f58b0" stroke-width="1.5"/></svg>',
  stun:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.4 5.2 5.6.8-4 4 1 5.6-5-2.8-5 2.8 1-5.6-4-4 5.6-.8L12 3z" fill="#9b51e0" stroke="#6829a8" stroke-width="1.3"/><circle cx="12" cy="12" r="2" fill="#ffd13b"/></svg>',
  combo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7h8a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4z" fill="none" stroke="#ff9f1c" stroke-width="2.2"/><circle cx="9" cy="12" r="2.2" fill="#ff9f1c"/><circle cx="15" cy="12" r="2.2" fill="#ff9f1c"/></svg>',
  coinMult:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#fde047" stroke="#652b00" stroke-width="1.8"/><circle cx="12" cy="12" r="6.5" fill="#eab308" stroke="#a16207" stroke-width="1.1"/><path d="M12 8.5v7M8.5 12h7" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#ffffff"/><path d="M6 10a7 7 0 0 1 8-4" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/></svg>',
  bossDamage:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l-1.5-9L14 13l-2-6-2 6-5.5-4L3 18zm0 2.2h18V22H3v-1.8z" fill="#d63c30"/></svg>',
  vampirism:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C6 16.5 2.5 12.8 2.5 8.9 2.5 5.9 4.9 3.5 7.9 3.5c1.7 0 3.2.8 4.1 2.1.9-1.3 2.4-2.1 4.1-2.1 3 0 5.4 2.4 5.4 5.4 0 3.9-3.5 7.6-9.5 12.1z" fill="#d63c30" stroke="#8f1f16" stroke-width="1.4"/></svg>',
  luck:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3zM2 12a3 3 0 0 0 3 3c2 0 5-3 5-3s-3-3-5-3a3 3 0 0 0-3 3zm10 10a3 3 0 0 0 3-3c0-2-3-5-3-5s-3 3-3 5a3 3 0 0 0 3 3zm10-10a3 3 0 0 0-3-3c-2 0-5 3-5 3s3 3 5 3a3 3 0 0 0 3-3z" fill="#2e7d32"/></svg>',
  accuracy:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.5" fill="none" stroke="#d63c30" stroke-width="2.5"/><circle cx="12" cy="12" r="2" fill="#d63c30"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#d63c30" stroke-width="2.5" stroke-linecap="round"/></svg>'
};
function statsWith(key){const old=G.attrs[key]||0;G.attrs[key]=old+1;const st=stats();G.attrs[key]=old;return st}
function attrCurText(key,st){st=st||stats();switch(key){case"power":return"DMG <b>"+fmtNum(st.damage)+"</b>";case"speed":return"<b>"+fmt2(st.interval)+"s</b> / hit";case"critChance":return"<b>"+Math.round(st.critChance*100)+"%</b> chance";case"critDamage":return"<b>×"+fmtVal(st.critMult)+"</b> crit";case"defense":return"<b>-"+Math.round((st.damageReduction||0)*100)+"%</b> damage taken";case"stun":return"<b>"+Math.round((st.stunChance||0)*100)+"%</b> · <b>"+fmt2(st.stunDuration||0)+"s</b>";case"combo":return(G.attrs.combo===0||!G.attrs.combo)&&!hasSkill("comboMastery")?"no stacks yet":"<b>+"+Math.round(st.comboPer*100)+"%</b>/hit · ≤<b>"+st.comboMax+"</b>";case"coinMult":return"<b>×"+fmtVal(st.coinMult)+"</b> coins";
    case"bossDamage":return"+<b>"+Math.round(((st.bossDmgMult||1)-1)*100)+"%</b> vs Bosses";
    case"vampirism":return"+<b>"+Math.max(1,Math.round((G.attrs.vampirism||0)*(CONFIG.fx.vampPerLevel||0.334)))+" HP</b> / 6 hits";
    case"luck":return"<b>"+fmtVal((st.luckChance||0)*100)+"%</b> lucky strike";
    case"tenacity":return"-<b>"+Math.round(((G.attrs.tenacity||0)*0.02)*100)+"%</b> debuff time"}return""}
function attrNextText(key){const st=statsWith(key);switch(key){case"power":return"DMG "+fmtNum(st.damage);case"speed":return fmt2(st.interval)+"s / hit";case"critChance":return Math.round(st.critChance*100)+"%";case"critDamage":return"×"+fmtVal(st.critMult);case"defense":return"-"+Math.round((st.damageReduction||0)*100)+"%";case"stun":return Math.round((st.stunChance||0)*100)+"% / "+fmt2(st.stunDur||0)+"s";case"combo":return"+"+Math.round(st.comboPer*100)+"%/hit · ≤"+st.comboMax;case"coinMult":return"×"+fmtVal(st.coinMult);
    case"bossDamage":return"+"+Math.round(((st.bossDmgMult||1)-1)*100)+"% vs Boss";
    case"vampirism":return"+"+Math.max(1,Math.round(((G.attrs.vampirism||0)+1)*(CONFIG.fx.vampPerLevel||0.334)))+" HP leech";
    case"luck":return fmtVal(((st.luckChance||0)+CONFIG.fx.luckPerLevel)*100)+"% lucky";
    case"tenacity":return"-"+Math.round((((G.attrs.tenacity||0)+1)*CONFIG.fx.tenacityPerLevel)*100)+"% debuff";case"accuracy":return"Hit "+Math.round(st.hitChance*100)+"%";case"special":return fmtVal(st.specialChance*100)+"%"}return""}
function attrNextShort(key){const st=statsWith(key);switch(key){case"power":return"DMG "+fmtNum(st.damage);case"speed":return fmt2(st.interval)+"s";case"critChance":return Math.round(st.critChance*100)+"%";case"critDamage":return"×"+fmtVal(st.critMult);case"defense":return"-"+Math.round((st.damageReduction||0)*100)+"%";case"stun":return Math.round((st.stunChance||0)*100)+"% / "+fmt2(st.stunDur||0)+"s";case"combo":return"+"+Math.round(st.comboPer*100)+"%";case"coinMult":return"×"+fmtVal(st.coinMult);case"bossDamage":return"+"+Math.round(((st.bossDmgMult||1)-1)*100)+"%";case"vampirism":return"+"+Math.max(1,Math.round(((G.attrs.vampirism||0)+1)*(CONFIG.fx.vampPerLevel||0.334)))+" HP";case"luck":return fmtVal(((st.luckChance||0)+CONFIG.fx.luckPerLevel)*100)+"%";case"tenacity":return"-"+Math.round((((G.attrs.tenacity||0)+1)*CONFIG.fx.tenacityPerLevel)*100)+"%";case"accuracy":return Math.round(st.hitChance*100)+"%";case"special":return fmtVal(st.specialChance*100)+"%"}return""}
function attrFxText(key){return attrCurText(key)}
function renderAttrs(){const cap=attrCap();levelValEl.textContent=G.level;capNoteEl.textContent="· CAP LV "+cap;const lc=levelUpCost();const lock=false;const atMax=!!(CONFIG.levelCap&&G.level>=CONFIG.levelCap);const luHtml=atMax?"MAX LEVEL":lock?"🔒 LEVEL UP":"LEVEL UP → "+(G.level+1)+" · "+COIN_SVG+" "+fmtNum(lc);levelUpBtnEl.innerHTML=luHtml;levelUpBtnEl.disabled=atMax||lock||G.totalCoins<lc;let html="";for(const key of CONFIG.attrOrder){const d=CONFIG.attrs[key],lvl=G.attrs[key];const itemCap=attrCap(key);const isMaxLvl=lvl>=(d.maxLevel||999);const atCap=lvl>=itemCap;const maxTarget=d.maxLevel||itemCap;const capLabel=isMaxLvl?'LV '+lvl+' / '+maxTarget+' MAX':'LV '+lvl+' / '+itemCap;const btnHtml=lock?'<button class="up-btn max" disabled>🔒</button>':isMaxLvl?'<button class="up-btn max" disabled>MAX</button>':atCap?'<button class="up-btn max" disabled>CAP</button>':'<button class="up-btn" data-attr="'+key+'"'+(G.totalCoins<attrCost(key)?" disabled":"")+'><span class="up-target">→ '+attrNextShort(key)+'</span><span class="up-price">'+COIN_SVG+' '+fmtNum(attrCost(key))+'</span></button>';const icoSvg=ATTR_SVGS[key]||"";html+='<div class="attr-tile"><div class="at-name"><span class="at-title-wrap"><span class="at-ico">'+icoSvg+'</span><span class="at-label">'+d.name+'</span></span><span class="at-lv">'+capLabel+'</span></div>'+'<div class="at-desc">'+ATTR_DESCS[key]+"</div>"+'<div class="at-fx">'+attrFxText(key)+"</div>"+btnHtml+"</div>"}attrListEl.innerHTML=html;const btns=attrListEl.querySelectorAll(".up-btn[data-attr]");for(let i=0;i<btns.length;i++){btns[i].addEventListener("click",()=>buyAttr(btns[i].getAttribute("data-attr")))}renderAttrsPage(luHtml,lc)}
function renderAttrsPage(luHtml,lc){const listEl=$("attrsList");if(!listEl)return;const lGate=attrLevelGate();$("attrsSub").textContent="PLAYER LEVEL "+G.level+" · CAP "+lGate+" PER ATTRIBUTE";$("attrsCoins").innerHTML=COIN_SVG+" "+fmtNum(G.totalCoins);$("attrsLevelVal").textContent=G.level;$("attrsCapVal").textContent=lGate;$("attrsDps").innerHTML="DPS <b>"+fmtDPS(DamageCalculator.theoreticalDPS())+"</b> · MAX HP <b>"+fmtNum(playerMaxHp())+"</b>";const pageLu=$("attrsLevelUpBtn");pageLu.innerHTML=luHtml;pageLu.disabled=G.totalCoins<lc;let html="";for(const key of CONFIG.attrOrder){const d=CONFIG.attrs[key],lvl=G.attrs[key]||0;const pMax=attrPermanentMax(key);const effCap=attrEffectiveCap(key);const isMax=lvl>=pMax;const atGate=lvl>=lGate&&!isMax;const cost=attrCost(key);const can=G.totalCoins>=cost&&!atGate&&!isMax;const capLabel=isMax?'LV '+lvl+' / '+pMax+' <b style="color:var(--gold);">MAX</b>':'LV '+lvl+' / '+effCap;const btnHtml=isMax?'<button class="up-btn ar-btn max" disabled>MAX</button>':atGate?'<button class="up-btn ar-btn max" disabled>REQ PLAYER LV '+(Math.floor(lvl/CONFIG.capPerLevel)+1)+'</button>':'<button class="up-btn ar-btn" data-attr="'+key+'"'+(can?'':' disabled')+'><span class="ar-up-label">UPGRADE →</span><div class="ar-up-vals"><span class="ar-up-next">'+attrNextText(key)+'</span><span class="ar-up-cost">'+COIN_SVG+' '+fmtNum(cost)+'</span></div></button>';const icoSvg=ATTR_SVGS[key]||"";html+='<div class="attr-row"><div class="ar-main"><div class="ar-name"><span class="ar-title-wrap"><span class="ar-ico">'+icoSvg+'</span><span class="ar-label">'+d.name+'</span></span><span class="at-lv">'+capLabel+'</span></div><div class="ar-desc">'+ATTR_DESCS[key]+'</div><div class="ar-cur">'+attrCurText(key)+'</div></div>'+btnHtml+'</div>'}listEl.innerHTML=html;const btns=listEl.querySelectorAll(".up-btn[data-attr]");for(let i=0;i<btns.length;i++){btns[i].addEventListener("click",()=>buyAttr(btns[i].getAttribute("data-attr")))}const perks=CONFIG.levelAbilities.filter((ab)=>G.level>=ab.level).length;const totalAb=CONFIG.levelAbilities.length;const subEl=$("perksToggleSub");if(subEl)subEl.textContent="LV 2 TO 20+ · "+perks+"/"+totalAb+" ACTIVE";$("perksHead").innerHTML="PLAYER LEVEL "+G.level+" — "+perks+"/"+totalAb+" PERKS ACTIVE";let icons="";for(const ab of CONFIG.levelAbilities){if(G.level>=ab.level)icons+='<img src="'+iconUrl("ability",ab.id)+'" alt="'+ab.name+'" title="'+ab.name+'">'}if(G.level>=21)icons+='<img src="'+iconUrl("ability","mastery")+'" alt="Mastery" title="Mastery">';$("perksIcons").innerHTML=icons;$("perksList").innerHTML=abilitiesHtml()}function setPanel(open,skipSave){G.panelOpen=!!open;attrPanelEl.classList.toggle("open",G.panelOpen);attrToggleEl.setAttribute("aria-expanded",G.panelOpen?"true":"false");requestAnimationFrame(resize);if(!skipSave)Save.store()}attrToggleEl.addEventListener("click",()=>{Sound.unlock();setPanel(!G.panelOpen)});const pToggle=$("perksToggle"),pAcc=$("perksAccordion"),pHint=$("perksToggleHint");if(pToggle&&pAcc){pToggle.addEventListener("click",()=>{Sound.unlock();const open=pAcc.classList.toggle("open");pToggle.setAttribute("aria-expanded",open?"true":"false");if(pHint)pHint.textContent=open?"HIDE":"SHOW"})}const aToggle=$("abilitiesToggle"),aWrap=$("abilitiesWrap"),aHint=$("abilitiesToggleHint");if(aToggle&&aWrap){aToggle.addEventListener("click",()=>{Sound.unlock();const open=aWrap.classList.toggle("open");aToggle.setAttribute("aria-expanded",open?"true":"false");if(aHint)aHint.textContent=open?"HIDE":"SHOW"})}function syncCoinsToTruth(){G.shownCoins=G.totalCoins;updateCoinHud()}function upgradesLocked(){return false;}function buyAttr(key){if(upgradesLocked())return;const maxLvl=CONFIG.attrs[key]?(CONFIG.attrs[key].maxLevel||999):999;if(G.attrs[key]>=maxLvl||G.attrs[key]>=attrCap(key))return;const cost=attrCost(key);if(G.totalCoins<cost)return;G.totalCoins-=cost;G.attrs[key]+=1;dailyAdd("buys",1);syncCoinsToTruth();if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS());pulseDps();Sound.buy();renderAttrs();Save.store()}function buyLevel(){if(upgradesLocked())return;const cost=levelUpCost();if(G.totalCoins<cost)return;G.totalCoins-=cost;G.level+=1;dailyAdd("buys",1);G.playerHp=Math.min(playerMaxHp(),G.playerHp+CONFIG.playerHp.perLevel);updatePlayerBar();syncCoinsToTruth();if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS());pulseDps();Sound.levelup();renderAttrs();Save.store();showLevelUp()}levelUpBtnEl.addEventListener("click",buyLevel);$("attrsLevelUpBtn").addEventListener("click",buyLevel);let luTimer=0;function showLevelUp(){const ab=CONFIG.levelAbilities.find((x)=>x.level===G.level);luHeadEl.textContent="LEVEL "+G.level+"!";if(ab){luNewEl.textContent="NEW ABILITY";luIconEl.src=iconUrl("ability",ab.id);luIconEl.alt=ab.name;luNameEl.textContent=ab.name.toUpperCase();luFxEl.textContent=ab.fx}else{const pct=Math.max(0,G.level-10)*Math.round(CONFIG.abilityFx.masteryPer*100);luNewEl.textContent="MASTERY GROWS";luIconEl.src=iconUrl("ability","mastery");luIconEl.alt="Mastery";luNameEl.textContent="MASTERY +"+pct+"%";luFxEl.textContent="+2% damage for every level above 10 — your slaps now hit "+pct+"% harder, permanently."}levelUpOverlayEl.classList.add("open");G.levelUpHold=true;clearTimeout(luTimer);luTimer=setTimeout(dismissLevelUp,2500)}function dismissLevelUp(){clearTimeout(luTimer);levelUpOverlayEl.classList.remove("open");G.levelUpHold=false}levelUpOverlayEl.addEventListener("click",dismissLevelUp);bossIntroEl.addEventListener("click",()=>{Sound.unlock();endBossIntro()});const FLAME_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c2.2 4.2 6.5 6.9 6.5 11.2a6.5 6.5 0 0 1-13 0C5.5 8.9 9.8 6.2 12 2z" fill="#d63c30"/><path d="M12 9.5c1.1 2 3.2 3.4 3.2 5.7a3.2 3.2 0 0 1-6.4 0c0-2.3 2.1-3.7 3.2-5.7z" fill="#ffb03a"/></svg>';const CROWN_SVG='<svg class="crown-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l-1.5-9L14 13l-2-6-2 6-5.5-4L3 18zm0 2.2h18V22H3v-1.8z" fill="currentColor"/></svg>';let selectGen=0;function enemyUnlocked(idx){if(G.testMode)return true;if(idx>=50)return false;if(idx>=G.unlocked)return false;if(idx>0&&idx%10===5&&G.gauntletCleared.indexOf(idx/5-1)<0)return false;return true}function selectGroupHtml(g){let cleared=0;for(let k=0;k<5;k++)if(G.defeated.has(g*5+k))cleared++;let track="";for(let k=0;k<5;k++){const idx=g*5+k;track+=(k?'<span class="slink'+(G.defeated.has(idx-1)&&G.defeated.has(idx)?" done":"")+'"></span>':"")+'<span class="snode'+(G.defeated.has(idx)?" done":idx===G.current?" cur":"")+'"></span>'}let html='<section class="sel-group g'+(g+1)+'"><div class="sel-ghead"><h3>GROUP '+(g+1)+" · "+GROUPS[g].name.toUpperCase()+"</h3>"+'<span class="sel-gprog">'+(g>=10&&!G.testMode?"COMING SOON \u00B7 ":"")+cleared+"/5 CLEARED · "+(G.groupRewards.indexOf(g)>=0?"GROUP REWARD CLAIMED ✓":"GROUP REWARD: "+fmtNum(groupRewardCoins(g))+" COINS")+"</span>"+"</div>"+'<div class="sel-track">'+track+'</div><div class="sel-cards">';for(let k=0;k<5;k++){const e=ENEMIES[g*5+k];const soon=e.idx>=50&&!G.testMode;const unlocked=enemyUnlocked(e.idx),gated=!soon&&!unlocked&&e.idx<G.unlocked,done=G.defeated.has(e.idx),cur=e.idx===G.current;const cls="ecard"+(unlocked?"":" locked")+(done?" done":"")+(cur?" current":"")+(done?" hard-avail":"");const chip=soon?'<span class="chip">COMING SOON</span>':gated?'<span class="chip gate">\u2694 TRIO GATE</span>':!unlocked?'<span class="chip">LOCKED</span>':cur?'<span class="chip">CURRENT</span>':done?'<span class="chip">CLEARED ✓</span>':'<span class="chip">OPEN</span>';html+='<div class="'+cls+'" data-enemy="'+e.idx+'">'+'<img src="'+e.spr.thumb+'" alt="">'+'<div class="nm">'+(e.boss||e.elite?CROWN_SVG+" ":"")+((unlocked||gated)&&!soon?e.name:"???")+"</div>"+chip+(done&&e.boss&&CONFIG.bossSpecials[e.idx]?'<div class="st spec-line">⚠ SPECIAL: '+CONFIG.bossSpecials[e.idx].name+" — "+CONFIG.bossSpecials[e.idx].blurb+"</div>":"")+(done&&e.boss&&CONFIG.healBosses&&CONFIG.healBosses[e.idx]?'<div class="st spec-line">\u2625 HEAL: '+CONFIG.healBosses[e.idx].name+" \u2014 "+CONFIG.healBosses[e.idx].blurb+"</div>":"")+'<div class="st">'+(soon?"Coming soon \u2014 new challengers are being forged":gated?"Clear the "+GROUPS[g-1].name+" TRIO GAUNTLET to unlock":unlocked?"HP "+fmtNum(e.hp)+" · Bounty "+fmtNum(e.bounty)+" coins":"Locked")+"</div>"+(cur&&unlocked?'<button class="ecard-fight" data-fight="'+e.idx+'">FIGHT</button>':"")+(done?'<button class="ecard-hard'+(G.hardCleared.has(e.idx)?" done":"")+'" data-hard="'+e.idx+'">'+FLAME_SVG+(G.hardCleared.has(e.idx)?" HARD \u2713":" HARD")+"</button>":unlocked?'<div class="ecard-hard locked">HARD — DEFEAT FIRST</div>':"")+"</div>"}let trioBar="";if(g%2===0&&(cleared===5||G.testMode)){const tDone=G.gauntletCleared.indexOf(g)>=0;trioBar='<button class="sel-trio-bar'+(tDone?" done":" req")+'" data-trio="'+g+'"><span class="stb-t">\u2694 TRIO GAUNTLET'+(tDone?" \u2713 CLEARED":g<19?" \u00B7 REQUIRED TO ADVANCE":"")+'</span><span class="stb-s">'+(tDone?"Replay the trio back-to-back for bonus coins":g<19?"The group\'s 3 toughest, back-to-back, your HP carries over \u2014 beat them to unlock "+GROUPS[g+1].name:"The final trio \u2014 the group\'s 3 toughest, back-to-back, your HP carries over")+'</span></button>'}return html+"</div></section>"+trioBar}function updateSelectUI(idx){if(!selListEl)return;const prevCards=selListEl.querySelectorAll(".ecard.current");for(let i=0;i<prevCards.length;i++){const pc=prevCards[i];pc.classList.remove("current");const pIdx=parseInt(pc.getAttribute("data-enemy"),10);const pDone=G.defeated.has(pIdx);const chip=pc.querySelector(".chip");if(chip)chip.textContent=pDone?"CLEARED ✓":"OPEN";const fightBtn=pc.querySelector(".ecard-fight");if(fightBtn)fightBtn.remove()}const newCard=selListEl.querySelector('.ecard[data-enemy="'+idx+'"]');if(newCard){newCard.classList.add("current");const chip=newCard.querySelector(".chip");if(chip)chip.textContent="CURRENT";if(!newCard.querySelector(".ecard-fight")){const btn=document.createElement("button");btn.className="ecard-fight";btn.setAttribute("data-fight",idx);btn.textContent="FIGHT";btn.addEventListener("click",(ev)=>{ev.stopPropagation();chooseEnemy(idx)});const hardBtn=newCard.querySelector(".ecard-hard");if(hardBtn)newCard.insertBefore(btn,hardBtn);else newCard.appendChild(btn)}}const prevNodes=selListEl.querySelectorAll(".snode.cur");for(let i=0;i<prevNodes.length;i++)prevNodes[i].classList.remove("cur");const gIdx=Math.floor(idx/5);const grp=selListEl.querySelector(".sel-group.g"+(gIdx+1));if(grp){const dots=grp.querySelectorAll(".snode");if(dots[idx%5]&&!G.defeated.has(idx))dots[idx%5].classList.add("cur")}}function wireSelectCards(){const cards=selListEl.querySelectorAll(".ecard[data-enemy]:not([data-w])");for(let i=0;i<cards.length;i++){cards[i].setAttribute("data-w","1");cards[i].addEventListener("click",()=>{const idx=parseInt(cards[i].getAttribute("data-enemy"),10);if(!enemyUnlocked(idx))return;Sound.unlock();if(G.current===idx){chooseEnemy(idx);return}G.current=idx;Save.store();updateSelectUI(idx)})}const fights=selListEl.querySelectorAll("[data-fight]:not([data-w])");for(let i=0;i<fights.length;i++){fights[i].setAttribute("data-w","1");fights[i].addEventListener("click",(ev)=>{ev.stopPropagation();chooseEnemy(parseInt(fights[i].getAttribute("data-fight"),10))})}const hards=selListEl.querySelectorAll("[data-hard]:not([data-w])");for(let i=0;i<hards.length;i++){hards[i].setAttribute("data-w","1");hards[i].addEventListener("click",(ev)=>{ev.stopPropagation();startHardFight(parseInt(hards[i].getAttribute("data-hard"),10))})}const trios=selListEl.querySelectorAll("[data-trio]:not([data-w])");for(let i=0;i<trios.length;i++){trios[i].setAttribute("data-w","1");trios[i].addEventListener("click",(ev)=>{ev.stopPropagation();startGauntlet(parseInt(trios[i].getAttribute("data-trio"),10))})}}function renderSelect(){const lBtn=$("levelsTestModeBtn");if(lBtn){lBtn.textContent=G.testMode?"TEST: ON":"TEST MODE";lBtn.classList.toggle("off",!G.testMode);lBtn.classList.toggle("active",G.testMode);if(G.testMode){lBtn.style.background="var(--gold)";lBtn.style.color="#2b1c10"}else{lBtn.style.background="";lBtn.style.color=""}}selProgressEl.textContent=G.defeated.size+" / "+ENEMIES.length+" defeated · "+G.hardCleared.size+" hard clears"+(G.testMode?" · ⚡ TEST MODE (ALL UNLOCKED)":"");const prevScroll=selListEl?selListEl.scrollTop:0;let html="";for(let g=0;g<GROUPS.length;g++)html+=selectGroupHtml(g);selListEl.innerHTML=html;wireSelectCards();if(prevScroll>0&&selListEl){selListEl.scrollTop=prevScroll}else{requestAnimationFrame(()=>{const curCard=selListEl.querySelector(".ecard.current");if(curCard)curCard.scrollIntoView({block:"center",behavior:"auto"})})}}function chooseEnemy(idx){if(!enemyUnlocked(idx))return;G.current=idx;G.hardMode=false;G.pendingRespawn=false;Save.store();switchTab("battle")}function startHardFight(idx){if(!G.defeated.has(idx))return;G.current=idx;G.hardMode=true;G.pendingRespawn=false;Save.store();switchTab("battle")}function startGauntlet(g){if(!groupComplete(g)&&!G.testMode)return;const q=[g*5+2,g*5+3,g*5+4];G.fightMode={type:"gauntlet",group:g,queue:q,step:0};G.current=q[0];G.hardMode=false;G.pendingRespawn=false;G.modeAdvance=true;Save.store();switchTab("battle");G.dmgNums.push({x:W/2,y:H*0.22,vy:-10,t:0,life:2.0,text:"\u2694 GAUNTLET \u00B7 FIGHT 1/3",tag:"banner_title",rot:0});G.dmgNums.push({x:W/2,y:H*0.29,vy:-10,t:0,life:2.0,text:"HP CARRIES OVER!",tag:"banner_sub",rot:0})}function advanceGauntlet(){const FM=G.fightMode;FM.step+=1;G.carryHp=G.playerHp;G.current=FM.queue[FM.step];G.modeAdvance=true;spawnEnemy(false);G.dmgNums.push({x:W/2,y:H*0.22,vy:-10,t:0,life:2.0,text:"\u2694 GAUNTLET \u00B7 FIGHT "+(FM.step+1)+"/3",tag:"banner_title",rot:0});G.dmgNums.push({x:W/2,y:H*0.29,vy:-10,t:0,life:2.0,text:"HP CARRIES OVER!",tag:"banner_sub",rot:0})}function advanceRush(){const FM=G.fightMode;FM.step+=1;G.carryHp=G.playerHp;G.current=FM.queue[FM.step];G.modeAdvance=true;spawnEnemy(false);G.dmgNums.push({x:W/2,y:H*0.22,vy:-10,t:0,life:2.0,text:"\uD83D\uDC51 BOSS RUSH \u00B7 FIGHT "+(FM.step+1)+"/"+FM.queue.length,tag:"banner_title",rot:0});G.dmgNums.push({x:W/2,y:H*0.29,vy:-10,t:0,life:2.0,text:"HP CARRIES OVER!",tag:"banner_sub",rot:0})}function rushBosses(){return [9,19,29,39,49].filter((i)=>G.defeated.has(i)||G.testMode)}function startBossRush(){const q=rushBosses();if(q.length<2)return;G.fightMode={type:"bossrush",queue:q,step:0,earned:0,t0:G.time};G.current=q[0];G.hardMode=false;G.pendingRespawn=false;G.carryHp=null;G.modeAdvance=true;Save.store();switchTab("battle")}function endlessPool(){const d=Array.from(G.defeated).sort((a,b)=>a-b);return G.testMode?ENEMIES.slice(0,50).map((e)=>e.idx):d}function endlessPick(wave){const pool=endlessPool();if(!pool.length)return 0;const desc=pool.slice().reverse();if(wave%5===0){const bs=desc.filter((i)=>i%10===9);if(bs.length)return bs[(wave/5-1)%bs.length]}return desc[(wave-1)%desc.length]}function startEndless(){if(!endlessPool().length)return;G.fightMode={type:"endless",wave:1,earned:0};G.current=endlessPick(1);G.hardMode=false;G.pendingRespawn=false;G.carryHp=null;G.modeAdvance=true;Save.store();switchTab("battle")}function advanceEndless(){const FM=G.fightMode;const cleared=FM.wave;if(cleared>(G.endlessBest||0)){G.endlessBest=cleared}FM.wave+=1;G.carryHp=Math.min(playerMaxHp(),G.playerHp+Math.round(playerMaxHp()*0.3));G.current=endlessPick(FM.wave);G.modeAdvance=true;spawnEnemy(false);Save.store();G.dmgNums.push({x:W/2,y:H*0.32,vy:-16,t:0,life:1.4,text:"\uD83C\uDF0A WAVE "+FM.wave+" \u00B7 +30% HP RESTORED",tag:"enraged",rot:0})}function skillCostOf(def){return Math.round(def.cost*(CONFIG.fx.skillCostMult||1))} function skillDef(id){if(id==="ironWill")id="aegisBulwark";return CONFIG.skills.find((s)=>s.id===id)||null}function skillState(def){if(hasSkill(def.id))return"owned";if(def.prereq&&!hasSkill(def.prereq))return"locked";if(def.reqBoss!=null&&!G.defeated.has(def.reqBoss))return"locked";if(G.totalCoins<skillCostOf(def))return"poor";return"ready"}function renderSkills(){skillCoinsEl.innerHTML=COIN_SVG+" "+fmtNum(G.totalCoins);skillOwnedEl.textContent=G.skills.length+" / "+CONFIG.skills.length+" SKILLS OWNED";if(!G.selectedSkill||!skillDef(G.selectedSkill)){const ready=CONFIG.skills.find((s)=>skillState(s)==="ready");G.selectedSkill=ready?ready.id:"basic"}let paths='<path d="M50 100 C 50 97.5 50 96 50 93.8" fill="none" stroke="#7a4a21" stroke-width="8" stroke-linecap="round" vector-effect="non-scaling-stroke"/>';for(const def of CONFIG.skills){if(!def.prereq)continue;const a=TREE_POS[def.prereq],bp=TREE_POS[def.id],my=(a[1]+bp[1])/2;const col=hasSkill(def.id)?"#b97e08":hasSkill(def.prereq)?"#a06a32":"rgba(122,74,33,.28)";paths+='<path d="M '+a[0]+" "+a[1]+" C "+a[0]+" "+my+", "+bp[0]+" "+my+", "+bp[0]+" "+bp[1]+'" fill="none" stroke="'+col+'" stroke-width="3.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>'}let nodes="";for(const def of CONFIG.skills){const p=TREE_POS[def.id],st=skillState(def);nodes+='<button class="tnode '+st+(G.selectedSkill===def.id?" selected":"")+'" data-skill="'+def.id+'" style="left:'+p[0]+"%;top:"+p[1]+'%" aria-label="'+def.name+'"><img src="'+iconUrl("skill",def.id)+'" alt=""></button>'}let pillarHtml="";for(const p of TREE_PILLARS)pillarHtml+='<div class="tree-pillar-pill" style="left:'+p.x+'%;top:'+p.y+'%">'+p.name+'</div>';skillTreeEl.innerHTML='<svg class="branches" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'+paths+'</svg>'+pillarHtml+nodes;const btns=skillTreeEl.querySelectorAll(".tnode[data-skill]");for(let i=0;i<btns.length;i++){btns[i].addEventListener("click",()=>{Sound.unlock();G.selectedSkill=btns[i].getAttribute("data-skill");renderSkills()})}renderSkillDetail();renderAbilities();renderSpecials()}function abilitiesHtml(){
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
}function renderAbilities(){const perks=CONFIG.levelAbilities.filter((ab)=>G.level>=ab.level).length;const totalAb=CONFIG.levelAbilities.length;const subEl=$("abilitiesToggleSub");if(subEl)subEl.textContent="LV 2 TO 20+ · "+perks+"/"+totalAb+" UNLOCKED";abilitiesListEl.innerHTML=abilitiesHtml()}function renderSkillDetail(){const def=skillDef(G.selectedSkill)||CONFIG.skills[0];const st=skillState(def);const pre=def.prereq?skillDef(def.prereq):null;const bossReq=(def.reqBoss!=null&&!G.defeated.has(def.reqBoss))?ENEMIES[def.reqBoss]:null;let action;if(st==="owned"){action='<div class="sd-owned">OWNED ✓</div>';}else if(bossReq){action='<button class="ctl-btn end-again" id="skillBuyBtn" disabled style="font-size:12.5px;background:#523b2b!important;color:#dfd1b8!important;">🔒 DEFEAT '+(bossReq.boss?'BOSS ':'ELITE ')+bossReq.name.toUpperCase()+' (#'+(def.reqBoss+1)+')</button>';}else if(st==="locked"){action='<button class="ctl-btn end-again" id="skillBuyBtn" disabled style="background:#523b2b!important;color:#dfd1b8!important;">🔒 NEEDS '+(pre?pre.name.toUpperCase():"PREREQUISITE")+'</button>';}else{const lbl=COIN_SVG+" BUY · "+fmtNum(skillCostOf(def));action='<button class="ctl-btn end-again'+(st==="poor"?" poor":"")+'" id="skillBuyBtn"'+(st==="ready"?"":" disabled")+'>'+lbl+'</button>';}let metaReq="";if(bossReq){metaReq=' · <span style="color:var(--accent);font-weight:900;">🔒 DEFEAT '+bossReq.name.toUpperCase()+' (#'+(def.reqBoss+1)+')</span>';}else if(pre&&!hasSkill(pre.id)){metaReq=' · NEEDS '+pre.name.toUpperCase();}else if(!def.prereq){metaReq=' · ROOT SKILL';}skillDetailEl.innerHTML='<div class="sd-icon"><img src="'+iconUrl("skill",def.id)+'" alt=""></div>'+'<div class="sd-main"><div class="sd-name">'+def.name+'</div>'+'<div class="sd-fx">'+def.fx+'</div>'+'<div class="sd-meta">'+(SKILL_CATS[def.id]||"").toUpperCase()+' · TIER '+def.tier+metaReq+(st==="poor"?' · <span style="color:var(--accent)">NOT ENOUGH COINS</span>':"")+'</div></div>'+action;const bb=$("skillBuyBtn");if(bb)bb.addEventListener("click",()=>buySkill(def.id));}function buySkill(id){const def=skillDef(id);if(!def)return;if(hasSkill(id))return;if(def.prereq&&!hasSkill(def.prereq))return;if(def.reqBoss!=null&&!G.defeated.has(def.reqBoss))return;if(G.totalCoins<skillCostOf(def))return;G.totalCoins-=skillCostOf(def);G.skills.push(id);dailyAdd("buys",1);if(id==="staminaTraining")G.playerHp=Math.min(playerMaxHp(),G.playerHp+CONFIG.skillFx.staminaHp);if(id==="unstoppable")G.playerHp=Math.min(playerMaxHp(),G.playerHp+CONFIG.skillFx.unstoppableHp);updatePlayerBar();syncCoinsToTruth();if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS());pulseDps();Sound.buy();renderSkills();renderAttrs();Save.store()}const TAB_PAGES={home:"pageHome",battle:"pageBattle",attrs:"pageAttrs",levels:"pageLevels",skills:"pageSkills",awards:"pageAwards",quests:"pageQuests",specials:"pageSkills",shop:"pageShop",help:"pageHelp",settings:"pageSettings"};function updateMoreSheet(){const mas=$("moreAttrsSub");if(mas)mas.textContent="LEVEL "+G.level+" · CAP "+attrLevelGate()+" · DPS "+fmtDPS(DamageCalculator.theoreticalDPS());const mss=$("moreSpecSub");if(mss)mss.textContent=CONFIG.specials.filter(sp=>G.specials[sp.id]).length+" / "+CONFIG.specials.length+" UNLOCKED";const mqs=$("moreQuestsSub");if(mqs){if(!questsUnlocked())mqs.textContent="🔒 DEFEAT THE MONKEY (#10)";else{const d=ensureDaily();mqs.textContent=d.claimed.length+" / "+d.quests.length+" CLAIMED TODAY"}}const maw=$("moreAwardsSub");if(maw)maw.textContent=G.achievements.length+" / "+ACHIEVEMENTS.length+" DONE"}function switchTab(name){if(!TAB_PAGES[name])return;if(G.tab==="battle"&&name!=="battle"){G.freshOnReturn=true;G.over=null;hideEndOverlay();bossIntroEl.classList.remove("open");if(G.frenzyT>0){G.frenzyT=0;G.frenzyMeter=0}updateFrenzyBar()}G.tab=name;appEl.setAttribute("data-screen",name);const targetPage=TAB_PAGES[name];const seenPages=new Set();for(const k in TAB_PAGES){const pid=TAB_PAGES[k];if(seenPages.has(pid))continue;seenPages.add(pid);const pel=$(pid);if(pel)pel.classList.toggle("active",pid===targetPage);}const navBtns=document.querySelectorAll("#bottomNav .bnav-btn");navBtns.forEach(btn=>{const tab=btn.getAttribute("data-tab");let active=false;if(name==="home"||name==="battle"){active=(tab==="home")}else if(name==="levels"||name==="skills"||name==="specials"||name==="attrs"||name==="shop"||name==="awards"){active=(tab===(name==="specials"?"skills":name))}else{active=(tab==="more")}btn.classList.toggle("active",active)});const overlay=$("moreSheetOverlay");if(overlay)overlay.style.display="none";if(name==="battle"){resize();G.freshOnReturn=false;setPanel(false,true);spawnEnemy(true)}if(name==="home"){renderHub()}if(name==="attrs")renderAttrs();if(name==="levels")renderSelect();if(name==="skills"||name==="specials"){renderSkills();renderSpecials();}if(name==="awards"){checkAchievements();renderAwards()}if(name==="quests")renderQuests();if(name==="shop"){preloadAllSkins();renderShop()}if(name==="settings")renderSettings();if(name==="home")HubScene.start();else HubScene.stop();Music.sync();Save.store()}document.addEventListener("click",(e)=>{const gotoBtn=e.target.closest("[data-goto]");if(gotoBtn){Sound.unlock();const target=gotoBtn.getAttribute("data-goto");if(target==="battle")G.hardMode=false;switchTab(target);return}const moreBtn=e.target.closest("#bnavMoreBtn");if(moreBtn){Sound.unlock();const overlay=$("moreSheetOverlay");if(overlay){const open=overlay.style.display!=="none";overlay.style.display=open?"none":"flex";if(!open)updateMoreSheet()}return}const overlay=$("moreSheetOverlay");if(overlay&&overlay.style.display!=="none"&&e.target===overlay){overlay.style.display="none"}});const homeBtn=$("hudHomeBtn");if(homeBtn)homeBtn.addEventListener("click",()=>{Sound.unlock();switchTab("home")});function renderHub(){updateAdBoostersUi();updateCoinHud();updateGemHud();const stN=$("storageNotice");if(stN)stN.style.display=(typeof SafeStore!=="undefined"&&SafeStore.ok===false)?"":"none";$("hubCoinCount").textContent=fmtNum(G.totalCoins);$("hubGemCount").textContent=fmtNum(G.gems);$("hubLevelVal").textContent=G.level;const hubGated=G.current>0&&G.current%10===5&&G.current<G.unlocked&&G.gauntletCleared.indexOf(G.current/5-1)<0;const hubDone50=G.gameCompleted&&!G.testMode;$("hubBattleSub").textContent=hubDone50?"\uD83C\uDFC6 ALL 50 DEFEATED \u2014 MORE COMING SOON":hubGated?("CLEAR THE "+GROUPS[G.current/5-1].name.toUpperCase()+" TRIO GAUNTLET"):("VS "+ENEMIES[Math.min(G.current,49)].name.toUpperCase());const hubCta=document.querySelector(".hub-battle-cta");if(hubCta)hubCta.setAttribute("data-goto",hubDone50?"levels":hubGated?"levels":"battle");$("hubAttrsSub").textContent="LEVEL "+G.level+" · CAP "+attrCap()+" · DPS "+fmtDPS(DamageCalculator.theoreticalDPS());$("hubLevelsSub").textContent=(G.testMode?ENEMIES.length:G.unlocked)+" / "+ENEMIES.length+" UNLOCKED"+(G.testMode?" (TEST)":"");const rushCard=$("hubRushCard"),endCard=$("hubEndlessCard");if(rushCard){const rb=rushBosses();const rSub=$("hubRushSub");if(rb.length<2){rSub.textContent="BEAT 2 BOSSES TO UNLOCK";rushCard.style.opacity="0.55"}else{rSub.textContent="CLEARS "+(G.bossRush?G.bossRush.clears:0)+(G.bossRush&&G.bossRush.best?" \u00B7 BEST "+fmtTime(G.bossRush.best):" \u00B7 "+rb.length+" BOSSES BACK-TO-BACK");rushCard.style.opacity=""}if(!rushCard.dataset.w){rushCard.dataset.w="1";rushCard.addEventListener("click",()=>{Sound.unlock();startBossRush()})}}if(endCard){const eSub=$("hubEndlessSub");if(!endlessPool().length){eSub.textContent="DEFEAT AN ENEMY TO UNLOCK";endCard.style.opacity="0.55"}else{eSub.textContent="BEST WAVE "+(G.endlessBest||0)+" \u00B7 HOW LONG CAN YOU LAST?";endCard.style.opacity=""}if(!endCard.dataset.w){endCard.dataset.w="1";endCard.addEventListener("click",()=>{Sound.unlock();startEndless()})}}const testTag=$("hubTestTag");if(testTag)testTag.style.display=G.testMode?"":"none";$("hubSkillsSub").textContent=G.skills.length+" / "+CONFIG.skills.length+" OWNED";const hss=$("hubSpecSub");if(hss)hss.textContent=CONFIG.specials.filter((sp)=>G.specials[sp.id]).length+" / "+CONFIG.specials.length+" UNLOCKED";$("hubAwardsSub").textContent=G.achievements.length+" / "+ACHIEVEMENTS.length+" DONE";$("hubShopSub").textContent=G.ownedSkins.length+" / "+CONFIG.skins.length+" SKINS OWNED";const hK=$("hscKills");if(hK)hK.textContent=fmtNum(G.kills);const hS=$("hscSlaps");if(hS)hS.textContent=fmtNum(G.stats.slaps);const hC=$("hscCombo");if(hC)hC.textContent=fmtNum(G.stats.bestCombo);const hM=$("hscCoins");if(hM)hM.textContent=fmtNum(G.stats.coinsEarned);const hB=$("hscBadge");if(hB){const lv=G.level||1;hB.textContent=lv>=80?"LEGENDARY SLAPPER":lv>=50?"MASTER OF HANDS":lv>=25?"IRON BRAWLER":lv>=10?"CONTENDER":"ROOKIE SLAPPER";}ensureDaily();renderChest();renderQuestBadge();updateAwardsBadge();HubScene.refresh();renderSettings();if(G.pendingGroupToast){const gt=G.pendingGroupToast;G.pendingGroupToast=null;const sn=$("skinNotice");if(sn&&sn.style.display==="none"){sn.querySelector(".sn-msg").textContent="GROUP "+(gt.group+1)+" COMPLETE — group reward +"+fmtNum(gt.coins)+" coins paid!";sn.style.display=""}}$("hubDoneTag").style.display=G.gameCompleted?"":"none";$("hubDragonTag").style.display=G.dragonMilestone&&!G.gameCompleted?"":"none"}function skinPriceHtml(sk){if(!sk.price)return"";return sk.price.cur==="gems"?GEM_SVG_SM+" "+fmtNum(sk.price.amt):COIN_SVG+" "+fmtNum(sk.price.amt)}function updateProcChip(){const item=$("procItem");if(!item)return;const sk=skinDef();if(!sk.power){item.style.display="none";return}item.style.display="";$("procCircImg").src=skinUrl(sk.id);$("procCircTxt").textContent=(G.procCount%10)+"/10";$("procCircle").classList.toggle("armed",G.procCount%10===9)}
let currentShopFilter = "all";
function setShopFilter(filter) {
  currentShopFilter = filter;
  const filterBtns = document.querySelectorAll("#shopFilterBar .shop-filter-btn");
  filterBtns.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === filter);
  });
  const secMap = {
    gems: $("shopGemVault"),
    bundles: $("shopBundles"),
    perks: $("shopFeatures"),
    skins: $("shopList"),
    coins: $("shopPacks")
  };
  if (filter === "all") {
    $("shopPromo").style.display = "";
    for (const k in secMap) { if (secMap[k]) secMap[k].style.display = ""; }
  } else {
    $("shopPromo").style.display = "none";
    for (const k in secMap) {
      if (secMap[k]) secMap[k].style.display = (k === filter) ? "" : "none";
    }
    if (secMap[filter]) {
      secMap[filter].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function initShopFilters() {
  const bar = $("shopFilterBar");
  if (!bar || bar.__bound) return;
  bar.__bound = true;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".shop-filter-btn");
    if (!btn) return;
    const filter = btn.getAttribute("data-filter") || "all";
    Sound.unlock();
    setShopFilter(filter);
  });
}

function renderShop(){
  initShopFilters();
  shopCoinsEl.innerHTML = COIN_SVG + " " + fmtNum(G.totalCoins);
  shopGemsEl.innerHTML = GEM_SVG + " " + fmtNum(G.gems);
  shopSubEl.textContent = G.ownedSkins.length + " / " + CONFIG.skins.length + " SKINS UNLOCKED · " + skinDef().name.toUpperCase() + (G.vipUnlocked ? " · 👑 VIP" : "");
  
  // 1. Featured Promo Card
  renderShopPromo();

  // 2. Gem Vault
  renderShopGemVault();

  // 3. Hero Bundles
  renderShopBundles();

  // 4. Features & Passes
  renderShopFeatures();

  // 5. Hand Skins
  renderShopSkins();

  // 6. Coin Packs
  renderShopCoinPacks();
}

function renderShopPromo(){
  const promoEl = $("shopPromo");
  if (!promoEl) return;
  // Pick an unowned high-value bundle, or show VIP banner if all owned
  const unownedBundle = CONFIG.bundles.find(b => G.bundlesOwned.indexOf(b.id) < 0);
  if (!unownedBundle) {
    promoEl.innerHTML = '<div class="shop-promo-card vip-banner">' +
      '<div class="promo-badge">👑 STORE MASTER</div>' +
      '<div class="promo-title">ALL HERO BUNDLES OWNED!</div>' +
      '<div class="promo-desc">You command the ultimate arsenal. Enjoy permanent +25% VIP battle coins and mythic powers.</div>' +
    '</div>';
    return;
  }
  const sk = skinDef(unownedBundle.skin);
  promoEl.innerHTML = '<div class="shop-promo-card">' +
    '<div class="promo-badge">⚡ LIMITED SPOTLIGHT DEAL · 70% OFF</div>' +
    '<div class="promo-body">' +
      '<div class="promo-preview"><img src="' + skinUrl(unownedBundle.skin) + '" alt="' + sk.name + '"></div>' +
      '<div class="promo-info">' +
        '<div class="promo-title">' + unownedBundle.name + '</div>' +
        '<div class="promo-desc">' + unownedBundle.desc + '</div>' +
        '<div class="promo-pills">' +
          '<span class="promo-pill">' + COIN_SVG + ' ' + fmtNum(unownedBundle.coins) + '</span>' +
          '<span class="promo-pill">' + GEM_SVG_SM + ' ' + fmtNum(unownedBundle.gems) + '</span>' +
        '</div>' +
      '</div>' +
      '<button class="skin-btn promo-btn" data-promo-buy="' + unownedBundle.id + '">GET · ' + unownedBundle.price + '</button>' +
    '</div>' +
  '</div>';
  const pbtn = promoEl.querySelector("[data-promo-buy]");
  if (pbtn) pbtn.addEventListener("click", () => openMockCheckout({ kind: "bundle", bundle: unownedBundle }));
}

function renderShopGemVault(){
  const vaultEl = $("shopGemVault");
  if (!vaultEl) return;
  let html = '<div class="shop-sec-head"><div class="ssh-title">💎 GEM VAULT · MOCK STORE</div><div class="ssh-sub">DIRECT GEM ACQUISITION · JUMPSTART UPGRADES</div></div><div class="shop-grid">';
  for (const pk of (CONFIG.gemPacks || [])) {
    const totalGems = pk.gems + (pk.bonusGems || 0);
    html += '<div class="skin-card gem-card">' +
      '<span class="shop-card-badge ' + (pk.tag === "BEST VALUE" ? "badge-best" : (pk.tag === "POPULAR" ? "badge-popular" : "badge-bonus")) + '">' + pk.tag + '</span>' +
      '<div class="gem-art-wrap">' +
        '<svg class="gem-large-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l4 6-9 12L3 9l4-6z" fill="#39c2d8" stroke="#177e96" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 9h18M12 21 8.5 9 12 3l3.5 6L12 21" fill="none" stroke="#177e96" stroke-width="1.3" stroke-linejoin="round"/></svg>' +
      '</div>' +
      '<div class="gem-pack-amt">' + GEM_SVG + ' ' + fmtNum(totalGems) + '</div>' +
      (pk.bonusGems > 0 ? '<div class="gem-bonus-pill">+' + fmtNum(pk.bonusGems) + ' BONUS FREE</div>' : '<div class="gem-bonus-spacer"></div>') +
      '<div class="gem-pack-name">' + pk.name + '</div>' +
      '<div class="skin-desc">' + pk.desc + '</div>' +
      '<button class="skin-btn gem-btn" data-buy-gem="' + pk.id + '">BUY · ' + pk.price + '</button>' +
    '</div>';
  }
  html += '</div>';
  vaultEl.innerHTML = html;
  const gbtns = vaultEl.querySelectorAll("[data-buy-gem]");
  for (let i = 0; i < gbtns.length; i++) {
    const gid = gbtns[i].getAttribute("data-buy-gem");
    const pk = (CONFIG.gemPacks || []).find(x => x.id === gid);
    if (pk) gbtns[i].addEventListener("click", () => openMockCheckout({ kind: "gem", pack: pk }));
  }
}

function renderShopBundles(){
  const bundlesEl = $("shopBundles");
  if (!bundlesEl) return;
  let html = '<div class="shop-sec-head"><div class="ssh-title">🎁 HERO BUNDLES · BEST VALUE</div><div class="ssh-sub">HERO SKINS BUNDLED WITH COIN & GEM RESERVES</div></div><div class="shop-grid">';
  for (const bd of CONFIG.bundles) {
    const owned = G.bundlesOwned.indexOf(bd.id) >= 0;
    const sk = skinDef(bd.skin), skinOwned = G.ownedSkins.indexOf(bd.skin) >= 0;
    html += '<div class="skin-card bundle-card' + (owned ? ' equipped' : '') + '">' +
      '<span class="shop-card-badge badge-bundle">' + (bd.badge || "SPECIAL") + '</span>' +
      '<div class="skin-preview preview-' + bd.skin + '"><img src="' + skinUrl(bd.skin) + '" alt="' + sk.name + ' hand skin"></div>' +
      '<div class="bundle-main">' +
        '<div class="bundle-head-row">' +
          '<div class="skin-name">' + bd.name + '</div>' +
          '<div class="bundle-val">VAL ' + (bd.valPrice || "₹999") + '</div>' +
        '</div>' +
        (bd.tagline ? '<div class="bundle-tagline">' + bd.tagline + '</div>' : '') +
        '<div class="bundle-contents">' +
          '<span>🥋 ' + sk.name + ' skin</span>' +
          '<span>' + COIN_SVG + ' ' + fmtNum(bd.coins) + '</span>' +
          '<span>' + GEM_SVG_SM + ' ' + fmtNum(bd.gems) + '</span>' +
        '</div>' +
        '<div class="bundle-power">⚡ ' + (sk.power ? sk.power.name + ': ' + sk.power.desc : sk.desc) + '</div>' +
        (skinOwned && !owned ? '<div class="bundle-note">Skin already owned — you will receive the coins + gems!</div>' : '') +
      '</div>' +
      (owned ? '<button class="skin-btn equipped" disabled>OWNED</button>' : '<button class="skin-btn bundle-buy-btn" data-bundle="' + bd.id + '">BUY · ' + bd.price + '</button>') +
    '</div>';
  }
  html += '</div>';
  bundlesEl.innerHTML = html;
  const bbtns = bundlesEl.querySelectorAll("[data-bundle]");
  for (let i = 0; i < bbtns.length; i++) {
    const bid = bbtns[i].getAttribute("data-bundle");
    const bd = CONFIG.bundles.find(x => x.id === bid);
    if (bd) bbtns[i].addEventListener("click", () => openMockCheckout({ kind: "bundle", bundle: bd }));
  }
}

function renderShopFeatures(){
  const featEl = $("shopFeatures");
  if (!featEl) return;
  let html = '<div class="shop-sec-head"><div class="ssh-title">⚡ PERMANENT PERKS & PASSES</div><div class="ssh-sub">LIFETIME ACCOUNT UPGRADES</div></div><div class="shop-features-wrap">';
  
  // 1. Offline Earnings
  const offOwned = G.offlineUnlocked;
  const offAfford = G.gems >= CONFIG.offline.price;
  html += '<div class="feature-card' + (offOwned ? ' equipped' : '') + '">' +
    '<div class="feature-ico-box">⏳</div>' +
    '<div class="feature-main">' +
      '<div class="feature-title-row"><span class="skin-name">OFFLINE SLAP MINER</span><span class="shop-card-badge badge-perk">PASSIVE INCOME</span></div>' +
      '<div class="skin-desc">Earn coins while away — 25% of your DPS, up to 8 hours, paid on a claim card when you return. Lifetime unlock!</div>' +
    '</div>' +
    (offOwned ? '<button class="skin-btn equipped" disabled>OWNED</button>' : '<button class="skin-btn" id="buyOfflineBtn"' + (offAfford ? '' : ' disabled') + '>' + (offAfford ? 'UNLOCK · ' : 'NEED ') + GEM_SVG_SM + ' ' + fmtNum(CONFIG.offline.price) + '</button>') +
  '</div>';

  // 2. VIP Pass
  const vipOwned = G.vipUnlocked;
  html += '<div class="feature-card vip-feature' + (vipOwned ? ' equipped' : '') + '">' +
    '<div class="feature-ico-box gold-box">👑</div>' +
    '<div class="feature-main">' +
      '<div class="feature-title-row"><span class="skin-name">GOLDEN SLAPPER VIP PASS</span><span class="shop-card-badge badge-best">LIFETIME VIP</span></div>' +
      '<div class="skin-desc">Permanent +25% bonus coins from all enemy knockouts, prestige gold glow on your battle hand, and golden player crown!</div>' +
    '</div>' +
    (vipOwned ? '<button class="skin-btn equipped" disabled>OWNED</button>' : '<button class="skin-btn" id="buyVipBtn">BUY · ₹199</button>') +
  '</div>';

  // 3. Frenzy Booster
  const fzOwned = G.frenzyBoostUnlocked;
  html += '<div class="feature-card' + (fzOwned ? ' equipped' : '') + '">' +
    '<div class="feature-ico-box fire-box">🔥</div>' +
    '<div class="feature-main">' +
      '<div class="feature-title-row"><span class="skin-name">FRENZY OVERCHARGE BOOSTER</span><span class="shop-card-badge badge-hot">TURBO BOOST</span></div>' +
      '<div class="skin-desc">Frenzy meter charges 25% faster on all slaps, and frenzy duration extends to 13 seconds (normally 10s)!</div>' +
    '</div>' +
    (fzOwned ? '<button class="skin-btn equipped" disabled>OWNED</button>' : '<button class="skin-btn" id="buyFrenzyBoostBtn">BUY · ₹99</button>') +
  '</div>';

  html += '</div>';
  featEl.innerHTML = html;

  const ob = $("buyOfflineBtn");
  if (ob) ob.addEventListener("click", buyOffline);
  const vb = $("buyVipBtn");
  if (vb) vb.addEventListener("click", () => openMockCheckout({
    kind: "feature",
    id: "vip",
    name: "Golden Slapper VIP Pass",
    price: "₹199",
    desc: "Permanent +25% bonus coins from all enemy defeats forever + Golden Crown."
  }));
  const fb = $("buyFrenzyBoostBtn");
  if (fb) fb.addEventListener("click", () => openMockCheckout({
    kind: "feature",
    id: "frenzy_boost",
    name: "Frenzy Overcharge Booster",
    price: "₹99",
    desc: "25% faster frenzy meter charge + extended 13s duration."
  }));
}

function buyOffline(){
  if(G.offlineUnlocked)return;
  const prevTx=StoreProvider.ledgerTx("feature_offline");
  if(!prevTx){
    if(G.gems<CONFIG.offline.price)return;
    G.gems-=CONFIG.offline.price;
    StoreProvider.purchase("feature_offline");
  }
  G.offlineUnlocked=true;
  updateGemHud();
  Sound.buy();
  showShopToast("Offline Slap Miner unlocked! Coins earn while you are away.");
  renderShop();
  Save.store();
}

function renderShopSkins(){
  let html = '<div class="shop-sec-head"><div class="ssh-title">🥊 HAND SKINS COLLECTION</div><div class="ssh-sub">' + G.ownedSkins.length + ' / ' + CONFIG.skins.length + ' OWNED · UNIQUE POWERS & IMPACT FX</div></div><div class="shop-grid">';
  for (const sk of CONFIG.skins) {
    const owned = G.ownedSkins.indexOf(sk.id) >= 0;
    const equipped = G.skin === sk.id;
    let btn;
    if (equipped) {
      btn = '<button class="skin-btn equipped" disabled>EQUIPPED</button>';
    } else if (owned) {
      btn = '<button class="skin-btn equip" data-equip="' + sk.id + '">EQUIP</button>';
    } else {
      const afford = sk.price.cur === "gems" ? G.gems >= sk.price.amt : G.totalCoins >= sk.price.amt;
      btn = '<button class="skin-btn" data-buy="' + sk.id + '"' + (afford ? '' : ' disabled') + '>' + (afford ? 'BUY · ' + skinPriceHtml(sk) : 'NEED ' + skinPriceHtml(sk)) + '</button>';
    }
    html += '<div class="skin-card skin-tier-' + (sk.rarity || 'DEFAULT').toLowerCase() + (equipped ? ' equipped' : '') + '">' +
      '<div class="skin-preview preview-' + sk.id + '"><img src="' + skinUrl(sk.id) + '" alt="' + sk.name + ' hand skin"></div>' +
      '<div class="skin-name">' + sk.name + '</div>' +
      '<span class="skin-rarity r-' + (sk.rarity || 'DEFAULT').toLowerCase() + '">' + (sk.rarity || 'DEFAULT') + '</span>' +
      '<div class="skin-desc">' + sk.desc + '</div>' +
      (sk.bonus ? '<div class="skin-bonus">' + sk.bonus.label + (sk.bonus2 ? ' · ' + sk.bonus2.label : '') + '</div>' : '') +
      (sk.power ? '<div class="skin-power">POWER · ' + sk.power.name + ': ' + sk.power.desc + '</div><div class="skin-fx">CUSTOM IMPACT FX + SOUND</div>' : '') +
      btn +
    '</div>';
  }
  html += '</div>';
  shopListEl.innerHTML = html;
  const buys = shopListEl.querySelectorAll("[data-buy]");
  for (let i = 0; i < buys.length; i++) buys[i].addEventListener("click", () => buySkin(buys[i].getAttribute("data-buy")));
  const eqs = shopListEl.querySelectorAll("[data-equip]");
  for (let i = 0; i < eqs.length; i++) eqs[i].addEventListener("click", () => equipSkin(eqs[i].getAttribute("data-equip")));
}

function buySkin(id){
  const sk = skinDef(id);
  if(!sk || !sk.price) return;
  if(G.ownedSkins.indexOf(id) >= 0) return;
  if(sk.price.cur === "gems"){
    if(G.gems < sk.price.amt) return;
    G.gems -= sk.price.amt;
    updateGemHud();
  } else {
    if(G.totalCoins < sk.price.amt) return;
    G.totalCoins -= sk.price.amt;
    syncCoinsToTruth();
  }
  G.ownedSkins.push(id);
  const colNew = checkCollectionReward();
  Sound.buy();
  renderShop();
  if(colNew) showShopToast("FULL COLLECTION! +" + CONFIG.collection.gems + " gems — every premium skin owned.");
  else showShopToast(sk.name + " skin unlocked!");
  Save.store();
}

function equipSkin(id){
  if(G.ownedSkins.indexOf(id) < 0) return;
  ensureSkinArt(id);
  G.skin = id;
  applySkinVisuals();
  updateProcChip();
  Sound.buy();
  renderShop();
  Save.store();
}

function renderShopCoinPacks(){
  let ph = '<div class="shop-sec-head"><div class="ssh-title">🪙 COIN PACKS · GEM EXCHANGE</div><div class="ssh-sub">EXCHANGE GEMS FOR INSTANT COIN BOOSTS</div></div><div class="shop-grid">';
  for (let i = 0; i < CONFIG.coinPacks.length; i++) {
    const pk = CONFIG.coinPacks[i], afford = G.gems >= pk.gems;
    ph += '<div class="skin-card pack-card">' +
      (pk.tag ? '<span class="shop-card-badge badge-coin">' + pk.tag + '</span>' : '') +
      '<div class="pack-coins">' + COIN_SVG + ' ' + fmtNum(pk.coins) + '</div>' +
      (pk.bonus ? '<div class="coin-bonus-pill">' + pk.bonus + '</div>' : '<div class="coin-bonus-spacer"></div>') +
      '<div class="pack-title">' + (pk.name || 'Coin Pack') + '</div>' +
      '<div class="skin-desc">' + (pk.desc || 'Instant coin top-up.') + '</div>' +
      '<button class="skin-btn" data-pack="' + i + '"' + (afford ? '' : ' disabled') + '>' + (afford ? 'BUY · ' : 'NEED ') + GEM_SVG_SM + ' ' + fmtNum(pk.gems) + '</button>' +
    '</div>';
  }
  ph += '</div><div class="pack-note">Pack coins are a balance top-up — they do not count toward Awards coin totals.</div>';
  $("shopPacks").innerHTML = ph;
  const pbtns = $("shopPacks").querySelectorAll("[data-pack]");
  for (let i = 0; i < pbtns.length; i++) pbtns[i].addEventListener("click", () => buyCoinPack(parseInt(pbtns[i].getAttribute("data-pack"), 10)));
}

function buyCoinPack(i){
  const pk = CONFIG.coinPacks[i];
  if(!pk) return;
  if(G.gems < pk.gems) return;
  G.gems -= pk.gems;
  updateGemHud();
  creditCoinsQuiet(pk.coins);
  Sound.buy();
  showShopToast("+" + fmtNum(pk.coins) + " coins added!");
  renderShop();
  Save.store();
}

function creditCoinsQuiet(n){
  G.totalCoins += n;
  syncCoinsToTruth();
  shopCoinsEl.classList.remove("coin-pop");
  shopCoinsEl.offsetWidth;
  shopCoinsEl.classList.add("coin-pop");
}

let shopToastTimer = 0;
function showShopToast(msg){
  const el = $("shopToast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(shopToastTimer);
  shopToastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}
function toast(msg, dur){
  showShopToast(msg);
}

function renderShopExtras(){
  // Kept for backward compatibility
  renderShopGemVault();
  renderShopBundles();
  renderShopCoinPacks();
}

let mockCheckoutItem = null;
function openMockCheckout(item){
  if (!item) return;
  if (item.kind === "bundle") {
    const bd = item.bundle || CONFIG.bundles.find(x => x.id === item.id);
    if (!bd || G.bundlesOwned.indexOf(bd.id) >= 0) return;
    mockCheckoutItem = { kind: "bundle", data: bd };
    const sk = skinDef(bd.skin), skinOwned = G.ownedSkins.indexOf(bd.skin) >= 0;
    $("mockItemName").textContent = bd.name.toUpperCase();
    $("mockLines").innerHTML = '<div class="mock-line"><img src="' + skinUrl(bd.skin) + '" alt="">' + sk.name + ' hand skin<span class="ml-amt">' + (skinOwned ? 'OWNED' : 'INCLUDED') + '</span></div>' +
      '<div class="mock-line">' + COIN_SVG + ' Coins<span class="ml-amt">+' + fmtNum(bd.coins) + '</span></div>' +
      '<div class="mock-line">' + GEM_SVG + ' Gems<span class="ml-amt">+' + fmtNum(bd.gems) + '</span></div>' +
      '<div class="mock-line-power">⚡ ' + (sk.power ? sk.power.name + ': ' + sk.power.desc : sk.desc) + '</div>';
    $("mockTotal").textContent = "TOTAL · " + bd.price + " (SANDBOX TEST)";
  } else if (item.kind === "gem") {
    const pk = item.pack || (CONFIG.gemPacks || []).find(x => x.id === item.id);
    if (!pk) return;
    mockCheckoutItem = { kind: "gem", data: pk };
    const total = pk.gems + (pk.bonusGems || 0);
    $("mockItemName").textContent = pk.name.toUpperCase();
    $("mockLines").innerHTML = '<div class="mock-line">' + GEM_SVG + ' Base Diamonds<span class="ml-amt">' + fmtNum(pk.gems) + '</span></div>' +
      (pk.bonusGems > 0 ? '<div class="mock-line bonus-line">💎 Free Bonus Gems<span class="ml-amt">+' + fmtNum(pk.bonusGems) + '</span></div>' : '') +
      '<div class="mock-line total-gem-line"><span>💎 Total Granted</span><span class="ml-amt">+' + fmtNum(total) + ' GEMS</span></div>';
    $("mockTotal").textContent = "TOTAL · " + pk.price + " (SANDBOX TEST)";
  } else if (item.kind === "feature") {
    const ft = item;
    if (ft.id === "vip" && G.vipUnlocked) return;
    if (ft.id === "frenzy_boost" && G.frenzyBoostUnlocked) return;
    mockCheckoutItem = { kind: "feature", data: ft };
    $("mockItemName").textContent = ft.name.toUpperCase();
    $("mockLines").innerHTML = '<div class="mock-line">⭐ Lifetime Upgrade<span class="ml-amt">PERMANENT</span></div>' +
      '<div class="mock-line-power">' + ft.desc + '</div>';
    $("mockTotal").textContent = "TOTAL · " + ft.price + " (SANDBOX TEST)";
  }
  $("mockConfirm").disabled = false;
  $("mockCheckout").classList.add("open");
  Sound.unlock();
}

function closeMockCheckout(){
  mockCheckoutItem = null;
  $("mockCheckout").classList.remove("open");
}

function confirmMockPurchase(){
  if (!mockCheckoutItem) {
    closeMockCheckout();
    return;
  }
  $("mockConfirm").disabled = true;
  const item = mockCheckoutItem;

  if (item.kind === "bundle") {
    const bd = item.data;
    if (G.bundlesOwned.indexOf(bd.id) >= 0) { closeMockCheckout(); return; }
    const tx = StoreProvider.purchase("bundle_" + bd.id);
    if (!tx.granted) { closeMockCheckout(); showShopToast("Already purchased — nothing charged."); return; }
    if (G.ownedSkins.indexOf(bd.skin) < 0) G.ownedSkins.push(bd.skin);
    const colNewB = checkCollectionReward();
    creditCoinsQuiet(bd.coins);
    grantGems(bd.gems);
    G.bundlesOwned.push(bd.id);
    Sound.levelup();
    closeMockCheckout();
    showShopToast(bd.name + " unlocked! +" + fmtNum(bd.coins) + " coins & +" + fmtNum(bd.gems) + " gems!" + (colNewB ? " FULL COLLECTION +" + CONFIG.collection.gems + " gems!" : ""));
  } else if (item.kind === "gem") {
    const pk = item.data;
    const totalGems = pk.gems + (pk.bonusGems || 0);
    StoreProvider.purchase("gem_" + pk.id, true);
    grantGems(totalGems);
    Sound.levelup();
    closeMockCheckout();
    showShopToast("💎 +" + fmtNum(totalGems) + " Gems added to your Vault!");
  } else if (item.kind === "feature") {
    const ft = item.data;
    const tx = StoreProvider.purchase("feature_" + ft.id);
    if (!tx.granted) { closeMockCheckout(); showShopToast("Already unlocked."); return; }
    if (ft.id === "vip") G.vipUnlocked = true;
    if (ft.id === "frenzy_boost") G.frenzyBoostUnlocked = true;
    Sound.levelup();
    closeMockCheckout();
    showShopToast("⭐ " + ft.name + " activated permanently!");
  }

  renderShop();
  Save.store();
}

$("mockCancel").addEventListener("click", () => { Sound.unlock(); closeMockCheckout(); });
$("mockConfirm").addEventListener("click", confirmMockPurchase);

const StoreProvider = {
  id: "mock",
  listProducts(){ return CONFIG.products.slice(); },
  ledgerTx(productId){ return G.purchases.find(p => p.productId === productId) || null; },
  purchase(productId, repeatable = false){
    if (!repeatable) {
      const prev = this.ledgerTx(productId);
      if (prev) return { txId: prev.txId, productId, state: "purchased", granted: false, ts: prev.ts };
    }
    const tx = {
      txId: "mock-" + productId + "-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1e6).toString(36),
      productId,
      state: "purchased",
      granted: true,
      ts: Date.now()
    };
    G.purchases.push({ productId, txId: tx.txId, ts: tx.ts });
    return tx;
  },
  restorePurchases(){
    let restored = 0;
    for (const prod of CONFIG.products) {
      if (!this.ledgerTx(prod.id)) continue;
      if (prod.kind === "bundle") {
        if (G.bundlesOwned.indexOf(prod.ref) < 0) {
          G.bundlesOwned.push(prod.ref);
          restored++;
        }
        const bd = CONFIG.bundles.find(b => b.id === prod.ref);
        if (bd && G.ownedSkins.indexOf(bd.skin) < 0) G.ownedSkins.push(bd.skin);
      }
      if (prod.kind === "feature") {
        if (prod.ref === "offline" && !G.offlineUnlocked) { G.offlineUnlocked = true; restored++; }
        if (prod.ref === "vip" && !G.vipUnlocked) { G.vipUnlocked = true; restored++; }
        if (prod.ref === "frenzy_boost" && !G.frenzyBoostUnlocked) { G.frenzyBoostUnlocked = true; restored++; }
      }
    }
    return restored;
  }
};

$("restoreBtn").addEventListener("click", () => {
  Sound.unlock();
  const n = StoreProvider.restorePurchases();
  if (n > 0) {
    applySkinVisuals();
    renderShop();
    Save.store();
  }
  showShopToast(n > 0 ? "Purchases restored — " + n + " re-applied." : "All recorded purchases are already applied.");
});

const AD_SPONSORS = [
  { icon: "🥊", title: "Slap Master 3D", tag: "Maximum slaps. Zero cooldown. Play free now!" },
  { icon: "👑", title: "Glove Tycoon Empire", tag: "Build your championship gym and train champions!" },
  { icon: "⚡", title: "Mega Punch 2026", tag: "Knockout combos and supersonic blitzes await!" },
  { icon: "🛡️", title: "Iron Fist Arena", tag: "Defend your title against 50 fighters!" },
  { icon: "💎", title: "Diamond Brawler", tag: "Collect mythical gauntlets and crush the league!" }
];

let adActiveCallback = null;
let adTimerInterval = null;
let adTimeout = null;

function playRewardedAd(onComplete, placement) {
  if (typeof window !== "undefined" && window.__nativeBridge && window.__nativeBridge.isNative) {
    toast("📺 Loading AdMob Video...", 2000);
    window.__nativeBridge.showRewardedAd((success) => {
      if (onComplete) onComplete(success);
    }, placement).then((shown) => {
      if (!shown) {
        toast("Ad is preparing... please try again in a few seconds.", 3000);
        if (window.__nativeBridge.prepareRewardedAd) {
          window.__nativeBridge.prepareRewardedAd();
        }
      }
    }).catch((err) => {
      console.warn("Native AdMob error:", err);
      toast("Unable to play ad right now. Check connection.", 3000);
    });
    return;
  }
  showWebAdModal(onComplete, placement);
}

function showWebAdModal(onComplete, placement) {
  const modal = $("adModal");
  if (!modal) {
    if (onComplete) onComplete(true);
    return;
  }
  adActiveCallback = onComplete;
  
  const sponsor = AD_SPONSORS[Math.floor(Math.random() * AD_SPONSORS.length)];
  const iconEl = $("adScreenIcon");
  const titleEl = $("adSponsorTitle");
  const tagEl = $("adTagline");
  const countEl = $("adCountdown");
  const fillEl = $("adProgressFill");
  const claimBtn = $("adClaimBtn");

  if (iconEl) iconEl.textContent = sponsor.icon;
  if (titleEl) titleEl.textContent = sponsor.title;
  if (tagEl) tagEl.textContent = sponsor.tag;
  if (claimBtn) {
    claimBtn.style.display = "none";
    claimBtn.classList.remove("pulse-bounce");
  }
  if (fillEl) {
    fillEl.style.transition = "none";
    fillEl.style.width = "0%";
    void fillEl.offsetWidth;
    fillEl.style.transition = "width 2.2s linear";
    fillEl.style.width = "100%";
  }

  modal.style.display = "flex";
  try { Sound.tap && Sound.tap(); } catch(e){}

  let remaining = 2;
  if (countEl) countEl.textContent = "Reward in " + remaining + "s";

  if (adTimerInterval) clearInterval(adTimerInterval);
  if (adTimeout) clearTimeout(adTimeout);

  adTimerInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      if (countEl) countEl.textContent = "Reward in " + remaining + "s";
    } else {
      clearInterval(adTimerInterval);
      if (countEl) countEl.textContent = "Reward Ready! ✓";
      if (claimBtn) {
        claimBtn.style.display = "block";
        claimBtn.classList.add("pulse-bounce");
      }
    }
  }, 1000);

  adTimeout = setTimeout(() => {
    if (countEl) countEl.textContent = "Reward Ready! ✓";
    if (claimBtn) {
      claimBtn.style.display = "block";
      claimBtn.classList.add("pulse-bounce");
    }
  }, 2200);
}

function finishRewardedAd() {
  const modal = $("adModal");
  if (modal) modal.style.display = "none";
  if (adTimerInterval) clearInterval(adTimerInterval);
  if (adTimeout) clearTimeout(adTimeout);

  try { Sound.levelUp && Sound.levelUp(); } catch(e){}
  const cb = adActiveCallback;
  adActiveCallback = null;
  if (cb) cb(true);
}

function activateCoinBoost() {
  const now = Date.now();
  if (G.adCoinBoostUntil && G.adCoinBoostUntil > now) {
    const leftSec = Math.ceil((G.adCoinBoostUntil - now) / 1000);
    const m = Math.floor(leftSec / 60);
    const s = leftSec % 60;
    toast("⏳ 2X COIN BOOST IS ALREADY ACTIVE! (" + m + ":" + (s < 10 ? "0" : "") + s + " LEFT)", 2500);
    return;
  }
  try { Sound.tap && Sound.tap(); } catch(e){}
  playRewardedAd((success) => {
    if (!success) return;
    const curNow = Date.now();
    // Strictly set 10 minutes from now — NO stacking allowed
    G.adCoinBoostUntil = curNow + 10 * 60 * 1000;
    Save.store();
    updateAdBoostersUi();
    toast("💰 2X COIN BOOST ACTIVE FOR 10 MINUTES!", 3200);
    try { PFX.blast && PFX.blast(window.innerWidth * 0.25, window.innerHeight * 0.5); } catch(e){}
  }, "main_menu_coins");
}

function activateDmgBoost() {
  const now = Date.now();
  if (G.adDmgBoostUntil && G.adDmgBoostUntil > now) {
    const leftSec = Math.ceil((G.adDmgBoostUntil - now) / 1000);
    const m = Math.floor(leftSec / 60);
    const s = leftSec % 60;
    toast("⏳ 2X DAMAGE BOOST IS ALREADY ACTIVE! (" + m + ":" + (s < 10 ? "0" : "") + s + " LEFT)", 2500);
    return;
  }
  try { Sound.tap && Sound.tap(); } catch(e){}
  playRewardedAd((success) => {
    if (!success) return;
    const curNow = Date.now();
    // Strictly set 10 minutes from now — NO stacking allowed
    G.adDmgBoostUntil = curNow + 10 * 60 * 1000;
    Save.store();
    updateAdBoostersUi();
    toast("💥 2X DAMAGE BOOST ACTIVE FOR 10 MINUTES!", 3200);
    try { PFX.blast && PFX.blast(window.innerWidth * 0.75, window.innerHeight * 0.5); } catch(e){}
  }, "main_menu_damage");
}

function fmtMinSec(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

function updateAdBoostersUi() {
  const now = Date.now();
  const coinLeft = Math.max(0, (G.adCoinBoostUntil || 0) - now);
  const dmgLeft = Math.max(0, (G.adDmgBoostUntil || 0) - now);
  const coinActive = coinLeft > 0;
  const dmgActive = dmgLeft > 0;
  const CIRCLE_CIRCUMFERENCE = 144.51;

  // 1. Coin Booster Button
  const coinBtn = $("boostCoinBtn");
  const coinRing = $("boostCoinRing");
  const coinTimer = $("boostCoinTimer");
  if (coinBtn && coinRing && coinTimer) {
    if (coinActive) {
      coinBtn.classList.add("active");
      coinBtn.disabled = true;
      coinTimer.textContent = fmtMinSec(coinLeft);
      const frac = Math.min(1, coinLeft / (10 * 60 * 1000));
      coinRing.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
      coinRing.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - frac);
      const badge = coinBtn.querySelector(".b-ad-badge");
      if (badge) badge.textContent = "ON";
    } else {
      coinBtn.classList.remove("active");
      coinBtn.disabled = false;
      coinTimer.textContent = "WATCH AD";
      coinRing.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
      coinRing.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
      const badge = coinBtn.querySelector(".b-ad-badge");
      if (badge) badge.textContent = "AD";
    }
  }

  // 2. Damage Booster Button
  const dmgBtn = $("boostDmgBtn");
  const dmgRing = $("boostDmgRing");
  const dmgTimer = $("boostDmgTimer");
  if (dmgBtn && dmgRing && dmgTimer) {
    if (dmgActive) {
      dmgBtn.classList.add("active");
      dmgBtn.disabled = true;
      dmgTimer.textContent = fmtMinSec(dmgLeft);
      const frac = Math.min(1, dmgLeft / (10 * 60 * 1000));
      dmgRing.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
      dmgRing.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - frac);
      const badge = dmgBtn.querySelector(".b-ad-badge");
      if (badge) badge.textContent = "ON";
    } else {
      dmgBtn.classList.remove("active");
      dmgBtn.disabled = false;
      dmgTimer.textContent = "WATCH AD";
      dmgRing.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
      dmgRing.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
      const badge = dmgBtn.querySelector(".b-ad-badge");
      if (badge) badge.textContent = "AD";
    }
  }

  // 3. Center Showcase Card
  const showcase = $("hubBoosterShowcase");
  const showcaseDesc = $("hubBoosterShowcaseDesc");
  if (showcase && showcaseDesc) {
    showcase.className = "booster-center-showcase";
    const titleEl = showcase.querySelector(".bcs-title");
    if (coinActive && dmgActive) {
      showcase.classList.add("both-active");
      if (titleEl) titleEl.textContent = "⚡ DUAL OVERCHARGE";
      showcaseDesc.textContent = "2X COINS & 2X DAMAGE ACTIVE";
    } else if (coinActive) {
      showcase.classList.add("coin-active");
      if (titleEl) titleEl.textContent = "💰 2X COINS ACTIVE";
      showcaseDesc.textContent = "DOUBLE COINS FROM ALL KOS";
    } else if (dmgActive) {
      showcase.classList.add("dmg-active");
      if (titleEl) titleEl.textContent = "💥 2X DAMAGE ACTIVE";
      showcaseDesc.textContent = "DOUBLE DAMAGE ON ALL SLAPS";
    } else {
      if (titleEl) titleEl.textContent = "PASSIVE BUFFS";
      showcaseDesc.textContent = "TAP TO BOOST 10 MINS";
    }
  }

  // 4. Global HUD Header Pills
  const hudBoosters = $("hudBoosters");
  const hudCoin = $("hudBoostCoinPill");
  const hudCoinT = $("hudBoostCoinTime");
  const hudDmg = $("hudBoostDmgPill");
  const hudDmgT = $("hudBoostDmgTime");
  if (hudBoosters) {
    if (coinActive || dmgActive) {
      hudBoosters.style.display = "flex";
      if (hudCoin) {
        hudCoin.style.display = coinActive ? "inline-flex" : "none";
        if (hudCoinT) hudCoinT.textContent = fmtMinSec(coinLeft);
      }
      if (hudDmg) {
        hudDmg.style.display = dmgActive ? "inline-flex" : "none";
        if (hudDmgT) hudDmgT.textContent = fmtMinSec(dmgLeft);
      }
    } else {
      hudBoosters.style.display = "none";
    }
  }
}

// Background booster tick
setInterval(updateAdBoostersUi, 500);

const AdsManager = {
  config: CONFIG.ads,
  canShow(placement) { return true; },
  showRewarded(placement, onComplete) {
    playRewardedAd(onComplete, placement);
    return { shown: true };
  }
};
function todayKey(offsetDays){const d=new Date;if(offsetDays)d.setDate(d.getDate()+offsetDays);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}function dailyStage(){return Math.max(1,Math.min(10,Math.floor(((G.unlocked||1)-1)/5)+1))}function dailyStageMult(){return 1+0.15*(dailyStage()-1)}function dailyLevelMult(){return 1+0.08*Math.max(0,(G.level||1)-1)}function dailyTier(){const n=G.defeated.size;return n<10?0:n<20?1:n<35?2:3}function highestDefeatedBounty(){let best=-1;for(const idx of G.defeated)if(idx>best)best=idx;return ENEMIES[Math.max(0,best)].bounty}function seededPick(seedStr,pool,count){let h=2166136261;for(let i=0;i<seedStr.length;i++){h^=seedStr.charCodeAt(i);h=Math.imul(h,16777619)}const rnd=()=>{h=Math.imul(h^h>>>15,2246822507);h=Math.imul(h^h>>>13,3266489909);return((h^=h>>>16)>>>0)/4294967296};const arr=pool.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=arr[i];arr[i]=arr[j];arr[j]=t}return arr.slice(0,count)}const QUEST_DEFS={defeats:{label:(t)=>"Defeat "+t+" enemies today",targets:[5,10,18,30],reward:()=>({coins:Math.max(50,Math.round(highestDefeatedBounty()*0.7*dailyLevelMult()*dailyStageMult())),gems:0})},battleCoins:{label:(t)=>"Earn "+fmtNum(t)+" coins in battle today",targets:null,reward:()=>({coins:0,gems:2})},crits:{label:(t)=>"Land "+t+" critical slaps today",targets:[10,25,50,100],reward:()=>({coins:Math.max(50,Math.round(highestDefeatedBounty()*0.5*dailyLevelMult()*dailyStageMult())),gems:0})},hardClear:{label:()=>"Clear 1 HARD fight today",targets:[1,1,1,1],reward:()=>({coins:0,gems:2})},frenzies:{label:(t)=>"Trigger FRENZY "+t+"× today",targets:[1,2,3,5],reward:()=>({coins:0,gems:1})},buys:{label:(t)=>"Buy "+t+" upgrades today",targets:[3,5,8,12],reward:()=>({coins:Math.max(50,Math.round(highestDefeatedBounty()*0.5*dailyLevelMult()*dailyStageMult())),gems:0})}};function genQuests(dateStr){const tier=dailyTier();const pool=CONFIG.daily.questPool.filter((id)=>id!=="hardClear"||G.defeated.size>0);const stg=dailyStage();const bonusGems=Math.floor((G.level||1)/10)+Math.floor((stg-1)/3);return seededPick("quests-"+dateStr,pool,3).map((id)=>{const def=QUEST_DEFS[id];let target=id==="battleCoins"?Math.max(250,Math.round(highestDefeatedBounty()*[3,4,6,8][tier]*dailyStageMult())):def.targets[tier];if(id!=="battleCoins"&&id!=="hardClear")target=Math.max(1,Math.round(target*(1+Math.min(0.5,0.015*Math.max(0,G.level-1)))));const rw=def.reward();let gems=rw.gems;if(id==="battleCoins"&&tier>=2)gems=3;if(id==="hardClear"&&tier>=2){target=2;gems=3}if(id==="frenzies"&&tier>=3)gems=2;if(gems>0){gems=Math.min(10,gems+bonusGems)}return{id,target,coins:rw.coins,gems:Math.min(10,gems||0)}})}function ensureDaily(){const tk=todayKey();if(!G.daily||G.daily.date!==tk){G.daily={date:tk,counters:{defeats:0,battleCoins:0,crits:0,hardClears:0,frenzies:0,buys:0},quests:genQuests(tk),claimed:[]}}return G.daily}function questsUnlocked(){return G.defeated.has(9)}function dailyAdd(key,n){if(!questsUnlocked())return;const d=ensureDaily();if(typeof d.counters[key]!=="number")return;const prev=d.counters[key];d.counters[key]+=n;if(G.tab==="quests")renderQuests();for(let i=0;i<d.quests.length;i++){const q=d.quests[i];if(q.id===key&&d.claimed.indexOf(i)<0&&prev<q.target&&d.counters[key]>=q.target){renderQuestBadge();break}}}function questClaimableCount(){if(!questsUnlocked())return 0;const d=ensureDaily();let n=0;for(let i=0;i<d.quests.length;i++){if(d.claimed.indexOf(i)<0&&(d.counters[d.quests[i].id]||0)>=d.quests[i].target)n++}return n}function renderQuestBadge(){const badge=$("hubQuestBadge");if(!badge)return;if(!questsUnlocked()){badge.style.display="none";const lsub=$("hubQuestsSub");if(lsub)lsub.textContent="\uD83D\uDD12 DEFEAT THE MONKEY (#10)";return}const n=questClaimableCount();badge.style.display=n>0?"":"none";badge.textContent=n;const sub=$("hubQuestsSub");if(sub){const d=ensureDaily();sub.textContent=d.claimed.length+" / "+d.quests.length+" CLAIMED TODAY"+(n>0?" · "+n+" READY!":"")}}function renderQuests(){const d=ensureDaily();if(!questsUnlocked()){$("questsSub").textContent="LOCKED";$("questList").innerHTML='<div class="locked-panel">\uD83D\uDD12 Daily quests are locked.<br>Defeat the Mischievous Monkey (#10) to unlock daily quests.</div>';return}$("questsSub").textContent="FRESH QUESTS EVERY DAY · "+d.date;$("questList").innerHTML=d.quests.map((q,i)=>{const def=QUEST_DEFS[q.id];const cur=Math.min(d.counters[q.id]||0,q.target);const done=(d.counters[q.id]||0)>=q.target;const claimed=d.claimed.indexOf(i)>=0;const pct=Math.min(100,Math.floor(cur/q.target*100));const reward=(q.coins?COIN_SVG+" "+fmtNum(q.coins):"")+(q.coins&&q.gems?" · ":"")+(q.gems?GEM_SVG_SM+" "+q.gems:"");return'<div class="quest-row'+(done?" done":"")+'">'+'<div class="quest-top"><div class="quest-name">'+def.label(q.target)+'</div><div class="quest-reward">'+reward+"</div></div>"+'<div class="quest-bar"><i style="width:'+pct+'%"></i></div>'+'<div class="quest-bot"><div class="quest-prog">'+fmtNum(cur)+" / "+fmtNum(q.target)+"</div>"+(claimed?'<span class="quest-claimed-tag">CLAIMED ✓</span>':done?'<button class="quest-claim" data-claim="'+i+'">CLAIM</button>':"")+"</div></div>"}).join("");const btns=$("questList").querySelectorAll("[data-claim]");for(let i=0;i<btns.length;i++)btns[i].addEventListener("click",()=>claimQuest(parseInt(btns[i].getAttribute("data-claim"),10)))}function claimQuest(i){if(!questsUnlocked())return;const d=ensureDaily();const q=d.quests[i];if(!q||d.claimed.indexOf(i)>=0)return;if((d.counters[q.id]||0)<q.target)return;d.claimed.push(i);G.stats.questsDone=(G.stats.questsDone||0)+1;if(q.coins)creditCoinsQuiet(q.coins);if(q.gems)grantGems(Math.min(10,q.gems));Sound.levelup();renderQuests();renderQuestBadge();checkAchievements();Save.store()}$("questsDoneBtn").addEventListener("click",()=>{Sound.unlock();switchTab("home")});function frontierBounty(){return ENEMIES[Math.max(0,Math.min(G.unlocked,ENEMIES.length)-1)].bounty}function chestUnlocked(){return G.defeated.has(4)}function chestPreview(){const D=CONFIG.daily;if(G.chest.lastClaim===todayKey())return{claimed:true,day:G.chest.cycleDay,coins:0,gems:0};const day=G.chest.lastClaim===todayKey(-1)?G.chest.cycleDay%7+1:1;const fb=frontierBounty();const lm=dailyLevelMult();const sm=dailyStageMult();const stg=dailyStage();const coins=day===7?Math.max(300,Math.round(fb*D.chestDay7Mult*lm*sm)):Math.max(D.chestMinCoins,Math.round(fb*D.chestDayMult*day*lm*sm));const streakGems=day===7?Math.min(10,Math.max(5,D.chestDay7Gems+Math.floor(Math.max(0,G.level-1)/8)+Math.floor((stg-1)/3))):0;return{claimed:false,day,coins,gems:streakGems}}function chestPipsHtml(pv){const claimedCount=pv.claimed?G.chest.cycleDay:pv.day-1;let s='<div class="ch-pips" aria-hidden="true">';for(let d=1;d<=7;d++){s+='<i class="'+(d<=claimedCount?"on":"")+(d===pv.day?" today":"")+'"></i>'}return s+"</div>"}const LOCK_SVG='<svg class="ch-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm-3 8h6V7a3 3 0 1 0-6 0v3zm3 3.2a1.9 1.9 0 0 1 .9 3.5V18h-1.8v-1.3a1.9 1.9 0 0 1 .9-3.5z" fill="currentColor"/></svg>';let chestHidden=false;const CHEST_SVG='<svg class="ch-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9a8 5.5 0 0 1 16 0v2H4V9zm0 4h16v6a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-6zm6.2 0h3.6v3.4h-3.6V13z" fill="currentColor"/></svg>';function renderChest(){const card=$("chestCard");if(!card)return;card.id="chestCard";if(!chestUnlocked()){card.style.display="";card.className="locked";card.disabled=true;card.innerHTML=LOCK_SVG+'<div class="ch-main"><div class="ch-name">DAILY CHEST · LOCKED</div>'+'<div class="ch-sub">\uD83D\uDD12 Defeat the Slime Blob (#5) to unlock daily rewards</div></div>'+'<span class="ch-btn" aria-hidden="true">\uD83D\uDD12</span>';card.onclick=null;return}const pv=chestPreview();if(pv.claimed&&chestHidden){card.style.display="none";card.onclick=null;return}card.style.display="";card.className=pv.claimed?"claimed":"";if(pv.claimed){card.disabled=false;card.innerHTML=CHEST_SVG+'<div class="ch-main"><div class="ch-name">DAILY CHEST · DAY '+pv.day+" / 7</div>"+'<div class="ch-sub">Claimed — come back tomorrow for day '+(pv.day%7+1)+"</div>"+chestPipsHtml(pv)+"</div>"+'<span class="ch-btn" aria-hidden="true">CLAIMED ✓</span>';card.onclick=()=>{chestHidden=true;card.style.display="none"}}else{card.disabled=false;card.innerHTML=CHEST_SVG+'<div class="ch-main"><div class="ch-name">DAILY CHEST · DAY '+pv.day+" / 7</div>"+'<div class="ch-sub">TODAY: '+COIN_SVG+" +"+fmtNum(pv.coins)+(pv.gems?" · +"+pv.gems+" "+GEM_SVG_SM+" STREAK BONUS":"")+"</div>"+chestPipsHtml(pv)+"</div>"+'<span class="ch-btn" aria-hidden="true">CLAIM</span>';card.onclick=()=>{Sound.unlock();claimChest()}}}function claimChest(){if(!chestUnlocked())return;const pv=chestPreview();if(pv.claimed)return;G.chest={lastClaim:todayKey(),cycleDay:pv.day};G.stats.chestsClaimed=(G.stats.chestsClaimed||0)+1;G.stats.chestBestDay=Math.max(G.stats.chestBestDay||0,pv.day);if(pv.day===7)G.stats.chestCycles=(G.stats.chestCycles||0)+1;creditCoinsQuiet(pv.coins);if(pv.gems)grantGems(pv.gems);chestHidden=false;Sound.levelup();renderChest();renderHub();checkAchievements();Save.store()}const GROUP_TINTS=["#a8c6d8","#9fc48f","#c9a86a","#8d9bb5","#6f7f95","#5d7263","#7a6a8f","#b56a4a","#5f86a8","#8f4a3a","#3f6f8f","#7d8894","#a8894f","#8f734f","#6a5f8f","#7fa8c4","#5d5d78","#c4a23f","#4a3f66","#c9b98a"];const HubScene={timer:null,nextAt:0,side:"R",guestIdx(){for(let i=0;i<ENEMIES.length;i++)if(!G.defeated.has(i))return i;return ENEMIES.length-1},refresh(){const gi=this.guestIdx(),e=ENEMIES[gi];const img=$("hubGuest");if(img)img.src=e.spr.thumb;const cap=$("hubGuestCap");if(cap)cap.innerHTML='<span class="cap-k">'+(G.defeated.has(gi)?"LATEST VICTIM":"NEXT TARGET")+"</span>"+e.name.toUpperCase();const stage=$("hubStage");if(stage)stage.style.background=GROUP_TINTS[e.group]||""},start(){if(!this.timer)this.timer=setInterval(()=>this.tick(),650)},stop(){if(this.timer){clearInterval(this.timer);this.timer=null}},tick(){if(G.tab!=="home"||G.menuOpen||document.hidden)return;const now=performance.now();if(now<this.nextAt)return;this.nextAt=now+4000+Math.random()*2500;this.side=this.side==="R"?"L":"R";const wrap=document.querySelector(this.side==="L"?".hub-hand-wrap.left":".hub-hand-wrap.right");const guest=$("hubGuestWrap"),burst=$("hubBurst");if(!wrap||!guest)return;wrap.classList.remove("lunge-l","lunge-r");wrap.offsetWidth;wrap.classList.add(this.side==="L"?"lunge-l":"lunge-r");setTimeout(()=>{if(G.tab!=="home"||G.menuOpen)return;guest.classList.remove("wobble");guest.offsetWidth;guest.classList.add("wobble");if(burst){burst.classList.remove("pop");burst.offsetWidth;burst.classList.add("pop")}Sound.pop()},240);setTimeout(()=>wrap.classList.remove("lunge-l","lunge-r"),580)}};const INTRO_CARDS=[{h:"HANDS SLAP AUTOMATICALLY",p:"Your hands fight on their own! Every slap earns coins — win or lose. Build FRENZY mid-fight for +50% speed and damage bursts."},{h:"GROW ON THREE FRONTS",p:"Spend coins on Attributes, Level Up for perks, and unlock Skills like Second Hand to double your slaps."},{h:"CLIMB ALL 50",p:"Beat enemies to advance, complete Daily Quests, and claim your 7-Day login streak rewards. Start slapping!"}];let introIdx=0;function renderIntroCard(){const c=INTRO_CARDS[introIdx];$("introK").textContent=introIdx+1+" / "+INTRO_CARDS.length;$("introH").textContent=c.h;$("introP").textContent=c.p;$("introNext").textContent=introIdx===INTRO_CARDS.length-1?"START SLAPPING":"NEXT";const dots=$("introDots").children;for(let i=0;i<dots.length;i++)dots[i].className=i===introIdx?"on":""}function showIntro(){introIdx=0;renderIntroCard();$("introOverlay").classList.add("open")}function closeIntro(){$("introOverlay").classList.remove("open");if(!G.seenIntro){G.seenIntro=true;Save.store()}}$("introNext").addEventListener("click",()=>{Sound.unlock();if(introIdx<INTRO_CARDS.length-1){introIdx++;renderIntroCard()}else closeIntro()});$("introSkip").addEventListener("click",()=>{Sound.unlock();closeIntro()});function saveMsg(text,ok){const m=$("saveIoMsg");m.textContent=text;m.classList.toggle("ok",!!ok)}function validateSaveObject(o){if(!o||typeof o!=="object")return null;if(typeof o.coins!=="number"||!isFinite(o.coins)||o.coins<0)return null;if(typeof o.level!=="number"||!(o.level>=1)||o.level>1000)return null;if(!o.attrs||typeof o.attrs!=="object")return null;for(const k in o.attrs){const v=o.attrs[k];if(typeof v!=="number"||!isFinite(v)||v<0||v>1e5)return null}if(o.unlocked!=null&&(typeof o.unlocked!=="number"||o.unlocked<0||o.unlocked>ENEMIES.length))return null;if(o.defeated!=null&&(!Array.isArray(o.defeated)||o.defeated.some((n)=>typeof n!=="number"||n<0||n>=ENEMIES.length)))return null;if(o.gems!=null&&(typeof o.gems!=="number"||!isFinite(o.gems)||o.gems<0))return null;return o}const _eb=$("exportBtn");if(_eb)_eb.addEventListener("click",()=>{Sound.unlock();Save.store();let raw=null;try{raw=SafeStore.get(SAVE_KEY)}catch(e){}if(!raw){saveMsg("No save found to export yet — play a fight first.");return}const box=$("exportBox");box.value=raw.indexOf("TH3.")===0?raw.slice(4):raw;box.style.display="";$("copyCodeBtn").style.display="";saveMsg("Save code ready — copy it somewhere safe.",true)});const _cb=$("copyCodeBtn");if(_cb)_cb.addEventListener("click",()=>{const box=$("exportBox");box.style.display="";box.select();let done=false;if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(box.value).then(()=>saveMsg("Copied to clipboard.",true),()=>saveMsg("Copy failed — long-press the code to copy it manually."));done=true}if(!done){try{document.execCommand("copy");saveMsg("Copied to clipboard.",true)}catch(e){saveMsg("Copy failed — long-press the code to copy it manually.")}}});let importArmT=0,importParsed=null;const _ib=$("importBtn");if(_ib)_ib.addEventListener("click",()=>{Sound.unlock();const btn=$("importBtn");if(!btn.classList.contains("armed")){const code=$("importBox").value.trim();if(!code){saveMsg("Paste a save code first.");return}let obj=null;const cleaned=code.replace(/\s+/g,"");const json=unwrapSave(cleaned.indexOf("TH3.")===0?cleaned:"TH3."+cleaned);if(json!=null){try{obj=validateSaveObject(JSON.parse(json))}catch(e){obj=null}}if(!obj){saveMsg("This code isn't valid — it may have been edited. Your current game is untouched.");return}importParsed=obj;btn.classList.add("armed");btn.textContent="TAP AGAIN TO CONFIRM — REPLACES THIS SAVE";saveMsg("Code looks valid. Confirm to replace the current save with it.");clearTimeout(importArmT);importArmT=setTimeout(()=>{btn.classList.remove("armed");btn.textContent="IMPORT SAVE";importParsed=null},12000);return}clearTimeout(importArmT);btn.classList.remove("armed");btn.textContent="IMPORT SAVE";if(!importParsed)return;window.__thImportLock=true;try{SafeStore.set(SAVE_KEY,wrapSave(JSON.stringify(importParsed)))}catch(e){window.__thImportLock=false;saveMsg("Storage blocked — import failed.");return}importParsed=null;saveMsg("Save imported — reloading into it…",true);setTimeout(()=>{try{location.reload()}catch(e){}},400)});function renderAwards(){const s=G.stats;const rows=[["TOTAL DAMAGE",fmtNum(Math.floor(s.damage))],["SLAPS LANDED",fmtNum(s.slaps)],["CRITICAL HITS",fmtNum(s.crits)],["LUCKY HITS",fmtNum(s.luckyHits||0)],["HEAVY SLAPS",fmtNum(s.heavies)],["ULTIMATE SLAPS",fmtNum(s.ultimates)],["FRENZIES TRIGGERED",fmtNum(s.frenzies||0)],["TOTAL KOS",fmtNum(G.kills)],["HARD MODE KOs",fmtNum(s.hardKills||0)],["HARD CLEARS",G.hardCleared.size+" / "+ENEMIES.length],["ENEMIES DEFEATED",G.defeated.size+" / "+ENEMIES.length],["COINS EARNED (ALL-TIME)",fmtNum(s.coinsEarned)],["BEST COMBO","x"+Math.max(1,s.bestCombo)],["FIGHTS WON",fmtNum(s.fightsWon)],["FIGHTS LOST",fmtNum(s.fightsLost)],["FASTEST VICTORY",s.fastestWin?fmtTime(s.fastestWin):"—"],["OFFLINE EARNINGS",fmtNum(s.offlineCoins||0)],["GEM BALANCE",fmtNum(G.gems)],["PLAY TIME",fmtTime(s.playTime)]];statsGridEl.innerHTML=rows.map((r)=>'<div class="stat-tile"><span>'+r[0]+"</span><b>"+r[1]+"</b></div>").join("");const head=$("achSecHead");if(head)head.textContent="ACHIEVEMENTS · "+G.achievements.length+" / "+ACHIEVEMENTS.length+" UNLOCKED";let html="";for(const cat of ACH_CAT_ORDER){const list=ACHIEVEMENTS.filter((x)=>x.cat===cat);if(!list.length)continue;const doneN=list.filter((x)=>G.achievements.indexOf(x.id)>=0).length;html+='<div class="aw-sec" style="margin:14px 2px 6px">'+cat.toUpperCase()+" · "+doneN+" / "+list.length+"</div>";html+=list.map((a)=>{const owned=G.achievements.indexOf(a.id)>=0;const claimed=(G.claimedAchievements||[]).indexOf(a.id)>=0;const v=a.val(),pct=Math.min(100,Math.floor(v/a.target*100));let actHtml="";if(owned&&!claimed){actHtml='<button class="ach-claim-btn" data-ach-claim="'+a.id+'"><span class="gem-ico-sm">💎</span>+'+(a.gems||1)+' CLAIM</button>';}else if(owned&&claimed){actHtml='<div class="ach-state claimed">✓ CLAIMED</div>';}else{actHtml='<div class="ach-state locked">'+(a.gems?'<span class="ach-gem-hint">💎+'+a.gems+'</span> ':'')+fmtNum(Math.min(v,a.target))+' / '+fmtNum(a.target)+'</div>';}return'<div class="ach-row '+(owned?(claimed?"claimed":"claimable"):"locked")+'"><img src="'+iconUrl("ach",a.id)+'" alt="">'+'<div class="ach-main"><div class="ach-name">'+a.name+(owned&&!claimed?' <span class="ach-ready-pill">READY</span>':'')+'</div><div class="ach-desc">'+a.desc+'</div>'+'<div class="ach-bar"><i style="width:'+pct+'%"></i></div></div>'+actHtml+'</div>'}).join("")}achListEl.innerHTML=html;if(!achListEl.__claimBound){achListEl.__claimBound=true;achListEl.addEventListener("click",(e)=>{const btn=e.target.closest("[data-ach-claim]");if(!btn)return;const achId=btn.getAttribute("data-ach-claim");const a=ACHIEVEMENTS.find(x=>x.id===achId);if(!a)return;if(!G.claimedAchievements)G.claimedAchievements=[];if(G.claimedAchievements.indexOf(achId)>=0)return;G.claimedAchievements.push(achId);if(a.gems)grantGems(a.gems);Sound.levelup();Save.store();renderAwards();updateAwardsBadge();});}

if(!G.claimedAchievements)G.claimedAchievements=[];
const unclaimedList=G.achievements.filter(id=>G.claimedAchievements.indexOf(id)<0);
let unclaimedGems=0;
for(const uid of unclaimedList){
  const ua=ACHIEVEMENTS.find(x=>x.id===uid);
  unclaimedGems+=(ua&&ua.gems?ua.gems:1);
}
const updateClaimAllBtn=(btn)=>{
  if(!btn)return;
  if(unclaimedList.length>0){
    btn.style.display="inline-flex";
    btn.innerHTML='<span class="claim-gem-icon">💎</span> CLAIM ALL ('+unclaimedList.length+') <span class="claim-all-gems">+'+unclaimedGems+'</span>';
  } else {
    btn.style.display="none";
  }
};
updateClaimAllBtn($("claimAllAwardsBtn"));
updateClaimAllBtn($("claimAllAchBtn"));

function claimAllAchievements(){
  if(!G.claimedAchievements)G.claimedAchievements=[];
  const unclaimed=G.achievements.filter(id=>G.claimedAchievements.indexOf(id)<0);
  if(unclaimed.length===0)return;
  let totalGems=0;
  for(const uid of unclaimed){
    G.claimedAchievements.push(uid);
    const a=ACHIEVEMENTS.find(x=>x.id===uid);
    totalGems+=(a&&a.gems?a.gems:1);
  }
  if(totalGems>0)grantGems(totalGems);
  Sound.levelup();
  Save.store();
  renderAwards();
  updateAwardsBadge();
  showShopToast("CLAIMED ALL! +"+totalGems+" Gems from "+unclaimed.length+" achievements!");
}
const cBtn1=$("claimAllAwardsBtn"),cBtn2=$("claimAllAchBtn");
if(cBtn1&&!cBtn1.__bound){cBtn1.__bound=true;cBtn1.addEventListener("click",claimAllAchievements);}
if(cBtn2&&!cBtn2.__bound){cBtn2.__bound=true;cBtn2.addEventListener("click",claimAllAchievements);}

updateAwardsBadge();}function renderStartShowcase(){menuEnemyEl.src=ENEMIES[G.current].spr.thumb;menuEnemyEl.alt=ENEMIES[G.current].name}const PLAY_TIPS=["Frenzy is a skill-tree unlock now — buy it, charge it, tap it.","Bosses #10, #30, #50, #70 and #90 drop special skills.","Premium skins grant a bonus AND a 10th-slap power — check the Shop.","Left hand prints land on one cheek, right hand on the other.","Hard mode pays 2.5x coins and a one-time gem per enemy."];let playTipTimer=0,playLoaderFailsafe=0;
function showPlayLoader(pct){const el=$("playLoader");if(!el)return;const ph=el.querySelector(".pl-hand");if(ph&&ph.getAttribute("src")==="data:,")ph.src=HAND_URI;let ti=0;$("playTip").textContent=PLAY_TIPS[0];el.classList.add("show");setPlayProgress(pct==null?8:pct);clearInterval(playTipTimer);playTipTimer=setInterval(()=>{ti=(ti+1)%PLAY_TIPS.length;$("playTip").textContent=PLAY_TIPS[ti]},900);clearTimeout(playLoaderFailsafe);playLoaderFailsafe=setTimeout(hidePlayLoader,6000)}
function setPlayProgress(pct){const f=$("playFill"),p=$("playPct");if(f)f.style.width=Math.max(0,Math.min(100,pct))+"%";if(p)p.textContent=pct>=100?"READY!":Math.round(pct)+"%"}
function hidePlayLoader(){const el=$("playLoader");if(el)el.classList.remove("show");clearInterval(playTipTimer);clearTimeout(playLoaderFailsafe)}
let hubReadyPromise=null,hubReadyState="idle",hubProgressHook=null;window.__hubReadyState="idle";function setHubState(s){hubReadyState=s;window.__hubReadyState=s}function ensureHubReady(){if(hubReadyPromise)return hubReadyPromise;setHubState("building");hubReadyPromise=new Promise((resolve)=>{try{if(!window.__hubBuilt){renderHub();window.__hubBuilt=true;if(G.skin!=="classic")ensureSkinArt(G.skin)}const gi=HubScene.guestIdx();void ENEMIES[gi].spr;HubScene.refresh();if(G.tab!=="home")switchTab("home");else{renderHub();HubScene.start()}}catch(e){console.warn("[These Hands] hub build error:",e)}setHubState("ready");if(hubProgressHook)hubProgressHook(100);resolve(true)});return hubReadyPromise}function enterHub(t0){try{Music.sync()}catch(e){console.warn("[These Hands] music sync failed",e)}document.body.classList.remove("locked");G.menuOpen=false;startMenuEl.classList.remove("open");maybeShowAwayCard();hidePlayLoader();hubProgressHook=null;window.__playMs=Math.round(performance.now()-t0);if(!G.seenIntro&&!$("introOverlay").classList.contains("open"))showIntro()}let playStep="idle";window.__playStep="idle";function setPlayStep(s){playStep=s;window.__playStep=s}function showHangToast(step){const t=$("hangToast");if(!t)return;const m=$("hangMsg");if(m)m.textContent="Slow step: "+step+" \u2014 the hub took too long to open.";t.style.display="flex"}function hideHangToast(){const t=$("hangToast");if(t)t.style.display="none"}$("hangRetry").addEventListener("click",()=>{hideHangToast();hubReadyPromise=null;setHubState("idle");setPlayStep("hub-build");showPlayLoader(6);hubProgressHook=(pct)=>setPlayProgress(pct);ensureHubReady().then(()=>{hidePlayLoader();hubProgressHook=null;if(G.menuOpen)enterHub(performance.now());setPlayStep("done")})});$("hangDismiss").addEventListener("click",hideHangToast);window.__startMenuClickBound = true;
$("startMenu").addEventListener("click", (e) => {
  if (e.target && e.target.id === "menuMusicBtn") return;
  $("playBtn").click();
});
$("playBtn").addEventListener("click",()=>{const t0=performance.now();hideHangToast();try{Sound.unlock();if(Sound.ctx&&Sound.ctx.state!=="running")Sound.ctx.resume()}catch(e){}if(hubReadyState==="ready"){enterHub(t0);return}ensureHubReady().then(()=>{enterHub(t0)}).catch(()=>{enterHub(t0)})});function fmtAway(seconds){const h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60);if(h>0)return h+"h "+m+"m";if(m>0)return m+"m";return Math.floor(seconds)+"s"}function maybeShowAwayCard(){const p=G.pendingOffline;if(!p||!(p.coins>0)||G.menuOpen)return;awayTextEl.textContent="Your hands kept slapping for "+fmtAway(p.away)+" while you were gone (25% efficiency, up to 8 hours). Here's what they earned:";awayAmtEl.innerHTML=COIN_SVG+" +"+fmtNum(p.coins);awayCardEl.classList.add("open")}$("awayClaim").addEventListener("click",()=>{const p=G.pendingOffline;if(!p){awayCardEl.classList.remove("open");return}G.pendingOffline=null;G.totalCoins+=p.coins;G.stats.coinsEarned+=p.coins;G.stats.offlineCoins=(G.stats.offlineCoins||0)+p.coins;G.stats.offlineClaims=(G.stats.offlineClaims||0)+1;awayCardEl.classList.remove("open");syncCoinsToTruth();renderHub();Sound.win();checkAchievements();Save.store()});const stageWrap=$("stageWrap"),canvas=$("game"),ctx=canvas.getContext("2d");canvas.addEventListener("pointerdown",(ev)=>{if(G.tab!=="battle"||G.menuOpen||G.phase!=="fighting"||!G.weak||!G.weak.active)return;const r=canvas.getBoundingClientRect();const x=ev.clientX-r.left,y=ev.clientY-r.top;const rad=Math.max(48,enemyGeom().h*0.17);const dx=x-G.weak.x,dy=y-G.weak.y;if(dx*dx+dy*dy<=rad*rad)precisionSlap()});let W=0,H=0,DPR=1;function resize(){const isMobile=window.innerWidth<=768||(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform())||navigator.userAgent.toLowerCase().includes("android");DPR=isMobile?1:Math.min(window.devicePixelRatio||1,1.5);W=stageWrap.clientWidth;H=stageWrap.clientHeight;canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR)}window.addEventListener("resize",resize);function coinTarget(){const r=canvas.getBoundingClientRect(),p=coinPillEl.getBoundingClientRect();return{x:p.left+p.width/2-r.left,y:p.top+p.height/2-r.top}}const STAGE_FLOOR=[0.80,0.85,0.68,0.83,0.85,0.82,0.90,0.86,0.86,0.84,0.82,0.88,0.88,0.80,0.88,0.80,0.88,0.88,0.90,0.82];function enemyGeom(){const spr=G.enemy.spr;const sc=G.enemy.scale||1.0;let h=Math.min(H*0.50*sc,H*0.72);let w=h*(spr.cols/spr.rows);const maxW=Math.max(120,W-60);if(w>maxW){h*=maxW/w;w=maxW}return{spr,w,h,cx:W/2,feetY:H*(STAGE_FLOOR[G.enemy.group]||0.78),px:h/spr.rows}}function slapBounds(){const I=cycleInterval(),S=CONFIG.slap;return{I,windup:S.windup*I,strikeEnd:S.strikeEnd*I,holdEnd:S.holdEnd*I,recoverEnd:S.recoverEnd*I}}function spawnSkinBurst(x,y,tag,procId){const id=G.skin;if(id==="classic"||!skinDef().power)return;const big=!!procId||tag==="crit"||tag==="heavy"||tag==="ultimate";const n=procId?14:big?9:6;const cols={stone:["#8d8578","#6e675c","#a89e8c","#575046"],void:["#7c3aed","#a78bfa","#4c1d95","#e9d5ff"],venom:["#43b04c","#7ed957","#1d6b2a","#c8f169"],flaming:["#ef7d1a","#d63c30","#ffcf3f","#b3540a"],dragon:["#d63c30","#ef7d1a","#8f1f16","#ffcf3f"]}[id];if(!cols)return;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=(procId?150:90)+Math.random()*(procId?190:130);G.bursts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-(id==="flaming"?120:40),grav:id==="stone"?950:id==="void"?-160:id==="venom"?560:id==="flaming"?-260:700,size:(procId?7:5)+Math.random()*6,col:cols[i%cols.length],shape:id==="void"?"shard":"rect",t:0,life:0.45+Math.random()*0.25,rot:Math.random()*Math.PI,vr:(Math.random()*2-1)*9})}if(id==="dragon"){const m=procId?5:3;for(let i=0;i<m;i++)G.claws.push({x:x+(i-(m-1)/2)*13,y:y+(i%2?5:-5),t:0,life:procId?0.4:0.28,rot:(Math.random()*0.3-0.15)+(i%2?0.25:-0.25),big:!!procId})}if(id==="venom")G.venomT=Math.max(G.venomT,0.2);if(id==="void")G.voidT=Math.max(G.voidT,0.2)}
function applyHit(kind){const e=G.enemy;if(!e||e.dead)return;const st=stats();const hitSide=kind==="barrage"?(Math.random()<0.5?"L":"R"):(hasSkill("secondHand")?G.slapHand:"R");const isPrimary=kind!=="barrage"&&kind!=="special";const pity=isPrimary&&(G.missStreak||0)>=2;if(isPrimary&&!pity&&PFX.accT>0&&Math.random()<0.3){G.slapCount+=1;G.missStreak=(G.missStreak||0)+1;if(!hasSkill("onTarget")){G.comboStack=0;updateComboTag()}if(G.frenzyT<=0&&hasSkill("frenzy")){G.frenzyMeter=Math.min(100,G.frenzyMeter+50*cycleInterval()/CONFIG.frenzy.cadence);updateFrenzyBar()}const geoB=enemyGeom();G.dmgNums.push({x:geoB.cx+(Math.random()*24-12),y:geoB.feetY-geoB.h*0.74,vy:-44,t:0,life:0.8,text:"MISS",tag:"miss",rot:0});Sound.whiff();return}if(!pity&&Math.random()>=st.hitChance){if(isPrimary){G.slapCount+=1;G.missStreak=(G.missStreak||0)+1;}if(!hasSkill("onTarget")){G.comboStack=0;updateComboTag()}const geoM=enemyGeom();G.dmgNums.push({x:geoM.cx+(Math.random()*24-12),y:geoM.feetY-geoM.h*0.74,vy:-44,t:0,life:0.8,text:"MISS",tag:"miss",rot:0});Sound.whiff();return}if(isPrimary)G.missStreak=0;const r=DamageCalculator.roll(kind);let damage=r.damage;if(isPrimary&&e.bsShield>0){damage=Math.max(1,Math.round(damage*0.5));e.bsShield-=1;updateFxChips()}let tag = r.tag,F=CONFIG.feel,sf=CONFIG.skillFx;let lucky=false;if(isPrimary&&Math.random()<st.luckChance){lucky=true;damage=Math.max(1,Math.round(damage*CONFIG.fx.luckDmgMult));G.stats.luckyHits=(G.stats.luckyHits||0)+1}if(isPrimary){
    if((G.attrs.vampirism||0)>0 && G.slapCount % 6 === 0) { const hv=(G.attrs.vampirism||0)*(CONFIG.fx.vampPerLevel||1); if(hv>0&&G.playerHp<playerMaxHp()){ G.playerHp=Math.min(playerMaxHp(),G.playerHp+hv); G.heals.push({x:W*0.24,y:H*0.82,vy:-42,t:0,life:0.9,text:"+"+hv+" HP"}); updatePlayerBar(); } }
  G.slapCount+=1;
  if(G.counterCadenceArmed){
    G.counterCadenceArmed=false;
    damage=Math.round(damage*2.5);
    r.crit=true;
    G.dmgNums.push({x:W/2,y:H*0.38,vy:-36,t:0,life:1.0,text:"CADENCE CRIT!",tag:"crit",rot:0});
  }
  if(hasAbility("toughGrit")&&G.playerHp/playerMaxHp()<=0.50){
    const mhp=playerMaxHp();
    if(G.playerHp<mhp){G.playerHp=Math.min(mhp,G.playerHp+1);updatePlayerBar();}
  }
  if(hasAbility("giantStature")&&e&&(e.elite||e.boss)){G.comboStack+=1;}
  if(hasAbility("ironResolve")&&G.slapCount%CONFIG.abilityFx.ironResolveEvery===0){
    PFX.burnT=0;PFX.slowT=0;PFX.accT=0;PFX.lockT=0;
    const healAmt=Math.round(playerMaxHp()*CONFIG.abilityFx.ironResolveHpPct);
    if(healAmt>0){G.playerHp=Math.min(playerMaxHp(),G.playerHp+healAmt);G.heals.push({x:W*0.24,y:H*0.82,vy:-42,t:0,life:0.9,text:"RESOLVE +"+healAmt});updatePlayerBar();}
    G.dmgNums.push({x:W/2,y:H*0.45,vy:-20,t:0,life:1.0,text:"PURGED!",tag:"proc",rot:0});
  }
  if(hasAbility("godhandAwakening")&&G.slapCount%CONFIG.abilityFx.godhandEvery===0){
    damage=Math.round(damage*CONFIG.abilityFx.godhandMult);
    tag="ultimate";
    G.dmgNums.push({x:W/2,y:H*0.32,vy:-38,t:0,life:1.3,text:"GODHAND!",tag:"ultimate",rot:0});
    G.shake=Math.max(G.shake,20);
    Sound.slap("ultimate");
  }
  if(tag==="ultimate"){G.ultReady=false;G.ultCharge=0}
  if(hasSkill("rapidBarrage")&&G.slapCount%sf.barrageEvery===0){G.barrage=sf.barrageHits;G.barrageT=0}
}G.comboStack+=1;if(G.comboStack>G.bestCombo)G.bestCombo=G.comboStack;updateComboTag();if(e.stunT>0&&hasSkill("dizzyPunisher"))damage=Math.round(damage*1.35);if(G.playerHp/playerMaxHp()<=0.35&&hasSkill("clutchSurge"))damage=Math.round(damage*1.25);if(hasAbility("executioner")&&e&&(e.hp/e.maxHp<=CONFIG.abilityFx.executionerHpFrac))damage=Math.round(damage*CONFIG.abilityFx.executionerDmgMult);if((/giant|titan|dragon|golem|king|colossus|almighty/i.test(e.name))&&hasSkill("titanSlayer"))damage=Math.round(damage*1.35);if(isPrimary&&hasSkill("kineticShield")&&G.slapCount%20===0){G.kineticShield=Math.min(90,(G.kineticShield||0)+30);G.dmgNums.push({x:W/2,y:H*0.45,vy:-20,t:0,life:0.9,text:"+SHIELD 30",tag:"proc",rot:0});}if(isPrimary&&G.frenzyT<=0&&hasSkill("frenzy")){const was=G.frenzyMeter;G.frenzyMeter=Math.min(100,G.frenzyMeter+100*cycleInterval()/(CONFIG.frenzy.cadence*(G.frenzyBoostUnlocked?0.75:1)));if(G.frenzyMeter>=100&&was<100)updateFrenzyBar()}let procId=null;if(isPrimary){const skd=skinDef();if(skd.power){G.procCount+=1;updateProcChip();if(G.procCount%10===0){procId=skd.id;const baseDmg=damage;if(procId==="spidey"){damage=Math.max(1,Math.round(damage*3));SP.stunT=Math.max(SP.stunT,1.6)}else if(procId==="logan"){damage=Math.max(1,Math.round(damage*1.2));if(!SP.dot)SP.dot={id:"bleed",per:Math.max(1,Math.round(baseDmg*0.8)),left:3,tickT:0,tag:"slash"};setTimeout(()=>{if(G.phase==="fighting"&&G.enemy&&!G.enemy.dead)applySpecialHit(Math.max(1,Math.round(baseDmg*1.2)),"slash",false)},140);setTimeout(()=>{if(G.phase==="fighting"&&G.enemy&&!G.enemy.dead)applySpecialHit(Math.max(1,Math.round(baseDmg*1.2)),"slash",false)},280)}else if(procId==="thor"){damage=Math.max(1,Math.round(damage*4));setTimeout(()=>{if(G.phase==="fighting"&&G.enemy&&!G.enemy.dead)applySpecialHit(Math.max(1,Math.round(baseDmg*0.6)),"bolt",false)},160)}else if(procId==="hulk"){damage=Math.max(1,Math.round(damage*10))}else if(procId==="gauntlet"){G.frenzyT=Math.max(G.frenzyT,2.5);G.frenzyFlashT=Math.max(G.frenzyFlashT,0.9)}}}}const geo=enemyGeom();const hitS=hitSide==="R"?1:-1;const cheekX=geo.cx+hitS*Math.min(geo.w*0.14,20);const cheekY=geo.feetY-geo.h*0.76;if(isPrimary&&r.crit){dailyAdd("crits",1);if(hasAbility("overcharge")){const shock=(G.attrs.defense||0)*CONFIG.abilityFx.overchargeDefMult;if(shock>0){damage+=shock;G.dmgNums.push({x:cheekX,y:cheekY-50,vy:-32,t:0,life:0.9,text:"SHOCK +"+fmtNum(shock),tag:"proc",rot:0});}}if(hasSkill("echoStrike")&&Math.random()<0.25){setTimeout(()=>{if(G.phase==="fighting"&&G.enemy&&!G.enemy.dead)applySpecialHit(Math.max(1,Math.round(damage*0.4)),"echo",Math.random()<0.5?"L":"R")},200);}}const hpBefore=e.hp;e.hp-=damage;const recD=G.enemyRecords[e.idx]||{k:0,f:0,d:0};recD.d=(recD.d||0)+damage;G.enemyRecords[e.idx]=recD;e.hitT=0.28;e.squashT=0.16;G.stats.damage+=damage;G.stats.slaps+=1;if(r.crit)G.stats.crits+=1;if(tag==="heavy")G.stats.heavies+=1;if(tag==="ultimate")G.stats.ultimates+=1;if(G.comboStack>G.stats.bestCombo)G.stats.bestCombo=G.comboStack;/* marks removed */const shakeFor={normal:Math.min(9,5+damage*0.02),crit:F.shakeCritPx,heavy:F.shakeHeavyPx,ultimate:F.shakeUltPx,barrage:4};G.shake=Math.max(G.shake,shakeFor[tag]||F.shakePx);if(isPrimary&&G.skin==="hulk")G.shake=Math.min(34,G.shake*1.6);else if(isPrimary&&G.skin==="gauntlet")G.shake=Math.min(30,G.shake*1.25);G.hitStop=tag==="ultimate"?F.hitStopUlt:tag==="heavy"?F.hitStopHeavy:tag==="crit"?F.hitStopCrit:tag==="barrage"?0.03:F.hitStop;G.dmgLog.push({t:G.time,dmg:damage});Sound.slap(tag);G.impacts.push({x:cheekX,y:cheekY,t:0,life:tag==="ultimate"?0.42:tag==="normal"||tag==="barrage"?0.2:0.3,tag});spawnSkinBurst(cheekX,cheekY,tag,procId);if(procId)G.dmgNums.push({x:cheekX,y:cheekY-88,vy:-30,t:0,life:1.15,text:skinDef().power.name+"!",tag:"proc",rot:0});G.dmgNums.push({x:cheekX+(Math.random()*24-12),y:cheekY-8,vy:-66,t:0,life:tag==="normal"||tag==="barrage"?0.85:1.05,text:fmtNum(damage),tag,rot:(Math.random()*0.2-0.1)*(tag==="normal"?1:1.6)});if(lucky)G.dmgNums.push({x:cheekX,y:cheekY-46,vy:-38,t:0,life:1,text:"LUCKY!",tag:"lucky",rot:0});if(isPrimary&&hasAbility("vampireSlap")&&G.slapCount%CONFIG.abilityFx.vampEvery===0){const healed=Math.min(CONFIG.abilityFx.vampHeal,playerMaxHp()-G.playerHp);if(healed>0){G.playerHp+=healed;G.heals.push({x:W*0.24,y:H*0.82,vy:-42,t:0,life:0.9,text:"+"+healed+" HP"});updatePlayerBar()}}const isHardHit=G.hardMode||!!(e&&e.hard);let gain=Math.max(1,Math.round(Math.max(1,Math.round(Math.min(damage,hpBefore)*e.coinRate))*st.coinMult));if(isPrimary&&hasAbility("midasStrike")&&G.enemyAtkT<=0.8)gain=Math.round(gain*CONFIG.abilityFx.midasStrikeMult);if(lucky)gain*=CONFIG.fx.luckCoinMult;if(gain>0){G.totalCoins+=gain;G.stats.coinsEarned+=gain;dailyAdd("battleCoins",gain);G.fightHitCoins+=gain;G.coinsDirty=true;G.coinNums.push({x:cheekX+(Math.random()*20-10),y:cheekY-30,vy:-58,t:0,life:0.8,text:"+"+fmtNum(gain),gold:lucky});const tgt2=coinTarget();G.coinsFx.push({x:cheekX,y:cheekY,vx:(Math.random()*2-1)*50,vy:-130,t:0,state:"burst",value:gain,tx:tgt2.x,ty:tgt2.y,flyT:0,sx:0,sy:0,idx:90+G.slapCount%7});}checkAchievements();updateEnemyBar();if(isPrimary&&e.hp>0&&Math.random()<st.specialChance){G.doubleFlashT=0.22;G.dmgNums.push({x:cheekX,y:cheekY-64,vy:-32,t:0,life:0.9,text:"DOUBLE!",tag:"double",rot:0});Sound.slap("crit");applyHit("special")}if(e.boss&&!e.enraged&&e.hp>0&&e.hp<=e.maxHp*CONFIG.boss.enrageBelow){e.enraged=true;G.dmgNums.push({x:geo.cx,y:geo.feetY-geo.h-18,vy:-26,t:0,life:1.25,text:"ENRAGED!",tag:"enraged",rot:0});G.shake=Math.max(G.shake,15);Sound.roar();updateEnemyBar()}if(e.hp<=0)killEnemy()}function groupComplete(g){for(let k=0;k<5;k++)if(!G.defeated.has(g*5+k))return false;return true}
function groupRewardCoins(g){return Math.round(ENEMIES[g*5+4].bounty*CONFIG.groupReward.bountyMult)}
function grantGroupReward(g){if(G.groupRewards.indexOf(g)>=0)return 0;G.groupRewards.push(g);const coins=groupRewardCoins(g);creditCoinsQuiet(coins);G.stats.coinsEarned+=coins;G.pendingGroupToast={group:g,coins};return coins}
function checkCollectionReward(){if(G.collectionReward)return false;const prem=CONFIG.skins.filter((s)=>s.price);if(!prem.length||!prem.every((s)=>G.ownedSkins.indexOf(s.id)>=0))return false;G.collectionReward=true;grantGems(CONFIG.collection.gems);return true}
function killEnemy(){const e=G.enemy;if(!e||e.dead)return;e.dead=true;SP.dot=null;SP.burn=null;SP.venom=null;SP.stunT=0;SP.curseT=0;SP.beamT=0;PFX.burnT=0;bossFx=null;hideBossWarn();G.phase="dying";G.phaseT=0;G.barrage=0;Sound.ko();const isHardPayout=G.hardMode||!!(e&&e.hard);let payout=isHardPayout?Math.round(e.bounty*1*stats().coinMult):Math.round(0.25*e.bounty*stats().coinMult);const FM=G.fightMode;const inGauntlet=!!(FM&&FM.type==="gauntlet");const inMode=!!(FM&&(FM.type==="bossrush"||FM.type==="endless"));if(inGauntlet)payout=0;else if(FM&&FM.type==="bossrush")payout=Math.round(e.bounty*stats().coinMult);else if(FM&&FM.type==="endless")payout=Math.round(e.bounty*(0.5+0.25*(FM.wave||1))*stats().coinMult);if(hasSkill("goldenTouch")&&(e.boss||e.elite))payout=Math.round(payout*1.5);G.fightBonus=payout;if(inMode)FM.earned=(FM.earned||0)+payout;G.stats.coinsEarned+=payout;dailyAdd("battleCoins",payout);dailyAdd("defeats",1);if(e.hard)dailyAdd("hardClears",1);const geo=enemyGeom(),tgt=coinTarget();G.poofs.push({x:geo.cx,y:geo.feetY-geo.h*0.45,t:0,life:0.5});G.impacts.push({x:geo.cx,y:geo.feetY-geo.h*0.55,t:0,life:0.3,tag:"normal"});const isFinalKill=e.idx===49||e.idx===ENEMIES.length-1;if(isFinalKill)G.gameCompleted=true;if(e.idx===49&&!e.hard)G.dragonMilestone=true;const fragCols=(e.spr.colors&&e.spr.colors.length?e.spr.colors:["#d9b878"]).concat(isFinalKill?["#f2b01e","#ffcf3f","#fff3da","#f2b01e"]:[]);const nFrags=isFinalKill?36:16;for(let i=0;i<nFrags;i++){const a=Math.random()*Math.PI*2,sp=110+Math.random()*(isFinalKill?340:270);G.frags.push({x:geo.cx+(Math.random()*44-22),y:geo.feetY-geo.h*0.5+(Math.random()*34-17),vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-170,rot:Math.random()*Math.PI*2,vr:(Math.random()*2-1)*10,size:6+Math.random()*11,col:fragCols[i%fragCols.length],t:0,life:(isFinalKill?0.95:0.6)+Math.random()*(isFinalKill?0.5:0.35)})}if(isFinalKill){G.impacts.push({x:geo.cx,y:geo.feetY-geo.h*0.5,t:0,life:0.45,tag:"ultimate"})}const n=Math.min(payout,CONFIG.feel.coinVisualsMax);const base=Math.floor(payout/n);let rem=payout-base*n;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=90+Math.random()*190;G.coinsFx.push({x:geo.cx,y:geo.feetY-geo.h*0.55,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-190,t:0,state:"burst",value:base+(rem-- >0?1:0),tx:tgt.x,ty:tgt.y,flyT:0,sx:0,sy:0,idx:i})}G.totalCoins+=payout;G.kills+=1;G.stats.fightsWon+=1;const rec=G.enemyRecords[e.idx]||{k:0,f:0};rec.k+=1;if(!rec.f||G.fightTime<rec.f)rec.f=G.fightTime;G.enemyRecords[e.idx]=rec;if((e.scale||1)>=1.6)G.stats.giantKills+=1;if(e.boss)G.stats.bossKills=(G.stats.bossKills||0)+1;else if(e.elite)G.stats.eliteKills=(G.stats.eliteKills||0)+1;if(G.fightDamageTaken<=0)G.stats.untouchableWins+=1;if(!G.stats.fastestWin||G.fightTime<G.stats.fastestWin)G.stats.fastestWin=G.fightTime;const wasFrontier=e.idx===G.unlocked-1;G.defeated.add(e.idx);let unlockedName=null,specialUnlock=null,groupReward=null,gateNext=null;{const gg=e.idx/5|0;if(groupComplete(gg)&&G.groupRewards.indexOf(gg)<0){const gc=grantGroupReward(gg);if(gc>0)groupReward=gc}}if(!e.hard)for(const sp of CONFIG.specials)if(sp.boss===e.idx&&!G.specials[sp.id]){G.specials[sp.id]=1;specialUnlock=sp.name}if(!e.hard&&wasFrontier&&G.unlocked<ENEMIES.length){G.unlocked+=1;if((e.idx+1)%10===5)gateNext={group:(e.idx+1)/5,name:ENEMIES[e.idx+1].name};else unlockedName=ENEMIES[e.idx+1].name}let gemGain=0,hardFirst=false;if(e.hard){G.stats.hardKills=(G.stats.hardKills||0)+1;if(!G.hardCleared.has(e.idx)){G.hardCleared.add(e.idx);gemGain=CONFIG.hard.gemReward;hardFirst=true}}else if(e.idx===ENEMIES.length-1)gemGain=CONFIG.gems.finalDragon;else if(e.idx%10===9)gemGain=CONFIG.gems.pairBoss;else if(e.elite)gemGain=CONFIG.gems.elite;if(hasSkill("goldenTouch")&&(e.boss||e.elite))gemGain=(gemGain||0)+1;if(inGauntlet||inMode)gemGain=0;if(gemGain>0)grantGems(gemGain);let gauntletBonus=0,gauntletGem=0,gauntletUnlock=null;let rushBonus=0,rushGem=0;if(FM&&FM.type==="bossrush"&&FM.step>=FM.queue.length-1){rushBonus=Math.round(FM.queue.reduce((s2,qi)=>s2+ENEMIES[qi].bounty,0)*3*stats().coinMult);G.totalCoins+=rushBonus;G.stats.coinsEarned+=rushBonus;rushGem=G.bossRush.clears>0?2:5;G.bossRush.clears+=1;const rt2=Math.max(1,Math.round(G.time-(FM.t0||G.time)));if(!G.bossRush.best||rt2<G.bossRush.best)G.bossRush.best=rt2;grantGems(rushGem)}if(inGauntlet&&FM.step>=FM.queue.length-1){gauntletBonus=Math.round(FM.queue.reduce((s2,qi)=>s2+ENEMIES[qi].bounty,0)*(CONFIG.gauntlet?CONFIG.gauntlet.bonusMult:2)*stats().coinMult);G.totalCoins+=gauntletBonus;G.stats.coinsEarned+=gauntletBonus;if(G.gauntletCleared.indexOf(FM.group)<0){G.gauntletCleared.push(FM.group);gauntletGem=CONFIG.gauntlet?CONFIG.gauntlet.gemFirst:1;grantGems(gauntletGem);gauntletUnlock=FM.group<19?GROUPS[FM.group+1].name:null}}G.lastVictory={hitCoins:G.fightHitCoins,bonus:payout,total:G.fightHitCoins+payout,gems:gemGain,fightTime:G.fightTime,bestCombo:G.bestCombo,unlockedName,specialUnlock,groupReward:groupReward?{group:(e.idx/5|0),coins:groupReward}:null,gateNext:gateNext,hard:!!e.hard,hardFirst,gauntletBonus,gauntletGem,rushBonus,rushGem,unlockNext:gauntletUnlock};checkAchievements();updateKills();renderAttrs();Save.store()}function enemyAttack(){const e=G.enemy;if(!e||e.dead||G.phase!=="fighting")return;e.lungeT=0.68;hurtPlayer(e.atkDmg)}function loseFight(){SP.cd={};G.phase="lost";G.phaseT=0;G.lostLast=true;G.barrage=0;SP.dot=null;SP.venom=null;SP.stunT=0;SP.curseT=0;SP.beamT=0;PFX.burnT=0;bossFx=null;hideBossWarn();G.stats.fightsLost+=1;Save.store();Sound.lose()}function showEndOverlay(win){
  const e=G.enemy;
  if(!e||G.over)return;
  G.over=win?"victory":"lose";
  atkRowEl.classList.remove("warn");
  endOverlayEl.className="open "+(win?"win":"lose");
  if(autoAdvanceTimer){clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null;}
  if(win&&G.autoAdvance&&!G.pendingTutorial){
    autoAdvanceTimer=setTimeout(()=>{
      if(!G.autoAdvance||!endOverlayEl.classList.contains("open"))return;
      if(nextBtnEl&&nextBtnEl.style.display!=="none"){
        nextBtnEl.click();
      }else if(againBtnEl&&againBtnEl.style.display!=="none"){
        againBtnEl.click();
      }
    },1100);
  }
  // Setup Ad Doubler Button for Win/Defeat
  G.adRewardClaimed = false;
  const endDoubleWrap = $("endAdDoubleWrap");
  const endDoubleBtn = $("endAdDoubleBtn");
  const endDoubleText = $("endAdDoubleText");
  const endDoubleBonus = $("endAdDoubleBonus");
  if (endDoubleWrap && endDoubleBtn) {
    endDoubleWrap.style.display = "flex";
    endDoubleBtn.disabled = false;
    endDoubleBtn.classList.remove("claimed");
    const vTotal = G.lastVictory ? G.lastVictory.total : 0;
    const baseCoins = win
      ? (vTotal > 0 ? vTotal : Math.max(100, Math.round((e.bounty || 100) * 0.5)))
      : (G.fightHitCoins > 0 ? G.fightHitCoins : Math.max(50, Math.round((e.bounty || 100) * 0.25)));
    G.pendingAdDoubleCoins = Math.max(50, Math.round(baseCoins));
    if (endDoubleText) {
      endDoubleText.textContent = win ? "WATCH AD TO DOUBLE REWARDS" : "WATCH AD TO DOUBLE CONSOLATION COINS";
    }
    if (endDoubleBonus) {
      endDoubleBonus.textContent = "+ " + fmtNum(G.pendingAdDoubleCoins);
    }
  }
endSpriteEl.src=e.spr.thumb;endSpriteEl.alt=e.name;const ps=Math.round(92*Math.min(e.scale||1,1.6));endSpriteEl.style.width=ps+"px";endSpriteEl.style.height=ps+"px";if(win){const v=G.lastVictory||{hitCoins:0,bonus:0,total:0,fightTime:G.fightTime,bestCombo:G.bestCombo,unlockedName:null};const isFinal=(e.idx===49||e.idx===ENEMIES.length-1);const isMilestone=e.idx===49;endTrophyEl.style.display=isFinal||isMilestone?"block":"none";endHomeBtnEl.style.display=isFinal?"":"none";chooseBtnEl.style.display=isFinal?"none":"";if(isFinal){endHeadEl.textContent="YOU BEAT THE GAME!";endSubEl.textContent=e.name+" has been slapped into legend — the last hand falls.";endStatsEl.innerHTML='<div class="es"><span>TOTAL KOS</span><b>'+fmtNum(G.kills)+"</b></div>"+'<div class="es"><span>TOTAL DAMAGE</span><b>'+fmtNum(Math.floor(G.stats.damage))+"</b></div>"+'<div class="es"><span>TOTAL SLAPS</span><b>'+fmtNum(G.stats.slaps)+"</b></div>"+'<div class="es"><span>COINS EARNED</span><b>'+fmtNum(G.stats.coinsEarned)+"</b></div>"+'<div class="es"><span>THIS FIGHT</span><b>+'+fmtNum(v.total)+"</b></div>";endUnlockEl.classList.remove("show");endTipEl.textContent="The whole roster stays unlocked and farmable — rematch anyone whenever you like. The crown is yours.";endTipEl.classList.add("show");againBtnEl.textContent="FIGHT AGAIN";nextBtnEl.style.display="none";Sound.win();return}endHeadEl.textContent="KNOCKOUT!";if(v.hard&&v.hardFirst)endHeadEl.textContent="HARD CLEAR!";if(isMilestone&&!v.hard)endHeadEl.textContent="THE FINAL DRAGON FALLS…";const rosterDone=e.idx>=ENEMIES.length-1;nextBtnEl.style.display=rosterDone?"none":"";endSubEl.textContent=rosterDone?e.name+" is down — that's the ENTIRE roster. You are the Champion of Hands!":e.name+" is down for the count! · "+fmtTime(v.fightTime)+" · best combo x"+Math.max(1,v.bestCombo);if(isMilestone&&!v.hard)endSubEl.textContent="…but stronger worlds await beyond the Lair. The Deep Sea Abyss has opened — 50 enemies remain. · "+fmtTime(v.fightTime)+" · best combo x"+Math.max(1,v.bestCombo);endStatsEl.innerHTML='<div class="es"><span>STRIKE COINS</span><b>+'+fmtNum(v.hitCoins)+"</b></div>"+'<div class="es"><span>KILL BONUS</span><b>+'+fmtNum(v.bonus)+"</b></div>"+'<div class="es"><span>TOTAL EARNED</span><b>+'+fmtNum(v.total)+"</b></div>"+(v.gems?'<div class="es"><span>GEMS</span><b>'+GEM_SVG_SM+" +"+v.gems+"</b></div>":"");if(v.specialUnlock){endUnlockEl.innerHTML="NEW SPECIAL UNLOCKED: "+v.specialUnlock.toUpperCase()+"!"+(v.unlockedName?"<br>NEW ENEMY UNLOCKED: "+v.unlockedName+"!":"");endUnlockEl.classList.add("show")}else if(v.hardFirst){endUnlockEl.textContent="FIRST HARD CLEAR — +1 GEM!";endUnlockEl.classList.add("show")}else if(v.unlockedName){endUnlockEl.textContent="NEW ENEMY UNLOCKED: "+v.unlockedName+"!";endUnlockEl.classList.add("show")}else endUnlockEl.classList.remove("show");if(v.groupReward){endUnlockEl.innerHTML=(endUnlockEl.classList.contains("show")?endUnlockEl.innerHTML+"<br>":"")+"GROUP "+(v.groupReward.group+1)+" COMPLETE — +"+fmtNum(v.groupReward.coins)+" COINS!";endUnlockEl.classList.add("show")}if(v.gateNext){endUnlockEl.innerHTML=(endUnlockEl.classList.contains("show")?endUnlockEl.innerHTML+"<br>":"")+"⚔ GROUP "+(v.gateNext.group)+" CLEARED \u2014 beat its TRIO GAUNTLET to unlock "+v.gateNext.name+"!";endUnlockEl.classList.add("show")}if(isMilestone&&!v.hard){endTipEl.textContent="DRAGON SLAYER ★ — milestone reached. Half the roster is down; the harder half is waiting.";endTipEl.classList.add("show")}else endTipEl.classList.remove("show");againBtnEl.textContent="FIGHT AGAIN";Sound.win()}else{nextBtnEl.style.display="none";endTrophyEl.style.display="none";endHomeBtnEl.style.display="none";chooseBtnEl.style.display="";endHeadEl.textContent="KNOCKED OUT!";endSubEl.textContent=e.name+" got the better of you — but your strikes still earned you "+fmtNum(G.fightHitCoins)+" coins, and they're yours to keep.";endStatsEl.innerHTML='<div class="es"><span>ENEMY HP LEFT</span><b>'+fmtNum(Math.max(0,Math.ceil(e.hp)))+" / "+fmtNum(e.maxHp)+"</b></div>"+'<div class="es"><span>COINS EARNED (KEPT)</span><b>+'+fmtNum(G.fightHitCoins)+"</b></div>";endUnlockEl.classList.remove("show");endTipEl.textContent="Too strong for now? Pump your attributes, LEVEL UP for more HP and higher caps — or pick an easier enemy and farm coins first.";endTipEl.classList.add("show");againBtnEl.textContent="TRY AGAIN";if(!win&&G.stats.fightsLost<=3&&!G.tutorialDone){G.pendingTutorial=true;endTipEl.textContent="First defeat \u2014 every champion has one. Your strike coins are KEPT. Tap any button below and I will show you exactly how to come back stronger."}}const FM2=G.fightMode;if(FM2&&FM2.type==="gauntlet"){nextBtnEl.style.display="none";if(win){endHeadEl.textContent="\u2694 GAUNTLET CLEARED!";endSubEl.textContent="All 3 down back-to-back \u2014 the "+GROUPS[FM2.group].name+" trio is beaten!";const v2=G.lastVictory||{};if(v2.unlockNext)endSubEl.textContent+=" "+v2.unlockNext+" is now UNLOCKED \u2014 pick your next fight in STAGES!";if(v2.gauntletBonus){endUnlockEl.innerHTML="GAUNTLET BONUS \u2014 +"+fmtNum(v2.gauntletBonus)+" COINS!"+(v2.gauntletGem?"<br>FIRST CLEAR OF THIS GROUP \u2014 +1 GEM!":"");endUnlockEl.classList.add("show")}}else{endHeadEl.textContent="\u2694 GAUNTLET FAILED";endSubEl.textContent="You fell on fight "+(FM2.step+1)+" of 3. Your strike coins are kept \u2014 upgrade and run it again."}}const FM3=G.fightMode;if(FM3&&FM3.type==="bossrush"){nextBtnEl.style.display="none";if(win){endHeadEl.textContent="\uD83D\uDC51 BOSS RUSH CLEARED!";const v3=G.lastVictory||{};endSubEl.textContent="All "+FM3.queue.length+" bosses down back-to-back! Earned "+fmtNum((FM3.earned||0)+(v3.rushBonus||0))+" coins this run.";if(v3.rushBonus){endUnlockEl.innerHTML="RUSH BONUS \u2014 +"+fmtNum(v3.rushBonus)+" COINS!"+(v3.rushGem?"<br>COMPLETION \u2014 +"+v3.rushGem+" GEMS!":"");endUnlockEl.classList.add("show")}}else{endHeadEl.textContent="\uD83D\uDC51 BOSS RUSH ENDED";endSubEl.textContent="You fell on boss "+(FM3.step+1)+" of "+FM3.queue.length+". Strike coins and boss bonuses are kept \u2014 upgrade and run it again."}}if(FM3&&FM3.type==="endless"){nextBtnEl.style.display="none";endHeadEl.textContent="\uD83C\uDF0A SURVIVAL ENDED \u2014 WAVE "+(FM3.wave||1);endSubEl.textContent="You cleared "+((FM3.wave||1)-1)+" waves and earned "+fmtNum((FM3.earned||0)+(G.fightHitCoins||0))+" coins this run. Best: WAVE "+(G.endlessBest||0)+"."}}function hideEndOverlay(){if(autoAdvanceTimer){clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null;}endOverlayEl.className=""}againBtnEl.addEventListener("click",()=>{Sound.unlock();if(tutGate())return;spawnEnemy(false);Save.store()});nextBtnEl.addEventListener("click",()=>{Sound.unlock();const nx=Math.min(ENEMIES.length-1,G.enemy.idx+1);if(!enemyUnlocked(nx)){hideEndOverlay();switchTab("levels");toast("⚔ Clear the TRIO GAUNTLET to advance!",2600);return}G.current=nx;G.hardMode=false;spawnEnemy(false);Save.store()});chooseBtnEl.addEventListener("click",()=>{Sound.unlock();if(tutGate())return;hideEndOverlay();G.pendingRespawn=true;switchTab("levels")});endHomeBtnEl.addEventListener("click",()=>{Sound.unlock();if(tutGate())return;switchTab("home")});/* ===== FIRST-LOSS GUIDED TOUR (coach marks: dark blockers + glowing spot + smooth card) ===== */
let tutState=null;
function tutGate(){if(G.pendingTutorial&&!G.tutorialDone){G.pendingTutorial=false;hideEndOverlay();switchTab("home");startTutorial();return true}return false}
function tutSteps(){return [
{page:"home",sel:'.hub-card[data-goto="attrs"]',kicker:"DEFEAT · STEP 1 OF 2",title:"Turn coins into power",body:function(){return "Your slap coins are kept ("+fmtNum(G.totalCoins)+" in hand). ATTRIBUTES turn coins into permanent power. Tap the glowing card."},mode:"tap"},
{page:"attrs",sel:"#attrsList .attr-row",kicker:"ATTRIBUTES · PERMANENT STATS",title:"Your Power Board",body:function(){return "Every attribute level you buy is yours forever. Upgrade to boost damage, speed, and health."},mode:"button",btn:"NEXT ▸"},
{page:"attrs",sel:'#attrsList [data-attr="power"]',kicker:"ATTRIBUTES · UPGRADE",title:"Boost Your Damage",body:function(){return "POWER deals +2 damage on every single slap. Tap UPGRADE and watch your damage jump!"},mode:"tapbuy",btn:"SKIP ▸"},
{page:"attrs",sel:"#attrsLevelUpBtn",kicker:"ATTRIBUTES · LEVEL UP",title:"Raise the Caps",body:function(){return "Player LEVEL raises all attribute caps and grants free perks as you grow."},mode:"button",btn:"NEXT ▸"},
{page:"home",sel:'.hub-card[data-goto="skills"]',kicker:"FIRST DEFEAT · STEP 2 OF 2",title:"Skill Tree",body:function(){return "SKILLS unlock game-changing abilities like double-slapping and frenzy. Tap SKILLS."},mode:"tap"},
{page:"skills",sel:'[data-skill="precisionInstinct"]',kicker:"SKILLS · ABILITIES",title:"Unlock Powers",body:function(){return "Unlock PRECISION INSTINCT to reveal enemy WEAK SPOTS for guaranteed 2× critical slaps!"},mode:"button",btn:"DONE — BACK TO FIGHT ✓"}
]}
function tutBuild(){if(document.getElementById("tutOverlay"))return;const o=document.createElement("div");o.id="tutOverlay";o.innerHTML='<div class="tut-block" data-b="top"></div><div class="tut-block" data-b="left"></div><div class="tut-block" data-b="right"></div><div class="tut-block" data-b="bottom"></div><div id="tutSpot"></div><div id="tutRing"></div><div id="tutCard"><div class="tut-kicker" id="tutKicker"></div><div class="tut-title" id="tutTitle"></div><div class="tut-body" id="tutBody"></div><button id="tutBtn" type="button"></button><div class="tut-hint" id="tutHint"></div></div>';document.body.appendChild(o);document.getElementById("tutBtn").addEventListener("click",function(){Sound.unlock();tutAdvance()})}
function startTutorial(){tutBuild();if(tutState)return;const o=document.getElementById("tutOverlay");tutState={i:-1,target:null};o.classList.add("on");window.addEventListener("resize",tutPlace);document.addEventListener("scroll",tutPlace,true);tutShow(0)}
function tutNav(page){if(G.tab===page)return 80;if(page==="home"){const h=document.querySelector('#pageAttrs .home-btn[data-goto="home"],#pageSkills .home-btn[data-goto="home"]');if(h){h.click();return 600}}const card=document.querySelector('.hub-card[data-goto="'+page+'"]');if(card){card.click();return 600}return 80}
function tutShow(i){const steps=tutSteps();if(i>=steps.length){tutEnd();return}tutState.i=i;const st=steps[i];const wait=tutNav(st.page);setTimeout(function(){const el=document.querySelector(st.sel);if(!el){tutShow(i+1);return}tutState.target=el;if(st.page==="skills")el.scrollIntoView({block:"center",behavior:"smooth"});document.getElementById("tutKicker").textContent=st.kicker;document.getElementById("tutTitle").textContent=st.title;document.getElementById("tutBody").textContent=st.body();const btn=document.getElementById("tutBtn");const hint=document.getElementById("tutHint");if(st.mode==="button"){btn.style.display="";btn.textContent=st.btn||"NEXT ▸";hint.textContent=""}else if(st.mode==="tapbuy"){btn.style.display="";btn.textContent=st.btn||"SKIP ▸";hint.textContent="Tap the glowing button on the page"}else{btn.style.display="none";hint.textContent="Tap the glowing spot to continue"}tutPlace();setTimeout(tutPlace,140);setTimeout(tutPlace,520);if(st.mode==="tap"||st.mode==="tapbuy"){const target=el;const h=function(){target.removeEventListener("click",h);setTimeout(function(){if(tutState&&tutState.i===i)tutShow(i+1)},st.mode==="tap"?650:850)};target.addEventListener("click",h)}},wait)}
function tutAdvance(){if(!tutState)return;tutShow(tutState.i+1)}
function tutPlace(){if(!tutState||!tutState.target||!document.contains(tutState.target))return;const r=tutState.target.getBoundingClientRect();const pad=8,x=Math.max(4,r.left-pad),y=Math.max(4,r.top-pad),w=Math.min(window.innerWidth-4,r.right+pad)-x,h=Math.min(window.innerHeight-4,r.bottom+pad)-y;const B=function(n){return document.querySelector('.tut-block[data-b="'+n+'"]')};B("top").style.cssText="left:0;top:0;width:100%;height:"+y+"px";B("bottom").style.cssText="left:0;top:"+(y+h)+"px;width:100%;height:"+Math.max(0,window.innerHeight-(y+h))+"px";B("left").style.cssText="left:0;top:"+y+"px;width:"+x+"px;height:"+h+"px";B("right").style.cssText="left:"+(x+w)+"px;top:"+y+"px;width:"+Math.max(0,window.innerWidth-(x+w))+"px;height:"+h+"px";const spot=document.getElementById("tutSpot"),ring=document.getElementById("tutRing");spot.style.cssText="left:"+x+"px;top:"+y+"px;width:"+w+"px;height:"+h+"px";ring.style.cssText=spot.style.cssText;const card=document.getElementById("tutCard");const cw=Math.min(350,window.innerWidth-24);const ch=card.offsetHeight||190;let cx=Math.max(12,Math.min(window.innerWidth-cw-12,x+w/2-cw/2));let cy=(y+h+16+ch<=window.innerHeight)?y+h+16:y-ch-16;if(cy<12)cy=Math.max(12,Math.min(window.innerHeight-ch-12,y+h+16));card.style.cssText="left:"+cx+"px;top:"+cy+"px"}
function tutEnd(){const o=document.getElementById("tutOverlay");if(o)o.classList.remove("on");window.removeEventListener("resize",tutPlace);document.removeEventListener("scroll",tutPlace,true);tutState=null;if(!G.tutorialDone){G.tutorialDone=true;Save.store()}}
function update(dt){if(G.hitStop>0)G.hitStop=Math.max(0,G.hitStop-dt);if(G.levelUpHold)return;G.time+=dt;const e=G.enemy;if(e&&e.hitT>0)e.hitT=Math.max(0,e.hitT-dt);if(e&&e.squashT>0)e.squashT=Math.max(0,e.squashT-dt);if(e&&e.lungeT>0)e.lungeT=Math.max(0,e.lungeT-dt);if(e&&e.stunT>0)e.stunT=Math.max(0,e.stunT-dt);if(G.playerFlashT>0)G.playerFlashT=Math.max(0,G.playerFlashT-dt);if(G.swFlashT>0)G.swFlashT=Math.max(0,G.swFlashT-dt);if(G.fightFlashT>0)G.fightFlashT=Math.max(0,G.fightFlashT-dt);if(G.doubleFlashT>0)G.doubleFlashT=Math.max(0,G.doubleFlashT-dt);for(let i=G.impacts.length-1;i>=0;i--){const im=G.impacts[i];im.t+=dt;if(im.t>=im.life)G.impacts.splice(i,1)}for(let i=G.poofs.length-1;i>=0;i--){const pf=G.poofs[i];pf.t+=dt;if(pf.t>=pf.life)G.poofs.splice(i,1)}for(let i=G.frags.length-1;i>=0;i--){const f=G.frags[i];f.t+=dt;f.vy+=880*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.rot+=f.vr*dt;if(f.t>=f.life)G.frags.splice(i,1)}for(let i=G.bursts.length-1;i>=0;i--){const p=G.bursts[i];p.t+=dt;p.vy+=p.grav*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;if(p.t>=p.life)G.bursts.splice(i,1)}for(let i=G.claws.length-1;i>=0;i--){const c=G.claws[i];c.t+=dt;if(c.t>=c.life)G.claws.splice(i,1)}if(G.venomT>0)G.venomT=Math.max(0,G.venomT-dt);if(G.voidT>0)G.voidT=Math.max(0,G.voidT-dt);while(G.dmgLog.length&&G.dmgLog[0].t<G.time-5)G.dmgLog.shift();G.dpsUiT=(G.dpsUiT||0)+dt;if(G.dpsUiT>0.12){G.dpsUiT=0;let sum=0;for(let i=0;i<G.dmgLog.length;i++)sum+=G.dmgLog[i].dmg;if(dpsActualEl)dpsActualEl.textContent=fmtDPS(sum/5);if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS());updateFrenzyBar();renderSpecRailCd();if(hasSkill("unstoppable"))updatePlayerBar();updateFxChips();if(G.coinsDirty){G.coinsDirty=false;renderAttrs()}}if(e&&e.marks)for(let i=e.marks.length-1;i>=0;i--){e.marks[i].t+=dt;if(e.marks[i].t>=2.5)e.marks.splice(i,1)}if(G.shake>0)G.shake=Math.max(0,G.shake-dt*34);G.leftTwitchAt-=dt;if(G.leftTwitchAt<=0){G.leftTwitchT=0;G.leftTwitchAt=2.5+Math.random()*3.5}if(G.leftTwitchT>=0){G.leftTwitchT+=dt;if(G.leftTwitchT>0.22)G.leftTwitchT=-1}if(!hasSkill("secondHand")&&Math.random()<dt*0.55)G.zzz.push({t:0,x:W*0.1+Math.random()*14,y:H*0.74});if(G.tab==="battle"&&!G.menuOpen&&G.frenzyT>0){G.frenzyT=Math.max(0,G.frenzyT-dt);G.frenzyMeter=G.frenzyT/(CONFIG.frenzy.duration+(G.frenzyBoostUnlocked?3:0))*100;if(G.frenzyT<=0){G.frenzyMeter=0;updateFrenzyBar();if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS())}}if(G.frenzyFlashT>0)G.frenzyFlashT=Math.max(0,G.frenzyFlashT-dt);const inBattle=G.tab==="battle"&&!G.menuOpen;if(!inBattle){}else if(G.phase==="bossIntro"){G.phaseT+=dt;if(G.phaseT>0.3&&G.phaseT<CONFIG.boss.introSeconds-0.3&&Math.random()<dt*7)G.shake=Math.max(G.shake,6);if(G.phaseT>=CONFIG.boss.introSeconds)endBossIntro()}else if(G.phase==="spawning"){G.phaseT+=dt;if(G.phaseT>=0.35){G.phase="fighting";G.slapT=0;G.damageDone=false}}else if(G.phase==="dying"){G.phaseT+=dt;if(e)e.fallA=Math.min(1,G.phaseT/0.55);if(G.phaseT>=0.95){if(G.fightMode&&G.fightMode.type==="gauntlet"&&G.fightMode.step<G.fightMode.queue.length-1){advanceGauntlet()}else if(G.fightMode&&G.fightMode.type==="bossrush"&&G.fightMode.step<G.fightMode.queue.length-1){advanceRush()}else if(G.fightMode&&G.fightMode.type==="endless"){advanceEndless()}else{G.phase="over";showEndOverlay(true)}}}else if(G.phase==="lost"){G.phaseT+=dt;if(G.phaseT>=0.85){G.phase="over";showEndOverlay(false)}}else if(G.phase==="fighting"&&G.running){G.fightTime+=dt;G.stats.playTime+=dt;const B=slapBounds();if(PFX.stunT>0){/* boss stun: slap cycle paused, hands droop */}else{const prevSlapT=G.slapT;G.slapT+=dt;if(prevSlapT<B.windup&&G.slapT>=B.windup)Sound.whoosh();if(!G.damageDone&&G.slapT>=B.strikeEnd){G.damageDone=true;applyHit()}if(G.slapT>=B.I){G.slapT-=B.I;G.damageDone=false;if(hasSkill("secondHand"))G.slapHand=G.slapHand==="R"?"L":"R"}if(G.barrage>0&&e&&!e.dead){G.barrageT+=dt;if(G.barrageT>=0.09){G.barrageT=0;G.barrage-=1;applyHit("barrage")}}}if(hasSkill("ultimateSlap")&&!G.ultReady){G.ultCharge+=dt;if(G.ultCharge>=CONFIG.skillFx.ultEvery)G.ultReady=true}if(hasSkill("unstoppable")&&G.playerHp>0){G.playerHp=Math.min(playerMaxHp(),G.playerHp+CONFIG.skillFx.regen*dt)}if(e&&!e.dead&&G.phase==="fighting"){if(SP.stunT<=0&&e.bsState!=="telegraph"&&e.bsState!=="anim"){G.enemyAtkT-=dt;if(G.enemyAtkT<=0){G.enemyAtkT=enemyCurInterval();enemyAttack()}}}tickBossSpecial(dt);tickSpecials(dt);tickWeakSpot(dt);updateAtkBar()}for(let i=G.dmgNums.length-1;i>=0;i--){const d=G.dmgNums[i];d.t+=dt;d.y+=d.vy*dt;d.vy*=1-1.6*dt;if(d.t>=d.life)G.dmgNums.splice(i,1)}if(G.dmgNums.length>6){const bw=(d)=>(d.tag==="crit"||d.tag==="heavy"||d.tag==="ultimate"||d.tag==="proc")?1:0;G.dmgNums.sort((a,b)=>bw(b)-bw(a)||a.t-b.t);G.dmgNums.length=6}for(let i=G.coinNums.length-1;i>=0;i--){const cn=G.coinNums[i];cn.t+=dt;cn.y+=cn.vy*dt;cn.vy*=1-1.8*dt;if(cn.t>=cn.life)G.coinNums.splice(i,1)}for(let i=G.heals.length-1;i>=0;i--){const hh=G.heals[i];hh.t+=dt;hh.y+=hh.vy*dt;hh.vy*=1-1.8*dt;if(hh.t>=hh.life)G.heals.splice(i,1)}for(let i=G.zzz.length-1;i>=0;i--){const z=G.zzz[i];z.t+=dt;z.y-=16*dt;z.x+=7*dt;if(z.t>1.6)G.zzz.splice(i,1)}for(let i=G.coinsFx.length-1;i>=0;i--){const c=G.coinsFx[i];c.t+=dt;if(c.state==="burst"){c.vy+=620*dt;c.x+=c.vx*dt;c.y+=c.vy*dt;if(c.t>0.5){c.state="fly";c.sx=c.x;c.sy=c.y}}else{c.flyT+=dt/0.5;const k=Math.min(1,c.flyT),ease=1-Math.pow(1-k,3);c.x=c.sx+(c.tx-c.sx)*ease;c.y=c.sy+(c.ty-c.sy)*ease-Math.sin(k*Math.PI)*46;if(k>=1){G.shownCoins+=c.value;updateCoinHud();Sound.coin(c.idx);G.coinsFx.splice(i,1)}}}if(!G.coinsFx.length&&G.shownCoins!==G.totalCoins){G.shownCoins=G.totalCoins;updateCoinHud()}}

  
"use strict";
const easeOut=(t)=>1-Math.pow(1-t,3);const easeIn=(t)=>t*t*t;const easeInOut=(t)=>t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const clamp01=(v)=>Math.max(0,Math.min(1,v));function mix(a,b,k){return{x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k,r:a.r+(b.r-a.r)*k}}function rect(x,y,w,h,col){ctx.fillStyle=col;ctx.fillRect(x,y,w,h)}const STAGE_IMGS=[];for(let _sg=0;_sg<20;_sg++){const _im=new Image();_im.src="/stage-bg/g"+_sg+".webp";STAGE_IMGS.push(_im)}
const STAGE_FALLBACK=["#a8c6d8","#9fd3ee","#333a45","#9aa5ad","#232742","#274435","#20301f","#e0c184","#7286a0","#0d2b45","#16283e","#c96f35","#2a0f0c","#e8e2d2","#3c4148","#241a3d","#8a97a8","#1d1410","#0d0a1a","#fdf3cf"];
let _stageCache=null,_stageCacheG=-1,_stageCacheW=0,_stageCacheH=0;function drawStage(){const g=G.enemy?G.enemy.group:0;const floorY=H*0.8,fh=H-floorY;const img=STAGE_IMGS[g];if(img&&img.complete&&img.naturalWidth>0){if(!_stageCache||_stageCacheG!==g||_stageCacheW!==W||_stageCacheH!==H){if(!_stageCache)_stageCache=document.createElement("canvas");_stageCache.width=W;_stageCache.height=H;const sCtx=_stageCache.getContext("2d");const sc=Math.max(W/img.naturalWidth,H/img.naturalHeight);const dw=img.naturalWidth*sc,dh=img.naturalHeight*sc;sCtx.drawImage(img,(W-dw)/2,(H-dh)/2,dw,dh);_stageCacheG=g;_stageCacheW=W;_stageCacheH=H}ctx.drawImage(_stageCache,0,0)}else{rect(0,0,W,H,STAGE_FALLBACK[g]||"#1d1a26")}if(G.enemy){const geo=enemyGeom();ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY+6,geo.w*0.42,Math.max(7,fh*0.16),0,0,Math.PI*2);ctx.fill()}}
function spiral(x,y,r,rot){ctx.beginPath();for(let a=0;a<=Math.PI*5;a+=0.3){const rr=r*(a/(Math.PI*5));const px=x+Math.cos(a+rot)*rr,py=y+Math.sin(a+rot)*rr;if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.stroke()}function star(x,y,r){ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*0.45:r;const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.closePath();ctx.fill()}function drawEnemy(){const e=G.enemy;if(!e)return;const spr=e.spr;const geo=enemyGeom();const isStunned=(e.stunT>0)||(typeof SP!=="undefined"&&SP.stunT>0);const dizzy=!e.dead&&isStunned;ctx.fillStyle="rgba(30,15,5,.30)";ctx.beginPath();ctx.ellipse(geo.cx,geo.feetY+6,geo.w*0.42,10,0,0,Math.PI*2);ctx.fill();ctx.save();ctx.translate(geo.cx,geo.feetY);let spawnScale=1;if(G.phase==="spawning"){const k=easeOut(clamp01(G.phaseT/0.35));spawnScale=0.55+0.45*k}if(e.dead){const fa=e.fallA;ctx.translate(0,-Math.sin(fa*Math.PI)*17);ctx.rotate(-fa*1.35);ctx.scale(1+Math.sin(fa*Math.PI)*0.06,1-fa*0.22);ctx.globalAlpha=1-fa*0.85}else if(e.hitT>0){const k=e.hitT/0.28;ctx.rotate(Math.sin(e.hitT*55)*0.055*k);ctx.translate(10*k,0);if(e.squashT>0){const sq=e.squashT/0.16;ctx.scale(1+0.08*sq,1-0.08*sq)}}else if(dizzy){ctx.rotate(Math.sin(G.time*2.6)*0.045)}else{ctx.rotate(Math.sin(G.time*1.4)*0.012)}if(e.lungeT>0){const lk=Math.sin((1-e.lungeT/0.68)*Math.PI);ctx.translate(0,lk*17);ctx.scale(1+lk*0.11,1+lk*0.11)}if(G.phase==="lost"||G.over==="lose"){ctx.translate(0,-Math.abs(Math.sin(G.time*5.5))*8)}ctx.scale(spawnScale,spawnScale);if(spr.isV2){ctx.imageSmoothingEnabled=true;if(e.boss&&e.enraged&&!e.dead){ctx.save();ctx.globalAlpha=0.17+0.07*Math.sin(G.time*6);ctx.fillStyle="#e02318";ctx.beginPath();ctx.arc(0,-geo.h*0.52,geo.w*0.62,0,Math.PI*2);ctx.fill();ctx.restore();ctx.shadowBlur=0}const deadAlpha=e.dead?1-e.fallA*0.85:1;ctx.globalAlpha=deadAlpha;let poseKey="idle";if(e.dead){poseKey="dizzy"}else if(e.boss&&G.phase==="bossIntro"){poseKey=spr.poses.roar?"roar":"idle"}else if(e.boss&&e.bsState==="telegraph"){poseKey="idle"}else if(e.boss&&e.bsState==="anim"){if(spr.poses.rockStun2||spr.poses.rockStun){poseKey=spr.poses.rockStun2?"rockStun2":"rockStun"}else if(spr.poses.spPose){poseKey="spPose"}else{poseKey=spr.poses.bananaSling?"bananaSling":"attack"}}else if(e.lungeT>0||(G.enemyAtkT<=(e.idx===29||e.name==="Shogun Warlord"?0.32:0.72)&&G.phase==="fighting")){const isShogun=e.idx===29||e.name==="Shogun Warlord";if(isShogun){if(spr.poses.atkWindup&&e.lungeT<=0&&G.enemyAtkT>0.16){poseKey="atkWindup"}else if(spr.poses.atkFollow&&(e.lungeT>0&&e.lungeT<=0.34)){poseKey="atkFollow"}else{poseKey="attack"}}else if(spr.poses.atkWindup&&e.lungeT<=0&&G.enemyAtkT>0.52){poseKey="atkWindup"}else if(spr.poses.atkFollow&&(e.lungeT>0||G.enemyAtkT<=0.2)){poseKey="atkFollow"}else if(G.enemyAtkT>0.36&&spr.poses.attack1){poseKey="attack1"}else{poseKey=spr.poses.attack2?"attack2":"attack"}}else if(e.enraged&&spr.poses.enrage){poseKey="enrage"}else if((dizzy||isStunned)&&spr.poses.dizzy){poseKey="dizzy"}const activePose=spr.getPose(poseKey);const baseScale=geo.h/spr.refH;const maxScaleY=(geo.feetY-16)/activePose.h;const maxScaleX=(W-24)/activePose.w;const scale=Math.min(baseScale,maxScaleY,maxScaleX)*(typeof activePose.gs==="number"?activePose.gs:1);const dw=activePose.w*scale,dh=activePose.h*scale;const gBot=(typeof activePose.gBot==="number")?activePose.gBot:1,gTop=(typeof activePose.gTop==="number")?activePose.gTop:0,gCx=(typeof activePose.gCx==="number")?activePose.gCx:0.5;const yOff=dh*(1-gBot)+(typeof activePose.gy==="number"?dh*activePose.gy:0);const atkPose=(poseKey==="attack"||poseKey==="attack1"||poseKey==="attack2"||poseKey==="bananaSling"||poseKey==="roar"||poseKey==="enrage"||poseKey==="atkWindup"||poseKey==="atkFollow"||poseKey==="spPose");let xOff=dw*(0.5-gCx)*(activePose.gFull?1:(atkPose?0.45:1));xOff=Math.max(-dw*0.18,Math.min(dw*0.18,xOff));if(activePose.spFull){const fw=W,fh=fw*activePose.h/activePose.w;ctx.drawImage(activePose.img,-fw/2,-fh+fh*0.05,fw,fh);ctx.shadowBlur=0}else{ctx.drawImage(activePose.img,-dw/2+xOff,-dh+yOff,dw,dh);ctx.shadowBlur=0;if(e.hitT>0.14){ctx.globalAlpha=Math.min(0.85,(e.hitT-0.14)*5)*deadAlpha;ctx.drawImage(activePose.imgWhite,-dw/2+xOff,-dh+yOff,dw,dh);ctx.globalAlpha=deadAlpha}}const bsCfg=CONFIG.bossSpecials[e.idx];if(e.boss&&e.bsState==="anim"&&bsCfg&&bsCfg.kind==="shield"){const cr=dh*0.37*(1+0.05*Math.sin(G.time*10));ctx.save();ctx.strokeStyle="#6fc4ff";ctx.lineWidth=6;ctx.fillStyle="rgba(90,170,255,0.16)";ctx.beginPath();ctx.arc(xOff,-dh*0.52,cr,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle="rgba(200,235,255,0.85)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(xOff,-dh*0.52,cr*0.82,0,Math.PI*2);ctx.stroke();ctx.restore()}const toLocal=(gx,gy)=>({x:(gx-spr.cols/2)*geo.px,y:-geo.h+gy*geo.px});/* slap marks removed */ctx.restore();if(dizzy&&!e.dead){const headY=geo.feetY-dh+yOff+dh*gTop-4;ctx.fillStyle="#f2b01e";ctx.strokeStyle="#b97e08";ctx.lineWidth=1;for(let i=0;i<3;i++){const a=G.time*3.1+i*(Math.PI*2/3);const sx=geo.cx+Math.cos(a)*dw*0.3,sy=headY+Math.sin(a)*7;star(sx,sy,7+Math.sin(G.time*5+i)*1.5);ctx.stroke()}}}else{ctx.imageSmoothingEnabled=false;if(e.boss&&e.enraged&&!e.dead){ctx.save();ctx.globalAlpha=0.17+0.07*Math.sin(G.time*6);ctx.fillStyle="#e02318";ctx.beginPath();ctx.arc(0,-geo.h*0.52,geo.w*0.62,0,Math.PI*2);ctx.fill();ctx.restore();ctx.shadowBlur=0}const deadAlpha=e.dead?1-e.fallA*0.85:1;ctx.globalAlpha=deadAlpha;const gBotG=(typeof spr.gBot==="number")?spr.gBot:1,gTopG=(typeof spr.gTop==="number")?spr.gTop:0,gCxG=(typeof spr.gCx==="number")?spr.gCx:0.5;const yOffG=geo.h*(1-gBotG);let xOffG=geo.w*(0.5-gCxG);xOffG=Math.max(-geo.w*0.18,Math.min(geo.w*0.18,xOffG));ctx.drawImage(spr.img,-geo.w/2+xOffG,-geo.h+yOffG,geo.w,geo.h);ctx.shadowBlur=0;if(e.hitT>0.14){ctx.globalAlpha=Math.min(0.85,(e.hitT-0.14)*5)*deadAlpha;ctx.drawImage(spr.imgWhite,-geo.w/2+xOffG,-geo.h+yOffG,geo.w,geo.h);ctx.globalAlpha=deadAlpha}const toLocal=(gx,gy)=>({x:(gx-spr.cols/2)*geo.px+xOffG,y:-geo.h+gy*geo.px+yOffG});const eyePx=Math.max(2.2,spr.eyeR_*geo.px);const eyePts=spr.singleEye?[toLocal(spr.eyeL[0],spr.eyeL[1])]:[toLocal(spr.eyeL[0],spr.eyeL[1]),toLocal(spr.eyeR[0],spr.eyeR[1])];if(dizzy){ctx.strokeStyle=spr.eyeColor;ctx.lineWidth=Math.max(1.6,geo.px*0.16);ctx.lineCap="round";for(let i=0;i<eyePts.length;i++)spiral(eyePts[i].x,eyePts[i].y,eyePx*1.5,(i?-1:1)*G.time*4)}else{for(let i=0;i<eyePts.length;i++){const p=eyePts[i];ctx.fillStyle=spr.eyeColor;ctx.beginPath();ctx.arc(p.x,p.y,eyePx,0,Math.PI*2);ctx.fill();ctx.fillStyle="#ffffff";ctx.beginPath();ctx.arc(p.x-eyePx*0.3,p.y-eyePx*0.3,eyePx*0.36,0,Math.PI*2);ctx.fill()}}const m=toLocal(spr.mouth[0],spr.mouth[1]);ctx.strokeStyle=spr.eyeColor;ctx.lineWidth=Math.max(1.6,geo.px*0.15);ctx.lineCap="round";ctx.beginPath();if(dizzy){for(let i=0;i<=8;i++){const px=m.x-geo.px*0.8+geo.px*1.6*i/8;const py=m.y+Math.sin(i*1.9+G.time*6)*geo.px*0.14;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}}else{ctx.arc(m.x,m.y-geo.px*0.3,geo.px*0.55,Math.PI*0.25,Math.PI*0.75)}ctx.stroke();/* slap marks removed */ctx.restore();if(dizzy&&!e.dead){const headY=geo.feetY-geo.h+yOffG+geo.h*gTopG-4;ctx.fillStyle="#f2b01e";ctx.strokeStyle="#b97e08";ctx.lineWidth=1;for(let i=0;i<3;i++){const a=G.time*3.1+i*(Math.PI*2/3);const sx=geo.cx+Math.cos(a)*geo.w*0.3,sy=headY+Math.sin(a)*7;star(sx,sy,7+Math.sin(G.time*5+i)*1.5);ctx.stroke()}}}}const bossRnd=(n)=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};function drawHandSprite(img,x,y,h,rot,opts){const o=opts||{};const w=h*img.width/img.height;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);if(o.alpha!=null)ctx.globalAlpha=o.alpha;ctx.drawImage(img,-w/2,-h/2,w,h);ctx.restore()}function drawHands(){if(!HAND_MAIN)return;const e=G.enemy;const handH=H*0.3*(skinDef().size||1);const handW=handH*HAND_MAIN.width/HAND_MAIN.height;const awake=hasSkill("secondHand");const active=awake?G.slapHand:"R";const geo=e?enemyGeom():null;const cheekFor=(side)=>{if(!geo)return{x:W/2,y:H*0.36};const sSide=side==="R"?1:-1;return{x:geo.cx+sSide*Math.min(geo.w*0.14,20),y:geo.feetY-geo.h*0.76}};const drawOne=(side)=>{const s=side==="R"?1:-1;const sleeping=side==="L"&&!awake&&SP.bothT<=0;const img=sleeping?HAND_SLEEP||HAND_MAIN:HAND_MAIN;const bobF=sleeping?1.1:1.8;const rest={x:s>0?W-handW*0.55:handW*0.55,y:H-handH*0.42+Math.sin(G.time*bobF)*2.5,r:-0.05*s};let pos=rest,sx=1,sy=1;const ghosts=[];if((side===active||SP.bothT>0)&&e&&G.phase==="fighting"&&G.running&&G.tab==="battle"&&!G.menuOpen&&PFX.stunT<=0){const wind={x:rest.x+s*handW*0.38,y:H-handH*0.3,r:0.5*s};const ckP=cheekFor(side);const hitP={x:ckP.x+s*handW*0.08,y:ckP.y,r:-0.26*s};const t=G.slapT,B=slapBounds();if(t<B.windup){const u=t/B.windup;const k=u*u*(3-2*u);pos=mix(rest,wind,k);sx=1-0.05*Math.sin(k*Math.PI);sy=1+0.06*Math.sin(k*Math.PI)}else if(t<B.strikeEnd){const u=(t-B.windup)/(B.strikeEnd-B.windup);const k=0.5*(1-Math.cos(u*Math.PI));pos=mix(wind,hitP,k);sx=1+0.14*k;sy=1-0.08*k;ghosts.push({p:mix(wind,hitP,k*0.45),a:0.22});ghosts.push({p:mix(wind,hitP,k*0.72),a:0.13});ctx.strokeStyle="#ffffff";ctx.lineWidth=3;ctx.lineCap="round";for(let i=0;i<4;i++){const ly2=pos.y-handH*0.24+i*handH*0.13,lx2=pos.x-s*(handW*0.28+i*6);ctx.globalAlpha=0.5*k;ctx.beginPath();ctx.moveTo(lx2,ly2);ctx.lineTo(lx2-s*(30+34*k),ly2-8);ctx.stroke()}ctx.globalAlpha=1;if(skinDef().id==="flaming"){for(let fi=0;fi<3;fi++){const fp=mix(wind,hitP,k*(0.35+fi*0.22));ctx.globalAlpha=0.35-fi*0.09;ctx.fillStyle=fi%2?"#ef7d1a":"#ffcf3f";ctx.beginPath();ctx.arc(fp.x-s*handW*0.1,fp.y+handH*0.08+fi*4,Math.max(2.5,7-fi*1.6+Math.sin(G.time*31+fi*2.1)*1.6),0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}}else if(t<B.holdEnd){const hk=(t-B.strikeEnd)/(B.holdEnd-B.strikeEnd);const sq=Math.sin(hk*Math.PI);pos=hitP;sx=1-0.16*sq;sy=1+0.15*sq}else if(t<B.recoverEnd){const k=easeInOut((t-B.holdEnd)/(B.recoverEnd-B.holdEnd));pos=mix(hitP,rest,k);sx=0.84+0.16*k;sy=1.15-0.15*k}}let rot=pos.r;if(PFX.stunT>0&&G.phase==="fighting"){pos={x:pos.x,y:pos.y+handH*0.14,r:pos.r};rot+=0.32*s}if(sleeping&&G.leftTwitchT>=0)rot+=Math.sin(G.leftTwitchT*60)*0.1*(1-G.leftTwitchT/0.22);for(const gh of ghosts)drawHandSprite(img,gh.p.x,gh.p.y,handH,gh.p.r,{flip:s<0,alpha:gh.a,sx,sy});drawHandSprite(img,pos.x,pos.y,handH,rot,{flip:s<0,sx,sy})};drawOne("L");if(!awake){ctx.fillStyle="rgba(70,90,140,.75)";ctx.font="800 15px Nunito, sans-serif";ctx.textAlign="center";for(const z of G.zzz){ctx.globalAlpha=Math.max(0,0.8-z.t*0.5);ctx.fillText("Z",z.x,z.y)}ctx.globalAlpha=1}drawOne("R")}function drawFx(){for(const f of G.frags){const k=f.t/f.life;ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rot);ctx.globalAlpha=k>0.55?1-(k-0.55)/0.45:1;ctx.fillStyle=f.col;ctx.fillRect(-f.size/2,-f.size/2,f.size,f.size*0.82);ctx.restore()}ctx.globalAlpha=1;for(const pf of G.poofs){const k=pf.t/pf.life;ctx.fillStyle="rgba(122,102,80,1)";for(let i=0;i<5;i++){const off=(i-2)*22,r=7+k*15-Math.abs(i-2)*1.6;ctx.globalAlpha=(1-k)*0.45;ctx.beginPath();ctx.arc(pf.x+off*(0.6+k),pf.y-k*12+Math.abs(i-2)*3,Math.max(2,r),0,Math.PI*2);ctx.fill()}}ctx.globalAlpha=1;for(const im of G.impacts){const big=im.tag==="crit"||im.tag==="heavy"||im.tag==="ultimate";const base=im.tag==="ultimate"?46:im.tag==="heavy"?36:big?30:20;const k=im.t/im.life,R=base+k*(big?52:32);ctx.save();ctx.translate(im.x,im.y);ctx.rotate(big?0.4:-0.2);ctx.globalAlpha=1-k;ctx.strokeStyle=big?"#d63c30":"#f2b01e";ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,0,R*1.08,0,Math.PI*2);ctx.stroke();ctx.fillStyle=big?"#ffcf3f":"#fff3da";ctx.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8,rr=i%2?R*0.42:R;const px=Math.cos(a)*rr,py=Math.sin(a)*rr;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}ctx.globalAlpha=1;for(const p of G.bursts){const k=p.t/p.life;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=1-k;ctx.fillStyle=p.col;if(p.shape==="coin"){ctx.beginPath();ctx.ellipse(0,0,p.size*0.62,p.size,0,0,Math.PI*2);ctx.fill()}else if(p.shape==="shard"){ctx.beginPath();ctx.moveTo(0,-p.size);ctx.lineTo(p.size*0.55,p.size*0.7);ctx.lineTo(-p.size*0.55,p.size*0.7);ctx.closePath();ctx.fill()}else ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.8);ctx.restore()}ctx.globalAlpha=1;for(const c of G.claws){const k=c.t/c.life;ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);ctx.globalAlpha=(1-k)*0.9;ctx.strokeStyle="#ff5a2a";ctx.lineWidth=c.big?5:3.5;ctx.lineCap="round";for(let j=-1;j<=1;j++){ctx.beginPath();ctx.arc(j*7,-4,(c.big?26:18)+j*3,Math.PI*1.15,Math.PI*1.75);ctx.stroke()}ctx.restore()}ctx.globalAlpha=1;if(G.voidT>0&&G.enemy){const geoF=enemyGeom();ctx.fillStyle="rgba(124,58,237,"+Math.min(0.34,G.voidT*0.8).toFixed(3)+")";ctx.fillRect(geoF.cx-geoF.w/2,geoF.feetY-geoF.h,geoF.w,geoF.h)}for(const c of G.coinsFx){const rx=Math.max(2.4,8*(0.3+0.7*Math.abs(Math.cos(c.t*9+c.idx*1.3))));ctx.fillStyle="#f2b01e";ctx.strokeStyle="#b97e08";ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(c.x,c.y,rx,8,0,0,Math.PI*2);ctx.fill();ctx.stroke();if(rx>4.5){ctx.beginPath();ctx.ellipse(c.x,c.y,rx*0.5,4,0,0,Math.PI*2);ctx.stroke()}}ctx.textAlign="center";for(const cn of G.coinNums){const k=cn.t/cn.life;ctx.save();ctx.translate(cn.x,cn.y);ctx.globalAlpha=k>0.6?1-(k-0.6)/0.4:1;ctx.beginPath();ctx.arc(-14,-4,cn.gold?6.5:5,0,Math.PI*2);ctx.fillStyle=cn.gold?"#ffd94d":"#f2b01e";ctx.fill();ctx.lineWidth=1.6;ctx.strokeStyle="#b97e08";ctx.stroke();ctx.font=(cn.gold?"900 17px":"800 14px")+" Nunito, sans-serif";ctx.lineWidth=3.5;ctx.strokeStyle="rgba(43,20,5,.8)";ctx.strokeText(cn.text,6,1);ctx.fillStyle=cn.gold?"#ffe98a":"#ffcf3f";ctx.fillText(cn.text,6,1);ctx.restore()}ctx.globalAlpha=1;ctx.textAlign="center";for(const hh of G.heals){const k=hh.t/hh.life;ctx.save();ctx.translate(hh.x,hh.y);ctx.globalAlpha=k>0.6?1-(k-0.6)/0.4:1;ctx.font="800 16px Nunito, sans-serif";ctx.lineWidth=4;ctx.strokeStyle="rgba(8,38,10,.85)";ctx.strokeText(hh.text,0,0);ctx.fillStyle="#63e273";ctx.fillText(hh.text,0,0);ctx.restore()}ctx.globalAlpha=1;ctx.textAlign="center";const headY=G.enemy?(()=>{const gg=enemyGeom();return gg.feetY-gg.h-2})():-1e4;for(const d of G.dmgNums){const isBanner=d.tag==="banner_title"||d.tag==="banner_sub";const big=!isBanner&&(d.tag==="crit"||d.tag==="heavy"||d.tag==="ultimate"||d.tag==="enraged"||d.tag==="secondwind"||d.tag==="lucky"||d.tag==="proc");const k=d.t/d.life,pop=d.t<0.12?0.6+d.t/0.12*0.55:1.15-0.15*k;ctx.save();ctx.translate(d.x,isBanner?d.y:(big?Math.min(d.y,headY):d.y));ctx.rotate(d.rot||0);ctx.scale(pop,pop);ctx.globalAlpha=k>0.7?1-(k-0.7)/0.3:1;if(big){ctx.fillStyle=d.tag==="heavy"?"#e08a2e":d.tag==="lucky"?"#f2b01e":"#d63c30";star(0,-7,(d.tag==="ultimate"?50:34)*(0.8+0.2*Math.sin(d.t*22)))}const baseFontSz=d.tag==="banner_title"?21:d.tag==="banner_sub"?15:d.tag==="ultimate"?32:d.tag==="secondwind"?27:big?25:19;ctx.font=baseFontSz+"px Bungee, Nunito, sans-serif";ctx.lineWidth=isBanner?5:(big?6:5);ctx.strokeStyle="rgba(43,20,5,.88)";const txt=d.tag==="crit"?d.text+" CRIT!":d.tag==="heavy"?d.text+" HEAVY!":d.tag==="ultimate"?d.text+" ULTIMATE!":""+d.text;const maxW=W-32;const curW=ctx.measureText(txt).width;if(curW>maxW&&curW>0){const s=maxW/curW;ctx.scale(s,s)}ctx.strokeText(txt,0,0);ctx.fillStyle=d.tag==="banner_title"?"#ffd23e":d.tag==="banner_sub"?"#ff7a5c":d.tag==="enraged"?"#ff7a5c":d.tag==="miss"?"#b9b3a8":d.tag==="heal"?"#7dd87d":big?"#ffcf3f":"#ffffff";ctx.fillText(txt,0,0);ctx.restore()}ctx.globalAlpha=1}function draw(){if(G.tab!=="battle")return;ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);ctx.save();if(G.shake>0)ctx.translate((Math.random()*2-1)*G.shake,(Math.random()*2-1)*G.shake*0.7);drawStage();drawEnemy();drawWeakSpot();drawBossSpecialFx();drawHands();drawSpecialFx();drawFx();ctx.restore();if(G.playerFlashT>0){const a=G.playerFlashT/0.4*0.55;const gr=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*0.3,W/2,H/2,Math.max(W,H)*0.72);gr.addColorStop(0,"rgba(214,60,48,0)");gr.addColorStop(1,"rgba(214,60,48,"+a.toFixed(3)+")");ctx.fillStyle=gr;ctx.fillRect(0,0,W,H)}if(G.doubleFlashT>0){ctx.fillStyle="rgba(255,255,255,"+(G.doubleFlashT/0.22*0.28).toFixed(3)+")";ctx.fillRect(0,0,W,H)}if(G.swFlashT>0){const a=G.swFlashT/0.7*0.5;const gr=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*0.28,W/2,H/2,Math.max(W,H)*0.72);gr.addColorStop(0,"rgba(242,176,30,0)");gr.addColorStop(1,"rgba(242,176,30,"+a.toFixed(3)+")");ctx.fillStyle=gr;ctx.fillRect(0,0,W,H)}if(G.frenzyT>0){const pulse=0.75+0.25*Math.sin(G.time*9);const a=(0.16+0.1*pulse).toFixed(3);const gr=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*0.34,W/2,H/2,Math.max(W,H)*0.74);gr.addColorStop(0,"rgba(255,95,31,0)");gr.addColorStop(1,"rgba(255,95,31,"+a+")");ctx.fillStyle=gr;ctx.fillRect(0,0,W,H)}if(G.frenzyFlashT>0){const k=1-G.frenzyFlashT/0.9;ctx.save();ctx.translate(W/2,H*0.3);const sc=k<0.3?0.5+k/0.3*0.62:1.12-0.12*k;ctx.scale(sc,sc);ctx.globalAlpha=G.frenzyFlashT>0.2?1:Math.max(0,G.frenzyFlashT/0.2);ctx.font="44px Bungee, Nunito, sans-serif";ctx.textAlign="center";ctx.lineWidth=9;ctx.strokeStyle="rgba(43,20,5,.9)";ctx.strokeText("FRENZY!",0,0);ctx.fillStyle="#ff7a1f";ctx.fillText("FRENZY!",0,0);ctx.restore();ctx.globalAlpha=1}if(G.fightFlashT>0){const k=1-G.fightFlashT/0.55;ctx.save();ctx.translate(W/2,H*0.36);const sc=k<0.3?0.5+k/0.3*0.62:1.12-0.12*k;ctx.scale(sc,sc);ctx.globalAlpha=G.fightFlashT>0.16?1:Math.max(0,G.fightFlashT/0.16);ctx.font="46px Bungee, Nunito, sans-serif";ctx.textAlign="center";ctx.lineWidth=9;ctx.strokeStyle="rgba(43,20,5,.9)";ctx.strokeText("FIGHT!",0,0);ctx.fillStyle="#ffcf3f";ctx.fillText("FIGHT!",0,0);ctx.restore();ctx.globalAlpha=1}}let lastTs=0;function frame(ts){requestAnimationFrame(frame);const dt=Math.min(0.05,lastTs?(ts-lastTs)/1000:0.016);lastTs=ts;if(G.running)update(dt);draw()}const M = (n) => (n ? Math.round(440 * Math.pow(2, (n - 69) / 12) * 100) / 100 : 0);
const Music = {
  timer: null,
  mode: null,
  step: 0,
  nextT: 0,
  bus: null,
  noiseBuf: null,
  getNoiseBuffer() {
    if (this.noiseBuf || !Sound.ctx) return this.noiseBuf;
    try {
      const sr = Sound.ctx.sampleRate || 44100;
      const buf = Sound.ctx.createBuffer(1, Math.floor(sr * 0.25), sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuf = buf;
    } catch (e) {}
    return this.noiseBuf;
  },
  ensureBus() {
    if (this.bus || !Sound.ctx) return;
    try {
      this.bus = Sound.ctx.createGain();
      this.updateVolume();
      this.bus.connect(Sound.master);
    } catch (e) {}
  },
  updateVolume() {
    if (!this.bus || !Sound.ctx) return;
    try {
      const baseVol = (G.settings && typeof G.settings.musicVol === "number") ? G.settings.musicVol : 0.7;
      // Slightly softer in battle (0.65x) so slap sounds take center stage
      const inBattle = G.tab === "battle";
      const targetGain = inBattle ? baseVol * 0.65 : baseVol;
      this.bus.gain.setValueAtTime(targetGain, Sound.ctx.currentTime);
    } catch (e) {}
  },
  note(freq, t, dur, type, vol) {
    if (!Sound.ctx || !this.bus || !freq) return;
    try {
      const o = Sound.ctx.createOscillator(), g = Sound.ctx.createGain();
      o.type = type || "sine";
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol || 0.1, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      o.connect(g);
      g.connect(this.bus);
      o.start(t);
      o.stop(t + dur + 0.02);
    } catch (e) {}
  },
  kick(t, vol) {
    if (!Sound.ctx || !this.bus) return;
    try {
      const v = vol || 0.28;
      const o = Sound.ctx.createOscillator(), g = Sound.ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(145, t);
      o.frequency.exponentialRampToValueAtTime(34, t + 0.11);
      g.gain.setValueAtTime(v, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      o.connect(g);
      g.connect(this.bus);
      o.start(t);
      o.stop(t + 0.14);
    } catch (e) {}
  },
  snare(t, vol) {
    if (!Sound.ctx || !this.bus) return;
    try {
      const v = vol || 0.18;
      const o = Sound.ctx.createOscillator(), g = Sound.ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(190, t);
      o.frequency.exponentialRampToValueAtTime(65, t + 0.08);
      g.gain.setValueAtTime(v * 0.7, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      o.connect(g);
      g.connect(this.bus);
      o.start(t);
      o.stop(t + 0.1);

      const nBuf = this.getNoiseBuffer();
      if (nBuf) {
        const src = Sound.ctx.createBufferSource();
        src.buffer = nBuf;
        const f = Sound.ctx.createBiquadFilter();
        f.type = "highpass";
        f.frequency.setValueAtTime(1200, t);
        const ng = Sound.ctx.createGain();
        ng.gain.setValueAtTime(v * 0.75, t);
        ng.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        src.connect(f);
        f.connect(ng);
        ng.connect(this.bus);
        src.start(t);
        src.stop(t + 0.13);
      }
    } catch (e) {}
  },
  hat(t, vol, open) {
    if (!Sound.ctx || !this.bus) return;
    try {
      const v = vol || 0.07;
      const nBuf = this.getNoiseBuffer();
      if (nBuf) {
        const src = Sound.ctx.createBufferSource();
        src.buffer = nBuf;
        const f = Sound.ctx.createBiquadFilter();
        f.type = "highpass";
        f.frequency.setValueAtTime(6500, t);
        const g = Sound.ctx.createGain();
        const dur = open ? 0.16 : 0.04;
        g.gain.setValueAtTime(v, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        src.connect(f);
        f.connect(g);
        g.connect(this.bus);
        src.start(t);
        src.stop(t + dur + 0.01);
      }
    } catch (e) {}
  },
  patterns: {
    menu: {
      stepDur: 0.27,
      bars: [
        { root: 130.81, arp: [261.63, 329.63, 392, 329.63] },
        { root: 110,    arp: [220, 261.63, 329.63, 261.63] },
        { root: 87.31,  arp: [174.61, 220, 261.63, 220] },
        { root: 98,     arp: [196, 246.94, 293.66, 246.94] }
      ]
    },
    battle: {
      stepDur: 0.215,
      bass: [55, 0, 55, 55, 0, 55, 0, 65.41, 55, 0, 55, 55, 82.41, 0, 73.42, 0],
      lead: [440, 0, 523.25, 0, 659.25, 0, 523.25, 0, 587.33, 0, 523.25, 0, 440, 0, 0, 0]
    },
    // Stage 0: Cozy Corner - Warm, cute, cheerful bouncing chiptune (C Major)
    stage_0: {
      stepDur: 0.20,
      drums: "x.h.y.h.x.h.y.h.",
      bass: [36, 0, 36, 0, 43, 0, 43, 0, 41, 0, 41, 0, 43, 0, 40, 0].map(M),
      bassType: "triangle", bassVol: 0.28,
      lead: [60, 64, 67, 72, 71, 67, 69, 0, 67, 64, 65, 64, 62, 0, 60, 0].map(M),
      leadType: "sine", leadVol: 0.14,
      harm: [48, 0, 52, 0, 55, 0, 52, 0, 53, 0, 57, 0, 55, 0, 52, 0].map(M),
      harmType: "triangle", harmVol: 0.10
    },
    // Stage 1: Backyard Bunch - Playful staccato funk, cheeky pests (D Minor / F Major)
    stage_1: {
      stepDur: 0.185,
      drums: "x.h.y..kx.h.y.o.",
      bass: [38, 0, 38, 41, 43, 0, 44, 45, 38, 0, 43, 0, 41, 0, 40, 39].map(M),
      bassType: "sawtooth", bassVol: 0.19,
      lead: [62, 65, 0, 67, 68, 69, 0, 67, 65, 62, 65, 67, 62, 0, 0, 0].map(M),
      leadType: "square", leadVol: 0.11
    },
    // Stage 2: Fight Club - 80s workout gym synth, driving 4-on-the-floor (A Minor)
    stage_2: {
      stepDur: 0.165,
      drums: "x.h.y.h.x.h.y.o.",
      bass: [45, 45, 45, 45, 48, 48, 50, 52, 45, 45, 45, 45, 43, 43, 40, 43].map(M),
      bassType: "sawtooth", bassVol: 0.20,
      lead: [69, 0, 69, 72, 74, 0, 76, 74, 72, 0, 69, 67, 69, 0, 0, 0].map(M),
      leadType: "square", leadVol: 0.12
    },
    // Stage 3: Castle Guard - Stately royal medieval march, bold knights (D Minor)
    stage_3: {
      stepDur: 0.21,
      drums: "x.h.s.h.x.k.s..s",
      bass: [38, 38, 0, 38, 45, 0, 38, 0, 41, 41, 0, 43, 45, 0, 38, 0].map(M),
      bassType: "square", bassVol: 0.18,
      lead: [62, 0, 65, 67, 69, 0, 69, 0, 72, 69, 67, 65, 62, 0, 65, 62].map(M),
      leadType: "sawtooth", leadVol: 0.12
    },
    // Stage 4: Graveyard Shift - Spooky undead bounce, eerie rattling organ (C# Minor)
    stage_4: {
      stepDur: 0.19,
      drums: "x.h.y.hx..h.y.h.",
      bass: [37, 0, 40, 0, 44, 0, 43, 42, 37, 0, 40, 0, 44, 43, 41, 38].map(M),
      bassType: "triangle", bassVol: 0.24,
      lead: [73, 0, 76, 0, 75, 73, 72, 0, 73, 70, 69, 0, 68, 69, 70, 72].map(M),
      leadType: "square", leadVol: 0.11
    },
    // Stage 5: Shadow Dojo - Martial arts pentatonic, swift strikes & taiko pulses (A Pentatonic)
    stage_5: {
      stepDur: 0.16,
      drums: "x.k.y.k.x.k.y.o.",
      bass: [45, 0, 45, 0, 52, 0, 45, 48, 50, 0, 45, 0, 43, 0, 40, 0].map(M),
      bassType: "sawtooth", bassVol: 0.19,
      lead: [69, 72, 74, 76, 79, 76, 74, 72, 74, 76, 74, 72, 69, 0, 72, 69].map(M),
      leadType: "triangle", leadVol: 0.14
    },
    // Stage 6: Dark Woods - Deep misty forest, haunting atmospheric arpeggios (E Minor)
    stage_6: {
      stepDur: 0.22,
      drums: "k...y.h.k.k.y...",
      bass: [40, 0, 47, 0, 40, 0, 43, 0, 38, 0, 45, 0, 40, 0, 42, 0].map(M),
      bassType: "triangle", bassVol: 0.25,
      lead: [64, 67, 71, 74, 71, 67, 69, 67, 64, 67, 71, 69, 67, 66, 64, 0].map(M),
      leadType: "sine", leadVol: 0.14
    },
    // Stage 7: Pharaoh's Tomb - Ancient sands, Egyptian Phrygian dominant (E Phrygian Dom)
    stage_7: {
      stepDur: 0.18,
      drums: "x.h.y.hx.h.y..k",
      bass: [40, 40, 41, 40, 44, 40, 41, 40, 40, 40, 45, 44, 41, 40, 41, 44].map(M),
      bassType: "sawtooth", bassVol: 0.19,
      lead: [64, 65, 68, 69, 71, 72, 71, 68, 69, 68, 65, 64, 65, 68, 65, 64].map(M),
      leadType: "square", leadVol: 0.12
    },
    // Stage 8: Mountain Stronghold - Crushing stone giants, heavy dwarven rock metal (B Minor)
    stage_8: {
      stepDur: 0.20,
      drums: "x...y.h.x.k.y.o.",
      bass: [35, 35, 0, 35, 38, 0, 40, 42, 35, 35, 0, 35, 43, 42, 40, 38].map(M),
      bassType: "sawtooth", bassVol: 0.22,
      lead: [59, 0, 62, 64, 66, 0, 66, 0, 67, 66, 64, 62, 59, 0, 62, 59].map(M),
      leadType: "square", leadVol: 0.13
    },
    // Stage 9: Dragon Lair - Supreme volcanic caldera, epic climactic boss speed (C Minor)
    stage_9: {
      stepDur: 0.15,
      drums: "x.h.y.h.x.k.y.h.",
      bass: [36, 36, 39, 36, 41, 36, 43, 44, 36, 36, 46, 44, 43, 41, 39, 41].map(M),
      bassType: "sawtooth", bassVol: 0.22,
      lead: [72, 0, 75, 77, 79, 0, 80, 79, 77, 75, 77, 79, 72, 0, 75, 72].map(M),
      leadType: "square", leadVol: 0.13
    },
    // Stage 10: Frozen Wastes - Shimmering aurora, crystal ice bells, driving techno (F# Minor)
    stage_10: {
      stepDur: 0.175,
      drums: "x.h.y.h.x.h.y.h.",
      bass: [42, 0, 42, 45, 47, 0, 49, 0, 42, 0, 45, 0, 40, 0, 44, 0].map(M),
      bassType: "square", bassVol: 0.18,
      lead: [81, 78, 76, 73, 76, 78, 81, 85, 81, 78, 81, 85, 88, 85, 81, 78].map(M),
      leadType: "sine", leadVol: 0.14
    },
    // Stage 11: Dinosaur Valley - Prehistoric jungle stomp, primal beast fury (G Minor)
    stage_11: {
      stepDur: 0.19,
      drums: "x.k.y.k.x.k.y.o.",
      bass: [31, 31, 0, 31, 34, 0, 36, 38, 31, 31, 0, 34, 38, 36, 34, 31].map(M),
      bassType: "sawtooth", bassVol: 0.24,
      lead: [55, 58, 60, 62, 60, 58, 55, 0, 65, 62, 60, 58, 55, 0, 58, 55].map(M),
      leadType: "square", leadVol: 0.12
    },
    // Stage 12: Hell Gate - Scorching underworld brimstone, speed metal tritones (D# Minor)
    stage_12: {
      stepDur: 0.145,
      drums: "x.k.y.k.x.k.y.x.",
      bass: [39, 39, 45, 44, 39, 39, 42, 41, 39, 39, 45, 46, 39, 44, 42, 40].map(M),
      bassType: "sawtooth", bassVol: 0.22,
      lead: [63, 66, 69, 68, 66, 63, 62, 0, 63, 69, 70, 69, 66, 63, 60, 62].map(M),
      leadType: "sawtooth", leadVol: 0.12
    },
    // Stage 13: Olympus - Radiant gods, divine golden fanfares, cloud palace (G Major)
    stage_13: {
      stepDur: 0.185,
      drums: "x.h.y.h.x.h.y.o.",
      bass: [43, 0, 47, 0, 50, 0, 55, 0, 48, 0, 52, 0, 47, 0, 45, 0].map(M),
      bassType: "triangle", bassVol: 0.25,
      lead: [67, 71, 74, 79, 78, 76, 74, 71, 72, 74, 76, 79, 74, 0, 71, 67].map(M),
      leadType: "square", leadVol: 0.13
    },
    // Stage 14: Mech Factory - Cyberpunk assembly line, robotic electro techno (C Minor)
    stage_14: {
      stepDur: 0.16,
      drums: "x.h.y.h.x.h.y.x.",
      bass: [36, 48, 36, 48, 39, 48, 41, 48, 36, 48, 36, 48, 44, 43, 41, 39].map(M),
      bassType: "sawtooth", bassVol: 0.20,
      lead: [60, 63, 65, 67, 65, 63, 60, 58, 60, 67, 70, 67, 65, 63, 60, 0].map(M),
      leadType: "square", leadVol: 0.11
    },
    // Stage 15: Alien Invasion - Flying saucers, sci-fi theremin glides, space invasion (Ab Minor)
    stage_15: {
      stepDur: 0.175,
      drums: "x..h.y.h.x..h.y.o",
      bass: [44, 0, 44, 50, 49, 0, 44, 47, 44, 0, 52, 50, 49, 47, 46, 45].map(M),
      bassType: "sawtooth", bassVol: 0.19,
      lead: [68, 72, 74, 76, 74, 71, 68, 67, 68, 74, 77, 76, 74, 71, 68, 0].map(M),
      leadType: "sine", leadVol: 0.15
    },
    // Stage 16: Sky Temple - Storm clouds, ancient sky titans, soaring breezes (F Major)
    stage_16: {
      stepDur: 0.20,
      drums: "x..h.y...x.h.y.h.",
      bass: [41, 0, 48, 0, 45, 0, 46, 0, 41, 0, 45, 0, 43, 0, 40, 0].map(M),
      bassType: "triangle", bassVol: 0.25,
      lead: [69, 72, 77, 76, 74, 72, 69, 0, 70, 72, 74, 77, 72, 0, 69, 65].map(M),
      leadType: "triangle", leadVol: 0.14
    },
    // Stage 17: Deep Sea Abyss - Mariana Trench, glowing anglerfish, underwater sonar (Bb Minor)
    stage_17: {
      stepDur: 0.21,
      drums: "x...y.h.x...y...",
      bass: [34, 0, 41, 0, 34, 0, 37, 0, 36, 0, 41, 0, 34, 0, 32, 0].map(M),
      bassType: "triangle", bassVol: 0.28,
      lead: [70, 73, 77, 82, 80, 77, 75, 73, 70, 77, 82, 80, 77, 73, 70, 0].map(M),
      leadType: "sine", leadVol: 0.15
    },
    // Stage 18: Cosmic Void - Dark synthwave space odyssey, neon interstellar highways (D Minor)
    stage_18: {
      stepDur: 0.165,
      drums: "x.h.y.h.x.h.y.h.",
      bass: [38, 38, 41, 43, 45, 38, 48, 47, 38, 38, 45, 43, 41, 40, 38, 36].map(M),
      bassType: "sawtooth", bassVol: 0.20,
      lead: [62, 65, 69, 72, 74, 72, 69, 65, 67, 69, 72, 74, 77, 74, 72, 69].map(M),
      leadType: "square", leadVol: 0.11
    },
    // Stage 19: Heaven's Gate - Transcendent golden glory, celestial finale symphony (D Major)
    stage_19: {
      stepDur: 0.175,
      drums: "x.h.y.h.x.h.y.o.",
      bass: [38, 0, 42, 45, 47, 0, 43, 45, 38, 0, 45, 47, 50, 49, 47, 45].map(M),
      bassType: "sawtooth", bassVol: 0.20,
      lead: [74, 78, 81, 86, 85, 83, 81, 78, 79, 81, 83, 86, 81, 0, 78, 74].map(M),
      leadType: "square", leadVol: 0.13
    }
  },
  tick() {
    if (!Sound.ctx || !this.mode) return;
    const pat = this.patterns[this.mode] || this.patterns.stage_0 || this.patterns.battle;
    if (!pat) return;
    if (this.nextT < Sound.ctx.currentTime - 0.25) this.nextT = Sound.ctx.currentTime + 0.05;
    while (this.nextT < Sound.ctx.currentTime + 0.14) {
      const s = this.step;
      const t = Math.max(this.nextT, Sound.ctx.currentTime + 0.02);
      if (this.mode === "menu") {
        const bar = pat.bars[Math.floor(s / 8) % 4], pos = s % 8;
        if (pos === 0 || pos === 5) this.note(bar.root, t, 0.5, "sine", 0.3);
        if (pos === 0 || pos === 5) this.note(bar.root * 2, t, 0.4, "triangle", 0.1);
        this.note(bar.arp[pos % 4], t, 0.24, "triangle", 0.2);
        if (pos === 7) this.note(bar.arp[1] * 2, t, 0.2, "triangle", 0.07);
      } else if (pat.drums) {
        const i = s % 16;
        const d = pat.drums[i % pat.drums.length];
        if (d === "k" || d === "x") this.kick(t, pat.kickVol || 0.26);
        if (d === "s" || d === "y") this.snare(t, pat.snareVol || 0.18);
        if (d === "h" || d === "x" || d === "y") this.hat(t, pat.hatVol || 0.06, false);
        if (d === "o") this.hat(t, pat.hatVol || 0.08, true);

        if (pat.bass && pat.bass[i]) {
          this.note(pat.bass[i], t, pat.bassDur || pat.stepDur * 0.9, pat.bassType || "sawtooth", pat.bassVol || 0.16);
        }
        if (pat.lead && pat.lead[i]) {
          this.note(pat.lead[i], t, pat.leadDur || pat.stepDur * 0.85, pat.leadType || "square", pat.leadVol || 0.11);
        }
        if (pat.harm && pat.harm[i]) {
          this.note(pat.harm[i], t, pat.harmDur || pat.stepDur * 1.4, pat.harmType || "triangle", pat.harmVol || 0.09);
        }
      } else {
        const i = s % 16;
        if (pat.bass && pat.bass[i]) this.note(pat.bass[i] * 2, t, 0.16, "square", 0.15);
        if (pat.lead && pat.lead[i]) this.note(pat.lead[i], t, 0.13, "square", 0.085);
      }
      this.step++;
      this.nextT += pat.stepDur;
    }
  },
  start(mode) {
    this.ensureBus();
    if (!Sound.ctx || !this.bus) return;
    if (!this.patterns[mode]) mode = (mode === "menu") ? "menu" : "stage_0";
    if (this.mode === mode && this.timer) return;
    this.stop();
    this.mode = mode;
    this.step = 0;
    try { this.bus.gain.value = mode === "menu" ? 0.85 : 0.95; } catch (e) {}
    this.nextT = Sound.ctx.currentTime + 0.05;
    this.timer = setInterval(() => this.tick(), 75);
    this.tick();
    if (typeof syncMenuMusicBtn === "function") syncMenuMusicBtn();
  },
  pause() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  },
  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.mode = null;
    if (typeof syncMenuMusicBtn === "function") syncMenuMusicBtn();
  },
  sync() {
    try {
      if (!G.settings || !G.settings.music || !Sound.ctx) {
        this.stop();
        return;
      }
      if (Sound.ctx.state === "suspended") Sound.ctx.resume();
      if (G.tab === "battle") {
        const g = (G.enemy && typeof G.enemy.group === "number") ? G.enemy.group : Math.floor((G.current || 0) / 5);
        const stageKey = "stage_" + Math.max(0, Math.min(19, g));
        this.updateVolume();this.start(stageKey);
      } else {
        this.updateVolume();this.start("menu");
      }
    } catch (e) {}
  }
};const _soundUnlock=Sound.unlock.bind(Sound);Sound.unlock=function(){_soundUnlock();Music.sync()};const autoAdvanceBtn=$("autoAdvanceBtn"),autoAdvanceLbl=$("autoAdvanceLbl");
let autoAdvanceTimer=null;
function updateAutoAdvanceBtn(){
  if(!autoAdvanceBtn)return;
  autoAdvanceBtn.classList.toggle("active",!!G.autoAdvance);
  if(autoAdvanceLbl)autoAdvanceLbl.textContent=G.autoAdvance?"AUTO: ON":"AUTO: OFF";
}
if(autoAdvanceBtn){
  autoAdvanceBtn.addEventListener("click",()=>{
    Sound.unlock();
    G.autoAdvance=!G.autoAdvance;
    updateAutoAdvanceBtn();
    Save.store();
    Sound.tap(G.autoAdvance?1.3:0.85);
  });
}
const pauseBtn=$("pauseBtn"),pauseLbl=$("pauseLbl"),pauseIco=$("pauseIco");const ICO_PAUSE='<rect x="5" y="4" width="5" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="5" height="16" rx="1" fill="currentColor"/>';const ICO_PLAY='<path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor"/>';function setRunning(v){G.running=v;pauseLbl.textContent=v?"Pause":"Resume";pauseIco.innerHTML=v?ICO_PAUSE:ICO_PLAY;pauseBtn.setAttribute("aria-label",v?"Pause fight":"Resume fight")}pauseBtn.addEventListener("click",()=>{Sound.unlock();setRunning(!G.running)});const soundBtn=$("soundBtn");function syncSfxBtn(){const waves=soundBtn.querySelectorAll(".wave");for(let i=0;i<waves.length;i++)waves[i].style.display=Sound.muted?"none":"";soundBtn.style.opacity=Sound.muted?0.45:1;soundBtn.setAttribute("aria-label",Sound.muted?"Unmute sound":"Mute sound")}function setSfx(on){G.settings.sfx=!!on;Sound.muted=!on;syncSfxBtn();if(G.tab==="settings")renderSettings();Save.store()}function setMusic(on){G.settings.music=!!on;Music.sync();syncMenuMusicBtn();if(G.tab==="settings")renderSettings();Save.store()}soundBtn.addEventListener("click",()=>{Sound.unlock();setSfx(!G.settings.sfx)});function renderSettings(){
  const volSlider = $("musicVolSlider"), volVal = $("musicVolVal");
  if (volSlider) {
    const curPct = Math.round(((G.settings && typeof G.settings.musicVol === "number") ? G.settings.musicVol : 0.7) * 100);
    volSlider.value = curPct;
    if (volVal) volVal.textContent = curPct + "%";
    volSlider.oninput = (e) => {
      const val = parseInt(e.target.value, 10);
      if (volVal) volVal.textContent = val + "%";
      if (!G.settings) G.settings = {};
      G.settings.musicVol = val / 100;
      Music.updateVolume();
      Save.store();
    };
  }const m=$("setMusicBtn"),s=$("setSfxBtn"),t=$("setTestModeBtn");if(t){t.textContent=G.testMode?"ON":"OFF";t.classList.toggle("off",!G.testMode);t.setAttribute("aria-pressed",G.testMode?"true":"false")}if(m){m.textContent=G.settings.music?"ON":"OFF";m.classList.toggle("off",!G.settings.music);m.setAttribute("aria-pressed",G.settings.music?"true":"false")}if(s){s.textContent=G.settings.sfx?"ON":"OFF";s.classList.toggle("off",!G.settings.sfx);s.setAttribute("aria-pressed",G.settings.sfx?"true":"false")}const sub=$("hubSettingsSub");if(sub)sub.textContent="MUSIC "+(G.settings.music?"ON":"OFF")+" · SFX "+(G.settings.sfx?"ON":"OFF")}$("setMusicBtn").addEventListener("click",()=>{Sound.unlock();setMusic(!G.settings.music)});$("setSfxBtn").addEventListener("click",()=>{Sound.unlock();setSfx(!G.settings.sfx)});function setTestMode(on){G.testMode=!!on;try{localStorage.setItem("these_hands_test_mode",G.testMode?"1":"0")}catch(e){}const lBtn=$("levelsTestModeBtn");if(lBtn){lBtn.textContent=G.testMode?"TEST: ON":"TEST MODE";lBtn.classList.toggle("off",!G.testMode);lBtn.classList.toggle("active",G.testMode);if(G.testMode){lBtn.style.background="var(--gold)";lBtn.style.color="#2b1c10"}else{lBtn.style.background="";lBtn.style.color=""}}const tTag=$("hubTestTag");if(tTag)tTag.style.display=G.testMode?"":"none";renderSettings();renderSelect();renderHub()}window.setTestMode=setTestMode;window.toggleTestMode=()=>setTestMode(!G.testMode);window.unlockAllEnemies=()=>{G.unlocked=ENEMIES.length;Save.store();renderSelect();renderHub();renderSettings();alert("All 50 enemies unlocked!")};$("tutReplayBtn")?.addEventListener("click",()=>{Sound.unlock();switchTab("home");startTutorial()});$("setTestModeBtn")?.addEventListener("click",()=>{Sound.unlock();setTestMode(!G.testMode)});$("unlockAllBtn")?.addEventListener("click",()=>{Sound.unlock();window.unlockAllEnemies()});$("levelsTestModeBtn")?.addEventListener("click",()=>{Sound.unlock();setTestMode(!G.testMode)});$("hubTestTag")?.addEventListener("click",()=>{Sound.unlock();switchTab("levels")});function syncMenuMusicBtn(){const btn=$("menuMusicBtn");if(!btn)return;const on=!!(G.settings&&G.settings.music);btn.classList.toggle("off",!on);btn.classList.toggle("playing",on&&typeof Music!=="undefined"&&!!Music.timer&&Music.mode==="menu");btn.setAttribute("aria-pressed",on?"true":"false");const waves=btn.querySelectorAll(".mwave");for(let i=0;i<waves.length;i++)waves[i].style.display=on?"":"none"}$("menuMusicBtn").addEventListener("click",(ev)=>{ev.stopPropagation();Sound.unlock();setMusic(!G.settings.music)});syncMenuMusicBtn();/* visibility synced in handleAppShow */let resetArmT=0;$("setResetBtn").addEventListener("click",()=>{const btn=$("setResetBtn");if(!btn.classList.contains("armed")){btn.classList.add("armed");btn.textContent="TAP AGAIN TO WIPE";clearTimeout(resetArmT);resetArmT=setTimeout(()=>{btn.classList.remove("armed");btn.textContent="RESET SAVE"},3200);return}clearTimeout(resetArmT);btn.classList.remove("armed");btn.textContent="RESET SAVE";doReset()});$("saveNotice").addEventListener("click",()=>{$("saveNotice").style.display="none"});$("storageNotice").addEventListener("click",()=>{$("storageNotice").style.display="none"});$("skinNotice").addEventListener("click",()=>{$("skinNotice").style.display="none"});function doReset(){Save.clear();G.totalCoins=0;G.shownCoins=0;G.kills=0;G.level=1;G.attrs=defaultAttrs();G.skills=["basic"];G.slapHand="R";G.slapCount=0;G.barrage=0;G.barrageT=0;G.ultCharge=0;G.ultReady=false;G.hitStop=0;G.lostLast=false;G.unlocked=1;G.testMode=(typeof localStorage!=="undefined"&&localStorage.getItem("these_hands_test_mode")==="1")||(Boolean(import.meta.env?.DEV)&&typeof window!=="undefined"&&(new URLSearchParams(window.location.search).has("test")||new URLSearchParams(window.location.search).has("testMode")));G.defeated=new Set;G.current=0;G.playerFlashT=0;G.pendingRespawn=false;G.lastVictory=null;G.stats=defaultStats();G.enemyRecords={};G.achievements=[];G.claimedAchievements=[];G.gauntletCleared=[];G.bossRush={clears:0,best:0};G.endlessBest=0;G.fightMode=null;G.carryHp=null;G.weakHintDone=false;G.tutorialDone=false;G.pendingTutorial=false;G.selectedSkill=null;G.wikiDetail=null;G.freshOnReturn=false;G.gems=0;G.skin="classic";G.ownedSkins=["classic"];G.pendingOffline=null;G.bundlesOwned=[];G.hardCleared=new Set;G.hardMode=false;G.offlineUnlocked=false;G.vipUnlocked=false;G.frenzyBoostUnlocked=false;G.autoAdvance=false;if(typeof updateAutoAdvanceBtn==="function")updateAutoAdvanceBtn();G.settings={music:true,sfx:true};Sound.muted=false;syncSfxBtn();G.gameCompleted=false;G.dragonMilestone=false;G.secondWindUsed=false;G.heals=[];G.frenzyMeter=0;G.frenzyT=0;G.frenzyFlashT=0;G.specials={};updateFrenzyBar();G.daily=defaultDaily();G.chest=defaultChest();G.seenIntro=false;G.purchases=[];$("chestCard").style.display="none";dismissLevelUp();bossIntroEl.classList.remove("open");awayCardEl.classList.remove("open");applySkinVisuals();updateProcChip();updateGemHud();G.coinsFx=[];G.dmgNums=[];G.coinNums=[];G.impacts=[];G.poofs=[];G.frags=[];G.dmgLog=[];G.bursts=[];G.claws=[];G.procCount=0;G.venomT=0;G.voidT=0;setPanel(false,true);if(dpsActualEl)dpsActualEl.textContent="0";hideEndOverlay();G.over=null;updateCoinHud();updateKills();renderAttrs();renderStartShowcase();spawnEnemy(true);setRunning(true);switchTab("home");G.menuOpen=true;startMenuEl.classList.add("open");Music.sync();Save.store()}const healHandArt=()=>{try{if(HAND_SPRITE){const p=document.createElement("canvas");p.width=8;p.height=8;const px=p.getContext("2d");px.drawImage(HAND_SPRITE,0,0,8,8);const d=px.getImageData(0,0,8,8).data;let any=false;for(let i=3;i<d.length;i+=4)if(d[i]>8){any=true;break}if(!any){HAND_SPRITE=null;HAND_ASLEEP=null;initHandCanvases()}}}catch(e){}};window.addEventListener("pointerdown",(e)=>{
  try{Sound.unlock();}catch(err){}
  if(e.target&&e.target.closest("button, .tab-btn, .more-row, .award-row, .booster-circle-btn, .hub-card, .card, .attr-btn, .close-btn, .danger-btn, .set-toggle, .sel-card")){
    Sound.tap();
  }
},{passive:true});function handleAppHide(){
  Save.store(true);
  Sound.suspend();
  Music.pause();
}
function handleAppShow(){
  Sound.resume();
  Music.sync();
  healV2Sprites();
  healHandArt();
}
window.__handleAppHide = handleAppHide;
window.__handleAppShow = handleAppShow;
document.addEventListener("visibilitychange",()=>{if(document.hidden)handleAppHide();else handleAppShow();});
window.addEventListener("blur",handleAppHide);
window.addEventListener("focus",handleAppShow);
window.addEventListener("pagehide",handleAppHide);
window.addEventListener("pageshow",handleAppShow);window.addEventListener("beforeunload",()=>Save.store(true));window.__bootSet&&window.__bootSet(45,"Loading your save…");const saved=Save.load();let savedLastSeen=0,savedPending=null;if(saved){G.totalCoins=saved.coins;G.kills=saved.kills||0;G.level=saved.level||1;G.attrs=Object.assign(defaultAttrs(),saved.attrs||{});for(const k of Object.keys(G.attrs)){if(CONFIG.attrs[k]&&CONFIG.attrs[k].maxLevel)G.attrs[k]=Math.min(CONFIG.attrs[k].maxLevel,G.attrs[k]);}G.unlocked=Math.max(1,Math.min(ENEMIES.length,saved.unlocked||1));G.defeated=new Set(saved.defeated||[]);G.current=Math.max(0,Math.min(ENEMIES.length-1,saved.current||0));if(G.current>=G.unlocked)G.current=G.unlocked-1;G.panelOpen=false;G.skills=Array.isArray(saved.skills)&&saved.skills.length?saved.skills.slice():["basic"];G.skills=G.skills.filter((id)=>CONFIG.skills.some((s)=>s.id===id));if(G.skills.indexOf("basic")<0)G.skills.unshift("basic");G.stats=Object.assign(defaultStats(),saved.stats||{});if(!saved.stats)G.stats.fightsWon=G.kills;G.enemyRecords=saved.records&&typeof saved.records==="object"?saved.records:{};if(G.skills.indexOf("frenzy")<0&&(G.stats.frenzies||0)>0)G.skills.push("frenzy");G.specials={};if(saved.specials&&typeof saved.specials==="object")for(const sp of CONFIG.specials){const lv=saved.specials[sp.id];if(typeof lv==="number"&&lv>=1)G.specials[sp.id]=Math.min(5,Math.floor(lv))}for(const sp of CONFIG.specials)if(G.defeated.has(sp.boss)&&!G.specials[sp.id])G.specials[sp.id]=1;if(typeof saved.frenzyMeter==="number")G.frenzyMeter=Math.max(0,Math.min(100,saved.frenzyMeter));for(const idx of G.defeated)if(!G.enemyRecords[idx])G.enemyRecords[idx]={k:1,f:0};G.achievements=Array.isArray(saved.achievements)?saved.achievements.filter((id)=>ACHIEVEMENTS.some((a)=>a.id===id)):[];G.claimedAchievements=Array.isArray(saved.claimedAchievements)?saved.claimedAchievements.filter((id)=>G.achievements.indexOf(id)>=0&&ACHIEVEMENTS.some((a)=>a.id===id)):[];G.gauntletCleared=Array.isArray(saved.gauntletCleared)?saved.gauntletCleared.filter((n)=>Number.isInteger(n)&&n>=0&&n<20):[];G.bossRush=(saved.bossRush&&typeof saved.bossRush==="object")?{clears:saved.bossRush.clears|0,best:saved.bossRush.best|0}:{clears:0,best:0};G.endlessBest=saved.endlessBest|0;G.weakHintDone=saved.weakHintDone===true;G.tutorialDone=saved.tutorialDone===true;G.pendingTutorial=false;for(let gg=0;gg<19;gg++){if(gg%2===0&&G.gauntletCleared.indexOf(gg)<0){for(let k=0;k<5;k++){if(G.defeated.has((gg+1)*5+k)){G.gauntletCleared.push(gg);break}}}} // grandfather trio gates ONLY for legacy saves that actually defeated enemies past the gate
G.gameCompleted=saved.gameCompleted===true;G.dragonMilestone=saved.dragonMilestone===true;if(G.gameCompleted&&!G.defeated.has(49)&&!G.defeated.has(ENEMIES.length-1)){G.gameCompleted=false;G.dragonMilestone=true}if(G.defeated.has(49))G.dragonMilestone=true;G.offlineUnlocked=saved.offlineUnlocked===true;G.vipUnlocked=saved.vipUnlocked===true;G.frenzyBoostUnlocked=saved.frenzyBoostUnlocked===true;G.autoAdvance=saved.autoAdvance===true;G.adCoinBoostUntil=typeof saved.adCoinBoostUntil==="number"?saved.adCoinBoostUntil:0;G.adDmgBoostUntil=typeof saved.adDmgBoostUntil==="number"?saved.adDmgBoostUntil:0;G.settings=Object.assign({music:true,sfx:true},saved.settings||{});G.gems=typeof saved.gems==="number"&&saved.gems>=0?Math.floor(saved.gems):0;if(Array.isArray(saved.ownedSkins)){const RET={hulk:{cur:"coins",amt:15000},lightning:{cur:"gems",amt:55},cyber:{cur:"gems",amt:75},cosmic:{cur:"gems",amt:110},stone:{cur:"gems",amt:50},void:{cur:"gems",amt:90},venom:{cur:"gems",amt:140},flaming:{cur:"gems",amt:200},dragon:{cur:"gems",amt:300}};let rc=0,rg=0;for(const rid of saved.ownedSkins){if(CONFIG.skins.some((s)=>s.id===rid))continue;const rr=RET[rid];if(rr){if(rr.cur==="coins")rc+=rr.amt;else rg+=rr.amt}}if(rc>0||rg>0){G.skinRefund={coins:rc,gems:rg};G.totalCoins+=rc;G.gems+=rg}}if(Array.isArray(saved.ownedSkins)||saved.skin){const SEV={golden:"spidey",frost:"spidey",stone:"spidey",void:"spidey",venom:"spidey",flaming:"spidey",dragon:"spidey"};const evl=[];if(Array.isArray(saved.ownedSkins))saved.ownedSkins=saved.ownedSkins.map((id)=>{if(SEV[id]){if(evl.indexOf(id)<0)evl.push(id);return SEV[id]}return id});if(saved.skin&&SEV[saved.skin]){if(evl.indexOf(saved.skin)<0)evl.push(saved.skin);saved.skin=SEV[saved.skin]}if(evl.length)window.__skinEvolve=evl}
G.ownedSkins=Array.isArray(saved.ownedSkins)?saved.ownedSkins.filter((id,ix)=>CONFIG.skins.some((s)=>s.id===id)&&saved.ownedSkins.indexOf(id)===ix):["classic"];if(G.ownedSkins.indexOf("classic")<0)G.ownedSkins.unshift("classic");G.bundlesOwned=Array.isArray(saved.bundlesOwned)?saved.bundlesOwned.filter((id)=>CONFIG.bundles.some((bd)=>bd.id===id)):[];if(saved.daily&&typeof saved.daily==="object"&&saved.daily.counters){G.daily=Object.assign(defaultDaily(),saved.daily);G.daily.counters=Object.assign(defaultDaily().counters,saved.daily.counters||{});if(!Array.isArray(G.daily.quests))G.daily.quests=[];if(!Array.isArray(G.daily.claimed))G.daily.claimed=[]}if(saved.chest&&typeof saved.chest==="object")G.chest=Object.assign(defaultChest(),saved.chest);if(saved.chest&&typeof saved.chest.streak==="number"&&typeof saved.chest.cycleDay!=="number"){G.chest.cycleDay=saved.chest.streak>0?(saved.chest.streak-1)%7+1:0}G.seenIntro=saved.seenIntro===true;G.purchases=Array.isArray(saved.purchases)?saved.purchases.filter((p)=>p&&typeof p.productId==="string"&&typeof p.txId==="string"):[];G.hardCleared=new Set(Array.isArray(saved.hardCleared)?saved.hardCleared.filter((n)=>typeof n==="number"&&n>=0&&n<ENEMIES.length):[]);G.groupRewards=Array.isArray(saved.groupRewards)?saved.groupRewards.filter((n)=>typeof n==="number"&&n>=0&&n<GROUPS.length):[];G.collectionReward=saved.collectionReward===true;G.skin=CONFIG.skins.some((s)=>s.id===saved.skin)&&G.ownedSkins.indexOf(saved.skin)>=0?saved.skin:"classic";if(G.specials){for(const k of Object.keys(G.specials)){if(!CONFIG.specials.some(sp=>sp.id===k))delete G.specials[k];}}savedLastSeen=typeof saved.lastSeen==="number"?saved.lastSeen:0;lastStampMs=savedLastSeen;savedPending=saved.pendingOffline&&typeof saved.pendingOffline.coins==="number"?saved.pendingOffline:null}if(G.dragonMilestone)checkAchievements();G.shownCoins=G.totalCoins;setPanel(G.panelOpen,true);resize();spawnEnemy(true);G.phase="fighting";coinCountEl.textContent=fmtNum(G.shownCoins);if(dpsEl)dpsEl.textContent=fmtDPS(DamageCalculator.theoreticalDPS());updateKills();updateGemHud();renderAttrs();renderStartShowcase();buildSkinArt();applySkinVisuals();if(G.offlineUnlocked){if(savedPending&&savedPending.coins>0){G.pendingOffline={coins:Math.floor(savedPending.coins),away:savedPending.away||0}}else if(savedLastSeen>0){const away=(Date.now()-savedLastSeen)/1000;if(away>=CONFIG.offline.minAway){const capped=Math.min(away,CONFIG.offline.capSeconds);const coins=Math.floor(DamageCalculator.theoreticalDPS()*capped*CONFIG.offline.rate);if(coins>0)G.pendingOffline={coins,away:Math.floor(capped)}}}if(G.pendingOffline)Save.store()}Sound.muted=!G.settings.sfx;syncSfxBtn();ensureDaily();$("aboutVersion").textContent="Version "+CONFIG.appVersion;updateFrenzyBar();{let migCoins=0,migGroups=0;for(let g=0;g<GROUPS.length;g++)if(groupComplete(g)&&G.groupRewards.indexOf(g)<0){const c=grantGroupReward(g);if(c>0){migCoins+=c;migGroups++}}G.pendingGroupToast=null;const migCol=checkCollectionReward();if(migGroups>0||migCol){window.__migNotice="Welcome back — "+(migGroups>0?migGroups+" group reward"+(migGroups>1?"s":"")+" earned earlier, paid out now: +"+fmtNum(migCoins)+" coins. ":"")+(migCol?"FULL COLLECTION bonus: +"+CONFIG.collection.gems+" gems!":"");Save.store()}}if(G.skinRefund){const sn2=$("skinNotice");if(sn2){sn2.querySelector(".sn-msg").textContent="Skin retired — refunded "+[G.skinRefund.coins?fmtNum(G.skinRefund.coins)+" coins":null,G.skinRefund.gems?G.skinRefund.gems+" gems":null].filter(Boolean).join(" + ")+". Equipped hand reset to Classic.";sn2.style.display="";Save.store()}}if(window.__migNotice){const sn3=$("skinNotice");if(sn3&&sn3.style.display==="none"){sn3.querySelector(".sn-msg").textContent=window.__migNotice;sn3.style.display=""}}
if(window.__skinEvolve){const sn4=$("skinNotice");if(sn4){const parts=window.__skinEvolve.map((id)=>"Your "+id.toUpperCase()+" hand evolved into SPIDER-MAN");if(sn4.style.display==="none"){sn4.querySelector(".sn-msg").textContent=parts.join(" · ")+" — new look, new powers.";sn4.style.display=""}Save.store()}}if(Save.corrupted)$("saveNotice").style.display="";window.__th={G,CONFIG,ENEMIES,stats,DamageCalculator,castSpecial,activateFrenzy,specUpgCost,SP,Save,switchTab,PFX,startBossRush,startEndless,startGauntlet};requestAnimationFrame(frame);window.__bootSet&&window.__bootSet(80,"Sharpening the slaps…");(function finishBoot(){
  if(typeof initHandCanvases==="function")initHandCanvases();
  if(typeof buildSkinArt==="function")buildSkinArt();
  if(typeof updateAutoAdvanceBtn==="function")updateAutoAdvanceBtn();
  window.__bootSet&&window.__bootSet(100,"Ready!");
  window.__bootDone=true;
  window.__bootMs=Math.round(performance.now());
  const bs=document.getElementById("bootShell");
  if(bs){
    setTimeout(()=>{
      bs.classList.add("bs-hide");
      setTimeout(()=>{try{bs.remove()}catch(e){}},450);
    },350);
  }
  if(typeof ensureHubReady==="function")ensureHubReady();
})();const runDeferredChecks = () => {};(function(){const order=[];const fg=Math.max(0,Math.floor(G.current/5));for(let g=fg;g<GROUPS.length;g++)order.push(g);for(let g=0;g<fg;g++)order.push(g);let oi=0;const step=()=>{for(let k=0;k<5;k++){try{if(ENEMIES[fg*5+k])void ENEMIES[fg*5+k].spr}catch(e){}}};setTimeout(step,3000)})();
// Wire Ad-Based Booster Buttons & Modals
const boostCoinBtn = $("boostCoinBtn");
if (boostCoinBtn) {
  boostCoinBtn.addEventListener("click", () => {
    activateCoinBoost();
  });
}
const boostDmgBtn = $("boostDmgBtn");
if (boostDmgBtn) {
  boostDmgBtn.addEventListener("click", () => {
    activateDmgBoost();
  });
}
const adClaimBtn = $("adClaimBtn");
if (adClaimBtn) {
  adClaimBtn.addEventListener("click", () => {
    finishRewardedAd();
  });
}
const endAdDoubleBtn = $("endAdDoubleBtn");
if (endAdDoubleBtn) {
  endAdDoubleBtn.addEventListener("click", () => {
    try { Sound.unlock && Sound.unlock(); } catch(e){}
    if (G.adRewardClaimed) {
      toast("Reward already claimed for this battle!", 2000);
      return;
    }
    // Lock immediately upon click to prevent double-tap / reward stacking
    G.adRewardClaimed = true;
    endAdDoubleBtn.disabled = true;
    endAdDoubleBtn.classList.add("claimed");

    const bonus = G.pendingAdDoubleCoins || 100;
    playRewardedAd((success) => {
      if (!success) {
        // Unlock if ad failed/cancelled so player can try again
        G.adRewardClaimed = false;
        endAdDoubleBtn.disabled = false;
        endAdDoubleBtn.classList.remove("claimed");
        return;
      }
      G.totalCoins += bonus;
      G.shownCoins = G.totalCoins;
      if (G.stats) G.stats.coinsEarned = (G.stats.coinsEarned || 0) + bonus;
      if (typeof coinCountEl !== "undefined" && coinCountEl) coinCountEl.textContent = fmtNum(G.shownCoins);
      Save.store();

      const dText = $("endAdDoubleText");
      const dBonus = $("endAdDoubleBonus");
      if (dText) dText.textContent = "DOUBLED! REWARD APPLIED";
      if (dBonus) dBonus.textContent = "✓ +" + fmtNum(bonus);

      const endStats = $("endStats");
      if (endStats) {
        const row = document.createElement("div");
        row.className = "es es-ad-bonus";
        row.innerHTML = '<span>AD 2X BONUS</span><b style="color:#22c55e">+ ' + fmtNum(bonus) + ' COINS</b>';
        endStats.appendChild(row);
      }

      toast("🎉 +" + fmtNum(bonus) + " COINS AWARDED FROM AD!", 3200);
      try { PFX.blast && PFX.blast(window.innerWidth * 0.5, window.innerHeight * 0.5); } catch(e){}
    }, "round_end_double");
  });
}

updateAdBoostersUi();

checkAchievements();window.__gameScriptComplete=true;
}
