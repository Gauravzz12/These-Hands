import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NativeBridge } from './services/nativeBridge.js'

// Initialize native mobile bridges (Capacitor, AdMob, Back Button)
if (typeof window !== 'undefined') {
  window.__nativeBridge = NativeBridge;
}
NativeBridge.init();

// Defense-in-depth frame-busting clickjacking protection
if (typeof window !== 'undefined' && window.top !== window.self) {
  try {
    window.top.location = window.self.location;
  } catch {
    document.documentElement.innerHTML = '';
  }
}

createRoot(document.getElementById('root')).render(
  <App />
)
