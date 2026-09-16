/* Legal page — direct port of Legal.dc.html.
   The four documents' copy is transcribed verbatim from the export; the tab strip
   reads and writes the URL hash so legal.html#terms/#privacy/#fees/#complaints
   deep-link correctly (this is how the landing footer's four links work). */
(function () {
  'use strict';
  var AMBER = '#B8860B';

  var DOCS = [
    {
      id: 'terms', label: 'Terms of use', n: '01',
      hint: 'What you agree to when you use Savvy Bee.',
      title: 'Terms of use',
      meta: 'VERSION 0.4 · DRAFT · LAST UPDATED 16 SEPTEMBER 2026',
      intro: 'These terms are the agreement between you and Savvy Bee Ltd. By creating an account you accept them.',
      blocks: [
        { h: 'Who we are', ps: ['Savvy Bee Ltd is a company registered in Nigeria (RC 8326527), with its registered office at A311, Garki Mall, Damaturu Street, Garki II, Abuja, FCT. In these terms, "we", "us" and "Savvy Bee" mean that company, and "you" means the person holding the account.'] },
        { h: 'What Savvy Bee is, and what it is not', ps: ['Savvy Bee is a financial operating system: it connects accounts you already hold, presents them as one position, and helps you act on what it finds. It is not a bank and does not take deposits in its own name.', 'Where a function is regulated — holding funds, executing a trade, connecting to your bank — that function is performed by a licensed partner institution under an agreement with us. We tell you which partner is involved at the point you use the feature.'] },
        { h: 'Who can open an account', bullets: ['You are 18 or older and legally able to enter a contract', 'You are resident in Nigeria and can complete identity verification (BVN, NIN or an accepted document)', 'You are acting for yourself, not on behalf of an undisclosed third party', 'The accounts you connect belong to you'] },
        { h: 'Your account and your security', ps: ['One account per person. Keep your passcode, device and one-time codes to yourself; anything done with your credentials is treated as done by you unless you tell us otherwise.', 'If you lose your device or think someone else has access, tell us immediately through the app or at hello@mysavvybee.com. We will freeze the account while we investigate.'] },
        { h: 'Connecting your other accounts', ps: ['A connected bank, wallet or card is read-only. You authorise the connection yourself through a licensed connectivity provider, and you can revoke it at any time in Settings.', 'What we show you is what the connected institution sends us. If their data is late, incomplete or wrong, your Savvy Bee view will be too. We are not responsible for the accuracy of data we did not generate, but we will show you when it was last synced.'] },
        { h: 'Nahl and automated insight', ps: ['Nahl reads the accounts you connect and proposes actions. It does not move money on its own: every action waits for your approval, and shows what it costs and what it changes first.', 'Nahl is not a licensed financial adviser and its output is information, not advice. Decisions you take are yours.'] },
        { h: 'Savings capsules and vaults', ps: ['Money you save through Savvy Bee is held with a licensed partner institution, in an arrangement designed so that your funds are not our funds and are not available to our creditors.', 'A vault has a lock period you choose. Breaking it early is allowed, but any interest accrued for the period may be forfeited. Interest rates, where offered, come from the partner institution and can change.'] },
        { h: 'Investing', ps: ['Investment orders are placed through a licensed broker-dealer. Securities bought for you are held in your own name at the central depository, not in a pooled Savvy Bee account.', 'The value of investments can fall as well as rise, and you can get back less than you put in. Nothing in the product is a promise of return. Orders show total cost, including third-party charges, before you confirm them. Execution and settlement follow exchange rules and timelines, not ours.'] },
        { h: 'Circles and the Hive', ps: ['A circle is an arrangement between you and the people you invite. We provide the register, the schedule, the escrow and the record; we are not a member, a guarantor or an insurer of it.', 'Contributions sit in escrow until the rotation date. If a member stops contributing, we will show it, hold the record and apply the rules the circle agreed — but we cannot make anyone pay, and we do not cover the shortfall.'] },
        { h: 'Fees', ps: ['Our charges are set out in the Fees schedule, which forms part of these terms. Every charge is shown on screen before you confirm the transaction it applies to. We will give you at least 30 days’ notice before a fee increases or a new fee applies.'] },
        { h: 'How you may not use Savvy Bee', bullets: ['Fraud, money laundering, terrorist financing or sanctions evasion', 'Moving funds that belong to someone else without disclosing it', 'Gambling operations, unlicensed lending or unlicensed currency dealing', 'Scraping, reverse-engineering or reselling any part of the product'] },
        { h: 'Suspension, closure and dormancy', ps: ['We may freeze or close an account where we are required to by law or a regulator, where we reasonably suspect fraud or misuse, or where you break these terms. Where we are permitted to tell you why, we will.', 'You can close your account at any time. We will return any balance to a bank account in your name, less anything properly owed. Accounts with no activity for 24 months are treated as dormant and handled under applicable rules.'] },
        { h: 'What we are responsible for', ps: ['We are responsible for providing the service with reasonable care and skill, and for losses we cause you directly. We are not responsible for market losses, for the acts or outages of banks, exchanges and other third parties, or for indirect losses such as lost profit or opportunity.', 'Nothing here limits liability that cannot be limited under Nigerian law, including for fraud or death and personal injury caused by negligence.'] },
        { h: 'Changes to these terms', ps: ['We may change these terms. For material changes we will give you at least 14 days’ notice in the app or by email. If you do not accept a change you can close your account before it takes effect.'] },
        { h: 'Complaints and governing law', ps: ['If something goes wrong, use the Complaints procedure — it is quicker than anything else available to you, and most regulators require you to try it first. These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of the FCT, Abuja have jurisdiction.'] }
      ]
    },
    {
      id: 'privacy', label: 'Privacy', n: '02',
      hint: 'What we hold, why, and how to get it back or deleted.',
      title: 'Privacy notice',
      meta: 'VERSION 0.4 · DRAFT · NIGERIA DATA PROTECTION ACT 2023',
      intro: 'Savvy Bee Ltd is the data controller for the personal data described here. Our data protection officer is reachable at privacy@mysavvybee.com.',
      blocks: [
        { h: 'What we collect', bullets: ['Identity and contact data: name, date of birth, address, phone, email, BVN or NIN, a selfie or ID document for verification', 'Financial data from accounts you connect: balances, transactions, merchant and category detail, holdings, contribution and repayment history', 'Data you create in the product: goals, budgets, circles, rules, questions you ask Nahl', 'Technical data: device model, operating system, IP address, app version, crash and performance logs', 'Support data: messages, calls and complaint records'] },
        { h: 'Why we are allowed to hold it', ps: ['Performance of our contract with you, for anything needed to run the account, the unified balance and the features you use.', 'Legal obligation, for identity verification, sanctions screening, transaction monitoring, record-keeping and regulatory reporting.', 'Your consent, for connecting an external account, for marketing messages and for optional personalisation. You can withdraw consent at any time without affecting what came before.', 'Our legitimate interests, for fraud prevention, security, product improvement and aggregated, non-identifying analysis.'] },
        { h: 'What we do with it', bullets: ['Build the single position across your accounts, and categorise transactions on arrival', 'Run Nahl: work out what a decision costs you and propose an action you approve', 'Detect and prevent fraud, and keep the service secure and available', 'Meet anti-money-laundering, tax and regulatory obligations', 'Support you when you contact us, and investigate complaints'] },
        { h: 'Automated processing and Nahl', ps: ['Nahl analyses your financial data automatically to produce insight, proposals and a risk profile. It proposes; you approve. We do not take decisions about you by automated means alone where those decisions would have a legal or similarly significant effect on you.', 'You can turn off insight personalisation in Settings. Core categorisation and fraud monitoring stay on, because the service and our obligations depend on them.'] },
        { h: 'Who we share it with', ps: ['We do not sell your personal data, and we do not share transaction data for advertising.', 'We share what is necessary with: the licensed connectivity provider that powers account linking; the partner institution that holds saved funds; the licensed broker-dealer that executes orders; identity verification, fraud screening, cloud hosting, messaging and analytics providers acting on our instructions; our auditors and professional advisers; and regulators, courts or law enforcement where we are legally required to.'] },
        { h: 'Data outside Nigeria', ps: ['Some of our processors host data outside Nigeria. Where that happens we transfer it only under the conditions the Nigeria Data Protection Act allows, with contractual safeguards, and we keep a record of each transfer and its basis.'] },
        { h: 'How long we keep it', ps: ['For as long as you hold an account, and then for the period our financial-services and anti-money-laundering obligations require — currently seven years after the relationship ends. Some records, such as complaint files and consent logs, have their own retention period. After that we delete or irreversibly anonymise the data.'] },
        { h: 'Your rights', bullets: ['Ask for a copy of the personal data we hold about you', 'Have inaccurate data corrected', 'Ask us to delete data we no longer have a lawful reason to keep', 'Object to or restrict certain processing, including marketing', 'Receive your data in a portable format, or have it sent to another provider', 'Withdraw a consent, or revoke a connected account, at any time'] },
        { h: 'How to exercise them', ps: ['Email privacy@mysavvybee.com. We will acknowledge within three business days and respond within 30 days; if a request is complex we will tell you why and when to expect an answer. There is no charge unless a request is excessive or repetitive.'] },
        { h: 'Cookies and the website', ps: ['Our website uses strictly necessary cookies to work, and analytics cookies only if you accept them. You can change your choice at any time from the footer.'] },
        { h: 'Children', ps: ['Savvy Bee is not for anyone under 18 and we do not knowingly collect their data. If a child’s data reaches us, tell us and we will delete it.'] },
        { h: 'If you are unhappy with how we handled your data', ps: ['Raise it with our data protection officer first at privacy@mysavvybee.com. If you are not satisfied, you have the right to complain to the Nigeria Data Protection Commission.'] }
      ]
    },
    {
      id: 'fees', label: 'Fees', n: '03',
      hint: 'Every charge, including the ones we pass on.',
      title: 'Fees and charges',
      meta: 'LAUNCH PRICING · DRAFT · EFFECTIVE AT LAUNCH · ALL FIGURES IN ₦',
      intro: 'One price, on screen, before you confirm. If a charge is not on this page, we are not charging it.',
      blocks: [
        { h: 'The account', rows: [
          { a: 'Opening and holding an account', b: 'Free' },
          { a: 'The unified balance and spending analysis', b: 'Free' },
          { a: 'Connecting a bank, wallet or card', b: 'Free', note: 'No limit on the number of connections' },
          { a: 'Nahl, budgets, heatmap and subscription tracking', b: 'Free' },
          { a: 'Monthly maintenance or inactivity fee', b: 'None', accent: true }
        ] },
        { h: 'Moving money', rows: [
          { a: 'Transfers to another Savvy Bee user', b: 'Free' },
          { a: 'Transfer to another bank, up to ₦5,000', b: '₦10' },
          { a: 'Transfer to another bank, ₦5,001 – ₦50,000', b: '₦25' },
          { a: 'Transfer to another bank, above ₦50,000', b: '₦50' },
          { a: 'Funding by debit card', b: '1.4% + ₦100', note: 'Charged by the payment processor and passed through at cost' },
          { a: 'Bank transfer into your account', b: 'Free' },
          { a: 'Failed or reversed transaction', b: 'No fee', note: 'Any charge taken is refunded with the principal' }
        ] },
        { h: 'Saving', rows: [
          { a: 'Capsules, rules and payday auto-save', b: 'Free' },
          { a: 'Withdrawing from an unlocked capsule', b: 'Free' },
          { a: 'Breaking a vault before its lock ends', b: 'No fee', note: 'Interest accrued for the period may be forfeited' },
          { a: 'Interest on saved balances', b: 'Set by partner', note: 'Quoted per annum in the app, gross of withholding tax, and can change' }
        ] },
        { h: 'Investing', rows: [
          { a: 'Brokerage commission on an equity order', b: '1.00% of consideration' },
          { a: 'Exchange, depository and regulatory fees', b: 'At cost', note: 'Set by the exchange, the depository and the regulator, not by us. Shown line by line before you confirm' },
          { a: 'Holding, custody or account statement', b: 'Free' },
          { a: 'Scheduled rebalance', b: 'Order fees only' },
          { a: 'Currency conversion', b: 'Rate + 0.5%', note: 'The rate you receive and the margin are both displayed before you convert' }
        ] },
        { h: 'Circles and the Hive', rows: [
          { a: 'Creating or joining a circle', b: 'Free' },
          { a: 'Escrow and payout rotation', b: 'Free' },
          { a: 'Group goals and shared registers', b: 'Free' }
        ] },
        { h: 'Charges that are not ours', ps: ['Some amounts leave your account because someone else requires them. We show them separately and we do not add to them.'], rows: [
          { a: 'Electronic money transfer levy', b: '₦50', note: 'Government levy on inflows of ₦10,000 and above' },
          { a: 'VAT on our fees', b: '7.5%' },
          { a: 'Withholding tax on interest and dividends', b: 'Statutory rate', note: 'Deducted at source by the paying institution' },
          { a: 'Your own bank’s charges on an outbound transfer', b: 'Set by them' }
        ] },
        { h: 'Changing this schedule', ps: ['We will give you at least 30 days’ notice in the app and by email before a fee increases or a new fee applies. A price that falls applies immediately. Every version of this schedule stays available, so you can see what changed and when.'] }
      ]
    },
    {
      id: 'complaints', label: 'Complaints', n: '04',
      hint: 'How to raise one, our timelines, and where to escalate.',
      title: 'Complaints procedure',
      meta: 'VERSION 0.4 · DRAFT · ALIGNED TO THE CBN CONSUMER PROTECTION REGULATION',
      intro: 'If we get something wrong, we want the complaint. It is logged, tracked and answered in writing, and you can take it further if our answer does not satisfy you.',
      blocks: [
        { h: 'How to complain', ps: ['Use whichever is easiest. All four routes reach the same team and the same register.'], bullets: ['In the app: Settings, then Help, then Report a problem — fastest, because it attaches the transaction', 'Email: complaints@mysavvybee.com', 'Phone: +234 813 506 8614, Monday to Friday, 8am to 6pm WAT', 'Letter: The Complaints Officer, Savvy Bee Ltd, A311 Garki Mall, Damaturu Street, Garki II, Abuja'] },
        { h: 'What to tell us', ps: ['We can move faster with all of this, but a complaint is never rejected for missing detail — we will come back and ask.'], bullets: ['Your name and the phone number or email on the account', 'What happened and when', 'The amount and transaction reference, if money is involved', 'What you would like us to do to put it right'] },
        { h: 'What we do, and by when', rows: [
          { a: 'We acknowledge your complaint with a tracking reference', b: 'Within 3 business days' },
          { a: 'We resolve it and write to you with the outcome', b: 'Within 14 days' },
          { a: 'A complaint needing a third party (bank, exchange, processor)', b: 'Up to 30 days', note: 'We tell you at the 14-day mark why it is taking longer and what we are waiting on' },
          { a: 'A failed transaction or unauthorised debit', b: 'Reversal per CBN timelines', note: 'Where the funds sit with a partner, we chase it and keep you updated' }
        ] },
        { h: 'If our answer does not satisfy you', ps: ['Ask for a second-level review within 30 days of our decision. A different, more senior reviewer who was not involved the first time looks at the file again and responds within 14 days. Ask for the complaint file at any point and we will send you what we hold.'] },
        { h: 'Taking it outside Savvy Bee', ps: ['You can escalate to the relevant regulator if we have not resolved your complaint within two weeks of you raising it, or if you are unhappy with the outcome. Escalating costs you nothing and does not affect your account.'], bullets: ['Banking, payments and transfers: Director, Consumer Protection Department, Central Bank of Nigeria, Central Business District, Abuja — cpd@cbn.gov.ng', 'Investments and securities: Securities and Exchange Commission, Nigeria — complaints through the SEC Complaints Management Framework', 'Personal data: Nigeria Data Protection Commission', 'Consumer matters generally: Federal Competition and Consumer Protection Commission'] },
        { h: 'What we do with what you tell us', ps: ['Every complaint is logged in a register with its cause, its outcome and how long it took, reported to our board quarterly and to our regulators as required. Where a complaint points at something structural, the fix goes on the product roadmap and we tell you when it ships.'] }
      ]
    }
  ];

  var doc = 0;
  var tabsEl = document.querySelector('[data-legal-tabs]');
  var titleEl = document.querySelector('[data-legal-title]');
  var metaEl = document.querySelector('[data-legal-meta]');
  var introEl = document.querySelector('[data-legal-intro]');
  var indexEl = document.querySelector('[data-legal-index]');
  var blocksEl = document.querySelector('[data-legal-blocks]');
  var nextLabelEl = document.querySelector('[data-legal-next-label]');
  var nextHintEl = document.querySelector('[data-legal-next-hint]');
  var nextEl = document.querySelector('[data-legal-next]');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function pad(n) { return String(n + 1).padStart(2, '0'); }

  function render() {
    var d = DOCS[doc] || DOCS[0];
    var next = DOCS[(doc + 1) % DOCS.length];
    tabsEl.innerHTML = DOCS.map(function (x, i) {
      var on = i === doc;
      return '<a href="#' + x.id + '" data-tab="' + i + '" style="display:flex;flex-direction:column;gap:7px;padding:18px 0 17px;border-top:2px solid ' + (on ? AMBER : '#E8E5DE') + ';margin-top:-0.5px;cursor:pointer">' +
        '<span style="font-family:\'JetBrains Mono\',monospace;font-size:9.5px;letter-spacing:0.07em;color:#9C9A95">' + x.n + '</span>' +
        '<span style="font-size:15px;font-weight:500;letter-spacing:-0.01em;color:' + (on ? '#1C1917' : '#9C9A95') + ';transition:color .25s">' + esc(x.label) + '</span>' +
        '<span style="font-size:12.5px;line-height:1.5;color:#9C9A95;max-width:200px;text-wrap:pretty">' + esc(x.hint) + '</span>' +
      '</a>';
    }).join('');
    titleEl.textContent = d.title;
    metaEl.textContent = d.meta;
    introEl.textContent = d.intro;
    indexEl.innerHTML = d.blocks.map(function (b, i) {
      return '<div style="display:flex;gap:11px;align-items:baseline;padding:9px 0;border-top:0.5px solid #E8E5DE">' +
        '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;color:#9C9A95;flex:none">' + pad(i) + '</span>' +
        '<span style="font-size:12.5px;line-height:1.45;color:#6B6860;text-wrap:pretty">' + esc(b.h) + '</span>' +
      '</div>';
    }).join('');
    blocksEl.innerHTML = d.blocks.map(function (b, i) {
      var inner = (b.ps || []).map(function (p) {
        return '<p style="font-size:14px;line-height:1.7;color:#6B6860;margin:13px 0 0;text-wrap:pretty">' + esc(p) + '</p>';
      }).join('');
      if (b.bullets && b.bullets.length) {
        inner += '<div style="display:grid;gap:0;margin-top:14px">' +
          b.bullets.map(function (l) {
            return '<div style="display:flex;gap:12px;align-items:baseline;padding:10px 0;border-top:0.5px solid #E8E5DE">' +
              '<span style="width:5px;height:5px;border-radius:50%;background:#D8D4CC;flex:none;transform:translateY(-3px)"></span>' +
              '<span style="font-size:13.5px;line-height:1.6;color:#1C1917;text-wrap:pretty">' + esc(l) + '</span>' +
            '</div>';
          }).join('') + '</div>';
      }
      if (b.rows && b.rows.length) {
        inner += '<div style="border-radius:12px;border:0.5px solid #E8E5DE;background:#fff;margin-top:16px;overflow:hidden">' +
          b.rows.map(function (r, j) {
            return '<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:baseline;padding:14px 17px;border-top:' + (j === 0 ? '0' : '0.5px solid #E8E5DE') + '">' +
              '<div style="flex:1;min-width:150px">' +
                '<div style="font-size:13.5px;color:#1C1917">' + esc(r.a) + '</div>' +
                (r.note ? '<div style="font-size:12px;line-height:1.5;color:#9C9A95;margin-top:4px;text-wrap:pretty">' + esc(r.note) + '</div>' : '') +
              '</div>' +
              '<div style="font-family:\'JetBrains Mono\',monospace;font-size:13px;color:' + (r.accent ? AMBER : '#1C1917') + ';text-align:right;min-width:110px">' + esc(r.b) + '</div>' +
            '</div>';
          }).join('') + '</div>';
      }
      return '<div style="padding:26px 0 0;max-width:680px">' +
        '<div style="display:flex;gap:14px;align-items:baseline;border-top:0.5px solid #E8E5DE;padding-top:20px">' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:0.06em;color:#B8860B;flex:none;width:22px">' + pad(i) + '</span>' +
          '<h3 style="font-size:clamp(16px,1.9vw,19px);font-weight:500;letter-spacing:-0.015em;margin:0;text-wrap:balance">' + esc(b.h) + '</h3>' +
        '</div>' +
        '<div style="padding-left:36px">' + inner + '</div>' +
      '</div>';
    }).join('');
    nextLabelEl.textContent = 'Next: ' + next.label;
    nextHintEl.textContent = next.hint;
    nextEl.setAttribute('href', '#' + next.id);
  }

  function go(i) {
    doc = i;
    render();
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) {}
  }

  function pickFromHash() {
    var h = (window.location.hash || '').replace('#', '');
    for (var i = 0; i < DOCS.length; i++) {
      if (DOCS[i].id === h && i !== doc) { go(i); return; }
    }
  }

  tabsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]');
    if (t) go(Number(t.getAttribute('data-tab')));
  });
  nextEl.addEventListener('click', function () { go((doc + 1) % DOCS.length); });
  window.addEventListener('hashchange', pickFromHash);

  render();
  pickFromHash();
})();
