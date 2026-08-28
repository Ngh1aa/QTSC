/** QTSC shared helpers for static inner pages. */
(() => {
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const searchItems = [
    { type:'QTSC', title:'Giới thiệu QTSC', meta:'Tầm nhìn · Sứ mệnh · Giá trị cốt lõi', url:'about.html', keywords:'qtsc giới thiệu tầm nhìn sứ mệnh giá trị lịch sử' },
    { type:'Ecosystem', title:'Danh bạ doanh nghiệp', meta:'Member Directory', url:'companies.html', keywords:'doanh nghiệp công ty member software data ai education telecom' },
    { type:'Technology', title:'Technology Marketplace', meta:'Sản phẩm · Dịch vụ · Giải pháp', url:'marketplace.html', keywords:'công nghệ giải pháp sản phẩm ai cloud cybersecurity erp' },
    { type:'Infrastructure', title:'Data Center & hạ tầng số', meta:'Cloud · Security · Innovation', url:'technology-detail.html', keywords:'data center cloud hạ tầng số an toàn thông tin innovation' },
    { type:'Business', title:'Văn phòng & đầu tư', meta:'Office · One-stop support', url:'office.html', keywords:'văn phòng office đầu tư building hỗ trợ doanh nghiệp' },
    { type:'Campus', title:'Khám phá QTSC', meta:'Map · 360 · Bus · Amenities', url:'explore.html', keywords:'campus bản đồ map tour 360 bus tiện ích r&d' },
    { type:'Insights', title:'Tin tức & hoạt động', meta:'News · Events · Careers', url:'insights.html', keywords:'tin tức sự kiện careers tuyển dụng hoạt động' },
    { type:'Resources', title:'Download Center', meta:'Profile · Guide · Map · Policies', url:'resources.html', keywords:'download tài liệu profile guide map chính sách văn bản' }
  ];

  function toast(message) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.append(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function enhanceInlineArrows() {
    $$('a, button').forEach((el) => {
      if (el.querySelector('.ui-arrow-icon')) return;
      const textNode = [...el.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue?.includes('↗'));
      if (!textNode) return;
      textNode.nodeValue = textNode.nodeValue.replace('↗', '').trimEnd() + ' ';
      const icon = document.createElement('span');
      icon.className = 'ui-arrow-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.style.cssText = 'display:inline-block;width:16px;height:16px;margin-left:6px;vertical-align:-3px;background:currentColor;mask:var(--icon-arrow) center/contain no-repeat;-webkit-mask:var(--icon-arrow) center/contain no-repeat';
      el.append(icon);
    });
  }

  function lock(value) { document.body.classList.toggle('is-locked', value); }

  function ensureSearch() {
    if ($('#searchOverlay')) return $('#searchOverlay');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'searchOverlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `<div class="overlay-backdrop" data-close-search></div><section class="search-dialog" role="dialog" aria-modal="true" aria-labelledby="searchTitle"><div class="dialog-top"><p class="micro-label">Global Search</p><button class="close-btn" data-close-search aria-label="Đóng">×</button></div><h2 id="searchTitle">Bạn muốn tìm gì?</h2><label class="global-search-field"><span>⌕</span><input id="globalSearchInput" type="search" placeholder="Doanh nghiệp, công nghệ, địa điểm, tài liệu..." autocomplete="off"><kbd>ESC</kbd></label><div class="global-results" id="globalResults" aria-live="polite"></div></section>`;
    document.body.append(overlay);
    const input = $('#globalSearchInput', overlay);
    const results = $('#globalResults', overlay);
    const render = () => {
      const q = input.value.trim().toLowerCase();
      const items = searchItems.filter(item => !q || `${item.title} ${item.meta} ${item.keywords}`.toLowerCase().includes(q));
      results.innerHTML = items.map(item => `<a class="search-result" href="${item.url}"><span class="type">${item.type}</span><span><strong>${item.title}</strong><small>${item.meta}</small></span><span>↗</span></a>`).join('');
    };
    input.addEventListener('input', render);
    $$('[data-close-search]', overlay).forEach(el => el.addEventListener('click', closeSearch));
    render();
    return overlay;
  }
  function openSearch() { const el = ensureSearch(); el.classList.add('open'); el.setAttribute('aria-hidden','false'); lock(true); setTimeout(() => $('#globalSearchInput',el)?.focus(), 20); }
  function closeSearch() { const el = $('#searchOverlay'); if (!el) return; el.classList.remove('open'); el.setAttribute('aria-hidden','true'); lock(false); }

  function ensureContact() {
    if ($('#connectOverlay')) return $('#connectOverlay');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'connectOverlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML = `<div class="overlay-backdrop" data-close-connect></div><section class="connect-drawer" role="dialog" aria-modal="true" aria-labelledby="connectTitle"><div class="dialog-top"><p class="micro-label">Connect</p><button class="close-btn" data-close-connect aria-label="Đóng">×</button></div><h2 id="connectTitle">Kết nối QTSC</h2><p class="drawer-lead">Gửi thông tin nhu cầu để bắt đầu kết nối với QTSC.</p><form class="connect-form" id="innerConnectForm"><label class="form-field"><span>Họ và tên</span><input name="name" required autocomplete="name"></label><label class="form-field"><span>Email</span><input name="email" type="email" required autocomplete="email"></label><label class="form-field"><span>Điện thoại</span><input name="phone" autocomplete="tel"></label><label class="form-field"><span>Nhu cầu</span><input name="need" id="innerContactNeed" value="Liên hệ QTSC"></label><label class="form-field"><span>Nội dung</span><textarea name="message" placeholder="Mô tả ngắn nhu cầu của bạn"></textarea></label><label class="form-consent"><input type="checkbox" required><span>Tôi đồng ý cung cấp thông tin để QTSC liên hệ hỗ trợ.</span></label><div class="form-actions"><button class="btn btn-brand" type="submit">Gửi yêu cầu <span>↗</span></button></div></form><div class="form-success" id="innerFormSuccess" hidden><i>✓</i><strong>Yêu cầu đã được ghi nhận.</strong><p>Cảm ơn bạn đã kết nối với QTSC.</p><button class="btn btn-brand" data-close-connect>Đóng</button></div></section>`;
    document.body.append(overlay);
    $$('[data-close-connect]', overlay).forEach(el => el.addEventListener('click', closeContact));
    $('#innerConnectForm', overlay).addEventListener('submit', event => {
      event.preventDefault();
      $('#innerConnectForm', overlay).hidden = true;
      $('#innerFormSuccess', overlay).hidden = false;
    });
    return overlay;
  }
  function openContact(need='Liên hệ QTSC') { const el = ensureContact(); const field = $('#innerContactNeed',el); if(field) field.value = need; $('#innerConnectForm',el).hidden=false; $('#innerFormSuccess',el).hidden=true; el.classList.add('open'); el.setAttribute('aria-hidden','false'); lock(true); }
  function closeContact() { const el=$('#connectOverlay'); if(!el) return; el.classList.remove('open'); el.setAttribute('aria-hidden','true'); lock(false); }

  function ensureMobileMenu() {
    if ($('#innerMobileMenu')) return $('#innerMobileMenu');
    const menu = document.createElement('div');
    menu.className='mobile-menu'; menu.id='innerMobileMenu'; menu.setAttribute('aria-hidden','true');
    menu.innerHTML=`<div class="mobile-menu-head"><div class="brand-fallback" style="display:flex"><strong>QTSC</strong><small>Quality Tech Solution Complex</small></div><button class="close-btn" id="innerMobileClose" aria-label="Đóng menu">×</button></div><nav class="mobile-menu-content" aria-label="Điều hướng mobile"><div class="mobile-acc open"><button type="button">Khám phá QTSC <span>−</span></button><div class="mobile-acc-panel"><a href="about.html">Giới thiệu</a><a href="companies.html">Hệ sinh thái doanh nghiệp</a><a href="marketplace.html">Technology Marketplace</a><a href="office.html">Văn phòng & đầu tư</a><a href="explore.html">Campus</a><a href="insights.html">Tin & nguồn lực</a><a href="resources.html">Download Center</a></div></div></nav><div class="mobile-menu-foot"><button class="btn btn-brand" id="innerMobileConnect">Kết nối QTSC <span>↗</span></button><a class="btn" href="sitemap.html">Sitemap</a></div>`;
    document.body.append(menu);
    $('#innerMobileClose',menu).addEventListener('click',closeMobileMenu);
    $('#innerMobileConnect',menu).addEventListener('click',()=>{closeMobileMenu();openContact();});
    return menu;
  }
  function openMobileMenu(){ const menu=ensureMobileMenu(); menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); $('#mobileMenuOpen')?.setAttribute('aria-expanded','true'); lock(true); }
  function closeMobileMenu(){ const menu=$('#innerMobileMenu'); if(!menu)return; menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); $('#mobileMenuOpen')?.setAttribute('aria-expanded','false'); lock(false); }

  function initShell() {
    enhanceInlineArrows();
    $('#mobileMenuOpen')?.addEventListener('click', openMobileMenu);
    $('#searchOpen')?.addEventListener('click', openSearch);
    $$('[data-demo-contact]').forEach(button => button.addEventListener('click', () => {
      const page = document.body.dataset.page || '';
      const need = page === 'office' ? 'Văn phòng / đặt lịch tham quan' : page === 'technology-detail' ? 'Tư vấn công nghệ' : page === 'company-detail' ? 'Kết nối doanh nghiệp' : 'Liên hệ QTSC';
      openContact(need);
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeSearch(); closeContact(); closeMobileMenu(); }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
    });
  }

  window.QTSC = { $, $$, toast, initShell, enhanceInlineArrows, openSearch, openContact, openMobileMenu };
  document.addEventListener('DOMContentLoaded', initShell);
})();