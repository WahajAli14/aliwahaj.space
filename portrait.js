/* Small user-driven tilt on the photographic object. This is a photo, not a face mesh. */
(() => {
  const object = document.querySelector('#portrait-object');
  const mat = object.querySelector('.portrait-mat');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0, bounds, x = 0, y = 0;
  const allowed = () => fine.matches && !reduced.matches && window.portfolioMotion?.allowed;
  const reset = () => { cancelAnimationFrame(frame); frame = 0; mat.style.transform = ''; };
  object.addEventListener('pointerenter', () => { bounds = object.getBoundingClientRect(); });
  object.addEventListener('pointermove', event => {
    if (!allowed() || !bounds) return;
    x = (event.clientX - bounds.left) / bounds.width - .5;
    y = (event.clientY - bounds.top) / bounds.height - .5;
    if (!frame) frame = requestAnimationFrame(() => {
      frame = 0;
      if (allowed()) mat.style.transform = `rotate(4deg) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
  });
  object.addEventListener('pointerleave', reset);
  document.addEventListener('portfolio-motion', reset);
  document.addEventListener('visibilitychange', reset);
  reduced.addEventListener('change', reset);
})();
