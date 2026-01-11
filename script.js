
:root{
  --t:#f1f1f8;
  --m:rgba(210,210,230,.72);
  --sh:rgba(0,0,0,.78);
}

*{box-sizing:border-box}
html,body{height:100%}

body{
  margin:0;
  color:var(--t);
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  background:#000;
  overflow-x:hidden;
  text-shadow: 0 1px 10px rgba(0,0,0,.65);
}

#cloudCanvas{
  position:fixed;
  inset:0;
  z-index:-2;
  opacity:1;
}

.wrap{
  max-width: 1100px;
  margin: 22px auto;
  padding: 10px 12px;
}

.cloud-window{
  position: relative;
  width: min(1100px, 96vw);
  margin: 0 auto;
  padding: 92px 120px 105px;
  background-image: url("assets/cloud_window.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  filter: drop-shadow(0 30px 65px var(--sh));
}

@media (max-width: 900px){
  .cloud-window{ padding: 72px 64px 82px; }
}
@media (max-width: 520px){
  .cloud-window{ padding: 56px 28px 64px; background-size: cover; }
}

.top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.h1{font-size:28px;font-weight:800;letter-spacing:.2px}
.sub{color:var(--m);font-size:14px;margin-top:2px}

.grid{display:grid;grid-template-columns:1.7fr 1fr;gap:18px}
@media (max-width:900px){.grid{grid-template-columns:1fr}}

.card{ background: transparent; border: 0; box-shadow: none; padding: 10px 4px; }
.quote{ padding-top: 14px; }
.quoteText{color:rgba(235,235,250,.88);font-style:italic}

.label{color:var(--m);font-size:12px;text-transform:uppercase;letter-spacing:.12em}
.value{font-size:18px;font-weight:700;margin-top:6px}
.small{color:var(--m);font-size:12px;margin-top:4px}

.bar{
  height:10px;
  background:rgba(0,0,0,.38);
  border:1px solid rgba(255,255,255,.10);
  border-radius:999px;
  margin-top:10px;
  overflow:hidden
}
.bar-inner{
  height:100%;
  width:0%;
  background:linear-gradient(90deg,rgba(210,210,255,.22),rgba(140,140,190,.58))
}

.actions{ display:flex; flex-direction:column; gap:10px; margin-top:10px }
button{
  cursor:pointer;
  width:100%;
  background:rgba(18,18,26,.72);
  border:1px solid rgba(255,255,255,.16);
  color:var(--t);
  border-radius:16px;
  padding:11px 14px;
  transition:transform .12s ease, background .12s ease, border-color .12s ease
}
button:hover{transform:translateY(-1px);background:rgba(28,28,40,.78);border-color:rgba(255,255,255,.22)}
button:active{transform:translateY(0) scale(.99)}

.log{
  height:220px;
  overflow:auto;
  padding: 6px 2px 0;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:12px;
  line-height:1.35
}
.whisper{color:rgba(200,200,230,.70);font-style:italic}

.pTitle{color:var(--m);font-size:12px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:10px}
.pName{font-size:18px;font-weight:800}
.pQuote{color:rgba(225,225,245,.82);font-style:italic;margin-top:4px}

.profile-grid{ display:grid; grid-template-columns: 1fr 260px; gap: 14px; align-items: center; }
@media (max-width: 720px){
  .profile-grid{ grid-template-columns: 1fr; }
  .profile-art{ order: -1; justify-self: start; }
}

.pMeta{margin-top:10px;color:rgba(230,230,250,.82);display:grid;gap:6px}
.pFoot{margin-top:10px;color:rgba(210,210,230,.72)}

.dennis-img{
  width: 100%;
  max-width: 260px;
  height: auto;
  display:block;
  filter: drop-shadow(0 18px 35px rgba(0,0,0,.65));
}
