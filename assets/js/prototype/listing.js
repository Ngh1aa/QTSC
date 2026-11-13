/* QTSC listing engine: search + filters + pagination over a seed collection,
 * with URL sync, a simulated initial request (loading / error + retry) and an
 * empty state that clears filters. Used by companies, marketplace, office units,
 * insights, resources, careers and open data.
 */
(() => {
  const { $, $$, esc, showState, pager, params, setParams } = window.QTSCUI;
  const store = window.QTSCStore;
  const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

  /* Pill group helper: buttons with data-<attr>; keeps aria-selected/aria-pressed in sync. */
  function pillControl(group, attr = 'filter') {
    const buttons = () => $$(`[data-${attr}]`, group);
    const get = () => buttons().find(b => b.classList.contains('active'))?.dataset[attr] || 'all';
    const set = value => {
      const match = buttons().some(b => b.dataset[attr] === value) ? value : 'all';
      buttons().forEach(b => {
        const on = b.dataset[attr] === match;
        b.classList.toggle('active', on);
        if (b.getAttribute('role') === 'tab') b.setAttribute('aria-selected', String(on)); else b.setAttribute('aria-pressed', String(on));
      });
    };
    const listen = fn => buttons().forEach(b => b.addEventListener('click', () => { set(b.dataset[attr]); fn(); }));
    return { get, set, listen };
  }
  function fieldControl(el) {
    return {
      get: () => el.value || 'all',
      set: v => { el.value = [...(el.options || [])].some(o => o.value === v) || el.tagName === 'INPUT' ? (v === 'all' ? '' : v) : (el.options?.[0]?.value ?? ''); },
      listen: fn => el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', fn)
    };
  }

  function createListing(cfg) {
    const { results, pagerEl, metaEl, search, perPage = 10, label = 'kết quả', load, text, render, filters = [], sort, emptyCopy, afterRender, renderList } = cfg;
    let items = null;
    let page = Math.max(1, Number(params().get('page')) || 1);
    const p = params();
    if (search) search.value = p.get('q') || '';
    filters.forEach(f => f.control.set(p.get(f.param) || 'all'));
    if (sort) sort.control.set(p.get(sort.param) || sort.default);

    const state = () => ({ q: (search?.value || '').trim(), ...Object.fromEntries(filters.map(f => [f.param, f.control.get()])), ...(sort ? { [sort.param]: sort.control.get() } : {}) });
    function filtered() {
      const s = state();
      const q = norm(s.q);
      let list = items.filter(item => (!q || norm(text(item)).includes(q)) && filters.every(f => s[f.param] === 'all' || f.match(item, s[f.param])));
      if (sort) list = sort.apply(list, s[sort.param]);
      return list;
    }
    function clearAll() {
      if (search) search.value = '';
      filters.forEach(f => f.control.set('all'));
      page = 1; draw();
      search?.focus();
    }
    function draw() {
      if (!items) return;
      const list = filtered();
      const pages = Math.max(1, Math.ceil(list.length / perPage));
      page = Math.min(page, pages);
      setParams({ ...state(), page, ...(sort && state()[sort.param] === sort.default ? { [sort.param]: '' } : {}) });
      const active = Boolean(state().q) || filters.some(f => f.control.get() !== 'all');
      if (metaEl) metaEl.innerHTML = `<span><strong>${list.length}</strong> ${esc(label)}${active ? ' phù hợp' : ''}</span>${active ? '<button type="button" class="proto-link-btn" data-clear-filters>Xóa bộ lọc</button>' : ''}`;
      $('[data-clear-filters]', metaEl || document.createElement('div'))?.addEventListener('click', clearAll);
      if (!list.length) {
        showState(results, 'empty', { ...(emptyCopy || {}), action: { label: 'Xóa bộ lọc và tìm lại', onClick: clearAll } });
        if (pagerEl) pagerEl.innerHTML = '';
        results.dataset.state = 'empty';
        return;
      }
      const slice = list.slice((page - 1) * perPage, page * perPage);
      results.dataset.state = 'ready';
      results.innerHTML = renderList ? renderList(slice) : slice.map(render).join('');
      pager(pagerEl, { page, pages, total: list.length, label, onChange: next => { page = next; draw(); results.scrollIntoView({ block: 'start', behavior: 'auto' }); (results.querySelector('a,button') || results).focus?.({ preventScroll: true }); } });
      afterRender?.(slice, results);
    }
    function fetchItems() {
      results.dataset.state = 'loading';
      showState(results, 'loading', { title: 'Đang tải danh sách…' });
      if (pagerEl) pagerEl.innerHTML = '';
      store.request(load, { delay: 380 }).then(data => { items = data; draw(); }).catch(error => {
        results.dataset.state = 'error';
        showState(results, 'error', { text: `${error.message} Bộ lọc của bạn vẫn được giữ.`, action: { label: 'Thử lại', onClick: fetchItems } });
      });
    }
    const onChange = () => { page = 1; draw(); };
    let t;
    search?.addEventListener('input', () => { clearTimeout(t); t = setTimeout(onChange, 120); });
    search?.closest('form, .inner-searchbar')?.querySelector('button')?.addEventListener('click', event => {
      event.preventDefault();
      if (!search.value.trim()) { search.focus(); window.QTSCUI.toast('Nhập tên, lĩnh vực hoặc từ khóa rồi bấm Tìm.'); return; }
      onChange();
      window.QTSCUI.toast(`Đã tìm “${search.value.trim()}”.`);
    });
    search?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); onChange(); } });
    filters.forEach(f => f.control.listen(onChange));
    sort?.control.listen(onChange);
    fetchItems();
    return { redraw: draw, refetch: fetchItems, clearAll, filtered: () => (items ? filtered() : null) };
  }

  window.QTSCListing = { createListing, pillControl, fieldControl, norm };
})();
