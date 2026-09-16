/* Savvy Bee landing — page controller.
   Direct port of the Landing.dc.html component logic (timeline, coverflow maths,
   scroll weighting, Q&A, waitlist, demo loader) to vanilla JS.
   One sanctioned deviation: the module auto-cycle advances modulo the module's
   panel count (the export's `% 3` bug, fixed per the handoff instruction). */
(function () {
  'use strict';
  var AMBER = '#B8860B';
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function reduced() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---- data mirrored from the export ---- */
  var LAYERS = { wallet: 847200, saved: 215000, invested: 102500, hive: 78000 };
  var EXT = [
    { id: 'gtbank', name: 'GTBank', balance: 184500, dot: '#E8743B', day: -0.4, synced: '2h ago', txns: '1,240',
      cats: [
        { label: 'Bills & utilities', color: '#185FA5', value: 59000 },
        { label: 'Transfers', color: '#0D7A5F', value: 44000 },
        { label: 'Food & dining', color: '#D4537E', value: 33000 },
        { label: 'Transport', color: '#B8860B', value: 26000 },
        { label: 'Other', color: '#9C9A95', value: 22500 }
      ] },
    { id: 'kuda', name: 'Kuda', balance: 96300, dot: '#9087E0', day: 0.6, synced: '1h ago', txns: '480',
      cats: [
        { label: 'Food & dining', color: '#D4537E', value: 38000 },
        { label: 'Shopping', color: '#3C3489', value: 24000 },
        { label: 'Transport', color: '#B8860B', value: 18000 },
        { label: 'Airtime & data', color: '#185FA5', value: 9000 },
        { label: 'Other', color: '#9C9A95', value: 7300 }
      ] },
    { id: 'opay', name: 'OPay', balance: 52400, dot: '#1DC468', day: 0.2, synced: '30m ago', txns: '320',
      cats: [
        { label: 'Transfers', color: '#0D7A5F', value: 21000 },
        { label: 'Airtime & data', color: '#185FA5', value: 14000 },
        { label: 'Betting', color: '#D4537E', value: 9000 },
        { label: 'Food', color: '#B8860B', value: 5400 },
        { label: 'Other', color: '#9C9A95', value: 3000 }
      ] }
  ];
  function extTotal() { return EXT.reduce(function (s, a) { return s + a.balance; }, 0); }
  function savvyTotal() { return LAYERS.wallet + LAYERS.saved + LAYERS.invested + LAYERS.hive; }
  function fmtFull(n) { return '₦' + Math.round(n).toLocaleString('en-US'); }
  function fmtCompact(n) { return n >= 1000 ? '₦' + Math.round(n / 1000) + 'k' : '₦' + n; }
  function scopes() {
    return [
      { kind: 'combined', name: 'Combined' },
      { kind: 'wallet', name: 'Savvy Bee Wallet' },
      { kind: 'connected', name: 'GTBank', acct: EXT[0] },
      { kind: 'connected', name: 'Kuda', acct: EXT[1] },
      { kind: 'connected', name: 'OPay', acct: EXT[2] }
    ];
  }
  var HERO_STEPS = [
    { i: 0, y: 0, ms: 2600 },
    { i: 0, y: -520, ms: 2400 },
    { i: 0, y: -960, ms: 2400 },
    { i: 0, y: 0, ms: 1700 },
    { i: 1, y: 0, ms: 2600 },
    { i: 2, y: 0, ms: 2500 },
    { i: 3, y: 0, ms: 2400 },
    { i: 4, y: 0, ms: 2400 }
  ];
  var QS = [
    { q: 'Can I afford Detty December?', a: 'Yes, with one change. Your Safety Floor holds at ₦180,000 if you pause the ₦45,000 monthly transfer to Rent 2027 for two cycles. Rent stays fully funded — you land 11 days late on the goal, not short on the bill.', action: 'Pause the transfer' },
    { q: 'What is eating my salary?', a: 'Three subscriptions renewed within four days of payday and took ₦38,400 before your bills queue ran. Two of them you have not opened in 60 days. Cancelling both moves your safe-to-spend up ₦26,900 a month.', action: 'Review subscriptions' },
    { q: 'Is my rent goal on track?', a: 'Rent 2027 is at 82% with 11 weeks to go, and the payday sweep covers the rest with ₦40,000 spare. The risk is January — your circle payout lands after the rent date, so I would move the sweep two days earlier.', action: 'Move the sweep' },
    { q: 'Should I buy more GTCO?', a: 'You can, but it would take banking to 41% of your portfolio against the 30% ceiling in your risk profile. A ₦25,000 buy keeps you inside it. Anything larger and I will ask you to change the profile first.', action: 'Buy ₦25,000' }
  ];
  var MODULES = [
    { id: 'spend', dev: 'spend', kicker: 'SPEND', color: '#1C1917',
      title: 'Accounts that explain themselves',
      body: 'One feed across every linked bank and card, categorised on arrival. Safe-to-spend is worked out after your bills, not before them. Underneath it sit three tools most banking apps do not have at all.',
      tabs: [
        { title: 'The Spend home', body: 'Your wallet and every linked account on one carousel, safe-to-spend worked out after bills, and the month’s flow in a single bar.' },
        { title: 'Budgets', body: 'Five rails running live against the month, with the one you are over shown in red.' },
        { title: 'Spending heatmap', body: 'Every day of the month shaded by what you spent, so the outliers name themselves.' },
        { title: 'Subscriptions', body: 'What renews next, what you stopped opening, and what cancelling it saves you a year.' }
      ] },
    { id: 'save', dev: 'save', kicker: 'SAVE', color: '#185FA5',
      title: 'Goals that fill themselves',
      body: 'Open a capsule for rent, school fees or an emergency buffer, set the rule and let it run. Lock it if you are tempted. Nothing ever saves you below the floor you set.',
      tabs: [
        { title: 'Payday auto-save', body: 'The day after salary lands, one split across every goal — and you see it the night before.' },
        { title: 'Savings rules', body: 'Round-ups, inflow sweeps, ₦500 every takeout. Nahl proposes new ones from what it sees.' },
        { title: 'Capsules and vaults', body: 'One pot per goal, with a 90-day vault for the money you should not be able to reach.' }
      ] },
    { id: 'invest', dev: 'invest', kicker: 'INVEST', color: '#3C3489',
      title: 'The NGX, without the brokerage runaround',
      body: 'Screen Nigerian equities and funds, buy fractions, rebalance on a schedule. Every order shows its full cost before you place it.',
      tabs: [
        { title: 'A company, in full', body: 'Dangote Cement: live price, analyst consensus, dividend history and the numbers behind them.' },
        { title: 'Risk profile, then first investment', body: 'Read from 847 real transactions, not a quiz you could game — then applied to every order.' },
        { title: 'Rebalance', body: 'Where the market pushed you off target, what it costs to correct, and one tap to do it.' }
      ] },
    { id: 'circles', dev: 'circle', kicker: 'CIRCLES & THE HIVE', color: '#B8860B',
      title: 'Ajo and esusu, with the trust written down',
      body: 'Run a contribution circle or a shared goal with people you already trust, and let the rotation, the escrow and every on-time record be a matter of fact instead of a group-chat argument.',
      tabs: [
        { title: 'The circle', body: 'Fixed rotation, escrow-held contributions, and a payment record every member can see.' },
        { title: 'Group goals', body: 'One target, many contributors — including who is behind and what would keep them in.' },
        { title: 'The Nahl group register', body: 'Nahl in the group is neutral and rule-bound. Nahl in your private channel is only yours.' }
      ] }
  ];
  var PANEL_COUNTS = [4, 3, 3, 3];

  /* ---- state ---- */
  var state = {
    heroStep: 0, heroManual: false,
    nahl: 0, thinking: false,
    active: 0, mSlide: 0,
    steps: [0, 0, 0, 0], manual: [false, false, false, false],
    mw: [1, 0, 0, 0], mOff: 0,
    wide: window.innerWidth >= 900,
    vw: window.innerWidth, vh: window.innerHeight,
    joined: false, signupError: '',
    tourOpen: false, tourLoading: false, tourFade: false, tourPct: 0
  };
  var timers = { hero: null, step: null, nahl: null, prog: null, fin: null };

  /* =============== HERO =============== */
  var heroCards = $$('.hero-card');
  var heroDots = $$('.hero__dot');
  var heroScopes = $$('.hero__scope');
  var heroScroller = $('[data-hero-scroller]');
  var heroCombined = $('[data-hero-combined]');
  var heroDetailEl = $('[data-hero-detail]');

  function heroDetailHtml(idx) {
    var s = scopes()[idx];
    var isConn = s.kind === 'connected';
    var raw = isConn ? s.acct.cats : [
      { label: 'Wallet', color: '#1C1917', value: LAYERS.wallet },
      { label: 'Saved', color: '#0D7A5F', value: LAYERS.saved },
      { label: 'Invested', color: '#185FA5', value: LAYERS.invested },
      { label: 'Hive', color: '#3C3489', value: LAYERS.hive }
    ];
    var day = isConn ? s.acct.day : 2.1;
    var total = raw.reduce(function (a, x) { return a + x.value; }, 0);
    var up = day >= 0;
    var posLabel = isConn ? s.name.toUpperCase() + ' BALANCE' : 'SAVVY BEE POSITION';
    var posFig = fmtFull(isConn ? s.acct.balance : savvyTotal());
    var dayLabel = (up ? '+' : '') + day + '%';
    var dayColor = up ? '#0D7A5F' : '#A32D2D';
    var dayTint = up ? 'rgba(13,122,95,0.10)' : 'rgba(163,45,45,0.10)';
    var dayArrow = up ? 'M12 19V5M5 12l7-7 7 7' : 'M12 5v14M5 12l7 7 7-7';
    var html = '<div class="hero__detail-label">' + posLabel + '</div>' +
      '<div class="hero__detail-figrow">' +
        '<div class="hero__detail-fig">' + posFig + '</div>' +
        '<div class="hero__day-pill" style="background:' + dayTint + '">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="' + dayColor + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + dayArrow + '"></path></svg>' +
          '<span class="hero__day-label" style="color:' + dayColor + '">' + dayLabel + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="hero__detail-segs">' +
        raw.map(function (x) { return '<span style="flex-grow:' + Math.max(3, Math.round(x.value / 1000)) + ';background:' + x.color + '"></span>'; }).join('') +
      '</div>' +
      '<div class="hero__legend">' +
        raw.map(function (x) {
          return '<div class="hero__legend-row">' +
            '<span class="hero__legend-swatch" style="background:' + x.color + '"></span>' +
            '<span class="hero__legend-label">' + x.label + '</span>' +
            '<span class="hero__legend-value">' + fmtCompact(x.value) + '</span>' +
            '<span class="hero__legend-pct">' + Math.round(x.value / total * 100) + '%</span>' +
          '</div>';
        }).join('') +
      '</div>';
    if (isConn) {
      html += '<div class="hero__viewonly">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9C9A95" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4"></path><path d="M3.3 7L12 12l8.7-5 M12 22V12"></path></svg>' +
        '<div class="hero__viewonly-body">' +
          '<div class="hero__viewonly-kicker">○ VIEW ONLY</div>' +
          '<div class="hero__viewonly-text">Imported from ' + s.name + ' · read-only · last synced ' + s.acct.synced + ' · ' + s.acct.txns + ' transactions</div>' +
        '</div>' +
      '</div>';
    }
    return html;
  }

  function renderHero() {
    var step = HERO_STEPS[state.heroStep] || HERO_STEPS[0];
    var idx = step.i;
    var red = reduced();
    heroCards.forEach(function (card, i) {
      var p = i - idx;
      var ap = Math.abs(p);
      var rotate = red ? 0 : Math.max(-52, Math.min(52, -p * 38));
      var tx = p * (red ? 150 : 108);
      var scale = Math.max(0.66, 1 - ap * 0.16);
      var op = ap > 2.3 ? 0 : Math.max(0, 1 - ap * 0.4);
      card.style.transform = 'translateX(calc(-50% + ' + tx.toFixed(1) + 'px)) rotateY(' + rotate.toFixed(1) + 'deg) scale(' + scale.toFixed(3) + ')';
      card.style.opacity = op.toFixed(2);
      card.style.zIndex = String(20 - Math.round(ap * 4));
      card.style.pointerEvents = op > 0.05 ? 'auto' : 'none';
      card.tabIndex = op > 0.05 ? 0 : -1;
    });
    heroDots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
    heroScopes.forEach(function (r, i) { r.classList.toggle('is-active', i === idx); });
    heroScroller.style.transform = 'translateY(' + step.y + 'px)';
    var combined = idx === 0;
    heroCombined.style.opacity = combined ? '1' : '0';
    if (combined) {
      heroDetailEl.hidden = true;
    } else {
      heroDetailEl.innerHTML = heroDetailHtml(idx);
      heroDetailEl.hidden = false;
      heroDetailEl.style.opacity = '1';
    }
  }

  function tickHero() {
    clearTimeout(timers.hero);
    if (state.heroManual) return;
    var step = HERO_STEPS[state.heroStep];
    timers.hero = setTimeout(function () {
      state.heroStep = (state.heroStep + 1) % HERO_STEPS.length;
      renderHero();
      tickHero();
    }, step.ms);
  }

  function pickScope(i) {
    clearTimeout(timers.hero);
    var at = -1;
    for (var k = 0; k < HERO_STEPS.length; k++) { if (HERO_STEPS[k].i === i) { at = k; break; } }
    state.heroManual = true;
    state.heroStep = at < 0 ? 0 : at;
    renderHero();
  }

  heroCards.forEach(function (c, i) { c.addEventListener('click', function () { pickScope(Number(c.getAttribute('data-card'))); }); });
  heroDots.forEach(function (d) { d.addEventListener('click', function () { pickScope(Number(d.getAttribute('data-dot'))); }); });
  heroScopes.forEach(function (r) { r.addEventListener('click', function () { pickScope(Number(r.getAttribute('data-scope'))); }); });

  /* =============== NAHL =============== */
  var nahlChips = $$('.nahl__chip');
  var nahlAsk = $('[data-nahl-ask]');
  var nahlThinking = $('[data-nahl-thinking]');
  var nahlAnswer = $('[data-nahl-answer]');
  var nahlActions = $('[data-nahl-actions]');
  var nahlAction = $('[data-nahl-action]');

  function renderNahl() {
    var cur = QS[state.nahl] || QS[0];
    nahlChips.forEach(function (c, i) { c.classList.toggle('is-active', i === state.nahl); });
    nahlAsk.textContent = cur.q;
    nahlThinking.hidden = !state.thinking;
    nahlAnswer.textContent = state.thinking ? '' : cur.a;
    nahlAction.textContent = cur.action;
    nahlAnswer.style.opacity = state.thinking ? '0' : '1';
    nahlAnswer.style.transform = 'translateY(' + (state.thinking ? '8px' : '0px') + ')';
    nahlActions.style.opacity = state.thinking ? '0' : '1';
  }
  function askNahl(i) {
    if (i === state.nahl && !state.thinking) return;
    clearTimeout(timers.nahl);
    state.thinking = true;
    state.nahl = i;
    renderNahl();
    timers.nahl = setTimeout(function () { state.thinking = false; renderNahl(); }, 850);
  }
  nahlChips.forEach(function (c, i) { c.addEventListener('click', function () { askNahl(i); }); });

  /* =============== MODULES =============== */
  var devDesktop = [], devMobile = [];
  var deviceSlots = $$('[data-device-slot]');
  var mSlides = $$('[data-m-slide]');
  MODULES.forEach(function (m, i) {
    devDesktop[i] = window.SBDevices.build(m.dev);
    deviceSlots[i].appendChild(devDesktop[i]);
    devMobile[i] = window.SBDevices.build(m.dev);
    mSlides[i].appendChild(devMobile[i]);
  });

  var moduleBlocks = $$('.module-block');
  var railFills = moduleBlocks.map(function (b) { return $('.module-block__rail-fill', b); });
  var blockContents = moduleBlocks.map(function (b) { return $('.module-block__content', b); });
  var ticks = $$('.modules__tick');
  var mKicker = $('[data-m-kicker]');
  var mPos = $('[data-m-pos]');
  var mTitle = $('[data-m-title]');
  var mBody = $('[data-m-body]');
  var mTabs = $('[data-m-tabs]');
  var mTrack = $('[data-m-track]');
  var mDots = $$('.modules__m-dot');

  function deviceFit() { return Math.min(627, (state.vh || 900) - 170) / 880; }
  function mobileFit() { return Math.min(272, Math.max(180, (state.vw || 393) * 0.72)) / 421; }

  function applyFits() {
    devDesktop.forEach(function (d) { window.SBDevices.setFit(d, deviceFit()); });
    devMobile.forEach(function (d) { window.SBDevices.setFit(d, mobileFit()); });
  }

  function renderDesktopModules() {
    var red = reduced();
    var mw = state.mw;
    var drift = (state.mOff || 0) * -16;
    MODULES.forEach(function (m, i) {
      var on = i === state.active;
      var w = red ? 1 : (on ? 1 : Math.max(0, Math.min(0.55, mw[i] || 0)));
      blockContents[i].style.opacity = (0.26 + 0.74 * w).toFixed(3);
      blockContents[i].style.transform = 'translateY(' + ((1 - w) * 26).toFixed(1) + 'px)';
      railFills[i].style.height = (24 + 124 * w).toFixed(0) + 'px';
      var tw = on ? 1 : (red ? 0 : Math.max(0, Math.min(0.5, mw[i] || 0)));
      ticks[i].style.height = (10 + 26 * tw).toFixed(0) + 'px';
      ticks[i].style.background = on ? AMBER : '#D8D4CC';
      ticks[i].style.opacity = (0.35 + 0.65 * tw).toFixed(2);
      var near = red ? (on ? 1 : 0) : Math.max(0, Math.min(1, mw[i] || 0));
      var slot = deviceSlots[i];
      slot.style.transform = 'translate(-50%, ' + (on ? drift : 0).toFixed(1) + 'px) scale(' + (0.972 + 0.028 * near).toFixed(4) + ')';
      slot.style.opacity = on ? '1' : '0';
      slot.style.pointerEvents = on ? 'auto' : 'none';
    });
  }

  function renderTabs() {
    MODULES.forEach(function (m, i) {
      $$('.feature-row', moduleBlocks[i]).forEach(function (row, t) {
        row.classList.toggle('is-active', t === state.steps[i]);
      });
    });
  }

  function renderMobileModules() {
    var ms = clamp(state.mSlide, 0, 3);
    var cur = MODULES[ms];
    mKicker.textContent = cur.kicker;
    mKicker.style.color = cur.color;
    mPos.textContent = (ms + 1) + ' / 4';
    mTitle.textContent = cur.title;
    mBody.textContent = cur.body;
    mTabs.innerHTML = cur.tabs.map(function (t, i) {
      return '<button type="button" class="feature-row' + (i === state.steps[ms] ? ' is-active' : '') + '" data-tab="' + i + '">' +
        '<span class="feature-row__bar"></span>' +
        '<span class="feature-row__text"><span class="feature-row__title"></span><span class="feature-row__body"></span></span>' +
      '</button>';
    }).join('');
    $$('.feature-row', mTabs).forEach(function (row, i) {
      $('.feature-row__title', row).textContent = cur.tabs[i].title;
      $('.feature-row__body', row).textContent = cur.tabs[i].body;
      row.addEventListener('click', function () { pickStep(ms, i); });
    });
    mSlides.forEach(function (s, i) { s.classList.toggle('is-active', i === ms); });
    mDots.forEach(function (d, i) { d.classList.toggle('is-active', i === ms); });
  }

  function renderDeviceSteps() {
    MODULES.forEach(function (m, i) {
      window.SBDevices.setStep(devDesktop[i], state.steps[i]);
      window.SBDevices.setStep(devMobile[i], state.steps[i]);
    });
  }

  function curMod() {
    if (state.wide) return clamp(state.active || 0, 0, 3);
    return clamp(state.mSlide, 0, 3);
  }

  function tickStep() {
    clearInterval(timers.step);
    if (reduced()) return;
    timers.step = setInterval(function () {
      var m = curMod();
      if (state.manual[m]) return;
      state.steps[m] = (state.steps[m] + 1) % PANEL_COUNTS[m];
      renderDeviceSteps();
      renderTabs();
      if (!state.wide) renderMobileModules();
    }, 3600);
  }

  function pickStep(m, i) {
    state.steps[m] = i;
    state.manual[m] = true;
    renderDeviceSteps();
    renderTabs();
    if (!state.wide) renderMobileModules();
  }

  moduleBlocks.forEach(function (block, m) {
    $$('.feature-row', block).forEach(function (row, i) {
      row.addEventListener('click', function () { pickStep(m, i); });
    });
  });

  /* scroll weighting (desktop) */
  var rafS = null;
  function measure() {
    var els = $$('[data-module]');
    if (!els.length) return;
    var mid = window.innerHeight / 2;
    var raw = [0, 0, 0, 0];
    var best = 0, bestD = Infinity, bestOff = 0;
    els.forEach(function (el) {
      var i = Number(el.getAttribute('data-module'));
      var r = el.getBoundingClientRect();
      var h = Math.max(1, r.height);
      var d = (r.top + r.bottom) / 2 - mid;
      var n = Math.abs(d) / h;
      raw[i] = clamp((0.58 - n) / 0.22, 0, 1);
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; bestOff = d / h; }
    });
    state.active = best;
    if (!reduced()) {
      state.mw = raw;
      state.mOff = clamp(bestOff, -1, 1);
    }
    renderDesktopModules();
  }
  function onScroll() {
    if (rafS) return;
    rafS = requestAnimationFrame(function () { rafS = null; measure(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* mobile track */
  function nearestSlide(el) {
    var kids = Array.prototype.slice.call(el.children);
    if (!kids.length) return 0;
    var mid = el.scrollLeft + el.clientWidth / 2;
    var best = 0, bestD = Infinity;
    kids.forEach(function (k, i) {
      var c = k.offsetLeft + k.offsetWidth / 2;
      var d = Math.abs(c - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }
  var tS = null;
  mTrack.addEventListener('scroll', function () {
    if (tS) return;
    tS = requestAnimationFrame(function () {
      tS = null;
      var n = nearestSlide(mTrack);
      if (n !== state.mSlide) { state.mSlide = n; renderMobileModules(); }
    });
  }, { passive: true });
  function goSlide(i) {
    state.mSlide = i;
    renderMobileModules();
    var k = mTrack.children[i];
    if (!k) return;
    var left = k.offsetLeft - (mTrack.clientWidth - k.offsetWidth) / 2;
    mTrack.scrollTo({ left: Math.max(0, left), behavior: reduced() ? 'auto' : 'smooth' });
  }
  mDots.forEach(function (d, i) { d.addEventListener('click', function () { goSlide(i); }); });

  /* =============== WAITLIST =============== */
  var getForm = $('[data-get-form]');
  var getInput = $('[data-get-input]');
  var getError = $('[data-get-error]');
  var getSuccess = $('[data-get-success]');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  getInput.addEventListener('input', function () {
    state.signupError = '';
    getError.hidden = true;
    getInput.classList.remove('is-error');
  });
  getForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = getInput.value.trim();
    if (!EMAIL_RE.test(v)) {
      state.signupError = 'Enter an email address we can send the invite to.';
      getError.textContent = state.signupError;
      getError.hidden = false;
      getInput.classList.add('is-error');
      getInput.focus({ preventScroll: true });
      return;
    }
    /* TODO: no backend endpoint — submission is local-only by decision (see docs/QUESTIONS.md #1) */
    state.joined = true;
    getForm.hidden = true;
    getSuccess.hidden = false;
  });

  /* smooth-scroll + focus for "Early access" / "Get early access" */
  $$('[data-go-get]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var sec = document.getElementById('get');
      if (!sec) return;
      var top = sec.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - 40;
      try { window.scrollTo({ top: top, behavior: 'smooth' }); } catch (err) { window.scrollTo(0, top); }
      setTimeout(function () { getInput.focus({ preventScroll: true }); }, 520);
    });
  });

  /* scroll reveal */
  function reveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    var show = function (el) { el.classList.add('is-revealed'); };
    if (reduced() || typeof IntersectionObserver === 'undefined') { els.forEach(show); return; }
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 80 + 'ms'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =============== DEMO OVERLAY =============== */
  var tourFramed = $('[data-tour-framed]');
  var tourFull = $('[data-tour-full]');
  var TICK_COUNT = 46;
  $$('[data-tour-ticks]').forEach(function (holder) {
    var html = '';
    for (var i = 0; i < TICK_COUNT; i++) html += '<span></span>';
    holder.innerHTML = html;
  });

  function tourEls() {
    var root = state.wide ? tourFramed : tourFull;
    return {
      root: root,
      iframe: $('[data-tour-iframe]', root),
      loader: $('[data-tour-loader]', root),
      pct: $('[data-tour-pct]', root),
      status: $('[data-tour-status]', root),
      ticks: $$('[data-tour-ticks] span', root)
    };
  }

  function renderTourProgress() {
    var els = tourEls();
    var p = state.tourPct || 0;
    els.pct.textContent = String(Math.floor(p));
    els.status.textContent = p < 26 ? 'LOADING RUNTIME' : p < 58 ? 'MOUNTING SCREENS' : p < 92 ? 'RESTORING SESSION' : 'READY';
    els.ticks.forEach(function (t, i) {
      var on = (i + 1) / TICK_COUNT * 100 <= p;
      t.style.height = on ? (i % 6 === 0 ? '30px' : '20px') : '7px';
      t.style.background = on ? '#EF9F27' : '#2C2A25';
    });
  }

  function openTour() {
    clearInterval(timers.prog); clearTimeout(timers.fin);
    state.tourOpen = true; state.tourLoading = true; state.tourFade = false; state.tourPct = 0;
    document.body.style.overflow = 'hidden';
    var framed = state.wide;
    tourFramed.hidden = !framed;
    tourFull.hidden = framed;
    var els = tourEls();
    els.loader.hidden = false;
    els.loader.classList.remove('is-fading');
    renderTourProgress();
    els.iframe.onload = function () { finishTour(); };
    /* The 46-screen prototype ships as-is alongside the site (BRIEF §14). Its shell carries
       the fit/overscroll fix — if the demo is ever hosted elsewhere, that file must move with it. */
    els.iframe.src = 'Savvy%20Bee%20Prototype.html#Home.dc.html';
    timers.prog = setInterval(function () {
      var p = state.tourPct || 0;
      if (p >= 92) return;
      state.tourPct = Math.min(92, p + Math.max(0.5, (94 - p) * 0.055));
      renderTourProgress();
    }, 60);
    $('[data-close-tour]', els.root).focus({ preventScroll: true });
  }
  function finishTour() {
    if (!state.tourLoading) return;
    clearInterval(timers.prog);
    state.tourPct = 100;
    renderTourProgress();
    timers.fin = setTimeout(function () {
      state.tourFade = true;
      tourEls().loader.classList.add('is-fading');
      timers.fin = setTimeout(function () {
        state.tourLoading = false;
        tourEls().loader.hidden = true;
      }, 480);
    }, 420);
  }
  function closeTour() {
    clearInterval(timers.prog); clearTimeout(timers.fin);
    state.tourOpen = false; state.tourLoading = false;
    tourFramed.hidden = true;
    tourFull.hidden = true;
    $$('[data-tour-iframe]').forEach(function (f) { f.onload = null; f.removeAttribute('src'); });
    document.body.style.overflow = '';
  }
  $$('[data-open-tour]').forEach(function (b) { b.addEventListener('click', openTour); });
  $$('[data-close-tour]').forEach(function (b) { b.addEventListener('click', closeTour); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.tourOpen) closeTour();
  });

  /* =============== RESIZE =============== */
  window.addEventListener('resize', function () {
    var wasWide = state.wide;
    state.wide = window.innerWidth >= 900;
    state.vw = window.innerWidth;
    state.vh = window.innerHeight;
    applyFits();
    if (state.tourOpen && wasWide !== state.wide) {
      tourFramed.hidden = !state.wide;
      tourFull.hidden = state.wide;
      var els = tourEls();
      if (!els.iframe.getAttribute('src')) {
        els.iframe.onload = function () { finishTour(); };
        els.iframe.src = 'Savvy%20Bee%20Prototype.html#Home.dc.html';
      }
      if (state.tourLoading) { els.loader.hidden = false; renderTourProgress(); } else { els.loader.hidden = true; }
    }
    measure();
  });

  /* =============== INIT =============== */
  applyFits();
  renderHero();
  renderNahl();
  renderTabs();
  renderDeviceSteps();
  renderMobileModules();
  renderDesktopModules();
  setTimeout(measure, 100);
  setTimeout(reveal, 60);
  if (!reduced()) { tickHero(); tickStep(); }
})();
