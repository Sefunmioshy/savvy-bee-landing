# INVENTORY — Savvy Bee Landing Page Rebuild

> **Second bundle (`landing-page-handoff- updated/`, WHATS-NEW.md):** the landing page and device components are byte-identical to the first bundle — nothing below changed. The bundle adds three in-scope items, verified against their own live renders:
> - **`Savvy Bee Prototype.html`** (BRIEF §14) — the 46-screen demo, shipped **as-is** into `site/` (2.3 MB, self-contained; carries its own fit/overscroll shell). The demo overlay iframe now loads it (`#Home.dc.html`).
> - **`Legal.dc.html`** (BRIEF §12) — rebuilt as `site/legal.html` + `site/js/legal.js`: sticky quiet header; title block; DRAFT FOR REVIEW banner; 4-tab strip (`01 Terms of use / 02 Privacy / 03 Fees / 04 Complaints`, each with its verbatim hint); per-document index + sections (Terms 15, Privacy 12, Fees 7 with fee tables, Complaints 6 with SLA table); next-document footer cycling 01→02→03→04→01; hash read/write for `#terms/#privacy/#fees/#complaints` deep links; own footer with `complaints@` and `privacy@` addresses. All copy verbatim from the export's DOCS data, including `VERSION 0.4 · DRAFT` meta lines and typographic apostrophes (`30 days’ notice`).
> - **`About.dc.html`** (BRIEF §13) — rebuilt as `site/about.html` (static): header with `Get early access` CTA; hero; `#team` (two founders — portraits `founder-omotunwase.jpg` / `founder-musa.jpg`, verbatim bios, EDUCATION/SELECTED lists, focus chips); `#work` (Katsina pilot ×2 photos, Federal Ministry ×2, TAJBank ×1 — photos as `role="img"` background divs with verbatim captions); dark closing CTA card; own footer with `Terms, privacy and fees` link. **The exploratory/nothing-signed wording in the ministry and TAJBank entries is legally material and reproduced verbatim.**
> - New assets copied to `site/assets/img/`: 2 portraits + 5 photos.

Sources: `landing-page-handoff/` — BRIEF.md, HANDOFF_INSTRUCTION.txt, README.md,
`design-export/Savvy Bee Landing (standalone).html` (self-extracting bundle; the live reference),
`design-export/claude-code-handoff/` (Landing.dc.html + 4 device components + support.js runtime),
19 screenshots, 3 PNG assets.

---

## (a) Sections, in order

1. **Sticky header** — logo lockup, 4 nav links, "Open the demo" pill
2. **Hero** (`id="top"`) — eyebrow pill, H1, body, 2 CTAs, 5-row scope list; right: phone mockup (bezel + chrome PNGs + 5-card 3D coverflow carousel + dots + cross-fading Combined image / per-account detail)
3. **Nahl** (`id="nahl"`) — full-bleed dark band; eyebrow, H2, body, "TRY A QUESTION" label, 4 chips; chat card (header, user bubble, thinking dots, answer, 2 action pills)
4. **Modules** (`id="modules"`) — H2; then TWO layouts switched at `innerWidth >= 900`:
   - **Desktop pinned-scroll:** 4 copy blocks (`#spend` `#save` `#invest` `#circles`, each min-height 74vh) with progress rails + feature rows | sticky right column with 4 stacked device components + tick rail
   - **Mobile stacked:** kicker + `n / 4` counter, H3, body, feature rows, horizontal scroll-snap device track, dots, `SWIPE THE PHONE · TAP A FEATURE` caption
5. **Waitlist** (`id="get"`, `data-reveal="1"`) — dark card: H2, body | input + "Request invite" button, error line, helper caption; success state swaps the form row
6. **Footer** — logo (outer hex only), legal text, contact links, PRODUCT / COMPANY / LEGAL columns, copyright
7. **Demo overlay** — desktop framed modal (≥900px) / mobile fullscreen (<900px), both with a 46-tick fake-progress loading screen over an iframe

---

## (b) Visible text, verbatim, by section

### Header
- `Savvy Bee` (wordmark)
- `Nahl` · `Modules` · `About` · `Early access` (nav)
- `Open the demo` (button)

### Hero
- `PRIVATE BETA · ABUJA` (eyebrow)
- `Every account you have, finally in one place.` (H1)
- `Connect your banks in a few minutes and Savvy Bee pulls spending, savings goals, contribution circles and NGX holdings into a single net position — read by an AI copilot that speaks up before something breaks.` (body)
- `Get early access` · `Open the demo` (buttons)
- Scope rows: `Combined ₦1,575,900` · `Savvy Bee Wallet ₦847,200` · `GTBank ₦184,500` · `Kuda ₦96,300` · `OPay ₦52,400`
- Carousel card glyphs: `◆ COMBINED` · `● SAVVY BEE · TRANSACTABLE` · `○ VIEW ONLY` (×3); balances and names as in scope rows
- Per-account detail (inside phone): labels `SAVVY BEE POSITION` / `GTBANK BALANCE` / `KUDA BALANCE` / `OPAY BALANCE`; figures `₦1,242,700` / `₦184,500` / `₦96,300` / `₦52,400`; day pills `+2.1%` / `-0.4%` / `+0.6%` / `+0.2%`
  - Wallet legend: `Wallet ₦847k 68%` · `Saved ₦215k 17%` · `Invested ₦103k 8%` · `Hive ₦78k 6%`
  - GTBank legend: `Bills & utilities ₦59k 32%` · `Transfers ₦44k 24%` · `Food & dining ₦33k 18%` · `Transport ₦26k 14%` · `Other ₦23k 12%`; card: `○ VIEW ONLY` + `Imported from GTBank · read-only · last synced 2h ago · 1,240 transactions`
  - Kuda legend: `Food & dining ₦38k 39%` · `Shopping ₦24k 25%` · `Transport ₦18k 19%` · `Airtime & data ₦9k 9%` · `Other ₦7k 8%`; `Imported from Kuda · read-only · last synced 1h ago · 480 transactions`
  - OPay legend: `Transfers ₦21k 40%` · `Airtime & data ₦14k 27%` · `Betting ₦9k 17%` · `Food ₦5k 10%` · `Other ₦3k 6%`; `Imported from OPay · read-only · last synced 30m ago · 320 transactions`

### Nahl band
- `NAHL · YOUR CO-PILOT` (eyebrow) — `Ask in plain words. Get the maths, then the fix.` (H2)
- `Nahl reads every account you connect — salary, bills, subscriptions, goals, holdings — and works out what a decision actually costs before you make it.` (body)
- `TRY A QUESTION` (label)
- Chat card: `Nahl` · `READING 4 ACCOUNTS` · `Show the maths`
- Q&A pairs (question / answer / action pill):
  1. `Can I afford Detty December?` / `Yes, with one change. Your Safety Floor holds at ₦180,000 if you pause the ₦45,000 monthly transfer to Rent 2027 for two cycles. Rent stays fully funded — you land 11 days late on the goal, not short on the bill.` / `Pause the transfer`
  2. `What is eating my salary?` / `Three subscriptions renewed within four days of payday and took ₦38,400 before your bills queue ran. Two of them you have not opened in 60 days. Cancelling both moves your safe-to-spend up ₦26,900 a month.` / `Review subscriptions`
  3. `Is my rent goal on track?` / `Rent 2027 is at 82% with 11 weeks to go, and the payday sweep covers the rest with ₦40,000 spare. The risk is January — your circle payout lands after the rent date, so I would move the sweep two days earlier.` / `Move the sweep`
  4. `Should I buy more GTCO?` / `You can, but it would take banking to 41% of your portfolio against the 30% ceiling in your risk profile. A ₦25,000 buy keeps you inside it. Anything larger and I will ask you to change the profile first.` / `Buy ₦25,000`

### Modules
- `Four instruments. One balance they all agree on.` (H2)
- Mobile-only: counter `1 / 4` … `4 / 4`; caption `SWIPE THE PHONE · TAP A FEATURE`
- **SPEND** / `Accounts that explain themselves` / `One feed across every linked bank and card, categorised on arrival. Safe-to-spend is worked out after your bills, not before them. Underneath it sit three tools most banking apps do not have at all.`
  - `The Spend home` — `Your wallet and every linked account on one carousel, safe-to-spend worked out after bills, and the month’s flow in a single bar.`
  - `Budgets` — `Five rails running live against the month, with the one you are over shown in red.`
  - `Spending heatmap` — `Every day of the month shaded by what you spent, so the outliers name themselves.`
  - `Subscriptions` — `What renews next, what you stopped opening, and what cancelling it saves you a year.`
- **SAVE** / `Goals that fill themselves` / `Open a capsule for rent, school fees or an emergency buffer, set the rule and let it run. Lock it if you are tempted. Nothing ever saves you below the floor you set.`
  - `Payday auto-save` — `The day after salary lands, one split across every goal — and you see it the night before.`
  - `Savings rules` — `Round-ups, inflow sweeps, ₦500 every takeout. Nahl proposes new ones from what it sees.`
  - `Capsules and vaults` — `One pot per goal, with a 90-day vault for the money you should not be able to reach.`
- **INVEST** / `The NGX, without the brokerage runaround` / `Screen Nigerian equities and funds, buy fractions, rebalance on a schedule. Every order shows its full cost before you place it.`
  - `A company, in full` — `Dangote Cement: live price, analyst consensus, dividend history and the numbers behind them.`
  - `Risk profile, then first investment` — `Read from 847 real transactions, not a quiz you could game — then applied to every order.`
  - `Rebalance` — `Where the market pushed you off target, what it costs to correct, and one tap to do it.`
- **CIRCLES & THE HIVE** / `Ajo and esusu, with the trust written down` / `Run a contribution circle or a shared goal with people you already trust, and let the rotation, the escrow and every on-time record be a matter of fact instead of a group-chat argument.`
  - `The circle` — `Fixed rotation, escrow-held contributions, and a payment record every member can see.`
  - `Group goals` — `One target, many contributors — including who is behind and what would keep them in.`
  - `The Nahl group register` — `Nahl in the group is neutral and rule-bound. Nahl in your private channel is only yours.`

### Device components (text inside phones; verbatim from the 4 .dc.html files)
- **Spend Device** — titles `Spending` / `Budgets` / `Spending heatmap` / `Subscriptions`; pill `June`.
  Panel 1: `Savvy Bee`, `Wallet · spendable`, `₦847,200`, `••4291`, `Transactable`, `GTBank`, `linked · view only`, `Spendable`, `₦184,500`; quick actions `Transfer` `Pay Bills` `Airtime & Data` `Request`; `Spent this month`, `₦96,900`, `₦12,450 under budget` + ` with 8 days left`; `This month's flow`, legend `In ₦320k` `Spent ₦87k` `Saved ₦60k` `Invested ₦40k`; `Nahl`, `You're ₦5k over on food but under everywhere else — net, you're in good shape. Biggest opportunity: ₦7,200/mo in unused subscriptions.`
  Panel 2: `Total budgeted` `₦103,000` / `Spent` `₦96,900`; rails `Food delivery ₦25.4k / ₦20k` (over→red), `Transport ₦12k / ₦15k`, `Data ₦8.5k / ₦10k`, `Utilities ₦45k / ₦50k`, `Entertainment ₦6k / ₦8k`
  Panel 3: stats `₦87,450 Spent` `₦3,975 Per day` `19 Active days`; `Each day shaded by how much you spent.`; day headers `S M T W T F S`; day cells 1–30 with values like `2k…38k`; scale `Less … More`
  Panel 4: `NAHL`, `₦7,200/mo on subscriptions unused 3+ weeks — that's ₦86,400/yr. Cancel the two I've flagged?`, `Cancel both`; `Next 30 days`; rows `Notion — 0 opens in 23 days — ₦2,400/mo`, `Apple Music — Possible duplicate of Spotify — ₦1,800/mo`, `DSTV Premium — Used 4 days ago — ₦24,500/mo`, `Spotify — Used today — ₦1,200/mo`; `Subscriptions this year` `₦755,400` `Cancelling the flagged two saves ₦86,400/yr.`
  Nahl bar: `Ask me about your spending`; tabs `Home Spend Save Invest Nahl`
- **Save Device** — titles `Payday auto-save` / `Savings rules` / `Capsules`; pills `26 Sep` / `Active` / `₦460k saved`.
  Panel 1: `The day after payday, I'll set aside`, `₦45,000`, `across 4 goals · you keep ₦210,000 for the month`; `Allocation`; rows `Rent — Due 1 Jan · ₦600,000 target — ₦20,000`, `Emergency — Three months of essentials — ₦10,000`, `Laptop — Locked vault · 90 days — ₦8,000`, `Japa fund — No deadline set — ₦7,000`; `Run automatically each payday` / `I show you the split the night before`
  Panel 2: `Rules save automatically when real life happens, and never touch your Safety Floor.`; `Safety Floor` / `Rules never save below this balance` / `₦25,000`; `Your rules` / `3 of 4 active`; rules `Save ₦500 every takeout order — When you order food delivery — → Emergency — +₦3,500 this month`, `Sweep 10% of every inflow — When money lands in your wallet — → FlexiSave — +₦24,000 this month`, `Round up every purchase — On each card payment — → Laptop — +₦740 this month`, `Save what's left each payday — Day after salary lands — → Rent — Paused`; `Saved by rules this month` `+₦28,240`
  Panel 3: `Your capsules`; cards `Rent — Vault · locked — 82% — ₦164k / ₦200k`, `Emergency — FlexiSave — 57% — ₦57k / ₦100k`, `Laptop — Goal Pot · open — 34% — ₦34k / ₦100k`, `Japa / Travel — Group Goal — 41% — ₦205k / ₦500k`, `New capsule`
  Nahl bar: `Ask Nahl to build a rule`
- **Invest Device** — titles `DANGCEM` / `Risk profile` / `Rebalance`; pills `NGX` / `1 of 3` / `Q3 drift`.
  Panel 1: `Dangote Cement Plc`, `₦485.00`, `+₦19.50 (4.2%) today`, `NGX · 14:32`; frames `1D 1W 1M 1Y ALL`; `Open ₦470` `High ₦489` `Low ₦468` `Vol 2.4M`; `BUY` / `14 analysts · consensus`; `Strong buy 7` `Buy 4` `Hold 2` `Sell 1`; `Avg price target` `₦540 (+11.3%)`; `Market cap ₦8.2Tn` `P/E 12.4` `EPS ₦39.10` `Div yield 5.2%`; buttons `Sell` `Buy`
  Panel 2: `NAHL`, `I read your risk profile from how you actually handle money — 847 transactions over four months. Here is what I see.`; evidence `Cash flow stability — High · consistent monthly income — Strong`, `Savings discipline — 18% savings rate, above average — Strong`, `Emotional spend pattern — Moderate · some stress-linked spending — Watch`; `Your profile` `MODERATE GROWTH` `Comfortable with medium-term market fluctuations. Prioritises growth over pure safety.` `Based on real behaviour, not a quiz you could game.`; `See my recommended portfolio →`; `Adjust manually`
  Panel 3: `Four months of market moves pushed your mix off its target. Here is the drift.`; sleeves `Nigerian equities +7 pts (now 52% target 45%)`, `Fixed income −6 pts (24/30)`, `Money market −1 pts (14/15)`, `Gold on target (10/10)`; `NAHL` `Equities are 7 points over target, mostly DANGCEM. Selling ₦38,400 and buying FGN bonds brings you back to Moderate Growth. Cost: ₦412 all in.` `Rebalance now`; `Do this automatically each quarter`
  Nahl bar per panel: `Ask Nahl about DANGCEM` / `Ask Nahl about your profile` / `Ask Nahl about the drift`
- **Circle Device** — titles `Savvy Circle` / `Group goal` / `Nahl register`; pills `Cycle 4` / `62%` / `Group`|`Private`.
  Panel 1: `Escrow held`, `Cycle 4 of 8`, `Lagos Devs Ajo`, `₦20k per week`, `8 members`, `₦160k each payout`; `Payout rotation` / `You're #4`; rotation `BK ID CN You FB KE SA TA` (1–8); `Your payout — Apr 12 — in 4 weeks · ₦160,000`; `On time — 12 of 12 — your record, visible to all`; `This cycle`: `Bola K. Paid`, `Ada D. Paid`, `Musa U. Due Friday`, `You Due Friday`; `Pay ₦20,000 into escrow`
  Panel 2: `Group goal` `Sokoto WAG · grinding mill` `6 members`; `₦742,000 of ₦1,200,000`; `62% funded` / `on pace for 14 Nov`; `Who has put in what`: `Hauwa I. ₦96,000`, `Zainab A. ₦168,000`, `You ₦160,000`, `Fatima B. ₦152,000`, `Amina S. ₦166,000`; `NAHL` `Hauwa has missed two weeks. Her cash flow says the ₦8,000 weekly is too high — ₦5,000 keeps her in and still lands the mill by 28 Nov.`
  Panel 3: toggle `Group register` / `Private`; group banner `Same Nahl, speaking to the whole circle — neutral, rule-bound, protecting every member’s floor.`; private banner `The same Nahl, now answering only to you — honestly, in your interest, even inside the group.`; group thread: `Ada proposed: raise the weekly contribution from ₦20k to ₦30k`; Ada: `Bigger payouts and we finish the round faster. Who is in?`; Nahl `Neutral mediator`: `I do not take a side. Here is exactly what +₦10k a week does for each of you.` + impacts `Ada — comfortable, wants the upside` / `You — fits your cash flow, +₦80k payout` / `Musa — would dip below his floor in week 3` + rule box `Changing the contribution mid-circle is a governance change — it needs a unanimous vote, not a majority. And I cannot let it push Musa below his Safety Floor.`; Musa: `Honestly ₦30k might be tight for me some weeks.`; private thread: `Private channel — only you can see this. The circle never sees a word.`; You: `Be straight with me — is raising to ₦30k still good for me?`; Nahl `Private · your side`: `Yes, for you specifically. Your income clears ₦30k a week comfortably, and the bigger payout lands right when your laptop goal is due.` + stats `Your floor Protected` / `Your payout +₦80,000`; Nahl: `It works for you and strains Musa. If you value the circle holding together, ₦25k is the number where everyone stays safe. Whatever you decide here stays between us.`
  Nahl bar per panel: `Ask Nahl about this circle` / `Ask Nahl about the pace` / `Message the circle…`|`Ask Nahl privately…`

### Waitlist
- `Join the private beta.` (H2)
- `We onboard a few hundred people a week, Abuja and Lagos first. Leave your email and we'll send your invite.` (body)
- Placeholder `you@email.com` (phone mode: `0801 234 5678`) · button `Request invite`
- Error (email): `Enter an email address we can send the invite to.` / (phone): `Enter a phone number we can reach you on.`
- Success: `You're on the list. Invite lands within a week.`
- Helper: `NO SPAM · ONE MESSAGE WHEN IT'S YOUR TURN`

### Footer
- `Savvy Bee` (wordmark)
- `Savvy Bee Ltd (RC 8326527). A311, Garki Mall, Damaturu Street, Garki II, Abuja, FCT, Nigeria. Investing carries risk; past performance is not indicative of future returns.`
- `hello@mysavvybee.com` · `+234 813 506 8614`
- `PRODUCT`: Spend, Save, Invest, Circles, Nahl · `COMPANY`: About, Team, Early access, Contact · `LEGAL`: Terms, Privacy, Fees, Complaints
- `© 2026 SAVVY BEE LTD · ABUJA, NIGERIA`

### Demo overlay
- `LIVE DEMO · ALL 46 SCREENS` · `Close` (desktop) / ✕ icon (mobile)
- Loader: `SAVVY BEE · LIVE DEMO`, `{pct}` + `%`, status `LOADING RUNTIME` → `MOUNTING SCREENS` → `RESTORING SESSION` → `READY`, `46 SCREENS`

---

## (c) Design tokens (exact values)

Colours: `#F8F6F1` canvas · `#FFFFFF` surface · `#F0EDE6` secondary surface · `#E8E5DE` border · `#D8D4CC` muted dot · `#1C1917` ink · `#6B6860` text-2 · `#9C9A95` text-3 · `#0F0F0D` dark bg · `#1A1A17` dark surface · `#2C2A25` dark border · `#B8860B` amber-light · `#EF9F27` amber-dark · `#0D7A5F` teal · `#A32D2D` red · `#185FA5` blue · `#3C3489` purple · `#D4537E` coral · `#B0ABA0` external seg · `#E8743B` GTBank · `#9087E0` Kuda · `#1DC468` OPay.
Alphas: `rgba(248,246,241,0.94)` header · `rgba(15,15,13,0.86)` scrim · `rgba(28,25,23,0.86)` close btn · `rgba(255,255,255,0.06)` wallet border · `rgba(255,255,255,0.55)` wallet name · `rgba(239,159,39,0.10)` chip active · `rgba(13,122,95,0.10)` / `rgba(163,45,45,0.10)` day tints · `rgba(0,0,0,0.08)` card shadow.
Device-internal extras (from the four .dc.html): `#C9C5BC`, `#E6F1ED`, `#E4ECF5`, `#EDEBF5`, `#F3ECD9`, `#FAEEDA`, `#FBEAF0`, `#F6EEDB`, `#F6E7E7`, `#D9D5CD`, `#EFEDE7`, `#F3F1EB`, `#F4E7CE`, `#EAD3A2`, `#C68F1E`, `#A5710F`, `#7A4A12`, `#5BA88E`, `#D89B9B`, `rgba(255,255,255,0.14)`, `rgba(255,255,255,0.08)`, `rgba(255,255,255,0.1)`, `rgba(255,255,255,0.15)`, `rgba(212,83,126,0.12)`, `rgba(184,134,11,0.12)`.
Global: `::selection { background:#B8860B; color:#fff }` · `a { color:#1C1917 }` · `a:hover { color:#B8860B }`.
Container 1180px; gutter `clamp(18px,4vw,32px)`; section rhythm `clamp(56px,8vw,96px)` (hero top `clamp(48px,7vw,86px)`, waitlist top `clamp(64px,8vw,104px)`, footer margin `clamp(56px,8vw,80px)`); grids `repeat(auto-fit,minmax(min(100%,Npx),1fr))` N=330/320/270/160; desktop modules `1fr 320px` gap 72px.
Radii: 50px pills · 56px bezel · 44px screen · 36px demo frame · 22px chips · 18px hero cards · 16px device account cards · 13–14px device cards · 12px dark cards/bubbles · 8px input · 3px dots · 2px bars · 50% circles.
Borders: `0.5px solid #E8E5DE` (light) / `0.5px solid #2C2A25` (dark); exceptions: wallet card `1px rgba(255,255,255,0.06)`, hero-phone inner cards `1.5px` (#EF9F27 / #E8E5DE), view-only left edge `2px #9C9A95`, rail 2px, capsule dashed `1px #D9D5CD`.
Shadow: only `0 10px 30px rgba(0,0,0,0.08)` (hero carousel cards). Blur: header 12px; scrim/close 6px. No gradients.
Keyframes: `@keyframes sbThink { 0%,100%{opacity:0.25} 50%{opacity:1} }`.

## (d) Fonts

- **Inter** 400, 500 — stack `Inter, system-ui, sans-serif` (input uses `Inter,sans-serif`)
- **JetBrains Mono** 400, 500 — stack `'JetBrains Mono', monospace`
- Google Fonts: `family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap` + two preconnects. No 600/700 anywhere. `-webkit-font-smoothing:antialiased` on body.

## (e) Assets

| Asset | Status |
|---|---|
| `assets/images/home-chrome-top.png` (786×216 @2x → 393×108) | ✅ exists |
| `assets/images/home-body.png` (786×2800 @2x → 393×1400) | ✅ exists |
| `assets/images/home-chrome-bottom.png` (786×292 @2x → 393×146) | ✅ exists |
| Logo hex (header 19×21 two paths; footer 17×19 outer only) | inline SVG, verbatim paths in source |
| Play ▶, robot, cube, arrows, ✕, all device icons | inline SVG, verbatim in source |
| Favicon | ❌ TODO — create from hex logo |
| OG image (1200×630) | ❌ TODO |
| Font files | none — Google Fonts (or self-host: to decide) |
| `Savvy Bee Prototype.html` (demo iframe target) | ❌ **not in bundle** — exists only inside the standalone bundle blob |
| `About.dc.html`, `Legal.dc.html` | ❌ not in bundle (linked from nav/footer) |

## (f) Interactions and states

1. **Hero auto-advance**: 8-step timeline (Combined 2600 → scroll −520px 2400 → −960px 2400 → back 1700 → Wallet 2600 → GTBank 2500 → Kuda 2400 → OPay 2400ms), loops; any tap on card/dot/scope row sets manual and stops it permanently. Phone body scroll `transition: transform 1.1s cubic-bezier(0.4,0,0.2,1)`.
2. **Coverflow**: per card p=i−active: `translateX(calc(-50% + p*108px)) rotateY(−p*38deg clamped ±52) scale(max(0.66, 1−|p|*0.16))`; opacity `1−|p|*0.4` (0 past 2.3); z `20−round(|p|*4)`; transitions `.55s cubic-bezier(.34,1.2,.4,1)` / `.4s ease`. Reduced motion: rotate 0, spacing 150px.
3. **Layer cross-fade** Combined image ↔ detail markup, `.45s ease`.
4. **Nahl Q&A**: chip tap → thinking 850ms (3 dots, sbThink 1s, delays 0/.18s/.36s) → answer opacity 0→1 translateY 8px→0 over .35s. Re-tap active chip: no-op.
5. **Module auto-cycle**: every 3600ms advance active module's panel `% 3` (**known bug** — Spend's 4th panel unreachable; README says fix to panel count). Feature-row tap sets per-module manual flag, stops that module's cycle.
6. **Desktop scroll weighting**: rAF-throttled scroll; per block `n=|centre−mid|/h`, `w=clamp((0.58−n)/0.22,0,1)`; copy opacity `0.26+0.74w` translate `(1−w)*26px`; rail `24+124w`px; tick `10+26w`px opacity `0.35+0.65w`; device scale `0.972+0.028*near`, drift `mOff*−16px`; nearest = active (opacity 1, others 0). Non-active copy w clamped ≤0.55; tick w clamped ≤0.5.
7. **Mobile track**: scroll-snap x mandatory; nearest-slide sets mSlide; dots scrollTo smooth (auto when reduced); inactive slides opacity 0.42.
8. **Waitlist**: validate email `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` (phone: ≥10 digits); error shows + border `#EF9F27` + refocus; any keystroke clears; success swaps row. No backend.
9. **Reveal**: IntersectionObserver on `#get` (threshold .06, rootMargin `0px 0px -10% 0px`), from `opacity:0 translateY(16px)`, `.75s cubic-bezier(.16,1,.3,1)`, delay `(i%3)*80ms`, unobserve after firing; reduced motion → immediate.
10. **Smooth scroll**: `Early access` + `Get early access` → scrollTo(#get top − 40px, smooth), focus input after 520ms (preventScroll). Other anchors: native jumps.
11. **Demo overlay**: open → body overflow hidden; fake progress `+max(0.5,(94−p)*0.055)` per 60ms, cap 92 until iframe onLoad → 100, hold 420ms, fade 480ms, unmount loader; 46 ticks fill (`30px` every 6th else `20px`, off `7px`); status strings at <26/<58/<92/else. Close clears timers, restores overflow.
12. **Device-internal interactions**: Invest chart timeframe tabs (1D/1W/1M/1Y/ALL swap SVG path); Circle register toggle (Group register / Private swaps thread + pill + banner + Nahl-bar hint).
13. **Sticky header**: translucent + blurred always; no scroll transition.
14. **prefers-reduced-motion**: stops hero + step timers, rotateY→0/150px spacing, binary weights, instant reveal, auto scrollTo.

## (g) Links and forms

See BRIEF §2 table (35 rows) — all verified against source. Highlights: nav/footer `About` → `About.dc.html`, `Team` → `About.dc.html#team`, legal links → `Legal.dc.html#terms|privacy|fees|complaints` (**targets not in bundle**); `Contact`/email → `mailto:hello@mysavvybee.com`; phone → `tel:+2348135068614`; product links → `#spend #save #invest #circles #nahl`; `Early access` → `#get` (JS scroll+focus); demo iframe → `Savvy%20Bee%20Prototype.html#Home.dc.html` (**not in bundle**). One form (waitlist), no backend, validation as in (f)8.

## Meta (from BRIEF §9)
No title/description/OG/favicon/lang in export. Suggested: title `Savvy Bee — Every account you have, finally in one place.`, description = hero body trimmed ~155ch, `lang="en-NG"`, favicon from hex logo, domain presumed `mysavvybee.com`.
