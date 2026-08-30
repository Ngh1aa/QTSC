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
      meta: ['Software · ERP · Digital Transformation', 'hitachids.com', '(84-28) 5437 1199'],
      products: [
        { code: 'ES', title: 'Embedded System Services', desc: 'Software Development', category: 'Technology Offering' },
        { code: 'DX', title: 'Digital Transformation', desc: 'Enterprise Solutions', category: 'Technology Offering' }
      ]
    },
    tma: {
      title: 'TMA Solutions.',
      name: 'TMA Solutions',
      short: 'TMA',
      sector: 'Software & Digital',
      country: 'Vietnam',
      building: 'QTSC Campus',
      intro: 'Phần mềm, R&D và giải pháp doanh nghiệp.',
      lead: 'TMA hiện diện trong QTSC với các hoạt động phát triển phần mềm, R&D và cung cấp giải pháp cho doanh nghiệp toàn cầu với hơn 4000 kỹ sư.',
      meta: ['Software · Outsourcing · R&D', 'tmasolutions.com', '(84-28) 3547 1099'],
      products: [
        { code: 'ML', title: 'Machine Learning Pipeline', desc: 'AI & Analytics Lab', category: 'Technology Offering' },
        { code: 'SD', title: 'Software Engineering', desc: 'Enterprise & Telecom Software', category: 'Technology Offering' }
      ]
    },
    'digi-texx': {
      title: 'DIGI-TEXX Vietnam.',
      name: 'DIGI-TEXX Vietnam',
      short: 'DIGI-TEXX',
      sector: 'Data & AI',
      country: 'Vietnam · Germany',
      building: 'QTSC Campus',
      intro: 'Số hóa tài liệu, xử lý dữ liệu và AI.',
      lead: 'DIGI-TEXX hoạt động trong lĩnh vực số hóa, xử lý dữ liệu lớn và các giải pháp AI phục vụ doanh nghiệp trong nhiều ngành tại châu Âu, Mỹ và Việt Nam.',
      meta: ['Data · AI · Document Processing', 'digi-texx.com', '(84-28) 3526 7288'],
      products: [
        { code: 'AI', title: 'AI Document Processing', desc: 'BPO & Automated Extraction', category: 'Technology Offering' },
        { code: 'DP', title: 'Data Processing & Digitization', desc: 'Big Data Preparation', category: 'Technology Offering' }
      ]
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
      meta: ['IoT · AI · System Integration', 'amitgroup.com.vn', '(84-28) 3728 0999'],
      products: [
        { code: 'BI', title: 'Business Intelligence Suite', desc: 'Data Analytics & Reporting', category: 'Technology Offering' },
        { code: 'IT', title: 'IoT Fleet & Asset Management', desc: 'Industrial IoT Solutions', category: 'Technology Offering' }
      ]
    },
    'hoa-sen': {
      title: 'Hoa Sen University.',
      name: 'Hoa Sen University',
      short: 'HSU',
      sector: 'Education',
      country: 'Vietnam',
      building: 'QTSC Campus',
      intro: 'Đào tạo công nghệ và nguồn nhân lực số.',
      lead: 'Đại học Hoa Sen hiện diện tại QTSC với các chương trình đào tạo công nghệ, thiết kế số và cung ứng nguồn nhân lực chất lượng cao cho hệ sinh thái.',
      meta: ['Higher Education · Technology · Design', 'hoasen.edu.vn', '(84-28) 3722 0909'],
      products: [
        { code: 'CS', title: 'Computer Science & Software', desc: 'Bachelor & Professional Programs', category: 'Education & Training' },
        { code: 'DS', title: 'Digital Arts & Media Design', desc: 'Creative Tech Programs', category: 'Education & Training' }
      ]
    },
    viettel: {
      title: 'Viettel HCMC.',
      name: 'Viettel HCMC',
      short: 'Viettel',
      sector: 'Telecom',
      country: 'Vietnam',
      building: 'JVPE Building',
      intro: 'Viễn thông và hạ tầng kết nối.',
      lead: 'Viettel hiện diện tại QTSC với các hoạt động viễn thông, kết nối cáp quang băng rộng, 5G và phát triển hạ tầng số phục vụ doanh nghiệp.',
      meta: ['Telecom · Connectivity · 5G Network', 'viettel.com.vn', '(84-28) 6255 6789'],
      products: [
        { code: '5G', title: 'Enterprise 5G & Private Network', desc: 'Dedicated Connectivity', category: 'Telecom & Infrastructure' },
        { code: 'MP', title: 'MPLS & Leased Line Services', desc: 'High-speed Enterprise Network', category: 'Telecom & Infrastructure' }
      ]
    },
    fpt: {
      title: 'FPT Software.',
      name: 'FPT Software',
      short: 'FPT Soft',
      sector: 'Software & IT Services',
      country: 'Vietnam · Global',
      building: 'QTSC Campus',
      intro: 'Phần mềm và dịch vụ công nghệ thông tin toàn cầu.',
      lead: 'FPT Software cung cấp giải pháp chuyển đổi số toàn diện, AI, Cloud migration và dịch vụ phát triển phần mềm cho thị trường quốc tế.',
      meta: ['Software Development · Cloud · AI', 'fpt-software.com', '(84-28) 7300 7575'],
      products: [
        { code: 'CM', title: 'Cloud Migration & Modernization', desc: 'AWS, Azure, Google Cloud Consulting', category: 'Technology Offering' },
        { code: 'AI', title: 'Generative AI Solutions', desc: 'Enterprise AI Implementation', category: 'Technology Offering' }
      ]
    },
    kms: {
      title: 'KMS Technology.',
      name: 'KMS Technology',
      short: 'KMS',
      sector: 'Software Engineering',
      country: 'USA · Vietnam',
      building: 'Helios Building',
      intro: 'Kỹ thuật phần mềm và tư vấn sản phẩm kỹ thuật số.',
      lead: 'KMS Technology chuyên về tư vấn sản phẩm số, kiểm thử phần mềm, kỹ thuật dữ liệu và phát triển nền tảng doanh nghiệp.',
      meta: ['Software Engineering · Testing · Consulting', 'kms-technology.com', '(84-28) 3848 6888'],
      products: [
        { code: 'QA', title: 'Software Quality Assurance', desc: 'Automated Testing & Security QA', category: 'Technology Offering' },
        { code: 'PD', title: 'Digital Product Engineering', desc: 'Full-cycle Software Development', category: 'Technology Offering' }
      ]
    },
    'vnpt-it': {
      title: 'VNPT-IT.',
      name: 'VNPT-IT',
      short: 'VNPT-IT',
      sector: 'Telecom & IT Infrastructure',
      country: 'Vietnam',
      building: 'SBI Building',
      intro: 'Công nghệ thông tin và chính phủ số.',
      lead: 'VNPT-IT phát triển hệ sinh thái chính phủ điện tử, smart city, y tế số và hạ tầng đám mây cho các cơ quan và doanh nghiệp lớn.',
      meta: ['E-Government · Smart City · Cloud', 'vnpt.com.vn', '(84-28) 3838 8888'],
      products: [
        { code: 'EG', title: 'E-Government Platforms', desc: 'National & Regional GovTech', category: 'Technology Offering' },
        { code: 'SC', title: 'Smart City Operating Center', desc: 'IOC & Integrated Systems', category: 'Technology Offering' }
      ]
    },
    'saigon-tech': {
      title: 'Saigon Technology.',
      name: 'Saigon Technology',
      short: 'SaigonTech',
      sector: 'Software Development',
      country: 'Vietnam · USA · Australia',
      building: 'QTSC Campus',
      intro: 'Phát triển phần mềm agile cho doanh nghiệp vừa và lớn.',
      lead: 'Saigon Technology là công ty phần mềm Agile hàng đầu chuyên về phát triển Web, Mobile App, Cloud và AI cho khách hàng tại Bắc Mỹ, châu Âu và Úc.',
      meta: ['Agile Software · Web & Mobile · Cloud', 'saigontechnology.com', '(84-28) 3620 4880'],
      products: [
        { code: 'WD', title: 'Custom Web & Mobile Development', desc: 'Enterprise SaaS & Apps', category: 'Technology Offering' },
        { code: 'DO', title: 'DevOps & CI/CD Pipelines', desc: 'Automated Deployment & Cloud', category: 'Technology Offering' }
      ]
    },
    'qtsc-edu': {
      title: 'QTSC Education Center.',
      name: 'QTSC Education Center',
      short: 'QTSC Edu',
      sector: 'Technology Training',
      country: 'Vietnam',
      building: 'QTSC Campus',
      intro: 'Trung tâm đào tạo nguồn nhân lực công nghệ số.',
      lead: 'QTSC Education Center tổ chức các khóa đào tạo nâng cao kỹ năng lập trình, an ninh mạng, kiểm thử và chuyển đổi số cho sinh viên và nhân sự doanh nghiệp.',
      meta: ['Tech Training · Upskilling · Certificates', 'edu.qtsc.com.vn', '(84-28) 3715 8888'],
      products: [
        { code: 'TC', title: 'Cybersecurity Bootcamp', desc: 'Hands-on Security Certification', category: 'Education & Training' },
        { code: 'DS', title: 'Data Science & AI Training', desc: 'Applied Machine Learning Course', category: 'Education & Training' }
      ]
    },
    mobifone: {
      title: 'MobiFone HCMC.',
      name: 'MobiFone HCMC',
      short: 'MobiFone',
      sector: 'Telecom & Digital Services',
      country: 'Vietnam',
      building: 'QTSC Campus',
      intro: 'Dịch vụ viễn thông và giải pháp số.',
      lead: 'MobiFone cung cấp giải pháp hóa đơn điện tử, chữ ký số, truyền dẫn doanh nghiệp và dịch vụ giá trị gia tăng trên nền tảng viễn thông.',
      meta: ['Telecom · Digital Invoicing · Mobile Services', 'mobifone.vn', '(84-28) 3811 8888'],
      products: [
        { code: 'EI', title: 'MobiFone E-Invoice & E-Contract', desc: 'Secure Paperless Workplace', category: 'Digital Solutions' },
        { code: 'SM', title: 'Smart Mobility & IoT SIM', desc: 'Connected Enterprise Solutions', category: 'Telecom & Infrastructure' }
      ]
    }
  };

  const root = document.body;
  if (!root.classList.contains('page-company-detail')) return;

  const renderProfile = () => {
    const hash = (location.hash || '').replace('#', '').toLowerCase();
    const params = new URLSearchParams(location.search);
    const key = (hash || params.get('id') || 'hitachi').toLowerCase();
    const data = dataset[key] || dataset['hitachi'];

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

    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `<a href="index.html">Trang chủ</a> / <a href="companies.html">Doanh nghiệp</a> / <span>${data.name}</span>`;
    }

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

    // Dynamic products rendering
    const productsContainer = document.querySelector('.detail-products-section .entity-list');
    if (productsContainer && data.products) {
      productsContainer.innerHTML = data.products.map(p => `
        <a class="entity-card" href="technology-detail.html">
          <div class="entity-mark">${p.code}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <footer><span>${p.category}</span><span>↗</span></footer>
        </a>
      `).join('');
    }
  };

  renderProfile();
  window.addEventListener('hashchange', renderProfile);
})();

/** Keyboard activation for entity cards. */
const { $$ } = window.QTSC;
$$('.entity-card').forEach(card => card.addEventListener('keydown', event => {
  if (event.key === 'Enter' && card.href) location.href = card.href;
}));
