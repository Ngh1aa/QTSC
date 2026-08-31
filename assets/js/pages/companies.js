/** Companies directory interactions */
const { $, $$ } = window.QTSC;
const search = $('#innerSearch');
const emptyState = $('.empty-state');
const apply = () => {
  const q = (search?.value || '').trim().toLowerCase();
  const active = $('.pill-tabs .active')?.dataset.filter || 'all';
  let visible = 0;
  $$('[data-searchable]').forEach(card => {
    const categoryMatch = active === 'all' || card.dataset.category === active;
    const queryMatch = !q || card.textContent.toLowerCase().includes(q);
    const show = categoryMatch && queryMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  if (emptyState) emptyState.hidden = visible > 0;
};
search?.addEventListener('input', apply);
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('.pill-tabs button').forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-pressed','false');
    item.setAttribute('aria-selected','false');
  });
  button.classList.add('active');
  button.setAttribute('aria-pressed','true');
  button.setAttribute('aria-selected','true');
  apply();
}));
/* Reset from empty-state inline link */
$$('.empty-state [data-filter]').forEach(btn => btn.addEventListener('click', () => {
  const allBtn = $('[data-filter="all"]');
  if (allBtn) {
    allBtn.classList.add('active');
    allBtn.setAttribute('aria-pressed','true');
    allBtn.setAttribute('aria-selected','true');
    $$('.pill-tabs button').forEach(x => {
      if (x !== allBtn) {
        x.classList.remove('active');
        x.setAttribute('aria-pressed','false');
        x.setAttribute('aria-selected','false');
      }
    });
  }
  if (search) search.value = '';
  apply();
}));
