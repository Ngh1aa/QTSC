(() => {
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.id = 'qtsc-ui-feedback-launcher';
  launcher.dataset.uiFeedbackIgnore = 'true';
  launcher.textContent = 'UI';
  launcher.title = 'Đang tải UI Feedback Tool…';
  launcher.setAttribute('aria-label', 'Bật hoặc tắt UI Feedback Tool');
  launcher.style.cssText = [
    'position:fixed',
    'left:16px',
    'bottom:16px',
    'z-index:2147483647',
    'min-width:44px',
    'height:44px',
    'padding:0 14px',
    'border:1px solid rgba(255,255,255,.18)',
    'border-radius:999px',
    'background:#111111',
    'color:#ffffff',
    'font:700 12px/1 Manrope,system-ui,sans-serif',
    'letter-spacing:.08em',
    'box-shadow:0 10px 30px rgba(0,0,0,.22)',
    'cursor:pointer',
    'opacity:.94'
  ].join(';');
  document.documentElement.appendChild(launcher);

  import('../../ui-feedback.js?v=4ef8421')
    .then(({ createUIFeedback }) => {
      if (typeof createUIFeedback !== 'function') throw new Error('createUIFeedback export not found');
      const feedback = createUIFeedback({
        storageKey: 'qtsc-ui-feedback',
        githubRepo: 'Ngh1aa/QTSC',
        accent: '#EE4623',
      });
      if (!feedback) throw new Error('UI Feedback instance was not created');
      window.__qtscUIFeedback = feedback;
      launcher.title = 'UI Feedback Tool — click hoặc nhấn Q → W → E';
      launcher.addEventListener('click', () => feedback.toggle());
      console.info('[QTSC] UI Feedback Tool v0.14.0 ready');
    })
    .catch((error) => {
      console.error('[QTSC] UI Feedback Tool failed to load:', error);
      launcher.textContent = 'UI !';
      launcher.title = `UI Feedback lỗi: ${error?.message || error}`;
      launcher.style.background = '#B42318';
    });
})();
