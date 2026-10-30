import { useGame } from '../context/GameContext.jsx';
import { HomeIcon } from './Icons.jsx';

const HELP_CARDS = [
  {
    num: '1',
    title: 'YOUR HANDS DO THE WORK',
    body: (
      <>
        Your hands slap automatically — your job is to make every slap count. Coins are paid on <b>every strike</b>, so even a fight you lose still earns. Unlock <b>FRENZY</b> in the skill tree, then land hits to charge its meter. When full, tap <b>FRENZY!</b> in battle for 10 seconds of <b>+50% damage</b> and <b>+30% speed</b>.
      </>
    ),
  },
  {
    num: '2',
    title: 'GROW ON THREE FRONTS',
    body: (
      <>
        <b>Attributes</b> (Power, Speed, Crit, Combo…) are capped by your <b>player level</b> — level up to raise the cap, and every level grants a permanent perk (Iron Palm, Thick Skin, Vampire Slap…). <b>Skills</b> from the tree are the third front: Second Hand doubles your slap rate, essential for defeating late-game bosses.
      </>
    ),
  },
  {
    num: '3',
    title: 'CLIMB THE ROSTER',
    body: (
      <>
        Beat an enemy to unlock the next — 50 of them in 10 distinct groups, with a boss every 10th enemy. Bosses enrage under 30% HP! Every defeated enemy also unlocks a <b>HARD rematch</b> on the Levels screen: far tougher, but pays <b>2.5× coins</b> and a one-time <b>Gem</b>.
      </>
    ),
  },
  {
    num: '4',
    title: 'EVERY DAY COUNTS',
    body: (
      <>
        Defeat the <b>Slime Blob (#5)</b> to unlock the <b>daily streak chest</b> — pays coins daily and gems on day 7. Defeat the <b>Mischievous Monkey (#10)</b> to unlock <b>daily quests</b>. Check <b>Awards</b> for achievements that pay gems, and spend gems in the <b>Shop</b> on hand skins and coin packs.
      </>
    ),
  },
  {
    num: '5',
    title: 'WATCH THE COUNTDOWN',
    body: (
      <>
        Enemies hit back on the timer below their HP bar. Your HP refills automatically after every fight. If you get walled, farm the highest enemy you can easily beat, upgrade your attributes, and return stronger.
      </>
    ),
  },
  {
    num: '6',
    title: 'SPECIAL SKILLS & SKINS',
    body: (
      <>
        Bosses drop <b>special skills</b>: Double Slap (#10), Meteor (#30), Orbital Laser (#50), Pharaoh's Curse (#70), and <b>Zeus's Wrath (#90)</b>. Fire them in battle from the action rail and upgrade them up to Lv5 on the Specials screen. Equipped hand skins also grant passive perks!
      </>
    ),
  },
];

export default function HelpScreen() {
  const { go } = useGame();

  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="sel-head">
        <button className="home-btn" onClick={() => go('home')} aria-label="Back to home">
          <HomeIcon />
        </button>
        <div>
          <div className="sel-title">HOW TO PLAY</div>
          <div className="sel-sub">THE RULES OF SLAPPING</div>
        </div>
      </div>

      {/* Rules list */}
      <div className="scroll-content" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 24px' }}>
        {HELP_CARDS.map((card) => (
          <div key={card.num} className="help-card">
            <div className="help-h">
              {card.num} · {card.title}
            </div>
            <p>{card.body}</p>
          </div>
        ))}

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '12px', padding: '12px' }}
          onClick={() => go('home')}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}
