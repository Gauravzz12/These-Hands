# IDLE SLAPPER — Complete Game Sheet (All Values)

**Balance:** v2.7.6 Ship-Ready Final Audited & Paced Specification · **App version string:** 2.7.6 · Balance v2.7.6
**Source:** audited, mathematically verified, and play-paced from the v2.6.6 live game code baseline (18 Nov 2026) — every formula, cap, boss mechanic, chapter entry transition, Hard Mode multiplier, and reserved `#51–#100` combat parameter is 100% self-consistent across Chapters 1–6 and post-game Worlds.
**Currencies:** 🪙 Coins (soft) · 💎 Gems (premium) · 🔥 Embers (Worlds currency)

---

## 1. Player Base & Derived Stats

| Stat | Base | Formula / per-level | Cap |
|---|---|---|---|
| Slap damage | 10 | $(10 + \text{Power} \times 2.2) \times 1.076^{\text{Power}} \times 1.28^{\lfloor \text{Power}/10 \rfloor}$, then skill/ability/skin/mastery multipliers | — |
| Attack interval | $1.5\text{s}$ | $1.5 \times 0.9801^{\text{Speed}}$ ($\times 0.5$ w/ Second Hand, $\times 0.90$ Quick Reflexes, $\times 0.85$ Dual-Hand, $\times 0.94$ Quickening) | final floor $0.499\text{s}$ · $0.35\text{s}$ with speed skin/relic/art · $0.30\text{s}$ in Frenzy/Time Stop/overdrive |
| Crit chance | $15\%$ | $+1\%$/Crit Chance level ($+5\%$ Critical Slaps, $+8\%$ Crit Surge) | $70\%$ — **overcap converts: each $+1\%$ over the cap adds $+8\%$ crit damage ($\times 8$ rule)** |
| Crit damage | $\times 2$ | $+0.05$ per Crit Damage level (+ overcap conversion, + Rakshasa Fang relic, + skin crit-dmg) | — |
| Combo | — | $4$ base stacks $+ 0.25$ stacks/Combo level ($+5$ Combo Mastery); each stack $+0.2\%$ dmg ($+0.5\%$ Combo Mastery $= 0.7\%$/stack) | $25$ stacks ($+17.5\%$ dmg at max build) |
| Coin multiplier | $\times 1$ | $+4\%$/Coin Mult. level ($\times 3.60$ at Lv 65) $\times 1.20$ Coin Magnet $\times 1.15$ Greed $\times 1.15$ Golden Aura ($\times 1.20$ Hard Stage Mastery, $\times 1.25$ VIP Pass, $\times 2$ while $2\times$ Coins ad runs) | **$\times 5.7132$** F2P base max · **$\times 6.8558$** w/ Hard Mastery · **$\times 8.5698$** w/ Hard Mastery + VIP |
| Accuracy (hit chance) | $85\%$ | $+1.786\%$/Accuracy level | $110\%$ |
| Boss damage | $\times 1$ | $+1.5\%$/Giant Slayer level | $+60\%$ from attribute ($\times$ Boss Bane $1.20$ and Boss Hunter skill on top) |
| Life Leech | 0 | $+0.06\%$ of **Player Max HP/s** per Vampirism level ($2.40\%$ Max HP/s at Lv 40), normalized per slap as $\min(0.015,\; 0.0006 \times \text{Vampirism\_Lv} \times \text{Interval}) \times \text{PlayerMaxHP}$ | **$2.40\%$ Max HP/s** ($1.50\%$ Max HP/slap ceiling; zero dead levels at $0.499\text{s}$ [$1.20\%$/slap] and $0.35\text{s}$ [$0.84\%$/slap]; Lv 39–40 cap at $1.50\%$/slap when interval $\ge 0.625\text{s}$) |
| Defense (damage reduction) | 0 | $+1\%$/Defense level | $40\%$ |
| Stun | $5\%$ chance | $+0.4\%$ chance and $+0.018\text{s}$ duration per Stun level | $25\%$ chance · $1.4\text{s}$ duration (bosses take $\frac{1}{2}$ stun; $4\text{s}$ stun cooldown, $2.5\text{s}$ immunity) |
| Fortune Luck (lucky strike) | 0 | $+0.5\%$/Luck level — a lucky slap pays $\times 1.5$ damage and $\times 2.5$ coins | $25\%$ |
| Player HP | 100 | $100 + 35 \times \text{Lv} + 220 \times \max(0, \text{Lv} - 20) + 1400 \times \max(0, \text{Lv} - 30)$ ($+75$ Stamina Training, $+3,500$ Unstoppable Hands, $+1,500$ Giant Stature, $+4,500$ Dragonblood Vigour, $\times 1.15$ Transcendent Hand) | — |

**Max-build reference *(v2.7.6)* (Lv 50, all attributes maxed, all 30 skills, including Second Hand & Transcendent Hand):**
- **Attack interval:** $0.499\text{s}$ standard max-build floor ($0.35\text{s}$ with speed skin/relic/art).
- **Un-procced base slap:** $1,353,839$ damage/slap (including `Stronger Hands ×1.20`, `Iron Palm ×1.20`, `Lv 50 Mastery ×1.60`, and `Transcendent Hand ×1.25`) $\rightarrow$ **$2,713,104$ raw base DPS** at $0.499\text{s}$ interval (before crits, combo, and skill procs).
- **Expected post-proc theoretical DPS:** **$\approx 39,300,869$ DPS** ($\approx 39.30\text{M}$ DPS, incorporating $70\%$ crit at $\times 6.04$, $25$-stack combo at $+17.5\%$, Seismic Slam, Heavy Slap, Rapid Barrage, Acoustic Echo, and Godhand Strike; excludes active/temporary buffs such as Frenzy, Precision Weak Spots, and Special Moves).
- **Survivability & utility:** Max HP $52,929$ · max leech sustain **$1,270\text{ HP/s}$ ($2.40\%$ Max HP/s)** at both $0.499\text{s}$ ($1.20\%$/slap) and $0.35\text{s}$ ($0.84\%$/slap) · coin $\times 5.7132$ F2P base ($\times 6.8558$ w/ Hard Mastery, $\times 8.5698$ w/ VIP) · boss $\times 1.92$ · defense $40\%$.

**Damage roll pipeline (per slap):** $\text{damage} \times \text{combo multiplier} \times \text{tag multiplier} \times \text{crit multiplier}$, where tag = Godhand Ultimate $\times 8$ (every 20 slaps) $\rightarrow$ Heavy Slap $12\%$ $\times 2.5$ $\rightarrow$ crit. Then $\times 1.25$ Boss Hunter (elites), $\times 1.35$ Colossus Bane (`#35+` & world guardians), $\times$ boss-damage multiplier vs elites/bosses. Rapid Barrage: every 6th slap adds 3 hits at $40\%$. Acoustic Echo: crits have $20\%$ chance to echo $+100\%$. Opportunist: $+35\%$ vs stunned (additive $1.55$ pool with Stronger Hands). Adrenaline Rush ($\le 30\%$ HP): $+25\%$ dmg, $\times 0.833$ interval. **$2\times$ Damage ad boost: $\times 2$.** Dragon Mastery: $\times 1.25$ (stage 1) / $\times 1.45$ (stage 2). Level mastery: $+2\%$ per player level above 20. Transcendent Hand (Lv 50): $\times 1.25$ global damage.

**Slap cycle:** windup $0.22\text{s}$ · strike $0.30\text{s}$ · hold $0.38\text{s}$ · recover $0.68\text{s}$ (scaled by interval). Second Hand alternates L/R, doubling cycle rate.

---

## 2. Levels, Level-Up Costs & Chapter Caps

**Level-up cost formula (piecewise, closed form):**
- Lv 1–10: log-interpolated $150 \rightarrow 55,369$ (exponent $1.065$)
- Lv 11–40: $55,369 \times 1.35^{\text{Lv} - 10}$
- Lv 41–44: $450,069,657 \times 1.25^{\text{Lv} - 40}$
- Lv 45–49: $1,210,000,000 \times 1.10435^{\text{Lv} - 45}$ · Lv 50 = cap

| Lv $\rightarrow$ Lv+1 cost | | | | |
|---|---|---|---|---|
| 1$\rightarrow$2: **150** | 2$\rightarrow$3: **265** | 3$\rightarrow$4: **494** | 4$\rightarrow$5: **939** | 5$\rightarrow$6: **1,813** |
| 6$\rightarrow$7: **3,539** | 7$\rightarrow$8: **6,967** | 8$\rightarrow$9: **13,818** | 9$\rightarrow$10: **27,582** | 10$\rightarrow$11: **55,369** |
| 11$\rightarrow$12: **74,748** | 12$\rightarrow$13: **100,910** | 13$\rightarrow$14: **136,229** | 14$\rightarrow$15: **183,908** | 15$\rightarrow$16: **248,276** |
| 16$\rightarrow$17: **335,173** | 17$\rightarrow$18: **452,484** | 18$\rightarrow$19: **610,853** | 19$\rightarrow$20: **824,652** | 20$\rightarrow$21: **1,113,280** |
| 21$\rightarrow$22: **1,502,928** | 22$\rightarrow$23: **2,028,953** | 23$\rightarrow$24: **2,739,086** | 24$\rightarrow$25: **3,697,766** | 25$\rightarrow$26: **4,991,984** |
| 26$\rightarrow$27: **6,739,179** | 27$\rightarrow$28: **9,097,891** | 28$\rightarrow$29: **12,282,153** | 29$\rightarrow$30: **16,580,907** | 30$\rightarrow$31: **22,384,224** |
| 31$\rightarrow$32: **30,218,703** | 32$\rightarrow$33: **40,795,249** | 33$\rightarrow$34: **55,073,586** | 34$\rightarrow$35: **74,349,341** | 35$\rightarrow$36: **100,371,610** |
| 36$\rightarrow$37: **135,501,674** | 37$\rightarrow$38: **182,927,260** | 38$\rightarrow$39: **246,951,801** | 39$\rightarrow$40: **333,384,931** | 40$\rightarrow$41: **450,069,657** |
| 41$\rightarrow$42: **562,587,160** | 42$\rightarrow$43: **703,233,950** | 43$\rightarrow$44: **879,042,438** | 44$\rightarrow$45: **1,098,803,047** | 45$\rightarrow$46: **1,210,000,000** |
| 46$\rightarrow$47: **1,336,263,500** | 47$\rightarrow$48: **1,475,702,596** | 48$\rightarrow$49: **1,629,692,162** | 49$\rightarrow$50: **1,799,750,539** | |

**Chapter caps** — player level and every attribute are capped per chapter; over-cap progress is kept, not lost. General gate on top: no attribute above $2 \times \text{player level}$ ($+5$ per Dragon Mastery stage).

| Chapter | Unlock | Max player Lv | Max Power | Other attribute caps |
|---|---|---|---|---|
| Start | — | 10 | 12 | speed 8 · critChance 10 · critDamage 12 · combo 12 · coinMult 12 · defense 10 · bossDamage 10 · vampirism 10 · stun 10 · luck 10 · accuracy 4 |
| Ch. 2 | Defeat #10 (Monkey) | 18 | 24 | speed 13 · critChance 18 · critDamage 22 · combo 22 · coinMult 22 · defense 18 · bossDamage 18 · vampirism 18 · stun 18 · luck 18 · accuracy 6 |
| Ch. 3 | Defeat #20 (Dark Knight) | 26 | 36 | speed 18 · critChance 26 · critDamage 32 · combo 32 · coinMult 32 · defense 26 · bossDamage 26 · vampirism 26 · stun 26 · luck 26 · accuracy 8 |
| Ch. 4 | Defeat #30 (Shogun) | 33 | 48 | speed 21 · critChance 33 · critDamage 42 · combo 42 · coinMult 42 · defense 32 · bossDamage 32 · vampirism 32 · stun 34 · luck 34 · accuracy 11 |
| Ch. 5 | Defeat #40 (Pharaoh) | 38 | 60 | speed 23 · critChance 39 · critDamage 52 · combo 52 · coinMult 52 · defense 36 · bossDamage 36 · vampirism 36 · stun 42 · luck 42 · accuracy 13 |
| Ch. 6 | Defeat #50 (Dragon Lord) | 44 | 70 | speed 25 · critChance 45 · critDamage 60 · combo 60 · coinMult 60 · defense 40 · bossDamage 40 · vampirism 40 · stun 47 · luck 47 · accuracy 14 |
| Final | Defeat Ravana (Asura Realm) | 50 | 80 | speed 25 · critChance 45 · critDamage 65 · combo 65 · coinMult 65 · defense 40 · bossDamage 40 · vampirism 40 · stun 50 · luck 50 · accuracy 14 |

---

## 3. Attributes (12) — Costs

**Cost formula (steepened log curve):**
$$\text{cost}(L \rightarrow L+1) = \exp\left( \ln(\text{base}) + (\ln(\text{maxCost}) - \ln(\text{base})) \times \left(\frac{L}{\text{maxLv} - 1}\right)^{1.11} \right)$$
First level = base cost, final level = max cost.

| Attribute | Effect per level | Base cost | Final-level cost | Max Lv | Cost @ Lv 10 | @ Lv 25 | @ Lv 50 |
|---|---|---|---|---|---|---|---|
| Power | +dmg (see §1) | 80 | 45,000,000,000 | 80 | 610 | 21,986 | 14,730,270 |
| Speed | interval $\times 0.9801$ | 110 | 180,000,000 | 25 | 24,845 | — | — |
| Crit Chance | $+1\%$ crit chance | 130 | 3,200,000,000 | 45 | 3,477 | 1,148,015 | — |
| Crit Damage | $+0.05$ crit mult | 90 | 6,500,000,000 | 65 | 902 | 53,061 | 85,157,120 |
| Defense | $+1\%$ dmg reduction | 180 | 2,800,000,000 | 40 | 6,964 | 4,394,540 | — |
| Stun | $+0.4\%$ chance, $+0.018\text{s}$ | 130 | 3,500,000,000 | 50 | 2,438 | 430,835 | — |
| Combo | $+0.25$ stacks, $+0.2\%$/stack | 75 | 6,000,000,000 | 65 | 761 | 45,841 | 76,681,450 |
| Coin Mult. | $+4\%$ coins | 80 | 6,500,000,000 | 65 | 814 | 49,165 | 82,784,910 |
| Accuracy | $+1.7857\%$ hit chance | 150 | 1,800,000,000 | 14 | 29,340,680 | — | — |
| Giant Slayer | $+1.5\%$ boss dmg | 180 | 2,800,000,000 | 40 | 6,964 | 4,394,540 | — |
| Life Leech | $+0.06\%$ Max HP/s (interval-scaled/slap) | 260 | 3,600,000,000 | 40 | 9,803 | 5,916,890 | — |
| Fortune Luck | $+0.5\%$ lucky chance | 140 | 3,800,000,000 | 50 | 2,630 | 465,785 | — |

---

## 4. Combat Systems

**FRENZY** (Frenzy skill): charges after **35 slaps** while Frenzy is inactive (slaps during active Frenzy do not build charge, preventing permanent uptime) $\rightarrow$ $10\text{s}$ of $\times 1.5$ damage and $\times 1.3$ speed ($36.4\%$ max uptime at $0.499\text{s}$ interval, $44.9\%$ at $0.35\text{s}$). Frenzy Overcharge booster (₹99): charges $25\%$ faster (**$26$ inactive slaps**), lasts $13\text{s}$ (**$50.1\%$ uptime at $0.499\text{s}$**, **$58.8\%$ at $0.35\text{s}$**).
**TIME STOP** (world art): $5\text{s}$, $\times 1.3$ damage, $\times 1.5$ speed.
**PRECISION STRIKE / weak spots** (Precision Instinct): gold spot flashes (first at $2.2\text{s}$, then every $5\text{–}8\text{s}$, more often with Luck) — tap it within $1.5\text{s}$ ($1.2\text{s}$ on Hard) for $\times 4.5$ damage. Max 3 per fight $+1$ per 15 Luck (max 6). Grants $+12$ Frenzy charge (when inactive).
**PARRY** (Deflect skill): tap PARRY as an enemy attack lands — $0.3\text{s}$ window (Iron Stance III: $0.5\text{s}$) negates $100\%$ and answers with a $\times 1.5$ Counter-Slap. Cooldown $10\text{s} \rightarrow 8\text{s}$ (Iron Stance I) $\rightarrow 5\text{s}$ (Iron Stance II). Whiffed parry still spends the cooldown. **Signature moves are $100\%$ unblockable** — they pierce Parry and Guard without consuming them.
**REFLECT SHIELDS:** any enemy shield that reflects player slap damage (such as Dark Knight's *Iron Bulwark*) displays a $0.8\text{s}$ `"SHIELD UP!"` telegraph before activating, caps reflected damage per slap at $\min(0.10 \times \text{PreMitigationSlapDmg},\; 0.08 \times \text{PlayerMaxHP})$, is mitigated by `Defense` and `Thick Skin`, and is **non-lethal** (cannot drop Player HP below $1\text{ HP}$).
**ENEMY ENRAGE:** below $40\%$ HP, bosses attack $\times 0.8$ interval and $\times 1.1$ damage, with an $8\text{s}$ grace after a heal. Boss intro card: $1.8\text{s}$.
**ENEMY ATTACKS:** interval from the roster table (elites $\times 0.88$, floor $1\text{s}$); every 3rd attack is the boss's signature (see §6) for main campaign & World bosses, and every 4th attack for reserved `#60–#100` bosses.

---

## 5. Enemy Roster — Main 50 *(v2.7.6 Smoothed Stage & Chapter Entry Pacing)*

Stages are groups of 5. Even-stage `#5` (`#10, #20, #30, #40, #50`) is the **Chapter Boss (`👑 BOSS ELITE`)**; odd-stage `#5` (`#5, #15, #25, #35, #45`) is a **Mini-Boss (`MINI ELITE`)**; `#9/#19/#29/#39/#49` is an **Elite (`ELITE`)**. All 10 stage enders (`#5, #10, ..., #50`) award first-clear chests (see §6). Bounty = base KO bounty before the $\times 1.30$ kill multiplier and coin multipliers (see §10). **Slap Cap (Frontier / Repeat)** = exact fight slap-coin cap fraction (`bounty × capFrac`) used in §10 ($2.00 / 1.75$ for `#1–#10`, $1.35 / 0.85$ for `#11–#100`).

| # | Enemy | Stage | HP | ATK DMG | ATK int. | Bounty | Slap Cap (F / R) | Flags |
|---|---|---|---|---|---|---|---|---|
| 1 | Training Dummy | 1. Cozy Corner | 65 | 8 | $2.4\text{s}$ | 72 | $2.00 / 1.75$ |  |
| 2 | Rubber Duck | 1. Cozy Corner | 115 | 11 | $2.35\text{s}$ | 105 | $2.00 / 1.75$ |  |
| 3 | Rubber Chicken | 1. Cozy Corner | 195 | 14 | $2.3\text{s}$ | 154 | $2.00 / 1.75$ |  |
| 4 | Cardboard Knight | 1. Cozy Corner | 340 | 18 | $2.25\text{s}$ | 227 | $2.00 / 1.75$ |  |
| 5 | Grumpy Teddy | 1. Cozy Corner | 650 | 25 | $2.05\text{s}$ | 381 | $2.00 / 1.75$ | MINI ELITE |
| 6 | Sassy Goblin Sprout | 2. Backyard Bunch | 920 | 28 | $2.2\text{s}$ | 514 | $2.00 / 1.75$ |  |
| 7 | Mime | 2. Backyard Bunch | 1,450 | 33 | $2.15\text{s}$ | 742 | $2.00 / 1.75$ |  |
| 8 | Cocky Goose | 2. Backyard Bunch | 2,350 | 39 | $2.1\text{s}$ | 1,070 | $2.00 / 1.75$ |  |
| 9 | Trash Panda | 2. Backyard Bunch | 4,200 | 48 | $2.05\text{s}$ | 1,622 | $2.00 / 1.75$ | ELITE |
| 10 | Mischievous Monkey | 2. Backyard Bunch | 8,500 | 40 | $1.95\text{s}$ | 2,530 | $2.00 / 1.75$ | 👑 BOSS ELITE |
| 11 | Bodybuilder *(v2.7.6)* | 3. Fight Club | 15,235 | 57 | $2.13\text{s}$ | 3,834 | $1.35 / 0.85$ |  |
| 12 | Luchador Wrestler *(v2.7.6)* | 3. Fight Club | 22,547 | 65 | $2.1\text{s}$ | 5,247 | $1.35 / 0.85$ |  |
| 13 | Kickboxer | 3. Fight Club | 44,688 | 98 | $2.08\text{s}$ | 7,167 | $1.35 / 0.85$ |  |
| 14 | Adult Boxer *(v2.7.6)* | 3. Fight Club | 61,200 | 110 | $2.05\text{s}$ | 9,790 | $1.35 / 0.85$ |  |
| 15 | Sumo Champion | 3. Fight Club | 85,000 | 132 | $2.03\text{s}$ | 14,535 | $1.35 / 0.85$ | MINI ELITE |
| 16 | Castle Guard | 4. Castle Guard | 149,500 | 127 | $2.0\text{s}$ | 19,180 | $1.35 / 0.85$ |  |
| 17 | Royal Executioner *(v2.7.6)* | 4. Castle Guard | 168,000 | 138 | $1.98\text{s}$ | 25,837 | $1.35 / 0.85$ |  |
| 18 | Knight *(v2.7.6)* | 4. Castle Guard | 189,000 | 150 | $1.95\text{s}$ | 34,724 | $1.35 / 0.85$ |  |
| 19 | Barbarian | 4. Castle Guard | 262,500 | 152 | $1.93\text{s}$ | 40,780 | $1.35 / 0.85$ | ELITE |
| 20 | Dark Knight | 4. Castle Guard | 540,000 | 104 | $1.84\text{s}$ | 48,450 | $1.35 / 0.85$ | 👑 BOSS ELITE |
| 21 | Skeleton Warrior *(v2.7.6)* | 5. Graveyard Shift | 552,825 | 138 | $1.88\text{s}$ | 46,500 | $1.35 / 0.85$ | evasion $5\%$ |
| 22 | Zombie *(v2.7.6)* | 5. Graveyard Shift | 737,100 | 154 | $1.86\text{s}$ | 60,000 | $1.35 / 0.85$ | evasion $5\%$ |
| 23 | Armored Skeleton | 5. Graveyard Shift | 1,316,250 | 231 | $1.84\text{s}$ | 78,000 | $1.35 / 0.85$ | evasion $5\%$ |
| 24 | Scarab Swarm *(v2.7.6)* | 5. Graveyard Shift | 1,341,360 | 260 | $1.82\text{s}$ | 101,250 | $1.35 / 0.85$ | evasion $5\%$ |
| 25 | Mummy Guard | 5. Graveyard Shift | 1,863,000 | 305 | $1.79\text{s}$ | 138,750 | $1.35 / 0.85$ | MINI ELITE evasion $6\%$ |
| 26 | Ninja Recruit | 6. Shadow Dojo | 3,071,250 | 325 | $1.77\text{s}$ | 180,000 | $1.35 / 0.85$ | evasion $6\%$ |
| 27 | Shuriken Master *(v2.7.6)* | 6. Shadow Dojo | 3,160,000 | 359 | $1.75\text{s}$ | 234,000 | $1.35 / 0.85$ | evasion $6\%$ |
| 28 | Samurai Duelist *(v2.7.6)* | 6. Shadow Dojo | 3,256,200 | 398 | $1.73\text{s}$ | 303,750 | $1.35 / 0.85$ | evasion $6\%$ |
| 29 | Shadow Assassin | 6. Shadow Dojo | 4,522,500 | 439 | $1.71\text{s}$ | 393,750 | $1.35 / 0.85$ | ELITE evasion $8\%$ |
| 30 | Shogun Warlord | 6. Shadow Dojo | 7,800,000 | 313 | $1.63\text{s}$ | 510,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $8\%$ |
| 31 | Werewolf *(v2.7.6)* | 7. Dark Woods | 4,552,275 | 451 | $1.67\text{s}$ | 731,000 | $1.35 / 0.85$ | evasion $10\%$ |
| 32 | Giant Spider *(v2.7.6)* | 7. Dark Woods | 6,036,713 | 518 | $1.65\text{s}$ | 939,080 | $1.35 / 0.85$ | evasion $10\%$ |
| 33 | Orc Warrior | 7. Dark Woods | 10,819,900 | 794 | $1.63\text{s}$ | 1,210,400 | $1.35 / 0.85$ | evasion $10\%$ |
| 34 | Bog Witch *(v2.7.6)* | 7. Dark Woods | 10,962,000 | 913 | $1.61\text{s}$ | 1,563,320 | $1.35 / 0.85$ | evasion $10\%$ |
| 35 | Shadow Beast | 7. Dark Woods | 15,225,000 | 1,067 | $1.59\text{s}$ | 2,080,120 | $1.35 / 0.85$ | MINI ELITE evasion $10\%$ |
| 36 | Giant Serpent | 8. Pharaoh's Tomb | 25,070,500 | 1,191 | $1.57\text{s}$ | 2,647,920 | $1.35 / 0.85$ | evasion $10\%$ |
| 37 | Anubis Warrior *(v2.7.6)* | 8. Pharaoh's Tomb | 25,320,000 | 1,338 | $1.55\text{s}$ | 3,341,520 | $1.35 / 0.85$ | evasion $10\%$ |
| 38 | Sphinx Riddler *(v2.7.6)* | 8. Pharaoh's Tomb | 25,578,000 | 1,497 | $1.53\text{s}$ | 4,160,920 | $1.35 / 0.85$ | evasion $10\%$ |
| 39 | Giant Scorpion | 8. Pharaoh's Tomb | 35,525,000 | 1,678 | $1.51\text{s}$ | 5,043,560 | $1.35 / 0.85$ | ELITE evasion $12\%$ |
| 40 | Pharaoh Revenant | 8. Pharaoh's Tomb | 65,000,000 | 1,871 | $1.44\text{s}$ | 6,052,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $12\%$ |
| 41 | Troll *(v2.7.6)* | 9. Mountain Stronghold | 58,183,125 | 1,644 | $1.48\text{s}$ | 7,192,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 42 | Ogre *(v2.7.6)* | 9. Mountain Stronghold | 75,109,125 | 1,790 | $1.46\text{s}$ | 8,680,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 43 | Minotaur *(v2.7.6)* | 9. Mountain Stronghold | 96,500,000 | 2,607 | $1.44\text{s}$ | 10,540,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 44 | Cyclops *(v2.7.6)* | 9. Mountain Stronghold | 118,742,400 | 2,851 | $1.42\text{s}$ | 12,772,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 45 | Stone Golem | 9. Mountain Stronghold | 164,920,000 | 3,142 | $1.4\text{s}$ | 15,872,000 | $1.35 / 0.85$ | MINI ELITE evasion $12\%$ |
| 46 | Elder Dragon | 10. Dragon Lair | 275,047,500 | 3,386 | $1.4\text{s}$ | 18,848,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 47 | Dragon Champion *(v2.7.6)* | 10. Dragon Lair | 291,500,000 | 3,654 | $1.4\text{s}$ | 22,320,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 48 | Crystal Dragon *(v2.7.6)* | 10. Dragon Lair | 308,574,000 | 3,947 | $1.4\text{s}$ | 26,288,000 | $1.35 / 0.85$ | evasion $12\%$ |
| 49 | Ancient Dragon | 10. Dragon Lair | 428,575,000 | 4,263 | $1.4\text{s}$ | 30,504,000 | $1.35 / 0.85$ | ELITE evasion $14\%$ |
| 50 | Dragon Lord | 10. Dragon Lair | 760,000,000 | 3,850 | $1.4\text{s}$ | 35,340,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $15\%$ |

**Curve anchors (v2.7.6):** HP $65 \rightarrow 760,000,000$ (Dragon Lord) · ATK $8 \rightarrow 3,850$ (Dragon Lord) · Bounty $72 \rightarrow 35,340,000$. Chapter 1 (`#1–#10`) preserves baseline HP/ATK with $+15\%$ bounty; Chapters 2–5 (`#11–#50`) ease the first 2 entry enemies of each chapter by $-25\%$ HP/ATK (`#11–#12`, `#21–#22`, `#31–#32`, `#41–#42`) and cap `#4` / `#8` normal HP at $0.72 \times$ the following `#5` / `#9` Elite HP so every stage escalates smoothly into its mini-boss/boss.

### Reserved roster `#51–#100` *(World-Relic Endgame Curve)*
*(In code, gated behind the "Stronger Challengers" coming-soon wall — scaled at $\times 1.0781$ HP/step, $\times 1.0080$ ATK/step, $\times 1.0781$ Bounty/step. Tiers `#90–#100` are tuned for **Lv 50 + World Relics (`Slumber Bell` & `Puppet Strings` Lv 2–3)**, yielding a `~10–12 min` clear with Relics + $2\times$ Ad vs. a `~18.1 min` raw Lv 50 baseline.)*

| # | Enemy | HP | ATK DMG | ATK int. | Bounty | Slap Cap (F / R) | Flags |
|---|---|---|---|---|---|---|---|
| 51 | Frost Wolf Alpha | 840,000,000 | 3,850 | $1.38\text{s}$ | 39,000,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 52 | Ice Witch | 906,000,000 | 3,881 | $1.37\text{s}$ | 42,000,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 53 | Snow Golem | 976,000,000 | 3,912 | $1.37\text{s}$ | 45,300,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 54 | Yeti Brute | 1,053,000,000 | 3,943 | $1.36\text{s}$ | 48,900,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 55 | Glacier Titan | 1,135,000,000 | 3,975 | $1.35\text{s}$ | 52,700,000 | $1.35 / 0.85$ | MINI ELITE evasion $15\%$ |
| 56 | Raptor Rascal | 1,223,000,000 | 4,007 | $1.35\text{s}$ | 56,800,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 57 | Triceratops Tank | 1,319,000,000 | 4,039 | $1.34\text{s}$ | 61,300,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 58 | Pterodactyl Diver | 1,422,000,000 | 4,071 | $1.33\text{s}$ | 66,000,000 | $1.35 / 0.85$ | evasion $15\%$ |
| 59 | Spinosaurus Brute | 1,533,000,000 | 4,104 | $1.33\text{s}$ | 71,200,000 | $1.35 / 0.85$ | ELITE evasion $16\%$ |
| 60 | T-Rex King | 1,653,000,000 | 4,136 | $1.32\text{s}$ | 76,800,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $16\%$ |
| 61 | Fire Elemental | 1,782,000,000 | 4,170 | $1.31\text{s}$ | 82,800,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 62 | Ice Golem | 1,921,000,000 | 4,203 | $1.31\text{s}$ | 89,200,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 63 | Demon Warrior | 2,071,000,000 | 4,237 | $1.30\text{s}$ | 96,200,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 64 | Demon Brute | 2,232,000,000 | 4,270 | $1.29\text{s}$ | 103,700,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 65 | Cerberus | 2,407,000,000 | 4,305 | $1.29\text{s}$ | 111,800,000 | $1.35 / 0.85$ | MINI ELITE evasion $16\%$ |
| 66 | Satyr Trickster | 2,595,000,000 | 4,339 | $1.28\text{s}$ | 120,600,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 67 | Centaur Archer | 2,797,000,000 | 4,374 | $1.27\text{s}$ | 130,000,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 68 | Griffon | 3,016,000,000 | 4,409 | $1.27\text{s}$ | 140,200,000 | $1.35 / 0.85$ | evasion $16\%$ |
| 69 | Medusa | 3,251,000,000 | 4,444 | $1.26\text{s}$ | 151,100,000 | $1.35 / 0.85$ | ELITE evasion $17\%$ |
| 70 | Zeus Thunderer | 3,505,000,000 | 4,480 | $1.25\text{s}$ | 162,900,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $17\%$ |
| 71 | Rusty Bot | 3,779,000,000 | 4,515 | $1.25\text{s}$ | 175,700,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 72 | Welder Drone | 4,074,000,000 | 4,552 | $1.24\text{s}$ | 189,400,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 73 | Crusher Mech | 4,392,000,000 | 4,588 | $1.23\text{s}$ | 204,200,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 74 | Sawblade Sentinel | 4,735,000,000 | 4,625 | $1.23\text{s}$ | 220,200,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 75 | Factory Overlord | 5,104,000,000 | 4,662 | $1.22\text{s}$ | 237,400,000 | $1.35 / 0.85$ | MINI ELITE evasion $17\%$ |
| 76 | Little Grey | 5,503,000,000 | 4,699 | $1.21\text{s}$ | 255,900,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 77 | Martian Soldier | 5,932,000,000 | 4,737 | $1.20\text{s}$ | 275,900,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 78 | UFO Pilot | 6,396,000,000 | 4,774 | $1.20\text{s}$ | 297,500,000 | $1.35 / 0.85$ | evasion $17\%$ |
| 79 | Xeno Hunter | 6,895,000,000 | 4,813 | $1.19\text{s}$ | 320,800,000 | $1.35 / 0.85$ | ELITE evasion $18\%$ |
| 80 | Alien Warlord | 7,433,000,000 | 4,851 | $1.18\text{s}$ | 345,800,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $18\%$ |
| 81 | Ancient Guardian | 8,014,000,000 | 4,890 | $1.18\text{s}$ | 372,900,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 82 | Crystal Titan | 8,639,000,000 | 4,929 | $1.17\text{s}$ | 402,000,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 83 | Void Knight | 9,314,000,000 | 4,969 | $1.16\text{s}$ | 433,400,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 84 | Storm Giant | 10,041,000,000 | 5,008 | $1.16\text{s}$ | 467,300,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 85 | Phoenix | 10,825,000,000 | 5,048 | $1.15\text{s}$ | 503,800,000 | $1.35 / 0.85$ | MINI ELITE evasion $18\%$ |
| 86 | Bubble Crab | 11,670,000,000 | 5,089 | $1.14\text{s}$ | 543,200,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 87 | Sailor Squid | 12,581,000,000 | 5,129 | $1.14\text{s}$ | 585,600,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 88 | Hammerhead Brawler | 13,563,000,000 | 5,171 | $1.13\text{s}$ | 631,400,000 | $1.35 / 0.85$ | evasion $18\%$ |
| 89 | Angler Horror | 14,622,000,000 | 5,212 | $1.12\text{s}$ | 680,700,000 | $1.35 / 0.85$ | ELITE evasion $19\%$ |
| 90 | Kraken Spawn | 15,764,000,000 | 5,254 | $1.12\text{s}$ | 733,900,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $19\%$ |
| 91 | Void Walker | 16,994,000,000 | 5,296 | $1.11\text{s}$ | 791,300,000 | $1.35 / 0.85$ | evasion $19\%$ |
| 92 | Star Eater | 18,321,000,000 | 5,338 | $1.10\text{s}$ | 853,100,000 | $1.35 / 0.85$ | evasion $19\%$ |
| 93 | Nebula Serpent | 19,752,000,000 | 5,381 | $1.10\text{s}$ | 919,800,000 | $1.35 / 0.85$ | evasion $19\%$ |
| 94 | Dark Matter Knight | 21,294,000,000 | 5,424 | $1.09\text{s}$ | 991,700,000 | $1.35 / 0.85$ | evasion $19\%$ |
| 95 | Eldritch Horror | 22,956,000,000 | 5,467 | $1.08\text{s}$ | 1,069,200,000 | $1.35 / 0.85$ | MINI ELITE evasion $20\%$ |
| 96 | Celestial Knight | 24,749,000,000 | 5,511 | $1.08\text{s}$ | 1,152,700,000 | $1.35 / 0.85$ | evasion $20\%$ |
| 97 | Archangel of War | 26,681,000,000 | 5,555 | $1.07\text{s}$ | 1,242,800,000 | $1.35 / 0.85$ | evasion $20\%$ |
| 98 | Seraphim Judge | 28,764,000,000 | 5,599 | $1.06\text{s}$ | 1,339,900,000 | $1.35 / 0.85$ | evasion $20\%$ |
| 99 | The Gatekeeper | 31,010,000,000 | 5,644 | $1.06\text{s}$ | 1,444,600,000 | $1.35 / 0.85$ | ELITE evasion $20\%$ |
| 100 | The Almighty Hand | 33,310,000,000 | 5,689 | $1.05\text{s}$ | 1,550,000,000 | $1.35 / 0.85$ | 👑 BOSS ELITE evasion $20\%$ |

---

## 6. Bosses — Signatures, Heals, First-Clear Chests

**Signature moves** (every 3rd attack on `#10–#50` and World bosses; **every 4th attack** on reserved `#60–#100` bosses; all unblockable):

| Boss | Signature | Effect |
|---|---|---|
| Monkey (#10) | BANANA SLING | Accuracy $-40\%$ for $5\text{s}$ — your slaps can MISS! |
| Dark Knight (#20) | IRON BULWARK | $0.8\text{s}$ telegraph, then absorbs 6 slaps at $65\%$ damage and reflects $10\%$ back, capped at $8\%$ of Player Max HP per slap (mitigated by Defense/Thick Skin, non-lethal)! |
| Shogun (#30) | KATANA OMNISLASH | Unblockable blade strike dealing $1.5\times$ damage and $1.5\text{s}$ stagger — Parry and Guard cannot stop it! |
| Pharaoh (#40) | PHARAOH'S SAND CURSE | Ancient sands reduce your slap speed by $35\%$ for $5\text{s}$! |
| Dragon Lord (#50) | DRAGON HELLFIRE | Unblockable caldera blaze burns for $1.2\%$ of your Max HP per second over $5\text{s}$! |
| Kumbhakaran (Asura 3) | SEISMIC STOMP | A colossal stomp dealing $2\times$ damage and stunning your slaps for $1\text{s}$! |
| Ravana (Asura 6) | CHANDRAHASA STRIKE | Unblockable moon-blade strike — $1.75\times$ damage, a $1\text{s}$ stagger, and $-20\%$ healing for $5\text{s}$! |
| Umbral Puppeteer (Shadow 3) | MARIONETTE GRIP | Strings weave into a barrier — absorbs 5 slaps at $50\%$ damage and slows your slaps by $20\%$! |
| Dark Slapper (Shadow 6) | COUNTER SLAP | Unblockable perfected slap, returned — $1.75\times$ damage, a $1.2\text{s}$ stagger, and strips your shields! |
| T-Rex King (#60) *(reserved)* | PRIMAL ROAR | Every 4th attack: deafening apex roar dealing $1.6\times$ damage and reducing Crit Chance by $25\%$ for $5\text{s}$! |
| Zeus Thunderer (#70) *(reserved)* | OLYMPIAN BOLT | Every 4th attack: unblockable lightning strike dealing $1.6\times$ damage and stunning slaps for $1.0\text{s}$! |
| Alien Warlord (#80) *(reserved)* | GRAVITY WELL | Every 4th attack: deals $1.6\times$ damage and slows attack speed by $30\%$ for $4\text{s}$! |
| Kraken Spawn (#90) *(reserved)* | ABYSSAL CRUSH | Every 4th attack: tentacle slam dealing $1.6\times$ damage and reducing Life Leech sustain by $25\%$ for $4\text{s}$! |
| The Almighty Hand (#100) *(reserved)* | DIVINE JUDGMENT | Every 4th attack: unblockable celestial palm dealing $1.6\times$ damage, stripping shields, and inflicting a $1.0\text{s}$ stagger! |

**Boss heals:**

- **Monkey (#10) — BANANA FEAST:** The Monkey King gorges mid-fight — heals $15\%$ of his HP at $60\%$ and $30\%$ HP (max $2\times$ per fight).
- **Dark Knight (#20) — DARK RENEWAL:** Darkness knits his wounds shut — heals $15\%$ of his HP at $60\%$ and $30\%$ HP (max $2\times$ per fight).
- **Shogun (#30) — RONIN'S RESOLVE:** A warrior's second breath — heals $15\%$ of his HP at $60\%$ and $30\%$ HP (max $2\times$ per fight).
- **Pharaoh (#40) — ETERNAL RENEWAL:** The tomb restores him — heals $15\%$ of his HP at $60\%$ and $30\%$ HP (max $2\times$ per fight).
- **Dragon Lord (#50) — DRAGON RENEWAL:** Ancient blood knits shut — heals $15\%$ of his HP at $60\%$ and $30\%$ HP (max $2\times$ per fight).
- **Kumbhakaran (Asura 3) — AMRITA OF THE NAVEL:** The nectar of immortality — heals $15\%$ of his HP, once at $50\%$ HP.
- **Ravana (Asura 6) — AMRITA OF THE NAVEL:** The nectar of immortality — heals $15\%$ of his HP, once at $50\%$ HP.
- **Umbral Puppeteer (Shadow 3) — MARIONETTE MENDING:** The puppeteer re-strings its champion — heals $15\%$ of its HP, once at $50\%$ HP.
- **Dark Slapper (Shadow 6) — SHADOW RENEWAL:** The shadow knits itself whole — heals $15\%$ of his HP, once at $50\%$ HP.
- **Reserved Bosses (`#60, #70, #80, #90, #100`) — TITANIC REGENERATION:** Heals $15\%$ of Max HP once at $50\%$ HP.

**First-clear chests** (paid once, on first defeating each stage's `#5` Mini-Boss or Boss):

| Enemy # | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|
| Reward | 250 🪙 + 2 💎 | 2,500 🪙 + 5 💎 | 15,000 🪙 + 2 💎 | 75,000 🪙 + 5 💎 | 300,000 🪙 + 2 💎 | 1,500,000 🪙 + 5 💎 | 8,000,000 🪙 + 3 💎 | 50,000,000 🪙 + 5 💎 | 175,000,000 🪙 + 3 💎 | 900,000,000 🪙 + 10 💎 |

| Reserved # | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100 |
|---|---|---|---|---|---|---|---|---|---|---|
| Reward | 1.2B 🪙 + 3 💎 | 1.8B 🪙 + 5 💎 | 2.6B 🪙 + 3 💎 | 3.8B 🪙 + 5 💎 | 5.5B 🪙 + 4 💎 | 8.0B 🪙 + 6 💎 | 11.5B 🪙 + 4 💎 | 17.0B 🪙 + 8 💎 | 25.0B 🪙 + 5 💎 | 40.0B 🪙 + 15 💎 |

**Gem drops:** elite kill = 1 💎 · stage boss = 3 💎 · Dragon Lord = 100 💎 · Treasure Hunter skill: $+1$ 💎 on elite/boss kills and $+25\%$ coins from them.

---

## 7. Skills Tree (30 skills)

| Tier | Skill | Cost 🪙 | Requires | Boss gate | Effect |
|---|---|---|---|---|---|
| 1 | Basic Slap | 0 | — | — | The slap everything starts with. Already yours. |
| 1 | Stronger Hands | 750 | Basic Slap | — | $+20\%$ damage on every slap. |
| 1 | Stamina Training | 300 | Basic Slap | — | $+75$ max HP. |
| 1 | Second Hand | 1,000 | Basic Slap | #5 | Alternates L / R hands, doubling your cycle rate. |
| 2 | Twin Mastery | 3,200 | Second Hand | — | Off-hand slaps strike $+25\%$ faster and grant $+10\%$ combo charge. |
| 2 | On Target | 6,500 | Twin Mastery | — | Combo stacks survive switching enemies (resets on loss). |
| 2 | Quick Reflexes | 15,000 | Twin Mastery | #10 | $+10\%$ attack speed. |
| 2 | Critical Slaps | 35,000 | Stronger Hands | — | $+5\%$ crit chance. |
| 2 | Seismic Slam | 55,000 | Stamina Training | #10 | Every 5th slap lands a devastating SEISMIC SLAM dealing $3\times$ damage and dazing the enemy for $0.8\text{s}$! |
| 2 | Heavy Slap | 90,000 | Stronger Hands | #10 | $12\%$ chance a slap lands HEAVY for $2.5\times$ damage. |
| 2 | Precision Instinct | 140,000 | Stronger Hands | #10 | Unlocks PRECISION strikes: a gold weak spot flashes on the enemy mid-fight — tap it for a devastating $4.5\times$ critical strike! Fortune Luck makes it appear more often. Max 3 per fight ($+1$ per 15 Luck, max 6). |
| 2 | Deflect | 22,000 | Basic Slap | — | Unlocks PARRY: tap the PARRY button the instant an enemy attack lands ($0.30\text{s}$ window) to negate $100\%$ of it and answer with a $1.5\times$ Counter-Slap. $10\text{s}$ cooldown. Signature Moves are UNBLOCKABLE — they cannot be parried and pierce Guard. |
| 3 | Combo Mastery | 540,000 | On Target | #10 | Combo cap $+5$ stacks and $+0.5\%$ damage per stack. |
| 3 | Opportunist | 1,080,000 | Quick Reflexes | — | Slaps deal $+35\%$ damage to Stunned enemies. |
| 3 | Adrenaline Rush | 1,980,000 | Seismic Slam | — | Below $30\%$ HP: gain $+20\%$ attack speed and $+25\%$ damage. |
| 3 | Coin Magnet | 3,600,000 | Critical Slaps | #20 | $+20\%$ coins from every KO. |
| 3 | Boss Hunter | 6,840,000 | Heavy Slap | #20 | $+25\%$ damage vs group elites and bosses. |
| 4 | Acoustic Echo | 15,300,000 | Combo Mastery | #30 | Critical slaps have a $20\%$ chance to echo for $+100\%$ bonus damage. |
| 4 | Dual-Hand Technique | 32,400,000 | Opportunist | #20 | $+15\%$ attack speed — both hands blur. |
| 4 | Unstoppable Hands | 68,400,000 | Adrenaline Rush | #30 | $+3,500$ max HP and regenerate $0.35\%$ Max HP/s during fights. |
| 4 | Kinetic Barrier | 135,000,000 | Adrenaline Rush | #30 | Every 10 slaps builds a shield absorbing $12\%$ of Max HP damage (max $24\%$ of Max HP). |
| 4 | Treasure Hunter | 270,000,000 | Coin Magnet | #30 | Elites and Bosses drop $+25\%$ bonus coins, and defeat grants $+1$ extra Gem. |
| 4 | Frenzy | 540,000,000 | Boss Hunter | #30 | 35 inactive-state slaps charge FRENZY: $10\text{s}$ of $+50\%$ damage and $+30\%$ speed. |
| 4 | Colossus Bane | 1,080,000,000 | Boss Hunter | #35 | $+35\%$ damage vs Colossi — enemies `#35` and up, and World guardians. |
| 5 | Rapid Barrage | 2,160,000,000 | Dual-Hand Technique | #40 | Every 6th slap unleashes a barrage: 3 extra hits at $40\%$ damage. |
| 5 | Bulwark Guard | 4,320,000,000 | Kinetic Barrier | #40 | When Defense or Barrier mitigates damage, $50\%$ of the blocked damage is reflected back. |
| 5 | Godhand Strike | 9,000,000,000 | Colossus Bane | #45 | Slaps charge the Godhand Ultimate: an $8\times$ screen-shattering strike. |
| 4 | Iron Stance I | 216,000,000 | Deflect | #30 | Parry cooldown $-2\text{s}$ ($10\text{s}$ to $8\text{s}$). |
| 5 | Iron Stance II | 2,700,000,000 | Iron Stance I | #40 | Parry cooldown $-3\text{s}$ ($8\text{s}$ to $5\text{s}$). |
| 5 | Iron Stance III | 21,600,000,000 | Iron Stance II | #50 | Parry window widens ($0.30\text{s}$ to $0.50\text{s}$). Cooldown stays $5\text{s}$. |

Notes: **Second Hand is granted FREE** by the claim card upon defeating Grumpy Teddy (`#5`) (or unlocks for 1,000 🪙 if the claim card is dismissed). Deflect is the parry unlock; Iron Stance I–III chain off it.

---

## 8. Level Abilities (auto-unlock at player level)

| Lv | Ability | Effect |
|---|---|---|
| 2 | Iron Palm | $+20\%$ damage on every slap permanently. |
| 4 | Quickening | $+6\%$ slap speed (interval $\times 0.94$). |
| 6 | Thick Skin | Reduces incoming enemy attack damage by $12\%$. |
| 8 | Greed | $+15\%$ coins from all sources. |
| 10 | Vampire Slap | Every 10th slap heals you for $1\%$ of Max HP (min 10 HP). |
| 12 | Crit Surge | $+8\%$ critical strike chance. |
| 14 | Second Wind | Once per fight, when HP drops to 0, immediately recover $25\%$ HP. |
| 16 | Boss Bane | $+20\%$ damage against Group Elites, Mini-Bosses, and Bosses. |
| 18 | Golden Aura | $+15\%$ coins earned. |
| 20 | Counter Cadence | After taking an un-parried hit, your next slap deals $1.75\times$ damage. |
| 22 | Battle Focus | At combo stack $10+$, your stuns last $+0.20\text{s}$ longer (beyond the normal cap). |
| 24 | Tough Grit | When below $40\%$ HP, take $20\%$ less damage. |
| 26 | Iron Resolve | Every 30th slap cleanses all active debuffs and heals $2\%$ Max HP. |
| 28 | Overcharge | Critical hits gain $+1\%$ bonus Crit Damage per Defense level (up to $+40\%$). |
| 30 | Giant Stature | $+1,500$ Max HP, and striking an Elite or Boss grants $+1$ extra combo stack. |
| 32 | Swift Recovery | Parrying or blocking an enemy attack boosts your slap speed by $+25\%$ for $2.5\text{s}$. |
| 34 | Midas Strike | Slaps landed within $0.6\text{s}$ of an enemy's attack timer grant $1.5\times$ coins. |
| 36 | Executioner | Slaps deal $+35\%$ damage against enemies below $25\%$ HP. |
| 38 | Dragonblood Vigour | $+4,500$ Max HP and $-20\%$ damage from Boss Signatures and burns (available at Ch. 5 cap for `#50 Dragon Lord`). |
| 40 | Godhand Awakening | Every 30th slap triggers Godhand Awakening: deals $2.5\times$ damage and stuns for $1.0\text{s}$. |
| 44 | Asura Slayer | $+25\%$ damage in World fights and $+15\%$ critical damage. |
| 50 | Transcendent Hand | Permanent $\times 1.25$ global damage and $\times 1.15$ Max HP. |

---

## 9. Special Moves (boss-unlocked, upgradeable)

| Move | Unlock | Base | Max level | Cooldown | Upgrade costs 🪙 |
|---|---|---|---|---|---|
| Double Slap | Defeat #10 (Monkey) | $\times 7$ damage instant hit | $\times 15$ dmg | $25\text{s} \rightarrow 15\text{s}$ | 15,000 · 85,000 · 450,000 · 2,400,000 (then $\times 5$/lvl) |
| Guard | Defeat #20 (Dark Knight) | Blocks $100\%$ of the next Normal Attack (signatures pierce it, unconsumed) | Lv 3 | $24\text{s} \rightarrow 18\text{s}$ | 25,000,000 · 150,000,000 |
| Uppercut Punch | Defeat #40 (Pharaoh) | $\times 18$ damage $+ 2.5\text{s}$ stun | $\times 32$ dmg | $32\text{s} \rightarrow 20\text{s}$ | 35,000,000 · 110,000,000 · 320,000,000 · 900,000,000 (then $\times 5.5$/lvl) |

---

## 10. Economy & Payout Formulas *(v2.7.6 Hard Mode Boss HP)*

**KO payout (normal fight):** $\text{round}(\text{bounty} \times 1.30 \times \text{coinMult} \times \text{worldCoinMult})$
**KO payout (HARD) *(v2.7.6)*:** $\text{round}(1.85 \times \text{bounty} \times (\text{slapCapFrac} + 1.30 \times \text{coinMult}))$ — $\text{slapCapFrac}$ is the fight's slap-coin cap fraction ($0.85\text{–}2.00$). Hard mode itself: **enemy HP $\times 1.75$ ($\times 1.50$ for mini-bosses and bosses), ATK $\times 1.25$**, no slap coins, $+3$ 💎 per Hard win, embers $\times 1.5$ in Worlds; group mastery: $+10$ 💎 and $+2\%$ permanent coin mult per Hard-cleared stage.
**Slap coins (per slap, normal mode only):** $\text{base} = \text{bounty} \times \text{band fraction}$ ($7\%$ for `#1–10` · $5.5\%$ for `#11–30` · $5.5\%$ `#31+` · $10\%$ Worlds), scaled by damage dealt share of enemy Max HP ($\times 4$ scale, capped), band multipliers (early $\times 2$ / boss $\times 1.5$ · mid $\times 1.4$ / $\times 1.15$ · late $\times 1.3$ / $\times 1.1$), crits pay $+35\%$ of the cap fraction, lucky strikes $\times 2.5$.
**Fight cap:** total slap coins per fight $\le \text{bounty} \times \text{capFrac}$ (listed in §5's `Slap Cap (F / R)` column) — $1.75$ (`#1–10`) · $0.85$ (`#11–30`) · $0.85$ (`#31+`), frontier (next unbeaten) enemy $2.00$ (`#1–10`) / $1.35$ (`#11+`), Worlds $1.35$ (first-clear frontier $1.75$). Past $25\%$ of the remaining room, per-slap coins taper.
**Ad Coin Stacking Rule:** When the $2\times$ Coins timer ad is active, the post-victory Double Rewards ad multiplies the payout by $\times 1.5$ (capping combined ad coin stacking at $\times 3.0$ instead of $\times 4.0$).
**Group (stage) clear bonus:** $100\%$ of the stage's total bounties $\times \text{coinMult}$.
**Offline Slap Miner** (unlock 200 💎): earns **$0.0012\% \times \text{Frontier Full Payout}$ per second away** (where $\text{Frontier Full Payout} = \text{frontier bounty} \times (1.30 \times \text{coinMult} + \text{frontier capFrac})$), capped at $8\text{h}$ ($28,800\text{s} = 34.56\%$ of a full frontier clear). Minimum away time: $60\text{s}$. Watching a rewarded ad doubles the claim ($2\times$, up to $69.12\%$).

---

## 11. Game Modes

| Mode | Unlock | Rules | Rewards | Cooldown / cost |
|---|---|---|---|---|
| **Normal** | start | Beat enemies in order; every stage's 5th is a mini-boss or chapter boss | KO payout (§10), slap coins, first-clear chests | — |
| **HARD *(v2.7.6)*** | per-enemy after normal clear | **HP $\times 1.75$ ($\times 1.50$ mini-bosses/bosses), ATK $\times 1.25$**, no slap coins | KO $= 1.85 \times \text{bounty} \times (\text{capFrac} + 1.30 \times \text{coinMult})$; $+3$ 💎/win; stage mastery $+10$ 💎 & $+2\%$ coins | — |
| **Trio Gauntlet** | clear a full stage (all 5) | Fight that stage's trio back-to-back, HP carries over; no per-fight payout | Completion $= \Sigma\,\text{trio bounties} \times 1.35 \times \text{coinMult}$; first clear of a stage's gauntlet $+3$ 💎, repeat best-stage $+1$ 💎 | $30\text{ min}$ per stage + global |
| **Golden Dummy Blitz** | defeat #10 | $20\text{s}$ vs the unkillable Golden Dummy; tier thresholds $= \text{theoretical DPS} \times \text{tier mult}$. **$2\times$ Damage ad boost is paused during Blitz** (neither active nor consuming charges) | Coins $= \text{frontier bounty} \times \text{tier pay} \times \text{coinMult}$; 💎 at tiers 3/6/9/12/15/18/20 (2 each, once ever); repeat runs reaching Tier 10+ pay $+1$ 💎; $+1.0\text{s}$ time at tiers 3/6/9/12/15/18 | 2 charges, $+1$ per $45\text{ min}$ |
| **Reflex Slap-Off** | defeat #10 + own Deflect + Precision Instinct | Duel vs your strongest beaten enemy (HP pool = its HP); parry Red Danger prompts — a miss drains $12\%$ of the pool (weak tap $8\%$), missing costs you $15\%$ Max HP, 2 straight misses = loss. **$2\times$ Damage ad boost is paused** | Win: $2 \times \text{enemy bounty} \times \text{coinMult} + 1$ 💎; slap coins kept either way | 2 charges, $+1$ per $30\text{ min}$ |
| **Endless** | defeat #7 (Mime) | Endless waves from your beaten roster, toughest first; every 5th wave is a boss wave; Cornerman draft buff after waves (see below); partial heal between waves; $+1$ effective level per 15 waves (max $+3$) | Per kill: **$\text{frontier bounty} \times \min(0.35, 0.06 + 0.012 \times \text{wave}) \times \text{coinMult}$**; milestone bonus: $+1$ 💎 every 5 waves cleared past Wave 15 (Waves 20, 25, 30+). Enemy HP $\times 1.028^{\text{wave}-1}$, DMG $\times 1.022^{\text{wave}-1}$; boss waves extra $\times 1.50$ HP / $\times 1.25$ DMG | **$60\text{ min}$** after a run ends in defeat |
| **Boss Rush** | defeat #20 (Dark Knight) | The 5 stage bosses you've beaten (`#10/20/30/40/50`), back-to-back | Per boss: $\text{bounty} \times \text{coinMult}$; full clear bonus $= \Sigma\,\text{bounties} \times 1.8 \times \text{coinMult}$ ($\times 1.5$ more with High Roller draft); $+1$ 🔥 per boss if Dragon Lord beaten | $60\text{ min}$ |
| **Parry Training** | own Deflect | $90\text{s}$ vs Training Dummy — parry only: no slapping, no damage numbers, no rewards; dummy unkillable, you take no HP damage; 3 strikes (missed parries) ends it; training parry cooldown $1.2\text{s}$, real $0.30\text{s}$ window | Practice only | 3 free/day, then rewarded ad $= +1$ session, max $+3$/day (6 total) |
| **Worlds** | defeat Dragon Lord | §12 | Bounties, 🔥 embers, relics | — |
| **Dojo Bounties** | defeat 3+ enemies | Daily board of 4 contracts on beaten enemies (win with a condition: no specials / use N specials / parry N / land N crits / etc.) | Win pays $1.5 \times \text{frontier bounty}$ (flat, unaffected by `coinMult`) $+ 2\text{–}5$ 💎 by template | New board daily; done contracts don't respawn until tomorrow |
| **Street Brawl anomalies** | random in normal fights | 🪅 Golden Piñata: HP $\times 0.6$, dmg halved, slap coins $\times 3$, flees in $15\text{s}$, crack $50\%$ HP for a $1.35\times$ bounty chest · 💀 Sudden Death: both sides $\times 2.2$ dmg, win pays $\times 1.4$ · 🎯 Weak-Spot Storm: weak spots every $1.5\text{s}$, normal slaps half dmg (a 4th, Berserk, exists in code) | as stated | — |

**Cornerman draft buffs** (pick 1 of 3 between Endless/Boss Rush fights):

- **ICE PACK** — Heal $35\%$ Max HP right now · damage-over-time taken $-50\%$ for the run
- **CORNER TOWEL** — Start every fight this run behind a $25\%$ Max HP shield
- **LOADED WRAPS** — Your first 8 slaps each fight deal $\times 1.75$ and ignore boss shields
- **SMELLING SALTS** — Specials start every fight fully charged · Frenzy gain $+40\%$
- **COACH'S SPOTTER** — First weak spot at $1.5\text{s}$ · weak-spot window $+0.5\text{s}$ and damage $+30\%$
- **SAVED BY THE BELL** — Bosses start each fight dazed $1.5\text{s}$ · enemy swings $15\%$ slower
- **SECOND WIND TONIC** — Once per fight: dropping below $35\%$ HP heals $25\%$ and speeds you up for $5\text{s}$
- **HIGH-ROLLER PURSE** — You take $+20\%$ damage · Boss Rush completion bonus $+50\%$

---

## 12. Worlds (post-game)

Unlock: defeat the Dragon Lord (`#50`). World 2 (`Shadow Verse`) locks until `Ravana` falls. Slot 3 = mini-boss, slot 6 = world boss. First-clear gems: mini-boss $+5$ 💎, world boss $+30$ 💎.

| World | # | Enemy | HP | ATK DMG | ATK int. | Bounty | 🔥 First | 🔥 Repeat | Role |
|---|---|---|---|---|---|---|---|---|---|
| Asura Realm | 1 | Asura Footman | 480,000,000 | 2,400 | $1.38\text{s}$ | 62,000,000 | 3 | 1 |  |
| Asura Realm | 2 | Rakshasa Huntress | 620,000,000 | 2,750 | $1.36\text{s}$ | 73,000,000 | 4 | 1 |  |
| Asura Realm | 3 | Kumbhakaran | 850,000,000 | 3,200 | $1.35\text{s}$ | 86,000,000 | 5 | 2 | MINI BOSS |
| Asura Realm | 4 | Mahishasura | 1,050,000,000 | 3,600 | $1.34\text{s}$ | 101,000,000 | 5 | 2 |  |
| Asura Realm | 5 | Vetala Warlock | 1,350,000,000 | 4,050 | $1.32\text{s}$ | 119,000,000 | 6 | 2 |  |
| Asura Realm | 6 | Ravana | 1,950,000,000 | 4,500 | $1.30\text{s}$ | 140,000,000 | 10 | 3 | WORLD BOSS |
| Shadow Verse | 1 | Shade of the Dummy | 1,650,000,000 | 4,900 | $1.30\text{s}$ | 175,000,000 | 6 | 2 |  |
| Shadow Verse | 2 | Umbral Mime | 2,150,000,000 | 5,350 | $1.28\text{s}$ | 212,000,000 | 7 | 3 |  |
| Shadow Verse | 3 | Umbral Puppeteer | 2,850,000,000 | 5,850 | $1.26\text{s}$ | 256,000,000 | 8 | 3 | MINI BOSS |
| Shadow Verse | 4 | Gloom Serpent | 3,600,000,000 | 6,300 | $1.25\text{s}$ | 310,000,000 | 9 | 4 |  |
| Shadow Verse | 5 | The Hollow Monk | 4,650,000,000 | 6,800 | $1.24\text{s}$ | 375,000,000 | 10 | 5 |  |
| Shadow Verse | 6 | The Dark Slapper | 6,800,000,000 | 7,400 | $1.22\text{s}$ | 455,000,000 | 15 | 6 | WORLD BOSS |

World enemies also have $15\text{–}18\%$ evasion. World KO payout uses the same $\times 1.30 \times \text{coinMult}$ formula; world coin mult from relics applies in world fights.

**Relics** (drop from world enemies; each relic has 3 ascension tiers — values shown Lv1/Lv2/Lv3):

| Relic | Source | Effect |
|---|---|---|
| Bronze War Bell | Asura 1 | $+10\%/20\%/30\%$ coins in world fights |
| Rakshasa Fang | Asura 2 | $+8\%/16\%/24\%$ crit damage |
| Horn of the Stampede | Asura 4 | $+10\%/20\%/30\%$ damage in world fights |
| Slumber Bell | Asura 3 (Kumbhakaran) | Enemies attack $4\%/8\%/12\%$ slower |
| Skull of Whispers | Asura 5 | Weak spots appear $10\%/20\%/30\%$ sooner |
| Crown of Ten Kings | Asura 6 (Ravana) | $+15\%/25\%/40\%$ damage vs world final bosses |
| Splinter of the First Foe | Shadow 1 | $+8\%/16\%/24\%$ damage vs non-bosses |
| Silent Glove | Shadow 2 | $+4\%/7\%/10\%$ slap speed |
| Puppet Strings | Shadow 3 (Puppeteer) | Enemy specials & signature moves charge $15\%/30\%/45\%$ slower |
| Venomfang Coil | Shadow 4 | $+10\%/20\%/30\%$ damage vs stunned enemies |
| Beads of the Void | Shadow 5 | $+20\%/40\%/60\%$ Soul Embers earned |
| Mirror Palm | Shadow 6 (Dark Slapper) | Skin power triggers every $10 / 9 / 8$ slaps (down from 11) |

**Sanctuary arts** (buy with 🔥 embers, permanent):

- **Echo Palm** — 20 🔥 — Every 8th slap echoes — a phantom slap lands at $60\%$ damage.
- **Frenzy Heart** — 15 🔥 — Your frenzy meter fills $30\%$ faster.
- **Phoenix Heart** — 35 🔥 — Once per fight, a fatal blow leaves you standing at $25\%$ HP $+ 1.5\text{s}$ invulnerability.
- **Battle Trance** — 25 🔥 — $+12\%$ slap speed and $+25\%$ critical damage across all fights.
- **Giant's Grip** — 15 🔥 — $+1$ max precision crits per fight (weak-spot cap).
- **Eagle Eye** — 12 🔥 — Weak spots stay open $0.6\text{s}$ longer.
- **Greed Mantra** — 18 🔥 — $+25\%$ coins from world fights.
- **Sovereign's Bane** — 25 🔥 — $+15\%$ damage against all bosses.

---

## 13. Blitz Tier Table (Golden Dummy Blitz)

Threshold for tier $T = \text{theoretical DPS} \times \text{mult}$ (where $\text{theoretical DPS}$ already includes expected crit/combo/proc multipliers, so $20\text{s}$ of passive slapping equals $20.0\times$ theoretical DPS). Reaching Tiers 3, 6, 9, 12, and 15 grants $+5\text{s}$ total ($25\text{s}$ duration), making **Tier 17 ($23.8\times$)** passively reachable; reaching **Tier 18 ($25.2\times$)** grants another $+1.0\text{s}$ ($26\text{s}$ max duration), so **Tiers 18–20 ($25.2\times\text{–}28.0\times$)** require active Frenzy, Weak-Spot, and Special burst. Coins pay on the HIGHEST tier reached: $\text{frontier bounty} \times \text{pay} \times \text{coinMult}$.

| Tier | Name | DPS mult | Coin pay | 💎 (first time) | Bonus |
|---|---|---|---|---|---|
| 1 | BRONZE I | $\times 1.4$ | $\times 0.25$ | — | — |
| 2 | BRONZE II | $\times 2.8$ | $\times 0.35$ | — | — |
| 3 | BRONZE III | $\times 4.2$ | $\times 0.45$ | 2 | $+1.0\text{s}$ |
| 4 | BRONZE IV | $\times 5.6$ | $\times 0.55$ | — | — |
| 5 | SILVER I | $\times 7.0$ | $\times 0.65$ | — | — |
| 6 | SILVER II | $\times 8.4$ | $\times 0.75$ | 2 | $+1.0\text{s}$ |
| 7 | SILVER III | $\times 9.8$ | $\times 0.85$ | — | — |
| 8 | SILVER IV | $\times 11.2$ | $\times 0.95$ | — | — |
| 9 | GOLD I | $\times 12.6$ | $\times 1.05$ | 2 | $+1.0\text{s}$ |
| 10 | GOLD II | $\times 14.0$ | $\times 1.15$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 11 | GOLD III | $\times 15.4$ | $\times 1.25$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 12 | GOLD IV | $\times 16.8$ | $\times 1.35$ | 2 | $+1.0\text{s}$ · $+1$ 💎 repeat (Tier 10+ runs) |
| 13 | PLATINUM I | $\times 18.2$ | $\times 1.45$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 14 | PLATINUM II | $\times 19.6$ | $\times 1.55$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 15 | DIAMOND I | $\times 21.0$ | $\times 1.65$ | 2 | $+1.0\text{s}$ · $+1$ 💎 repeat (Tier 10+ runs) |
| 16 | DIAMOND II | $\times 22.4$ | $\times 1.75$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 17 | MASTER I | $\times 23.8$ | $\times 1.85$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 18 | MASTER II | $\times 25.2$ | $\times 1.95$ | 2 | $+1.0\text{s}$ · $+1$ 💎 repeat (Tier 10+ runs) |
| 19 | GRANDMASTER | $\times 26.6$ | $\times 2.05$ | — | — · $+1$ 💎 repeat (Tier 10+ runs) |
| 20 | LEGEND | $\times 28.0$ | $\times 2.20$ | 2 | — · $+1$ 💎 repeat (Tier 10+ runs) |

Leagues shown in-game: Bronze (1–4) · Silver (5–8) · Gold (9–12) · Platinum (13–14) · Diamond (15–16) · Master (17–18) · Grandmaster (19) · Legend (20).

---

## 14. Daily Systems

**Daily chest** (unlock: defeat `#5`): $\text{coins} = \max(60,\; \text{frontier bounty} \times 0.25 \times \text{coinMult})$; gems on cycle days 2/4/6 = 5/10/15 💎; **day 7 = $\text{frontier bounty} \times 1.0 \times \text{coinMult} + 25$ 💎**. Missing a day does not reset the cycle backwards beyond the stored day.
**Daily quests** (unlock: defeat Monkey `#10`): 3 seeded quests/day from a pool of 6 — Defeats (8/16/28/45 by tier), Battle Coins (target = $\text{highest beaten bounty} \times 6/10/16/26 \times \text{scaling}$), Crits (20/45/90/180), Hard Clears (1–4), Frenzies (2/4/7/12), Buys (5/10/18/30). Coin quests pay $0.35\text{–}0.45 \times \text{highest beaten bounty} \times \text{coinMult}$; gem quests pay 2–4 💎 (capped 15 with level/stage bonuses).
**Daily bounties:** see Dojo Bounties in §11 ($1.5 \times \text{frontier bounty}$ flat per contract).

---

## 15. Shop — Packs, Bundles, Skins, Features

**Coin packs (buy with 💎)** — $\text{payout} = \max(\text{flat coins},\; \text{frontier bounty} \times \text{frontierMult} \times \text{coinMult})$:

| Pack | 💎 cost | Flat 🪙 | Frontier $\times$ | Tag |
|---|---|---|---|---|
| Pocket of Coins | 50 | 50,000 | $\times 1.5$ | QUICK BOOST |
| Bag of Gold | 140 | 250,000 | $\times 3.5$ | POPULAR $+25\%$ BONUS |
| Chest of Gold | 350 | 1,500,000 | $\times 8$ | GREAT VALUE $+45\%$ BONUS |
| Royal Treasury | 800 | 8,000,000 | $\times 16$ | BEST VALUE $+70\%$ BONUS |
| Dragon's Hoard | 1800 | 35,000,000 | $\times 32$ | WHALE TIER $+100\%$ 2X BONUS |

**Gem packs (real money, test products):**

| Pack | Price | 💎 | Bonus 💎 |
|---|---|---|---|
| Pouch of Gems | ₹49 | 80 | +0 |
| Sack of Gems | ₹149 | 240 | +35 |
| Chest of Gems | ₹399 | 700 | +150 |
| Vault of Gems | ₹799 | 1600 | +500 |
| Titan's Treasury | ₹1,699 | 3800 | +1800 |
| Cosmic Hoard | ₹3,499 | 9000 | +6000 |

**Hero bundles (real money):** $\text{payout coins} = \max(\text{flat},\; \text{frontier bounty} \times \text{frontierMult} \times \text{coinMult})$:

| Bundle | Price | (value) | Skin | Flat 🪙 | Frontier $\times$ | 💎 |
|---|---|---|---|---|---|---|
| Starter Bundle | ₹149 | ₹499 | spidey | 25,000 | $\times 4$ | 200 |
| Weapon X Bundle | ₹249 | ₹799 | logan | 80,000 | $\times 10$ | 400 |
| Thunder Bundle | ₹399 | ₹1,199 | thor | 250,000 | $\times 22$ | 800 |
| Hero Bundle | ₹799 | ₹2,499 | hulk | 1,000,000 | $\times 45$ | 1,600 |
| Cosmic Infinity Bundle | ₹2,499 | ₹9,999 | gauntlet | 10,000,000 | $\times 90$ | 3,000 |

**Hand skins** (proc every 11th slap, or $10 / 9 / 8$ slaps with Mirror Palm):

| Skin | Rarity | Price | Passive | Power |
|---|---|---|---|---|
| Classic | DEFAULT | default | — | — |
| Spider-Man | RARE | 300 💎 | $+10\%$ SLAP SPEED | WEB SNARE — proc slap deals $1.5\times$ damage and webs the enemy, slowing its swings by $25\%$ for $2.5\text{s}$ |
| Wolverine | EPIC | 1000 💎 | $+15\%$ CRIT DAMAGE | BERSERKER SLASH — proc slap is a guaranteed crit for $2.2\times$ damage and heals you for $2\%$ of Max HP |
| Thor | LEGENDARY | 2000 💎 | $+15\%$ DAMAGE · $+15\%$ COINS | THUNDER CALL — proc slap deals $3\times$ damage and dazes the enemy for $0.6\text{s}$ |
| Hulk | LEGENDARY | 3500 💎 | $+25\%$ DAMAGE · $+15\%$ MAX HP | GAMMA SMASH — proc slap deals $4\times$ damage, shatters half the enemy's shield and boosts your damage by $20\%$ for $3\text{s}$ |
| Infinity Gauntlet | MYTHIC | 9000 💎 | $+35\%$ DAMAGE · $+20\%$ COINS | TIME STOP — proc slap STOPS TIME for $5\text{s}$: $+30\%$ damage and $+50\%$ slap speed while it lasts. The stones then need $16\text{s}$ to recharge |

**Feature products:**

- **Offline Slap Miner** (PASSIVE INCOME) — 200 💎 — Earn coins while away at $0.0012\%$ of your Frontier Full Payout per second, up to $34.56\%$ over 8 hours (doubleable to $69.12\%$ with a rewarded ad).
- **Golden Slapper VIP Pass** (PERMANENT VIP) — ₹199 — Permanent $+25\%$ bonus coins from all enemy knockouts, prestige golden frame on your battle hand, and golden player crown!
- **Frenzy Overcharge Booster** (TURBO BOOST) — ₹99 — Frenzy charges $25\%$ faster from inactive slaps ($26$ slaps instead of $35$), and Frenzy duration extends to 13 seconds (normally $10\text{s}$; $50.1\%$ uptime at $0.499\text{s}$, $58.8\%$ at $0.35\text{s}$)!
- **Remove Ads** (NO ADS) — ₹199 — No more interstitial or banner ads, forever. Optional rewarded ads stay available whenever you want a boost.

---

## 16. Ads

**Interstitials:** every 3 fights / 3 wins (3 fight points), minimum $75\text{s}$ apart. Removed permanently by the Remove Ads product (rewarded stay).

**Rewarded placements (all live in code):**
- **Revive** — after a loss: return at $50\%$ HP with the enemy left wounded; once per enemy, permanently (plus a separate once-per-fight auto-revive outside Worlds). Loss screen highlights Revive when the enemy is under $35\%$ HP.
- **$2\times$ Damage** — fight-based: one ad arms **7 wins / 10 attempts**; a win consumes one of each, a loss consumes an attempt only. Counts per bout in Gauntlet/Rush, once at the end of an Endless run; **paused in Golden Dummy Blitz and Reflex Slap-Off** (neither active nor consuming charges).
- **$2\times$ Coins** — $600\text{s}$ ($10\text{ min}$) timer: $\text{coinMult} \times 2$ on everything.
- **Offline double** — doubles the Offline Miner claim.
- **Parry Training** — $+1$ training session per ad, max $+3$/day (see §11).
- **Double Rewards** — victory screen option to multiply the fight's coin payout by $\times 2.0$ (or $\times 1.5$ while the $2\times$ Coins timer is active, capping combined ad coin boost at $\times 3.0$).

---

## 17. Achievements

13 achievements, each paying 💎 once:

| Achievement | Category | Target | 💎 |
|---|---|---|---|
| First Knockout — Win your first fight. | Victories | 1 | 1 |
| Slap Machine — Land 500 slaps. | Slaps | 500 | 2 |
| Slap Storm — Land 5,000 slaps. | Slaps | 5,000 | 3 |
| Combo King — Reach a $\times 25$ combo. | Frenzy & Combo | 25 | 2 |
| Crit Happens — Land 100 critical slaps. | Crits & Luck | 100 | 2 |
| Giant Slayer — Defeat any Giant enemy. | Bosses & Elites | 1 | 3 |
| Group Graduate — Defeat every enemy in any one group. | Collection | 1 | 3 |
| Dragon Slayer — Defeat the Dragon Lord. | Bosses & Elites | 1 | 5 |
| Grand Champion — Defeat all 50 enemies. | Victories | 50 | 10 |
| Hard 10 — Clear 10 Hard Mode fights. | Hard Mode | 10 | 2 |
| Hard 25 — Clear 25 Hard Mode fights. | Hard Mode | 25 | 3 |
| Hard Mastery — Clear all 50 Hard Mode fights. | Hard Mode | 50 | 10 |
| Untouchable — Win a fight without taking any damage. | Victories | 1 | 2 |

---

*Ship-ready final audited & play-paced v2.7.6 specification derived from the v2.6.6 live code baseline (18 Nov 2026).*