/** Homepage loader — feature code lives in assets/js/pages/home.js. */
(() => {
  const load = (src, done) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (done) script.addEventListener('load', done, { once: true });
    document.head.append(script);
  };

  load('assets/js/shared.js', () => load('assets/js/pages/home.js'));
})();
