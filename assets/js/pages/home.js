/** Homepage-only progressive enhancement. Shared navigation, search and contact
 * are owned by assets/js/shared.js on every route. */
(() => {
  const items = [...document.querySelectorAll('.reveal')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('in'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -5% 0px'});
    items.forEach(item => observer.observe(item));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
    });
  });
})();
