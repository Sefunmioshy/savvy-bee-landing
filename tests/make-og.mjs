// Generates site/assets/og.png (1200x630) in the page's own design language.
import { chromium } from 'playwright';
import path from 'node:path';

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="http://localhost:8131/css/fonts.css">
<style>
  html,body{margin:0}
  body{width:1200px;height:630px;background:#F8F6F1;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box}
  .brand{display:flex;align-items:center;gap:14px}
  .brand span{font-size:26px;font-weight:500;letter-spacing:-0.01em;color:#1C1917}
  h1{font-size:64px;font-weight:400;letter-spacing:-0.035em;line-height:1.05;margin:36px 0 0;color:#1C1917;max-width:900px}
  .pill{display:inline-flex;align-items:center;gap:10px;height:38px;padding:0 17px;border-radius:50px;border:0.5px solid #E8E5DE;background:#fff;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:0.06em;color:#6B6860;margin-top:40px;align-self:flex-start}
  .dot{width:7px;height:7px;border-radius:50%;background:#B8860B}
</style></head><body>
  <div class="brand">
    <svg width="42" height="46" viewBox="0 0 20 22" fill="none"><path d="M10 1.2l7.6 4.4v8.8L10 18.8 2.4 14.4V5.6z" stroke="#B8860B" stroke-width="1.2" stroke-linejoin="round"></path><path d="M10 6.6l3 1.7v3.4l-3 1.7-3-1.7V8.3z" stroke="#B8860B" stroke-width="1.2" stroke-linejoin="round"></path></svg>
    <span>Savvy Bee</span>
  </div>
  <h1>Every account you have, finally in one place.</h1>
  <div class="pill"><span class="dot"></span>PRIVATE BETA · ABUJA</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: path.resolve('site/assets/og.png') });
await browser.close();
console.log('og.png written');
