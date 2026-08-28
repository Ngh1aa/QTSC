(() => {
  const linkMap = {
    'QTSC DigiTech Center': 'digitech-center.html',
    'Giáo dục & cộng đồng': 'community.html',
    'Thông cáo báo chí': 'media-center.html?type=press',
    'Hình ảnh & video': 'media-center.html',
    'Văn bản pháp luật': 'resources.html?cat=legal'
  };
  const extras = {
    ecosystem: [
      ['Cộng đồng QTSC','community.html'],
      ['Agriculture Center of Excellence','innovation-centers.html#agriculture']
    ],
    insights: [
      ['Newsletter','newsletter.html'],
      ['Góc báo chí','media-center.html'],
      ['Dữ liệu mở','open-data.html']
    ]
  };

  function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script'); s.src = src; s.defer = true; document.body.append(s);
  }
  if (document.body.classList.contains('page-companies')) loadScript('assets/js/data/companies-data.js');
  if (document.body.classList.contains('page-marketplace')) loadScript('assets/js/data/marketplace-data.js');
  if (document.body.classList.contains('page-insights')) loadScript('assets/js/data/insights-data.js');

  function patchMega(root) {
    if (!root || root.dataset.legacyExtended === '1') return;
    root.querySelectorAll('a').forEach(a => {
      const label = a.textContent.replace('↗','').trim();
      if (linkMap[label]) a.href = linkMap[label];
    });
    const feature = root.querySelector('.mega-feature');
    const label = feature?.firstElementChild?.textContent.trim();
    const key = label === 'Hệ sinh thái' ? 'ecosystem' : label === 'Tin & nguồn lực' ? 'insights' : null;
    if (key && extras[key]) {
      const cols = root.querySelectorAll('.mega-col');
      const target = cols[cols.length - 1];
      extras[key].forEach(([text, href]) => {
        if (!target || [...root.querySelectorAll('a')].some(a => a.textContent.includes(text))) return;
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = `${text}<span>↗</span>`;
        target.append(a);
      });
    }
    root.dataset.legacyExtended = '1';
  }

  const observer = new MutationObserver(() => {
    document.querySelectorAll('#megaContent,.mega-inner').forEach(root => {
      root.removeAttribute('data-legacy-extended');
      patchMega(root);
    });
  });
  observer.observe(document.documentElement, {subtree:true, childList:true});
  document.querySelectorAll('#megaContent,.mega-inner').forEach(patchMega);
})();
