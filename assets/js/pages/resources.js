/** Download Center: search (?q=), category (?cat=) and format filters over the
 * seed resources. Official files open from qtsc.com.vn, repository files
 * download directly, and "Tệp mẫu" files are generated in the browser. */
(() => {
  const { $, $$, esc, fmtDate, download, csv, toast } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;
  if (!$('#resourceGrid')) return;

  const stamp = () => `Tạo lúc ${new Date().toLocaleString('vi-VN')} từ website QTSC (bản prototype). TỆP MẪU, không phải văn bản chính thức.`;
  const generators = {
    'office-checklist': () => [
      'CHECKLIST CHUẨN BỊ THUÊ VĂN PHÒNG TẠI QTSC (TỆP MẪU)', stamp(), '',
      '1. Quy mô: số nhân sự hiện tại và dự kiến 12 tháng tới.',
      '2. Diện tích mong muốn (m²) và nhu cầu phòng họp riêng.',
      '3. Thời điểm cần dọn vào.',
      '4. Hạ tầng: băng thông, kết nối Data Center, phòng server.',
      '5. Tiện ích: bãi xe, ăn uống, an ninh ra vào.',
      '6. Đầu mối liên hệ và thời gian có thể khảo sát.', '',
      'Đặt lịch khảo sát: office.html#units'
    ].join('\r\n'),
    'investment-brief': () => csv([
      ['Mục', 'Thông tin của dự án', 'Ghi chú'],
      ['Tên doanh nghiệp', '', ''], ['Lĩnh vực đầu tư', '', 'Phần mềm, nội dung số, R&D, bán dẫn, AI...'],
      ['Tổng vốn dự kiến (tỷ đồng)', '', ''], ['Số lao động dự kiến', '', ''], ['Tỷ lệ chi phí R&D (%)', '', ''],
      ['Nhu cầu mặt bằng (m²)', '', ''], ['Thời điểm triển khai', '', ''],
      ['Ghi chú', 'TỆP MẪU do website tạo', stamp()]
    ]),
    'site-visit-guide': () => [
      'HƯỚNG DẪN THAM QUAN CAMPUS QTSC (TỆP MẪU)', stamp(), '',
      'Điểm hẹn: sảnh QTSC Building 1, Khu Công viên phần mềm Quang Trung, Phường Trung Mỹ Tây, TP.HCM.',
      'Gửi xe: bãi xe khách phía trước QTSC Building 1.',
      'Mang theo: giấy tờ tùy thân để đăng ký ra vào.',
      'Thời gian: thứ Hai đến thứ Bảy, theo khung giờ đã đặt.',
      'Liên hệ: (84-28) 3715 8888, qtsc@qtsc.com.vn'
    ].join('\r\n')
  };

  const action = r => {
    if (r.kind === 'external') return `<a class="resource-action" href="${esc(r.url)}" target="_blank" rel="noopener">Mở tài liệu gốc (${esc(r.format)}) ↗</a>`;
    if (r.kind === 'file') return `<a class="resource-action" href="${esc(r.url)}" download="${esc(r.file)}">Tải xuống (${esc(r.format)})</a>`;
    return `<button type="button" class="resource-action" data-generate="${esc(r.id)}">Tải tệp mẫu (${esc(r.format)})</button>`;
  };
  const render = r => `<article class="resource-card" data-category="${r.cat}" data-resource="${esc(r.id)}"><span>${esc(r.format)}, ${esc(seed.resourceCategories[r.cat])}${r.kind === 'generated' ? ', tệp mẫu' : ''}</span><h2>${esc(r.title)}</h2><p>${esc(r.desc)}</p><p class="resource-updated">Cập nhật ${esc(fmtDate(r.updated))}</p>${action(r)}</article>`;

  createListing({
    results: $('#resourceGrid'), pagerEl: $('#resourcePager'), metaEl: $('#resourceMeta'), search: $('#resourceSearch'), perPage: 8, label: 'tài liệu',
    load: () => seed.resources,
    text: r => `${r.title} ${r.desc} ${r.format} ${seed.resourceCategories[r.cat]}`,
    filters: [
      { param: 'cat', control: pillControl($('#resourceFilters')), match: (r, v) => r.cat === v },
      { param: 'format', control: fieldControl($('#resourceFormat')), match: (r, v) => r.format === v }
    ],
    emptyCopy: { title: 'Không tìm thấy tài liệu phù hợp.', text: 'Thử từ khóa khác hoặc gửi yêu cầu tài liệu cho QTSC.' },
    render,
    afterRender: (slice, root) => $$('[data-generate]', root).forEach(button => button.addEventListener('click', () => {
      const r = seed.resources.find(x => x.id === button.dataset.generate);
      button.disabled = true; button.textContent = 'Đang tạo tệp…';
      store.request(() => generators[r.id](), { delay: 300 }).then(content => {
        download(r.file, content, r.format === 'CSV' ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8');
        toast(`Đã tạo ${r.file}. Đây là tệp mẫu, không phải văn bản chính thức.`);
      }).catch(error => toast(`Chưa tạo được tệp: ${error.message}`)).finally(() => { button.disabled = false; button.textContent = `Tải tệp mẫu (${r.format})`; });
    }))
  });
})();
