/* Northbank site shell: toast, mobile menu, site search and the "Get in touch" drawer.
 * Header and footer markup come from partials/ (see scripts/build-shell.cjs); this file only adds behaviour.
 * Exposes window.QTSC = { $, $$, toast, openSearch, openContact, openMobileMenu }. */
(() => {
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const searchItems = [
    ['Space', 'Find office and lab space', 'office.html', 'office lab desk rent lease floor available unit'],
    ['Space', 'Amenities', 'amenities.html', 'food canteen gym clinic parking bank childcare'],
    ['Space', 'Campus map', 'explore.html', 'map buildings atlas beacon cobalt delta echo forge grove jetty'],
    ['Space', 'Other locations', 'locations.html', 'locations sites network campus'],
    ['Infrastructure', 'Services for members', 'services.html', 'services one-stop licence support facilities'],
    ['Infrastructure', 'Cobalt data center', 'technology-detail.html', 'data center colocation rack cloud power cooling'],
    ['Infrastructure', 'Connectivity', 'telecom.html', 'fibre internet network telecom 5g'],
    ['Infrastructure', 'Security operations center', 'digitech-center.html', 'security soc monitoring cyber'],
    ['Companies', 'Company directory', 'companies.html', 'companies members directory tenants'],
    ['Companies', 'Solutions from members', 'marketplace.html', 'solutions products services marketplace ai cloud security erp'],
    ['Invest', 'Invest at Northbank', 'investment.html', 'invest investment enquiry foreign'],
    ['Invest', 'Incentives and eligibility checker', 'incentives.html', 'incentives tax duty checker eligibility'],
    ['Invest', 'Forge startup center', 'innovation-centers.html', 'forge startups innovation cohort demo day'],
    ['News', 'News and events', 'insights.html', 'news events articles updates'],
    ['News', 'Press room', 'media-center.html', 'press media logos photos'],
    ['News', 'Awards', 'awards.html', 'awards prizes'],
    ['News', 'Community', 'community.html', 'community clubs meetups'],
    ['News', 'Newsletter', 'newsletter.html', 'newsletter email subscribe'],
    ['Careers', 'Jobs at member companies', 'careers.html', 'jobs careers hiring vacancies apply'],
    ['Resources', 'Downloads', 'resources.html', 'downloads documents guides forms'],
    ['Resources', 'Open environmental data', 'open-data.html', 'open data water air environment csv'],
    ['Northbank', 'About Northbank', 'about.html', 'about history team mission'],
    ['Northbank', 'Contact and visits', 'contact.html', 'contact visit tour email phone'],
  ].map(([type, title, url, keywords]) => ({ type, title, url, keywords }));

  /* ---------------------------------------------------------------- toast */
  let toastTimer;
  function toast(message) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.append(el); }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  /* ------------------------------------------------------- dialog helpers */
  const lock = (on) => document.body.classList.toggle('is-locked', on);
  const focusables = (root) => $$('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])', root).filter((el) => !el.hidden && el.offsetParent !== null);
  function trap(event, root) {
    if (event.key !== 'Tab') return;
    const items = focusables(root); if (!items.length) return;
    const first = items[0]; const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  function open(el, focusSelector) {
    el._returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); lock(true);
    setTimeout(() => ($(focusSelector, el) || focusables(el)[0])?.focus(), 30);
  }
  function close(el) {
    if (!el || !el.classList.contains('open')) return;
    el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); lock(false);
    if (el._returnFocus && document.contains(el._returnFocus)) el._returnFocus.focus();
  }
  function wire(el, onClose) {
    el.addEventListener('keydown', (event) => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } trap(event, el); });
    $$('[data-close]', el).forEach((b) => b.addEventListener('click', onClose));
  }

  /* ---------------------------------------------------------- mobile menu */
  function ensureMobileMenu() {
    let menu = $('#mobileMenu');
    if (menu) return menu;
    menu = document.createElement('div');
    menu.className = 'mobile-menu'; menu.id = 'mobileMenu';
    menu.setAttribute('role', 'dialog'); menu.setAttribute('aria-modal', 'true'); menu.setAttribute('aria-label', 'Menu'); menu.setAttribute('aria-hidden', 'true');
    const links = $$('.main-nav a').map((a) => `<a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${esc(a.textContent)}</a>`).join('');
    menu.innerHTML = `<div class="mobile-menu-head"><a class="brand" href="index.html">${$('.site-header .brand')?.innerHTML || 'Northbank'}</a><button class="icon-btn" type="button" data-close aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <nav aria-label="Main">${links}<a href="contact.html">Contact</a></nav>
      <div class="page-actions"><a class="btn btn-primary" href="contact.html?topic=visit">Book a visit</a></div>`;
    document.body.append(menu);
    wire(menu, closeMobileMenu);
    return menu;
  }
  function openMobileMenu() { const m = ensureMobileMenu(); open(m, 'nav a'); $('#mobileMenuOpen')?.setAttribute('aria-expanded', 'true'); }
  function closeMobileMenu() { close($('#mobileMenu')); $('#mobileMenuOpen')?.setAttribute('aria-expanded', 'false'); }

  /* --------------------------------------------------------------- search */
  function ensureSearch() {
    let el = $('#searchOverlay');
    if (el) return el;
    el = document.createElement('div');
    el.className = 'overlay'; el.id = 'searchOverlay'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<div class="overlay-backdrop" data-close></div><div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="searchTitle"><div class="container">
      <div class="drawer-head"><h2 id="searchTitle">Search Northbank</h2><button class="icon-btn" type="button" data-close aria-label="Close search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <label class="search-bar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><span class="sr-only">Search pages</span><input id="globalSearchInput" type="search" autocomplete="off" placeholder="Space, data center, jobs…"></label>
      <ul class="search-results" id="globalSearchResults"></ul></div></div>`;
    document.body.append(el);
    const input = $('#globalSearchInput', el);
    const results = $('#globalSearchResults', el);
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      const list = q ? searchItems.filter((i) => `${i.title} ${i.type} ${i.keywords}`.toLowerCase().includes(q)) : searchItems.slice(0, 8);
      results.innerHTML = list.length ? list.map((i) => `<li><a href="${i.url}"><span>${esc(i.type)}</span><strong>${esc(i.title)}</strong></a></li>`).join('') : `<li class="state-panel" role="status"><strong>No page matches “${esc(input.value.trim())}”.</strong></li>`;
    };
    input.addEventListener('input', draw);
    draw();
    wire(el, () => close(el));
    return el;
  }
  function openSearch() { open(ensureSearch(), '#globalSearchInput'); }

  /* -------------------------------------------------------- contact drawer */
  function ensureContact() {
    let el = $('#connectOverlay');
    if (el) return el;
    el = document.createElement('div');
    el.className = 'overlay'; el.id = 'connectOverlay'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<div class="overlay-backdrop" data-close></div><section class="drawer" role="dialog" aria-modal="true" aria-labelledby="connectTitle">
      <div class="drawer-head"><h2 id="connectTitle">Get in touch</h2><button class="icon-btn" type="button" data-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <form class="proto-form" id="innerConnectForm" novalidate>
        <div class="form-field"><label for="icf-need">About</label><input id="icf-need" name="need" type="text" required></div>
        <div class="form-field"><label for="icf-name">Your name</label><input id="icf-name" name="name" type="text" autocomplete="name" required></div>
        <div class="form-field"><label for="icf-email">Work email</label><input id="icf-email" name="email" type="email" autocomplete="email" required></div>
        <div class="form-field"><label for="icf-message">Message (optional)</label><textarea id="icf-message" name="message" rows="4"></textarea></div>
        <div class="form-consent"><label><input type="checkbox" name="consent" required data-required="Please agree so we can reply.">Northbank may use these details to reply to me.</label></div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Send</button></div>
      </form>
      <div id="innerFormSuccess" hidden></div>
    </section>`;
    document.body.append(el);
    const form = $('#innerConnectForm', el);
    const success = $('#innerFormSuccess', el);
    const ui = window.QTSCUI; const store = window.QTSCStore;
    ui?.bindForm(form, {
      submit: (values) => store.request(() => store.add('contacts', { source: 'drawer', topic: 'general', need: values.need, name: values.name, email: values.email, message: values.message || '', status: 'received' }, 'CT')),
      success: (record) => {
        form.hidden = true;
        success.hidden = false;
        success.replaceChildren(ui.successPanel({ title: 'Thanks, we will reply by email.', reference: record.id, lines: [`About: ${record.need}`], actions: [{ label: 'Close', onClick: () => close(el) }] }));
        success.firstElementChild?.focus();
      },
    });
    wire(el, () => close(el));
    return el;
  }
  function openContact(need = 'General question') {
    const el = ensureContact();
    $('#icf-need', el).value = need;
    $('#innerConnectForm', el).hidden = false;
    $('#innerFormSuccess', el).hidden = true;
    open(el, '#icf-name');
  }

  function init() {
    $('#mobileMenuOpen')?.addEventListener('click', openMobileMenu);
    $('#searchOpen')?.addEventListener('click', openSearch);
    $$('[data-open-connect]').forEach((b) => b.addEventListener('click', (event) => { event.preventDefault(); openContact(b.dataset.openConnect || b.dataset.need || 'General question'); }));
    /* Escape closes whichever overlay is open, wherever focus is. */
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if ($('#mobileMenu.open')) { closeMobileMenu(); return; }
      const overlay = $('.overlay.open');
      if (overlay) close(overlay);
    });
    document.addEventListener('keydown', (event) => { if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) { event.preventDefault(); openSearch(); } });
    window.matchMedia('(min-width: 901px)').addEventListener('change', (m) => { if (m.matches) closeMobileMenu(); });
  }
  window.QTSC = { $, $$, toast, openSearch, openContact, openMobileMenu };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
