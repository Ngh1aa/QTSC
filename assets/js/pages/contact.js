/* Contact: topic-routed form (?topic= prefill), simulated request with a recoverable error, and the list of
 * messages sent from this tab (from this form and from the "Get in touch" drawer). */
(() => {
  const { $, esc, bindForm, successPanel, fmtDate, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const form = $('#contactForm');
  if (!form) return;
  const topicLabel = (value) => form.elements.topic.querySelector(`option[value="${CSS.escape(value || '')}"]`)?.textContent || 'General question';
  const preset = new URLSearchParams(location.search).get('topic');
  if (preset && form.elements.topic.querySelector(`option[value="${CSS.escape(preset)}"]`)) form.elements.topic.value = preset;

  const history = $('#contactHistory');
  function renderHistory() {
    const list = store.list('contacts');
    history.dataset.state = list.length ? 'ready' : 'empty';
    if (!list.length) { showState(history, 'empty', { title: 'No messages yet.', text: '' }); return; }
    history.innerHTML = list.map((c) => `<article class="proto-record" data-contact="${esc(c.id)}"><div><h3>${esc(c.topicLabel || c.need || 'General question')}</h3><p>${esc(c.id)}, sent ${esc(fmtDate(c.createdAt))}</p>${c.message ? `<p>${esc(c.message.slice(0, 140))}</p>` : ''}</div><span class="badge is-ok">Received</span></article>`).join('');
  }
  renderHistory();
  document.addEventListener('qtsc:store', (event) => { if (event.detail?.reason === 'contacts') renderHistory(); });

  bindForm(form, {
    submit: (values) => store.request(() => store.add('contacts', { source: 'contact-page', topic: values.topic, topicLabel: topicLabel(values.topic), name: values.name, company: values.company, email: values.email, phone: values.phone, message: values.message, status: 'received' }, 'CT')),
    success(record) {
      const panel = successPanel({
        title: 'Thanks, your message is with us.',
        reference: record.id,
        lines: [`Topic: ${record.topicLabel}.`, `We reply to ${record.email} within one working day.`],
        actions: [{ label: 'Send another', onClick: () => { panel.remove(); form.reset(); form.hidden = false; form.elements.topic.focus(); } }, { label: 'Back to home', href: 'index.html' }],
      });
      form.hidden = true;
      $('#contactHost').append(panel);
      panel.focus();
    },
  });
})();
