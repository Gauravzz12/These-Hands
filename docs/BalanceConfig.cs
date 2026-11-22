// ============================================================================
// IDLE SLAPPER — COMPLETE GAME BALANCE CONFIG (v3.2.0)
// Drop-in Unity C# Static Configuration
// All 6/6 design pillars & all 11 audit fixes mathematically verified and
// reconciled 1:1 with IDLE_SLAPPER_Complete_Game_Values_v2.6.5.md.
//
// RUNTIME COMBAT & STACKING RULES (v2.6.5 EXPLICIT CONTRACT):
// 1. Skill Damage Stacking: Only active `SkillEffectType.DamageMult` bonuses
//    (`stronger_hands = +0.20f`, `opportunist = +0.35f` vs stunned/dazed) sum
//    additively into `skillPoolMult = 1f + Sum(bonus)`. (`basic_slap` has
//    ValuePrimary = 1.0f identity). Per-trigger proc multipliers use
//    `SkillEffectType.ProcHitDamageMult` / `SpecialProc` and apply per-trigger
//    on top of the additive pool.
// 2. Speed Multipliers: All `SkillEffectType.SpeedMult` values are interval
//    multipliers (`interval *= value`): `second_hand = 0.85f`, `twin_mastery =
//    0.90f`, `quick_reflexes = 0.90f`, `dual_hand_technique = 0.85f`,
//    `adrenaline_rush = 0.8333f` (/1.20), `frenzy = 0.7692f` (/1.30), and
//    `battle_trance = 0.8929f` (/1.12).
// 3. Boss Heal & Enrage Grace: Bosses with `MaxHeals > 0` heal `BossHealPercent`
//    (15%) at 60% HP and 30% HP (main bosses, MaxHeals = 2) or 50% HP (world
//    bosses/mini-bosses, MaxHeals = 1). Group 8 `Sands of Siphon` heals 1.5%
//    Max HP capped at 3 triggers per fight. If a heal lifts a boss above 40%
//    HP, Enrage is suppressed for `BossEnragePostHealGraceSec` (8.0s).
// 4. Revive Priority Rule: Main Roster & Side Modes allow at most 1 revive per
//    fight (`Second Wind` Lv 14 takes priority over `Phoenix Heart`). Inside
//    Endgame Worlds (#201-#216), `Second Wind` and `Phoenix Heart` may each
//    trigger once sequentially.
// 5. Mirror Palm Relic: `SetSkinSlapTriggerTo` (10 / 9 / 8) sets the normal-slap
//    trigger threshold for equipped Hand Skin Active Powers ONLY.
// 6. Accuracy vs Evasion: `finalHitChance = Mathf.Clamp(playerAccuracy -
//    enemy.Evasion, 0.05f, 1.00f)`.
// ============================================================================

using System;
using System.Collections.Generic;
using UnityEngine;

namespace IdleSlapper.Config
{
    public enum AttributeType { Power, Speed, CritChance, CritDamage, Defense, Stun, Combo, CoinMult, Accuracy, GiantSlayer, LifeLeech, Fortune }
    public enum EnemyTag { Normal, MiniBoss, Elite, Boss, FinalBoss, WorldBoss }
    public enum WorldId { MainRoster = 0, AsuraRealm = 1, ShadowVerse = 2 }
    public enum SkinId { Classic, SpiderMan, Wolverine, Thor, Hulk, InfinityGauntlet }
    public enum SpecialMoveId { DoubleSlap, Guard, UppercutPunch }
    public enum CornermanCardId { CutmansIcePack, CornermansTowel, LoadedWraps, SmellingSalts, CoachsSpotter, SavedByTheBell, SecondWindTonic, HighRollerPurse }
    public enum StreetBrawlAnomaly { None, Pinata, SuddenDeath, SlapStorm, Berserker }
    public enum SkillActivationTrigger { AlwaysOn, ProcOnHit, ProcEveryNSlaps, ActiveDurationState, OnLowHpState }

    public enum SkillEffectType
    {
        None,
        DamageMult,
        ProcHitDamageMult,
        SpeedMult,
        CritChance,
        CritDmg,
        CoinMult,
        HpFlat,
        HpMult,
        BossDamage,
        ColossusDamage,
        GlobalDamage,
        SpecialProc,
        ComboCapBonus,
        ComboChargeBonus,
        ComboStackDamageBonus,
        ComboPersistOnSwitch,
        ParryUnlock,
        BossSigParryMitigation,
        ShieldEveryNSlaps,
        ShieldReflectPct,
        FrenzyChargeBonus,
        WeakSpotCapBonus,
        WeakSpotWindowBonus,
        PhoenixRevive,
        Passive
    }

    public enum PerkEffectType
    {
        DamageMult,
        CounterSlapDamageMult,
        LowHpEnemyDamageMult,
        EveryNSlapDamageAndStun,
        WorldDamageAndCritDmg,
        CoinMult,
        MidasWindowCoinMult,
        HpFlat,
        HpMult,
        DamageReduction,
        LowHpDamageReduction,
        CritChance,
        DefToCritDmgBonus,
        DamageVsBoss,
        SpeedMult,
        HealEveryNSlaps,
        ReviveOncePerFight,
        StunDurationAtCombo,
        SpeedOnParry,
        GlobalDamageAndHp
    }

    public enum SpecialMoveEffectType { None, DamageMult, BlockNext, StunDuration, SelfBuff }

    public enum RelicEffectType
    {
        WorldDamageMult,
        WorldFinalBossDamageMult,
        NonBossDamageMult,
        StunnedDamageMult,
        SpeedBonus,
        CritBonus,
        WorldCoinBonus,
        WeakspotSpawnSpeed,
        EnemyAttackSlow,
        EnemySpecialSlow,
        SetSkinSlapTriggerTo,
        EmberBonus
    }

    [Serializable] public struct ChapterGateConfig { public int ChapterIndex; public string GateName; public int RequiredBossId; public int PlayerLevelCap; public int PowerCap; public int SpeedCap; public int CritChanceCap; public int CritDmgComboCoinsCap; public int DefGiantSlayerLeechCap; public int StunFortuneCap; public int AccuracyCap; }
    [Serializable] public struct AttributeConfig { public AttributeType Type; public string Id; public string DisplayName; public double BaseCost; public double Growth; public int MaxLevel; public double EffectPerLevel; public double HardCapValue; }
    [Serializable] public struct EvenLevelPerkConfig { public int Level; public string Id; public string Name; public PerkEffectType EffectType; public float PrimaryValue; public float SecondaryValue; public float TertiaryValue; public bool CleanseDebuffOnTrigger; }
    [Serializable] public struct SpecialMoveConfig { public SpecialMoveId Id; public string Name; public int RequiredBossId; public SpecialMoveEffectType PrimaryEffectType; public float PrimaryBaseValue; public float PrimaryMaxedValue; public SpecialMoveEffectType SecondaryEffectType; public float SecondaryDurationSec; public float BaseCooldownSec; public float MaxedCooldownSec; }
    [Serializable] public struct EnemyConfig { public int Id; public string Name; public int GroupIndex; public WorldId World; public double MaxHp; public double AttackDamage; public float AttackInterval; public float Evasion; public double BaseBounty; public EnemyTag Tag; public int MaxHeals; public bool IsColossus; }
    [Serializable] public struct SkillConfig { public string Id; public string Name; public int Tier; public double CoinCost; public string PrerequisiteSkillId; public int RequiredBossId; public SkillActivationTrigger Trigger; public SkillEffectType PrimaryEffectType; public float ValuePrimary; public SkillEffectType SecondaryEffectType; public float ValueSecondary; public float ProcChance; public int ProcIntervalSlaps; public float StateHpThreshold; }
    [Serializable] public struct HandSkinConfig { public SkinId Id; public string Name; public int GemPrice; public int BundleInrPrice; public float PassiveDamageMult; public float PassiveSpeedBonus; public float PassiveCritChanceBonus; public float PassiveCritDamageBonus; public float PassiveCoinBonus; public float PassiveMaxHpBonus; public float ActiveProcMultiplier; public float ActiveDuration; public float ActiveSpeedBonus; public float ActiveBuffDamageBonus; public float ActiveHealPct; public float ActiveEnemySlowPct; public float ActiveEnemyDazeSec; public float ActiveShieldShatterPct; public bool ActiveGuaranteedCrit; public bool ActiveEnemyTimeStop; public float PostActiveCooldown; }
    [Serializable] public struct BlitzTierConfig { public int Tier; public string Name; public float ScoreMultiplierOfBaseDps; public float BountyPayoutMultiplier; public float BonusSecondsAdded; public int FirstReachGems; public int RepeatGems; }
    [Serializable] public struct CornermanCardConfig { public CornermanCardId Id; public string Name; public float PrimaryValue; public float SecondaryValue; public float DurationSec; }
    [Serializable] public struct AnomalyConfig { public StreetBrawlAnomaly Type; public string Name; public float TriggerChance; public float EnemyHpMult; public float PlayerDamageDealtMult; public float EnemyDamageMult; public float EnemyIntervalMult; public float SlapCoinMult; public float BountyRewardMult; public int BonusGems; public float TimerSec; }
    [Serializable] public struct EmberArtConfig { public string Id; public string Name; public int EmberCost; public SkillEffectType PrimaryEffectType; public float PrimaryValue; public SkillEffectType SecondaryEffectType; public float SecondaryValue; public int ProcIntervalSlaps; }
    [Serializable] public struct RelicConfig { public string Id; public string Name; public int GuardianBossId; public RelicEffectType EffectType; public float Star1Value; public float Star2Value; public float Star3Value; public int Star2ClearsRequired; public int Star2EmberCost; public int Star3ClearsRequired; public int Star3EmberCost; }
    [Serializable] public struct SlapCoinBandConfig { public int MinEnemyId; public int MaxEnemyId; public WorldId World; public float BaseSlapFraction; public float MaxNormalMult; public float MaxBossMult; public float FightSlapCapFraction; public float FrontierBonusSlapMult; public float FrontierFightCapFraction; }
    [Serializable] public struct CoinPackConfig { public string Id; public string Name; public int GemCost; public double BaseCoinFloor; public float FrontierBountyMult; }
    [Serializable] public struct RealMoneyBundleConfig { public string Id; public string Name; public int InrPrice; public double BaseCoinFloor; public float FrontierBountyMult; int GemsIncluded; public SkinId SkinIncluded; }

    public static class BalanceConfig
    {
        public const string Version = "3.2.0";
        public const int MaxPlayerLevel = 50;
        public const int MaxEndlessMasteryBonusLevels = 3;
        public const double BaseSlapDamage = 12.0;
        public const float BaseSlapInterval = 1.400f;
        public const float BaseCritChance = 0.15f;
        public const float MaxCritChanceCap = 0.75f;
        public const float OvercapCritToCritDmgRatio = 8.0f; // +1% excess Crit% -> +8% Crit Dmg
        public const float BaseCritDamageMultiplier = 2.0f;
        public const float BaseAccuracy = 0.85f;
        public const float MaxAccuracyCap = 0.95f;
        public const float MinFinalHitChance = 0.05f;
        public const float MaxFinalHitChance = 1.00f;

        public const float DragonMastery1Mult = 1.25f; // Unlocked on beating #50 Dragon Lord
        public const float DragonMastery2Mult = 1.45f; // Unlocked on beating #206 Ravana (replaces Mastery 1)

        public const int BaseMaxComboStacks = 4;
        public const float ComboStacksPerLevel = 0.25f;
        public const int LifeLeechEveryNSlaps = 8;
        public const float StunChancePerLevel = 0.004f;
        public const float StunDurationPerLevel = 0.018f;
        public const float LuckyDamageMult = 1.5f;
        public const float LuckyCoinMult = 2.5f;

        public const float AttrOnlySpeedFloor = 0.9075f;
        public const float SkillPermanentSpeedFloor = 0.350f;
        public const float SkinRelicSpeedFloor = 0.350f;
        public const float OverdriveSpeedFloor = 0.250f;

        public const int ArmoredPoiseStartEnemyId = 9;
        public const int ArmoredPoiseMinComboBypass = 5;
        public const float ArmoredPoiseDamageMult = 0.60f;
        public const int MissComboStackPenalty = 2;
        public const float MissSpecialChargePauseSec = 1.5f;

        // v2.6.7: Active Brace REPLACED by Tap-Parry (Gaurav's call); Signatures stay 100% Unblockable.
        public const float ParryWindowSec = 0.30f;
        public const float ParryWindowWideSec = 0.50f;
        public const float ParryCooldownSec = 10.00f;
        public const float ParryCounterSlapMult = 1.50f;
        public const float IronStance1CooldownSec = 8.00f;
        public const float IronStance2CooldownSec = 5.00f;
        public const float IronStance3WindowSec = 0.50f;
        public const bool SignaturesAreUnblockable = true;
        public const float SignatureWindupSec = 0.75f;

        public const float BaseStunChance = 0.05f;
        public const float MaxStunChance = 0.25f;
        public const float BaseStunDuration = 0.50f;
        public const float MaxStunDuration = 1.40f;
        public const float BattleFocusBonusStunSec = 0.20f;
        public const float NormalPostStunImmunitySec = 3.5f;
        public const float BossPostStunImmunitySec = 5.0f;
        public const float BossStunDurationMult = 0.50f;
        public const float StunInternalCooldownSec = 6.0f;

        public const float WeakSpotFirstSpawnSec = 2.2f;
        public const float WeakSpotMinIntervalSec = 5.0f;
        public const float WeakSpotMaxIntervalSec = 8.0f;
        public const float WeakSpotWindowNormalSec = 1.5f;
        public const float WeakSpotWindowHardSec = 1.2f;
        public const float WeakSpotDamageMult = 4.5f;
        public const int FrenzyChargePerWeakSpot = 12;
        public const int BaseWeakSpotsPerFight = 3;
        public const int MaxWeakSpotsPerFight = 6;
        public const int FortuneLevelsPerExtraWeakSpot = 15;

        public const int FrenzySlapsToCharge = 25;
        public const float FrenzyDurationSec = 10.0f;
        public const float FrenzyOverchargeDurationSec = 13.0f;
        public const float FrenzyOverchargeChargeBonus = 0.25f;
        public const float FrenzyDamageMult = 1.50f;
        public const float FrenzySpeedBonus = 0.30f;

        public const float EnemyFirstSwingIntervalMult = 1.15f;
        public const float EnemySwingDecayPerAttack = 0.99f;
        public const float EnemyMinSwingIntervalMult = 0.85f;

        public const float BossEnrageHpThreshold = 0.40f;
        public const float BossEnrageIntervalMult = 0.80f;
        public const float BossEnrageDamageMult = 1.10f;
        public const float BossEnragePostHealGraceSec = 8.0f;
        public const float BossHealPercent = 0.15f;
        public const float MainBossFirstHealThreshold = 0.60f;
        public const float MainBossSecondHealThreshold = 0.30f;
        public const float WorldBossHealThreshold = 0.50f;
        public const float Group8SiphonHealPercent = 0.015f;
        public const int Group8SiphonMaxHealsPerFight = 3;

        public const float KoBaseBountyMultiplier = 1.00f; // v3.2: 100% KO bounty payout
        public const float FightSlapCapNormal = 0.85f;     // v3.2: Stages 16-50 regular/mini-boss cap
        public const float FightSlapCapBoss = 0.35f;       // v3.2: Bosses and World Bosses cap
        public const float SlapIntervalFloorSec = 0.350f;
        public const float SlapIntervalFloorOverdriveSec = 0.250f;
        public const float SlapIntervalFloorWorldsSec = 0.280f;
        public const float AdOverdriveDpsMult = 1.75f;
        public const int AntiFarmSafeSlotRange = 5;
        public const float AntiFarmDecayPerSlot = 0.10f;
        public const float AntiFarmMinPayoutFloor = 0.40f;

        public const float HardModeHpMult = 1.75f;
        public const float HardModeDamageMult = 1.25f;
        public const float HardModeTotalPayoutMult = 1.85f; // ~1.057x raw CPS (~1.09x w/ load time); rewards mastery without obsoleting Normal Mode
        public const float HardModeWorldEmberMult = 1.50f;
        public const int HardModeFirstClearGems = 3;
        public const int HardModeGroupMasteryGems = 10;
        public const float HardModeGroupMasteryCoinBonus = 0.03f; // v3.2: +3% coin mastery

        public const int OfflineMinerGemPrice = 200;
        public const float OfflineMinAwaySeconds = 60.0f;
        public const float OfflineMaxAccrualSeconds = 8.0f * 3600.0f;
        public const float OfflineKillTimeClampSec = 45.0f;
        public const float OfflineEfficiencyCoefficient = 0.0068f;
        public const float OfflineAdDoubleMultiplier = 2.0f;
        public const float OfflineMaxChapterCostFraction = 0.175f;
        public const float OfflineMaxChapterCostFractionAdOn = 0.35f;

        public const int InterstitialWinsInterval = 3;
        public const float InterstitialMinGapSec = 75.0f;
        public const float RewardedCoinBoostDurationSec = 600.0f; // 10 minutes (2x Coins)
        public const int RewardedDamageBoostWins = 7;             // 7 fight wins (2x Damage)
        public const int RewardedDamageBoostMaxAttempts = 10;      // Hard cap on attempts per ad
        public const float RewardedDamageBoostMult = 2.0f;
        public const float RewardedCoinBoostMult = 2.0f;
        public const float RewardedReviveHpPercent = 0.50f;
        public const float VipPassKoCoinBonus = 0.25f;

        public const int ReflexMaxCharges = 2;
        public const float ReflexRechargeSec = 30.0f * 60.0f;
        public const float ReflexWinBountyMult = 2.0f;
        public const int ReflexWinGems = 1;
        public const int ReflexRequiredBossId = 10;
        public static readonly string[] ReflexRequiredSkillIds = { "deflect", "precision_instinct" };

        public const float TrioGauntletCooldownSec = 30.0f * 60.0f;
        public const float TrioGauntletSlapCoinMult = 0.50f;
        public const float TrioGauntletCompletionMult = 1.35f;
        public const float TrioGauntletBaseBreatherHeal = 0.05f;
        public const float TrioGauntletParryHealPerHit = 0.04f; // Clean Defense: per Normal Attack Parried (Deflect) or Blocked (Guard)
        public const float TrioGauntletMaxParryHeal = 0.12f;
        public const float TrioGauntletFinisherHeal = 0.05f;
        public const float TrioGauntletFinisherCdRefundSec = 3.0f;
        public const int TrioGauntletFirstClearGems = 3;
        public const int TrioGauntletRepeatGems = 1;

        public const int BlitzMaxCharges = 2;
        public const float BlitzRechargeSec = 45.0f * 60.0f;
        public const float BlitzBaseDurationSec = 20.0f;
        public const int BlitzRepeatGemMinTier = 10;

        public const float EndlessCooldownSec = 45.0f * 60.0f;
        public const float EndlessHpGrowthPerWave = 1.028f;
        public const float EndlessDmgGrowthPerWave = 1.022f;
        public const int EndlessWavesPerMasteryLevel = 15;
        public const int EndlessBossWaveInterval = 5;
        public const float EndlessBossHpMult = 1.50f;
        public const float EndlessBossDmgMult = 1.25f;

        public const float BossRushCooldownSec = 60.0f * 60.0f;
        public const float BossRushBetweenRoundHeal = 0.15f;
        public const float BossRushSlapCoinMult = 0.50f;
        public const float BossRushCompletionMult = 1.80f;

        public static double GetPlayerBaseMaxHp(int level)
        {
            level = Mathf.Clamp(level, 1, MaxPlayerLevel + MaxEndlessMasteryBonusLevels);
            return Math.Round(120.0 * Math.Pow(1.135, level - 1), MidpointRounding.AwayFromZero);
        }

        public static double GetPlayerTotalMaxHp(int level, bool hasStaminaTraining = false, bool hasUnstoppableHands = false)
        {
            double hp = GetPlayerBaseMaxHp(level);
            if (hasStaminaTraining) hp *= 1.15; // +15% Max HP (was 0.15 bug)
            if (hasUnstoppableHands) hp *= 1.30; // +30% Max HP
            if (level >= 50) hp *= 1.25; // Grandmaster Belt: +25% Max HP
            return Math.Max(100.0, Math.Round(hp, MidpointRounding.AwayFromZero));
        }

        public static float GetStunDuration(int stunLevel, bool hasBattleFocusActive = false, bool isBossOrElite = false)
        {
            stunLevel = Mathf.Clamp(stunLevel, 0, 50);
            float rawDuration = Mathf.Min(BaseStunDuration + StunDurationPerLevel * stunLevel, MaxStunDuration);
            if (hasBattleFocusActive) rawDuration += BattleFocusBonusStunSec;
            return isBossOrElite ? rawDuration * BossStunDurationMult : rawDuration;
        }

        public static float GetFinalHitChance(float playerAccuracy, float enemyEvasion)
        {
            return Mathf.Clamp(playerAccuracy - enemyEvasion, MinFinalHitChance, MaxFinalHitChance);
        }

        public static float GetSlapCapFraction(int enemyId)
        {
            for (int i = 0; i < SlapCoinBands.Length; i++)
                if (enemyId >= SlapCoinBands[i].MinEnemyId && enemyId <= SlapCoinBands[i].MaxEnemyId)
                    return SlapCoinBands[i].FightSlapCapFraction;
            return 1.25f;
        }

        public static double GetLevelUpCost(int level)
        {
            if (level < 1 || level >= MaxPlayerLevel) return 0.0;
            double baseCost;
            if (level <= 10)
            {
                baseCost = 300.0 * Math.Pow(1.70, level - 1);
            }
            else if (level <= 30)
            {
                double costAt10 = 300.0 * Math.Pow(1.70, 9);
                baseCost = costAt10 * Math.Pow(1.45, level - 10);
            }
            else
            {
                double costAt10 = 300.0 * Math.Pow(1.70, 9);
                double costAt30 = costAt10 * Math.Pow(1.45, 20);
                baseCost = costAt30 * Math.Pow(1.33, level - 30);
            }
            // Belt promotion levels cost 1.5x
            if (level == 4 || level == 9 || level == 14 || level == 19 || level == 24 || level == 29 || level == 34 || level == 39 || level == 44 || level == 49)
            {
                baseCost *= 1.50;
            }
            return Math.Round(baseCost, MidpointRounding.AwayFromZero);
        }

        public static double CalculateSlapCoins(double stageBounty, double slapDamage, double enemyMaxHp, bool isCrit, bool isLucky, double coinMult)
        {
            double dmgRatio = enemyMaxHp > 0 ? Math.Min(1.0, slapDamage / enemyMaxHp) : 0.05;
            double critFactor = isCrit ? 1.40 : 1.0;
            double luckyFactor = isLucky ? 2.50 : 1.0;
            double coins = 0.14 * stageBounty * Math.Pow(dmgRatio, 0.45) * critFactor * luckyFactor * coinMult;
            return Math.Max(1.0, Math.Round(coins, MidpointRounding.AwayFromZero));
        }

        public static double GetAttributeCost(AttributeType type, int currentLevel)
        {
            AttributeConfig cfg = Attributes[type];
            if (currentLevel < 0 || currentLevel >= cfg.MaxLevel) return 0.0;
            return Math.Round(cfg.BaseCost * Math.Pow(cfg.Growth, currentLevel), MidpointRounding.AwayFromZero);
        }

        public static double GetPowerBaseDamage(int powerLevel, bool hasDragonMastery1 = false, bool hasDragonMastery2 = false)
        {
            powerLevel = Mathf.Clamp(powerLevel, 0, 80);
            double baseDmg = (12.0 + 2.5 * powerLevel) * Math.Pow(1.08, powerLevel) * Math.Pow(1.25, powerLevel / 10);
            if (hasDragonMastery2) return baseDmg * DragonMastery2Mult;
            if (hasDragonMastery1) return baseDmg * DragonMastery1Mult;
            return baseDmg;
        }

        public static double CalculateNormalFightMaxCoins(double bounty, int enemyId, double totalCoinMult)
        {
            return bounty * (GetSlapCapFraction(enemyId) + KoBaseBountyMultiplier * totalCoinMult);
        }

        public static double CalculateHardFightKoCoins(double bounty, int enemyId, double totalCoinMult)
        {
            return HardModeTotalPayoutMult * CalculateNormalFightMaxCoins(bounty, enemyId, totalCoinMult);
        }

        public static float GetSpecialMoveValue(SpecialMoveConfig cfg, int currentChapterIndex)
        {
            float t = Mathf.Clamp01((currentChapterIndex - 2) / 5.0f);
            return Mathf.Lerp(cfg.PrimaryBaseValue, cfg.PrimaryMaxedValue, t);
        }

        public static float GetSpecialMoveCooldown(SpecialMoveConfig cfg, int currentChapterIndex, bool hasShogunMastery)
        {
            float t = Mathf.Clamp01((currentChapterIndex - 2) / 5.0f);
            float cd = Mathf.Lerp(cfg.BaseCooldownSec, cfg.MaxedCooldownSec, t);
            if (hasShogunMastery && (cfg.Id == SpecialMoveId.DoubleSlap || cfg.Id == SpecialMoveId.Guard))
                cd = Mathf.Max(cfg.MaxedCooldownSec, cd - 3.0f);
            return cd;
        }

        public static double CalculateOfflineClaimCoins(double theoreticalDps, int strongestDefeatedId, double strongestDefeatedHp, double strongestDefeatedBounty, double totalCoinMultiplier, double currentChapterBuildCost, double awaySeconds, bool watchedDoubleAd)
        {
            if (strongestDefeatedHp <= 0.0 || awaySeconds < OfflineMinAwaySeconds) return 0.0;
            double clampedSec = Math.Min(awaySeconds, OfflineMaxAccrualSeconds);
            double effDps = Math.Min(theoreticalDps, strongestDefeatedHp / OfflineKillTimeClampSec);
            double fullPayout = strongestDefeatedBounty * (GetSlapCapFraction(strongestDefeatedId) + KoBaseBountyMultiplier * totalCoinMultiplier);
            double cps = OfflineEfficiencyCoefficient * effDps * (fullPayout / strongestDefeatedHp);
            double raw = cps * clampedSec * (watchedDoubleAd ? OfflineAdDoubleMultiplier : 1.0);
            double capFrac = watchedDoubleAd ? OfflineMaxChapterCostFractionAdOn : OfflineMaxChapterCostFraction;
            return Math.Min(raw, currentChapterBuildCost * capFrac);
        }

        public static double CalculateTrioGauntletReward(double bounties, double totalCoinMult) => bounties * TrioGauntletCompletionMult * totalCoinMult;
        public static double CalculateBossRushReward(double bounties, double totalCoinMult, bool highRollerPurse) => bounties * BossRushCompletionMult * totalCoinMult * (highRollerPurse ? 1.50 : 1.00);
        public static double CalculateEndlessWaveReward(int wave, double frontierBounty, double totalCoinMult) => frontierBounty * Math.Min(1.0, 0.20 + 0.05 * wave) * totalCoinMult;

        public static bool TryGetSkill(string skillId, out SkillConfig cfg)
        {
            for (int i = 0; i < Skills.Length; i++)
                if (Skills[i].Id == skillId) { cfg = Skills[i]; return true; }
            cfg = default; return false;
        }

        public static readonly ChapterGateConfig[] ChapterGates = new[]
        {
            new ChapterGateConfig { ChapterIndex=1, GateName="Start (Ch. 1)", RequiredBossId=0, PlayerLevelCap=10, PowerCap=12, SpeedCap=8, CritChanceCap=10, CritDmgComboCoinsCap=12, DefGiantSlayerLeechCap=10, StunFortuneCap=10, AccuracyCap=4 },
            new ChapterGateConfig { ChapterIndex=2, GateName="Beat #10 Monkey (Ch. 2)", RequiredBossId=10, PlayerLevelCap=18, PowerCap=24, SpeedCap=13, CritChanceCap=18, CritDmgComboCoinsCap=22, DefGiantSlayerLeechCap=18, StunFortuneCap=18, AccuracyCap=6 },
            new ChapterGateConfig { ChapterIndex=3, GateName="Beat #20 Dark Knight (Ch. 3)", RequiredBossId=20, PlayerLevelCap=26, PowerCap=36, SpeedCap=18, CritChanceCap=26, CritDmgComboCoinsCap=32, DefGiantSlayerLeechCap=26, StunFortuneCap=26, AccuracyCap=8 },
            new ChapterGateConfig { ChapterIndex=4, GateName="Beat #30 Shogun (Ch. 4)", RequiredBossId=30, PlayerLevelCap=33, PowerCap=48, SpeedCap=21, CritChanceCap=33, CritDmgComboCoinsCap=42, DefGiantSlayerLeechCap=32, StunFortuneCap=34, AccuracyCap=11 },
            new ChapterGateConfig { ChapterIndex=5, GateName="Beat #40 Pharaoh (Ch. 5)", RequiredBossId=40, PlayerLevelCap=38, PowerCap=60, SpeedCap=23, CritChanceCap=39, CritDmgComboCoinsCap=52, DefGiantSlayerLeechCap=36, StunFortuneCap=42, AccuracyCap=13 },
            new ChapterGateConfig { ChapterIndex=6, GateName="Beat #50 Dragon Lord (Ch. 6)", RequiredBossId=50, PlayerLevelCap=44, PowerCap=70, SpeedCap=25, CritChanceCap=45, CritDmgComboCoinsCap=60, DefGiantSlayerLeechCap=40, StunFortuneCap=47, AccuracyCap=14 },
            new ChapterGateConfig { ChapterIndex=7, GateName="Beat #206 Ravana (Ch. 7)", RequiredBossId=206, PlayerLevelCap=50, PowerCap=80, SpeedCap=25, CritChanceCap=45, CritDmgComboCoinsCap=65, DefGiantSlayerLeechCap=40, StunFortuneCap=50, AccuracyCap=14 }
        };

        public static readonly Dictionary<AttributeType, AttributeConfig> Attributes = new Dictionary<AttributeType, AttributeConfig>
        {
            { AttributeType.Power,       new AttributeConfig { Type=AttributeType.Power,       Id="power",      DisplayName="Damage",       BaseCost=85,  Growth=1.255, MaxLevel=80, EffectPerLevel=1.0,        HardCapValue=80.0 } },
            { AttributeType.Speed,       new AttributeConfig { Type=AttributeType.Speed,       Id="speed",      DisplayName="Speed",        BaseCost=135, Growth=1.92, MaxLevel=25, EffectPerLevel=0.94,        HardCapValue=0.250 } },
            { AttributeType.CritChance,  new AttributeConfig { Type=AttributeType.CritChance,  Id="critChance", DisplayName="Crit %",       BaseCost=150, Growth=1.50, MaxLevel=45, EffectPerLevel=0.01,        HardCapValue=0.75 } },
            { AttributeType.CritDamage,  new AttributeConfig { Type=AttributeType.CritDamage,  Id="critDamage", DisplayName="Crit Dmg",     BaseCost=110, Growth=1.32, MaxLevel=65, EffectPerLevel=0.05,        HardCapValue=999.0 } },
            { AttributeType.Defense,     new AttributeConfig { Type=AttributeType.Defense,     Id="defense",    DisplayName="Defense",      BaseCost=190, Growth=1.52, MaxLevel=40, EffectPerLevel=0.01,        HardCapValue=0.40 } },
            { AttributeType.Stun,        new AttributeConfig { Type=AttributeType.Stun,        Id="stun",       DisplayName="Stun",         BaseCost=150, Growth=1.42, MaxLevel=50, EffectPerLevel=0.005,       HardCapValue=0.25 } },
            { AttributeType.Combo,       new AttributeConfig { Type=AttributeType.Combo,       Id="combo",      DisplayName="Combo",        BaseCost=95,  Growth=1.32, MaxLevel=65, EffectPerLevel=0.01,        HardCapValue=999.0 } },
            { AttributeType.CoinMult,    new AttributeConfig { Type=AttributeType.CoinMult,    Id="coinMult",   DisplayName="Coins",        BaseCost=100, Growth=1.33, MaxLevel=65, EffectPerLevel=0.05,        HardCapValue=3.25 } },
            { AttributeType.Accuracy,    new AttributeConfig { Type=AttributeType.Accuracy,    Id="accuracy",   DisplayName="Accuracy",     BaseCost=200, Growth=2.85, MaxLevel=14, EffectPerLevel=0.01,        HardCapValue=0.95 } },
            { AttributeType.GiantSlayer, new AttributeConfig { Type=AttributeType.GiantSlayer, Id="bossDamage", DisplayName="Giant Slayer", BaseCost=200, Growth=1.53, MaxLevel=40, EffectPerLevel=0.005,       HardCapValue=0.20 } },
            { AttributeType.LifeLeech,   new AttributeConfig { Type=AttributeType.LifeLeech,   Id="vampirism",  DisplayName="Life Leech",   BaseCost=270, Growth=1.52, MaxLevel=40, EffectPerLevel=0.0006,      HardCapValue=0.015 } },
            { AttributeType.Fortune,     new AttributeConfig { Type=AttributeType.Fortune,     Id="luck",       DisplayName="Fortune",      BaseCost=160, Growth=1.42, MaxLevel=50, EffectPerLevel=0.005,       HardCapValue=0.25 } }
        };

        public static readonly EvenLevelPerkConfig[] EvenLevelPerks = new[]
        {
            new EvenLevelPerkConfig { Level=2,  Id="iron_palm",          Name="Iron Palm",          EffectType=PerkEffectType.DamageMult,              PrimaryValue=1.15f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=4,  Id="quickening",         Name="Quickening",         EffectType=PerkEffectType.SpeedMult,               PrimaryValue=0.92f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=6,  Id="thick_skin",         Name="Thick Skin",         EffectType=PerkEffectType.DamageReduction,         PrimaryValue=0.90f,  SecondaryValue=0.15f, TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=8,  Id="greed",              Name="Greed",              EffectType=PerkEffectType.CoinMult,                PrimaryValue=1.15f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=10, Id="vampire_slap",       Name="Vampire Slap",       EffectType=PerkEffectType.HealEveryNSlaps,         PrimaryValue=0.02f,  SecondaryValue=8f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=12, Id="crit_surge",         Name="Crit Surge",         EffectType=PerkEffectType.CritChance,              PrimaryValue=0.06f,  SecondaryValue=0.15f, TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=14, Id="second_wind",        Name="Second Wind",        EffectType=PerkEffectType.ReviveOncePerFight,      PrimaryValue=0.30f,  SecondaryValue=1.5f,  TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=16, Id="boss_bane",          Name="Boss Bane",          EffectType=PerkEffectType.DamageVsBoss,            PrimaryValue=1.20f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=18, Id="golden_aura",        Name="Golden Aura",        EffectType=PerkEffectType.CoinMult,                PrimaryValue=1.20f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=20, Id="counter_cadence",    Name="Counter Cadence",    EffectType=PerkEffectType.CounterSlapDamageMult,   PrimaryValue=1.80f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=22, Id="battle_focus",       Name="Battle Focus",       EffectType=PerkEffectType.StunDurationAtCombo,     PrimaryValue=0.25f,  SecondaryValue=0.90f, TertiaryValue=10f,  CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=24, Id="tough_grit",         Name="Tough Grit",         EffectType=PerkEffectType.LowHpDamageReduction,    PrimaryValue=0.80f,  SecondaryValue=0.15f, TertiaryValue=0.40f,CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=26, Id="iron_resolve",       Name="Iron Resolve",       EffectType=PerkEffectType.DamageReduction,         PrimaryValue=0.10f,  SecondaryValue=20f,   TertiaryValue=0f,   CleanseDebuffOnTrigger=true  },
            new EvenLevelPerkConfig { Level=28, Id="overcharge",         Name="Overcharge",         EffectType=PerkEffectType.DefToCritDmgBonus,       PrimaryValue=0.008f, SecondaryValue=0.32f, TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=30, Id="titan_stature",      Name="Titan Stature",      EffectType=PerkEffectType.DamageVsBoss,            PrimaryValue=1.25f,  SecondaryValue=1.0f,  TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=32, Id="swift_recovery",     Name="Swift Recovery",     EffectType=PerkEffectType.SpeedOnParry,            PrimaryValue=0.75f,  SecondaryValue=3.0f,  TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=34, Id="midas_rhythm",       Name="Midas Rhythm",       EffectType=PerkEffectType.MidasWindowCoinMult,     PrimaryValue=1.60f,  SecondaryValue=1.20f, TertiaryValue=0.60f,CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=36, Id="executioner",        Name="Executioner",        EffectType=PerkEffectType.LowHpEnemyDamageMult,    PrimaryValue=1.35f,  SecondaryValue=0.30f, TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=38, Id="dragonblood_vigour", Name="Dragonblood Vigour", EffectType=PerkEffectType.DamageReduction,         PrimaryValue=1.25f,  SecondaryValue=0.75f, TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=40, Id="godhand_awakening",  Name="Godhand Awakening",  EffectType=PerkEffectType.EveryNSlapDamageAndStun, PrimaryValue=3.00f,  SecondaryValue=1.0f,  TertiaryValue=25f,  CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=42, Id="momentum_surge",     Name="Momentum Surge",     EffectType=PerkEffectType.CritChance,              PrimaryValue=0.05f,  SecondaryValue=10f,   TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=44, Id="asura_slayer",       Name="Asura Slayer",       EffectType=PerkEffectType.WorldDamageAndCritDmg,   PrimaryValue=1.25f,  SecondaryValue=0.10f, TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=46, Id="frenzy_echo",        Name="Frenzy Echo",        EffectType=PerkEffectType.SpecialProc,             PrimaryValue=1.00f,  SecondaryValue=5f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=48, Id="sovereigns_guard",   Name="Sovereign's Guard",  EffectType=PerkEffectType.DamageReduction,         PrimaryValue=0.70f,  SecondaryValue=0f,    TertiaryValue=0f,   CleanseDebuffOnTrigger=false },
            new EvenLevelPerkConfig { Level=50, Id="transcendent_hand",  Name="Transcendent Hand",  EffectType=PerkEffectType.GlobalDamageAndHp,       PrimaryValue=1.30f,  SecondaryValue=1.25f, TertiaryValue=0.90f,CleanseDebuffOnTrigger=false }
        };

        public static readonly SpecialMoveConfig[] SpecialMoves = new[]
        {
            new SpecialMoveConfig { Id=SpecialMoveId.DoubleSlap,    Name="Double Slap",    RequiredBossId=10, PrimaryEffectType=SpecialMoveEffectType.DamageMult, PrimaryBaseValue=7.0f,  PrimaryMaxedValue=15.0f, SecondaryEffectType=SpecialMoveEffectType.None,         SecondaryDurationSec=0.0f, BaseCooldownSec=25.0f, MaxedCooldownSec=15.0f },
            new SpecialMoveConfig { Id=SpecialMoveId.Guard,         Name="Guard",          RequiredBossId=20, PrimaryEffectType=SpecialMoveEffectType.BlockNext,  PrimaryBaseValue=1.0f,  PrimaryMaxedValue=1.0f,  SecondaryEffectType=SpecialMoveEffectType.None,         SecondaryDurationSec=0.0f, BaseCooldownSec=24.0f, MaxedCooldownSec=18.0f },
            new SpecialMoveConfig { Id=SpecialMoveId.UppercutPunch, Name="Uppercut Punch", RequiredBossId=40, PrimaryEffectType=SpecialMoveEffectType.DamageMult, PrimaryBaseValue=18.0f, PrimaryMaxedValue=32.0f, SecondaryEffectType=SpecialMoveEffectType.StunDuration, SecondaryDurationSec=2.5f, BaseCooldownSec=32.0f, MaxedCooldownSec=20.0f }
        };

        public static readonly SlapCoinBandConfig[] SlapCoinBands = new[]
        {
            new SlapCoinBandConfig { MinEnemyId=1,   MaxEnemyId=10,  World=WorldId.MainRoster, BaseSlapFraction=0.070f, MaxNormalMult=2.00f, MaxBossMult=1.50f, FightSlapCapFraction=1.75f, FrontierBonusSlapMult=1.25f, FrontierFightCapFraction=2.00f },
            new SlapCoinBandConfig { MinEnemyId=11,  MaxEnemyId=30,  World=WorldId.MainRoster, BaseSlapFraction=0.055f, MaxNormalMult=1.40f, MaxBossMult=1.15f, FightSlapCapFraction=1.25f, FrontierBonusSlapMult=1.25f, FrontierFightCapFraction=1.75f },
            new SlapCoinBandConfig { MinEnemyId=31,  MaxEnemyId=50,  World=WorldId.MainRoster, BaseSlapFraction=0.055f, MaxNormalMult=1.30f, MaxBossMult=1.10f, FightSlapCapFraction=1.25f, FrontierBonusSlapMult=1.25f, FrontierFightCapFraction=1.75f },
            new SlapCoinBandConfig { MinEnemyId=201, MaxEnemyId=299, World=WorldId.AsuraRealm, BaseSlapFraction=0.100f, MaxNormalMult=1.00f, MaxBossMult=1.00f, FightSlapCapFraction=1.35f, FrontierBonusSlapMult=1.25f, FrontierFightCapFraction=1.75f }
        };

        // ====================================================================
                // ====================================================================
        // 8. MAIN ROSTER ENEMIES #1-#50 (v3.2 — BALANCED 50-STAGE PROGRESSION)
        // ====================================================================
        public static readonly EnemyConfig[] MainRoster = new[]
        {
            new EnemyConfig { Id=1 , Name="Training Dummy      ", GroupIndex=1 , World=WorldId.MainRoster, MaxHp=55        , AttackDamage=6    , AttackInterval=2.30f, Evasion=0.00f, BaseBounty=80      , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=2 , Name="Rubber Duck         ", GroupIndex=1 , World=WorldId.MainRoster, MaxHp=105       , AttackDamage=9    , AttackInterval=2.25f, Evasion=0.00f, BaseBounty=125     , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=3 , Name="Rubber Chicken      ", GroupIndex=1 , World=WorldId.MainRoster, MaxHp=190       , AttackDamage=13   , AttackInterval=2.20f, Evasion=0.00f, BaseBounty=190     , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=4 , Name="Cardboard Knight    ", GroupIndex=1 , World=WorldId.MainRoster, MaxHp=350       , AttackDamage=18   , AttackInterval=2.15f, Evasion=0.00f, BaseBounty=285     , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=5 , Name="Grumpy Teddy        ", GroupIndex=1 , World=WorldId.MainRoster, MaxHp=640       , AttackDamage=22   , AttackInterval=2.05f, Evasion=0.00f, BaseBounty=450     , Tag=EnemyTag.MiniBoss , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=6 , Name="Sassy Goblin Sprout ", GroupIndex=2 , World=WorldId.MainRoster, MaxHp=980       , AttackDamage=24   , AttackInterval=2.15f, Evasion=0.00f, BaseBounty=650     , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=7 , Name="Mime                ", GroupIndex=2 , World=WorldId.MainRoster, MaxHp=1650      , AttackDamage=27   , AttackInterval=2.10f, Evasion=0.00f, BaseBounty=950     , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=8 , Name="Cocky Goose         ", GroupIndex=2 , World=WorldId.MainRoster, MaxHp=2950      , AttackDamage=31   , AttackInterval=2.05f, Evasion=0.00f, BaseBounty=1400    , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=9 , Name="Trash Panda         ", GroupIndex=2 , World=WorldId.MainRoster, MaxHp=5200      , AttackDamage=35   , AttackInterval=2.00f, Evasion=0.00f, BaseBounty=2000    , Tag=EnemyTag.Elite    , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=10, Name="Mischievous Monkey  ", GroupIndex=2 , World=WorldId.MainRoster, MaxHp=11000     , AttackDamage=38   , AttackInterval=1.95f, Evasion=0.00f, BaseBounty=3000    , Tag=EnemyTag.Boss     , MaxHeals=1, IsColossus=false },
            new EnemyConfig { Id=11, Name="Bodybuilder         ", GroupIndex=3 , World=WorldId.MainRoster, MaxHp=17000     , AttackDamage=44   , AttackInterval=2.08f, Evasion=0.00f, BaseBounty=4500    , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=12, Name="Luchador Wrestler   ", GroupIndex=3 , World=WorldId.MainRoster, MaxHp=29000     , AttackDamage=52   , AttackInterval=2.05f, Evasion=0.00f, BaseBounty=6500    , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=13, Name="Kickboxer           ", GroupIndex=3 , World=WorldId.MainRoster, MaxHp=50000     , AttackDamage=64   , AttackInterval=2.02f, Evasion=0.00f, BaseBounty=9200    , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=14, Name="Adult Boxer         ", GroupIndex=3 , World=WorldId.MainRoster, MaxHp=80000     , AttackDamage=74   , AttackInterval=1.98f, Evasion=0.00f, BaseBounty=13000   , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=15, Name="Sumo Champion       ", GroupIndex=3 , World=WorldId.MainRoster, MaxHp=138000    , AttackDamage=86   , AttackInterval=1.95f, Evasion=0.00f, BaseBounty=18000   , Tag=EnemyTag.MiniBoss , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=16, Name="Castle Guard        ", GroupIndex=4 , World=WorldId.MainRoster, MaxHp=210000    , AttackDamage=96   , AttackInterval=1.94f, Evasion=0.00f, BaseBounty=24000   , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=17, Name="Royal Executioner   ", GroupIndex=4 , World=WorldId.MainRoster, MaxHp=310000    , AttackDamage=106  , AttackInterval=1.91f, Evasion=0.00f, BaseBounty=31500   , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=18, Name="Knight              ", GroupIndex=4 , World=WorldId.MainRoster, MaxHp=440000    , AttackDamage=116  , AttackInterval=1.88f, Evasion=0.00f, BaseBounty=41000   , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=19, Name="Barbarian           ", GroupIndex=4 , World=WorldId.MainRoster, MaxHp=620000    , AttackDamage=128  , AttackInterval=1.85f, Evasion=0.00f, BaseBounty=52000   , Tag=EnemyTag.Elite    , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=20, Name="Dark Knight         ", GroupIndex=4 , World=WorldId.MainRoster, MaxHp=1050000   , AttackDamage=140  , AttackInterval=1.80f, Evasion=0.00f, BaseBounty=65000   , Tag=EnemyTag.Boss     , MaxHeals=1, IsColossus=false },
            new EnemyConfig { Id=21, Name="Skeleton Warrior    ", GroupIndex=5 , World=WorldId.MainRoster, MaxHp=960000    , AttackDamage=152  , AttackInterval=1.84f, Evasion=0.05f, BaseBounty=78000   , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=22, Name="Zombie              ", GroupIndex=5 , World=WorldId.MainRoster, MaxHp=1350000   , AttackDamage=170  , AttackInterval=1.82f, Evasion=0.05f, BaseBounty=98000   , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=23, Name="Armored Skeleton    ", GroupIndex=5 , World=WorldId.MainRoster, MaxHp=1900000   , AttackDamage=190  , AttackInterval=1.80f, Evasion=0.05f, BaseBounty=125000  , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=24, Name="Scarab Swarm        ", GroupIndex=5 , World=WorldId.MainRoster, MaxHp=2650000   , AttackDamage=212  , AttackInterval=1.78f, Evasion=0.05f, BaseBounty=160000  , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=25, Name="Mummy Guard         ", GroupIndex=5 , World=WorldId.MainRoster, MaxHp=3800000   , AttackDamage=238  , AttackInterval=1.75f, Evasion=0.06f, BaseBounty=210000  , Tag=EnemyTag.MiniBoss , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=26, Name="Ninja Recruit       ", GroupIndex=6 , World=WorldId.MainRoster, MaxHp=4900000   , AttackDamage=262  , AttackInterval=1.73f, Evasion=0.06f, BaseBounty=270000  , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=27, Name="Shuriken Master     ", GroupIndex=6 , World=WorldId.MainRoster, MaxHp=6300000   , AttackDamage=288  , AttackInterval=1.71f, Evasion=0.06f, BaseBounty=345000  , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=28, Name="Samurai Duelist     ", GroupIndex=6 , World=WorldId.MainRoster, MaxHp=8000000   , AttackDamage=318  , AttackInterval=1.69f, Evasion=0.06f, BaseBounty=435000  , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=29, Name="Shadow Assassin     ", GroupIndex=6 , World=WorldId.MainRoster, MaxHp=10000000  , AttackDamage=350  , AttackInterval=1.66f, Evasion=0.08f, BaseBounty=535000  , Tag=EnemyTag.Elite    , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=30, Name="Shogun Warlord      ", GroupIndex=6 , World=WorldId.MainRoster, MaxHp=13500000  , AttackDamage=390  , AttackInterval=1.62f, Evasion=0.08f, BaseBounty=650000  , Tag=EnemyTag.Boss     , MaxHeals=1, IsColossus=false },
            new EnemyConfig { Id=31, Name="Werewolf            ", GroupIndex=7 , World=WorldId.MainRoster, MaxHp=11500000  , AttackDamage=480  , AttackInterval=1.65f, Evasion=0.10f, BaseBounty=850000  , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=32, Name="Giant Spider        ", GroupIndex=7 , World=WorldId.MainRoster, MaxHp=15000000  , AttackDamage=600  , AttackInterval=1.63f, Evasion=0.10f, BaseBounty=1100000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=33, Name="Orc Warrior         ", GroupIndex=7 , World=WorldId.MainRoster, MaxHp=19500000  , AttackDamage=740  , AttackInterval=1.61f, Evasion=0.10f, BaseBounty=1420000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=34, Name="Bog Witch           ", GroupIndex=7 , World=WorldId.MainRoster, MaxHp=25000000  , AttackDamage=900  , AttackInterval=1.59f, Evasion=0.10f, BaseBounty=1850000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=35, Name="Shadow Beast        ", GroupIndex=7 , World=WorldId.MainRoster, MaxHp=33000000  , AttackDamage=1100 , AttackInterval=1.56f, Evasion=0.10f, BaseBounty=2400000 , Tag=EnemyTag.MiniBoss , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=36, Name="Giant Serpent       ", GroupIndex=8 , World=WorldId.MainRoster, MaxHp=41000000  , AttackDamage=1320 , AttackInterval=1.54f, Evasion=0.10f, BaseBounty=3050000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=37, Name="Anubis Warrior      ", GroupIndex=8 , World=WorldId.MainRoster, MaxHp=48500000  , AttackDamage=1560 , AttackInterval=1.52f, Evasion=0.10f, BaseBounty=3800000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=38, Name="Sphinx Riddler      ", GroupIndex=8 , World=WorldId.MainRoster, MaxHp=56500000  , AttackDamage=1820 , AttackInterval=1.50f, Evasion=0.10f, BaseBounty=4700000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=39, Name="Giant Scorpion      ", GroupIndex=8 , World=WorldId.MainRoster, MaxHp=65000000  , AttackDamage=2080 , AttackInterval=1.48f, Evasion=0.12f, BaseBounty=5700000 , Tag=EnemyTag.Elite    , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=40, Name="Pharaoh Revenant    ", GroupIndex=8 , World=WorldId.MainRoster, MaxHp=78000000  , AttackDamage=2350 , AttackInterval=1.45f, Evasion=0.12f, BaseBounty=6800000 , Tag=EnemyTag.Boss     , MaxHeals=1, IsColossus=false },
            new EnemyConfig { Id=41, Name="Troll               ", GroupIndex=9 , World=WorldId.MainRoster, MaxHp=95000000  , AttackDamage=2650 , AttackInterval=1.46f, Evasion=0.12f, BaseBounty=8500000 , Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=42, Name="Ogre                ", GroupIndex=9 , World=WorldId.MainRoster, MaxHp=140000000 , AttackDamage=3000 , AttackInterval=1.45f, Evasion=0.12f, BaseBounty=10600000, Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=43, Name="Minotaur            ", GroupIndex=9 , World=WorldId.MainRoster, MaxHp=205000000 , AttackDamage=3380 , AttackInterval=1.43f, Evasion=0.12f, BaseBounty=13200000, Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=44, Name="Cyclops             ", GroupIndex=9 , World=WorldId.MainRoster, MaxHp=295000000 , AttackDamage=3780 , AttackInterval=1.42f, Evasion=0.12f, BaseBounty=16400000, Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=45, Name="Stone Golem         ", GroupIndex=9 , World=WorldId.MainRoster, MaxHp=415000000 , AttackDamage=4200 , AttackInterval=1.40f, Evasion=0.12f, BaseBounty=20500000, Tag=EnemyTag.MiniBoss , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=46, Name="Elder Dragon        ", GroupIndex=10, World=WorldId.MainRoster, MaxHp=540000000 , AttackDamage=4550 , AttackInterval=1.40f, Evasion=0.12f, BaseBounty=24500000, Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=47, Name="Dragon Champion     ", GroupIndex=10, World=WorldId.MainRoster, MaxHp=675000000 , AttackDamage=4900 , AttackInterval=1.39f, Evasion=0.12f, BaseBounty=28800000, Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=48, Name="Crystal Dragon      ", GroupIndex=10, World=WorldId.MainRoster, MaxHp=820000000 , AttackDamage=5250 , AttackInterval=1.39f, Evasion=0.12f, BaseBounty=33200000, Tag=EnemyTag.Normal   , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=49, Name="Ancient Dragon      ", GroupIndex=10, World=WorldId.MainRoster, MaxHp=965000000 , AttackDamage=5580 , AttackInterval=1.38f, Evasion=0.14f, BaseBounty=37500000, Tag=EnemyTag.Elite    , MaxHeals=0, IsColossus=false },
            new EnemyConfig { Id=50, Name="Dragon Lord         ", GroupIndex=10, World=WorldId.MainRoster, MaxHp=1150000000, AttackDamage=5900 , AttackInterval=1.38f, Evasion=0.15f, BaseBounty=42000000, Tag=EnemyTag.FinalBoss, MaxHeals=1, IsColossus=false },
        };

        // ====================================================================
        // 9. WORLDS GUARDIANS (v3.2 — Asura Realm & Shadow Verse)
        // ====================================================================
        public static readonly EnemyConfig[] WorldGuardians = new[]
        {
            new EnemyConfig { Id=201, Name="Asura Footman",        GroupIndex=1, World=WorldId.AsuraRealm,  MaxHp=1600000000  , AttackDamage=6500 , AttackInterval=1.38f, Evasion=0.15f, BaseBounty=60000000  , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=202, Name="Rakshasa Huntress",    GroupIndex=1, World=WorldId.AsuraRealm,  MaxHp=2900000000  , AttackDamage=7400 , AttackInterval=1.36f, Evasion=0.15f, BaseBounty=80000000  , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=203, Name="Kumbhakaran",          GroupIndex=1, World=WorldId.AsuraRealm,  MaxHp=5400000000  , AttackDamage=8400 , AttackInterval=1.35f, Evasion=0.15f, BaseBounty=105000000 , Tag=EnemyTag.MiniBoss,  MaxHeals=1, IsColossus=true },
            new EnemyConfig { Id=204, Name="Mahishasura",          GroupIndex=1, World=WorldId.AsuraRealm,  MaxHp=8800000000  , AttackDamage=9400 , AttackInterval=1.34f, Evasion=0.16f, BaseBounty=135000000 , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=205, Name="Vetala Warlock",       GroupIndex=1, World=WorldId.AsuraRealm,  MaxHp=13800000000 , AttackDamage=10400, AttackInterval=1.32f, Evasion=0.16f, BaseBounty=170000000 , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=206, Name="Ravana",               GroupIndex=1, World=WorldId.AsuraRealm,  MaxHp=22000000000 , AttackDamage=11500, AttackInterval=1.30f, Evasion=0.16f, BaseBounty=215000000 , Tag=EnemyTag.WorldBoss, MaxHeals=1, IsColossus=true },

            new EnemyConfig { Id=211, Name="Shade of the Dummy",   GroupIndex=2, World=WorldId.ShadowVerse, MaxHp=25000000000 , AttackDamage=13200, AttackInterval=1.30f, Evasion=0.16f, BaseBounty=300000000 , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=212, Name="Umbral Mime",          GroupIndex=2, World=WorldId.ShadowVerse, MaxHp=42000000000 , AttackDamage=15200, AttackInterval=1.28f, Evasion=0.16f, BaseBounty=420000000 , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=213, Name="Umbral Puppeteer",     GroupIndex=2, World=WorldId.ShadowVerse, MaxHp=70000000000 , AttackDamage=17400, AttackInterval=1.26f, Evasion=0.17f, BaseBounty=575000000 , Tag=EnemyTag.MiniBoss,  MaxHeals=1, IsColossus=true },
            new EnemyConfig { Id=214, Name="Gloom Serpent",        GroupIndex=2, World=WorldId.ShadowVerse, MaxHp=112000000000, AttackDamage=19600, AttackInterval=1.25f, Evasion=0.17f, BaseBounty=780000000 , Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=215, Name="The Hollow Monk",      GroupIndex=2, World=WorldId.ShadowVerse, MaxHp=165000000000, AttackDamage=22000, AttackInterval=1.24f, Evasion=0.18f, BaseBounty=1050000000, Tag=EnemyTag.Normal,    MaxHeals=0, IsColossus=true },
            new EnemyConfig { Id=216, Name="The Dark Slapper",     GroupIndex=2, World=WorldId.ShadowVerse, MaxHp=240000000000, AttackDamage=24500, AttackInterval=1.22f, Evasion=0.18f, BaseBounty=1380000000, Tag=EnemyTag.WorldBoss, MaxHeals=1, IsColossus=true }
        };

        // ====================================================================
        // 10. ALL 30 SKILLS (v3.2 RE-BALANCED COSTS & ZERO FLAT HP)
        // ====================================================================
        public static readonly SkillConfig[] Skills = new[]
        {
            new SkillConfig { Id="basic_slap", Name="Basic Slap", Tier=1, CoinCost=0, PrerequisiteSkillId="", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.DamageMult, ValuePrimary=1.00f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="stamina_training", Name="Stamina Training", Tier=1, CoinCost=250, PrerequisiteSkillId="basic_slap", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.HpMult, ValuePrimary=0.20f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="stronger_hands", Name="Stronger Hands", Tier=1, CoinCost=500, PrerequisiteSkillId="basic_slap", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.DamageMult, ValuePrimary=0.20f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="second_hand", Name="Second Hand", Tier=1, CoinCost=900, PrerequisiteSkillId="basic_slap", RequiredBossId=5, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.SpeedMult, ValuePrimary=0.85f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="twin_mastery", Name="Twin Mastery", Tier=2, CoinCost=2500, PrerequisiteSkillId="second_hand", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.SpeedMult, ValuePrimary=0.90f, SecondaryEffectType=SkillEffectType.ComboChargeBonus, ValueSecondary=0.100f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="on_target", Name="On Target", Tier=2, CoinCost=5000, PrerequisiteSkillId="twin_mastery", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.ComboPersistOnSwitch, ValuePrimary=1.00f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="deflect", Name="Deflect", Tier=2, CoinCost=6500, PrerequisiteSkillId="basic_slap", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.ParryUnlock, ValuePrimary=1.00f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="quick_reflexes", Name="Quick Reflexes", Tier=2, CoinCost=12000, PrerequisiteSkillId="twin_mastery", RequiredBossId=10, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.SpeedMult, ValuePrimary=0.90f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="critical_slaps", Name="Critical Slaps", Tier=2, CoinCost=22000, PrerequisiteSkillId="stronger_hands", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.CritChance, ValuePrimary=0.05f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="seismic_slam", Name="Seismic Slam", Tier=2, CoinCost=35000, PrerequisiteSkillId="stamina_training", RequiredBossId=10, Trigger=SkillActivationTrigger.ProcEveryNSlaps, PrimaryEffectType=SkillEffectType.ProcHitDamageMult, ValuePrimary=3.00f, SecondaryEffectType=SkillEffectType.Passive, ValueSecondary=0.800f, ProcChance=1.00f, ProcIntervalSlaps=5, StateHpThreshold=0.00f },
            new SkillConfig { Id="heavy_slap", Name="Heavy Slap", Tier=2, CoinCost=55000, PrerequisiteSkillId="stronger_hands", RequiredBossId=10, Trigger=SkillActivationTrigger.ProcOnHit, PrimaryEffectType=SkillEffectType.ProcHitDamageMult, ValuePrimary=2.50f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=0.12f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="precision_instinct", Name="Precision Instinct", Tier=2, CoinCost=80000, PrerequisiteSkillId="stronger_hands", RequiredBossId=10, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.CritDmg, ValuePrimary=0.25f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="combo_mastery", Name="Combo Mastery", Tier=3, CoinCost=220000, PrerequisiteSkillId="on_target", RequiredBossId=10, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.ComboCapBonus, ValuePrimary=5.00f, SecondaryEffectType=SkillEffectType.ComboStackDamageBonus, ValueSecondary=0.005f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="dizzy_punisher", Name="Opportunist", Tier=3, CoinCost=450000, PrerequisiteSkillId="quick_reflexes", RequiredBossId=0, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.SpecialProc, ValuePrimary=1.35f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="clutch_surge", Name="Adrenaline Rush", Tier=3, CoinCost=850000, PrerequisiteSkillId="seismic_slam", RequiredBossId=0, Trigger=SkillActivationTrigger.OnLowHpState, PrimaryEffectType=SkillEffectType.SpeedMult, ValuePrimary=0.83f, SecondaryEffectType=SkillEffectType.DamageMult, ValueSecondary=1.250f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.30f },
            new SkillConfig { Id="coin_magnet", Name="Coin Magnet", Tier=3, CoinCost=1600000, PrerequisiteSkillId="critical_slaps", RequiredBossId=20, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.CoinMult, ValuePrimary=0.20f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="boss_hunter", Name="Boss Hunter", Tier=3, CoinCost=3000000, PrerequisiteSkillId="heavy_slap", RequiredBossId=20, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.BossDamage, ValuePrimary=0.25f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="echo_strike", Name="Acoustic Echo", Tier=4, CoinCost=8000000, PrerequisiteSkillId="combo_mastery", RequiredBossId=30, Trigger=SkillActivationTrigger.ProcOnHit, PrimaryEffectType=SkillEffectType.SpecialProc, ValuePrimary=0.35f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=0.20f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="dual_hand", Name="Dual-Hand Technique", Tier=4, CoinCost=12000000, PrerequisiteSkillId="dizzy_punisher", RequiredBossId=20, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.SpeedMult, ValuePrimary=0.85f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="unstoppable", Name="Unstoppable Hands", Tier=4, CoinCost=18000000, PrerequisiteSkillId="clutch_surge", RequiredBossId=30, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.HpMult, ValuePrimary=0.30f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="kinetic_shield", Name="Kinetic Barrier", Tier=4, CoinCost=28000000, PrerequisiteSkillId="clutch_surge", RequiredBossId=30, Trigger=SkillActivationTrigger.ProcEveryNSlaps, PrimaryEffectType=SkillEffectType.ShieldEveryNSlaps, ValuePrimary=0.10f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=10, StateHpThreshold=0.00f },
            new SkillConfig { Id="iron_stance_1", Name="Iron Stance I", Tier=4, CoinCost=32000000, PrerequisiteSkillId="deflect", RequiredBossId=30, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.WeakSpotWindowBonus, ValuePrimary=0.10f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="golden_touch", Name="Treasure Hunter", Tier=4, CoinCost=40000000, PrerequisiteSkillId="coin_magnet", RequiredBossId=30, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.CoinMult, ValuePrimary=0.25f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="frenzy", Name="Frenzy", Tier=4, CoinCost=55000000, PrerequisiteSkillId="boss_hunter", RequiredBossId=30, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.FrenzyChargeBonus, ValuePrimary=0.35f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="titan_slayer", Name="Colossus Bane", Tier=4, CoinCost=95000000, PrerequisiteSkillId="boss_hunter", RequiredBossId=35, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.ColossusDamage, ValuePrimary=0.35f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="rapid_barrage", Name="Rapid Barrage", Tier=5, CoinCost=180000000, PrerequisiteSkillId="dual_hand", RequiredBossId=40, Trigger=SkillActivationTrigger.ProcEveryNSlaps, PrimaryEffectType=SkillEffectType.SpecialProc, ValuePrimary=1.20f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=6, StateHpThreshold=0.00f },
            new SkillConfig { Id="iron_stance_2", Name="Iron Stance II", Tier=5, CoinCost=220000000, PrerequisiteSkillId="iron_stance_1", RequiredBossId=40, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.WeakSpotWindowBonus, ValuePrimary=0.10f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="aegis_bulwark", Name="Bulwark Guard", Tier=5, CoinCost=280000000, PrerequisiteSkillId="kinetic_shield", RequiredBossId=40, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.ShieldReflectPct, ValuePrimary=0.25f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
            new SkillConfig { Id="ultimate_slap", Name="Godhand Strike", Tier=5, CoinCost=450000000, PrerequisiteSkillId="titan_slayer", RequiredBossId=45, Trigger=SkillActivationTrigger.ProcEveryNSlaps, PrimaryEffectType=SkillEffectType.ProcHitDamageMult, ValuePrimary=8.00f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=20, StateHpThreshold=0.00f },
            new SkillConfig { Id="iron_stance_3", Name="Iron Stance III", Tier=5, CoinCost=1200000000, PrerequisiteSkillId="iron_stance_2", RequiredBossId=50, Trigger=SkillActivationTrigger.AlwaysOn, PrimaryEffectType=SkillEffectType.BossSigParryMitigation, ValuePrimary=0.50f, SecondaryEffectType=SkillEffectType.None, ValueSecondary=0.000f, ProcChance=1.00f, ProcIntervalSlaps=0, StateHpThreshold=0.00f },
        };

        public static readonly HandSkinConfig[] HandSkins = new[]
        {
            new HandSkinConfig { Id=SkinId.Classic,          Name="Classic",           GemPrice=0,    BundleInrPrice=0,    PassiveDamageMult=1.00f, PassiveSpeedBonus=0.00f, PassiveCritChanceBonus=0.00f, PassiveCritDamageBonus=0.00f, PassiveCoinBonus=0.00f, PassiveMaxHpBonus=0.00f, ActiveProcMultiplier=1.0f, ActiveDuration=0.0f, ActiveSpeedBonus=0.00f, ActiveBuffDamageBonus=0.00f, ActiveHealPct=0.00f, ActiveEnemySlowPct=0.00f, ActiveEnemyDazeSec=0.0f, ActiveShieldShatterPct=0.00f, ActiveGuaranteedCrit=false, ActiveEnemyTimeStop=false, PostActiveCooldown=0.0f  },
            new HandSkinConfig { Id=SkinId.SpiderMan,        Name="Spider-Man",        GemPrice=300,  BundleInrPrice=149,  PassiveDamageMult=1.00f, PassiveSpeedBonus=0.10f, PassiveCritChanceBonus=0.00f, PassiveCritDamageBonus=0.00f, PassiveCoinBonus=0.00f, PassiveMaxHpBonus=0.00f, ActiveProcMultiplier=1.5f, ActiveDuration=2.5f, ActiveSpeedBonus=0.00f, ActiveBuffDamageBonus=0.00f, ActiveHealPct=0.00f, ActiveEnemySlowPct=0.25f, ActiveEnemyDazeSec=0.0f, ActiveShieldShatterPct=0.00f, ActiveGuaranteedCrit=false, ActiveEnemyTimeStop=false, PostActiveCooldown=0.0f  },
            new HandSkinConfig { Id=SkinId.Wolverine,        Name="Wolverine",         GemPrice=1000, BundleInrPrice=249,  PassiveDamageMult=1.00f, PassiveSpeedBonus=0.00f, PassiveCritChanceBonus=0.08f, PassiveCritDamageBonus=0.15f, PassiveCoinBonus=0.00f, PassiveMaxHpBonus=0.00f, ActiveProcMultiplier=2.2f, ActiveDuration=0.0f, ActiveSpeedBonus=0.00f, ActiveBuffDamageBonus=0.00f, ActiveHealPct=0.02f, ActiveEnemySlowPct=0.00f, ActiveEnemyDazeSec=0.0f, ActiveShieldShatterPct=0.00f, ActiveGuaranteedCrit=true,  ActiveEnemyTimeStop=false, PostActiveCooldown=0.0f  },
            new HandSkinConfig { Id=SkinId.Thor,             Name="Thor",              GemPrice=2000, BundleInrPrice=399,  PassiveDamageMult=1.15f, PassiveSpeedBonus=0.00f, PassiveCritChanceBonus=0.00f, PassiveCritDamageBonus=0.00f, PassiveCoinBonus=0.15f, PassiveMaxHpBonus=0.00f, ActiveProcMultiplier=3.0f, ActiveDuration=0.6f, ActiveSpeedBonus=0.00f, ActiveBuffDamageBonus=0.00f, ActiveHealPct=0.00f, ActiveEnemySlowPct=0.00f, ActiveEnemyDazeSec=0.6f, ActiveShieldShatterPct=0.00f, ActiveGuaranteedCrit=false, ActiveEnemyTimeStop=false, PostActiveCooldown=0.0f  },
            new HandSkinConfig { Id=SkinId.Hulk,             Name="Hulk",              GemPrice=3500, BundleInrPrice=799,  PassiveDamageMult=1.25f, PassiveSpeedBonus=0.00f, PassiveCritChanceBonus=0.00f, PassiveCritDamageBonus=0.00f, PassiveCoinBonus=0.00f, PassiveMaxHpBonus=0.15f, ActiveProcMultiplier=4.0f, ActiveDuration=3.0f, ActiveSpeedBonus=0.00f, ActiveBuffDamageBonus=0.20f, ActiveHealPct=0.00f, ActiveEnemySlowPct=0.00f, ActiveEnemyDazeSec=0.0f, ActiveShieldShatterPct=0.50f, ActiveGuaranteedCrit=false, ActiveEnemyTimeStop=false, PostActiveCooldown=0.0f  },
            new HandSkinConfig { Id=SkinId.InfinityGauntlet, Name="Infinity Gauntlet", GemPrice=9000, BundleInrPrice=2499, PassiveDamageMult=1.35f, PassiveSpeedBonus=0.00f, PassiveCritChanceBonus=0.00f, PassiveCritDamageBonus=0.00f, PassiveCoinBonus=0.20f, PassiveMaxHpBonus=0.00f, ActiveProcMultiplier=1.0f, ActiveDuration=5.0f, ActiveSpeedBonus=0.50f, ActiveBuffDamageBonus=0.30f, ActiveHealPct=0.00f, ActiveEnemySlowPct=0.00f, ActiveEnemyDazeSec=0.0f, ActiveShieldShatterPct=0.00f, ActiveGuaranteedCrit=false, ActiveEnemyTimeStop=true,  PostActiveCooldown=16.0f }
        };

        public static readonly BlitzTierConfig[] BlitzTiers = new[]
        {
            new BlitzTierConfig { Tier=1,  Name="BRONZE I",    ScoreMultiplierOfBaseDps=1.65f,  BountyPayoutMultiplier=0.40f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=0 },
            new BlitzTierConfig { Tier=2,  Name="BRONZE II",   ScoreMultiplierOfBaseDps=3.30f,  BountyPayoutMultiplier=0.60f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=0 },
            new BlitzTierConfig { Tier=3,  Name="BRONZE III",  ScoreMultiplierOfBaseDps=4.95f,  BountyPayoutMultiplier=0.80f, BonusSecondsAdded=1.5f, FirstReachGems=2, RepeatGems=0 },
            new BlitzTierConfig { Tier=4,  Name="BRONZE IV",   ScoreMultiplierOfBaseDps=6.60f,  BountyPayoutMultiplier=1.00f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=0 },
            new BlitzTierConfig { Tier=5,  Name="SILVER I",    ScoreMultiplierOfBaseDps=8.25f,  BountyPayoutMultiplier=1.20f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=0 },
            new BlitzTierConfig { Tier=6,  Name="SILVER II",   ScoreMultiplierOfBaseDps=9.90f,  BountyPayoutMultiplier=1.40f, BonusSecondsAdded=1.5f, FirstReachGems=2, RepeatGems=0 },
            new BlitzTierConfig { Tier=7,  Name="SILVER III",  ScoreMultiplierOfBaseDps=11.55f, BountyPayoutMultiplier=1.60f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=0 },
            new BlitzTierConfig { Tier=8,  Name="SILVER IV",   ScoreMultiplierOfBaseDps=13.20f, BountyPayoutMultiplier=1.80f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=0 },
            new BlitzTierConfig { Tier=9,  Name="GOLD I",      ScoreMultiplierOfBaseDps=14.85f, BountyPayoutMultiplier=2.00f, BonusSecondsAdded=1.5f, FirstReachGems=2, RepeatGems=0 },
            new BlitzTierConfig { Tier=10, Name="GOLD II",     ScoreMultiplierOfBaseDps=16.50f, BountyPayoutMultiplier=2.25f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=11, Name="GOLD III",    ScoreMultiplierOfBaseDps=18.15f, BountyPayoutMultiplier=2.50f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=12, Name="GOLD IV",     ScoreMultiplierOfBaseDps=19.80f, BountyPayoutMultiplier=2.75f, BonusSecondsAdded=1.5f, FirstReachGems=2, RepeatGems=1 },
            new BlitzTierConfig { Tier=13, Name="PLATINUM I",  ScoreMultiplierOfBaseDps=21.45f, BountyPayoutMultiplier=3.00f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=14, Name="PLATINUM II", ScoreMultiplierOfBaseDps=23.10f, BountyPayoutMultiplier=3.25f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=15, Name="DIAMOND I",   ScoreMultiplierOfBaseDps=24.75f, BountyPayoutMultiplier=3.50f, BonusSecondsAdded=1.5f, FirstReachGems=2, RepeatGems=1 },
            new BlitzTierConfig { Tier=16, Name="DIAMOND II",  ScoreMultiplierOfBaseDps=26.40f, BountyPayoutMultiplier=3.70f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=17, Name="MASTER I",    ScoreMultiplierOfBaseDps=28.05f, BountyPayoutMultiplier=3.90f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=18, Name="MASTER II",   ScoreMultiplierOfBaseDps=29.70f, BountyPayoutMultiplier=4.10f, BonusSecondsAdded=1.5f, FirstReachGems=2, RepeatGems=1 },
            new BlitzTierConfig { Tier=19, Name="GRANDMASTER", ScoreMultiplierOfBaseDps=31.35f, BountyPayoutMultiplier=4.30f, BonusSecondsAdded=0.0f, FirstReachGems=0, RepeatGems=1 },
            new BlitzTierConfig { Tier=20, Name="LEGEND",      ScoreMultiplierOfBaseDps=33.00f, BountyPayoutMultiplier=4.50f, BonusSecondsAdded=0.0f, FirstReachGems=2, RepeatGems=1 }
        };

        public static readonly CornermanCardConfig[] CornermanCards = new[]
        {
            new CornermanCardConfig { Id=CornermanCardId.CutmansIcePack,  Name="Cutman's Ice Pack",  PrimaryValue=0.35f, SecondaryValue=0.50f, DurationSec=0.0f },
            new CornermanCardConfig { Id=CornermanCardId.CornermansTowel, Name="Cornerman's Towel",  PrimaryValue=0.25f, SecondaryValue=0.00f, DurationSec=0.0f },
            new CornermanCardConfig { Id=CornermanCardId.LoadedWraps,     Name="Loaded Wraps",       PrimaryValue=1.75f, SecondaryValue=8.00f, DurationSec=0.0f },
            new CornermanCardConfig { Id=CornermanCardId.SmellingSalts,   Name="Smelling Salts",     PrimaryValue=1.00f, SecondaryValue=0.40f, DurationSec=0.0f },
            new CornermanCardConfig { Id=CornermanCardId.CoachsSpotter,   Name="Coach's Spotter",    PrimaryValue=1.50f, SecondaryValue=0.30f, DurationSec=0.5f },
            new CornermanCardConfig { Id=CornermanCardId.SavedByTheBell,  Name="Saved by the Bell",  PrimaryValue=1.50f, SecondaryValue=0.15f, DurationSec=1.5f },
            new CornermanCardConfig { Id=CornermanCardId.SecondWindTonic, Name="Second Wind Tonic",  PrimaryValue=0.25f, SecondaryValue=0.25f, DurationSec=5.0f },
            new CornermanCardConfig { Id=CornermanCardId.HighRollerPurse, Name="High-Roller Purse",  PrimaryValue=0.20f, SecondaryValue=0.50f, DurationSec=0.0f }
        };

        public static readonly AnomalyConfig[] StreetBrawlAnomalies = new[]
        {
            new AnomalyConfig { Type=StreetBrawlAnomaly.Pinata,      Name="Pinata",       TriggerChance=0.0625f, EnemyHpMult=0.60f, PlayerDamageDealtMult=1.00f, EnemyDamageMult=0.50f, EnemyIntervalMult=1.00f, SlapCoinMult=3.00f, BountyRewardMult=1.35f, BonusGems=0, TimerSec=15.0f },
            new AnomalyConfig { Type=StreetBrawlAnomaly.SuddenDeath, Name="Sudden Death", TriggerChance=0.0625f, EnemyHpMult=1.00f, PlayerDamageDealtMult=2.20f, EnemyDamageMult=2.20f, EnemyIntervalMult=1.00f, SlapCoinMult=1.00f, BountyRewardMult=1.40f, BonusGems=0, TimerSec=0.0f  },
            new AnomalyConfig { Type=StreetBrawlAnomaly.SlapStorm,   Name="Slap Storm",   TriggerChance=0.0625f, EnemyHpMult=1.00f, PlayerDamageDealtMult=0.50f, EnemyDamageMult=1.00f, EnemyIntervalMult=1.00f, SlapCoinMult=1.00f, BountyRewardMult=1.00f, BonusGems=0, TimerSec=1.5f  },
            new AnomalyConfig { Type=StreetBrawlAnomaly.Berserker,   Name="Berserker",    TriggerChance=0.0625f, EnemyHpMult=1.00f, PlayerDamageDealtMult=1.00f, EnemyDamageMult=1.00f, EnemyIntervalMult=0.70f, SlapCoinMult=1.00f, BountyRewardMult=1.35f, BonusGems=1, TimerSec=0.0f  }
        };

        public static readonly float[] BossRushHpFractionOfMaxBoss  = { 0.30f, 0.45f, 0.60f, 0.75f, 1.00f };
        public static readonly float[] BossRushDmgFractionOfMaxBoss = { 0.50f, 0.65f, 0.78f, 0.90f, 1.00f };

        public static readonly EmberArtConfig[] EmberArts = new[]
        {
            new EmberArtConfig { Id="echo_palm",       Name="Echo Palm",        EmberCost=20, PrimaryEffectType=SkillEffectType.ProcHitDamageMult,   PrimaryValue=0.60f,   SecondaryEffectType=SkillEffectType.None,              SecondaryValue=0.0f,  ProcIntervalSlaps=8 },
            new EmberArtConfig { Id="frenzy_heart",    Name="Frenzy Heart",     EmberCost=15, PrimaryEffectType=SkillEffectType.FrenzyChargeBonus,   PrimaryValue=0.30f,   SecondaryEffectType=SkillEffectType.None,              SecondaryValue=0.0f,  ProcIntervalSlaps=0 },
            new EmberArtConfig { Id="phoenix_heart",   Name="Phoenix Heart",    EmberCost=35, PrimaryEffectType=SkillEffectType.PhoenixRevive,       PrimaryValue=0.25f,   SecondaryEffectType=SkillEffectType.Passive,           SecondaryValue=1.5f,  ProcIntervalSlaps=0 },
            new EmberArtConfig { Id="battle_trance",   Name="Battle Trance",    EmberCost=25, PrimaryEffectType=SkillEffectType.SpeedMult,           PrimaryValue=0.8929f, SecondaryEffectType=SkillEffectType.CritDmg,           SecondaryValue=0.25f, ProcIntervalSlaps=0 },
            new EmberArtConfig { Id="giants_grip",     Name="Giant's Grip",     EmberCost=15, PrimaryEffectType=SkillEffectType.WeakSpotCapBonus,    PrimaryValue=1.0f,    SecondaryEffectType=SkillEffectType.None,              SecondaryValue=0.0f,  ProcIntervalSlaps=0 },
            new EmberArtConfig { Id="eagle_eye",       Name="Eagle Eye",        EmberCost=12, PrimaryEffectType=SkillEffectType.WeakSpotWindowBonus, PrimaryValue=0.5f,    SecondaryEffectType=SkillEffectType.None,              SecondaryValue=0.0f,  ProcIntervalSlaps=0 },
            new EmberArtConfig { Id="greed_mantra",    Name="Greed Mantra",     EmberCost=18, PrimaryEffectType=SkillEffectType.CoinMult,            PrimaryValue=0.25f,   SecondaryEffectType=SkillEffectType.None,              SecondaryValue=0.0f,  ProcIntervalSlaps=0 },
            new EmberArtConfig { Id="sovereigns_bane", Name="Sovereign's Bane", EmberCost=25, PrimaryEffectType=SkillEffectType.BossDamage,          PrimaryValue=0.15f,   SecondaryEffectType=SkillEffectType.None,              SecondaryValue=0.0f,  ProcIntervalSlaps=0 }
        };

        public static readonly RelicConfig[] GuardianRelics = new[]
        {
            new RelicConfig { Id="bronze_war_bell",    Name="Bronze War Bell",           GuardianBossId=201, EffectType=RelicEffectType.WorldCoinBonus,           Star1Value=0.10f, Star2Value=0.20f, Star3Value=0.30f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="rakshasa_fang",      Name="Rakshasa Fang",             GuardianBossId=202, EffectType=RelicEffectType.CritBonus,                Star1Value=0.08f, Star2Value=0.16f, Star3Value=0.24f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="slumber_bell",       Name="Slumber Bell",              GuardianBossId=203, EffectType=RelicEffectType.EnemyAttackSlow,          Star1Value=0.04f, Star2Value=0.08f, Star3Value=0.12f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="horn_of_stampede",   Name="Horn of the Stampede",      GuardianBossId=204, EffectType=RelicEffectType.WorldDamageMult,          Star1Value=0.10f, Star2Value=0.20f, Star3Value=0.30f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="skull_of_whispers",  Name="Skull of Whispers",         GuardianBossId=205, EffectType=RelicEffectType.WeakspotSpawnSpeed,       Star1Value=0.10f, Star2Value=0.20f, Star3Value=0.30f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="crown_of_ten_kings", Name="Crown of Ten Kings",        GuardianBossId=206, EffectType=RelicEffectType.WorldFinalBossDamageMult, Star1Value=0.15f, Star2Value=0.25f, Star3Value=0.40f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="splinter_first_foe", Name="Splinter of the First Foe", GuardianBossId=211, EffectType=RelicEffectType.NonBossDamageMult,        Star1Value=0.08f, Star2Value=0.16f, Star3Value=0.24f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="silent_glove",       Name="Silent Glove",              GuardianBossId=212, EffectType=RelicEffectType.SpeedBonus,               Star1Value=0.04f, Star2Value=0.07f, Star3Value=0.10f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="puppet_strings",     Name="Puppet Strings",            GuardianBossId=213, EffectType=RelicEffectType.EnemySpecialSlow,         Star1Value=0.15f, Star2Value=0.30f, Star3Value=0.45f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="venomfang_coil",     Name="Venomfang Coil",            GuardianBossId=214, EffectType=RelicEffectType.StunnedDamageMult,        Star1Value=0.10f, Star2Value=0.20f, Star3Value=0.30f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="beads_of_void",      Name="Beads of the Void",         GuardianBossId=215, EffectType=RelicEffectType.EmberBonus,               Star1Value=0.20f, Star2Value=0.40f, Star3Value=0.60f, Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 },
            new RelicConfig { Id="mirror_palm",        Name="Mirror Palm",               GuardianBossId=216, EffectType=RelicEffectType.SetSkinSlapTriggerTo,     Star1Value=10.0f, Star2Value=9.0f,  Star3Value=8.0f,  Star2ClearsRequired=3, Star2EmberCost=10, Star3ClearsRequired=8, Star3EmberCost=25 }
        };

        public static readonly CoinPackConfig[] CoinPacks = new[]
        {
            new CoinPackConfig { Id="pocket_of_coins", Name="Pocket of Coins", GemCost=50,   BaseCoinFloor=50000,    FrontierBountyMult=3.0f   },
            new CoinPackConfig { Id="bag_of_gold",     Name="Bag of Gold",     GemCost=140,  BaseCoinFloor=250000,   FrontierBountyMult=8.0f   },
            new CoinPackConfig { Id="chest_of_gold",   Name="Chest of Gold",   GemCost=350,  BaseCoinFloor=1500000,  FrontierBountyMult=20.0f  },
            new CoinPackConfig { Id="royal_treasury",  Name="Royal Treasury",  GemCost=800,  BaseCoinFloor=8000000,  FrontierBountyMult=45.0f  },
            new CoinPackConfig { Id="dragons_hoard",   Name="Dragon's Hoard",  GemCost=1800, BaseCoinFloor=35000000, FrontierBountyMult=100.0f }
        };

        public static readonly RealMoneyBundleConfig[] RealMoneyBundles = new[]
        {
            new RealMoneyBundleConfig { Id="bundle_starter",  Name="Starter Bundle",         InrPrice=149,  BaseCoinFloor=25000,    FrontierBountyMult=10.0f,  GemsIncluded=200,  SkinIncluded=SkinId.SpiderMan        },
            new RealMoneyBundleConfig { Id="bundle_weapon_x", Name="Weapon X Bundle",        InrPrice=249,  BaseCoinFloor=80000,    FrontierBountyMult=25.0f,  GemsIncluded=400,  SkinIncluded=SkinId.Wolverine        },
            new RealMoneyBundleConfig { Id="bundle_thunder",  Name="Thunder Bundle",         InrPrice=399,  BaseCoinFloor=250000,   FrontierBountyMult=60.0f,  GemsIncluded=800,  SkinIncluded=SkinId.Thor             },
            new RealMoneyBundleConfig { Id="bundle_hero",     Name="Hero Bundle",            InrPrice=799,  BaseCoinFloor=1000000,  FrontierBountyMult=150.0f, GemsIncluded=1600, SkinIncluded=SkinId.Hulk             },
            new RealMoneyBundleConfig { Id="bundle_cosmic",   Name="Cosmic Infinity Bundle", InrPrice=2499, BaseCoinFloor=10000000, FrontierBountyMult=400.0f, GemsIncluded=3000, SkinIncluded=SkinId.InfinityGauntlet }
        };
    }
}