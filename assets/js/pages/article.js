/** Article detail: article.html?id=<article id>; summary, source link, prev/next and related news. */
(() => {
  const { $, esc, detailPage, fmtDate, toast } = window.QTSCUI;
  const seed = window.QTSCStore.seed;
  if (!$('#articleTitle')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim();
  const sorted = [...seed.articles].sort((a, b) => b.date.localeCompare(a.date));

  detailPage({
    loadingTitle: 'Đang tải bài viết…',
    load: () => seed.articles.find(a => a.id === id) || null,
    notFound: {
      title: id ? 'Không tìm thấy bài viết này.' : 'Chưa chọn bài viết.',
      text: id ? 'Bài viết có thể đã được gỡ hoặc đổi địa chỉ. Hãy tìm lại trong mục Tin tức.' : 'Hãy chọn một bài viết trong mục Tin tức và Sự kiện.',
      action: { label: 'Về trang Tin tức', href: 'insights.html' },
      secondary: { label: 'Đăng ký nhận bản tin', href: 'newsletter.html' }
    },
    render(a) {
      const cat = seed.articleCategories[a.cat];
      document.title = `${a.title} — Tin tức QTSC`;
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/article.html?id=${encodeURIComponent(a.id)}`);
      $('meta[name="description"]')?.setAttribute('content', a.summary);
      $('#articleCatLink').textContent = cat;
      $('#articleCatLink').href = `insights.html?cat=${a.cat}`;
      $('#articleMetaTags').innerHTML = [cat, fmtDate(a.date)].map(v => `<span>${esc(v)}</span>`).join('');
      $('#articleTitle').textContent = a.title;
      $('#articleSource').href = a.source;
      $('#articleBody').innerHTML = `<h2>Tóm tắt</h2>${a.body.map(p => `<p>${esc(p)}</p>`).join('')}`;
      $('#articleFacts').innerHTML = [['Chuyên mục', cat], ['Ngày đăng', fmtDate(a.date)], ['Nguồn', 'qtsc.com.vn']].map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`).join('');
      const job = a.jobId && seed.jobs.find(j => j.id === a.jobId);
      $('#articleExtra').innerHTML = job ? `<p class="proto-section-title">Vị trí trong tin</p><a class="btn btn-brand" href="job-detail.html?id=${encodeURIComponent(job.id)}">Xem và ứng tuyển</a>` : '';
      const i = sorted.findIndex(x => x.id === a.id);
      const newer = sorted[i - 1];
      const older = sorted[i + 1];
      $('#articlePrevNext').innerHTML = (newer ? `<a class="btn btn-secondary" href="article.html?id=${encodeURIComponent(newer.id)}" rel="prev">Tin mới hơn</a>` : '') + (older ? `<a class="btn btn-secondary" href="article.html?id=${encodeURIComponent(older.id)}" rel="next">Tin cũ hơn</a>` : '');
      $('#articleMore').href = `insights.html?cat=${a.cat}`;
      $('#articleRelated').innerHTML = sorted.filter(x => x.cat === a.cat && x.id !== a.id).slice(0, 4)
        .map(r => `<a class="ecosystem-link" href="article.html?id=${encodeURIComponent(r.id)}"><span>${esc(fmtDate(r.date))}</span><h3>${esc(r.title)}</h3><p>${esc(cat)}</p><i>Đọc tin ↗</i></a>`).join('') || '<p>Chưa có tin cùng chuyên mục.</p>';
      $('#articleCopy').onclick = async () => {
        try { await navigator.clipboard.writeText(location.href); toast('Đã sao chép liên kết bài viết.'); }
        catch { toast(`Không sao chép tự động được. Liên kết: ${location.href}`); }
      };
    }
  });
})();
