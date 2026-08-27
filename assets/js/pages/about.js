/** About page interactions */
document.querySelectorAll('.timeline-row').forEach(row => {
  row.addEventListener('click', () => {
    document.querySelectorAll('.timeline-row').forEach(item => item.removeAttribute('data-active'));
    row.setAttribute('data-active', 'true');
  });
});
