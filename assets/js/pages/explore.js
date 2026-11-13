/** Explore/map: place cards and map pins select the same place, announce it and
 * offer the next step (units in that building, labs or amenities). */
(() => {
  const { $$, $ } = window.QTSC;
  const cards = $$('.place-card');
  const pins = $$('.explore-pin');
  if (!cards.length) return;
  const next = [
    ['Xem văn phòng còn trống tại QTSC Building 1', 'office.html?building=q1#units'],
    ['Xem văn phòng còn trống tại Helios Building', 'office.html?building=helios#units'],
    ['Tìm hiểu QTSC R&D Labs', 'innovation-centers.html#rd-labs'],
    ['Xem tiện ích ăn uống trong campus', 'amenities.html']
  ];
  const status = document.createElement('p');
  status.className = 'explore-selection';
  status.setAttribute('aria-live', 'polite');
  $('.explore-map')?.after(status);
  function select(index, focusCard = false) {
    cards.forEach((card, i) => { const on = i === index; card.classList.toggle('active', on); card.setAttribute('aria-pressed', String(on)); });
    pins.forEach((pin, i) => { const on = i === index; pin.classList.toggle('active', on); pin.setAttribute('aria-pressed', String(on)); pin.style.boxShadow = on ? '0 0 0 15px rgba(241,118,44,.25),0 0 25px rgba(241,118,44,.6)' : '0 0 0 9px rgba(241,118,44,.18)'; });
    const name = cards[index].querySelector('strong')?.textContent.trim() || '';
    const [label, href] = next[index] || ['Khám phá campus', 'explore.html'];
    status.innerHTML = `Đang chọn: <strong>${name}</strong>. <a href="${href}">${label}</a>`;
    if (focusCard) cards[index].focus();
  }
  cards.forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.addEventListener('click', () => select(index));
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(index); } });
  });
  pins.forEach((pin, index) => { pin.type = 'button'; pin.addEventListener('click', () => select(index)); });
  select(Math.max(0, cards.findIndex(c => c.classList.contains('active'))));
})();
