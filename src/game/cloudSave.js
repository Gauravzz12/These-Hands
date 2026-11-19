// Cloud save sync via Firebase (Auth + Firestore). The SDK ships as a
// code-split chunk that is fetched only when FIREBASE_CONFIG is set.
// Completely dormant otherwise: no network, no SDK, no behaviour change.
//
// Model: the game's save is one signed string in localStorage. That exact
// string is mirrored to Firestore at saves/{uid}. On boot, after anonymous
// sign-in, the cloud doc is compared with the local save by PROGRESS
// (stages cleared -> level -> coins -> timestamp). Cloud only replaces local
// when it is strictly further ahead, so a fresh device can never wipe a
// richer save; otherwise local is pushed up. Signing in with Google moves
// the same local progress to that account automatically (cloud doc for the
// new uid starts empty, local wins, gets pushed).
import { FIREBASE_CONFIG } from './firebaseConfig.js';

let hooks = null;
let fb = null; // { appM, authM, fsM }
let auth = null;
let db = null;
let user = null;
let booted = false;
let reconciled = false;
let pushTimer = 0;
let lastPushedRaw = null;
let lastSyncLabel = '';

let status = {
  configured: !!FIREBASE_CONFIG,
  state: 'off',
  text: '',
  canGoogle: false,
  canSync: false,
  canSignOut: false
};

function setStatus(patch) {
  status = Object.assign({}, status, patch);
  if (hooks && hooks.onStatus) { try { hooks.onStatus(status); } catch (e) {} }
}

function shortErr(e) {
  const s = (e && (e.code || e.message)) || 'error';
  return String(s).slice(0, 48);
}

export function cloudGetStatus() { return status; }

function clearedCount(o) {
  if (!o) return -1;
  let n = 0;
  if (Array.isArray(o.defeated)) n += o.defeated.length;
  if (Array.isArray(o.worldsDefeated)) for (const w of o.worldsDefeated) if (Array.isArray(w)) n += w.length;
  if (Array.isArray(o.hardCleared)) n += o.hardCleared.length;
  return n;
}

// 1 = a is further ahead, -1 = b is, 0 = equal. null loses to anything.
export function compareSaveObjs(a, b) {
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  const ka = [clearedCount(a), a.level || 1, a.coins || 0, a.lastSeen || 0];
  const kb = [clearedCount(b), b.level || 1, b.coins || 0, b.lastSeen || 0];
  for (let i = 0; i < ka.length; i++) {
    if (ka[i] !== kb[i]) return ka[i] > kb[i] ? 1 : -1;
  }
  return 0;
}

async function loadSdk() {
  if (fb) return fb;
  const [appM, authM, fsM] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore/lite')
  ]);
  fb = { appM, authM, fsM };
  return fb;
}

function readyStatus() {
  if (!user) return;
  setStatus({
    state: 'ready',
    text: lastSyncLabel || (user.isAnonymous
      ? 'Cloud save on (guest). Link Google to keep progress across devices.'
      : 'Cloud save on · ' + (user.email || 'signed in')),
    canSync: true,
    canGoogle: !!user.isAnonymous,
    canSignOut: !user.isAnonymous
  });
}

async function pushNow() {
  if (!user || !db || !fb) return false;
  const raw = hooks.getRaw();
  if (!raw) return false;
  if (raw === lastPushedRaw) { readyStatus(); return true; }
  try {
    setStatus({ state: 'syncing', text: 'Syncing cloud save…' });
    await fb.fsM.setDoc(fb.fsM.doc(db, 'saves', user.uid), { save: raw, updatedAt: Date.now(), v: 1 });
    lastPushedRaw = raw;
    lastSyncLabel = (user.isAnonymous ? 'Cloud save on (guest)' : 'Cloud save on · ' + (user.email || 'signed in')) +
      ' · synced ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStatus({
      state: 'synced',
      text: lastSyncLabel,
      canSync: true,
      canGoogle: !!user.isAnonymous,
      canSignOut: !user.isAnonymous
    });
    return true;
  } catch (e) {
    setStatus({ state: 'error', text: 'Cloud sync failed (' + shortErr(e) + ') — will retry.', canSync: true, canGoogle: !!(user && user.isAnonymous), canSignOut: !!(user && !user.isAnonymous) });
    return false;
  }
}

// Debounced push, called by the engine after every local save write.
export function cloudNotifySaved() {
  if (!FIREBASE_CONFIG) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushNow(); }, 4000);
}

async function reconcile() {
  if (reconciled || !user || !db || !fb) return;
  reconciled = true;
  try {
    const snap = await fb.fsM.getDoc(fb.fsM.doc(db, 'saves', user.uid));
    if (snap.exists()) {
      const data = snap.data();
      const cloudObj = hooks.parseRaw(data.save);
      const localObj = hooks.getLocalObj();
      if (cloudObj && compareSaveObjs(cloudObj, localObj) > 0 && hooks.allowApply) {
        setStatus({ state: 'syncing', text: 'Found a further-ahead cloud save — loading it…' });
        hooks.applyCloudRaw(data.save);
        return; // page reloads with the cloud save as local
      }
      if (cloudObj && compareSaveObjs(cloudObj, localObj) === 0) lastPushedRaw = data.save;
    }
    await pushNow();
  } catch (e) {
    setStatus({ state: 'error', text: 'Cloud check failed (' + shortErr(e) + ') — playing offline.', canSync: true });
  }
}

export async function cloudBoot(h) {
  hooks = h;
  if (!FIREBASE_CONFIG) {
    setStatus({ configured: false, state: 'off', text: 'Cloud save is not set up yet — progress lives on this device only.' });
    return;
  }
  if (booted) return;
  booted = true;
  setStatus({ configured: true, state: 'booting', text: 'Connecting to cloud save…' });
  try {
    await loadSdk();
    const app = fb.appM.initializeApp(FIREBASE_CONFIG);
    auth = fb.authM.getAuth(app);
    db = fb.fsM.getFirestore(app);
    fb.authM.onAuthStateChanged(auth, async (u) => {
      user = u;
      if (!u) {
        try { await fb.authM.signInAnonymously(auth); }
        catch (e) { setStatus({ state: 'error', text: 'Cloud sign-in failed (' + shortErr(e) + ') — playing offline.' }); }
        return;
      }
      readyStatus();
      reconcile();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') pushNow();
    });
  } catch (e) {
    setStatus({ state: 'error', text: 'Cloud save unavailable (' + shortErr(e) + ') — game continues offline.' });
  }
}

export async function cloudSyncNow() {
  if (!FIREBASE_CONFIG) return;
  if (!user) { setStatus({ state: 'error', text: 'Cloud is still connecting — try again in a moment.' }); return; }
  reconciled = false;
  await reconcile();
  if (user) await pushNow();
}

export async function cloudGoogle() {
  if (!auth || !fb) return;
  const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  if (isNative) {
    // Google blocks OAuth inside embedded WebViews; the Android build needs
    // the native Firebase Auth plugin (see FIREBASE_SETUP.md, step 7).
    setStatus({ state: 'error', text: 'In the app, Google sign-in needs the native plugin — see FIREBASE_SETUP.md.' });
    return;
  }
  try {
    const provider = new fb.authM.GoogleAuthProvider();
    let cred;
    if (user && user.isAnonymous) cred = await fb.authM.linkWithPopup(user, provider);
    else cred = await fb.authM.signInWithPopup(auth, provider);
    user = cred.user;
    reconciled = false;
    readyStatus();
    await reconcile();
  } catch (e) {
    if (e && e.code === 'auth/credential-already-in-use' && user && user.isAnonymous) {
      // The Google account already has its own cloud identity: switch to it.
      // Local progress is preserved — reconcile only loads cloud when it is
      // strictly further ahead, otherwise local is pushed to that account.
      try {
        const provider = new fb.authM.GoogleAuthProvider();
        const cred = await fb.authM.signInWithPopup(auth, provider);
        user = cred.user;
        reconciled = false;
        readyStatus();
        await reconcile();
        return;
      } catch (e2) { /* fall through to error below */ }
    }
    setStatus({ state: 'error', text: 'Google sign-in failed (' + shortErr(e) + ').', canGoogle: !!(user && user.isAnonymous), canSync: !!user });
  }
}

export async function cloudSignOut() {
  if (!auth || !fb) return;
  try { await fb.authM.signOut(auth); } catch (e) {}
  // onAuthStateChanged fires with null and a fresh guest session starts,
  // so cloud backup keeps working; the Google account's save stays stored.
}
