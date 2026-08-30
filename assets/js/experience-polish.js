/** QTSC Experience Polish — 2026
 * Journey routing, trust metadata and page structure are now owned by HTML +
 * template-experience.css. This compatibility file only handles shared mobile
 * accessibility polish and opt-in reveal motion; it never injects public copy.
 */
(() => {
  if (!document.querySelector('link[data-qtsc-mobile-a11y]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/mobile-accessibility.css';
    link.dataset.qtscMobileA11y = 'true';
    document.head.append(link);
  }

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
