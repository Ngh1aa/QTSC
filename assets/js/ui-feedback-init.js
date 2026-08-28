(() => {
  if (!document.querySelector('script[data-qtsc-site-extension]')) {
    const extension = document.createElement('script');
    extension.src = 'assets/js/site-extension.js?v=20260828';
    extension.dataset.qtscSiteExtension = 'true';
    document.head.append(extension);
  }

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
      console.info('[QTSC] UI Feedback Tool v0.14.0 ready — press Q → W → E');
    })
    .catch((error) => {
      console.error('[QTSC] UI Feedback Tool failed to load:', error);
    });
})();
