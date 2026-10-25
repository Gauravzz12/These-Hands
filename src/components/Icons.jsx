// Shared SVG icons used throughout the game
export function CoinIcon({ className = 'coin-ico', size }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true"
      width={size} height={size}>
      <circle cx="12" cy="12" r="10" fill="#f2b01e" stroke="#b97e08" strokeWidth="2"/>
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="#b97e08" strokeWidth="2"/>
    </svg>
  );
}

export function GemIcon({ className = 'gem-ico', size }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true"
      width={size} height={size}>
      <path d="M7 3h10l4 6-9 12L3 9l4-6z" fill="#39c2d8" stroke="#177e96" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M3 9h18M12 21 8.5 9 12 3l3.5 6L12 21" fill="none" stroke="#177e96" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/>
    </svg>
  );
}

export function BoltIcon({ className = 'bolt-ico' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11L9.8 22 19 10h-6.5L13 2z" fill="currentColor"/>
    </svg>
  );
}

export function StarIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M12 1l2.6 7.2L22 9.3l-5.8 4.9L18 22l-6-4.6L6 22l1.8-7.8L2 9.3l7.4-1.1L12 1z" fill="currentColor"/>
    </svg>
  );
}

export function TrophyIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M6 2h12v3h4v2a5 5 0 0 1-5 5h-.42A6 6 0 0 1 13 15.92V18h4v3H7v-3h4v-2.08A6 6 0 0 1 7.42 12H7a5 5 0 0 1-5-5V5h4V2zm-2 5a3 3 0 0 0 3 3V7H4zm16 0h-3v3a3 3 0 0 0 3-3z" fill="currentColor"/>
    </svg>
  );
}

export function HeartIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M12 21C6 16.5 2.5 12.8 2.5 8.9 2.5 5.9 4.9 3.5 7.9 3.5c1.7 0 3.2.8 4.1 2.1.9-1.3 2.4-2.1 4.1-2.1 3 0 5.4 2.4 5.4 5.4 0 3.9-3.5 7.6-9.5 12.1z" fill="#d63c30" stroke="#8f1f16" strokeWidth="1.4"/>
    </svg>
  );
}

export function ChevronDown({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l6 5V4L8 9H4z" fill="currentColor"/>
      <path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l6 5V4L8 9H4z" fill="currentColor"/>
      <line x1="17" y1="8" x2="23" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="8" x2="17" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="5" height="16" rx="1" fill="currentColor"/>
      <rect x="14" y="4" width="5" height="16" rx="1" fill="currentColor"/>
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
    </svg>
  );
}

export function FightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3 4 6l4 4 3-3-4-4zm10 0-4 4 3 3 4-4-3-3zM5 13c-1.2 1.5-2 3.4-2 5 1.9-.1 3.6-.8 5-2l-3-3zm14 0-3 3c1.4 1.2 3.1 1.9 5 2-.1-1.6-.8-3.5-2-5zM12 8l-2.5 2.5L12 13l2.5-2.5L12 8z" fill="currentColor"/>
    </svg>
  );
}
export const SwordsIcon = FightIcon;

export function UpArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/>
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor"/>
    </svg>
  );
}

export function StarMenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" fill="currentColor"/>
    </svg>
  );
}

export function BoltMenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" fill="currentColor"/>
    </svg>
  );
}

export function QuestIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h14a1 1 0 0 1 1 1v13.2a2 2 0 0 1-3.2 1.6L12 15.6l-4.8 3.2A2 2 0 0 1 4 17.2V4a1 1 0 0 1 1-1zm3 4v2h8V7H8zm0 4v2h5v-2H8z" fill="currentColor"/>
    </svg>
  );
}

export function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7 5.6 3h12.8L20 7H4zm0 2v10a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9h-5.5a2.75 2.75 0 0 1-5 0H4zm5.5 2.2a.8.8 0 0 1 1.5 0V13H9.5v-1.8z" fill="currentColor"/>
    </svg>
  );
}

export function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.2 15.6a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM12 5.5c1.9 0 3.3 1.2 3.3 2.9 0 1.4-.9 2.1-1.8 2.7-.6.4-.8.6-.9 1.3h-1.7c.1-1.6.7-2.2 1.5-2.8.4-.3.7-.5.7-1 0-.6-.5-1-1.1-1-.7 0-1.2.4-1.3 1.3H8.9C9 6.6 10.2 5.5 12 5.5z" fill="currentColor"/>
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.7 7.7 0 0 0-1.7-1L14.8 3H9.2L8.7 5.6a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.7 7.7 0 0 0 1.7 1l.5 2.6h5.6l.5-2.6a7.7 7.7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" fill="currentColor"/>
    </svg>
  );
}
