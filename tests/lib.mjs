// Shared helpers for reference capture and verification.
export const WIDTHS = [390, 768, 1440];
export const SECTIONS = [
  { name: 'header', sel: 'header' },
  { name: 'hero', sel: '#top' },
  { name: 'nahl', sel: '#nahl' },
  { name: 'modules', sel: '#modules' },
  { name: 'get', sel: '#get' },
  { name: 'footer', sel: 'footer' }
];

// Style probes: located by exact (leaf-most) text so they resolve in both the
// reference DOM (inline-styled divs) and the rebuilt DOM (semantic elements).
export const PROBES = [
  { name: 'h1-hero', text: 'Every account you have, finally in one place.' },
  { name: 'hero-body', text: 'Connect your banks in a few minutes and Savvy Bee pulls spending, savings goals, contribution circles and NGX holdings into a single net position — read by an AI copilot that speaks up before something breaks.' },
  { name: 'eyebrow', text: 'PRIVATE BETA · ABUJA' },
  { name: 'btn-header-demo', text: 'Open the demo', nth: 0 },
  { name: 'btn-get-early', text: 'Get early access' },
  { name: 'btn-hero-demo', text: 'Open the demo', nth: 1 },
  { name: 'nav-nahl', text: 'Nahl', nth: 0 },
  { name: 'scope-combined-fig', text: '₦1,575,900', nth: 0 },
  { name: 'scope-wallet-name', text: 'Savvy Bee Wallet', nth: 0 },
  { name: 'h2-nahl', text: 'Ask in plain words. Get the maths, then the fix.' },
  { name: 'nahl-body', text: 'Nahl reads every account you connect — salary, bills, subscriptions, goals, holdings — and works out what a decision actually costs before you make it.' },
  { name: 'nahl-chip-active', text: 'Can I afford Detty December?', nth: 0 },
  { name: 'nahl-chip-2', text: 'What is eating my salary?', nth: 0 },
  { name: 'nahl-status', text: 'READING 4 ACCOUNTS' },
  { name: 'nahl-ghost', text: 'Show the maths' },
  { name: 'nahl-try', text: 'TRY A QUESTION' },
  { name: 'h2-modules', text: 'Four instruments. One balance they all agree on.' },
  { name: 'h3-spend', text: 'Accounts that explain themselves' },
  { name: 'h3-save', text: 'Goals that fill themselves' },
  { name: 'h3-invest', text: 'The NGX, without the brokerage runaround' },
  { name: 'h3-circles', text: 'Ajo and esusu, with the trust written down' },
  { name: 'kicker-spend', text: 'SPEND', nth: 0 },
  { name: 'feature-budgets-title', text: 'Budgets', nth: 0 },
  { name: 'h2-get', text: 'Join the private beta.' },
  { name: 'get-body', text: "We onboard a few hundred people a week, Abuja and Lagos first. Leave your email and we'll send your invite." },
  { name: 'btn-request-invite', text: 'Request invite' },
  { name: 'get-helper', text: "NO SPAM · ONE MESSAGE WHEN IT'S YOUR TURN" },
  { name: 'input-waitlist', placeholder: 'you@email.com' },
  { name: 'footer-legal', text: 'Savvy Bee Ltd (RC 8326527). A311, Garki Mall, Damaturu Street, Garki II, Abuja, FCT, Nigeria. Investing carries risk; past performance is not indicative of future returns.' },
  { name: 'footer-product', text: 'PRODUCT' },
  { name: 'footer-email', text: 'hello@mysavvybee.com', nth: 0 },
  { name: 'footer-copy', text: '© 2026 SAVVY BEE LTD · ABUJA, NIGERIA' },
  { name: 'sec-header', sel: 'header' },
  { name: 'sec-nahl', sel: '#nahl' },
  { name: 'sec-get-card', sel: '#get > div' }
];

export const STYLE_PROPS = [
  'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
  'color', 'background-color', 'padding', 'margin', 'border-radius',
  'box-shadow', 'width', 'height'
];

// Runs inside the page. Returns { probeName: { prop: value } | null }.
export function collectStylesScript(probes, props) {
  return `(() => {
    const probes = ${JSON.stringify(probes)};
    const props = ${JSON.stringify(props)};
    const visible = el => el.getClientRects().length > 0;
    const result = {};
    // Outermost matching: keep elements whose text matches but whose PARENT's
    // text does not — this skips the reference runtime's unstyled text-wrapper
    // spans and lands on the styled container in both DOMs.
    const norm = el => el.textContent.replace(/\\s+/g, ' ').trim();
    const leafMatches = text => {
      const all = [];
      const walk = el => {
        if (norm(el) === text) {
          if (visible(el)) all.push(el);
          return; // outermost match — do not descend into same-text children
        }
        for (const c of el.children) walk(c);
      };
      walk(document.body);
      return all;
    };
    for (const p of probes) {
      let el = null;
      if (p.sel) el = document.querySelector(p.sel);
      else if (p.placeholder) el = document.querySelector('input[placeholder="' + p.placeholder + '"]');
      else {
        const found = leafMatches(p.text);
        el = found[p.nth || 0] || null;
      }
      if (!el || !visible(el)) { result[p.name] = null; continue; }
      const cs = getComputedStyle(el);
      const rec = {};
      for (const prop of props) rec[prop] = cs.getPropertyValue(prop);
      const r = el.getBoundingClientRect();
      rec.rectWidth = Math.round(r.width * 10) / 10;
      rec.rectHeight = Math.round(r.height * 10) / 10;
      result[p.name] = rec;
    }
    return result;
  })()`;
}

export function normalizeText(t) {
  return t
    .split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

export async function settle(page, ms = 700) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ms);
}
