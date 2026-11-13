/* QTSC prototype store.
 * User data (bookings, applications, enquiries, demo requests, contact requests,
 * newsletter preferences) lives in sessionStorage so it survives navigation and
 * reload within the tab. It is seeded from QTSC_SEED.initialUser and can be
 * reset at any time. `request()` simulates a network round-trip and can be
 * forced to fail from the footer toolbar to exercise recoverable error states.
 */
(() => {
  const seed = window.QTSC_SEED;
  if (!seed) { console.warn('[QTSC] seed data missing'); return; }
  const KEY = 'qtsc-prototype-user';
  const SETTINGS = 'qtsc-prototype-settings';
  const memory = {};
  const clone = value => JSON.parse(JSON.stringify(value));

  const storage = {
    get(key) { try { return sessionStorage.getItem(key); } catch { return memory[key] ?? null; } },
    set(key, value) { try { sessionStorage.setItem(key, value); } catch { memory[key] = value; } },
    remove(key) { try { sessionStorage.removeItem(key); } catch { delete memory[key]; } }
  };

  function readUser() {
    const raw = storage.get(KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === seed.version) return parsed.data;
      } catch { /* fall through to reseed */ }
    }
    const fresh = clone(seed.initialUser);
    writeUser(fresh);
    return fresh;
  }
  function writeUser(data) { storage.set(KEY, JSON.stringify({ version: seed.version, data })); }

  function settings() {
    try { return { failRequests: false, ...(JSON.parse(storage.get(SETTINGS) || '{}')) }; } catch { return { failRequests: false }; }
  }
  function setSetting(key, value) { const next = { ...settings(), [key]: value }; storage.set(SETTINGS, JSON.stringify(next)); emit('settings'); return next; }

  function emit(reason) { document.dispatchEvent(new CustomEvent('qtsc:store', { detail: { reason } })); }

  const ref = prefix => `${prefix}-${Date.now().toString(36).slice(-3).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

  const api = {
    seed,
    user: () => readUser(),
    list(collection) { return readUser()[collection] || []; },
    get(collection, id) { return api.list(collection).find(item => item.id === id) || null; },
    add(collection, item, prefix = 'RQ') {
      const data = readUser();
      const record = { id: ref(prefix), createdAt: new Date().toISOString(), ...item };
      data[collection] = [record, ...(data[collection] || [])];
      writeUser(data); emit(collection);
      return record;
    },
    update(collection, id, patch) {
      const data = readUser();
      let updated = null;
      data[collection] = (data[collection] || []).map(item => item.id === id ? (updated = { ...item, ...patch, updatedAt: new Date().toISOString() }) : item);
      writeUser(data); emit(collection);
      return updated;
    },
    setValue(key, value) { const data = readUser(); data[key] = value; writeUser(data); emit(key); return value; },
    value(key) { return readUser()[key]; },
    reset() { storage.remove(KEY); storage.remove(SETTINGS); readUser(); emit('reset'); },
    settings,
    setFailRequests(on) { return setSetting('failRequests', !!on); },
    /* Simulated request: resolves with work() after a short delay, or rejects when failure simulation is on. */
    request(work = () => null, { delay = 420 } = {}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (settings().failRequests) {
            const error = new Error('Không kết nối được tới máy chủ QTSC (lỗi giả lập).');
            error.code = 'SIMULATED_NETWORK_ERROR';
            reject(error);
            return;
          }
          try { resolve(work()); } catch (error) { reject(error); }
        }, delay);
      });
    }
  };
  window.QTSCStore = api;
})();
