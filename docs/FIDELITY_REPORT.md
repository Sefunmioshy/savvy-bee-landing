# FIDELITY REPORT — Savvy Bee Landing Page Rebuild

## Update 2 — second handoff bundle (`landing-page-handoff- updated/`)

The second bundle (see its WHATS-NEW.md) left the landing page byte-identical and added three in-scope items. All are now live in `site/` and verified (`tests/verify-pages.mjs`):

| Item | What was done | Result |
|---|---|---|
| **Demo** (`Savvy Bee Prototype.html`, BRIEF §14) | Shipped as-is into `site/`; the overlay iframe now loads `Savvy%20Bee%20Prototype.html#Home.dc.html` (placeholder `demo.html` removed). | Loader completes on real iframe load; prototype renders the Home screen; mobile fullscreen variant scales the phone correctly (`tests/diffs/tour-real-prototype.png`, `tour-mobile-real.png`). The prototype's own Screens picker / Chaos toggle are part of the shipped file. **Its fit/overscroll shell must travel with it if ever hosted separately.** |
| **Legal** (`Legal.dc.html`, BRIEF §12) | Stub replaced with the full tabbed rebuild (`legal.html` + `js/legal.js`): four documents verbatim, draft banner, hash-synced tabs, next-document cycle, its own footer. | TEXT zero-diff vs the export's live render; VISUAL **0.000%** at 390/768/1440; deep-link `#fees`, tab click → hash write, and `hashchange` → tab sync all pass. |
| **About** (`About.dc.html`, BRIEF §13) | Stub replaced with the full static rebuild (`about.html`): founders, education/selected lists, chips, three work entries with photos, closing CTA, its own footer. Exploratory-conversations wording reproduced verbatim (BRIEF §13 claims-posture note). | TEXT zero-diff; VISUAL **0.000%** at 390/768/1440. |
| Landing regression | `js/main.js` demo target changed; full landing suite re-run. | ALL PASS (unchanged numbers, table below). |

Lighthouse (gzip server, mobile): **about** 93 / 91 / 100 / 100 · **legal** 100 / 88 / 100 / 100. Legal's accessibility 88 is design-bound: the tab numbers/hints use the design's `#9C9A95` on canvas, and the footer's stacked 12.5px contact links sit on a 23px pitch — 1px under the WCAG 24px target-spacing rule; changing either would alter the design. Landing's scores are unchanged (96 / 91 / 100 / 100).

**Update 3 — About hero video (client request, 16 Sep 2026).** A YouTube Short (`iDice Application by Savvy Bee Limited`) is embedded in the About hero, left of the copy — a sanctioned deviation from the export, logged in CONFLICTS.md #13. Uses the privacy-enhanced `youtube-nocookie.com` domain (no cookies until play, consistent with the privacy notice) and lazy loading. Verification updated: About's hero is excluded as intentional; the sections below it (#team, #work, footer) still pixel-match the export at 0.000–0.13% across 390/768/1440, and About's text check allows exactly one extra line (the video caption).

Still open (BRIEF §11 items 18–21): fee figures and legal copy need counsel sign-off — the DRAFT FOR REVIEW banner stays until then; the exploratory wording on About must not be edited; the three pages intentionally keep their separate footers as designed (item 20 unanswered). The waitlist backend remains the one unwired integration.

---


Rebuilt from `landing-page-handoff/` (Claude Design export) as plain HTML + CSS + vanilla JS in `site/`.
Reference for all comparisons: the export's own render (`design-export/Savvy Bee Landing (standalone).html`) captured with Playwright under `prefers-reduced-motion: reduce` (deterministic — timers stopped, reveal instant, coverflow flat), same recipe applied to the build. Verification ran 3 rounds; rounds 2–3 pass everything.

## Check results

| Check | Result |
|---|---|
| 1. TEXT — visible text vs `tests/reference/text.txt` | ✅ PASS — zero missing, zero changed, zero extra lines (506 lines) |
| 2. VISUAL — pixelmatch per section at 390 / 768 / 1440 | ✅ PASS — every section < 0.07% (target < 1%) |
| 3. STYLES — 35 computed-style probes × 3 widths | ✅ PASS — all font/colour/spacing/radius/shadow/size values match (tolerance 0.6px) |
| 4. FONTS — `document.fonts` | ✅ PASS — Inter 400/500 + JetBrains Mono 400/500 loaded (self-hosted woff2, Google's exact @font-face + unicode-ranges); no fallback rendering |
| 5. STATES — recreated on both reference and build, pixel-compared | ✅ PASS — see below |
| 6. HEALTH | ✅ PASS — 0 console errors, 0 request failures, 0 broken images, no horizontal scroll at 360/390/768/1440/1920, all anchors + file links resolve |
| Lighthouse (gzip static server, mobile) | ✅ Performance **96** · Accessibility **91** · Best Practices **100** · SEO **100** |

## Visual diff percentages (final round)

| Section | 390 | 768 | 1440 |
|---|---|---|---|
| header | 0.000% | 0.000% | 0.000% |
| hero | 0.067% | 0.058% | 0.040% |
| nahl | 0.000% | 0.000% | 0.000% |
| modules | 0.000% | 0.000% | 0.000% |
| get (waitlist) | 0.000% | 0.000% | 0.000% |
| footer | 0.000% | 0.000% | 0.000% |
| full page | 0.019% | 0.013% | 0.005% |

The hero's residual hundredths-of-a-percent are sub-pixel antialiasing on the coverflow card edges and the phone bezel curve — invisible at 1:1 (see `tests/diffs/diff-hero-1440.png`).

### States

| State | Diff | Notes |
|---|---|---|
| form-error | 0.255% ✅ | includes the build's added keyboard focus ring on the refocused input (sanctioned addition) |
| form-success | 0.000% ✅ | |
| nahl-q2 (chip 2 answered) | 0.000% ✅ | |
| hero-wallet (card 2 selected) | 0.145% ✅ | sub-pixel card edges |
| mobile-slide2 (swipe track) | 0.000% ✅ | |
| default-motion coverflow | eyeballed ✅ | timing-dependent, not pixel-diffable; `tests/diffs/motion-{ref,build}-hero.png` are frame-identical |
| demo overlay | chrome ✅, iframe content differs by design | the 46-screen prototype is not in the bundle; the overlay, scrim, loader (46 ticks, fake progress, status strings) are faithful — the iframe shows a labelled placeholder (`site/demo.html`) |

Note: the handoff has no `screenshots/states/` directory — the two capture limitations in `screenshots/README.md` mean interaction states were never captured. States were therefore recreated live on the standalone export and compared against the build, which is stronger than comparing to static state screenshots.

Diff images: `tests/diffs/diff-<section>-<width>.png`, `tests/diffs/diff-state-<name>.png`. Raw numbers: `tests/diffs/results.json`. Lighthouse: `tests/diffs/lighthouse.json`.

## Remaining differences, and why

1. **Demo overlay iframe content** — the prototype file (`Savvy Bee Prototype.html`) exists only inside the standalone bundle blob, not as a deployable file. Placeholder shipped; TODO below.
2. **Two Lighthouse accessibility audits stay flagged by design** (score still 91 ≥ 90):
   - `color-contrast`: inactive scope rows / labels use the design's `#9C9A95` on `#F8F6F1` (≈2.7:1). Changing the colour would break fidelity.
   - `target-size`: the 5px carousel/module dots are the design. Invisible 24×24 hit areas were added (real usability win) but the audit measures the element box only.
3. **Sanctioned behaviour deviation**: the module auto-cycle advances modulo the module's real panel count instead of the export's `% 3` — the export bug the handoff explicitly instructs fixing (Spend's Subscriptions panel is now reachable by auto-cycle).
4. **Additions that do not change at-rest visuals** (required by the build spec, absent from the export): semantic elements (`main`, `header`, `nav`, `h1–h3`, real `<button>`/`<form>`/`<input type>`), alt text, `:focus-visible` rings (amber; keyboard-only), Escape closes the demo overlay, meta/OG/favicon/`lang="en-NG"`, self-hosted fonts.

## Conflicts (full detail in docs/CONFLICTS.md)

- Screenshots vs export: missing module devices + missing waitlist card in the handoff screenshots are capture artefacts; export render wins.
- BRIEF says nav/footer links hover amber; the export's inline colours mean they never actually change on hover. Rebuild matches the export's rendered behaviour.
- BRIEF's ₦23k/₦7k "Other" legend figures are the compact formatter's rounding of 22,500/7,300 — not a discrepancy.

## TODOs

1. **Waitlist backend** — form validates and shows the success state locally only (decision: local stub). Wire `site/js/main.js` (`getForm` submit handler) to an endpoint/CRM when chosen.
2. **Demo prototype** — point the overlay iframe (`demo.html` references in `site/js/main.js`) at the real 46-screen prototype when it is exported/hosted.
3. **About / Legal pages** — shipped as clearly-labelled "coming soon" stubs (`about.html`, `legal.html` with `#team/#terms/#privacy/#fees/#complaints` anchors, `noindex`). Real pages are out of scope (BRIEF). Legal fee figures in the source project were unconfirmed — nothing was reproduced.
4. **Domain** — meta/canonical/OG assume `https://mysavvybee.com/`; confirm before launch.
5. **OG image** — `site/assets/og.png` (1200×630) generated from the design's own tokens; replace if marketing wants something richer.

## Flagged copy notes (kept verbatim, not "fixed")

- `NO SPAM · ONE MESSAGE WHEN IT'S YOUR TURN` — authored uppercase.
- `Ajo and esusu`, `Detty December`, `Japa fund` — intentional local vocabulary.
- Mixed apostrophe styles in source (`month’s` typographic in module copy vs `You're` ASCII in device copy) — reproduced exactly as authored.
- `© 2026 SAVVY BEE LTD` — future-dated in the design; kept.

## Running locally

```bash
cd Tuns
python3 -m http.server 8131 -d site        # → http://localhost:8131
# or, with gzip + cache headers (what production serves):
node tests/serve-gzip.mjs                  # → http://localhost:8132
```
The site is static — no build step. Everything in `site/` is the deployable artefact; `package.json`/`tests/` are dev-only and must not ship.

Re-run verification any time:
```bash
npm install && npx playwright install chromium
npm run serve:ref &   # serves the design export on :8130
npm run serve:site &  # serves the build on :8131
npm run capture       # regenerate tests/reference from the export
npm run verify        # full check suite → tests/diffs/
```

## Deploying

**Netlify:** drag the `site/` folder into app.netlify.com/drop, or:
```bash
npm i -g netlify-cli
netlify deploy --dir=site --prod
```
**Vercel:**
```bash
npm i -g vercel
vercel --prod site
```
Both serve gzip/brotli + HTTP/2 by default, matching the Lighthouse configuration. No headers/redirects config is required. If/when the waitlist gets a backend on Netlify, the form can switch to Netlify Forms with a `data-netlify` attribute.
