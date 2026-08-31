(() => {
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  const textMap = new Map([
    ['Ho Chi Minh City · Vietnam', 'TP.HCM · Việt Nam'],
    ['QTSC in numbers · 2026', 'QTSC qua số liệu · 2026'],
    ['One connected ecosystem', 'Hệ sinh thái kết nối'],
    ['The physical network', 'Campus công nghệ 43 ha'],
    ['Decision support', 'Hỗ trợ ra quyết định'],
    ['Current signals', 'Thông tin cập nhật'],
    ['Direction', 'Định hướng'],
    ['Evidence & next chapter', 'Năng lực & bước phát triển tiếp theo'],
    ['Explore the ecosystem', 'Khám phá hệ sinh thái'],
    ['Connect with QTSC', 'Kết nối QTSC'],
    ['Office evaluation', 'Đánh giá không gian'],
    ['From interest to operation', 'Từ nhu cầu đến vận hành'],
    ['Operate at QTSC', 'Vận hành tại QTSC'],
    ['Office enquiry', 'Nhu cầu thuê văn phòng'],
    ['Investment scope · 2026', 'Phạm vi đầu tư · 2026'],
    ['Policy evaluation', 'Đối chiếu chính sách'],
    ['From opportunity to discussion', 'Từ cơ hội đến trao đổi'],
    ['Evaluate the ecosystem', 'Đánh giá hệ sinh thái'],
    ['Investment connection', 'Kết nối đầu tư'],
    ['Company discovery', 'Tìm doanh nghiệp'],
    ['Business connection', 'Kết nối doanh nghiệp'],
    ['Search by problem', 'Tìm theo bài toán'],
    ['Technology connection', 'Kết nối nhu cầu công nghệ']
  ]);

  const headingMap = new Map([
    ['Tầm nhìn phải được đọc cùng năng lực thực thi.', 'Tầm nhìn được củng cố bằng năng lực vận hành và kết quả thực tế.'],
    ['Một hành trình thuê rõ bước, không giả định SLA.', 'Lộ trình từ nhu cầu đến vận hành.'],
    ['Đừng đọc “ưu đãi” như một quyền lợi mặc định.', 'Ưu đãi cần được đối chiếu theo từng dự án.']
  ]);

  const paragraphMap = new Map([
    ['Website giúp doanh nghiệp chuẩn bị đúng thông tin trước khi kết nối; tiến độ và điều khoản chính thức được QTSC xác nhận theo từng trường hợp.', 'Chuẩn bị trước quy mô, thời điểm và yêu cầu vận hành giúp cuộc trao đổi với QTSC đi thẳng vào phương án phù hợp.'],
    ['Không gắn SLA giả định. Thời gian xử lý phụ thuộc loại dự án, hồ sơ, cơ quan liên quan và phạm vi cần làm rõ.', 'Thời gian xử lý phụ thuộc loại dự án, hồ sơ, cơ quan liên quan và phạm vi cần làm rõ.'],
    ['Đây là một lớp bằng chứng bên ngoài để bổ sung cho các chỉ số QTSC tự công bố; người dùng có thể tiếp tục sang tài nguyên hoặc hệ sinh thái để kiểm tra sâu hơn.', 'Kết quả đánh giá độc lập bổ sung góc nhìn bên ngoài cho các chỉ số QTSC công bố và giúp đối tác có thêm cơ sở đánh giá hệ sinh thái.']
  ]);

  function replaceExact(selector, map) {
    qsa(selector).forEach(node => {
      const current = node.textContent.trim();
      if (map.has(current)) node.textContent = map.get(current);
    });
  }

  function patchPublicLanguage() {
    replaceExact('.micro-label', textMap);
    replaceExact('h1,h2,h3', headingMap);
    replaceExact('p', paragraphMap);

    const destinationLabels = {
      'companies.html': ['Doanh nghiệp', 'Xem doanh nghiệp ↗'],
      'marketplace.html': ['Giải pháp công nghệ', 'Tìm giải pháp ↗'],
      'digitech-center.html': ['Trung tâm công nghệ số', 'Xem QTSC DigiTech ↗'],
      'investment.html': ['Đầu tư', 'Xem cơ hội đầu tư ↗'],
      'office.html': ['Không gian', 'Xem không gian ↗'],
      'resources.html': ['Tài nguyên', 'Xem tài nguyên ↗'],
      'innovation-centers.html': ['Đổi mới sáng tạo', 'Xem trung tâm đổi mới ↗'],
      'services.html': ['Dịch vụ hỗ trợ', 'Xem dịch vụ ↗'],
      'telecom.html': ['Hạ tầng số', 'Xem hạ tầng số ↗'],
      'amenities.html': ['Tiện ích', 'Xem tiện ích ↗'],
      'about.html': ['QTSC', 'Hiểu về QTSC ↗'],
      'technology-detail.html': ['Hạ tầng dữ liệu', 'Xem năng lực công nghệ ↗']
    };

    qsa('.ecosystem-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const match = Object.keys(destinationLabels).find(key => href.includes(key));
      if (!match) return;
      const [label, action] = destinationLabels[match];
      const category = link.querySelector(':scope > span');
      const cta = link.querySelector(':scope > i');
      if (category) category.textContent = label;
      if (cta) cta.textContent = action;
    });
  }

  function setProofCell(cell, label, value, note) {
    if (!cell) return;
    const labelNode = cell.querySelector('span');
    const valueNode = cell.querySelector('strong');
    const noteNode = cell.querySelector('em');
    if (labelNode) labelNode.textContent = label;
    if (valueNode) valueNode.textContent = value;
    if (noteNode) noteNode.textContent = note;
  }

  function patchEvidenceRails() {
    const rail = document.querySelector('main > .proof-rail');
    const cells = rail ? qsa('.proof-cell', rail) : [];
    if (!rail || !cells.length) return;

    if (document.body.classList.contains('page-office')) {
      setProofCell(cells[3], 'Doanh nghiệp công nghệ số', '121', 'theo số liệu QTSC công bố năm 2026.');
      cells[4]?.classList.add('is-ui-meta');
      rail.classList.add('proof-rail--4');
    }

    if (document.body.classList.contains('page-companies')) {
      cells[3]?.classList.add('is-ui-meta');
      cells[4]?.classList.add('is-ui-meta');
      rail.classList.add('proof-rail--3');
    }

    if (document.body.classList.contains('page-investment')) {
      setProofCell(cells[2], 'Doanh nghiệp công nghệ số', '121', 'theo số liệu QTSC công bố năm 2026.');
      setProofCell(cells[4], 'Kết nối quốc tế', '30+', 'quốc gia theo tổng kết 25 năm QTSC.');
    }

    if (document.body.classList.contains('page-marketplace')) {
      setProofCell(cells[0], 'Sản phẩm, giải pháp & dịch vụ', '650+', 'quy mô hệ sinh thái QTSC công bố năm 2026.');
      setProofCell(cells[1], 'Doanh nghiệp công nghệ số', '121', 'theo số liệu QTSC công bố năm 2026.');
      setProofCell(cells[2], 'Trung tâm dữ liệu QTSC', 'Tier III', 'chứng chỉ thiết kế trung tâm dữ liệu từ Uptime Institute.');
      setProofCell(cells[3], 'Thời gian phát triển', '25 năm', 'QTSC hoạt động từ năm 2001 đến 2026.');
      setProofCell(cells[4], 'Quy mô campus', '43 ha', 'Khu Công viên phần mềm Quang Trung tại TP.HCM.');
    }
  }

  function patchOfficeDirectory() {
    if (!document.body.classList.contains('page-office')) return;
    const selector = document.querySelector('.office-selector');
    if (!selector) return;
    selector.classList.add('domain-building-directory');
    if (!selector.previousElementSibling?.classList.contains('directory-kicker')) {
      const kicker = document.createElement('p');
      kicker.className = 'directory-kicker';
      kicker.textContent = 'Danh mục tòa nhà · QTSC Campus';
      selector.before(kicker);
    }
  }

  function patchCompanyDirectory() {
    if (!document.body.classList.contains('page-companies')) return;
    const list = document.querySelector('.entity-list');
    if (!list) return;
    list.classList.add('entity-list--identity');
    qsa('.entity-card .entity-mark', list).forEach(mark => mark.remove());
  }

  function patchMarketplace() {
    if (!document.body.classList.contains('page-marketplace')) return;
    const list = document.querySelector('.entity-list');
    if (!list) return;

    const placeholderTitles = new Set([
      'Private Cloud Platform',
      'Security Operation Center',
      'AI Document Processing',
      'Enterprise ERP Platform'
    ]);
    qsa('.entity-card', list).forEach(card => {
      const title = card.querySelector('h3')?.textContent.trim();
      if (placeholderTitles.has(title)) card.remove();
    });

    if (!document.querySelector('.verified-offerings')) {
      const block = document.createElement('section');
      block.className = 'verified-offerings';
      block.setAttribute('aria-label', 'Năng lực QTSC đã đối chiếu nguồn chính thức');
      block.innerHTML = `
        <div class="verified-offerings-head">
          <strong>Năng lực QTSC đã đối chiếu nguồn chính thức</strong>
          <span>Nguồn: qtsc.com.vn</span>
        </div>
        <div class="verified-offerings-grid">
          <a class="verified-offering" href="https://www.qtsc.com.vn/san-pham-giai-phap/tang-toc-chuyen-doi-so-voi-private-cloud-tich-hop-iac-giai-phap-toan-dien-tu-qtsc" target="_blank" rel="noopener">
            <small>Cloud · QTSC</small><strong>Private Cloud tích hợp Infrastructure as Code</strong><i aria-hidden="true">↗</i>
            <p>Tự động hóa triển khai và quản lý hạ tầng CNTT trên nền tảng đám mây riêng của QTSC.</p>
          </a>
          <a class="verified-offering" href="https://www.qtsc.com.vn/san-pham-giai-phap/tang-cuong-phong-thu-an-toan-thong-tin-voi-dich-vu-soc-da-lop-tich-hop-ai-tu-qtsc" target="_blank" rel="noopener">
            <small>An toàn thông tin · QTSC CyberSec</small><strong>Dịch vụ SOC đa lớp tích hợp AI</strong><i aria-hidden="true">↗</i>
            <p>Giám sát tập trung 24/7, phân tích và cảnh báo sớm các rủi ro an toàn thông tin.</p>
          </a>
          <a class="verified-offering" href="https://www.qtsc.com.vn/tin-tuc/trung-tam-du-lieu-qtsc-dat-chung-chi-uptime-tier-iii" target="_blank" rel="noopener">
            <small>Data Center · QTSC</small><strong>Trung tâm dữ liệu đạt Uptime Tier III</strong><i aria-hidden="true">↗</i>
            <p>Hạ tầng trung tâm dữ liệu QTSC đạt chứng chỉ Tier III về thiết kế trung tâm dữ liệu.</p>
          </a>
          <a class="verified-offering" href="https://www.qtsc.com.vn/san-pham-giai-phap/qtsc-cung-cap-he-thong-giam-sat-thong-tin-toan-dien-tren-khong-gian-mang-social-listening" target="_blank" rel="noopener">
            <small>AI & dữ liệu · QTSC</small><strong>Hệ thống Social Listening</strong><i aria-hidden="true">↗</i>
            <p>Thu thập, phân tích và cảnh báo thông tin trên không gian mạng với các mô hình AI hỗ trợ.</p>
          </a>
        </div>`;
      list.before(block);
    }
  }

  function run() {
    patchPublicLanguage();
    patchEvidenceRails();
    patchOfficeDirectory();
    patchCompanyDirectory();
    patchMarketplace();
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      run();
    });
  };

  run();
  setTimeout(run, 180);
  setTimeout(run, 900);

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {childList:true, subtree:true});
})();
