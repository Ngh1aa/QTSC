/** Insights filtering interactions */
const { $$, $ } = window.QTSC;

const buttons = $$('[data-filter]');
const feature = $('.article-feature[data-category]');
const stack = $('.article-stack');
const cards = $$('.article-card[data-category]');
const grid = $('.article-grid');

function applyFilter(value = 'all') {
  const valid = new Set(buttons.map(button => button.dataset.filter));
  const filter = valid.has(value) ? value : 'all';

  buttons.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (feature) feature.hidden = filter !== 'all' && feature.dataset.category !== filter;

  let visibleCards = 0;
  cards.forEach(card => {
    const visible = filter === 'all' || card.dataset.category === filter;
    card.hidden = !visible;
    if (visible) visibleCards += 1;
  });

  if (stack) stack.hidden = visibleCards === 0;
  grid?.classList.toggle('is-filtered', filter !== 'all');

  const url = new URL(location.href);
  if (filter === 'all') url.searchParams.delete('cat');
  else url.searchParams.set('cat', filter);
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

buttons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));

const initial = new URLSearchParams(location.search).get('cat') || 'all';
applyFilter(initial);
