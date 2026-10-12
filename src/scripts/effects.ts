const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const html = document.documentElement;
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const updateThemeButton = () => themeButton?.setAttribute('aria-pressed', String(html.dataset.theme === 'dark'));
updateThemeButton();
themeButton?.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('pibo-theme', html.dataset.theme); } catch { /* A blocked storage area must not break the theme switch. */ }
  updateThemeButton();
});
systemTheme.addEventListener('change', event => {
  let saved: string | null = null;
  try { saved = localStorage.getItem('pibo-theme'); } catch { /* Use the system preference. */ }
  if (!saved) { html.dataset.theme = event.matches ? 'dark' : 'light'; updateThemeButton(); }
});

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.querySelector<HTMLElement>('#main-nav');
const closeMenu = () => { menuButton?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); };
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  nav?.classList.toggle('is-open', expanded);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });

if ('IntersectionObserver' in window) {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .07 });
  reveals.forEach(element => observer.observe(element));
  html.classList.add('js-ready');
}

document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -2}deg`);
    card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 2}deg`);
  });
  card.addEventListener('pointerleave', () => { card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y'); });
});

const worlds = document.querySelector<HTMLElement>('[data-worlds]');
const canvas = worlds?.querySelector<HTMLCanvasElement>('canvas');
const ctx = canvas?.getContext('2d');
if (worlds && canvas && ctx) {
  let width = 0, height = 0, frame = 0, tick = 0, visible = true;
  let pointer = { x: 0, y: 0, active: false };
  const particles = Array.from({ length: 30 }, (_, i) => ({
    angle: (i / 30) * Math.PI * 2,
    radius: .24 + ((i * 37) % 11) * .015,
    size: i % 6 === 0 ? 3.3 : 1.3 + i % 3 * .4,
    x: 0, y: 0,
    color: ['#baa5df', '#e8b58c', '#9dac86', '#b9cfd4'][i % 4],
  }));
  function resize() {
    if (!worlds || !canvas) return;
    const rect = worlds.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles.forEach(p => { p.x = width * .5 + Math.cos(p.angle) * width * p.radius; p.y = height * .5 + Math.sin(p.angle) * height * p.radius; });
    if (reducedMotion.matches) draw(true);
  }
  function draw(still = false) {
    ctx!.clearRect(0, 0, width, height);
    tick += still ? 0 : .006;
    for (const p of particles) {
      const angle = p.angle + tick * .23;
      const targetX = width * .51 + Math.cos(angle) * width * p.radius * 1.12;
      const targetY = height * .49 + Math.sin(angle) * height * p.radius * .92;
      let tx = targetX, ty = targetY;
      if (pointer.active && !still) {
        const distance = Math.hypot(targetX - pointer.x, targetY - pointer.y);
        const attraction = Math.max(0, 1 - distance / (width * .55)) * .7;
        tx += (pointer.x - tx) * attraction;
        ty += (pointer.y - ty) * attraction;
      }
      p.x += (tx - p.x) * .035; p.y += (ty - p.y) * .035;
      ctx!.beginPath(); ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = p.color; ctx!.globalAlpha = .65; ctx!.fill();
    }
    ctx!.globalAlpha = 1;
  }
  function animate() { frame = 0; if (reducedMotion.matches || !visible || document.hidden) return; draw(); frame = requestAnimationFrame(animate); }
  function restart() { cancelAnimationFrame(frame); frame = 0; if (reducedMotion.matches) draw(true); else if (visible && !document.hidden) frame = requestAnimationFrame(animate); }
  worlds.addEventListener('pointermove', event => {
    if (reducedMotion.matches) return;
    const rect = worlds.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    worlds.style.setProperty('--world-x', `${(pointer.x / width - .5) * 9}px`);
    worlds.style.setProperty('--world-y', `${(pointer.y / height - .5) * 9}px`);
  }, { passive: true });
  const resetPointer = () => { pointer.active = false; worlds.style.removeProperty('--world-x'); worlds.style.removeProperty('--world-y'); };
  worlds.addEventListener('pointerleave', resetPointer);
  worlds.addEventListener('pointerup', event => { if (event.pointerType === 'touch') resetPointer(); });
  worlds.addEventListener('pointercancel', resetPointer);
  new ResizeObserver(resize).observe(worlds);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; restart(); }).observe(worlds);
  document.addEventListener('visibilitychange', restart);
  reducedMotion.addEventListener('change', () => { resetPointer(); restart(); });
  resize(); restart();
}
