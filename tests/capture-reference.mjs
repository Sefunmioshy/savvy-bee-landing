// Phase 1 — capture the reference (the standalone design export) with Playwright.
// Full-page + per-section screenshots at 390/768/1440, visible text, computed styles.
// Captures run with prefers-reduced-motion: reduce so both reference and build are
// deterministic (timers stopped, reveal instant, coverflow flat) — the exact same
// recipe is used on the build in tests/verify.mjs, so comparisons are like-for-like.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { WIDTHS, SECTIONS, PROBES, STYLE_PROPS, collectStylesScript, normalizeText, settle } from './lib.mjs';

const REF_URL = process.env.REF_URL || 'http://localhost:8130/Savvy%20Bee%20Landing%20(standalone).html';
const OUT = path.resolve('tests/reference');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
try {
  const styles = {};
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
      deviceScaleFactor: 1
    });
    const page = await ctx.newPage();
    await page.goto(REF_URL, { waitUntil: 'load' });
    // wait for the self-extracting bundle to finish and the landing DOM to exist
    await page.waitForSelector('#top', { timeout: 60000 });
    await page.waitForSelector('#__bundler_loading', { state: 'detached', timeout: 60000 }).catch(() => {});
    await settle(page, 1200);
    await page.screenshot({ path: path.join(OUT, `full-${width}.png`), fullPage: true });
    for (const sec of SECTIONS) {
      const loc = page.locator(sec.sel).first();
      try {
        await loc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await loc.screenshot({ path: path.join(OUT, `sec-${sec.name}-${width}.png`) });
      } catch (e) {
        console.warn(`section ${sec.name}@${width}: ${e.message.split('\n')[0]}`);
      }
    }
    // reset scroll for style probes
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    styles[width] = await page.evaluate(collectStylesScript(PROBES, STYLE_PROPS));
    if (width === 1440) {
      const text = await page.evaluate(() => document.body.innerText);
      fs.writeFileSync(path.join(OUT, 'text.txt'), normalizeText(text));
      const fonts = await page.evaluate(() => Array.from(document.fonts).filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight}`));
      fs.writeFileSync(path.join(OUT, 'fonts.json'), JSON.stringify([...new Set(fonts)].sort(), null, 2));
    }
    if (width === 390) {
      const text = await page.evaluate(() => document.body.innerText);
      fs.writeFileSync(path.join(OUT, 'text-390.txt'), normalizeText(text));
    }
    await ctx.close();
    console.log(`captured ${width}`);
  }
  fs.writeFileSync(path.join(OUT, 'styles.json'), JSON.stringify(styles, null, 2));
  console.log('reference capture complete');
} finally {
  await browser.close();
}
