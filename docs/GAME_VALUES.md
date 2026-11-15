# IDLE SLAPPER — COMPLETE GAME VALUES & NUMBERS REFERENCE (v2.6.5 AUDITED FINAL)

*Every number in the finalized v2.6.5 economy and combat engine, verified via deterministic tick-by-tick ($\Delta t = 0.05\text{s}$) simulations to pass all 6/6 design pillars ($32\text{s}\text{--}55\text{s}$ Boss TTK across all 7 Chapters, $16.2\text{s}\text{--}22.6\text{s}$ Un-Parried Survival, Strict Anti-Cheese Locks, Narrow-Loss Ad Hooks at $\sim 88\%$ chapter cap, $24.1\text{--}33.2$ Boss Kills per Chapter uniformly across Chapters 1–7, and true $2.0\times$ Ad-Offline scaling capped at $17.5\% / 35.0\%$) and reconciled 1:1 with `BalanceConfig.cs` (`Version = "2.6.5-AUDITED"`).*

*Coins are the soft currency, 💎 gems the premium currency, 🔥 Dragon Embers the Worlds currency. In tables, `--` means "not applicable / not offered at that level".*

## Contents
1. Game Flow & Unlock Order  ·  2. Chapter Progression & Attribute Caps  ·  3. Player Level, HP & Perks  ·  4. Attributes (Reconciled Log-Space Cost Curves)  ·  5. Slap-Coin & Knockout Economy  ·  6. Combat Systems, Speed Caps & Anti-Cheese Locks  ·  7. Player Special Moves & Boss Signatures  ·  8. Enemies #1-#50 (Playable Main Roster)  ·  9. Roster Data #51-#100 (Post-Shadow Verse Expansion)  ·  10. Skills (All 27)  ·  11. Game Modes & Timings  ·  12. The Worlds (Asura Realm & Shadow Verse)  ·  13. Shop, Hand Skins & Real-Money Purchases  ·  14. Ads  ·  15. Daily Systems, Quests & Achievements  ·  16. Offline Earnings (45s Kill-Rate Cap & 17.5%/35% Chapter Hard Cap)  ·  17. Every Timer in One Table

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
| Beat #40 Pharaoh | Chapter 5: Lv cap 38, Power cap 60 · **Uppercut Punch** Special Move · Tier 5 Skills (*Rapid Barrage* & *Bulwark Guard*) |
| Beat #50 Dragon Lord | Chapter 6: Lv cap 44, Power cap 70 · **Worlds Portal** (Asura Realm) · 🔥 Ember economy · **Dragon Mastery 1** ($\times 1.25$ global Power multiplier) |
| Beat #206 Ravana (Asura final boss) | Chapter 7: Lv cap 50 (max), Power cap 80 (max) · **Shadow Verse** · **Dragon Mastery 2** ($\times 1.45$ global Power multiplier, replaces Mastery 1) |
| Beat #216 Dark Slapper (Shadow Verse final) | Current endgame (gates future Chapter 8+ Roster #51-#100) |

**Skill Boss Gates** (on top of coin cost):
* **Second Hand** — free claim on beating #5
* **Quick Reflexes + Seismic Slam + Heavy Slap + Precision Instinct + Combo Mastery** — beat #10 (*Twin Mastery and On Target have no boss gate so the speed/combo branch opens in Chapter 1 without inflating Chapter 1 build costs*)
* **Boss Hunter + Coin Magnet + Dual-Hand Technique** — beat #20
* **Unstoppable Hands + Acoustic Echo + Kinetic Barrier + Treasure Hunter + Frenzy** — beat #30
* **Colossus Bane** — beat #35 Shadow Beast (*available before fighting #40 Pharaoh*)
* **Rapid Barrage + Bulwark Guard** — beat #40 Pharaoh (*available in Chapter 5*)
* **Godhand Strike** — beat #45 Stone Golem (*available before fighting #50 Dragon Lord*)

---
## 2. Chapter Progression & Attribute Caps

Caps block NEW purchases only. Every attribute has an explicit per-chapter ceiling so players cannot dump all coins into `Power` and `Speed` while ignoring skills and secondary attributes, and **Speed (`max 25`)**, **Crit % (`max 45`)**, **Accuracy (`max 14`)**, and **Stun (`max 50`)** are calibrated so zero coins are ever wasted on dead levels:

| Chapter Gate (Boss Defeated) | Player Lv Cap | Power Cap (Max 80) | Base Slap Dmg at Power Cap (w/ Mastery) | Speed Cap (Max 25) | Crit % Cap (Max 45) | Crit Dmg / Combo / Coins Cap (Max 65) | Def / Giant Slayer / Leech Cap (Max 40) | Stun / Fortune Cap (Max 50) | Accuracy Cap (Max 14) | Label Shown in Game |
|---|---|---|---|---|---|---|---|---|---|---|
| Start of game (Ch. 1) | 10 | 12 | $112.22$ | 8 | 10 | 12 | 10 | 10 | 4 ($92.14\%$) | DEFEAT STAGE #10 TO UNLOCK |
| Enemy #10 Monkey (Ch. 2) | 18 | 24 | $596.86$ | 13 | 18 | 22 | 18 | 18 | 6 ($95.71\%$) | DEFEAT STAGE #20 TO UNLOCK |
| Enemy #20 Dark Knight (Ch. 3) | 26 | 36 | $2,613.58$ | 18 | 26 | 32 | 26 | 26 | 8 ($99.29\%$) | DEFEAT STAGE #30 TO UNLOCK |
| Enemy #30 Shogun (Ch. 4) | 33 | 48 | $10,442.07$ | 21 | 33 | 42 | 32 | 34 | 11 ($104.64\%$) | DEFEAT STAGE #40 TO UNLOCK |
| Enemy #40 Pharaoh (Ch. 5) | 38 | 60 | $50,615.61$ | 23 | 39 | 52 | 36 | 42 | 13 ($108.21\%$) | DEFEAT DRAGON LORD (#50) TO UNLOCK |
| Enemy #50 Dragon Lord (Ch. 6) | 44 | 70 | $194,573.03$ ($\times 1.25$) | 25 | 45 | 60 | 40 | 47 | 14 ($110.00\%$) | DEFEAT RAVANA (ASURA REALM) TO UNLOCK |
| Ravana — Asura Realm (Ch. 7) | 50 | 80 | $681,620.13$ ($\times 1.45$) | 25 | 45 | 65 | 40 | 50 | 14 ($110.00\%$) | MAX CHAPTER REACHED |

*Hard limits: Permanent Player Level cap 50 · Endless Mastery adds $+1$ temporary level per 15 Endless waves survived (Waves 15, 30, 45; supports temporary Levels 51–53 during an Endless run).*

---
## 3. Player Level, HP & Perks

* **Base Max HP Formula (Exact Match to Table, Supports Temp Levels 51–53 in Endless Mode):**
  $$\text{Base Max HP}(\text{Lv}) = 100 + 25 \times (\text{Lv}-1) + \text{round}\left(15 \times 1.212^{\text{Lv}-1}\right)$$
* **Total Max HP Formula (Explicit Skill Purchase Flags Required):**
  Flat skill HP bonuses (*Stamina Training* $+75$, *Unstoppable Hands* $+1,400$) apply **immediately when those skills are purchased**; even-level perks (*Giant Stature* $+600$ at Lv 30, *Dragonblood Vigour* $+4,500$ at Lv 40, *Transcendent Hand* $\times 1.15$ at Lv 50) apply automatically upon reaching their respective Player Levels.
* **Level-Up Cost Formula (Exact Piecewise Curve — 100% Identical to Table & `GetLevelUpCost`):**
  * **Lv 1–10:** $\text{round}\left(\exp\left(\ln(150) + (\ln(55,369) - \ln(150)) \times \left(\frac{\text{Lv}-1}{9}\right)^{1.065}\right)\right)$
  * **Lv 11–40:** $\text{round}\left(55,369 \times 1.35^{\text{Lv}-10}\right)$
  * **Lv 41–44:** $\text{round}\left(450,069,728 \times 1.25^{\text{Lv}-40}\right)$
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
| 10 | 410 | 485 | 55,369 | 55,567 | **Vampire Slap** (Every 10th slap heals $1\%$ Max HP, min 10 HP) |
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
| 22 | 1,475 | 1,550 | 2,028,953 | 5,694,377 | **Battle Focus** (At combo stack $10+$, slaps gain $+0.20\text{s}$ stun duration above cap) |
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
| 40 | 28,158 | 34,733 | 450,069,728 | 1,285,810,675 | **Dragonblood Vigour** ($+4,500$ Max HP & $-20\%$ Boss Signature/Burn dmg) |
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

**Exact Total Cost Lv 1 $\to$ 50: 12,430,926,895 coins (matches `GetLevelUpCost` sum to the exact coin).**

---
## 4. Attributes (Reconciled Log-Space Cost Curves)

All 12 attributes use the exact unified log-space formula so that **Formula Sum == Table 4.1 Sum == Summary Table Total Cost** to the exact integer, with **zero dead levels across all 12 attributes**:
$$\text{Cost}(L) = \text{round}\left(\exp\left(\ln(\text{BaseCost}) + (\ln(\text{MaxCost}) - \ln(\text{BaseCost})) \times \left(\frac{L-1}{\text{MaxLv}-1}\right)^{1.05}\right)\right)$$

| Attribute | Effect per Level (v2.6.5 Audited Final) | Base Cost (Lv 1) | Max Cost (Final Lv) | Max Lv | **Exact Total Cost (Sum of All Levels)** |
|---|---|---|---|---|---|
| **Damage (`power`)** | Slap dmg: $(10 + 2.2L) \times 1.076^L \times 1.28^{\lfloor L/10 \rfloor}$ | 80 | 45,000,000,000 | 80 | **191,966,342,607** |
| **Speed (`speed`)** | Attack interval $\times \mathbf{0.9801}/\text{lv}$ ($0.9075\text{s}$ attr-only at Lv 25; **$0.499\text{s}$** w/ Speed Skills; **$0.350\text{s}$** hard floor w/ Skins & Relics; **$0.300\text{s}$** overdrive floor) | 110 | 180,000,000 | 25 | **427,264,587** |
| **Crit % (`critChance`)** | $+1\%$ crit chance/lv (base **$15\%$**, cap **$70\%$**; any Crit % above $70\%$ converts **$1:8$** into Bonus Crit Damage: $+1\% \text{ excess} = +8\% \text{ Crit Dmg}$) | 130 | 3,200,000,000 | 45 | **9,610,812,411** |
| **Crit Dmg (`critDamage`)** | $+5\%$ crit damage/lv (base $\times 2.0$) | 90 | 6,500,000,000 | 65 | **25,366,696,921** |
| **Defense (`defense`)** | $+1\%$ damage reduction/lv (capped at $40\%$) | 180 | 2,800,000,000 | 40 | **7,803,282,974** |
| **Stun (`stun`)** | **$+0.4\%$** stun chance/lv (base $5\%$, cap **$25\%$ at Lv 50**) and **$+0.018\text{s}$** stun duration/lv (base $0.50\text{s}$, attr cap **$1.40\text{s}$ at Lv 50**; *Battle Focus* adds $+0.20\text{s}$ above attr cap up to $1.60\text{s}$) | 130 | 3,500,000,000 | 50 | **11,432,042,855** |
| **Combo (`combo`)** | **$+0.20\%$** damage per combo stack and **$+0.25$** max stacks/lv (base 4 stacks; balanced with Crit Dmg) | 75 | 6,000,000,000 | 65 | **23,301,997,279** |
| **Coins (`coinMult`)** | $+4\%$ coins per level (max $+260\%$ at Lv 65) | 80 | 6,500,000,000 | 65 | **25,225,327,089** |
| **Accuracy (`accuracy`)** | **$+1.7857\%$** hit chance/lv (base $85\%$, reaches exact **$110.0\%$** cap at Lv 14; final post-evasion hit chance clamped to $[5\%, 100\%]$) | 150 | 1,800,000,000 | 14 | **2,463,441,154** |
| **Giant Slayer (`bossDamage`)** | $+1.5\%$ damage vs elites & bosses/lv (cap $+60\%$) | 180 | 2,800,000,000 | 40 | **7,803,282,974** |
| **Life Leech (`vampirism`)** | Every **8th slap** heals **$+0.15\%$ of Max HP/lv** (cap **$6.0\%$ Max HP** at Lv 40) | 260 | 3,600,000,000 | 40 | **10,089,392,839** |
| **Fortune (`luck`)** | $+0.5\%$ lucky-slap chance/lv (cap $25\%$); lucky = $1.5\times$ damage, $2.5\times$ coins | 140 | 3,800,000,000 | 50 | **12,407,033,279** |

### 4.1 Milestone Attribute Purchase Costs (Exact Values from `GetAttributeCost`)

| Buy Lv | Damage (Max 80) | Speed (Max 25) | Crit % (Max 45) | Crit Dmg (Max 65) | Defense (Max 40) | Stun (Max 50) | Combo (Max 65) | Coins (Max 65) | Accuracy (Max 14) | Giant Slayer (Max 40) | Life Leech (Max 40) | Fortune (Max 50) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 80 | 110 | 130 | 90 | 180 | 130 | 75 | 80 | 150 | 180 | 260 | 140 |
| 4 | 153 | 551 | 359 | 186 | 552 | 323 | 156 | 166 | 4,946 | 552 | 791 | 348 |
| 8 | 389 | 5,565 | 1,537 | 529 | 2,754 | 1,194 | 446 | 476 | 744,356 | 2,754 | 3,902 | 1,287 |
| 10 | 627 | 18,200 | 3,239 | 904 | 6,275 | 2,332 | 763 | 816 | 9,722,452 | 6,275 | 8,840 | 2,515 |
| 12 | 1,016 | 60,320 | 6,887 | 1,553 | 14,433 | 4,591 | 1,315 | 1,406 | 130,720,210 | 14,433 | 20,215 | 4,952 |
| 14 | 1,655 | 202,129 | 14,742 | 2,681 | 33,453 | 9,092 | 2,277 | 2,436 | 1,800,000,000 | 33,453 | 46,578 | 9,811 |
| 18 | 4,434 | 2,331,581 | 68,712 | 8,088 | 183,108 | 36,211 | 6,913 | 7,403 | -- | 183,108 | 251,923 | 39,101 |
| 22 | 12,022 | 27,692,009 | 326,200 | 24,724 | 1,022,820 | 146,621 | 21,268 | 22,795 | -- | 1,022,820 | 1,390,295 | 158,428 |
| 24 | 19,869 | 96,316,804 | 714,866 | 43,408 | 2,432,876 | 296,570 | 37,459 | 40,169 | -- | 2,432,876 | 3,286,869 | 320,559 |
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

Base slap damage from the `Power` attribute before Dragon Mastery: $(10 + 2.2L) \times 1.076^L \times 1.28^{\lfloor L/10 \rfloor}$.

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

*Dragon Mastery (`GetPowerBaseDamage`): Beating #50 Dragon Lord grants Mastery 1 ($\times 1.25$ global Power multiplier, raising Power Lv 70 to $194,573.03$); beating #206 Ravana grants Mastery 2 ($\times 1.45$ global Power multiplier, replacing Mastery 1 and raising Power Lv 80 to $681,620.13$).*

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
* **Normal Fight Total Payout (Slap Cap + KO):**
  $$\text{NormalFightCoins} = \text{Bounty} \times (\text{SlapCapFraction} + 1.30 \times \text{TotalCoinMult})$$
  where $\text{TotalCoinMult} = (1 + 0.04 \times \text{CoinsLv}) \times \text{Greed } (1.15) \times \text{Golden Aura } (1.15) \times \text{Coin Magnet } (1.20) \times \text{Treasure Hunter } (1.25\text{ on Elites/Bosses}) \times \text{VIP Pass } (1.25) \times \text{Active Boosts}$.
* **Hard Mode (Per Enemy, After First Clear — Balanced $+5.7\%$ Raw CPS / $+9\%$ Effective CPS Mastery Bonus):**
  * **Enemy Stats:** HP $\times 1.75$, Damage $\times 1.25$.
  * **Payout (`CalculateHardFightKoCoins`):** **KO Coins $= 1.85 \times \text{Bounty} \times (\text{SlapCapFraction} + 1.30 \times \text{TotalCoinMult})$** ($1.85\times$ Normal Fight total payout; no per-slap coins in Hard Mode so $100\%$ of the reward is paid on KO without making Normal Mode or Street Brawl Anomalies obsolete).
  * **Gems & Embers:** **$+3\text{💎}$ on First Hard Clear per enemy only** ($150\text{💎}$ total across #1-#50), World Embers $\times 1.5$ in Hard World fights.
  * **Group Mastery (All 5 in a group cleared on Hard):** **$+10\text{💎}$** ($100\text{💎}$ total across 10 groups) and **$+2\%$ permanent coins**.
* **First-Clear Bonus Chests:** #5 $\to$ 250c + 2💎 · #10 $\to$ 2,200c + 5💎 · #15 $\to$ 18,000c + 2💎 · #20 $\to$ 90,000c + 5💎 · #25 $\to$ 400,000c + 2💎 · #30 $\to$ 2,000,000c + 5💎 · #35 $\to$ 12,000,000c + 3💎 · #40 $\to$ 75,000,000c + 5💎 · #45 $\to$ 280,000,000c + 3💎 · #50 $\to$ 1,500,000,000c + 10💎.
* **Group Reward Chest:** Clearing all 5 enemies in a group unlocks a one-time claimable chest = $100\%$ of the group's 5 bounties combined.

---
## 6. Combat Systems, Speed Caps & Anti-Cheese Locks

| System | v2.6.5 Audited Final Numbers |
|---|---|
| **Player Base Stats** | Damage $10$ (before Power) · Base attack interval $1.500\text{s}$ · Base crit chance **$15\%$** · Base crit damage $\times 2.0$ |
| **Skill Damage Stacking Contract** | All active `SkillEffectType.DamageMult` bonuses (`stronger_hands` $= +0.20$, `opportunist` $= +0.35$ vs stunned/dazed) sum **additively** into one pool: $\text{skillPoolMult} = 1 + \sum \text{bonus}$ (`basic_slap` $= 1.00$ identity). Per-trigger proc multipliers (`SkillEffectType.ProcHitDamageMult`: `seismic_slam` $3.0\times$, `heavy_slap` $2.5\times$, `rapid_barrage` $2.2\times$, `godhand_strike` $8.0\times$, `acoustic_echo` $+100\%$, `echo_palm` $+60\%$) apply per-trigger on top of the additive pool. |
| **Speed Progression & 3-Tier Floor System** | • **Base Interval:** $1.500\text{s}$<br>• **Attribute-Only Floor (Speed Lv 25 at $\times 0.9801/\text{lv}$, 0 Speed Skills):** $1.500 \times 0.9801^{25} = \mathbf{0.9075\text{s}}$<br>• **Permanent Skill-Unlocked Floor (Speed Lv 25 + *Second Hand* $\times 0.85$, *Quickening* $\times 0.94$, *Twin Mastery* $\times 0.90$, *Quick Reflexes* $\times 0.90$, *Dual-Hand* $\times 0.85$):** **$0.499\text{s}$** ($2.00\text{ slaps/s}$)<br>• **Skin & World Relic Floor (`Speed.HardCapValue = 0.350f`):** Lowers permanent floor down to **$0.350\text{s}$** ($2.86\text{ slaps/s}$)<br>• **Temporary Overdrive Floor (*Frenzy* $\times 0.7692$, *Adrenaline Rush* $\times 0.8333$, *Swift Recovery* $\times 0.80$, *Infinity Gauntlet Time Stop* $\times 0.6667$):** **$0.300\text{s}$** ($3.33\text{ slaps/s}$) |
| **Crit Chance Cap & $1:8$ Overcap Conversion** | • Base (**$15\%$**) + `Crit %` Lv 45 ($45\%$) + *Crit Surge* ($8\%$) + *Critical Slaps* ($5\%$) = **$73\%$ F2P Crit** ($81\%$ with *Wolverine Skin* $+8\%$), exceeding the **$70\%$ hard cap**.<br>• **Overcap Rule (`OvercapCritToCritDmgRatio = 8.0f`):** Any Crit Chance above **$70\%$** converts **$1:8$** into **Bonus Critical Damage ($+1\%$ excess Crit Chance $= +8\%$ Crit Damage)** ($+24\%$ F2P at Lv 45 / $+88\%$ w/ Wolverine). |
| **Armored Poise (Anti-Cheese Lock)** | Active on all **Elites, Mini-Bosses, and Bosses** starting at Enemy #9 (Trash Panda):<br>• **Basic Slaps** landed at **Combo Stack $\le 4$** that are neither Critical Hits nor Skill Procs deal **$-40\%$ damage ($\times 0.60$)**.<br>• **Full $100\%$ Damage Bypass:** Any Critical Hit, any Skill Proc / Weak Spot / Special Move, OR any slap landed at **Combo Stack $\ge 5$** deals $100\%$ full damage. |
| **Deflect / Parry (Works on Regular Enemies Too)** | Unlocks via *Deflect* skill ($22,000\text{c}$):<br>• Spawns a golden parry ring ($0.425\text{s}$, gold window $\approx 74\text{ms}$) on **every 2nd attack of normal enemies**, **every 3rd-attack Group Signature Move**, and **all Elite, Mini-Boss, and Boss normal attacks** to negate $100\%$ of damage and debuffs.<br>• **Boss Signature Mitigation (`BossSigParryMitigation = 0.50f`):** Hitting a Gold Parry Ring on a Boss Signature Move reduces its incoming damage by **$50\%$**. |
| **Enemy Evasion & Miss Penalty** | • Base player accuracy is $85\%$ ($+1.7857\%/\text{lv}$ up to exact **$110.0\%$** at Lv 14); post-evasion hit chance is `Clamp(playerAccuracy - enemyEvasion, 0.05, 1.00)`.<br>• **Miss Penalty:** Missing a slap drains **2 Combo Stacks** and pauses Special Move cooldown charging for **$1.5\text{s}$**. |
| **Combo System** | Base max 4 stacks · Combo attribute adds **$+0.20\%$** dmg/stack and **$+0.25$** max stacks/lv ($20.25$ stacks at Lv 65) · *Combo Mastery* skill adds $+5$ stacks and $+0.5\%$ dmg/stack (Max $25.25$ stacks $\times 13.5\% = \mathbf{4.41\times\text{ damage}}$ / $+341\%$ bonus damage). |
| **Stun & Diminishing Returns** | Base chance $5\%$ ($+0.4\%/\text{lv}$, cap **$25\%$ at Lv 50**) · Base duration $0.50\text{s}$ ($+0.018\text{s}/\text{lv}$, attr cap **$1.40\text{s}$ at Lv 50**; *Battle Focus* adds $+0.20\text{s}$ after cap up to **$1.60\text{s}$**) · Enemy swing timer pauses while stunned/dazed · **Post-stun immunity: $3.5\text{s}$ normal / $5.0\text{s}$ bosses** · Bosses take $\times 0.50$ stun & daze duration · **$6.0\text{s}$ internal stun cooldown**. |
| **Weak Spots (Precision Instinct)** | Unlocks via *Precision Instinct* skill (timer-driven `AlwaysOn` system) · First at $2.2\text{s}$, then every $5\text{--}8\text{s}$ · Window $1.5\text{s}$ ($1.2\text{s}$ on Hard) · Hit deals **$\times 4.5$ slap damage** + $12$ Frenzy meter · Per-fight cap 3 ($+1$ per 15 Fortune levels, max **6**; **7 with *Giant's Grip***). |
| **Boss Heals & Enrage Grace** | • **Main Bosses (`MaxHeals = 2`):** Heal **$15\%$ Max HP** once at **$60\%$ HP** and once at **$30\%$ HP**.<br>• **World Guardians (`MaxHeals = 1` on `#203`, `#206`, `#213`, `#216`):** Heal **$15\%$ Max HP** once at **$50\%$ HP**.<br>• **Enrage Suppression:** Below $40\%$ HP, bosses enrage (**$\times 0.80$ interval**, **$+10\%$ damage**). If a heal lifts a boss above $40\%$ HP, Enrage is suppressed for an **$8.0\text{s}$ grace window**.<br>• *All boss heals are disabled inside Boss Rush.* |
| **Revive Priority & Enemy Pacing** | • **Revive Priority:** Main Roster & Side Modes allow at most **1 auto-revive per fight** (*Second Wind* Lv 14 takes priority over *Phoenix Heart*). Inside Endgame Worlds (`#201-#216`), *Second Wind* and *Phoenix Heart* may each trigger once sequentially.<br>• **Enemy Pacing:** First swing at $\times 1.15$ interval; subsequent swings at $\times 1.00$ decaying by $0.99/\text{swing}$ down to $\times 0.85$.<br>• **Revive Ad:** Resume same fight at $50\%$ Max HP, enemy HP unchanged, swing timer reset, debuffs cleared — **once per fight attempt** (disabled in Gauntlet / Boss Rush / Endless / Blitz / Reflex). |

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
| **8** | #36-#40 | Pharaoh's Tomb | **Sands of Siphon:** Reduces **Player Crit Chance by $25\%$ for $4.0\text{s}$** and **heals the enemy for $1.5\%$ Max HP (max 3 triggers per fight / $4.5\%$ Max HP cap)**. |
| **9** | #41-#45 | Mountain Stronghold | **Tremor Smash:** **Stuns your hands for $0.7\text{s}$** and **reduces your Defense stat by $50\%$ for $4.0\text{s}$**. |
| **10** | #46-#50 | Dragon Lair | **Draconic Scorch:** **Destroys $50\%$ of active player shields** and **burns for $3\%$ Max HP/s over $4.0\text{s}$**. |

---
## 7. Player Special Moves & Boss Signatures

**Player Special Moves** (scale automatically with Chapter Index from Chapter 2 to Chapter 7 via `GetSpecialMoveValue` and `GetSpecialMoveCooldown`; cooldowns do NOT reset between fights in Trio Gauntlet or Boss Rush):

| Move | Earned From | Damage (Base $\to$ Maxed) | Cooldown (Base $\to$ Maxed) | What It Does |
|---|---|---|---|---|
| **Double Slap** | Boss #10 | $7\times \to 15\times$ slap dmg | $25\text{s} \to 15\text{s}$ | Both hands slam together for one crushing hit (bypasses Armored Poise; $-3\text{s}$ CD with Shogun Mastery). |
| **Guard** | Boss #20 | Blocks $100\%$ of one attack | $24\text{s} \to 18\text{s}$ | Unlocked on beating #20 Dark Knight! Cross both hands to block $100\%$ of any incoming attack or Boss Signature Move ($-3\text{s}$ CD with Shogun Mastery). |
| **Uppercut Punch** | Boss #40 | $18\times \to 32\times$ slap dmg | $32\text{s} \to 20\text{s}$ | A ferocious rising uppercut that deals massive damage and stuns for $2.5\text{s}$ ($1.25\text{s}$ vs Bosses). |

**Boss Signature Moves Against You** (hitting a Gold Parry Ring mitigates damage by $50\%$; activating *Guard* blocks $100\%$):

| Boss | Move | v2.6.5 Audited Final Effect |
|---|---|---|
| **#10 Mischievous Monkey** | BANANA SLING | Accuracy $-35\%$ for $5\text{s}$ — missed slaps lose 2 Combo stacks and pause Special charging! |
| **#20 Dark Knight** | IRON BULWARK | Iron fortress — absorbs 6 slaps at **$65\%$ damage reduction** and reflects $10\%$ damage back! |
| **#30 Shogun Warlord** | KATANA OMNISLASH | Blade strike dealing **$2.5\times$ damage** and $1.5\text{s}$ stagger (mitigated $50\%$ by Gold Parry, $100\%$ by Guard)! |
| **#40 Pharaoh Revenant** | SAND CURSE & RENEWAL | Reduces slap speed by $35\%$ for $5\text{s}$! Also triggers **ETERNAL RENEWAL** ($15\%$ Max HP heal at $60\%$ & $30\%$ HP, `MaxHeals = 2`). |
| **#50 Dragon Lord** | DRAGON HELLFIRE & RENEWAL | Caldera blaze burns for **$2.5\%$ Max HP/s over $5\text{s}$**! Also triggers **DRAGON RENEWAL** ($15\%$ Max HP heal at $60\%$ & $30\%$ HP, `MaxHeals = 2`). |
| **#203 Kumbhakaran (Asura #3)** | SEISMIC STOMP & AMRITA | Colossal stomp dealing $2.0\times$ damage + $1.0\text{s}$ stun; heals **$15\%$ Max HP** once at $50\%$ HP (`MaxHeals = 1`). |
| **#206 Ravana (Asura #6)** | CHANDRAHASA STRIKE | Moon-blade strike dealing **$2.2\times$ damage**, $1.0\text{s}$ stagger, and $-30\%$ healing for $5\text{s}$ (`MaxHeals = 1`). |
| **#213 Puppeteer (Shadow #3)** | MARIONETTE GRIP | Strings weave a barrier absorbing 5 slaps at $50\%$ damage reduction and slowing speed by $20\%$ (`MaxHeals = 1`). |
| **#216 Dark Slapper (Shadow #6)** | COUNTER SLAP | Perfected slap returned — **$2.2\times$ damage**, $1.2\text{s}$ stagger, and strips active player shields (`MaxHeals = 1`). |

---
## 8. Enemies #1-#50 — The Playable Main Roster (v2.6.5 Audited Final)

Calibrated across all 50 enemies with strictly monotonic bounties so **every Chapter Boss TTK lands inside $32\text{s}\text{--}55\text{s}$**, **Player Un-Parried Survival stays $\ge 16.2\text{s}$ even during Enrage**, and **every single Chapter requires $24.1\text{--}33.2$ Boss Kills** to complete all upgrades. `IsColossus = true` from Enemy #35 (`Shadow Beast`) through #50 (`Dragon Lord`).

| # | Enemy | Group | HP (v2.6.5) | Dmg (v2.6.5) | Atk Every | Evasion | Slap Value (Base) | Bounty (KO Base) | MaxHeals | Tag |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Training Dummy | Cozy Corner | 65 | 8 | 2.40s | 0% | ~4 | 63 | 0 | |
| 2 | Rubber Duck | Cozy Corner | 115 | 11 | 2.35s | 0% | ~6 | 91 | 0 | |
| 3 | Rubber Chicken | Cozy Corner | 195 | 14 | 2.30s | 0% | ~9 | 134 | 0 | |
| 4 | Cardboard Knight | Cozy Corner | 340 | 18 | 2.25s | 0% | ~14 | 197 | 0 | |
| 5 | Grumpy Teddy | Cozy Corner | 650 | 25 | 2.05s | 0% | ~23 | 331 | 0 | MINI-BOSS |
| 6 | Sassy Goblin Sprout | Backyard Bunch | 920 | 28 | 2.20s | 0% | ~31 | 447 | 0 | |
| 7 | Mime | Backyard Bunch | 1,450 | 33 | 2.15s | 0% | ~45 | 645 | 0 | |
| 8 | Cocky Goose | Backyard Bunch | 2,350 | 39 | 2.10s | 0% | ~65 | 930 | 0 | |
| 9 | Trash Panda | Backyard Bunch | 4,200 | 48 | 2.05s | 0% | ~99 | 1,410 | 0 | ELITE |
| 10 | Mischievous Monkey | Backyard Bunch | 8,500 | 58 | 1.95s | 0% | ~154 | 2,200 | 2 | BOSS |
| 11 | Bodybuilder | Fight Club | 12,500 | 66 | 2.13s | 0% | ~248 | 4,510 | 0 | |
| 12 | Luchador Wrestler | Fight Club | 18,500 | 75 | 2.10s | 0% | ~340 | 6,173 | 0 | |
| 13 | Kickboxer | Fight Club | 27,500 | 85 | 2.08s | 0% | ~464 | 8,432 | 0 | |
| 14 | Adult Boxer | Fight Club | 41,000 | 96 | 2.05s | 0% | ~633 | 11,518 | 0 | |
| 15 | Sumo Champion | Fight Club | 68,000 | 115 | 2.03s | 0% | ~941 | 17,100 | 0 | MINI-BOSS |
| 16 | Castle Guard | Castle Guard | 92,000 | 110 | 2.00s | 0% | ~1,241 | 22,565 | 0 | |
| 17 | Royal Executioner | Castle Guard | 125,000 | 120 | 1.98s | 0% | ~1,672 | 30,397 | 0 | |
| 18 | Knight | Castle Guard | 165,000 | 130 | 1.95s | 0% | ~2,247 | 40,852 | 0 | |
| 19 | Barbarian | Castle Guard | 210,000 | 132 | 1.93s | 0% | ~2,639 | 47,977 | 0 | ELITE |
| 20 | Dark Knight | Castle Guard | 335,000 | 135 | 1.84s | 0% | ~3,135 | 57,000 | 2 | BOSS |
| 21 | Skeleton Warrior | Graveyard Shift | 420,000 | 147 | 1.88s | 5% | ~3,410 | 62,000 | 0 | |
| 22 | Zombie | Graveyard Shift | 560,000 | 164 | 1.86s | 5% | ~4,400 | 80,000 | 0 | |
| 23 | Armored Skeleton | Graveyard Shift | 750,000 | 185 | 1.84s | 5% | ~5,720 | 104,000 | 0 | |
| 24 | Scarab Swarm | Graveyard Shift | 1,000,000 | 208 | 1.82s | 5% | ~7,425 | 135,000 | 0 | |
| 25 | Mummy Guard | Graveyard Shift | 1,380,000 | 244 | 1.79s | 6% | ~10,175 | 185,000 | 0 | MINI-BOSS |
| 26 | Ninja Recruit | Shadow Dojo | 1,750,000 | 260 | 1.77s | 6% | ~13,200 | 240,000 | 0 | |
| 27 | Shuriken Master | Shadow Dojo | 2,200,000 | 287 | 1.75s | 6% | ~17,160 | 312,000 | 0 | |
| 28 | Samurai Duelist | Shadow Dojo | 2,750,000 | 318 | 1.73s | 6% | ~22,275 | 405,000 | 0 | |
| 29 | Shadow Assassin | Shadow Dojo | 3,350,000 | 351 | 1.71s | 8% | ~28,875 | 525,000 | 0 | ELITE |
| 30 | Shogun Warlord | Shadow Dojo | 4,100,000 | 386 | 1.63s | 8% | ~37,400 | 680,000 | 2 | BOSS |
| 31 | Werewolf | Dark Woods | 3,220,000 | 445 | 1.67s | 10% | ~59,125 | 1,075,000 | 0 | |
| 32 | Giant Spider | Dark Woods | 4,270,000 | 512 | 1.65s | 10% | ~75,955 | 1,381,000 | 0 | |
| 33 | Orc Warrior | Dark Woods | 5,740,000 | 588 | 1.63s | 10% | ~97,900 | 1,780,000 | 0 | |
| 34 | Bog Witch | Dark Woods | 7,700,000 | 676 | 1.61s | 10% | ~126,445 | 2,299,000 | 0 | |
| 35 | Shadow Beast | Dark Woods | 10,500,000 | 790 | 1.59s | 10% | ~168,245 | 3,059,000 | 0 | MINI-BOSS |
| 36 | Giant Serpent | Pharaoh's Tomb | 13,300,000 | 882 | 1.57s | 10% | ~214,170 | 3,894,000 | 0 | |
| 37 | Anubis Warrior | Pharaoh's Tomb | 16,450,000 | 991 | 1.55s | 10% | ~270,270 | 4,914,000 | 0 | |
| 38 | Sphinx Riddler | Pharaoh's Tomb | 20,300,000 | 1,109 | 1.53s | 10% | ~336,545 | 6,119,000 | 0 | |
| 39 | Giant Scorpion | Pharaoh's Tomb | 24,500,000 | 1,243 | 1.51s | 12% | ~407,935 | 7,417,000 | 0 | ELITE |
| 40 | Pharaoh Revenant | Pharaoh's Tomb | 29,400,000 | 1,386 | 1.44s | 12% | ~489,500 | 8,900,000 | 2 | BOSS |
| 41 | Troll | Mountain Stronghold | 38,500,000 | 1,512 | 1.48s | 12% | ~638,000 | 11,600,000 | 0 | |
| 42 | Ogre | Mountain Stronghold | 49,700,000 | 1,646 | 1.46s | 12% | ~770,000 | 14,000,000 | 0 | |
| 43 | Minotaur | Mountain Stronghold | 64,400,000 | 1,798 | 1.44s | 12% | ~935,000 | 17,000,000 | 0 | |
| 44 | Cyclops | Mountain Stronghold | 82,600,000 | 1,966 | 1.42s | 12% | ~1,133,000 | 20,600,000 | 0 | |
| 45 | Stone Golem | Mountain Stronghold | 106,400,000 | 2,167 | 1.40s | 12% | ~1,408,000 | 25,600,000 | 0 | MINI-BOSS |
| 46 | Elder Dragon | Dragon Lair | 136,500,000 | 2,335 | 1.40s | 12% | ~1,672,000 | 30,400,000 | 0 | |
| 47 | Dragon Champion | Dragon Lair | 175,000,000 | 2,520 | 1.40s | 12% | ~1,980,000 | 36,000,000 | 0 | |
| 48 | Crystal Dragon | Dragon Lair | 220,500,000 | 2,722 | 1.40s | 12% | ~2,332,000 | 42,400,000 | 0 | |
| 49 | Ancient Dragon | Dragon Lair | 276,500,000 | 2,940 | 1.40s | 14% | ~2,706,000 | 49,200,000 | 0 | ELITE |
| 50 | Dragon Lord | Dragon Lair | 343,000,000 | 3,192 | 1.40s | 15% | ~3,135,000 | 57,000,000 | 2 | FINAL BOSS |

---
## 9. Roster Data #51-#100 — Post-Shadow Verse Expansion (Chapter 8+)

*In v2.6.5, the unplayable #51-#100 roster is anchored cleanly above #216 The Dark Slapper (`26.5B Base HP` / `26,500 Dmg` / `455M Bounty`) so there is zero backward dip when Chapter 8+ opens after Shadow Verse:*

| # | Enemy | Group | HP (v2.6.5) | Dmg (v2.6.5) | Atk Every | Bounty (v2.6.5) | Tag |
|---|---|---|---|---|---|---|---|
| 51 | Frost Wolf Alpha | Frozen Wastes | 35,000,000,000 | 31,500 | 1.22s | 580,000,000 | |
| 52 | Ice Witch | Frozen Wastes | 45,500,000,000 | 35,000 | 1.22s | 750,000,000 | |
| 53 | Snow Golem | Frozen Wastes | 59,000,000,000 | 39,000 | 1.22s | 970,000,000 | |
| 54 | Yeti Brute | Frozen Wastes | 76,500,000,000 | 43,500 | 1.22s | 1,250,000,000 | |
| 55 | Glacier Titan | Frozen Wastes | 102,000,000,000 | 49,500 | 1.20s | 1,680,000,000 | MINI-BOSS |
| 56-60 | Dinosaur Valley (#56-#60) | Dinosaur Valley | $132\text{B} \to 395\text{B}$ | $55\text{k} \to 82\text{k}$ | 1.20s | $2.20\text{B} \to 6.50\text{B}$ | BOSS #60 |
| 61-70 | Hell Gate & Olympus (#61-#70) | Groups 13-14 | $510\text{B} \to 6.80\text{T}$ | $92\text{k} \to 225\text{k}$ | 1.20s | $8.40\text{B} \to 112.0\text{B}$ | BOSS #70 |
| 71-80 | Mech Factory & Aliens (#71-#80) | Groups 15-16 | $8.80\text{T} \to 118\text{T}$ | $255\text{k} \to 620\text{k}$ | 1.20s | $146.0\text{B} \to 1.96\text{T}$ | BOSS #80 |
| 81-90 | Sky Temple & Abyss (#81-#90) | Groups 17-18 | $152\text{T} \to 2.04\text{Qa}$ | $700\text{k} \to 1.70\text{M}$ | 1.20s | $2.50\text{T} \to 33.6\text{T}$ | BOSS #90 |
| 91-100 | Cosmic Void & Heaven (#91-#100) | Groups 19-20 | $2.65\text{Qa} \to 35.5\text{Qa}$ | $1.90\text{M} \to 4.20\text{M}$ | 1.20s | $43.0\text{T} \to 580\text{T}$ | BOSS #100 |

---
## 10. Skills — All 27 (v2.6.5 Audited Final with Explicit `ProcChance` & `ProcIntervalSlaps`)

Bought with coins from the skill tree. **Speed Skills are mandatory to lower your permanent attack interval from the $0.9075\text{s}$ attribute-only floor down to the $0.499\text{s}$ permanent cap**, and **Proc/Crit/Combo Skills are mandatory to bypass the $-40\%$ Armored Poise damage reduction** on Elites and Bosses.

| Tier | Skill | Cost (v2.6.5) | Needs First | Boss Gate | Trigger, `ProcChance` & `ProcIntervalSlaps` | v2.6.5 Audited Final Effect |
|---|---|---|---|---|---|---|
| 1 | **Basic Slap** | 0 | -- | -- | `AlwaysOn` (`100%`) | The slap everything starts with (`1.00f` identity). Already yours. |
| 1 | **Stamina Training** | 300 | Basic Slap | -- | `AlwaysOn` (`100%`) | $+75$ Max HP (applies immediately upon purchase). |
| 1 | **Stronger Hands** | 750 | Basic Slap | -- | `AlwaysOn` (`100%`) | $+20\%$ damage on every slap (`0.20f` in additive `DamageMult` pool). |
| 1 | **Second Hand** | FREE (1,000 tag) | Basic Slap | Beat #5 | `AlwaysOn` (`100%`) | Claimed FREE on beating #5 Grumpy Teddy. Alternates L/R hands, reducing base slap interval from $1.500\text{s} \to 1.275\text{s}$ ($\times 0.85$). |
| 2 | **Twin Mastery** | 3,200 | Second Hand | -- | `AlwaysOn` (`100%`) | Reduces permanent slap interval by $\times 0.90$ and grants $+10\%$ combo charge (`ComboChargeBonus`, no boss gate). |
| 2 | **On Target** | 6,500 | Twin Mastery | -- | `AlwaysOn` (`100%`) | Combo stacks survive switching enemies (resets on defeat). |
| 2 | **Quick Reflexes** | 15,000 | Twin Mastery | Beat #10 | `AlwaysOn` (`100%`) | Reduces permanent slap interval by $\times 0.90$. |
| 2 | **Deflect** | 22,000 | Basic Slap | -- | `AlwaysOn` (`100%`) | Every 2nd normal enemy attack, every 3rd-attack Group Signature, and all Elite/Mini-Boss/Boss normal attacks spawn a golden parry ring; tap to negate $100\%$ damage (mitigates $50\%$ of Boss Signature Moves via `BossSigParryMitigation`). |
| 2 | **Critical Slaps** | 35,000 | Stronger Hands | -- | `AlwaysOn` (`100%`) | $+5\%$ critical strike chance (helps bypass Armored Poise). |
| 2 | **Seismic Slam** | 55,000 | Stamina Training | Beat #10 | `ProcEveryNSlaps` (`100%`, every `5` slaps) | Every **5th slap** lands a SEISMIC SLAM dealing **$3.0\times$ damage** (`ValuePrimary = 3.00f`, bypasses Poise) and dazing the enemy for $0.8\text{s}$ ($0.4\text{s}$ vs Bosses)! |
| 2 | **Heavy Slap** | 90,000 | Stronger Hands | Beat #10 | `ProcOnHit` (`ProcChance = 12%`) | $12\%$ chance a slap lands HEAVY for **$2.5\times$ damage** (`ValuePrimary = 2.50f`, bypasses Poise). |
| 2 | **Precision Instinct** | 140,000 | Stronger Hands | Beat #10 | `AlwaysOn` (timer-driven) | Unlocks PRECISION strikes: a gold weak spot flashes mid-fight — tap it for a **$4.5\times$ critical strike**! Max 3 per fight ($+1$ per 15 Fortune levels, max 6; 7 w/ *Giant's Grip*). |
| 3 | **Combo Mastery** | 300,000 | On Target | Beat #10 | `AlwaysOn` (`100%`) | Combo cap $+5$ stacks and $+0.5\%$ damage per stack. |
| 3 | **Opportunist** | 600,000 | Quick Reflexes | -- | `ProcOnHit` (`100%` vs Stunned/Dazed) | Slaps deal $+35\%$ damage to Stunned or Dazed enemies. |
| 3 | **Adrenaline Rush** | 1,100,000 | Seismic Slam | -- | `OnLowHpState` (`<30%` HP) | Below **$30\%$ HP**: gain $+20\%$ temporary Overdrive slap speed ($\times 0.8333$ interval) and $+25\%$ damage. |
| 3 | **Coin Magnet** | 2,000,000 | Critical Slaps | Beat #20 | `AlwaysOn` (`100%`) | $+20\%$ coins from every KO. |
| 3 | **Boss Hunter** | 3,800,000 | Heavy Slap | Beat #20 | `AlwaysOn` (`100%`) | $+25\%$ damage vs Group Elites, Mini-Bosses, and Bosses. |
| 4 | **Acoustic Echo** | 8,500,000 | Combo Mastery | Beat #30 | `ProcOnHit` (`ProcChance = 20%` on Crits) | Critical slaps have a **$20\%$ chance** to echo for **$+100\%$ bonus damage** (`ValuePrimary = 1.00f`). |
| 4 | **Dual-Hand Technique** | 18,000,000 | Opportunist | Beat #20 | `AlwaysOn` (`100%`) | Reduces permanent slap interval by $\times 0.85$ (reaches exact $0.499\text{s}$ permanent cap at Speed Lv 25). |
| 4 | **Unstoppable Hands** | 38,000,000 | Adrenaline Rush | Beat #30 | `AlwaysOn` (`100%`) | $+1,400$ Max HP (applies immediately upon purchase) and regenerate **$0.35\%$ Max HP/s** during fights. |
| 4 | **Kinetic Barrier** | 75,000,000 | Adrenaline Rush | Beat #30 | `ProcEveryNSlaps` (`100%`, every `10` slaps) | Every **10 slaps** builds a shield absorbing **$12\%$ of Max HP** damage (max $24\%$ Max HP, $10\text{s}$ internal cooldown). |
| 4 | **Treasure Hunter** | 150,000,000 | Coin Magnet | Beat #30 | `AlwaysOn` (`100%`) | Elites and Bosses drop $+25\%$ bonus coins, and first-clear/milestone defeats grant $+1$ extra Gem. |
| 4 | **Frenzy** | 300,000,000 | Boss Hunter | Beat #30 | `ActiveDurationState` (`25` slaps) | Slaps charge FRENZY: $10\text{s}$ of $+50\%$ damage and $+30\%$ Overdrive speed ($\times 0.7692$ interval, bypasses $0.499\text{s}$ cap down to $0.30\text{s}$). |
| 4 | **Colossus Bane** | 600,000,000 | Boss Hunter | Beat #35 | `AlwaysOn` (`100%`) | $+35\%$ damage vs Giant, Titan, and Dragon enemies (`IsColossus == true`: #35-#50 & Worlds). |
| 5 | **Rapid Barrage** | 1,200,000,000 | Dual-Hand Technique | Beat #40 | `ProcEveryNSlaps` (`100%`, every `6` slaps) | Every **6th slap** unleashes a barrage: 3 extra hits at $40\%$ damage each ($+120\%$ bonus $= \mathbf{2.20\times}$ total slap damage). |
| 5 | **Bulwark Guard** | 2,400,000,000 | Kinetic Barrier | Beat #40 | `AlwaysOn` (`100%`) | When Defense or Barrier mitigates damage, $50\%$ of the blocked damage is reflected back to the enemy. |
| 5 | **Godhand Strike** | 5,000,000,000 | Colossus Bane | Beat #45 | `ProcEveryNSlaps` (`100%`, every `20` slaps) | Every **20th slap** triggers the Godhand Ultimate: an **$8.0\times$ screen-shattering strike** (`ValuePrimary = 8.00f`)! |

**Exact Total Cost of the Skill Tree: 9,797,667,750 coins (exact sum of all 27 skills).**

---
## 11. Game Modes & Timings (v2.6.5 Audited Final)

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
* **Format:** Endless waves cycling your frontier enemy; **HP scales by $1.028^{\text{wave}-1}$** ($3.87\times$ HP at Wave 50) and **Damage scales by $1.022^{\text{wave}-1}$** ($2.90\times$ Dmg at Wave 50). Every 5th wave (`EndlessBossWaveInterval = 5`) spawns a Mini-Boss/Boss wave with **$1.50\times$ HP (`EndlessBossHpMult`)** and **$1.25\times$ Damage (`EndlessBossDmgMult`)**. Pick 1 Cornerman Draft every 5 waves (max 3 active).
* **Endless Mastery:** Every **15 waves survived** (Waves 15, 30, 45) grants **$+1$ temporary Player Level** for that run (supports temporary Levels 51–53 when at Level 50).
* **Payout & Cooldown:** Per wave $= \text{Frontier Bounty} \times \min(1.0,\ 0.20 + 0.05 \times \text{wave}) \times \text{TotalCoinMult}$; $+1\text{💎}$ (and $+1\text{🔥}$ post-Dragon Lord) every 5 waves. **45-minute cooldown.**

### 11.4 Golden Dummy Blitz — Achievable 20-Tier Track (Unlock: 10 Defeats · 2 Charges · 45-Min Recharge)
* **Format:** $20\text{s}$ against the Golden Dummy (pure DPS test; slaps pay 0 coins). Reaching milestone **Tiers 3, 6, 9, 12, 15, and 18** adds **$+1.5\text{s}$** each (max $+9\text{s} = 29\text{s}$ max duration). `Base DPS` is defined as the player's Expected Steady-State Slap DPS (excluding active Special Moves, Weak Spots, and Frenzy burst).
* **Payout (Highest Tier Reached Only — Not Cumulative Across Tiers):** Receives the single highest tier's coin payout multiplied by `TotalCoinMult`. Milestone tiers ($3, 6, 9, 12, 15, 18, 20$) pay **$+2\text{💎}$ First-Reach Bonus** ($14\text{💎}$ total track), and repeat runs reaching Tier 10+ award **$+1\text{💎}$** (`RepeatGems = 1`).

| Tier | Name | Score Needed ($\times$ Base DPS) | Total Run Coin Payout ($\times$ Frontier Bounty $\times$ TotalCoinMult) | First-Reach Gem Bonus | Repeat Gem Bonus |
|---|---|---|---|---|---|
| 1 | BRONZE I | $\times 1.65$ | $\times 0.40$ | -- | -- |
| 2 | BRONZE II | $\times 3.30$ | $\times 0.60$ | -- | -- |
| 3 | BRONZE III (+1.5s) | $\times 4.95$ | $\times 0.80$ | $+2\text{💎}$ | -- |
| 4 | BRONZE IV | $\times 6.60$ | $\times 1.00$ | -- | -- |
| 5 | SILVER I | $\times 8.25$ | $\times 1.20$ | -- | -- |
| 6 | SILVER II (+1.5s) | $\times 9.90$ | $\times 1.40$ | $+2\text{💎}$ | -- |
| 7 | SILVER III | $\times 11.55$ | $\times 1.60$ | -- | -- |
| 8 | SILVER IV | $\times 13.20$ | $\times 1.80$ | -- | -- |
| 9 | GOLD I (+1.5s) | $\times 14.85$ | $\times 2.00$ | $+2\text{💎}$ | -- |
| 10 | GOLD II | $\times 16.50$ | $\times 2.25$ | -- | $+1\text{💎}$ |
| 11 | GOLD III | $\times 18.15$ | $\times 2.50$ | -- | $+1\text{💎}$ |
| 12 | GOLD IV (+1.5s) | $\times 19.80$ | $\times 2.75$ | $+2\text{💎}$ | $+1\text{💎}$ |
| 13 | PLATINUM I | $\times 21.45$ | $\times 3.00$ | -- | $+1\text{💎}$ |
| 14 | PLATINUM II | $\times 23.10$ | $\times 3.25$ | -- | $+1\text{💎}$ |
| 15 | DIAMOND I (+1.5s) | $\times 24.75$ | $\times 3.50$ | $+2\text{💎}$ | $+1\text{💎}$ |
| 16 | DIAMOND II | $\times 26.40$ | $\times 3.70$ | -- | $+1\text{💎}$ |
| 17 | MASTER I | $\times 28.05$ | $\times 3.90$ | -- | $+1\text{💎}$ |
| 18 | MASTER II (+1.5s) | $\times 29.70$ | $\times 4.10$ | $+2\text{💎}$ | $+1\text{💎}$ |
| 19 | GRANDMASTER | $\times 31.35$ | $\times 4.30$ | -- | $+1\text{💎}$ |
| 20 | LEGEND | $\times 33.00$ | $\times 4.50$ | $+2\text{💎}$ | $+1\text{💎}$ |

### 11.5 Reflex Slap-Off (Unlock: 5 Defeats · 2 Charges · 30-Min Recharge)
* **Format:** Duel your strongest defeated enemy. Slaps drain **$2\%$** of the pool, parry rings **$12\%$**, weak spots **$8\%$**. A missed ring costs $15\%$ of your Max HP; 2 consecutive ring misses = instant loss.
* **Payout:** Win pays **$2.0 \times \text{Enemy Bounty} \times \text{TotalCoinMult} + 1\text{💎}$**.

### 11.6 Street Brawl Anomalies (25% Chance on Repeat Main-Roster Fights)
* 🎈 **Piñata:** Enemy has **$0.60\times$ HP**, takes **$1.00\times$ full player damage**, deals $0.5\times$ damage, and pays $\times 3.0$ slap coins; flees at **$15\text{s}$** — deal $\ge 50\%$ of its HP ($0.30\times$ normal enemy HP) before it flees to win a $1.35\times$ bounty chest.
* 💀 **Sudden Death:** Both sides deal $\times 2.2$ damage (`PlayerDamageDealtMult = 2.20`, `EnemyDamageMult = 2.20`); winning pays $\times 1.40$ coins.
* ⛈️ **Slap Storm:** Your slaps deal $\times 0.5$ (`PlayerDamageDealtMult = 0.50`), but weak spots appear every $1.5\text{s}$.
* 🔥 **Berserker:** Enemy attacks at $\times 0.7$ interval ($30\%$ faster, `TimerSec = 0.0s`), player stuns blocked; win pays **$+1\text{💎}$ and $\times 1.35$ coins**.

### 11.7 Dojo Bounties — Daily Contract Board (Refreshes at Midnight)
* **4 contracts per day**, generated once at midnight (no mid-day refills).
* **Payout per Contract:** **$1.0 \times \text{Frontier Enemy Bounty} \times \text{TotalCoinMult} + 2\text{💎}$** on all 53 contract variants. Completing all 4 contracts in a day awards a **$+4\text{💎}$ Full Board Bonus** (max **$12\text{💎}/\text{day}$** from Dojo Bounties).

---
## 12. The Worlds — Asura Realm & Shadow Verse (v2.6.5 Audited Final)

Unlock: Beat #50 Dragon Lord $\to$ Asura Realm; beat Ravana $\to$ Shadow Verse. World gems: mini-boss first clear $+5\text{💎}$, final boss $+30\text{💎}$. Hard World fights: HP $\times 1.75$, Dmg $\times 1.25$, KO Coins $= 1.85 \times \text{Bounty} \times (1.35 + 1.30 \times \text{TotalCoinMult})$, Embers $\times 1.5$.

### World 1 — ASURA REALM (Chapter 6: Lv Cap 44, Power Cap 70, Dragon Mastery 1 $\times 1.25$)

| Slot | ID | Guardian | HP (v2.6.5) | Dmg (v2.6.5) | Atk Every | Evasion | Bounty (v2.6.5) | MaxHeals | 🔥 First Clear | 🔥 Repeats | Role |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 201 | Asura Footman | 357,500,000 | 4,400 | 1.38s | 15% | 62,000,000 | 0 | 3 | 1 | |
| 2 | 202 | Rakshasa Huntress | 467,500,000 | 5,100 | 1.36s | 15% | 73,000,000 | 0 | 4 | 1 | |
| 3 | 203 | Kumbhakaran | 616,000,000 | 5,950 | 1.35s | 15% | 86,000,000 | 1 | 5 | 2 | MINI BOSS |
| 4 | 204 | Mahishasura | 797,500,000 | 6,950 | 1.34s | 16% | 101,000,000 | 0 | 5 | 2 | |
| 5 | 205 | Vetala Warlock | 1,034,000,000 | 8,200 | 1.32s | 16% | 119,000,000 | 0 | 6 | 2 | |
| 6 | 206 | Ravana | 3,200,000,000 | 9,800 | 1.30s | 16% | 140,000,000 | 1 | 10 | 3 | WORLD BOSS |

### World 2 — SHADOW VERSE (Chapter 7: Lv Cap 50, Power Cap 80, Dragon Mastery 2 $\times 1.45$)

| Slot | ID | Guardian | HP (v2.6.5 Monotonic) | Dmg (v2.6.5) | Atk Every | Evasion | Bounty (v2.6.5) | MaxHeals | 🔥 First Clear | 🔥 Repeats | Role |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 211 | Shade of the Dummy | 1,760,000,000 | 11,800 | 1.30s | 16% | 175,000,000 | 0 | 6 | 2 | |
| 2 | 212 | Umbral Mime | 2,310,000,000 | 13,900 | 1.28s | 16% | 212,000,000 | 0 | 7 | 3 | |
| 3 | 213 | Umbral Puppeteer | 2,750,000,000 | 16,400 | 1.26s | 17% | 256,000,000 | 1 | 8 | 3 | MINI BOSS |
| 4 | 214 | Gloom Serpent | 3,850,000,000 | 19,200 | 1.25s | 17% | 310,000,000 | 0 | 9 | 4 | |
| 5 | 215 | The Hollow Monk | 5,500,000,000 | 22,500 | 1.24s | 18% | 375,000,000 | 0 | 10 | 5 | |
| 6 | 216 | The Dark Slapper | 26,500,000,000 | 26,500 | 1.22s | 18% | 455,000,000 | 1 | 15 | 6 | WORLD BOSS |

### Ember Arts (Sanctuary Store — Total 165🔥)
* 🔁 **Echo Palm (20🔥):** Every 8th slap (`ProcIntervalSlaps = 8`) echoes — a phantom slap lands at $60\%$ damage (`PrimaryValue = 0.60f`).
* 💓 **Frenzy Heart (15🔥):** Your Frenzy meter fills $30\%$ faster.
* 🕊️ **Phoenix Heart (35🔥):** Once per fight (`PhoenixRevive`), a fatal blow leaves you at $25\%$ HP + $1.5\text{s}$ invulnerability (triggers after *Second Wind* in Worlds; does not stack past 1 revive in Main Roster/Side Modes).
* ⚡ **Battle Trance (25🔥):** $+12\%$ slap speed ($\times 0.8929$ interval multiplier, lowers permanent cap toward $0.35\text{s}$) and $+25\%$ critical damage across all fights.
* ✊ **Giant's Grip (15🔥):** $+1$ max precision crits per fight (raises weak-spot cap from $6 \to 7$).
* 👁️ **Eagle Eye (12🔥):** Weak spots stay open $0.5\text{s}$ longer.
* 🪙 **Greed Mantra (18🔥):** $+25\%$ coins from World fights.
* 🏹 **Sovereign's Bane (25🔥):** $+15\%$ damage against all bosses.

### Relics (12 Deterministic Guardian Relics — ★2 = 3 Clears + 10🔥 · ★3 = 8 Clears + 25🔥)
* **Asura 1 — Bronze War Bell (`WorldCoinBonus`):** $+10\% / +20\% / +30\%$ coins in World fights.
* **Asura 2 — Rakshasa Fang (`CritBonus`):** $+8\% / +16\% / +24\%$ crit damage.
* **Asura 3 — Slumber Bell (`EnemyAttackSlow`):** Enemies attack $4\% / 8\% / 12\%$ slower.
* **Asura 4 — Horn of the Stampede (`WorldDamageMult`):** $+10\% / +20\% / +30\%$ damage in World fights.
* **Asura 5 — Skull of Whispers (`WeakspotSpawnSpeed`):** Weak spots appear $10\% / 20\% / 30\%$ sooner.
* **Asura 6 — Crown of Ten Kings (`WorldFinalBossDamageMult`):** $+15\% / +25\% / +40\%$ damage vs World final bosses.
* **Shadow 1 — Splinter of the First Foe (`NonBossDamageMult`):** $+8\% / +16\% / +24\%$ damage vs non-bosses.
* **Shadow 2 — Silent Glove (`SpeedBonus`):** $+4\% / +7\% / +10\%$ slap speed.
* **Shadow 3 — Puppet Strings (`EnemySpecialSlow`):** Enemy specials & signature moves charge $15\% / 30\% / 45\%$ slower.
* **Shadow 4 — Venomfang Coil (`StunnedDamageMult`):** $+10\% / +20\% / +30\%$ damage vs stunned enemies.
* **Shadow 5 — Beads of the Void (`EmberBonus`):** $+20\% / +40\% / +60\%$ Dragon Embers earned.
* **Shadow 6 — Mirror Palm (`SetSkinSlapTriggerTo`):** Sets Active Hand Skin normal-slap trigger threshold to **10 / 9 / 8 normal slaps** (applies to Hand Skin active trigger only, never Special Moves or post-freeze cooldown)!

---
## 13. Shop, Hand Skins & Real-Money Purchases

### 13.1 Hand Skins (Global Multiplicative Bonuses + Active 11th-Slap Signature Powers)

Every equipped skin grants a **Global Multiplicative Bonus** and an **Active Skin Power** that triggers every **11 normal slaps** (set to **10 slaps at ★1**, **9 slaps at ★2**, and **8 slaps at ★3** with the *Mirror Palm* relic).
* **Anti-Infinite-Loop Rule:** Slaps landed while a Skin Buff or Time Stop is currently active **do NOT increment the normal-slap counter**, and the **Infinity Gauntlet Time Stop** has a **$16.0\text{s}$ recharge cooldown** after the $5.0\text{s}$ freeze ends before the slap counter resumes charging.

| Skin | Gem Price | Bundle Price | Equipped Passive Bonus (Global Multiplier) | Active Skin Power (Every 11 Normal Slaps · 10 / 9 / 8 w/ Mirror Palm) |
|---|---|---|---|---|
| **Classic** | Free | -- | -- | -- |
| **Spider-Man** | 300💎 | ₹149 | **$+10\%$ Slap Speed** (lowers permanent cap toward $0.35\text{s}$) | 🕸️ **Web Snare:** Deals **$1.5\times$ slap damage** and slows the enemy's attack swing timer by **$25\%$ for $2.5\text{s}$**. |
| **Wolverine** | 1,000💎 | ₹249 | **$+8\%$ Crit Chance & $+15\%$ Crit Dmg** | 爪 **Berserker Slash:** Guaranteed critical strike dealing **$2.2\times$ damage** and healing you for **$2\%$ Max HP**. |
| **Thor** | 2,000💎 | ₹399 | **$\times 1.15$ Total Damage & $+15\%$ Coins** | ⚡ **Thunder Call:** Calls lightning for **$3.0\times$ slap damage** and **dazes the enemy for $0.6\text{s}$** ($0.3\text{s}$ vs Bosses). |
| **Hulk** | 3,500💎 | ₹799 | **$\times 1.25$ Total Damage & $+15\%$ Max HP** | 💥 **Gamma Smash:** Deals **$4.0\times$ slap damage**, shatters $50\%$ of enemy shields, and grants **$+20\%$ damage for $3.0\text{s}$**. |
| **Infinity Gauntlet** | 9,000💎 | ₹2,499 | **$\times 1.35$ Total Damage & $+20\%$ Coins** | 🧤 **Infinity Time Stop:** Freezes the enemy in **Time Stop for $5.0\text{s}$** while granting **$+30\%$ Slap Damage and $+50\%$ Overdrive Slap Speed** (down to $0.30\text{s}$; $16.0\text{s}$ post-freeze recharge cooldown). |

### 13.2 Coin Packs, Gem Packs, Bundles & Permanent Features

* **Coin Packs (Gems — Scaled by `TotalCoinMult` with Non-Chapter-Skipping Multipliers):** Effective coins = $\max(\text{Base},\ \text{Frontier Bounty} \times \text{TotalCoinMult} \times \text{Scaling})$:
  * *Pocket of Coins (50💎):* Base $50,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{3}$
  * *Bag of Gold (140💎):* Base $250,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{8}$
  * *Chest of Gold (350💎):* Base $1,500,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{20}$
  * *Royal Treasury (800💎):* Base $8,000,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{45}$
  * *Dragon's Hoard (1,800💎):* Base $35,000,000$ or $\text{Frontier Bounty} \times \text{TotalCoinMult} \times \mathbf{100}$
* **Gem Packs (₹):** Pouch (80💎, ₹49) · Sack (275💎, ₹149) · Chest (850💎, ₹399) · Vault (2,100💎, ₹799) · Titan's Treasury (5,600💎, ₹1,699) · Cosmic Hoard (15,000💎, ₹3,499).
* **Bundles (₹ — Coins Scale by $\max(\text{FlatBase},\ \text{Frontier Bounty} \times \text{TotalCoinMult} \times \text{BundleMult})$):**
  * *Starter (₹149):* $\max(25\text{k},\ 10\times)$ coins, 200💎, Spider-Man
  * *Weapon X (₹249):* $\max(80\text{k},\ 25\times)$ coins, 400💎, Wolverine
  * *Thunder (₹399):* $\max(250\text{k},\ 60\times)$ coins, 800💎, Thor
  * *Hero (₹799):* $\max(1\text{M},\ 150\times)$ coins, 1,600💎, Hulk
  * *Cosmic Infinity (₹2,499):* $\max(10\text{M},\ 400\times)$ coins, 3,000💎, Infinity Gauntlet
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
* **Rewarded — Offline Double:** Watch an ad on the Offline Miner claim card to deliver a true **$2.0\times$ payout** across the entire 8-hour claim window (raises the chapter hard cap from $17.5\%$ to **$35.0\%$** of the current chapter's incremental build cost).

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
## 16. Offline Earnings (45s Kill-Rate Cap & 17.5%/35% Chapter Hard Cap)

* **Turf Tribute Removed:** Passive group rent (`Turf Tribute`) and Relic Stations are completely removed.
* **Offline Slap Miner (200💎 Shop Feature — Calibrated at `0.0068` Coefficient + True 2.0× Ad Scaling):**
  * While away (minimum $60\text{s}$, capped at **$8\text{ hours}$**), `Effective_DPS` is clamped to a maximum of **1 frontier kill every 45 seconds** ($\text{Strongest\_Defeated\_HP} / 45.0$), and total claimable coins are capped at **$17.5\%$** (without ad) or **$35.0\%$** (with $2\times$ Rewarded Ad) of the current chapter's incremental build cost—delivering a true **$2.0\times$ payout** when watching the rewarded ad at any claim duration up to 8 hours:
    $$\text{Effective\_DPS} = \min\left(\text{Theoretical\_DPS},\ \frac{\text{Strongest\_Defeated\_HP}}{45.0}\right)$$
    $$\text{RawOfflineCoins} = 0.0068 \times \text{Effective\_DPS} \times \left(\frac{\text{Strongest\_Defeated\_Bounty} \times (\text{SlapCapFraction} + 1.30 \times \text{TotalCoinMult})}{\text{Strongest\_Defeated\_HP}}\right) \times \text{ClaimSec} \times \text{AdMult}$$
    $$\text{FinalClaimCoins} = \min\left(\text{RawOfflineCoins},\ (\text{watchedAd}\ ?\ 0.35 : 0.175) \times \text{CurrentChapterBuildCost}\right)$$

---
## 17. Every Timer in One Table (v2.6.5 Audited Final)

| Timer | v2.6.5 Duration |
|---|---|
| **Attribute-Only Slap Interval Floor (Speed Lv 25, No Skills)** | $0.9075\text{ seconds}$ |
| **Permanent Skill-Unlocked Slap Interval Floor (Speed Lv 25 + Skills)** | $0.499\text{ seconds}$ |
| **Skin & World Relic Slap Interval Floor (`Speed.HardCapValue`)** | $0.350\text{ seconds}$ |
| **Temporary Overdrive Slap Interval Floor** | $0.300\text{ seconds}$ (Frenzy, Adrenaline, Swift Recovery, Time Stop) |
| **Infinity Gauntlet Time Stop Duration & Cooldown** | $5.0\text{s}$ active freeze · $16.0\text{s}$ post-freeze recharge cooldown |
| **Frenzy Duration** | $10.0\text{ seconds}$ ($13.0\text{s}$ with ₹99 Overcharge Booster) |
| **Boss Post-Heal Enrage Suppression Grace Window** | $8.0\text{ seconds}$ |
| **Piñata Anomaly Flee Timer** | $15.0\text{ seconds}$ ($0.60\times$ HP, $1.00\times$ full damage taken) |
| **Reflex Slap-Off Charge Recharge** | $30\text{ minutes}$ per charge (2 charges max) |
| **Trio Gauntlet Global Cooldown** | $30\text{ minutes}$ (shared across all groups) |
| **Golden Dummy Blitz Charge Recharge** | $45\text{ minutes}$ per charge (2 charges max; max $29\text{s}$ fight duration) |
| **Endless Mode Cooldown** | $45\text{ minutes}$ after a run ends |
| **Boss Rush Cooldown** | $60\text{ minutes}$ after a run ends |
| **Rewarded Ad Boosts ($2\times$ Coins / $2\times$ Damage)** | $10\text{ minutes}$ each (no stacking; re-watching resets to $10\text{m}$) |
| **Interstitial Ad Minimum Gap** | $75\text{ seconds}$ (after every 3 fight wins) |
| **Offline Slap Miner Accrual Cap** | $8\text{ hours}$ (minimum $60\text{s}$ away; $45\text{s}$ kill-rate clamp & $17.5\% / 35.0\%$ chapter cost cap) |
| **Dojo Bounties, Daily Quests & Login Chest** | Refresh daily at midnight |