import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import {
  loadSave, persistSave, createInitialSave,
  computePlayerStats, attrCost, attrCap, levelUpCost,
  getEnemyCoinReward, generateQuests, todayKey,
  ACHIEVEMENTS, calcOfflineEarnings, exportSave, importSave,
} from '../game/engine.js';
import { CONFIG, ALL_ENEMIES } from '../game/config.js';

const GameCtx = createContext(null);

// ── reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  const s = state.save;
  switch (action.type) {

    case 'SET_SCREEN': return { ...state, screen: action.screen };

    case 'SPEND_COINS': {
      if (s.coins < action.amount) return state;
      return { ...state, save: { ...s, coins: s.coins - action.amount } };
    }
    case 'ADD_COINS': {
      const newCoins = s.coins + action.amount;
      const totalCoins = s.stats.totalCoins + action.amount;
      return { ...state, save: { ...s, coins: newCoins, stats: { ...s.stats, totalCoins } } };
    }
    case 'ADD_GEMS': {
      return { ...state, save: { ...s, gems: s.gems + action.amount } };
    }
    case 'SPEND_GEMS': {
      if (s.gems < action.amount) return state;
      return { ...state, save: { ...s, gems: s.gems - action.amount } };
    }

    case 'UPGRADE_ATTR': {
      const { key } = action;
      const cap = attrCap(s.playerLevel);
      const cur = s.attrs[key];
      if (cur >= cap) return state;
      const cost = attrCost(key, cur);
      if (s.coins < cost) return state;
      return {
        ...state,
        save: {
          ...s,
          coins: s.coins - cost,
          attrs: { ...s.attrs, [key]: cur + 1 },
        },
      };
    }

    case 'LEVEL_UP': {
      const cost = levelUpCost(s.playerLevel);
      if (s.coins < cost) return state;
      return {
        ...state,
        save: { ...s, coins: s.coins - cost, playerLevel: s.playerLevel + 1 },
        levelUpPending: s.playerLevel + 1,
      };
    }
    case 'CLEAR_LEVEL_UP_PENDING': return { ...state, levelUpPending: null };

    case 'BUY_SKILL': {
      const sk = CONFIG.skills.find(s2 => s2.id === action.id);
      if (!sk || s.skills[action.id]) return state;
      if (sk.cost > 0 && s.coins < sk.cost) return state;
      if (sk.prereq && !s.skills[sk.prereq]) return state;
      return {
        ...state,
        save: {
          ...s,
          coins: s.coins - sk.cost,
          skills: { ...s.skills, [action.id]: true },
        },
      };
    }

    case 'DEFEAT_ENEMY': {
      const { id, hard, gems, coins } = action;
      const def = hard ? s.hardDefeatedEnemies : s.defeatedEnemies;
      const defKey = hard ? 'hardDefeatedEnemies' : 'defeatedEnemies';
      // Advance currentEnemyId if needed
      const nextId = !hard ? Math.max(s.currentEnemyId, id + 1) : s.currentEnemyId;
      const newStats = {
        ...s.stats,
        totalKOs: s.stats.totalKOs + 1,
        totalCoins: s.stats.totalCoins + coins,
      };
      return {
        ...state,
        save: {
          ...s,
          coins: s.coins + coins,
          gems: s.gems + (gems || 0),
          [defKey]: { ...def, [id]: true },
          currentEnemyId: nextId,
          stats: newStats,
        },
      };
    }

    case 'UPDATE_STATS': {
      return { ...state, save: { ...s, stats: { ...s.stats, ...action.delta } } };
    }

    case 'EQUIP_SKIN': {
      return { ...state, save: { ...s, equippedSkin: action.id } };
    }
    case 'BUY_SKIN': {
      const skin = CONFIG.skins.find(sk => sk.id === action.id);
      if (!skin || s.ownedSkins.includes(action.id)) return state;
      if (skin.price?.cur === 'gems' && s.gems < skin.price.amt) return state;
      const newGems = skin.price?.cur === 'gems' ? s.gems - skin.price.amt : s.gems;
      return {
        ...state,
        save: { ...s, gems: newGems, ownedSkins: [...s.ownedSkins, action.id] },
      };
    }

    case 'SET_MUSIC': return { ...state, save: { ...s, music: action.value } };
    case 'SET_SFX':   return { ...state, save: { ...s, sfx: action.value } };

    case 'UNLOCK_OFFLINE': {
      if (s.gems < CONFIG.offline.price) return state;
      return { ...state, save: { ...s, gems: s.gems - CONFIG.offline.price, offlineEarningsUnlocked: true } };
    }

    case 'CLAIM_OFFLINE': {
      return { ...state, save: { ...s, coins: s.coins + action.amount, lastSeen: Date.now() }, offlineEarnings: 0 };
    }

    case 'ACTIVATE_COIN_BOOST': {
      const curNow = Date.now();
      return { ...state, save: { ...s, adCoinBoostUntil: curNow + 10 * 60 * 1000 } };
    }

    case 'ACTIVATE_DMG_BOOST': {
      const curNow = Date.now();
      return { ...state, save: { ...s, adDmgBoostUntil: curNow + 10 * 60 * 1000 } };
    }

    case 'INIT_QUESTS': {
      const day = action.dayKey;
      if (s.questLastDay === day) return state;
      return { ...state, save: { ...s, quests: generateQuests(Date.now()), questLastDay: day } };
    }
    case 'CLAIM_QUEST': {
      const quests = s.quests?.map(q =>
        q.id === action.id ? { ...q, claimed: true } : q
      );
      const q = s.quests?.find(q2 => q2.id === action.id);
      if (!q || q.claimed || q.progress < q.target) return state;
      return {
        ...state,
        save: { ...s, quests, coins: s.coins + q.reward },
      };
    }
    case 'PROGRESS_QUEST': {
      const quests = s.quests?.map(q =>
        q.id === action.id ? { ...q, progress: Math.min(q.target, q.progress + action.amount) } : q
      );
      return { ...state, save: { ...s, quests } };
    }

    case 'CLAIM_DAILY_CHEST': {
      const { streak, gems, coins } = action;
      const newStats = { ...s.stats, totalCoins: s.stats.totalCoins + coins };
      return {
        ...state,
        save: {
          ...s,
          coins: s.coins + coins,
          gems: s.gems + (gems || 0),
          dailyChest: { streak, lastDay: todayKey() },
          stats: newStats,
        },
      };
    }

    case 'UNLOCK_SPECIAL': {
      return { ...state, save: { ...s, specials: { ...s.specials, [action.id]: { level: 1 } } } };
    }
    case 'UPGRADE_SPECIAL': {
      const curSp = s.specials[action.id];
      if (!curSp || curSp.level >= 5) return state;
      const cost = action.cost;
      if (s.coins < cost) return state;
      return {
        ...state,
        save: {
          ...s,
          coins: s.coins - cost,
          specials: { ...s.specials, [action.id]: { level: curSp.level + 1 } },
        },
      };
    }

    case 'RESET_SAVE':
      return { ...state, save: createInitialSave(), screen: 'home' };

    case 'IMPORT_SAVE': {
      const imported = importSave(action.code);
      if (!imported) return { ...state, importError: 'Invalid code.' };
      return { ...state, save: imported, importError: null, screen: 'home' };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const achs = { ...s.achievements, [action.id]: true };
      const ach = ACHIEVEMENTS.find(a => a.id === action.id);
      return {
        ...state,
        save: { ...s, achievements: achs, gems: s.gems + (ach?.reward || 0) },
        toastAch: ach,
      };
    }
    case 'CLEAR_ACH_TOAST': return { ...state, toastAch: null };

    case 'SET_OFFLINE_EARNINGS': return { ...state, offlineEarnings: action.amount };

    default: return state;
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function GameProvider({ children }) {
  const initSave = loadSave();
  const offline = calcOfflineEarnings(initSave);

  const [state, dispatch] = useReducer(reducer, {
    screen: 'start',       // 'start' | 'home' | 'battle' | 'attrs' | 'levels' | 'skills' | 'specials' | 'awards' | 'quests' | 'help' | 'shop' | 'settings'
    save: initSave,
    levelUpPending: null,
    offlineEarnings: offline,
    toastAch: null,
    importError: null,
  });

  const saveRef = useRef(state.save);
  saveRef.current = state.save;

  // Auto-persist on save change
  useEffect(() => {
    persistSave(state.save);
  }, [state.save]);

  // Achievement checker
  useEffect(() => {
    const s = state.save;
    for (const ach of ACHIEVEMENTS) {
      if (s.achievements[ach.id]) continue;
      const val = ach.stat === 'playerLevel' ? s.playerLevel : s.stats[ach.stat];
      if (val >= ach.target) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', id: ach.id });
      }
    }
  }, [state.save.stats, state.save.playerLevel, state.save.achievements]);

  const go = useCallback((screen) => dispatch({ type: 'SET_SCREEN', screen }), []);
  const playerStats = computePlayerStats(state.save);

  return (
    <GameCtx.Provider value={{ state, dispatch, go, playerStats }}>
      {children}
    </GameCtx.Provider>
  );
}

export function useGame() {
  return useContext(GameCtx);
}
