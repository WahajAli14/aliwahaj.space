/* Display résumé-reported totals; do not imply measured per-query timings. */
(() => {
  const journey = document.querySelector('.request-journey');
  const choices = [...document.querySelectorAll('[data-trace-mode]')];
  const versions = {
    before: { time: '20 s', outcome: 'Original response time on the selected endpoints.', caption: 'Repeated related-data reads add avoidable work.' },
    after: { time: '6 s', outcome: '70% lower response time on selected high-volume endpoints.', caption: 'N+1 queries removed; less repeated work.' }
  };
  choices.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.traceMode;
    const version = versions[mode];
    journey.dataset.trace = mode;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    document.querySelector('#trace-time').textContent = version.time;
    document.querySelector('#trace-outcome').textContent = version.outcome;
    document.querySelector('#trace-caption').textContent = version.caption;
  }));
})();

/* Case links reveal their reasoning; native anchors retain deep-link navigation. */
(() => {
  const links = [...document.querySelectorAll('.case-heading a')];
  function revealCase(hash) {
    const article = document.getElementById(hash.slice(1));
    const disclosure = article && article.classList.contains('case-study') && article.querySelector('.case-disclosure');
    if (disclosure) disclosure.open = true;
  }
  function syncCurrent() {
    revealCase(window.location.hash);
    links.forEach(link => {
      if (link.getAttribute('href') === window.location.hash) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href^="#case-"]');
    if (link) revealCase(link.getAttribute('href'));
  });
  window.addEventListener('hashchange', syncCurrent);
  syncCurrent();
})();
