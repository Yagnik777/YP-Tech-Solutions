
// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const userPref = localStorage.getItem('theme');
if (userPref) document.body.setAttribute('data-theme', userPref);
themeToggle?.addEventListener('click', () => {
  const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile menu basic toggle (show/hide links)
const menuToggle = document.getElementById('menuToggle');
menuToggle?.addEventListener('click', () => {
  const links = document.querySelector('.links');
  if (!links) return;
  const showing = getComputedStyle(links).display !== 'none';
  links.style.display = showing ? 'none' : 'flex';
});

// Particle background
(async () => {
  const { tsParticles } = window;
  if (!tsParticles) return;
  await tsParticles.load({
    id: 'particles',
    options: {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: { events: { onHover: { enable: true, mode: 'repulse' }, resize: true }, modes: { repulse: { distance: 80 }}},
      particles: {
        color: { value: ['#22d3ee','#0ea5e9','#6366f1'] },
        links: { enable: true, distance: 120, opacity: 0.25 },
        move: { enable: true, speed: 1.2 },
        number: { value: 60, density: { enable: true, area: 800 } },
        opacity: { value: 0.3 },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }
  });
})();

// Scroll animations
ScrollReveal().reveal('.card, .section, .hero-ctas .btn, .stats .stat', {
  distance: '24px', duration: 800, easing: 'cubic-bezier(.2,.65,.3,1)', origin: 'bottom', interval: 80
});

// Counter animation for stats in footer
const nums = document.querySelectorAll('.num');
nums.forEach(el => {
  const goal = parseInt(el.dataset.count || '0', 10);
  let cur = 0;
  const step = Math.ceil(goal / 60);
  const tick = () => {
    cur = Math.min(goal, cur + step);
    el.textContent = cur.toString();
    if (cur < goal) requestAnimationFrame(tick);
  };
  const onView = () => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      window.removeEventListener('scroll', onView);
      tick();
    }
  };
  window.addEventListener('scroll', onView);
  onView();
});

// Modal controls
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-modal');
    document.getElementById(id)?.classList.add('open');
  });
});
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.modal')?.classList.remove('open'));
});
window.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open')); });

// Filter services on homepage via selector
const need = document.getElementById('need');
need?.addEventListener('change', (e) => {
  const tag = e.target.value;
  document.querySelectorAll('#serviceCards .service').forEach(card => {
    card.style.display = (tag === 'all' || card.dataset.tag === tag) ? '' : 'none';
  });
});
