# BRIEF.md — Savvy Bee Landing Page

**Extraction for pixel-for-pixel rebuild. Nothing summarised.**

---

## SCOPE

**IN SCOPE — three pages plus the demo:**

| File | What it is | Spec |
|---|---|---|
| `Landing.dc.html` | **The landing page.** The primary rebuild. | §1–§11 |
| `Legal.dc.html` | Terms, privacy, fees, complaints — one page, four tabbed documents. Linked from the landing footer. | §12 |
| `About.dc.html` | Team and "where we've been". Linked from the landing nav and footer. | §13 |
| `Savvy Bee Prototype.html` | The in-app demo the landing page loads in an iframe. **Ship as-is** — do not rebuild. | §14 |

**NOT IN SCOPE:**
- `Investors.dc.html` — investor page, exists but is **deliberately unlinked** from the landing page
- `Home.dc.html`, `Spend.dc.html`, `Save.dc.html`, and all other `*.dc.html` app screens — these are the mobile app. They are bundled **inside** `Savvy Bee Prototype.html` and reached only through the demo; none is a web page to rebuild.
- `Spend Device.dc.html`, `Save Device.dc.html`, `Invest Device.dc.html`, `Circle Device.dc.html` — child components embedded **into** the landing page (in scope as components, documented in §5)

---

## 1. PRODUCT CONTEXT

**Product name:** Savvy Bee

**Legal entity:** Savvy Bee Ltd (RC 8326527)

**One-line pitch (verbatim H1):** "Every account you have, finally in one place."

**What it does (verbatim hero body):**
> "Connect your banks in a few minutes and Savvy Bee pulls spending, savings goals, contribution circles and NGX holdings into a single net position — read by an AI copilot that speaks up before something breaks."

**What it is:** An AI-native financial operating system for the Nigerian market. It aggregates external bank/wallet accounts read-only, adds its own wallet, savings capsules, NGX investing and contribution circles, and layers an AI copilot ("Nahl") over the combined position.

**Target audience:** Nigerian consumers, Abuja and Lagos first. People who already hold multiple accounts (GTBank, Kuda, OPay), already run informal savings groups (ajo / esusu), and want one net position plus automation.

**Problem solved:** Money is scattered across several banks and wallets, group savings run on group chats, and no single view exists. Decisions are made without knowing what they cost.

**Key differentiators (as expressed on the page):**
1. Combined position across owned + linked accounts, not a single-bank app
2. Nahl — AI copilot that reads every connected account and computes the cost of a decision before it's made
3. Circles / the Hive — ajo and esusu with escrow and a written trust record
4. NGX investing without brokerage runaround
5. Safe-to-spend calculated **after** bills, not before

**Brand voice:** Flat, matter-of-fact, plain Nigerian English. Lowercase-feeling sentences with real figures. No hype, no exclamation marks, no emoji. Uses local vocabulary without explaining it ("Detty December", "Japa fund", "ajo and esusu"). Prefers "you" and concrete numbers to adjectives.

**Design system:** "Alabaster" (documented in `CLAUDE.md`). Warm raw-canvas neutrals, hairline 0.5px borders, no gradients, no shadows except one on hero carousel cards, type carries hierarchy, only font weights 400 and 500 — never 700.

---

## 2. PAGE GOAL AND CONVERSIONS

**Primary CTA:** "Request invite" — the waitlist form in the `#get` section.

**Secondary CTAs:** "Get early access" (scrolls to the form), "Open the demo" (opens the in-app prototype).

### Every button and link, top to bottom

| # | Label (verbatim) | Element | Destination | New tab |
|---|---|---|---|---|
| 1 | `Savvy Bee` + hex logo | `<a>` in header | `#top` | No |
| 2 | `Nahl` | nav link | `#nahl` | No |
| 3 | `Modules` | nav link | `#modules` | No |
| 4 | `About` | nav link | `About.dc.html` (in scope — §13) | No |
| 5 | `Early access` | nav link | `#get` — JS smooth-scroll + focus input | No |
| 6 | `Open the demo` | header pill button (div, `cursor:pointer`) | Opens demo overlay (no navigation) | No |
| 7 | `Get early access` | hero primary button | `#get` — JS smooth-scroll + focus input | No |
| 8 | `Open the demo` | hero secondary button, with ▶ triangle icon | Opens demo overlay | No |
| 9 | Hero scope rows ×5 (`Combined`, `Savvy Bee Wallet`, `GTBank`, `Kuda`, `OPay`) | clickable rows | No navigation — selects the hero carousel card | No |
| 10 | Hero carousel cards ×5 | clickable | No navigation — selects that card | No |
| 11 | Hero dots ×5 | clickable | No navigation — selects that card | No |
| 12 | Nahl question chips ×4 | clickable | No navigation — swaps the answer | No |
| 13 | `Pause the transfer` / `Review subscriptions` / `Move the sweep` / `Buy ₦25,000` | Nahl action pill (display only) | **TODO: not wired — decorative** | — |
| 14 | `Show the maths` | Nahl secondary pill (display only) | **TODO: not wired — decorative** | — |
| 15 | Module feature rows (4 modules × 3–4 rows) | clickable | No navigation — switches the device screen | No |
| 16 | Tick rail marks ×4 (desktop only) | `<a>` | `#spend` / `#save` / `#invest` / `#circles` | No |
| 17 | Mobile carousel dots ×4 | clickable | Scrolls the device track to that slide | No |
| 18 | `Request invite` | primary form submit (div, `cursor:pointer`) | Validates, then success state. **TODO: no backend** | No |
| 19 | `hello@mysavvybee.com` | footer link | `mailto:hello@mysavvybee.com` | No |
| 20 | `+234 813 506 8614` | footer link | `tel:+2348135068614` | No |
| 21 | `Spend` | footer PRODUCT | `#spend` | No |
| 22 | `Save` | footer PRODUCT | `#save` | No |
| 23 | `Invest` | footer PRODUCT | `#invest` | No |
| 24 | `Circles` | footer PRODUCT | `#circles` | No |
| 25 | `Nahl` | footer PRODUCT | `#nahl` | No |
| 26 | `About` | footer COMPANY | `About.dc.html` (in scope — §13) | No |
| 27 | `Team` | footer COMPANY | `About.dc.html#team` | No |
| 28 | `Early access` | footer COMPANY | `#get` | No |
| 29 | `Contact` | footer COMPANY | `mailto:hello@mysavvybee.com` | No |
| 30 | `Terms` | footer LEGAL | `Legal.dc.html#terms` | No |
| 31 | `Privacy` | footer LEGAL | `Legal.dc.html#privacy` | No |
| 32 | `Fees` | footer LEGAL | `Legal.dc.html#fees` | No |
| 33 | `Complaints` | footer LEGAL | `Legal.dc.html#complaints` | No |
| 34 | `Close` | demo overlay, desktop | Closes overlay | No |
| 35 | ✕ icon button | demo overlay, mobile | Closes overlay | No |

### The one form — waitlist (`#get`)

Single field.

| Property | Value |
|---|---|
| Field label | None (placeholder only) |
| Placeholder | `you@email.com` (default) / `0801 234 5678` when `signupField` prop = `phone` |
| Type | Text input (`<input>`), no `type="email"` set |
| Required | Yes — validated on submit |
| Validation, email mode | Regex `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` |
| Validation, phone mode | Digits only, count ≥ 10 after stripping non-digits |
| Submit label | `Request invite` |
| Success message | `You're on the list. Invite lands within a week.` — with a 7px `#EF9F27` dot to its left |
| Error message, email mode | `Enter an email address we can send the invite to.` |
| Error message, phone mode | `Enter a phone number we can reach you on.` |
| Error styling | 12.5px, `#EF9F27`, 12px above-margin; input border changes `#2C2A25` → `#EF9F27` |
| Error clears | On any keystroke (`onContact` resets `signupError`) |
| Helper text under form | `NO SPAM · ONE MESSAGE WHEN IT'S YOUR TURN` |
| Where data goes | **TODO — no endpoint. State is local only (`joined: true`). Needs a form destination (see §10).** |

---

## 3. FULL PAGE MAP (top to bottom)

Page root: `background:#F8F6F1; color:#1C1917; min-height:100vh; overflow-x:clip`

### 3.0 Header / nav — sticky

- **Purpose:** persistent nav + demo entry
- **Layout:** `position:sticky; top:0; z-index:30`. Background `rgba(248,246,241,0.94)` with `backdrop-filter:blur(12px)`. Bottom border `0.5px solid #E8E5DE`. Inner: `max-width:1180px; margin:0 auto; padding:12px clamp(18px,4vw,32px)`; flex row, `align-items:center`, `flex-wrap:wrap`, `gap:14px 28px`, `min-height:64px`
- **Logo:** inline SVG hex-in-hex, 19×21, `viewBox 0 0 20 22`, stroke `#B8860B`, `stroke-width:1.2`, `stroke-linejoin:round`. Two paths: outer `M10 1.2l7.6 4.4v8.8L10 18.8 2.4 14.4V5.6z`, inner `M10 6.6l3 1.7v3.4l-3 1.7-3-1.7V8.3z`. Gap to wordmark 9px. Wordmark `Savvy Bee` at 15px / 500 / `letter-spacing:-0.01em`. The whole lockup is `margin-right:auto`
- **Nav links:** `Nahl`, `Modules`, `About`, `Early access` — 13px, `#6B6860`, `gap:10px 22px`
- **Button:** `Open the demo` — height 38px, `padding:0 18px`, `border-radius:50px`, bg `#1C1917`, text `#fff` 13px / 500, `white-space:nowrap`, `cursor:pointer`

### 3.1 Hero (`id="top"`)

- **Purpose:** state the proposition, show the real product, offer both CTAs
- **Layout:** `max-width:1180px; margin:0 auto; padding:clamp(48px,7vw,86px) clamp(18px,4vw,32px) 0`. Inside: `display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr)); gap:clamp(40px,5vw,56px); align-items:center`
- **Background:** page background `#F8F6F1`, no separate fill

**Copy, by role:**

- **Eyebrow pill:** `PRIVATE BETA · ABUJA` — preceded by a 5px `#B8860B` dot. Pill: `display:inline-flex`, height 30px, `padding:0 13px`, `border-radius:50px`, `border:0.5px solid #E8E5DE`, `background:#fff`, JetBrains Mono 10px, `letter-spacing:0.06em`, `color:#6B6860`, `gap:8px`
- **Headline (H1):** `Every account you have, finally in one place.`
  `font-size:clamp(34px,6.4vw,64px); font-weight:400; letter-spacing:-0.035em; line-height:1.05; margin:24px 0 0; text-wrap:balance`
- **Subheadline (body):** `Connect your banks in a few minutes and Savvy Bee pulls spending, savings goals, contribution circles and NGX holdings into a single net position — read by an AI copilot that speaks up before something breaks.`
  `font-size:clamp(15px,1.6vw,17px); line-height:1.62; color:#6B6860; margin:20px 0 0; max-width:470px; text-wrap:pretty`
- **Buttons:** row, `flex-wrap:wrap`, `gap:10px`, `margin-top:32px`
  - `Get early access` — height 52px, `padding:0 28px`, `border-radius:50px`, bg `#1C1917`, `#fff`, 15px / 500
  - `Open the demo` — height 52px, `padding:0 26px`, `border-radius:50px`, `border:0.5px solid #E8E5DE`, `color:#1C1917`, 15px / 500, `gap:9px`, preceded by a 13×13 play triangle SVG (`viewBox 0 0 12 12`, path `M3 1.6l7 4.4-7 4.4z`, fill `#1C1917`)

**Scope list (5 rows, below the buttons):** `display:grid; gap:0; margin-top:34px; max-width:440px`. Each row: `padding:11px 0`, `border-top:0.5px solid #E8E5DE`, `gap:13px`, `cursor:pointer`. 6px round dot (active `#B8860B`, inactive `#D8D4CC`), name 13.5px (active `#1C1917`, inactive `#9C9A95`), figure in JetBrains Mono 12.5px, same colour rule. `transition:color .3s`

| Row | Name (verbatim) | Figure |
|---|---|---|
| 1 | `Combined` | `₦1,575,900` |
| 2 | `Savvy Bee Wallet` | `₦847,200` |
| 3 | `GTBank` | `₦184,500` |
| 4 | `Kuda` | `₦96,300` |
| 5 | `OPay` | `₦52,400` |

Figures are computed, not literals: wallet 847200 + saved 215000 + invested 102500 + hive 78000 = 1,242,700 Savvy Bee; external 184500 + 96300 + 52400 = 333,200; combined 1,575,900. Format `'₦' + n.toLocaleString('en-US')`.

**Right column — the phone.** Rendered only when prop `showScreens` is true.

- Outer slot `width:311px; height:651px; position:relative; flex:none`
- Phone body `width:421px; height:880px; background:#1C1917; border-radius:56px; padding:14px; transform:scale(0.74); transform-origin:top left`
- Screen `width:393px; height:852px; background:#F8F6F1; border-radius:44px; overflow:hidden; display:flex; flex-direction:column`
- **Top chrome:** `assets/home-chrome-top.png`, 393×108, `flex:none`
- **Bottom chrome:** `assets/home-chrome-bottom.png`, 393×146, `flex:none`, `z-index:2`
- **Scrolling body:** absolutely positioned inner div, `width:393px`, `transform:translateY({heroScrollY})`, `transition:transform 1.1s cubic-bezier(0.4,0,0.2,1)`

**The hero coverflow carousel (inside the phone):**

- Track `position:relative; height:150px; perspective:1100px`
- Cards absolutely positioned: `top:6px; left:50%; width:228px; height:132px; border-radius:18px; padding:16px 17px; transform-style:preserve-3d; box-shadow:0 10px 30px rgba(0,0,0,0.08); overflow:hidden`
- Transform per card (p = index − active): `translateX(calc(-50% + {p*108}px)) rotateY({-p*38}deg) scale({1 - |p|*0.16})`, clamped: rotate ±52°, scale floor 0.66
- Opacity `1 - |p|*0.4`, zero past |p| > 2.3. `z-index: 20 - round(|p|*4)`. `pointer-events:none` when opacity ≤ 0.05
- `transition: transform .55s cubic-bezier(.34,1.2,.4,1), opacity .4s ease`
- Reduced motion: `rotateY(0)`, spacing widens to 150px

Card contents and per-type styling:

| Card | Glyph (verbatim) | Balance | Name | Card bg | Border | Glyph colour | Balance colour | Name colour |
|---|---|---|---|---|---|---|---|---|
| Combined | `◆ COMBINED` | `₦1,575,900` | `Combined` | `#FFFFFF` | `0.5px solid #E8E5DE` | `#6B6860` | `#1C1917` | `#9C9A95` |
| Wallet | `● SAVVY BEE · TRANSACTABLE` | `₦847,200` | `Savvy Bee Wallet` | `#1C1917` | `1px solid rgba(255,255,255,0.06)` | `#B8860B` | `#fff` | `rgba(255,255,255,0.55)` |
| GTBank | `○ VIEW ONLY` | `₦184,500` | `GTBank` | `#FFFFFF` | `0.5px solid #E8E5DE` | `#9C9A95` | `#6B6860` | `#9C9A95` |
| Kuda | `○ VIEW ONLY` | `₦96,300` | `Kuda` | `#FFFFFF` | `0.5px solid #E8E5DE` | `#9C9A95` | `#6B6860` | `#9C9A95` |
| OPay | `○ VIEW ONLY` | `₦52,400` | `OPay` | `#FFFFFF` | `0.5px solid #E8E5DE` | `#9C9A95` | `#6B6860` | `#9C9A95` |

- Glyph row: 8px round dot shown **only** on connected accounts (GTBank `#E8743B`, Kuda `#9087E0`, OPay `#1DC468`), then glyph in JetBrains Mono 9.5px, `letter-spacing:0.04em`, ellipsis overflow, `gap:7px`
- Balance: JetBrains Mono 28px / 500, `margin-top:22px`, `letter-spacing:-0.01em`
- Name: 11px, `margin-top:7px`
- **Combined card only** — a 5-segment stacked bar, `gap:2px`, `margin-top:11px`, each `height:4px; border-radius:2px`, flex-grow proportional to value (`max(2, round(value/1000))`):
  `#B0ABA0` external 333,200 · `#1C1917` wallet 847,200 · `#0D7A5F` saved 215,000 · `#185FA5` invested 102,500 · `#3C3489` hive 78,000

**Dots:** centred row, `gap:6px`, `margin-top:8px`. Active `width:16px; background:#1C1917`; inactive `width:5px; background:#D8D4CC`. Both `height:5px; border-radius:3px`. `transition:width .3s, background-color .3s`

**Below the carousel — two mutually cross-fading layers**, in a `width:393px; height:1400px` relative box:

1. **Combined state** — `assets/home-body.png` at 393×1400, absolutely positioned, `opacity:1` only when the Combined card is active, `transition:opacity .45s ease`
2. **Per-account detail** — built in markup, `opacity:1` for every non-Combined card. `background:#F8F6F1; padding:14px 22px 0`:
   - Position label: JetBrains Mono 10px, `letter-spacing:0.08em`, `#9C9A95`. Values: `SAVVY BEE POSITION` (wallet card) or `GTBANK BALANCE` / `KUDA BALANCE` / `OPAY BALANCE`
   - Figure: JetBrains Mono 33px / 500, `line-height:0.95`, `letter-spacing:-0.02em`. Wallet card shows `₦1,242,700`; connected cards show their own balance
   - Day-change pill: `border-radius:50px; padding:4px 10px 4px 8px`, tint `rgba(13,122,95,0.10)` up / `rgba(163,45,45,0.10)` down, arrow SVG 12×12 `stroke-width:2.2`, label JetBrains Mono 11px / 500. Values: Wallet `+2.1%` `#0D7A5F`; GTBank `-0.4%` `#A32D2D`; Kuda `+0.6%` `#0D7A5F`; OPay `+0.2%` `#0D7A5F`
   - Segment bar: `gap:2px; margin-top:18px; height:9px`, each segment `border-radius:2px`, flex-grow `max(3, round(value/1000))`
   - Legend rows: `padding:7px 0; border-bottom:0.5px solid #E8E5DE; gap:10px`. 8px square swatch `border-radius:2px`; label 12px `#6B6860`; value JetBrains Mono 12px / 500; percentage JetBrains Mono 11px `#9C9A95`, `width:34px`, right-aligned. Values use compact format (`₦59k`)
   - **View-only card** (connected accounts only): `background:#fff; border:0.5px solid #E8E5DE; border-left:2px solid #9C9A95; border-radius:13px; padding:14px 15px; margin-top:18px; gap:11px`. 17×17 cube SVG stroke `#9C9A95`. Kicker `○ VIEW ONLY` JetBrains Mono 9.5px `letter-spacing:0.05em` `#9C9A95`. Body 12px `#6B6860` `line-height:1.5`

Legend data per card:

- **Savvy Bee Wallet** — `Wallet` `#1C1917` ₦847k 68% · `Saved` `#0D7A5F` ₦215k 17% · `Invested` `#185FA5` ₦103k 8% · `Hive` `#3C3489` ₦78k 6%
- **GTBank** — `Bills & utilities` `#185FA5` ₦59k 32% · `Transfers` `#0D7A5F` ₦44k 24% · `Food & dining` `#D4537E` ₦33k 18% · `Transport` `#B8860B` ₦26k 14% · `Other` `#9C9A95` ₦23k 12%. View-only text: `Imported from GTBank · read-only · last synced 2h ago · 1,240 transactions`
- **Kuda** — `Food & dining` `#D4537E` ₦38k 39% · `Shopping` `#3C3489` ₦24k 25% · `Transport` `#B8860B` ₦18k 19% · `Airtime & data` `#185FA5` ₦9k 9% · `Other` `#9C9A95` ₦7k 8%. View-only text: `Imported from Kuda · read-only · last synced 1h ago · 480 transactions`
- **OPay** — `Transfers` `#0D7A5F` ₦21k 40% · `Airtime & data` `#185FA5` ₦14k 27% · `Betting` `#D4537E` ₦9k 17% · `Food` `#B8860B` ₦5k 10% · `Other` `#9C9A95` ₦3k 6%. View-only text: `Imported from OPay · read-only · last synced 30m ago · 320 transactions`

### 3.2 Nahl section (`id="nahl"`) — dark band

- **Purpose:** demonstrate the AI copilot with four real questions
- **Layout:** full-bleed dark band. `margin-top:clamp(64px,9vw,110px); background:#0F0F0D; color:#F8F6F1`. Inner: `max-width:1180px; margin:0 auto; padding:clamp(56px,8vw,96px) clamp(18px,4vw,32px); display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr)); gap:clamp(36px,5vw,64px); align-items:center`

**Left column:**

- **Eyebrow:** `NAHL · YOUR CO-PILOT` — JetBrains Mono 10px, `letter-spacing:0.07em`, `#EF9F27`
- **Headline (H2):** `Ask in plain words. Get the maths, then the fix.`
  `font-size:clamp(28px,4.2vw,44px); font-weight:400; letter-spacing:-0.03em; line-height:1.1; margin:18px 0 0; text-wrap:balance`
- **Body:** `Nahl reads every account you connect — salary, bills, subscriptions, goals, holdings — and works out what a decision actually costs before you make it.`
  `font-size:clamp(14.5px,1.5vw,16px); line-height:1.65; color:#9C9A95; margin:18px 0 0; max-width:430px`
- **Label:** `TRY A QUESTION` — JetBrains Mono 10px, `letter-spacing:0.07em`, `#6B6860`, `margin-top:32px`
- **Chips** (4, `flex-wrap:wrap`, `gap:8px`, `margin-top:14px`): `padding:10px 16px; border-radius:22px; font-size:13px; line-height:1.35; cursor:pointer; transition:border-color .2s, background .2s, color .2s`
  - Active: `border:0.5px solid #EF9F27; background:rgba(239,159,39,0.10); color:#EF9F27`
  - Inactive: `border:0.5px solid #2C2A25; background:transparent; color:#9C9A95`

**Right column — the chat card:** `width:100%; max-width:390px; border-radius:12px; border:0.5px solid #2C2A25; background:#1A1A17; padding:20px; min-height:330px; display:flex; flex-direction:column`

- **Card header:** `gap:9px; padding-bottom:15px; border-bottom:0.5px solid #2C2A25`. 16×16 robot SVG stroke `#EF9F27` `stroke-width:1.5` (`rect x4 y8 w16 h12 rx3` + `M12 4v4M9 13h.01M15 13h.01`). Name `Nahl` 13px / 500. Right-aligned status `READING 4 ACCOUNTS` JetBrains Mono 9.5px `letter-spacing:0.06em` `#6B6860`
- **User bubble:** `align-self:flex-end; max-width:82%; background:#2C2A25; border-radius:12px; padding:11px 14px; font-size:13px; line-height:1.5`
- **Thinking indicator:** three 5px `#EF9F27` dots, `gap:5px`, animation `sbThink 1s ease-in-out infinite` with delays `0`, `.18s`, `.36s`. Shown for 850ms after a chip is tapped
- **Answer:** `max-width:92%; font-size:13.5px; line-height:1.62`, animates `opacity 0→1` and `translateY(8px→0)` over `.35s`
- **Action row:** `gap:8px; flex-wrap:wrap`
  - Primary pill: height 34px, `padding:0 15px`, `border-radius:50px`, `background:#F8F6F1`, `color:#1C1917`, 12.5px / 500
  - Secondary pill: `Show the maths` — height 34px, `padding:0 15px`, `border-radius:50px`, `border:0.5px solid #2C2A25`, `color:#9C9A95`, 12.5px

**The four Q&A pairs, verbatim:**

1. **Q:** `Can I afford Detty December?`
   **A:** `Yes, with one change. Your Safety Floor holds at ₦180,000 if you pause the ₦45,000 monthly transfer to Rent 2027 for two cycles. Rent stays fully funded — you land 11 days late on the goal, not short on the bill.`
   **Action:** `Pause the transfer`
2. **Q:** `What is eating my salary?`
   **A:** `Three subscriptions renewed within four days of payday and took ₦38,400 before your bills queue ran. Two of them you have not opened in 60 days. Cancelling both moves your safe-to-spend up ₦26,900 a month.`
   **Action:** `Review subscriptions`
3. **Q:** `Is my rent goal on track?`
   **A:** `Rent 2027 is at 82% with 11 weeks to go, and the payday sweep covers the rest with ₦40,000 spare. The risk is January — your circle payout lands after the rent date, so I would move the sweep two days earlier.`
   **Action:** `Move the sweep`
4. **Q:** `Should I buy more GTCO?`
   **A:** `You can, but it would take banking to 41% of your portfolio against the 30% ceiling in your risk profile. A ₦25,000 buy keeps you inside it. Anything larger and I will ask you to change the profile first.`
   **Action:** `Buy ₦25,000`

### 3.3 Modules section (`id="modules"`)

- **Purpose:** show the four product modules against live device screens
- **Layout:** `max-width:1180px; margin:0 auto; padding:clamp(56px,8vw,96px) clamp(18px,4vw,32px) 0`
- **Section headline (H2):** `Four instruments. One balance they all agree on.`
  `font-size:clamp(26px,3.6vw,40px); font-weight:400; letter-spacing:-0.03em; margin:0; max-width:620px; text-wrap:balance`

**This section has TWO ENTIRELY DIFFERENT LAYOUTS.** The switch is `window.innerWidth >= 900` (plus prop `pinnedScroll` and `showScreens`).

#### Desktop (≥900px) — pinned scroll

`display:grid; grid-template-columns:1fr 320px; gap:72px; margin-top:24px; align-items:start`

- **Left:** four copy blocks, each `min-height:74vh; display:flex; flex-direction:column; justify-content:center; padding:40px 0; border-top:0.5px solid #E8E5DE; position:relative`
  - **Progress rail** per block: `position:absolute; left:-22px; top:40px; bottom:40px; width:2px; background:#F0EDE6; overflow:hidden`, with an inner fill `width:2px`, height `24px + 124px × weight`, coloured the module colour, `transition:height .25s linear`
  - Block content wrapper: `opacity: 0.26 + 0.74 × weight`, `transform:translateY({(1−weight) × 26}px)`, `transition:opacity .35s ease-out, transform .35s cubic-bezier(.16,1,.3,1)`
  - Kicker: JetBrains Mono 10px, `letter-spacing:0.07em`, module colour
  - H3: `clamp(24px,2.8vw,32px)` / 500, `letter-spacing:-0.02em`, `line-height:1.2`, `margin:14px 0 0`, `max-width:480px`
  - Body: 15px, `line-height:1.62`, `#6B6860`, `margin:14px 0 0`, `max-width:460px`
  - Feature rows: `margin-top:26px; max-width:470px`. Each `padding:14px 0; border-top:0.5px solid #E8E5DE; gap:14px; cursor:pointer`. 4px vertical bar `align-self:stretch; border-radius:2px` (active `#B8860B`, inactive `#E8E5DE`). Title 14.5px / 500 (active `#1C1917`, inactive `#9C9A95`). Body 13px `#6B6860` `line-height:1.5` `margin-top:3px`
- **Right:** `position:sticky; top:96px; height:calc(100vh - 140px); display:flex; align-items:center; justify-content:center`. Inner stage `position:relative; width:300px; height:min(627px, calc(100vh - 170px))`
  - Four devices stacked absolutely at `top:0; left:50%`, each `transform:translate(-50%, {ty}) scale({scale})`, `transition:opacity .24s ease, transform .3s cubic-bezier(.16,1,.3,1)`, `will-change:transform, opacity`
  - Only the active device has `opacity:1` and `pointer-events:auto`; the others are `opacity:0` / `none`
  - Scale = `0.972 + 0.028 × nearness`; active device drifts vertically by `scrollOffset × −16px`
  - Components: `Spend Device`, `Save Device`, `Invest Device`, `Circle Device` — each receives `step` and `fit`. `fit = min(627, viewportHeight − 170) / 880`
  - **Tick rail:** `position:absolute; left:-30px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:9px`. Four `<a>` marks, `width:5px`, height `10px + 26px × weight`, `border-radius:3px`, active `#B8860B` / inactive `#D8D4CC`, opacity `0.35 + 0.65 × weight`

#### Mobile (<900px) — stacked with a swipe track

`margin-top:clamp(28px,5vw,48px)`

- **Header row:** `border-top:0.5px solid #E8E5DE; padding-top:20px`, kicker (JetBrains Mono 10px, module colour) left, position counter `1 / 4`–`4 / 4` (JetBrains Mono 10px `#9C9A95`) right
- **H3:** `clamp(22px,5.6vw,28px)` / 500, `letter-spacing:-0.02em`, `margin:12px 0 0`
- **Body:** 14.5px `#6B6860` `line-height:1.62` `margin:12px 0 0` `max-width:440px`
- **Feature rows:** same pattern, slightly tighter — `padding:13px 0`, `gap:12px`, title 14px, body 12.5px
- **Device track:** `display:flex; gap:14px; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; margin:26px calc(-1 * clamp(18px,4vw,32px)) 0; padding:2px clamp(18px,4vw,32px) 12px`. Each slide `scroll-snap-align:center; flex:none`, inactive slides at `opacity:0.42`, `transition:opacity .4s ease`. `fit = min(272, max(180, viewportWidth × 0.72)) / 421`
- **Dots:** centred, `gap:7px`. Active `width:22px; background:#B8860B`; inactive `width:5px; background:#D8D4CC`. Both `height:5px; border-radius:3px`
- **Caption:** `SWIPE THE PHONE · TAP A FEATURE` — JetBrains Mono 9.5px, `letter-spacing:0.07em`, `#9C9A95`, centred, `margin-top:14px`

**The four modules, verbatim:**

**1. SPEND** — `id="spend"`, colour `#1C1917`
- Title: `Accounts that explain themselves`
- Body: `One feed across every linked bank and card, categorised on arrival. Safe-to-spend is worked out after your bills, not before them. Underneath it sit three tools most banking apps do not have at all.`
- Features (4):
  1. `The Spend home` — `Your wallet and every linked account on one carousel, safe-to-spend worked out after bills, and the month's flow in a single bar.`
  2. `Budgets` — `Five rails running live against the month, with the one you are over shown in red.`
  3. `Spending heatmap` — `Every day of the month shaded by what you spent, so the outliers name themselves.`
  4. `Subscriptions` — `What renews next, what you stopped opening, and what cancelling it saves you a year.`

**2. SAVE** — `id="save"`, colour `#185FA5`
- Title: `Goals that fill themselves`
- Body: `Open a capsule for rent, school fees or an emergency buffer, set the rule and let it run. Lock it if you are tempted. Nothing ever saves you below the floor you set.`
- Features (3):
  1. `Payday auto-save` — `The day after salary lands, one split across every goal — and you see it the night before.`
  2. `Savings rules` — `Round-ups, inflow sweeps, ₦500 every takeout. Nahl proposes new ones from what it sees.`
  3. `Capsules and vaults` — `One pot per goal, with a 90-day vault for the money you should not be able to reach.`

**3. INVEST** — `id="invest"`, colour `#3C3489`
- Title: `The NGX, without the brokerage runaround`
- Body: `Screen Nigerian equities and funds, buy fractions, rebalance on a schedule. Every order shows its full cost before you place it.`
- Features (3):
  1. `A company, in full` — `Dangote Cement: live price, analyst consensus, dividend history and the numbers behind them.`
  2. `Risk profile, then first investment` — `Read from 847 real transactions, not a quiz you could game — then applied to every order.`
  3. `Rebalance` — `Where the market pushed you off target, what it costs to correct, and one tap to do it.`

**4. CIRCLES & THE HIVE** — `id="circles"`, colour `#B8860B`
- Title: `Ajo and esusu, with the trust written down`
- Body: `Run a contribution circle or a shared goal with people you already trust, and let the rotation, the escrow and every on-time record be a matter of fact instead of a group-chat argument.`
- Features (3):
  1. `The circle` — `Fixed rotation, escrow-held contributions, and a payment record every member can see.`
  2. `Group goals` — `One target, many contributors — including who is behind and what would keep them in.`
  3. `The Nahl group register` — `Nahl in the group is neutral and rule-bound. Nahl in your private channel is only yours.`

> Note: **CIRCLES & THE HIVE** uses the same amber `#B8860B` as the active-state accent. The Spend module's colour is `#1C1917`.

### 3.4 Waitlist (`id="get"`) — dark card

- **Purpose:** primary conversion
- **Layout:** `max-width:1180px; margin:0 auto; padding:clamp(64px,8vw,104px) clamp(18px,4vw,32px) 0`. Has `data-reveal="1"` — starts at `opacity:0; transform:translateY(16px)`, animates in on scroll
- **Card:** `border-radius:12px; background:#1C1917; color:#F8F6F1; padding:clamp(32px,5vw,68px); display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr)); gap:clamp(32px,4vw,48px); align-items:center`
- **Headline (H2):** `Join the private beta.`
  `font-size:clamp(26px,3.8vw,42px); font-weight:400; letter-spacing:-0.03em; line-height:1.1; margin:0`
- **Body:** `We onboard a few hundred people a week, Abuja and Lagos first. Leave your email and we'll send your invite.`
  `font-size:15px; line-height:1.6; color:#9C9A95; margin:14px 0 0; max-width:400px`
- **Form row:** `display:flex; gap:9px; flex-wrap:wrap`
  - Input: `flex:1; min-width:180px; height:52px; border-radius:8px; border:0.5px solid #2C2A25; background:#0F0F0D; color:#F8F6F1; font-family:Inter,sans-serif; font-size:15px; padding:0 16px; outline:none`
  - Button `Request invite`: `height:52px; padding:0 26px; border-radius:50px; background:#F8F6F1; color:#1C1917; font-size:15px; font-weight:500; flex:1; min-width:160px; cursor:pointer`
- **Success state** replaces the form row: `display:flex; align-items:center; gap:12px; min-height:52px` — 7px `#EF9F27` dot + `You're on the list. Invite lands within a week.` at 15px

### 3.5 Footer

- **Layout:** `max-width:1180px; margin:clamp(56px,8vw,80px) auto 0; padding:clamp(40px,5vw,64px) clamp(18px,4vw,32px) 48px; border-top:0.5px solid #E8E5DE`. Grid `repeat(auto-fit,minmax(min(100%,160px),1fr))`, `gap:36px`
- **Column 1** (`max-width:290px`):
  - Logo lockup — 17×19 SVG, outer hex path only (`M10 1.2l7.6 4.4v8.8L10 18.8 2.4 14.4V5.6z`), stroke `#B8860B`, `stroke-width:1.2`; wordmark `Savvy Bee` 14px / 500, `gap:9px`
  - Legal text: `Savvy Bee Ltd (RC 8326527). A311, Garki Mall, Damaturu Street, Garki II, Abuja, FCT, Nigeria. Investing carries risk; past performance is not indicative of future returns.` — 12.5px, `line-height:1.6`, `#9C9A95`, `margin:14px 0 0`
  - Contact stack (`gap:6px; margin-top:12px`): `hello@mysavvybee.com`, `+234 813 506 8614` — 12.5px `#6B6860`
- **Columns 2–4:** `display:grid; gap:11px; align-content:start`. Heading JetBrains Mono 10px `letter-spacing:0.07em` `#9C9A95`; links 13px `#6B6860`
  - `PRODUCT` — Spend, Save, Invest, Circles, Nahl
  - `COMPANY` — About, Team, Early access, Contact
  - `LEGAL` — Terms, Privacy, Fees, Complaints
- **Copyright:** `© 2026 SAVVY BEE LTD · ABUJA, NIGERIA` — JetBrains Mono 10px, `letter-spacing:0.06em`, `#9C9A95`, `margin-top:clamp(36px,5vw,56px)`

### 3.6 Demo overlay (two variants)

No cookie notice, no banner, no popup other than this.

**Desktop variant** (`window.innerWidth >= 900`):
- `position:fixed; inset:0; z-index:60; background:rgba(15,15,13,0.86); backdrop-filter:blur(6px); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; gap:16px`
- Header row `width:100%; max-width:460px; gap:16px`: label `LIVE DEMO · ALL 46 SCREENS` (JetBrains Mono 10px, `letter-spacing:0.07em`, `#9C9A95`) and a `Close` button (`margin-left:auto`, height 34px, `padding:0 16px`, `border-radius:50px`, `border:0.5px solid #2C2A25`, `color:#F8F6F1`, 12.5px)
- Frame: `width:min(421px,100%); height:min(880px,calc(100vh - 110px)); border-radius:36px; overflow:hidden; background:#1C1917; border:0.5px solid #2C2A25`
- Iframe: `src="Savvy%20Bee%20Prototype.html#Home.dc.html"`, `title="Savvy Bee demo"`, `width:100%; height:100%; border:0`

**Mobile variant** (`< 900px`):
- `position:fixed; inset:0; z-index:60; background:#1C1917; overflow:hidden`, iframe absolutely filling it
- Close button: `position:absolute; top:calc(env(safe-area-inset-top, 0px) + 12px); right:14px; width:44px; height:44px; border-radius:50%; background:rgba(28,25,23,0.86); backdrop-filter:blur(6px)`, ✕ SVG 17×17 stroke `#F8F6F1` `stroke-width:1.8`

**Loading screen** (both variants): `position:absolute; inset:0; z-index:3; background:#0F0F0D; display:flex; flex-direction:column; justify-content:center; padding:34px` (mobile `clamp(26px,7vw,44px)`)
- Pulsing 5px `#EF9F27` dot (`sbThink 1.1s ease-in-out infinite`) + `SAVVY BEE · LIVE DEMO` in JetBrains Mono 9.5px, `letter-spacing:0.09em`, `#6B6860`
- Percentage: JetBrains Mono 88px desktop / `clamp(64px,23vw,104px)` mobile, weight 400, `line-height:0.84`, `letter-spacing:-0.05em`, `#F8F6F1`, `font-variant-numeric:tabular-nums`, with a `%` glyph at 14px `#6B6860`
- 46 tick bars, `gap:2px`, `height:28px` (mobile 30px), `align-items:flex-end`. Filled ticks `#EF9F27` at 30px (every 6th) or 20px; unfilled `#2C2A25` at 7px. `transition:height .3s cubic-bezier(.22,1,.36,1), background-color .3s`
- Status row, `space-between`, JetBrains Mono 9.5px, `letter-spacing:0.07em`, `#6B6860`: left cycles `LOADING RUNTIME` (<26%) → `MOUNTING SCREENS` (<58%) → `RESTORING SESSION` (<92%) → `READY`; right is always `46 SCREENS`
- Progress easing: `+max(0.5, (94 − p) × 0.055)` every 60ms, capped at 92 until the iframe fires `onLoad`, then jumps to 100, holds 420ms, fades out over 480ms

---

## 4. DESIGN TOKENS

### Colours

| Hex | Name | Used for |
|---|---|---|
| `#F8F6F1` | Canvas | page background; light text on dark bands; waitlist button fill; Nahl primary action pill |
| `#FFFFFF` | Surface | eyebrow pill, hero cards (non-wallet), view-only card |
| `#F0EDE6` | Input / secondary surface | module progress rail track |
| `#E8E5DE` | Border | all hairlines (always 0.5px), inactive feature bars |
| `#D8D4CC` | Muted dot | inactive carousel dots, inactive tick marks |
| `#1C1917` | Ink / near-black CTA | primary text, header button, waitlist card, wallet card, phone bezel |
| `#6B6860` | Text secondary | nav links, body copy, footer links |
| `#9C9A95` | Text tertiary | captions, inactive labels, legend labels, dark-band body |
| `#0F0F0D` | Dark background | Nahl band, waitlist input, demo loading screen |
| `#1A1A17` | Dark surface | Nahl chat card |
| `#2C2A25` | Dark border | Nahl card border, chips (inactive), user bubble, input border |
| `#B8860B` | Brand amber (light) | active accents, logo stroke, Circles module, active feature bars, active dots |
| `#EF9F27` | Brand amber (dark) | Nahl eyebrow, robot icon, active chips, thinking dots, success dot, error text, demo ticks |
| `#0D7A5F` | Success teal | positive day change, saved segment, "Transfers" category |
| `#A32D2D` | Error red | negative day change (GTBank) |
| `#185FA5` | Savings blue | Save module, invested segment, "Bills & utilities" / "Airtime & data" |
| `#3C3489` | Investment purple | Invest module, hive segment, "Shopping" |
| `#D4537E` | Nahl / coral | "Food & dining", "Betting" |
| `#B0ABA0` | External segment | combined-card external slice |
| `#E8743B` | GTBank brand dot | hero card dot |
| `#9087E0` | Kuda brand dot | hero card dot |
| `#1DC468` | OPay brand dot | hero card dot |
| `rgba(248,246,241,0.94)` | — | sticky header background |
| `rgba(15,15,13,0.86)` | — | demo overlay scrim (desktop) |
| `rgba(28,25,23,0.86)` | — | demo close button (mobile) |
| `rgba(255,255,255,0.06)` | — | wallet card border |
| `rgba(255,255,255,0.55)` | — | wallet card name text |
| `rgba(239,159,39,0.10)` | — | active Nahl chip background |
| `rgba(13,122,95,0.10)` | — | positive day-change pill tint |
| `rgba(163,45,45,0.10)` | — | negative day-change pill tint |
| `rgba(0,0,0,0.08)` | — | hero carousel card shadow |

**Gradients:** none. The design system forbids them.

### Typography

Loaded from Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- **Body stack:** `Inter, system-ui, sans-serif`
- **Mono stack:** `'JetBrains Mono', monospace`
- **Weights available: 400 and 500 only.** Never 600 or 700.
- `-webkit-font-smoothing:antialiased` on body

| Style | Family | Size (desktop → mobile) | Weight | Line height | Letter spacing | Transform |
|---|---|---|---|---|---|---|
| Hero H1 | Inter | `clamp(34px,6.4vw,64px)` | 400 | 1.05 | −0.035em | none |
| Section H2 (Nahl) | Inter | `clamp(28px,4.2vw,44px)` | 400 | 1.1 | −0.03em | none |
| Section H2 (Modules) | Inter | `clamp(26px,3.6vw,40px)` | 400 | normal | −0.03em | none |
| Section H2 (Waitlist) | Inter | `clamp(26px,3.8vw,42px)` | 400 | 1.1 | −0.03em | none |
| Module H3 desktop | Inter | `clamp(24px,2.8vw,32px)` | 500 | 1.2 | −0.02em | none |
| Module H3 mobile | Inter | `clamp(22px,5.6vw,28px)` | 500 | 1.2 | −0.02em | none |
| Hero body | Inter | `clamp(15px,1.6vw,17px)` | 400 | 1.62 | normal | none |
| Nahl body | Inter | `clamp(14.5px,1.5vw,16px)` | 400 | 1.65 | normal | none |
| Module body | Inter | 15px → 14.5px | 400 | 1.62 | normal | none |
| Feature title | Inter | 14.5px → 14px | 500 | normal | normal | none |
| Feature body | Inter | 13px → 12.5px | 400 | 1.5 | normal | none |
| Body small | Inter | 13px | 400 | 1.5–1.6 | normal | none |
| Footer legal | Inter | 12.5px | 400 | 1.6 | normal | none |
| Nav link | Inter | 13px | 400 | normal | normal | none |
| Button large | Inter | 15px | 500 | normal | normal | none |
| Button small | Inter | 13px | 500 | normal | normal | none |
| Pill small | Inter | 12.5px | 500 | normal | normal | none |
| Wordmark | Inter | 15px (header) / 14px (footer) | 500 | normal | −0.01em | none |
| Label / eyebrow | JetBrains Mono | 10px | 400 | normal | 0.06em–0.08em | uppercase (authored) |
| Micro label | JetBrains Mono | 9.5px | 400 | normal | 0.04em–0.09em | uppercase (authored) |
| Hero figure (card) | JetBrains Mono | 28px | 500 | normal | −0.01em | none |
| Hero figure (detail) | JetBrains Mono | 33px | 500 | 0.95 | −0.02em | none |
| Scope figure | JetBrains Mono | 12.5px | 400 | normal | normal | none |
| Legend value | JetBrains Mono | 12px | 500 | normal | normal | none |
| Demo percentage | JetBrains Mono | 88px / `clamp(64px,23vw,104px)` | 400 | 0.84 | −0.05em | none |

`text-wrap:balance` on all headlines; `text-wrap:pretty` on all body copy.

### Spacing, container, grid

- **Container max-width:** 1180px, centred
- **Horizontal gutter:** `clamp(18px,4vw,32px)` — used on every section
- **Section vertical rhythm:** `clamp(56px,8vw,96px)` standard; hero top `clamp(48px,7vw,86px)`; waitlist top `clamp(64px,8vw,104px)`; footer top margin `clamp(56px,8vw,80px)`
- **Grid pattern:** `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` throughout — hero N=330, Nahl N=320, waitlist N=270, footer N=160
- **Grid gaps:** hero `clamp(40px,5vw,56px)`; Nahl `clamp(36px,5vw,64px)`; waitlist `clamp(32px,4vw,48px)`; footer 36px; desktop modules 72px (fixed)
- **Desktop modules grid:** `1fr 320px` (not auto-fit)

### Radii

| Value | Applied to |
|---|---|
| 50px | all pills and buttons |
| 56px | phone bezel |
| 44px | phone screen |
| 36px | demo frame |
| 22px | Nahl chips |
| 18px | hero carousel cards |
| 13px | view-only card |
| 12px | waitlist card, Nahl chat card, Nahl bubbles |
| 8px | form input |
| 5px | (none — see 3px) |
| 3px | dots, tick marks |
| 2px | feature bars, segment bars, legend swatches |
| 50% | round dots, mobile close button |

### Borders

- **Standard hairline: `0.5px solid #E8E5DE`** (light) / `0.5px solid #2C2A25` (dark). Never 1px on light surfaces.
- Exceptions: wallet card `1px solid rgba(255,255,255,0.06)`; view-only card left edge `2px solid #9C9A95`; module progress rail `2px` wide

### Shadows

Only one in the whole page: `box-shadow: 0 10px 30px rgba(0,0,0,0.08)` on hero carousel cards. Everything else is flat — the design system forbids drop shadows.

### Blur / backdrop

- Sticky header: `backdrop-filter: blur(12px)`
- Demo overlay scrim: `backdrop-filter: blur(6px)`
- Mobile close button: `backdrop-filter: blur(6px)`

### Breakpoints

**One JS breakpoint, no CSS media queries.** `window.innerWidth >= 900` → `wide` state, which switches the modules section between pinned-scroll and stacked-swipe. Everything else is fluid via `clamp()` and `auto-fit` grids.

---

## 5. COMPONENTS

### Nav (sticky header)

| Property | Value |
|---|---|
| Height | `min-height:64px`, padding `12px clamp(18px,4vw,32px)` |
| Background | `rgba(248,246,241,0.94)` + `blur(12px)` |
| Border | bottom `0.5px solid #E8E5DE` |
| Radius / shadow | none |
| Wrapping | `flex-wrap:wrap; gap:14px 28px` — nav wraps below the logo on narrow screens |
| States | Links: default `#6B6860`; hover `#B8860B` (global `a:hover`). No active/current-page indicator. **TODO: no mobile hamburger menu — the nav wraps instead** |

### Buttons

| Variant | Height | Padding | Radius | Fill | Text | Border | Icon |
|---|---|---|---|---|---|---|---|
| Primary small (header) | 38px | `0 18px` | 50px | `#1C1917` | `#fff` 13px/500 | none | none |
| Primary large (hero) | 52px | `0 28px` | 50px | `#1C1917` | `#fff` 15px/500 | none | none |
| Secondary large (hero) | 52px | `0 26px` | 50px | transparent | `#1C1917` 15px/500 | `0.5px solid #E8E5DE` | 13×13 ▶ left, gap 9px |
| Inverse large (waitlist) | 52px | `0 26px` | 50px | `#F8F6F1` | `#1C1917` 15px/500 | none | none |
| Inverse small (Nahl action) | 34px | `0 15px` | 50px | `#F8F6F1` | `#1C1917` 12.5px/500 | none | none |
| Ghost small (Nahl) | 34px | `0 15px` | 50px | transparent | `#9C9A95` 12.5px | `0.5px solid #2C2A25` | none |
| Ghost small (demo close) | 34px | `0 16px` | 50px | transparent | `#F8F6F1` 12.5px | `0.5px solid #2C2A25` | none |
| Icon round (mobile close) | 44×44 | — | 50% | `rgba(28,25,23,0.86)` + blur | — | none | ✕ 17×17 |

**States:** **TODO — no hover, active, focus or disabled styles are defined on any button.** All buttons are `<div>` or `<a>` with `cursor:pointer`. Global `a:hover { color:#B8860B }` is the only hover rule in the document. The rebuild should add hover/focus states; specify them before building.

### Cards

| Card | Size | Padding | Radius | Fill | Border | Shadow |
|---|---|---|---|---|---|---|
| Hero carousel card | 228×132 | `16px 17px` | 18px | `#FFFFFF` / `#1C1917` (wallet) | `0.5px #E8E5DE` / `1px rgba(255,255,255,0.06)` | `0 10px 30px rgba(0,0,0,0.08)` |
| Nahl chat card | `max-width:390px`, `min-height:330px` | 20px | 12px | `#1A1A17` | `0.5px #2C2A25` | none |
| Waitlist card | full width | `clamp(32px,5vw,68px)` | 12px | `#1C1917` | none | none |
| View-only card | full width | `14px 15px` | 13px | `#FFFFFF` | `0.5px #E8E5DE` + `2px #9C9A95` left | none |

### Badges / pills

| Pill | Height | Padding | Radius | Default | Active |
|---|---|---|---|---|---|
| Eyebrow (`PRIVATE BETA · ABUJA`) | 30px | `0 13px` | 50px | `#fff` bg, `0.5px #E8E5DE`, `#6B6860` | — (static) |
| Nahl chip | auto | `10px 16px` | 22px | transparent, `0.5px #2C2A25`, `#9C9A95` | `rgba(239,159,39,0.10)` bg, `0.5px #EF9F27`, `#EF9F27` |
| Day-change pill | auto | `4px 10px 4px 8px` | 50px | tinted 10% teal or red | — (data-driven) |

Chip transition: `border-color .2s, background .2s, color .2s`. **TODO: no hover state on chips — only active/inactive.**

### Input

| Property | Default | Error | Focus |
|---|---|---|---|
| Height | 52px | 52px | — |
| Radius | 8px | 8px | — |
| Background | `#0F0F0D` | `#0F0F0D` | — |
| Border | `0.5px solid #2C2A25` | `0.5px solid #EF9F27` | **TODO: `outline:none` with no focus ring — accessibility gap** |
| Text | `#F8F6F1` 15px | same | — |
| Padding | `0 16px` | same | — |

### Feature row (list item)

| Property | Desktop | Mobile |
|---|---|---|
| Padding | `14px 0` | `13px 0` |
| Top border | `0.5px solid #E8E5DE` | same |
| Gap | 14px | 12px |
| Bar | 4px wide, `align-self:stretch`, `border-radius:2px` | same |
| Bar colour | active `#B8860B` / inactive `#E8E5DE` | same |
| Title | 14.5px/500, active `#1C1917` / inactive `#9C9A95` | 14px/500 |
| Body | 13px `#6B6860` | 12.5px |
| Transition | `background .3s` (bar), `color .3s` (title) | same |

### Device components (4)

Each is a separate file: `Spend Device.dc.html`, `Save Device.dc.html`, `Invest Device.dc.html`, `Circle Device.dc.html`.

- **Props:** `step` (integer, which inner screen) and `fit` (scale factor, `number`)
- **Intrinsic size:** 421×880 phone, scaled by `fit`
- **Desktop fit:** `min(627, viewportHeight − 170) / 880`
- **Mobile fit:** `min(272, max(180, viewportWidth × 0.72)) / 421`
- Each contains a `#1C1917` bezel, a 393×852 `#F8F6F1` screen, a screen title, a status pill, cross-fading panels (`opacity` + `transition .4s ease`), a Nahl bar and a 5-tab bottom nav

**Spend Device — 4 panels:** Spend home (account carousel + 4 quick actions + ₦96,900 hero + flow bar + Nahl card), Budgets, Spending heatmap, Subscriptions.

Spend home detail: wallet card 270px wide `#1C1917` with `1.5px solid #EF9F27` border, amber dot, `Savvy Bee` label, 28×20 amber chip, `Wallet · spendable` label, `₦847,200` at 24px mono, `••4291`, `Transactable` in amber. GTBank card 270px `#fff` with `1.5px solid #E8E5DE`, `#E8743B` dot, lock icon + `linked · view only` pill, `Spendable` label, `₦184,500`. Quick actions: `Transfer` (dark primary), `Pay Bills`, `Airtime & Data`, `Request` — each a 34px round icon over a 10.5px/500 label. Hero: `Spent this month` label, `₦96,900` at 32px/500, up-arrow + `₦12,450 under budget` (500) + `with 8 days left` in `#0D7A5F`. Flow bar: `This month's flow`, four segments (`#1C1917` 875, `#185FA5` 600, `#3C3489` 400, `#0D7A5F` 1325), legend `In ₦320k` / `Spent ₦87k` / `Saved ₦60k` / `Invested ₦40k`. Nahl card: `You're ₦5k over on food but under everywhere else — net, you're in good shape. Biggest opportunity: ₦7,200/mo in unused subscriptions.`

**Save Device — 3 panels**, third is the capsules grid, matching the app's `Save.dc.html` exactly:
- Label `Your capsules`, then a 2-column grid, `gap:11px`
- Each card `#fff`, `0.5px solid #E8E5DE`, `border-radius:14px`, `padding:15px`
- 58×58 ring: track `r=24` `#F0EDE6` `stroke-width:5`; fill same geometry in the capsule colour, `stroke-linecap:round`, `stroke-dasharray = 2πr`, `stroke-dashoffset = 2πr × (1 − pct)`, `rotate(-90 29 29)`. Percentage is an **HTML label absolutely centred over the ring** at 14px/500 `#1C1917`
- Name 13.5px/500; type 10.5px `#9C9A95`; figures 11.5px `#6B6860` with `font-feature-settings:'tnum'`
- Lock glyph (13×13, `#9C9A95`) on locked capsules; two overlapping 16px avatars (`#3C3489` "B", `#D4537E` "A", `1.5px #fff` ring, `−6px` overlap) on group goals
- Fifth tile: dashed `1px #D9D5CD`, `min-height:150px`, 40px `#F0EDE6` circle with a + icon, label `New capsule` 12.5px/500

Capsule data: `Rent` / `Vault · locked` / 82% / `₦164k / ₦200k` / `#185FA5` / locked · `Emergency` / `FlexiSave` / 57% / `₦57k / ₦100k` / `#0D7A5F` · `Laptop` / `Goal Pot · open` / 34% / `₦34k / ₦100k` / `#B8860B` · `Japa / Travel` / `Group Goal` / 41% / `₦205k / ₦500k` / `#3C3489` / group

Status pill values by panel: `26 Sep`, `Active`, `₦460k saved`

**Invest Device / Circle Device — 3 panels each.** Not re-documented here; read the component files.

### Footer

`border-top:0.5px solid #E8E5DE`, no background fill, no radius. Four columns via `auto-fit minmax(min(100%,160px),1fr)`, `gap:36px`. Link hover `#B8860B` (global rule only).

---

## 6. ASSET LIST

| Filename | Where used | Display size | Format | Status |
|---|---|---|---|---|
| `assets/home-chrome-top.png` | Hero phone, top chrome (status bar + header) | 393×108 | PNG | Exists |
| `assets/home-chrome-bottom.png` | Hero phone, bottom chrome (Nahl bar + tab bar) | 393×146 | PNG | Exists |
| `assets/home-body.png` | Hero phone, Combined-state body | 393×1400 | PNG | Exists |
| Logo hex, header | Header lockup | 19×21 | Inline SVG | Exists, inline — **TODO: no standalone `.svg` file** |
| Logo hex, footer | Footer lockup | 17×19 | Inline SVG | Exists, inline (outer path only) |
| Play triangle | Hero secondary button | 13×13 | Inline SVG | Exists, inline |
| Robot icon | Nahl chat card header | 16×16 | Inline SVG | Exists, inline |
| Cube icon | View-only card | 17×17 | Inline SVG | Exists, inline |
| Arrow up / down | Day-change pill | 12×12 | Inline SVG | Exists, inline |
| Close ✕ | Demo overlay, mobile | 17×17 | Inline SVG | Exists, inline |
| Device component icons | Inside the four device components | 13–20px | Inline SVG | Exists, inline |
| `assets/home-scroll.png` | **Not referenced by the landing page** | — | PNG | Exists, unused |
| `assets/card-0.png` … `card-3.png` | **Not referenced by the landing page** | — | PNG | Exists, unused |
| `assets/logo-parthian.png` | Investors page only (out of scope) | — | PNG | Exists, unused here |
| `assets/founder-omotunwase.jpg` | About page only (out of scope) | — | JPG | Exists, unused here |
| `assets/founder-musa.jpg` | About page only (out of scope) | — | JPG | Exists, unused here |
| `assets/photo-pilot-*.jpg`, `photo-ministry-*.jpg`, `photo-tajbank.jpg` | About page only (out of scope) | — | JPG | Exists, unused here |
| Favicon | — | — | — | **TODO: none exists. Needs creating from the hex logo.** |
| Open Graph image | — | 1200×630 | — | **TODO: none exists.** |

**Fonts:** No font files. Both families come from Google Fonts at weights 400 and 500 only: `Inter:wght@400;500` and `JetBrains+Mono:wght@400;500`, with `display=swap`.

---

## 7. INTERACTIONS AND MOTION

All motion respects `prefers-reduced-motion: reduce` — checked via `window.matchMedia`. When reduced: hero auto-advance and step auto-cycling stop, `rotateY` on carousel cards becomes 0 (card spacing widens from 108px to 150px), scroll-weighted opacity/transform become binary, reveal animations resolve immediately, and carousel scrolling uses `behavior:'auto'` instead of `'smooth'`.

### Sticky nav
`position:sticky; top:0`. Translucent + blurred from the start — **no transparent-to-solid transition on scroll**, no shrink, no shadow appearing.

### Hero carousel auto-advance
An 8-step timeline cycling through cards and scroll positions:

| Step | Card | Scroll Y | Duration |
|---|---|---|---|
| 1 | Combined | 0 | 2600ms |
| 2 | Combined | −520px | 2400ms |
| 3 | Combined | −960px | 2400ms |
| 4 | Combined | 0 | 1700ms |
| 5 | Savvy Bee Wallet | 0 | 2600ms |
| 6 | GTBank | 0 | 2500ms |
| 7 | Kuda | 0 | 2400ms |
| 8 | OPay | 0 | 2400ms |

Loops. **Any user tap (card, dot or scope row) sets `heroManual: true` and stops the timeline permanently** — it never resumes.

- Scroll transform: `transition: transform 1.1s cubic-bezier(0.4,0,0.2,1)`
- Card motion: `transition: transform .55s cubic-bezier(.34,1.2,.4,1)` (overshoot) `, opacity .4s ease`
- Layer cross-fade: `opacity .45s ease`

### Module step auto-cycle
`setInterval` every 3600ms advances the active module's panel, modulo 3. Tapping a feature row sets that module's `manual` flag, which stops its auto-cycle (per-module, not global).

> **Known bug:** the interval uses `% 3`, so the Spend module's **fourth** panel (Subscriptions) is never reached by auto-cycle — only by tapping. Fix to `% n` where n is the module's panel count.

### Scroll-driven module weighting (desktop)
A passive `scroll` listener, rAF-throttled, measures every `[data-module]` block:
- `d` = block centre − viewport centre; `n = |d| / blockHeight`
- `weight = clamp((0.58 − n) / 0.22, 0, 1)`
- Nearest block becomes `active`; its normalised offset `d / height` (clamped ±1) drives device drift

Applied as: copy opacity `0.26 + 0.74w`, copy `translateY((1−w) × 26px)`, rail fill `24px + 124w`, tick height `10px + 26w`, tick opacity `0.35 + 0.65w`, device scale `0.972 + 0.028 × nearness`, device `translateY(offset × −16px)`.

- Copy transition: `opacity .35s ease-out, transform .35s cubic-bezier(.16,1,.3,1)`
- Device transition: `opacity .24s ease, transform .3s cubic-bezier(.16,1,.3,1)`, with `will-change:transform, opacity`
- Rail: `height .25s linear`; ticks: `background .3s, height .2s linear, opacity .2s linear`

### Mobile device carousel
`scroll-snap-type:x mandatory`, `scroll-snap-align:center` per slide. An rAF-throttled `scroll` handler finds the slide whose centre is nearest the track centre and sets `mSlide`, which drives the copy above it, the position counter and the dots. Dots scroll the track with `scrollTo({ behavior:'smooth' })`. Inactive slides fade to `0.42` over `.4s`.

### Nahl Q&A
Tapping a chip sets `thinking:true`, shows three pulsing dots for **850ms**, then reveals the answer with `opacity 0→1` + `translateY(8px→0)` over `.35s`. The action pill fades with the answer. Re-tapping the active chip is a no-op.

`@keyframes sbThink { 0%,100% { opacity:0.25 } 50% { opacity:1 } }` — 1s cycle, staggered `0` / `.18s` / `.36s`.

### Scroll reveal
`IntersectionObserver` on `[data-reveal]` (only the `#get` section carries it). Threshold `0.06`, `rootMargin: 0px 0px -10% 0px`, unobserves after firing. Staggered `transition-delay` of `(i % 3) × 80ms`. Transition: `opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1)` from `opacity:0; translateY(16px)`.

### Smooth scrolling
`Get early access` and the nav `Early access` link call `window.scrollTo({ top, behavior:'smooth' })` with a −40px offset from the section's document position, then `focus({ preventScroll:true })` the input after 520ms. All other anchors are native `href="#id"` jumps with **no** `scroll-behavior:smooth` set on the document — **TODO: consider adding it for consistency.**

### Demo overlay
1. Click sets `tourOpen: true` and `document.body.style.overflow = 'hidden'`
2. Fake progress counter starts: `+max(0.5, (94 − p) × 0.055)` every 60ms, capped at 92
3. The 46-tick bar fills in step with the percentage; the status label cycles through four strings
4. The iframe's `onLoad` fires `finishTour()`: jumps to 100, waits 420ms, fades the loader out over 480ms, then unmounts it
5. Close restores `body.overflow` and clears both timers

**Iframe fit behaviour (lives in `Savvy Bee Prototype.html`, not the landing page — full detail in §14).** The prototype shell injects a style + script into every screen it loads:
- `html, body { overflow:hidden !important; margin:0 !important; height:100% !important; width:100% !important; position:fixed !important; inset:0 !important; touch-action:none }`, scrollbars hidden
- A script finds the 421px-wide phone div, forces its wrapper to a centred `100vw × 100vh` flex box with no padding, and applies `transform: scale(min(1, (innerWidth − 8)/421, (innerHeight − 8)/880))`
- It then walks every descendant: vertical scrollers get `overflow-x:hidden`, `touch-action:pan-y`, `overscroll-behavior:contain`; horizontal rows get `touch-action:pan-x`, `overscroll-behavior-x:contain`
- Re-runs on `resize`, `orientationchange`, `load`, a `MutationObserver` on the document, and a 1500ms interval
- A `scroll` listener snaps the window back to `0,0` if anything escapes

This is what makes the demo fit any viewport and stops horizontal drift. **The rebuild must preserve it or reimplement it.**

### Not present
No carousel autoplay controls, no accordions, no counters, no video, no parallax on images, no marquee, no cookie banner.

---

## 8. RESPONSIVE BEHAVIOUR

There are **no CSS media queries**. Everything is `clamp()`, `auto-fit` grids, and the single `innerWidth >= 900` JS switch.

| Section | Tablet (768px) | Mobile (390px) |
|---|---|---|
| Header | Nav wraps to a second line under the logo (`flex-wrap:wrap`, `gap:14px 28px`). Demo button stays inline. **No hamburger.** | Same wrapping, tighter gutter (18px) |
| Hero | Grid collapses to one column (min track 330px). Phone stacks **below** the copy | Same. Phone is 311×651 fixed — does not shrink further |
| Hero scope list | `max-width:440px`, unchanged | Unchanged |
| Nahl | Grid collapses to one column (min 320px). Chat card below the copy, `max-width:390px` | Same |
| Modules | **<900px switches to the stacked layout entirely** — no sticky column, no pinned scroll, no tick rail | Same. Device track is a horizontal snap carousel; devices scale to `max(180, vw × 0.72) / 421` |
| Waitlist | Grid collapses to one column (min 270px). Form below the copy | Same. Input and button both `flex:1` and wrap onto separate lines (`min-width:180px` / `160px`) |
| Footer | Columns reflow via `auto-fit minmax(160px,1fr)` — typically 2 columns at 768px | Usually 1–2 columns |
| Demo overlay | **≥900px = framed modal** with a 421px phone and a Close button | **<900px = fullscreen** iframe with a round ✕ at top-right, respecting `env(safe-area-inset-top)` |

**Hidden elements by breakpoint:** the desktop tick rail and pinned device stage do not exist below 900px; the mobile swipe track, position counter and dots do not exist at or above 900px. Nothing else is hidden.

**Image crops:** none. All three PNGs render at fixed pixel sizes inside the phone frame, which itself is `transform:scale(0.74)` and does not reflow.

**Font size changes:** handled entirely by `clamp()` — see §4. No discrete breakpoint overrides.

---

## 9. SEO AND META

Current `<head>` is minimal:
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- **Page title:** **TODO — none set.** Suggest `Savvy Bee — Every account you have, finally in one place.`
- **Meta description:** **TODO — none set.** Suggest the hero body copy, trimmed to ~155 characters.
- **Open Graph title / description / image:** **TODO — none set.**
- **Twitter card:** **TODO — none set.**
- **Favicon:** **TODO — none set.** Derive from the hex logo SVG.
- **Language:** **TODO — no `lang` attribute on `<html>`.** Should be `lang="en-NG"`.
- **Canonical URL:** **TODO — depends on the domain.**

---

## 10. INTEGRATIONS

| Item | Status |
|---|---|
| Form destination | **TODO — nothing wired.** `join()` only sets local state. Needs an endpoint, an email/CRM list, or both. |
| Analytics | **TODO — none installed.** |
| Email / CRM tool | **TODO — not chosen.** |
| Booking tool | Not applicable — no booking on this page. |
| Domain | Email addresses use `mysavvybee.com`, so that is presumably the domain. **TODO: confirm.** |
| Hosting | **TODO — not specified.** |
| The demo iframe | Loads `Savvy Bee Prototype.html#Home.dc.html` as a same-origin relative path. Must be deployed alongside the landing page, or replaced with a hosted URL. See §14. |

---

## 11. OPEN QUESTIONS

Everything marked TODO above, gathered:

**Conversion and data**
1. Where should waitlist submissions go? (endpoint, CRM, email list)
2. Should the field collect email or phone? The code supports both via a `signupField` prop; email is the default.
3. Should the two Nahl pills (`Pause the transfer` etc. and `Show the maths`) do anything, or stay decorative?

**Missing states**
4. Hover, active, focus and disabled styles are undefined for every button. What should they be?
5. The form input has `outline:none` with no replacement focus ring — an accessibility gap that needs a defined focus style.
6. Nahl chips have no hover state, only active/inactive.
7. There is no mobile hamburger menu; the nav wraps instead. Is that intended, or should a menu be designed?

**Known bug**
8. The module auto-cycle uses `% 3`, so the Spend module's fourth panel (Subscriptions) is never reached automatically. Change to the panel count per module.

**Assets**
9. No standalone logo SVG file — the mark is inline in two variants (full hex-in-hex for the header, outer hex only for the footer). Export both?
10. No favicon.
11. No Open Graph image (needs 1200×630).
12. `assets/home-scroll.png` and `assets/card-0.png`–`card-3.png` exist but are unreferenced. Delete or keep?

**Meta**
13. Page title, meta description, OG tags, canonical URL, `lang` attribute — all unset.
14. Confirm the domain is `mysavvybee.com`.
15. Hosting preference.

**Deployment**
16. The demo iframe loads a relative local file. Ship the whole prototype alongside the landing page, or host it separately and point the iframe at a URL?
17. `Investors.dc.html` exists but is deliberately unlinked. Leave it out of the rebuild entirely, or deploy it at an unlisted URL?

**Legal / About**
18. The Legal page's fee figures (transfer tiers ₦10/₦25/₦50, card funding 1.4% + ₦100, brokerage 1.00%, FX rate + 0.5%) were set as reasonable defaults, **not confirmed economics**. Needs sign-off before publishing.
19. Every bracketed placeholder left in the Legal copy needs counsel to fill or confirm. The draft banner at the top of the page says so; `draftNotice` turns it off. See §12.
20. `Legal.dc.html` and `About.dc.html` have **no footer link back to each other** — Legal's footer links only to Terms, About's only to Legal. Should the three pages share one footer?
21. The About page's "Where we've been" section describes the ministry and TAJBank meetings as exploratory with nothing signed. That wording was deliberate and should not be tightened or loosened without sign-off.

**Demo**
22. Ship `Savvy Bee Prototype.html` (2.3 MB, self-contained) alongside the landing page, or host it separately and point the iframe at a URL? See §14.


---

## 12. LEGAL PAGE (`Legal.dc.html`)

One page holding four documents behind a tab strip. Same Alabaster tokens as the landing page (§4) — no new colours, no new type styles.

### Structure, top to bottom

**Header** — identical pattern to the landing header: sticky, `rgba(248,246,241,0.94)` + `blur(12px)`, bottom `0.5px solid #E8E5DE`, `max-width:1180px`, `min-height:64px`. Logo lockup links to `Landing.dc.html`. Nav: `Product` → `Landing.dc.html#modules`, `About` → `About.dc.html`, `Early access` → `Landing.dc.html#get`. **No CTA button** — this header is quieter than the landing one.

**Title block** — `padding:clamp(36px,6vw,64px) clamp(18px,4vw,32px) 0`
- Eyebrow: `LEGAL AND FEES` — JetBrains Mono 10px, `letter-spacing:0.07em`, `#B8860B`
- H1: `The rules, the prices and what to do when something goes wrong.` — `clamp(28px,4.4vw,46px)`, weight 400, `letter-spacing:-0.035em`, `line-height:1.06`, `max-width:640px`
- Body: `Four documents. Written to be read once and understood, rather than agreed to without being opened.` — `clamp(14.5px,1.5vw,16px)`, `line-height:1.65`, `#6B6860`, `max-width:520px`

**Draft banner** — shown when prop `draftNotice` is true (default). `background:#fff`, `border:0.5px solid #E8E5DE`, `border-left:2px solid #B8860B`, `border-radius:12px`, `padding:15px 17px`, `max-width:640px`
- Kicker: `DRAFT FOR REVIEW` — JetBrains Mono 9.5px, `#B8860B`
- Body: `Rates, timelines and partner arrangements are settled internally but not yet reviewed by counsel or the compliance lead. Treat this as the intended position rather than executed policy.`

**Tab strip** — a grid, `repeat(auto-fit,minmax(min(100%,170px),1fr))`, sitting on a `border-top:0.5px solid #E8E5DE`. Each tab is an `<a href="#id">` with `border-top:2px` (active `#B8860B`, inactive `#E8E5DE`) and `margin-top:-0.5px`, `padding:18px 0 17px`:
- Number: JetBrains Mono 9.5px, `letter-spacing:0.07em`, `#9C9A95`
- Label: 15px / 500, active `#1C1917` / inactive `#9C9A95`, `transition:color .25s`
- Hint: 12.5px, `line-height:1.5`, `#9C9A95`, `max-width:200px`

| # | Label | Hint (verbatim) | Anchor |
|---|---|---|---|
| 01 | `Terms of use` | `What you agree to when you use Savvy Bee.` | `#terms` |
| 02 | `Privacy` | `What we hold, why, and how to get it back or deleted.` | `#privacy` |
| 03 | `Fees` | `Every charge, including the ones we pass on.` | `#fees` |
| 04 | `Complaints` | `How to raise one, our timelines, and where to escalate.` | `#complaints` |

**Document body** — two-column grid, `repeat(auto-fit,minmax(min(100%,260px),1fr))`, `gap:clamp(28px,4vw,56px)`, `align-items:start`. The right column is `grid-column:span 2`.

*Left column (`max-width:300px`)* — the document's title (`clamp(22px,3vw,30px)`, weight 400, `letter-spacing:-0.03em`), a meta line (JetBrains Mono 9.5px, `#9C9A95`, `line-height:1.8`), an intro paragraph (13.5px, `#6B6860`), then a numbered index of the document's sections — each row `padding:9px 0`, `border-top:0.5px solid #E8E5DE`, number in JetBrains Mono 10px `#9C9A95`, heading 12.5px `#6B6860`.

*Right column* — the sections themselves, `max-width:680px`. Each: `border-top:0.5px solid #E8E5DE`, `padding-top:20px`, a 22px-wide JetBrains Mono 10px number in `#B8860B`, an H3 at `clamp(16px,1.9vw,19px)` / 500, then body content indented `padding-left:36px`:
- Paragraphs: 14px, `line-height:1.7`, `#6B6860`
- Bullet rows: `padding:10px 0`, `border-top:0.5px solid #E8E5DE`, a 5px `#D8D4CC` dot offset `translateY(-3px)`, text 13.5px `#1C1917`
- Data rows (fees, timelines): wrapped in `background:#fff`, `border:0.5px solid #E8E5DE`, `border-radius:12px`. Each row `padding:14px 17px` with a `0.5px` divider above (except the first), label 13.5px `#1C1917` + optional note 12px `#9C9A95`, value right-aligned in JetBrains Mono 13px (`#1C1917`, or `#B8860B` when flagged `accent`)

**Next-document footer** — `border-top:0.5px solid #E8E5DE`, `padding-top:22px`. Label `Next: <label>` 14px / 500, the next document's hint below at 13px `#6B6860`, and a `Read it` button (height 46px, `padding:0 22px`, `border-radius:50px`, `border:0.5px solid #1C1917`). Cycles 01 → 02 → 03 → 04 → 01.

**Footer** — legal line `Savvy Bee Ltd (RC 8326527). A311, Garki Mall, Damaturu Street, Garki II, Abuja, FCT, Nigeria. Investing carries risk; past performance is not indicative of future returns. Nothing on this page is financial advice.` plus a contact stack: `hello@mysavvybee.com`, `complaints@mysavvybee.com`, `privacy@mysavvybee.com`, `+234 813 506 8614`. Copyright `© 2026 SAVVY BEE LTD · ABUJA, NIGERIA`.

### Behaviour
- Tab clicks set state **and** write the hash; a `hashchange` listener syncs the other way, so `Legal.dc.html#fees` deep-links correctly. That is how the landing footer's four links work.
- Switching document scrolls to top (`behavior:'auto'`).
- Props: `accent` (colour, default `#B8860B`), `openDoc` (enum `terms`/`privacy`/`fees`/`complaints`), `draftNotice` (boolean, default true).

### The content
**Read `Legal.dc.html` for the copy — it is long and must be reproduced verbatim.** Section counts and posture:

- **Terms of use** — 15 sections. Version 0.4 draft. Covers: the company (RC 8326527, Garki II address); that Savvy Bee is not a bank and takes no deposits in its own name; eligibility (18+, Nigerian resident, BVN/NIN); account security; read-only account connections through a licensed connectivity provider; Nahl as information not advice, proposing and never acting alone; capsules held with a licensed partner so client funds are not company funds; vault early-break forfeiting accrued interest; investing through a licensed broker-dealer with securities held in the user's own name at the depository; circles as arrangements between members with Savvy Bee as register and escrow, not guarantor or insurer; fees by reference to the Fees schedule with 30 days' notice; prohibited uses; suspension, closure and 24-month dormancy; liability; changes with 14 days' notice; complaints and FCT jurisdiction.
- **Privacy notice** — 12 sections, written to the **Nigeria Data Protection Act 2023**. Controller is Savvy Bee Ltd; DPO at `privacy@mysavvybee.com`. Covers what is collected, the four lawful bases (contract, legal obligation, consent, legitimate interests), automated processing and Nahl, who data is shared with (explicitly: no sale, no transaction data for advertising), cross-border transfers, seven-year retention, the six data-subject rights, a 30-day response commitment, cookies, children, and escalation to the **Nigeria Data Protection Commission**.
- **Fees and charges** — 7 tabled sections. Launch pricing, all figures in ₦. Account and analysis free with no maintenance or inactivity fee; transfers free in-network and ₦10 / ₦25 / ₦50 by band out; card funding 1.4% + ₦100 passed through at cost; saving free with interest set by the partner; brokerage 1.00% of consideration with exchange and regulatory fees at cost; FX at rate + 0.5%; circles free; then a separate section for charges that are not Savvy Bee's (EMTL ₦50, VAT 7.5%, withholding tax at statutory rate, the user's own bank's charges); and a 30-day notice commitment on increases.
- **Complaints procedure** — 6 sections, aligned to the **CBN Consumer Protection Regulation**. Four routes in (in-app, `complaints@mysavvybee.com`, +234 813 506 8614 Mon–Fri 8am–6pm WAT, and a letter to The Complaints Officer at the Garki II address); what to include; a tabled SLA (acknowledge in three business days, resolve in 14 days, up to 30 where a third party is involved, reversals per CBN timelines); second-level review by a different senior reviewer within 14 days; then escalation to **CBN Consumer Protection Department** (`cpd@cbn.gov.ng`), the **SEC**, the **NDPC** or the **FCCPC**; and a note that every complaint is logged, reported to the board quarterly and fed to the roadmap.

**Bracketed placeholders remaining** — all need counsel: the card-funding and brokerage rates are set but unconfirmed; `[24]` months dormancy; `[7]` years retention (written out as "seven" in the privacy copy); `[3]` business days and `[14]` days in the complaints SLA; `[30]` days for third-party complaints; `[1.4]`, `[1.0]`, `[0.5]` where still bracketed; `[LAUNCH DATE]`.

---

## 13. ABOUT PAGE (`About.dc.html`)

Team and track record. Same tokens, same header pattern.

### Structure

**Header** — as Legal's, but nav is `Product` → `Landing.dc.html#modules`, `Team` → `#team`, `Where we've been` → `#work`, **plus** a `Get early access` button (height 38px, `#1C1917`, white text, 13px) linking to `Landing.dc.html#get`.

**Hero** — `padding:clamp(40px,6vw,76px) clamp(18px,4vw,32px) 0`
- Eyebrow: `ABOUT` — JetBrains Mono 10px, `#B8860B`
- H1: `Two founders, a design practice and a governance background.` — `clamp(30px,5vw,52px)`, weight 400, `letter-spacing:-0.035em`, `line-height:1.06`, `max-width:720px`
- Body: `Savvy Bee is built in Abuja. We spend as much time in classrooms and ministry offices as we do in the product, because the money habits we are building for already exist — they just run on group chats and cash.` — `clamp(15px,1.6vw,17px)`, `line-height:1.64`, `#6B6860`, `max-width:540px`

**Team (`#team`)** — section label `THE TEAM` on a `0.5px` top border. Two people, `gap:clamp(48px,6vw,80px)`. Each is a grid `repeat(auto-fit,minmax(min(100%,270px),1fr))` with the portrait in column 1 and `grid-column:span 2` of text beside it.
- Portrait: `border-radius:12px`, full width. Caption below in JetBrains Mono 9.5px `#9C9A95`. (A `noImg` fallback renders a `#F0EDE6` 4:5 box reading `PORTRAIT TO COME` — currently unused, both portraits exist.)
- Name: `clamp(22px,3vw,32px)`, weight 400, `letter-spacing:-0.03em`
- Role: 14px `#6B6860`
- Bio: two paragraphs, 15px, `line-height:1.66`, `#6B6860`, `max-width:520px`
- Two label groups side by side (`EDUCATION` and `SELECTED`), each row `padding:11px 0` on a `0.5px` top border at 13.5px
- Focus chips: `padding:7px 13px`, `border-radius:22px`, `border:0.5px solid #E8E5DE`, `background:#fff`, JetBrains Mono 9.5px `#6B6860`

| | Omotunwase Osinaike | Musa Umar Yar'adua |
|---|---|---|
| Role | `Co-founder and CEO · product and design` | `Co-founder · operations, partnerships and institutional relationships` |
| Portrait | `assets/founder-omotunwase.jpg` | `assets/founder-musa.jpg` |
| Education | `BSc Architectural Engineering and Design Management, Loughborough University` · `MA Design, Central Saint Martins` | `BSc Business Management and International Relations` · `PhD Sustainable Development (final year)` · `Certificate in International and Nongovernmental Organizations` |
| Selected | `Represented Nigeria at the 2023 London Design Biennale, with a reception at 10 Downing Street` · `People's Champion, Future Africa × CatalyzU Fellowship` · `Google-certified UX designer, with product management certification` | `Merit scholarships at both postgraduate levels` · `Deep institutional knowledge of Nigeria's governance landscape` · `Operations, partnerships and institutional relationships` |
| Chips | `PRODUCT` `DESIGN` `AI AND INTELLIGENCE` | `OPERATIONS` `PARTNERSHIPS` `INSTITUTIONS` |

Bios are in the source verbatim and must not be paraphrased.

**Where we've been (`#work`)** — label `WHERE WE'VE BEEN`, H2 `We test in the room, not in a spreadsheet.` (`clamp(24px,3.4vw,38px)`, weight 400), intro `Three pieces of work that shaped the product. None of them is a commercial agreement, and we describe them as what they were: a pilot, and conversations.`

Three entries, each a grid `repeat(auto-fit,minmax(min(100%,280px),1fr))` with copy left and photos right. Photos are `background-size:cover` divs with `role="img"` and an `aria-label`, `height:clamp(180px,20vw,240px)`, `border-radius:12px`, each with a JetBrains Mono 9.5px caption.

| Kicker | Colour | Title | Photos |
|---|---|---|---|
| `PILOT · KATSINA STATE` | `#0D7A5F` | `A classroom pilot that changed the product` | `photo-pilot-a.jpg` (`PROTOTYPE PILOT, KATSINA STATE`), `photo-pilot-c.jpg` (`LIVE CLASSROOM SESSION`) |
| `CONVERSATIONS · FEDERAL MINISTRY` | `#1C1917` | `Meetings on the Nigeria for Women Project` | `photo-ministry-1.jpg` (`WORKING SESSION, ABUJA`), `photo-ministry-2.jpg` (`ONBOARDING PATHWAYS DISCUSSION`) |
| `CONVERSATIONS · NON-INTEREST BANKING` | `#185FA5` | `Sitting down with TAJBank` | `photo-tajbank.jpg` (`MEETING ON NON-INTEREST SAVINGS`) |

> **Claims posture — do not edit.** The ministry and TAJBank entries state in their body copy that the conversations were exploratory and that nothing has been signed. That wording is deliberate and legally material. Reproduce it verbatim.

**Closing CTA** — `border-radius:12px`, `background:#1C1917`, `color:#F8F6F1`, `padding:clamp(30px,5vw,60px)`. H2 `The product is further along than the story.` (`clamp(22px,3.2vw,34px)`, weight 400), body `Join the private beta and see it rather than read about it.` (14.5px `#9C9A95`), and a `Get early access` button (height 52px, `#F8F6F1` fill, `#1C1917` text) to `Landing.dc.html#get`.

**Footer** — legal line `Savvy Bee Ltd (RC 8326527). A311, Garki Mall, Damaturu Street, Garki II, Abuja, FCT, Nigeria.` plus `hello@mysavvybee.com`, `+234 813 506 8614`, and `Terms, privacy and fees` → `Legal.dc.html#terms`. Copyright as elsewhere.

### Behaviour
Static. No state, no animation, no scroll effects. One prop: `accent` (colour, default `#B8860B`).

---

## 14. THE DEMO (`Savvy Bee Prototype.html`)

### What it is
A single self-contained 2.3 MB HTML file with **46 app screens inlined as strings**, plus the prototyping runtime as a string. It renders one screen at a time into an iframe via `srcdoc`, and carries a floating screen-picker with grouped search.

**Ship this file as-is. Do not rebuild it, and do not rebuild the app screens inside it.** It is the demo the landing page opens, nothing more. The app itself is a separate product built elsewhere.

### How the landing page uses it
```html
<iframe src="Savvy%20Bee%20Prototype.html#Home.dc.html" title="Savvy Bee demo"></iframe>
```
Same-origin relative path, filling its container. The landing page's loader completes on the iframe's `onLoad` (§7).

### It opens on Home
The start screen resolves in this order: the URL hash, then `Home.dc.html`, then `Onboarding.dc.html`, then the first screen in the file. So the demo lands on the Home screen whether or not the hash is present — the landing page passes `#Home.dc.html` anyway, belt and braces.

### The fit and overscroll fix
The original problem: each screen is a 421×880 phone on a padded desk background. In a small iframe the phone was clipped — the bottom nav and Nahl bar were unreachable — and horizontal card carousels inside the phone handed their momentum to the page, so the whole view drifted sideways into blank space.

Fixed **in the shell, not per screen**. `buildDoc()` injects a style block and a script into every screen before it loads:

**The style block**
```css
html, body {
  overflow: hidden !important;
  margin: 0 !important;
  height: 100% !important;
  width: 100% !important;
  position: fixed !important;
  inset: 0 !important;
  touch-action: none;
}
* { scrollbar-width: none }
*::-webkit-scrollbar { display: none }
```

**The script**, which runs a `fit()` pass:
1. Finds the phone by looking for the `div` whose inline `width` is `421px`, and caches it
2. Forces its wrapper to a centred, unpadded `100vw × 100vh` flex box with `overflow:hidden`
3. Scales the phone: `transform: scale(min(1, (innerWidth − 8) / 421, (innerHeight − 8) / 880))` with `transform-origin: center center` and `flex: none`
4. Walks every descendant once, tagging each with `data-fitLocked` so the work is never repeated:
   - A **horizontal row** (scrolls wider than it is, no taller) gets `overflow-y:hidden`, `touch-action:pan-x`, `overscroll-behavior-x:contain` → a swipe can scroll the row but cannot hand momentum to the page
   - A **vertical scroller** gets `overflow-x:hidden`, `touch-action:pan-y`, `overscroll-behavior:contain`
   - A scroller that does not actually overflow gets `overflow-x:hidden`

`fit()` re-runs on `resize`, `orientationchange`, `load`, a `MutationObserver` on the document, and a 1500 ms interval — debounced to 60 ms. A `scroll` listener snaps the window back to `0,0` if anything escapes.

Net effect: the phone always fits, the bottom nav and Nahl bar are always visible, carousels still swipe, and the page cannot drift.

**If you replace the demo with a hosted URL, this behaviour must come with it.** It is the difference between a demo that works in a phone-sized iframe and one that does not.

### Also injected
A same-origin shim, added to every screen's `<head>`, which intercepts `fetch` for `*.dc.html` and serves it from the parent's in-memory file map, and rewrites clicks on `.dc.html` links into parent navigation. That is what makes in-app navigation work inside `srcdoc`. Reference only — it exists to serve the prototype.

### Screen inventory
46 screens in eight groups: **Start here** (7), **Home** (8), **Spend** (1), **Save & circles** (13), **Invest** (13), **Nahl** (1), **Hive** (2), **Reference** (1). The picker lists them grouped with live search.
