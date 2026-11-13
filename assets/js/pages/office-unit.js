/** Office unit detail: office-unit.html?id=<unit id>, with site-visit booking
 * (validated date/slot, simulated request, recoverable error) saved to the session. */
(() => {
  const { $, esc, detailPage, bindForm, successPanel, fmtDate, todayISO, showState } = window.QTSCUI;
  const store = window.QTSCStore;
  const seed = store.seed;
  const booking = window.QTSCBooking;
  if (!$('#unitName')) return;
  const id = (new URLSearchParams(location.search).get('id') || '').trim();

  function mountBooking(unit) {
    const host = $('#bookingHost');
    const form = $('#bookingForm');
    if (unit.status === 'leased') {
      showState(host, 'empty', { title: 'Không gian này đã cho thuê.', text: `Dự kiến trống lại từ ${fmtDate(unit.availableFrom)}. Bạn có thể xem không gian khác hoặc gửi nhu cầu để QTSC báo khi trống.`, action: { label: 'Xem không gian còn trống', href: 'office.html?status=open#units' } });
      $('#unitBookLink').textContent = 'Xem tình trạng đặt lịch';
      return;
    }
    $('#bk-date').min = todayISO(1);
    $('#bk-date').max = todayISO(90);
    $('#bk-time').insertAdjacentHTML('beforeend', booking.slotOptions(''));
    bindForm(form, {
      busyLabel: 'Đang đặt lịch…',
      validate: values => { const problem = booking.issue({ date: values.date, time: values.time, unitId: unit.id }); return problem ? { [problem.field]: problem.message } : {}; },
      submit: values => store.request(() => store.add('bookings', { unitId: unit.id, date: values.date, time: values.time, name: values.name, email: values.email, phone: values.phone, people: Number(values.people), note: values.note, status: 'confirmed' }, 'BK')),
      success(record) {
        const panel = successPanel({
          title: 'Lịch tham quan đã được đặt.',
          reference: record.id,
          lines: [`${booking.unitName(unit)}, ngày ${fmtDate(record.date)} lúc ${record.time}, ${record.people} người.`, 'Bạn có thể đổi lịch hoặc hủy trong mục Lịch tham quan của tôi.'],
          actions: [{ label: 'Xem lịch tham quan của tôi', href: 'office.html#my-bookings' }, { label: 'Đặt thêm lịch', onClick: () => { panel.remove(); form.reset(); form.hidden = false; $('#bk-date').focus(); } }]
        });
        form.hidden = true;
        host.append(panel);
        panel.focus();
      }
    });
  }

  detailPage({
    loadingTitle: 'Đang tải thông tin không gian…',
    load: () => seed.units.find(u => u.id === id) || null,
    notFound: {
      title: id ? 'Không tìm thấy không gian này.' : 'Chưa chọn không gian.',
      text: id ? `Mã không gian “${id}” không còn trong danh mục. Không gian có thể đã được cho thuê hoặc gộp lại.` : 'Hãy chọn một không gian trong danh sách văn phòng.',
      action: { label: 'Xem không gian còn trống', href: 'office.html#units' },
      secondary: { label: 'Gửi nhu cầu thuê', href: 'contact.html?topic=office' }
    },
    render(u) {
      const name = booking.unitName(u);
      document.title = `${name} — Văn phòng QTSC`;
      $('link[rel="canonical"]')?.setAttribute('href', `https://ngh1aa.github.io/QTSC/office-unit.html?id=${encodeURIComponent(u.id)}`);
      $('#unitCrumb').textContent = `${u.building}, tầng ${u.floor}`;
      $('#unitName').textContent = name;
      $('#unitMetaTags').innerHTML = [seed.unitStatus[u.status], u.fitout, `Mã ${u.id.toUpperCase()}`].map(v => `<span>${esc(v)}</span>`).join('');
      $('#unitSummary').textContent = `Không gian ${u.area} m² tại tầng ${u.floor}, ${u.building}, phù hợp khoảng ${u.seats} chỗ ngồi. Tình trạng: ${seed.unitStatus[u.status].toLowerCase()}, có thể bàn giao từ ${fmtDate(u.availableFrom)}.`;
      $('#unitFeatures').innerHTML = u.features.map(f => `<li>${esc(f)}</li>`).join('');
      $('#unitProof').innerHTML = [['Diện tích', `${u.area} m²`, 'diện tích sử dụng ước tính.'], ['Chỗ ngồi', String(u.seats), 'theo bố trí văn phòng mở.'], ['Bàn giao', fmtDate(u.availableFrom), 'thời điểm dự kiến.'], ['Hoàn thiện', u.fitout, 'hiện trạng bàn giao.']]
        .map(([l, v, n]) => `<div class="proof-cell"><span>${esc(l)}</span><strong>${esc(v)}</strong><em>${esc(n)}</em></div>`).join('');
      $('#unitFacts').innerHTML = [['Tòa nhà', u.building], ['Tầng', String(u.floor)], ['Tình trạng', seed.unitStatus[u.status]], ['Đơn giá', 'Xác nhận khi khảo sát'], ['Mã không gian', u.id.toUpperCase()]]
        .map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`).join('');
      const siblings = seed.units.filter(x => x.buildingKey === u.buildingKey && x.id !== u.id);
      $('#unitSiblings').innerHTML = siblings.length
        ? siblings.map(x => `<a class="proto-card" href="office-unit.html?id=${encodeURIComponent(x.id)}"><div><h3>Tầng ${x.floor}, ${x.area} m²</h3><p>${esc(seed.unitStatus[x.status])}, từ ${esc(fmtDate(x.availableFrom))}</p></div><div class="proto-card-side"><span class="proto-card-cta">Xem</span></div></a>`).join('')
        : '<div class="state-panel is-empty" data-state="empty"><strong>Chưa có không gian khác trong tòa nhà này.</strong><p>Xem danh sách đầy đủ để so sánh các tòa nhà.</p></div>';
      mountBooking(u);
    }
  });
})();
