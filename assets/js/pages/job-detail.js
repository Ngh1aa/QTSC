/** Job detail: job-detail.html?id=<job id> with apply form (CV file name only),
 * duplicate and closed-position handling, saved to the session store. */
(() => {
  const { $, esc, detailPage, bindForm, successPanel, fmtDate, todayISO, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  if (!$('#jobTitle')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim();

  function mountApply(job) {
    const host = $('#applyHost');
    const form = $('#applyForm');
    const existing = store.list('applications').find(a => a.jobId === job.id && a.status === 'submitted');
    if (job.deadline < todayISO()) {
      showState(host, 'empty', { title: 'Vị trí đã hết hạn nhận hồ sơ.', text: `Hạn nộp là ${fmtDate(job.deadline)}. Xem các vị trí khác đang mở.`, action: { label: 'Xem vị trí đang mở', href: 'careers.html' } });
      return;
    }
    if (existing) {
      showState(host, 'empty', { title: 'Bạn đã nộp hồ sơ cho vị trí này.', text: `Mã hồ sơ ${existing.id}, nộp ngày ${fmtDate(existing.createdAt)}. Muốn nộp lại, hãy rút hồ sơ cũ trước.`, action: { label: 'Mở hồ sơ ứng tuyển của tôi', href: 'careers.html#my-applications' } });
      return;
    }
    bindForm(form, {
      busyLabel: 'Đang nộp hồ sơ…',
      validate: (values, f) => {
        const file = f.elements.cv.files[0];
        if (file && !/\.(pdf|docx?)$/i.test(file.name)) return { cv: 'CV cần là tệp PDF, DOC hoặc DOCX.' };
        if (file && file.size > 5 * 1024 * 1024) return { cv: 'Tệp CV cần nhỏ hơn 5 MB.' };
        return {};
      },
      submit: values => store.request(() => store.add('applications', { jobId: job.id, name: values.name, email: values.email, phone: values.phone, link: values.link, cvName: values.cv, letter: values.letter, status: 'submitted' }, 'AP')),
      success(record) {
        const panel = successPanel({
          title: 'Hồ sơ ứng tuyển đã được ghi nhận.',
          reference: record.id,
          lines: [`Vị trí ${job.title} tại ${job.company}.`, `CV đã chọn: ${record.cvName}.`],
          actions: [{ label: 'Xem hồ sơ ứng tuyển của tôi', href: 'careers.html#my-applications' }, { label: 'Xem vị trí khác', href: 'careers.html' }]
        });
        form.hidden = true;
        host.append(panel);
        panel.focus();
      }
    });
  }

  detailPage({
    loadingTitle: 'Đang tải vị trí tuyển dụng…',
    load: () => seed.jobs.find(j => j.id === id) || null,
    notFound: {
      title: id ? 'Không tìm thấy vị trí này.' : 'Chưa chọn vị trí tuyển dụng.',
      text: id ? `Vị trí “${id}” có thể đã đóng hoặc liên kết bị sai.` : 'Hãy chọn một vị trí trong danh sách tuyển dụng.',
      action: { label: 'Xem vị trí đang mở', href: 'careers.html' },
      secondary: { label: 'Đăng ký nhận tin tuyển dụng', href: 'newsletter.html' }
    },
    render(j) {
      document.title = `${j.title} — Tuyển dụng QTSC`;
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/job-detail.html?id=${encodeURIComponent(j.id)}`);
      $('#jobCrumb').textContent = j.title;
      $('#jobTitle').textContent = j.title;
      const company = j.companyId ? seed.companies.find(c => c.id === j.companyId) : null;
      $('#jobMetaTags').innerHTML = [j.company, j.type, seed.jobCategories[j.category]].map(v => `<span>${esc(v)}</span>`).join('');
      $('#jobSummary').textContent = j.summary;
      $('#jobDuties').innerHTML = j.duties.map(d => `<li>${esc(d)}</li>`).join('');
      $('#jobRequirements').innerHTML = j.requirements.map(d => `<li>${esc(d)}</li>`).join('');
      $('#jobProof').innerHTML = [['Cấp bậc', j.level, 'theo tin tuyển dụng.'], ['Hình thức', j.type, 'thời gian làm việc.'], ['Đăng ngày', fmtDate(j.posted), 'trên kênh tuyển dụng QTSC.'], ['Hạn nộp', fmtDate(j.deadline), 'nhận hồ sơ đến hết ngày.']]
        .map(([l, v, n]) => `<div class="proof-cell"><span>${esc(l)}</span><strong>${esc(v)}</strong><em>${esc(n)}</em></div>`).join('');
      $('#jobFacts').innerHTML = [['Nhà tuyển dụng', company ? `<a href="company-detail.html?id=${encodeURIComponent(company.id)}">${esc(company.name)}</a>` : esc(j.company)], ['Địa điểm', 'Khu Công viên phần mềm Quang Trung, TP.HCM'], ['Nhóm nghề', esc(seed.jobCategories[j.category])], ['Mã vị trí', esc(j.id)]]
        .map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${dd}</dd></div>`).join('');
      $('#jobRelated').innerHTML = seed.jobs.filter(x => x.category === j.category && x.id !== j.id).slice(0, 4)
        .map(r => `<a class="ecosystem-link" href="job-detail.html?id=${encodeURIComponent(r.id)}"><span>${esc(r.company)}</span><h3>${esc(r.title)}</h3><p>${esc(r.type)}</p><i>Xem vị trí ↗</i></a>`).join('') || '<p>Chưa có vị trí liên quan.</p>';
      mountApply(j);
    }
  });
})();
