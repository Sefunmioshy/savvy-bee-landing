# Assets

## images/
The only three bitmap assets the landing page loads. All three render inside the
hero phone frame at fixed pixel sizes.

| File | Size | Use |
|---|---|---|
| `home-chrome-top.png` | 393×108 | Phone status bar + app header |
| `home-body.png` | 393×1400 | The Combined-state screen body, scrolled by the hero timeline |
| `home-chrome-bottom.png` | 393×146 | Nahl bar + tab bar |

Plus the seven images the **About** page loads:

| File | Use |
|---|---|
| `founder-omotunwase.jpg` | Portrait — Omotunwase Osinaike |
| `founder-musa.jpg` | Portrait — Musa Umar Yar'adua |
| `photo-pilot-a.jpg`, `photo-pilot-c.jpg` | Katsina State classroom pilot |
| `photo-ministry-1.jpg`, `photo-ministry-2.jpg` | Federal Ministry working sessions |
| `photo-tajbank.jpg` | TAJBank meeting |

The same files sit in `design-export/claude-code-handoff/assets/` at the paths
`About.dc.html` expects, so that file renders correctly if you open it directly.

The **Legal** page and the **demo** load no images at all — Legal is type only,
and the demo has everything inlined.

## icons/
Empty — and that is correct. Every icon on the page is inline SVG: the logo
(two variants), the play triangle, the Nahl robot, the view-only cube, the
up/down arrows and the close ✕. Paths are given verbatim in BRIEF.md §3 and
listed in §6.

**Missing, needs creating:** a standalone logo `.svg`, a favicon, and a
1200×630 Open Graph image. See BRIEF.md §11, items 9–11.

## fonts/
Empty by design — no font files to ship. Both families load from Google Fonts,
at weights **400 and 500 only**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- **Inter** — all UI and body text. Stack: `Inter, system-ui, sans-serif`
- **JetBrains Mono** — every number, label and eyebrow. Stack: `'JetBrains Mono', monospace`

Do not add weight 600 or 700. The design system forbids it; type carries
hierarchy through size and colour instead.
