/** Solution detail: solution-detail.html?id=<solution id>. Shows the offering,
 * its provider and a "request a demo / contact vendor" flow saved to the
 * session store (demoRequests), with a cancellable list of your requests. */
(() => {
  const { $, $$, esc, detailPage, bindForm, successPanel, confirmDialog, fmtDate, todayISO, toast } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  if (!$('#solutionName')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim();
  let solution = null;

  function renderRequests() {
    const host = $('#solutionRequests');
    const mine = store.list('demoRequests').filter(r => r.solutionId === solution.id);
    if (!mine.length) {
      host.innerHTML = '<div class="state-panel is-empty" data-state="empty"><strong>Chưa có yêu cầu nào.</strong><p>Yêu cầu bạn gửi cho giải pháp này sẽ hiển thị tại đây trong phiên làm việc.</p></div>';
      return;
    }
    host.innerHTML = mine.map(r => `<article class="proto-record ${r.status === 'cancelled' ? 'is-cancelled' : ''}" data-request="${esc(r.id)}"><div><h3>${r.kind === 'demo' ? 'Yêu cầu demo' : 'Liên hệ nhà cung cấp'}</h3><p>Mã ${esc(r.id)}${r.date ? `, ngày mong muốn ${esc(fmtDate(r.date))}` : ''}</p><p>${esc(r.company)}, ${esc(r.email)}</p></div><div class="record-actions">${r.status === 'cancelled' ? '<span class="badge is-muted">Đã hủy</span>' : `<span class="badge is-ok">Đã ghi nhận</span><button type="button" class="btn btn-secondary" data-cancel-request="${esc(r.id)}">Hủy yêu cầu</button>`}</div></article>`).join('');
    $$('[data-cancel-request]', host).forEach(button => button.addEventListener('click', async () => {
      const ok = await confirmDialog({ title: 'Hủy yêu cầu này?', text: 'Nhà cung cấp sẽ không nhận được yêu cầu nữa. Bạn có thể gửi lại bất cứ lúc nào.', confirmLabel: 'Hủy yêu cầu', cancelLabel: 'Giữ yêu cầu' });
      if (!ok) return;
      button.disabled = true;
      store.request(() => store.update('demoRequests', button.dataset.cancelRequest, { status: 'cancelled' }))
        .then(() => { toast('Đã hủy yêu cầu.'); renderRequests(); })
        .catch(error => { button.disabled = false; toast(`Chưa hủy được: ${error.message}`); });
    }));
  }

  function syncKind(form) {
    if (!solution.demo) form.elements.kind.value = 'contact';
    const kind = form.elements.kind.value;
    const dateField = $('#sr-date-field');
    const date = $('#sr-date');
    dateField.hidden = kind !== 'demo';
    date.required = kind === 'demo';
    $('#requestTitle').textContent = kind === 'demo' ? `Yêu cầu demo ${solution.name}` : `Liên hệ ${solution.provider}`;
  }

  function mountForm() {
    const host = $('#requestHost');
    const form = $('#solutionRequestForm');
    $('#sr-date').min = todayISO(1);
    if (!solution.demo) { form.elements.kind.value = 'contact'; $$('input[name="kind"][value="demo"]', form).forEach(r => { r.disabled = true; r.closest('label').hidden = true; }); }
    syncKind(form);
    $$('input[name="kind"]', form).forEach(r => r.addEventListener('change', () => syncKind(form)));
    $$('[data-request-type]').forEach(link => link.addEventListener('click', () => {
      const kind = link.dataset.requestType === 'demo' && solution.demo ? 'demo' : 'contact';
      const radio = $(`input[name="kind"][value="${kind}"]`, form);
      if (radio) { radio.checked = true; syncKind(form); }
      setTimeout(() => $('#sr-name')?.focus({ preventScroll: true }), 50);
    }));
    bindForm(form, {
      validate: values => (values.kind === 'demo' && values.date && values.date < todayISO(1) ? { date: 'Chọn ngày từ ngày mai trở đi.' } : {}),
      submit: values => store.request(() => store.add('demoRequests', {
        solutionId: solution.id, solutionName: solution.name, provider: solution.provider, kind: values.kind,
        name: values.name, email: values.email, company: values.company, phone: values.phone, date: values.kind === 'demo' ? values.date : '', size: values.size, message: values.message, status: 'submitted'
      }, values.kind === 'demo' ? 'DM' : 'LH')),
      success(record) {
        const panel = successPanel({
          title: record.kind === 'demo' ? 'Yêu cầu demo đã được ghi nhận.' : 'Yêu cầu liên hệ đã được ghi nhận.',
          reference: record.id,
          lines: [`${solution.provider} sẽ nhận yêu cầu cho ${solution.name}.`, record.date ? `Ngày mong muốn: ${fmtDate(record.date)}.` : 'QTSC sẽ phản hồi qua email bạn cung cấp.'],
          actions: [{ label: 'Gửi yêu cầu khác', onClick: () => { panel.remove(); form.reset(); syncKind(form); form.hidden = false; $('#sr-name').focus(); } }, { label: 'Xem giải pháp khác', href: 'marketplace.html' }]
        });
        form.hidden = true;
        host.append(panel);
        panel.focus();
        renderRequests();
      }
    });
  }

  detailPage({
    loadingTitle: 'Đang tải giải pháp…',
    load: () => seed.solutions.find(s => s.id === id) || null,
    notFound: {
      title: id ? 'Không tìm thấy giải pháp này.' : 'Chưa chọn giải pháp.',
      text: id ? `Không có giải pháp nào với mã “${id}”. Giải pháp có thể đã ngừng giới thiệu.` : 'Hãy chọn một giải pháp trong Technology Marketplace.',
      action: { label: 'Mở Technology Marketplace', href: 'marketplace.html' },
      secondary: { label: 'Danh bạ doanh nghiệp', href: 'companies.html' }
    },
    render(s) {
      solution = s;
      const category = seed.solutionCategories[s.category];
      const company = s.companyId ? seed.companies.find(c => c.id === s.companyId) : null;
      document.title = `${s.name} — Technology Marketplace QTSC`;
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/solution-detail.html?id=${encodeURIComponent(s.id)}`);
      $('meta[name="description"]')?.setAttribute('content', s.summary);
      $('#solutionCrumb').textContent = s.name;
      $('#solutionName').textContent = s.name;
      $('#solutionMetaTags').innerHTML = [category, s.type, s.provider].map(v => `<span>${esc(v)}</span>`).join('');
      $('#solutionFocus').textContent = s.focus;
      $('#solutionSummary').textContent = s.summary;
      $('#solutionFeatures').innerHTML = s.features.map(f => `<li>${esc(f)}</li>`).join('');
      $('#solutionProof').innerHTML = [['Nhóm công nghệ', category, 'theo phân loại Marketplace.'], ['Loại', s.type, 'hình thức cung cấp.'], ['Triển khai', s.deployment, 'mô hình thường áp dụng.'], ['Demo', s.demo ? 'Có' : 'Không', s.demo ? 'đặt lịch qua QTSC.' : 'liên hệ trực tiếp nhà cung cấp.']]
        .map(([l, v, n]) => `<div class="proof-cell"><span>${esc(l)}</span><strong>${esc(v)}</strong><em>${esc(n)}</em></div>`).join('');
      $('#solutionProvider').innerHTML = company
        ? `<a class="proto-card" href="company-detail.html?id=${encodeURIComponent(company.id)}"><div><h3>${esc(company.name)}</h3><p>${esc(company.sector)}, ${esc(company.building)}</p></div><div class="proto-card-side"><span class="proto-card-cta">Xem hồ sơ doanh nghiệp</span></div></a>`
        : `<div class="proto-card"><div><h3>${esc(s.provider)}</h3><p>Nhà cung cấp chưa có hồ sơ trong danh bạ QTSC. Gửi yêu cầu bên dưới để QTSC kết nối.</p></div></div>`;
      $('#solutionFacts').innerHTML = [['Nhà cung cấp', s.provider], ['Nhóm', category], ['Hình thức', s.type], ['Triển khai', s.deployment], ['Mã giải pháp', s.id]]
        .map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`).join('');
      $('#solutionRelated').innerHTML = seed.solutions.filter(x => x.category === s.category && x.id !== s.id).slice(0, 4)
        .map(r => `<a class="ecosystem-link" href="solution-detail.html?id=${encodeURIComponent(r.id)}"><span>${esc(r.provider)}</span><h3>${esc(r.name)}</h3><p>${esc(r.type)}</p><i>Xem giải pháp ↗</i></a>`).join('');
      mountForm();
      renderRequests();
    }
  });
})();
