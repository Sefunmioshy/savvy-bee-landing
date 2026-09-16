# Handoff: Savvy Bee Landing Page

## Overview
The public marketing page for Savvy Bee — an AI-native financial operating system for the Nigerian market. The page states the proposition, demonstrates the AI copilot ("Nahl") with four real question-and-answer pairs, walks four product modules against live mobile screens, and converts to a private-beta waitlist.

## About the design files
**The HTML files in this bundle are design references, not production code.** They are prototypes that show the intended look and behaviour. Do not lift them into production.

The task is to **recreate these designs in the target codebase's own environment** — React, Next.js, Vue, whatever is established — using its existing component patterns, styling approach and libraries. If no environment exists yet, choose an appropriate framework and implement there.

Two specific reasons not to copy the source directly:
1. The prototypes are built on a bespoke template runtime (`support.js`, `<x-dc>`, `<sc-for>`, `<dc-import>`) that has no place in a real codebase.
2. All styling is inline. That was a constraint of the prototyping environment, not a design decision. Move it to whatever the target codebase uses.

## Fidelity
**High-fidelity.** Colours, typography, spacing, radii, borders, transitions and copy are all final. Recreate the UI pixel-for-pixel. Every value is documented in `BRIEF.md` at the root of this bundle — that is the authoritative spec and it is exhaustive. This README is the orientation; BRIEF.md is the detail.

## What to read, in order
1. **`../BRIEF.md`** — the full extraction. Page map, every piece of copy verbatim, every colour, every type style, every component with its states, all motion specs, responsive behaviour, and a list of open questions. Start here.
2. **`../screenshots/`** — full-page captures at 1440 / 768 / 390, plus interaction states.
3. **The source files below** — when you need to see exactly how something is composed.

## Screens / views
One page, seven regions, top to bottom:

| Region | Anchor | Purpose |
|---|---|---|
| Sticky header | — | Nav + demo entry |
| Hero | `#top` | Proposition, both CTAs, live phone with a 5-card account carousel |
| Nahl | `#nahl` | Dark band. Four tappable questions, animated answers |
| Modules | `#modules` | Four modules (Spend / Save / Invest / Circles) against four device components |
| Waitlist | `#get` | Primary conversion — one field, validated |
| Footer | — | Legal text, contact, three link columns |
| Demo overlay | — | Fullscreen/modal iframe of the mobile prototype, with a fake progress loader |

Full layout, copy and component specs for each: BRIEF.md §3 and §5.

## Interactions & behaviour
Documented in full in BRIEF.md §7. The ones that will take the most implementation effort:

1. **Hero coverflow carousel** — five cards in 3D (`perspective:1100px`, per-card `rotateY`), driven by an 8-step auto-advance timeline that also scrolls the phone body. Any user tap stops the timeline permanently.
2. **Desktop pinned-scroll modules** — a sticky device column beside four tall copy blocks. A rAF-throttled scroll listener computes a 0–1 weight per block from its distance to the viewport centre, and that weight drives copy opacity, copy translate, a progress rail, tick-rail heights, device scale and device drift. This is the signature interaction of the page.
3. **Mobile swipe track** — below 900px the whole modules section becomes a `scroll-snap` carousel; the nearest-slide calculation drives the copy above it.
4. **Nahl Q&A** — 850ms thinking state with three staggered pulsing dots, then the answer fades and lifts in.
5. **Demo overlay** — a synthetic progress counter that caps at 92% and completes only when the iframe fires `onLoad`, with a 46-tick bar and a four-stage status label.

**All motion must respect `prefers-reduced-motion: reduce`.** The prototype checks it and collapses every animation; see BRIEF.md §7 for exactly what changes.

## State management
The page is one stateful component. State needed:

| State | Type | Drives |
|---|---|---|
| `contact` | string | Waitlist input value |
| `signupError` | string | Inline error message + input border colour |
| `joined` | boolean | Swaps the form for the success message |
| `tourOpen` | boolean | Demo overlay; also locks `body.overflow` |
| `tourLoading`, `tourPct`, `tourFade` | boolean / number / boolean | Demo loader |
| `heroStep` | 0–7 | Position in the hero auto-advance timeline |
| `heroManual` | boolean | Permanently stops the hero timeline after any tap |
| `nahl` | 0–3 | Selected Nahl question |
| `thinking` | boolean | Nahl thinking dots |
| `active` | 0–3 | Module nearest the viewport centre (desktop) |
| `mSlide` | 0–3 | Module nearest the track centre (mobile) |
| `steps` | number[4] | Which panel each device shows |
| `manual` | boolean[4] | Per-module flag stopping that module's auto-cycle |
| `mw` | number[4] | Per-module scroll weight, 0–1 |
| `mOff` | number | Active module's normalised scroll offset, ±1 |
| `wide` | boolean | `innerWidth >= 900` — the only breakpoint |

**Data fetching:** none. Every figure on the page is static, hard-coded demo data (documented in BRIEF.md §3.1). The only network dependency is Google Fonts. The waitlist form has **no backend** — see open question 1.

## Design tokens
BRIEF.md §4 has the complete set with usage notes. In summary:

- **Neutrals:** `#F8F6F1` canvas · `#FFFFFF` surface · `#F0EDE6` secondary surface · `#E8E5DE` border · `#D8D4CC` muted · `#1C1917` ink · `#6B6860` text secondary · `#9C9A95` text tertiary
- **Dark band:** `#0F0F0D` background · `#1A1A17` surface · `#2C2A25` border
- **Brand:** `#B8860B` amber on light · `#EF9F27` amber on dark
- **Semantic:** `#0D7A5F` teal · `#A32D2D` red · `#185FA5` blue · `#3C3489` purple · `#D4537E` coral
- **Type:** Inter (400, 500 only — never 700) and JetBrains Mono (400, 500) from Google Fonts. Every heading is weight 400; only sub-headings and labels use 500. **Type carries hierarchy, not weight.**
- **Container:** 1180px max, gutter `clamp(18px,4vw,32px)`
- **Borders:** always `0.5px` hairlines
- **Radii:** 50px pills · 12px cards · 8px inputs
- **Shadows:** exactly one in the whole page (`0 10px 30px rgba(0,0,0,0.08)` on hero carousel cards). Everything else is flat.
- **No gradients anywhere.** The design system forbids them.
- **Breakpoint:** one, at 900px, and it is a JS check — the prototype has no CSS media queries. Everything else is `clamp()` and `auto-fit` grids.

## Assets
Three PNGs, all inside the hero phone frame:

| File | Size | Use |
|---|---|---|
| `assets/home-chrome-top.png` | 393×108 | Phone status bar + app header |
| `assets/home-body.png` | 393×1400 | The Combined-state screen body |
| `assets/home-chrome-bottom.png` | 393×146 | Nahl bar + tab bar |

Everything else is inline SVG (logo, play triangle, robot, cube, arrows, close). **There is no standalone logo SVG file, no favicon and no Open Graph image** — see BRIEF.md §6 and the open questions.

## Files in this bundle
| File | What it is |
|---|---|
| `Landing.dc.html` | **The landing page.** The one to rebuild. |
| `Spend Device.dc.html` | Device component — 4 panels (Spend home, Budgets, Heatmap, Subscriptions) |
| `Save Device.dc.html` | Device component — 3 panels, third is the capsules grid |
| `Invest Device.dc.html` | Device component — 3 panels |
| `Circle Device.dc.html` | Device component — 3 panels |
| `support.js` | The prototyping runtime. **Reference only — do not port.** |
| `Savvy Bee Landing (standalone).html` | Self-contained single file, everything inlined. Open it in a browser to see the real thing with no server. |

Out of scope but linked from the page: `About.dc.html`, `Legal.dc.html`, and the in-app prototype loaded by the demo overlay. See BRIEF.md "SCOPE".

## Before you start
BRIEF.md §11 lists 19 open questions. Four of them block implementation:

1. **The waitlist form has no destination.** It validates and then sets local state. Needs an endpoint or CRM.
2. **No hover, active, focus or disabled states are defined for any button.** The only hover rule in the document is `a:hover { color:#B8860B }`.
3. **The form input has `outline:none` with no replacement focus ring.** An accessibility gap that needs a defined focus style.
4. **No page title, meta description, OG tags, favicon or `lang` attribute.**

There is also one known bug worth fixing rather than reproducing: the module auto-cycle advances `% 3`, so the Spend module's fourth panel (Subscriptions) is never reached automatically. It should be the panel count per module.
