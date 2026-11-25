#!/usr/bin/env node
/* Inserts the shared shell (partials/head|header|footer|scripts.html) into every root *.html page between
 *   <!-- shell:NAME --> ... <!-- /shell:NAME -->
 * markers, and marks the current section in the main nav from <body data-section="...">.
 *
 *   node scripts/build-shell.cjs          rewrite pages
 *   node scripts/build-shell.cjs --check  exit 1 if any page is out of date (for CI)
 *
 * Partials are the only source for the shell: edit them, then run this script. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');
const names = ['head', 'header', 'footer', 'scripts'];
const partials = Object.fromEntries(names.map((n) => [n, fs.readFileSync(path.join(root, 'partials', `${n}.html`), 'utf8').replace(/\r\n/g, '\n').trimEnd()]));

const pages = fs.readdirSync(root).filter((f) => f.endsWith('.html')).sort();
const stale = [];
const missing = [];
for (const file of pages) {
  const full = path.join(root, file);
  const original = fs.readFileSync(full, 'utf8');
  const crlf = original.includes('\r\n');
  let html = original.replace(/\r\n/g, '\n');
  const section = (html.match(/<body[^>]*data-section="([^"]+)"/) || [])[1] || '';
  for (const name of names) {
    const re = new RegExp(`<!-- shell:${name} -->[\\s\\S]*?<!-- /shell:${name} -->`);
    if (!re.test(html)) { missing.push(`${file}: shell:${name}`); continue; }
    let content = partials[name];
    if (name === 'header' && section) content = content.replace(`data-nav="${section}"`, `data-nav="${section}" aria-current="page"`);
    html = html.replace(re, () => `<!-- shell:${name} -->\n${content}\n<!-- /shell:${name} -->`);
  }
  const out = crlf ? html.replace(/\n/g, '\r\n') : html;
  if (out !== original) { stale.push(file); if (!check) fs.writeFileSync(full, out); }
}
if (missing.length) { console.error(`Missing shell markers:\n  ${missing.join('\n  ')}`); process.exitCode = 1; }
if (check && stale.length) { console.error(`Shell out of date in: ${stale.join(', ')}. Run node scripts/build-shell.cjs`); process.exitCode = 1; }
console.log(`${check ? 'Checked' : 'Built'} shell in ${pages.length} pages${stale.length ? `, ${check ? 'stale' : 'updated'}: ${stale.length}` : ''}.`);
