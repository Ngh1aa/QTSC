// QTSC control inventory: lists every visible interactive control on every page,
// activates it and records whether something meaningful happens.
//
//   QA_BASE_URL=http://127.0.0.1:8926 node .github/qa/control-inventory.mjs
//   (set NODE_PATH to a folder containing playwright; QA_STRICT=1 exits 1 on dead controls)
//
// Links are resolved without leaving the page: the local target must load, an
// in-page fragment must exist, and links into record detail pages must name a
// record (?id=...). Buttons, tabs, selects and text fields are activated; the
// run compares a signature of the visible page (rendered text, ARIA state,
// open overlays, URL) before and after, and also records downloads, popups and
// dialogs. A control is "dead" when nothing observable happens.
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright'); // CJS require honours NODE_PATH
const baseURL = (process.env.QA_BASE_URL || 'http://127.0.0.1:8926').replace(/\/$/, '');
const outDir = process.env.QA_OUT_DIR || 'qa-artifacts';
const viewport = { width: Number(process.env.QA_WIDTH || 1440), height: 1000 };
const root = process.env.QA_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const detailPages = ['company-detail.html', 'solution-detail.html', 'office-unit.html', 'article.html', 'job-detail.html'];

const pages = (await fs.readdir(root)).filter(f => f.endsWith('.html')).sort();
const browser = await chromium.launch({ headless: true });
const localStatus = new Map();

async function checkLocal(url) {
  if (localStatus.has(url)) return localStatus.get(url);
  let ok = false;
  try { const r = await fetch(url); ok = r.ok; } catch { ok = false; }
  localStatus.set(url, ok);
  return ok;
}

const signature = () => {
  const hash = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; };
  const text = document.body.innerText;
  const attrs = [...document.querySelectorAll('[aria-expanded],[aria-pressed],[aria-selected],[aria-current],[aria-invalid],details[open],.open,.active,[hidden]')]
    .map(e => `${e.tagName}${e.id}:${e.getAttribute('aria-expanded')}${e.getAttribute('aria-pressed')}${e.getAttribute('aria-selected')}${e.getAttribute('aria-current')}${e.getAttribute('aria-invalid')}${e.hasAttribute('hidden')}${e.className}`).join('|');
  const fields = [...document.querySelectorAll('input,select,textarea')].map(e => e.type === 'checkbox' || e.type === 'radio' ? e.checked : e.value).join('|');
  return { text: `${text.length}:${hash(text)}`, attrs: String(hash(attrs)), fields: String(hash(fields)), url: location.href };
};

async function listControls(page) {
  return page.evaluate(() => {
    const sel = 'a, button, input, select, textarea, summary, [role="button"], [role="tab"]';
    const vis = el => {
      if (el.closest('[hidden],[aria-hidden="true"]')) return false;
      const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const out = [];
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!vis(el)) return;
      el.dataset.invId = String(i);
      out.push({
        id: String(i), tag: el.tagName.toLowerCase(), type: el.getAttribute('type') || '',
        href: el.tagName === 'A' ? el.getAttribute('href') : null,
        abs: el.tagName === 'A' && el.getAttribute('href') ? el.href : null,
        inForm: !!el.closest('form'),
        disabled: el.disabled === true || el.getAttribute('aria-disabled') === 'true',
        selected: el.getAttribute('aria-selected') === 'true' || el.getAttribute('aria-pressed') === 'true' || el.getAttribute('aria-current') === 'page',
        label: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || el.name || '').replace(/\s+/g, ' ').trim().slice(0, 70)
      });
    });
    return out;
  });
}

async function openPage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load').catch(() => {});
  await page.waitForTimeout(1200);
}

// Serve local files through a cache with retries: python http.server on Windows can refuse
// bursts of connections when many page reloads exhaust ephemeral ports. External requests are blocked.
const cache = new Map();
async function serveLocal(route) {
  const url = route.request().url();
  if (!url.startsWith(baseURL)) return route.abort();
  if (cache.has(url)) return route.fulfill(cache.get(url));
  for (let i = 0; i < 8; i++) {
    try {
      const res = await route.fetch();
      const entry = { status: res.status(), headers: res.headers(), body: await res.body() };
      if (res.ok()) cache.set(url, entry);
      return route.fulfill(entry);
    } catch { await new Promise(t => setTimeout(t, 100 * (i + 1))); }
  }
  return route.abort();
}

const report = [];
for (const file of pages) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage();
  await page.route('**/*', route => serveLocal(route));
  const url = `${baseURL}/${file}`;
  await openPage(page, url);
  const controls = await listControls(page);
  const results = [];
  let dirty = false;

  for (const c of controls) {
    const r = { ...c, outcome: '', dead: false };
    if (c.tag === 'a') {
      const href = c.href;
      if (href === null || href === '' || href === '#' || /^javascript:/i.test(href)) {
        r.outcome = `placeholder href="${href ?? ''}"`; r.dead = true;
      } else if (/^(mailto|tel):/i.test(href)) {
        r.outcome = 'mail/tel link';
      } else if (href.startsWith('#')) {
        const exists = await page.evaluate(id => !!document.getElementById(decodeURIComponent(id)), href.slice(1));
        r.outcome = exists ? 'in-page anchor' : `missing anchor ${href}`; r.dead = !exists;
      } else if (c.abs && c.abs.startsWith(baseURL)) {
        const u = new URL(c.abs); const ok = await checkLocal(u.origin + u.pathname);
        const target = u.pathname.split('/').pop();
        const generic = detailPages.includes(target) && !u.searchParams.get('id') && !u.hash;
        r.outcome = !ok ? `broken local link ${u.pathname}` : generic ? `generic detail link ${target} (no record id)` : `local page ${target}${u.search}${u.hash}`;
        r.dead = !ok || generic;
      } else {
        r.outcome = 'external link';
      }
      results.push(r); continue;
    }

    if (c.disabled) { r.outcome = 'disabled by design (e.g. first-page Trước)'; results.push(r); continue; }
    if (dirty) { await openPage(page, url); await listControls(page); dirty = false; }
    const handle = page.locator(`[data-inv-id="${c.id}"]`).first();
    if (!(await handle.count()) || !(await handle.isVisible().catch(() => false))) { r.outcome = 'not visible after reset'; results.push(r); continue; }
    const before = await page.evaluate(signature);
    let download = false, popup = false, dialog = false;
    const onDownload = () => { download = true; };
    const onPopup = () => { popup = true; };
    const onDialog = d => { dialog = true; d.dismiss().catch(() => {}); };
    page.on('download', onDownload); context.on('page', onPopup); page.on('dialog', onDialog);
    try {
      const textual = c.tag === 'textarea' || (c.tag === 'input' && ['', 'text', 'search', 'email', 'tel', 'number', 'url', 'date'].includes(c.type));
      if (c.tag === 'input' && c.type === 'file') { r.outcome = 'file picker (opens OS dialog)'; }
      else if (textual) await handle.fill(c.type === 'number' ? '12' : c.type === 'date' ? '2026-12-01' : 'qtsc', { timeout: 2000 });
      else if (c.tag === 'select') {
        const opts = await handle.locator('option').evaluateAll(o => o.map(x => x.value));
        if (opts.length > 1) await handle.selectOption(opts[opts.length - 1], { timeout: 2000 });
      } else await handle.click({ timeout: 2500 });
      await page.waitForTimeout(650);
    } catch (e) {
      r.outcome = `activation failed: ${e.message.split('\n')[0].slice(0, 80)}`;
    }
    page.off('download', onDownload); context.off('page', onPopup); page.off('dialog', onDialog);
    let after;
    try { after = await page.evaluate(signature); } catch { after = { url: 'navigated' }; }
    const signals = [];
    if (after.url !== before.url) signals.push('url-change');
    if (after.text !== before.text) signals.push('content-change');
    if (after.attrs !== before.attrs) signals.push('state-change');
    if (download) signals.push('download');
    if (popup) signals.push('popup');
    if (dialog) signals.push('dialog');
    const field = ['input', 'select', 'textarea'].includes(c.tag);
    const fieldOnly = field && c.inForm && !signals.length;
    if (!r.outcome) r.outcome = signals.join(', ') || (fieldOnly ? 'form field (value submitted with its form)' : 'no observable effect');
    if (!signals.length && c.selected) r.outcome = 'already selected (no change expected)';
    r.dead = !signals.length && !fieldOnly && !c.selected && !r.outcome.startsWith('file picker');
    if (signals.length || field) dirty = true;
    results.push(r);
  }
  await context.close();
  const dead = results.filter(x => x.dead);
  report.push({ page: file, total: results.length, dead: dead.length, results });
  console.log(`${file.padEnd(40)} controls=${String(results.length).padStart(3)} dead=${dead.length}`);
  dead.forEach(d => console.log(`   DEAD ${d.tag}${d.type ? `[${d.type}]` : ''} "${d.label}" -> ${d.outcome}`));
}
await browser.close();

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, 'control-inventory.json'), JSON.stringify({ baseURL, viewport, generatedAt: new Date().toISOString(), pages: report }, null, 2));
const totals = report.reduce((a, p) => ({ controls: a.controls + p.total, dead: a.dead + p.dead }), { controls: 0, dead: 0 });
console.log(`\nPages: ${report.length}, controls: ${totals.controls}, dead: ${totals.dead}`);
if (process.env.QA_STRICT && totals.dead) process.exit(1);
