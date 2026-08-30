/** Technology marketplace interactions */
const { $, $$ } = window.QTSC;
const search = $('#innerSearch');
const emptyState = $('.empty-state');
const params = new URLSearchParams(location.search);
const initial = params.get('technology');
function activateTab(button){
  $$('.pill-tabs button').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false')});
  button.classList.add('active');
  button.setAttribute('aria-selected','true');
}
if (initial) {
  const button = $$('[data-filter]').find(item => item.dataset.filter.toLowerCase() === initial.toLowerCase());
  if (button) activateTab(button);
}
function applyFilters(){
  const q=(search?.value||'').trim().toLowerCase();
  const active=$('.pill-tabs .active')?.dataset.filter||'all';
  let visible=0;
  $$('[data-searchable]').forEach(card=>{
    const categoryMatch=active==='all'||card.dataset.category===active;
    const queryMatch=!q||card.textContent.toLowerCase().includes(q);
    const show=categoryMatch&&queryMatch;
    card.hidden=!show;
    if(show) visible++;
  });
  if(emptyState) emptyState.hidden=visible>0;
  const next=new URLSearchParams(location.search);
  active==='all'?next.delete('technology'):next.set('technology',active);
  history.replaceState(null,'',location.pathname+(next.toString()?`?${next}`:''));
}
search?.addEventListener('input',applyFilters);
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  activateTab(button);
  applyFilters();
}));
/* Reset from empty-state inline link */
$$('.empty-state [data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  const allBtn=$('[data-filter="all"]');
  if(allBtn) activateTab(allBtn);
  if(search) search.value='';
  applyFilters();
}));
applyFilters();

