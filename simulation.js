(function () {
function motionAllowed() { return Boolean(window.portfolioMotion && window.portfolioMotion.allowed); }
/* ---------- copy email ---------- */
var btn = document.getElementById('copy-email'), status = document.getElementById('copy-status'), email = document.getElementById('email');
btn.addEventListener('click', function () {
var text = email.textContent.trim();
function fallback() {
var r = document.createRange(); r.selectNodeContents(email);
var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
status.textContent = 'Selected. Press Ctrl+C or Cmd+C to copy.';
}
try {
navigator.clipboard.writeText(text).then(function () {
status.textContent = 'Copied';
setTimeout(function () { status.textContent = ''; }, 2500);
}, fallback);
} catch (e) { fallback(); }
});
/* ---------- local time in Pakistan ---------- */
var clock = document.getElementById('clock');
function tick() {
try {
clock.textContent = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit' }).format(new Date());
} catch (e) { clock.textContent = 'PKT'; }
}
tick(); setInterval(function(){ if(motionAllowed() && !document.hidden) tick(); }, 15000);
/* ---------- shared canvas colors ---------- */
var root = document.documentElement;
/* ---------- architecture simulation ---------- */
var canvas = document.getElementById('sim'), ctx = canvas.getContext('2d');
var toggle = document.getElementById('cache-toggle'), stateEl = document.getElementById('cache-state'), note = document.getElementById('sim-note');
var rAvg = document.getElementById('r-avg'), rHit = document.getElementById('r-hit'), rDb = document.getElementById('r-db');
var C = {};
function readColors() {
var cs = getComputedStyle(root);
C.fast = cs.getPropertyValue('--mint').trim(); C.slow = cs.getPropertyValue('--coral').trim(); C.async = cs.getPropertyValue('--lilac').trim();
C.text = cs.getPropertyValue('--ink').trim(); C.dim = cs.getPropertyValue('--muted').trim(); C.rule = cs.getPropertyValue('--line').trim();
C.node = cs.getPropertyValue('--bg').trim();
}
var nodes = {
client:  { label: 'Clients',     sub: 'web, mobile' },
gateway: { label: 'API Gateway', sub: 'HTTPS' },
lambda:  { label: 'Lambda',      sub: 'Python' },
redis:   { label: 'Redis',       sub: 'cache' },
mysql:   { label: 'MySQL',       sub: 'RDS' },
sqs:     { label: 'SQS',         sub: 'queue' },
worker:  { label: 'Worker',      sub: 'jobs' }
};
var wide = { client:[.1,.5], gateway:[.3,.5], lambda:[.5,.5], redis:[.72,.2], sqs:[.72,.5], mysql:[.72,.8], worker:[.9,.5] };
var tall = { client:[.5,.08], gateway:[.5,.27], lambda:[.5,.46], redis:[.18,.67], sqs:[.5,.67], mysql:[.82,.67], worker:[.5,.9] };
var edges = [['client','gateway'],['gateway','lambda'],['lambda','redis'],['lambda','mysql'],['lambda','sqs'],['sqs','worker'],['worker','mysql']];
var W = 0, H = 0, layout = wide;
var cacheOn = true, reqs = [], done = [], dbInFlight = 0, last = 0, spawnAcc = 0, running = false, frameId = 0, visible = false, pulses = {};
function pos(k) { var p = layout[k]; return { x: p[0] * W, y: p[1] * H }; }
function resize() {
var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
W = r.width; H = r.height;
canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
layout = W < 520 ? tall : wide;
draw();
}
function makeRequest() {
var r = Math.random(), kind, path, load = Math.min(dbInFlight, 30);
var dbSim = 170 + load * 38 + Math.random() * 60, dbVis = 650 + load * 70;
if (r < 0.06) {
kind = 'async';
path = [['client','gateway',380,6],['gateway','lambda',300,4],['lambda','sqs',360,8],['lambda','gateway',300,3],['gateway','client',380,6]];
} else if (cacheOn && r < 0.8) {
kind = 'fast';
path = [['client','gateway',380,6],['gateway','lambda',300,4],['lambda','redis',260,2],['redis','lambda',260,2],['lambda','gateway',300,3],['gateway','client',380,6]];
} else {
kind = 'slow';
path = [['client','gateway',380,6],['gateway','lambda',300,4],['lambda','mysql',dbVis,dbSim/2],['mysql','lambda',dbVis,dbSim/2],['lambda','gateway',300,3],['gateway','client',380,6]];
}
var sim = 0; path.forEach(function (l) { sim += l[3]; });
return { kind: kind, path: path, leg: 0, t: 0, sim: sim, inDb: false };
}
function spawnWorkerJob() { reqs.push({ kind: 'async', path: [['sqs','worker',900,0],['worker','mysql',700,0],['mysql','worker',700,0]], leg: 0, t: 0, sim: 0, job: true, inDb: false }); }
function pulse(k, c) { pulses[k] = { a: 1, c: c }; }
function col(kind) { return kind === 'fast' ? C.fast : kind === 'slow' ? C.slow : C.async; }
function step(dt) {
spawnAcc += dt / 1000 * 5.5;
while (spawnAcc >= 1) { spawnAcc -= 1; var nq = makeRequest(); reqs.push(nq); done.push({ sim: nq.sim, kind: nq.kind }); if (done.length > 25) done.shift(); }
for (var i = reqs.length - 1; i >= 0; i--) {
var q = reqs[i], L = q.path[q.leg];
if (q.t === 0 && L[1] === 'mysql' && !q.inDb) { q.inDb = true; dbInFlight++; }
q.t += dt;
if (q.t >= L[2]) {
q.t = 0; pulse(L[1], col(q.kind));
if (L[0] === 'mysql' && q.inDb) { q.inDb = false; dbInFlight--; }
if (L[1] === 'sqs' && !q.job) spawnWorkerJob();
q.leg++;
if (q.leg >= q.path.length) reqs.splice(i, 1);
}
}
for (var k in pulses) { pulses[k].a -= dt / 600; if (pulses[k].a <= 0) delete pulses[k]; }
}
function roundRect(x, y, w, h, r) {
ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function draw() {
if (!W) return;
ctx.clearRect(0, 0, W, H);
var nw = Math.max(78, Math.min(108, W * 0.165)), nh = 46;
ctx.lineWidth = 1.5;
edges.forEach(function (e) {
var a = pos(e[0]), b = pos(e[1]), hot = (e[1] === 'mysql' && !cacheOn);
ctx.strokeStyle = hot ? C.slow : C.dim; ctx.globalAlpha = hot ? 0.55 : 0.28;
ctx.setLineDash(e[0] === 'worker' || e[0] === 'sqs' ? [4, 5] : []);
ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
});
ctx.globalAlpha = 1; ctx.setLineDash([]);
reqs.forEach(function (q) {
var L = q.path[q.leg], a = pos(L[0]), b = pos(L[1]);
var t = Math.min(q.t / L[2], 1); t = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
var x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t, c = col(q.kind);
ctx.globalAlpha = 0.22; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.283); ctx.fill();
ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 6.283); ctx.fill();
});
Object.keys(nodes).forEach(function (k) {
var p = pos(k), n = nodes[k], off = (k === 'redis' && !cacheOn), pl = pulses[k];
roundRect(p.x - nw / 2, p.y - nh / 2, nw, nh, 12);
ctx.fillStyle = C.node; ctx.fill();
ctx.lineWidth = pl ? 2 : 1.2;
ctx.strokeStyle = pl ? pl.c : (k === 'mysql' && !cacheOn ? C.slow : C.rule);
ctx.globalAlpha = pl ? 0.5 + pl.a * 0.5 : 1; ctx.stroke(); ctx.globalAlpha = 1;
ctx.globalAlpha = off ? 0.35 : 1;
ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
ctx.font = '600 12.5px Geist, Helvetica, Arial, sans-serif';
ctx.fillText(n.label, p.x, p.y - 7);
ctx.fillStyle = C.dim; ctx.font = '11px Geist, Helvetica, Arial, sans-serif';
ctx.fillText(off ? 'off' : n.sub, p.x, p.y + 9);
ctx.globalAlpha = 1;
});
}
function updateReadout() {
var d = done.filter(function (x) { return x.sim > 0; });
var avg = d.length ? d.reduce(function (s, x) { return s + x.sim; }, 0) / d.length : (cacheOn ? 70 : 420);
var hits = d.length ? d.filter(function (x) { return x.kind === 'fast'; }).length / d.length : (cacheOn ? .74 : 0);
rAvg.textContent = Math.round(avg) + ' ms'; rAvg.className = avg < 150 ? 'good' : 'bad';
rHit.textContent = Math.round(hits * 100) + '%'; rHit.className = hits > 0.5 ? 'good' : 'bad';
rDb.textContent = String(dbInFlight); rDb.className = dbInFlight > 6 ? 'bad' : '';
}
var uiAcc = 0;
function frame(ts) {
frameId = 0;
if (!running || !motionAllowed() || !visible || document.hidden) { stop(); return; }
var dt = last ? Math.min(ts - last, 50) : 16; last = ts;
step(dt); draw();
uiAcc += dt; if (uiAcc > 400) { uiAcc = 0; updateReadout(); }
frameId = requestAnimationFrame(frame);
}
function start() {
if (running || !motionAllowed() || !visible || document.hidden) return;
dbInFlight = reqs.filter(function(q){ return q.inDb; }).length;
running = true; last = 0; frameId = requestAnimationFrame(frame);
}
function stop() {
running = false; last = 0;
if (frameId) cancelAnimationFrame(frameId);
frameId = 0;
}
function staticFrame() {
reqs = []; done = []; spawnAcc = 0; dbInFlight = cacheOn ? 2 : 11;
rAvg.textContent = cacheOn ? '70 ms' : '420 ms';
rAvg.className = cacheOn ? 'good' : 'bad';
rHit.textContent = cacheOn ? '74%' : '0%';
rHit.className = cacheOn ? 'good' : 'bad';
rDb.textContent = String(dbInFlight); rDb.className = cacheOn ? '' : 'bad';
draw();
}
toggle.addEventListener('click', function () {
cacheOn = !cacheOn;
toggle.setAttribute('aria-checked', String(cacheOn));
stateEl.textContent = cacheOn ? 'on' : 'off';
note.textContent = cacheOn ? 'Illustrative simulation, not production telemetry. Toggle the cache to explore database load.' : 'Simulation: every read now hits MySQL. Turn the cache back on.';
reqs = []; done = []; dbInFlight = 0; spawnAcc = 0;
if (!motionAllowed()) staticFrame(); else { pulse('redis', cacheOn ? C.fast : C.slow); updateReadout(); draw(); }
});
document.addEventListener('portfolio-motion', function(){ if(!motionAllowed()) stop(); else { tick(); start(); } });
readColors();
window.addEventListener('resize', resize);
resize();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
staticFrame();
if ('IntersectionObserver' in window) {
new IntersectionObserver(function(es) { visible = es[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
} else { visible = true; start(); }
document.addEventListener('visibilitychange', function(){ document.hidden ? stop() : start(); });

})();
