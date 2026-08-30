/** QTSC Experience Polish v1
    Lightweight, non-destructive augmentation of inner pages:
    - Adds a 5-cell intent rail under the hero (Hick's Law)
    - Adds a journey pill above hero h1 (recognition over recall)
    - Adds trust meta strip after H1 if data-trust attribute present
    - Injects audience tabs for pages that opt in via data-audience-tabs
    - Wires scroll-revealed motion with reduced-motion support
    No page template is mutated; markup is appended to opt-in hooks.
*/
(() => {
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];

  const RAIL = [
    {n:'01',t:'Tìm văn phòng',u:'office.html'},
    {n:'02',t:'Đầu tư tại QTSC',u:'investment.html'},
    {n:'03',t:'Tìm giải pháp',u:'marketplace.html'},
    {n:'04',t:'Tìm doanh nghiệp',u:'companies.html'},
    {n:'05',t:'Khám phá campus',u:'explore.html'}
  ];

  function injectRail(){
    if($('.qtsc-intent-rail'))return;
    const hero = $('.inner-hero') || $('section.home-hero');
    if(!hero)return;
    const rail = document.createElement('section');
    rail.className = 'qtsc-intent-rail';
    rail.setAttribute('aria-label','Lối tắt theo nhu cầu');
    rail.innerHTML = `
      <div class="rail-shell">
        <div class="rail-head">
          <p class="micro-label">Tôi muốn</p>
          <small>Đi thẳng đến nội dung phù hợp</small>
        </div>
        <nav class="rail-track" aria-label="Mục tiêu nhanh">
          ${RAIL.map(r => `<a class="rail-link" href="${r.u}"><b>${r.n}</b><strong>${r.t}</strong></a>`).join('')}
        </nav>
      </div>`;
    hero.insertAdjacentElement('afterend', rail);
  }

  function injectJourneyPill(){
    const pill = document.querySelector('[data-journey-pill]');
    if(!pill)return;
    const stage = pill.getAttribute('data-journey-pill');
    const target = $('.inner-hero h1, .inner-hero-grid h1, .home-hero h1');
    if(!target)return;
    const el = document.createElement('p');
    el.className = 'qtsc-journey-pill';
    el.innerHTML = `<i aria-hidden="true"></i>${stage}`;
    target.insertAdjacentElement('beforebegin', el);
  }

  function injectTrustMeta(){
    const meta = document.querySelector('[data-trust]');
    if(!meta)return;
    const source = meta.getAttribute('data-trust-source') || 'QTSC · 2026';
    const link = meta.getAttribute('data-trust-link');
    const target = meta.closest('.inner-hero, .inner-section, .proof-section, .section-intro') || document.body;
    const h = target.querySelector('h1, h2');
    if(!h)return;
    const el = document.createElement('p');
    el.className = 'qtsc-trust-meta';
    el.innerHTML = `<b>Nguồn</b><span>${source}</span>${link ? `<i></i><a href="${link}" rel="noopener">Xem nguồn ↗</a>` : ''}`;
    h.insertAdjacentElement('afterend', el);
  }

  function injectAudienceTabs(){
    const tabs = document.querySelector('[data-audience-tabs]');
    if(!tabs)return;
    const groups = (tabs.getAttribute('data-audience-tabs') || '').split('|').filter(Boolean);
    if(!groups.length)return;
    const wrap = document.createElement('div');
    wrap.className = 'qtsc-audience-tabs';
    wrap.setAttribute('role','tablist');
    wrap.innerHTML = groups.map((g, i) =>
      `<button type="button" role="tab" aria-pressed="${i === 0 ? 'true' : 'false'}">${g}</button>`
    ).join('');
    tabs.appendChild(wrap);
  }

  function applyReveal(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      $$('.reveal').forEach(el => el.classList.add('in'));
      return;
    }
    if(!('IntersectionObserver' in window)){
      $$('.reveal').forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -8% 0px'});
    $$('.reveal').forEach(el => io.observe(el));
  }

  function ensurePolishStylesheet(){
    if(document.querySelector('link[data-qtsc-polish]'))return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/experience-polish.css';
    link.dataset.qtscPolish = 'true';
    document.head.appendChild(link);
  }

  function init(){
    ensurePolishStylesheet();
    injectRail();
    injectJourneyPill();
    injectTrustMeta();
    injectAudienceTabs();
    applyReveal();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
