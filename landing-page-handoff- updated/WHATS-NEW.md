# What changed since the first handoff zip

**This bundle replaces the first one. Delete the old zip.** Everything in it is
here, plus the pages and specs listed below. Nothing was removed and no spec was
revised — the landing page itself is unchanged.

If your developer has already started on the landing page, none of their work is
invalidated. They need to read four things and can skip the rest.

## Read these four things

### 1. BRIEF.md §14 — the demo
`Savvy Bee Prototype.html` is now in the bundle. It was referenced in the first
zip but not included, so the demo overlay had nothing to load.

Two changes to the file itself:
- **It opens on the Home screen.** It used to open on Onboarding, where the
  call-to-action buttons sat below the fold and the demo was a dead end.
- **The fit and overscroll problem is fixed.** Each app screen is a 421×880
  phone on a padded desk background. In a phone-sized iframe the phone was
  clipped — the bottom nav and Nahl bar were unreachable — and swiping a card
  carousel inside the phone handed its momentum to the page, so the whole view
  drifted sideways into blank space.

  The fix lives in the demo shell, not in the individual screens: it injects CSS
  and a script into every screen that locks the page against scrolling, scales
  the phone to fit the viewport, and walks every scrollable element to constrain
  it to one axis. §14 has the exact CSS, the scale formula and the walk logic.

  **This matters for deployment.** If you host the demo somewhere other than
  alongside the landing page, the fix has to go with it, or the demo breaks on
  phones again.

### 2. BRIEF.md §12 — the Legal page
`Legal.dc.html` is new and in scope. One page, four documents behind a tab
strip: terms of use, privacy notice, fees and charges, complaints procedure.
Written to Nigerian norms — the Nigeria Data Protection Act 2023 for privacy,
the CBN Consumer Protection Regulation for complaints.

The landing page footer already links to it (`#terms`, `#privacy`, `#fees`,
`#complaints`). Those four links were dead in the first zip.

It is static apart from one behaviour: the tab strip reads and writes the URL
hash, which is what makes those four deep links land on the right document.

### 3. BRIEF.md §13 — the About page
`About.dc.html` is new and in scope. Team profiles for both founders, then
three pieces of work: the Katsina State classroom pilot, the Federal Ministry
meetings, and the TAJBank conversation.

The landing page nav and footer already link to it. Those links were dead in the
first zip.

**One thing not to touch:** the ministry and TAJBank entries state in their body
copy that the conversations were exploratory and that nothing has been signed.
That wording is deliberate and legally material. Reproduce it verbatim.

### 4. BRIEF.md §11 — three new open questions
Nineteen became twenty-two:

- **18** — the Legal fee figures (transfer tiers ₦10/₦25/₦50, card funding
  1.4% + ₦100, brokerage 1.00%, FX rate + 0.5%) are reasonable defaults, not
  confirmed economics. They need sign-off before Legal goes live.
- **19** — bracketed placeholders remain in the legal copy and need counsel.
  The page carries a visible draft banner saying so; the `draftNotice` prop
  turns it off once counsel has signed.
- **22** — ship the demo alongside the landing page, or host it separately?

## New files

```
design-export/claude-code-handoff/
├── Legal.dc.html                terms, privacy, fees, complaints
├── About.dc.html                team and track record
├── Savvy Bee Prototype.html     the demo — ship as-is, don't rebuild
└── assets/                      images these files load
assets/images/                   the two portraits and five photos About uses
```

## Unchanged

`Landing.dc.html` and the four device components are byte-identical to the
first zip. The screenshots are the same captures. BRIEF.md §1–§11 — the page
map, all the copy, the tokens, the components, the motion specs, the responsive
behaviour — is unrevised. Only the SCOPE table at the top and the open-questions
list at the bottom changed.
