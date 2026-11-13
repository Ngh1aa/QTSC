/** Companies directory: search, sector pills, building filter, sort, pagination,
 * URL state (?q=&sector=&building=&sort=&page=) and loading/empty/error states. */
(() => {
  const { $, esc } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const seed = window.QTSCStore.seed;
  const results = $('#companyResults');
  if (!results) return;

  const buildingSelect = $('#companyBuilding');
  const buildings = [...new Set(seed.companies.map(c => c.building))].sort((a, b) => a.localeCompare(b, 'vi'));
  buildingSelect.insertAdjacentHTML('beforeend', buildings.map(b => `<option value="${esc(b)}">${esc(b)}</option>`).join(''));

  const card = c => `<a class="entity-card" href="company-detail.html?id=${encodeURIComponent(c.id)}" data-category="${c.category}" data-company="${esc(c.id)}">`
    + `<div class="entity-mark">${esc((c.short || c.name).slice(0, 2).toUpperCase())}</div>`
    + `<h3>${esc(c.name)}</h3><p>${esc(c.sector)}</p><footer><span>${esc(c.building)}</span><span aria-hidden="true"></span></footer></a>`;

  createListing({
    results, pagerEl: $('#companyPager'), metaEl: $('#companyMeta'), search: $('#innerSearch'),
    perPage: 12, label: 'doanh nghiệp',
    load: () => seed.companies,
    text: c => `${c.name} ${c.short} ${c.sector} ${c.building} ${(c.tags || []).join(' ')}`,
    filters: [
      { param: 'sector', control: pillControl($('#companyPills')), match: (c, v) => c.category === v },
      { param: 'building', control: fieldControl(buildingSelect), match: (c, v) => c.building === v }
    ],
    sort: { param: 'sort', default: 'featured', control: fieldControl($('#companySort')),
      apply: (list, v) => v === 'az' ? [...list].sort((a, b) => a.name.localeCompare(b.name, 'vi')) : v === 'za' ? [...list].sort((a, b) => b.name.localeCompare(a.name, 'vi')) : list },
    emptyCopy: { title: 'Không tìm thấy doanh nghiệp phù hợp.', text: 'Thử tên viết tắt, lĩnh vực khác hoặc bỏ lọc tòa nhà.' },
    render: card
  });
})();
