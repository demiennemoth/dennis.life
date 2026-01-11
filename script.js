// --- Background: dark soil texture (draw once) ---
const bg = document.getElementById('bgCanvas');
const bctx = bg.getContext('2d', { alpha: false });

const DPR = 1; // фикс: быстро и без ретины

function r01(){ return Math.random(); }

function resizeBG(){
  bg.width  = Math.floor(window.innerWidth * DPR);
  bg.height = Math.floor(window.innerHeight * DPR);
  drawSoil();
}
window.addEventListener('resize', resizeBG);

function drawSoil(){
  const w = bg.width, h = bg.height;

  // base gradient (almost black-brown)
  const g = bctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0, '#070604');
  g.addColorStop(0.55,'#040302');
  g.addColorStop(1, '#000000');
  bctx.fillStyle = g;
  bctx.fillRect(0,0,w,h);

  // noise layer (cheap)
  const img = bctx.getImageData(0,0,w,h);
  const data = img.data;

  // parameters tuned for "soil"
  for (let i=0; i<data.length; i+=4){
    // grain
    const n = (Math.random()*2 - 1);
    // subtle brown variation
    const base = 10 + Math.random()*18;
    let r = base + n*10;
    let gg = base*0.85 + n*9;
    let bb = base*0.65 + n*8;

    // random darker clumps
    if (Math.random() < 0.012){
      r *= 0.35; gg *= 0.35; bb *= 0.35;
    }
    // occasional lighter specks
    if (Math.random() < 0.008){
      r += 18; gg += 14; bb += 10;
    }

    data[i]   = Math.max(0, Math.min(255, r));
    data[i+1] = Math.max(0, Math.min(255, gg));
    data[i+2] = Math.max(0, Math.min(255, bb));
    data[i+3] = 255;
  }
  bctx.putImageData(img,0,0);

  // soft vignette
  const vg = bctx.createRadialGradient(w*0.5,h*0.35,0,w*0.5,h*0.5,Math.max(w,h)*0.75);
  vg.addColorStop(0,'rgba(255,255,255,0.03)');
  vg.addColorStop(1,'rgba(0,0,0,0.62)');
  bctx.fillStyle = vg;
  bctx.fillRect(0,0,w,h);
}

resizeBG();


// --- UI logic ---
const actionsEl = document.getElementById("actions");
const logEl = document.getElementById("log");
const activityNameEl = document.getElementById("activity-name");
const activityLeftEl = document.getElementById("activity-left");
const activityBarEl = document.getElementById("activity-bar");

const ACTIONS = [
  { name: "Лечь на колени", dur: 10.0, lines: ["Ты тёплая.", "Можно полежать?", "Оля, я здесь."] },
  { name: "Погладить", dur: 4.0, lines: ["Мне больно, но хорошо.", "Я помню руки.", "Я помню."] },
  { name: "Лечь спать на подушку", dur: 20.0, lines: ["Я здесь.", "Я сторожу сон.", "Мне хорошо."] },
  { name: "Поесть", dur: 6.0, lines: ["Не получается.", "Больно.", "Теперь можно."] }
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
