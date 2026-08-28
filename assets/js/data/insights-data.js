(() => {
  const stack = document.querySelector('.article-stack');
  const tabs = document.querySelector('.pill-tabs');
  if (!stack || !tabs || stack.dataset.expanded === '1') return;

  const labels = [
    ['dxcenter','DXCenter'],
    ['solution','Sản phẩm & Giải pháp'],
    ['industry','Tin chuyên ngành'],
    ['investment','Mời gọi đầu tư']
  ];
  const career = tabs.querySelector('[data-filter="career"]');
  labels.forEach(([key,label]) => {
    if (tabs.querySelector(`[data-filter="${key}"]`)) return;
    const btn = document.createElement('button'); btn.dataset.filter = key; btn.textContent = label;
    tabs.insertBefore(btn, career || null);
  });

  const items = [
    ['news','25/08/2026','QTSC giới thiệu giải pháp công nghệ và an ninh mạng tại Hội thảo Chuyển đổi số của Quân khu 7 năm 2026','https://www.qtsc.com.vn/tin-tuc/qtsc-gioi-thieu-giai-phap-cong-nghe-va-an-ninh-mang-tai-hoi-thao-chuyen-doi-so-cua-quan-khu-7-nam-2026'],
    ['news','25/08/2026','Tập đoàn Sunwah cùng đoàn doanh nghiệp Trung Quốc tìm hiểu hệ sinh thái công nghệ số và cơ hội hợp tác tại QTSC','https://www.qtsc.com.vn/tin-tuc/tap-doan-doanh-nghiep-sunwah-cung-doan-doanh-nghiep-trung-quoc-tim-hieu-he-sinh-thai-cong-nghe-so-va-co-hoi-hop-tac-tai-qtsc'],
    ['news','21/08/2026','Sinh viên Trường Đại học FPT Greenwich Việt Nam tìm hiểu môi trường làm việc và định hướng nghề nghiệp tại QTSC','https://www.qtsc.com.vn/tin-qtsc'],
    ['industry','16/08/2026','QTSC tiếp tục đồng hành cùng VINASA trong nhiệm kỳ 2026–2031, thúc đẩy phát triển ngành công nghệ số Việt Nam','https://www.qtsc.com.vn/tin-tuc/qtsc-tiep-tuc-dong-hanh-cung-vinasa-trong-nhiem-ky-2026-2031-thuc-day-phat-trien-nganh-cong-nghe-so-viet-nam'],
    ['news','12/08/2026','Hơn 300 người tham gia hiến máu tình nguyện tại QTSC','https://www.qtsc.com.vn/tin-tuc/hon-300-nguoi-tham-gia-hien-mau-tinh-nguyen-tai-qtsc'],
    ['industry','11/08/2026','QTSC đồng hành cùng Câu lạc bộ Niềm Tin Số TP.HCM xây dựng môi trường số an toàn, văn minh','https://www.qtsc.com.vn/tin-tuc/qtsc-dong-hanh-cung-cau-lac-bo-niem-tin-so-tphcm-xay-dung-moi-truong-so-an-toan-van-minh'],
    ['investment','05/08/2026','QTSC đón tiếp đoàn S.M.A.R.T Entrepreneurship X Global, thúc đẩy kết nối hợp tác công nghệ Việt Nam – Singapore','https://www.qtsc.com.vn/tin-qtsc'],
    ['news','03/08/2026','QTSC đồng hành cùng Đoàn phường Trung Mỹ Tây tổ chức Hành trình “Chuyển đổi số - Chuyển động xanh” năm 2026','https://www.qtsc.com.vn/tin-qtsc'],
    ['dxcenter','22/07/2026','Hội thảo “AI và Chủ quyền dữ liệu trong kỷ nguyên số”','https://www.qtsc.com.vn/tin-dxcenter'],
    ['industry','21/07/2026','QTSC phối hợp tổ chức Diễn đàn Hợp tác Việt Nam – Singapore về Công nghiệp Bán dẫn năm 2026','https://www.qtsc.com.vn/tin-tuc/qtsc-phoi-hop-to-chuc-dien-dan-hop-tac-viet-nam-singapore-ve-cong-nghiep-ban-dan-nam-2026'],
    ['dxcenter','16/07/2026','Mời tham gia Hội thảo AI và chủ quyền dữ liệu trong kỷ nguyên số','https://www.qtsc.com.vn/tin-dxcenter'],
    ['solution','26/06/2026','QTSC tham gia Vietnam ICTCOMM 2026, giới thiệu giải pháp công nghệ số và thúc đẩy kết nối hợp tác quốc tế','https://www.qtsc.com.vn/tin-tuc/qtsc-tham-gia-vietnam-ictcomm-2026-gioi-thieu-giai-phap-cong-nghe-so-va-thuc-day-ket-noi-hop-tac-quoc-te'],
    ['career','30/06/2026','TMA tuyển dụng Automation Tester Fresher','https://www.qtsc.com.vn/tin-tuyen-dung'],
    ['career','26/06/2026','Trung tâm Công nghệ số QTSC tuyển dụng Nhân viên Kỹ thuật hệ thống - Bộ phận System','https://www.qtsc.com.vn/tin-tuyen-dung'],
    ['career','25/06/2026','TMA tuyển dụng Telecom C/C++ Software Developer','https://www.qtsc.com.vn/tin-tuyen-dung'],
    ['career','23/06/2026','Rakus tuyển dụng vị trí PHP và JAVA','https://www.qtsc.com.vn/tin-tuyen-dung'],
    ['event','30/05/2026','Thông cáo báo chí Hội thi Thử thách Trí tuệ nhân tạo (AI Challenge) TP.HCM năm 2026','https://www.qtsc.com.vn/tin-tuc/thong-cao-bao-chi-hoi-thi-thu-thach-tri-tue-nhan-tao-ai-challenge-thanh-pho-ho-chi-minh-nam-2026'],
    ['solution','13/05/2026','QTSC đồng hành cùng sự kiện Biztech 2026 và Hội thảo An ninh mạng trong kỷ nguyên AI','https://www.qtsc.com.vn/san-pham-giai-phap'],
    ['event','23/04/2026','Mời tham gia Chương trình tăng tốc khởi nghiệp quốc tế Sber500','https://www.qtsc.com.vn/tin-su-kien'],
    ['dxcenter','23/04/2026','Hội thảo “Ứng dụng AI và dữ liệu thực tiễn trong nghiên cứu và phát triển sản phẩm thực phẩm”','https://www.qtsc.com.vn/tin-dxcenter'],
    ['event','31/03/2026','BIZTECH 2026 – Hội nghị & Triển lãm B2B Chuyển đổi số dành cho Doanh nghiệp','https://www.qtsc.com.vn/tin-su-kien'],
    ['investment','27/03/2026','Khu công nghiệp sinh thái (EIP) – Nền tảng thu hút đầu tư và tham gia chuỗi cung ứng toàn cầu','https://www.qtsc.com.vn/tin-dxcenter'],
    ['investment','23/03/2026','Mời tham dự Hội thảo Khu công nghiệp sinh thái (EIP) – Nền tảng thu hút đầu tư và tham gia chuỗi cung ứng toàn cầu của TP.HCM','https://www.qtsc.com.vn/tin-dxcenter']
  ];

  const existing = new Set([...document.querySelectorAll('.article-card h3')].map(x => x.textContent.trim().toLowerCase()));
  items.forEach(([cat,date,title,url]) => {
    if (existing.has(title.toLowerCase())) return;
    const article = document.createElement('article');
    article.className = 'article-card'; article.dataset.category = cat;
    article.innerHTML = `<small>${date}</small><h3>${title}</h3><a href="${url}" target="_blank" rel="noopener">Đọc tin ↗</a>`;
    stack.append(article);
  });
  stack.dataset.expanded = '1';

  function applyAll(filter='all') {
    document.querySelectorAll('[data-filter]').forEach(b => {
      const on = b.dataset.filter === filter; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('[data-category]').forEach(card => card.hidden = filter !== 'all' && card.dataset.category !== filter);
    const url = new URL(location.href); filter === 'all' ? url.searchParams.delete('cat') : url.searchParams.set('cat', filter); history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
  document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => applyAll(btn.dataset.filter)));
  applyAll(new URLSearchParams(location.search).get('cat') || 'all');
})();
