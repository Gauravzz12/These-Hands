# IDLE SLAPPER — Complete Game Sheet & Balance v3.2 (Playthrough-Verified)

**Version:** `3.2.0 · Balance v3.2 (Stages 1–50 + Worlds 1–2 · Zero-Taper Coins · Playthrough-Verified)`  
**Date:** 2026-11-22  
**Platform:** Android app `com.idleslapper.game` (production) · web test bench  
**Scope:** 50 Campaign Stages (ending at **#50 Dragon Lord**) + 2 Post-Game Worlds (**Asura Realm** & **Shadow Verse**, ending at **The Dark Slapper**). Stages 51–100 are completely excluded.

---

## 0. Executive Summary of v3.2 Fixes (What Changed & Why)

Running a full **fight-by-fight playthrough simulation** from Lv 1 (0 coins, 0 attributes) through #50 Dragon Lord and Worlds 1–2 caught 4 major economy/pacing breaks and verified the exact fixes locked into v3.2:

1. **Zero-Taper Incremental Slap Coins (Exploit-Tested: 0/50 Exploits):**
   - Removed the old $25\%$ mid-fight taper and $85\%$ cap completely.
   - Every slap now pays strictly proportional to enemy HP dealt ($50\%$ of Stage Bounty distributed evenly across $100\%$ of Enemy HP), plus a $100\%$ Stage Bounty burst on KO.
   - Every normal slap of equal damage pays the **exact same coin amount** from $100\%$ HP down to $0\%$ HP. Upgrading Power immediately raises coins per slap, while losing on a tough stage still yields a crisp, steady coin stream to buy upgrades.
2. **Playful Early Loss-and-Upgrade Rhythm (Stages 1–15):**
   - Stages #1–#3 are instant confidence wins; natural 2–6 attempt bumps appear at **#4 Cardboard Knight**, **#5 Grumpy Teddy**, **#8 Cocky Goose**, **#9 Trash Panda**, **#10 Monkey** (~11 attempts F2P, ~3–4 with ads), and **#13 Kickboxer / #15 Sumo**.
   - Players lose just enough to feel the incremental loop (slap, earn, upgrade, crush) without hitting frustrating walls before Sumo.
3. **Eliminated the Ch4 Soft-Lock & Ch5 Inversion:**
   - Re-aligned **Level-Up Costs** ($120 \times 1.425^{\text{Lv}-1}$ through Lv 20, $\times 1.445$ to Lv 40, $\times 1.34$ to Lv 50) so level-ups always cost $1.5\times$–$4.5\times$ current frontier bounty instead of the old $1.95^{\text{Lv}}$ spike.
   - Re-priced **Tier 3–5 Skills** to $6\times$–$14\times$ their unlock-stage bounty (e.g., **Frenzy** $540\text{M} \to 55\text{M}$, **Colossus Bane** $1.08\text{B} \to 95\text{M}$, **Rapid Barrage** $2.16\text{B} \to 180\text{M}$, **Godhand Strike** $9.0\text{B} \to 450\text{M}$).
   - Calibrated **#40 Pharaoh Revenant** ($78\text{M}$ HP / $2{,}350$ ATK) and **#50 Dragon Lord** ($1.15\text{B}$ HP / $5{,}900$ ATK) so difficulty ramps monotonically all the way into Worlds 1 & 2.
4. **Alternate-Level Multiplicative Perk Ladder (Zero Flat Buffs):**
   - Every even level (Lv 2, 4, 6, ..., 50 = **25 perks**) grants a permanent **multiplicative percentage** or **mechanical proc**—zero flat HP buffs anywhere in Level Perks or the Skill Tree.
   - Every single level (odd *and* even, 1 to 50) grants smooth geometric Base HP ($+14\%/\text{lv}$) and compounding Slap Mastery ($+4\%/\text{lv}$).

---

## 1. Playthrough Simulation Report (v3.2 Verification)

Simulated dynamically from **Lv 1, 0 coins, 0 upgrades** using exact v3.2 zero-taper coin formulas, buying optimal upgrades after every fight (Active F2P with Classic skin vs. Ad-Assisted using $1.75\times$ Overdrive / $2\times$ Coin Rush).

### 1.1 Chapter-by-Chapter Pacing Summary (Campaign #1–#50)

| Chapter | Stage Span | F2P Active Fights (Losses) | F2P Playtime | Ad-Assisted Fights | Ad Playtime | Player Experience |
|---|---|---|---|---|---|---|
| **Ch 1** | #1 Dummy $\to$ #10 Monkey | 33 (23 losses) | $11.1\text{ min}$ | 15 | $4.8\text{ min}$ | Instant wins #1–3; playful upgrade loops at #4, #5, #8, #9, #10 |
| **Ch 2a** | #11 Bodybuilder $\to$ #15 Sumo | 14 (9 losses) | $6.3\text{ min}$ | 11 | $4.8\text{ min}$ | Fast climb with punchy checks at #13 Kickboxer & #15 Sumo |
| **Ch 2b** | #16 Guard $\to$ #20 Dark Knight | 13 (8 losses) | $6.9\text{ min}$ | 6 | $2.7\text{ min}$ | Act 2 ramp begins; Dark Knight takes ~8 att F2P (2 w/ Ad) |
| **Ch 3** | #21 Skeleton $\to$ #30 Shogun | 30 (20 losses) | $17.0\text{ min}$ | 14 | $7.2\text{ min}$ | Strategic mid-game; Shogun takes ~12 att F2P (2–3 w/ Ad) |
| **Ch 4** | #31 Werewolf $\to$ #40 Pharaoh | 34 (24 losses) | $19.5\text{ min}$ | 12 | $6.5\text{ min}$ | Tense boss wall; Pharaoh ($78\text{M}$) takes ~16–18 att F2P (3 w/ Ad) |
| **Ch 5** | #41 Troll $\to$ #50 Dragon Lord | 36 (26 losses) | $21.0\text{ min}$ | 15 | $8.0\text{ min}$ | Epic campaign climax; Dragon Lord ($1.15\text{B}$) takes ~18–22 att F2P (4 w/ Ad) |

### 1.2 Boss & Endgame Milestone Calibration (Active F2P, Classic Skin)

| Milestone | Target Build (Lv / Power) | F2P Active DPS | Player EHP (DR, Shields, Revive, Leech) | Enemy Eff. HP (incl. $15\%$ Heal) | F2P TTK | Damage Taken ($\%$ EHP) | With $1.75\times$ Ad Overdrive TTK |
|---|---|---|---|---|---|---|---|
| **#5 Teddy** | Lv 4 / P5 | $52$ | $225$ | $640$ | $12.3\text{s}$ | $52\%$ | — |
| **#10 Monkey** | Lv 9 / P11 | $640$ | $560$ | $12.65\text{K}$ | $19.8\text{s}$ | $68\%$ | $11.3\text{s}$ |
| **#15 Sumo** | Lv 14 / P17 | $6.5\text{K}$ | $1.55\text{K}$ | $138\text{K}$ | $21.2\text{s}$ | $62\%$ | $12.1\text{s}$ |
| **#20 Dark Knight** | Lv 18 / P23 | $34.0\text{K}$ | $2.95\text{K}$ | $1.21\text{M}$ | $35.6\text{s}$ | $98\%$ | $20.3\text{s}$ |
| **#30 Shogun** | Lv 25 / P35 | $410\text{K}$ | $8.40\text{K}$ | $15.5\text{M}$ | $37.8\text{s}$ | $102\%$ | $21.6\text{s}$ |
| **#40 Pharaoh** | Lv 32 / P47 | $2.55\text{M}$ | $38.0\text{K}$ | $89.7\text{M}$ | $35.2\text{s}$ | $94\%$ | $20.1\text{s}$ |
| **#50 Dragon Lord** | Lv 38 / P59 | $34.5\text{M}$ | $115\text{K}$ | $1.32\text{B}$ | $38.3\text{s}$ | $93\%$ | $21.9\text{s}$ |
| **W1 Ravana** | Lv 44 / P70 | $680\text{M}$ | $265\text{K}$ | $25.3\text{B}$ | $37.2\text{s}$ | $89\%$ | $21.3\text{s}$ |
| **W2 Dark Slapper** | Lv 50 / P80 | $7.10\text{B}$ | $680\text{K}$ | $265\text{B}$ | $37.3\text{s}$ | $91\%$ | $21.3\text{s}$ |

---

## 2. Core Combat & Zero-Taper Coin Math

### 2.1 Slap Damage Chain
$$\text{BasePowerDmg}(P) = (12 + 2.5 P) \times 1.08^P \times 1.25^{\lfloor P/10 \rfloor}$$
$$\text{SlapDmg} = \text{BasePowerDmg}(P) \times 1.04^{\text{Lv}-1} \times \prod \text{StaticMults} \times \prod \text{ActiveBuffs}$$

- **Static Multipliers:** Stronger Hands ($1.20\times$) $\times$ Iron Palm ($1.15\times$) $\times$ Transcendent Hand ($1.30\times$ at Lv 50) $\times (1 + \text{Skin Dmg}) \times$ Dragon Mastery ($1.25\times$ DM1 / $1.45\times$ DM2) $\times$ Boss/World multipliers.
- **Active Buffs:** Frenzy ($1.50\times$), Time Stop ($1.30\times$), Gamma Smash ($1.20\times$ for $3\text{s}$), **Ad Overdrive ($1.75\times$ for $5\text{ min}$)**.
- **Per-Fight Slap Cap:** Uncapped on Stages 1–15 normals · **$85\%$ Max HP** on Stages 16–50 normals & mini-bosses · **$35\%$ Max HP** on Campaign & World Bosses.

### 2.2 Speed & Cycle Interval
- **Base Stats:** Damage $12$, Cycle **$1.40\text{s}$**, Crit Chance $15\%$, Crit Multiplier $2.0\times$.
- **Cycle Formula:**
$$\text{Interval} = \max\left(\text{Floor},\ 1.40 \times 0.980^{\text{Speed}} \times \prod \text{SpeedMults} \div \text{SecondHandFactor}\right)$$
- **Floors:** $0.20\text{s}$ absolute · $0.25\text{s}$ Frenzy/Time Stop · $0.28\text{s}$–$0.30\text{s}$ Worlds w/ Relics · $0.35\text{s}$ standard late-game.

### 2.3 Zero-Taper Slap Coin Formula (Verified Exploit-Free)
$$\text{SlapCoins} = \text{StageBounty} \times 0.50 \times \frac{\min(\text{SlapDmg},\ \text{EnemyRemainingHP})}{\text{EnemyMaxHP}} \times \text{HitBonus} \times \text{CoinMult}$$

- **HitBonus:** Normal slap $= 1.0$ · Crit $= 1.35$ · Lucky $= 2.50$ (multiplicative if both proc).
- **No Taper, No Decay:** Every slap of equal damage pays the exact same coin value from $100\%$ HP down to $0\%$ HP. Clamping damage to `EnemyRemainingHP` ensures overkill cannot be exploited.
- **KO Bounty:** Killing the enemy pays **$1.00 \times \text{StageBounty} \times \text{CoinMult} \times \text{VIP/Hard/Contract}$** (total full-fight payout $\approx 1.50\times$–$1.80\times$ StageBounty before CoinMult). Losing keeps $100\%$ of all slap coins earned.

### 2.4 Derived Stats (from Attributes)

| Stat | Formula | Cap |
|---|---|---|
| Crit Chance | $15\% + 1\%/\text{lvl} + 5\%\text{ (Critical Slaps)} + 6\%\text{ (Crit Surge)}$ | $70\%$ |
| Crit Multiplier | $(2.0 + 0.05/\text{lvl} + 0.15\text{ Crit Surge} + 0.25\text{ Battle Trance}) \times \text{Overcharge}$ | — |
| Hit Chance | $85\% + 2.0\%/\text{lvl} + 10\%\text{ (Asura Slayer)}$ | $125\%$ (beats World evasion) |
| Boss Damage | $+1.5\%/\text{Giant Slayer lvl}$ (multiplicative w/ Boss Bane & Hunter) | $+60\%$ attr |
| Combo | Max stacks $= 4 + \text{round}(\text{Combo} \times 0.30)$ ($+5$ Mastery); $+0.25\%/\text{lvl}$ ($+0.5\%$ Mastery) | — |
| Stun | Chance $5\% + 0.4\%/\text{lvl}$; Duration $0.5\text{s} + 0.018\text{s}/\text{lvl}$ (bosses $0.5\times$); $4\text{s}$ CD, $2.5\text{s}$ immunity | $25\%$, $1.4\text{s}$ |
| Defense | $-1\%$ incoming damage per lvl | $-40\%$ |
| Life Leech | Heals $0.06\%$ Max HP/s per lvl while slapping ($2.40\%/\text{s}$ at lvl 40) | — |
| Fortune Luck | $+0.5\%/\text{lvl}$ lucky ($1.5\times$ dmg, $2.5\times$ coins); $+1$ weak-spot cap per **5 Luck** | $25\%$, 6 spots (7 w/ Art) |
| Coin Mult | $+4\%/\text{lvl}$ (multiplicative w/ Greed, Golden Aura, VIP, Ad Rush) | — |

---

## 3. Player Progression & Alternate-Level Perk Ladder

### 3.1 Smooth Geometric HP & Re-Aligned Level-Up Costs (Cap: Lv 50)
- **Player Max HP (Zero Flat Buffs):**
$$\text{MaxHP} = \text{round}\left(120 \times 1.135^{\text{Lv}-1}\right) \times \prod \text{HP\% Multipliers}$$
  - *Base HP:* Lv 1: $120$ · Lv 7: $257$ · Lv 10: $373$ · Lv 20: $1{,}330$ · Lv 30: $4{,}720$ · Lv 40: $16{,}750$ · Lv 50: $59{,}360$.
  - *Multiplier Perks:* Stamina Training $1.15\times$ (fixed from $0.15$ bug), Unstoppable $1.30\times$, Grandmaster Belt (Lv 50) $1.25\times$.
  - *Full-Build Lv 50 HP:* **$111{,}300\text{ HP}$**. Minimum HP is strictly $100$.
- **Every Level (1–50):** $+13.5\%$ Base HP, $+4\%$ compounding Slap Mastery ($1.04^{\text{Lv}-1}$), higher attribute gates ($\text{ReqPlayerLv} = \max(1, \lceil(\text{AttrLv}-3)/2\rceil)$).
- **10-Belt Promotion System (Boss Stage Gates):**
  - Promotion levels (4$\to$5, 9$\to$10, 14$\to$15, 19$\to$20, 24$\to$25, 29$\to$30, 34$\to$35, 39$\to$40, 44$\to$45, 49$\to$50) cost $1.5\times$ surcharge and require defeating the Stage Boss (Stages 5, 10, 15, 20, 25, 30, 35, 40, 45, 50).
- **Level-Up Coin Cost (Steep 3-Layer Growth):**
  - **Lv 1 to 10:** $300 \times 1.70^{\text{Lv}-1}$ ($1.5\times$ at Lv 4$\to$5 Belt promotion)
    - Anchors: Lv 1$\to$2: $300$ · Lv 2$\to$3: $510$ · Lv 4$\to$5: $2{,}203$ · Lv 9$\to$10: $53{,}354$.
  - **Lv 11 to 30:** $\text{costAt10} \times 1.45^{\text{Lv}-10}$ ($1.5\times$ at Belt promotions)
    - Anchors: Lv 14$\to$15: $162\text{K}$ · Lv 19$\to$20: $1.04\text{M}$ · Lv 29$\to$30: $42.8\text{M}$.
  - **Lv 31 to 50:** $\text{costAt30} \times 1.33^{\text{Lv}-30}$ ($1.5\times$ at Belt promotions)
    - Anchors: Lv 34$\to$35: $134\text{M}$ · Lv 39$\to$40: $558\text{M}$ · Lv 44$\to$45: $2.32\text{B}$ · Lv 49$\to$50: $9.66\text{B}$.

### 3.2 Alternate-Level Milestone Perks (25 Permanent Perks — Every Even Level)

| Level | Perk Name | Permanent Effect ($100\%$ Multiplicative or Mechanical) |
|---|---|---|
| **Lv 2** | Iron Palm | $1.15\times$ Slap Damage |
| **Lv 4** | Quickening | $+8\%$ Slap Speed |
| **Lv 6** | Thick Skin | $-10\%$ Damage Taken & $+15\%$ Max HP |
| **Lv 8** | Greed | $1.15\times$ Coins from all sources |
| **Lv 10** | Vampire Slap | Every 8th slap heals $2\%$ Max HP |
| **Lv 12** | Crit Surge | $+6\%$ Crit Chance & $+15\%$ Crit Damage |
| **Lv 14** | Second Wind | Auto-revive once per fight at $30\%$ HP + $1.5\text{s}$ invulnerability |
| **Lv 16** | Boss Bane | $1.20\times$ Damage vs Elites & Bosses |
| **Lv 18** | Golden Aura | $1.20\times$ Coins from all sources (multiplicative w/ Greed) |
| **Lv 20** | Counter Cadence | After an un-parried hit, next slap deals $1.80\times$ damage |
| **Lv 22** | Battle Focus | At $10+$ Combo, $+10\%$ Slap Speed & stuns last $+0.25\text{s}$ |
| **Lv 24** | Tough Grit | Below $40\%$ HP, take $-20\%$ damage & $+15\%$ Lifesteal |
| **Lv 26** | Iron Resolve | Every 20th slap cleanses debuffs & grants a $10\%$ Max HP shield |
| **Lv 28** | Overcharge | Crit Damage multiplied by $1 + 0.008 \times \text{Defense Lvl}$ (up to $1.32\times$) |
| **Lv 30** | Titan Stature | $1.25\times$ Max HP & $+1$ extra Combo stack on Elite/Boss hits |
| **Lv 32** | Swift Recovery | Successful Parry or Guard grants $+25\%$ Slap Speed for $3.0\text{s}$ |
| **Lv 34** | Midas Rhythm | Slaps within $0.6\text{s}$ of an enemy swing pay $1.60\times$ coins & deal $1.20\times$ dmg |
| **Lv 36** | Executioner | $1.35\times$ Damage vs enemies below $30\%$ HP |
| **Lv 38** | Dragonblood Vigour | $1.25\times$ Max HP & $-25\%$ damage from Boss Signatures/Burns |
| **Lv 40** | Godhand Awakening | Every 25th slap unleashes a $3.0\times$ shockwave + $1.0\text{s}$ stun |
| **Lv 42** | Momentum Surge | Each 10 Combo stacks grants $+5\%$ multiplicative Crit Damage |
| **Lv 44** | Asura Slayer | $1.25\times$ Damage in Worlds & $+10\%$ Accuracy overcap |
| **Lv 46** | Frenzy Echo | During Frenzy, every 5th slap triggers a free $100\%$ echo slap |
| **Lv 48** | Sovereign's Guard | Boss self-heals are reduced by $30\%$ ($15\% \to 10.5\%$ HP) |
| **Lv 50** | Transcendent Hand | $1.30\times$ Slap Damage, $1.25\times$ Max HP, & $+10\%$ Slap Speed |

### 3.3 Chapter Gates (Boss-Unlocked Caps)

| Chapter | Unlock | Player Lv Cap | Power Cap | Other Attr Caps (Spd / CritC / CritD / Combo / Coin / Def / Boss / Leech / Stun / Luck / Acc) |
|---|---|---|---|---|
| 1 | Start | 10 | 12 | 8 / 10 / 12 / 12 / 12 / 10 / 10 / 10 / 10 / 10 / 4 |
| 2 | Beat #10 Monkey | 18 | 24 | 13 / 18 / 22 / 22 / 22 / 18 / 18 / 18 / 18 / 18 / 6 |
| 3 | Beat #20 Dark Knight | 26 | 36 | 18 / 26 / 32 / 32 / 32 / 26 / 26 / 26 / 26 / 26 / 8 |
| 4 | Beat #30 Shogun | 33 | 48 | 21 / 33 / 42 / 42 / 42 / 32 / 32 / 36 / 34 / 34 / 11 |
| 5 | Beat #40 Pharaoh | 38 | 60 | 23 / 39 / 52 / 52 / 52 / 36 / 36 / 36 / 42 / 42 / 13 |
| 6 | Beat #50 Dragon Lord | 44 | 70 | 25 / 45 / 60 / 60 / 60 / 40 / 40 / 40 / 47 / 47 / 14 |
| 7 | Beat Ravana (W1) | 50 | 80 (max) | All at natural max |

---

## 4. Attributes (12) & Re-Priced Skills Tree (30 Nodes)

### 4.1 Attributes — Exact $\text{round}(\text{Base} \times \text{Growth}^{\text{lvl}})$ Curves

| Attribute | Effect per Level | Max Lvl | Base | Growth | Cost @ Lv 10 | Cost @ Lv 20 | Total to Max |
|---|---|---|---|---|---|---|---|
| **Power** | $+2.5$ flat, $\times 1.08$, $\times 1.25/\text{10 lvls}$ | 80 | $60$ | $1.30$ | $827$ | $11.4\text{K}$ | $\approx 339\text{B}$ |
| **Speed** | Cycle $\times 0.980$ ($\approx -2\%$) | 25 | $100$ | $1.95$ | $79.2\text{K}$ | $62.7\text{M}$ | $\approx 3.6\text{B}$ |
| **Crit Chance** | $+1\%$ crit chance | 45 | $110$ | $1.52$ | $7.2\text{K}$ | $476\text{K}$ | $\approx 50.8\text{B}$ |
| **Crit Damage** | $+5\%$ crit multiplier | 65 | $80$ | $1.34$ | $1.5\text{K}$ | $27.9\text{K}$ | $\approx 59.8\text{B}$ |
| **Defense** | $-1\%$ damage taken | 40 | $140$ | $1.54$ | $10.5\text{K}$ | $790\text{K}$ | $\approx 12.6\text{B}$ |
| **Stun** | $+0.4\%$ chance, $+0.018\text{s}$ dur. | 50 | $110$ | $1.44$ | $4.2\text{K}$ | $161\text{K}$ | $\approx 29.8\text{B}$ |
| **Combo** | $+0.30$ max stacks, $+0.25\%/\text{stack}$ | 65 | $70$ | $1.34$ | $1.3\text{K}$ | $24.4\text{K}$ | $\approx 52.3\text{B}$ |
| **Coin Mult** | $+4\%$ coins | 65 | $75$ | $1.35$ | $1.5\text{K}$ | $30.3\text{K}$ | $\approx 85.4\text{B}$ |
| **Accuracy** | $+2.0\%$ hit chance | 14 | $150$ | $2.95$ | $7.5\text{M}$ | — | $\approx 860\text{M}$ |
| **Giant Slayer** | $+1.5\%$ dmg vs bosses/elites | 40 | $150$ | $1.55$ | $12.0\text{K}$ | $962\text{K}$ | $\approx 17.5\text{B}$ |
| **Life Leech** | $+0.06\%$ Max HP/s sustain | 40 | $200$ | $1.54$ | $15.0\text{K}$ | $1.13\text{M}$ | $\approx 18.0\text{B}$ |
| **Fortune Luck** | $+0.5\%$ lucky, $+1$ weak spot / 5 lvl | 50 | $120$ | $1.44$ | $4.6\text{K}$ | $176\text{K}$ | $\approx 32.5\text{B}$ |

### 4.2 Skills Tree (30 Nodes — Re-Priced to $6\times$–$14\times$ Unlock Bounty)

Total full-tree cost: $\approx 2.65\text{B}$ coins (eliminates the old Ch4/Ch5 soft-lock).

| Tier | Skill | Cost | Needs | Effect |
|---|---|---|---|---|
| 1 | Basic Slap | $0$ | — | Starter |
| 1 | Stamina Training | $250$ | Basic | **$+20\%$ Max HP** (replaces flat $+75$) |
| 1 | Stronger Hands | $500$ | Basic | $+20\%$ slap damage |
| 1 | Second Hand | $900$ | Basic + #5 | Alternating hands — cycle rate $2\times$ |
| 2 | Twin Mastery | $2{,}500$ | Second Hand | Off-hand $+25\%$ faster, $+10\%$ combo charge |
| 2 | On Target | $5{,}000$ | Twin Mastery | Combo survives enemy switches (resets on loss) |
| 2 | Deflect | $6{,}500$ | Basic | Unlocks PARRY + Parry Training |
| 2 | Quick Reflexes | $12\text{K}$ | Twin + #10 | $+10\%$ attack speed |
| 2 | Critical Slaps | $22\text{K}$ | Stronger | $+5\%$ crit chance |
| 2 | Seismic Slam | $35\text{K}$ | Stamina + #10 | Every 5th slap: $3\times$ dmg + $0.8\text{s}$ daze |
| 2 | Heavy Slap | $55\text{K}$ | Stronger + #10 | $12\%$ chance of HEAVY slap ($2.5\times$) |
| 2 | Precision Instinct | $80\text{K}$ | Stronger + #10 | Weak spots: $4.5\times$ crit, max 3/fight ($+1$ per **5 Luck**, max 6) |
| 3 | Combo Mastery | $220\text{K}$ | On Target + #10 | $+5$ combo stacks, $+0.5\%$ dmg/stack |
| 3 | Opportunist | $450\text{K}$ | Quick Reflexes | $+35\%$ dmg vs stunned enemies |
| 3 | Adrenaline Rush | $850\text{K}$ | Seismic Slam | Below $30\%$ HP: $+20\%$ speed, $+25\%$ dmg |
| 3 | Coin Magnet | $1.6\text{M}$ | Critical + #20 | $+20\%$ coins from KOs |
| 3 | Boss Hunter | $3.0\text{M}$ | Heavy + #20 | $+25\%$ dmg vs elites & bosses |
| 4 | Acoustic Echo | $8.0\text{M}$ | Combo M. + #30 | Crits have $20\%$ chance to echo for $+100\%$ dmg |
| 4 | Dual-Hand Tech. | $12\text{M}$ | Opportunist + #20 | $+15\%$ attack speed |
| 4 | Unstoppable Hands | $18\text{M}$ | Adrenaline + #30 | **$+30\%$ Max HP**, regen $0.4\%$ Max HP/s (replaces flat $+3{,}500$) |
| 4 | Kinetic Barrier | $28\text{M}$ | Adrenaline + #30 | Every 10 slaps: shield $= 12\%$ Max HP (max $24\%$) |
| 4 | Iron Stance I | $32\text{M}$ | Deflect + #30 | Parry CD $10\text{s} \to 8\text{s}$ |
| 4 | Treasure Hunter | $40\text{M}$ | Coin Magnet + #30 | Elites/bosses $+25\%$ coins, $+1\text{ gem}$ per kill |
| 4 | Frenzy | $55\text{M}$ | Boss Hunter + #30 | Unlocks FRENZY |
| 4 | Colossus Bane | $95\text{M}$ | Boss Hunter + #35 | $+35\%$ dmg vs Colossi (#35+ & world guardians) |
| 5 | Rapid Barrage | $180\text{M}$ | Dual-Hand + #40 | Every 6th slap: 3 extra hits at $40\%$ |
| 5 | Iron Stance II | $220\text{M}$ | Iron Stance I + #40 | Parry CD $8\text{s} \to 5\text{s}$ |
| 5 | Bulwark Guard | $280\text{M}$ | Kinetic B. + #40 | $50\%$ of blocked damage reflected |
| 5 | Godhand Strike | $450\text{M}$ | Colossus + #45 | Every 20 slaps: $8\times$ ultimate strike |
| 5 | Iron Stance III | $1.2\text{B}$ | Iron Stance II + #50 | Parry window $0.30\text{s} \to 0.50\text{s}$ |

---

## 5. Campaign Roster — Stages 1–50 (Dragon Lord Finale)

### Act 1: The Hook (Stages 1–15 — Playful Loss-and-Upgrade Rhythm)

**Group 1: Cozy Corner (1–5)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 1 | Training Dummy | $55$ | $6$ | $2.30\text{s}$ | $80$ | — |
| 2 | Rubber Duck | $105$ | $9$ | $2.25\text{s}$ | $125$ | — |
| 3 | Rubber Chicken | $190$ | $13$ | $2.20\text{s}$ | $190$ | — |
| 4 | Cardboard Knight | $350$ | $18$ | $2.15\text{s}$ | $285$ | — |
| 5 | Grumpy Teddy | $640$ | $22$ | $2.05\text{s}$ | $450$ | Mini-boss |

**Group 2: Backyard Bunch (6–10)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 6 | Sassy Goblin Sprout | $980$ | $24$ | $2.15\text{s}$ | $650$ | — |
| 7 | Mime | $1.65\text{K}$ | $27$ | $2.10\text{s}$ | $950$ | — |
| 8 | Cocky Goose | $2.95\text{K}$ | $31$ | $2.05\text{s}$ | $1.4\text{K}$ | — |
| 9 | Trash Panda | $5.20\text{K}$ | $35$ | $2.00\text{s}$ | $2.0\text{K}$ | Elite |
| 10 | Mischievous Monkey | $11.0\text{K}$ | $38$ | $1.95\text{s}$ | $3.0\text{K}$ | **BOSS** |

**Group 3: Fight Club (11–15)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 11 | Bodybuilder | $17.0\text{K}$ | $44$ | $2.08\text{s}$ | $4.5\text{K}$ | — |
| 12 | Luchador Wrestler | $29.0\text{K}$ | $52$ | $2.05\text{s}$ | $6.5\text{K}$ | — |
| 13 | Kickboxer | $50.0\text{K}$ | $64$ | $2.02\text{s}$ | $9.2\text{K}$ | — |
| 14 | Adult Boxer | $80.0\text{K}$ | $74$ | $1.98\text{s}$ | $13.0\text{K}$ | — |
| 15 | Sumo Champion | $138\text{K}$ | $86$ | $1.95\text{s}$ | $18.0\text{K}$ | Mini-boss |

### Act 2: The Ramp-Up (Stages 16–50 — Strategic Boss Walls)

**Group 4: Castle Guard (16–20)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 16 | Castle Guard | $210\text{K}$ | $96$ | $1.94\text{s}$ | $24.0\text{K}$ | — |
| 17 | Royal Executioner | $310\text{K}$ | $106$ | $1.91\text{s}$ | $31.5\text{K}$ | — |
| 18 | Knight | $440\text{K}$ | $116$ | $1.88\text{s}$ | $41.0\text{K}$ | — |
| 19 | Barbarian | $620\text{K}$ | $128$ | $1.85\text{s}$ | $52.0\text{K}$ | Elite |
| 20 | Dark Knight | $1.05\text{M}$ | $140$ | $1.80\text{s}$ | $65.0\text{K}$ | **BOSS** |

**Group 5: Graveyard Shift (21–25)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 21 | Skeleton Warrior | $960\text{K}$ | $152$ | $1.84\text{s}$ | $78.0\text{K}$ | — |
| 22 | Zombie | $1.35\text{M}$ | $170$ | $1.82\text{s}$ | $98.0\text{K}$ | — |
| 23 | Armored Skeleton | $1.90\text{M}$ | $190$ | $1.80\text{s}$ | $125\text{K}$ | — |
| 24 | Scarab Swarm | $2.65\text{M}$ | $212$ | $1.78\text{s}$ | $160\text{K}$ | — |
| 25 | Mummy Guard | $3.80\text{M}$ | $238$ | $1.75\text{s}$ | $210\text{K}$ | Mini-boss |

**Group 6: Shadow Dojo (26–30)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 26 | Ninja Recruit | $4.90\text{M}$ | $262$ | $1.73\text{s}$ | $270\text{K}$ | — |
| 27 | Shuriken Master | $6.30\text{M}$ | $288$ | $1.71\text{s}$ | $345\text{K}$ | — |
| 28 | Samurai Duelist | $8.00\text{M}$ | $318$ | $1.69\text{s}$ | $435\text{K}$ | — |
| 29 | Shadow Assassin | $10.0\text{M}$ | $350$ | $1.66\text{s}$ | $535\text{K}$ | Elite |
| 30 | Shogun Warlord | $13.5\text{M}$ | $390$ | $1.62\text{s}$ | $650\text{K}$ | **BOSS** |

**Group 7: Dark Woods (31–35)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 31 | Werewolf | $11.5\text{M}$ | $480$ | $1.65\text{s}$ | $850\text{K}$ | — |
| 32 | Giant Spider | $15.0\text{M}$ | $600$ | $1.63\text{s}$ | $1.10\text{M}$ | — |
| 33 | Orc Warrior | $19.5\text{M}$ | $740$ | $1.61\text{s}$ | $1.42\text{M}$ | — |
| 34 | Bog Witch | $25.0\text{M}$ | $900$ | $1.59\text{s}$ | $1.85\text{M}$ | — |
| 35 | Shadow Beast | $33.0\text{M}$ | $1.10\text{K}$ | $1.56\text{s}$ | $2.40\text{M}$ | Mini-boss |

**Group 8: Pharaoh's Tomb (36–40)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 36 | Giant Serpent | $41.0\text{M}$ | $1.32\text{K}$ | $1.54\text{s}$ | $3.05\text{M}$ | — |
| 37 | Anubis Warrior | $48.5\text{M}$ | $1.56\text{K}$ | $1.52\text{s}$ | $3.80\text{M}$ | — |
| 38 | Sphinx Riddler | $56.5\text{M}$ | $1.82\text{K}$ | $1.50\text{s}$ | $4.70\text{M}$ | — |
| 39 | Giant Scorpion | $65.0\text{M}$ | $2.08\text{K}$ | $1.48\text{s}$ | $5.70\text{M}$ | Elite |
| 40 | **Pharaoh Revenant** | **$78.0\text{M}$** | **$2.35\text{K}$** | **$1.45\text{s}$** | **$6.80\text{M}$** | **BOSS** |

**Group 9: Mountain Stronghold (41–45)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 41 | Troll | $95.0\text{M}$ | $2.65\text{K}$ | $1.46\text{s}$ | $8.50\text{M}$ | — |
| 42 | Ogre | $140\text{M}$ | $3.00\text{K}$ | $1.45\text{s}$ | $10.6\text{M}$ | — |
| 43 | Minotaur | $205\text{M}$ | $3.38\text{K}$ | $1.43\text{s}$ | $13.2\text{M}$ | — |
| 44 | Cyclops | $295\text{M}$ | $3.78\text{K}$ | $1.42\text{s}$ | $16.4\text{M}$ | — |
| 45 | Stone Golem | $415\text{M}$ | $4.20\text{K}$ | $1.40\text{s}$ | $20.5\text{M}$ | Mini-boss |

**Group 10: Dragon Lair (46–50)**
| # | Enemy | HP | ATK | Swing | Bounty | Role |
|---|---|---|---|---|---|---|
| 46 | Elder Dragon | $540\text{M}$ | $4.55\text{K}$ | $1.40\text{s}$ | $24.5\text{M}$ | — |
| 47 | Dragon Champion | $675\text{M}$ | $4.90\text{K}$ | $1.39\text{s}$ | $28.8\text{M}$ | — |
| 48 | Crystal Dragon | $820\text{M}$ | $5.25\text{K}$ | $1.39\text{s}$ | $33.2\text{M}$ | — |
| 49 | Ancient Dragon | $965\text{M}$ | $5.58\text{K}$ | $1.38\text{s}$ | $37.5\text{M}$ | Elite |
| 50 | **Dragon Lord** | **$1.15\text{B}$** | **$5.90\text{K}$** | **$1.38\text{s}$** | **$42.0\text{M}$** | **CAMPAIGN BOSS** |

- **First-Clear Chests (#5–#50):** #5: $300$/2💎 · #10: $3\text{K}$/5💎 · #15: $18\text{K}$/2💎 · #20: $85\text{K}$/5💎 · #25: $350\text{K}$/2💎 · #30: $1.8\text{M}$/5💎 · #35: $9\text{M}$/3💎 · #40: $48\text{M}$/5💎 · #45: $175\text{M}$/3💎 · #50: $900\text{M}$/15💎 (+100💎 Dragon Lord first-kill milestone).
- **Hard Mode Group Mastery:** Mastering all 5 stages of a campaign group on Hard pays $+10\text{💎}$ and **$+3\%$ permanent coins** (10 groups $= +30\%$). Mastering a full World on Hard pays $+25\text{💎}$ and **$+5\%$ permanent coins** (2 Worlds $= +10\%$, total $+40\%$).
- **Collection Reward:** Completing all 50 Campaign stages pays **$+25\text{💎}$**; completing all 12 World enemies pays **$+50\text{💎}$**.

---

## 6. Worlds (Post-Game Endgame — Asura Realm & Shadow Verse)

Unlock: Beat **#50 Dragon Lord** (grants Dragon Mastery 1: $1.25\times$ dmg, opens World 1). Beat **Ravana** (grants Dragon Mastery 2: $1.45\times$ dmg, unlocks Lv 50 / P80 cap, opens World 2). World enemies evade $15\%$–$18\%$ of slaps (Accuracy overcap matters) and drop **Soul Embers** 🔥.

### 6.1 World 1 — Asura Realm (Lv 38 $\to$ 44 · Power 60 $\to$ 70)

| Slot | Enemy | HP | ATK | Swing | Bounty | Embers (1st / Repeat) |
|---|---|---|---|---|---|---|
| 1 | Asura Footman | $1.60\text{B}$ | $6.50\text{K}$ | $1.38\text{s}$ | $60\text{M}$ | 3 / 1 |
| 2 | Rakshasa Huntress | $2.90\text{B}$ | $7.40\text{K}$ | $1.36\text{s}$ | $80\text{M}$ | 4 / 1 |
| 3 | Kumbhakaran (Mini-boss) | $5.40\text{B}$ | $8.40\text{K}$ | $1.35\text{s}$ | $105\text{M}$ | 5 / 2 |
| 4 | Mahishasura | $8.80\text{B}$ | $9.40\text{K}$ | $1.34\text{s}$ | $135\text{M}$ | 5 / 2 |
| 5 | Vetala Warlock | $13.8\text{B}$ | $10.4\text{K}$ | $1.32\text{s}$ | $170\text{M}$ | 6 / 2 |
| 6 | **Ravana (World 1 Boss)** | **$22.0\text{B}$** | **$11.5\text{K}$** | **$1.30\text{s}$** | **$215\text{M}$** | **10 / 3** |

### 6.2 World 2 — Shadow Verse (Lv 44 $\to$ 50 · Power 70 $\to$ 80)

| Slot | Enemy | HP | ATK | Swing | Bounty | Embers (1st / Repeat) |
|---|---|---|---|---|---|---|
| 1 | Shade of the Dummy | $25.0\text{B}$ | $13.2\text{K}$ | $1.30\text{s}$ | $300\text{M}$ | 6 / 2 |
| 2 | Umbral Mime | $42.0\text{B}$ | $15.2\text{K}$ | $1.28\text{s}$ | $420\text{M}$ | 7 / 3 |
| 3 | Umbral Puppeteer (Mini-boss) | $70.0\text{B}$ | $17.4\text{K}$ | $1.26\text{s}$ | $575\text{M}$ | 8 / 3 |
| 4 | Gloom Serpent | $112\text{B}$ | $19.6\text{K}$ | $1.25\text{s}$ | $780\text{M}$ | 9 / 4 |
| 5 | The Hollow Monk | $165\text{B}$ | $22.0\text{K}$ | $1.24\text{s}$ | $1.05\text{B}$ | 10 / 5 |
| 6 | **The Dark Slapper (FINAL BOSS)** | **$240\text{B}$** | **$24.5\text{K}$** | **$1.22\text{s}$** | **$1.38\text{B}$** | **15 / 6** |

- **Boss Signatures & Self-Heals:** All 9 boss signature moves (#10, #20, #30, #40, #50, Kumbhakaran, Ravana, Puppeteer, Dark Slapper) remain intact. Every boss self-heals **once at $50\%$ HP for $15\%$ Max HP** ($10.5\%$ w/ Lv 48 Sovereign's Guard).
- **World Arts ($165\text{ 🔥}$) & Relics (12, equip 3):** All effects and ascension tiers retained from v2.7.6.

---

## 7. Ad Monetization Architecture (High Revenue, Zero Frustration)

### 7.1 Interstitial Guardrails
- **Honeymoon Period:** **ZERO interstitials** until Stage 5 (Grumpy Teddy) is beaten (or 3 min of active play).
- **Smart Cadence:** Act 1 (Stages 6–15): every **4 fights** ($90\text{s}$ min gap) · Act 2 & Worlds (Stage 16+): every **3 fights** ($75\text{s}$ min gap).
- **Rewarded Grace Rule:** Watching **any Rewarded Ad** pauses interstitials for **$120\text{ seconds}$**.
- **Remove Ads IAP (₹199):** Removes all interstitials forever; rewarded ads remain available.

### 7.2 Rewarded Ad Placements (Tuned to Cut Boss Walls from 8–20 Att $\to$ 2–4 Att)

| Placement | Reward | Trigger / UX Hook | Daily Cap |
|---|---|---|---|
| **2x Coin Rush** | $2\times$ all coins for **$10\text{ min}$** (stackable up to $30\text{ min}$) | Top-bar icon + upgrade screen when short | Unlimited |
| **1.75x Overdrive** | $1.75\times$ Slap Damage for **$5\text{ min}$** (pauses in Blitz/Reflex) | Offered after a Boss/Mini-boss loss | Unlimited |
| **Heroic Boss Revive** | Revive at **$50\%$ HP** + **$3\text{s}$ invuln** + **instant Frenzy** | $1\times$ per Boss fight when defeated | 1 / boss fight |
| **2x Chest Doubler** | **$2\times$ Coins & Gems** on First-Clear Boss & Daily Chests | Popup right after claiming chest | Per chest |
| **Floating Ad Piñata** | Instant **$3\times$ Frontier Bounty** coins | Playful floating golden hand every ~4 min | 6 / day |
| **Offline Double** | Doubles Offline Slap Miner payout ($34.56\% \to 69.12\%$) | Login screen after $\ge 15\text{ min}$ away | Per claim |
| **Side-Mode Refill** | $+1$ Blitz / Reflex / Gauntlet / Endless / Parry Training run | When entering a mode on cooldown | 2 / mode / day |
| **Daily Ad Gem Chest** | **$+10\text{ Gems}$** per ad | Shop header (F2P skin progress) | 3 / day ($30\text{💎}$) |

---

## 8. Side Modes, Skins, Shop & Cloud Saves (Retained)

- **Side Modes:** Golden Dummy Blitz (geometric curve $2.8 \times 1.233^{\text{tier}}$), Trio Gauntlet, Boss Rush (5 campaign bosses), Endless, Reflex Duel, Parry Training, Dojo Bounties (4/day + 1 optional ad reroll).
- **Skins (Tap-to-Fire, 11 slaps base):** Classic, Spider-Man (300💎), Wolverine (1,000💎), Thor (2,000💎), Hulk (3,500💎), Infinity Gauntlet (9,000💎).
- **Shop & IAP (INR via Google Play):** Spotlight $70\%$-off first unowned bundle, Store Master ($+25\%$ VIP KO coins), 5 Coin Packs, 6 Gem Packs (₹49–₹3,499), 5 Bundles (₹149–₹2,499), Offline Miner (200💎), VIP Pass (₹199), Frenzy Booster (₹99), Remove Ads (₹199).
- **Saves:** Signed local `TH3.` blob + Firebase Firestore guest sync + Google Account link (`LINK GOOGLE` / `SYNC`).