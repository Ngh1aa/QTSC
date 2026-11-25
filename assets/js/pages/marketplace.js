/* Solutions listing: search, category pills (?category=), type, company and demo filters, pagination,
 * and links to solution-detail.html?id=. */
(() => {
  const { $, esc } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const seed = window.QTSCStore.seed;
  const results = $('#solutionResults');
  if (!results) return;

  const providerSelect = $('#solutionProvider');
  const providers = [...new Set(seed.solutions.map((s) => s.provider))].sort((a, b) => a.localeCompare(b));
  providerSelect.insertAdjacentHTML('beforeend', providers.map((p) => `<option value="${esc(p)}">${esc(p)}</option>`).join(''));

  const card = (s) => `<a class="entity-card" href="solution-detail.html?id=${encodeURIComponent(s.id)}" data-category="${esc(s.category)}" data-solution="${esc(s.id)}">`
    + `<span class="entity-mark" aria-hidden="true">${esc(s.name.slice(0, 2).toUpperCase())}</span>`
    + `<div><h3>${esc(s.name)}</h3><p>${esc(s.focus)}</p></div>`
    + `<div class="entity-side"><span class="badge">${esc(seed.solutionCategories[s.category])}</span><span>${esc(s.provider)}</span></div></a>`;

  createListing({
    results, pagerEl: $('#solutionPager'), metaEl: $('#solutionMeta'), search: $('#innerSearch'),
    perPage: 10, label: 'solutions',
    load: () => seed.solutions,
    text: (s) => `${s.name} ${s.provider} ${s.focus} ${s.type} ${seed.solutionCategories[s.category]} ${s.summary} ${s.features.join(' ')}`,
    filters: [
      { param: 'category', control: pillControl($('#solutionPills')), match: (s, v) => s.category === v },
      { param: 'type', control: fieldControl($('#solutionType')), match: (s, v) => s.type === v },
      { param: 'company', control: fieldControl(providerSelect), match: (s, v) => s.provider === v },
      { param: 'demo', control: fieldControl($('#solutionDemo')), match: (s) => s.demo },
    ],
    emptyCopy: { title: 'No solution matches.', text: 'Try another word for the problem, or all categories.' },
    render: card,
  });
})();
