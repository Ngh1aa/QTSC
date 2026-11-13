/* QTSC prototype seed — the single data file for every interactive workflow.
 *
 * Catalogue data (companies, solutions, office units, jobs, articles, resources,
 * open-data series, incentive rules) is read directly from this file.
 * `initialUser` seeds the per-tab user state that assets/js/prototype/store.js
 * copies into sessionStorage on first load and after "Đặt lại dữ liệu demo".
 *
 * Content notes: company and article titles follow QTSC public listings; detail
 * copy, office units, job descriptions and open-data readings are representative
 * prototype content and are labelled as such on screen where it matters.
 */
(() => {
  const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64);

  /* ---------------------------------------------------------------- companies */
  const featuredCompanies = [
    { id: 'hitachi', name: 'Hitachi Digital Services Vietnam', short: 'HitachiDSVN', sector: 'Software & Digital', category: 'software', country: 'Nhật Bản', building: 'Helios Building',
      intro: 'Dịch vụ số trong một hệ sinh thái công nghệ.', lead: 'Hitachi Digital Services Vietnam phát triển dịch vụ hệ thống nhúng, giải pháp công nghiệp và chuyển đổi số cho khách hàng toàn cầu từ văn phòng tại Helios Building.',
      tags: ['Phần mềm', 'ERP', 'Chuyển đổi số'], website: 'hitachids.com', phone: '(84-28) 5437 1199' },
    { id: 'tma', name: 'TMA Solutions', short: 'TMA', sector: 'Software & Digital', category: 'software', country: 'Việt Nam', building: 'QTSC Campus',
      intro: 'Phần mềm, R&D và giải pháp doanh nghiệp.', lead: 'TMA hiện diện tại QTSC với các hoạt động phát triển phần mềm, R&D và cung cấp giải pháp cho doanh nghiệp toàn cầu.',
      tags: ['Phần mềm', 'Outsourcing', 'R&D'], website: 'tmasolutions.com', phone: '(84-28) 3547 1099' },
    { id: 'digi-texx', name: 'DIGI-TEXX Vietnam', short: 'DIGI-TEXX', sector: 'Data & AI', category: 'data', country: 'Việt Nam, Đức', building: 'QTSC Campus',
      intro: 'Số hóa tài liệu, xử lý dữ liệu và AI.', lead: 'DIGI-TEXX hoạt động trong lĩnh vực số hóa, xử lý dữ liệu và các giải pháp AI phục vụ doanh nghiệp tại châu Âu, Mỹ và Việt Nam.',
      tags: ['Dữ liệu', 'AI', 'Xử lý tài liệu'], website: 'digi-texx.com', phone: '(84-28) 3526 7288' },
    { id: 'amit', name: 'AMIT Group', short: 'AMIT', sector: 'Digital Transformation', category: 'software', country: 'Việt Nam', building: 'QTSC Campus',
      intro: 'Chuyển đổi số và giải pháp IoT, AI.', lead: 'AMIT Group tập trung vào chuyển đổi số, tích hợp hệ thống và các giải pháp IoT, AI cho doanh nghiệp tại Việt Nam và khu vực.',
      tags: ['IoT', 'AI', 'Tích hợp hệ thống'], website: 'amitgroup.com.vn', phone: '(84-28) 3728 0999' },
    { id: 'hoa-sen', name: 'Hoa Sen University', short: 'HSU', sector: 'Education', category: 'education', country: 'Việt Nam', building: 'QTSC Campus',
      intro: 'Đào tạo công nghệ và nguồn nhân lực số.', lead: 'Đại học Hoa Sen hiện diện tại QTSC với các chương trình đào tạo công nghệ, thiết kế số và cung ứng nguồn nhân lực cho hệ sinh thái.',
      tags: ['Giáo dục', 'Công nghệ', 'Thiết kế'], website: 'hoasen.edu.vn', phone: '(84-28) 3722 0909' },
    { id: 'viettel', name: 'Viettel HCMC', short: 'Viettel', sector: 'Telecom', category: 'telecom', country: 'Việt Nam', building: 'Tòa nhà JVPE',
      intro: 'Viễn thông và hạ tầng kết nối.', lead: 'Viettel hiện diện tại QTSC với các hoạt động viễn thông, kết nối cáp quang băng rộng và phát triển hạ tầng số phục vụ doanh nghiệp.',
      tags: ['Viễn thông', 'Kết nối', '5G'], website: 'viettel.com.vn', phone: '(84-28) 6255 6789' },
    { id: 'fpt', name: 'FPT Software', short: 'FPT Soft', sector: 'Software & IT Services', category: 'software', country: 'Việt Nam', building: 'QTSC Campus',
      intro: 'Phần mềm và dịch vụ công nghệ thông tin toàn cầu.', lead: 'FPT Software cung cấp giải pháp chuyển đổi số, AI, chuyển dịch cloud và dịch vụ phát triển phần mềm cho thị trường quốc tế.',
      tags: ['Phần mềm', 'Cloud', 'AI'], website: 'fpt-software.com', phone: '(84-28) 7300 7575' },
    { id: 'kms', name: 'KMS Technology', short: 'KMS', sector: 'Software Engineering', category: 'software', country: 'Mỹ, Việt Nam', building: 'Helios Building',
      intro: 'Kỹ thuật phần mềm và tư vấn sản phẩm số.', lead: 'KMS Technology chuyên về tư vấn sản phẩm số, kiểm thử phần mềm, kỹ thuật dữ liệu và phát triển nền tảng doanh nghiệp.',
      tags: ['Kỹ thuật phần mềm', 'Kiểm thử', 'Tư vấn'], website: 'kms-technology.com', phone: '(84-28) 3848 6888' },
    { id: 'vnpt-it', name: 'VNPT-IT', short: 'VNPT-IT', sector: 'Telecom & IT Infrastructure', category: 'telecom', country: 'Việt Nam', building: 'Tòa nhà SBI',
      intro: 'Công nghệ thông tin và chính phủ số.', lead: 'VNPT-IT phát triển nền tảng chính phủ điện tử, đô thị thông minh, y tế số và hạ tầng đám mây cho cơ quan và doanh nghiệp.',
      tags: ['Chính phủ số', 'Đô thị thông minh', 'Cloud'], website: 'vnpt.com.vn', phone: '(84-28) 3838 8888' },
    { id: 'saigon-tech', name: 'Saigon Technology', short: 'SaigonTech', sector: 'Software Development', category: 'software', country: 'Việt Nam', building: 'QTSC Campus',
      intro: 'Phát triển phần mềm Agile cho doanh nghiệp.', lead: 'Saigon Technology phát triển ứng dụng web, mobile, cloud và AI cho khách hàng tại Bắc Mỹ, châu Âu và Úc.',
      tags: ['Agile', 'Web & Mobile', 'Cloud'], website: 'saigontechnology.com', phone: '(84-28) 3620 4880' },
    { id: 'qtsc-edu', name: 'QTSC Education Center', short: 'QTSC Edu', sector: 'Technology Training', category: 'education', country: 'Việt Nam', building: 'QTSC Building 1',
      intro: 'Đào tạo nguồn nhân lực công nghệ số.', lead: 'QTSC Education Center tổ chức các khóa nâng cao kỹ năng lập trình, an ninh mạng, kiểm thử và chuyển đổi số cho sinh viên và nhân sự doanh nghiệp.',
      tags: ['Đào tạo', 'Nâng cao kỹ năng', 'Chứng chỉ'], website: 'qtsc.com.vn', phone: '(84-28) 3715 8888' },
    { id: 'mobifone', name: 'MobiFone HCMC', short: 'MobiFone', sector: 'Telecom & Digital Services', category: 'telecom', country: 'Việt Nam', building: 'QTSC Campus',
      intro: 'Dịch vụ viễn thông và giải pháp số.', lead: 'MobiFone cung cấp hóa đơn điện tử, chữ ký số, truyền dẫn doanh nghiệp và dịch vụ giá trị gia tăng trên nền tảng viễn thông.',
      tags: ['Viễn thông', 'Hóa đơn điện tử', 'IoT'], website: 'mobifone.vn', phone: '(84-28) 3811 8888' }
  ];

  const memberRows = [
    ['Công ty TNHH MTV Giáo dục Ánh Dương', 'Education', 'Nhà 8', 'education'],
    ['Công ty TNHH Xuất nhập khẩu thương mại dịch vụ ALPHA', 'QTSC Member', 'Nhà 8', 'software'],
    ['Công ty TNHH Pearl Dragon Interactive', 'Digital Interactive', 'Tòa nhà SBI', 'software'],
    ['Công ty TNHH Tư vấn Sinh Phúc', 'Consulting', 'Tòa nhà HOSE', 'software'],
    ['Công ty TNHH Giải pháp Công nghệ 689 Cloud Solution', 'Cloud Technology', 'Nhà 8', 'data'],
    ['Công ty TNHH Công Nghệ 7TECHS', 'Technology', 'Nhà 6A', 'software'],
    ['Công ty TNHH Giải pháp Nông nghiệp và Tự Động Hóa', 'AgriTech & Automation', 'QTSC R&D Labs 1', 'data'],
    ['Công ty TNHH Giải pháp phần mềm ACS', 'Software Solutions', 'Tòa nhà SBI', 'software'],
    ['Công ty TNHH ADMS (Việt Nam)', 'Technology', 'Nhà 6A', 'software'],
    ['Công ty TNHH Phần mềm ADT', 'Software', 'Tòa nhà SBI', 'software'],
    ['Công ty TNHH Aegona', 'Software & Digital', 'QTSC Building 9', 'software'],
    ['Chi nhánh Công ty CP Giải pháp Tự động hóa Kỹ thuật Việt Nam tại TP.HCM', 'Automation', 'Tòa nhà SBI', 'data'],
    ['Công ty TNHH ALMIC INTEGRATE Việt Nam', 'System Integration', 'Tòa nhà SBI', 'software'],
    ['Công ty TNHH Thiết bị & Công nghệ Phần mềm An Phát', 'Software Technology', 'Tòa nhà Genpacific', 'software'],
    ['Công ty TNHH Anyses', 'Technology', 'Tòa nhà HOSE', 'software'],
    ['Công ty Cổ phần ASOFT', 'ERP & Enterprise Software', 'Tòa nhà JVPE', 'software', 'asoft'],
    ['Công ty TNHH Phần mềm ASV', 'Software', 'Nhà 6A', 'software'],
    ['Công ty Cổ phần Công nghệ ATALINK', 'Supply-chain Technology', 'QTSC Building 1', 'software'],
    ['Công ty Cổ phần Kỹ thuật Sản xuất AVA', 'Engineering Technology', 'Tòa nhà SBI', 'data'],
    ['Công ty TNHH Dịch vụ và Giải pháp phần mềm Bado', 'Software Services', 'Nhà 8', 'software'],
    ['Công ty TNHH Giải Pháp Tin Học Bách Khoa', 'IT Solutions', 'Nhà 8', 'software'],
    ['Công ty TNHH bbv Việt Nam', 'Software Engineering', 'Tòa nhà Anna', 'software'],
    ['Công ty TNHH Công nghệ BECAS Việt Nam', 'Technology', 'Tòa nhà SBI', 'software'],
    ['DiCentral Vietnam Co., Ltd.', 'EDI & Supply Chain', 'Helios Building', 'software'],
    ['Công ty Cổ phần MISA', 'Enterprise Platforms', 'Tòa nhà MISA', 'software'],
    ['Công ty TNHH Vietnam Concentrix Services', 'Business Services', 'QTSC Building 1', 'software'],
    ['Công TNHH MTV Trung Tâm Dữ Liệu VNG', 'Data Center', 'Tòa nhà SBI', 'data'],
    ['Công ty TNHH Phần mềm DSOFT', 'Software', 'Nhà 8', 'software'],
    ['Công ty TNHH Công nghệ phần mềm NETS', 'Software Technology', 'Tòa nhà SBI', 'software'],
    ['Công ty TNHH Giải pháp Công nghệ cao TE', 'Software & Data Processing', 'Tòa nhà SBI', 'data'],
    ['Công ty TNHH Rakus Việt Nam', 'Software Products', 'QTSC Building 9', 'software', 'rakus'],
    ['Công ty TNHH Teamwork Việt Nam', 'SAP & ERP Consulting', 'Tòa nhà Anna', 'software', 'teamwork']
  ];
  const categoryTags = { software: ['Phần mềm', 'Dịch vụ CNTT'], data: ['Dữ liệu', 'Tự động hóa'], education: ['Giáo dục', 'Đào tạo'], telecom: ['Viễn thông', 'Hạ tầng'] };
  const members = memberRows.map(([name, sector, building, category, id]) => ({
    id: id || slug(name.replace(/^(Chi nhánh )?(Công ty|Công) (TNHH MTV |TNHH |Cổ phần |CP )?/i, '')),
    name, short: '', sector, category, country: 'Việt Nam', building,
    intro: `${sector} trong hệ sinh thái QTSC.`,
    lead: `${name} là doanh nghiệp thành viên đang hoạt động tại ${building}, Khu Công viên phần mềm Quang Trung. Hồ sơ hiển thị thông tin danh bạ; năng lực chi tiết được xác nhận khi QTSC kết nối trực tiếp.`,
    tags: categoryTags[category], website: '', phone: ''
  }));

  /* ---------------------------------------------------------------- solutions */
  const solutionRows = [
    ['ASOFT-ERP', 'ASOFT', 'asoft', 'erp', 'Sản phẩm', 'Hoạch định nguồn lực doanh nghiệp'],
    ['ASOFT-CRM', 'ASOFT', 'asoft', 'erp', 'Sản phẩm', 'Quản lý quan hệ khách hàng'],
    ['ASOFT-M', 'ASOFT', 'asoft', 'erp', 'Sản phẩm', 'Quản lý sản xuất'],
    ['Khảo sát, tư vấn và triển khai hệ thống ERP', 'ASOFT', 'asoft', 'erp', 'Dịch vụ', 'Tư vấn doanh nghiệp'],
    ['Tư vấn hệ thống hóa và tự động hóa quản trị', 'ASOFT', 'asoft', 'ai', 'Dịch vụ', 'Chuyển đổi số'],
    ['Phát triển website và ứng dụng smartphone', 'Kiến Vua', null, 'cloud', 'Dịch vụ', 'Web và mobile'],
    ['Gia công phát triển phần mềm', 'Kiến Vua', null, 'cloud', 'Dịch vụ', 'Software outsourcing'],
    ['Tích hợp hệ thống ERP, CRM, eCommerce, IoT', 'Kiến Vua', null, 'cloud', 'Dịch vụ', 'Tích hợp hệ thống'],
    ['Tư vấn Công nghệ Thông tin', 'Kiến Vua', null, 'cloud', 'Dịch vụ', 'Cloud, AI, bảo mật'],
    ['Passenger Transportation Management Platform', 'Kiến Vua', null, 'ai', 'Sản phẩm', 'Công nghệ vận tải'],
    ['Schoolbus Management Platform', 'Kiến Vua', null, 'ai', 'Sản phẩm', 'Giáo dục và di chuyển'],
    ['Giải pháp kinh doanh SAP ERP', 'Teamwork Vietnam', 'teamwork', 'erp', 'Sản phẩm', 'ERP doanh nghiệp'],
    ['Global Delivery Center', 'Teamwork Vietnam', 'teamwork', 'cloud', 'Dịch vụ', 'Hỗ trợ CNTT 24/7'],
    ['Nền tảng công nghệ và Hybrid Cloud', 'Teamwork Vietnam', 'teamwork', 'cloud', 'Dịch vụ', 'Nền tảng cloud'],
    ['TW Solutions', 'Teamwork Vietnam', 'teamwork', 'erp', 'Sản phẩm', 'Năng suất và tuân thủ'],
    ['HaiHai Mail', 'Rakus Vietnam', 'rakus', 'cloud', 'Sản phẩm', 'Email tốc độ cao'],
    ['Mail Dealer', 'Rakus Vietnam', 'rakus', 'cloud', 'Sản phẩm', 'Quản lý email'],
    ['RakuRaku Hanbai', 'Rakus Vietnam', 'rakus', 'erp', 'Sản phẩm', 'Bán hàng và mua hàng'],
    ['RakuRaku Kintai', 'Rakus Vietnam', 'rakus', 'erp', 'Sản phẩm', 'Chấm công'],
    ['DIGI-XTRACT', 'DIGI-TEXX', 'digi-texx', 'ai', 'Sản phẩm', 'Xử lý tài liệu thông minh'],
    ['Chuyển đổi số và số hóa toàn diện', 'DIGI-TEXX', 'digi-texx', 'ai', 'Dịch vụ', 'Dịch vụ số'],
    ['Dịch vụ nhập và xử lý tài liệu', 'DIGI-TEXX', 'digi-texx', 'ai', 'Dịch vụ', 'Xử lý tài liệu'],
    ['Tư vấn và phát triển phần mềm', 'TMA Solutions', 'tma', 'cloud', 'Dịch vụ', 'Kỹ thuật phần mềm'],
    ['Cloud vận hành ERP Odoo', 'BIZAPPS', null, 'cloud', 'Dịch vụ', 'Cloud ERP'],
    ['BIZAPPS CRM', 'BIZAPPS', null, 'erp', 'Sản phẩm', 'Quản lý khách hàng'],
    ['BIZAPPS quản trị sản xuất', 'BIZAPPS', null, 'erp', 'Sản phẩm', 'Sản xuất'],
    ['AI chăm sóc khách hàng và bán hàng tự động trên Zalo', 'Incomsoft', null, 'ai', 'Sản phẩm', 'Tự động hóa bằng AI'],
    ['ERP, DMS, CRM doanh nghiệp', 'Incomsoft', null, 'erp', 'Sản phẩm', 'Quản trị doanh nghiệp'],
    ['Hi-MSS giám sát an toàn thông tin mạng', 'HCMC Information Security', null, 'cyber', 'Dịch vụ', 'Dịch vụ bảo mật được quản lý'],
    ['Dịch vụ điện toán đám mây', 'HCMC Information Security', null, 'cloud', 'Dịch vụ', 'Cloud'],
    ['Dịch vụ cho hệ thống nhúng', 'Hitachi Digital Services Vietnam', 'hitachi', 'cloud', 'Dịch vụ', 'Hệ thống nhúng'],
    ['Giải pháp cho ngành công nghiệp', 'Hitachi Digital Services Vietnam', 'hitachi', 'ai', 'Dịch vụ', 'Công nghiệp'],
    ['Hệ thống ERP quản lý doanh nghiệp', 'VNJ Software Solutions', null, 'erp', 'Sản phẩm', 'ERP'],
    ['Đào tạo Cloud, DevOps, An ninh mạng, Dữ liệu và AI', 'Robusta', null, 'cyber', 'Đào tạo', 'Đào tạo được ủy quyền'],
    ['Đào tạo kỹ năng số và an toàn thông tin', 'DXCenter', null, 'cyber', 'Đào tạo', 'Chuyển đổi số'],
    ['Kiểm thử phần mềm tự động', 'KMS Technology', 'kms', 'cloud', 'Dịch vụ', 'Đảm bảo chất lượng'],
    ['Nền tảng chính phủ điện tử', 'VNPT-IT', 'vnpt-it', 'cloud', 'Sản phẩm', 'Chính phủ số'],
    ['Hóa đơn điện tử và hợp đồng điện tử', 'MobiFone HCMC', 'mobifone', 'cloud', 'Sản phẩm', 'Văn phòng không giấy']
  ];
  const categoryCopy = {
    ai: { label: 'AI & dữ liệu', benefit: 'tự động hóa xử lý thông tin và hỗ trợ ra quyết định', features: ['Phân tích nhu cầu và dữ liệu đầu vào', 'Triển khai thử nghiệm trên quy trình thực', 'Đo lường hiệu quả sau triển khai'] },
    cloud: { label: 'Cloud & phát triển', benefit: 'triển khai, vận hành và mở rộng hệ thống linh hoạt', features: ['Khảo sát hiện trạng hạ tầng', 'Triển khai theo giai đoạn', 'Hỗ trợ vận hành và bảo trì'] },
    cyber: { label: 'An toàn thông tin', benefit: 'giám sát, phòng ngừa và nâng cao năng lực an toàn thông tin', features: ['Đánh giá rủi ro ban đầu', 'Giám sát và cảnh báo', 'Đào tạo và diễn tập'] },
    erp: { label: 'ERP & quản trị', benefit: 'chuẩn hóa quy trình quản trị và kết nối dữ liệu vận hành', features: ['Khảo sát quy trình nghiệp vụ', 'Cấu hình và chuyển đổi dữ liệu', 'Đào tạo người dùng cuối'] }
  };
  const solutions = solutionRows.map(([name, provider, companyId, category, type, focus], i) => ({
    id: slug(`${provider}-${name}`),
    name, provider, companyId, category, type, focus,
    summary: `${name} do ${provider} cung cấp, tập trung vào ${focus.toLowerCase()}, giúp doanh nghiệp ${categoryCopy[category].benefit}.`,
    features: categoryCopy[category].features,
    deployment: ['Cloud', 'On-premise', 'Hybrid'][i % 3],
    demo: type !== 'Đào tạo'
  }));

  /* ------------------------------------------------------------- office units */
  const units = [
    { id: 'q1-0302', building: 'QTSC Building 1', buildingKey: 'q1', floor: 3, area: 120, seats: 18, status: 'available', availableFrom: '2026-12-01', fitout: 'Hoàn thiện cơ bản', features: ['Gần sảnh dịch vụ một cửa', 'Phòng họp dùng chung', 'Cáp quang hai nhà mạng'] },
    { id: 'q1-0507', building: 'QTSC Building 1', buildingKey: 'q1', floor: 5, area: 240, seats: 36, status: 'soon', availableFrom: '2027-02-15', fitout: 'Bàn giao thô', features: ['View công viên nội khu', 'Có thể chia hai khu', 'Kết nối Data Center'] },
    { id: 'q1-0801', building: 'QTSC Building 1', buildingKey: 'q1', floor: 8, area: 65, seats: 9, status: 'available', availableFrom: '2026-11-25', fitout: 'Đầy đủ nội thất', features: ['Phù hợp nhóm khởi nghiệp', 'Dọn vào ngay', 'Dùng chung pantry'] },
    { id: 'helios-0405', building: 'Helios Building', buildingKey: 'helios', floor: 4, area: 310, seats: 48, status: 'available', availableFrom: '2026-12-15', fitout: 'Hoàn thiện cơ bản', features: ['Mặt bằng mở', 'Hai lối thoát hiểm', 'Gần bãi xe'] },
    { id: 'helios-0702', building: 'Helios Building', buildingKey: 'helios', floor: 7, area: 150, seats: 22, status: 'leased', availableFrom: '2027-06-01', fitout: 'Đầy đủ nội thất', features: ['Phòng server riêng', 'Ánh sáng tự nhiên', 'Thang máy riêng khu B'] },
    { id: 'helios-1001', building: 'Helios Building', buildingKey: 'helios', floor: 10, area: 520, seats: 80, status: 'soon', availableFrom: '2027-03-01', fitout: 'Bàn giao thô', features: ['Nguyên sàn', 'Phù hợp trung tâm R&D', 'Nguồn điện dự phòng'] },
    { id: 'sbi-0203', building: 'SBI Building', buildingKey: 'sbi', floor: 2, area: 95, seats: 14, status: 'available', availableFrom: '2026-11-20', fitout: 'Đầy đủ nội thất', features: ['Gần khu ẩm thực', 'Phòng họp 8 chỗ', 'Kiểm soát ra vào bằng thẻ'] },
    { id: 'sbi-0610', building: 'SBI Building', buildingKey: 'sbi', floor: 6, area: 180, seats: 27, status: 'available', availableFrom: '2027-01-05', fitout: 'Hoàn thiện cơ bản', features: ['Trần cao', 'Hệ thống điều hòa trung tâm', 'Cáp quang trực tiếp'] },
    { id: 'sbi-0904', building: 'SBI Building', buildingKey: 'sbi', floor: 9, area: 420, seats: 64, status: 'leased', availableFrom: '2027-09-01', fitout: 'Bàn giao thô', features: ['Nguyên sàn', 'View QL1A', 'Khu kho riêng'] },
    { id: 'anna-0301', building: 'Tòa nhà Anna', buildingKey: 'anna', floor: 3, area: 75, seats: 11, status: 'available', availableFrom: '2026-12-10', fitout: 'Đầy đủ nội thất', features: ['Phù hợp văn phòng đại diện', 'Lễ tân dùng chung', 'Gần trạm xe buýt'] },
    { id: 'anna-0602', building: 'Tòa nhà Anna', buildingKey: 'anna', floor: 6, area: 210, seats: 32, status: 'soon', availableFrom: '2027-04-01', fitout: 'Hoàn thiện cơ bản', features: ['Ban công', 'Hai phòng họp riêng', 'Kết nối MPLS'] },
    { id: 'b9-0105', building: 'QTSC Building 9', buildingKey: 'b9', floor: 1, area: 140, seats: 20, status: 'available', availableFrom: '2026-12-05', fitout: 'Hoàn thiện cơ bản', features: ['Mặt tiền tầng trệt', 'Phù hợp showroom công nghệ', 'Lối vào riêng'] }
  ];

  /* --------------------------------------------------------------------- jobs */
  const jobs = [
    { id: 'tma-bde-consultant', title: 'Business Development Executive & Consultant', company: 'TMA Solutions', companyId: 'tma', category: 'business', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-08-27', deadline: '2026-12-15',
      summary: 'Phát triển khách hàng quốc tế và tư vấn giải pháp phần mềm cho thị trường Nhật Bản, Mỹ, châu Âu.',
      duties: ['Tìm kiếm và chăm sóc khách hàng tiềm năng', 'Phối hợp nhóm kỹ thuật lập đề xuất giải pháp', 'Theo dõi pipeline và báo cáo định kỳ'],
      requirements: ['Tốt nghiệp Kinh tế, CNTT hoặc ngành liên quan', 'Tiếng Anh giao tiếp tốt', 'Kỹ năng thuyết trình và đàm phán'] },
    { id: 'digitech-sales', title: 'Nhân viên Tư vấn Bán hàng giải pháp số', company: 'QTSC DigiTech Solutions', companyId: null, category: 'business', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-08-18', deadline: '2026-12-01',
      summary: 'Tư vấn dịch vụ Data Center, cloud và an toàn thông tin cho doanh nghiệp trong và ngoài QTSC.',
      duties: ['Tư vấn dịch vụ hạ tầng số cho khách hàng', 'Phối hợp khảo sát nhu cầu kỹ thuật', 'Chuẩn bị báo giá và hồ sơ dịch vụ'],
      requirements: ['Có kinh nghiệm bán hàng B2B là lợi thế', 'Hiểu biết cơ bản về hạ tầng CNTT', 'Kỹ năng giao tiếp tốt'] },
    { id: 'tma-uxui-intern', title: 'Thực tập sinh thiết kế UX/UI', company: 'TMA Solutions', companyId: 'tma', category: 'design', type: 'Thực tập', level: 'Thực tập sinh', posted: '2026-08-18', deadline: '2026-11-30',
      summary: 'Tham gia thiết kế giao diện và nghiên cứu người dùng cho các sản phẩm phần mềm doanh nghiệp.',
      duties: ['Thiết kế wireframe và prototype', 'Hỗ trợ kiểm thử khả năng sử dụng', 'Cập nhật thư viện thành phần giao diện'],
      requirements: ['Sinh viên năm cuối ngành Thiết kế, CNTT', 'Sử dụng Figma', 'Có portfolio cá nhân'] },
    { id: 'qtsc-security-officer', title: 'Nhân viên bảo mật', company: 'QTSC', companyId: null, category: 'operations', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-08-18', deadline: '2026-11-28',
      summary: 'Đảm bảo an ninh, trật tự và an toàn cho khu vực tòa nhà và campus QTSC.',
      duties: ['Tuần tra và kiểm soát ra vào', 'Phối hợp xử lý tình huống khẩn cấp', 'Ghi nhận và báo cáo sự việc'],
      requirements: ['Sức khỏe tốt', 'Sẵn sàng làm việc theo ca', 'Ưu tiên có kinh nghiệm bảo vệ tòa nhà'] },
    { id: 'tma-automation-tester', title: 'Automation Tester Fresher', company: 'TMA Solutions', companyId: 'tma', category: 'engineering', type: 'Toàn thời gian', level: 'Fresher', posted: '2026-06-30', deadline: '2026-12-20',
      summary: 'Xây dựng và duy trì bộ kiểm thử tự động cho các dự án phần mềm quốc tế.',
      duties: ['Viết kịch bản kiểm thử tự động', 'Phân tích kết quả và báo lỗi', 'Phối hợp đội phát triển cải thiện chất lượng'],
      requirements: ['Kiến thức lập trình Java hoặc Python', 'Hiểu quy trình kiểm thử phần mềm', 'Tiếng Anh đọc hiểu tài liệu'] },
    { id: 'digitech-system-engineer', title: 'Nhân viên Kỹ thuật hệ thống (System)', company: 'Trung tâm Công nghệ số QTSC', companyId: null, category: 'engineering', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-06-26', deadline: '2026-12-10',
      summary: 'Vận hành hệ thống máy chủ, ảo hóa và hạ tầng Data Center của QTSC.',
      duties: ['Giám sát và vận hành hệ thống máy chủ', 'Triển khai, sao lưu và phục hồi dữ liệu', 'Xử lý sự cố theo quy trình'],
      requirements: ['Tốt nghiệp CNTT, Mạng máy tính', 'Hiểu biết Linux, Windows Server, ảo hóa', 'Chứng chỉ CCNA, LPI là lợi thế'] },
    { id: 'tma-telecom-cpp', title: 'Telecom C/C++ Software Developer', company: 'TMA Solutions', companyId: 'tma', category: 'engineering', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-06-25', deadline: '2026-12-31',
      summary: 'Phát triển phần mềm viễn thông bằng C/C++ cho khách hàng quốc tế.',
      duties: ['Phát triển và tối ưu module viễn thông', 'Viết unit test và tài liệu kỹ thuật', 'Tham gia review mã nguồn'],
      requirements: ['Thành thạo C/C++', 'Hiểu biết giao thức mạng', 'Ưu tiên có kinh nghiệm hệ thống nhúng'] },
    { id: 'rakus-php-java', title: 'Lập trình viên PHP và Java', company: 'Rakus Việt Nam', companyId: 'rakus', category: 'engineering', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-06-23', deadline: '2026-12-05',
      summary: 'Phát triển các sản phẩm SaaS cho thị trường Nhật Bản.',
      duties: ['Phát triển tính năng mới cho sản phẩm SaaS', 'Bảo trì và cải thiện hiệu năng', 'Phối hợp nhóm Nhật Bản'],
      requirements: ['Từ 1 năm kinh nghiệm PHP hoặc Java', 'Hiểu biết cơ sở dữ liệu SQL', 'Tiếng Nhật là lợi thế'] },
    { id: 'kms-data-engineer', title: 'Data Engineer', company: 'KMS Technology', companyId: 'kms', category: 'engineering', type: 'Toàn thời gian', level: 'Senior', posted: '2026-10-20', deadline: '2027-01-15',
      summary: 'Thiết kế pipeline dữ liệu và nền tảng phân tích cho khách hàng Bắc Mỹ.',
      duties: ['Xây dựng pipeline ETL', 'Tối ưu kho dữ liệu', 'Đảm bảo chất lượng dữ liệu'],
      requirements: ['Từ 3 năm kinh nghiệm kỹ thuật dữ liệu', 'Thành thạo SQL, Python', 'Kinh nghiệm cloud AWS hoặc Azure'] },
    { id: 'qtsc-edu-trainer', title: 'Giảng viên an ninh mạng (bán thời gian)', company: 'QTSC Education Center', companyId: 'qtsc-edu', category: 'education', type: 'Bán thời gian', level: 'Chuyên gia', posted: '2026-10-05', deadline: '2026-12-20',
      summary: 'Giảng dạy các học phần thực hành an ninh mạng cho sinh viên và nhân sự doanh nghiệp.',
      duties: ['Giảng dạy theo giáo trình', 'Hướng dẫn bài thực hành', 'Đánh giá kết quả học viên'],
      requirements: ['Từ 3 năm kinh nghiệm an ninh mạng', 'Chứng chỉ chuyên môn liên quan', 'Kỹ năng sư phạm'] },
    { id: 'hitachi-embedded', title: 'Embedded Software Engineer', company: 'Hitachi Digital Services Vietnam', companyId: 'hitachi', category: 'engineering', type: 'Toàn thời gian', level: 'Nhân viên', posted: '2026-09-12', deadline: '2026-12-31',
      summary: 'Phát triển phần mềm nhúng cho thiết bị công nghiệp.',
      duties: ['Phát triển firmware', 'Kiểm thử trên phần cứng thật', 'Viết tài liệu thiết kế'],
      requirements: ['Thành thạo C', 'Hiểu vi điều khiển', 'Tiếng Anh hoặc tiếng Nhật đọc hiểu'] }
  ];

  /* ----------------------------------------------------------------- articles */
  const articleRows = [
    ['news', '2026-08-25', 'QTSC giới thiệu giải pháp công nghệ và an ninh mạng tại Hội thảo Chuyển đổi số của Quân khu 7 năm 2026', 'https://www.qtsc.com.vn/tin-tuc/qtsc-gioi-thieu-giai-phap-cong-nghe-va-an-ninh-mang-tai-hoi-thao-chuyen-doi-so-cua-quan-khu-7-nam-2026', true],
    ['member', '2026-08-25', 'Tập đoàn Sunwah cùng đoàn doanh nghiệp Trung Quốc tìm hiểu hệ sinh thái công nghệ số và cơ hội hợp tác tại QTSC', 'https://www.qtsc.com.vn/tin-tuc/tap-doan-doanh-nghiep-sunwah-cung-doan-doanh-nghiep-trung-quoc-tim-hieu-he-sinh-thai-cong-nghe-so-va-co-hoi-hop-tac-tai-qtsc'],
    ['event', '2026-08-21', 'Sinh viên Trường Đại học FPT Greenwich Việt Nam tìm hiểu môi trường làm việc và định hướng nghề nghiệp tại QTSC', 'https://www.qtsc.com.vn/tin-qtsc'],
    ['industry', '2026-08-16', 'QTSC tiếp tục đồng hành cùng VINASA trong nhiệm kỳ 2026–2031, thúc đẩy phát triển ngành công nghệ số Việt Nam', 'https://www.qtsc.com.vn/tin-tuc/qtsc-tiep-tuc-dong-hanh-cung-vinasa-trong-nhiem-ky-2026-2031-thuc-day-phat-trien-nganh-cong-nghe-so-viet-nam'],
    ['news', '2026-08-12', 'Hơn 300 người tham gia hiến máu tình nguyện tại QTSC', 'https://www.qtsc.com.vn/tin-tuc/hon-300-nguoi-tham-gia-hien-mau-tinh-nguyen-tai-qtsc'],
    ['industry', '2026-08-11', 'QTSC đồng hành cùng Câu lạc bộ Niềm Tin Số TP.HCM xây dựng môi trường số an toàn, văn minh', 'https://www.qtsc.com.vn/tin-tuc/qtsc-dong-hanh-cung-cau-lac-bo-niem-tin-so-tphcm-xay-dung-moi-truong-so-an-toan-van-minh'],
    ['investment', '2026-08-05', 'QTSC đón tiếp đoàn S.M.A.R.T Entrepreneurship X Global, thúc đẩy kết nối hợp tác công nghệ Việt Nam – Singapore', 'https://www.qtsc.com.vn/tin-qtsc'],
    ['news', '2026-08-03', 'QTSC đồng hành cùng Đoàn phường Trung Mỹ Tây tổ chức Hành trình “Chuyển đổi số – Chuyển động xanh” năm 2026', 'https://www.qtsc.com.vn/tin-qtsc'],
    ['dxcenter', '2026-07-22', 'Hội thảo “AI và Chủ quyền dữ liệu trong kỷ nguyên số”', 'https://www.qtsc.com.vn/tin-dxcenter'],
    ['industry', '2026-07-21', 'QTSC phối hợp tổ chức Diễn đàn Hợp tác Việt Nam – Singapore về Công nghiệp Bán dẫn năm 2026', 'https://www.qtsc.com.vn/tin-tuc/qtsc-phoi-hop-to-chuc-dien-dan-hop-tac-viet-nam-singapore-ve-cong-nghiep-ban-dan-nam-2026'],
    ['dxcenter', '2026-07-16', 'Mời tham gia Hội thảo AI và chủ quyền dữ liệu trong kỷ nguyên số', 'https://www.qtsc.com.vn/tin-dxcenter'],
    ['solution', '2026-06-26', 'QTSC tham gia Vietnam ICTCOMM 2026, giới thiệu giải pháp công nghệ số và thúc đẩy kết nối hợp tác quốc tế', 'https://www.qtsc.com.vn/tin-tuc/qtsc-tham-gia-vietnam-ictcomm-2026-gioi-thieu-giai-phap-cong-nghe-so-va-thuc-day-ket-noi-hop-tac-quoc-te'],
    ['career', '2026-06-30', 'TMA tuyển dụng Automation Tester Fresher', 'https://www.qtsc.com.vn/tin-tuyen-dung', false, 'tma-automation-tester'],
    ['career', '2026-06-26', 'Trung tâm Công nghệ số QTSC tuyển dụng Nhân viên Kỹ thuật hệ thống, Bộ phận System', 'https://www.qtsc.com.vn/tin-tuyen-dung', false, 'digitech-system-engineer'],
    ['career', '2026-06-25', 'TMA tuyển dụng Telecom C/C++ Software Developer', 'https://www.qtsc.com.vn/tin-tuyen-dung', false, 'tma-telecom-cpp'],
    ['career', '2026-06-23', 'Rakus tuyển dụng vị trí PHP và JAVA', 'https://www.qtsc.com.vn/tin-tuyen-dung', false, 'rakus-php-java'],
    ['event', '2026-05-30', 'Thông cáo báo chí Hội thi Thử thách Trí tuệ nhân tạo (AI Challenge) TP.HCM năm 2026', 'https://www.qtsc.com.vn/tin-tuc/thong-cao-bao-chi-hoi-thi-thu-thach-tri-tue-nhan-tao-ai-challenge-thanh-pho-ho-chi-minh-nam-2026'],
    ['solution', '2026-05-13', 'QTSC đồng hành cùng sự kiện Biztech 2026 và Hội thảo An ninh mạng trong kỷ nguyên AI', 'https://www.qtsc.com.vn/san-pham-giai-phap'],
    ['event', '2026-04-23', 'Mời tham gia Chương trình tăng tốc khởi nghiệp quốc tế Sber500', 'https://www.qtsc.com.vn/tin-su-kien'],
    ['dxcenter', '2026-04-23', 'Hội thảo “Ứng dụng AI và dữ liệu thực tiễn trong nghiên cứu và phát triển sản phẩm thực phẩm”', 'https://www.qtsc.com.vn/tin-dxcenter'],
    ['event', '2026-03-31', 'BIZTECH 2026, Hội nghị và Triển lãm B2B Chuyển đổi số dành cho Doanh nghiệp', 'https://www.qtsc.com.vn/tin-su-kien'],
    ['investment', '2026-03-27', 'Khu công nghiệp sinh thái (EIP), nền tảng thu hút đầu tư và tham gia chuỗi cung ứng toàn cầu', 'https://www.qtsc.com.vn/tin-dxcenter'],
    ['investment', '2026-03-23', 'Mời tham dự Hội thảo Khu công nghiệp sinh thái (EIP) của TP.HCM', 'https://www.qtsc.com.vn/tin-dxcenter']
  ];
  const articleCategories = { news: 'Tin QTSC', member: 'Tin doanh nghiệp', event: 'Sự kiện', career: 'Tuyển dụng', dxcenter: 'DXCenter', solution: 'Sản phẩm & Giải pháp', industry: 'Tin chuyên ngành', investment: 'Mời gọi đầu tư' };
  const articleLead = {
    news: 'Hoạt động mới của QTSC trong vai trò đơn vị phát triển và vận hành Khu Công viên phần mềm Quang Trung.',
    member: 'Cập nhật từ cộng đồng doanh nghiệp và đối tác trong hệ sinh thái QTSC.',
    event: 'Sự kiện dành cho doanh nghiệp, sinh viên và cộng đồng công nghệ tại QTSC.',
    career: 'Cơ hội nghề nghiệp từ QTSC và doanh nghiệp thành viên.',
    dxcenter: 'Chương trình của DXCenter về chuyển đổi số, AI và dữ liệu.',
    solution: 'Giải pháp công nghệ số được QTSC và đối tác giới thiệu.',
    industry: 'Thông tin chuyên ngành công nghệ số có sự tham gia của QTSC.',
    investment: 'Thông tin kết nối đầu tư và hợp tác tại QTSC.'
  };
  const articles = articleRows.map(([cat, date, title, source, featured, jobId]) => ({
    id: slug(title), cat, date, title, source, featured: !!featured, jobId: jobId || null,
    summary: `${articleLead[cat]} ${title}.`,
    body: [
      `${title}. ${articleLead[cat]}`,
      'Trang này hiển thị bản tóm tắt để người đọc nắm bối cảnh và đi tiếp tới doanh nghiệp, giải pháp hoặc dịch vụ liên quan trong hệ sinh thái.',
      'Toàn văn, hình ảnh và thông tin chính thức được QTSC đăng tại nguồn gốc của bài viết.'
    ]
  }));

  /* ---------------------------------------------------------------- resources */
  const resources = [
    { id: 'qtsc-a-guide-2023', cat: 'corporate', title: 'QTSC A Guide 2023', format: 'PDF', kind: 'external', updated: '2023-10-03', desc: 'Tổng quan QTSC, dịch vụ, hệ sinh thái, DXCenter và các năng lực hỗ trợ doanh nghiệp.', url: 'https://www.qtsc.com.vn/uploads/files/2023/10/03/QTSC_A-GUIDE-2023_AW.pdf' },
    { id: 'presentation-enterprises', cat: 'corporate', title: 'Presentation for Enterprises', format: 'PDF', kind: 'external', updated: '2023-05-29', desc: 'Tài liệu giới thiệu QTSC dành cho doanh nghiệp và nhà đầu tư.', url: 'https://www.qtsc.com.vn/uploads/files/2023/05/29/QTSC_Presentation_for-enterprises_V_29.05.2023.pdf' },
    { id: 'qtsc-introduction', cat: 'corporate', title: 'QTSC Introduction', format: 'PDF', kind: 'external', updated: '2022-10-31', desc: 'Hồ sơ giới thiệu thương hiệu và hệ sinh thái Quality Tech Solution Complex.', url: 'https://www.qtsc.com.vn/uploads/files/2022/10/31/QTSC_Introduction_2022-v2.pdf' },
    { id: 'utility-services-map', cat: 'campus', title: 'Utility Services Map', format: 'PDF', kind: 'external', updated: '2022-08-12', desc: 'Bản đồ định vị dịch vụ và tiện ích trong Khu Công viên phần mềm Quang Trung.', url: 'https://www.qtsc.com.vn/uploads/files/2022/08/12/BAN-DO-DINH-VI-DICH-VU-2022_final_small.pdf' },
    { id: 'campus-map-svg', cat: 'campus', title: 'Sơ đồ campus QTSC (SVG)', format: 'SVG', kind: 'file', updated: '2026-08-30', desc: 'Sơ đồ khối campus dùng trong trang Khám phá, lưu trong website.', url: 'assets/images/campus-map.svg', file: 'qtsc-campus-map.svg' },
    { id: 'so-tay-van-hoa', cat: 'culture', title: 'Sổ tay Văn hóa QTSC', format: 'PDF', kind: 'external', updated: '2025-07-14', desc: 'Tài liệu văn hóa doanh nghiệp và chuẩn mực hành vi của QTSC.', url: 'https://www.qtsc.com.vn/uploads/files/2025/07/14/So-tay-van-hoa-QTSC.pdf' },
    { id: 'chinh-sach-qtsc', cat: 'legal', title: 'Chính sách QTSC', format: 'Web', kind: 'external', updated: '2026-07-02', desc: 'Chính sách bảo vệ dữ liệu cá nhân và bảo vệ thông tin người tiêu dùng trên website QTSC chính thức.', url: 'https://www.qtsc.com.vn/chinh-sach' },
    { id: 'van-ban-phap-luat', cat: 'legal', title: 'Văn bản pháp luật', format: 'Web', kind: 'external', updated: '2026-07-02', desc: 'Truy cập các nhóm văn bản liên quan đến QTSC và ngành công nghệ thông tin.', url: 'https://www.qtsc.com.vn/' },
    { id: 'office-checklist', cat: 'business', title: 'Checklist chuẩn bị thuê văn phòng', format: 'TXT', kind: 'generated', updated: '2026-11-01', desc: 'Danh sách thông tin nên chuẩn bị trước khi khảo sát văn phòng. Tệp mẫu do trình duyệt tạo.', file: 'qtsc-checklist-thue-van-phong-TEP-MAU.txt' },
    { id: 'investment-brief', cat: 'business', title: 'Phiếu thông tin dự án đầu tư', format: 'CSV', kind: 'generated', updated: '2026-11-01', desc: 'Khung thông tin dự án để trao đổi với QTSC về đầu tư và chính sách. Tệp mẫu do trình duyệt tạo.', file: 'qtsc-phieu-thong-tin-du-an-TEP-MAU.csv' },
    { id: 'site-visit-guide', cat: 'campus', title: 'Hướng dẫn tham quan campus', format: 'TXT', kind: 'generated', updated: '2026-11-01', desc: 'Điểm hẹn, gửi xe và lưu ý khi đến tham quan. Tệp mẫu do trình duyệt tạo.', file: 'qtsc-huong-dan-tham-quan-TEP-MAU.txt' }
  ];
  const resourceCategories = { corporate: 'Doanh nghiệp', campus: 'Campus', culture: 'Văn hóa', legal: 'Pháp lý', business: 'Biểu mẫu' };

  /* ---------------------------------------------------------------- open data */
  const datasetDefs = [
    { id: 'nuoc-thai', group: 'water', title: 'Quản lý nước thải', source: 'https://www.qtsc.com.vn/du-lieu-mo/quan-ly-nuoc-thai', stations: ['Trạm XLNT tập trung', 'Cửa xả số 1'], params: [['COD', 'mg/L', 150, 38], ['BOD5', 'mg/L', 50, 14], ['pH', '', 9, 7.2], ['TSS', 'mg/L', 100, 22]] },
    { id: 'nuoc-cap', group: 'water', title: 'Quản lý nước cấp', source: 'https://www.qtsc.com.vn/du-lieu-mo/quan-ly-nuoc-cap', stations: ['Bể chứa trung tâm', 'Tòa nhà SBI'], params: [['pH', '', 8.5, 7.1], ['Độ đục', 'NTU', 2, 0.6], ['Clo dư', 'mg/L', 1, 0.4]] },
    { id: 'khong-khi', group: 'air', title: 'Quan trắc không khí', source: 'https://www.qtsc.com.vn/du-lieu-mo/quan-trac-khong-khi', stations: ['Công viên trung tâm', 'Cổng chính'], params: [['PM2.5', 'µg/m³', 50, 24], ['PM10', 'µg/m³', 100, 41], ['NO2', 'µg/m³', 200, 36]] },
    { id: 'nuoc-ngam', group: 'water', title: 'Quản lý nước ngầm', source: 'https://www.qtsc.com.vn/du-lieu-mo/quan-ly-nuoc-ngam', stations: ['Giếng quan trắc G1', 'Giếng quan trắc G2'], params: [['pH', '', 8.5, 6.4], ['Sắt tổng', 'mg/L', 5, 1.1]] },
    { id: 'khong-khi-ql1a', group: 'air', title: 'Không khí QL1A', source: 'https://www.qtsc.com.vn/du-lieu-mo/quan-ly-khong-khi-ql1a', stations: ['Điểm đo QL1A'], params: [['PM2.5', 'µg/m³', 50, 31], ['CO', 'mg/m³', 30, 4.2]] },
    { id: 'nuoc-mat', group: 'water', title: 'Nước mặt loại A', source: 'https://www.qtsc.com.vn/du-lieu-mo/quan-ly-nuoc-mat-loai-a', stations: ['Hồ điều hòa'], params: [['DO', 'mg/L', 6, 6.8], ['COD', 'mg/L', 10, 7.4]] },
    { id: 'pasteur', group: 'testing', title: 'Kết quả xét nghiệm Pasteur', source: 'https://www.qtsc.com.vn/download', stations: ['Mẫu nước uống tòa nhà'], params: [['Coliform', 'CFU/100mL', 3, 0], ['E. coli', 'CFU/100mL', 1, 0]] }
  ];
  const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];
  let rng = 20260831;
  const rand = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
  const readings = [];
  datasetDefs.forEach(d => d.stations.forEach(station => months.forEach(month => d.params.forEach(([param, unit, limit, base]) => {
    const jitter = base === 0 ? 0 : base * (0.8 + rand() * 0.4);
    const value = Math.round(jitter * 10) / 10;
    readings.push({ dataset: d.id, station, month, param, unit, value, limit });
  }))));
  const datasets = datasetDefs.map(({ params, ...rest }) => ({ ...rest, params: params.map(p => p[0]) }));

  /* ------------------------------------------------------------ incentives */
  const incentiveSectors = [
    { id: 'software', label: 'Sản xuất phần mềm, sản phẩm số' },
    { id: 'digital-content', label: 'Nội dung số' },
    { id: 'it-services', label: 'Dịch vụ CNTT, gia công phần mềm' },
    { id: 'rnd', label: 'Nghiên cứu và phát triển (R&D)' },
    { id: 'semiconductor-ai', label: 'Bán dẫn, AI, dữ liệu lớn' },
    { id: 'training', label: 'Đào tạo nguồn nhân lực số' },
    { id: 'datacenter', label: 'Data Center, cloud' },
    { id: 'other', label: 'Lĩnh vực khác' }
  ];
  const incentiveGroups = [
    { id: 'cit', title: 'Ưu đãi thuế thu nhập doanh nghiệp theo lĩnh vực', sectors: ['software', 'digital-content', 'semiconductor-ai', 'rnd'], note: 'Áp dụng theo lĩnh vực và điều kiện của dự án; mức và thời hạn được cơ quan thuế xác định.' },
    { id: 'land', title: 'Ưu đãi liên quan đến thuê đất, mặt bằng', sectors: ['software', 'semiconductor-ai', 'rnd', 'datacenter'], minCapital: 20, note: 'Thường gắn với dự án đầu tư có sử dụng đất; văn phòng thuê trong tòa nhà xem xét theo hợp đồng thuê.' },
    { id: 'import', title: 'Miễn thuế nhập khẩu hàng hóa tạo tài sản cố định', sectors: ['semiconductor-ai', 'rnd', 'datacenter'], minCapital: 50, note: 'Áp dụng cho danh mục hàng hóa đủ điều kiện theo hồ sơ dự án.' },
    { id: 'rnd-support', title: 'Hỗ trợ hoạt động nghiên cứu, đổi mới sáng tạo', sectors: ['rnd', 'semiconductor-ai', 'software'], requiresRnd: true, note: 'Kết nối với DXCenter, R&D Labs và các chương trình hỗ trợ của TP.HCM.' },
    { id: 'hr', title: 'Hỗ trợ đào tạo, phát triển nguồn nhân lực', sectors: ['training', 'software', 'it-services', 'semiconductor-ai'], note: 'Kết hợp chương trình đào tạo của QTSC và đối tác giáo dục trong khu.' },
    { id: 'one-stop', title: 'Dịch vụ một cửa và hỗ trợ thủ tục', sectors: incentiveSectors.map(s => s.id), note: 'Hỗ trợ thủ tục đầu tư, giấy phép lao động, visa và kết nối dịch vụ trong khu.' }
  ];

  /* --------------------------------------------------------------- user seed */
  const initialUser = {
    bookings: [
      { id: 'BK-26A1F3', unitId: 'helios-0405', date: '2026-11-24', time: '09:30', name: 'Nguyễn Minh Anh', email: 'minhanh@example.com', phone: '0901234567', people: 3, note: 'Muốn xem phương án chia khu R&D.', status: 'confirmed', createdAt: '2026-11-10T08:00:00.000Z' }
    ],
    applications: [
      { id: 'AP-26B7C2', jobId: 'tma-automation-tester', name: 'Nguyễn Minh Anh', email: 'minhanh@example.com', phone: '0901234567', cvName: 'NguyenMinhAnh-CV.pdf', letter: 'Tôi quan tâm đến kiểm thử tự động.', status: 'submitted', createdAt: '2026-11-08T03:15:00.000Z' }
    ],
    enquiries: [],
    demoRequests: [],
    contacts: [],
    newsletter: null
  };

  window.QTSC_SEED = Object.freeze({
    version: '2026-11-13.1',
    companies: [...featuredCompanies, ...members],
    companyCategories: { software: 'Software', data: 'Data & AI', education: 'Education', telecom: 'Telecom' },
    solutions,
    solutionCategories: Object.fromEntries(Object.entries(categoryCopy).map(([k, v]) => [k, v.label])),
    units,
    unitStatus: { available: 'Còn trống', soon: 'Sắp trống', leased: 'Đã cho thuê' },
    visitSlots: ['08:30', '09:30', '10:30', '14:00', '15:00', '16:00'],
    jobs,
    jobCategories: { engineering: 'Kỹ thuật', business: 'Kinh doanh', design: 'Thiết kế', operations: 'Vận hành', education: 'Đào tạo' },
    articles,
    articleCategories,
    resources,
    resourceCategories,
    datasets,
    datasetGroups: { water: 'Nước', air: 'Không khí', testing: 'Xét nghiệm' },
    readings,
    incentiveSectors,
    incentiveGroups,
    newsletterTopics: { updates: 'Tin QTSC', events: 'Sự kiện', careers: 'Tuyển dụng', legal: 'Môi trường pháp lý', investment: 'Đầu tư & hợp tác' },
    initialUser
  });
})();
