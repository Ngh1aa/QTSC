/** Inner-page loader — each screen owns its own JS module. */
(() => {
  const page = location.pathname.split('/').pop().replace(/\.html$/i, '') || 'about';
  document.body.classList.add(`page-${page}`);
  document.body.dataset.page = page;

  const load = (src, done) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (done) script.addEventListener('load', done, { once: true });
    document.head.append(script);
  };

  load('assets/js/shared.js', () => load(`assets/js/pages/${page}.js`));
})();
