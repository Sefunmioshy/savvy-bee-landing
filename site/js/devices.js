/* Device components — direct port of Spend/Save/Invest/Circle Device.dc.html.
   Markup, data and formatting logic are transcribed verbatim from the export;
   each build*() returns the inner HTML of one phone at intrinsic size 421x880. */
(function () {
  'use strict';
  var AMBER = '#B8860B';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ---------- SPEND ---------- */
  function fmtSpend(n) {
    if (n >= 1000) return '₦' + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return '₦' + n;
  }
  var BUDGETS = [
    { name: 'Food delivery', spent: 25400, limit: 20000 },
    { name: 'Transport', spent: 12000, limit: 15000 },
    { name: 'Data', spent: 8500, limit: 10000 },
    { name: 'Utilities', spent: 45000, limit: 50000 },
    { name: 'Entertainment', spent: 6000, limit: 8000 }
  ];
  var HEAT = [2, 0, null, 2, 1, 2, 2, 2, 0, null, 2, 1, 2, 2, 3, 11, 0, null, 1, 1, 38, 12, null, null, null, null, null, null, null, null];
  function heatBg(v) {
    if (v === null) return '#EFEDE7';
    if (v === 0) return '#F3F1EB';
    if (v <= 2) return '#F4E7CE';
    if (v <= 3) return '#EAD3A2';
    if (v <= 12) return '#C68F1E';
    return '#7A4A12';
  }
  var QUICK = [
    { label: 'Transfer', d: 'M4 12h14 M13 6l6 6-6 6', primary: true },
    { label: 'Pay Bills', d: 'M5 4h14v16l-3-2-2 2-2-2-2 2-2-2-1 2z M8 9h8 M8 13h5', primary: false },
    { label: 'Airtime & Data', d: 'M8 2h8v20H8z M11 18h2', primary: false },
    { label: 'Request', d: 'M20 12H6 M11 6l-6 6 6 6', primary: false }
  ];
  var SUBS = [
    { letter: 'N', name: 'Notion', signal: '0 opens in 23 days', amt: '₦2,400/mo', flagged: true },
    { letter: 'A', name: 'Apple Music', signal: 'Possible duplicate of Spotify', amt: '₦1,800/mo', flagged: true },
    { letter: 'D', name: 'DSTV Premium', signal: 'Used 4 days ago', amt: '₦24,500/mo', flagged: false },
    { letter: 'S', name: 'Spotify', signal: 'Used today', amt: '₦1,200/mo', flagged: false }
  ];

  function spendPanels() {
    var p0 = '<div class="dev__panel dev__panel--flush" data-panel="0">' +
      '<div style="display:flex;gap:12px;padding:8px 22px 2px">' +
        '<div style="flex:none;width:270px;background:#1C1917;border-radius:16px;padding:17px 18px;position:relative;overflow:hidden;border:1.5px solid #EF9F27">' +
          '<svg viewBox="0 0 120 120" width="140" height="140" fill="none" style="position:absolute;right:-28px;top:-24px;opacity:0.12"><path d="M60 8l45 26v52L60 112 15 86V34z" stroke="#fff" stroke-width="1"></path><path d="M60 34l26 15v30L60 94 34 79V49z" stroke="#fff" stroke-width="1"></path></svg>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;position:relative">' +
            '<div style="display:flex;align-items:center;gap:7px"><span style="width:7px;height:7px;border-radius:50%;background:#EF9F27"></span><span style="font-size:11px;font-weight:500;color:#fff">Savvy Bee</span></div>' +
            '<div style="width:28px;height:20px;border-radius:5px;background:#EF9F27"></div>' +
          '</div>' +
          '<div class="k k--10" style="margin-top:16px">Wallet · spendable</div>' +
          '<div class="mono" style="font-size:24px;font-weight:500;color:#fff;margin-top:3px">₦847,200</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;position:relative">' +
            '<span class="mono" style="font-size:12px;color:#C9C5BC;letter-spacing:0.1em">••4291</span>' +
            '<span style="font-size:10px;color:#EF9F27;font-weight:500">Transactable</span>' +
          '</div>' +
        '</div>' +
        '<div style="flex:none;width:270px;background:#fff;border:1.5px solid #E8E5DE;border-radius:16px;padding:17px 18px">' +
          '<div style="display:flex;align-items:center;justify-content:space-between">' +
            '<div style="display:flex;align-items:center;gap:7px"><span style="width:7px;height:7px;border-radius:50%;background:#E8743B"></span><span style="font-size:11px;font-weight:500;color:#6B6860">GTBank</span></div>' +
            '<div style="display:flex;align-items:center;gap:5px;background:#F0EDE6;border-radius:50px;padding:3px 9px">' +
              '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9C9A95" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 11V7a4 4 0 0 1 8 0v4"></path><rect x="5" y="11" width="14" height="9" rx="2"></rect></svg>' +
              '<span style="font-size:9.5px;color:#9C9A95">linked · view only</span>' +
            '</div>' +
          '</div>' +
          '<div class="k k--10" style="margin-top:16px">Spendable</div>' +
          '<div class="mono" style="font-size:24px;font-weight:500;color:#6B6860;margin-top:3px">₦184,500</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;gap:9px;padding:14px 22px 2px">' +
        QUICK.map(function (q) {
          var tint = q.primary ? '#1C1917' : '#fff';
          var border = q.primary ? '#1C1917' : '#E8E5DE';
          var fg = q.primary ? '#fff' : '#1C1917';
          var iconBg = q.primary ? 'rgba(255,255,255,0.14)' : '#F0EDE6';
          var iconFg = q.primary ? '#fff' : '#1C1917';
          return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;background:' + tint + ';border:0.5px solid ' + border + ';border-radius:13px;padding:13px 4px 11px">' +
            '<div style="width:34px;height:34px;border-radius:50%;background:' + iconBg + ';display:flex;align-items:center;justify-content:center">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="' + iconFg + '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="' + q.d + '"></path></svg>' +
            '</div>' +
            '<div style="font-size:10.5px;font-weight:500;color:' + fg + ';text-align:center;line-height:1.2">' + esc(q.label) + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="padding:18px 22px 0">' +
        '<div class="k">Spent this month</div>' +
        '<div class="mono" style="font-size:32px;font-weight:500;line-height:1.1;margin-top:6px">₦96,900</div>' +
        '<div style="display:flex;align-items:center;gap:7px;margin-top:9px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D7A5F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6"></path><path d="M5 13l7-7 7 7"></path></svg>' +
          '<div style="font-size:13px;color:#0D7A5F"><span style="font-weight:500">₦12,450 under budget</span> with 8 days left</div>' +
        '</div>' +
      '</div>' +
      '<div style="padding:18px 22px 0">' +
        '<div class="card" style="padding:14px 15px">' +
          '<div style="display:flex;align-items:center;justify-content:space-between">' +
            '<div class="k">This month\'s flow</div>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9C9A95" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>' +
          '</div>' +
          '<div style="display:flex;gap:3px;margin-top:12px">' +
            '<div style="flex:875;height:8px;border-radius:4px 0 0 4px;background:#1C1917"></div>' +
            '<div style="flex:600;height:8px;background:#185FA5"></div>' +
            '<div style="flex:400;height:8px;background:#3C3489"></div>' +
            '<div style="flex:1325;height:8px;border-radius:0 4px 4px 0;background:#0D7A5F"></div>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:12px">' +
            '<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#6B6860"><span style="width:7px;height:7px;border-radius:2px;background:#0D7A5F"></span>In <span style="color:#1C1917;font-weight:500">₦320k</span></div>' +
            '<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#6B6860"><span style="width:7px;height:7px;border-radius:2px;background:#1C1917"></span>Spent <span style="color:#1C1917;font-weight:500">₦87k</span></div>' +
            '<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#6B6860"><span style="width:7px;height:7px;border-radius:2px;background:#185FA5"></span>Saved <span style="color:#1C1917;font-weight:500">₦60k</span></div>' +
            '<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#6B6860"><span style="width:7px;height:7px;border-radius:2px;background:#3C3489"></span>Invested <span style="color:#1C1917;font-weight:500">₦40k</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="padding:16px 22px 0">' +
        '<div class="card card--nahl" style="padding:16px">' +
          '<div style="display:flex;align-items:center;gap:9px;margin-bottom:10px">' +
            '<div style="width:26px;height:26px;border-radius:50%;background:rgba(212,83,126,0.12);display:flex;align-items:center;justify-content:center;flex:none">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4537E" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"></rect><path d="M12 8V4"></path></svg>' +
            '</div>' +
            '<div style="font-size:13px;font-weight:500">Nahl</div>' +
          '</div>' +
          '<div style="font-size:13px;line-height:1.55;text-wrap:pretty">You\'re <span style="font-weight:500;color:#A32D2D">₦5k over on food</span> but under everywhere else — net, you\'re in good shape. Biggest opportunity: <span style="font-weight:500">₦7,200/mo in unused subscriptions.</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

    var p1 = '<div class="dev__panel" data-panel="1">' +
      '<div style="display:flex;align-items:flex-end;justify-content:space-between">' +
        '<div><div class="k">Total budgeted</div><div class="mono" style="font-size:26px;font-weight:500;margin-top:5px">₦103,000</div></div>' +
        '<div style="text-align:right"><div class="k">Spent</div><div class="mono" style="font-size:16px;font-weight:500;margin-top:6px;color:#6B6860">₦96,900</div></div>' +
      '</div>' +
      '<div style="display:grid;gap:0;margin-top:18px">' +
        BUDGETS.map(function (b) {
          var over = b.spent > b.limit;
          var color = over ? '#A32D2D' : '#1C1917';
          var pct = Math.min(100, Math.round(b.spent / b.limit * 100)) + '%';
          return '<div style="padding:13px 0;border-top:0.5px solid #E8E5DE">' +
            '<div style="display:flex;align-items:baseline;justify-content:space-between">' +
              '<span style="font-size:13.5px">' + esc(b.name) + '</span>' +
              '<span class="mono" style="font-size:12.5px;color:' + color + '">' + fmtSpend(b.spent) + ' / ' + fmtSpend(b.limit) + '</span>' +
            '</div>' +
            '<div style="height:5px;border-radius:3px;background:#E8E5DE;margin-top:9px;overflow:hidden"><div style="height:5px;border-radius:3px;width:' + pct + ';background:' + color + '"></div></div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';

    var heatStats = [{ v: '₦87,450', k: 'Spent' }, { v: '₦3,975', k: 'Per day' }, { v: '19', k: 'Active days' }];
    var heatScale = ['#F4E7CE', '#EAD3A2', '#C68F1E', '#A5710F', '#7A4A12'];
    var p2 = '<div class="dev__panel" data-panel="2">' +
      '<div style="display:flex;background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:15px 0">' +
        heatStats.map(function (h) {
          return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px"><div class="mono" style="font-size:18px;font-weight:500">' + h.v + '</div><div class="k k--10">' + h.k + '</div></div>';
        }).join('') +
      '</div>' +
      '<div style="font-size:12.5px;color:#6B6860;margin-top:16px">Each day shaded by how much you spent.</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:14px 13px;margin-top:12px">' +
        '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px">' +
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (d) { return '<div style="text-align:center;font-size:10px;color:#9C9A95">' + d + '</div>'; }).join('') +
          HEAT.map(function (v, i) {
            var dark = v !== null && v > 3;
            var dayFg = dark ? '#fff' : v === null ? '#C9C5BC' : '#1C1917';
            var valFg = dark ? 'rgba(255,255,255,0.8)' : '#6B6860';
            var label = v ? v + 'k' : '';
            return '<div style="aspect-ratio:1;border-radius:5px;background:' + heatBg(v) + ';padding:4px 5px;display:flex;flex-direction:column;justify-content:space-between">' +
              '<span style="font-size:9.5px;color:' + dayFg + '">' + (i + 1) + '</span>' +
              '<span class="mono" style="font-size:8.5px;text-align:right;color:' + valFg + '">' + label + '</span>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;padding-top:12px;border-top:0.5px solid #E8E5DE">' +
          '<span style="font-size:10.5px;color:#9C9A95">Less</span>' +
          heatScale.map(function (s) { return '<span style="width:15px;height:15px;border-radius:4px;background:' + s + '"></span>'; }).join('') +
          '<span style="font-size:10.5px;color:#9C9A95">More</span>' +
        '</div>' +
      '</div>' +
    '</div>';

    var p3 = '<div class="dev__panel" data-panel="3">' +
      '<div class="card card--nahl" style="padding:15px 16px">' +
        '<div style="display:flex;align-items:center;gap:7px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4537E" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l1.9 5.6L19.5 10l-4.5 3.4L16.4 19 12 15.8 7.6 19l1.4-5.6L4.5 10l5.6-1.4z"></path></svg>' +
          '<span class="mono" style="font-size:9.5px;letter-spacing:0.05em;color:#9C9A95">NAHL</span>' +
        '</div>' +
        '<div style="font-size:13px;line-height:1.55;margin-top:9px;text-wrap:pretty">₦7,200/mo on subscriptions unused 3+ weeks — that\'s ₦86,400/yr. Cancel the two I\'ve flagged?</div>' +
        '<div style="display:inline-flex;align-items:center;height:32px;padding:0 14px;border-radius:50px;background:#1C1917;color:#fff;font-size:12.5px;margin-top:12px">Cancel both</div>' +
      '</div>' +
      '<div class="k" style="margin-top:20px">Next 30 days</div>' +
      '<div style="display:grid;gap:0;margin-top:4px">' +
        SUBS.map(function (s) {
          var iconBg = s.flagged ? 'rgba(184,134,11,0.12)' : '#F0EDE6';
          var iconFg = s.flagged ? AMBER : '#1C1917';
          var signalColor = s.flagged ? AMBER : '#9C9A95';
          return '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:0.5px solid #E8E5DE">' +
            '<span style="width:30px;height:30px;border-radius:9px;background:' + iconBg + ';color:' + iconFg + ';display:flex;align-items:center;justify-content:center;font-size:13px;flex:none">' + s.letter + '</span>' +
            '<div style="flex:1;min-width:0">' +
              '<div style="display:flex;align-items:center;gap:7px"><span style="font-size:13.5px;font-weight:500">' + esc(s.name) + '</span>' + (s.flagged ? '<span style="width:6px;height:6px;border-radius:50%;background:#B8860B"></span>' : '') + '</div>' +
              '<div style="font-size:11px;color:' + signalColor + ';margin-top:3px">' + esc(s.signal) + '</div>' +
            '</div>' +
            '<span class="mono" style="font-size:12.5px;color:#6B6860">' + s.amt + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="background:#1C1917;border-radius:14px;padding:18px;margin-top:18px">' +
        '<div class="k">Subscriptions this year</div>' +
        '<div class="mono" style="font-size:26px;font-weight:500;color:#fff;margin-top:8px">₦755,400</div>' +
        '<div style="font-size:12px;color:#9C9A95;margin-top:8px;line-height:1.5">Cancelling the flagged two saves <span style="color:#fff">₦86,400/yr</span>.</div>' +
      '</div>' +
    '</div>';

    return p0 + p1 + p2 + p3;
  }

  /* ---------- SAVE ---------- */
  function saveRing(pct) { var c = 2 * Math.PI * 24; return { dash: c.toFixed(1), offset: (c * (1 - pct)).toFixed(1) }; }
  function saveFmtK(n) { return n >= 1000000 ? '₦' + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'm' : '₦' + Math.round(n / 1000) + 'k'; }
  var CAPS = [
    { name: 'Rent', type: 'Vault · locked', pct: 0.82, saved: 164000, target: 200000, color: '#185FA5', locked: true, group: false },
    { name: 'Emergency', type: 'FlexiSave', pct: 0.57, saved: 57000, target: 100000, color: '#0D7A5F', locked: false, group: false },
    { name: 'Laptop', type: 'Goal Pot · open', pct: 0.34, saved: 34000, target: 100000, color: AMBER, locked: false, group: false },
    { name: 'Japa / Travel', type: 'Group Goal', pct: 0.41, saved: 205000, target: 500000, color: '#3C3489', locked: false, group: true }
  ];
  var ALLOC = [
    { letter: 'R', name: 'Rent', sub: 'Due 1 Jan · ₦600,000 target', amt: '₦20,000', bg: '#E4ECF5', fg: '#185FA5' },
    { letter: 'E', name: 'Emergency', sub: 'Three months of essentials', amt: '₦10,000', bg: '#E6F1ED', fg: '#0D7A5F' },
    { letter: 'L', name: 'Laptop', sub: 'Locked vault · 90 days', amt: '₦8,000', bg: '#EDEBF5', fg: '#3C3489' },
    { letter: 'J', name: 'Japa fund', sub: 'No deadline set', amt: '₦7,000', bg: '#F3ECD9', fg: AMBER }
  ];
  var RULES = [
    { letter: '₦', name: 'Save ₦500 every takeout order', trigger: 'When you order food delivery', dest: 'Emergency', month: '+₦3,500 this month', active: true, bg: '#F3ECD9', fg: AMBER },
    { letter: '%', name: 'Sweep 10% of every inflow', trigger: 'When money lands in your wallet', dest: 'FlexiSave', month: '+₦24,000 this month', active: true, bg: '#E6F1ED', fg: '#0D7A5F' },
    { letter: '↑', name: 'Round up every purchase', trigger: 'On each card payment', dest: 'Laptop', month: '+₦740 this month', active: true, bg: '#E4ECF5', fg: '#185FA5' },
    { letter: '=', name: 'Save what\'s left each payday', trigger: 'Day after salary lands', dest: 'Rent', month: 'Paused', active: false, bg: '#F0EDE6', fg: '#9C9A95' }
  ];

  function savePanels() {
    var p0 = '<div class="dev__panel" data-panel="0">' +
      '<div style="text-align:center;padding:10px 0 2px">' +
        '<div class="k">The day after payday, I\'ll set aside</div>' +
        '<div class="mono" style="font-size:32px;font-weight:500;margin-top:8px">₦45,000</div>' +
        '<div style="font-size:12.5px;color:#0D7A5F;margin-top:7px">across 4 goals · you keep ₦210,000 for the month</div>' +
      '</div>' +
      '<div class="k" style="margin:18px 0 10px">Allocation</div>' +
      '<div style="display:grid;gap:9px">' +
        ALLOC.map(function (a) {
          return '<div style="display:flex;align-items:center;gap:12px;background:#fff;border:0.5px solid #E8E5DE;border-radius:12px;padding:12px 14px">' +
            '<span style="width:32px;height:32px;border-radius:9px;background:' + a.bg + ';color:' + a.fg + ';display:flex;align-items:center;justify-content:center;font-size:12.5px;flex:none">' + a.letter + '</span>' +
            '<div style="flex:1;min-width:0"><div style="font-size:13.5px;font-weight:500">' + esc(a.name) + '</div><div style="font-size:11px;color:#9C9A95;margin-top:2px">' + esc(a.sub) + '</div></div>' +
            '<span class="mono" style="font-size:13px">' + a.amt + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:14px;background:#fff;border:0.5px solid #E8E5DE;border-radius:12px;padding:14px;margin-top:12px">' +
        '<div style="flex:1"><div style="font-size:13.5px;font-weight:500">Run automatically each payday</div><div style="font-size:11px;color:#9C9A95;margin-top:3px">I show you the split the night before</div></div>' +
        '<span style="width:46px;height:26px;border-radius:50px;background:#0D7A5F;position:relative;flex:none"><span style="position:absolute;top:2px;left:22px;width:22px;height:22px;border-radius:50%;background:#fff"></span></span>' +
      '</div>' +
    '</div>';

    var p1 = '<div class="dev__panel" data-panel="1">' +
      '<div style="font-size:12.5px;color:#6B6860;line-height:1.5;text-wrap:pretty">Rules save automatically when real life happens, and never touch your Safety Floor.</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:15px;margin-top:14px">' +
        '<div style="display:flex;align-items:center;gap:12px">' +
          '<span style="width:36px;height:36px;border-radius:10px;background:#E6F1ED;display:flex;align-items:center;justify-content:center;flex:none">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D7A5F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path><path d="M9 12l2 2 4-4"></path></svg>' +
          '</span>' +
          '<div style="flex:1"><div style="font-size:13.5px;font-weight:500">Safety Floor</div><div style="font-size:11px;color:#9C9A95;margin-top:2px">Rules never save below this balance</div></div>' +
          '<span class="mono" style="font-size:15px">₦25,000</span>' +
        '</div>' +
        '<div style="height:3px;border-radius:3px;background:#E8E5DE;margin-top:15px;position:relative">' +
          '<div style="height:3px;width:42%;border-radius:3px;background:#1C1917"></div>' +
          '<span style="position:absolute;top:-9px;left:42%;width:20px;height:20px;border-radius:50%;background:#1C1917;border:3px solid #F8F6F1;transform:translateX(-50%)"></span>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin:20px 0 10px">' +
        '<span class="k">Your rules</span><span style="font-size:11.5px;color:#6B6860">3 of 4 active</span>' +
      '</div>' +
      '<div style="display:grid;gap:9px">' +
        RULES.map(function (r) {
          var op = r.active ? '1' : '0.5';
          var track = r.active ? '#0D7A5F' : '#C9C5BC';
          var knob = r.active ? '19px' : '2px';
          var amtColor = r.active ? '#0D7A5F' : '#9C9A95';
          return '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:12px;padding:13px 14px;opacity:' + op + '">' +
            '<div style="display:flex;align-items:center;gap:12px">' +
              '<span style="width:32px;height:32px;border-radius:9px;background:' + r.bg + ';color:' + r.fg + ';display:flex;align-items:center;justify-content:center;font-size:12.5px;flex:none">' + r.letter + '</span>' +
              '<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:500;line-height:1.35">' + esc(r.name) + '</div><div style="font-size:11px;color:#9C9A95;margin-top:3px">' + esc(r.trigger) + '</div></div>' +
              '<span style="width:40px;height:23px;border-radius:50px;background:' + track + ';position:relative;flex:none"><span style="position:absolute;top:2px;left:' + knob + ';width:19px;height:19px;border-radius:50%;background:#fff"></span></span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:11px;padding-top:10px;border-top:0.5px solid #F0EDE6">' +
              '<span style="font-size:11.5px;color:#6B6860">→ ' + esc(r.dest) + '</span>' +
              '<span class="mono" style="font-size:11.5px;color:' + amtColor + '">' + esc(r.month) + '</span>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="background:#F0EDE6;border-radius:14px;padding:15px;margin-top:12px;text-align:center">' +
        '<div class="k">Saved by rules this month</div>' +
        '<div class="mono" style="font-size:24px;font-weight:500;margin-top:6px">+₦28,240</div>' +
      '</div>' +
    '</div>';

    var p2 = '<div class="dev__panel" data-panel="2">' +
      '<div class="k" style="margin-bottom:14px">Your capsules</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">' +
        CAPS.map(function (c) {
          var r = saveRing(c.pct);
          var badge = '';
          if (c.locked) badge += '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C9A95" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>';
          if (c.group) badge += '<div style="display:flex"><span style="width:16px;height:16px;border-radius:50%;background:#3C3489;border:1.5px solid #fff;font-size:8px;color:#fff;display:flex;align-items:center;justify-content:center">B</span><span style="width:16px;height:16px;border-radius:50%;background:#D4537E;border:1.5px solid #fff;margin-left:-6px;font-size:8px;color:#fff;display:flex;align-items:center;justify-content:center">A</span></div>';
          return '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:15px">' +
            '<div style="display:flex;align-items:flex-start;justify-content:space-between">' +
              '<div style="position:relative;width:58px;height:58px;flex:none">' +
                '<svg width="58" height="58" viewBox="0 0 58 58" style="display:block">' +
                  '<circle cx="29" cy="29" r="24" fill="none" stroke="#F0EDE6" stroke-width="5"></circle>' +
                  '<circle cx="29" cy="29" r="24" fill="none" stroke="' + c.color + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + r.dash + '" stroke-dashoffset="' + r.offset + '" transform="rotate(-90 29 29)"></circle>' +
                '</svg>' +
                '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;color:#1C1917">' + Math.round(c.pct * 100) + '%</span>' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:4px">' + badge + '</div>' +
            '</div>' +
            '<div style="font-size:13.5px;font-weight:500;color:#1C1917;margin-top:12px">' + esc(c.name) + '</div>' +
            '<div style="font-size:10.5px;color:#9C9A95;margin-top:3px">' + esc(c.type) + '</div>' +
            '<div style="font-size:11.5px;color:#6B6860;margin-top:7px;font-feature-settings:&quot;tnum&quot;">' + saveFmtK(c.saved) + ' / ' + saveFmtK(c.target) + '</div>' +
          '</div>';
        }).join('') +
        '<div style="background:transparent;border:1px dashed #D9D5CD;border-radius:14px;padding:15px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:150px">' +
          '<div style="width:40px;height:40px;border-radius:50%;background:#F0EDE6;display:flex;align-items:center;justify-content:center">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B6860" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>' +
          '</div>' +
          '<div style="font-size:12.5px;font-weight:500;color:#1C1917;margin-top:11px">New capsule</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    return p0 + p1 + p2;
  }

  /* ---------- INVEST ---------- */
  var INVEST_SERIES = {
    '1D': [0.50, 0.46, 0.52, 0.49, 0.55, 0.60, 0.57, 0.64, 0.62, 0.70, 0.74, 0.71, 0.80, 0.84, 0.82, 0.90],
    '1W': [0.40, 0.44, 0.38, 0.50, 0.47, 0.58, 0.55, 0.66, 0.63, 0.72, 0.78, 0.74, 0.83, 0.88],
    '1M': [0.30, 0.42, 0.36, 0.48, 0.55, 0.50, 0.62, 0.58, 0.70, 0.66, 0.78, 0.74, 0.85, 0.80, 0.90],
    '1Y': [0.62, 0.55, 0.48, 0.58, 0.42, 0.50, 0.38, 0.46, 0.56, 0.50, 0.64, 0.58, 0.72, 0.68, 0.80, 0.90],
    'ALL': [0.10, 0.16, 0.14, 0.22, 0.30, 0.26, 0.38, 0.48, 0.44, 0.56, 0.64, 0.72, 0.70, 0.80, 0.88, 0.94]
  };
  function investChart(frame) {
    var W = 340, H = 120, pad = 8;
    var pts = INVEST_SERIES[frame] || INVEST_SERIES['1D'];
    var d = '';
    pts.forEach(function (v, i) {
      var x = pad + (i / (pts.length - 1)) * (W - 2 * pad);
      var y = H - pad - v * (H - 2 * pad);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
    });
    return { path: d.trim(), endY: (H - pad - pts[pts.length - 1] * (H - 2 * pad)).toFixed(1) };
  }
  var INVEST_SLEEVES = [
    { name: 'Nigerian equities', now: 52, target: 45, color: '#3C3489' },
    { name: 'Fixed income', now: 24, target: 30, color: '#185FA5' },
    { name: 'Money market', now: 14, target: 15, color: '#0D7A5F' },
    { name: 'Gold', now: 10, target: 10, color: AMBER }
  ];

  function investPanels() {
    var c = investChart('1D');
    var p0 = '<div class="dev__panel" data-panel="0">' +
      '<div style="font-size:12.5px;color:#6B6860">Dangote Cement Plc</div>' +
      '<div class="mono" style="font-size:32px;font-weight:500;margin-top:5px;line-height:1.1">₦485.00</div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-top:7px">' +
        '<span style="font-size:12.5px;color:#0D7A5F">+₦19.50 (4.2%) today</span>' +
        '<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:#9C9A95"><span style="width:6px;height:6px;border-radius:50%;background:#0D7A5F"></span>NGX · 14:32</span>' +
      '</div>' +
      '<svg viewBox="0 0 340 120" width="100%" height="120" preserveAspectRatio="none" style="display:block;margin-top:12px;overflow:visible">' +
        '<line x1="0" y1="66" x2="340" y2="66" stroke="#C9C5BC" stroke-width="1" stroke-dasharray="3 3"></line>' +
        '<path data-chart-path d="' + c.path + '" fill="none" stroke="#B8860B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<circle data-chart-end cx="332" cy="' + c.endY + '" r="3" fill="#B8860B"></circle>' +
      '</svg>' +
      '<div style="display:flex;gap:6px;margin-top:10px" data-chart-frames>' +
        ['1D', '1W', '1M', '1Y', 'ALL'].map(function (f, i) {
          var on = i === 0;
          return '<div data-frame="' + f + '" style="flex:1;text-align:center;font-size:12px;border-radius:8px;padding:8px 0;cursor:pointer;background:' + (on ? '#1C1917' : 'transparent') + ';color:' + (on ? '#fff' : '#6B6860') + ';transition:background .2s">' + f + '</div>';
        }).join('') +
      '</div>' +
      '<div style="display:flex;margin-top:16px">' +
        [{ k: 'Open', v: '₦470' }, { k: 'High', v: '₦489' }, { k: 'Low', v: '₦468' }, { k: 'Vol', v: '2.4M' }].map(function (q) {
          return '<div style="flex:1;border-right:0.5px solid #E8E5DE;padding-right:12px"><div style="font-size:9.5px;text-transform:uppercase;letter-spacing:0.05em;color:#9C9A95">' + q.k + '</div><div class="mono" style="font-size:12.5px;margin-top:5px">' + q.v + '</div></div>';
        }).join('') +
      '</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:15px;margin-top:16px">' +
        '<div style="display:flex;align-items:baseline;justify-content:space-between"><span style="font-size:20px;font-weight:500;color:#0D7A5F">BUY</span><span style="font-size:11.5px;color:#6B6860">14 analysts · consensus</span></div>' +
        '<div style="display:flex;gap:3px;margin-top:13px">' +
          '<div style="flex:7;height:7px;border-radius:4px 0 0 4px;background:#0D7A5F"></div>' +
          '<div style="flex:4;height:7px;background:#5BA88E"></div>' +
          '<div style="flex:2;height:7px;background:#C9C5BC"></div>' +
          '<div style="flex:1;height:7px;border-radius:0 4px 4px 0;background:#D89B9B"></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:10.5px;color:#9C9A95"><span>Strong buy 7</span><span>Buy 4</span><span>Hold 2</span><span>Sell 1</span></div>' +
        '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-top:14px;padding-top:13px;border-top:0.5px solid #E8E5DE"><span style="font-size:12px;color:#6B6860">Avg price target</span><span class="mono" style="font-size:13.5px">₦540 (+11.3%)</span></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 22px;margin-top:14px">' +
        [{ k: 'Market cap', v: '₦8.2Tn' }, { k: 'P/E', v: '12.4' }, { k: 'EPS', v: '₦39.10' }, { k: 'Div yield', v: '5.2%' }].map(function (k) {
          return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid #E8E5DE"><span style="font-size:12px;color:#6B6860">' + k.k + '</span><span class="mono" style="font-size:12.5px">' + k.v + '</span></div>';
        }).join('') +
      '</div>' +
      '<div style="display:flex;gap:9px;margin-top:16px">' +
        '<div style="width:96px;height:46px;border-radius:50px;border:0.5px solid #1C1917;display:flex;align-items:center;justify-content:center;font-size:13.5px">Sell</div>' +
        '<div style="flex:1;height:46px;border-radius:50px;background:#1C1917;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13.5px">Buy</div>' +
      '</div>' +
    '</div>';

    var evidence = [
      { k: 'Cash flow stability', v: 'High · consistent monthly income', tag: 'Strong', tagFg: '#0D7A5F', tagBg: '#E6F1ED', border: '0.5px solid #E8E5DE' },
      { k: 'Savings discipline', v: '18% savings rate, above average', tag: 'Strong', tagFg: '#0D7A5F', tagBg: '#E6F1ED', border: '0.5px solid #E8E5DE' },
      { k: 'Emotional spend pattern', v: 'Moderate · some stress-linked spending', tag: 'Watch', tagFg: AMBER, tagBg: '#F6EEDB', border: 'none' }
    ];
    var p1 = '<div class="dev__panel" data-panel="1">' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-left:2px solid #D4537E;border-radius:12px;padding:15px">' +
        '<div style="display:flex;align-items:center;gap:7px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4537E" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"></rect><path d="M12 4v4M9 13h.01M15 13h.01"></path></svg>' +
          '<span class="mono" style="font-size:9.5px;letter-spacing:0.05em;color:#9C9A95">NAHL</span>' +
        '</div>' +
        '<div style="font-size:13px;line-height:1.55;margin-top:9px;text-wrap:pretty">I read your risk profile from how you actually handle money — 847 transactions over four months. Here is what I see.</div>' +
      '</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:12px;padding:2px 15px;margin-top:12px">' +
        evidence.map(function (e) {
          return '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0;border-bottom:' + e.border + '">' +
            '<div style="flex:1;min-width:0"><div style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.05em;color:#9C9A95">' + e.k + '</div><div style="font-size:12.5px;margin-top:4px;line-height:1.4">' + e.v + '</div></div>' +
            '<span style="flex:none;font-size:11px;color:' + e.tagFg + ';background:' + e.tagBg + ';border-radius:6px;padding:5px 9px">' + e.tag + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="background:#1C1917;border-radius:12px;padding:20px;margin-top:12px">' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#EF9F27">Your profile</div>' +
        '<div style="font-size:23px;font-weight:500;color:#fff;margin-top:9px;letter-spacing:0.01em">MODERATE GROWTH</div>' +
        '<div style="font-size:12.5px;color:#9C9A95;line-height:1.5;margin-top:9px;text-wrap:pretty">Comfortable with medium-term market fluctuations. Prioritises growth over pure safety.</div>' +
        '<div style="display:flex;align-items:center;gap:7px;margin-top:15px;padding-top:13px;border-top:0.5px solid rgba(255,255,255,0.1)">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B6860" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg>' +
          '<span style="font-size:11px;color:#6B6860">Based on real behaviour, not a quiz you could game.</span>' +
        '</div>' +
      '</div>' +
      '<div style="height:50px;border-radius:50px;background:#1C1917;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13.5px;margin-top:14px">See my recommended portfolio →</div>' +
      '<div style="text-align:center;font-size:12.5px;color:#6B6860;margin-top:12px">Adjust manually</div>' +
    '</div>';

    var p2 = '<div class="dev__panel" data-panel="2">' +
      '<div style="font-size:12.5px;color:#6B6860;line-height:1.5;text-wrap:pretty">Four months of market moves pushed your mix off its target. Here is the drift.</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:16px;margin-top:14px">' +
        INVEST_SLEEVES.map(function (s, i) {
          var d = s.now - s.target;
          var drift = d === 0 ? 'on target' : (d > 0 ? '+' : '−') + Math.abs(d) + ' pts';
          var driftColor = d === 0 ? '#9C9A95' : Math.abs(d) >= 5 ? '#A32D2D' : '#6B6860';
          var border = i === INVEST_SLEEVES.length - 1 ? 'none' : '0.5px solid #E8E5DE';
          return '<div style="padding:11px 0;border-bottom:' + border + '">' +
            '<div style="display:flex;align-items:baseline;justify-content:space-between"><span style="font-size:13px">' + esc(s.name) + '</span><span class="mono" style="font-size:12px;color:' + driftColor + '">' + drift + '</span></div>' +
            '<div style="position:relative;height:6px;border-radius:3px;background:#F0EDE6;margin-top:9px">' +
              '<div style="position:absolute;left:0;top:0;height:6px;border-radius:3px;width:' + s.now + '%;background:' + s.color + '"></div>' +
              '<div style="position:absolute;left:' + s.target + '%;top:-3px;width:2px;height:12px;background:#1C1917"></div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;margin-top:6px;font-size:10.5px;color:#9C9A95"><span>now ' + s.now + '%</span><span>target ' + s.target + '%</span></div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-left:2px solid #D4537E;border-radius:12px;padding:15px;margin-top:12px">' +
        '<div style="display:flex;align-items:center;gap:7px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4537E" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"></rect><path d="M12 4v4M9 13h.01M15 13h.01"></path></svg>' +
          '<span class="mono" style="font-size:9.5px;letter-spacing:0.05em;color:#9C9A95">NAHL</span>' +
        '</div>' +
        '<div style="font-size:12.5px;line-height:1.55;margin-top:9px;text-wrap:pretty">Equities are 7 points over target, mostly DANGCEM. Selling ₦38,400 and buying FGN bonds brings you back to Moderate Growth. Cost: ₦412 all in.</div>' +
        '<div style="display:inline-flex;align-items:center;height:34px;padding:0 15px;border-radius:50px;background:#1C1917;color:#fff;font-size:12.5px;margin-top:12px">Rebalance now</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;background:#F0EDE6;border-radius:12px;padding:14px;margin-top:11px">' +
        '<span style="font-size:12.5px;color:#6B6860">Do this automatically each quarter</span>' +
        '<span style="width:40px;height:23px;border-radius:50px;background:#0D7A5F;position:relative;flex:none"><span style="position:absolute;top:2px;left:19px;width:19px;height:19px;border-radius:50%;background:#fff"></span></span>' +
      '</div>' +
    '</div>';

    return p0 + p1 + p2;
  }

  /* ---------- CIRCLE ---------- */
  var CIRCLE_GROUP_MSGS = [
    { isSystem: true, text: 'Ada proposed: raise the weekly contribution from ₦20k to ₦30k' },
    { isMember: true, name: 'Ada', initials: 'AD', bg: '#FBEAF0', fg: '#D4537E', text: 'Bigger payouts and we finish the round faster. Who is in?' },
    { isNahl: true, chip: 'Neutral mediator', chipFg: '#6B6860', chipBg: '#F0EDE6',
      text: 'I do not take a side. Here is exactly what +₦10k a week does for each of you.',
      hasImpacts: true, hasRule: true, hasStats: false,
      impacts: [
        { initials: 'AD', bg: '#FBEAF0', fg: '#D4537E', text: 'Ada — comfortable, wants the upside', tone: '#0D7A5F' },
        { initials: 'OO', bg: '#FAEEDA', fg: AMBER, text: 'You — fits your cash flow, +₦80k payout', tone: '#0D7A5F' },
        { initials: 'MU', bg: '#E4ECF5', fg: '#185FA5', text: 'Musa — would dip below his floor in week 3', tone: '#A32D2D' }
      ],
      ruleText: 'Changing the contribution mid-circle is a governance change — it needs a unanimous vote, not a majority. And I cannot let it push Musa below his Safety Floor.' },
    { isMember: true, name: 'Musa', initials: 'MU', bg: '#E4ECF5', fg: '#185FA5', text: 'Honestly ₦30k might be tight for me some weeks.' }
  ];
  var CIRCLE_PRIVATE_MSGS = [
    { isSystem: true, text: 'Private channel — only you can see this. The circle never sees a word.' },
    { isYou: true, text: 'Be straight with me — is raising to ₦30k still good for me?' },
    { isNahl: true, chip: 'Private · your side', chipFg: '#D4537E', chipBg: '#FBEAF0',
      text: 'Yes, for you specifically. Your income clears ₦30k a week comfortably, and the bigger payout lands right when your laptop goal is due.',
      hasImpacts: false, hasRule: false, hasStats: true,
      stats: [{ k: 'Your floor', v: 'Protected', color: '#0D7A5F' }, { k: 'Your payout', v: '+₦80,000', color: AMBER }] },
    { isNahl: true, chip: 'Private · your side', chipFg: '#D4537E', chipBg: '#FBEAF0',
      text: 'It works for you and strains Musa. If you value the circle holding together, ₦25k is the number where everyone stays safe. Whatever you decide here stays between us.',
      hasImpacts: false, hasRule: false, hasStats: false }
  ];
  var CIRCLE_CONTRIBUTORS = [
    { name: 'Hauwa I.', initials: 'HI', amt: '₦96,000', pct: 48, bg: '#E4ECF5', fg: '#185FA5' },
    { name: 'Zainab A.', initials: 'ZA', amt: '₦168,000', pct: 84, bg: '#FBEAF0', fg: '#D4537E' },
    { name: 'You', initials: 'OO', amt: '₦160,000', pct: 80, bg: '#FAEEDA', fg: AMBER },
    { name: 'Fatima B.', initials: 'FB', amt: '₦152,000', pct: 76, bg: '#EDEBF5', fg: '#3C3489' },
    { name: 'Amina S.', initials: 'AS', amt: '₦166,000', pct: 83, bg: '#E6F1ED', fg: '#0D7A5F' }
  ];

  function circleMsgsHtml(msgs) {
    return msgs.map(function (m) {
      if (m.isSystem) return '<div><div style="text-align:center;font-size:10.5px;color:#9C9A95;line-height:1.4;padding:2px 0">' + esc(m.text) + '</div></div>';
      if (m.isMember) return '<div><div style="display:flex;align-items:flex-end;gap:8px">' +
        '<span style="width:26px;height:26px;border-radius:50%;background:' + m.bg + ';color:' + m.fg + ';display:flex;align-items:center;justify-content:center;font-size:9.5px;flex:none">' + m.initials + '</span>' +
        '<div style="max-width:74%"><div style="font-size:10px;color:#9C9A95;margin:0 0 3px 3px">' + esc(m.name) + '</div>' +
        '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px 14px 14px 4px;padding:10px 13px;font-size:12.5px;line-height:1.45;text-wrap:pretty">' + esc(m.text) + '</div></div></div></div>';
      if (m.isYou) return '<div><div style="display:flex;justify-content:flex-end"><div style="max-width:76%;background:#1C1917;border-radius:14px 14px 4px 14px;padding:10px 13px;font-size:12.5px;color:#fff;line-height:1.45;text-wrap:pretty">' + esc(m.text) + '</div></div></div>';
      /* Nahl */
      var inner = '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:12px;font-weight:500">Nahl</span>' +
        '<span style="font-size:9px;color:' + m.chipFg + ';background:' + m.chipBg + ';border-radius:50px;padding:3px 8px;text-transform:uppercase;letter-spacing:0.04em">' + esc(m.chip) + '</span></div>' +
        '<div style="font-size:12.5px;line-height:1.55;margin-top:9px;text-wrap:pretty">' + esc(m.text) + '</div>';
      if (m.hasImpacts) {
        inner += '<div style="margin-top:12px;padding-top:11px;border-top:0.5px solid #E8E5DE;display:flex;flex-direction:column;gap:9px">' +
          m.impacts.map(function (im) {
            return '<div style="display:flex;align-items:center;gap:10px">' +
              '<span style="width:21px;height:21px;border-radius:50%;background:' + im.bg + ';color:' + im.fg + ';display:flex;align-items:center;justify-content:center;font-size:8.5px;flex:none">' + im.initials + '</span>' +
              '<span style="flex:1;font-size:11.5px;color:#6B6860;line-height:1.35">' + esc(im.text) + '</span>' +
              '<span style="width:7px;height:7px;border-radius:2px;background:' + im.tone + ';flex:none"></span>' +
            '</div>';
          }).join('') + '</div>';
      }
      if (m.hasRule) inner += '<div style="background:#F6E7E7;border-radius:10px;padding:11px;margin-top:11px;font-size:11px;line-height:1.45;text-wrap:pretty">' + esc(m.ruleText) + '</div>';
      if (m.hasStats) {
        inner += '<div style="display:flex;gap:8px;margin-top:12px">' +
          m.stats.map(function (s) {
            return '<div style="flex:1;background:#F0EDE6;border-radius:10px;padding:10px 11px"><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.04em;color:#9C9A95">' + esc(s.k) + '</div><div style="font-size:12.5px;font-weight:500;color:' + s.color + ';margin-top:5px">' + esc(s.v) + '</div></div>';
          }).join('') + '</div>';
      }
      return '<div><div style="display:flex;gap:9px">' +
        '<span style="width:26px;height:26px;border-radius:50%;background:#FBEAF0;display:flex;align-items:center;justify-content:center;flex:none">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4537E" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"></rect><path d="M12 4v4M9 13h.01M15 13h.01"></path></svg>' +
        '</span>' +
        '<div style="flex:1;min-width:0;background:#fff;border:0.5px solid #E8E5DE;border-left:2px solid #D4537E;border-radius:4px 14px 14px 14px;padding:13px">' + inner + '</div>' +
      '</div></div>';
    }).join('');
  }

  function circleRegisterHtml(reg) {
    var isGroup = reg === 'group';
    var bannerBg = isGroup ? '#fff' : '#FBEAF0';
    var bannerBorder = isGroup ? '#E8E5DE' : '#D4537E';
    var bannerText = isGroup
      ? 'Same Nahl, speaking to the whole circle — neutral, rule-bound, protecting every member’s floor.'
      : 'The same Nahl, now answering only to you — honestly, in your interest, even inside the group.';
    return '<div style="display:flex;gap:4px;background:#F0EDE6;border-radius:50px;padding:4px" data-circle-regs>' +
        '<div data-reg="group" style="flex:1;text-align:center;font-size:12.5px;border-radius:50px;padding:9px 0;cursor:pointer;background:' + (isGroup ? '#fff' : 'transparent') + ';color:' + (isGroup ? '#1C1917' : '#6B6860') + ';transition:background .2s">Group register</div>' +
        '<div data-reg="private" style="flex:1;text-align:center;font-size:12.5px;border-radius:50px;padding:9px 0;cursor:pointer;background:' + (isGroup ? 'transparent' : '#fff') + ';color:' + (isGroup ? '#6B6860' : '#1C1917') + ';transition:background .2s">Private</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:9px;background:' + bannerBg + ';border:0.5px solid ' + bannerBorder + ';border-radius:12px;padding:11px 12px;margin-top:10px">' +
        '<span style="font-size:11px;color:#6B6860;line-height:1.45;flex:1;text-wrap:pretty">' + bannerText + '</span>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:11px;margin-top:14px">' +
        circleMsgsHtml(isGroup ? CIRCLE_GROUP_MSGS : CIRCLE_PRIVATE_MSGS) +
      '</div>';
  }

  function circlePanels() {
    var rotation = ['BK', 'ID', 'CN', 'You', 'FB', 'KE', 'SA', 'TA'].map(function (label, i) {
      var paid = i < 3, you = i === 3;
      return { label: label, bg: paid ? '#F0EDE6' : you ? AMBER : '#fff', fg: paid ? '#9C9A95' : you ? '#fff' : '#6B6860', border: paid ? '0.5px solid #E8E5DE' : you ? 'none' : '0.5px solid #E8E5DE', num: String(i + 1), numColor: you ? '#1C1917' : '#9C9A95' };
    });
    var ledger = [
      { name: 'Bola K.', initials: 'BK', state: 'Paid', stateColor: '#0D7A5F', bg: '#E6F1ED', fg: '#0D7A5F' },
      { name: 'Ada D.', initials: 'AD', state: 'Paid', stateColor: '#0D7A5F', bg: '#FBEAF0', fg: '#D4537E' },
      { name: 'Musa U.', initials: 'MU', state: 'Due Friday', stateColor: '#9C9A95', bg: '#E4ECF5', fg: '#185FA5' },
      { name: 'You', initials: 'OO', state: 'Due Friday', stateColor: AMBER, bg: '#FAEEDA', fg: AMBER }
    ];
    var p0 = '<div class="dev__panel" data-panel="0">' +
      '<div style="background:#1C1917;border-radius:14px;padding:18px">' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<span style="display:flex;align-items:center;gap:6px;font-size:10px;color:#fff;background:rgba(255,255,255,0.14);border-radius:50px;padding:4px 10px">' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path></svg>Escrow held' +
          '</span>' +
          '<span style="font-size:10px;color:#9C9A95;background:rgba(255,255,255,0.08);border-radius:50px;padding:4px 10px">Cycle 4 of 8</span>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:500;color:#fff;margin-top:14px">Lagos Devs Ajo</div>' +
        '<div style="display:flex;align-items:center;gap:14px;margin-top:14px">' +
          '<div><div class="mono" style="font-size:17px;font-weight:500;color:#fff">₦20k</div><div style="font-size:10px;color:#9C9A95;margin-top:3px">per week</div></div>' +
          '<span style="width:0.5px;height:26px;background:rgba(255,255,255,0.15)"></span>' +
          '<div><div class="mono" style="font-size:17px;font-weight:500;color:#fff">8</div><div style="font-size:10px;color:#9C9A95;margin-top:3px">members</div></div>' +
          '<span style="width:0.5px;height:26px;background:rgba(255,255,255,0.15)"></span>' +
          '<div><div class="mono" style="font-size:17px;font-weight:500;color:#fff">₦160k</div><div style="font-size:10px;color:#9C9A95;margin-top:3px">each payout</div></div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin:20px 0 12px">' +
        '<span class="k">Payout rotation</span><span style="font-size:11px;color:#6B6860">You\'re #4</span>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between">' +
        rotation.map(function (r) {
          return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1">' +
            '<span style="width:30px;height:30px;border-radius:50%;background:' + r.bg + ';border:' + r.border + ';color:' + r.fg + ';display:flex;align-items:center;justify-content:center;font-size:9.5px">' + r.label + '</span>' +
            '<span style="font-size:9px;color:' + r.numColor + '">' + r.num + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="display:flex;gap:9px;margin-top:18px">' +
        '<div style="flex:1;background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:13px 14px"><div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#9C9A95">Your payout</div><div class="mono" style="font-size:16px;font-weight:500;margin-top:8px">Apr 12</div><div style="font-size:10.5px;color:#6B6860;margin-top:4px">in 4 weeks · ₦160,000</div></div>' +
        '<div style="flex:1;background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:13px 14px"><div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#9C9A95">On time</div><div class="mono" style="font-size:16px;font-weight:500;margin-top:8px;color:#0D7A5F">12 of 12</div><div style="font-size:10.5px;color:#6B6860;margin-top:4px">your record, visible to all</div></div>' +
      '</div>' +
      '<div class="k" style="margin:18px 0 4px">This cycle</div>' +
      '<div style="display:grid;gap:0">' +
        ledger.map(function (l) {
          return '<div style="display:flex;align-items:center;gap:11px;padding:11px 0;border-bottom:0.5px solid #E8E5DE">' +
            '<span style="width:26px;height:26px;border-radius:50%;background:' + l.bg + ';color:' + l.fg + ';display:flex;align-items:center;justify-content:center;font-size:9.5px;flex:none">' + l.initials + '</span>' +
            '<span style="flex:1;font-size:13px">' + esc(l.name) + '</span>' +
            '<span style="font-size:11.5px;color:' + l.stateColor + '">' + esc(l.state) + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="height:48px;border-radius:50px;background:#1C1917;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13.5px;margin-top:16px">Pay ₦20,000 into escrow</div>' +
    '</div>';

    var p1 = '<div class="dev__panel" data-panel="1">' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-radius:14px;padding:18px">' +
        '<div style="display:flex;align-items:baseline;justify-content:space-between">' +
          '<div><div style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.05em;color:#9C9A95">Group goal</div><div style="font-size:16px;font-weight:500;margin-top:6px">Sokoto WAG · grinding mill</div></div>' +
          '<span style="font-size:11px;color:#B8860B;background:#F3ECD9;border-radius:50px;padding:5px 10px;white-space:nowrap">6 members</span>' +
        '</div>' +
        '<div style="display:flex;align-items:baseline;gap:8px;margin-top:16px"><span class="mono" style="font-size:26px;font-weight:500">₦742,000</span><span style="font-size:12.5px;color:#6B6860">of ₦1,200,000</span></div>' +
        '<div style="height:7px;border-radius:4px;background:#F0EDE6;margin-top:13px;overflow:hidden"><div style="height:7px;border-radius:4px;width:62%;background:#B8860B"></div></div>' +
        '<div style="display:flex;justify-content:space-between;margin-top:9px;font-size:11px;color:#9C9A95"><span>62% funded</span><span>on pace for 14 Nov</span></div>' +
      '</div>' +
      '<div class="k" style="margin:20px 0 4px">Who has put in what</div>' +
      '<div style="display:grid;gap:0">' +
        CIRCLE_CONTRIBUTORS.map(function (c) {
          var bar = c.pct < 60 ? '#A32D2D' : AMBER;
          return '<div style="padding:12px 0;border-bottom:0.5px solid #E8E5DE">' +
            '<div style="display:flex;align-items:center;gap:11px">' +
              '<span style="width:26px;height:26px;border-radius:50%;background:' + c.bg + ';color:' + c.fg + ';display:flex;align-items:center;justify-content:center;font-size:9.5px;flex:none">' + c.initials + '</span>' +
              '<span style="flex:1;font-size:13px">' + esc(c.name) + '</span>' +
              '<span class="mono" style="font-size:12px;color:#6B6860">' + c.amt + '</span>' +
            '</div>' +
            '<div style="height:4px;border-radius:2px;background:#F0EDE6;margin-top:8px;margin-left:37px;overflow:hidden"><div style="height:4px;border-radius:2px;width:' + c.pct + '%;background:' + bar + '"></div></div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="background:#fff;border:0.5px solid #E8E5DE;border-left:2px solid #D4537E;border-radius:12px;padding:14px;margin-top:14px">' +
        '<div style="display:flex;align-items:center;gap:7px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4537E" stroke-width="1.6" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"></rect><path d="M12 4v4M9 13h.01M15 13h.01"></path></svg>' +
          '<span class="mono" style="font-size:9.5px;letter-spacing:0.05em;color:#9C9A95">NAHL</span>' +
        '</div>' +
        '<div style="font-size:12.5px;line-height:1.55;margin-top:9px;text-wrap:pretty">Hauwa has missed two weeks. Her cash flow says the ₦8,000 weekly is too high — ₦5,000 keeps her in and still lands the mill by 28 Nov.</div>' +
      '</div>' +
    '</div>';

    var p2 = '<div class="dev__panel" data-panel="2"><div data-circle-register>' + circleRegisterHtml('group') + '</div></div>';
    return p0 + p1 + p2;
  }

  /* ---------- shared shell ---------- */
  function navHtml(activeLabel) {
    return '<div class="dev__tabs">' +
      ['Home', 'Spend', 'Save', 'Invest', 'Nahl'].map(function (l) {
        return '<div class="dev__tab' + (l === activeLabel ? ' is-on' : '') + '"><span class="dev__tab-label">' + l + '</span><span class="dev__tab-dot"></span></div>';
      }).join('') + '</div>';
  }
  function nahlBarHtml(hint, micIcon) {
    return '<div class="dev__nahlbar">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8860B" stroke-width="1.5" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"></rect><path d="M12 4v4M9 13h.01M15 13h.01"></path></svg>' +
      '<span class="dev__nahlbar-hint" data-dev-hint>' + esc(hint) + '</span>' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9C9A95" stroke-width="1.5" stroke-linecap="round"><path d="M12 4v10M9 7a3 3 0 016 0v4a3 3 0 01-6 0z"></path><path d="M6 12a6 6 0 0012 0M12 18v3"></path></svg>' +
    '</div>';
  }

  var CONFIGS = {
    spend: {
      panels: 4,
      titles: ['Spending', 'Budgets', 'Spending heatmap', 'Subscriptions'],
      pills: ['June', 'June', 'June', 'June'],
      hints: ['Ask me about your spending', 'Ask me about your spending', 'Ask me about your spending', 'Ask me about your spending'],
      nav: 'Spend',
      body: spendPanels
    },
    save: {
      panels: 3,
      titles: ['Payday auto-save', 'Savings rules', 'Capsules'],
      pills: ['26 Sep', 'Active', '₦460k saved'],
      hints: ['Ask Nahl to build a rule', 'Ask Nahl to build a rule', 'Ask Nahl to build a rule'],
      nav: 'Save',
      body: savePanels
    },
    invest: {
      panels: 3,
      titles: ['DANGCEM', 'Risk profile', 'Rebalance'],
      pills: ['NGX', '1 of 3', 'Q3 drift'],
      hints: ['Ask Nahl about DANGCEM', 'Ask Nahl about your profile', 'Ask Nahl about the drift'],
      nav: 'Invest',
      body: investPanels
    },
    circle: {
      panels: 3,
      titles: ['Savvy Circle', 'Group goal', 'Nahl register'],
      pills: ['Cycle 4', '62%', 'Group'],
      hints: ['Ask Nahl about this circle', 'Ask Nahl about the pace', 'Message the circle…'],
      nav: 'Nahl',
      body: circlePanels
    }
  };

  function buildDevice(name) {
    var cfg = CONFIGS[name];
    var el = document.createElement('div');
    el.className = 'dev';
    el.setAttribute('data-dev', name);
    el.innerHTML = '<div class="dev__scaler"><div class="dev__screen">' +
      '<div class="dev__head"><div class="dev__title" data-dev-title>' + esc(cfg.titles[0]) + '</div><div class="dev__pill" data-dev-pill>' + esc(cfg.pills[0]) + '</div></div>' +
      '<div class="dev__body">' + cfg.body() + '</div>' +
      '<div class="dev__foot">' + nahlBarHtml(cfg.hints[0]) + navHtml(cfg.nav) + '</div>' +
    '</div></div>';
    el.querySelector('[data-panel="0"]').classList.add('is-active');

    /* internal interactions */
    if (name === 'invest') {
      var frames = el.querySelector('[data-chart-frames]');
      frames.addEventListener('click', function (e) {
        var t = e.target.closest('[data-frame]');
        if (!t) return;
        var f = t.getAttribute('data-frame');
        var c = investChart(f);
        el.querySelector('[data-chart-path]').setAttribute('d', c.path);
        el.querySelector('[data-chart-end]').setAttribute('cy', c.endY);
        Array.prototype.forEach.call(frames.children, function (btn) {
          var on = btn.getAttribute('data-frame') === f;
          btn.style.background = on ? '#1C1917' : 'transparent';
          btn.style.color = on ? '#fff' : '#6B6860';
        });
      });
    }
    if (name === 'circle') {
      el.addEventListener('click', function (e) {
        var t = e.target.closest('[data-reg]');
        if (!t) return;
        var reg = t.getAttribute('data-reg');
        el.__reg = reg;
        el.querySelector('[data-circle-register]').innerHTML = circleRegisterHtml(reg);
        if (el.__step === 2) {
          el.querySelector('[data-dev-pill]').textContent = reg === 'group' ? 'Group' : 'Private';
          el.querySelector('[data-dev-hint]').textContent = reg === 'group' ? 'Message the circle…' : 'Ask Nahl privately…';
        }
      });
      el.__reg = 'group';
    }
    el.__step = 0;
    return el;
  }

  function setDeviceStep(el, step) {
    var name = el.getAttribute('data-dev');
    var cfg = CONFIGS[name];
    el.__step = step;
    el.querySelector('[data-dev-title]').textContent = cfg.titles[step];
    var pill = cfg.pills[step];
    var hint = cfg.hints[step];
    if (name === 'circle' && step === 2) {
      pill = el.__reg === 'group' ? 'Group' : 'Private';
      hint = el.__reg === 'group' ? 'Message the circle…' : 'Ask Nahl privately…';
    }
    el.querySelector('[data-dev-pill]').textContent = pill;
    el.querySelector('[data-dev-hint]').textContent = hint;
    Array.prototype.forEach.call(el.querySelectorAll('.dev__panel'), function (p) {
      p.classList.toggle('is-active', Number(p.getAttribute('data-panel')) === step);
    });
  }

  function setDeviceFit(el, fit) {
    el.style.width = Math.round(421 * fit) + 'px';
    el.style.height = Math.round(880 * fit) + 'px';
    el.querySelector('.dev__scaler').style.transform = 'scale(' + fit + ')';
  }

  window.SBDevices = { build: buildDevice, setStep: setDeviceStep, setFit: setDeviceFit, panelCounts: { spend: 4, save: 3, invest: 3, circle: 3 } };
})();
