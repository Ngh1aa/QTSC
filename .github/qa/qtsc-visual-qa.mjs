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

const allPages = [
  'index.html',
  'about.html',
  'amenities.html',
  'awards.html',
  'careers.html',
  'community.html',
  'companies.html',
  'company-detail.html',
  'contact.html',
  'digitech-center.html',
  'explore.html',
  'incentives.html',
  'innovation-centers.html',
  'insights.html',
  'investment.html',
  'legal.html',
  'marketplace.html',
  'media-center.html',
  'newsletter.html',
  'office.html',
  'open-data.html',
  'privacy.html',
  'qtsc-chain.html',
  'resources.html',
  'services.html',
  'sitemap.html',
  'technology-detail.html',
  'telecom.html'
];

const criticalPages = [
  'index.html',
  'companies.html',
  'marketplace.html',
  'office.html',
  'services.html',
  'investment.html',
  'incentives.html',
  'insights.html',
  'open-data.html',
  'contact.html'
];

const criticalSet = new Set(criticalPages);
const secondaryPages = allPages.filter(page => !criticalSet.has(page));
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
    const controls = [...document.querySelectorAll('button,input,select,textarea,[role="button"]')]
      .filter(el => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
      });
    const smallControls = controls.filter(el => {
      const r = el.getBoundingClientRect();
      return r.width < 40 || r.height < 40;
    }).slice(0, 20).map(el => ({
      tag: el.tagName,
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 60),
      width: Math.round(el.getBoundingClientRect().width),
      height: Math.round(el.getBoundingClientRect().height)
    }));
    const badAnchors = [...document.querySelectorAll('a[href="#"]')]
      .map(a => (a.textContent || '').trim()).filter(Boolean);
    const duplicateIds = [...document.querySelectorAll('[id]')]
      .map(el => el.id).filter((id, i, arr) => arr.indexOf(id) !== i);
    return {
      route,
      viewport: viewportName,
      title: document.title,
      overflowX: Math.round(overflowX),
      hasMain: Boolean(visibleMain),
      hasH1: Boolean(h1 && h1.textContent.trim()),
      mainHeight: visibleMain ? Math.round(visibleMain.getBoundingClientRect().height) : 0,
      smallControls,
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
  if (['320','375','414'].includes(viewportName) && metrics.smallControls.length) {
    failures.push(`${route} @ ${viewportName}: small primary controls: ${metrics.smallControls.map(x => `${x.tag} ${x.width}x${x.height} ${x.text}`).join(' | ')}`);
  }

  await context.close();
}

async function validateLocalLinks() {
  const context = await browser.newContext({ viewport: viewports['1440'], reducedMotion: 'reduce' });
  const page = await context.newPage();
  const uniqueTargets = new Map();
  for (const route of allPages) {
    await page.goto(`${baseURL}/${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const hrefs = await page.locator('main a[href], footer a[href]').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')).filter(Boolean));
    for (const href of hrefs) {
      if (/^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
      const target = new URL(href, `${baseURL}/${route}`);
      if (target.origin !== baseURL) continue;
      const pathname = target.pathname.replace(/^\//, '') || 'index.html';
      if (!pathname.endsWith('.html')) continue;
      const key = `${pathname}${target.hash}`;
      if (!uniqueTargets.has(key)) uniqueTargets.set(key, { pathname, hash: target.hash, source: route, href });
    }
  }

  for (const target of uniqueTargets.values()) {
    const response = await context.request.get(`${baseURL}/${target.pathname}`);
    if (!response.ok()) {
      failures.push(`local link from ${target.source}: ${target.href} → HTTP ${response.status()}`);
      continue;
    }
    if (target.hash) {
      const id = decodeURIComponent(target.hash.slice(1));
      const html = await response.text();
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const idPattern = new RegExp(`\\bid=["']${escaped}["']`);
      if (!idPattern.test(html)) failures.push(`local hash from ${target.source}: ${target.href} → missing #${id}`);
    }
  }
  results.push({ linkIntegrity: true, checkedTargets: uniqueTargets.size });
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

await validateLocalLinks();

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
  testedPages: allPages,
  criticalPages,
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
  `- Public pages: ${report.testedPages.length}`,
  `- Screenshots: ${report.screenshotCount}`,
  `- Viewports: ${report.viewportMatrix.join(', ')} px`,
  `- Result: ${failures.length ? `FAIL (${failures.length})` : 'PASS'}`,
  '',
  '## Failures',
  '',
  ...(failures.length ? failures.map(x => `- ${x}`) : ['- None']),
  '',
  '## Scope',
  '',
  '- Ten priority/archetype pages are rendered at all six breakpoints.',
  '- Every other public page is rendered at mobile, tablet and desktop.',
  '- Screenshots are uploaded as workflow artifacts for human visual inspection.',
  '- Automated checks cover horizontal overflow, missing primary content, duplicate IDs, placeholder links, local asset failures, runtime JS errors, small primary controls on mobile and local HTML/hash link integrity.',
  '- Interaction checks cover mobile navigation, search, contact drawer, directory filters, marketplace filters and office selector.',
  '- This is regression evidence only; it is not a claim of WCAG conformance or user-validated UX improvement.'
].join('\n');
await fs.writeFile(path.join(outDir, 'report.md'), md);
console.log(md);

if (failures.length) process.exit(1);
