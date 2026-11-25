/* Invest: incentive groups and the eligibility checker (incentives.html#checker), and the investment enquiry
 * with "My enquiries" (investment.html#enquiry). A checker result is carried into the enquiry as a draft
 * kept in the session store (investmentDraft). */
(() => {
  const { $, esc, bindForm, successPanel, fmtDate, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const sectorLabel = (id) => seed.incentiveSectors.find((s) => s.id === id)?.label || id;
  const sectorOptions = () => seed.incentiveSectors.map((s) => `<option value="${esc(s.id)}">${esc(s.label)}</option>`).join('');
  const needLabels = { office: 'office or lab space', import: 'imported equipment', training: 'training for engineers', startup: 'a place in Forge' };
  const usd = (value) => `USD ${value} million`;

  /* ------------------------------------------------ incentive groups */
  const groupsHost = $('#incentiveGroups');
  if (groupsHost) {
    groupsHost.innerHTML = seed.incentiveGroups.map((g) => `<article class="card incentive-card" data-group="${esc(g.id)}">`
      + `<h3 class="card-title">${esc(g.title)}</h3><p class="card-text">${esc(g.note)}</p>`
      + `<div class="card-foot"><ul class="chip-list" aria-label="Sectors">${g.sectors.map((s) => `<li class="chip">${esc(sectorLabel(s))}</li>`).join('')}</ul></div></article>`).join('');
  }

  /* ------------------------------------------------ eligibility checker */
  const checker = $('#checkerForm');
  if (checker) {
    $('#ck-sector').insertAdjacentHTML('beforeend', sectorOptions());
    const resultHost = $('#checkerResult');
    function evaluate(v) {
      const capital = Number(v.capital);
      const headcount = Number(v.headcount) || 0;
      const needs = [].concat(v.needs || []);
      return seed.incentiveGroups.map((g) => {
        let reason = '';
        if (!g.sectors.includes(v.sector)) reason = `does not cover ${sectorLabel(v.sector).toLowerCase()}`;
        else if (g.id === 'cit' && v.sector === 'rnd' && v.rnd === 'low') reason = 'an R&D center needs to spend 1% or more on R&D';
        else if (g.id === 'import' && !needs.includes('import')) reason = 'only applies when you import equipment';
        else if (g.id === 'land' && !needs.includes('office')) reason = 'only applies when you rent space here';
        else if (g.id === 'land' && v.rnd === 'low') reason = 'needs 1% or more of the budget spent on R&D';
        else if (g.id === 'talent' && !needs.includes('training') && headcount < 50) reason = 'needs a training plan or 50 or more people';
        else if (g.id === 'startup' && !needs.includes('startup')) reason = 'only for teams that apply to Forge';
        else if (g.id === 'startup' && capital > 2) reason = 'is for startups investing up to USD 2 million';
        return { ...g, fit: !reason, reason };
      });
    }
    bindForm(checker, {
      busyLabel: 'Checking…',
      validate: (v) => (v.capital !== '' && Number(v.capital) <= 0 ? { capital: 'Enter an amount above 0.' } : {}),
      submit: (v) => store.request(() => ({ values: v, groups: evaluate(v) }), { delay: 500 }),
      success({ values, groups }) {
        const fit = groups.filter((g) => g.fit);
        const other = groups.filter((g) => !g.fit);
        resultHost.hidden = false;
        resultHost.dataset.state = fit.length ? 'eligible' : 'none';
        resultHost.innerHTML = `<div class="proto-panel" role="status" tabindex="-1" id="checkerSummary">`
          + `<h3 class="proto-section-title">${fit.length ? `${fit.length} incentive group${fit.length > 1 ? 's' : ''} may apply.` : 'No incentive group matches these answers.'}</h3>`
          + `<p class="muted">${esc(sectorLabel(values.sector))}, ${esc(usd(values.capital))}, ${esc(values.headcount)} people in the first year.</p>`
          + (fit.length ? `<ul class="proto-records">${fit.map((g) => `<li class="proto-record" data-group="${esc(g.id)}"><div><h3>${esc(g.title)}</h3><p>${esc(g.note)}</p></div><div class="record-actions"><span class="badge is-ok">May apply</span></div></li>`).join('')}</ul>` : '')
          + (other.length ? `<details class="proto-details"><summary>Why ${other.length} other group${other.length > 1 ? 's do' : ' does'} not match</summary><ul class="proto-bullets">${other.map((g) => `<li><strong>${esc(g.title)}</strong> ${esc(g.reason)}.</li>`).join('')}</ul></details>` : '')
          + '<p class="form-hint">This is a first view, not a decision: the investment desk confirms eligibility from your documents.</p>'
          + '<div class="state-actions"><button type="button" class="btn btn-primary" id="checkerToEnquiry">Send to the desk</button><button type="button" class="btn btn-secondary" id="checkerReset">Check again</button></div></div>';
        $('#checkerSummary').focus();
        $('#checkerToEnquiry').addEventListener('click', () => {
          const needs = [].concat(values.needs || []).map((n) => needLabels[n]).filter(Boolean);
          store.setValue('investmentDraft', {
            sector: values.sector,
            capital: values.capital,
            message: `Checker result: ${fit.map((g) => g.title).join('; ') || 'no group matched'}. ${values.headcount} people in the first year.${needs.length ? ` We will need ${needs.join(', ')}.` : ''}`,
          });
          location.href = 'investment.html#enquiry';
        });
        $('#checkerReset').addEventListener('click', () => { resultHost.hidden = true; checker.reset(); $('#ck-sector').focus(); });
      },
    });
  }

  /* ------------------------------------------------ investment enquiry */
  const enquiry = $('#enquiryForm');
  if (enquiry) {
    $('#eq-sector').insertAdjacentHTML('beforeend', sectorOptions());
    const note = $('#enquiryDraftNote');
    const draft = store.value('investmentDraft');
    if (draft) {
      enquiry.elements.sector.value = draft.sector || '';
      enquiry.elements.capital.value = draft.capital || '';
      enquiry.elements.message.value = draft.message || '';
      note.hidden = false;
    }
    const host = $('#enquiryHost');
    const list = $('#enquiryList');
    const renderList = () => {
      const items = store.list('enquiries');
      list.dataset.state = items.length ? 'ready' : 'empty';
      if (!items.length) { showState(list, 'empty', { title: 'No enquiries yet.', text: '', action: { label: 'Send an enquiry', href: '#enquiry' } }); return; }
      list.innerHTML = items.map((e) => `<article class="proto-record" data-enquiry="${esc(e.id)}"><div><h3>${esc(e.company)}</h3><p>${esc(sectorLabel(e.sector))}, ${esc(usd(e.capital))}, opening ${esc(e.timeline.toLowerCase())}</p><p>Reference ${esc(e.id)}, sent ${esc(fmtDate(e.createdAt))}</p></div><div class="record-actions"><span class="badge is-ok">Received</span></div></article>`).join('');
    };
    renderList();
    bindForm(enquiry, {
      submit: (v) => store.request(() => store.add('enquiries', { company: v.company, name: v.name, email: v.email, phone: v.phone, sector: v.sector, capital: v.capital, timeline: v.timeline, message: v.message, fromChecker: !!draft }, 'IN')),
      success(record) {
        store.setValue('investmentDraft', null);
        note.hidden = true;
        const panel = successPanel({
          title: 'Enquiry sent to the investment desk.',
          reference: record.id,
          lines: [`${sectorLabel(record.sector)}, ${usd(record.capital)}, opening ${record.timeline.toLowerCase()}.`, `The reply goes to ${record.email}.`],
          actions: [
            { label: 'Check incentives', href: 'incentives.html#checker' },
            { label: 'Send another', onClick: () => { panel.remove(); enquiry.reset(); enquiry.hidden = false; enquiry.elements.company.focus(); } },
          ],
        });
        enquiry.hidden = true;
        host.append(panel);
        panel.focus();
        renderList();
      },
    });
  }
})();
