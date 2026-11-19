# Firebase Cloud Save — Setup

The game contains the full cloud-save system (`src/game/cloudSave.js`).
STATUS 2026-11-19: the Firebase project **idle-slapper** is created and fully
connected (steps 1–6 below are DONE, web + Android apps registered, sync
verified live). Android Google sign-in is fully armed too (step 7 done, incl. SHA-1s).
(The system goes dormant again only if `FIREBASE_CONFIG` is set back to null.)

How it works once connected:

- Players are signed in **anonymously** in the background (no prompt, no friction).
- The game's save (the exact signed blob kept in localStorage) is mirrored to
  Firestore at `saves/{uid}` a few seconds after every save, and when the tab hides.
- On a fresh install / new device, the cloud save is compared with local progress
  (stages cleared → level → coins → time). The cloud save loads **only if it is
  strictly further ahead**, so an empty device can never wipe real progress.
- Players can **Link Google** in Settings → CLOUD SAVE. That ties the save to
  their Google account, which is what makes progress survive uninstall/reinstall
  and move across devices. Signing into a Google account that already has a
  cloud save keeps whichever progress is further ahead.

## 1. Create the project

1. Go to https://console.firebase.google.com → **Add project** (any name, e.g. `idle-slapper`).
2. Google Analytics is optional — you can skip it.

## 2. Register the web app

1. In the project overview, click the **Web** icon (`</>`) → register app
   (nickname e.g. `Idle Slapper Web`). You do NOT need Firebase Hosting.
2. Firebase shows a `firebaseConfig` object. Copy those values into
   **`src/game/firebaseConfig.js`** (replace `null`, keep the same keys).
   These values are not secret — they identify the project; the data is
   protected by the rules in step 4.

## 3. Enable sign-in methods

Firebase Console → **Authentication** → **Sign-in method**:

1. Enable **Anonymous**.
2. Enable **Google** (pick the support email it asks for).

## 4. Create Firestore + lock it down

1. Firebase Console → **Firestore Database** → **Create database** (production mode).
2. Open the **Rules** tab, paste the contents of **`firestore.rules`** from this
   repo, and **Publish**. This is what stops players reading each other's saves.

## 5. Allow your domains

Firebase Console → **Authentication** → **Settings** → **Authorized domains**:
make sure these are listed (localhost and your Firebase domains are there by default):

- `these-hands.vercel.app` (and any custom domain you serve the game from)

## 6. Rebuild / redeploy

Commit the filled-in `firebaseConfig.js` and redeploy as usual. Open the game →
Settings → **CLOUD SAVE** should read "Cloud save on (guest)…" within a few
seconds. Play a fight, wait ~5s, and check Firestore → `saves` — your save
document should be there.

## 7. Android app (Google sign-in inside the app)

Anonymous cloud backup works in the Capacitor app as-is. Google sign-in can
NOT use the web popup inside an app WebView (Google blocks OAuth in embedded
webviews), so the app uses the native plugin — DONE in code:

- `@capacitor-firebase/authentication` is installed and configured in
  `capacitor.config.json` (`skipNativeAuth: true`, Google provider only): the
  plugin only fetches the Google credential via the native account picker,
  and `cloudSave.js` links/signs in with it through the Firebase JS SDK —
  one session, one Firestore client, same as web.
- The Android app is registered in the Firebase project
  (`com.idleslapper.game`, app id `1:371519306578:android:995ef935d29d6152c3988b`)
  and `android/app/google-services.json` is generated and committed.

SHA-1 fingerprints — DONE 2026-11-19. Registered in the console for the
Android app (computed from the actual certificates downloaded from Play
Console → App integrity, since the page no longer prints them as text):

- App signing key (deployment cert): `C9:82:CA:09:48:A9:D2:88:A6:CC:4E:AC:C0:13:0F:DF:FA:06:65:1E`
- App signing, hybrid classical: `5A:E3:9D:A7:4A:45:37:00:6F:DB:89:D1:D3:29:6D:44:2C:25:4C:4C`
- App signing, hybrid post-quantum: `29:AC:1A:41:BB:CE:D3:47:FC:7B:65:F0:88:50:C3:AD:B6:9C:32:0D`
- Upload key: `35:25:C2:D8:DB:A8:CD:78:CF:33:FE:E2:F5:1D:A0:08:A8:42:D1:67`

`google-services.json` includes the four auto-created Android OAuth clients.
The one fingerprint NOT registered is the Android Studio **debug keystore**
(auto-generated on the dev PC) — sign-in in a debug build run straight from
Android Studio will fail until it is added the same way
(`keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey`,
password `android`). Play/internal-testing builds and release builds signed
with the upload key are covered.

## 8. Play Console housekeeping

- **Data safety form**: declare that the app collects a user ID + app activity
  (the save file) linked to the account, used for app functionality. No ads/analytics
  data is added by this feature.
- **Privacy policy**: mention cloud save storage via Firebase/Google.

## Turning it off

Set `FIREBASE_CONFIG` back to `null` in `src/game/firebaseConfig.js` and redeploy.
Everything local keeps working exactly as before.
