/* Unit detail (office-unit.html?id=<unit id>): specs, features, photo, other units in the building, and the
 * visit booking form (rules in prototype/bookings.js) saved to the session. */
(() => {
  const { $, esc, detailPage, bindForm, successPanel, fmtDate, todayISO, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const booking = window.QTSCBooking;
  if (!$('#unitName')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim().toLowerCase();

  /* Photos per unit (same list in office.js). */
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
  const shortDate = (iso) => fmtDate(iso, { weekday: false });
  const statusLabel = (u) => (u.status === 'leased' ? 'Leased' : u.availableFrom <= todayISO() ? 'Available now' : `Available ${shortDate(u.availableFrom)}`);
  const statusClass = (u) => (u.status === 'leased' ? 'is-muted' : u.status === 'soon' ? 'is-warn' : 'is-ok');

  function mountBooking(unit) {
    const host = $('#bookingHost');
    const form = $('#bookingForm');
    if (unit.status === 'leased') {
      showState(host, 'empty', { title: 'This unit is leased.', text: `It may come free from ${fmtDate(unit.availableFrom)}.`, action: { label: 'See open units', href: 'office.html?status=open#units' }, secondary: { label: 'Ask about space', href: 'contact.html?topic=office' } });
      $('#unitBookLink').textContent = 'See booking status';
      return;
    }
    $('#bk-date').min = todayISO(1);
    $('#bk-date').max = todayISO(90);
    $('#bk-time').insertAdjacentHTML('beforeend', booking.slotOptions(''));
    bindForm(form, {
      busyLabel: 'Booking…',
      validate: (values) => { const problem = booking.issue({ date: values.date, time: values.time, unitId: unit.id }); return problem ? { [problem.field]: problem.message } : {}; },
      submit: (values) => store.request(() => store.add('bookings', { unitId: unit.id, date: values.date, time: values.time, name: values.name, email: values.email, phone: values.phone, people: Number(values.people), note: values.note, status: 'confirmed' }, 'BK')),
      success(record) {
        const panel = successPanel({
          title: 'Your visit is booked.',
          reference: record.id,
          lines: [`${booking.unitName(unit)}, ${fmtDate(record.date)} at ${record.time}, ${record.people} ${record.people === 1 ? 'person' : 'people'}.`, 'Meet at the Atlas lobby, Park Avenue gate.'],
          actions: [{ label: 'See my visits', href: 'office.html#my-bookings' }, { label: 'Book another', onClick: () => { panel.remove(); form.reset(); form.hidden = false; $('#bk-date').focus(); } }],
        });
        form.hidden = true;
        host.append(panel);
        panel.focus();
      },
    });
  }

  detailPage({
    loadingTitle: 'Loading unit…',
    load: () => seed.units.find((u) => u.id === id) || null,
    notFound: {
      title: id ? 'Unit not found.' : 'No unit selected.',
      text: id ? `There is no unit with the id “${id}”. It may have been leased and taken off the list.` : 'Choose a unit in the list to see its details.',
      action: { label: 'See open units', href: 'office.html?status=open#units' },
      secondary: { label: 'Ask about space', href: 'contact.html?topic=office' },
    },
    render(u) {
      const title = `${u.building}, floor ${u.floor}`;
      const [img, alt] = PHOTOS[u.id] || ['open-office', 'Open office with desks and glass meeting booths'];
      document.title = `${title}, ${u.area} m² | Northbank Technology Park`;
      $('meta[name="description"]')?.setAttribute('content', `${u.area} m² ${u.fitout.toLowerCase()} unit on floor ${u.floor} of ${u.building} at Northbank Technology Park.`);
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/office-unit.html?id=${encodeURIComponent(u.id)}`);
      $('#unitCrumb').textContent = title;
      $('#unitName').textContent = title;
      $('#unitMetaTags').innerHTML = `<span class="badge ${statusClass(u)}">${esc(statusLabel(u))}</span><span class="chip">${esc(u.fitout)}</span><span class="chip">Unit ${esc(u.id.toUpperCase())}</span>`;
      $('#unitSummary').textContent = `${u.area} m² for about ${u.seats} desks, ${u.features[0].toLowerCase()}.`;
      $('#unitProof').innerHTML = [
        [`${u.area} m²`, 'floor area'],
        [String(u.seats), 'desks'],
        [shortDate(u.availableFrom), u.status === 'leased' ? 'may come free' : 'available from'],
        [String(u.floor), `floor of ${u.building}`],
      ].map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('');
      const photo = $('#unitPhoto');
      photo.src = `assets/images/photos/${img}.webp`;
      photo.srcset = `assets/images/photos/sm/${img}.webp 960w, assets/images/photos/${img}.webp 1920w`;
      photo.sizes = '(max-width: 900px) 100vw, 1216px';
      photo.alt = alt;
      $('#unitFeatures').innerHTML = u.features.map((f) => `<li>${esc(f)}</li>`).join('');
      $('#unitFacts').innerHTML = [
        ['Building', u.building],
        ['Floor', String(u.floor)],
        ['Fit-out', u.fitout],
        ['Status', u.status === 'leased' ? 'Leased' : seed.unitStatus[u.status]],
        ['Rent', 'Quoted after the visit'],
        ['Unit ID', u.id.toUpperCase()],
      ].map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${esc(dd)}</dd>`).join('');
      const siblings = seed.units.filter((x) => x.buildingKey === u.buildingKey && x.id !== u.id);
      $('#siblingsLink').href = `office.html?building=${encodeURIComponent(u.buildingKey)}#units`;
      $('#unitSiblings').innerHTML = siblings.length
        ? siblings.map((x) => `<a class="entity-card" href="office-unit.html?id=${encodeURIComponent(x.id)}" data-unit="${esc(x.id)}"><span class="entity-mark" aria-hidden="true">F${x.floor}</span><div><h3>Floor ${x.floor}, ${x.area} m²</h3><p>${esc(x.fitout)}, ${x.seats} desks</p></div><div class="entity-side"><span class="badge ${statusClass(x)}">${esc(statusLabel(x))}</span></div></a>`).join('')
        : `<div class="state-panel" data-state="empty"><strong>No other units in ${esc(u.building)} right now.</strong><div class="state-actions"><a class="btn btn-secondary" href="office.html#units">All units</a></div></div>`;
      mountBooking(u);
    },
  });
})();
