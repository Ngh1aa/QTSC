/* QTSC business-journey compatibility layer — 2026.
   Previous builds injected an extra "service assistant" after page heroes.
   The 2026 information architecture now owns the journey in each page itself,
   so this file intentionally performs no UI injection. It remains as a safe
   compatibility entry point for existing HTML includes. */
(() => {
  document.documentElement.dataset.qtscJourney = 'business-first-2026';
})();
