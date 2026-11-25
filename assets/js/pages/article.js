/* Article detail: article.html?id=<article id>. Title, category, date, photo and body from seed.articles;
 * #articleExtra shows the job named in the story (jobId) or related stories; newer/older links and the
 * latest news below. Loading, not-found and error states come from QTSCUI.detailPage. */
(() => {
  const { $, esc, detailPage, fmtDate, toast } = window.QTSCUI;
  const seed = window.QTSCStore.seed;
  if (!$('#articleTitle')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim();
  const sorted = [...seed.articles].sort((a, b) => b.date.localeCompare(a.date));

  const PHOTO_ALT = {
    'casual-meeting': 'Lounge corner with yellow chairs and a low table',
    'city-dusk': 'City skyline at dusk with a river and lit towers',
    coworking: 'Shared lounge with sofas, plants and low tables',
    'district-aerial': 'Aerial view of a green business district',
    'facade-grid': 'Glass facade with a grid of window frames',
    'glass-roofline': 'Glass roofline under a cloudy sky',
    'laptop-work': 'Man working on a laptop at a wooden desk',
    'loft-office': 'Large open office with columns and tall windows',
    lounge: 'Bright rest area with armchairs and a sofa',
    'meeting-room': 'White meeting room with a long table',
    'open-office': 'Open office with desks and glass meeting rooms',
    'outdoor-work': 'Person typing on a laptop at an outdoor table',
    'quiet-desk': 'Tidy desk with a computer and a wall calendar',
    'server-rack': 'Technician kneeling at an open server rack with a laptop',
    'tower-corner': 'Curved office tower against a pale sky',
    'towers-sky': 'Office towers seen from below against the sky',
    'working-session': 'Two people taking notes next to their laptops',
  };
  const readMinutes = (a) => Math.max(1, Math.round(a.body.join(' ').split(/\s+/).length / 200));
  const card = (a) => `<article class="article-card" data-category="${esc(a.cat)}" data-article="${esc(a.id)}">`
    + `<a href="article.html?id=${encodeURIComponent(a.id)}">${a.image ? `<img src="assets/images/photos/sm/${esc(a.image)}.webp" width="960" height="640" alt="" loading="lazy">` : ''}`
    + `<span class="meta-line">${esc(seed.articleCategories[a.cat])}, <time datetime="${esc(a.date)}">${esc(fmtDate(a.date))}</time></span>`
    + `<h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p></a></article>`;

  detailPage({
    loadingTitle: 'Loading story…',
    load: () => seed.articles.find((a) => a.id === id) || null,
    notFound: {
      title: id ? 'Story not found.' : 'No story selected.',
      text: id ? `There is no story with the id “${id}”. The link may be old.` : 'Choose a story on the news page.',
      action: { label: 'Open the news', href: 'insights.html' },
      secondary: { label: 'Get the newsletter', href: 'newsletter.html' },
    },
    render(a) {
      const cat = seed.articleCategories[a.cat];
      document.title = `${a.title} | Northbank Technology Park`;
      $('meta[name="description"]')?.setAttribute('content', a.summary);
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/article.html?id=${encodeURIComponent(a.id)}`);
      $('#articleCatLink').textContent = cat;
      $('#articleCatLink').href = `insights.html?cat=${encodeURIComponent(a.cat)}`;
      $('#articleMetaTags').innerHTML = `<span class="chip">${esc(cat)}</span><span class="chip"><time datetime="${esc(a.date)}">${esc(fmtDate(a.date))}</time></span>`;
      $('#articleTitle').textContent = a.title;
      $('#articleSummary').textContent = a.summary;
      $('#articleMore').href = `insights.html?cat=${encodeURIComponent(a.cat)}`;
      $('#articlePhoto').innerHTML = a.image
        ? `<img src="assets/images/photos/${esc(a.image)}.webp" srcset="assets/images/photos/sm/${esc(a.image)}.webp 960w, assets/images/photos/${esc(a.image)}.webp 1920w" sizes="(max-width: 900px) 100vw, 1216px" width="1920" height="1280" alt="${esc(PHOTO_ALT[a.image] || '')}">`
        : '';
      $('#articlePhoto').hidden = !a.image;
      $('#articleBody').innerHTML = a.body.map((p) => `<p>${esc(p)}</p>`).join('');
      $('#articleFacts').innerHTML = [
        ['Category', `<a class="text-link" href="insights.html?cat=${encodeURIComponent(a.cat)}">${esc(cat)}</a>`],
        ['Published', esc(fmtDate(a.date))],
        ['Reading time', `${readMinutes(a)} min`],
      ].map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${dd}</dd>`).join('');

      const job = a.jobId && seed.jobs.find((j) => j.id === a.jobId);
      let shown = [a.id];
      if (job) {
        const company = seed.companies.find((c) => c.id === job.companyId);
        $('#articleExtra').innerHTML = `<h2 class="article-extra-title">Open role in this story</h2>`
          + `<a class="entity-card" href="job-detail.html?id=${encodeURIComponent(job.id)}"><span class="entity-mark" aria-hidden="true">${esc((company?.name || job.title).slice(0, 2).toUpperCase())}</span>`
          + `<div><h3>${esc(job.title)}</h3><p>${esc(company?.name || '')}, ${esc(job.type)}</p></div>`
          + `<div class="entity-side"><span>Apply by ${esc(fmtDate(job.deadline))}</span></div></a>`;
      } else {
        const related = [...sorted.filter((x) => x.cat === a.cat && x.id !== a.id), ...sorted.filter((x) => x.cat !== a.cat)].slice(0, 3);
        shown = shown.concat(related.map((r) => r.id));
        $('#articleExtra').innerHTML = `<h2 class="article-extra-title">Related stories</h2><ul class="news-related">${related.map((r) => `<li><a href="article.html?id=${encodeURIComponent(r.id)}"><time datetime="${esc(r.date)}">${esc(fmtDate(r.date))}</time><span>${esc(r.title)}</span></a></li>`).join('')}</ul>`;
      }

      const i = sorted.findIndex((x) => x.id === a.id);
      const newer = sorted[i - 1];
      const older = sorted[i + 1];
      $('#articlePrevNext').innerHTML = (newer ? `<a href="article.html?id=${encodeURIComponent(newer.id)}" rel="prev"><span>Newer story</span><strong>${esc(newer.title)}</strong></a>` : '')
        + (older ? `<a href="article.html?id=${encodeURIComponent(older.id)}" rel="next" class="is-older"><span>Older story</span><strong>${esc(older.title)}</strong></a>` : '');

      $('#articleRelated').innerHTML = sorted.filter((x) => !shown.includes(x.id)).slice(0, 3).map(card).join('');
      $('#articleCopy').onclick = async () => {
        try { await navigator.clipboard.writeText(location.href); toast('Link copied.'); }
        catch { toast(`Copy did not work. The link is ${location.href}`); }
      };
    },
  });
})();
