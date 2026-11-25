/* Campus map (explore.html): map pins and place cards select the same building, highlight it on the plan
 * and fill .explore-selection with its facts and the next step (units for buildings with space). */
(() => {
  const { $, $$, esc } = window.QTSCUI;
  const cards = $$('.place-card');
  const pins = $$('.explore-pin');
  const panel = $('.explore-selection');
  if (!cards.length || !panel) return;

  const PLACES = {
    atlas: { name: 'Atlas', use: 'Headquarters offices on 12 floors.', facts: [['Members', 'Lattice Systems, Mangrove AI, Oriel Pay'], ['Open', '07:00 to 21:00, Monday to Saturday'], ['Nearest gate', 'Main gate']], link: ['See open units', 'office.html?building=atlas#units'] },
    beacon: { name: 'Beacon', use: 'Furnished suites and coworking.', facts: [['Members', 'Tessera Health, Kite Logistics Tech, Fernwood Studios'], ['Open', '24 hours for members'], ['Nearest gate', 'Main gate']], link: ['See open units', 'office.html?building=beacon#units'] },
    cobalt: { name: 'Cobalt', use: 'Data center with two 2 MW halls.', facts: [['Members', 'Lantern Cloud, Halyard Telecom, Sable Security'], ['Access', 'Badge and escort only'], ['Nearest gate', 'East gate']], link: ['View data center', 'technology-detail.html'] },
    delta: { name: 'Delta Labs', use: 'Hardware and electronics labs.', facts: [['Members', 'Pivot Robotics, Copperline Labs, Kestrel Vision'], ['Open', '24 hours for members'], ['Nearest gate', 'East gate']], link: ['See open units', 'office.html?building=delta#units'] },
    echo: { name: 'Echo Hall', use: 'Conference center with 600 seats.', facts: [['Rooms', 'Main hall and 8 meeting rooms'], ['Open', 'For booked events'], ['Nearest gate', 'River gate']], link: ['Plan an event', 'services.html#events'] },
    forge: { name: 'Forge', use: 'Startup and innovation center.', facts: [['Members', 'Bastion Labs, Granite Insights, Ferro Sensors'], ['Open', '07:00 to 23:00, every day'], ['Nearest gate', 'Main gate']], link: ['See open units', 'office.html?building=forge#units'] },
    grove: { name: 'Grove', use: 'Training rooms, canteen, clinic and gym.', facts: [['Inside', 'Canteen, clinic, gym, childcare, bank'], ['Open', '06:00 to 22:00, every day'], ['Nearest gate', 'River gate']], link: ['See amenities', 'amenities.html'] },
  };

  function select(key, { focusCard = false } = {}) {
    const place = PLACES[key];
    if (!place) return;
    cards.forEach((card) => { const on = card.dataset.place === key; card.classList.toggle('active', on); card.setAttribute('aria-pressed', String(on)); });
    pins.forEach((pin) => { const on = pin.dataset.place === key; pin.classList.toggle('active', on); pin.setAttribute('aria-pressed', String(on)); });
    $$('[data-shape]').forEach((shape) => shape.classList.toggle('is-selected', shape.dataset.shape === key));
    const [label, href] = place.link;
    panel.dataset.place = key;
    panel.innerHTML = `<h3>${esc(place.name)}</h3><p>${esc(place.use)}</p>`
      + `<dl class="kv">${place.facts.map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${esc(dd)}</dd>`).join('')}</dl>`
      + `<a class="btn btn-primary" href="${esc(href)}">${esc(label)}</a>`;
    if (focusCard) cards.find((c) => c.dataset.place === key)?.focus();
  }

  cards.forEach((card) => card.addEventListener('click', () => select(card.dataset.place)));
  pins.forEach((pin) => pin.addEventListener('click', () => select(pin.dataset.place)));
  const start = new URLSearchParams(location.search).get('place');
  select(PLACES[start] ? start : 'atlas');
})();
