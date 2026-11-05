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
 const R=150,D2R=Math.PI/180;socLoad();
 const chipTo=t=>{const c=Object.values(COURSES).find(c=>c.chip.t===t);return c?c.id:null};
 const GPP=socAll().map((p,k)=>{const id=p.card.courseId||chipTo(p.card.course)||"mishnayos",g=GLOBE_LANDS[id]||GLOBE_LANDS.mishnayos,a=k*2.4,r=g.r*.35*(.5+(k%3)*.25);return {p,online:p.online,card:p.card,la:g.la+r*Math.sin(a),lo:g.lo+r*Math.cos(a)}}).slice(0,40);
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
 const lay=$("#layer");lay.innerHTML=`<div class="zoomv globev" role="dialog" aria-modal="true" aria-label="Olam HaTorah"><div class="zv-h wrap"><div><small>The whole world</small><h2>Olam HaTorah</h2><p>Walk your avatar around the world, or spin it and tap a land${socAll().length?`, or a learner to say hi`:""}.</p></div><span class="he">עולם התורה</span><button class="iconbtn" id="gclose" aria-label="Close">✕</button></div>
  <div class="zv-b gbox" id="gbox"><svg id="gsvg" class="gsvg" viewBox="-172 -178 344 356" preserveAspectRatio="xMidYMid meet">
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
    <g id="gpeople">${GPP.map((p,i)=>`<g class="gp" data-gp="${i}"><circle r="13" fill="#FFF" stroke="${p.online?"#2E9E5B":"#C9A34A"}" stroke-width="3"/><svg x="-12" y="-13" width="24" height="26" viewBox="-30 -108 60 112">${avatar(Object.assign({},p.card.av||{},{base:profile()||"man"}))}</svg></g>`).join("")}</g>
    <g id="glabels">${lands.map((L,i)=>`<g class="glab ${L.live?"live":"soon"}" data-g="${i}"><rect x="-56" y="-15" width="112" height="${L.live?40:34}" rx="12" fill="${L.live?"rgba(255,248,231,.95)":"rgba(255,255,255,.8)"}" stroke="${L.live?"#C9A34A":"rgba(0,0,0,.2)"}" stroke-width="1.5"/><text y="1" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="13" fill="#16213A">${L.he}</text><text y="13" text-anchor="middle" font-size="8.5" font-weight="800" fill="#3A4664">${esc(L.name)}</text>${L.live?`<text y="22" text-anchor="middle" font-size="7.5" font-weight="700" fill="#7A6A3A">${L.pct}% learned${L.here?` · ${L.here} here now`:""}</text>`:`<text y="22" text-anchor="middle" font-size="7.5" font-weight="700" fill="#7E8AA8">Coming soon</text>`}${L.id===CRS.id?`<g transform="translate(46 -16)"><path d="M0 0v-16" stroke="#3A2A1A" stroke-width="1.6"/><path d="M0 -16h11l-3 4 3 4H0z" fill="#E5533D"/></g>`:""}</g>`).join("")}</g></g>
  </svg>
  <div class="gcard" id="gcard" hidden></div>
  <div class="gchips">${lands.map((L,i)=>`<button class="mtab ${L.id===CRS.id?"on":""}" data-gc="${i}">${esc(L.name)}</button>`).join("")}</div>
  <div class="mctl"><button class="iconbtn" id="gzi" aria-label="Zoom in">+</button><button class="iconbtn" id="gzo" aria-label="Zoom out">−</button><button class="btn sm" id="gme">My place</button></div></div></div>`;
 document.body.style.overflow="hidden";
 const svg=$("#gsvg"),gw=$("#gw"),Q=s=>[...lay.querySelectorAll(s)];const gpEls=Q(".gp");
 const landEls=Q(".gland"),labEls=Q(".glab"),cloudEls=Q(".gl-cl");
 const proj=(la,lo)=>{const p=la*D2R,l=(lo-GL.lon)*D2R,p0=GL.lat*D2R;const cc=Math.sin(p0)*Math.sin(p)+Math.cos(p0)*Math.cos(p)*Math.cos(l);
  return [R*Math.cos(p)*Math.sin(l),-R*(Math.cos(p0)*Math.sin(p)-Math.sin(p0)*Math.cos(p)*Math.cos(l)),cc]};
 const pathOf=ring=>{let vis=0;const P=ring.map(([la,lo])=>{let [x,y,c]=proj(la,lo);if(c>0)vis++;else{const m=Math.hypot(x,y)||1;x=x/m*R;y=y/m*R}return [x,y]});if(!vis)return "";
  let d=`M${((P[P.length-1][0]+P[0][0])/2).toFixed(1)} ${((P[P.length-1][1]+P[0][1])/2).toFixed(1)}`;for(let i=0;i<P.length;i++){const p=P[i],q=P[(i+1)%P.length];d+=`Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0]+q[0])/2).toFixed(1)} ${((p[1]+q[1])/2).toFixed(1)}`}return d+"z"};
 const place=(el,la,lo,sc,min)=>{const [x,y,c]=proj(la,lo);if(c<(min||.12)){el.style.display="none";return c}el.style.display="";const k=sc*(.45+.55*c);el.setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(k*Math.sqrt(c)).toFixed(3)} ${k.toFixed(3)})`);return c};
 const t0=performance.now();
 const draw=()=>{gw.setAttribute("transform",`scale(${GL.s.toFixed(3)})`);svg.classList.toggle("gnear",GL.s>1.25);
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
  cloudEls.forEach((el,k)=>place(el,((k*41)%100)-50,((k*67)%360)-180+tt*(2+k%3),.9+k%2*.4,.05));gpEls.forEach((el,i)=>place(el,GPP[i].la,GPP[i].lo,.7,.3))};
 /* animation loop: idle spin, fly-to */
 let fly=null,last=performance.now(),loop=0;
 const tick=t=>{if(!GL)return;const dt=Math.min(.05,(t-last)/1000);last=t;
  if(fly){const k=Math.min(1,(t-fly.t0)/fly.ms),q=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;GL.lon=fly.a.lon+fly.dl*q;GL.lat=fly.a.lat+(fly.b.lat-fly.a.lat)*q;GL.s=fly.a.s+(fly.b.s-fly.a.s)*q;if(k>=1){const cb=fly.cb;fly=null;cb&&cb();if(!GL)return}}
  else if(GL.spin&&!drag)GL.lon-=dt*5;
  if(GLW)GLW(dt);
  draw();loop=requestAnimationFrame(tick)};
 const flyTo=(lat,lon,s,ms,cb)=>{let dl=((lon-GL.lon)%360+540)%360-180;fly={a:{lon:GL.lon,lat:GL.lat,s:GL.s},b:{lat,s},dl,t0:performance.now(),ms:ms||900,cb};GL.spin=0};
 /* pointer: drag to spin, pinch/wheel to zoom, tap to choose */
 const pts=new Map();let drag=0,moved=0,pinch0=null;
 svg.addEventListener("pointerdown",e=>{svg.__pid=e.pointerId;svg.__cap=false;pts.set(e.pointerId,[e.clientX,e.clientY]);drag=1;moved=0;GL.spin=0;fly=null;if(pts.size===2){const [p,q]=[...pts.values()];pinch0={d:Math.hypot(p[0]-q[0],p[1]-q[1]),s:GL.s}}});
 svg.addEventListener("pointermove",e=>{if(!svg.__cap&&e.buttons){try{svg.setPointerCapture(e.pointerId)}catch(x){}svg.__cap=true}if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
  if(pts.size===2&&pinch0){const [p,q]=[...pts.values()];GL.s=Math.max(.8,Math.min(3,pinch0.s*Math.hypot(p[0]-q[0],p[1]-q[1])/pinch0.d));moved+=5;return}
  const r=svg.getBoundingClientRect(),k=360/Math.min(r.width,r.height)/GL.s*.55;GL.lon-=(e.clientX-prev[0])*k;GL.lat=Math.max(-60,Math.min(60,GL.lat+(e.clientY-prev[1])*k));moved+=Math.abs(e.clientX-prev[0])+Math.abs(e.clientY-prev[1])});
 const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch0=null;if(!pts.size)drag=0};svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
 svg.addEventListener("wheel",e=>{e.preventDefault();GL.s=Math.max(.8,Math.min(3,GL.s*(e.deltaY>0?1/1.12:1.12)))},{passive:false});
 const close=()=>{try{unW()}catch(e){}cancelAnimationFrame(loop);GL=null;lay.innerHTML="";document.body.style.overflow=""};
 const card=L=>{const c=$("#gcard");c.innerHTML=`<div class="mc-h"><div><b>${esc(L.name)}</b><small>${esc(L.desc)}</small></div><span class="he">${L.he}</span><button class="iconbtn" id="gcx" aria-label="Close">✕</button></div>
   ${L.live?`<div class="mc-open"><button class="btn" id="gland">Land in ${esc(L.name)} →</button></div>`:`<p class="mc-soon">This continent is still being built. Planned:</p><ul class="gplan">${L.plan.map(p=>`<li>${esc(p)}</li>`).join("")}</ul>`}`;c.hidden=false;
  $("#gcx").onclick=()=>c.hidden=true;if(L.live)$("#gland").onclick=()=>land(L)};
 const land=L=>{$("#gcard").hidden=true;svg.classList.add("glanding");flyTo(L.la,L.lo,3.2,800,()=>{close();if(S.course!==L.id){S.course=L.id;save()}tab="learn";render();setTimeout(shasMap,40)})};
 const choose=i=>{const L=GL.lands[i];Q(".gchips .mtab").forEach((b,k)=>b.classList.toggle("on",k===i));if(L.live){land(L);return}flyTo(Math.max(-40,Math.min(40,L.la)),L.lo,1.35,900,()=>card(L))};
 svg.addEventListener("click",e=>{if(moved>8)return;const gp=e.target.closest(".gp");if(gp){const p=GPP[+gp.dataset.gp].p;close();learnerSheet(p);return}const t=e.target.closest(".gland,.glab");if(t){choose(+t.dataset.g);return}$("#gcard").hidden=true});
 Q(".gchips .mtab").forEach(b=>b.onclick=()=>choose(+b.dataset.gc));
 $("#gclose").onclick=close;$("#gzi").onclick=()=>GL.s=Math.min(3,GL.s*1.25);$("#gzo").onclick=()=>GL.s=Math.max(.8,GL.s/1.25);
 $("#gme").onclick=()=>{const i=GL.lands.findIndex(L=>L.id===CRS.id);if(i>=0)choose(i)};
 const unW=globeWalk({lay,svg,land});
 loop=requestAnimationFrame(tick)}
(()=>{const st=document.createElement("style");st.textContent=`.gbox{position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 40%,#1B2B57,#070B1C 75%);touch-action:none}
.gsvg{width:100%;height:100%;display:block;cursor:grab;user-select:none;-webkit-user-select:none}
.gland{cursor:pointer}.gland.soon{filter:saturate(.35)}.glab{cursor:pointer}
.gsvg .gl-d{display:none}.gsvg.gnear .gl-d{display:inline}
.glanding{transition:filter .8s}.glanding{filter:brightness(1.25)}
.gchips{position:absolute;left:0;right:0;top:8px;z-index:2;display:flex;gap:6px;overflow-x:auto;padding:0 10px;scrollbar-width:none}.gchips::-webkit-scrollbar{display:none}
.gcard{position:absolute;left:10px;right:10px;bottom:64px;background:var(--surface);color:var(--ink);border:2px solid var(--line);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.35);padding:12px;z-index:3;animation:zin .25s ease-out}.gcard[hidden]{display:none}
.gcard .mc-h small{white-space:normal}.gplan{margin:4px 0 0;padding-left:18px;font-size:13px}.gcard #gland{width:100%}`;document.head.appendChild(st)})();
let MV=null;
function shasMap(){const M=mapModel();if(!M)return;const DET=mapDetail(M);
 let land="",sea="",terr="",roads="",labels="",walkers="";
 sea=`<rect x="-4000" y="-4000" width="${M.W+8000}" height="${M.H+8000}" fill="#6FB2E8"/>${Array.from({length:40},(_,k)=>`<path class="wave" d="M${(k*173)%M.W} ${(k*97)%M.H}q8-4 16 0t16 0" stroke="#BFE0FF" stroke-width="2" fill="none" opacity=".7"/>`).join("")}
  ${Array.from({length:5},(_,k)=>`<g transform="translate(${150+k*300} ${600+(k%2?-30:30)}) scale(1.2)"><g class="rock"><path d="M-16 -4h32l-6 8h-20z" fill="#8A5A2B"/><path d="M0 -4v-22l14 18z" fill="#FFF"/></g></g>`).join("")}`;
 M.lands.forEach((L,li)=>{const R=L.R||(260+L.items.length*8),n=L.items.length;
  land+=`<g transform="translate(${L.cx} ${L.cy})"><path d="${blob(R+30,li*31+7)}" fill="#E8D8A8"/><path d="${blob(R+14,li*31+7)}" fill="${L.c2}"/><path d="${blob(R,li*31+9)}" fill="${L.c}"/></g>`;
  /* decorations scattered on the land */
  let seed=li*77+5;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  for(let k=0;k<26;k++){const a=rnd()*Math.PI*2,r=Math.sqrt(rnd())*R*.92;land+=`<g transform="translate(${(L.cx+Math.cos(a)*r).toFixed(0)} ${(L.cy+Math.sin(a)*r*.78).toFixed(0)}) scale(.9)" opacity=".85">${WD[L.deco[k%L.deco.length]]||""}</g>`}
  /* territories placed on a sunflower spiral */
  const pos=[];{let th=li*1.3;for(let k=0;k<n;k++){const r=n>1?R*(.2+.72*k/(n-1)):0;pos.push([L.cx+Math.cos(th)*r,L.cy+Math.sin(th)*r*.74]);th+=Math.min(2.4,170/Math.max(r,40))}}
  const rd=pos.map((p,k)=>k?`Q${((pos[k-1][0]+p[0])/2+(p[1]-pos[k-1][1])*.25).toFixed(0)} ${((pos[k-1][1]+p[1])/2-(p[0]-pos[k-1][0])*.25).toFixed(0)} ${p[0].toFixed(0)} ${p[1].toFixed(0)}`:`M${p[0].toFixed(0)} ${p[1].toFixed(0)}`).join(" ");
  walkers+=[0,1].map(k=>`<g class="mdet"><animateMotion dur="${60+k*20}s" begin="${-k*20}s" repeatCount="indefinite" path="${rd}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"/><g transform="scale(.26)"><g class="hop">${avatar(npcLook(li*5+k+2))}</g></g></g>`).join("");
  roads+=`<path d="${rd}" stroke="#C7A666" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/><path d="${rd}" stroke="#E8D3A0" stroke-width="6" fill="none" stroke-linecap="round"/><path d="${rd}" stroke="#FFF" stroke-width="1.4" fill="none" stroke-dasharray="2 8" opacity=".8"/>`;
  L.items.forEach((it,k)=>{const [x,y]=pos[k],tr=22+Math.sqrt(it.n)*5.2,live=it.live;
   const done=live&&it.plots?Math.round(it.plots.reduce((a,f)=>a+(f||0),0)/it.n*100):0;
   const per=Math.ceil(Math.sqrt(it.n*1.6)),sz=Math.max(3.2,Math.min(7,tr*1.2/per));let plots="";
   for(let q=0;q<it.n;q++){const r=Math.floor(q/per),c=q%per,cols=Math.min(per,it.n-r*per),px=-cols*(sz+1.5)/2+c*(sz+1.5),py=tr*.15+r*(sz+1.5);const f=live&&it.plots?(it.plots[q]||0):0;
    plots+=`<rect class="mplot" data-p="${live&&(it.u0||0)+q<(it.u?it.u[1]:CRS.units.length)?(it.u0||0)+q:""}" x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${sz.toFixed(1)}" height="${sz.toFixed(1)}" rx="1" fill="${live?(f>=.999?"#E3B84A":f>0?"#9CCB6A":"#FBF6E8"):"#EEF0F4"}" stroke="${live?"#8A6A3A":"#C9CFDA"}" stroke-width=".5"/>`;
    if(it.dots&&it.dots[q])it.dots[q].forEach((ok,m)=>{plots+=`<circle class="mdot" cx="${(px+1+((m%3)+.5)*(sz-2)/3).toFixed(2)}" cy="${(py+1+(Math.floor(m/3)+.5)*(sz-2)/3).toFixed(2)}" r=".45" fill="${ok?"#8A5A06":"#C9BC98"}"/>`})}
   walkers+=`<g class="mdet" transform="translate(${x.toFixed(0)} ${y.toFixed(0)})">${[0,1,2,3].map(q=>{const a=-2.7+q*.75,rr=tr+18;return `<g transform="translate(${(Math.cos(a)*rr).toFixed(0)} ${(Math.sin(a)*rr*.85).toFixed(0)}) scale(.55)">${WD[L.deco[(q+k)%L.deco.length]]||""}</g>`}).join("")}<path d="${blob(tr+6,k*5+li,10)}" fill="none" stroke="#8A6A3A" stroke-width="1.2" stroke-dasharray="2 3" opacity=".7"/></g>`;
   terr+=`<g class="mterr ${live?"live":"soon"}" data-t="${li}:${k}" transform="translate(${x.toFixed(0)} ${y.toFixed(0)})">
    <path d="${blob(tr,li*13+k*7+3,10)}" fill="${live?"#FFF6D8":"rgba(255,255,255,.55)"}" stroke="${live?"#C9A34A":"rgba(0,0,0,.18)"}" stroke-width="${live?2.5:1.2}"/>
    <g transform="translate(0 ${-tr*.12}) scale(${(tr/40).toFixed(2)})" ${live?"":'style="filter:grayscale(.75);opacity:.65"'}>${MI[it.ic]||""}</g>
    <g class="mplots">${plots}</g>
    <g class="mname"><rect x="${-(it.he.length*6+12)}" y="${tr*.78}" width="${it.he.length*12+24}" height="18" rx="9" fill="${live?"#FFF8E7":"rgba(255,255,255,.85)"}" stroke="${live?"#C9A34A":"rgba(0,0,0,.15)"}"/><text y="${tr*.78+13.5}" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="13" fill="#16213A">${it.he}</text>
    <text class="men" y="${tr*.78+29}" text-anchor="middle" font-size="9" font-weight="700" fill="#3A4664">${it.en}${it.lbl?" · "+it.lbl:` · ${it.n}`}${live?` · ${done}%`:""}</text></g>
    ${live?`<g transform="translate(${tr*.7} ${-tr*.75})"><path d="M0 0v-24" stroke="#3A2A1A" stroke-width="2"/><path d="M0 -24h16l-4 5 4 5H0z" fill="${worldOf().flag}"/></g>`:""}</g>`});
  labels+=`<g class="mland" data-l="${li}" transform="translate(${L.cx} ${L.cy-R*.78-26})"><rect x="-90" y="-22" width="180" height="40" rx="20" fill="rgba(22,33,58,.82)"/><text y="-1" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="20" fill="#FFF">${CRS.id==="mishnayos"?"סדר ":""}${L.he}</text><text y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#DDE6F6" letter-spacing="1">${CRS.id==="mishnayos"?"SEDER ":""}${L.en.toUpperCase()}</text></g>`});
 const lay=$("#layer");lay.innerHTML=`<div class="zoomv" role="dialog" aria-modal="true" aria-label="${esc(M.title)}"><div class="zv-h wrap"><div><small>Map</small><h2>${M.title}</h2><p>Walk with the joystick, or drag and tap any place to open it.</p></div><span class="he">${M.he}</span><button class="iconbtn" id="zclose" aria-label="Close">✕</button><div class="mtabs" role="tablist">${Object.values(COURSES).filter(c=>c.live!==false).map(c=>`<button role="tab" class="mtab ${c.id===CRS.id?"on":""}" data-mc="${c.id}" aria-selected="${c.id===CRS.id}">${esc(c.chip.t)}</button>`).join("")}</div></div>
  <div class="zv-b mapb" id="mapb"><div class="mppl" id="mppl" hidden></div><div class="mcard" id="mcard" hidden></div><svg id="msvg" class="msvg" preserveAspectRatio="xMidYMid meet"><g>${sea}${land}${DET.under}${roads}${walkers}${terr}${labels}<g id="mpeople"></g><g id="mmeav"></g>${DET.over.replace(/__WALK\d+__/g,"")}</g></svg>
  <div class="mctl"><button class="iconbtn" id="mzi" aria-label="Zoom in">+</button><button class="iconbtn" id="mzo" aria-label="Zoom out">−</button><button class="iconbtn" id="mearth" aria-label="The whole world">🌍</button><button class="btn ghost sm" id="mall">Whole map</button><button class="btn sm" id="mme">My place</button></div></div></div>`;
 document.body.style.overflow="hidden";
 const svg=$("#msvg"),box=$("#mapb");const asp=()=>box.clientHeight/box.clientWidth;
 MV={x:0,y:0,w:M.W};const setVB=()=>{const h=MV.w*asp();svg.setAttribute("viewBox",`${MV.x.toFixed(1)} ${MV.y.toFixed(1)} ${MV.w.toFixed(1)} ${h.toFixed(1)}`);
  svg.classList.toggle("lod2",MV.w<M.W*.55);svg.classList.toggle("lod3",MV.w<M.W*.2);svg.classList.toggle("lod4",MV.w<M.W*.08)};
 const fitAll=()=>{const a=asp();MV.w=Math.max(M.W,M.H/a);MV.x=(M.W-MV.w)/2;MV.y=(M.H-MV.w*a)/2};
 let anim=null;const flyTo=(cx,cy,w)=>{cancelAnimationFrame(anim);const s={...MV},a=asp(),t0=performance.now(),e={w,x:cx-w/2,y:cy-w*a/2};
  const step=t=>{if(!MV)return;const k=Math.min(1,(t-t0)/550),q=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;MV.x=s.x+(e.x-s.x)*q;MV.y=s.y+(e.y-s.y)*q;MV.w=s.w+(e.w-s.w)*q;setVB();if(k<1)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)};
 const zoomAt=(f,px,py)=>{const r=svg.getBoundingClientRect(),a=asp();const mx=MV.x+(px-r.left)/r.width*MV.w,my=MV.y+(py-r.top)/r.height*MV.w*a;const nw=Math.max(110,Math.min(M.W*1.6,MV.w*f));MV.x=mx-(mx-MV.x)*nw/MV.w;MV.y=my-(my-MV.y)*nw/MV.w;MV.w=nw;setVB()};
 fitAll();setVB();
 /* start zoomed on the live place, then the learner can pull back */
 const live=[...svg.querySelectorAll(".mterr.live")][0];
 const placeOf=g=>{const m=g.getAttribute("transform").match(/translate\(([-\d.]+) ([-\d.]+)\)/);return [+m[1],+m[2]]};
 if(live){const [x,y]=placeOf(live);setTimeout(()=>flyTo(x,y,M.W*.18),350)}
 /* pointer: drag, pinch, wheel, tap */
 const pts=new Map();let moved=0,pinch0=null;
 svg.addEventListener("pointerdown",e=>{svg.__pid=e.pointerId;svg.__cap=false;pts.set(e.pointerId,[e.clientX,e.clientY]);moved=0;if(pts.size===2){const [p,q]=[...pts.values()];pinch0={d:Math.hypot(p[0]-q[0],p[1]-q[1]),w:MV.w}}});
 svg.addEventListener("pointermove",e=>{if(!svg.__cap&&e.buttons){try{svg.setPointerCapture(e.pointerId)}catch(x){}svg.__cap=true}if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
  if(pts.size===2&&pinch0){const [p,q]=[...pts.values()],d=Math.hypot(p[0]-q[0],p[1]-q[1]);zoomAt(pinch0.w/(MV.w)*(pinch0.d/d),(p[0]+q[0])/2,(p[1]+q[1])/2);moved+=5;return}
  const r=svg.getBoundingClientRect(),dx=(e.clientX-prev[0])/r.width*MV.w,dy=(e.clientY-prev[1])/r.height*MV.w*asp();MV.x-=dx;MV.y-=dy;moved+=Math.abs(e.clientX-prev[0])+Math.abs(e.clientY-prev[1]);setVB()});
 const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch0=null};svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
 svg.addEventListener("wheel",e=>{e.preventDefault();zoomAt(e.deltaY>0?1.15:1/1.15,e.clientX,e.clientY)},{passive:false});
 svg.addEventListener("click",e=>{if(moved>8)return;if(e.target.closest(".mpp"))return;const plot=e.target.closest(".mplot");const t=e.target.closest(".mterr");const l=e.target.closest(".mland");
  if(plot&&plot.dataset.p!==""&&svg.classList.contains("lod2")){goUnit(+plot.dataset.p);return}
  if(t){const [li,k]=t.dataset.t.split(":").map(Number),it=M.lands[li].items[k],[x,y]=placeOf(t);flyTo(x,y+M.W*.07,M.W*.3);placeCard(it);return}
  if(!plot)$("#mcard").hidden=true;
  if(l){const L=M.lands[+l.dataset.l];flyTo(L.cx,L.cy,(L.R||(260+L.items.length*8))*2.4)}});
 const close=()=>{cancelAnimationFrame(anim);lay.innerHTML="";document.body.style.overflow="";MV=null};
 /* other learners in this land: on the spot they're learning, and in a strip at the top */
 const chipTo=t=>{const c=Object.values(COURSES).find(c=>c.chip.t===t);return c?c.id:null};
 const here=()=>socAll().filter(p=>(p.card.courseId||chipTo(p.card.course))===CRS.id);
 const itemFor=p=>{const uk=p.card.unitKey||(p.src==="room"&&p.card&&p.card.unitKey)||"";const ui=CRS.units.findIndex(u=>u.key===uk);
  for(let li=0;li<M.lands.length;li++)for(let k=0;k<M.lands[li].items.length;k++){const it=M.lands[li].items[k];if(!it.live)continue;if(!it.u||(ui>=it.u[0]&&ui<it.u[1])||ui<0)return li+":"+k}return null};
 const drawPeople=()=>{const L=here(),g=$("#mpeople"),st=$("#mppl");if(!g||!st)return;let s="";const cnt={};
  L.slice(0,40).forEach((p,i)=>{const key=itemFor(p);const t=key&&svg.querySelector(`.mterr[data-t="${key}"]`);if(!t)return;const [x,y]=placeOf(t);const n=cnt[key]=(cnt[key]||0)+1;
   const a=n*1.9,r=26+n*7;s+=`<g class="mpp" data-pp="${esc(p.id)}" transform="translate(${(x+Math.cos(a)*r).toFixed(0)} ${(y-18+Math.sin(a)*r*.6).toFixed(0)})"><circle r="15" fill="#FFF" stroke="${p.online?"#2E9E5B":"#C9A34A"}" stroke-width="3"/><svg x="-14" y="-15" width="28" height="30" viewBox="-30 -108 60 112">${avatar(Object.assign({},p.card.av||{},{base:profile()||"man"}))}</svg></g>`});
  g.innerHTML=s;const on=L.filter(p=>p.online).length;
  st.hidden=!L.length;st.innerHTML=L.length?`<span class="mppl-t">${L.length} learning ${esc(CRS.chip.t)}${on?` · <b>${on} now</b>`:""}</span><div class="mppl-r">${L.slice(0,20).map(p=>`<button class="mppl-p" data-pp="${esc(p.id)}" aria-label="${esc(p.card.nick||"Learner")}">${avatarSVG(Object.assign({},p.card.av||{},{base:profile()||"man"}),"","-30 -108 60 112")}${p.online?"<i></i>":""}<small>${esc((p.card.nick||"").split(" ")[0])}</small></button>`).join("")}</div>`:"";
  lay.querySelectorAll("[data-pp]").forEach(b=>b.onclick=e=>{e.stopPropagation();const p=socAll().find(x=>x.id===b.dataset.pp);if(p){const back=CRS.id;close();learnerSheet(p,{back})}})};
 setTimeout(drawPeople,60);socLoad().then(()=>{if(MV)drawPeople()});
 /* jump straight to a perek / parsha section / sugya */
 const goUnit=(ui,start)=>{close();secFor(ui);tab="learn";render();setTimeout(()=>{const r=$("#reg"+ui);if(r){r.scrollIntoView({behavior:"smooth",block:"start"});r.classList.add("flash");setTimeout(()=>r.classList.remove("flash"),1600)}
   if(start){const u=CRS.units[ui];let i=u.nodes.findIndex((n,j)=>nodeState(u,j)==="open");if(i<0)i=0;setTimeout(()=>openNode(ui,i),450)}},120)};
 const switchTo=id=>{if(!COURSES[id]||id===CRS.id)return;close();S.course=id;save();tab="learn";render();setTimeout(shasMap,60)};
 const unitsOf=it=>!it.live?[]:(it.u?Array.from({length:it.u[1]-it.u[0]},(_,k)=>it.u[0]+k):CRS.units.map((_,k)=>k));
 const placeCard=it=>{const c=$("#mcard"),U=unitsOf(it);
  const xr=CRS.id==="mishnayos"&&it.en==="Berachos"&&COURSES.gemara?`<button class="btn ghost sm" data-mc="gemara">Gemara Berachos →</button>`:CRS.id==="gemara"&&COURSES.mishnayos?`<button class="btn ghost sm" data-mc="mishnayos">Mishnah Berachos →</button>`:"";
  const open=M.lands.flatMap(L=>L.items).filter(x=>x.live&&x!==it);
  c.innerHTML=`<div class="mc-h"><div><b>${esc(it.en)}</b>${it.lbl?`<small>${esc(it.lbl)}</small>`:""}</div><span class="he">${it.he}</span><button class="iconbtn" id="mcx" aria-label="Close">✕</button></div>
   ${U.length?`<div class="mc-l">${U.map(ui=>{const u=CRS.units[ui],p=unitProgress(u);return `<div class="mc-u ${p.done?"won":""}"><button class="mc-go" data-go="${ui}"><span class="mc-t">${esc(u.unit.t)}</span><span class="mc-s">${esc(u.unit.s)}</span></button><span class="mc-p">${p.done?"✓":`${p.d}/${p.n}`}</span><button class="btn sm" data-start="${ui}">${p.d?"Continue":"Start"}</button></div>`}).join("")}</div>`
   :`<p class="mc-soon">${esc(it.en)} isn't ready yet. It's on the way.${open.length?" Open now:":""}</p>${open.length?`<div class="mc-open">${open.map(x=>`<button class="btn ghost sm" data-it="${esc(x.en)}">${esc(x.en)}</button>`).join("")}</div>`:""}`}
   ${xr?`<div class="mc-open">${xr}</div>`:""}${it.live?`<div class="mc-open"><button class="btn sm" data-room="1">🚪 Go inside</button></div>`:""}`;
  c.hidden=false;
  $("#mcx").onclick=()=>c.hidden=true;
  c.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>goUnit(+b.dataset.go));
  c.querySelectorAll("[data-start]").forEach(b=>b.onclick=()=>goUnit(+b.dataset.start,1));
  c.querySelectorAll("[data-mc]").forEach(b=>b.onclick=()=>switchTo(b.dataset.mc));
  c.querySelectorAll("[data-room]").forEach(b=>b.onclick=()=>{for(let li=0;li<M.lands.length;li++){const k=M.lands[li].items.indexOf(it);if(k>=0){enterRoom(li,k);return}}});
  c.querySelectorAll("[data-it]").forEach(b=>b.onclick=()=>{const g=[...svg.querySelectorAll(".mterr.live")].find(t=>{const [li,k]=t.dataset.t.split(":").map(Number);return M.lands[li].items[k].en===b.dataset.it});if(g){const [li,k]=g.dataset.t.split(":").map(Number),[x,y]=placeOf(g);flyTo(x,y+M.W*.07,M.W*.3);placeCard(M.lands[li].items[k])}})};
 lay.querySelectorAll(".mtab").forEach(b=>b.onclick=()=>switchTo(b.dataset.mc));
 $("#mearth").onclick=()=>{close();globeView()};$("#zclose").onclick=close;$("#mzi").onclick=()=>{const r=svg.getBoundingClientRect();zoomAt(1/1.4,r.left+r.width/2,r.top+r.height/2)};$("#mzo").onclick=()=>{const r=svg.getBoundingClientRect();zoomAt(1.4,r.left+r.width/2,r.top+r.height/2)};
 $("#mall").onclick=()=>{const s={...MV};fitAll();const e={...MV};Object.assign(MV,s);flyTo(e.x+e.w/2,e.y+e.w*asp()/2,e.w)};
 const enterRoom=(li,k)=>{const it=M.lands[li].items[k],key=li+":"+k,ppl=here().filter(p=>itemFor(p)===key),U=unitsOf(it),cid=CRS.id;close();
  beisMedrash({it,ppl,back:()=>{setCourse(cid);shasMap()},learn:()=>{setCourse(cid);tab="learn";render();const ui=U.find(x=>!unitProgress(CRS.units[x]).done)??U[0];setTimeout(()=>{const u=CRS.units[ui];let i=u.nodes.findIndex((n,j)=>nodeState(u,j)==="open");if(i<0)i=0;openNode(ui,i)},300)}})};
 const WK=mapWalk({svg,box,M,placeOf,setView:(x,y,w)=>{MV.x=x;MV.y=y;MV.w=w;setVB()},getMV:()=>MV,enter:enterRoom,startKey:itemFor({card:{unitKey:(ltPos()||{}).u||""}})});
 setTimeout(()=>{if(MV){const p=WK.pos();flyTo(p.x,p.y,M.W*.18)}},380);
 $("#mme").onclick=()=>{const p=WK.pos();flyTo(p.x,p.y,M.W*.14)}}
