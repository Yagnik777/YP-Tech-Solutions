
// Portfolio filters
const chips = document.querySelectorAll('.chip');
const grid = document.getElementById('portfolioGrid');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  grid.querySelectorAll('.project').forEach(card => {
    card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
  });
}));
