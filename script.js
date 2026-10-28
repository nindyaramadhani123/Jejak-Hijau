const menuButton = document.querySelector('[data-menu-button]');
const navLinks = document.querySelector('[data-nav-links]');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '✕' : '☰';
  });
}
document.querySelectorAll('[data-challenge]').forEach((list) => {
  const key = 'jejakHijauChallengeV1';
  const checks = [...list.querySelectorAll('input[type="checkbox"]')];
  const bar = document.querySelector('[data-progress-bar]');
  const label = document.querySelector('[data-progress-label]');
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch(e) {}
  checks.forEach((box) => { box.checked = Boolean(saved[box.value]); });
  const update = () => {
    const state = {};
    checks.forEach((box) => { state[box.value] = box.checked; });
    try { localStorage.setItem(key, JSON.stringify(state)); } catch(e) {}
    const done = checks.filter((box) => box.checked).length;
    if (bar) bar.style.width = `${checks.length ? done / checks.length * 100 : 0}%`;
    if (label) label.textContent = `${done} dari ${checks.length} aksi selesai`;
  };
  checks.forEach((box) => box.addEventListener('change', update));
  update();
});
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
