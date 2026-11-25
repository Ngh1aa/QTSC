/* Resources: search (?q=), category pills (?cat=) and format filter (?format=) over seed.resources.
 * Each download button [data-generate=<id>] builds a plain-text SAMPLE file in the browser. */
(() => {
  const { $, $$, esc, fmtDate, download, toast } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;
  if (!$('#resourceGrid')) return;

  const pills = $('#resourceFilters');
  pills.insertAdjacentHTML('beforeend', Object.entries(seed.resourceCategories)
    .map(([key, label]) => `<button type="button" class="pill" data-filter="${esc(key)}" role="tab" aria-selected="false">${esc(label)}</button>`).join(''));
  const formatSelect = $('#resourceFormat');
  const formats = [...new Set(seed.resources.map((r) => r.format))].sort();
  formatSelect.insertAdjacentHTML('beforeend', formats.map((f) => `<option value="${esc(f)}">${esc(f)}</option>`).join(''));
  const latest = [...seed.resources].sort((a, b) => b.updated.localeCompare(a.updated))[0];
  $('#resourceFacts').innerHTML = [
    [String(seed.resources.length), 'documents'],
    [String(Object.keys(seed.resourceCategories).length), 'categories'],
    [String(formats.length), 'formats'],
    [fmtDate(latest.updated, { weekday: false }), 'last update'],
  ].map(([v, l]) => `<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('');

  /* Body lines for each document; anything not listed gets its description only. */
  const CONTENT = {
    'northbank-guide': ['Campus: 38 ha on the north bank of the Saigon River, 7 buildings.', 'Buildings: Atlas, Beacon, Cobalt, Delta Labs, Echo Hall, Forge, Grove.', 'Members: 142 companies from 11 countries, about 18,600 people on site.', 'Becoming a member: book a visit at contact.html?topic=visit.'],
    'campus-map': ['Main gate: River Road, open 24 hours with card access.', 'Visitor parking: in front of Atlas, 120 spaces.', 'River jetty: shuttle to Thu Thiem every 20 minutes at peak hours.', 'Interactive map: explore.html.'],
    'fitout-guide': ['1. Send drawings to building services 15 working days before work starts.', '2. Only approved contractors may work on raised floors and ceilings.', '3. Noisy work runs from 18:00 to 07:00 on weekdays.', '4. A final inspection is needed before you move in.'],
    'office-checklist': ['1. Headcount today and in 12 months.', '2. Floor area needed (m2) and meeting rooms.', '3. Move-in date.', '4. Network: bandwidth, data center link, server room.', '5. Fit-out: furnished suite or your own design.', '6. Access cards, parking and canteen accounts for staff.', '7. Contact person and dates for a site visit.', '', 'Book a visit: office.html'],
    'visit-request': ['Group name:', 'Number of people (more than 10):', 'Preferred date and time:', 'Buildings you want to see:', 'Contact person, email and phone:'],
    'event-booking': ['Event name:', 'Room: Echo Hall (600 seats) or meeting room:', 'Date, start and end time:', 'Expected guests:', 'Catering, stage, sound and recording needs:'],
    'house-rules': ['Access: wear your card where it can be seen.', 'Deliveries: through the service gate, 07:00 to 19:00.', 'Noise: no loud work in shared areas during office hours.', 'Safety: fire drills twice a year, follow the floor warden.', 'Parking: in marked bays only.'],
    'data-policy': ['We record: name, company, host, time in and out.', 'We keep visitor records for 90 days.', 'Camera footage is kept for 30 days.', 'Ask for your records: privacy.html.'],
    'annual-review': ['Members at year end: 136.', 'New members during the year: 18.', 'Energy use: down 9% on 2024.', 'Investment in new buildings and equipment: see the full review.'],
  };
  const fileName = (r) => `northbank-${r.id}-SAMPLE.txt`;
  const build = (r) => [
    'SAMPLE FILE',
    `${r.title.toUpperCase()} (${r.format})`,
    `Northbank Technology Park, ${seed.resourceCategories[r.cat]}. Updated ${fmtDate(r.updated)}.`,
    `Generated ${new Date().toISOString().slice(0, 10)}. This is a SAMPLE FILE, not an official document.`,
    '',
    r.desc,
    '',
    ...(CONTENT[r.id] || []),
  ].join('\r\n');

  const render = (r) => `<article class="resource-card" data-category="${esc(r.cat)}" data-resource="${esc(r.id)}">`
    + `<h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p>`
    + `<p class="resource-updated">${esc(r.format)}, ${esc(seed.resourceCategories[r.cat])}, updated ${esc(fmtDate(r.updated))}</p>`
    + `<button type="button" class="btn btn-secondary resource-action" data-generate="${esc(r.id)}" aria-label="Download ${esc(r.title)}">Download</button></article>`;

  createListing({
    results: $('#resourceGrid'), pagerEl: $('#resourcePager'), metaEl: $('#resourceMeta'), search: $('#resourceSearch'),
    perPage: 10, label: 'documents',
    load: () => [...seed.resources].sort((a, b) => b.updated.localeCompare(a.updated)),
    text: (r) => `${r.title} ${r.desc} ${r.format} ${seed.resourceCategories[r.cat]}`,
    filters: [
      { param: 'cat', control: pillControl(pills), match: (r, v) => r.cat === v },
      { param: 'format', control: fieldControl(formatSelect), match: (r, v) => r.format === v },
    ],
    emptyCopy: { title: 'No document matches.', text: 'Try another word, another category or all formats.' },
    render,
    afterRender: (slice, root) => $$('[data-generate]', root).forEach((button) => button.addEventListener('click', () => {
      const r = seed.resources.find((x) => x.id === button.dataset.generate);
      button.disabled = true; button.textContent = 'Preparing…';
      store.request(() => build(r), { delay: 300 })
        .then((content) => { download(fileName(r), content, 'text/plain;charset=utf-8'); toast(`Downloaded ${fileName(r)}.`); })
        .catch((error) => toast(`Download failed: ${error.message}`))
        .finally(() => { button.disabled = false; button.textContent = 'Download'; });
    })),
  });
})();
