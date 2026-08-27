/** QTSC shared helpers for inner-page prototypes. */
(() => {
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];

  function toast(message) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.append(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function enhanceInlineArrows() {
    $$('a, button').forEach((el) => {
      if (el.querySelector('.ui-arrow-icon')) return;
      const textNode = [...el.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue?.includes('↗')
      );
      if (!textNode) return;

      textNode.nodeValue = textNode.nodeValue.replace('↗', '').trimEnd() + ' ';
      const icon = document.createElement('span');
      icon.className = 'ui-arrow-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.style.cssText = [
        'display:inline-block',
        'width:16px',
        'height:16px',
        'margin-left:6px',
        'vertical-align:-3px',
        'background:currentColor',
        'mask:var(--icon-arrow) center/contain no-repeat',
        '-webkit-mask:var(--icon-arrow) center/contain no-repeat'
      ].join(';');
      el.append(icon);
    });
  }

  function initShell() {
    enhanceInlineArrows();
    $('#mobileMenuOpen')?.addEventListener('click', () => toast('Mobile navigation được mô phỏng đầy đủ tại Homepage.'));
    $('#searchOpen')?.addEventListener('click', () => toast('Global Search: mở Homepage và dùng Ctrl/Cmd + K.'));
  }

  window.QTSC = { $, $$, toast, initShell, enhanceInlineArrows };
  document.addEventListener('DOMContentLoaded', initShell);
})();
