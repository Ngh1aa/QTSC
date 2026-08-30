/** Careers page interactions: job filtering, search, and application drawer connection */
(() => {
  const { $, $$ } = window.QTSC || {
    $: (s, r = document) => r.querySelector(s),
    $$: (s, r = document) => Array.from(r.querySelectorAll(s))
  };

  const search = $('#careerSearch');
  const buttons = $$('[data-filter]');
  const jobCards = $$('.job-card[data-category]');
  const emptyState = $('.career-empty');

  const applyFilters = () => {
    const q = (search?.value || '').trim().toLowerCase();
    const active = $('.pill-tabs .active')?.dataset.filter || 'all';
    let visible = 0;

    jobCards.forEach(card => {
      const cat = card.dataset.category || '';
      const categoryMatch = active === 'all' || cat === active;
      const queryMatch = !q || card.textContent.toLowerCase().includes(q);
      const show = categoryMatch && queryMatch;
      card.hidden = !show;
      if (show) visible++;
    });

    if (emptyState) emptyState.hidden = visible > 0;
  };

  search?.addEventListener('input', applyFilters);

  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    applyFilters();
  }));

  $$('.career-empty [data-filter]').forEach(btn => btn.addEventListener('click', () => {
    const allBtn = $('[data-filter="all"]');
    if (allBtn) {
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      allBtn.classList.add('active');
      allBtn.setAttribute('aria-selected', 'true');
    }
    if (search) search.value = '';
    applyFilters();
  }));

  // Direct Apply button connects to shared contact drawer with prefilled role
  $$('[data-apply-role]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.dataset.applyRole;
      const company = btn.dataset.applyCompany;
      if (typeof window.openContact === 'function') {
        window.openContact('recruitment', `Ứng tuyển vị trí: ${role} (${company})`);
      } else {
        const connectBtn = document.querySelector('[data-open-connect]');
        if (connectBtn) connectBtn.click();
      }
    });
  });

  applyFilters();
})();
