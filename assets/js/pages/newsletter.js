/* Newsletter: subscribe (email, topics, frequency) when there is no subscription, otherwise manage the
 * topics and frequency or unsubscribe. The subscription lives in the session store under `newsletter`.
 * #newsletterHost carries data-state="subscribe|manage". */
(() => {
  const { $, esc, bindForm, successPanel, confirmDialog, toast, showState, fmtDate } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const host = $('#newsletterHost');
  if (!host) return;
  const topics = Object.entries(seed.newsletterTopics);
  const frequencies = { monthly: 'Monthly issue', alerts: 'Monthly issue and event alerts', events: 'Event alerts only' };

  const topicBoxes = (selected) => `<fieldset class="form-field is-wide" id="nl-topics"><legend>Topics</legend><div class="choice-list">${topics.map(([k, v]) => `<label class="choice"><input type="checkbox" name="topics" value="${esc(k)}" data-multi ${selected.includes(k) ? 'checked' : ''}> ${esc(v)}</label>`).join('')}</div></fieldset>`;
  const freqRadios = (selected) => `<fieldset class="form-field is-wide"><legend>How often</legend><div class="choice-list">${Object.entries(frequencies).map(([k, v]) => `<label class="choice"><input type="radio" name="frequency" value="${k}" ${selected === k ? 'checked' : ''}> ${esc(v)}</label>`).join('')}</div></fieldset>`;
  const needTopic = (values) => ([].concat(values.topics || []).filter(Boolean).length ? {} : { topics: 'Choose at least one topic.' });
  const topicNames = (list) => list.map((t) => seed.newsletterTopics[t]).join(', ');

  function renderSubscribe(message) {
    host.dataset.state = 'subscribe';
    host.innerHTML = `${message ? `<div class="form-alert is-info" role="status">${esc(message)}</div>` : ''}<h3 class="newsletter-title">Subscribe</h3>`
      + '<form class="proto-form form-grid" id="newsletterForm" novalidate>'
      + '<div class="form-field"><label for="nl-email">Email</label><input id="nl-email" name="email" type="email" required autocomplete="email"></div>'
      + '<div class="form-field"><label for="nl-name">Name (optional)</label><input id="nl-name" name="name" type="text" autocomplete="name"></div>'
      + `${topicBoxes(['updates', 'events'])}${freqRadios('monthly')}`
      + '<div class="form-consent"><label><input type="checkbox" name="consent" required data-required="Please agree to receive the newsletter by email."><span>Send me the Northbank newsletter by email. I can unsubscribe at any time.</span></label></div>'
      + '<div class="form-actions"><button class="btn btn-primary" type="submit">Subscribe</button></div></form>';
    bindForm($('#newsletterForm', host), {
      busyLabel: 'Subscribing…',
      validate: needTopic,
      submit: (values) => store.request(() => store.setValue('newsletter', {
        id: `NL-${Date.now().toString(36).toUpperCase().slice(-6)}`, email: values.email, name: values.name || '',
        topics: [].concat(values.topics), frequency: values.frequency || 'monthly', since: new Date().toISOString(),
      })),
      success(sub) {
        const panel = successPanel({
          title: 'You are subscribed.',
          reference: sub.id,
          lines: [`Sending to ${sub.email}.`, `Topics: ${topicNames(sub.topics)}. ${frequencies[sub.frequency]}.`],
          actions: [{ label: 'Manage preferences', onClick: () => renderManage() }, { label: 'Read the news', href: 'insights.html' }],
        });
        host.replaceChildren(panel);
        panel.focus();
      },
    });
  }

  function renderManage() {
    const sub = store.value('newsletter');
    if (!sub) { renderSubscribe(); return; }
    host.dataset.state = 'manage';
    host.innerHTML = `<h3 class="newsletter-title">Your preferences</h3><p class="newsletter-status"><span class="badge is-ok">Subscribed</span> <span>${esc(sub.email)}, since ${esc(fmtDate(sub.since))}</span></p>`
      + `<form class="proto-form form-grid" id="newsletterPrefs" novalidate>${topicBoxes(sub.topics)}${freqRadios(sub.frequency)}`
      + '<div class="form-actions"><button class="btn btn-primary" type="submit">Save preferences</button><button class="btn btn-secondary" type="button" id="nlUnsubscribe">Unsubscribe</button></div></form>';
    bindForm($('#newsletterPrefs', host), {
      busyLabel: 'Saving…',
      validate: needTopic,
      submit: (values) => store.request(() => store.setValue('newsletter', { ...sub, topics: [].concat(values.topics), frequency: values.frequency || sub.frequency, updatedAt: new Date().toISOString() })),
      success(next) {
        renderManage();
        toast(`Preferences saved: ${next.topics.length} topic${next.topics.length > 1 ? 's' : ''}, ${frequencies[next.frequency].toLowerCase()}.`);
        $('#newsletterPrefs [type="submit"]', host)?.focus();
      },
    });
    $('#nlUnsubscribe', host).addEventListener('click', async () => {
      const ok = await confirmDialog({ title: 'Unsubscribe from the newsletter?', text: `${sub.email} will stop getting Northbank emails. You can subscribe again at any time.`, confirmLabel: 'Unsubscribe', cancelLabel: 'Stay subscribed' });
      if (!ok) return;
      store.request(() => store.setValue('newsletter', null))
        .then(() => { renderSubscribe(`${sub.email} is unsubscribed.`); $('#nl-email', host)?.focus(); })
        .catch((error) => toast(`Unsubscribe failed: ${error.message}`));
    });
  }

  const load = () => {
    showState(host, 'loading', { title: 'Loading your preferences…', rows: 1 });
    store.request(() => store.value('newsletter'), { delay: 250 })
      .then((sub) => (sub ? renderManage() : renderSubscribe()))
      .catch((error) => showState(host, 'error', { title: 'Your preferences did not load.', text: error.message, action: { label: 'Try again', onClick: load } }));
  };
  load();
})();
