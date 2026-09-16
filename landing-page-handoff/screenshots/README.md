# Screenshots

## What is here

Three scroll sequences, one per width. Each file is one viewport-height capture;
read them in numerical order to walk the page top to bottom.

| Files | Width | Frames |
|---|---|---|
| `01-desktop-1440.png` … `07-desktop-1440.png` | 1440px | 7 |
| `01-tablet-768.png` … `06-tablet-768.png` | 768px | 6 |
| `01-mobile-390.png` … `06-mobile-390.png` | 390px | 6 |

The 768 and 390 sets show the **stacked** modules layout (the sub-900px
treatment); the 1440 set shows the **pinned-scroll** layout. These are two
different designs, not a reflow of one — see BRIEF.md §3.3.

## Two limitations to know about

**1. The device mockups are missing from the module sections.**
The capture re-renders the DOM rather than taking a pixel snapshot, and the four
phone components are nested, transform-scaled sub-documents that do not survive
that process. In the real page a phone sits in the right-hand column on desktop,
and in a swipe carousel on mobile. The copy, layout, spacing and type in these
captures are accurate; the empty right-hand column is a capture artefact, not
the design.

**2. There are no interaction-state captures.**
Form error, form success, the demo overlay, the Nahl thinking state and the
hero carousel mid-animation could not be captured reliably — the demo overlay
is an iframe (never captured) and the rest are mid-transition states that the
capture tool resolves inconsistently.

## Use the standalone file instead

`../design-export/Savvy Bee Landing (standalone).html` is a single
self-contained file — no server, no network, every asset inlined. Open it in a
browser and you get the real thing, including every state the screenshots are
missing:

| To see | Do this |
|---|---|
| Hero carousel motion | Wait — it auto-advances through 8 steps, then tap a card to stop it |
| Per-account detail screens | Tap any of the five scope rows under the hero buttons |
| Nahl thinking + answer reveal | Tap any of the four question chips |
| Pinned-scroll modules | Scroll slowly through the Modules section at >900px wide |
| Mobile swipe carousel | Narrow the window below 900px, then swipe the phone |
| Device panels | Wait 3.6s per panel, or tap a feature row to jump |
| Form error | Type something invalid and hit Request invite |
| Form success | Enter a valid email and hit Request invite |
| Demo overlay (modal) | Click "Open the demo" at >900px |
| Demo overlay (fullscreen) | Click "Open the demo" below 900px |
| Reduced motion | Turn on the OS reduce-motion setting and reload |

Exact specs for every one of those states are in BRIEF.md §5 and §7.
