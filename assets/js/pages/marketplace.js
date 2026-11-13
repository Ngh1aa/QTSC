/** Technology Marketplace: search, technology pills (?technology=), type,
 * provider and demo filters, pagination, and links to solution-detail.html?id=. */
(() => {
  const { $, esc } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const seed = window.QTSCStore.seed;
  const results = $('#solutionResults');
  if (!results) return;
  const providerSelect = $('#solutionProvider');
  [...new Set(seed.solutions.map(s => s.provider))].sort((a, b) => a.localeCompare(b, 'vi'))
    .forEach(p => providerSelect.insertAdjacentHTML('beforeend', `<option value="${esc(p)}">${esc(p)}</option>`));

  createListing({
    results, pagerEl: $('#solutionPager'), metaEl: $('#solutionMeta'), search: $('#innerSearch'),
    perPage: 10, label: 'giải pháp',
    load: () => seed.solutions,
    text: s => `${s.name} ${s.provider} ${s.focus} ${s.type} ${seed.solutionCategories[s.category]} ${s.summary}`,
    filters: [
      { param: 'technology', control: pillControl($('#solutionPills')), match: (s, v) => s.category === v },
      { param: 'type', control: fieldControl($('#solutionType')), match: (s, v) => s.type === v },
      { param: 'provider', control: fieldControl(providerSelect), match: (s, v) => s.provider === v },
      { param: 'demo', control: fieldControl($('#solutionDemo')), match: s => s.demo }
    ],
    emptyCopy: { title: 'Chưa có giải pháp khớp với nhu cầu.', text: 'Thử mô tả bài toán bằng từ khóa khác, hoặc gửi nhu cầu để QTSC kết nối đối tác phù hợp.' },
    render: s => `<a class="entity-card" href="solution-detail.html?id=${encodeURIComponent(s.id)}" data-category="${s.category}" data-solution="${esc(s.id)}">`
      + `<div class="entity-mark">${esc(s.name.slice(0, 2).toUpperCase())}</div><h3>${esc(s.name)}</h3>`
      + `<p>${esc(s.provider)}, ${esc(s.type.toLowerCase())}</p><footer><span>${esc(seed.solutionCategories[s.category])}</span><span aria-hidden="true"></span></footer></a>`
  });
})();
