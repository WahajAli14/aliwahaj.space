/* Load the renderer on demand; the model is local, and no camera/microphone access is used. */
(() => {
  const dialog = document.querySelector('#model-dialog');
  const stage = document.querySelector('#model-stage');
  const status = document.querySelector('#model-status');
  const retry = document.querySelector('#model-retry');
  const buttons = ['#model-left', '#model-right', '#model-reset'].map(s => document.querySelector(s));
  let viewer, loading = false, ready = false, timer, attempt = 0;
  const setStatus = text => { status.textContent = text; };
  function fail() {
    attempt++; loading = false; ready = false; retry.hidden = false;
    stage.classList.remove('model-loaded'); if (viewer) { viewer.remove(); viewer = undefined; }
    buttons.forEach(b => { b.disabled = true; });
    setStatus('The 3D viewer could not load. Check your connection and retry, or download the model.');
  }
  async function load() {
    if (loading || ready) return;
    const request = ++attempt;
    loading = true; retry.hidden = true; setStatus('Loading 3D viewer…');
    timer = setTimeout(() => { if (request === attempt) fail(); }, 15000);
    try {
      await import('https://unpkg.com/@google/model-viewer@4.4.0/dist/model-viewer.min.js');
      if (request !== attempt) return;
      if (viewer) viewer.remove();
      viewer = document.createElement('model-viewer');
      viewer.setAttribute('src', 'assets/aw-monogram.glb?v=atelier-2');
      viewer.setAttribute('alt', 'An extruded three-dimensional AW monogram with rose faces and wine-colored edges.');
      viewer.setAttribute('camera-controls', ''); viewer.setAttribute('disable-pan', ''); viewer.setAttribute('disable-zoom', '');
      viewer.setAttribute('touch-action', 'pan-y'); viewer.setAttribute('interaction-prompt', 'none');
      viewer.setAttribute('camera-orbit', '25deg 75deg auto'); viewer.setAttribute('shadow-intensity', '.8');
      viewer.setAttribute('exposure', '1.2'); viewer.setAttribute('reveal', 'auto');
      viewer.addEventListener('load', () => {
        if (request !== attempt) return;
        clearTimeout(timer); loading = false; ready = true; retry.hidden = true;
        stage.classList.add('model-loaded'); buttons.forEach(b => { b.disabled = false; });
        setStatus('3D model ready. Rotate it with the buttons or drag the model.');
      }, { once: true });
      viewer.addEventListener('error', () => { if (request === attempt) { clearTimeout(timer); fail(); } });
      stage.append(viewer);
    } catch (error) { if (request === attempt) { clearTimeout(timer); fail(); } }
  }
  function rotate(degrees) {
    if (!ready) return;
    const orbit = viewer.getCameraOrbit();
    viewer.cameraOrbit = `${orbit.theta + degrees * Math.PI / 180}rad ${orbit.phi}rad ${orbit.radius}m`;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) viewer.jumpCameraToGoal();
    setStatus(degrees < 0 ? 'View rotated left.' : 'View rotated right.');
  }
  document.querySelector('#model-open').addEventListener('click', () => { dialog.showModal(); document.dispatchEvent(new Event('portfolio-overlay')); load(); });
  dialog.addEventListener('close', () => document.dispatchEvent(new Event('portfolio-overlay')));
  document.querySelector('#model-close').addEventListener('click', () => dialog.close());
  document.querySelector('#model-left').addEventListener('click', () => rotate(-30));
  document.querySelector('#model-right').addEventListener('click', () => rotate(30));
  document.querySelector('#model-reset').addEventListener('click', () => { if (ready) { viewer.cameraOrbit = '25deg 75deg auto'; if (matchMedia('(prefers-reduced-motion: reduce)').matches) viewer.jumpCameraToGoal(); setStatus('Default model view restored.'); } });
  retry.addEventListener('click', load);
})();
