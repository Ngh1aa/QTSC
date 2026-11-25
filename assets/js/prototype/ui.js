/* Northbank prototype UI kit: states (loading, empty, error, not found), pagination, validated forms with
 * simulated requests, confirmation dialog, file downloads, and the demo tools (reset data, simulate failed
 * requests). Demo tools only appear after opening any page with ?demo=1; ?demo=0 hides them again.
 * Styles: assets/css/components.css. Shell helpers (toast, drawers): assets/js/site.js. */
(() => {
  const store = window.QTSCStore;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  /* Kept for compatibility with page scripts; prototype notes are not shown on screen. */
  const NOTE = '';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /* "Wed 4 Dec 2026": dates always carry the weekday or the month name. */
  function fmtDate(iso, { weekday = true } = {}) {
    if (!iso) return '';
    const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number);
    if (!y || !m || !d) return String(iso);
    const date = new Date(y, m - 1, d);
    return `${weekday ? `${DAYS[date.getDay()]} ` : ''}${d} ${MONTHS[m - 1]} ${y}`;
  }
  function todayISO(offsetDays = 0) {
    const d = new Date(); d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  const params = () => new URLSearchParams(location.search);
  function setParams(values) {
    const next = params();
    Object.entries(values).forEach(([k, v]) => { if (v === '' || v === null || v === undefined || v === 'all' || (k === 'page' && Number(v) === 1)) next.delete(k); else next.set(k, v); });
    next.delete('demo');
    const qs = next.toString();
    history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
  }

  /* ------------------------------------------------------------------ states */
  const STATE_COPY = {
    loading: { title: 'Loading…', text: '' },
    empty: { title: 'Nothing matches.', text: 'Try a shorter search or remove a filter.' },
    error: { title: 'This list did not load.', text: 'The connection was interrupted. You can try again now.' },
    notfound: { title: 'Page not found.', text: 'The link may be old, or the item has been removed.' },
  };
  function showState(container, kind, opts = {}) {
    if (!container) return;
    const copy = { ...STATE_COPY[kind], ...opts };
    const role = kind === 'error' ? 'alert' : 'status';
    const action = copy.action ? (copy.action.href
      ? `<a class="btn btn-secondary" href="${esc(copy.action.href)}">${esc(copy.action.label)}</a>`
      : `<button class="btn btn-secondary" type="button" data-state-action>${esc(copy.action.label)}</button>`) : '';
    const secondary = copy.secondary ? `<a class="btn btn-ghost" href="${esc(copy.secondary.href)}">${esc(copy.secondary.label)}</a>` : '';
    const tag = copy.heading || 'strong';
    container.innerHTML = kind === 'loading'
      ? `<div class="state-panel is-loading" role="status" aria-live="polite" data-state="loading"><span class="state-spinner" aria-hidden="true"></span><strong>${esc(copy.title)}</strong></div>${'<div class="skeleton-row" aria-hidden="true"></div>'.repeat(opts.rows ?? 3)}`
      : `<div class="state-panel is-${kind}" role="${role}" data-state="${kind}"><${tag}>${esc(copy.title)}</${tag}>${copy.text ? `<p>${esc(copy.text)}</p>` : ''}${action || secondary ? `<div class="state-actions">${action}${secondary}</div>` : ''}</div>`;
    const button = $('[data-state-action]', container);
    if (button && copy.action?.onClick) button.addEventListener('click', copy.action.onClick);
  }

  /* -------------------------------------------------------------- pagination */
  function pager(container, { page, pages, total, label = 'results', onChange }) {
    if (!container) return;
    if (pages <= 1) { container.innerHTML = total ? `<p class="pager-summary">${total} ${esc(label)}</p>` : ''; return; }
    const nums = [];
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i);
      else if (nums[nums.length - 1] !== '…') nums.push('…');
    }
    container.innerHTML = `<nav class="pager" aria-label="Pages"><p class="pager-summary">Page ${page} of ${pages}, ${total} ${esc(label)}</p><div class="pager-buttons">`
      + `<button type="button" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}>Previous</button>`
      + nums.map((n) => (n === '…' ? '<span class="pager-gap" aria-hidden="true">…</span>' : `<button type="button" data-page="${n}" ${n === page ? 'aria-current="page" class="active"' : ''} aria-label="Page ${n}">${n}</button>`)).join('')
      + `<button type="button" data-page="${page + 1}" ${page >= pages ? 'disabled' : ''}>Next</button></div></nav>`;
    $$('[data-page]', container).forEach((button) => button.addEventListener('click', () => onChange(Number(button.dataset.page))));
  }

  /* ------------------------------------------------------------------- forms */
  function fieldLabel(field) {
    const label = field.id && document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
    const legend = field.closest('fieldset')?.querySelector('legend');
    return ((field.type === 'radio' || field.type === 'checkbox') && legend ? legend.textContent : (label?.textContent || field.getAttribute('aria-label') || field.name || '')).replace('*', '').replace(/\(optional\)/i, '').trim();
  }
  function messageFor(field) {
    const v = field.validity;
    const label = fieldLabel(field).toLowerCase();
    if (field.dataset.customError) return field.dataset.customError;
    if (v.valueMissing) {
      if (field.type === 'checkbox') return field.dataset.required || 'Please confirm to continue.';
      if (field.type === 'file') return 'Please attach your CV.';
      if (field.tagName === 'SELECT' || field.type === 'radio') return `Please choose ${label}.`;
      return `Please enter ${label}.`;
    }
    if (v.typeMismatch && field.type === 'email') return 'Enter an email like name@company.com.';
    if (v.patternMismatch) return field.dataset.patternError || 'This format is not valid.';
    if (v.rangeUnderflow || v.rangeOverflow) return field.dataset.rangeError || `Enter a value from ${field.min || ''} to ${field.max || ''}.`;
    if (v.tooShort) return `Enter at least ${field.minLength} characters.`;
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
    const fields = $$('input, select, textarea', form).filter((f) => !f.disabled && f.type !== 'hidden' && f.type !== 'submit');
    fields.forEach((f) => { delete f.dataset.customError; });
    const extra = custom ? custom(data(form), form) || {} : {};
    Object.entries(extra).forEach(([name, message]) => { const f = form.elements[name]; const el = f?.length && !f.tagName ? f[0] : f; if (el) el.dataset.customError = message; });
    const invalid = [];
    const seenGroups = new Set();
    fields.forEach((f) => {
      if ((f.type === 'checkbox' || f.type === 'radio') && f.name && form.querySelectorAll(`[name="${CSS.escape(f.name)}"]`).length > 1) {
        if (seenGroups.has(f.name)) return;
        seenGroups.add(f.name);
      }
      const bad = !f.checkValidity() || f.dataset.customError;
      setFieldError(f, bad ? messageFor(f) : '');
      if (bad && !invalid.some((x) => x.name && x.name === f.name)) invalid.push(f);
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
    $$('input[type="checkbox"][data-multi]', form).forEach((box) => { if (!(box.name in out)) out[box.name] = []; else out[box.name] = [].concat(out[box.name]); });
    return out;
  }
  /* bindForm: validates, runs submit(values) (a Promise from QTSCStore.request), shows a busy submit
   * button, a recoverable error with retry that keeps the input, and calls success(result, values). */
  function bindForm(form, { submit, success, validate, busyLabel = 'Sending…' }) {
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';
    form.noValidate = true;
    const button = $('[type="submit"]', form);
    const idle = button?.innerHTML;
    $$('input, select, textarea', form).forEach((f) => f.addEventListener(f.type === 'checkbox' || f.tagName === 'SELECT' || f.type === 'file' ? 'change' : 'blur', () => {
      if (f.getAttribute('aria-invalid') === 'true') { delete f.dataset.customError; setFieldError(f, f.checkValidity() ? '' : messageFor(f)); }
    }));
    const run = async () => {
      const invalid = validateForm(form, validate);
      if (invalid.length) {
        formAlert(form, 'error', `<strong>${invalid.length === 1 ? 'One field needs' : `${invalid.length} fields need`} attention.</strong>`);
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
        const alert = formAlert(form, 'error', `<strong>Your request was not sent.</strong> <span>${esc(error.message || 'Something went wrong.')} What you entered is still here.</span> <button type="button" class="btn btn-secondary" data-retry>Try again</button>`);
        $('[data-retry]', alert).addEventListener('click', run);
        alert.focus();
      } finally {
        if (button) { button.disabled = false; button.removeAttribute('aria-busy'); button.innerHTML = idle; }
        form.removeAttribute('aria-busy');
      }
    };
    form.addEventListener('submit', (event) => { event.preventDefault(); run(); });
  }

  /* Success panel replacing (or following) a form. */
  function successPanel({ title, reference, lines = [], actions = [] }) {
    const panel = document.createElement('div');
    panel.className = 'proto-success';
    panel.setAttribute('role', 'status');
    panel.setAttribute('tabindex', '-1');
    panel.dataset.state = 'success';
    panel.innerHTML = `<p class="proto-success-kicker">Received</p><h3>${esc(title)}</h3>`
      + (reference ? `<p class="proto-ref">Reference <strong>${esc(reference)}</strong></p>` : '')
      + lines.map((line) => `<p>${esc(line)}</p>`).join('')
      + (actions.length ? `<div class="state-actions">${actions.map((a, i) => (a.href ? `<a class="btn ${i ? 'btn-secondary' : 'btn-primary'}" href="${esc(a.href)}">${esc(a.label)}</a>` : `<button type="button" class="btn ${i ? 'btn-secondary' : 'btn-primary'}" data-success-action="${i}">${esc(a.label)}</button>`)).join('')}</div>` : '');
    actions.forEach((a, i) => { if (a.onClick) $(`[data-success-action="${i}"]`, panel)?.addEventListener('click', a.onClick); });
    return panel;
  }

  /* --------------------------------------------------------- confirm dialog */
  function confirmDialog({ title, text, confirmLabel = 'Confirm', cancelLabel = 'Cancel', tone = 'danger' }) {
    return new Promise((resolve) => {
      const returnFocus = document.activeElement;
      const wrap = document.createElement('div');
      wrap.className = 'proto-modal';
      wrap.innerHTML = `<div class="proto-modal-backdrop" data-cancel></div><section class="proto-modal-card" role="alertdialog" aria-modal="true" aria-labelledby="protoModalTitle" aria-describedby="protoModalText"><h2 id="protoModalTitle">${esc(title)}</h2><p id="protoModalText">${esc(text)}</p><div class="state-actions"><button type="button" class="btn btn-secondary" data-cancel>${esc(cancelLabel)}</button><button type="button" class="btn ${tone === 'danger' ? 'btn-danger' : 'btn-primary'}" data-confirm>${esc(confirmLabel)}</button></div></section>`;
      document.body.append(wrap);
      document.body.classList.add('is-locked');
      const close = (value) => { wrap.remove(); document.body.classList.remove('is-locked'); document.removeEventListener('keydown', onKey, true); if (returnFocus && document.contains(returnFocus)) returnFocus.focus(); resolve(value); };
      const onKey = (event) => {
        if (event.key === 'Escape') { event.stopPropagation(); close(false); }
        if (event.key === 'Tab') { const items = $$('button', wrap); const i = items.indexOf(document.activeElement); event.preventDefault(); items[(i + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus(); }
      };
      document.addEventListener('keydown', onKey, true);
      $('[data-confirm]', wrap).addEventListener('click', () => close(true));
      $$('[data-cancel]', wrap).forEach((el) => el.addEventListener('click', () => close(false)));
      setTimeout(() => $('[data-cancel].btn', wrap).focus(), 10);
    });
  }

  /* Detail page lifecycle: hides [data-detail] sections, shows loading in #detailState, then renders the
   * record, a not-found state (with an h1) or an error with retry. */
  function detailPage({ load, render, notFound, loadingTitle = 'Loading…' }) {
    const sections = $$('[data-detail]');
    const holder = $('#detailState');
    const inner = $('#detailStateInner') || holder;
    const toggle = (on) => { sections.forEach((s) => { s.hidden = !on; }); if (holder) holder.hidden = on; };
    const run = () => {
      toggle(false);
      showState(inner, 'loading', { title: loadingTitle, rows: 2 });
      store.request(load, { delay: 300 }).then((item) => {
        if (!item) {
          document.title = `${notFound.title} | Northbank`;
          showState(inner, 'notfound', { heading: 'h1', ...notFound });
          inner.dataset.state = 'notfound';
          return;
        }
        render(item);
        toggle(true);
        inner.dataset.state = 'ready';
        document.dispatchEvent(new CustomEvent('qtsc:detail-ready'));
      }).catch((error) => { inner.dataset.state = 'error'; showState(inner, 'error', { heading: 'h1', title: 'This page did not load.', text: `${error.message} You can try again.`, action: { label: 'Try again', onClick: run } }); });
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
  const csv = (rows) => rows.map((row) => row.map((cell) => { const s = String(cell ?? ''); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\r\n');

  function toast(message) { if (window.QTSC?.toast) window.QTSC.toast(message); }

  /* ------------------------------------------------------------- demo tools */
  const DEMO_KEY = 'qtsc-demo-tools';
  function demoOn() {
    const flag = params().get('demo');
    try {
      if (flag === '1') sessionStorage.setItem(DEMO_KEY, '1');
      if (flag === '0') sessionStorage.removeItem(DEMO_KEY);
      return sessionStorage.getItem(DEMO_KEY) === '1';
    } catch { return flag === '1'; }
  }
  function mountDemoTools() {
    if (!store || !demoOn() || $('.demo-tools')) return;
    const panel = document.createElement('aside');
    panel.className = 'demo-tools';
    panel.setAttribute('aria-label', 'Demo tools');
    panel.innerHTML = `<strong>Demo tools</strong>
      <nav aria-label="Demo shortcuts"><a href="office.html#my-bookings">My visits</a><a href="careers.html#my-applications">My applications</a><a href="newsletter.html#manage">Newsletter settings</a></nav>
      <button type="button" class="btn btn-secondary" data-proto-fail aria-pressed="false">Fail next requests: off</button>
      <button type="button" class="btn btn-secondary" data-proto-reset>Reset demo data</button>`;
    document.body.append(panel);
    const failButton = $('[data-proto-fail]', panel);
    const sync = () => { const on = store.settings().failRequests; failButton.setAttribute('aria-pressed', String(on)); failButton.textContent = `Fail next requests: ${on ? 'on' : 'off'}`; };
    sync();
    failButton.addEventListener('click', () => { const on = !store.settings().failRequests; store.setFailRequests(on); sync(); toast(on ? 'Requests will fail until you turn this off.' : 'Requests work normally again.'); });
    $('[data-proto-reset]', panel).addEventListener('click', async () => {
      const ok = await confirmDialog({ title: 'Reset demo data?', text: 'Visits, applications, requests and newsletter settings in this tab go back to their starting state.', confirmLabel: 'Reset demo data', cancelLabel: 'Cancel' });
      if (!ok) return;
      store.reset();
      try { sessionStorage.setItem('qtsc-prototype-flash', 'Demo data reset.'); } catch { /* ignore */ }
      location.reload();
    });
    document.addEventListener('qtsc:store', (event) => { if (event.detail?.reason === 'settings') sync(); });
  }
  function flash() {
    try { const message = sessionStorage.getItem('qtsc-prototype-flash'); if (message) { sessionStorage.removeItem('qtsc-prototype-flash'); setTimeout(() => toast(message), 150); } } catch { /* ignore */ }
  }

  window.QTSCUI = { $, $$, esc, NOTE, fmtDate, todayISO, params, setParams, showState, pager, bindForm, validateForm, setFieldError, formAlert, successPanel, confirmDialog, detailPage, download, csv, toast };
  const init = () => { mountDemoTools(); flash(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
