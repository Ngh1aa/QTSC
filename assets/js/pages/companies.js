/* Company directory: search, sector pills, building filter, sort, pagination,
 * URL state (?q=&sector=&building=&sort=&page=) and loading, empty and error states. */
(() => {
  const { $, esc } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const seed = window.QTSCStore.seed;
  const results = $('#companyResults');
  if (!results) return;

  const buildingSelect = $('#companyBuilding');
  const buildings = [...new Set(seed.companies.map((c) => c.building))].sort((a, b) => a.localeCompare(b));
  buildingSelect.insertAdjacentHTML('beforeend', buildings.map((b) => `<option value="${esc(b)}">${esc(b)}</option>`).join(''));

  const card = (c) => `<a class="entity-card" href="company-detail.html?id=${encodeURIComponent(c.id)}" data-category="${c.category}" data-company="${esc(c.id)}">`
    + `<span class="entity-mark" aria-hidden="true">${esc(c.name.slice(0, 2).toUpperCase())}</span>`
    + `<div><h3>${esc(c.name)}</h3><p>${esc(c.intro)}</p></div>`
    + `<div class="entity-side"><span class="badge">${esc(c.sector)}</span><span>${esc(c.building)}</span></div></a>`;

  createListing({
    results, pagerEl: $('#companyPager'), metaEl: $('#companyMeta'), search: $('#innerSearch'),
    perPage: 12, label: 'companies',
    load: () => seed.companies,
    text: (c) => `${c.name} ${c.sector} ${c.building} ${c.intro} ${(c.tags || []).join(' ')}`,
    filters: [
      { param: 'sector', control: pillControl($('#companyPills')), match: (c, v) => c.category === v },
      { param: 'building', control: fieldControl(buildingSelect), match: (c, v) => c.building === v },
    ],
    sort: {
      param: 'sort', default: 'featured', control: fieldControl($('#companySort')),
      apply: (list, v) => (v === 'az' ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : v === 'za' ? [...list].sort((a, b) => b.name.localeCompare(a.name)) : list),
    },
    emptyCopy: { title: 'No company matches.', text: 'Try part of the name, another sector, or all buildings.' },
    render: card,
  });
})();
