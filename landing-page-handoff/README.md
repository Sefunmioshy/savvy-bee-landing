# Savvy Bee — Landing Page Handoff

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
├── BRIEF.md                              the spec
├── HANDOFF_INSTRUCTION.txt               what to give Claude Code
├── design-export/
│   ├── Savvy Bee Landing (standalone).html   open this
│   └── claude-code-handoff/
│       ├── README.md                     developer orientation
│       ├── Landing.dc.html               the landing page source
│       ├── Spend Device.dc.html          device component, 4 panels
│       ├── Save Device.dc.html           device component, 3 panels
│       ├── Invest Device.dc.html         device component, 3 panels
│       ├── Circle Device.dc.html         device component, 3 panels
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

## Which version is final

**`Landing.dc.html` is the final landing page.** There is one version; there
are no competing drafts.

Three other pages exist in the source project and are **not in scope**:
`About.dc.html` (team), `Legal.dc.html` (terms/privacy/fees/complaints) and
`Investors.dc.html` (deliberately unlinked). The landing page's nav and footer
link to About and Legal — decide where those links should point in the rebuild.
See BRIEF.md "SCOPE" and open questions 17–19.

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

One known bug worth fixing rather than faithfully reproducing: the module
auto-cycle advances `% 3`, so the Spend module's fourth panel (Subscriptions)
is never reached automatically. It should be the panel count per module.
