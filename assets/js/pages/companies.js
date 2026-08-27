/** Companies directory interactions */
const { $, $$ } = window.QTSC;
const search = $('#innerSearch');
const apply = () => {
  const q = (search?.value || '').trim().toLowerCase();
  const active = $('.pill-tabs .active')?.dataset.filter || 'all';
  $$('[data-searchable]').forEach(card => {
    const categoryMatch = active === 'all' || card.dataset.category === active;
    const queryMatch = !q || card.textContent.toLowerCase().includes(q);
    card.hidden = !(categoryMatch && queryMatch);
  });
};
search?.addEventListener('input', apply);
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('.pill-tabs button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  apply();
}));
