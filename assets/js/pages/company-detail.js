/** Company detail interactions */
const { $$, toast } = window.QTSC;
$$('.entity-card').forEach(card => card.addEventListener('keydown', event => {
  if (event.key === 'Enter' && card.href) location.href = card.href;
}));
$$('[data-demo-contact]').forEach(button => button.addEventListener('click', () => toast('Liên hệ doanh nghiệp — prototype UI/UX.')));
