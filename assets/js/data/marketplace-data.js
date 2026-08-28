(() => {
  const list = document.querySelector('.entity-list');
  if (!list || list.dataset.expanded === '1') return;
  const records = [
    ['AE','ASOFT-ERP','ASOFT · Hoạch định nguồn lực doanh nghiệp','erp'],
    ['AC','ASOFT-CRM','ASOFT · Quản lý quan hệ khách hàng','erp'],
    ['AM','ASOFT-M','ASOFT · Quản lý sản xuất','erp'],
    ['AT','Khảo sát, tư vấn & triển khai hệ thống ERP','ASOFT · Enterprise Consulting','erp'],
    ['AA','Tư vấn hệ thống hóa & tự động hóa quản trị','ASOFT · Digital Transformation','ai'],
    ['KW','Phát triển website & ứng dụng smartphone','Kiến Vua · Web & Mobile','cloud'],
    ['KO','Gia công phát triển phần mềm','Kiến Vua · Software Outsourcing','cloud'],
    ['KI','Tích hợp hệ thống','Kiến Vua · ERP / CRM / eCommerce / IoT','cloud'],
    ['KC','Tư vấn Công nghệ Thông tin','Kiến Vua · Cloud / AI / Security','cloud'],
    ['PT','Passenger Transportation Management Platform','Kiến Vua · Transport Technology','ai'],
    ['SB','Schoolbus Management Platform','Kiến Vua · Education / Mobility','ai'],
    ['SAP','Giải pháp kinh doanh SAP / SAP ERP','Teamwork Vietnam · Enterprise','erp'],
    ['GD','Global Delivery Center','Teamwork Vietnam · 24/7 IT Support','cloud'],
    ['TP','Nền tảng công nghệ & Hybrid Cloud','Teamwork Vietnam · Cloud Platform','cloud'],
    ['TW','TW Solutions','Teamwork Vietnam · Productivity / Compliance','erp'],
    ['HM','HaiHai Mail','Rakus Vietnam · High-speed Email','cloud'],
    ['MD','Mail Dealer','Rakus Vietnam · Email Management','cloud'],
    ['RH','RakuRaku Hanbai','Rakus Vietnam · Sales / Purchasing','erp'],
    ['RK','RakuRaku Kintai','Rakus Vietnam · Time & Attendance','erp'],
    ['DX','DIGI-XTRACT','DIGI-TEXX · Intelligent Document Processing','ai'],
    ['DG','Chuyển đổi số & số hóa toàn diện','DIGI-TEXX · Digital Services','ai'],
    ['DP','Dịch vụ nhập & xử lý tài liệu','DIGI-TEXX · Data Processing','ai'],
    ['TM','Tư vấn & phát triển phần mềm','TMA Solutions · Software Engineering','cloud'],
    ['BO','Cloud vận hành ERP Odoo','BIZAPPS · Cloud ERP','cloud'],
    ['BC','BIZAPPS CRM','BIZAPPS · Customer Relationship Management','erp'],
    ['BM','BIZAPPS quản trị sản xuất','BIZAPPS · Manufacturing','erp'],
    ['AZ','AI chăm sóc khách hàng & bán hàng tự động trên Zalo','Incomsoft · AI Automation','ai'],
    ['ID','ERP / DMS / CRM doanh nghiệp','Incomsoft · Enterprise Management','erp'],
    ['HM','Hi-MSS · Giám sát an toàn thông tin mạng','HCMC Information Security · MSS','cyber'],
    ['CC','Dịch vụ điện toán đám mây','HCMC Information Security · Cloud','cloud'],
    ['HE','Dịch vụ cho hệ thống nhúng','Hitachi Digital Services Vietnam','cloud'],
    ['HI','Giải pháp cho ngành công nghiệp','Hitachi Digital Services Vietnam','ai'],
    ['VE','Hệ thống ERP - Quản lý doanh nghiệp','VNJ Software Solutions · ERP','erp'],
    ['RT','Đào tạo Cloud, DevOps, An ninh mạng, Dữ liệu & AI','Robusta · Authorized Training','cyber'],
    ['DX','Đào tạo Chuyển đổi số: kỹ năng số & an toàn thông tin','DXCenter · Training','cyber']
  ];
  const existing = new Set([...list.querySelectorAll('h3')].map(x => x.textContent.trim().toLowerCase()));
  records.forEach(([mark,name,provider,category]) => {
    if (existing.has(name.toLowerCase())) return;
    const a = document.createElement('a');
    a.className = 'entity-card';
    a.href = 'technology-detail.html';
    a.dataset.searchable = '';
    a.dataset.category = category;
    a.innerHTML = `<div class="entity-mark">${mark}</div><h3>${name}</h3><p>${provider}</p><footer><span>${category.toUpperCase()}</span><span>↗</span></footer>`;
    list.append(a);
  });
  list.dataset.expanded = '1';
  document.querySelector('#innerSearch')?.dispatchEvent(new Event('input', {bubbles:true}));
})();
