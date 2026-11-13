/** Company detail: company-detail.html?id=<company id> (legacy #id still works).
 * Renders profile, solutions, open jobs and related companies from the seed,
 * with loading, not-found and error states. */
(() => {
  const { $, esc, detailPage, fmtDate } = window.QTSCUI;
  const seed = window.QTSCStore.seed;
  if (!$('#companyName')) return;
  const params = new URLSearchParams(location.search);
  const id = (params.get('id') || location.hash.slice(1) || '').trim().toLowerCase();

  detailPage({
    loadingTitle: 'Đang tải hồ sơ doanh nghiệp…',
    load: () => seed.companies.find(c => c.id === id) || null,
    notFound: {
      title: id ? 'Không tìm thấy doanh nghiệp này.' : 'Chưa chọn doanh nghiệp.',
      text: id ? `Không có hồ sơ nào với mã “${id}”. Doanh nghiệp có thể đã đổi tên hoặc liên kết bị sai.` : 'Hãy chọn một doanh nghiệp trong danh bạ để xem hồ sơ.',
      action: { label: 'Mở danh bạ doanh nghiệp', href: 'companies.html' },
      secondary: { label: 'Tìm theo giải pháp', href: 'marketplace.html' }
    },
    render(c) {
      const solutions = seed.solutions.filter(s => s.companyId === c.id);
      const jobs = seed.jobs.filter(j => j.companyId === c.id);
      document.title = `${c.name} — QTSC`;
      $('meta[name="description"]')?.setAttribute('content', `Hồ sơ ${c.name} trong hệ sinh thái QTSC: lĩnh vực, sản phẩm, giải pháp và vị trí trong campus.`);
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/company-detail.html?id=${encodeURIComponent(c.id)}`);
      $('#companyCrumb').textContent = c.name;
      $('#companyName').textContent = c.name;
      $('#companyMetaTags').innerHTML = [c.sector, c.country, c.building].map(v => `<span>${esc(v)}</span>`).join('');
      $('#companyIntro').textContent = c.intro;
      $('#companyLead').textContent = c.lead;
      $('#companyContact').onclick = () => window.QTSC.openContact(`Kết nối doanh nghiệp: ${c.name}`);
      $('#companySolutionsLink').href = solutions.length ? '#company-solutions' : `marketplace.html?technology=${encodeURIComponent(c.category === 'data' ? 'ai' : 'all')}`;
      $('#companySolutionsLink').textContent = solutions.length ? `Xem ${solutions.length} giải pháp` : 'Tìm giải pháp liên quan';
      $('#companyProof').innerHTML = [
        ['Quốc gia', c.country, 'nơi đặt trụ sở hoặc thị trường chính.'],
        ['Hiện diện', c.building, 'vị trí trong QTSC Campus.'],
        ['Giải pháp', String(solutions.length).padStart(2, '0'), 'đang giới thiệu trên Marketplace.'],
        ['Tuyển dụng', String(jobs.length).padStart(2, '0'), 'vị trí đang mở trên trang Tuyển dụng.']
      ].map(([label, value, note]) => `<div class="proof-cell"><span>${esc(label)}</span><strong>${esc(value)}</strong><em>${esc(note)}</em></div>`).join('');
      $('#companySolutions').innerHTML = solutions.length
        ? solutions.map(s => `<a class="entity-card" href="solution-detail.html?id=${encodeURIComponent(s.id)}"><div class="entity-mark">${esc(s.name.slice(0, 2).toUpperCase())}</div><h3>${esc(s.name)}</h3><p>${esc(s.type)}, ${esc(seed.solutionCategories[s.category])}</p><footer><span>Xem chi tiết</span><span aria-hidden="true"></span></footer></a>`).join('')
        : `<div class="state-panel is-empty" data-state="empty"><strong>Chưa có giải pháp được giới thiệu.</strong><p>Doanh nghiệp chưa đăng sản phẩm lên Marketplace. Bạn vẫn có thể gửi yêu cầu kết nối qua QTSC.</p></div>`;
      $('#companyJobs').innerHTML = jobs.length
        ? jobs.map(j => `<a class="proto-card" href="job-detail.html?id=${encodeURIComponent(j.id)}"><div><h3>${esc(j.title)}</h3><p>${esc(j.type)}, hạn nộp ${esc(fmtDate(j.deadline))}</p></div><div class="proto-card-side"><span class="proto-card-cta">Xem vị trí</span></div></a>`).join('')
        : `<div class="state-panel is-empty" data-state="empty"><strong>Chưa có vị trí đang tuyển.</strong><p>Theo dõi trang Tuyển dụng hoặc đăng ký bản tin để nhận cơ hội mới.</p></div>`;
      $('#companyFacts').innerHTML = [
        ['Tên viết tắt', c.short || 'Chưa cập nhật'],
        ['Địa điểm', `${c.building}, QTSC`],
        ['Lĩnh vực', (c.tags || []).join(', ') || c.sector],
        ['Website', c.website || 'Chưa cập nhật'],
        ['Điện thoại', c.phone || 'Liên hệ qua QTSC']
      ].map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`).join('');
      const related = seed.companies.filter(x => x.category === c.category && x.id !== c.id).slice(0, 4);
      $('#companyRelated').innerHTML = related.map(r => `<a class="ecosystem-link" href="company-detail.html?id=${encodeURIComponent(r.id)}"><span>${esc(r.sector)}</span><h3>${esc(r.name)}</h3><p>${esc(r.building)}</p><i>Xem hồ sơ ↗</i></a>`).join('');
    }
  });
})();
