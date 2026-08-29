/** Company detail: route by URL hash, then expose keyboard activation for entity cards. */
(() => {
  const dataset = {
    hitachi: {
      title: 'Hitachi Digital<br>Services Vietnam.',
      name: 'Hitachi Digital Services Vietnam',
      short: 'HitachiDSVN',
      sector: 'Software & Digital',
      country: 'Japan',
      building: 'Helios Building',
      intro: 'Digital services trong một hệ sinh thái công nghệ.',
      lead: 'Hồ sơ doanh nghiệp kết nối thông tin công ty với sản phẩm, dịch vụ, vị trí trong campus và các nội dung liên quan để người dùng đi tiếp theo nhu cầu.',
      meta: ['Software · ERP · Digital Transformation', 'hitachids.com', '(84-28) 5437 1199']
    },
    tma: {
      title: 'TMA Solutions.',
      name: 'TMA Solutions',
      short: 'TMA',
      sector: 'Software & Digital',
      country: 'Vietnam',
      building: 'QTSC Campus',
      intro: 'Phần mềm, R&D và giải pháp doanh nghiệp.',
      lead: 'TMA hiện diện trong QTSC với các hoạt động phát triển phần mềm, R&D và cung cấp giải pháp cho doanh nghiệp toàn cầu.',
      meta: ['Software · Outsourcing · R&D', 'tmasolutions.com', '(84-28) 3547 1099']
    },
    'digi-texx': {
      title: 'DIGI-TEXX Vietnam.',
      name: 'DIGI-TEXX Vietnam',
      short: 'DIGI-TEXX',
      sector: 'Data & AI',
      country: 'Vietnam · USA',
      building: 'QTSC Campus',
      intro: 'Số hóa tài liệu, xử lý dữ liệu và AI.',
      lead: 'DIGI-TEXX hoạt động trong lĩnh vực số hóa, xử lý dữ liệu lớn và các giải pháp AI phục vụ doanh nghiệp trong nhiều ngành.',
      meta: ['Data · AI · Document Processing', 'digi-texx.com', '(84-28) 3526 7288']
    },
    amit: {
      title: 'AMIT Group.',
      name: 'AMIT Group',
      short: 'AMIT',
      sector: 'Digital Transformation',
      country: 'Vietnam · Asia',
      building: 'QTSC Campus',
      intro: 'Chuyển đổi số và giải pháp IoT/AI.',
      lead: 'AMIT Group tập trung vào chuyển đổi số, tích hợp hệ thống và các giải pháp IoT/AI cho doanh nghiệp tại Việt Nam và khu vực.',
      meta: ['IoT · AI · System Integration', 'amitgroup.com.vn', '(84-28) 3728 0999']
    },
    'hoa-sen': {
      title: 'Hoa Sen University.',
      name: 'Hoa Sen University',
      short: 'HSU',
      sector: 'Education',
      country: 'Vietnam',
      building: 'QTSC Campus',
      intro: 'Đào tạo công nghệ và nguồn nhân lực số.',
      lead: 'Đại học Hoa Sen hiện diện tại QTSC với các chương trình đào tạo công nghệ, thiết kế số và cung ứng nguồn nhân lực cho hệ sinh thái.',
      meta: ['Higher Education · Technology · Design', 'hoasen.edu.vn', '(84-28) 3722 0909']
    },
    viettel: {
      title: 'Viettel HCMC.',
      name: 'Viettel HCMC',
      short: 'Viettel',
      sector: 'Telecom',
      country: 'Vietnam',
      building: 'JVPE Building',
      intro: 'Viễn thông và hạ tầng kết nối.',
      lead: 'Viettel hiện diện tại QTSC với các hoạt động viễn thông, kết nối Internet và phát triển hạ tầng số phục vụ doanh nghiệp.',
      meta: ['Telecom · Connectivity · Network', 'viettel.com.vn', '(84-28) 6255 6789']
    }
  };

  const root = document.body;
  if (!root.classList.contains('page-company-detail')) return;

  const hash = (location.hash || '').replace('#', '').toLowerCase();
  const params = new URLSearchParams(location.search);
  const key = (hash || params.get('id') || '').toLowerCase();
  const data = dataset[key];
  if (!data) return;

  const titleEl = document.querySelector('.detail-title');
  if (titleEl) titleEl.innerHTML = data.title;
  const introEl = document.querySelector('.detail-intro-title');
  if (introEl) introEl.textContent = data.intro;
  const leadEl = document.querySelector('.detail-intro-copy');
  if (leadEl) leadEl.textContent = data.lead;

  document.title = `${data.name} — QTSC`;
  const meta = document.querySelector('meta[property="og:title"]');
  if (meta) meta.setAttribute('content', `${data.name} — QTSC`);
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', `Hồ sơ ${data.name} trong hệ sinh thái QTSC: lĩnh vực, sản phẩm, giải pháp và vị trí trong campus.`);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://ngh1aa.github.io/QTSC/company-detail.html#${key}`);

  const breadcrumbLast = document.querySelector('.breadcrumb span:last-child');
  if (breadcrumbLast) breadcrumbLast.textContent = data.name;

  const metaSpans = document.querySelectorAll('.detail-meta span');
  if (metaSpans[0]) metaSpans[0].textContent = data.sector;
  if (metaSpans[1]) metaSpans[1].textContent = data.country;
  if (metaSpans[2]) metaSpans[2].textContent = data.building;

  const dl = document.querySelector('.detail-sidebar dl');
  if (dl) {
    const entries = [
      ['Tên viết tắt', data.short],
      ['Địa điểm', `${data.building}, QTSC`],
      ['Lĩnh vực', data.meta[0]],
      ['Website', data.meta[1]],
      ['Điện thoại', data.meta[2]]
    ];
    dl.innerHTML = entries.map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join('');
  }
})();

/** Keyboard activation for entity cards. */
const { $$ } = window.QTSC;
$$('.entity-card').forEach(card => card.addEventListener('keydown', event => {
  if (event.key === 'Enter' && card.href) location.href = card.href;
}));
