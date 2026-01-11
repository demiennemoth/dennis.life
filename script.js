
// --- Canvas clouds background (макет 3) ---
const c = document.getElementById('cloudCanvas');
const ctx = c.getContext('2d');

function resize(){
  c.width = window.innerWidth * devicePixelRatio;
  c.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener('resize', resize);
resize();

let t = 0;
const blobs = Array.from({length: 220}, () => ({
  x: Math.random()*1.2 - 0.1,
  y: Math.random()*0.9,
  r: 0.08 + Math.random()*0.22,
  a: 0.02 + Math.random()*0.05,
  s: 0.002 + Math.random()*0.006
}));

function draw(){
  t += 0.0025;
  const w = c.width, h = c.height;

  // sky gradient
  const g = ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'#0a0a16');
  g.addColorStop(0.55,'#04040b');
  g.addColorStop(1,'#000000');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.filter = `blur(${22*devicePixelRatio}px)`;

  for (const b of blobs){
    const x = ((b.x + (t*b.s)) % 1.3) * w;
    const y = b.y * h;
    const r = b.r * Math.max(w,h);
    const gg = ctx.createRadialGradient(x,y,0,x,y,r);
    gg.addColorStop(0, `rgba(210,210,245,${b.a})`);
    gg.addColorStop(1, `rgba(210,210,245,0)`);
    ctx.fillStyle = gg;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  }
  ctx.restore();

  // subtle vignette
  const vg = ctx.createRadialGradient(w*0.5,h*0.15,0,w*0.5,h*0.35,Math.max(w,h)*0.75);
  vg.addColorStop(0,'rgba(255,255,255,0.06)');
  vg.addColorStop(1,'rgba(0,0,0,0.35)');
  ctx.fillStyle = vg;
  ctx.fillRect(0,0,w,h);

  requestAnimationFrame(draw);
}
draw();

// --- UI logic ---
const actionsEl = document.getElementById("actions");
const logEl = document.getElementById("log");
const activityNameEl = document.getElementById("activity-name");
const activityLeftEl = document.getElementById("activity-left");
const activityBarEl = document.getElementById("activity-bar");

const ACTIONS = [
  { name: "Поесть", dur: 6.0, lines: ["Не получается.", "Больно.", "Теперь можно."] },
  { name: "Лечь на колени", dur: 10.0, lines: ["Ты тёплая.", "Можно полежать?", "Оля, я здесь."] },
  { name: "Лечь спать на подушку", dur: 20.0, lines: ["Я здесь.", "Я сторожу сон.", "Мне хорошо."] },
  { name: "Погладить", dur: 4.0, lines: ["Мне больно, но хорошо.", "Я помню руки.", "Я помню."] }
];

let current = null;
let last = performance.now();

function logLine(t, cls="") {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  d.textContent = t;
  logEl.appendChild(d);
  logEl.scrollTop = logEl.scrollHeight;
}
function fmt(ms){
  const s = Math.max(0, Math.round(ms/1000));
  const mm = String(Math.floor(s/60)).padStart(2,"0");
  const ss = String(s%60).padStart(2,"0");
  return `${mm}:${ss}`;
}
function startAction(a) {
  if (current) { logLine("Сначала закончи текущее.", "whisper"); return; }
  current = { ...a, left: a.dur*1000, total: a.dur*1000 };
  activityNameEl.textContent = a.name;
  logLine("Начал(а): " + a.name + " (≈ " + fmt(current.left) + ").", "whisper");
}
function tick(now){
  const dt = now - last; last = now;
  if (current){
    current.left -= dt;
    activityLeftEl.textContent = fmt(current.left);
    const pct = (1 - (current.left/current.total))*100;
    activityBarEl.style.width = Math.min(100, Math.max(0,pct)) + "%";
    if (current.left <= 0){
      const line = current.lines[Math.floor(Math.random()*current.lines.length)];
      logLine(line);
      logLine("Завершено: " + current.name + ".", "whisper");
      current = null;
      activityNameEl.textContent = "—";
      activityLeftEl.textContent = "—";
      activityBarEl.style.width = "0%";
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

ACTIONS.forEach(a => {
  const b = document.createElement("button");
  b.textContent = a.name;
  b.onclick = () => startAction(a);
  actionsEl.appendChild(b);
});

logLine("Он здесь.", "whisper");
