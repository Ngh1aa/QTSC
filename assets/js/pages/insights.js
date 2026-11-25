/* News listing: category pills (?cat=), month filter (?month=), search (?q=) and pagination over
 * seed.articles; each card opens article.html?id=<article id>. */
(() => {
  const { $, esc, fmtDate } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const seed = window.QTSCStore.seed;
  if (!$('#articleResults')) return;

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const pills = $('#articlePills');
  pills.insertAdjacentHTML('beforeend', Object.entries(seed.articleCategories)
    .filter(([key]) => seed.articles.some((a) => a.cat === key))
    .map(([key, label]) => `<button type="button" class="pill" data-filter="${esc(key)}" role="tab" aria-selected="false">${esc(label)}</button>`).join(''));
  const monthSelect = $('#articleYear');
  const months = [...new Set(seed.articles.map((a) => a.date.slice(0, 7)))].sort().reverse();
  monthSelect.insertAdjacentHTML('beforeend', months.map((m) => `<option value="${m}">${MONTHS[Number(m.slice(5)) - 1]} ${m.slice(0, 4)}</option>`).join(''));

  const photo = (name, alt) => (name
    ? `<img src="assets/images/photos/sm/${esc(name)}.webp" width="960" height="640" alt="${esc(alt)}" loading="lazy">`
    : '');
  const card = (a) => `<article class="article-card" data-category="${esc(a.cat)}" data-article="${esc(a.id)}">`
    + `<a href="article.html?id=${encodeURIComponent(a.id)}">${photo(a.image, '')}`
    + `<span class="meta-line">${esc(seed.articleCategories[a.cat])}, <time datetime="${esc(a.date)}">${esc(fmtDate(a.date))}</time></span>`
    + `<h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p></a></article>`;

  createListing({
    results: $('#articleResults'), pagerEl: $('#articlePager'), metaEl: $('#articleMeta'), search: $('#articleSearch'),
    perPage: 12, label: 'stories',
    load: () => [...seed.articles].sort((a, b) => b.date.localeCompare(a.date)),
    text: (a) => `${a.title} ${seed.articleCategories[a.cat]} ${a.summary} ${a.body.join(' ')}`,
    filters: [
      { param: 'cat', control: pillControl(pills), match: (a, v) => a.cat === v },
      { param: 'month', control: fieldControl(monthSelect), match: (a, v) => a.date.startsWith(v) },
    ],
    emptyCopy: { title: 'No story matches.', text: 'Try another category, any month, or a shorter search.' },
    renderList: (slice) => `<div class="article-stack news-grid">${slice.map(card).join('')}</div>`,
  });
})();
