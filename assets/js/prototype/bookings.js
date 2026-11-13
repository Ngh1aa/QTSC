/* Site-visit booking rules shared by office.html (my bookings) and office-unit.html (new booking). */
(() => {
  const store = window.QTSCStore;
  const { todayISO, fmtDate, esc } = window.QTSCUI;
  const seed = store.seed;

  const unitName = unit => `${unit.building}, tầng ${unit.floor}, ${unit.area} m²`;
  function issue({ date, time, unitId, excludeId }) {
    if (!date) return { field: 'date', message: 'Vui lòng chọn ngày tham quan.' };
    if (date < todayISO(1)) return { field: 'date', message: 'Chọn ngày từ ngày mai trở đi.' };
    if (date > todayISO(90)) return { field: 'date', message: 'Chỉ nhận lịch trong vòng 90 ngày tới.' };
    if (new Date(`${date}T00:00:00`).getDay() === 0) return { field: 'date', message: 'QTSC không đón khách tham quan vào Chủ nhật. Vui lòng chọn ngày khác.' };
    if (!time) return { field: 'time', message: 'Vui lòng chọn khung giờ.' };
    const clash = store.list('bookings').find(b => b.id !== excludeId && b.status !== 'cancelled' && b.unitId === unitId && b.date === date && b.time === time);
    if (clash) return { field: 'time', message: `Bạn đã có lịch ${clash.id} vào khung giờ này. Chọn giờ khác.` };
    return null;
  }
  const slotOptions = selected => seed.visitSlots.map(s => `<option value="${s}" ${s === selected ? 'selected' : ''}>${s}</option>`).join('');
  const describe = b => {
    const unit = seed.units.find(u => u.id === b.unitId);
    return { unit, title: unit ? unitName(unit) : 'Không gian đã gỡ khỏi danh mục', when: `${fmtDate(b.date)} lúc ${esc(b.time)}` };
  };
  window.QTSCBooking = { issue, slotOptions, unitName, describe };
})();
