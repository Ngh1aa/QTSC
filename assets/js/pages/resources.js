(() => {
  const cards = [...document.querySelectorAll('.resource-card')];
  const buttons = [...document.querySelectorAll('[data-resource-filter]')];
  const search = document.getElementById('resourceSearch');
  const empty = document.getElementById('resourceEmpty');
  let active = new URLSearchParams(location.search).get('cat') || 'all';

  const apply = () => {
    const q = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const show = (active === 'all' || category === active) && (!q || text.includes(q));
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.resourceFilter === active));
  };

  buttons.forEach(btn => btn.addEventListener('click', () => {
    active = btn.dataset.resourceFilter;
    apply();
  }));
  search?.addEventListener('input', apply);
  if (!buttons.some(btn => btn.dataset.resourceFilter === active)) active = 'all';
  apply();
})();