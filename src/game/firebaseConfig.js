// Firebase cloud save — OPTIONAL and OFF by default.
//
// Cloud sync stays completely dormant until you paste your own Firebase
// project's web config below. Full step-by-step: FIREBASE_SETUP.md (repo root).
//
// These values are NOT secret — they only identify your Firebase project.
// The save data itself is protected by the Firestore security rules in
// firestore.rules (each player can read/write only their own save doc).
export const FIREBASE_CONFIG = null;

/* Paste yours like this:

export const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef0123456789"
};

*/
