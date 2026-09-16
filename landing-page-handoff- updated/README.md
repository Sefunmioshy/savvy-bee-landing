# Savvy Bee — Landing Page Handoff

> **Already have the first zip?** This one replaces it — delete the old one.
> Read `WHATS-NEW.md` first; it is a four-item diff, and work already done on
> the landing page is unaffected.

## Read in this order

1. **`BRIEF.md`** — the spec. Exhaustive, verbatim extraction of the final
   landing page: every piece of copy, every hex value, every type style, every
   component with its states, all motion maths, responsive behaviour, and 19
   open questions. This is the authoritative document.
2. **`HANDOFF_INSTRUCTION.txt`** — the prompt to give Claude Code, and the
   short version of what matters most.
3. **`design-export/Savvy Bee Landing (standalone).html`** — open this in a
   browser. One self-contained file, no server needed, every asset inlined.
   It is the real page and it is more useful than the screenshots.
4. **`screenshots/`** — scroll sequences at 1440 / 768 / 390. Read
   `screenshots/README.md` first; it explains two capture limitations.
5. **`design-export/claude-code-handoff/README.md`** — orientation for the
   developer: fidelity, state model, what not to port.

## What is in the box

```
landing-page-handoff/
├── WHATS-NEW.md                          diff vs the first zip
├── BRIEF.md                              the spec
├── HANDOFF_INSTRUCTION.txt               what to give Claude Code
├── design-export/
│   ├── Savvy Bee Landing (standalone).html   open this
│   └── claude-code-handoff/
│       ├── README.md                     developer orientation
│       ├── Landing.dc.html               the landing page source
│       ├── Legal.dc.html                 terms, privacy, fees, complaints
│       ├── About.dc.html                 team and track record
│       ├── Savvy Bee Prototype.html      the demo — ship as-is, don't rebuild
│       ├── Spend Device.dc.html          device component, 4 panels
│       ├── Save Device.dc.html           device component, 3 panels
│       ├── Invest Device.dc.html         device component, 3 panels
│       ├── Circle Device.dc.html         device component, 3 panels
│       ├── assets/                       images these files load
│       └── support.js                    prototyping runtime — reference only
├── screenshots/
│   ├── README.md
│   ├── 01–07-desktop-1440.png
│   ├── 01–06-tablet-768.png
│   └── 01–06-mobile-390.png
└── assets/
    ├── README.md
    ├── images/                           the three hero-phone PNGs
    ├── icons/                            empty — all icons are inline SVG
    └── fonts/                            empty — Google Fonts, weights 400/500
```

## What ships

Three pages and one demo file. All final — there are no competing drafts.

| Build | File | Spec |
|---|---|---|
| **Landing page** — the primary rebuild | `Landing.dc.html` | BRIEF.md §1–§11 |
| **Legal** — terms, privacy, fees, complaints in one tabbed page | `Legal.dc.html` | BRIEF.md §12 |
| **About** — team and track record | `About.dc.html` | BRIEF.md §13 |
| **The demo** — copy it in, do **not** rebuild | `Savvy Bee Prototype.html` | BRIEF.md §14 |

Legal and About are linked from the landing page's nav and footer, so the three
pages ship together. Both are static and use the landing page's tokens exactly.

**The demo** is a self-contained 2.3 MB file holding 46 app screens; the
landing page loads it in an iframe. It already opens on the Home screen, and it
already contains the fit and overscroll fix that makes a 421×880 phone work
inside a small iframe — the bottom nav stays visible and swiping a card
carousel no longer drags the whole view sideways. BRIEF.md §14 documents that
fix and warns that it has to travel with the file if the demo is ever hosted
separately.

**Not in scope:** `Investors.dc.html` (exists in the source project but is
deliberately unlinked), and the 46 individual app screens — they live inside
the demo file and are not web pages to rebuild.

## The four things that block implementation

Pulled from BRIEF.md §11:

1. **The waitlist form has no destination.** It validates, then sets local
   state. It needs an endpoint or a CRM list.
2. **No hover, active, focus or disabled states exist for any button.** The
   only hover rule in the whole document is `a:hover { color:#B8860B }`.
3. **The form input has `outline:none` with no replacement focus ring.** An
   accessibility gap that needs a defined focus style.
4. **No page title, meta description, Open Graph tags, favicon or `lang`
   attribute.**

Legal also needs sign-off before it can go live: the fee figures are reasonable
defaults rather than confirmed economics, and bracketed placeholders in the copy
still need counsel. The page carries a visible draft banner saying exactly that;
the `draftNotice` prop turns it off once counsel has signed off.

One known bug worth fixing rather than faithfully reproducing: the module
auto-cycle advances `% 3`, so the Spend module's fourth panel (Subscriptions)
is never reached automatically. It should be the panel count per module.
