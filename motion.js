/* One source of truth for motion preference, manual pause and page visibility. */
(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controls = [...document.querySelectorAll('[data-motion-control]')];
  const hero = document.querySelector('.neural');
  const entrance = document.querySelector('.hero .cta');
  entrance.addEventListener('animationend', () => root.classList.add('arrived'), { once: true });
  let userPaused = false;
  let heroVisible = true;
  const allowed = () => !preference.matches && !userPaused;
  window.portfolioMotion = Object.freeze({ get allowed() { return allowed(); } });
  function sync() {
    const paused = !allowed();
    if (paused) root.classList.add('arrived');
    root.classList.toggle('paused', paused);
    root.classList.toggle('page-hidden', document.hidden);
    root.dataset.motion = preference.matches ? 'reduced' : userPaused ? 'paused' : 'running';
    hero.classList.toggle('offscreen', !heroVisible);
    controls.forEach(button => {
      button.disabled = preference.matches;
      button.setAttribute('aria-pressed', String(paused));
      button.textContent = preference.matches ? 'Motion reduced' : userPaused ? 'Resume motion' : 'Pause motion';
    });
    document.dispatchEvent(new Event('portfolio-motion'));
  }
  controls.forEach(button => button.addEventListener('click', () => { userPaused = !userPaused; sync(); }));
  preference.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; hero.classList.toggle('offscreen', !heroVisible); }).observe(hero);
  }
  sync();
  root.classList.add('motion-ready');
})();
