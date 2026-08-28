(() => {
  const list = document.querySelector('.entity-list');
  if (!list || list.dataset.expanded === '1') return;
  const records = [
    ['AD','Công ty TNHH MTV Giáo dục Ánh Dương','Education','Nhà 8','education'],
    ['AL','Công ty TNHH Xuất nhập khẩu thương mại dịch vụ ALPHA','QTSC Member','Nhà 8','software'],
    ['PD','Công ty TNHH Pearl Dragon Interactive','Digital / Interactive','Tòa nhà SBI','software'],
    ['SP','Công ty TNHH Tư vấn Sinh Phúc','Consulting','Tòa nhà HOSE','software'],
    ['68','Công ty TNHH Giải pháp Công nghệ 689 Cloud Solution','Cloud Technology','Nhà 8','data'],
    ['7T','Công ty TNHH Công Nghệ 7TECHS','Technology','Nhà 6A','software'],
    ['AA','Công ty TNHH Giải pháp Nông nghiệp và Tự Động Hóa','AgriTech & Automation','QTSC R&D Labs 1','data'],
    ['AC','Công ty TNHH Giải pháp phần mềm ACS','Software Solutions','Tòa nhà SBI','software'],
    ['AD','Công ty TNHH ADMS (Việt Nam)','Technology','Nhà 6A','software'],
    ['AT','Công ty TNHH Phần mềm ADT','Software','Tòa nhà SBI','software'],
    ['AE','Công ty TNHH Aegona','Software & Digital','QTSC Building 9','software'],
    ['VA','Chi nhánh Công ty CP Giải pháp Tự động hóa Kỹ thuật Việt Nam tại TP.HCM','Automation','Tòa nhà SBI','data'],
    ['AI','Công ty TNHH ALMIC INTEGRATE Việt Nam','System Integration','Tòa nhà SBI','software'],
    ['AP','Công ty TNHH Thiết bị & Công nghệ Phần mềm An Phát','Software Technology','Tòa nhà Genpacific','software'],
    ['AN','Công ty TNHH Anyses','Technology','Tòa nhà HOSE','software'],
    ['AS','Công ty Cổ phần ASOFT','ERP & Enterprise Software','Tòa nhà JVPE','software'],
    ['AV','Công ty TNHH Phần mềm ASV','Software','Nhà 6A','software'],
    ['AT','Công ty Cổ phần Công nghệ ATALINK','Supply-chain Technology','QTSC Building 1','software'],
    ['AV','Công ty Cổ phần Kỹ thuật Sản xuất AVA','Engineering Technology','Tòa nhà SBI','data'],
    ['BD','Công ty TNHH Dịch vụ và Giải pháp phần mềm Bado','Software Services','Nhà 8','software'],
    ['BK','Công ty TNHH Giải Pháp Tin Học Bách Khoa','IT Solutions','Nhà 8','software'],
    ['BB','Công ty TNHH bbv Việt Nam','Software Engineering','Tòa nhà Anna','software'],
    ['BC','Công ty TNHH Công nghệ BECAS Việt Nam','Technology','Tòa nhà SBI','software'],
    ['DC','DiCentral Vietnam Co., Ltd.','EDI & Supply Chain','Helios Building','software'],
    ['MS','Công ty Cổ phần MISA','Enterprise Platforms','Tòa nhà MISA','software'],
    ['CN','Công ty TNHH Vietnam Concentrix Services','Business Services','QTSC Building 1','software'],
    ['VN','Công TNHH MTV Trung Tâm Dữ Liệu VNG','Data Center','Tòa nhà SBI','data'],
    ['DS','Công ty TNHH Phần mềm DSOFT','Software','Nhà 8','software'],
    ['NT','Công ty TNHH Công nghệ phần mềm NETS','Software Technology','Tòa nhà SBI','software'],
    ['TE','Công ty TNHH Giải pháp Công nghệ cao TE','Software & Data Processing','Tòa nhà SBI','data'],
    ['RA','Công ty TNHH Rakus Việt Nam','Software Products','QTSC Building 9','software'],
    ['TW','Công ty TNHH Teamwork Việt Nam','SAP / ERP Consulting','Tòa nhà Anna','software']
  ];
  const existing = new Set([...list.querySelectorAll('h3')].map(x => x.textContent.trim().toLowerCase()));
  records.forEach(([mark,name,sector,building,category]) => {
    if (existing.has(name.toLowerCase())) return;
    const a = document.createElement('a');
    a.className = 'entity-card';
    a.href = 'company-detail.html';
    a.dataset.searchable = '';
    a.dataset.category = category;
    a.innerHTML = `<div class="entity-mark">${mark}</div><h3>${name}</h3><p>${sector}</p><footer><span>${building}</span><span>↗</span></footer>`;
    list.append(a);
  });
  list.dataset.expanded = '1';
  document.querySelector('#innerSearch')?.dispatchEvent(new Event('input', {bubbles:true}));
})();
