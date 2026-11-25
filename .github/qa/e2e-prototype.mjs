// Northbank prototype end-to-end test (repository still named QTSC).
// Rewritten on 2026-11-25 for the fictional Northbank content: same steps and behaviour, English copy and new
// data ids. Demo tools only appear with ?demo=1, so the first step opens the home page with it. The old check that
// confirmations say "nothing was sent" became a check for the reference number: prototype notes are not shown on
// screen any more (AGENTS.md rule 3). See docs/redesign/plan.md, "Tests changed".
//
//   py -3 -m http.server 8926 --bind 127.0.0.1      (repo root)
//   NODE_PATH=<folder with playwright> node .github/qa/e2e-prototype.mjs
//
// Covers every main workflow (directory, marketplace + demo request, office
// booking + my bookings, investment checker + enquiry, insights, resources,
// careers + my applications, newsletter, contact, open data + CSV), simulated
// request failure + recovery, session persistence and "Reset demo data".
// Also loads every page and fails on console errors or href="#".
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const baseURL = (process.env.QA_BASE_URL || 'http://127.0.0.1:8926').replace(/\/$/, '');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const outDir = process.env.QA_OUT_DIR || 'qa-artifacts';
const results = [];
const consoleErrors = [];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true, reducedMotion: 'reduce', locale: 'en-GB' });

// Local files go through a cache with retries (python http.server on Windows can refuse
// connection bursts); external hosts are blocked so the run is deterministic and offline.
const cache = new Map();
await context.route('**/*', async route => {
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
});

const page = await context.newPage();
page.on('console', msg => {
  if (msg.type() !== 'error') return;
  const where = msg.location()?.url || '';
  if (/Failed to load resource/.test(msg.text()) && !where.startsWith(baseURL)) return; // blocked external asset
  if (/Failed to load resource/.test(msg.text()) && /net::ERR_FAILED/.test(msg.text())) return;
  consoleErrors.push(`${page.url().replace(baseURL, '')}: ${msg.text()}`);
});
page.on('pageerror', err => consoleErrors.push(`${page.url().replace(baseURL, '')}: pageerror ${err.message}`));

const go = async (p, ready) => {
  await page.goto(`${baseURL}/${p}`, { waitUntil: 'domcontentloaded' });
  if (ready) await page.waitForSelector(ready, { timeout: 10000 });
};
const expect = (cond, message) => { if (!cond) throw new Error(message); };
const text = sel => page.locator(sel).first().innerText();
// Blur the focused field first so its inline error (removed on blur) does not shift the layout mid-click.
const tick = async sel => { await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(50); await page.check(sel); };
const confirm = async () => { await page.waitForSelector('.proto-modal [data-confirm]'); await page.click('.proto-modal [data-confirm]'); await page.waitForSelector('.proto-modal', { state: 'detached' }); };
async function step(name, fn) {
  const started = Date.now();
  const before = consoleErrors.length;
  try {
    await fn();
    const errs = consoleErrors.slice(before);
    if (errs.length) throw new Error(`console errors: ${errs.join(' | ')}`);
    results.push({ name, ok: true, ms: Date.now() - started });
    console.log(`  ok   ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: error.message.split('\n')[0] });
    console.log(`  FAIL ${name}\n       ${error.message.split('\n')[0]}`);
    await page.screenshot({ path: path.join(outDir, `fail-${results.length}.png`) }).catch(() => {});
  }
}
function visitDate(offset = 2) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
await fs.mkdir(outDir, { recursive: true });

console.log(`Northbank prototype E2E against ${baseURL}`);

await step('reset to seed before run', async () => {
  await go('index.html?demo=1', '[data-proto-reset]');
  await page.click('[data-proto-reset]');
  await confirm();
  await page.waitForSelector('[data-proto-reset]');
  const user = await page.evaluate(() => window.QTSCStore.user());
  expect(user.bookings.length === 1 && user.applications.length === 1 && user.newsletter === null, 'seed state not restored');
});

await step('every page: loads, no console errors, no href="#"', async () => {
  const files = (await fs.readdir(root)).filter(f => f.endsWith('.html')).sort();
  const bad = [];
  for (const file of files) {
    await go(file);
    await page.waitForLoadState('load').catch(() => {});
    await page.waitForTimeout(400);
    const placeholders = await page.evaluate(() => [...document.querySelectorAll('a[href="#"], a[href=""]')].map(a => a.outerHTML.slice(0, 80)));
    if (placeholders.length) bad.push(`${file}: ${placeholders.join(' ')}`);
  }
  expect(!bad.length, `href="#" found: ${bad.join(' | ')}`);
  expect(files.length >= 32, `expected 32+ pages, found ${files.length}`);
});

await step('company directory: search, filters, pagination, empty state, URL state', async () => {
  await go('companies.html', '#companyResults[data-state="ready"]');
  const first = await page.locator('#companyResults .entity-card').count();
  expect(first === 12, `page 1 should show 12 companies, got ${first}`);
  await page.click('#companyPager button:has-text("Next")');
  await page.waitForFunction(() => location.search.includes('page=2'));
  await page.click('#companyPills [data-filter="data"]');
  await page.waitForSelector('#companyPills [data-filter="data"][aria-selected="true"]');
  await page.waitForFunction(() => location.search.includes('sector=data') && !location.search.includes('page='));
  const dataCount = await page.locator('#companyResults .entity-card').count();
  expect(dataCount > 0 && dataCount < 12, `data filter count ${dataCount}`);
  await page.selectOption('#companyBuilding', 'Cobalt');
  await page.waitForFunction(() => location.search.includes('building='));
  await page.fill('#innerSearch', 'zzzz-no-match');
  await page.waitForSelector('#companyResults[data-state="empty"]');
  await page.click('#companyResults [data-state-action]');
  await page.waitForSelector('#companyResults[data-state="ready"]');
  expect(await page.inputValue('#innerSearch') === '', 'search not cleared');
  await page.fill('#innerSearch', 'Mangrove');
  await page.waitForSelector('#companyResults [data-company="mangrove"]');
  await go('companies.html?q=Mangrove', '#companyResults [data-company="mangrove"]');
});

await step('company detail via ?id= and not-found state', async () => {
  await page.click('#companyResults [data-company="mangrove"]');
  await page.waitForSelector('#detailStateInner[data-state="ready"]', { state: 'attached' });
  expect((await text('#companyName')) === 'Mangrove AI', 'detail name mismatch');
  expect(page.url().includes('company-detail.html?id=mangrove'), 'detail URL should use ?id=');
  expect(await page.locator('#companySolutions a[href^="solution-detail.html?id="]').count() > 0, 'company solutions should link to solution detail');
  await go('company-detail.html?id=no-such-company', '#detailStateInner[data-state="notfound"]');
  expect(/Company not found/.test(await text('#detailStateInner h1')), 'not-found heading missing');
});

await step('marketplace: search, filter, solution detail, demo request validation + success + cancel', async () => {
  await go('marketplace.html', '#solutionResults[data-state="ready"]');
  await page.click('#solutionPills [data-filter="cyber"]');
  await page.waitForSelector('#solutionPills [data-filter="cyber"][aria-selected="true"]');
  await page.fill('#innerSearch', 'DocuSift');
  await page.click('#solutionPills [data-filter="all"]');
  await page.waitForSelector('#solutionResults .entity-card:has-text("DocuSift")');
  await page.click('#solutionResults .entity-card:has-text("DocuSift")');
  await page.waitForSelector('#detailStateInner[data-state="ready"]', { state: 'attached' });
  await page.click('#solutionRequestForm [type="submit"]');
  await page.waitForSelector('#solutionRequestForm .form-alert.is-error');
  expect(await page.locator('#solutionRequestForm [aria-invalid="true"]').count() >= 4, 'expected inline field errors');
  await page.fill('#sr-name', 'Ha Le');
  await page.fill('#sr-email', 'ha.le@example.com');
  await page.fill('#sr-company', 'Example Trading');
  await page.fill('#sr-date', visitDate(3));
  await page.fill('#sr-message', 'We need to read 20,000 supplier invoices a month.');
  await tick('#solutionRequestForm [name="consent"]');
  await page.click('#solutionRequestForm [type="submit"]');
  await page.waitForSelector('#requestHost .proto-success');
  expect(/^[A-Z]{2}-/.test((await text('#requestHost .proto-ref strong')).trim()), 'confirmation must show a reference');
  await page.waitForSelector('#solutionRequests [data-cancel-request]');
  await page.click('#solutionRequests [data-cancel-request]');
  await confirm();
  await page.waitForSelector('#solutionRequests .badge:has-text("Cancelled")');
  await go('solution-detail.html?id=no-such-solution', '#detailStateInner[data-state="notfound"]');
});

await step('office: unit filters, unit detail, booking, persistence, reschedule, cancel', async () => {
  await go('office.html', '#unitResults[data-state="ready"]');
  await page.click('[data-office="atlas"]');
  expect(/Atlas/.test(await text('#officeName')), 'building selector should update');
  await page.selectOption('#unitBuilding', 'atlas');
  await page.selectOption('#unitStatus', 'available');
  await page.waitForFunction(() => location.search.includes('building=atlas') && location.search.includes('status=available'));
  await page.waitForSelector('#unitResults [data-unit="atlas-0705"]');
  await page.click('#unitResults [data-unit="atlas-0705"]');
  await page.waitForSelector('#detailStateInner[data-state="ready"]', { state: 'attached' });
  const sunday = (() => { const d = new Date(); d.setDate(d.getDate() + 1); while (d.getDay() !== 0) d.setDate(d.getDate() + 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
  await page.fill('#bk-date', sunday);
  await page.selectOption('#bk-time', '14:00');
  await page.fill('#bk-name', 'Bao Tran');
  await page.fill('#bk-email', 'bao.tran@example.com');
  await page.fill('#bk-phone', '0909123456');
  await tick('#bookingForm [name="consent"]');
  await page.click('#bookingForm [type="submit"]');
  await page.waitForSelector('#bookingForm .field-error:has-text("Sunday")');
  await page.fill('#bk-date', visitDate(4));
  await page.click('#bookingForm [type="submit"]');
  await page.waitForSelector('#bookingHost .proto-success');
  const ref = (await text('#bookingHost .proto-ref strong')).trim();
  expect(/^BK-/.test(ref), `booking ref ${ref}`);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await go('office.html#my-bookings', `#myBookings [data-booking="${ref}"]`);
  expect(await page.locator('#myBookings .proto-record').count() === 2, 'seeded + new booking expected');
  await page.click(`[data-reschedule="${ref}"]`);
  await page.waitForSelector(`[data-reschedule-form="${ref}"]`);
  await page.fill(`[data-reschedule-form="${ref}"] input[name="date"]`, visitDate(6));
  await page.selectOption(`[data-reschedule-form="${ref}"] select[name="time"]`, '09:30');
  await page.click(`[data-reschedule-form="${ref}"] [type="submit"]`);
  await page.waitForSelector(`[data-booking="${ref}"]:has-text("rescheduled")`);
  await page.click(`[data-cancel-booking="${ref}"]`);
  await confirm();
  await page.waitForSelector(`[data-booking="${ref}"] .badge:has-text("Cancelled")`);
  await go('office-unit.html?id=no-such-unit', '#detailStateInner[data-state="notfound"]');
});

await step('simulated failure: list error + retry, form error keeps input + retry', async () => {
  await go('contact.html', '[data-proto-fail]');
  await page.click('[data-proto-fail]');
  await page.waitForSelector('[data-proto-fail][aria-pressed="true"]');
  await go('companies.html', '#companyResults[data-state="error"]');
  await page.click('[data-proto-fail]');
  await page.waitForSelector('[data-proto-fail][aria-pressed="false"]');
  await page.click('#companyResults [data-state-action]');
  await page.waitForSelector('#companyResults[data-state="ready"]');
  await page.click('[data-proto-fail]');
  await page.waitForSelector('[data-proto-fail][aria-pressed="true"]');
  await go('contact.html?topic=office', '#contactForm');
  expect(await page.inputValue('#ct-topic') === 'office', 'topic prefill from ?topic=');
  await page.fill('#ct-name', 'Chau Pham');
  await page.fill('#ct-email', 'chau.pham@example.com');
  await page.fill('#ct-message', 'We need about 300 m² for an R&D team from Q1 2027.');
  await tick('#contactForm [name="consent"]');
  await page.click('#contactForm [type="submit"]');
  await page.waitForSelector('#contactForm .form-alert.is-error [data-retry]');
  expect(await page.inputValue('#ct-name') === 'Chau Pham', 'input must be kept after failure');
  await page.click('[data-proto-fail]');
  await page.waitForSelector('[data-proto-fail][aria-pressed="false"]');
  await page.click('#contactForm [data-retry]');
  await page.waitForSelector('#contactHost .proto-success');
  await page.waitForSelector('#contactHistory .proto-record');
});

await step('connect drawer stores the request and shows a reference', async () => {
  await go('company-detail.html?id=mangrove', '[data-detail]:not([hidden]) h1');
  await page.click('#companyContact');
  await page.waitForSelector('#connectOverlay.open #icf-name');
  expect((await page.inputValue('#icf-need')).includes('Mangrove AI'), 'need prefilled with company');
  await page.fill('#icf-name', 'Tam Vo');
  await page.fill('#icf-email', 'tam.vo@example.com');
  await tick('#innerConnectForm .form-consent input');
  await page.click('#innerConnectForm [type="submit"]');
  await page.waitForSelector('#innerFormSuccess .proto-success');
  expect(/^[A-Z]{2}-/.test((await text('#innerFormSuccess .proto-ref strong')).trim()), 'drawer confirmation shows a reference');
  expect((await page.evaluate(() => window.QTSCStore.list('contacts').length)) >= 1, 'drawer request stored');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#connectOverlay')?.classList.contains('open'));
});

await step('investment: eligibility checker, carry result into enquiry, submit', async () => {
  await go('incentives.html#checker', '#checkerForm');
  await page.click('#checkerForm [type="submit"]');
  await page.waitForSelector('#checkerForm .form-alert.is-error');
  await page.selectOption('#ck-sector', 'semiconductor-ai');
  await page.fill('#ck-capital', '120');
  await page.fill('#ck-headcount', '150');
  await page.selectOption('#ck-rnd', 'high');
  await tick('#checkerForm input[value="import"]');
  await page.click('#checkerForm [type="submit"]');
  await page.waitForSelector('#checkerResult[data-state="eligible"]');
  await page.click('#checkerToEnquiry');
  await page.waitForSelector('#enquiryForm');
  await page.waitForSelector('#enquiryDraftNote:not([hidden])');
  expect(await page.inputValue('#eq-sector') === 'semiconductor-ai', 'sector carried from checker');
  await page.fill('#eq-company', 'Example Chips');
  await page.fill('#eq-name', 'Nam Do');
  await page.fill('#eq-email', 'nam.do@example.com');
  await page.selectOption('#eq-timeline', 'Within 6 months');
  await tick('#enquiryForm [name="consent"]');
  await page.click('#enquiryForm [type="submit"]');
  await page.waitForSelector('#enquiryHost .proto-success');
  await page.waitForSelector('#enquiryList .proto-record');
});

await step('insights: category filter, article detail, not-found', async () => {
  await go('insights.html?cat=event', '#articleResults[data-state="ready"]');
  await page.waitForSelector('#articlePills [data-filter="event"][aria-selected="true"]');
  const cats = await page.locator('#articleResults .article-card').evaluateAll(n => n.map(x => x.dataset.category));
  expect(cats.length && cats.every(c => c === 'event'), 'only event articles expected');
  await page.click('#articlePills [data-filter="career"]');
  await page.waitForFunction(() => location.search.includes('cat=career'));
  await page.click('#articleResults .article-card a >> nth=0');
  await page.waitForSelector('#detailStateInner[data-state="ready"]', { state: 'attached' });
  expect(page.url().includes('article.html?id='), 'article URL');
  await page.waitForSelector('#articleExtra a[href^="job-detail.html?id="]');
  await go('article.html?id=no-such-article', '#detailStateInner[data-state="notfound"]');
});

await step('resources: search + category, generated sample download', async () => {
  await go('resources.html', '#resourceGrid[data-state="ready"]');
  await page.click('#resourceFilters [data-filter="business"]');
  await page.waitForSelector('#resourceGrid [data-resource="office-checklist"]');
  await page.fill('#resourceSearch', 'checklist');
  await page.waitForFunction(() => document.querySelectorAll('#resourceGrid .resource-card').length === 1);
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('[data-generate="office-checklist"]')]);
  expect(/SAMPLE/.test(download.suggestedFilename()), `sample file name ${download.suggestedFilename()}`);
  const body = await fs.readFile(await download.path(), 'utf8');
  expect(/SAMPLE FILE/.test(body), 'generated file must be labelled as a sample');
  await page.fill('#resourceSearch', 'no-such-document');
  await page.waitForSelector('#resourceGrid[data-state="empty"]');
});

await step('careers: search, job detail, apply (CV name only), my applications, withdraw', async () => {
  await go('careers.html', '#jobResults[data-state="ready"]');
  await page.click('#jobPills [data-filter="engineering"]');
  await page.fill('#jobSearch', 'Data Engineer');
  await page.waitForSelector('#jobResults [data-job="mangrove-data-engineer"]');
  await page.click('#jobResults [data-job="mangrove-data-engineer"]');
  await page.waitForSelector('#detailStateInner[data-state="ready"]', { state: 'attached' });
  await page.fill('#ap-name', 'Huy Ngo');
  await page.fill('#ap-email', 'huy@example.com');
  await page.fill('#ap-phone', '0912345678');
  await page.setInputFiles('#ap-cv', { name: 'NgoGiaHuy-CV.txt', mimeType: 'text/plain', buffer: Buffer.from('cv') });
  await tick('#applyForm [name="consent"]');
  await page.click('#applyForm [type="submit"]');
  await page.waitForSelector('#applyForm .field-error:has-text("PDF")');
  await page.setInputFiles('#ap-cv', { name: 'NgoGiaHuy-CV.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
  await page.click('#applyForm [type="submit"]');
  await page.waitForSelector('#applyHost .proto-success');
  const ref = (await text('#applyHost .proto-ref strong')).trim();
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#applyHost [data-state="empty"]:has-text("already applied")');
  await go('careers.html#my-applications', `#myApplications [data-application="${ref}"]`);
  expect((await text(`[data-application="${ref}"]`)).includes('NgoGiaHuy-CV.pdf'), 'CV file name stored');
  await page.click(`[data-withdraw="${ref}"]`);
  await confirm();
  await page.waitForSelector(`[data-application="${ref}"] .badge:has-text("Withdrawn")`);
  await go('job-detail.html?id=no-such-job', '#detailStateInner[data-state="notfound"]');
});

await step('newsletter: validation, subscribe, manage preferences, persistence, unsubscribe', async () => {
  await go('newsletter.html#manage', '#newsletterHost[data-state="subscribe"]');
  await page.fill('#nl-email', 'linh@example.com');
  await page.uncheck('#newsletterForm input[value="updates"]');
  await page.uncheck('#newsletterForm input[value="events"]');
  await tick('#newsletterForm [name="consent"]');
  await page.click('#newsletterForm [type="submit"]');
  await page.waitForSelector('#newsletterForm .field-error:has-text("at least one topic")');
  await tick('#newsletterForm input[value="careers"]');
  await page.click('#newsletterForm [type="submit"]');
  await page.waitForSelector('#newsletterHost .proto-success');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#newsletterHost[data-state="manage"]');
  await tick('#newsletterPrefs input[value="investment"]');
  await tick('#newsletterPrefs input[name="frequency"][value="events"]');
  await page.click('#newsletterPrefs [type="submit"]');
  await page.waitForSelector('#toast.show:has-text("Preferences saved")');
  const saved = await page.evaluate(() => window.QTSCStore.value('newsletter'));
  expect(saved.topics.includes('investment') && saved.frequency === 'events', `prefs not saved: ${JSON.stringify(saved)}`);
  await page.click('#nlUnsubscribe');
  await confirm();
  await page.waitForSelector('#newsletterHost[data-state="subscribe"]');
});

await step('open data: filters, table, CSV export of filtered rows', async () => {
  await go('open-data.html#explorer', '#odResults[data-state="ready"]');
  await page.selectOption('#odDataset', 'wastewater');
  await page.selectOption('#odParam', 'COD');
  await page.selectOption('#odFrom', '2026-06');
  await page.waitForFunction(() => location.search.includes('dataset=wastewater') && location.search.includes('from=2026-06'));
  const rows = await page.locator('#odResults tbody tr').count();
  expect(rows === 10, `expected 10 rows (2 stations x 5 months), got ${rows}`);
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('#odExport')]);
  const csv = (await fs.readFile(await download.path(), 'utf8')).replace(/^﻿/, '').trim().split(/\r?\n/);
  expect(csv[0].startsWith('month,group,dataset,station,parameter') && csv.length === 11, `CSV header ${csv[0]}, rows ${csv.length}`);
  await page.selectOption('#odStation', { index: 1 });
  await page.selectOption('#odStatus', 'over');
  await page.waitForSelector('#odResults[data-state="empty"], #odResults[data-state="ready"]');
});

await step('explore map pins select places', async () => {
  await go('explore.html', '.explore-pin');
  await page.click('.explore-pin[data-place="atlas"]');
  await page.waitForSelector('.place-card[data-place="atlas"][aria-pressed="true"]:has-text("Atlas")');
  await page.waitForSelector('.explore-selection a[href*="building=atlas"]');
});

await step('reset demo data restores the seed and survives reload', async () => {
  await go('office.html#my-bookings', '#myBookings[data-state="ready"]');
  expect(await page.locator('#myBookings .proto-record').count() === 2, 'pre-reset bookings');
  await page.click('[data-proto-reset]');
  await confirm();
  await page.waitForSelector('#myBookings[data-state="ready"]');
  expect(await page.locator('#myBookings .proto-record').count() === 1, 'reset should restore 1 seeded booking');
  const user = await page.evaluate(() => window.QTSCStore.user());
  expect(user.applications.length === 1 && user.contacts.length === 0 && user.enquiries.length === 0 && user.demoRequests.length === 0, 'reset user data');
  await page.click(`[data-cancel-booking="${user.bookings[0].id}"]`);
  await confirm();
  await page.waitForSelector('#myBookings .badge:has-text("Cancelled")');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#myBookings .badge:has-text("Cancelled")');
  await page.click('[data-proto-reset]');
  await confirm();
  await page.waitForSelector('#myBookings .badge:has-text("Confirmed")');
});

await browser.close();
const failed = results.filter(r => !r.ok);
const summary = { generatedAt: new Date().toISOString(), baseURL, passed: results.length - failed.length, failed: failed.length, results };
await fs.writeFile(path.join(outDir, 'e2e-prototype.json'), JSON.stringify(summary, null, 2));
console.log(`\n${summary.passed}/${results.length} steps passed`);
if (failed.length) process.exit(1);
