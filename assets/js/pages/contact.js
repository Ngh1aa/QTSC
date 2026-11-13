/** Contact: topic-routed contact form (?topic= prefill), simulated request with
 * recoverable error, and the list of requests sent from this tab (form + drawer). */
(() => {
  const { $, esc, bindForm, successPanel, fmtDate, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const form = $('#contactForm');
  if (!form) return;
  const topicLabel = value => form.elements.topic.querySelector(`option[value="${value}"]`)?.textContent || 'Liên hệ chung';
  const preset = new URLSearchParams(location.search).get('topic');
  if (preset && form.elements.topic.querySelector(`option[value="${CSS.escape(preset)}"]`)) form.elements.topic.value = preset;

  const history = $('#contactHistory');
  function renderHistory() {
    const list = store.list('contacts');
    history.dataset.state = list.length ? 'ready' : 'empty';
    if (!list.length) { showState(history, 'empty', { title: 'Chưa có yêu cầu nào.', text: 'Yêu cầu bạn gửi từ trang này hoặc từ nút Kết nối QTSC sẽ hiển thị tại đây.' }); return; }
    history.innerHTML = list.map(c => `<article class="proto-record" data-contact="${esc(c.id)}"><div><h3>${esc(c.topicLabel || c.need || 'Liên hệ chung')}</h3><p>Mã ${esc(c.id)}, gửi ngày ${esc(fmtDate(c.createdAt))}</p><p>${esc((c.message || '').slice(0, 120))}</p></div><div class="record-actions"><span class="badge is-ok">Đã ghi nhận</span></div></article>`).join('');
  }
  renderHistory();
  document.addEventListener('qtsc:store', event => { if (event.detail?.reason === 'contacts') renderHistory(); });

  bindForm(form, {
    submit: values => store.request(() => store.add('contacts', { source: 'contact-page', topic: values.topic, topicLabel: topicLabel(values.topic), name: values.name, company: values.company, email: values.email, phone: values.phone, message: values.message }, 'LH')),
    success(record) {
      const panel = successPanel({
        title: 'Yêu cầu liên hệ đã được ghi nhận.',
        reference: record.id,
        lines: [`Chủ đề: ${record.topicLabel}.`, `QTSC sẽ phản hồi tới ${record.email} trong giờ hành chính.`],
        actions: [{ label: 'Gửi yêu cầu khác', onClick: () => { panel.remove(); form.reset(); form.hidden = false; form.elements.topic.focus(); } }, { label: 'Về trang chủ', href: 'index.html' }]
      });
      form.hidden = true;
      $('#contactHost').append(panel);
      panel.focus();
    }
  });
})();
