/* Illustrated portrait motion; the photograph stays available and no face mesh is implied. */
(() => {
  const object = document.querySelector('#portrait-object');
  const mat = object.querySelector('.portrait-mat');
  const image = document.querySelector('#portrait-image');
  const choices = [...object.querySelectorAll('[data-portrait-choice]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0, bounds, x = 0, y = 0, visible = true;
  const allowed = () => visible && !document.hidden && fine.matches && !reduced.matches && window.portfolioMotion?.allowed;
  const reset = () => { cancelAnimationFrame(frame); frame = 0; mat.style.transform = ''; };
  object.addEventListener('pointerenter', () => { bounds = object.getBoundingClientRect(); });
  object.addEventListener('pointermove', event => {
    if (!allowed() || !bounds) return;
    x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
    y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
    if (!frame) frame = requestAnimationFrame(() => {
      frame = 0;
      if (allowed()) mat.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
  });
  choices.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.portraitChoice;
    object.dataset.portrait = mode;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    image.src = mode === 'photo' ? 'assets/ali-portrait.jpeg' : 'assets/ali-bust.webp';
    image.alt = mode === 'photo' ? 'Ali Wahaj wearing a dark suit.' : 'Stylized illustrated bust of Ali Wahaj in a charcoal suit.';
    image.width = mode === 'photo' ? 1200 : 900; image.height = mode === 'photo' ? 1600 : 823;
    document.querySelector('#portrait-kind').textContent = mode === 'photo' ? 'Original photograph' : 'Illustrated portrait';
    reset();
  }));
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    object.classList.toggle('offscreen', !visible);
    if (!visible) reset();
  }).observe(object);
  object.addEventListener('pointerleave', reset);
  document.addEventListener('portfolio-motion', reset);
  document.addEventListener('visibilitychange', reset);
  reduced.addEventListener('change', reset);
})();
