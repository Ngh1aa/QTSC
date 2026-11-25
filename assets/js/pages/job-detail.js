/* Job detail: job-detail.html?id=<job id>. Duties, requirements, company link and the apply form (PDF CV,
 * file name only), with already-applied and closed-job states, saved to the session store (applications). */
(() => {
  const { $, esc, detailPage, bindForm, successPanel, fmtDate, todayISO, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  if (!$('#jobTitle')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim().toLowerCase();

  function mountApply(job) {
    const host = $('#applyHost');
    const form = $('#applyForm');
    const existing = store.list('applications').find((a) => a.jobId === job.id && a.status === 'submitted');
    if (job.deadline < todayISO()) {
      showState(host, 'empty', { title: 'This job is closed.', text: `Applications closed on ${fmtDate(job.deadline)}.`, action: { label: 'See open jobs', href: 'careers.html' } });
      return;
    }
    if (existing) {
      showState(host, 'empty', { title: 'You have already applied for this job.', text: `Reference ${existing.id}, sent ${fmtDate(existing.createdAt)}. To apply again, withdraw this application first.`, action: { label: 'My applications', href: 'careers.html#my-applications' } });
      return;
    }
    bindForm(form, {
      busyLabel: 'Sending…',
      validate: (values, f) => {
        const file = f.elements.cv.files[0];
        if (file && !/\.pdf$/i.test(file.name)) return { cv: 'Attach your CV as a PDF file.' };
        if (file && file.size > 5 * 1024 * 1024) return { cv: 'The PDF must be 5 MB or smaller.' };
        return {};
      },
      submit: (values) => store.request(() => store.add('applications', { jobId: job.id, name: values.name, email: values.email, phone: values.phone, link: values.link, cvName: values.cv, letter: values.letter, status: 'submitted' }, 'AP')),
      success(record) {
        const panel = successPanel({
          title: `Application sent to ${job.company}.`,
          reference: record.id,
          lines: [`${job.title}, CV ${record.cvName}.`],
          actions: [{ label: 'My applications', href: 'careers.html#my-applications' }, { label: 'More jobs', href: 'careers.html' }],
        });
        form.hidden = true;
        host.append(panel);
        panel.focus();
      },
    });
  }

  detailPage({
    loadingTitle: 'Loading job…',
    load: () => seed.jobs.find((j) => j.id === id) || null,
    notFound: {
      title: id ? 'Job not found.' : 'No job selected.',
      text: id ? `There is no open job with the id “${id}”. It may have closed, or the link is wrong.` : 'Choose a job in the list to see its details.',
      action: { label: 'See open jobs', href: 'careers.html' },
      secondary: { label: 'Get job alerts', href: 'newsletter.html' },
    },
    render(j) {
      const company = seed.companies.find((c) => c.id === j.companyId);
      const profile = `company-detail.html?id=${encodeURIComponent(j.companyId)}`;
      document.title = `${j.title}, ${j.company} | Northbank Technology Park`;
      $('meta[name="description"]')?.setAttribute('content', `${j.title} at ${j.company}, Northbank Technology Park: ${j.summary}`);
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/job-detail.html?id=${encodeURIComponent(j.id)}`);
      $('#jobCrumb').textContent = j.title;
      $('#jobTitle').textContent = j.title;
      $('#jobMetaTags').innerHTML = [j.company, seed.jobCategories[j.category]].map((v) => `<span class="chip">${esc(v)}</span>`).join('');
      $('#jobSummary').textContent = j.summary;
      $('#jobCompanyLink').href = profile;
      $('#jobProof').innerHTML = [
        [j.level, 'level'],
        [j.type, 'hours'],
        [company?.building || '', 'building'],
        [String(seed.jobs.filter((x) => x.companyId === j.companyId).length), `open job${seed.jobs.filter((x) => x.companyId === j.companyId).length > 1 ? 's' : ''} at ${j.company}`],
      ].map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('');
      $('#jobDuties').innerHTML = j.duties.map((d) => `<li>${esc(d)}</li>`).join('');
      $('#jobRequirements').innerHTML = j.requirements.map((d) => `<li>${esc(d)}</li>`).join('');
      $('#applyFacts').innerHTML = [
        ['Company', `<a class="text-link" href="${profile}">${esc(j.company)}</a>`],
        ['Workplace', esc(`${company?.building || ''}, Northbank`)],
        ['Posted', esc(fmtDate(j.posted))],
        ['Apply by', esc(fmtDate(j.deadline))],
      ].map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${dd}</dd>`).join('');
      const others = seed.jobs.filter((x) => x.id !== j.id)
        .sort((a, b) => (b.category === j.category) - (a.category === j.category) || b.posted.localeCompare(a.posted)).slice(0, 3);
      $('#jobRelated').innerHTML = others.map((r) => `<a class="entity-card" href="job-detail.html?id=${encodeURIComponent(r.id)}"><span class="entity-mark" aria-hidden="true">${esc(r.company.slice(0, 2).toUpperCase())}</span><div><h3>${esc(r.title)}</h3><p>${esc(r.company)}, ${esc(r.type.toLowerCase())}, ${esc(r.level.toLowerCase())}</p></div><div class="entity-side"><span class="badge">${esc(seed.jobCategories[r.category])}</span><span>Apply by ${esc(fmtDate(r.deadline))}</span></div></a>`).join('');
      mountApply(j);
    },
  });
})();
