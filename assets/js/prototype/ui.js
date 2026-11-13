/* QTSC prototype UI kit: states (loading, empty, error, not found), pagination,
 * validated forms with simulated requests, confirmation dialog, file downloads
 * and the footer prototype toolbar (reset demo data, simulate failed requests).
 * Builds on the shared shell in assets/js/shared.js and the classes in
 * assets/css/components/prototype.css.
 */
(() => {
  const store = window.QTSCStore;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const NOTE = 'Bản prototype: chưa có thông tin nào được gửi tới QTSC. Thông tin chỉ được lưu trong tab trình duyệt này.';

  function fmtDate(iso) {
    if (!iso) return '';
    const [y, m, d] = String(iso).slice(0, 10).split('-');
    return d && m && y ? `${d}/${m}/${y}` : String(iso);
  }
  function todayISO(offsetDays = 0) {
    const d = new Date(); d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  const params = () => new URLSearchParams(location.search);
  function setParams(values) {
    const next = params();
    Object.entries(values).forEach(([k, v]) => { if (v === '' || v === null || v === undefined || v === 'all' || (k === 'page' && Number(v) === 1)) next.delete(k); else next.set(k, v); });
    const qs = next.toString();
    history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
  }

  /* ------------------------------------------------------------------ states */
  const STATE_COPY = {
    loading: { title: 'Đang tải…', text: 'Vui lòng chờ trong giây lát.' },
    empty: { title: 'Không có kết quả phù hợp.', text: 'Thử từ khóa ngắn hơn hoặc bỏ bớt bộ lọc.' },
    error: { title: 'Không tải được dữ liệu.', text: 'Kết nối bị gián đoạn. Bạn có thể thử lại ngay.' },
    notfound: { title: 'Không tìm thấy nội dung.', text: 'Liên kết có thể đã cũ hoặc nội dung đã được gỡ.' }
  };
  function showState(container, kind, opts = {}) {
    if (!container) return;
    const copy = { ...STATE_COPY[kind], ...opts };
    const role = kind === 'error' ? 'alert' : 'status';
    const action = copy.action ? (copy.action.href
      ? `<a class="btn btn-secondary" href="${esc(copy.action.href)}">${esc(copy.action.label)}</a>`
      : `<button class="btn btn-secondary" type="button" data-state-action>${esc(copy.action.label)}</button>`) : '';
    const secondary = copy.secondary ? `<a class="btn btn-outline" href="${esc(copy.secondary.href)}">${esc(copy.secondary.label)}</a>` : '';
    container.innerHTML = kind === 'loading'
      ? `<div class="state-panel is-loading" role="status" aria-live="polite" data-state="loading"><span class="state-spinner" aria-hidden="true"></span><strong>${esc(copy.title)}</strong></div>${'<div class="skeleton-row" aria-hidden="true"></div>'.repeat(opts.rows ?? 3)}`
      : `<div class="state-panel is-${kind}" role="${role}" data-state="${kind}"><${copy.heading || 'strong'}>${esc(copy.title)}</${copy.heading || 'strong'}><p>${esc(copy.text)}</p>${action || secondary ? `<div class="state-actions">${action}${secondary}</div>` : ''}</div>`;
    const button = $('[data-state-action]', container);
    if (button && copy.action?.onClick) button.addEventListener('click', copy.action.onClick);
  }

  /* -------------------------------------------------------------- pagination */
  function pager(container, { page, pages, total, label = 'kết quả', onChange }) {
    if (!container) return;
    if (pages <= 1) { container.innerHTML = total ? `<p class="pager-summary">${total} ${esc(label)}</p>` : ''; return; }
    const nums = [];
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i);
      else if (nums[nums.length - 1] !== '…') nums.push('…');
    }
    container.innerHTML = `<nav class="pager" aria-label="Phân trang"><p class="pager-summary">Trang ${page}/${pages}, ${total} ${esc(label)}</p><div class="pager-buttons">`
      + `<button type="button" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}>Trước</button>`
      + nums.map(n => n === '…' ? '<span class="pager-gap" aria-hidden="true">…</span>' : `<button type="button" data-page="${n}" ${n === page ? 'aria-current="page" class="active"' : ''} aria-label="Trang ${n}">${n}</button>`).join('')
      + `<button type="button" data-page="${page + 1}" ${page >= pages ? 'disabled' : ''}>Sau</button></div></nav>`;
    $$('[data-page]', container).forEach(button => button.addEventListener('click', () => onChange(Number(button.dataset.page))));
  }

  /* ------------------------------------------------------------------- forms */
  function fieldLabel(field) {
    const id = field.id && document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
    return (id?.textContent || field.getAttribute('aria-label') || field.name || '').replace('*', '').trim();
  }
  function messageFor(field) {
    const v = field.validity;
    const label = fieldLabel(field).toLowerCase();
    if (field.dataset.customError) return field.dataset.customError;
    if (v.valueMissing) {
      if (field.type === 'checkbox') return field.dataset.required || 'Vui lòng xác nhận để tiếp tục.';
      if (field.type === 'file') return 'Vui lòng chọn tệp CV.';
      if (field.tagName === 'SELECT' || field.type === 'radio') return `Vui lòng chọn ${label}.`;
      return `Vui lòng nhập ${label}.`;
    }
    if (v.typeMismatch && field.type === 'email') return 'Email chưa đúng định dạng, ví dụ ten@congty.vn.';
    if (v.patternMismatch) return field.dataset.patternError || 'Giá trị chưa đúng định dạng.';
    if (v.rangeUnderflow || v.rangeOverflow) return field.dataset.rangeError || `Giá trị cần trong khoảng ${field.min || ''} đến ${field.max || ''}.`;
    if (v.tooShort) return `Cần ít nhất ${field.minLength} ký tự.`;
    return field.validationMessage;
  }
  function setFieldError(field, message) {
    const wrap = field.closest('.form-field, .form-consent, fieldset') || field.parentElement;
    let error = wrap.querySelector(':scope > .field-error');
    if (!message) { error?.remove(); field.removeAttribute('aria-invalid'); return; }
    if (!error) { error = document.createElement('p'); error.className = 'field-error'; error.id = `${field.id || field.name}-error`; wrap.append(error); }
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    const described = new Set((field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean)); described.add(error.id);
    field.setAttribute('aria-describedby', [...described].join(' '));
  }
  function validateForm(form, custom) {
    const fields = $$('input, select, textarea', form).filter(f => !f.disabled && f.type !== 'hidden' && f.type !== 'submit');
    fields.forEach(f => { delete f.dataset.customError; });
    const extra = custom ? custom(data(form), form) || {} : {};
    Object.entries(extra).forEach(([name, message]) => { const f = form.elements[name]; const el = f?.length && !f.tagName ? f[0] : f; if (el) el.dataset.customError = message; });
    const invalid = [];
    const seenGroups = new Set();
    fields.forEach(f => {
      if ((f.type === 'checkbox' || f.type === 'radio') && f.name && form.querySelectorAll(`[name="${CSS.escape(f.name)}"]`).length > 1) {
        if (seenGroups.has(f.name)) return;
        seenGroups.add(f.name);
      }
      const bad = !f.checkValidity() || f.dataset.customError;
      setFieldError(f, bad ? messageFor(f) : '');
      if (bad && !invalid.some(x => x.name && x.name === f.name)) invalid.push(f);
    });
    return invalid;
  }
  function formAlert(form, kind, html) {
    let alert = $(':scope > .form-alert', form);
    if (!html) { alert?.remove(); return null; }
    if (!alert) { alert = document.createElement('div'); form.prepend(alert); }
    alert.className = `form-alert is-${kind}`;
    alert.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    alert.setAttribute('tabindex', '-1');
    alert.innerHTML = html;
    return alert;
  }
  function data(form) {
    const out = {};
    new FormData(form).forEach((value, key) => {
      if (value instanceof File) { out[key] = value.name; return; }
      if (key in out) out[key] = [].concat(out[key], value); else out[key] = value;
    });
    $$('input[type="checkbox"][data-multi]', form).forEach(box => { if (!(box.name in out)) out[box.name] = []; else out[box.name] = [].concat(out[box.name]); });
    return out;
  }
  /* bindForm: validates, runs submit(data) (a Promise from QTSCStore.request),
   * shows loading on the submit button, a recoverable error with retry, and
   * calls success(result, values) on completion. */
  function bindForm(form, { submit, success, validate, busyLabel = 'Đang gửi…' }) {
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';
    form.noValidate = true;
    const button = $('[type="submit"]', form);
    const idle = button?.innerHTML;
    $$('input, select, textarea', form).forEach(f => f.addEventListener(f.type === 'checkbox' || f.tagName === 'SELECT' || f.type === 'file' ? 'change' : 'blur', () => {
      if (f.getAttribute('aria-invalid') === 'true') { delete f.dataset.customError; setFieldError(f, f.checkValidity() ? '' : messageFor(f)); }
    }));
    const run = async () => {
      const invalid = validateForm(form, validate);
      if (invalid.length) {
        formAlert(form, 'error', `<strong>Có ${invalid.length} mục cần kiểm tra.</strong> <span>Vui lòng sửa các ô được đánh dấu bên dưới.</span>`);
        invalid[0].focus();
        return;
      }
      formAlert(form, '', '');
      const values = data(form);
      if (button) { button.disabled = true; button.setAttribute('aria-busy', 'true'); button.textContent = busyLabel; }
      form.setAttribute('aria-busy', 'true');
      try {
        const result = await submit(values, form);
        success?.(result, values, form);
      } catch (error) {
        const alert = formAlert(form, 'error', `<strong>Chưa gửi được yêu cầu.</strong> <span>${esc(error.message || 'Đã có lỗi xảy ra.')} Thông tin bạn nhập vẫn được giữ nguyên.</span> <button type="button" class="btn btn-secondary" data-retry>Thử lại</button>`);
        $('[data-retry]', alert).addEventListener('click', run);
        alert.focus();
      } finally {
        if (button) { button.disabled = false; button.removeAttribute('aria-busy'); button.innerHTML = idle; }
        form.removeAttribute('aria-busy');
      }
    };
    form.addEventListener('submit', event => { event.preventDefault(); run(); });
  }

  /* Success panel replacing (or following) a form. */
  function successPanel({ title, reference, lines = [], actions = [] }) {
    const panel = document.createElement('div');
    panel.className = 'proto-success';
    panel.setAttribute('role', 'status');
    panel.setAttribute('tabindex', '-1');
    panel.dataset.state = 'success';
    panel.innerHTML = `<p class="proto-success-kicker">Đã ghi nhận</p><h3>${esc(title)}</h3>`
      + (reference ? `<p class="proto-ref">Mã tham chiếu <strong>${esc(reference)}</strong></p>` : '')
      + lines.map(line => `<p>${esc(line)}</p>`).join('')
      + `<p class="proto-note">${esc(NOTE)}</p>`
      + `<div class="state-actions">${actions.map((a, i) => a.href ? `<a class="btn ${i ? 'btn-secondary' : 'btn-brand'}" href="${esc(a.href)}">${esc(a.label)}</a>` : `<button type="button" class="btn ${i ? 'btn-secondary' : 'btn-brand'}" data-success-action="${i}">${esc(a.label)}</button>`).join('')}</div>`;
    actions.forEach((a, i) => { if (a.onClick) $(`[data-success-action="${i}"]`, panel)?.addEventListener('click', a.onClick); });
    return panel;
  }

  /* --------------------------------------------------------- confirm dialog */
  function confirmDialog({ title, text, confirmLabel = 'Xác nhận', cancelLabel = 'Quay lại', tone = 'danger' }) {
    return new Promise(resolve => {
      const returnFocus = document.activeElement;
      const wrap = document.createElement('div');
      wrap.className = 'proto-modal';
      wrap.innerHTML = `<div class="proto-modal-backdrop" data-cancel></div><section class="proto-modal-card" role="alertdialog" aria-modal="true" aria-labelledby="protoModalTitle" aria-describedby="protoModalText"><h2 id="protoModalTitle">${esc(title)}</h2><p id="protoModalText">${esc(text)}</p><div class="state-actions"><button type="button" class="btn ${tone === 'danger' ? 'btn-danger' : 'btn-brand'}" data-confirm>${esc(confirmLabel)}</button><button type="button" class="btn btn-secondary" data-cancel>${esc(cancelLabel)}</button></div></section>`;
      document.body.append(wrap);
      document.body.classList.add('is-locked');
      const close = value => { wrap.remove(); document.body.classList.remove('is-locked'); document.removeEventListener('keydown', onKey, true); if (returnFocus && document.contains(returnFocus)) returnFocus.focus(); resolve(value); };
      const onKey = event => {
        if (event.key === 'Escape') { event.stopPropagation(); close(false); }
        if (event.key === 'Tab') { const items = $$('button', wrap); const i = items.indexOf(document.activeElement); event.preventDefault(); items[(i + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus(); }
      };
      document.addEventListener('keydown', onKey, true);
      $('[data-confirm]', wrap).addEventListener('click', () => close(true));
      $$('[data-cancel]', wrap).forEach(el => el.addEventListener('click', () => close(false)));
      setTimeout(() => $('[data-cancel].btn', wrap).focus(), 10);
    });
  }

  /* Detail page lifecycle: hides [data-detail] sections, shows loading in #detailState,
   * then renders the record, a not-found state (with an h1) or an error with retry. */
  function detailPage({ load, render, notFound, loadingTitle = 'Đang tải nội dung…' }) {
    const sections = $$('[data-detail]');
    const holder = $('#detailState');
    const inner = $('#detailStateInner') || holder;
    const toggle = on => { sections.forEach(s => { s.hidden = !on; }); if (holder) holder.hidden = on; };
    const run = () => {
      toggle(false);
      showState(inner, 'loading', { title: loadingTitle, rows: 2 });
      store.request(load, { delay: 300 }).then(item => {
        if (!item) {
          document.title = `${notFound.title} — QTSC`;
          showState(inner, 'notfound', { heading: 'h1', ...notFound });
          inner.dataset.state = 'notfound';
          return;
        }
        render(item);
        toggle(true);
        inner.dataset.state = 'ready';
        document.dispatchEvent(new CustomEvent('qtsc:detail-ready'));
      }).catch(error => { inner.dataset.state = 'error'; showState(inner, 'error', { heading: 'h1', title: 'Không tải được nội dung.', text: `${error.message} Bạn có thể thử lại.`, action: { label: 'Thử lại', onClick: run } }); });
    };
    run();
  }

  /* ---------------------------------------------------------------- files */
  function download(filename, content, mime = 'text/plain;charset=utf-8') {
    const blob = new Blob([mime.startsWith('text/csv') ? '﻿' + content : content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.hidden = true;
    document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 500);
  }
  const csv = rows => rows.map(row => row.map(cell => { const s = String(cell ?? ''); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\r\n');

  function toast(message) { window.QTSC?.toast ? window.QTSC.toast(message) : console.info(message); }

  /* -------------------------------------------------------- footer toolbar */
  function mountToolbar() {
    const footer = $('.site-footer');
    if (!footer || $('.proto-bar', footer) || !store) return;
    const bar = document.createElement('div');
    bar.className = 'container-wide proto-bar';
    bar.setAttribute('aria-label', 'Công cụ bản prototype');
    bar.setAttribute('role', 'region');
    bar.innerHTML = `<div class="proto-bar-copy"><strong>Bản prototype tương tác</strong><p>Thông tin bạn nhập chỉ lưu trong tab này và không được gửi đi.</p></div>
      <nav class="proto-bar-links" aria-label="Mục của tôi"><a href="office.html#my-bookings">Lịch tham quan của tôi</a><a href="careers.html#my-applications">Hồ sơ ứng tuyển của tôi</a><a href="newsletter.html#manage">Tùy chọn nhận tin</a></nav>
      <div class="proto-bar-actions"><button type="button" class="btn btn-glass" data-proto-fail aria-pressed="false">Giả lập lỗi kết nối: Tắt</button><button type="button" class="btn btn-glass" data-proto-reset>Đặt lại dữ liệu demo</button></div>`;
    footer.append(bar);
    const failButton = $('[data-proto-fail]', bar);
    const sync = () => { const on = store.settings().failRequests; failButton.setAttribute('aria-pressed', String(on)); failButton.textContent = `Giả lập lỗi kết nối: ${on ? 'Bật' : 'Tắt'}`; document.documentElement.classList.toggle('proto-failing', on); };
    sync();
    failButton.addEventListener('click', () => { const on = !store.settings().failRequests; store.setFailRequests(on); sync(); toast(on ? 'Đã bật giả lập lỗi: các yêu cầu tiếp theo sẽ thất bại.' : 'Đã tắt giả lập lỗi kết nối.'); });
    $('[data-proto-reset]', bar).addEventListener('click', async () => {
      const ok = await confirmDialog({ title: 'Đặt lại dữ liệu demo?', text: 'Toàn bộ lịch tham quan, hồ sơ ứng tuyển, yêu cầu và tùy chọn nhận tin trong tab này sẽ trở về trạng thái ban đầu.', confirmLabel: 'Đặt lại', cancelLabel: 'Giữ nguyên' });
      if (!ok) return;
      store.reset();
      try { sessionStorage.setItem('qtsc-prototype-flash', 'Đã đặt lại dữ liệu demo.'); } catch { /* ignore */ }
      location.reload();
    });
    document.addEventListener('qtsc:store', event => { if (event.detail?.reason === 'settings') sync(); });
  }
  function flash() {
    try { const message = sessionStorage.getItem('qtsc-prototype-flash'); if (message) { sessionStorage.removeItem('qtsc-prototype-flash'); setTimeout(() => toast(message), 150); } } catch { /* ignore */ }
  }

  /* Arrow glyph spans that are drawn with a CSS mask keep no visible text. */
  function cleanArrows(root = document) {
    $$('span, i, em', root).forEach(el => {
      if (el.children.length || !/^\s*[↗→↓⌕]\s*$/.test(el.textContent)) return;
      const st = getComputedStyle(el);
      if (parseFloat(st.fontSize) === 0 || st.backgroundColor === st.color) { el.textContent = ''; el.setAttribute('aria-hidden', 'true'); }
    });
  }
  let arrowTimer = 0;
  function watchArrows() {
    cleanArrows();
    new MutationObserver(() => { clearTimeout(arrowTimer); arrowTimer = setTimeout(() => cleanArrows(), 60); }).observe(document.body, { childList: true, subtree: true });
  }

  window.QTSCUI = { $, $$, esc, NOTE, fmtDate, todayISO, params, setParams, showState, pager, bindForm, validateForm, setFieldError, formAlert, successPanel, confirmDialog, detailPage, download, csv, toast, cleanArrows };
  const init = () => { mountToolbar(); flash(); watchArrows(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
