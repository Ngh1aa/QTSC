/** Insights filtering interactions */
const { $$ } = window.QTSC;
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  $$('.pill-tabs button').forEach(item=>item.classList.remove('active'));button.classList.add('active');
  const value=button.dataset.filter;
  $$('[data-category]').forEach(item=>item.hidden=value!=='all'&&item.dataset.category!==value);
}));
