/* Site-visit booking rules shared by office.html (my bookings) and office-unit.html (new booking). */
(() => {
  const store = window.QTSCStore;
  const { todayISO, fmtDate, esc } = window.QTSCUI;
  const seed = store.seed;

  const unitName = unit => `${unit.building}, floor ${unit.floor}, ${unit.area} m²`;
  function issue({ date, time, unitId, excludeId }) {
    if (!date) return { field: 'date', message: 'Choose a visit date.' };
    if (date < todayISO(1)) return { field: 'date', message: 'Choose a date from tomorrow onwards.' };
    if (date > todayISO(90)) return { field: 'date', message: 'Visits can be booked up to 90 days ahead.' };
    if (new Date(`${date}T00:00:00`).getDay() === 0) return { field: 'date', message: 'Northbank does not host visits on Sundays. Choose another day.' };
    if (!time) return { field: 'time', message: 'Choose a time.' };
    const clash = store.list('bookings').find(b => b.id !== excludeId && b.status !== 'cancelled' && b.unitId === unitId && b.date === date && b.time === time);
    if (clash) return { field: 'time', message: `You already have visit ${clash.id} at this time. Choose another time.` };
    return null;
  }
  const slotOptions = selected => seed.visitSlots.map(s => `<option value="${s}" ${s === selected ? 'selected' : ''}>${s}</option>`).join('');
  const describe = b => {
    const unit = seed.units.find(u => u.id === b.unitId);
    return { unit, title: unit ? unitName(unit) : 'Space no longer listed', when: `${fmtDate(b.date)} at ${esc(b.time)}` };
  };
  window.QTSCBooking = { issue, slotOptions, unitName, describe };
})();
