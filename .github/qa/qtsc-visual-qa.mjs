import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const outDir = process.env.QA_OUT_DIR || 'qa-artifacts';

const viewports = {
  '320': { width: 320, height: 740 },
  '375': { width: 375, height: 812 },
  '414': { width: 414, height: 896 },
  '768': { width: 768, height: 1024 },
  '1024': { width: 1024, height: 768 },
  '1440': { width: 1440, height: 1000 }
};

const criticalPages = [
  'index.html',
  'office.html',
  'investment.html',
  'incentives.html',
  'companies.html',
  'marketplace.html',
  'services.html',
  'contact.html'
];

const secondaryPages = [
  'about.html',
  'explore.html',
  'technology-detail.html',
  'telecom.html',
  'innovation-centers.html',
  'amenities.html',
  'careers.html',
  'resources.html',
  'insights.html'
];

const matrix = [];
for (const page of criticalPages) {
  for (const viewportName of Object.keys(viewports)) matrix.push([page, viewportName]);
}
for (const page of secondaryPages) {
  for (const viewportName of ['375', '768', '1440']) matrix.push([page, viewportName]);
}

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(path.join(outDir, 'screenshots'), { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];

async function measurePage(page, route, viewportName) {
  return page.evaluate(({ route, viewportName }) => {
    const doc = document.documentElement;
    const body = document.body;
    const viewportWidth = window.innerWidth;
    const overflowX = Math.max(doc.scrollWidth, body?.scrollWidth || 0) - viewportWidth;
    const visibleMain = document.querySelector('main#main');
    const h1 = document.querySelector('main h1');
    const buttons = [...document.querySelectorAll('a,button,input,select,textarea')]
      .filter(el => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
      });
    const smallTargets = buttons.filter(el => {
      const r = el.getBoundingClientRect();
      return r.width < 40 || r.height < 40;
    }).slice(0, 20).map(el => ({
      tag: el.tagName,
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 60),
      width: Math.round(el.getBoundingClientRect().width),
      height: Math.round(el.getBoundingClientRect().height)
    }));
    const badAnchors = [...document.querySelectorAll('a[href="#"]')].map(a => (a.textContent || '').trim()).filter(Boolean);
    const duplicateIds = [...document.querySelectorAll('[id]')].map(el => el.id).filter((id, i, arr) => arr.indexOf(id) !== i);
    return {
      route,
      viewport: viewportName,
      title: document.title,
      overflowX: Math.round(overflowX),
      hasMain: Boolean(visibleMain),
      hasH1: Boolean(h1 && h1.textContent.trim()),
      mainHeight: visibleMain ? Math.round(visibleMain.getBoundingClientRect().height) : 0,
      smallTargets,
      badAnchors: [...new Set(badAnchors)],
      duplicateIds: [...new Set(duplicateIds)],
      bodyTextLength: (body?.innerText || '').trim().length
    };
  }, { route, viewportName });
}

for (const [route, viewportName] of matrix) {
  const viewport = viewports[viewportName];
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const consoleErrors = [];
  const localRequestFailures = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(`pageerror: ${err.message}`));
  page.on('requestfailed', request => {
    try {
      const url = new URL(request.url());
      if (url.origin === baseURL) localRequestFailures.push(`${request.method()} ${url.pathname}: ${request.failure()?.errorText || 'failed'}`);
    } catch {}
  });

  let response;
  try {
    response = await page.goto(`${baseURL}/${route}`, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (error) {
    failures.push(`${route} @ ${viewportName}: navigation failed — ${error.message}`);
    await context.close();
    continue;
  }

  await page.waitForTimeout(200);
  const metrics = await measurePage(page, route, viewportName);
  metrics.httpStatus = response?.status() || null;
  metrics.consoleErrors = consoleErrors;
  metrics.localRequestFailures = localRequestFailures;

  const shotName = `${route.replace('.html','')}-${viewportName}.png`;
  await page.screenshot({ path: path.join(outDir, 'screenshots', shotName), fullPage: true });
  results.push(metrics);

  if (!response || !response.ok()) failures.push(`${route} @ ${viewportName}: HTTP ${response?.status() ?? 'no response'}`);
  if (!metrics.hasMain || !metrics.hasH1 || metrics.bodyTextLength < 120) failures.push(`${route} @ ${viewportName}: missing/empty primary content`);
  if (metrics.overflowX > 2) failures.push(`${route} @ ${viewportName}: horizontal overflow ${metrics.overflowX}px`);
  if (metrics.duplicateIds.length) failures.push(`${route} @ ${viewportName}: duplicate ids ${metrics.duplicateIds.join(', ')}`);
  if (metrics.badAnchors.length) failures.push(`${route} @ ${viewportName}: placeholder href=# links: ${metrics.badAnchors.join(' | ')}`);
  if (localRequestFailures.length) failures.push(`${route} @ ${viewportName}: local asset failures: ${localRequestFailures.join(' | ')}`);
  if (consoleErrors.some(x => /ReferenceError|TypeError|SyntaxError|pageerror:/i.test(x))) failures.push(`${route} @ ${viewportName}: runtime console error: ${consoleErrors.join(' | ')}`);

  await context.close();
}

async function runInteraction(name, route, viewport, fn) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  try {
    await page.goto(`${baseURL}/${route}`, { waitUntil: 'networkidle', timeout: 30000 });
    await fn(page);
    if (errors.length) failures.push(`${name}: page errors — ${errors.join(' | ')}`);
    results.push({ interaction: name, route, passed: true, errors });
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    results.push({ interaction: name, route, passed: false, error: error.message });
  } finally {
    await context.close();
  }
}

await runInteraction('mobile menu open/close + focus', 'index.html', viewports['375'], async page => {
  const trigger = page.locator('#mobileMenuOpen');
  await trigger.click();
  await page.locator('#innerMobileMenu.open').waitFor({ state: 'visible' });
  const expanded = await trigger.getAttribute('aria-expanded');
  if (expanded !== 'true') throw new Error('mobile menu aria-expanded did not become true');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#innerMobileMenu')?.classList.contains('open'));
});

await runInteraction('global search open/escape', 'index.html', viewports['1440'], async page => {
  await page.locator('#searchOpen').click();
  await page.locator('#searchOverlay.open').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#searchOverlay')?.classList.contains('open'));
});

await runInteraction('contact drawer open/escape', 'office.html', viewports['375'], async page => {
  await page.locator('[data-open-connect], [data-demo-contact]').first().click();
  await page.locator('#connectOverlay.open').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#connectOverlay')?.classList.contains('open'));
});

await runInteraction('company filter', 'companies.html', viewports['375'], async page => {
  await page.locator('.pill-tabs [data-filter="data"]').click();
  const active = await page.locator('.pill-tabs [data-filter="data"]').getAttribute('aria-selected');
  if (active !== 'true') throw new Error('company filter aria-selected not updated');
});

await runInteraction('marketplace filter', 'marketplace.html', viewports['375'], async page => {
  await page.locator('.pill-tabs [data-filter="cyber"]').click();
  const active = await page.locator('.pill-tabs [data-filter="cyber"]').getAttribute('aria-selected');
  if (active !== 'true') throw new Error('marketplace filter aria-selected not updated');
});

await runInteraction('office building selector', 'office.html', viewports['768'], async page => {
  const before = await page.locator('#officeName').textContent();
  await page.locator('[data-office="helios"]').click();
  const after = await page.locator('#officeName').textContent();
  if (!after || after === before || !/Helios/i.test(after)) throw new Error('office selector did not update content');
});

await browser.close();

const report = {
  generatedAt: new Date().toISOString(),
  headSha: process.env.GITHUB_SHA || null,
  testedPages: [...criticalPages, ...secondaryPages],
  viewportMatrix: Object.keys(viewports),
  screenshotCount: matrix.length,
  failures,
  results
};
await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const md = [
  '# QTSC Visual / Device QA',
  '',
  `- Head SHA: ${report.headSha || 'local'}`,
  `- Pages: ${report.testedPages.length}`,
  `- Screenshots: ${report.screenshotCount}`,
  `- Viewports: ${report.viewportMatrix.join(', ')} px`,
  `- Result: ${failures.length ? `FAIL (${failures.length})` : 'PASS'}`,
  '',
  '## Failures',
  '',
  ...(failures.length ? failures.map(x => `- ${x}`) : ['- None']),
  '',
  '## Notes',
  '',
  '- Critical journeys are rendered at all six breakpoints.',
  '- Secondary routes are rendered at mobile, tablet and desktop.',
  '- Screenshots are uploaded as the workflow artifact for human visual inspection.',
  '- Automated checks cover horizontal overflow, missing primary content, duplicate IDs, placeholder links, local asset failures and runtime JS errors.',
  '- Interaction checks cover mobile navigation, search, contact drawer, directory filters, marketplace filters and office selector.'
].join('\n');
await fs.writeFile(path.join(outDir, 'report.md'), md);
console.log(md);

if (failures.length) process.exit(1);
