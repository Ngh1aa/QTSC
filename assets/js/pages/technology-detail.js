/** Technology detail tab interactions and smooth anchor navigation */
(() => {
  const tabs = document.querySelectorAll('.tech-tabs a');
  if (!tabs.length) return;

  const updateActiveTab = () => {
    const hash = location.hash || '#data';
    tabs.forEach(tab => {
      const isMatch = tab.getAttribute('href') === hash;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const href = tab.getAttribute('href');
      if (href && href.startsWith('#')) {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      }
    });
  });

  window.addEventListener('hashchange', updateActiveTab);
  updateActiveTab();
})();
