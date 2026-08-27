/** Homepage loader — feature code lives in assets/js/pages/home.js. */
(() => {
  const script = document.createElement('script');
  script.src = 'assets/js/pages/home.js';
  script.defer = true;
  document.head.append(script);
})();
