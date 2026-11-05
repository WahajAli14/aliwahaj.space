/* Fixed explanatory examples; no database, remote endpoint or real query execution. */
(() => {
  const demo = document.querySelector('.policy-demo');
  const choices = [...demo.querySelectorAll('[data-policy-choice]')];
  const states = {
    read: { request:'Read an approved table.', validation:'Single read statement accepted.', database:'Read-only role and transaction.', result:'Return the requested rows, up to the configured cap.', status:'Read path: validation and database permissions serve separate roles.' },
    write: { request:'Attempt to change stored data.', validation:'Write rejected before database execution.', database:'Not reached by this request. Read-only permissions remain a separate boundary.', result:'No query result is returned.', status:'Write path: application validation rejects this example. This is an explanation, not a live security test.' },
    large: { request:'Request a result larger than 100 rows.', validation:'A valid read may continue.', database:'Read-only execution with a 5-second statement deadline.', result:'Return at most 100 rows and indicate that the result was truncated.', status:'Large-result path: the response cap and execution deadline limit different costs.' }
  };
  choices.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.policyChoice, state = states[mode];
    demo.dataset.policy = mode;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    for (const key of ['request','validation','database','result','status']) document.querySelector('#policy-'+key).textContent = state[key];
  }));
})();
