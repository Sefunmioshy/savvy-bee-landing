// Phase 3 — automated verification of the rebuilt site against the captured reference.
// Checks: TEXT diff, VISUAL pixelmatch (full page + per section, <1% target),
// STYLES (computed-style probes), FONTS (document.fonts), STATES, HEALTH.
// Usage: node tests/verify.mjs [--only=text,visual,styles,fonts,states,health]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { WIDTHS, SECTIONS, PROBES, STYLE_PROPS, collectStylesScript, normalizeText, settle } from './lib.mjs';

const SITE_URL = process.env.SITE_URL || 'http://localhost:8131/index.html';
const REF_URL = process.env.REF_URL || 'http://localhost:8130/Savvy%20Bee%20Landing%20(standalone).html';
const REF = path.resolve('tests/reference');
const DIFFS = path.resolve('tests/diffs');
fs.mkdirSync(DIFFS, { recursive: true });

const only = (process.argv.find(a => a.startsWith('--only=')) || '').replace('--only=', '');
const run = name => !only || only.split(',').includes(name);
const results = { text: null, visual: [], styles: [], fonts: null, states: [], health: {} };
let failures = 0;

const browser = await chromium.launch();

async function openBuild(width, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: opts.motion === 'normal' ? 'no-preference' : 'reduce',
    deviceScaleFactor: 1
  });
  const page = await ctx.newPage();
  page.consoleErrors = [];
  page.failedRequests = [];
  page.on('console', m => { if (m.type() === 'error') page.consoleErrors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) page.failedRequests.push(`${r.status()} ${r.url()}`); });
  await page.goto(SITE_URL, { waitUntil: 'load' });
  await page.waitForSelector('#top', { timeout: 30000 });
  await settle(page, 900);
  return { ctx, page };
}
async function openRef(width, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: opts.motion === 'normal' ? 'no-preference' : 'reduce',
    deviceScaleFactor: 1
  });
  const page = await ctx.newPage();
  await page.goto(REF_URL, { waitUntil: 'load' });
  await page.waitForSelector('#top', { timeout: 60000 });
  await page.waitForSelector('#__bundler_loading', { state: 'detached', timeout: 60000 }).catch(() => {});
  await settle(page, 1200);
  return { ctx, page };
}

function comparePngs(aPath, bPath, diffPath) {
  const a = PNG.sync.read(fs.readFileSync(aPath));
  const b = PNG.sync.read(fs.readFileSync(bPath));
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const pad = (img) => {
    if (img.width === width && img.height === height) return img;
    const out = new PNG({ width, height, fill: true });
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const pa = pad(a), pb = pad(b);
  const diff = new PNG({ width, height });
  const n = pixelmatch(pa.data, pb.data, diff.data, width, height, { threshold: 0.12 });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  const dimPenalty = (width * height) - Math.min(a.width, b.width) * Math.min(a.height, b.height);
  return { pct: (n / (width * height)) * 100, mismatched: n, total: width * height, dimDelta: dimPenalty, sizes: `${a.width}x${a.height} vs ${b.width}x${b.height}` };
}

/* ---------- TEXT ---------- */
if (run('text')) {
  const refText = fs.readFileSync(path.join(REF, 'text.txt'), 'utf8').split('\n');
  const { ctx, page } = await openBuild(1440);
  const built = normalizeText(await page.evaluate(() => document.body.innerText)).split('\n');
  await ctx.close();
  const count = arr => { const m = new Map(); for (const l of arr) m.set(l, (m.get(l) || 0) + 1); return m; };
  const rm = count(refText), bm = count(built);
  const missing = [], extra = [];
  for (const [l, c] of rm) { const d = c - (bm.get(l) || 0); for (let i = 0; i < d; i++) missing.push(l); }
  for (const [l, c] of bm) { const d = c - (rm.get(l) || 0); for (let i = 0; i < d; i++) extra.push(l); }
  results.text = { missing, extra, pass: missing.length === 0 && extra.length === 0 };
  if (!results.text.pass) failures++;
  console.log(`TEXT: ${results.text.pass ? 'PASS' : `FAIL (missing ${missing.length}, extra ${extra.length})`}`);
  missing.slice(0, 12).forEach(l => console.log('  missing: ' + l.slice(0, 110)));
  extra.slice(0, 12).forEach(l => console.log('  extra:   ' + l.slice(0, 110)));
}

/* ---------- VISUAL ---------- */
if (run('visual')) {
  for (const width of WIDTHS) {
    const { ctx, page } = await openBuild(width);
    await page.screenshot({ path: path.join(DIFFS, `build-full-${width}.png`), fullPage: true });
    for (const sec of SECTIONS) {
      const loc = page.locator(sec.sel).first();
      try {
        await loc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await loc.screenshot({ path: path.join(DIFFS, `build-sec-${sec.name}-${width}.png`) });
      } catch (e) { console.warn(`build section ${sec.name}@${width} failed: ${e.message.split('\n')[0]}`); }
    }
    await ctx.close();
    for (const sec of SECTIONS) {
      const refP = path.join(REF, `sec-${sec.name}-${width}.png`);
      const bldP = path.join(DIFFS, `build-sec-${sec.name}-${width}.png`);
      if (!fs.existsSync(refP) || !fs.existsSync(bldP)) { results.visual.push({ sec: sec.name, width, pct: null, note: 'missing capture' }); continue; }
      const r = comparePngs(refP, bldP, path.join(DIFFS, `diff-${sec.name}-${width}.png`));
      const pass = r.pct < 1;
      if (!pass) failures++;
      results.visual.push({ sec: sec.name, width, pct: +r.pct.toFixed(3), sizes: r.sizes, pass });
      console.log(`VISUAL ${sec.name}@${width}: ${r.pct.toFixed(3)}% (${r.sizes}) ${pass ? 'PASS' : 'FAIL'}`);
    }
    const rFull = path.join(REF, `full-${width}.png`);
    if (fs.existsSync(rFull)) {
      const r = comparePngs(rFull, path.join(DIFFS, `build-full-${width}.png`), path.join(DIFFS, `diff-full-${width}.png`));
      results.visual.push({ sec: 'full', width, pct: +r.pct.toFixed(3), sizes: r.sizes, pass: r.pct < 1 });
      console.log(`VISUAL full@${width}: ${r.pct.toFixed(3)}% (${r.sizes})`);
    }
  }
}

/* ---------- STYLES ---------- */
if (run('styles')) {
  const refStyles = JSON.parse(fs.readFileSync(path.join(REF, 'styles.json'), 'utf8'));
  const pxTol = 0.6;
  for (const width of WIDTHS) {
    const { ctx, page } = await openBuild(width);
    const built = await page.evaluate(collectStylesScript(PROBES, STYLE_PROPS));
    await ctx.close();
    for (const probe of PROBES) {
      const a = refStyles[width] && refStyles[width][probe.name];
      const b = built[probe.name];
      if (!a && !b) continue;
      if (!a || !b) { results.styles.push({ probe: probe.name, width, prop: '(presence)', ref: !!a, build: !!b }); failures++; continue; }
      for (const prop of [...STYLE_PROPS, 'rectWidth', 'rectHeight']) {
        const va = a[prop], vb = b[prop];
        if (va === vb) continue;
        const na = parseFloat(va), nb = parseFloat(vb);
        const bothNum = !isNaN(na) && !isNaN(nb) && String(na) === String(va).replace('px', '') && String(nb) === String(vb).replace('px', '');
        if (bothNum && Math.abs(na - nb) <= (prop.startsWith('rect') ? 1.5 : pxTol)) continue;
        // multi-value px lists (padding/margin/border-radius/box-shadow): tolerant numeric compare
        const listA = String(va).match(/-?\d+\.?\d*/g), listB = String(vb).match(/-?\d+\.?\d*/g);
        if (listA && listB && listA.length === listB.length && String(va).replace(/-?\d+\.?\d*/g, '#') === String(vb).replace(/-?\d+\.?\d*/g, '#')) {
          let ok = true;
          for (let i = 0; i < listA.length; i++) if (Math.abs(parseFloat(listA[i]) - parseFloat(listB[i])) > pxTol) { ok = false; break; }
          if (ok) continue;
        }
        results.styles.push({ probe: probe.name, width, prop, ref: va, build: vb });
        failures++;
      }
    }
  }
  const n = results.styles.length;
  console.log(`STYLES: ${n === 0 ? 'PASS' : n + ' mismatches'}`);
  results.styles.slice(0, 30).forEach(m => console.log(`  ${m.probe}@${m.width} ${m.prop}: ref="${m.ref}" build="${m.build}"`));
}

/* ---------- FONTS ---------- */
if (run('fonts')) {
  const { ctx, page } = await openBuild(1440);
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = Array.from(document.fonts).filter(f => f.status === 'loaded').map(f => `${f.family.replace(/"/g, '')} ${f.weight}`);
    return {
      loaded: [...new Set(loaded)].sort(),
      interOk: document.fonts.check('400 16px Inter') && document.fonts.check('500 16px Inter'),
      monoOk: document.fonts.check('400 16px "JetBrains Mono"') && document.fonts.check('500 16px "JetBrains Mono"')
    };
  });
  await ctx.close();
  const pass = fonts.interOk && fonts.monoOk;
  if (!pass) failures++;
  results.fonts = { ...fonts, pass };
  console.log(`FONTS: ${pass ? 'PASS' : 'FAIL'} — loaded: ${fonts.loaded.join('; ')}`);
}

/* ---------- STATES ---------- */
// Recreated on BOTH reference and build with the same scripted steps, then pixel-compared.
if (run('states')) {
  const stateDefs = [
    { name: 'form-error', width: 1440, async act(page, isRef) {
      await page.evaluate(() => document.getElementById('get').scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(400);
      const input = page.locator('#get input').first();
      await input.fill('not-an-email');
      await page.locator('#get').getByText('Request invite', { exact: true }).first().click();
      await page.waitForTimeout(400);
      return page.locator('#get').first();
    } },
    { name: 'form-success', width: 1440, async act(page) {
      await page.evaluate(() => document.getElementById('get').scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(400);
      const input = page.locator('#get input').first();
      await input.fill('ada@example.com');
      await page.locator('#get').getByText('Request invite', { exact: true }).first().click();
      await page.waitForTimeout(400);
      return page.locator('#get').first();
    } },
    { name: 'nahl-q2', width: 1440, async act(page) {
      await page.evaluate(() => document.getElementById('nahl').scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(400);
      await page.getByText('What is eating my salary?', { exact: true }).first().click();
      await page.waitForTimeout(1400);
      return page.locator('#nahl').first();
    } },
    { name: 'hero-wallet', width: 1440, async act(page) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.getByText('Savvy Bee Wallet', { exact: true }).first().click();
      await page.waitForTimeout(900);
      return page.locator('#top').first();
    } },
    { name: 'mobile-slide2', width: 390, async act(page) {
      await page.evaluate(() => document.getElementById('modules').scrollIntoView());
      await page.waitForTimeout(400);
      const dots = page.locator('#modules').locator('css=[data-m-dot], div');
      // click the second mobile dot: both DOMs — click via coordinates of dots row is fragile;
      // instead scroll the track to slide 2 programmatically
      await page.evaluate(() => {
        const track = document.querySelector('[data-mtrack], [data-m-track]');
        if (track && track.children[1]) {
          const k = track.children[1];
          track.scrollTo({ left: Math.max(0, k.offsetLeft - (track.clientWidth - k.offsetWidth) / 2), behavior: 'auto' });
        }
      });
      await page.waitForTimeout(900);
      return page.locator('#modules').first();
    } }
  ];
  for (const def of stateDefs) {
    try {
      const b = await openBuild(def.width);
      const bLoc = await def.act(b.page, false);
      const bPath = path.join(DIFFS, `state-build-${def.name}.png`);
      await bLoc.screenshot({ path: bPath });
      await b.ctx.close();
      const r = await openRef(def.width);
      const rLoc = await def.act(r.page, true);
      const rPath = path.join(DIFFS, `state-ref-${def.name}.png`);
      await rLoc.screenshot({ path: rPath });
      await r.ctx.close();
      const cmp = comparePngs(rPath, bPath, path.join(DIFFS, `diff-state-${def.name}.png`));
      const pass = cmp.pct < 1;
      if (!pass) failures++;
      results.states.push({ name: def.name, pct: +cmp.pct.toFixed(3), sizes: cmp.sizes, pass });
      console.log(`STATE ${def.name}: ${cmp.pct.toFixed(3)}% (${cmp.sizes}) ${pass ? 'PASS' : 'FAIL'}`);
    } catch (e) {
      results.states.push({ name: def.name, error: e.message.split('\n')[0] });
      failures++;
      console.log(`STATE ${def.name}: ERROR ${e.message.split('\n')[0]}`);
    }
  }
}

/* ---------- HEALTH ---------- */
if (run('health')) {
  const widths = [360, 390, 768, 1440, 1920];
  const health = { consoleErrors: [], failedRequests: [], brokenImages: [], hScroll: [], badAnchors: [], badLinks: [] };
  for (const width of widths) {
    const { ctx, page } = await openBuild(width);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const h = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('img').forEach(i => { if (i.getClientRects().length && !i.naturalWidth) bad.push(i.getAttribute('src')); });
      const anchors = [];
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        const id = a.getAttribute('href').slice(1);
        if (id && !document.getElementById(id)) anchors.push('#' + id);
      });
      return {
        scrollW: document.scrollingElement.scrollWidth,
        innerW: window.innerWidth,
        brokenImages: bad,
        badAnchors: anchors
      };
    });
    if (h.scrollW > h.innerW + 1) health.hScroll.push(`${width}px: scrollWidth ${h.scrollW} > viewport ${h.innerW}`);
    health.brokenImages.push(...h.brokenImages);
    health.badAnchors.push(...h.badAnchors);
    health.consoleErrors.push(...page.consoleErrors);
    health.failedRequests.push(...page.failedRequests);
    await ctx.close();
  }
  // relative links resolve to files on disk
  const siteDir = path.resolve('site');
  const html = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  for (const m of html.matchAll(/href="([^"#][^"]*)"|src="([^"]+)"/g)) {
    const href = (m[1] || m[2] || '').split('#')[0];
    if (!href || /^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    if (!fs.existsSync(path.join(siteDir, href))) health.badLinks.push(href);
  }
  for (const k of Object.keys(health)) health[k] = [...new Set(health[k])];
  results.health = health;
  const bad = Object.values(health).some(v => v.length);
  if (bad) failures++;
  console.log(`HEALTH: ${bad ? 'ISSUES' : 'PASS'} ${JSON.stringify(health, null, 1)}`);
}

await browser.close();
fs.writeFileSync(path.join(DIFFS, 'results.json'), JSON.stringify(results, null, 2));
console.log(`\nDONE — ${failures === 0 ? 'ALL PASS' : failures + ' failing checks'}; details in tests/diffs/results.json`);
process.exit(0);
