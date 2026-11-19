# Firebase Cloud Save — Setup

The game already contains the full cloud-save system (`src/game/cloudSave.js`).
It is **dormant** until you connect your own Firebase project — no project,
no network calls, no behaviour change. Setup takes ~10 minutes, once.

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

## 7. Android app (Google sign-in inside the WebView)

Anonymous cloud backup works in the Capacitor app as-is. **Google sign-in does
not work through the web popup inside an app WebView** (Google blocks OAuth in
embedded webviews) — the Settings button explains this when tapped in the app.
To enable it in the Android build:

1. Firebase Console → Project settings → **Add app → Android**
   (package `com.idleslapper.game`) → download **`google-services.json`** into
   `android/app/`.
2. Add your SHA-1 fingerprint (Play Console → App integrity, or your debug
   keystore) in the same screen — required for Google sign-in.
3. Install the native auth bridge and sync Capacitor:
   `npm i @capacitor-firebase/authentication` then `npx cap sync`.
   The cloud module already detects the native platform; wiring the plugin's
   `signInWithGoogle()` credential into `cloudGoogle()` is the remaining step.

Until step 7 is done, Android players keep anonymous cloud backup on the same
device account; the durable cross-device identity on Android lands with the plugin.

## 8. Play Console housekeeping

- **Data safety form**: declare that the app collects a user ID + app activity
  (the save file) linked to the account, used for app functionality. No ads/analytics
  data is added by this feature.
- **Privacy policy**: mention cloud save storage via Firebase/Google.

## Turning it off

Set `FIREBASE_CONFIG` back to `null` in `src/game/firebaseConfig.js` and redeploy.
Everything local keeps working exactly as before.
