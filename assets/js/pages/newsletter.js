/** Newsletter: subscribe (email, topics, frequency) and manage preferences or
 * unsubscribe; the subscription lives in the session store (newsletter). */
(() => {
  const { $, $$, esc, bindForm, successPanel, confirmDialog, toast, showState, fmtDate } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const host = $('#newsletterHost');
  if (!host) return;
  const topics = Object.entries(seed.newsletterTopics);
  const frequencies = { monthly: 'Hằng tháng', biweekly: 'Hai tuần một lần', events: 'Chỉ khi có sự kiện' };

  const topicBoxes = selected => `<fieldset class="is-wide" id="nl-topics"><legend>Chủ đề quan tâm *</legend>${topics.map(([k, v]) => `<label class="proto-check"><input type="checkbox" name="topics" value="${k}" data-multi ${selected.includes(k) ? 'checked' : ''}> ${esc(v)}</label>`).join('')}</fieldset>`;
  const freqRadios = selected => `<fieldset class="is-wide"><legend>Tần suất nhận tin</legend>${Object.entries(frequencies).map(([k, v]) => `<label class="proto-check"><input type="radio" name="frequency" value="${k}" ${selected === k ? 'checked' : ''}> ${esc(v)}</label>`).join('')}</fieldset>`;
  const needTopic = values => ([].concat(values.topics || []).filter(Boolean).length ? {} : { topics: 'Chọn ít nhất một chủ đề.' });

  function renderSubscribe(message) {
    host.dataset.state = 'subscribe';
    host.innerHTML = `${message ? `<div class="form-alert is-info" role="status">${esc(message)}</div>` : ''}<h3>Đăng ký nhận bản tin</h3><p class="form-hint">Bản tin gửi tới email bạn đăng ký; có thể đổi tùy chọn hoặc hủy bất cứ lúc nào.</p><form class="proto-form" id="newsletterForm" novalidate><div class="form-field"><label for="nl-email">Email *</label><input id="nl-email" name="email" type="email" required autocomplete="email"></div><div class="form-field"><label for="nl-name">Họ và tên</label><input id="nl-name" name="name" autocomplete="name"></div>${topicBoxes(['updates', 'events'])}${freqRadios('monthly')}<label class="form-consent"><input type="checkbox" name="consent" required data-required="Vui lòng đồng ý nhận email từ QTSC."><span>Tôi đồng ý nhận bản tin QTSC qua email.</span></label><div class="form-actions"><button class="btn btn-brand" type="submit">Đăng ký nhận tin</button></div></form>`;
    const form = $('#newsletterForm', host);
    bindForm(form, {
      busyLabel: 'Đang đăng ký…',
      validate: needTopic,
      submit: values => store.request(() => store.setValue('newsletter', { id: `NL-${Date.now().toString(36).toUpperCase().slice(-6)}`, email: values.email, name: values.name, topics: [].concat(values.topics), frequency: values.frequency || 'monthly', since: new Date().toISOString() })),
      success(sub) {
        const panel = successPanel({
          title: 'Bạn đã đăng ký nhận bản tin QTSC.',
          reference: sub.id,
          lines: [`Email: ${sub.email}.`, `Chủ đề: ${sub.topics.map(t => seed.newsletterTopics[t]).join(', ')}. Tần suất: ${frequencies[sub.frequency].toLowerCase()}.`],
          actions: [{ label: 'Quản lý tùy chọn', onClick: () => renderManage() }, { label: 'Đọc tin mới', href: 'insights.html' }]
        });
        host.replaceChildren(panel);
        panel.focus();
      }
    });
  }

  function renderManage() {
    const sub = store.value('newsletter');
    if (!sub) { renderSubscribe(); return; }
    host.dataset.state = 'manage';
    host.innerHTML = `<h3>Tùy chọn nhận tin</h3><p class="form-hint">Đang gửi tới <strong>${esc(sub.email)}</strong>, đăng ký từ ${esc(fmtDate(sub.since))}.</p><form class="proto-form" id="newsletterPrefs" novalidate>${topicBoxes(sub.topics)}${freqRadios(sub.frequency)}<div class="form-actions state-actions is-start"><button class="btn btn-brand" type="submit">Lưu tùy chọn</button><button class="btn btn-secondary" type="button" id="nlUnsubscribe">Hủy đăng ký</button></div></form>`;
    const form = $('#newsletterPrefs', host);
    bindForm(form, {
      busyLabel: 'Đang lưu…',
      validate: needTopic,
      submit: values => store.request(() => store.setValue('newsletter', { ...sub, topics: [].concat(values.topics), frequency: values.frequency, updatedAt: new Date().toISOString() })),
      success(next) { renderManage(); toast(`Đã lưu tùy chọn: ${next.topics.length} chủ đề, ${frequencies[next.frequency].toLowerCase()}.`); $('#newsletterPrefs [type="submit"]', host)?.focus(); }
    });
    $('#nlUnsubscribe', host).addEventListener('click', async () => {
      const ok = await confirmDialog({ title: 'Hủy đăng ký bản tin?', text: `${sub.email} sẽ không nhận bản tin QTSC nữa. Bạn có thể đăng ký lại bất cứ lúc nào.`, confirmLabel: 'Hủy đăng ký', cancelLabel: 'Tiếp tục nhận tin' });
      if (!ok) return;
      store.request(() => store.setValue('newsletter', null)).then(() => { renderSubscribe(`Đã hủy đăng ký cho ${sub.email}.`); $('#nl-email', host)?.focus(); })
        .catch(error => toast(`Chưa hủy được: ${error.message}`));
    });
  }

  const load = () => {
    showState(host, 'loading', { title: 'Đang tải tùy chọn nhận tin…', rows: 1 });
    store.request(() => store.value('newsletter'), { delay: 250 }).then(sub => (sub ? renderManage() : renderSubscribe()))
      .catch(error => showState(host, 'error', { title: 'Không tải được tùy chọn nhận tin.', text: error.message, action: { label: 'Thử lại', onClick: load } }));
  };
  load();
})();
