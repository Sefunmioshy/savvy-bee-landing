# OPEN QUESTIONS

> **Updated after the second handoff bundle (`landing-page-handoff- updated/`):**
> - #5 (demo iframe target) — **RESOLVED**: `Savvy Bee Prototype.html` now ships in `site/` as-is (BRIEF §14); the overlay loads it. If the demo is ever hosted separately, the file must move with its built-in fit/overscroll shell.
> - #6 (About/Legal) — **RESOLVED**: both pages are now in scope (BRIEF §12–§13) and fully rebuilt at `about.html` / `legal.html`, replacing the stubs.
> - Still open from the new BRIEF §11: fee figures need sign-off (item 18); legal copy needs counsel — the DRAFT FOR REVIEW banner stays until then (item 19); whether the three pages should share one footer (item 20 — currently each page keeps its own footer, exactly as designed); the exploratory-conversations wording on About must not be edited (item 21).

## Blocking (the four from BRIEF §11 / README)

1. **Waitlist form destination.** The export validates and sets local state only. Options: (a) keep local-only success (faithful stub, log TODO), (b) Netlify/Vercel form handling, (c) a provided endpoint/CRM. Which?
2. **Button hover/active/focus/disabled states.** None are defined anywhere; the only hover rule is `a:hover { color:#B8860B }`. Proposal: keep rest/hover appearance exactly as the export, and add only a keyboard `:focus-visible` ring (2px `#B8860B` offset 2px light surfaces / `#EF9F27` on dark) so accessibility passes without changing the mouse experience. OK?
3. **Input focus ring.** Export has `outline:none` with no replacement. Same proposal: `:focus-visible` ring only (`#EF9F27` on the dark card). OK?
4. **Meta/SEO.** Use BRIEF §9 suggestions? — title `Savvy Bee — Every account you have, finally in one place.`, description = hero body trimmed to ~155 chars, `lang="en-NG"`, favicon generated from the hex logo SVG, OG title/description matching, OG image TODO (needs 1200×630 — generate a simple canvas-colour + hex-logo one, or leave TODO?). Domain assumed `mysavvybee.com` for canonical/OG URLs.

## Also need answers

5. **Demo overlay iframe target.** `Savvy Bee Prototype.html` is not in the bundle. Options: (a) stub — overlay opens with faithful loader, iframe points at a placeholder page and a TODO is logged; (b) you supply the prototype file/URL; (c) omit demo buttons (NOT recommended — changes the design). Default: (a).
6. **About / Legal / Team link destinations.** Out-of-scope pages, not shipped. Keep hrefs verbatim (`About.dc.html`, `Legal.dc.html#…` — will 404), or point at `#` stubs with TODO? Default: keep verbatim + log TODO.
7. **Email or phone signup mode?** Export defaults to email. Default: email.
8. **Auto-cycle `% 3` bug** — README instructs fixing to per-module panel count. Confirm fix (default: fix).
9. **Fonts: Google Fonts CDN (exactly as export) or self-hosted woff2?** Export loads from Google Fonts. Self-hosting is better for performance/privacy and allowed by the task ("self-host from assets/fonts, or load the exact same Google Fonts families AND weights"). Default: self-host Inter 400/500 + JetBrains Mono 400/500 woff2, `font-display:swap`.
10. **Hosting target** — Netlify or Vercel for the deploy instructions? (Report will include both if unanswered.)
