/** Technology marketplace interactions */
const { $, $$ } = window.QTSC;
const search = $('#innerSearch');
const params = new URLSearchParams(location.search);
const initial = params.get('technology');
if (initial) {
  const button = $$('[data-filter]').find(item => item.dataset.filter.toLowerCase() === initial.toLowerCase());
  if (button) { $$('.pill-tabs button').forEach(x => x.classList.remove('active')); button.classList.add('active'); }
}
function applyFilters(){
  const q=(search?.value||'').trim().toLowerCase();
  const active=$('.pill-tabs .active')?.dataset.filter||'all';
  $$('[data-searchable]').forEach(card=>{
    const categoryMatch=active==='all'||card.dataset.category===active;
    const queryMatch=!q||card.textContent.toLowerCase().includes(q);
    card.hidden=!(categoryMatch&&queryMatch);
  });
  const next=new URLSearchParams(location.search);
  active==='all'?next.delete('technology'):next.set('technology',active);
  history.replaceState(null,'',location.pathname+(next.toString()?`?${next}`:''));
}
search?.addEventListener('input',applyFilters);
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  $$('.pill-tabs button').forEach(x=>x.classList.remove('active'));
  button.classList.add('active');applyFilters();
}));
applyFilters();
