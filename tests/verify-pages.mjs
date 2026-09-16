// Verify the About and Legal rebuilds against the export's own render
// (About.dc.html / Legal.dc.html served with support.js + React), plus an
// end-to-end demo overlay test with the real prototype.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { normalizeText, settle } from './lib.mjs';

const REF_BASE = 'http://localhost:8133';
const SITE_BASE = 'http://localhost:8131';
const DIFFS = path.resolve('tests/diffs');
fs.mkdirSync(DIFFS, { recursive: true });
const WIDTHS = [390, 768, 1440];

// Like compare(), but tolerant of a whole-image vertical shift of up to ±2px:
// used for About's sub-hero sections, which sit at a different fractional page
// offset since the sanctioned hero-video addition changed the hero's height.
// Content must still match at one of the candidate offsets to pass.
function compareShifted(aPath, bPath, diffPath) {
  const a = PNG.sync.read(fs.readFileSync(aPath));
  const b = PNG.sync.read(fs.readFileSync(bPath));
  let best = null;
  for (const dy of [0, -1, 1, -2, 2]) {
    const width = Math.max(a.width, b.width);
    const height = Math.max(a.height, b.height) + Math.abs(dy);
    const place = (img, off) => {
      const out = new PNG({ width, height, fill: true });
      PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, off);
      return out;
    };
    const pa = place(a, dy > 0 ? dy : 0);
    const pb = place(b, dy < 0 ? -dy : 0);
    const diff = new PNG({ width, height });
    const n = pixelmatch(pa.data, pb.data, diff.data, width, height, { threshold: 0.12 });
    const pct = (n / (width * height)) * 100;
    if (!best || pct < best.pct) best = { pct, dy, diff };
  }
  fs.writeFileSync(diffPath, PNG.sync.write(best.diff));
  return { pct: best.pct, dy: best.dy, sizes: `${a.width}x${a.height} vs ${b.width}x${b.height}` };
}

function compare(aPath, bPath, diffPath) {
  const a = PNG.sync.read(fs.readFileSync(aPath));
  const b = PNG.sync.read(fs.readFileSync(bPath));
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const pad = img => {
    if (img.width === width && img.height === height) return img;
    const out = new PNG({ width, height, fill: true });
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const diff = new PNG({ width, height });
  const n = pixelmatch(pad(a).data, pad(b).data, diff.data, width, height, { threshold: 0.12 });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return { pct: (n / (width * height)) * 100, sizes: `${a.width}x${a.height} vs ${b.width}x${b.height}` };
}

const browser = await chromium.launch();
let failures = 0;

async function open(url, width, waitFn) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('console', m => { if (m.type() === 'error') page.errors.push(m.text()); });
  page.on('pageerror', e => page.errors.push(e.message));
  await page.goto(url, { waitUntil: 'load' });
  if (waitFn) await waitFn(page);
  await settle(page, 1000);
  return { ctx, page };
}

const PAGES = [
  // About's hero intentionally deviates from the export: a YouTube Short was added at the
  // client's request (see docs/CONFLICTS.md). Its caption line is expected-extra text, and
  // the visual comparison runs per-section below the hero instead of full-page.
  { name: 'about', ref: `${REF_BASE}/About.dc.html`, build: `${SITE_BASE}/about.html`, wait: p => p.waitForSelector('#team', { timeout: 45000 }),
    allowExtraText: ['IDICE APPLICATION · SAVVY BEE LIMITED'],
    sections: ['#team', '#work', 'footer'] },
  { name: 'legal', ref: `${REF_BASE}/Legal.dc.html`, build: `${SITE_BASE}/legal.html`, wait: p => p.waitForSelector('h1', { timeout: 45000 }) }
];

for (const pg of PAGES) {
  // text comparison at 1440
  const r = await open(pg.ref, 1440, pg.wait);
  const refText = normalizeText(await r.page.evaluate(() => document.body.innerText));
  const b = await open(pg.build, 1440, pg.wait);
  const bldText = normalizeText(await b.page.evaluate(() => document.body.innerText));
  const refLines = refText.split('\n'), bldLines = bldText.split('\n');
  const count = arr => { const m = new Map(); for (const l of arr) m.set(l, (m.get(l) || 0) + 1); return m; };
  const rm = count(refLines), bm = count(bldLines);
  const missing = [], extra = [];
  const allowed = new Set(pg.allowExtraText || []);
  for (const [l, c] of rm) { const d = c - (bm.get(l) || 0); for (let i = 0; i < d; i++) missing.push(l); }
  for (const [l, c] of bm) { const d = c - (rm.get(l) || 0); for (let i = 0; i < d; i++) if (!allowed.has(l)) extra.push(l); }
  console.log(`TEXT ${pg.name}: ${missing.length === 0 && extra.length === 0 ? 'PASS' : `FAIL (missing ${missing.length}, extra ${extra.length})`}`);
  if (missing.length || extra.length) failures++;
  missing.slice(0, 8).forEach(l => console.log('  missing: ' + l.slice(0, 110)));
  extra.slice(0, 8).forEach(l => console.log('  extra:   ' + l.slice(0, 110)));
  if (b.page.errors.length) { console.log(`  build console errors: ${b.page.errors.slice(0, 3).join(' | ')}`); failures++; }
  await r.ctx.close(); await b.ctx.close();

  // visual comparison — full page, or per-section when the page has a sanctioned deviation
  for (const width of WIDTHS) {
    const rr = await open(pg.ref, width, pg.wait);
    const bb = await open(pg.build, width, pg.wait);
    if (pg.sections) {
      // hide the sticky header during element captures: it floats over sections at a
      // scroll-dependent position, and the (sanctioned) taller hero shifts scroll offsets
      for (const pageObj of [rr.page, bb.page]) {
        await pageObj.evaluate(() => { const h = document.querySelector('header'); if (h) h.style.visibility = 'hidden'; });
      }
      for (const sel of pg.sections) {
        const slug = sel.replace(/[^a-z]/g, '');
        for (const [tag, pageObj] of [['ref', rr.page], ['build', bb.page]]) {
          // Snap the section to an integer document offset (fractional offsets differ
          // between ref and build since the hero's height changed, and produce
          // uniform antialiasing ghosting that is not a real visual difference).
          await pageObj.evaluate(s => {
            document.body.style.marginTop = '0px';
            const el = document.querySelector(s);
            const top = el.getBoundingClientRect().top + window.scrollY;
            const frac = top - Math.floor(top);
            if (frac > 0.01) document.body.style.marginTop = (1 - frac).toFixed(3) + 'px';
          }, sel);
          const loc = pageObj.locator(sel).first();
          await loc.scrollIntoViewIfNeeded();
          await pageObj.waitForTimeout(250);
          await loc.screenshot({ path: path.join(DIFFS, `${tag}-${pg.name}-${slug}-${width}.png`) });
        }
        const cmp = compareShifted(path.join(DIFFS, `ref-${pg.name}-${slug}-${width}.png`), path.join(DIFFS, `build-${pg.name}-${slug}-${width}.png`), path.join(DIFFS, `diff-${pg.name}-${slug}-${width}.png`));
        const pass = cmp.pct < 1;
        if (!pass) failures++;
        console.log(`VISUAL ${pg.name} ${sel}@${width}: ${cmp.pct.toFixed(3)}% (dy ${cmp.dy}) (${cmp.sizes}) ${pass ? 'PASS' : 'FAIL'}`);
      }
    } else {
      await rr.page.screenshot({ path: path.join(DIFFS, `ref-${pg.name}-${width}.png`), fullPage: true });
      await bb.page.screenshot({ path: path.join(DIFFS, `build-${pg.name}-${width}.png`), fullPage: true });
      const cmp = compare(path.join(DIFFS, `ref-${pg.name}-${width}.png`), path.join(DIFFS, `build-${pg.name}-${width}.png`), path.join(DIFFS, `diff-${pg.name}-${width}.png`));
      const pass = cmp.pct < 1;
      if (!pass) failures++;
      console.log(`VISUAL ${pg.name}@${width}: ${cmp.pct.toFixed(3)}% (${cmp.sizes}) ${pass ? 'PASS' : 'FAIL'}`);
    }
    await rr.ctx.close(); await bb.ctx.close();
  }
}

// Legal deep links + tab behaviour (build)
{
  const { ctx, page } = await open(`${SITE_BASE}/legal.html#fees`, 1440, p => p.waitForSelector('h1'));
  const t1 = await page.evaluate(() => document.querySelector('[data-legal-title]').textContent);
  await page.click('[data-tab="3"]');
  await page.waitForTimeout(300);
  const t2 = await page.evaluate(() => document.querySelector('[data-legal-title]').textContent);
  const h2 = await page.evaluate(() => location.hash);
  await page.evaluate(() => { location.hash = '#privacy'; });
  await page.waitForTimeout(300);
  const t3 = await page.evaluate(() => document.querySelector('[data-legal-title]').textContent);
  const ok = t1 === 'Fees and charges' && t2 === 'Complaints procedure' && h2 === '#complaints' && t3 === 'Privacy notice';
  console.log(`LEGAL deep-link/tab/hash: ${ok ? 'PASS' : `FAIL (${t1} | ${t2} ${h2} | ${t3})`}`);
  if (!ok) failures++;
  await ctx.close();
}

// Demo overlay end-to-end with the real prototype
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', e => page.errors.push(e.message));
  await page.goto(`${SITE_BASE}/index.html`, { waitUntil: 'load' });
  await page.waitForSelector('#top');
  await page.getByText('Open the demo').first().click();
  await page.waitForSelector('[data-tour-framed]:not([hidden])');
  // loader must complete (iframe onLoad) and unmount
  await page.waitForSelector('[data-tour-framed] [data-tour-loader][hidden]', { state: 'attached', timeout: 30000 });
  await page.waitForTimeout(1500);
  const shot = path.join(DIFFS, 'tour-real-prototype.png');
  await page.screenshot({ path: shot });
  // the iframe should have rendered the Home screen — check its inner text via frame
  const frame = page.frames().find(f => f.url().includes('Savvy%20Bee%20Prototype') || f.url().includes('Savvy Bee Prototype'));
  let frameOk = false;
  if (frame) {
    try {
      const txt = await frame.evaluate(() => document.body.innerText.slice(0, 400));
      frameOk = txt.length > 0;
    } catch (e) { frameOk = false; }
  }
  console.log(`DEMO overlay: loader completed, prototype frame ${frame ? 'found' : 'MISSING'}${frameOk ? ' with content' : ''} ${page.errors.length ? 'ERRORS: ' + page.errors[0] : ''}`);
  if (!frame) failures++;
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? '\nALL PASS' : `\n${failures} failing checks`);
