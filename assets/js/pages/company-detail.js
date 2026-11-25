/* Company detail: company-detail.html?id=<company id>. Renders the profile, solutions, open jobs and
 * related companies from the seed, with loading, not-found and error states. */
(() => {
  const { $, esc, detailPage, fmtDate } = window.QTSCUI;
  const seed = window.QTSCStore.seed;
  if (!$('#companyName')) return;
  const id = (new URLSearchParams(location.search).get('id') || location.hash.slice(1) || '').trim().toLowerCase();

  detailPage({
    loadingTitle: 'Loading company…',
    load: () => seed.companies.find((c) => c.id === id) || null,
    notFound: {
      title: id ? 'Company not found.' : 'No company selected.',
      text: id ? `There is no company with the id “${id}”. It may have changed its name, or the link is wrong.` : 'Choose a company in the directory to see its profile.',
      action: { label: 'Open the directory', href: 'companies.html' },
      secondary: { label: 'Browse solutions', href: 'marketplace.html' },
    },
    render(c) {
      const solutions = seed.solutions.filter((s) => s.companyId === c.id);
      const jobs = seed.jobs.filter((j) => j.companyId === c.id);
      document.title = `${c.name} | Northbank Technology Park`;
      $('meta[name="description"]')?.setAttribute('content', `${c.name} at Northbank Technology Park: ${c.intro}`);
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/company-detail.html?id=${encodeURIComponent(c.id)}`);
      $('#companyCrumb').textContent = c.name;
      $('#companyName').textContent = c.name;
      $('#companyMetaTags').innerHTML = [c.sector, c.country, c.building].map((v) => `<span class="chip">${esc(v)}</span>`).join('');
      $('#companyIntro').textContent = c.intro;
      $('#companyLead').textContent = c.lead;
      $('#companyContact').onclick = () => window.QTSC.openContact(`Introduction to ${c.name}`);
      $('#companySolutionsLink').href = solutions.length ? '#company-solutions' : 'marketplace.html';
      $('#companySolutionsLink').textContent = solutions.length ? `${solutions.length} solution${solutions.length > 1 ? 's' : ''}` : 'Browse solutions';
      $('#companyProof').innerHTML = [
        [c.country, 'home country'],
        [c.building, 'building'],
        [String(solutions.length), 'solutions listed'],
        [String(jobs.length), 'open jobs'],
      ].map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('');
      $('#companySolutions').innerHTML = solutions.length
        ? solutions.map((s) => `<a class="entity-card" href="solution-detail.html?id=${encodeURIComponent(s.id)}"><span class="entity-mark" aria-hidden="true">${esc(s.name.slice(0, 2).toUpperCase())}</span><div><h3>${esc(s.name)}</h3><p>${esc(s.focus)}</p></div><div class="entity-side"><span class="badge">${esc(seed.solutionCategories[s.category])}</span><span>${esc(s.type)}</span></div></a>`).join('')
        : '<div class="state-panel" data-state="empty"><strong>No solutions listed yet.</strong></div>';
      $('#companyJobs').innerHTML = jobs.length
        ? jobs.map((j) => `<a class="entity-card" href="job-detail.html?id=${encodeURIComponent(j.id)}"><span class="entity-mark" aria-hidden="true">${esc(j.title.slice(0, 2).toUpperCase())}</span><div><h3>${esc(j.title)}</h3><p>${esc(j.type)}, ${esc(j.level)}</p></div><div class="entity-side"><span>Apply by ${esc(fmtDate(j.deadline))}</span></div></a>`).join('')
        : '<div class="state-panel" data-state="empty"><strong>No open jobs right now.</strong></div>';
      $('#companyFacts').innerHTML = [
        ['Building', `${c.building}, Northbank`],
        ['Works on', (c.tags || []).join(', ') || c.sector],
        ['Website', c.website],
        ['Phone', c.phone],
      ].map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${esc(dd)}</dd>`).join('');
      const related = seed.companies.filter((x) => x.category === c.category && x.id !== c.id).slice(0, 3);
      $('#companyRelated').innerHTML = related.map((r) => `<a class="card" href="company-detail.html?id=${encodeURIComponent(r.id)}"><span class="badge">${esc(r.sector)}</span><h3 class="card-title">${esc(r.name)}</h3><p class="card-text">${esc(r.intro)}</p><span class="card-foot"><span>${esc(r.building)}</span><span class="link-arrow">Profile</span></span></a>`).join('');
    },
  });
})();
