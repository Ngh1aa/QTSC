/* Find space (office.html): find-space filters synced to the URL (?building=&size=&status=&movein=&page=),
 * unit cards, a building selector, and "My visits" with reschedule and cancel. */
(() => {
  const { $, $$, esc, fmtDate, todayISO, showState, confirmDialog, toast, validateForm, setFieldError, formAlert } = window.QTSCUI;
  const { createListing, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;
  const booking = window.QTSCBooking;

  /* Photos per unit (same list in office-unit.js). */
  const PHOTOS = {
    'atlas-0705': ['loft-office', 'Open office with tall windows'],
    'atlas-0402': ['quiet-desk', 'White room with a wooden desk and a wall calendar'],
    'atlas-1101': ['open-office', 'Open office with desks and glass meeting booths'],
    'atlas-0910': ['laptop-work', 'Person working on a laptop at a long wooden table'],
    'beacon-b12': ['lounge', 'Lounge with a sofa, an armchair and a small dining table'],
    'beacon-b31': ['coworking', 'Furnished lounge with sofas and plants'],
    'beacon-b45': ['casual-meeting', 'Seating corner with a leather sofa and yellow armchairs'],
    'delta-l304': ['meeting-room', 'Bright room with a long white table'],
    'delta-l112': ['glass-roofline', 'Glass roofline of a modern building against a cloudy sky'],
    'delta-l205': ['server-rack', 'Technician working at an open equipment rack'],
    'forge-f08': ['outdoor-work', 'Person typing on a laptop at a wooden table'],
    'forge-f14': ['working-session', 'Two people working on laptops over printed notes'],
  };
  const photo = (u) => PHOTOS[u.id] || ['open-office', 'Open office with desks'];
  const shortDate = (iso) => fmtDate(iso, { weekday: false });
  const statusBadge = (u) => {
    if (u.status === 'leased') return '<span class="badge is-muted">Leased</span>';
    if (u.status === 'soon') return `<span class="badge is-warn">Available ${esc(shortDate(u.availableFrom))}</span>`;
    return `<span class="badge is-ok">${u.availableFrom <= todayISO() ? 'Available now' : `Available ${esc(shortDate(u.availableFrom))}`}</span>`;
  };
  const unitCard = (u) => {
    const [img, alt] = photo(u);
    return `<a class="card" href="office-unit.html?id=${encodeURIComponent(u.id)}" data-unit="${esc(u.id)}">`
      + `<img class="card-media" src="assets/images/photos/sm/${img}.webp" width="960" height="640" alt="${esc(alt)}" loading="lazy">`
      + `${statusBadge(u)}<h3 class="card-title">${esc(u.building)}, floor ${u.floor}</h3>`
      + `<dl class="spec"><div><dt>Size</dt><dd>${u.area} m²</dd></div><div><dt>Desks</dt><dd>${u.seats}</dd></div><div><dt>Fit-out</dt><dd>${esc(u.fitout)}</dd></div></dl></a>`;
  };

  /* Building selector */
  const BUILDINGS = {
    atlas: { name: 'Atlas', use: 'Headquarters and large teams', floors: 12, image: 'tower-corner', alt: 'Corner of a glass office tower against the sky' },
    beacon: { name: 'Beacon', use: 'Teams of 5 to 30', floors: 5, image: 'facade-grid', alt: 'Glass facade with a grid of dark windows' },
    delta: { name: 'Delta Labs', use: 'Hardware, robotics and testing', floors: 4, image: 'glass-roofline', alt: 'Glass roofline of a modern building against a cloudy sky' },
    forge: { name: 'Forge', use: 'Startups in the Forge programme', floors: 4, image: 'casual-meeting', alt: 'Seating corner with a leather sofa and yellow armchairs' },
  };
  function selectBuilding(key) {
    const data = BUILDINGS[key] || BUILDINGS.atlas;
    $$('[data-office]').forEach((b) => { const on = b.dataset.office === key; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
    const units = seed.units.filter((u) => u.buildingKey === key);
    const open = units.filter((u) => u.status !== 'leased').length;
    const sizes = units.map((u) => u.area);
    $('#officeName').textContent = data.name;
    const img = $('#officeImage');
    img.src = `assets/images/photos/${data.image}.webp`;
    img.srcset = `assets/images/photos/sm/${data.image}.webp 960w, assets/images/photos/${data.image}.webp 1920w`;
    img.alt = data.alt;
    $('#officeFacts').innerHTML = [
      ['Best for', data.use],
      ['Floors', String(data.floors)],
      ['Unit sizes', sizes.length ? `${Math.min(...sizes)} to ${Math.max(...sizes)} m²` : 'None listed'],
      ['Open units', `${open} of ${units.length}`],
    ].map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${esc(dd)}</dd>`).join('');
    const link = $('#officeUnitsLink');
    link.href = `office.html?building=${key}#units`;
    link.textContent = `See ${units.length} units`;
  }
  $$('[data-office]').forEach((button) => button.addEventListener('click', () => selectBuilding(button.dataset.office)));
  $('#officeUnitsLink')?.addEventListener('click', (event) => {
    event.preventDefault();
    const key = $('[data-office].active')?.dataset.office || 'atlas';
    const select = $('#unitBuilding');
    select.value = key;
    select.dispatchEvent(new Event('change'));
    $('#units').scrollIntoView({ block: 'start' });
    select.focus({ preventScroll: true });
  });
  const startKey = new URLSearchParams(location.search).get('building');
  selectBuilding(BUILDINGS[startKey] ? startKey : 'atlas');

  /* Unit finder */
  const sizeMatch = (u, v) => (v === 'small' ? u.area < 100 : v === 'medium' ? u.area >= 100 && u.area <= 250 : u.area > 250);
  createListing({
    results: $('#unitResults'), pagerEl: $('#unitPager'), metaEl: $('#unitMeta'), perPage: 6, label: 'units',
    load: () => seed.units,
    text: (u) => `${u.building} ${u.fitout} ${u.features.join(' ')}`,
    filters: [
      { param: 'building', control: fieldControl($('#unitBuilding')), match: (u, v) => u.buildingKey === v },
      { param: 'size', control: fieldControl($('#unitSize')), match: sizeMatch },
      { param: 'status', control: fieldControl($('#unitStatus')), match: (u, v) => (v === 'open' ? u.status !== 'leased' : u.status === v) },
      { param: 'movein', control: fieldControl($('#unitMoveIn')), match: (u, v) => u.availableFrom <= v },
    ],
    emptyCopy: { title: 'No unit matches.', text: 'Try another size or a later move-in date.' },
    render: unitCard,
  });

  /* My visits */
  const host = $('#myBookings');
  function renderBookings() {
    const list = store.list('bookings');
    host.dataset.state = list.length ? 'ready' : 'empty';
    if (!list.length) {
      showState(host, 'empty', { title: 'No visits booked.', action: { label: 'Choose a unit', href: '#units' } });
      return;
    }
    host.innerHTML = list.map((b) => {
      const d = booking.describe(b);
      const cancelled = b.status === 'cancelled';
      const unitLink = esc(d.title);
      return `<article class="proto-record${cancelled ? ' is-cancelled' : ''}" data-booking="${esc(b.id)}">`
        + `<div><h3>${unitLink}</h3><p><strong>${d.when}</strong>, ${esc(b.people)} ${Number(b.people) === 1 ? 'person' : 'people'}</p>`
        + `<p>Ref ${esc(b.id)}, ${esc(b.name)}, ${esc(b.email)}${b.rescheduled ? ', rescheduled' : ''}</p></div>`
        + (cancelled ? '<span class="badge is-muted">Cancelled</span>' : '<span class="badge is-ok">Confirmed</span>')
        + (cancelled ? '' : `<div class="record-actions"><button type="button" class="btn btn-secondary " data-reschedule="${esc(b.id)}" aria-expanded="false">Reschedule</button><button type="button" class="btn btn-ghost " data-cancel-booking="${esc(b.id)}">Cancel visit</button></div>`)
        + '</article>';
    }).join('');
    $$('[data-cancel-booking]', host).forEach((button) => button.addEventListener('click', () => cancel(button)));
    $$('[data-reschedule]', host).forEach((button) => button.addEventListener('click', () => openReschedule(button)));
  }
  async function cancel(button) {
    const id = button.dataset.cancelBooking;
    const b = store.get('bookings', id);
    const ok = await confirmDialog({ title: 'Cancel this visit?', text: `Visit ${id} on ${fmtDate(b.date)} at ${b.time} will be cancelled.`, confirmLabel: 'Cancel visit', cancelLabel: 'Keep visit' });
    if (!ok) return;
    button.disabled = true;
    button.textContent = 'Cancelling…';
    store.request(() => store.update('bookings', id, { status: 'cancelled' }))
      .then(() => {
        renderBookings();
        toast(`Visit ${id} cancelled.`);
        const record = $(`[data-booking="${id}"]`, host);
        record?.setAttribute('tabindex', '-1');
        record?.focus();
      })
      .catch((error) => { button.disabled = false; button.textContent = 'Cancel visit'; toast(`Not cancelled: ${error.message}`); });
  }
  function openReschedule(button) {
    const id = button.dataset.reschedule;
    const record = button.closest('.proto-record');
    const open = $('.record-edit', record);
    if (open) { open.remove(); button.setAttribute('aria-expanded', 'false'); button.focus(); return; }
    const b = store.get('bookings', id);
    button.setAttribute('aria-expanded', 'true');
    record.insertAdjacentHTML('beforeend', `<form class="record-edit proto-form" novalidate data-reschedule-form="${esc(id)}">`
      + `<div class="form-field"><label for="rs-date-${esc(id)}">New date</label><input id="rs-date-${esc(id)}" name="date" type="date" required min="${todayISO(1)}" max="${todayISO(90)}" value="${esc(b.date)}"></div>`
      + `<div class="form-field"><label for="rs-time-${esc(id)}">Time</label><select id="rs-time-${esc(id)}" name="time" required>${booking.slotOptions(b.time)}</select></div>`
      + '<div class="form-actions"><button class="btn btn-primary" type="submit">Save new time</button><button class="btn btn-ghost" type="button" data-close-edit>Close</button></div></form>');
    const form = $('.record-edit', record);
    $('[data-close-edit]', form).addEventListener('click', () => { form.remove(); button.setAttribute('aria-expanded', 'false'); button.focus(); });
    $('input', form).focus();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = { date: form.elements.date.value, time: form.elements.time.value };
      const problem = booking.issue({ ...values, unitId: b.unitId, excludeId: id });
      const invalid = validateForm(form, () => (problem ? { [problem.field]: problem.message } : {}));
      if (invalid.length) { invalid[0].focus(); return; }
      if (values.date === b.date && values.time === b.time) { setFieldError(form.elements.date, 'This is the current time of the visit.'); form.elements.date.focus(); return; }
      const submit = $('[type="submit"]', form);
      submit.disabled = true;
      submit.textContent = 'Saving…';
      store.request(() => store.update('bookings', id, { ...values, rescheduled: true }))
        .then(() => { renderBookings(); toast(`Visit ${id} moved to ${fmtDate(values.date)} at ${values.time}.`); })
        .catch((error) => {
          submit.disabled = false;
          submit.textContent = 'Save new time';
          formAlert(form, 'error', `<strong>The new time was not saved.</strong> <span>${esc(error.message)} The visit keeps its old time.</span>`).focus();
        });
    });
  }
  showState(host, 'loading', { title: 'Loading your visits…', rows: 1 });
  const load = () => store.request(() => true, { delay: 250 }).then(renderBookings).catch((error) => showState(host, 'error', { title: 'Your visits did not load.', text: error.message, action: { label: 'Try again', onClick: load } }));
  load();
})();
