/* Careers: job search, category pills (?category=), hours and company filters, pagination, and
 * "My applications" (#my-applications) with withdraw. */
(() => {
  const { $, $$, esc, fmtDate, showState, confirmDialog, toast } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;

  const applied = (jobId) => store.list('applications').some((a) => a.jobId === jobId && a.status === 'submitted');
  const companySelect = $('#jobCompany');
  if (companySelect && $('#jobResults')) {
    const companies = [...new Set(seed.jobs.map((j) => j.company))].sort((a, b) => a.localeCompare(b));
    companySelect.insertAdjacentHTML('beforeend', companies.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));
    createListing({
      results: $('#jobResults'), pagerEl: $('#jobPager'), metaEl: $('#jobMeta'), search: $('#jobSearch'),
      perPage: 8, label: 'jobs',
      load: () => [...seed.jobs].sort((a, b) => b.posted.localeCompare(a.posted)),
      text: (j) => `${j.title} ${j.company} ${seed.jobCategories[j.category]} ${j.summary} ${j.requirements.join(' ')}`,
      filters: [
        { param: 'category', control: pillControl($('#jobPills')), match: (j, v) => j.category === v },
        { param: 'hours', control: fieldControl($('#jobType')), match: (j, v) => j.type === v },
        { param: 'company', control: fieldControl(companySelect), match: (j, v) => j.company === v },
      ],
      emptyCopy: { title: 'No job matches.', text: 'Try another title or skill, or all categories.' },
      render: (j) => `<a class="entity-card" href="job-detail.html?id=${encodeURIComponent(j.id)}" data-job="${esc(j.id)}" data-category="${esc(j.category)}">`
        + `<span class="entity-mark" aria-hidden="true">${esc(j.company.slice(0, 2).toUpperCase())}</span>`
        + `<div><h3>${esc(j.title)}</h3><p>${esc(j.company)}, ${esc(j.type.toLowerCase())}, ${esc(j.level.toLowerCase())}</p></div>`
        + `<div class="entity-side">${applied(j.id) ? '<span class="badge is-ok">Applied</span>' : `<span class="badge">${esc(seed.jobCategories[j.category])}</span>`}<span>Apply by ${esc(fmtDate(j.deadline))}</span></div></a>`,
    });
  }

  const host = $('#myApplications');
  const statusLabel = { submitted: ['Submitted', 'is-ok'], withdrawn: ['Withdrawn', 'is-muted'] };
  function render() {
    const list = store.list('applications');
    host.dataset.state = list.length ? 'ready' : 'empty';
    if (!list.length) {
      showState(host, 'empty', { title: 'No applications yet.', text: '', action: { label: 'See open jobs', href: '#jobs' } });
      return;
    }
    host.innerHTML = list.map((a) => {
      const job = seed.jobs.find((j) => j.id === a.jobId);
      const [label, tone] = statusLabel[a.status] || statusLabel.submitted;
      return `<article class="proto-record${a.status === 'withdrawn' ? ' is-cancelled' : ''}" data-application="${esc(a.id)}">`
        + `<div><h3>${job ? `<a class="text-link" href="job-detail.html?id=${encodeURIComponent(job.id)}">${esc(job.title)}</a>` : 'Closed job'}</h3>`
        + `<p>${esc(job?.company || '')}, sent ${esc(fmtDate(a.createdAt))}, reference ${esc(a.id)}</p><p>CV: ${esc(a.cvName)}</p></div>`
        + `<div class="record-actions"><span class="badge ${tone}">${label}</span>${a.status === 'submitted' ? `<button type="button" class="btn btn-secondary btn-sm" data-withdraw="${esc(a.id)}">Withdraw</button>` : ''}</div></article>`;
    }).join('');
    $$('[data-withdraw]', host).forEach((button) => button.addEventListener('click', async () => {
      const ref = button.dataset.withdraw;
      const ok = await confirmDialog({ title: 'Withdraw this application?', text: 'The company will stop reviewing it. You can apply again while the job is open.', confirmLabel: 'Withdraw', cancelLabel: 'Keep application' });
      if (!ok) return;
      button.disabled = true;
      store.request(() => store.update('applications', ref, { status: 'withdrawn' }))
        .then(() => { render(); toast(`Application ${ref} withdrawn.`); })
        .catch((error) => { button.disabled = false; toast(`Not withdrawn: ${error.message}`); });
    }));
  }
  if (host) {
    const load = () => {
      showState(host, 'loading', { title: 'Loading your applications…', rows: 1 });
      store.request(() => true, { delay: 250 }).then(render)
        .catch((error) => showState(host, 'error', { title: 'Your applications did not load.', text: error.message, action: { label: 'Try again', onClick: load } }));
    };
    load();
  }
})();
