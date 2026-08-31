(() => {
  if (!document.querySelector('link[href*="assets/css/domain-remediation-2026-08-31.css"]')) {
    const remediationStyles = document.createElement('link');
    remediationStyles.rel = 'stylesheet';
    remediationStyles.href = 'assets/css/domain-remediation-2026-08-31.css?v=20260831';
    remediationStyles.dataset.qtscDomainRemediation = 'true';
    document.head.append(remediationStyles);
  }

  if (!document.querySelector('script[src*="assets/js/site-extension.js"]')) {
    const extension = document.createElement('script');
    extension.src = 'assets/js/site-extension.js?v=20260830';
    extension.dataset.qtscSiteExtension = 'true';
    document.head.append(extension);
  }

  if (!document.querySelector('script[src*="assets/js/domain-remediation-2026-08-31.js"]')) {
    const remediation = document.createElement('script');
    remediation.src = 'assets/js/domain-remediation-2026-08-31.js?v=20260831';
    remediation.defer = true;
    remediation.dataset.qtscDomainRemediation = 'true';
    document.head.append(remediation);
  }

  const currentScript = document.currentScript
    || document.querySelector('script[src*="ui-feedback-init.js"]');
  const bundleUrl = currentScript
    ? new URL('../../ui-feedback.js?v=0.14.0', currentScript.src).href
    : new URL('ui-feedback.js?v=0.14.0', document.baseURI).href;

  import(bundleUrl)
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

