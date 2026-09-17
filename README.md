# Savvy Bee — Landing Site

Live at **https://mysavvybee.com** (hosted on Netlify, site name `savvy-bee`).

## What's where

```
site/                    ← THE WEBSITE. Everything deployed lives here. No build step.
│  index.html               landing page
│  about.html               about page (team, track record, hero video)
│  legal.html               terms / privacy / fees / complaints (tabbed)
│  Savvy Bee Prototype.html the 46-screen in-app demo (shipped as-is — do not edit)
│  css/  js/  assets/       styles, scripts, images + self-hosted fonts
docs/                    inventory, design conflicts, open questions, fidelity report
tests/                   Playwright verification suites (pixel-compare vs the design export)
landing-page-handoff*/   the original design bundles (source of truth for the design)
```

## Editing

The site is plain HTML/CSS/vanilla JS — edit files in `site/` directly.
The design system rules (colours, type, spacing) are documented in
`landing-page-handoff- updated/BRIEF.md`; the CSS tokens live in `site/css/main.css` (`:root`).

Preview locally (any static server works):

```bash
python3 -m http.server 8131 -d site
# → http://localhost:8131
```

## Deploying

Deploys are manual via the Netlify CLI (run from the repo root):

```bash
npm install                       # once
npx netlify login                 # once, browser auth
npx netlify deploy --prod --dir=site --site a6806032-e359-4011-a28e-ddb00b248039
```

## Verifying changes against the design

```bash
npm install && npx playwright install chromium
npm run serve:ref &   # design export on :8130
npm run serve:site &  # the site on :8131
npm run verify        # landing suite → tests/diffs/
node tests/verify-pages.mjs   # about/legal/demo suite
```

## Known open items

- Waitlist form has **no backend** — it validates and shows success locally only.
- Legal page copy is **draft** (visible banner) pending counsel sign-off.
- See `docs/QUESTIONS.md` and `docs/FIDELITY_REPORT.md` for the full list.
