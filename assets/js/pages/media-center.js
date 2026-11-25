/* Press room: recent press releases from seed.articles (Northbank, Forge and investment news) and press
 * kit downloads, generated in the browser as plain-text SAMPLE files. */
(() => {
  const { $, $$, esc, fmtDate, download, toast, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const list = $('#mediaList');
  if (!list) return;

  const PRESS_CATS = ['news', 'forge', 'investment'];
  const loadReleases = () => {
    showState(list, 'loading', { title: 'Loading press releases…', rows: 2 });
    store.request(() => seed.articles.filter((a) => PRESS_CATS.includes(a.cat)).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5), { delay: 250 })
      .then((rows) => {
        list.dataset.state = 'ready';
        list.innerHTML = rows.map((a) => `<a class="release-row" href="article.html?id=${encodeURIComponent(a.id)}">`
          + `<time datetime="${esc(a.date)}">${esc(fmtDate(a.date))}</time>`
          + `<span><strong>${esc(a.title)}</strong><span>${esc(a.summary)}</span></span>`
          + '<span class="row-go" aria-hidden="true">→</span></a>').join('');
      })
      .catch((error) => { list.dataset.state = 'error'; showState(list, 'error', { title: 'Press releases did not load.', text: error.message, action: { label: 'Try again', onClick: loadReleases } }); });
  };
  loadReleases();

  const stamp = () => `Generated ${new Date().toISOString().slice(0, 10)}. SAMPLE FILE, not an official document.`;
  const KIT = [
    {
      id: 'fact-sheet', title: 'Fact sheet 2026', desc: 'Key numbers, buildings and services on one page.', updated: '2026-11-17',
      body: () => ['Opened: 2009', 'Site: 38 ha on the north bank of the Saigon River, Thu Duc City, Ho Chi Minh City', 'Buildings: Atlas, Beacon, Cobalt, Delta Labs, Echo Hall, Forge, Grove', 'Member companies: 142 from 11 countries', 'People on site: about 18,600', 'Data center: Cobalt, Tier III design; second 2 MW hall opens March 2027', 'Conference center: Echo Hall, 600 seats'],
    },
    {
      id: 'boilerplate', title: 'About Northbank, short and long', desc: 'Ready-to-use company description in 50 and 150 words.', updated: '2026-10-01',
      body: () => ['SHORT (50 words)', 'Northbank Technology Park is a 38-hectare campus on the Saigon River in Ho Chi Minh City. It offers offices, labs, a data center and support for 142 member companies from 11 countries, with about 18,600 people working on site.', '', 'LONG (150 words)', 'Northbank Technology Park opened in 2009 on the north bank of the Saigon River. Seven buildings house headquarters offices, flexible suites, the Cobalt data center, hardware labs, a 600-seat conference hall, the Forge startup center and a training and services building. The park helps companies find space, connect to infrastructure, hire and invest.'],
    },
    {
      id: 'name-logo', title: 'Name and logo use', desc: 'How to write the name and when to use the logo.', updated: '2026-08-20',
      body: () => ['Write "Northbank Technology Park" on first mention, then "Northbank".', 'Do not abbreviate to NTP.', 'Use the logo only to refer to the park, not to imply endorsement.', 'Leave clear space around the logo equal to the height of the N.', 'Ask press@northbank.example for logo files.'],
    },
    {
      id: 'photo-list', title: 'Campus photo list', desc: 'Captions and credits for the press photo set.', updated: '2026-09-15',
      body: () => ['01 Atlas and Beacon from the river, morning', '02 Cobalt data center, hall 1', '03 Delta Labs test floor', '04 Echo Hall, main auditorium', '05 Forge startup floor', '06 Grove canteen terrace', '', 'Credit: Northbank Technology Park. Free for editorial use.'],
    },
  ];
  const fileName = (k) => `northbank-press-${k.id}-SAMPLE.txt`;
  $('#pressKit').innerHTML = KIT.map((k) => `<article class="resource-card" data-kit-item="${esc(k.id)}"><h3>${esc(k.title)}</h3><p>${esc(k.desc)}</p>`
    + `<p class="resource-updated">Text file, updated ${esc(fmtDate(k.updated))}</p>`
    + `<button type="button" class="btn btn-secondary resource-action" data-kit="${esc(k.id)}" aria-label="Download ${esc(k.title)}">Download</button></article>`).join('');
  $$('[data-kit]').forEach((button) => button.addEventListener('click', () => {
    const k = KIT.find((x) => x.id === button.dataset.kit);
    button.disabled = true; button.textContent = 'Preparing…';
    store.request(() => ['SAMPLE FILE', `${k.title.toUpperCase()}, NORTHBANK TECHNOLOGY PARK`, stamp(), '', ...k.body(), '', 'Press contact: press@northbank.example'].join('\r\n'), { delay: 250 })
      .then((content) => { download(fileName(k), content, 'text/plain;charset=utf-8'); toast(`Downloaded ${fileName(k)}.`); })
      .catch((error) => toast(`Download failed: ${error.message}`))
      .finally(() => { button.disabled = false; button.textContent = 'Download'; });
  }));
})();
