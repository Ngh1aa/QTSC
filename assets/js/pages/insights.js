/** Insights: category pills (?cat=), month filter, search, pagination; each
 * card opens article.html?id=<article id>. */
(() => {
  const { $, esc, fmtDate } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const seed = window.QTSCStore.seed;
  if (!$('#articleResults')) return;
  const card = a => `<article class="article-card" data-category="${a.cat}" data-article="${esc(a.id)}"><small>${esc(seed.articleCategories[a.cat])}, ${esc(fmtDate(a.date))}</small><h3>${esc(a.title)}</h3><a href="article.html?id=${encodeURIComponent(a.id)}" aria-label="Đọc tin: ${esc(a.title)}">Đọc tin ↗</a></article>`;
  createListing({
    results: $('#articleResults'), pagerEl: $('#articlePager'), metaEl: $('#articleMeta'), search: $('#articleSearch'), perPage: 8, label: 'bài viết',
    load: () => [...seed.articles].sort((a, b) => b.date.localeCompare(a.date)),
    text: a => `${a.title} ${seed.articleCategories[a.cat]} ${a.summary}`,
    filters: [
      { param: 'cat', control: pillControl($('#articlePills')), match: (a, v) => a.cat === v },
      { param: 'month', control: fieldControl($('#articleYear')), match: (a, v) => a.date.startsWith(v) }
    ],
    emptyCopy: { title: 'Chưa có bài viết phù hợp.', text: 'Thử nhóm tin khác, bỏ lọc thời gian hoặc dùng từ khóa ngắn hơn.' },
    renderList: slice => `<div class="article-stack">${slice.map(card).join('')}</div>`
  });
})();
