/* ================= OLAM HATORAH: a round, spinning earth; every subject is a continent ================= */
const GLOBE_LANDS={
 mishnayos:{la:18,lo:0,r:30,seed:3,icon:"shul",name:"Shas Mishnayos"},
 gemara:{la:-22,lo:72,r:24,seed:11,icon:"yeshiva",name:"Gemara"},
 chumash:{la:26,lo:146,r:27,seed:5,icon:"creation",name:"Chumash"},
 tanakh:{la:-18,lo:-142,r:24,seed:17,icon:"walls",name:"Nach"},
 halacha:{la:44,lo:-74,r:20,seed:23,icon:"book",name:"Halacha"},
 mussar:{la:-46,lo:-34,r:15,seed:29,icon:"mikdash",name:"Mussar"}};
let GL=null;
function globeView(){
 const R=150,D2R=Math.PI/180;
 const lands=SUBJECTS.filter(s=>GLOBE_LANDS[s.id]).map(s=>{const g=GLOBE_LANDS[s.id],live=!!(s.live&&COURSES[s.id]),W=WORLDS[s.id]||{};
  let pct=0;if(live){const c=COURSES[s.id],P=c.units.map(u=>{const n=u.nodes.length,d=u.nodes.filter(x=>S.lessons[x.id]?.done).length;return d/n});pct=Math.round(P.reduce((a,b)=>a+b,0)/P.length*100)}
  const here=LT.room?LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.pos&&p.presence.pos.c===s.id).length:0;
  /* coastline in lat/lon */
  let sd=g.seed;const rnd=()=>(sd=(sd*9301+49297)%233280)/233280;const N=44,amp=Array.from({length:6},()=>rnd()*.22),ph=Array.from({length:6},()=>rnd()*6.28);
  const ring=k=>Array.from({length:N},(_,i)=>{const a=i/N*6.28;let f=1;for(let j=0;j<6;j++)f+=amp[j]*Math.sin(a*(j+2)+ph[j])*.5;const rr=g.r*f*k;return [g.la+rr*Math.sin(a),g.lo+rr*Math.cos(a)/Math.cos(g.la*D2R)]});
  const deco=(W.deco||["olive","bush","house","rocks"]);
  const pts=Array.from({length:16},(_,i)=>{const a=rnd()*6.28,rr=Math.sqrt(rnd())*g.r*.62;return {la:g.la+rr*Math.sin(a),lo:g.lo+rr*Math.cos(a)/Math.cos(g.la*D2R),w:deco[i%deco.length]}});
  return {...g,id:s.id,he:s.he,en:s.en,live,pct,here,plan:s.plan||[],desc:s.desc||"",c:live?(W.ground||"#8FBF5A"):"#B9BFAE",c2:live?(W.ground2||"#7FAF4A"):"#A7AD9C",
   shore:ring(1.12),body:ring(1),core:ring(.6),hills:Array.from({length:3},()=>{const a=rnd()*6.28,rr=rnd()*g.r*.45;return {la:g.la+rr*Math.sin(a),lo:g.lo+rr*Math.cos(a)/Math.cos(g.la*D2R)}}),pts}});
 const mine=GLOBE_LANDS[CRS.id]||GLOBE_LANDS.mishnayos;
 GL={lon:mine.lo,lat:Math.max(-35,Math.min(35,mine.la)),s:1,spin:1,anim:0,lands};
 const stars=Array.from({length:70},(_,k)=>`<circle class="tw" style="animation-delay:${(k*.37%3).toFixed(2)}s" cx="${((k*137)%800-400)}" cy="${((k*251)%800-400)}" r="${(k%5?1:1.8)}" fill="#FFF" opacity=".8"/>`).join("");
 const lay=$("#layer");lay.innerHTML=`<div class="zoomv globev" role="dialog" aria-modal="true" aria-label="Olam HaTorah"><div class="zv-h wrap"><div><small>The whole world</small><h2>Olam HaTorah</h2><p>Spin the earth. Tap a continent to land there.</p></div><span class="he">עולם התורה</span><button class="iconbtn" id="gclose" aria-label="Close">✕</button></div>
  <div class="zv-b gbox" id="gbox"><svg id="gsvg" class="gsvg" viewBox="-200 -200 400 400" preserveAspectRatio="xMidYMid meet">
   <defs><radialGradient id="gsea" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#8FD0FF"/><stop offset=".55" stop-color="#3E86D0"/><stop offset="1" stop-color="#1D4E8C"/></radialGradient>
    <radialGradient id="gshade" cx="35%" cy="30%" r="80%"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#061230" stop-opacity=".55"/></radialGradient>
    <radialGradient id="gair" r="50%"><stop offset=".86" stop-color="#9CD4FF" stop-opacity=".0"/><stop offset=".9" stop-color="#9CD4FF" stop-opacity=".55"/><stop offset="1" stop-color="#9CD4FF" stop-opacity="0"/></radialGradient>
    <clipPath id="gclip"><circle r="${R}"/></clipPath></defs>
   <g class="gstars">${stars}</g>
   <g id="gw"><circle r="${R*1.16}" fill="url(#gair)"/><circle r="${R}" fill="url(#gsea)"/>
    <g clip-path="url(#gclip)"><path id="ggrid" fill="none" stroke="#BFE0FF" stroke-width=".6" opacity=".35"/><path id="gwaves" fill="none" stroke="#DDF0FF" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
     ${lands.map((L,i)=>`<g class="gland ${L.live?"live":"soon"}" data-g="${i}"><path class="gl-sh" fill="#EBD9A6"/><path class="gl-b" fill="${L.c}"/><path class="gl-c" fill="${L.c2}" opacity=".9"/>${L.hills.map(()=>`<g class="gl-h">${WD.mountain}</g>`).join("")}${L.pts.map(p=>`<g class="gl-d">${WD[p.w]||""}</g>`).join("")}<g class="gl-m">${MI[L.icon]||""}</g></g>`).join("")}
     <g id="gclouds">${[0,1,2,3,4,5].map(()=>`<g class="gl-cl" opacity=".85">${WD.cloud.replace(/class="drift"/,"")}</g>`).join("")}</g>
     <circle r="${R}" fill="url(#gshade)" pointer-events="none"/></g>
    <circle r="${R}" fill="none" stroke="#0E2A55" stroke-opacity=".35" stroke-width="1.5"/>
    <g id="glabels">${lands.map((L,i)=>`<g class="glab ${L.live?"live":"soon"}" data-g="${i}"><rect x="-56" y="-15" width="112" height="${L.live?40:34}" rx="12" fill="${L.live?"rgba(255,248,231,.95)":"rgba(255,255,255,.8)"}" stroke="${L.live?"#C9A34A":"rgba(0,0,0,.2)"}" stroke-width="1.5"/><text y="1" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="13" fill="#16213A">${L.he}</text><text y="13" text-anchor="middle" font-size="8.5" font-weight="800" fill="#3A4664">${esc(L.name)}</text>${L.live?`<text y="22" text-anchor="middle" font-size="7.5" font-weight="700" fill="#7A6A3A">${L.pct}% learned${L.here?` · ${L.here} here now`:""}</text>`:`<text y="22" text-anchor="middle" font-size="7.5" font-weight="700" fill="#7E8AA8">Coming soon</text>`}${L.id===CRS.id?`<g transform="translate(46 -16)"><path d="M0 0v-16" stroke="#3A2A1A" stroke-width="1.6"/><path d="M0 -16h11l-3 4 3 4H0z" fill="#E5533D"/></g>`:""}</g>`).join("")}</g></g>
  </svg>
  <div class="gcard" id="gcard" hidden></div>
  <div class="gchips">${lands.map((L,i)=>`<button class="mtab ${L.id===CRS.id?"on":""}" data-gc="${i}">${esc(L.name)}</button>`).join("")}</div>
  <div class="mctl"><button class="iconbtn" id="gzi" aria-label="Zoom in">+</button><button class="iconbtn" id="gzo" aria-label="Zoom out">−</button><button class="btn sm" id="gme">My place</button></div></div></div>`;
 document.body.style.overflow="hidden";
 const svg=$("#gsvg"),gw=$("#gw"),Q=s=>[...svg.querySelectorAll(s)];
 const landEls=Q(".gland"),labEls=Q(".glab"),cloudEls=Q(".gl-cl");
 const proj=(la,lo)=>{const p=la*D2R,l=(lo-GL.lon)*D2R,p0=GL.lat*D2R;const cc=Math.sin(p0)*Math.sin(p)+Math.cos(p0)*Math.cos(p)*Math.cos(l);
  return [R*Math.cos(p)*Math.sin(l),-R*(Math.cos(p0)*Math.sin(p)-Math.sin(p0)*Math.cos(p)*Math.cos(l)),cc]};
 const pathOf=ring=>{let vis=0;const P=ring.map(([la,lo])=>{let [x,y,c]=proj(la,lo);if(c>0)vis++;else{const m=Math.hypot(x,y)||1;x=x/m*R;y=y/m*R}return [x,y]});if(!vis)return "";
  let d=`M${((P[P.length-1][0]+P[0][0])/2).toFixed(1)} ${((P[P.length-1][1]+P[0][1])/2).toFixed(1)}`;for(let i=0;i<P.length;i++){const p=P[i],q=P[(i+1)%P.length];d+=`Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0]+q[0])/2).toFixed(1)} ${((p[1]+q[1])/2).toFixed(1)}`}return d+"z"};
 const place=(el,la,lo,sc,min)=>{const [x,y,c]=proj(la,lo);if(c<(min||.12)){el.style.display="none";return c}el.style.display="";const k=sc*(.45+.55*c);el.setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(k*Math.sqrt(c)).toFixed(3)} ${k.toFixed(3)})`);return c};
 const t0=performance.now();
 const draw=()=>{gw.setAttribute("transform",`scale(${GL.s.toFixed(3)})`);svg.classList.toggle("gnear",GL.s>1.5);
  /* graticule and wave strokes */
  let g="";for(let lo=-180;lo<180;lo+=30){let d="",pen=0;for(let la=-80;la<=80;la+=10){const [x,y,c]=proj(la,lo);if(c>0){d+=`${pen?"L":"M"}${x.toFixed(1)} ${y.toFixed(1)}`;pen=1}else pen=0}g+=d}
  for(let la=-60;la<=60;la+=30){let d="",pen=0;for(let lo=-180;lo<=180;lo+=10){const [x,y,c]=proj(la,lo);if(c>0){d+=`${pen?"L":"M"}${x.toFixed(1)} ${y.toFixed(1)}`;pen=1}else pen=0}g+=d}
  $("#ggrid").setAttribute("d",g);
  const tt=(performance.now()-t0)/1000;let w="";for(let k=0;k<26;k++){const la=((k*53)%140)-70,lo=((k*97)%360)-180+Math.sin(tt*.6+k)*3,[x,y,c]=proj(la,lo);if(c>.2)w+=`M${(x-4).toFixed(1)} ${y.toFixed(1)}q2-2 4 0t4 0`}$("#gwaves").setAttribute("d",w);
  GL.lands.forEach((L,i)=>{const el=landEls[i];el.querySelector(".gl-sh").setAttribute("d",pathOf(L.shore));el.querySelector(".gl-b").setAttribute("d",pathOf(L.body));el.querySelector(".gl-c").setAttribute("d",pathOf(L.core));
   el.querySelectorAll(".gl-h").forEach((h,k)=>place(h,L.hills[k].la,L.hills[k].lo,.9));
   el.querySelectorAll(".gl-d").forEach((h,k)=>place(h,L.pts[k].la,L.pts[k].lo,.42,.3));
   place(el.querySelector(".gl-m"),L.la+L.r*.1,L.lo,.62,.2);
   const lab=labEls[i],[x,y,c]=proj(L.la-L.r*.42,L.lo);if(c<.35){lab.style.display="none"}else{lab.style.display="";lab.setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${((.55+.45*c)/Math.max(1,GL.s*.8)).toFixed(3)})`);lab.style.opacity=Math.min(1,(c-.35)*4)}});
  cloudEls.forEach((el,k)=>place(el,((k*41)%100)-50,((k*67)%360)-180+tt*(2+k%3),.9+k%2*.4,.05))};
 /* animation loop: idle spin, fly-to */
 let fly=null,last=performance.now(),loop=0;
 const tick=t=>{if(!GL)return;const dt=Math.min(.05,(t-last)/1000);last=t;
  if(fly){const k=Math.min(1,(t-fly.t0)/fly.ms),q=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;GL.lon=fly.a.lon+fly.dl*q;GL.lat=fly.a.lat+(fly.b.lat-fly.a.lat)*q;GL.s=fly.a.s+(fly.b.s-fly.a.s)*q;if(k>=1){const cb=fly.cb;fly=null;cb&&cb()}}
  else if(GL.spin&&!drag)GL.lon-=dt*5;
  draw();loop=requestAnimationFrame(tick)};
 const flyTo=(lat,lon,s,ms,cb)=>{let dl=((lon-GL.lon)%360+540)%360-180;fly={a:{lon:GL.lon,lat:GL.lat,s:GL.s},b:{lat,s},dl,t0:performance.now(),ms:ms||900,cb};GL.spin=0};
 /* pointer: drag to spin, pinch/wheel to zoom, tap to choose */
 const pts=new Map();let drag=0,moved=0,pinch0=null;
 svg.addEventListener("pointerdown",e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);drag=1;moved=0;GL.spin=0;fly=null;if(pts.size===2){const [p,q]=[...pts.values()];pinch0={d:Math.hypot(p[0]-q[0],p[1]-q[1]),s:GL.s}}});
 svg.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
  if(pts.size===2&&pinch0){const [p,q]=[...pts.values()];GL.s=Math.max(.8,Math.min(3,pinch0.s*Math.hypot(p[0]-q[0],p[1]-q[1])/pinch0.d));moved+=5;return}
  const r=svg.getBoundingClientRect(),k=360/Math.min(r.width,r.height)/GL.s*.55;GL.lon-=(e.clientX-prev[0])*k;GL.lat=Math.max(-60,Math.min(60,GL.lat+(e.clientY-prev[1])*k));moved+=Math.abs(e.clientX-prev[0])+Math.abs(e.clientY-prev[1])});
 const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch0=null;if(!pts.size)drag=0};svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
 svg.addEventListener("wheel",e=>{e.preventDefault();GL.s=Math.max(.8,Math.min(3,GL.s*(e.deltaY>0?1/1.12:1.12)))},{passive:false});
 const close=()=>{cancelAnimationFrame(loop);GL=null;lay.innerHTML="";document.body.style.overflow=""};
 const card=L=>{const c=$("#gcard");c.innerHTML=`<div class="mc-h"><div><b>${esc(L.name)}</b><small>${esc(L.desc)}</small></div><span class="he">${L.he}</span><button class="iconbtn" id="gcx" aria-label="Close">✕</button></div>
   ${L.live?`<div class="mc-open"><button class="btn" id="gland">Land in ${esc(L.name)} →</button></div>`:`<p class="mc-soon">This continent is still being built. Planned:</p><ul class="gplan">${L.plan.map(p=>`<li>${esc(p)}</li>`).join("")}</ul>`}`;c.hidden=false;
  $("#gcx").onclick=()=>c.hidden=true;if(L.live)$("#gland").onclick=()=>land(L)};
 const land=L=>{$("#gcard").hidden=true;svg.classList.add("glanding");flyTo(L.la,L.lo,3.2,800,()=>{close();if(S.course!==L.id){S.course=L.id;save()}tab="learn";render();setTimeout(shasMap,40)})};
 const choose=i=>{const L=GL.lands[i];Q(".gchips .mtab").forEach((b,k)=>b.classList.toggle("on",k===i));flyTo(Math.max(-40,Math.min(40,L.la)),L.lo,1.35,900,()=>card(L))};
 svg.addEventListener("click",e=>{if(moved>8)return;const t=e.target.closest(".gland,.glab");if(t){choose(+t.dataset.g);return}$("#gcard").hidden=true});
 Q(".gchips .mtab").forEach(b=>b.onclick=()=>choose(+b.dataset.gc));
 $("#gclose").onclick=close;$("#gzi").onclick=()=>GL.s=Math.min(3,GL.s*1.25);$("#gzo").onclick=()=>GL.s=Math.max(.8,GL.s/1.25);
 $("#gme").onclick=()=>{const i=GL.lands.findIndex(L=>L.id===CRS.id);if(i>=0)choose(i)};
 loop=requestAnimationFrame(tick)}
KF.push(`.gbox{position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 40%,#1B2B57,#070B1C 75%);touch-action:none}
.gsvg{width:100%;height:100%;display:block;cursor:grab;user-select:none;-webkit-user-select:none}
.gland{cursor:pointer}.gland.soon{filter:saturate(.35)}.glab{cursor:pointer}
.gsvg .gl-d{display:none}.gsvg.gnear .gl-d{display:inline}
.glanding{transition:filter .8s}.glanding{filter:brightness(1.25)}
.gchips{position:absolute;left:0;right:0;top:8px;display:flex;gap:6px;overflow-x:auto;padding:0 10px;scrollbar-width:none}.gchips::-webkit-scrollbar{display:none}
.gcard{position:absolute;left:10px;right:10px;bottom:64px;background:var(--surface);color:var(--ink);border:2px solid var(--line);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.35);padding:12px;z-index:3;animation:zin .25s ease-out}.gcard[hidden]{display:none}
.gcard .mc-h small{white-space:normal}.gplan{margin:4px 0 0;padding-left:18px;font-size:13px}.gcard #gland{width:100%}`);
