# IDLE SLAPPER — COMPLETE GAME VALUES & NUMBERS REFERENCE (v2.6.1 FINAL)

*Every number in the finalized v2.6.1 economy and combat engine, verified to pass all 6/6 design pillars (30–65s Boss TTK, 15–22s Un-Parried Survival, Anti-Cheese Locks, Narrow-Loss Ad Hooks at ~88% chapter cap, 25–27 Boss Kills per Chapter uniformly across Chapters 1–7, and ≤35% / ≤55% Ad-Offline cap) and reconciled 1:1 with `BalanceConfig.cs` (`Version = "2.6.1-FINAL"`).*

*Coins are the soft currency, 💎 gems the premium currency, 🔥 Dragon Embers the Worlds currency. In tables, `--` means "not applicable / not offered at that level".*

## Contents
1. Game Flow & Unlock Order  ·  2. Chapter Progression & Attribute Caps  ·  3. Player Level, HP & Perks  ·  4. Attributes (Reconciled Log-Space Cost Curves)  ·  5. Slap-Coin & Knockout Economy  ·  6. Combat Systems, Speed Caps & Anti-Cheese Locks  ·  7. Player Special Moves & Boss Signatures  ·  8. Enemies #1-#50 (Playable Main Roster)  ·  9. Roster Data #51-#100 (Post-Shadow Verse Expansion)  ·  10. Skills (All 27)  ·  11. Game Modes & Timings  ·  12. The Worlds (Asura Realm & Shadow Verse)  ·  13. Shop, Hand Skins & Real-Money Purchases  ·  14. Ads  ·  15. Daily Systems, Quests & Achievements  ·  16. Offline Earnings (45s Kill-Rate Cap & 35%/55% Chapter Hard Cap)  ·  17. Every Timer in One Table

---
## 1. Game Flow & Unlock Order

You fight enemies in order (#1 $\to$ #50). Every 5 enemies form a **group**; every 10 enemies end with a **boss** (idx 9, 19, 29, 39 are elites, idx 49 the Dragon Lord). Beating bosses raises your **Player Level Cap, Power Cap, and Secondary Attribute Caps** in chapters (Section 2). Systems unlock in this order:

| When | What Unlocks |
|---|---|
| Game start | Enemies #1-#5, Player Lv cap 10, Power cap 12, Attributes, Shop |
| Beat #5 Grumpy Teddy | **Second Hand** skill — claim it FREE from the pop-up card (reduces base slap interval from $1.500\text{s} \to 1.275\text{s}$) |
| Beat #5 | 7-day Login Chest starts appearing |
| 5 total defeats | **Reflex Slap-Off** (2 charges, 30-min recharge per charge) |
| 10 total defeats | **Golden Dummy Blitz** (2 charges, 45-min recharge per charge) |
| Clear any group of 5 | **Trio Gauntlet** for that group (shared 30-min global cooldown; no Turf Tribute) + One-Time **Group Reward Chest** |
| Beat #10 Monkey | Chapter 2: Lv cap 18, Power cap 24 · **Double Slap** Special Move · **Endless Mode** (45-min cooldown) · **Daily Quests** (refresh at midnight) |
| Beat #20 Dark Knight | Chapter 3: Lv cap 26, Power cap 36 · **Guard** Special Move · **Boss Rush** (60-min cooldown, includes Cornerman Drafts) |
| Beat #30 Shogun | Chapter 4: Lv cap 33, Power cap 48 · **Special Move Mastery** ($-3\text{s}$ cooldown on Double Slap & Guard) |
| Beat #40 Pharaoh | Chapter 5: Lv cap 38, Power cap 60 · **Uppercut Punch** Special Move |
| Beat #50 Dragon Lord | Chapter 6: Lv cap 44, Power cap 70 · **Worlds Portal** (Asura Realm) · 🔥 Ember economy · Dragon Mastery 1 |
| Beat #206 Ravana (Asura final boss) | Chapter 7: Lv cap 50 (max), Power cap 80 (max) · **Shadow Verse** · Dragon Mastery 2 |
| Beat #216 Dark Slapper (Shadow Verse final) | Current endgame (gates future Chapter 8+ Roster #51-#100) |

**Skill Boss Gates** (on top of coin cost):
* **Second Hand** — free claim on beating #5
* **Quick Reflexes + Seismic Slam + Heavy Slap + Precision Instinct + Combo Mastery** — beat #10 (*Twin Mastery and On Target have no boss gate so the speed/combo branch opens in Chapter 1 without inflating Chapter 1 build costs*)
* **Boss Hunter + Coin Magnet + Dual-Hand Technique** — beat #20
* **Unstoppable Hands + Acoustic Echo + Kinetic Barrier + Treasure Hunter + Frenzy** — beat #30 (*Unstoppable Hands moved to #30 so a 38M skill doesn't sit in Chapter 3 UI*)
* **Colossus Bane** — beat #35 Shadow Beast (*available before fighting #40 Pharaoh*)
* **Godhand Strike** — beat #45 Stone Golem (*available before fighting #50 Dragon Lord*)

---
## 2. Chapter Progression & Attribute Caps

Caps block NEW purchases only. Every attribute has an explicit per-chapter ceiling so players cannot dump all coins into `Power` and `Speed` while ignoring skills and secondary attributes, and **Speed (`max 25`)**, **Crit % (`max 45`)**, and **Stun (`max 50`)** are calibrated so zero coins are ever wasted on dead levels:

| Chapter Gate (Boss Defeated) | Player Lv Cap | Power Cap (Max 80) | Base Slap Dmg at Power Cap | Speed Cap (Max 25) | Crit % Cap (Max 45) | Crit Dmg / Combo / Coins Cap (Max 65) | Def / Giant Slayer / Leech Cap (Max 40) | Stun / Fortune Cap (Max 50) | Accuracy Cap (Max 14) | Label Shown in Game |
|---|---|---|---|---|---|---|---|---|---|---|
| Start of game (Ch. 1) | 10 | 12 | $112.22$ | 8 | 10 | 12 | 10 | 10 | 4 ($89\%$) | DEFEAT STAGE #10 TO UNLOCK |
| Enemy #10 Monkey (Ch. 2) | 18 | 24 | $596.86$ | 13 | 18 | 22 | 18 | 18 | 6 ($91\%$) | DEFEAT STAGE #20 TO UNLOCK |
| Enemy #20 Dark Knight (Ch. 3) | 26 | 36 | $2,613.58$ | 18 | 26 | 32 | 26 | 26 | 8 ($93\%$) | DEFEAT STAGE #30 TO UNLOCK |
| Enemy #30 Shogun (Ch. 4) | 33 | 48 | $10,442.07$ | 21 | 33 | 42 | 32 | 34 | 11 ($96\%$) | DEFEAT STAGE #40 TO UNLOCK |
| Enemy #40 Pharaoh (Ch. 5) | 38 | 60 | $50,615.61$ | 23 | 39 | 52 | 36 | 42 | 13 ($98\%$) | DEFEAT DRAGON LORD (#50) TO UNLOCK |
| Enemy #50 Dragon Lord (Ch. 6) | 44 | 70 | $155,658.42$ | 25 | 45 | 60 | 40 | 47 | 14 ($99\%$) | DEFEAT RAVANA (ASURA REALM) TO UNLOCK |
| Ravana — Asura Realm (Ch. 7) | 50 | 80 | $470,082.85$ | 25 | 45 | 65 | 40 | 50 | 14 ($99\%$) | MAX CHAPTER REACHED |

*Hard limits: Player Level cap 50 · Endless Mastery adds $+1$ temporary level per 15 Endless waves survived (Waves 15, 30, 45; active for that run only).*

---
## 3. Player Level, HP & Perks

* **Base Max HP Formula (Exact Match to Table):**
  $$\text{Base Max HP}(\text{Lv}) = 100 + 25 \times (\text{Lv}-1) + \text{round}\left(15 \times 1.212^{\text{Lv}-1}\right)$$
* **Total Max HP Formula (Explicit Skill Purchase Flags Required):**
  Flat skill HP bonuses (*Stamina Training* $+75$, *Unstoppable Hands* $+1,400$) apply **only when those skills are actually purchased**; even-level perks (*Giant Stature* $+600$ at Lv 30, *Dragonblood Vigour* $+4,500$ at Lv 40, *Transcendent Hand* $\times 1.15$ at Lv 50) apply automatically upon reaching their respective Player Levels.
* **Level-Up Cost Formula (Exact Piecewise Curve — 100% Identical to Table):**
  * **Lv 1–10:** $\text{round}\left(\exp\left(\ln(150) + (\ln(55,369) - \ln(150)) \times \left(\frac{\text{Lv}-1}{9}\right)^{1.065}\right)\right)$
  * **Lv 11–40:** $\text{round}\left(55,369 \times 1.35^{\text{Lv}-10}\right)$
  * **Lv 41–44:** $\text{round}\left(450,069,657 \times 1.25^{\text{Lv}-40}\right)$
  * **Lv 45–49:** $\text{round}\left(1,210,000,000 \times 1.10435^{\text{Lv}-45}\right)$

| Lv | Base Max HP | Total Max HP (w/ Unlocked Skills) | Cost to Next Level | Cumulative Coins Spent | Even-Level Perk Unlocked |
|---|---|---|---|---|---|
| 1 | 115 | 115 | 150 | 0 | -- |
| 2 | 143 | 143 | 265 | 150 | **Iron Palm** ($+20\%$ slap damage) |
| 3 | 172 | 172 | 494 | 415 | -- |
| 4 | 202 | 202 | 939 | 909 | **Quickening** ($+6\%$ slap speed, $\times 0.94$ interval) |
| 5 | 232 | 307 | 1,813 | 1,848 | -- |
| 6 | 264 | 339 | 3,539 | 3,661 | **Thick Skin** ($-12\%$ incoming enemy damage) |
| 7 | 298 | 373 | 6,967 | 7,200 | -- |
| 8 | 333 | 408 | 13,818 | 14,167 | **Greed** ($+15\%$ coins from all sources) |
| 9 | 370 | 445 | 27,582 | 27,985 | -- |
| 10 | 410 | 485 | 55,369 | 55,567 | **Vampire Slap** (Every 10th slap heals $1\%$ Max HP, min 10) |
| 11 | 453 | 528 | 74,748 | 110,936 | -- |
| 12 | 499 | 574 | 100,910 | 185,684 | **Crit Surge** ($+8\%$ critical strike chance) |
| 13 | 551 | 626 | 136,229 | 286,594 | -- |
| 14 | 608 | 683 | 183,908 | 422,823 | **Second Wind** (Once/fight at 0 HP, recover $25\%$ Max HP) |
| 15 | 671 | 746 | 248,276 | 606,731 | -- |
| 16 | 743 | 818 | 335,173 | 855,007 | **Boss Bane** ($+20\%$ damage vs Elites, Mini-Bosses & Bosses) |
| 17 | 825 | 900 | 452,484 | 1,190,180 | -- |
| 18 | 919 | 994 | 610,853 | 1,642,664 | **Golden Aura** ($+15\%$ coins earned) |
| 19 | 1,028 | 1,103 | 824,652 | 2,253,517 | -- |
| 20 | 1,154 | 1,229 | 1,113,280 | 3,078,169 | **Counter Cadence** (After un-parried hit, next slap deals $1.75\times$ dmg) |
| 21 | 1,302 | 1,377 | 1,502,928 | 4,191,449 | -- |
| 22 | 1,475 | 1,550 | 2,028,953 | 5,694,377 | **Battle Focus** (At combo stack $10+$, slaps gain $+10\%$ stun chance) |
| 23 | 1,681 | 1,756 | 2,739,086 | 7,723,330 | -- |
| 24 | 1,924 | 1,999 | 3,697,766 | 10,462,416 | **Tough Grit** (Below $40\%$ HP, take $20\%$ less damage) |
| 25 | 2,214 | 2,289 | 4,991,984 | 14,160,182 | -- |
| 26 | 2,560 | 2,635 | 6,739,179 | 19,152,166 | **Iron Resolve** (Every 30th slap cleanses 1 debuff & heals $2\%$ Max HP) |
| 27 | 2,974 | 3,049 | 9,097,891 | 25,891,345 | -- |
| 28 | 3,471 | 3,546 | 12,282,153 | 34,989,236 | **Overcharge** (Crits gain $+1\%$ bonus Crit Damage per Defense level, up to $+40\%$) |
| 29 | 4,067 | 4,142 | 16,580,907 | 47,271,389 | -- |
| 30 | 4,785 | 5,460 | 22,384,224 | 63,852,296 | **Giant Stature** ($+600$ Max HP; hitting Elite/Boss grants $+1$ combo stack) |
| 31 | 5,649 | 6,324 | 30,218,703 | 86,236,520 | -- |
| 32 | 6,692 | 8,767 | 40,795,249 | 116,455,223 | **Swift Recovery** (Parrying/blocking boosts slap speed by $+25\%$ for $2.5\text{s}$) |
| 33 | 7,950 | 10,025 | 55,073,586 | 157,250,472 | -- |
| 34 | 9,469 | 11,544 | 74,349,341 | 212,324,058 | **Midas Strike** (Slaps within $0.6\text{s}$ of enemy attack grant $1.5\times$ coins) |
| 35 | 11,306 | 13,381 | 100,371,610 | 286,673,399 | -- |
| 36 | 13,526 | 15,601 | 135,501,674 | 387,045,009 | **Executioner** (Slaps deal $+35\%$ damage vs enemies below $25\%$ HP) |
| 37 | 16,212 | 18,287 | 182,927,260 | 522,546,683 | -- |
| 38 | 19,462 | 21,537 | 246,951,801 | 705,473,943 | **Godhand Awakening** (Every 30th slap deals $2.5\times$ dmg & $1.0\text{s}$ stun) |
| 39 | 23,396 | 25,471 | 333,384,931 | 952,425,744 | -- |
| 40 | 28,158 | 34,733 | 450,069,657 | 1,285,810,675 | **Dragonblood Vigour** ($+4,500$ Max HP & $-20\%$ Boss Signature/Burn dmg) |
| 41 | 33,924 | 40,499 | 562,582,160 | 1,735,880,332 | -- |
| 42 | 40,908 | 47,483 | 703,227,700 | 2,298,462,492 | -- |
| 43 | 49,367 | 55,942 | 879,034,625 | 3,001,690,192 | -- |
| 44 | 59,614 | 66,189 | 1,098,793,281 | 3,880,724,817 | **Asura Slayer** ($+25\%$ World fight damage & $+15\%$ Crit Damage) |
| 45 | 72,028 | 78,603 | 1,210,000,000 | 4,979,518,098 | -- |
| 46 | 87,069 | 93,644 | 1,336,263,500 | 6,189,518,098 | -- |
| 47 | 105,293 | 111,868 | 1,475,702,596 | 7,525,781,598 | -- |
| 48 | 127,375 | 133,950 | 1,629,692,162 | 9,001,484,194 | -- |
| 49 | 154,133 | 160,708 | 1,799,750,539 | 10,631,176,356 | -- |
| 50 | 186,559 | 222,104 | MAX | 12,430,926,895 | **Transcendent Hand** (Permanent $\times 1.25$ Global Damage & $\times 1.15$ Max HP) |

**Exact Total Cost Lv 1 $\to$ 50: 12,430,926,895 coins (matches formula sum to the exact coin).**

---
## 4. Attributes (Reconciled Log-Space Cost Curves)

All 12 attributes use the exact unified log-space formula so that **Formula Sum == Table 4.1 Sum == Summary Table Total Cost** to the exact integer, with **zero dead levels across all 12 attributes** and aligned marginal DPS efficiency on `Speed` (`MaxCost = 180,000,000`, `HardCapValue = 0.350`):
$$\text{Cost}(L) = \text{round}\left(\exp\left(\ln(\text{BaseCost}) + (\ln(\text{MaxCost}) - \ln(\text{BaseCost})) \times \left(\frac{L-1}{\text{MaxLv}-1}\right)^{1.05}\right)\right)$$

| Attribute | Effect per Level (v2.6.1 Final) | Base Cost (Lv 1) | Max Cost (Final Lv) | Max Lv | **Exact Total Cost (Sum of All Levels)** |
|---|---|---|---|---|---|
| **Damage (`power`)** | Slap dmg: $(10 + 2.2L) \times 1.076^L \times 1.28^{\lfloor L/10 \rfloor}$ | 80 | 45,000,000,000 | 80 | **191,966,342,607** |
| **Speed (`speed`)** | Attack interval $\times \mathbf{0.9801}/\text{lv}$ ($0.9075\text{s}$ attr-only at Lv 25; **$0.500\text{s}$** w/ Speed Skills; **$0.350\text{s}$** hard floor w/ Skins & Relics; **$0.300\text{s}$** overdrive floor) | 110 | 180,000,000 | 25 | **427,264,587** |
| **Crit % (`critChance`)** | $+1\%$ crit chance/lv (base $10\%$, cap $75\%$; any Crit % above $75\%$ converts $1:2$ into Bonus Crit Damage) | 130 | 3,200,000,000 | 45 | **9,610,812,411** |
| **Crit Dmg (`critDamage`)** | $+5\%$ crit damage/lv (base $\times 2.0$) | 90 | 6,500,000,000 | 65 | **25,366,696,921** |
| **Defense (`defense`)** | $+1\%$ damage reduction/lv (capped at $40\%$) | 180 | 2,800,000,000 | 40 | **7,803,282,974** |
| **Stun (`stun`)** | **$+0.4\%$** stun chance/lv (base $5\%$, cap **$25\%$ at Lv 50**) and **$+0.018\text{s}$** stun duration/lv (base $0.50\text{s}$, cap **$1.40\text{s}$ at Lv 50**) | 130 | 3,500,000,000 | 50 | **11,432,042,855** |
| **Combo (`combo`)** | $+0.35\%$ damage per combo stack and $+0.4$ max stacks/lv (base 4 stacks) | 75 | 6,000,000,000 | 65 | **23,301,997,279** |
| **Coins (`coinMult`)** | $+4\%$ coins per level (max $+260\%$ at Lv 65) | 80 | 6,500,000,000 | 65 | **25,225,327,089** |
| **Accuracy (`accuracy`)** | $+1\%$ hit chance/lv (base $85\%$, cap $99\%$); counters Enemy Evasion & debuffs | 150 | 1,800,000,000 | 14 | **2,463,441,154** |
| **Giant Slayer (`bossDamage`)** | $+1.5\%$ damage vs elites & bosses/lv (cap $+60\%$) | 180 | 2,800,000,000 | 40 | **7,803,282,974** |
| **Life Leech (`vampirism`)** | Every **8th slap** heals **$+0.08\%$ of Max HP/lv** (cap **$3.2\%$ Max HP** at Lv 40) | 260 | 3,600,000,000 | 40 | **10,089,392,839** |
| **Fortune (`luck`)** | $+0.5\%$ lucky-slap chance/lv (cap $25\%$); lucky = $1.5\times$ damage, $2.5\times$ coins | 140 | 3,800,000,000 | 50 | **12,407,033,279** |

### 4.1 Milestone Attribute Purchase Costs (Exact Values from Formula Above)

| Buy Lv | Damage (Max 80) | Speed (Max 25) | Crit % (Max 45) | Crit Dmg (Max 65) | Defense (Max 40) | Stun (Max 50) | Combo (Max 65) | Coins (Max 65) | Accuracy (Max 14) | Giant Slayer (Max 40) | Life Leech (Max 40) | Fortune (Max 50) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 80 | 110 | 130 | 90 | 180 | 130 | 75 | 80 | 150 | 180 | 260 | 140 |
| 4 | 153 | 540 | 359 | 186 | 552 | 323 | 156 | 166 | 4,946 | 552 | 791 | 348 |
| 8 | 389 | 5,326 | 1,537 | 529 | 2,754 | 1,194 | 446 | 476 | 744,356 | 2,754 | 3,902 | 1,287 |
| 10 | 627 | 17,221 | 3,239 | 904 | 6,275 | 2,332 | 763 | 816 | 9,722,452 | 6,275 | 8,840 | 2,515 |
| 12 | 1,016 | 56,574 | 6,887 | 1,553 | 14,433 | 4,591 | 1,315 | 1,406 | 130,720,210 | 14,433 | 20,215 | 4,952 |
| 14 | 1,655 | 188,370 | 14,742 | 2,681 | 33,453 | 9,092 | 2,277 | 2,436 | 1,800,000,000 | 33,453 | 46,578 | 9,811 |
| 18 | 4,434 | 2,155,708 | 68,712 | 8,088 | 183,108 | 36,211 | 6,913 | 7,403 | -- | 183,108 | 251,923 | 39,101 |
| 22 | 12,022 | 25,659,465 | 326,200 | 24,724 | 1,022,820 | 146,621 | 21,268 | 22,795 | -- | 1,022,820 | 1,390,295 | 158,428 |
| 24 | 19,869 | 91,068,546 | 714,866 | 43,408 | 2,432,876 | 296,570 | 37,459 | 40,169 | -- | 2,432,876 | 3,286,869 | 320,559 |
| 25 | 25,564 | 180,000,000 | 1,059,643 | 57,571 | 3,757,546 | 422,279 | 49,760 | 53,372 | -- | 3,757,546 | 5,061,039 | 456,513 |
| 32 | 151,280 | -- | 17,021,394 | 421,977 | 80,659,415 | 5,107,992 | 368,857 | 396,307 | -- | 80,659,415 | 106,323,367 | 5,528,638 |
| 36 | 421,790 | -- | 84,415,746 | 1,331,066 | 472,825,774 | 21,509,749 | 1,171,083 | 1,259,475 | -- | 472,825,774 | 615,567,533 | 23,297,000 |
| 40 | 1,182,959 | -- | 422,518,344 | 4,226,443 | 2,800,000,000 | 91,328,487 | 3,742,825 | 4,029,313 | -- | 2,800,000,000 | 3,600,000,000 | 98,984,989 |
| 45 | 4,325,437 | -- | 3,200,000,000 | 18,063,447 | -- | 562,449,042 | 16,128,380 | 17,384,522 | -- | -- | -- | 610,128,658 |
| 48 | 9,449,981 | -- | -- | 43,355,992 | -- | 1,682,532,055 | 38,903,484 | 41,964,911 | -- | -- | -- | 1,826,113,356 |
| 50 | 15,933,287 | -- | -- | 77,844,568 | -- | 3,500,000,000 | 70,081,659 | 75,634,503 | -- | -- | -- | 3,800,000,000 |
| 60 | 220,446,912 | -- | -- | 1,477,570,637 | -- | -- | 1,352,538,662 | 1,463,391,584 | -- | -- | -- | -- |
| 65 | 827,097,565 | -- | -- | 6,500,000,000 | -- | -- | 6,000,000,000 | 6,500,000,000 | -- | -- | -- | -- |
| 70 | 3,119,315,236 | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| 80 | 45,000,000,000 | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

### 4.2 Power — Base Slap Damage per Level

Base slap damage from the `Power` attribute alone: $(10 + 2.2L) \times 1.076^L \times 1.28^{\lfloor L/10 \rfloor}$.

| Power Lv | Damage | Power Lv | Damage | Power Lv | Damage | Power Lv | Damage |
|---|---|---|---|---|---|---|---|
| 0 | 10.00 | 21 | 428.76 | 42 | 5,960.12 | 63 | 65,985.99 |
| 1 | 13.13 | 22 | 479.41 | 43 | 6,550.87 | 64 | 72,052.08 |
| 2 | 16.67 | 23 | 535.27 | 44 | 7,196.99 | 65 | 78,659.08 |
| 3 | 20.68 | 24 | 596.86 | 45 | 7,903.48 | 66 | 85,854.18 |
| 4 | 25.20 | 25 | 664.72 | 46 | 8,675.79 | 67 | 93,688.59 |
| 5 | 30.29 | 26 | 739.45 | 47 | 9,519.84 | 68 | 102,217.95 |
| 6 | 36.00 | 27 | 821.70 | 48 | 10,442.07 | 69 | 111,502.62 |
| 7 | 42.42 | 28 | 912.17 | 49 | 11,449.50 | 70 | 155,658.42 |
| 8 | 49.59 | 29 | 1,011.65 | 50 | 16,063.67 | 71 | 169,735.26 |
| 9 | 57.61 | 30 | 1,434.87 | 51 | 17,601.39 | 72 | 185,052.69 |
| 10 | 85.21 | 31 | 1,588.61 | 52 | 19,280.06 | 73 | 201,717.99 |
| 11 | 97.99 | 32 | 1,757.43 | 53 | 21,112.22 | 74 | 219,847.54 |
| 12 | 112.22 | 33 | 1,942.74 | 54 | 23,111.51 | 75 | 239,567.66 |
| 13 | 128.04 | 34 | 2,146.07 | 55 | 25,292.75 | 76 | 261,015.40 |
| 14 | 145.63 | 35 | 2,369.07 | 56 | 27,672.05 | 77 | 284,339.45 |
| 15 | 165.14 | 36 | 2,613.58 | 57 | 30,266.90 | 78 | 309,701.13 |
| 16 | 186.79 | 37 | 2,881.58 | 58 | 33,096.34 | 79 | 337,275.45 |
| 17 | 210.76 | 38 | 3,175.21 | 59 | 36,181.04 | 80 | 470,082.85 |
| 18 | 237.31 | 39 | 3,496.83 | 60 | 50,615.61 | -- | -- |
| 19 | 266.67 | 40 | 4,926.71 | 61 | 55,306.18 | -- | -- |
| 20 | 382.88 | 41 | 5,420.14 | 62 | 60,417.36 | -- | -- |

*Dragon Mastery: Beating #50 Dragon Lord grants Mastery 1 ($\times 1.25$ global Power multiplier); beating Ravana grants Mastery 2 ($\times 1.45$ global Power multiplier).*

---
## 5. Slap-Coin & Knockout Economy

* **Coins per Slap** = $\text{Enemy Bounty} \times \text{Slap Fraction}$.

| Enemy Band | Base Fraction | Max Multiplier (Normal) | Max Multiplier (Boss) | Per-Fight Slap-Coin Cap | Frontier Challenger Bonus (Unbeaten / Highest Unlocked Enemy) |
|---|---|---|---|---|---|
| #1-#10 | $7.0\%$ of bounty | $\times 2.0$ | $\times 1.50$ | $175\%$ of bounty | $+25\%$ slap coins & $200\%$ cap |
| #11-#30 | $5.5\%$ of bounty | $\times 1.4$ | $\times 1.15$ | $125\%$ of bounty | $+25\%$ slap coins & $175\%$ cap |
| #31-#50 | $5.5\%$ of bounty | $\times 1.3$ | $\times 1.10$ | $125\%$ of bounty | $+25\%$ slap coins & $175\%$ cap |
| Worlds | $10.0\%$ of bounty | -- | -- | $135\%$ of bounty | $+25\%$ slap coins & $175\%$ cap |

* **Post-Cap Rate:** Past a fight's slap-coin cap, slaps pay at **$25\%$** of the normal rate.
* **Over-Level Anti-Farm Decay:** Farming normal enemies more than 5 slots below your current frontier applies a **$-10\%$ coin penalty per slot** below $\text{Frontier} - 5$ (floored at $40\%$ payout).
* **KO Payout (The Kill):** $\text{Bounty} \times 1.30 \times \text{TotalCoinMult}$, where $\text{TotalCoinMult} = (1 + 0.04 \times \text{CoinsLv}) \times \text{Greed } (1.15) \times \text{Golden Aura } (1.15) \times \text{Coin Magnet } (1.20) \times \text{VIP Pass } (1.25) \times \text{Active Boosts}$.
* **Hard Mode (Per Enemy, After First Clear — Positive ROI at All Levels):**
  * **Enemy Stats:** HP $\times 1.75$, Damage $\times 1.25$.
  * **Payout:** **KO Coins $= 4.85 \times 1.30 \times \text{Bounty} \times \text{TotalCoinMult} = 6.305 \times \text{Bounty} \times \text{TotalCoinMult}$** (no slap coins in Hard mode).
  * **Gems & Embers:** **$+3\text{💎}$ on First Hard Clear per enemy only** ($150\text{💎}$ total across #1-#50), World Embers $\times 1.5$ in Hard World fights.
  * **Group Mastery (All 5 in a group cleared on Hard):** **$+10\text{💎}$** ($100\text{💎}$ total across 10 groups) and **$+2\%$ permanent coins**.
* **First-Clear Bonus Chests:** #5 $\to$ 250c + 2💎 · #10 $\to$ 2,200c + 5💎 · #15 $\to$ 12,000c + 2💎 · #20 $\to$ 60,000c + 5💎 · #25 $\to$ 250,000c + 2💎 · #30 $\to$ 1,200,000c + 5💎 · #35 $\to$ 8,000,000c + 3💎 · #40 $\to$ 50,000,000c + 5💎 · #45 $\to$ 280,000,000c + 3💎 · #50 $\to$ 1,500,000,000c + 10💎.
* **Group Reward Chest:** Clearing all 5 enemies in a group unlocks a one-time claimable chest = $100\%$ of the group's 5 bounties combined.

---
## 6. Combat Systems, Speed Caps & Anti-Cheese Locks

| System | v2.6.1 Final Numbers |
|---|---|
| **Player Base Stats** | Damage $10$ (before Power) · Base attack interval $1.500\text{s}$ · Base crit chance $10\%$ · Base crit damage $\times 2.0$ |
| **Speed Progression & 3-Tier Floor System** | • **Base Interval:** $1.500\text{s}$<br>• **Attribute-Only Floor (Speed Lv 25 at $\times 0.9801/\text{lv}$, 0 Speed Skills):** $1.500 \times 0.9801^{25} = \mathbf{0.9075\text{s}}$<br>• **Permanent Skill-Unlocked Floor (Speed Lv 25 + *Second Hand* $\times 0.85$, *Quickening* $\times 0.94$, *Twin Mastery* $\times 0.90$, *Quick Reflexes* $\times 0.90$, *Dual-Hand* $\times 0.85$):** **$0.500\text{s}$** ($2.00\text{ slaps/s}$)<br>• **Skin & World Relic Floor (`Speed.HardCapValue = 0.350f` — *Spider-Man* $+10\%$, *Battle Trance* $+12\%$, *Silent Glove* $+10\%$):** Lowers permanent floor down to **$0.350\text{s}$** ($2.86\text{ slaps/s}$ — preserves measurable DPS gain across all 25 Speed levels)<br>• **Temporary Overdrive Floor (*Frenzy*, *Adrenaline Rush*, *Swift Recovery*, *Infinity Gauntlet Time Stop*):** **$0.300\text{s}$** ($3.33\text{ slaps/s}$) |
| **Crit Chance Cap & Overcap Conversion** | • Base ($10\%$) + `Crit %` Lv 45 ($45\%$) + *Crit Surge* ($8\%$) + *Critical Slaps* ($5\%$) = **$68\%$ F2P Crit** ($75\%$ hard cap with *Wolverine Skin* $+8\%$).<br>• **Overcap Rule:** Any Crit Chance above $75\%$ converts $1:2$ into **Bonus Critical Damage ($+1\%$ excess Crit Chance $= +2\%$ Crit Damage)**. |
| **Armored Poise (Anti-Cheese Lock)** | Active on all **Elites, Mini-Bosses, and Bosses** starting at Enemy #9 (Trash Panda):<br>• **Basic Slaps** landed at **Combo Stack $\le 4$** that are neither Critical Hits nor Skill Procs deal **$-40\%$ damage ($\times 0.60$)**.<br>• **Full $100\%$ Damage Bypass:** Any Critical Hit, any Skill Proc / Weak Spot / Special Move, OR any slap landed at **Combo Stack $\ge 5$** deals $100\%$ full damage. |
| **Deflect / Parry (Works on Regular Enemies Too)** | Unlocks via *Deflect* skill ($22,000\text{c}$):<br>• Spawns a golden parry ring ($0.425\text{s}$, gold window $\approx 74\text{ms}$) on **every 2nd attack of normal enemies**, **every 3rd-attack Group Signature Move**, and **all Elite, Mini-Boss, and Boss normal attacks** to negate $100\%$ of damage and debuffs.<br>• **Boss Signature Mitigation:** Hitting a Gold Parry Ring on a Boss Signature Move reduces its incoming damage by **$50\%$**. |
| **Enemy Evasion & Miss Penalty** | • Base player accuracy is $85\%$ ($+1\%/\text{lv}$ up to $99\%$ at Lv 14).<br>• Enemies in Groups 5-10 & Worlds have **$5\%\text{ to }18\%$ Passive Evasion**.<br>• **Miss Penalty:** Missing a slap drains **2 Combo Stacks** and pauses Special Move cooldown charging for **$1.5\text{s}$**. |
| **Combo System** | Base max 4 stacks · Combo attribute adds $+0.35\%$ dmg/stack and $+0.4$ max stacks/lv ($30$ stacks at Lv 65) · *Combo Mastery* skill adds $+5$ stacks and $+0.5\%$ dmg/stack (Max 35 stacks $\times 23.25\% = \mathbf{9.14\times\text{ damage}}$ / $+813.75\%$ bonus damage). |
| **Stun & Diminishing Returns** | Base chance $5\%$ ($+0.4\%/\text{lv}$, cap **$25\%$ at Lv 50**) · Base duration $0.50\text{s}$ ($+0.018\text{s}/\text{lv}$, cap **$1.40\text{s}$ at Lv 50**) · Enemy swing timer pauses while stunned · **Post-stun immunity: $3.5\text{s}$ normal / $5.0\text{s}$ bosses** · Bosses take $\times 0.5$ stun duration · **$6.0\text{s}$ internal stun cooldown**. |
| **Weak Spots (Precision Instinct)** | Unlocks via *Precision Instinct* skill (timer-driven `AlwaysOn` system) · First at $2.2\text{s}$, then every $5\text{--}8\text{s}$ · Window $1.5\text{s}$ ($1.2\text{s}$ on Hard) · Hit deals **$\times 4.5$ slap damage** + $12$ Frenzy meter · Per-fight cap 3 ($+1$ per 15 Fortune levels, max **6**; **7 with *Giant's Grip***). |
| **Boss Heals (Capped at $2\times 15\%$)** | • **#40 Pharaoh (*Eternal Renewal*):** Heals **$15\%$ Max HP** at $60\%$ and $30\%$ HP (max $2\times$ per fight $= 1.30\times$ effective HP; no damage-reduction shield).<br>• **#50 Dragon Lord (*Dragon Renewal*):** Heals **$15\%$ Max HP** at $60\%$ and $30\%$ HP (max $2\times$ per fight $= 1.30\times$ effective HP).<br>• **#203 Kumbhakaran & World Bosses:** Heal **$15\%$ Max HP** once at $35\%$ HP ($1.15\times$ effective HP).<br>• *All boss heals are disabled inside Boss Rush.* |
| **Enemy Pacing, Boss Enrage & Revive Ad** | • **Enemy Pacing:** First swing at $\times 1.15$ interval; subsequent swings at $\times 1.00$ decaying by $0.99/\text{swing}$ down to $\times 0.85$.<br>• **Boss Enrage:** Below $40\%$ HP, bosses attack at $\times 0.65$ interval and deal $+25\%$ damage.<br>• **Revive Ad:** Resume same fight at $50\%$ Max HP, enemy HP unchanged, swing timer reset, debuffs cleared — **once per fight attempt** (disabled in Gauntlet / Boss Rush / Endless / Blitz / Reflex). |

### 6.1 The 10-Group Stage Debuff Progression (Every 3rd Enemy Attack)

Every 3rd attack by any enemy in a group triggers that group's **Stage Signature Move** (can be parried with *Deflect*; otherwise applies its effect):

| Group | Enemies | Stage Theme | 3rd-Attack Group Signature Move & Debuff (If Not Deflected) |
|---|---|---|---|
| **1** | #1-#5 | Cozy Corner | **Heavy Windup:** Deals $1.35\times$ attack damage with a warning flash (no status debuff). |
| **2** | #6-#10 | Backyard Bunch | **Dirt Fling:** Deals $1.40\times$ damage and reduces **Player Accuracy by $-15\%$ for $3.0\text{s}$**. |
| **3** | #11-#15 | Fight Club | **Ring Haymaker:** Deals $1.60\times$ damage and knocks hands back, **delaying your next slap by $0.65\text{s}$**. |
| **4** | #16-#20 | Castle Guard | **Buckler Brace:** Deals $1.50\times$ damage and raises an armor shield that **reduces damage of your next 3 slaps by $45\%$**. |
| **5** | #21-#25 | Graveyard Shift | **Grave Rot:** Reduces **all Player Healing by $50\%$ for $4.0\text{s}$** and inflicts $1\%$ Max HP/s decay. |
| **6** | #26-#30 | Shadow Dojo | **Chi Disruption:** **Resets your Combo Stacks to 0** and adds **$+2.0\text{s}$ cooldown** to active Special Moves. |
| **7** | #31-#35 | Dark Woods | **Cursed Webbing:** Entangles hands, **reducing Player Slap Speed by $30\%$ for $4.0\text{s}$**. |
| **8** | #36-#40 | Pharaoh's Tomb | **Sands of Siphon:** Reduces **Player Crit Chance by $25\%$ for $4.0\text{s}$** and **heals the enemy for $4\%$ Max HP**. |
| **9** | #41-#45 | Mountain Stronghold | **Tremor Smash:** **Stuns your hands for $0.7\text{s}$** and **reduces your Defense stat by $50\%$ for $4.0\text{s}$**. |
| **10** | #46-#50 | Dragon Lair | **Draconic Scorch:** **Destroys $50\%$ of active player shields** and **burns for $3\%$ Max HP/s over $4.0\text{s}$**. |

---
## 7. Player Special Moves & Boss Signatures

**Player Special Moves** (cooldowns do NOT reset between fights in Trio Gauntlet or Boss Rush):

| Move | Earned From | Damage (Base $\to$ Maxed) | Cooldown (Base $\to$ Maxed) | What It Does |
|---|---|---|---|---|
| **Double Slap** | Boss #10 | $7\times \to 15\times$ slap dmg | $25\text{s} \to 15\text{s}$ | Both hands slam together for one crushing hit (bypasses Armored Poise). |
| **Guard** | Boss #20 | Blocks $100\%$ of one attack | $24\text{s} \to 18\text{s}$ | Unlocked on beating #20 Dark Knight! Cross both hands to block $100\%$ of any incoming attack or Boss Signature Move. |
| **Uppercut Punch** | Boss #40 | $18\times \to 32\times$ slap dmg | $32\text{s} \to 20\text{s}$ | A ferocious rising uppercut that deals massive damage and stuns for $2.5\text{s}$ ($1.25\text{s}$ vs Bosses). |

**Boss Signature Moves Against You** (hitting a Gold Parry Ring mitigates damage by $50\%$; activating *Guard* blocks $100\%$):

| Boss | Move | v2.6.1 Final Effect |
|---|---|---|
| **#10 Mischievous Monkey** | BANANA SLING | Accuracy $-35\%$ for $5\text{s}$ — missed slaps lose 2 Combo stacks and pause Special charging! |
| **#20 Dark Knight** | IRON BULWARK | Iron fortress — absorbs 6 slaps at **$65\%$ damage reduction** and reflects $10\%$ damage back! |
| **#30 Shogun Warlord** | KATANA OMNISLASH | Blade strike dealing **$2.5\times$ damage** and $1.5\text{s}$ stagger (mitigated $50\%$ by Gold Parry, $100\%$ by Guard)! |
| **#40 Pharaoh Revenant** | SAND CURSE & RENEWAL | Reduces slap speed by $35\%$ for $5\text{s}$! Also triggers **ETERNAL RENEWAL** ($15\%$ Max HP heal, max $2\times$). |
| **#50 Dragon Lord** | DRAGON HELLFIRE & RENEWAL | Caldera blaze burns for **$2.5\%$ Max HP/s over $5\text{s}$**! Also triggers **DRAGON RENEWAL** ($15\%$ Max HP heal, max $2\times$). |
| **#203 Kumbhakaran (Asura #3)** | SEISMIC STOMP & AMRITA | Colossal stomp dealing $2.0\times$ damage + $1.0\text{s}$ stun; heals **$15\%$ Max HP** once at $35\%$ HP. |
| **#206 Ravana (Asura #6)** | CHANDRAHASA STRIKE | Moon-blade strike dealing **$2.2\times$ damage**, $1.0\text{s}$ stagger, and $-30\%$ healing for $5\text{s}$! |
| **#213 Puppeteer (Shadow #3)** | MARIONETTE GRIP | Strings weave a barrier absorbing 5 slaps at $50\%$ damage reduction and slowing speed by $20\%$! |
| **#216 Dark Slapper (Shadow #6)** | COUNTER SLAP | Perfected slap returned — **$2.2\times$ damage**, $1.2\text{s}$ stagger, and strips active player shields! |

---
## 8. Enemies #1-#50 — The Playable Main Roster (v2.6.1 Final)

Calibrated across all 50 enemies so **every Chapter Boss TTK lands inside $31\text{s}\text{--}65\text{s}$**, **Player Un-Parried Survival lands in $14\text{s}\text{--}21.5\text{s}$**, and **every Chapter requires ~25.9–26.1 Boss Kills** to complete all upgrades.

| # | Enemy | Group | HP (v2.6.1) | Dmg (v2.6.1) | Atk Every | Evasion | Slap Value (Base) | Bounty (KO Base) | Tag |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Training Dummy | Cozy Corner | 65 | 8 | 2.40s | 0% | ~4 | 63 | |
| 2 | Rubber Duck | Cozy Corner | 115 | 11 | 2.35s | 0% | ~6 | 91 | |
| 3 | Rubber Chicken | Cozy Corner | 195 | 14 | 2.30s | 0% | ~9 | 134 | |
| 4 | Cardboard Knight | Cozy Corner | 340 | 18 | 2.25s | 0% | ~14 | 197 | |
| 5 | Grumpy Teddy | Cozy Corner | 650 | 25 | 2.05s | 0% | ~23 | 331 | MINI-BOSS |
| 6 | Sassy Goblin Sprout | Backyard Bunch | 920 | 28 | 2.20s | 0% | ~31 | 447 | |
| 7 | Mime | Backyard Bunch | 1,450 | 33 | 2.15s | 0% | ~45 | 645 | |
| 8 | Cocky Goose | Backyard Bunch | 2,350 | 39 | 2.10s | 0% | ~65 | 930 | |
| 9 | Trash Panda | Backyard Bunch | 4,200 | 48 | 2.05s | 0% | ~99 | 1,410 | ELITE |
| 10 | Mischievous Monkey | Backyard Bunch | 8,500 | 58 | 1.95s | 0% | ~154 | 2,200 | BOSS |
| 11 | Bodybuilder | Fight Club | 12,500 | 66 | 2.13s | 0% | ~252 | 4,590 | |
| 12 | Luchador Wrestler | Fight Club | 18,500 | 75 | 2.10s | 0% | ~345 | 6,280 | |
| 13 | Kickboxer | Fight Club | 27,500 | 85 | 2.08s | 0% | ~472 | 8,580 | |
| 14 | Adult Boxer | Fight Club | 41,000 | 96 | 2.05s | 0% | ~645 | 11,720 | |
| 15 | Sumo Champion | Fight Club | 68,000 | 115 | 2.03s | 0% | ~957 | 17,400 | MINI-BOSS |
| 16 | Castle Guard | Castle Guard | 92,000 | 110 | 2.00s | 0% | ~1,263 | 22,960 | |
| 17 | Royal Executioner | Castle Guard | 125,000 | 120 | 1.98s | 0% | ~1,701 | 30,930 | |
| 18 | Knight | Castle Guard | 165,000 | 130 | 1.95s | 0% | ~2,286 | 41,570 | |
| 19 | Barbarian | Castle Guard | 210,000 | 142 | 1.93s | 0% | ~2,685 | 48,820 | ELITE |
| 20 | Dark Knight | Castle Guard | 400,000 | 155 | 1.84s | 0% | ~3,190 | 58,000 | BOSS |
| 21 | Skeleton Warrior | Graveyard Shift | 420,000 | 147 | 1.88s | 5% | ~3,872 | 70,400 | |
| 22 | Zombie | Graveyard Shift | 560,000 | 164 | 1.86s | 5% | ~5,264 | 95,700 | |
| 23 | Armored Skeleton | Graveyard Shift | 750,000 | 185 | 1.84s | 5% | ~7,139 | 129,800 | |
| 24 | Scarab Swarm | Graveyard Shift | 1,000,000 | 208 | 1.82s | 5% | ~9,680 | 176,000 | |
| 25 | Mummy Guard | Graveyard Shift | 1,380,000 | 244 | 1.79s | 6% | ~13,915 | 253,000 | MINI-BOSS |
| 26 | Ninja Recruit | Shadow Dojo | 1,750,000 | 260 | 1.77s | 6% | ~18,392 | 334,400 | |
| 27 | Shuriken Master | Shadow Dojo | 2,200,000 | 287 | 1.75s | 6% | ~24,442 | 444,400 | |
| 28 | Samurai Duelist | Shadow Dojo | 2,750,000 | 318 | 1.73s | 6% | ~32,428 | 589,600 | |
| 29 | Shadow Assassin | Shadow Dojo | 3,350,000 | 351 | 1.71s | 8% | ~42,350 | 770,000 | ELITE |
| 30 | Shogun Warlord | Shadow Dojo | 4,100,000 | 386 | 1.63s | 8% | ~54,450 | 990,000 | BOSS |
| 31 | Werewolf | Dark Woods | 4,600,000 | 445 | 1.67s | 10% | ~87,061 | 1,582,920 | |
| 32 | Giant Spider | Dark Woods | 6,100,000 | 512 | 1.65s | 10% | ~111,828 | 2,033,230 | |
| 33 | Orc Warrior | Dark Woods | 8,200,000 | 588 | 1.63s | 10% | ~144,100 | 2,620,000 | |
| 34 | Bog Witch | Dark Woods | 11,000,000 | 676 | 1.61s | 10% | ~186,129 | 3,384,170 | |
| 35 | Shadow Beast | Dark Woods | 15,000,000 | 790 | 1.59s | 10% | ~247,672 | 4,503,120 | MINI-BOSS |
| 36 | Giant Serpent | Pharaoh's Tomb | 19,000,000 | 882 | 1.57s | 10% | ~315,219 | 5,731,250 | |
| 37 | Anubis Warrior | Pharaoh's Tomb | 23,500,000 | 991 | 1.55s | 10% | ~397,776 | 7,232,290 | |
| 38 | Sphinx Riddler | Pharaoh's Tomb | 29,000,000 | 1,109 | 1.53s | 10% | ~495,344 | 9,006,250 | |
| 39 | Giant Scorpion | Pharaoh's Tomb | 35,000,000 | 1,243 | 1.51s | 12% | ~600,417 | 10,916,670 | ELITE |
| 40 | Pharaoh Revenant | Pharaoh's Tomb | 42,000,000 | 1,386 | 1.44s | 12% | ~720,500 | 13,100,000 | BOSS |
| 41 | Troll | Mountain Stronghold | 55,000,000 | 1,512 | 1.48s | 12% | ~1,011,845 | 18,397,190 | |
| 42 | Ogre | Mountain Stronghold | 71,000,000 | 1,646 | 1.46s | 12% | ~1,221,193 | 22,203,510 | |
| 43 | Minotaur | Mountain Stronghold | 92,000,000 | 1,798 | 1.44s | 12% | ~1,482,877 | 26,961,400 | |
| 44 | Cyclops | Mountain Stronghold | 118,000,000 | 1,966 | 1.42s | 12% | ~1,796,898 | 32,670,880 | |
| 45 | Stone Golem | Mountain Stronghold | 152,000,000 | 2,167 | 1.40s | 12% | ~2,233,039 | 40,600,700 | MINI-BOSS |
| 46 | Elder Dragon | Dragon Lair | 195,000,000 | 2,335 | 1.40s | 12% | ~2,651,733 | 48,213,330 | |
| 47 | Dragon Champion | Dragon Lair | 250,000,000 | 2,520 | 1.40s | 12% | ~3,140,211 | 57,094,740 | |
| 48 | Crystal Dragon | Dragon Lair | 315,000,000 | 2,722 | 1.40s | 12% | ~3,698,470 | 67,244,910 | |
| 49 | Ancient Dragon | Dragon Lair | 395,000,000 | 2,940 | 1.40s | 14% | ~4,291,621 | 78,029,470 | ELITE |
| 50 | Dragon Lord | Dragon Lair | 490,000,000 | 3,192 | 1.40s | 15% | ~4,972,000 | 90,400,000 | FINAL BOSS |

---
## 9. Roster Data #51-#100 — Post-Shadow Verse Expansion (Chapter 8+)

*In v2.6.1, the unplayable #51-#100 roster is anchored cleanly above #216 The Dark Slapper (`22.0B HP` / `26,500 Dmg` / `1.15B Bounty`) so there is zero backward dip when Chapter 8+ opens after Shadow Verse:*

| # | Enemy | Group | HP (v2.6.1) | Dmg (v2.6.1) | Atk Every | Bounty (v2.6.1) | Tag |
|---|---|---|---|---|---|---|---|
| 51 | Frost Wolf Alpha | Frozen Wastes | 28,500,000,000 | 31,500 | 1.22s | 1,480,000,000 | |
| 52 | Ice Witch | Frozen Wastes | 37,000,000,000 | 35,000 | 1.22s | 1,900,000,000 | |
| 53 | Snow Golem | Frozen Wastes | 48,000,000,000 | 39,000 | 1.22s | 2,450,000,000 | |
| 54 | Yeti Brute | Frozen Wastes | 62,500,000,000 | 43,500 | 1.22s | 3,150,000,000 | |
| 55 | Glacier Titan | Frozen Wastes | 85,000,000,000 | 49,500 | 1.20s | 4,250,000,000 | MINI-BOSS |
| 56-60 | Dinosaur Valley (#56-#60) | Dinosaur Valley | $110\text{B} \to 330\text{B}$ | $55\text{k} \to 82\text{k}$ | 1.20s | $5.50\text{B} \to 16.5\text{B}$ | BOSS #60 |
| 61-70 | Hell Gate & Olympus (#61-#70) | Groups 13-14 | $430\text{B} \to 5.75\text{T}$ | $92\text{k} \to 225\text{k}$ | 1.20s | $21.5\text{B} \to 285\text{B}$ | BOSS #70 |
| 71-80 | Mech Factory & Aliens (#71-#80) | Groups 15-16 | $7.45\text{T} \to 100\text{T}$ | $255\text{k} \to 620\text{k}$ | 1.20s | $370\text{B} \to 4.95\text{T}$ | BOSS #80 |
| 81-90 | Sky Temple & Abyss (#81-#90) | Groups 17-18 | $130\text{T} \to 1.75\text{Qa}$ | $700\text{k} \to 1.70\text{M}$ | 1.20s | $6.40\text{T} \to 86.0\text{T}$ | BOSS #90 |
| 91-100 | Cosmic Void & Heaven (#91-#100) | Groups 19-20 | $2.25\text{Qa} \to 30.0\text{Qa}$ | $1.90\text{M} \to 4.20\text{M}$ | 1.20s | $112\text{T} \to 1.48\text{Qa}$ | BOSS #100 |

---
## 10. Skills — All 27 (v2.6.1 Final with Explicit Trigger Parameters)

Bought with coins from the skill tree. **Speed Skills are mandatory to lower your permanent attack interval from the $0.9075\text{s}$ attribute-only floor down to the $0.500\text{s}$ permanent cap**, and **Proc/Crit/Combo Skills are mandatory to bypass the $-40\%$ Armored Poise damage reduction** on Elites and Bosses.

| Tier | Skill | Cost (v2.6.1) | Needs First | Boss Gate | Trigger & Interval / Threshold | v2.6.1 Final Effect |
|---|---|---|---|---|---|---|
| 1 | **Basic Slap** | 0 | -- | -- | `AlwaysOn` | The slap everything starts with. Already yours. |
| 1 | **Stamina Training** | 300 | Basic Slap | -- | `AlwaysOn` | $+75$ Max HP. |
| 1 | **Stronger Hands** | 750 | Basic Slap | -- | `AlwaysOn` | $+20\%$ damage on every slap ($\times 1.20$). |
| 1 | **Second Hand** | FREE (1,000 tag) | Basic Slap | Beat #5 | `AlwaysOn` | Claimed FREE on beating #5 Grumpy Teddy. Alternates L/R hands, reducing base slap interval from $1.500\text{s} \to 1.275\text{s}$ ($\times 0.85$). |
| 2 | **Twin Mastery** | 3,200 | Second Hand | -- | `AlwaysOn` | Reduces permanent slap interval by $\times 0.90$ and grants $+10\%$ combo charge (no boss gate). |
| 2 | **On Target** | 6,500 | Twin Mastery | -- | `AlwaysOn` | Combo stacks survive switching enemies (resets on defeat). |
| 2 | **Quick Reflexes** | 15,000 | Twin Mastery | Beat #10 | `AlwaysOn` | Reduces permanent slap interval by $\times 0.90$. |
| 2 | **Deflect** | 22,000 | Basic Slap | -- | `AlwaysOn` | Every 2nd normal enemy attack, every 3rd-attack Group Signature, and all Elite/Mini-Boss/Boss normal attacks spawn a golden parry ring; tap to negate $100\%$ damage (mitigates $50\%$ of Boss Signature Moves). |
| 2 | **Critical Slaps** | 35,000 | Stronger Hands | -- | `AlwaysOn` | $+5\%$ critical strike chance (helps bypass Armored Poise). |
| 2 | **Seismic Slam** | 55,000 | Stamina Training | Beat #10 | `ProcEveryNSlaps` (`5`) | Every **5th slap** lands a SEISMIC SLAM dealing **$3.0\times$ damage** (bypasses Poise) and dazing the enemy for $0.8\text{s}$! |
| 2 | **Heavy Slap** | 90,000 | Stronger Hands | Beat #10 | `ProcOnHit` ($12\%$) | $12\%$ chance a slap lands HEAVY for **$2.5\times$ damage** (bypasses Poise). |
| 2 | **Precision Instinct** | 140,000 | Stronger Hands | Beat #10 | `AlwaysOn` (timer-driven) | Unlocks PRECISION strikes: a gold weak spot flashes mid-fight — tap it for a **$4.5\times$ critical strike**! Max 3 per fight ($+1$ per 15 Fortune levels, max 6; 7 w/ *Giant's Grip*). |
| 3 | **Combo Mastery** | 300,000 | On Target | Beat #10 | `AlwaysOn` | Combo cap $+5$ stacks and $+0.5\%$ damage per stack. |
| 3 | **Opportunist** | 600,000 | Quick Reflexes | -- | `ProcOnHit` | Slaps deal $+35\%$ damage to Stunned or Dazed enemies. |
| 3 | **Adrenaline Rush** | 1,100,000 | Seismic Slam | -- | `OnLowHpState` (`<30%`) | Below **$30\%$ HP**: gain $+20\%$ temporary Overdrive slap speed and $+25\%$ damage. |
| 3 | **Coin Magnet** | 2,000,000 | Critical Slaps | Beat #20 | `AlwaysOn` | $+20\%$ coins from every KO. |
| 3 | **Boss Hunter** | 3,800,000 | Heavy Slap | Beat #20 | `AlwaysOn` | $+25\%$ damage vs Group Elites, Mini-Bosses, and Bosses. |
| 4 | **Acoustic Echo** | 8,500,000 | Combo Mastery | Beat #30 | `ProcOnHit` ($20\%$) | Critical slaps have a **$20\%$ chance** to echo for **$+100\%$ bonus damage**. |
| 4 | **Dual-Hand Technique** | 18,000,000 | Opportunist | Beat #20 | `AlwaysOn` | Reduces permanent slap interval by $\times 0.85$ (reaches exact $0.500\text{s}$ permanent cap at Speed Lv 25). |
| 4 | **Unstoppable Hands** | 38,000,000 | Adrenaline Rush | Beat #30 | `AlwaysOn` | $+1,400$ Max HP and regenerate **$0.35\%$ Max HP/s** during fights. |
| 4 | **Kinetic Barrier** | 75,000,000 | Adrenaline Rush | Beat #30 | `ProcEveryNSlaps` (`10`) | Every **10 slaps** builds a shield absorbing **$12\%$ of Max HP** damage (max $24\%$ Max HP, $10\text{s}$ internal cooldown). |
| 4 | **Treasure Hunter** | 150,000,000 | Coin Magnet | Beat #30 | `AlwaysOn` | Elites and Bosses drop $+25\%$ bonus coins, and first-clear/milestone defeats grant $+1$ extra Gem. |
| 4 | **Frenzy** | 300,000,000 | Boss Hunter | Beat #30 | `ActiveDurationState` | Slaps charge FRENZY: $10\text{s}$ of $+50\%$ damage and $+30\%$ Overdrive speed (bypasses $0.50\text{s}$ cap down to $0.30\text{s}$). |
| 4 | **Colossus Bane** | 600,000,000 | Boss Hunter | Beat #35 | `AlwaysOn` | $+35\%$ damage vs Giant, Titan, and Dragon enemies (#35-#50 & Worlds). |
| 5 | **Rapid Barrage** | 1,200,000,000 | Dual-Hand Technique | -- | `ProcEveryNSlaps` (`6`) | Every **6th slap** unleashes a barrage: 3 extra hits at $40\%$ damage each ($+120\%$ total). |
| 5 | **Bulwark Guard** | 2,400,000,000 | Kinetic Barrier | -- | `AlwaysOn` | When Defense or Barrier mitigates damage, $50\%$ of the blocked damage is reflected back to the enemy. |
| 5 | **Godhand Strike** | 5,000,000,000 | Colossus Bane | Beat #45 | `ProcEveryNSlaps` (`20`) | Every **20th slap** triggers the Godhand Ultimate: an **$8.0\times$ screen-shattering strike**! |

**Exact Total Cost of the Skill Tree: 9,797,667,750 coins (exact sum of all 27 skills).**

---
## 11. Game Modes & Timings (v2.6.1 Final)

### 11.1 Trio Gauntlet — True Endurance Mode (Unlock: Clear Any Group of 5)
* **Format:** Fight the group's 3 toughest enemies (#3 Normal, #4 Elite, #5 Mini-Boss/Boss) back-to-back with **1 persistent health bar**:
  * **Bout 1 (Enemy #3):** $1.00\times$ HP · $1.00\times$ Dmg
  * **Bout 2 (Enemy #4 Elite):** $1.15\times$ HP · $1.10\times$ Dmg
  * **Bout 3 (Enemy #5 Boss/Mini-Boss):** $1.25\times$ HP · $1.15\times$ Dmg
* **No Cornerman Drafts & No Special Resets:** Special Move cooldowns (`Double Slap`, `Guard`, `Uppercut`) do NOT reset between bouts; Combo Stacks decay by $50\%$ during the $2\text{s}$ transition between bouts.
* **Clutch Execution Recovery:**
  * **Base Breather:** $+5\%$ Max HP between bouts.
  * **Clean Defense Bonus:** $+3\%$ Max HP for every attack Parried (*Deflect*) or Blocked (*Guard*) during the bout (capped at $+12\%$ Max HP).
  * **Overkill Finisher:** Landing the killing blow with a Special Move or Weak Spot grants $+5\%$ Max HP and shaves $-3\text{s}$ off active Special cooldowns.
* **Payout & Cooldown:** Slap coins $\times 0.50$; Completion Bonus $= (\text{Sum of 3 Bounties}) \times 1.35 \times \text{TotalCoinMult} + 3\text{💎}$ first clear ($1\text{💎}$ repeats on highest cleared group only). **Shared 30-minute global cooldown.**

### 11.2 Boss Rush — Strictly Monotonic Apex Scaling + Cornerman Drafts (Unlock: Beat Boss #20)
* **Format:** Fight all main-roster Chapter Bosses defeated so far (#10 $\to$ #20 $\to$ #30 $\to$ #40 $\to$ #50) sequentially. **HP and Special Move cooldowns carry over** between rounds.
* **Strictly Monotonic Apex Boss Scaling (All Boss Heals Disabled in Boss Rush):**
  * Each round scales cleanly as a fraction of your **Highest Defeated Boss's Base Stats** (`MaxBossHP` and `MaxBossDmg`):
    * **Round 1 (#10 Monkey):** $\text{HP} = 0.30 \times \text{MaxBossHP}$ · $\text{Dmg} = 0.50 \times \text{MaxBossDmg}$
    * **Round 2 (#20 Dark Knight):** $\text{HP} = 0.45 \times \text{MaxBossHP}$ · $\text{Dmg} = 0.65 \times \text{MaxBossDmg}$
    * **Round 3 (#30 Shogun):** $\text{HP} = 0.60 \times \text{MaxBossHP}$ · $\text{Dmg} = 0.78 \times \text{MaxBossDmg}$
    * **Round 4 (#40 Pharaoh):** $\text{HP} = 0.75 \times \text{MaxBossHP}$ · $\text{Dmg} = 0.90 \times \text{MaxBossDmg}$
    * **Round 5 (#50 Dragon Lord):** $\text{HP} = 1.00 \times \text{MaxBossHP}$ · $\text{Dmg} = 1.00 \times \text{MaxBossDmg}$
* **Between-Round Recovery & Cornerman Draft:** Heal $+15\%$ Max HP between rounds and pick **1 of 3 Boxing Cornerman Draft Cards** (active for the remainder of the run):
  1. 🩹 **Cutman's Ice Pack:** Immediately heal $+35\%$ Max HP right now and reduce incoming Burn/DoT damage by $50\%$.
  2. 🛡️ **Cornerman's Towel:** Start each remaining boss fight with a $25\%$ Max HP Barrier Shield.
  3. 🥊 **Loaded Wraps:** Your first 8 slaps in each remaining fight deal $\times 1.75$ damage and bypass boss shields.
  4. ⚡ **Smelling Salts:** Special Moves start each round $100\%$ charged, and Frenzy fills $40\%$ faster this run.
  5. 🎯 **Coach's Spotter:** A Gold Weak Spot is guaranteed to spawn $1.5\text{s}$ into each fight, stays open $+0.5\text{s}$ longer, and deals $+30\%$ bonus damage.
  6. 🔔 **Saved by the Bell:** Bosses start each round Dazed for $1.5\text{s}$ and their attack swing timer is $15\%$ slower this run.
  7. 🩸 **Second Wind Tonic:** The first time you drop below $35\%$ HP in each round, heal $25\%$ Max HP and gain $+25\%$ Overdrive Slap Speed for $5\text{s}$.
  8. 💰 **High-Roller Purse:** Bosses deal $+20\%$ damage for the rest of the run, but your final Boss Rush Completion Coin Payout is increased by $+50\%$.
* **Payout & Cooldown:** Slaps pay $\times 0.50$ slap coins; Completion Payout $= (\text{Sum of Defeated Boss Base Bounties}) \times 1.80 \times \text{TotalCoinMult}$ (plus $+1\text{🔥}$ per boss once Dragon Lord is beaten). **60-minute cooldown.**

### 11.3 Endless Mode — Reachable Wave 50 & Mastery Every 15 Waves (Unlock: Beat Boss #10)
* **Format:** Endless waves cycling your frontier enemy; **HP scales by $1.045^{\text{wave}-1}$** ($8.64\times$ HP at Wave 50 for a ~30-minute full 50-wave session) and **Damage scales by $1.035^{\text{wave}-1}$** ($5.40\times$ Dmg at Wave 50). Pick 1 Cornerman Draft every 5 waves (max 3 active).
* **Endless Mastery:** Every **15 waves survived** (Waves 15, 30, 45) grants **$+1$ temporary Player Level** for that run.
* **Payout & Cooldown:** Per wave $= \text{Frontier Bounty} \times \min(1.0,\ 0.20 + 0.05 \times \text{wave}) \times \text{TotalCoinMult}$; $+1\text{💎}$ (and $+1\text{🔥}$ post-Dragon Lord) every 5 waves. **45-minute cooldown.**

### 11.4 Golden Dummy Blitz — Rescaled Achievable 20-Tier Track (Unlock: 10 Defeats · 2 Charges · 45-Min Recharge)
* **Format:** $20\text{s}$ against the Golden Dummy (pure DPS test; slaps pay 0 coins). Reaching milestone **Tiers 3, 6, 9, 12, 15, and 18** adds **$+1.5\text{s}$** each (max $+9\text{s} = 29\text{s}$ max duration).
* **Payout (Highest Tier Reached Only — Not Cumulative Across Tiers):** Receives the single highest tier's coin payout multiplied by `TotalCoinMult`. Milestone tiers ($3, 6, 9, 12, 15, 18, 20$) pay **$+2\text{💎}$ First-Reach Bonus** ($14\text{💎}$ total track), and repeat runs reaching Tier 10+ award **$+1\text{💎}$**.

| Tier | Name | Score Needed ($\times$ Base DPS) | Total Run Coin Payout ($\times$ Frontier Bounty $\times$ TotalCoinMult) | First-Reach Gem Bonus |
|---|---|---|---|---|
| 1 | BRONZE I | $\times 2$ | $\times 0.40$ | -- |
| 2 | BRONZE II | $\times 4$ | $\times 0.60$ | -- |
| 3 | BRONZE III (+1.5s) | $\times 6$ | $\times 0.80$ | $+2\text{💎}$ |
| 4 | BRONZE IV | $\times 8$ | $\times 1.00$ | -- |
| 5 | SILVER I | $\times 10$ | $\times 1.20$ | -- |
| 6 | SILVER II (+1.5s) | $\times 13$ | $\times 1.40$ | $+2\text{💎}$ |
| 7 | SILVER III | $\times 16$ | $\times 1.60$ | -- |
| 8 | SILVER IV | $\times 19$ | $\times 1.80$ | -- |
| 9 | GOLD I (+1.5s) | $\times 22$ | $\times 2.00$ | $+2\text{💎}$ |
| 10 | GOLD II | $\times 25$ | $\times 2.25$ | -- *(Repeat Tier 10+ pays +1💎)* |
| 11 | GOLD III | $\times 28$ | $\times 2.50$ | -- |
| 12 | GOLD IV (+1.5s) | $\times 32$ | $\times 2.75$ | $+2\text{💎}$ |
| 13 | PLATINUM I | $\times 36$ | $\times 3.00$ | -- |
| 14 | PLATINUM II | $\times 40$ | $\times 3.25$ | -- |
| 15 | DIAMOND I (+1.5s) | $\times 44$ | $\times 3.50$ | $+2\text{💎}$ |
| 16 | DIAMOND II | $\times 48$ | $\times 3.70$ | -- |
| 17 | MASTER I | $\times 53$ | $\times 3.90$ | -- |
| 18 | MASTER II (+1.5s) | $\times 58$ | $\times 4.10$ | $+2\text{💎}$ |
| 19 | GRANDMASTER | $\times 63$ | $\times 4.30$ | -- |
| 20 | LEGEND | $\times 68$ | $\times 4.50$ | $+2\text{💎}$ |

### 11.5 Reflex Slap-Off (Unlock: 5 Defeats · 2 Charges · 30-Min Recharge)
* **Format:** Duel your strongest defeated enemy. Slaps drain **$2\%$** of the pool, parry rings **$12\%$**, weak spots **$8\%$**. A missed ring costs $15\%$ of your Max HP; 2 consecutive ring misses = instant loss.
* **Payout:** Win pays **$2.0 \times \text{Enemy Bounty} \times \text{TotalCoinMult} + 1\text{💎}$**.

### 11.6 Street Brawl Anomalies (25% Chance on Repeat Main-Roster Fights)
* 🎈 **Piñata:** Enemy has **$0.60\times$ HP**, takes **$1.00\times$ full player damage**, deals $0.5\times$ damage, and pays $\times 3.0$ slap coins; flees at **$15\text{s}$** — deal $\ge 50\%$ of its HP ($0.30\times$ normal enemy HP) before it flees to win a $1.35\times$ bounty chest.
* 💀 **Sudden Death:** Both sides deal $\times 2.2$ damage; winning pays $\times 1.40$ coins.
* ⛈️ **Slap Storm:** Your slaps deal $\times 0.5$, but weak spots appear every $1.5\text{s}$.
* 🔥 **Berserker:** Enemy attacks at $\times 0.7$ interval ($30\%$ faster), player stuns blocked; win pays **$+1\text{💎}$ and $\times 1.35$ coins**.

### 11.7 Dojo Bounties — Daily Contract Board (Refreshes at Midnight)
* **4 contracts per day**, generated once at midnight (no mid-day refills).
* **Payout per Contract:** **$1.0 \times \text{Frontier Enemy Bounty} \times \text{TotalCoinMult} + 2\text{💎}$** on all 53 contract variants. Completing all 4 contracts in a day awards a **$+4\text{💎}$ Full Board Bonus** (max **$12\text{💎}/\text{day}$** from Dojo Bounties).

---
## 12. The Worlds — Asura Realm & Shadow Verse (v2.6.1 Final)

Unlock: Beat #50 Dragon Lord $\to$ Asura Realm; beat Ravana $\to$ Shadow Verse. World gems: mini-boss first clear $+5\text{💎}$, final boss $+30\text{💎}$. Hard World fights: HP $\times 1.75$, Dmg $\times 1.25$, KO Coins $= 6.305 \times \text{Bounty} \times \text{TotalCoinMult}$, Embers $\times 1.5$.

### World 1 — ASURA REALM (Chapter 6: Lv Cap 44, Power Cap 70)

| Slot | Guardian | HP (v2.6.1) | Dmg (v2.6.1) | Atk Every | Evasion | Bounty (v2.6.1) | 🔥 First Clear | 🔥 Repeats | Role |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Asura Footman | 650,000,000 | 4,400 | 1.38s | 15% | 66,600,000 | 3 | 1 | |
| 2 | Rakshasa Huntress | 850,000,000 | 5,100 | 1.36s | 15% | 91,100,000 | 4 | 1 | |
| 3 | Kumbhakaran | 1,120,000,000 | 5,950 | 1.35s | 15% | 126,100,000 | 5 | 2 | MINI BOSS |
| 4 | Mahishasura | 1,450,000,000 | 6,950 | 1.34s | 16% | 171,600,000 | 5 | 2 | |
| 5 | Vetala Warlock | 1,880,000,000 | 8,200 | 1.32s | 16% | 236,400,000 | 6 | 2 | |
| 6 | Ravana | 4,600,000,000 | 9,800 | 1.30s | 16% | 324,000,000 | 10 | 3 | WORLD BOSS |

### World 2 — SHADOW VERSE (Chapter 7: Lv Cap 50, Power Cap 80)

| Slot | Guardian | HP (v2.6.1) | Dmg (v2.6.1) | Atk Every | Evasion | Bounty (v2.6.1) | 🔥 First Clear | 🔥 Repeats | Role |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Shade of the Dummy | 3,200,000,000 | 11,800 | 1.30s | 16% | 465,900,000 | 6 | 2 | |
| 2 | Umbral Mime | 4,200,000,000 | 13,900 | 1.28s | 16% | 565,100,000 | 7 | 3 | |
| 3 | Umbral Puppeteer | 9,000,000,000 | 16,400 | 1.26s | 17% | 684,100,000 | 8 | 3 | MINI BOSS |
| 4 | Gloom Serpent | 5,500,000,000 | 19,200 | 1.25s | 17% | 822,800,000 | 9 | 4 | |
| 5 | The Hollow Monk | 6,000,000,000 | 22,500 | 1.24s | 18% | 971,600,000 | 10 | 5 | |
| 6 | The Dark Slapper | 22,000,000,000 | 26,500 | 1.22s | 18% | 1,150,000,000 | 15 | 6 | WORLD BOSS |

### Ember Arts (Sanctuary Store — Total 165🔥)
* 🔁 **Echo Palm (20🔥):** Every 8th slap echoes — a phantom slap lands at $60\%$ damage.
* 💓 **Frenzy Heart (15🔥):** Your Frenzy meter fills $30\%$ faster.
* 🕊️ **Phoenix Heart (35🔥):** Once per fight (`PhoenixRevive`), a fatal blow leaves you at $25\%$ HP + $1.5\text{s}$ invulnerability.
* ⚡ **Battle Trance (25🔥):** $+12\%$ slap speed (lowers permanent cap toward $0.35\text{s}$) and $+25\%$ critical damage across all fights.
* ✊ **Giant's Grip (15🔥):** $+1$ max precision crits per fight (raises weak-spot cap from $6 \to 7$).
* 👁️ **Eagle Eye (12🔥):** Weak spots stay open $0.5\text{s}$ longer.
* 🪙 **Greed Mantra (18🔥):** $+25\%$ coins from World fights.
* 🏹 **Sovereign's Bane (25🔥):** $+15\%$ damage against all bosses.

### Relics (12 Deterministic Guardian Relics — ★2 = 3 Clears + 10🔥 · ★3 = 8 Clears + 25🔥)
* **Asura 1 — Bronze War Bell:** $+10\% / +20\% / +30\%$ coins in World fights.
* **Asura 2 — Rakshasa Fang:** $+8\% / +16\% / +24\%$ crit damage.
* **Asura 3 — Slumber Bell:** Enemies attack $4\% / 8\% / 12\%$ slower.
* **Asura 4 — Horn of the Stampede:** $+10\% / +20\% / +30\%$ damage in World fights.
* **Asura 5 — Skull of Whispers:** Weak spots appear $10\% / 20\% / 30\%$ sooner.
* **Asura 6 — Crown of Ten Kings:** $+15\% / +25\% / +40\%$ damage vs World final bosses.
* **Shadow 1 — Splinter of the First Foe:** $+8\% / +16\% / +24\%$ damage vs non-bosses.
* **Shadow 2 — Silent Glove:** $+4\% / +7\% / +10\%$ slap speed.
* **Shadow 3 — Puppet Strings:** Enemy specials & signature moves charge $15\% / 30\% / 45\%$ slower.
* **Shadow 4 — Venomfang Coil:** $+10\% / +20\% / +30\%$ damage vs stunned enemies.
* **Shadow 5 — Beads of the Void:** $+20\% / +40\% / +60\%$ Dragon Embers earned.
* **Shadow 6 — Mirror Palm:** Sets Active Hand Skin trigger threshold to **9 / 8 / 7 normal slaps** (`SetCooldownTo`)!

---
## 13. Shop, Hand Skins & Real-Money Purchases

### 13.1 Hand Skins (Global Multiplicative Bonuses + Active 9th-Slap Signature Powers)

Every equipped skin grants a **Global Multiplicative Bonus** and an **Active Skin Power** that triggers every **9 normal slaps** (set to **8 slaps at ★2** and **7 slaps at ★3** with the *Mirror Palm* relic).
* **Anti-Infinite-Loop Rule:** Slaps landed while a Skin Buff or Time Stop is currently active **do NOT increment the 9-slap counter**, and the **Infinity Gauntlet Time Stop** has a **$10.0\text{s}$ recharge cooldown** after the $5.0\text{s}$ freeze ends before the slap counter resumes charging.

| Skin | Gem Price | Bundle Price | Equipped Passive Bonus (Global Multiplier) | Active Skin Power (Every 9 Normal Slaps · 8 at ★2 / 7 at ★3 Mirror Palm) |
|---|---|---|---|---|
| **Classic** | Free | -- | -- | -- |
| **Spider-Man** | 300💎 | ₹149 | **$+10\%$ Slap Speed** (lowers permanent cap toward $0.35\text{s}$) | 🕸️ **Web Snare:** Deals **$1.5\times$ slap damage** and slows the enemy's attack swing timer by **$25\%$ for $2.5\text{s}$**. |
| **Wolverine** | 1,000💎 | ₹249 | **$+8\%$ Crit Chance & $+15\%$ Crit Dmg** | 爪 **Berserker Slash:** Guaranteed critical strike dealing **$2.2\times$ damage** and healing you for **$2\%$ Max HP**. |
| **Thor** | 2,000💎 | ₹399 | **$\times 1.15$ Total Damage & $+15\%$ Coins** | ⚡ **Thunder Call:** Calls lightning for **$3.0\times$ slap damage** and **dazes the enemy for $0.6\text{s}$**. |
| **Hulk** | 3,500💎 | ₹799 | **$\times 1.25$ Total Damage & $+15\%$ Max HP** | 💥 **Gamma Smash:** Deals **$4.0\times$ slap damage**, shatters $50\%$ of enemy shields, and grants **$+20\%$ damage for $3.0\text{s}$**. |
| **Infinity Gauntlet** | 9,000💎 | ₹2,499 | **$\times 1.35$ Total Damage & $+20\%$ Coins** | 🧤 **Infinity Time Stop:** Freezes the enemy in **Time Stop for $5.0\text{s}$** while granting **$+50\%$ Slap Damage and $+50\%$ Overdrive Slap Speed** (down to $0.30\text{s}$; $10\text{s}$ post-freeze recharge cooldown). |

### 13.2 Coin Packs, Gem Packs, Bundles & Permanent Features

* **Coin Packs (Gems — Scaled by `TotalCoinMult` so Packs Always Beat Free Blitz Runs):** Effective coins = $\max(\text{Base},\ \text{Frontier Bounty} \times \text{TotalCoinMult} \times \text{Scaling})$:
  * *Pocket of Coins:* Base $50,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{15}$
  * *Bag of Gold:* Base $250,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{60}$
  * *Chest of Gold:* Base $1,500,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{250}$
  * *Royal Treasury:* Base $8,000,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{1,000}$
  * *Dragon's Hoard:* Base $35,000,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{4,000}$
* **Gem Packs (₹):** Pouch (80💎, ₹49) · Sack (275💎, ₹149) · Chest (850💎, ₹399) · Vault (2,100💎, ₹799) · Titan's Treasury (5,600💎, ₹1,699) · Cosmic Hoard (15,000💎, ₹3,499).
* **Bundles (₹):** Starter (₹149: 25k coins, 200💎, Spider-Man) · Weapon X (₹249: 80k coins, 400💎, Wolverine) · Thunder (₹399: 250k coins, 800💎, Thor) · Hero (₹799: 1M coins, 1,600💎, Hulk) · Cosmic Infinity (₹2,499: 10M coins, 3,000💎, Infinity Gauntlet).
* **Permanent Features:**
  * **Offline Slap Miner (200💎):** Unlocks passive offline coin mining (up to 8 hours; see Section 16).
  * **Golden Slapper VIP Pass (₹199):** Permanent $+25\%$ bonus coins from all enemy knockouts, golden hand frame, and golden crown.
  * **Frenzy Overcharge Booster (₹99):** Frenzy charges $25\%$ faster and lasts $13\text{s}$ (up from $10\text{s}$).
  * **Remove Ads (₹199):** Removes interstitial and banner ads forever (optional rewarded ads remain available).

---
## 14. Ads

* **Interstitials:** Shown after every 3 fight wins, minimum gap $75\text{s}$ (removed forever by ₹199 Remove Ads).
* **Rewarded — $2\times$ Coins Boost:** Watch an ad $\to$ all coin earnings $\times 2$ for **$10\text{ minutes}$** (re-watching resets timer to $10\text{m}$, no stacking).
* **Rewarded — $2\times$ Damage Boost:** Watch an ad $\to$ all slap & special damage $\times 2$ for **$10\text{ minutes}$** (no stacking).
* **Rewarded — Fight Revive:** On defeat, resume the same fight at $50\%$ Max HP with enemy swing timer reset and debuffs cleared (**1 revive per fight attempt**; disabled in Gauntlet, Boss Rush, Endless, Blitz, Reflex).
* **Contextual Loss Screen Ad Prompts:**
  * Enemy **below $35\%$ HP:** Highlight **"Watch Ad: Revive at 50% HP & Finish Him!"**
  * Enemy **at or above $35\%$ HP:** Highlight **"Watch Ad: Activate $2\times$ Damage (10m) & Retry!"**
* **Rewarded — Offline Double:** Watch an ad on the Offline Miner claim card to double offline earnings (raises the hard cap from $35\%$ to **$55\%$ of the current chapter's incremental build cost** so the ad always delivers meaningful bonus coins).

---
## 15. Daily Systems, Quests & Achievements

* **7-Day Login Chest (Unlocks after #5):**
  * Days 1–6 pay $0.50 \times \text{Frontier Bounty} \times \text{TotalCoinMult}$ (min 60 coins).
  * **Day 7 Chest** pays $2.0 \times \text{Frontier Bounty} \times \text{TotalCoinMult} + \mathbf{25\text{💎}}$.
* **Daily Quests (Unlocks after #10 · Refreshes at Midnight):**
  * 6 quest types scaling across 4 defeat tiers (Tier 0: $<10$ · Tier 1: $<20$ · Tier 2: $<35$ · Tier 3: $35+$):
    * 🏆 *Defeat enemies (8 / 16 / 28 / 45):* Coins $\times 0.85$ rate
    * 💰 *Earn coins in battle:* $+2\text{💎}$
    * 💥 *Land critical slaps (20 / 45 / 90 / 180):* Coins $\times 0.65$ rate
    * 🔥 *Clear HARD fights (1 / 2 / 3 / 4):* $+3\text{💎}$
    * ⚡ *Trigger FRENZY (2 / 4 / 7 / 12):* $+2\text{💎}$
    * 🛒 *Buy upgrades (5 / 10 / 18 / 30):* Coins $\times 0.65$ rate
* **Achievements:** 134 total achievements (16 one-off + 33 ladders) awarding **905💎** across the lifetime of the account.

---
## 16. Offline Earnings (45s Kill-Rate Cap & 35%/55% Chapter Hard Cap)

* **Turf Tribute Removed:** Passive group rent (`Turf Tribute`) and Relic Stations are completely removed.
* **Offline Slap Miner (200💎 Shop Feature — Calibrated at `0.019` Coefficient + Split Ad/No-Ad Chapter Cap):**
  * While away (minimum $60\text{s}$, capped at **$8\text{ hours}$**), `Effective_DPS` is clamped to a maximum of **1 frontier kill every 45 seconds** ($\text{Strongest\_Defeated\_HP} / 45.0$), and total claimable coins are capped at **$35\%$** (without ad) or **$55\%$** (with $2\times$ Rewarded Ad) of the current chapter's incremental build cost:
    $$\text{Effective\_DPS} = \min\left(\text{Theoretical\_DPS},\ \frac{\text{Strongest\_Defeated\_HP}}{45.0}\right)$$
    $$\text{RawOfflineCoins} = 0.019 \times \text{Effective\_DPS} \times \left(\frac{\text{Strongest\_Defeated\_Bounty} \times (1.25 + 1.30 \times \text{TotalCoinMult})}{\text{Strongest\_Defeated\_HP}}\right) \times \text{ClaimSec} \times \text{AdMult}$$
    $$\text{FinalClaimCoins} = \min\left(\text{RawOfflineCoins},\ (\text{watchedAd}\ ?\ 0.55 : 0.35) \times \text{CurrentChapterBuildCost}\right)$$

---
## 17. Every Timer in One Table (v2.6.1 Final)

| Timer | v2.6.1 Duration |
|---|---|
| **Attribute-Only Slap Interval Floor (Speed Lv 25, No Skills)** | $0.9075\text{ seconds}$ |
| **Permanent Skill-Unlocked Slap Interval Floor (Speed Lv 25 + Skills)** | $0.500\text{ seconds}$ |
| **Skin & World Relic Slap Interval Floor (`Speed.HardCapValue`)** | $0.350\text{ seconds}$ |
| **Temporary Overdrive Slap Interval Floor** | $0.300\text{ seconds}$ (Frenzy, Adrenaline, Swift Recovery, Time Stop) |
| **Infinity Gauntlet Time Stop Duration & Cooldown** | $5.0\text{s}$ active freeze · $10.0\text{s}$ post-freeze recharge cooldown |
| **Frenzy Duration** | $10.0\text{ seconds}$ ($13.0\text{s}$ with ₹99 Overcharge Booster) |
| **Piñata Anomaly Flee Timer** | $15.0\text{ seconds}$ ($0.60\times$ HP, $1.00\times$ full damage taken) |
| **Reflex Slap-Off Charge Recharge** | $30\text{ minutes}$ per charge (2 charges max) |
| **Trio Gauntlet Global Cooldown** | $30\text{ minutes}$ (shared across all groups) |
| **Golden Dummy Blitz Charge Recharge** | $45\text{ minutes}$ per charge (2 charges max; max $29\text{s}$ fight duration) |
| **Endless Mode Cooldown** | $45\text{ minutes}$ after a run ends |
| **Boss Rush Cooldown** | $60\text{ minutes}$ after a run ends |
| **Rewarded Ad Boosts ($2\times$ Coins / $2\times$ Damage)** | $10\text{ minutes}$ each (no stacking; re-watching resets to $10\text{m}$) |
| **Interstitial Ad Minimum Gap** | $75\text{ seconds}$ (after every 3 fight wins) |
| **Offline Slap Miner Accrual Cap** | $8\text{ hours}$ (minimum $60\text{s}$ away; $45\text{s}$ kill-rate clamp & $35\% / 55\%$ chapter cost cap) |
| **Dojo Bounties, Daily Quests & Login Chest** | Refresh daily at midnight |