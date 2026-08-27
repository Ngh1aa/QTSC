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

  function initShell() {
    $('#mobileMenuOpen')?.addEventListener('click', () => toast('Mobile navigation được mô phỏng đầy đủ tại Homepage.'));
    $('#searchOpen')?.addEventListener('click', () => toast('Global Search: mở Homepage và dùng Ctrl/Cmd + K.'));
    $$('[data-demo-contact]').forEach(button => button.addEventListener('click', () => toast('Đã mở luồng liên hệ mô phỏng.')));
  }

  window.QTSC = { $, $$, toast, initShell };
  document.addEventListener('DOMContentLoaded', initShell);
})();
