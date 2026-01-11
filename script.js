/* Он здесь — чистый быстрый стиль без облаков */
:root{
  --text:#f1f1f8;
  --muted:rgba(220,220,235,.70);
  --panel:rgba(0,0,0,.52);
  --panel2:rgba(0,0,0,.58);
  --border:rgba(255,255,255,.12);
  --border2:rgba(255,255,255,.18);
  --shadow:rgba(0,0,0,.65);
  --glow:rgba(190,190,255,.10);
}

*{box-sizing:border-box}
html,body{height:100%}

body{
  margin:0;
  color:var(--text);
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  overflow:hidden;
  background-color:#000;

  /* Фон: земля (webp быстрее, png запасной) */
  background-image: image-set(
    url("images/soil.webp") type("image/webp"),
    url("images/soil.png") type("image/png")
  );
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* лёгкое затемнение, чтобы текст читался */
body::before{
  content:"";
  position:fixed;
  inset:0;
  background: rgba(0,0,0,.34);
  pointer-events:none;
  z-index:0;
}

.app{
  position:relative;
  z-index:1;
  height:100vh;
  display:flex;
  flex-direction:column;
  padding: 18px 18px 22px;
  gap: 14px;
}

.header{max-width:1180px;width:100%;margin:0 auto}
.title{font-size:28px;font-weight:900;letter-spacing:.25px;line-height:1;text-shadow:0 2px 18px rgba(0,0,0,.65)}
.subtitle{margin-top:6px;color:var(--muted);font-size:14px;text-shadow:0 2px 18px rgba(0,0,0,.65)}

.grid{
  max-width:1180px;width:100%;margin:0 auto;
  flex:1;min-height:0;
  display:grid;
  grid-template-columns: 1.75fr 1fr;
  gap: 14px;
  align-items:stretch;
}

.col{min-height:0;display:flex;flex-direction:column;gap:12px}

.card{
  background: linear-gradient(180deg, var(--panel), var(--panel2));
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 18px 50px var(--shadow);
  backdrop-filter: blur(10px);
  padding: 12px 14px;
}

.label{color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.12em}
.value{font-size:16px;font-weight:900;margin-top:6px}
.small{color:var(--muted);font-size:12px;margin-top:4px}

.bar{height:10px;margin-top:10px;border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.35)}
.bar-inner{height:100%;width:0%;background:linear-gradient(90deg, rgba(230,230,255,.22), rgba(150,150,210,.62))}

.quoteText{color:rgba(240,240,252,.90);font-style:italic}

.pTitle{color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px}

.profileGrid{display:grid;grid-template-columns: 1fr 220px;gap:12px;align-items:center}
.pName{font-size:16px;font-weight:900}
.pQuote{margin-top:3px;color:rgba(230,230,246,.85);font-style:italic}
.pMeta{margin-top:8px;display:grid;gap:5px;color:rgba(235,235,250,.84);font-size:13px}
.pFoot{margin-top:8px;color:rgba(215,215,235,.75);font-size:13px}
.dennisImg{width:100%;max-width:220px;height:auto;display:block;filter:drop-shadow(0 16px 34px rgba(0,0,0,.70))}

.voice{
  flex:1;min-height:0;
  border-color: rgba(200,200,255,.18);
  box-shadow: 0 18px 60px rgba(0,0,0,.70), 0 0 34px var(--glow);
}
.log{
  height:100%;min-height:0;overflow:auto;
  padding: 8px 10px;
  border-radius: 14px;
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.10);
  font-family: ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:12px;line-height:1.4;
}
.whisper{color:rgba(205,205,230,.72);font-style:italic}

.actionsCard{flex:1;min-height:0;display:flex;flex-direction:column}
.actions{margin-top:10px;display:flex;flex-direction:column;gap:10px;min-height:0;overflow:auto;padding-right:2px}
button{
  width:100%;
  cursor:pointer;
  padding:10px 12px;
  border-radius:16px;
  border:1px solid var(--border2);
  background: rgba(20,20,26,.78);
  color:var(--text);
  font-size:13px;
  transition: transform .12s ease, background .12s ease, border-color .12s ease;
}
button:hover{transform:translateY(-1px);background:rgba(34,34,44,.84);border-color:rgba(255,255,255,.26)}
button:active{transform:translateY(0) scale(.99)}

@media (max-width: 900px){
  body{ overflow:auto; }
  .app{ height:auto; }
  .grid{ grid-template-columns: 1fr; }
  .voice{ min-height: 240px; }
  .actions{ overflow:visible; }
  .profileGrid{ grid-template-columns: 1fr; }
  .profileArt{ justify-self:start; }
}
