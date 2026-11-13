/** Careers: job search + filters + pagination, and "my applications" with withdraw. */
(() => {
  const { $, $$, esc, fmtDate, showState, confirmDialog, toast } = window.QTSCUI;
  const { createListing, pillControl, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;

  const companySelect = $('#jobCompany');
  if (companySelect) {
    [...new Set(seed.jobs.map(j => j.company))].sort((a, b) => a.localeCompare(b, 'vi')).forEach(c => companySelect.insertAdjacentHTML('beforeend', `<option value="${esc(c)}">${esc(c)}</option>`));
    createListing({
      results: $('#jobResults'), pagerEl: $('#jobPager'), metaEl: $('#jobMeta'), search: $('#jobSearch'), perPage: 6, label: 'vị trí',
      load: () => [...seed.jobs].sort((a, b) => b.posted.localeCompare(a.posted)),
      text: j => `${j.title} ${j.company} ${j.summary} ${j.requirements.join(' ')}`,
      filters: [
        { param: 'group', control: pillControl($('#jobPills')), match: (j, v) => j.category === v },
        { param: 'type', control: fieldControl($('#jobType')), match: (j, v) => j.type === v },
        { param: 'company', control: fieldControl(companySelect), match: (j, v) => j.company === v }
      ],
      emptyCopy: { title: 'Chưa có vị trí phù hợp.', text: 'Thử từ khóa khác hoặc đăng ký bản tin để nhận tin tuyển dụng mới.' },
      render: j => {
        const applied = store.list('applications').some(a => a.jobId === j.id && a.status !== 'withdrawn');
        return `<a class="proto-card" href="job-detail.html?id=${encodeURIComponent(j.id)}" data-job="${esc(j.id)}"><div><h3>${esc(j.title)}</h3><p>${esc(j.company)}, ${esc(j.type.toLowerCase())}, ${esc(j.level.toLowerCase())}</p><p>${esc(j.summary)}</p></div><div class="proto-card-side">${applied ? '<span class="badge is-ok">Đã ứng tuyển</span>' : ''}<span>Hạn nộp ${esc(fmtDate(j.deadline))}</span><span class="proto-card-cta">Xem và ứng tuyển</span></div></a>`;
      }
    });
  }

  const host = $('#myApplications');
  const statusLabel = { submitted: ['Đã nộp', 'is-ok'], withdrawn: ['Đã rút', 'is-muted'] };
  function render() {
    const list = store.list('applications');
    host.dataset.state = list.length ? 'ready' : 'empty';
    if (!list.length) { showState(host, 'empty', { title: 'Bạn chưa nộp hồ sơ nào.', text: 'Chọn một vị trí và nộp hồ sơ, trạng thái sẽ hiển thị tại đây.', action: { label: 'Xem vị trí đang mở', href: '#jobs' } }); return; }
    host.innerHTML = list.map(a => {
      const job = seed.jobs.find(j => j.id === a.jobId);
      const [label, tone] = statusLabel[a.status] || statusLabel.submitted;
      return `<article class="proto-record ${a.status === 'withdrawn' ? 'is-cancelled' : ''}" data-application="${esc(a.id)}"><div><h3>${job ? `<a href="job-detail.html?id=${encodeURIComponent(job.id)}">${esc(job.title)}</a>` : 'Vị trí đã đóng'}</h3><p>${esc(job?.company || '')}, nộp ngày ${esc(fmtDate(a.createdAt))}, mã ${esc(a.id)}</p><p>CV: ${esc(a.cvName)}</p></div><div class="record-actions"><span class="badge ${tone}">${label}</span>${a.status === 'submitted' ? `<button type="button" class="btn btn-secondary" data-withdraw="${esc(a.id)}">Rút hồ sơ</button>` : ''}</div></article>`;
    }).join('');
    $$('[data-withdraw]', host).forEach(button => button.addEventListener('click', async () => {
      const id = button.dataset.withdraw;
      const ok = await confirmDialog({ title: 'Rút hồ sơ ứng tuyển?', text: 'Nhà tuyển dụng sẽ không xem xét hồ sơ này nữa. Bạn có thể nộp lại khi vị trí còn mở.', confirmLabel: 'Rút hồ sơ', cancelLabel: 'Giữ hồ sơ' });
      if (!ok) return;
      button.disabled = true; button.textContent = 'Đang rút…';
      store.request(() => store.update('applications', id, { status: 'withdrawn' }))
        .then(() => { render(); toast(`Đã rút hồ sơ ${id}.`); })
        .catch(error => { button.disabled = false; button.textContent = 'Rút hồ sơ'; toast(`Chưa rút được hồ sơ: ${error.message}`); });
    }));
  }
  if (host) {
    const load = () => { showState(host, 'loading', { title: 'Đang tải hồ sơ của bạn…', rows: 1 }); store.request(() => true, { delay: 250 }).then(render).catch(error => showState(host, 'error', { title: 'Không tải được hồ sơ.', text: error.message, action: { label: 'Thử lại', onClick: load } })); };
    load();
  }
})();
