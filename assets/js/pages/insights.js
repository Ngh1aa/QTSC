/** Insights filtering interactions */
const { $$, $ } = window.QTSC;

const buttons = $$('[data-filter]');
const feature = $('.article-feature[data-category]');
const stack = $('.article-stack');
const cards = $$('.article-card[data-category]');
const grid = $('.article-grid');
const emptyState = $('.empty-state');

function applyFilter(value = 'all') {
  const valid = new Set(buttons.map(button => button.dataset.filter));
  const filter = valid.has(value) ? value : 'all';

  buttons.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });

  let visibleFeature = 0;
  if (feature) {
    const showFeature = filter === 'all' || feature.dataset.category === filter;
    feature.hidden = !showFeature;
    if (showFeature) visibleFeature = 1;
  }

  let visibleCards = 0;
  cards.forEach(card => {
    const visible = filter === 'all' || card.dataset.category === filter;
    card.hidden = !visible;
    if (visible) visibleCards += 1;
  });

  if (stack) stack.hidden = visibleCards === 0;
  if (grid) grid.classList.toggle('is-filtered', filter !== 'all');
  if (emptyState) emptyState.hidden = (visibleFeature + visibleCards) > 0;

  const url = new URL(location.href);
  if (filter === 'all') url.searchParams.delete('cat');
  else url.searchParams.set('cat', filter);
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

buttons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));

$$('.empty-state [data-filter]').forEach(btn => btn.addEventListener('click', () => {
  applyFilter('all');
}));

const initial = new URLSearchParams(location.search).get('cat') || 'all';
applyFilter(initial);
