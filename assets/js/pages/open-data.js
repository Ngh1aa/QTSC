/** Open data explorer: dataset, station, parameter, month range and threshold
 * filters over seed readings, paginated table and CSV export of the filtered rows. */
(() => {
  const { $, esc, download, csv, toast } = window.QTSCUI;
  const { createListing, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;
  const results = $('#odResults');
  if (!results) return;
  const minIsGood = new Set(['DO']);
  const over = r => (minIsGood.has(r.param) ? r.value < r.limit : r.value > r.limit);
  const titleOf = id => seed.datasets.find(d => d.id === id)?.title || id;
  const monthLabel = m => `${m.slice(5)}/${m.slice(0, 4)}`;

  const datasetSel = $('#odDataset');
  const stationSel = $('#odStation');
  const paramSel = $('#odParam');
  seed.datasets.forEach(d => datasetSel.insertAdjacentHTML('beforeend', `<option value="${d.id}">${esc(d.title)}</option>`));
  const fillDependent = () => {
    const ds = datasetSel.value;
    const rows = seed.readings.filter(r => !ds || r.dataset === ds);
    const keepStation = stationSel.value; const keepParam = paramSel.value;
    const stations = [...new Set(rows.map(r => r.station))];
    const params = [...new Set(rows.map(r => r.param))];
    stationSel.innerHTML = '<option value="">Tất cả điểm đo</option>' + stations.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
    paramSel.innerHTML = '<option value="">Tất cả thông số</option>' + params.map(p => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
    if (stations.includes(keepStation)) stationSel.value = keepStation;
    if (params.includes(keepParam)) paramSel.value = keepParam;
  };
  const initial = new URLSearchParams(location.search);
  datasetSel.value = initial.get('dataset') || '';
  fillDependent();
  datasetSel.addEventListener('change', fillDependent);

  const table = rows => `<div class="proto-table-wrap" tabindex="0" role="region" aria-label="Bảng số liệu quan trắc"><table class="proto-table"><caption>Mỗi dòng là giá trị trung bình tháng tại một điểm đo.</caption><thead><tr><th scope="col">Tháng</th><th scope="col">Nhóm dữ liệu</th><th scope="col">Điểm đo</th><th scope="col">Thông số</th><th scope="col">Giá trị</th><th scope="col">Ngưỡng</th><th scope="col">Đánh giá</th></tr></thead><tbody>`
    + rows.map(r => `<tr><td>${monthLabel(r.month)}</td><td>${esc(titleOf(r.dataset))}</td><td>${esc(r.station)}</td><td>${esc(r.param)}</td><td class="num">${r.value.toLocaleString('vi-VN')} ${esc(r.unit)}</td><td class="num">${minIsGood.has(r.param) ? '≥' : '≤'} ${r.limit.toLocaleString('vi-VN')}</td><td>${over(r) ? '<span class="badge is-error">Vượt ngưỡng</span>' : '<span class="badge is-ok">Trong ngưỡng</span>'}</td></tr>`).join('')
    + '</tbody></table></div>';

  const listing = createListing({
    results, pagerEl: $('#odPager'), metaEl: $('#odMeta'), perPage: 12, label: 'dòng số liệu',
    load: () => seed.readings,
    text: r => `${r.station} ${r.param}`,
    filters: [
      { param: 'dataset', control: fieldControl(datasetSel), match: (r, v) => r.dataset === v },
      { param: 'station', control: fieldControl(stationSel), match: (r, v) => r.station === v },
      { param: 'param', control: fieldControl(paramSel), match: (r, v) => r.param === v },
      { param: 'from', control: fieldControl($('#odFrom')), match: (r, v) => r.month >= v },
      { param: 'to', control: fieldControl($('#odTo')), match: (r, v) => r.month <= v },
      { param: 'status', control: fieldControl($('#odStatus')), match: (r, v) => (v === 'over' ? over(r) : !over(r)) }
    ],
    emptyCopy: { title: 'Không có số liệu trong phạm vi đã chọn.', text: 'Mở rộng khoảng thời gian hoặc chọn điểm đo khác.' },
    renderList: table
  });

  $('#odExport').addEventListener('click', () => {
    const rows = listing.filtered();
    if (!rows) { toast('Dữ liệu chưa tải xong, vui lòng thử lại sau giây lát.'); return; }
    if (!rows.length) { toast('Không có dòng nào để xuất. Hãy nới bộ lọc.'); return; }
    const button = $('#odExport');
    button.disabled = true; button.textContent = 'Đang tạo CSV…';
    store.request(() => csv([
      ['thang', 'nhom_du_lieu', 'diem_do', 'thong_so', 'gia_tri', 'don_vi', 'nguong', 'danh_gia', 'ghi_chu'],
      ...rows.map(r => [r.month, titleOf(r.dataset), r.station, r.param, r.value, r.unit, r.limit, over(r) ? 'vuot_nguong' : 'trong_nguong', 'gia tri mo phong, khong phai so lieu chinh thuc'])
    ]), { delay: 300 }).then(content => {
      download(`qtsc-du-lieu-mo-${new Date().toISOString().slice(0, 10)}.csv`, content, 'text/csv;charset=utf-8');
      toast(`Đã xuất ${rows.length} dòng ra tệp CSV.`);
    }).catch(error => toast(`Chưa xuất được CSV: ${error.message}`)).finally(() => { button.disabled = false; button.textContent = 'Xuất CSV'; });
  });
})();
