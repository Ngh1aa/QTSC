/* Open data: summary of the latest month per dataset, and an explorer over seed.readings with dataset,
 * parameter, station, status and month-range filters (synced to the URL), a paginated table and a CSV
 * export of every filtered row. */
(() => {
  const { $, esc, download, csv, toast } = window.QTSCUI;
  const { createListing, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;
  const results = $('#odResults');
  if (!results) return;

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthLabel = (m, short) => `${MONTHS[Number(m.slice(5)) - 1].slice(0, short ? 3 : undefined)} ${m.slice(0, 4)}`;
  const over = (r) => r.value > r.limit;
  const datasetOf = (id) => seed.datasets.find((d) => d.id === id);
  const fmtNum = (n) => Number(n).toLocaleString('en-GB', { maximumFractionDigits: 2 });
  const months = [...new Set(seed.readings.map((r) => r.month))].sort();
  const lastMonth = months[months.length - 1];

  /* Facts and latest-month summary */
  const stations = new Set(seed.readings.map((r) => `${r.dataset}|${r.station}`));
  const overCount = seed.readings.filter(over).length;
  $('#odFacts').innerHTML = [
    [String(seed.datasets.length), 'datasets'],
    [String(stations.size), 'stations'],
    [seed.readings.length.toLocaleString('en-GB'), 'monthly readings'],
    [String(overCount), 'readings over limit'],
  ].map(([v, l]) => `<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('');
  $('#latestTitle').textContent = `${monthLabel(lastMonth)} at a glance`;
  $('#odSummary').innerHTML = seed.datasets.map((d) => {
    const rows = seed.readings.filter((r) => r.dataset === d.id && r.month === lastMonth);
    const bad = rows.filter(over);
    const status = bad.length
      ? `<span class="badge is-error">${bad.length} over limit</span> <span class="od-note">${esc(bad.map((r) => `${r.param}, ${r.station}`).join('; '))}</span>`
      : '<span class="badge is-ok">Within limit</span>';
    return `<tr><th scope="row">${esc(d.title)}</th><td>${esc(seed.datasetGroups[d.group])}</td><td>${d.stations.length}</td><td class="num">${rows.length}</td><td class="num">${bad.length}</td><td>${status}</td>`
      + `<td><a class="link-arrow od-view" href="open-data.html?dataset=${encodeURIComponent(d.id)}&amp;from=${lastMonth}#explorer" aria-label="View ${esc(d.title)} readings">View</a></td></tr>`;
  }).join('');

  /* Explorer controls */
  const datasetSel = $('#odDataset');
  const stationSel = $('#odStation');
  const paramSel = $('#odParam');
  datasetSel.insertAdjacentHTML('beforeend', seed.datasets.map((d) => `<option value="${esc(d.id)}">${esc(d.title)}</option>`).join(''));
  ['#odFrom', '#odTo'].forEach((sel) => $(sel).insertAdjacentHTML('beforeend', months.map((m) => `<option value="${m}">${monthLabel(m, true)}</option>`).join('')));
  const fillDependent = () => {
    const ds = datasetSel.value;
    const rows = seed.readings.filter((r) => !ds || r.dataset === ds);
    const keepStation = stationSel.value; const keepParam = paramSel.value;
    const stationList = [...new Set(rows.map((r) => r.station))];
    const paramList = [...new Set(rows.map((r) => r.param))];
    stationSel.innerHTML = '<option value="">All stations</option>' + stationList.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
    paramSel.innerHTML = '<option value="">All parameters</option>' + paramList.map((p) => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
    if (stationList.includes(keepStation)) stationSel.value = keepStation;
    if (paramList.includes(keepParam)) paramSel.value = keepParam;
  };
  const initial = new URLSearchParams(location.search);
  datasetSel.value = initial.get('dataset') || '';
  fillDependent();
  datasetSel.addEventListener('change', fillDependent);

  const limitText = (r) => `${fmtNum(r.limit)}${r.unit ? ` ${r.unit}` : ''}`;
  const table = (rows) => '<div class="table-wrap" tabindex="0" role="region" aria-label="Readings"><table class="data-table od-table"><thead><tr>'
    + '<th scope="col">Month</th><th scope="col">Dataset</th><th scope="col">Station</th><th scope="col">Parameter</th><th scope="col" class="num">Value</th><th scope="col" class="num">Limit</th><th scope="col">Status</th></tr></thead><tbody>'
    + rows.map((r) => `<tr><td>${esc(monthLabel(r.month, true))}</td><td>${esc(datasetOf(r.dataset)?.title || r.dataset)}</td><td>${esc(r.station)}</td><td>${esc(r.param)}</td>`
      + `<td class="num">${fmtNum(r.value)}${r.unit ? ` ${esc(r.unit)}` : ''}</td><td class="num">${esc(limitText(r))}</td>`
      + `<td>${over(r) ? '<span class="badge is-error">Over limit</span>' : '<span class="badge is-ok">Within limit</span>'}</td></tr>`).join('')
    + '</tbody></table></div>';

  /* Status keeps the explicit value "all" so the select never shows an empty choice. */
  const statusSel = $('#odStatus');
  const statusControl = {
    get: () => statusSel.value || 'all',
    set: (v) => { statusSel.value = ['all', 'ok', 'over'].includes(v) ? v : 'all'; },
    listen: (fn) => statusSel.addEventListener('change', fn),
  };
  const listing = createListing({
    results, pagerEl: $('#odPager'), metaEl: $('#odMeta'), perPage: 15, label: 'readings',
    load: () => [...seed.readings].sort((a, b) => b.month.localeCompare(a.month)),
    text: (r) => `${r.station} ${r.param}`,
    filters: [
      { param: 'dataset', control: fieldControl(datasetSel), match: (r, v) => r.dataset === v },
      { param: 'param', control: fieldControl(paramSel), match: (r, v) => r.param === v },
      { param: 'station', control: fieldControl(stationSel), match: (r, v) => r.station === v },
      { param: 'status', control: statusControl, match: (r, v) => (v === 'over' ? over(r) : !over(r)) },
      { param: 'from', control: fieldControl($('#odFrom')), match: (r, v) => r.month >= v },
      { param: 'to', control: fieldControl($('#odTo')), match: (r, v) => r.month <= v },
    ],
    emptyCopy: { title: 'No readings in this range.', text: 'Widen the months, or choose another station or status.' },
    renderList: table,
  });

  $('#odExport').addEventListener('click', () => {
    const rows = listing.filtered();
    if (!rows) { toast('The readings are still loading.'); return; }
    if (!rows.length) { toast('No rows to export. Remove a filter first.'); return; }
    const button = $('#odExport');
    button.disabled = true; button.textContent = 'Preparing…';
    store.request(() => csv([
      ['month', 'group', 'dataset', 'station', 'parameter', 'value', 'unit', 'limit', 'status'],
      ...rows.map((r) => {
        const d = datasetOf(r.dataset);
        return [r.month, seed.datasetGroups[d?.group] || '', d?.title || r.dataset, r.station, r.param, r.value, r.unit, r.limit, over(r) ? 'over_limit' : 'within_limit'];
      }),
    ]), { delay: 300 }).then((content) => {
      download(`northbank-open-data-${new Date().toISOString().slice(0, 10)}.csv`, content, 'text/csv;charset=utf-8');
      toast(`Exported ${rows.length} row${rows.length > 1 ? 's' : ''} to CSV.`);
    }).catch((error) => toast(`Export failed: ${error.message}`))
      .finally(() => { button.disabled = false; button.textContent = 'Export CSV'; });
  });
})();
