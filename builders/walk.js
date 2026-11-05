/* ================= WALKING: your avatar on the globe, on the map, and inside a beis medrash ================= */
/* a thumb joystick; arrow keys and WASD work too */
function walkStick(host,onMove){
 const el=document.createElement("div");el.className="wstick";el.innerHTML=`<div class="wstick-k"></div>`;host.appendChild(el);
 const knob=el.firstChild;let id=null,cx=0,cy=0;const st={x:0,y:0,keys:{}};
 const set=(x,y)=>{const m=Math.hypot(x,y),R=38;if(m>R){x=x/m*R;y=y/m*R}knob.style.transform=`translate(${x}px,${y}px)`;st.x=x/R;st.y=y/R;onMove&&onMove(st)};
 el.addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation();id=e.pointerId;try{el.setPointerCapture(id)}catch(x){}const r=el.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;set(e.clientX-cx,e.clientY-cy)});
 el.addEventListener("pointermove",e=>{if(e.pointerId!==id)return;e.preventDefault();set(e.clientX-cx,e.clientY-cy)});
 const end=e=>{if(e.pointerId!==id)return;id=null;set(0,0)};el.addEventListener("pointerup",end);el.addEventListener("pointercancel",end);
 const K={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};
 const kd=e=>{if(!K[e.code]||/INPUT|TEXTAREA/.test((e.target||{}).nodeName||""))return;e.preventDefault();st.keys[e.code]=1;kv()},ku=e=>{if(!K[e.code])return;delete st.keys[e.code];kv()};
 const kv=()=>{if(id!==null)return;let x=0,y=0;for(const c in st.keys){x+=K[c][0];y+=K[c][1]}const m=Math.hypot(x,y)||1;st.x=x/m;st.y=y/m;knob.style.transform=`translate(${st.x*30}px,${st.y*30}px)`;onMove&&onMove(st)};
 addEventListener("keydown",kd);addEventListener("keyup",ku);
 st.destroy=()=>{removeEventListener("keydown",kd);removeEventListener("keyup",ku);el.remove()};
 return st}
/* an avatar as a picture, for the 3D room and for sprites */
const AVIMG=new Map();
function avImg(av){const key=JSON.stringify(av);if(AVIMG.has(key))return AVIMG.get(key);
 const im=new Image();im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -108 60 112" width="150" height="280">${avatar(av)}</svg>`);
 if(AVIMG.size>200)AVIMG.clear();AVIMG.set(key,im);return im}
const roomWords=()=>{const p=profile()||"man";return {room:{man:"Beis medrash",boy:"Yeshiva",woman:"Shiur room",girl:"Classroom"}[p],teach:{man:"Maggid shiur",boy:"Rebbe",woman:"Teacher",girl:"Morah"}[p]}};

/* ---------- on the globe: you stand on top of the world and walk it round under your feet ---------- */
let GLW=null;
function globeWalk(o){const {lay,svg,land}=o;const box=lay.querySelector("#gbox");
 const g=document.createElementNS("http://www.w3.org/2000/svg","g");g.setAttribute("id","gmeav");g.setAttribute("pointer-events","none");
 g.innerHTML=`<ellipse cx="0" cy="1" rx="12" ry="3.5" fill="rgba(0,0,0,.35)"/><g id="gmeb"><svg x="-15" y="-34" width="30" height="35" viewBox="-30 -108 60 112">${avatar(myAvatar())}</svg></g>`;
 $("#gw").appendChild(g);
 const go=document.createElement("div");go.className="wgo";go.hidden=true;box.appendChild(go);
 const st=walkStick(box,()=>{});let t=0,under=-1;
 GLW=dt=>{if(!GL)return;const v=Math.hypot(st.x,st.y);
  if(v>.05){GL.spin=0;const sp=55/GL.s;GL.lon+=st.x*dt*sp;GL.lat=Math.max(-60,Math.min(60,GL.lat-st.y*dt*sp));t+=dt*10}
  const b=$("#gmeb");if(b)b.setAttribute("transform",`translate(0 ${v>.05?-Math.abs(Math.sin(t))*3:0}) scale(${st.x<-.1?-1:1} 1)`);
  g.setAttribute("transform",`scale(${(1/Math.max(1,GL.s*.75)).toFixed(3)})`);
  /* which land is under your feet? */
  const D=Math.PI/180;let best=-1,bd=1e9;GL.lands.forEach((L,i)=>{const c=Math.sin(GL.lat*D)*Math.sin(L.la*D)+Math.cos(GL.lat*D)*Math.cos(L.la*D)*Math.cos((L.lo-GL.lon)*D);const d=Math.acos(Math.max(-1,Math.min(1,c)))/D;if(d<L.r*1.05&&d<bd){bd=d;best=i}});
  if(best!==under){under=best;if(best<0)go.hidden=true;else{const L=GL.lands[best];go.hidden=false;
   go.innerHTML=L.live?`<span>${esc(L.name)}</span><button class="btn" id="wgo">Land in ${esc(L.name)} →</button>`:`<span>${esc(L.name)}</span><small>Coming soon</small>`;const b2=go.querySelector("#wgo");if(b2)b2.onclick=()=>{GLW=null;st.destroy();land(L)}}}};
 return ()=>{GLW=null;st.destroy()}}

/* ---------- on the land map: walk the roads, step onto a parsha, go inside ---------- */
const MW={pos:{}};
function mapWalk(o){const {svg,box,M,placeOf,setView,getMV,enter,itemPos,startKey}=o;
 const g=svg.querySelector("#mmeav");if(!g)return ()=>{};
 const items=[...svg.querySelectorAll(".mterr")].map(t=>{const [li,k]=t.dataset.t.split(":").map(Number),it=M.lands[li].items[k],[x,y]=placeOf(t);return {li,k,it,x,y,r:22+Math.sqrt(it.n)*5.2}});
 let p=MW.pos[CRS.id];if(!p){const s=items.find(z=>z.li+":"+z.k===startKey)||items.find(z=>z.it.live)||items[0];p=s?{x:s.x,y:s.y+s.r+26}:{x:M.W/2,y:M.H/2}}
 const me=avatar(myAvatar());
 g.innerHTML=`<g id="mmeb"><ellipse cx="0" cy="2" rx="16" ry="5" fill="rgba(0,0,0,.28)"/><path class="mboat" d="M-26 -6h52l-10 14h-32z" fill="#8A5A2B" stroke="#5A3A1A" stroke-width="2"/><g class="mmefig"><svg x="-19" y="-44" width="38" height="45" viewBox="-30 -108 60 112">${me}</svg></g><g class="mmetag"><rect x="-17" y="-60" width="34" height="14" rx="7" fill="#2457A6"/><text y="-50" text-anchor="middle" font-size="9" font-weight="800" fill="#FFF">You</text></g></g>`;
 const go=document.createElement("div");go.className="wgo";go.hidden=true;box.appendChild(go);
 const hint=document.createElement("div");hint.className="whint";hint.textContent="Walk with the joystick or arrow keys";box.appendChild(hint);setTimeout(()=>hint.remove(),4500);
 const st=walkStick(box,()=>{});let last=performance.now(),raf=0,t=0,at=null,face=1,follow=0;
 const onLand=(x,y)=>M.lands.some(L=>{const R=L.R||(260+L.items.length*8);return Math.hypot(x-L.cx,(y-L.cy)/.8)<R+18});
 const show=()=>{const water=!onLand(p.x,p.y),k=Math.max(.7,Math.min(2.2,getMV().w/900));g.setAttribute("transform",`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${k.toFixed(2)})`);
  g.classList.toggle("water",water);const f=g.querySelector(".mmefig");if(f)f.setAttribute("transform",`translate(0 ${-Math.abs(Math.sin(t))*4}) scale(${face} 1)`)};
 const tick=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;if(!svg.isConnected){stop();return}
  const v=Math.hypot(st.x,st.y);
  if(v>.05){const MV=getMV(),sp=Math.max(140,MV.w*.32);p.x=Math.max(-200,Math.min(M.W+200,p.x+st.x*sp*dt));p.y=Math.max(-200,Math.min(M.H+200,p.y+st.y*sp*dt));t+=dt*12;if(Math.abs(st.x)>.15)face=st.x<0?-1:1;follow=1;MW.pos[CRS.id]={...p}}
  else t=0;
  if(follow){const MV=getMV(),a=box.clientHeight/box.clientWidth,cx=MV.x+MV.w/2,cy=MV.y+MV.w*a/2,tw=Math.min(MV.w,M.W*.3),k=Math.min(1,dt*4);setView(cx+(p.x-cx)*k-(MV.w+(tw-MV.w)*k)/2,cy+(p.y-cy)*k-(MV.w+(tw-MV.w)*k)*a/2,MV.w+(tw-MV.w)*k);if(v<.05&&Math.hypot(p.x-cx,p.y-cy)<2)follow=0}
  show();
  /* standing on a place? */
  let near=null;for(const z of items){if(Math.hypot(p.x-z.x,p.y-z.y)<z.r+24){near=z;break}}
  if(near!==at){at=near;if(!near)go.hidden=true;else{go.hidden=false;
   go.innerHTML=near.it.live?`<span><b class="he">${near.it.he}</b> ${esc(near.it.en)}</span><button class="btn" id="wgo">🚪 Go inside</button>`:`<span><b class="he">${near.it.he}</b> ${esc(near.it.en)}</span><small>Coming soon</small>`;
   const b=go.querySelector("#wgo");if(b)b.onclick=()=>{MW.pos[CRS.id]={x:near.x,y:near.y+near.r+26};stop();enter(near.li,near.k)}}}
  raf=requestAnimationFrame(tick)};
 const stop=()=>{cancelAnimationFrame(raf);st.destroy()};
 show();raf=requestAnimationFrame(tick);
 return {stop,toMe:()=>{follow=1},pos:()=>p}}

/* ---------- inside: a beis medrash seen from just behind your avatar ---------- */
let BM=null;
function beisMedrash(o){if(BM)BM.close();
 const W=roomWords(),it=o.it,ppl=(o.ppl||[]).slice(0,32);
 const lay=$("#layer");lay.innerHTML=`<div class="bmv" role="dialog" aria-modal="true" aria-label="${esc(it.en)} ${esc(W.room)}">
  <canvas id="bmc" class="bmc"></canvas>
  <div class="bm-top"><button class="iconbtn" id="bmx" aria-label="Back to the map">←</button><div class="bm-t"><b><span class="he">${it.he}</span> ${esc(it.en)}</b><small>${esc(W.room)} · ${ppl.length?`${ppl.length} learning here${ppl.some(p=>p.online)?` · ${ppl.filter(p=>p.online).length} now`:""}`:"No one else here yet"}</small></div></div>
  ${ppl.length?"":`<div class="bm-empty" id="bmempty">No one else is learning ${esc(it.en)} right now. Take a seat and start: others will see you here.</div>`}
  <div class="bm-near" id="bmnear" hidden></div>
  <div class="bm-bot"><button class="btn" id="bmlearn">📖 Learn ${esc(it.en)}</button></div></div>`;
 document.body.style.overflow="hidden";
 const cv=$("#bmc"),ctx=cv.getContext("2d"),host=lay.querySelector(".bmv");
 /* ---- the room ---- */
 const RW=8,RD=26,RH=4.2;
 const tables=[],benches=[],seats=[];
 [6.5,10.5,14.5,18.5].forEach(z=>[-4.2,4.2].forEach(x=>{tables.push({x,z,w:2.8,d:1.1,h:.82});benches.push({x,z:z-1.05,w:2.8,d:.45,h:.46},{x,z:z+1.05,w:2.8,d:.45,h:.46});
  [-.7,.7].forEach(dx=>{seats.push({x:x+dx,z:z-1.05,f:1,tz:z},{x:x+dx,z:z+1.05,f:-1,tz:z})})}));
 /* front seats first, people sit with a chavrusa across the table */
 seats.sort((a,b)=>(b.tz-a.tz)||Math.abs(a.x)-Math.abs(b.x));
 const sitters=ppl.map((p,i)=>{const s=seats[i];return {p,s,img:avImg(Object.assign({},p.card.av||{},{base:profile()||"man"})),back:avImg(Object.assign({},p.card.av||{},{base:profile()||"man",back:1})),ph:i*1.7}});
 const tb=(()=>{const b=profile()||"man";return b==="boy"?"man":b==="girl"?"woman":b})();
 const teacher={x:0,z:23.2,img:avImg(Object.assign(npcLook(11),{base:tb},tb==="man"?{beard:"full",head:"bors"}:{})),shtender:{x:0,z:22.5,w:.9,d:.6,h:1.1}};
 const meImg=avImg(Object.assign(myAvatar(),{back:1})),meFront=avImg(myAvatar());
 const P={x:0,z:2.2,a:0},CAM={d:3.1,h:2.15,p:.16};let tgt=null,t0=performance.now(),walkT=0;
 /* books on the side walls, windows, lamps */
 let sd=7;const rnd=()=>(sd=(sd*9301+49297)%233280)/233280;const BOOK=["#7A2E3A","#2B3F6B","#3E5B3A","#6B4A2B","#1F2433","#8A6A2A","#5A2E5A"];
 const books=[];[-1,1].forEach(side=>{for(let sh=0;sh<5;sh++){let z=1;while(z<RD-3.2){const w=.08+rnd()*.1;if(rnd()>.06)books.push({side,z0:z,z1:z+w,y0:.15+sh*.5,y1:.15+sh*.5+.34+rnd()*.1,c:BOOK[Math.floor(rnd()*BOOK.length)]});z+=w+.004}}});
 const lamps=[];for(let z=5;z<RD;z+=5)[-3,3].forEach(x=>lamps.push({x,z,y:3.4}));
 /* ---- projection ---- */
 let Wd=0,Hd=0,F=0,dpr=1;const resize=()=>{dpr=Math.min(2,devicePixelRatio||1);Wd=cv.clientWidth;Hd=cv.clientHeight;cv.width=Wd*dpr;cv.height=Hd*dpr;F=Math.max(Wd,Hd*.75)*.9};resize();addEventListener("resize",resize);
 let C={};const camSet=()=>{const sa=Math.sin(P.a),ca=Math.cos(P.a);let cx=P.x-sa*CAM.d,cz=P.z-ca*CAM.d;cx=Math.max(-RW+.2,Math.min(RW-.2,cx));cz=Math.max(.2,Math.min(RD-.2,cz));C={x:cx,z:cz,y:CAM.h,sa,ca,sp:Math.sin(CAM.p),cp:Math.cos(CAM.p)}};
 const toCam=(x,y,z)=>{const dx=x-C.x,dz=z-C.z,dy=y-C.y;const xc=dx*C.ca-dz*C.sa,zc=dx*C.sa+dz*C.ca;return [xc,dy*C.cp+zc*C.sp,zc*C.cp-dy*C.sp]};
 const scr=v=>[Wd/2+F*v[0]/v[2],Hd*.46-F*v[1]/v[2]];
 const NEAR=.12;const clip=V=>{const out=[];for(let i=0;i<V.length;i++){const a=V[i],b=V[(i+1)%V.length];if(a[2]>=NEAR)out.push(a);if((a[2]>=NEAR)!==(b[2]>=NEAR)){const t=(NEAR-a[2])/(b[2]-a[2]);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,NEAR])}}return out};
 const poly=(pts,fill,stroke)=>{const V=clip(pts.map(q=>toCam(q[0],q[1],q[2])));if(V.length<3)return;ctx.beginPath();V.forEach((v,i)=>{const [sx,sy]=scr(v);i?ctx.lineTo(sx,sy):ctx.moveTo(sx,sy)});ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}};
 const line=(a,b,col,w)=>{let A=toCam(...a),B=toCam(...b);if(A[2]<NEAR&&B[2]<NEAR)return;if(A[2]<NEAR){const t=(NEAR-A[2])/(B[2]-A[2]);A=[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,NEAR]}if(B[2]<NEAR){const t=(NEAR-B[2])/(A[2]-B[2]);B=[B[0]+(A[0]-B[0])*t,B[1]+(A[1]-B[1])*t,NEAR]}const p=scr(A),q=scr(B);ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.strokeStyle=col;ctx.lineWidth=w||1;ctx.stroke()};
 const box3=(b,top,side,front)=>{const x0=b.x-b.w/2,x1=b.x+b.w/2,z0=b.z-b.d/2,z1=b.z+b.d/2,h=b.h;
  /* faces that look toward the camera */
  if(C.z<z0)poly([[x0,0,z0],[x1,0,z0],[x1,h,z0],[x0,h,z0]],front);if(C.z>z1)poly([[x0,0,z1],[x1,0,z1],[x1,h,z1],[x0,h,z1]],front);
  if(C.x<x0)poly([[x0,0,z0],[x0,0,z1],[x0,h,z1],[x0,h,z0]],side);if(C.x>x1)poly([[x1,0,z0],[x1,0,z1],[x1,h,z1],[x1,h,z0]],side);
  if(C.y>h)poly([[x0,h,z0],[x1,h,z0],[x1,h,z1],[x0,h,z1]],top)};
 const hits=[];
 const sprite=(img,x,z,hgt,opt)=>{opt=opt||{};const base=toCam(x,opt.y0||0,z);if(base[2]<NEAR*2)return null;const [sx,sy]=scr(base);const top=scr(toCam(x,(opt.y0||0)+hgt,z));const h=sy-top[1],w=h*150/280;
  if(!img.complete||!img.naturalWidth)return null;const crop=opt.crop||1;ctx.save();if(opt.alpha)ctx.globalAlpha=opt.alpha;
  ctx.translate(sx+(opt.sway||0)*h*.03,sy);if(opt.sway)ctx.rotate(opt.sway*.04);
  ctx.drawImage(img,0,0,150,280*crop,-w/2,-h,w,h*crop);ctx.restore();return {x:sx-w/2,y:sy-h,w,h:h*crop,z:base[2]}};
 const tag=(x,y,z,text,online)=>{const v=toCam(x,y,z);if(v[2]<.5)return;const [sx,sy]=scr(v);const fs=Math.max(9,Math.min(15,F/v[2]*.13));ctx.font=`800 ${fs}px Nunito,system-ui,sans-serif`;const w=ctx.measureText(text).width+fs*(online?2:1.2);
  ctx.fillStyle="rgba(22,33,58,.78)";ctx.beginPath();ctx.roundRect?ctx.roundRect(sx-w/2,sy-fs*1.5,w,fs*1.5,fs*.75):ctx.rect(sx-w/2,sy-fs*1.5,w,fs*1.5);ctx.fill();
  if(online){ctx.fillStyle="#3BD17A";ctx.beginPath();ctx.arc(sx-w/2+fs*.75,sy-fs*.75,fs*.28,0,7);ctx.fill()}ctx.fillStyle="#FFF";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text,sx+(online?fs*.35:0),sy-fs*.72)};
 /* ---- draw one frame ---- */
 const draw=now=>{const tt=(now-t0)/1000;camSet();ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,Wd,Hd);hits.length=0;
  ctx.fillStyle="#3A2E26";ctx.fillRect(0,0,Wd,Hd);
  poly([[-RW,RH,0],[RW,RH,0],[RW,RH,RD],[-RW,RH,RD]],"#E9DFCB");
  for(let z=0;z<RD;z+=3)line([-RW,RH-.01,z],[RW,RH-.01,z],"rgba(120,96,70,.35)",2);
  poly([[-RW,0,0],[RW,0,0],[RW,0,RD],[-RW,0,RD]],"#B98A55");
  for(let x=-RW;x<=RW;x+=.55)line([x,0,0],[x,0,RD],"rgba(90,58,26,.35)",1);
  poly([[-RW,0,0],[-RW,0,RD],[-RW,RH,RD],[-RW,RH,0]],"#EFE6D2");poly([[RW,0,0],[RW,0,RD],[RW,RH,RD],[RW,RH,0]],"#EAE0CA");
  poly([[-RW,0,RD],[RW,0,RD],[RW,RH,RD],[-RW,RH,RD]],"#F3EBDA");poly([[-RW,0,0],[RW,0,0],[RW,RH,0],[-RW,RH,0]],"#E6DCC6");
  /* windows high on the side walls */
  for(let z=3;z<RD-2;z+=4)[-1,1].forEach(s=>{const x=s*(RW-.01);poly([[x,2.85,z],[x,2.85,z+1.6],[x,3.85,z+1.6],[x,3.85,z]],"#BFE3FF","#8A6A3A");line([x,3.35,z],[x,3.35,z+1.6],"#8A6A3A",1.5)});
  /* bookcases */
  [-1,1].forEach(s=>{const x=s*(RW-.02);poly([[x,0,.8],[x,0,RD-3],[x,2.65,RD-3],[x,2.65,.8]],"#6B4423")});
  for(const b of books){const x=b.side*(RW-.05);poly([[x,b.y0,b.z0],[x,b.y0,b.z1],[x,b.y1,b.z1],[x,b.y1,b.z0]],b.c)}
  [-1,1].forEach(s=>{const x=s*(RW-.06);for(let k=0;k<6;k++)line([x,.12+k*.5,.8],[x,.12+k*.5,RD-3],"#4A2E1A",2)});
  /* aron kodesh */
  poly([[-1.6,.3,RD-.02],[1.6,.3,RD-.02],[1.6,3.3,RD-.02],[-1.6,3.3,RD-.02]],"#8A5A2B");poly([[-1.3,.55,RD-.04],[1.3,.55,RD-.04],[1.3,3,RD-.04],[-1.3,3,RD-.04]],"#7A1F2E");
  poly([[-.5,3.35,RD-.03],[0,3.9,RD-.03],[.5,3.35,RD-.03]],"#E3B84A");line([0,.8,RD-.05],[0,2.7,RD-.05],"#E3B84A",2);line([-.9,1.75,RD-.05],[.9,1.75,RD-.05],"#E3B84A",2);
  { const v=toCam(0,3.55,RD-.4);if(v[2]>.3){const [sx,sy]=scr(v),r=F/v[2]*.12;const g=ctx.createRadialGradient(sx,sy,0,sx,sy,r*3);g.addColorStop(0,"rgba(255,200,90,.9)");g.addColorStop(1,"rgba(255,200,90,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(sx,sy,r*3,0,7);ctx.fill()}}
  /* furniture and people, far to near */
  const L=[];
  tables.forEach(b=>L.push({z:toCam(b.x,.4,b.z)[2],f:()=>{box3(b,"#9A6A3A","#6B4423","#7A4E2A");
   sitters.forEach(s=>{if(s.s.tz!==b.z||Math.abs(s.s.x-b.x)>1.5)return;const zz=b.z+(s.s.f>0?-.3:.3);poly([[s.s.x-.32,b.h+.01,zz-.2],[s.s.x+.32,b.h+.01,zz-.2],[s.s.x+.32,b.h+.01,zz+.2],[s.s.x-.32,b.h+.01,zz+.2]],"#FBF6E8","#C9BC98");line([s.s.x,b.h+.015,zz-.2],[s.s.x,b.h+.015,zz+.2],"#8A6A3A",1)})}}));
  benches.forEach(b=>L.push({z:toCam(b.x,.2,b.z)[2]+.01,f:()=>box3(b,"#8A5A2B","#5A3A1A","#6B4423")}));
  L.push({z:toCam(0,.5,teacher.shtender.z)[2],f:()=>box3(teacher.shtender,"#7A4E2A","#5A3A1A","#6B4423")});
  L.push({z:toCam(0,.5,teacher.z)[2],f:()=>{const r=sprite(teacher.img,teacher.x,teacher.z,1.85);if(r)hits.push({...r,teacher:1})}});
  lamps.forEach(l=>L.push({z:toCam(l.x,l.y,l.z)[2],f:()=>{line([l.x,RH,l.z],[l.x,l.y+.15,l.z],"#3A2A1A",1.5);const v=toCam(l.x,l.y,l.z);if(v[2]<.3)return;const [sx,sy]=scr(v),r=F/v[2]*.14;const g=ctx.createRadialGradient(sx,sy,0,sx,sy,r*2.6);g.addColorStop(0,"rgba(255,236,170,.95)");g.addColorStop(.35,"rgba(255,220,140,.5)");g.addColorStop(1,"rgba(255,220,140,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(sx,sy,r*2.6,0,7);ctx.fill()}}));
  sitters.forEach((s,i)=>L.push({z:toCam(s.s.x,1,s.s.z)[2],f:()=>{const behind=(s.s.f>0)===((s.s.z-C.z)*1>0)&&Math.abs(s.s.z-C.z)>.2;
   /* a seated learner: upper body above the bench, swaying while they learn */
   const sw=s.p.online?Math.sin(tt*2.2+s.ph):Math.sin(tt*.6+s.ph)*.25;const r=sprite(behind?s.back:s.img,s.s.x,s.s.z,1.62,{y0:-.35,crop:.82,sway:sw,alpha:s.p.online?1:.85});
   if(r)hits.push({...r,p:s.p});tag(s.s.x,1.62-.35+.28,s.s.z,(s.p.card.nick||"Learner").split(" ")[0],s.p.online)}}));
  L.push({z:toCam(P.x,1,P.z)[2],f:()=>{const bob=Math.abs(Math.sin(walkT))*.06;sprite(meImg,P.x,P.z,1.78,{y0:bob})}});
  L.sort((a,b)=>b.z-a.z).forEach(d=>d.f());
  /* tap target on the floor */
  if(tgt){const v=toCam(tgt.x,0,tgt.z);if(v[2]>NEAR){const [sx,sy]=scr(v);ctx.strokeStyle="rgba(255,255,255,.85)";ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(sx,sy,F/v[2]*.18,F/v[2]*.07,0,0,7);ctx.stroke()}}};
 /* ---- moving ---- */
 const solid=[...tables,...benches,teacher.shtender];
 const free=(x,z)=>{if(x<-RW+.35||x>RW-.35||z<.35||z>RD-1.1)return false;for(const b of solid)if(Math.abs(x-b.x)<b.w/2+.28&&Math.abs(z-b.z)<b.d/2+.28)return false;return true};
 const stepTo=(nx,nz)=>{if(free(nx,nz)){P.x=nx;P.z=nz;return 1}if(free(nx,P.z)){P.x=nx;return 1}if(free(P.x,nz)){P.z=nz;return 1}return 0};
 const st=walkStick(host,()=>{tgt=null});
 let near=null;const nearEl=$("#bmnear");
 const update=dt=>{let mv=0;
  if(Math.hypot(st.x,st.y)>.05){P.a+=st.x*dt*2.1;const sp=-st.y*3.2*dt;mv=stepTo(P.x+Math.sin(P.a)*sp,P.z+Math.cos(P.a)*sp)&&Math.abs(sp)>0}
  else if(tgt){const dx=tgt.x-P.x,dz=tgt.z-P.z,d=Math.hypot(dx,dz);if(d<.15)tgt=null;else{const want=Math.atan2(dx,dz);let da=((want-P.a+Math.PI*3)%(Math.PI*2))-Math.PI;P.a+=Math.max(-dt*4,Math.min(dt*4,da));const sp=Math.min(d,3*dt);mv=stepTo(P.x+dx/d*sp,P.z+dz/d*sp);if(!mv)tgt=null}}
  if(mv)walkT+=dt*9;else walkT=0;
  /* someone close by? */
  let n=null,bd=2.1;sitters.forEach(s=>{const d=Math.hypot(s.s.x-P.x,s.s.z-P.z);if(d<bd){bd=d;n=s}});
  if(n!==near){near=n;if(!n)nearEl.hidden=true;else{const c=n.p.card;nearEl.hidden=false;
   nearEl.innerHTML=`<div class="bm-nav">${avatarSVG(Object.assign({},c.av||{},{base:profile()||"man"}),"","-30 -108 60 112")}</div><div class="bm-nt"><b>${esc(c.nick||"Learner")}</b><small>${n.p.online?"🟢 Learning now":esc(socAgo(n.p.ts||0))} · Level ${c.lv||1}${c.streak?" · "+esc(c.streak):""}</small></div><button class="btn sm" id="bm5">✋</button><button class="btn ghost sm" id="bmsee">See</button>`;
   $("#bm5").onclick=()=>socFive(n.p);$("#bmsee").onclick=()=>see(n.p)}}};
 const see=p=>{const keep={...P};close(true);SOC.backLabel="Back to the "+W.room.toLowerCase();learnerSheet(p,{back:()=>{beisMedrash(Object.assign({},o,{start:keep}))}})};
 if(o.start)Object.assign(P,o.start);
 /* drag to look around, tap to walk or to meet someone */
 let pd=null;cv.addEventListener("pointerdown",e=>{pd={x:e.clientX,y:e.clientY,a:P.a,m:0,id:e.pointerId};try{cv.setPointerCapture(e.pointerId)}catch(x){}});
 cv.addEventListener("pointermove",e=>{if(!pd||e.pointerId!==pd.id)return;const dx=e.clientX-pd.x;pd.m=Math.max(pd.m,Math.abs(dx)+Math.abs(e.clientY-pd.y));if(pd.m>8){P.a=pd.a+dx/Wd*3.2;tgt=null}});
 cv.addEventListener("pointerup",e=>{if(!pd)return;const tap=pd.m<=8;pd=null;if(!tap)return;const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  const h=hits.slice().sort((a,b)=>a.z-b.z).find(q=>x>=q.x&&x<=q.x+q.w&&y>=q.y&&y<=q.y+q.h);
  if(h&&h.p){see(h.p);return}if(h&&h.teacher){toast(`${W.teach}: Welcome! Tap "Learn ${it.en}" to start.`);return}
  /* the floor point under the finger */
  const ny=-(y-Hd*.46)/F,nx=(x-Wd/2)/F;const dy=ny*C.cp-1*C.sp,dz=ny*C.sp+1*C.cp;if(dy>=-.01)return;const k=-C.y/dy;const xc=nx*k,zc=dz*k;
  const wx=C.x+xc*C.ca+zc*C.sa,wz=C.z-xc*C.sa+zc*C.ca;tgt={x:Math.max(-RW+.4,Math.min(RW-.4,wx)),z:Math.max(.4,Math.min(RD-1.2,wz))}});
 let raf=0,last=performance.now();const loop=now=>{if(!cv.isConnected){close(true);return}const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);draw(now);raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop);
 const e=$("#bmempty");if(e)setTimeout(()=>e&&e.classList.add("fade"),6000);
 const close=keepLayer=>{cancelAnimationFrame(raf);st.destroy();removeEventListener("resize",resize);BM=null;if(!keepLayer){lay.innerHTML="";document.body.style.overflow=""}};
 $("#bmx").onclick=()=>{close();o.back&&o.back()};$("#bmlearn").onclick=()=>{close();o.learn&&o.learn()};
 BM={close};return BM}
(()=>{const st=document.createElement("style");st.textContent=`.wstick{position:absolute;left:14px;bottom:76px;width:104px;height:104px;border-radius:50%;background:rgba(255,255,255,.22);border:2px solid rgba(255,255,255,.65);box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:4;touch-action:none;backdrop-filter:blur(2px)}
.wstick-k{position:absolute;left:30px;top:30px;width:44px;height:44px;border-radius:50%;background:#FFF;box-shadow:0 2px 8px rgba(0,0,0,.35);pointer-events:none;transition:transform .05s}
.wgo{position:absolute;right:12px;bottom:78px;left:132px;z-index:4;background:var(--surface,#fff);color:var(--ink);border:2px solid #C9A34A;border-radius:16px;padding:8px 10px;display:flex;flex-direction:column;gap:6px;box-shadow:0 8px 20px rgba(0,0,0,.3);animation:zin .2s ease-out}.wgo[hidden]{display:none}
.wgo span{font-weight:800;font-size:14px}.wgo .he{font-family:"Frank Ruhl Libre",serif;margin-inline-end:4px}.wgo small{color:var(--muted)}.wgo .btn{width:100%}
.whint{position:absolute;left:50%;transform:translateX(-50%);top:54px;z-index:4;background:rgba(22,33,58,.85);color:#fff;font-weight:700;font-size:13px;padding:7px 12px;border-radius:999px;white-space:nowrap;animation:zin .3s}
#mmeav .mboat{display:none}#mmeav.water .mboat{display:inline}#mmeav.water .mmefig{transform-box:fill-box}
.bmv{position:fixed;inset:0;z-index:60;background:#2A221C;overflow:hidden;touch-action:none}
.bmc{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}
.bm-top{position:absolute;left:0;right:0;top:0;display:flex;gap:10px;align-items:center;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;background:linear-gradient(rgba(22,16,10,.75),rgba(22,16,10,0));color:#fff;z-index:3}
.bm-top .iconbtn{background:rgba(255,255,255,.92);color:#16213A}.bm-t b{display:block;font-size:18px}.bm-t .he{font-family:"Frank Ruhl Libre",serif}.bm-t small{opacity:.9;font-weight:700}
.bm-bot{position:absolute;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);left:132px;z-index:3}.bm-bot .btn{width:100%}
.bmv .wstick{bottom:calc(env(safe-area-inset-bottom,0px) + 14px)}
.bm-near{position:absolute;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 130px);z-index:3;display:flex;align-items:center;gap:8px;background:var(--surface,#fff);color:var(--ink);border:2px solid #C9A34A;border-radius:16px;padding:8px;box-shadow:0 8px 20px rgba(0,0,0,.35);animation:zin .2s}.bm-near[hidden]{display:none}
.bm-nav{width:40px;height:46px;flex:none}.bm-nav svg{width:100%;height:100%}.bm-nt{flex:1;min-width:0}.bm-nt b{display:block}.bm-nt small{color:var(--muted);font-weight:700}
.bm-empty{position:absolute;left:16px;right:16px;top:40%;z-index:3;text-align:center;background:rgba(22,33,58,.82);color:#fff;font-weight:700;padding:12px 14px;border-radius:16px;transition:opacity .8s}.bm-empty.fade{opacity:0;pointer-events:none}`;document.head.appendChild(st)})();
