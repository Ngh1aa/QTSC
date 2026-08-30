(() => {
  if (!document.querySelector('script[src*="assets/js/site-extension.js"]')) {
    const extension = document.createElement('script');
    extension.src = 'assets/js/site-extension.js?v=20260830';
    extension.dataset.qtscSiteExtension = 'true';
    document.head.append(extension);
  }

  const feedbackEnabled = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    || new URLSearchParams(window.location.search).get('feedback') === '1';

  if (!feedbackEnabled) return;

  import('../../ui-feedback.js?v=4ef8421')
    .then(({ createUIFeedback }) => {
      if (typeof createUIFeedback !== 'function') {
        throw new Error('createUIFeedback export not found');
      }

      const feedback = createUIFeedback({
        storageKey: 'qtsc-ui-feedback',
        githubRepo: 'Ngh1aa/QTSC',
        accent: '#EE4623',
      });

      if (!feedback) {
        throw new Error('UI Feedback instance was not created');
      }

      window.__qtscUIFeedback = feedback;
      console.info('[QTSC] UI Feedback Tool ready — press Q → W → E');
    })
    .catch((error) => {
      console.error('[QTSC] UI Feedback Tool failed to load:', error);
    });
})();
