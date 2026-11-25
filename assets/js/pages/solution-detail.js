/* Solution detail: solution-detail.html?id=<solution id>. Shows what the solution does, its provider and a
 * demo request (or provider contact when the solution has no demo) saved to the session store
 * (demoRequests), with a list of your requests for this solution that you can cancel. */
(() => {
  const { $, $$, esc, detailPage, bindForm, successPanel, confirmDialog, fmtDate, todayISO, toast, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  if (!$('#solutionName')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim().toLowerCase();
  let solution = null;

  const kindLabel = (kind) => (kind === 'demo' ? 'Demo request' : 'Provider contact');

  function renderRequests() {
    const host = $('#solutionRequests');
    const mine = store.list('demoRequests').filter((r) => r.solutionId === solution.id);
    host.dataset.state = mine.length ? 'ready' : 'empty';
    if (!mine.length) {
      showState(host, 'empty', { title: `No requests for ${solution.name} yet.`, text: '' });
      return;
    }
    host.innerHTML = mine.map((r) => {
      const cancelled = r.status === 'cancelled';
      return `<article class="proto-record${cancelled ? ' is-cancelled' : ''}" data-request="${esc(r.id)}">`
        + `<div><h3>${esc(kindLabel(r.kind))}</h3><p>Reference ${esc(r.id)}, preferred date ${esc(fmtDate(r.date))}</p><p>${esc(r.company)}, ${esc(r.email)}</p></div>`
        + `<div class="record-actions">${cancelled ? '<span class="badge is-muted">Cancelled</span>' : `<span class="badge is-ok">Received</span><button type="button" class="btn btn-secondary btn-sm" data-cancel-request="${esc(r.id)}">Cancel request</button>`}</div></article>`;
    }).join('');
    $$('[data-cancel-request]', host).forEach((button) => button.addEventListener('click', async () => {
      const ok = await confirmDialog({ title: 'Cancel this request?', text: `${solution.provider} will not receive it. You can send a new one at any time.`, confirmLabel: 'Cancel request', cancelLabel: 'Keep request' });
      if (!ok) return;
      button.disabled = true;
      store.request(() => store.update('demoRequests', button.dataset.cancelRequest, { status: 'cancelled' }))
        .then(() => { toast('Request cancelled.'); renderRequests(); })
        .catch((error) => { button.disabled = false; toast(`Not cancelled: ${error.message}`); });
    }));
  }

  function mountForm() {
    const host = $('#requestHost');
    const form = $('#solutionRequestForm');
    const kind = solution.demo ? 'demo' : 'contact';
    $('#sr-date').min = todayISO(1);
    $('#sr-date-label').textContent = solution.demo ? 'Preferred demo date' : 'Preferred call date';
    bindForm(form, {
      validate: (values) => (values.date && values.date < todayISO(1) ? { date: 'Choose a date from tomorrow on.' } : {}),
      submit: (values) => store.request(() => store.add('demoRequests', {
        solutionId: solution.id, solutionName: solution.name, provider: solution.provider, kind,
        name: values.name, email: values.email, company: values.company, phone: values.phone, date: values.date, size: values.size, message: values.message, status: 'submitted',
      }, kind === 'demo' ? 'DM' : 'PC')),
      success(record) {
        const panel = successPanel({
          title: `${kindLabel(kind)} sent to ${solution.provider}.`,
          reference: record.id,
          lines: [`Preferred date: ${fmtDate(record.date)}.`, `The reply goes to ${record.email}.`],
          actions: [
            { label: 'Send another', onClick: () => { panel.remove(); form.reset(); form.hidden = false; $('#sr-name').focus(); } },
            { label: 'More solutions', href: 'marketplace.html' },
          ],
        });
        form.hidden = true;
        host.append(panel);
        panel.focus();
        renderRequests();
      },
    });
  }

  detailPage({
    loadingTitle: 'Loading solution…',
    load: () => seed.solutions.find((s) => s.id === id) || null,
    notFound: {
      title: id ? 'Solution not found.' : 'No solution selected.',
      text: id ? `There is no solution with the id “${id}”. It may no longer be listed, or the link is wrong.` : 'Choose a solution in the list to see its details.',
      action: { label: 'Browse solutions', href: 'marketplace.html' },
      secondary: { label: 'Company directory', href: 'companies.html' },
    },
    render(s) {
      solution = s;
      const category = seed.solutionCategories[s.category];
      const company = seed.companies.find((c) => c.id === s.companyId);
      const profile = `company-detail.html?id=${encodeURIComponent(s.companyId)}`;
      document.title = `${s.name} | Northbank Technology Park`;
      $('meta[name="description"]')?.setAttribute('content', `${s.name} by ${s.provider}: ${s.summary}`);
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/solution-detail.html?id=${encodeURIComponent(s.id)}`);
      $('#solutionCrumb').textContent = s.name;
      $('#solutionName').textContent = s.name;
      $('#solutionMetaTags').innerHTML = [category, s.type, s.provider].map((v) => `<span class="chip">${esc(v)}</span>`).join('');
      $('#solutionFocus').textContent = s.focus;
      $('#solutionRequestLink').textContent = s.demo ? 'Request a demo' : 'Contact the company';
      $('#requestTitle').textContent = s.demo ? 'Request a demo' : `Contact ${s.provider}`;
      $('#solutionProviderLink').href = profile;
      $('#solutionProof').innerHTML = [
        [s.type, 'type'],
        [s.deployment, 'deployment'],
        [s.demo ? 'Yes' : 'No', 'demo available'],
        [company?.building || '', 'provider building'],
      ].map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('');
      $('#solutionSummary').textContent = s.summary;
      $('#solutionFeatures').innerHTML = s.features.map((f) => `<li>${esc(f)}</li>`).join('');
      $('#solutionFacts').innerHTML = [
        ['Sold by', `<a class="text-link" href="${profile}">${esc(s.provider)}</a>`],
        ['Category', esc(category)],
        ['Type', esc(s.type)],
        ['Deployment', esc(s.deployment)],
      ].map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${dd}</dd>`).join('');
      const provider = $('#solutionProvider');
      provider.href = profile;
      provider.innerHTML = `<div><h3>${esc(s.provider)}</h3><p>${esc(company?.intro || '')}</p></div><div class="proto-card-side"><span class="badge">${esc(company?.sector || '')}</span><span>${esc(company?.building || '')}</span></div><span class="proto-card-cta link-arrow">Company profile</span>`;
      $('#solutionRelated').innerHTML = seed.solutions.filter((x) => x.category === s.category && x.id !== s.id).slice(0, 3)
        .map((r) => `<a class="card" href="solution-detail.html?id=${encodeURIComponent(r.id)}"><h3 class="card-title">${esc(r.name)}</h3><p class="card-text">${esc(r.focus)}</p><span class="card-foot"><span>${esc(r.provider)}</span><span class="link-arrow">Details</span></span></a>`).join('');
      mountForm();
      renderRequests();
    },
  });
})();
