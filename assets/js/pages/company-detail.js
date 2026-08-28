/** Company detail interactions */
const { $$ } = window.QTSC;
$$('.entity-card').forEach(card => card.addEventListener('keydown', event => {
  if (event.key === 'Enter' && card.href) location.href = card.href;
}));
