const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

const navStart = appCode.indexOf('<nav id="bottomNav"');
const navEnd = appCode.indexOf('</nav>', navStart);

if (navStart !== -1 && navEnd !== -1) {
  const newNav = `<nav id="bottomNav" aria-label="Main Navigation">
        <button className="bnav-btn active" data-tab="home" data-goto="home" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 11h2.7v9h5.3v-6h3v6h5.3v-9h2.7L12 3z" fill="currentColor"/></svg>
          <span>HOME</span>
        </button>
        <button className="bnav-btn" data-tab="attrs" data-goto="attrs" aria-label="Attributes">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 7h-4v11h-6V10H5l7-7z" fill="currentColor"/></svg>
          <span>ATTRS</span>
        </button>
        <button className="bnav-btn" data-tab="skills" data-goto="skills" aria-label="Skills">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" fill="currentColor"/></svg>
          <span>SKILLS</span>
        </button>
        <button className="bnav-btn" data-tab="levels" data-goto="levels" aria-label="Stages">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor"/></svg>
          <span>STAGES</span>
        </button>
        <button className="bnav-btn" data-tab="more" id="bnavMoreBtn" aria-label="More sections">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="2.2" fill="currentColor"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><circle cx="19" cy="12" r="2.2" fill="currentColor"/></svg>
          <span>MORE</span>
        </button>
      </nav>`;

  appCode = appCode.slice(0, navStart) + newNav + appCode.slice(navEnd + 6);
  console.log('Replaced bottomNav successfully');
}

// Add Shop row into more-list if not present
if (!appCode.includes('mr-title">SHOP</span>')) {
  const moreListTarget = '<div className="more-list">';
  const shopRow = `<div className="more-list">
            <button className="more-row" data-goto="shop">
              <span className="mr-ico gold"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7 5.6 3h12.8L20 7H4zm0 2v10a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9h-5.5a2.75 2.75 0 0 1-5 0H4zm5.5 2.2a.8.8 0 0 1 1.5 0V13H9.5v-1.8z" fill="currentColor"/></svg></span>
              <span className="mr-main">
                <span className="mr-title">SHOP</span>
                <span className="mr-sub">SKINS, GEMS & BUNDLES</span>
              </span>
              <span className="mr-arrow">›</span>
            </button>`;
  appCode = appCode.replace(moreListTarget, shopRow);
  console.log('Added SHOP into more-list');
}

fs.writeFileSync('src/App.jsx', appCode, 'utf8');
console.log('App.jsx updated.');
