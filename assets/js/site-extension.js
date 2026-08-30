(() => {
  const primaryNavigation = [
    ['Về QTSC','about.html'],
    ['Hạ tầng & Dịch vụ','services.html'],
    ['Doanh nghiệp & Giải pháp','companies.html'],
    ['Đầu tư & Hợp tác','investment.html'],
    ['Tin tức & Sự kiện','insights.html'],
    ['Tài nguyên','resources.html']
  ];
  const routeSections = {
    about: 0,
    services: 1, office: 1, 'technology-detail': 1, telecom: 1, amenities: 1,
    companies: 2, 'company-detail': 2, marketplace: 2, chain: 2,
    'innovation-centers': 2, awards: 2, 'digitech-center': 2,
    investment: 3, incentives: 3, community: 3,
    insights: 4, 'media-center': 4, newsletter: 4, careers: 4,
    resources: 5, 'open-data': 5, explore: 5, contact: 5,
    legal: 5, privacy: 5, sitemap: 5
  };
  document.querySelectorAll('.desktop-nav').forEach(nav => {
    const links = [...nav.querySelectorAll('.nav-link')];
    if (links.length !== primaryNavigation.length) return;
    links.forEach((link,index) => {
      link.textContent = primaryNavigation[index][0];
      link.href = primaryNavigation[index][1];
      link.removeAttribute('aria-current');
    });
    const currentIndex = routeSections[document.body.dataset.page];
    if (Number.isInteger(currentIndex)) links[currentIndex]?.setAttribute('aria-current','page');
  });

  document.querySelectorAll('.lang-action').forEach(link => {
    link.href = 'https://www.qtsc.com.vn/en';
    link.textContent = 'EN';
    link.setAttribute('aria-label','English version');
  });

  document.querySelectorAll('img').forEach(image => {
    if (!image.hasAttribute('decoding')) image.decoding = 'async';
    if (image.closest('main') && !image.hasAttribute('loading') && image.getAttribute('fetchpriority') !== 'high') image.loading = 'lazy';
    if (image.closest('.site-footer') && !image.hasAttribute('loading')) image.loading = 'lazy';
  });

  const linkMap = {
    'QTSC DigiTech Center': 'digitech-center.html',
    'Giáo dục & cộng đồng': 'community.html',
    'Thông cáo báo chí': 'media-center.html?type=press',
    'Hình ảnh & video': 'media-center.html',
    'Văn bản pháp luật': 'resources.html?cat=legal'
  };
  const extras = {
    ecosystem: [
      ['Cộng đồng QTSC','community.html'],
      ['Agriculture Center of Excellence','innovation-centers.html#agriculture']
    ],
    insights: [
      ['Newsletter','newsletter.html'],
      ['Góc báo chí','media-center.html'],
      ['Dữ liệu mở','open-data.html']
    ]
  };
  const searchExtras = [
    {type:'Ecosystem',title:'Cộng đồng QTSC',meta:'Trường viện · CEO/CTO Club · Foundation · Museum',url:'community.html',keywords:'cộng đồng community trường viện ceo cto quỹ khuyến học bảo tàng'},
    {type:'Technology',title:'QTSC DigiTech Center',meta:'Digital infrastructure · Cybersecurity',url:'digitech-center.html',keywords:'digitech telecom cyber security center hạ tầng số'},
    {type:'Innovation',title:'Agriculture Center of Excellence',meta:'IoT · Cloud · Big Data · Agriculture',url:'innovation-centers.html#agriculture',keywords:'agriculture nông nghiệp iot cloud big data testbed'},
    {type:'Media',title:'Góc báo chí QTSC',meta:'Press release · Coverage · Photo · Video',url:'media-center.html',keywords:'góc báo chí thông cáo báo chí hình ảnh video media press'},
    {type:'Newsletter',title:'QTSC Newsletter',meta:'Bản tin định kỳ · Archive',url:'newsletter.html',keywords:'newsletter bản tin qtsc archive đăng ký nhận tin'},
    {type:'Open Data',title:'Dữ liệu mở QTSC',meta:'Water · Air · Groundwater · Testing',url:'open-data.html',keywords:'dữ liệu mở open data nước thải nước cấp không khí nước ngầm pasteur'}
  ];

  function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script'); s.src = src; s.defer = true; document.body.append(s);
  }
  if (document.body.classList.contains('page-companies')) loadScript('assets/js/data/companies-data.js');
  if (document.body.classList.contains('page-marketplace')) loadScript('assets/js/data/marketplace-data.js');
  if (document.body.classList.contains('page-insights')) loadScript('assets/js/data/insights-data.js');
  if (document.body.classList.contains('page-innovation-centers') || document.body.classList.contains('page-chain') || document.body.classList.contains('page-services')) loadScript('assets/js/data/legacy-detail-extension.js');

  /* Experience polish: opt-in markers (data-journey-pill, data-trust, data-audience-tabs)
     are honoured automatically by experience-polish.js. We always load it so the
     intent rail under the hero is available on every page that already ships with
     `.inner-hero` or `.home-hero`. Skipped on the homepage itself, which already has
     its own top-task dock. */
  if (!document.body.classList.contains('page-home') && !document.body.classList.contains('qtsc-home')) {
    loadScript('assets/js/experience-polish.js');
  }

  function patchMega(root) {
    if (!root || root.dataset.legacyExtended === '1') return;
    root.querySelectorAll('a').forEach(a => {
      const label = a.textContent.replace('↗','').trim();
      if (linkMap[label]) a.href = linkMap[label];
    });
    const feature = root.querySelector('.mega-feature');
    const label = feature?.firstElementChild?.textContent.trim();
    const key = label === 'Hệ sinh thái' || label === 'Doanh nghiệp & Giải pháp' ? 'ecosystem' : label === 'Tin & nguồn lực' || label === 'Tin tức & Sự kiện' ? 'insights' : null;
    if (key && extras[key]) {
      const cols = root.querySelectorAll('.mega-col');
      const target = cols[cols.length - 1];
      extras[key].forEach(([text, href]) => {
        if (!target || [...root.querySelectorAll('a')].some(a => a.textContent.includes(text))) return;
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = `${text}<span>↗</span>`;
        target.append(a);
      });
    }
    root.dataset.legacyExtended = '1';
  }

  function patchSearch() {
    const results = document.getElementById('globalResults');
    const input = document.getElementById('globalSearchInput');
    if (!results || !input) return;
    const q = input.value.trim().toLowerCase();
    const matches = searchExtras.filter(item => !q || `${item.title} ${item.meta} ${item.keywords}`.toLowerCase().includes(q));
    const signature = `${q}|${matches.map(item => item.url).join(',')}`;
    const current = [...results.querySelectorAll('[data-qtsc-extra-search]')];
    if (results.dataset.qtscExtraSignature === signature && current.length === matches.length) return;
    current.forEach(x => x.remove());
    matches.forEach(item => {
      const a = document.createElement('a'); a.className = 'search-result'; a.href = item.url; a.dataset.qtscExtraSearch = '1';
      a.innerHTML = `<span class="type">${item.type}</span><span><strong>${item.title}</strong><small>${item.meta}</small></span><span>↗</span>`;
      results.append(a);
    });
    results.dataset.qtscExtraSignature = signature;
    if (!input.dataset.qtscExtraBound) {
      input.dataset.qtscExtraBound = '1';
      input.addEventListener('input', () => {
        results.dataset.qtscExtraSignature = '';
        requestAnimationFrame(patchSearch);
      });
    }
  }

  const observer = new MutationObserver(() => {
    document.querySelectorAll('#megaContent,.mega-inner').forEach(root => {
      root.removeAttribute('data-legacy-extended');
      patchMega(root);
    });
    patchSearch();
  });
  observer.observe(document.documentElement, {subtree:true, childList:true});
  document.querySelectorAll('#megaContent,.mega-inner').forEach(patchMega);
  patchSearch();

  if (document.body.classList.contains('page-media-center')) {
    const type = new URLSearchParams(location.search).get('type');
    if (type) requestAnimationFrame(() => document.querySelector(`[data-media="${CSS.escape(type)}"]`)?.click());
  }
})();
