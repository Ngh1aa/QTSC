/** Office: building selector, available-unit finder (building, size, status,
 * move-in date; URL synced), and "my bookings" with reschedule and cancel. */
(() => {
  const { $, $$, esc, fmtDate, todayISO, showState, confirmDialog, toast, validateForm, setFieldError, formAlert } = window.QTSCUI;
  const { createListing, fieldControl } = window.QTSCListing;
  const store = window.QTSCStore;
  const seed = store.seed;
  const booking = window.QTSCBooking;

  /* Building selector (existing component) */
  const officeData = {
    q1: { name: 'QTSC Building 1', text: 'Trụ sở QTSC, văn phòng và tiện ích nội khu', image: 'https://info.qtsc.com.vn/upload/contents/qtscbuilding-B811722321392.webp' },
    helios: { name: 'Helios Building', text: 'Không gian văn phòng trong campus công nghệ', image: 'https://www.qtsc.com.vn/uploads/files/2021/03/14/1-goc-Cong-vien-phan-mem-Quang-Trung-02.jpg' },
    sbi: { name: 'SBI Building', text: 'Kết nối doanh nghiệp và hệ tiện ích QTSC', image: 'https://www.qtsc.com.vn/uploads/files/2018/02/12/thumbs-1200-628-2--1/qtsc_flycam_640x320.jpg' }
  };
  $$('[data-office]').forEach(button => button.addEventListener('click', () => {
    $$('[data-office]').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active'); button.setAttribute('aria-pressed', 'true');
    const data = officeData[button.dataset.office] || officeData.q1;
    $('#officeImage').src = data.image; $('#officeImage').alt = data.name;
    $('#officeName').textContent = data.name; $('#officeText').textContent = data.text;
    const count = seed.units.filter(u => u.buildingKey === button.dataset.office && u.status !== 'leased').length;
    const link = $('#officeUnitsLink');
    if (link) { link.href = `?building=${button.dataset.office}#units`; link.textContent = `Xem ${count} không gian còn trống hoặc sắp trống`; }
  }));
  $('#officeUnitsLink')?.addEventListener('click', event => {
    event.preventDefault();
    const key = $('[data-office].active')?.dataset.office || 'q1';
    const select = $('#unitBuilding');
    select.value = key; select.dispatchEvent(new Event('change'));
    $('#units').scrollIntoView({ block: 'start' });
    select.focus({ preventScroll: true });
  });

  /* Unit finder */
  const statusBadge = u => `<span class="badge ${u.status === 'available' ? 'is-ok' : u.status === 'soon' ? 'is-warn' : 'is-muted'}">${esc(seed.unitStatus[u.status])}</span>`;
  const sizeMatch = (u, v) => v === 'small' ? u.area < 100 : v === 'medium' ? u.area >= 100 && u.area <= 250 : u.area > 250;
  if ($('#unitResults')) {
    createListing({
      results: $('#unitResults'), pagerEl: $('#unitPager'), metaEl: $('#unitMeta'), perPage: 6, label: 'không gian',
      load: () => seed.units,
      text: u => `${u.building} ${u.fitout} ${u.features.join(' ')}`,
      filters: [
        { param: 'building', control: fieldControl($('#unitBuilding')), match: (u, v) => u.buildingKey === v },
        { param: 'size', control: fieldControl($('#unitSize')), match: sizeMatch },
        { param: 'status', control: fieldControl($('#unitStatus')), match: (u, v) => v === 'open' ? u.status !== 'leased' : u.status === v },
        { param: 'movein', control: fieldControl($('#unitMoveIn')), match: (u, v) => u.availableFrom <= v }
      ],
      emptyCopy: { title: 'Chưa có không gian khớp tiêu chí.', text: 'Nới diện tích hoặc ngày dọn vào, hoặc gửi nhu cầu để QTSC báo khi có không gian phù hợp.' },
      render: u => `<a class="proto-card" href="office-unit.html?id=${encodeURIComponent(u.id)}" data-unit="${esc(u.id)}"><div><h3>${esc(booking.unitName(u))}</h3><p>${esc(u.fitout)}, khoảng ${u.seats} chỗ ngồi. ${esc(u.features[0])}.</p></div><div class="proto-card-side">${statusBadge(u)}<span>Từ ${esc(fmtDate(u.availableFrom))}</span><span class="proto-card-cta">Xem và đặt lịch</span></div></a>`
    });
  }

  /* My bookings */
  const host = $('#myBookings');
  function renderBookings() {
    if (!host) return;
    const list = store.list('bookings');
    host.dataset.state = list.length ? 'ready' : 'empty';
    if (!list.length) {
      showState(host, 'empty', { title: 'Bạn chưa có lịch tham quan nào.', text: 'Chọn một không gian phù hợp và đặt lịch khảo sát, lịch sẽ hiển thị tại đây.', action: { label: 'Tìm không gian', href: '#units' } });
      return;
    }
    host.innerHTML = list.map(b => {
      const d = booking.describe(b);
      const cancelled = b.status === 'cancelled';
      return `<article class="proto-record ${cancelled ? 'is-cancelled' : ''}" data-booking="${esc(b.id)}"><div><h3>${esc(d.title)}</h3><p><strong>${d.when}</strong>, ${esc(b.people)} người, mã ${esc(b.id)}</p><p>${esc(b.name)}, ${esc(b.email)}${b.rescheduled ? ', đã đổi lịch' : ''}</p></div>`
        + `<div class="record-actions">${cancelled ? '<span class="badge is-muted">Đã hủy</span>' : `<span class="badge is-ok">Đã xác nhận</span><button type="button" class="btn btn-secondary" data-reschedule="${esc(b.id)}" aria-expanded="false">Đổi lịch</button><button type="button" class="btn btn-secondary" data-cancel-booking="${esc(b.id)}">Hủy lịch</button>`}</div></article>`;
    }).join('');
    $$('[data-cancel-booking]', host).forEach(button => button.addEventListener('click', () => cancel(button)));
    $$('[data-reschedule]', host).forEach(button => button.addEventListener('click', () => openReschedule(button)));
  }
  async function cancel(button) {
    const id = button.dataset.cancelBooking;
    const b = store.get('bookings', id);
    const ok = await confirmDialog({ title: 'Hủy lịch tham quan?', text: `Lịch ${id} ngày ${fmtDate(b.date)} lúc ${b.time} sẽ bị hủy. Bạn có thể đặt lịch mới bất cứ lúc nào.`, confirmLabel: 'Hủy lịch', cancelLabel: 'Giữ lịch' });
    if (!ok) return;
    button.disabled = true; button.textContent = 'Đang hủy…';
    store.request(() => store.update('bookings', id, { status: 'cancelled' }))
      .then(() => { renderBookings(); toast(`Đã hủy lịch ${id}.`); $(`[data-booking="${id}"]`, host)?.setAttribute('tabindex', '-1'); $(`[data-booking="${id}"]`, host)?.focus(); })
      .catch(error => { button.disabled = false; button.textContent = 'Hủy lịch'; toast(`Chưa hủy được: ${error.message}`); });
  }
  function openReschedule(button) {
    const id = button.dataset.reschedule;
    const record = button.closest('.proto-record');
    const open = $('.record-edit', record);
    if (open) { open.remove(); button.setAttribute('aria-expanded', 'false'); button.focus(); return; }
    const b = store.get('bookings', id);
    button.setAttribute('aria-expanded', 'true');
    record.insertAdjacentHTML('beforeend', `<form class="record-edit proto-form" novalidate data-reschedule-form="${esc(id)}"><div class="form-field"><label for="rs-date-${id}">Ngày mới *</label><input id="rs-date-${id}" name="date" type="date" required min="${todayISO(1)}" value="${esc(b.date)}"></div><div class="form-field"><label for="rs-time-${id}">Khung giờ *</label><select id="rs-time-${id}" name="time" required>${booking.slotOptions(b.time)}</select></div><div class="form-actions state-actions is-start"><button class="btn btn-brand" type="submit">Lưu lịch mới</button><button class="btn btn-secondary" type="button" data-close-edit>Đóng</button></div></form>`);
    const form = $('.record-edit', record);
    $('[data-close-edit]', form).addEventListener('click', () => { form.remove(); button.setAttribute('aria-expanded', 'false'); button.focus(); });
    $('input', form).focus();
    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = { date: form.elements.date.value, time: form.elements.time.value };
      const problem = booking.issue({ ...values, unitId: b.unitId, excludeId: id });
      const invalid = validateForm(form, () => (problem ? { [problem.field]: problem.message } : {}));
      if (invalid.length) { invalid[0].focus(); return; }
      if (values.date === b.date && values.time === b.time) { setFieldError(form.elements.date, 'Lịch mới đang trùng lịch hiện tại.'); form.elements.date.focus(); return; }
      const submit = $('[type="submit"]', form);
      submit.disabled = true; submit.textContent = 'Đang lưu…';
      store.request(() => store.update('bookings', id, { ...values, rescheduled: true }))
        .then(() => { renderBookings(); toast(`Đã đổi lịch ${id} sang ${fmtDate(values.date)} lúc ${values.time}.`); })
        .catch(error => {
          submit.disabled = false; submit.textContent = 'Lưu lịch mới';
          const alert = formAlert(form, 'error', `<strong>Chưa lưu được lịch mới.</strong> <span>${esc(error.message)} Lịch cũ vẫn giữ nguyên.</span>`);
          alert.focus();
        });
    });
  }
  if (host) {
    showState(host, 'loading', { title: 'Đang tải lịch tham quan…', rows: 1 });
    const load = () => store.request(() => true, { delay: 250 }).then(renderBookings).catch(error => showState(host, 'error', { title: 'Không tải được lịch tham quan.', text: error.message, action: { label: 'Thử lại', onClick: load } }));
    load();
  }
})();
