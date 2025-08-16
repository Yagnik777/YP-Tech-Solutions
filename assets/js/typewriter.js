
// Typewriter rotating text
const phrases = ['Web Development', 'App Development', 'Digital Marketing'];
let p = 0, i = 0, dir = 1;
const span = document.getElementById('tw');

function tick() {
  const word = phrases[p];
  i += dir;
  span.textContent = word.slice(0, i);
  if (dir > 0 && i === word.length) { dir = -1; setTimeout(tick, 1200); return; }
  if (dir < 0 && i === 0) { dir = 1; p = (p + 1) % phrases.length; }
  setTimeout(tick, dir > 0 ? 70 : 40);
}
if (span) tick();
