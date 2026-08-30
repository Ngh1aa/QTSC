/** QTSC Experience Polish — 2026
 * Journey routing, trust metadata and page structure are now owned by HTML +
 * template-experience.css. This compatibility file only handles opt-in reveal
 * motion and never injects duplicate rails, pills, tabs or public copy.
 */
(() => {
  const reveal = [...document.querySelectorAll('.reveal')];
  if (!reveal.length) return;

  const showAll = () => reveal.forEach(el => el.classList.add('in'));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  reveal.forEach(el => observer.observe(el));
})();
