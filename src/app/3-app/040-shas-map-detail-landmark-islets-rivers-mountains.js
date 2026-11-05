/* ================= SHAS MAP DETAIL: landmark islets, rivers, mountains, villages, boats, people ================= */
const BIGMARK=(()=>{const cols=(n,x0,dx,y,h,c)=>Array.from({length:n},(_,i)=>`<rect x="${x0+i*dx}" y="${y-h}" width="5" height="${h}" fill="${c||"#F4EEDD"}"/>`).join("");
 return {
 zeraim:`<rect x="-34" y="-34" width="48" height="34" fill="#B85A3A"/><path d="M-40 -32l30-22 30 22z" fill="#8A3A2A"/><rect x="-18" y="-20" width="16" height="20" fill="#6B3A22"/><path d="M-18 -20l16 20M-2 -20l-16 20" stroke="#E7D3AE" stroke-width="2"/>
  <ellipse cx="34" cy="-4" rx="24" ry="9" fill="#E3C27A"/>${[20,30,40,48].map(x=>`<path d="M${x} -6l-3-14" stroke="#C9A040" stroke-width="2"/>`).join("")}<g transform="translate(-58 0)">${WD.wheat}</g><g transform="translate(60 4) scale(.8)">${WD.sheep}</g>`,
 moed:`<rect x="-46" y="-30" width="44" height="30" fill="#F4E6C0" stroke="#A8865A"/><path d="M-50 -30h52" stroke="#4E7A44" stroke-width="7" stroke-linecap="round"/>${[-40,-30,-20,-10].map(x=>`<path d="M${x} -36l4-6 4 6" stroke="#6E9A4E" stroke-width="2" fill="none"/>`).join("")}
  <rect x="8" y="-34" width="40" height="34" fill="#E7D3AE"/><path d="M4 -32l24-18 24 18z" fill="#7D5CC0"/>${[16,34].map(x=>`<rect x="${x}" y="-24" width="8" height="10" fill="#FFE29A"/><path class="flame" style="transform-origin:${x+4}px -26px" d="M${x+4} -30c2 2 2 3 0 4-2-1-2-2 0-4z" fill="#F4A51C"/>`).join("")}`,
 nashim:`<rect x="-40" y="-34" width="80" height="34" fill="#F6EAD8"/><path d="M-46 -32l46-22 46 22z" fill="#C06A8A"/>${[-30,-14,10,26].map(x=>`<rect x="${x}" y="-26" width="8" height="12" rx="4" fill="#FFE29A"/>`).join("")}<rect x="-6" y="-18" width="12" height="18" rx="6" fill="#6B4A2A"/>
  <g transform="translate(58 0) scale(.55)">${WD.cloud.replace(/class="drift"/,"")}</g><g transform="translate(-62 2)"><path d="M-14 -24h28" stroke="#F4F1E6" stroke-width="4"/><path d="M-12 -24v24M12 -24v24" stroke="#8A5A2B" stroke-width="2.5"/></g>`,
 nezikin:`<rect x="-46" y="-8" width="92" height="8" fill="#D8D0C0"/>${cols(8,-42,11.5,-8,32)}<path d="M-50 -40h100l-50 -18z" fill="#E8E0D0"/><rect x="-50" y="-44" width="100" height="5" fill="#C9C0AE"/>
  <g transform="translate(0 -62)"><path d="M0 0v-14M-12 -12h24" stroke="#8A6A2B" stroke-width="2"/><path d="M-16 -12l-4 8h8zM16 -12l-4 8h8z" fill="#C9A34A"/></g>`,
 kodashim:`<path d="M-70 0l20-24h100l20 24z" fill="#C9C0AE"/><rect x="-46" y="-50" width="92" height="28" fill="#EDE4D0"/><rect x="-16" y="-88" width="32" height="40" fill="#F4EEDD"/><rect x="-6" y="-72" width="12" height="24" fill="#C9A34A"/>
  <path d="M-18 -88h36" stroke="#C9A34A" stroke-width="3"/><rect x="26" y="-36" width="18" height="12" fill="#9AA0AE"/>${[0,1,2].map(i=>`<circle class="mnote" style="animation-delay:${i*.8}s" cx="${35+i*3}" cy="${-44-i*6}" r="${4+i}" fill="#E8E8F0" opacity=".7"/>`).join("")}`,
 taharos:`<path d="M-60 0q20-60 60-60t60 60z" fill="#8A9A7A"/><path class="wave" d="M8 -52q4 26 0 52" stroke="#BFE0FF" stroke-width="7" fill="none"/><ellipse cx="8" cy="2" rx="34" ry="9" fill="#5DA8EE"/>
  <rect x="-58" y="-16" width="34" height="16" fill="#E8EEF4"/><text x="-41" y="-5" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="8" fill="#2457A6">מקוה</text><g transform="translate(48 0) scale(.6)">${MI.heifer||""}</g>`}})();
function mapDetail(M){let s="",top="";const rnd=(()=>{let r=11;return()=>(r=(r*9301+49297)%233280)/233280})();
 /* sea life and boats on long loops */
 const loop=`M${M.W*.08} ${M.H*.5} C${M.W*.3} ${M.H*.4} ${M.W*.7} ${M.H*.6} ${M.W*.92} ${M.H*.5} S${M.W*.6} ${M.H*.38} ${M.W*.08} ${M.H*.5}z`;
 s+=`<path d="${loop}" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-dasharray="6 14" opacity=".45"/>`;
 [0,1,2].forEach(k=>{s+=`<g><animateMotion dur="${80+k*30}s" begin="${-k*25}s" repeatCount="indefinite" path="${loop}" rotate="0"/><g transform="scale(1.6)"><path d="M-16 -4h32l-6 8h-20z" fill="${["#8A5A2B","#2457A6","#7A2E3A"][k]}"/><path d="M0 -4v-22l14 18z" fill="#FFF"/></g></g>`});
 for(let k=0;k<6;k++){const x=rnd()*M.W,y=M.H*.45+rnd()*M.H*.1;s+=`<g class="mdet" transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><path class="jump" style="animation-delay:${(k*1.3).toFixed(1)}s" d="M-10 0q10-16 20 0" stroke="#5A7FA8" stroke-width="5" fill="none" stroke-linecap="round"/></g>`}
 /* compass rose and a cartouche */
 s+=`<g transform="translate(${M.W-90} ${M.H-90})"><circle r="44" fill="#FFF8E7" opacity=".9" stroke="#C9A34A" stroke-width="3"/><path d="M0 -38l8 30-8 8-8-8zM0 38l8-30-8-8-8 8z" fill="#2457A6"/><path d="M-38 0l30 8 8-8-8-8zM38 0l-30 8-8-8 8-8z" fill="#7E8AA8"/><text y="-48" text-anchor="middle" font-size="13" font-weight="900" fill="#16213A">N</text></g>`;
 M.lands.forEach((L,li)=>{const R=L.R||(260+L.items.length*8);const at=(a,r)=>[L.cx+Math.cos(a)*r,L.cy+Math.sin(a)*r*.74];
  /* foam along the shore */
  s+=`<g transform="translate(${L.cx} ${L.cy})"><path class="wave" d="${blob(R+38,li*31+7)}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10 12" opacity=".7"/></g>`;
  /* a river through the land */
  const a0=li*1.7+.4,p0=at(a0,R*.98),p1=at(a0+2.6,R*.98),c=at(a0+1.3,R*.25);
  s+=`<path d="M${p0[0].toFixed(0)} ${p0[1].toFixed(0)} Q${c[0].toFixed(0)} ${c[1].toFixed(0)} ${p1[0].toFixed(0)} ${p1[1].toFixed(0)}" stroke="#5DA8EE" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/><path class="wave" d="M${p0[0].toFixed(0)} ${p0[1].toFixed(0)} Q${c[0].toFixed(0)} ${c[1].toFixed(0)} ${p1[0].toFixed(0)} ${p1[1].toFixed(0)}" stroke="#BFE0FF" stroke-width="2" fill="none" stroke-dasharray="6 10"/>`;
  /* mountains on the rim, forests and villages */
  for(let k=0;k<4;k++){const [x,y]=at(li+k*1.55+.8,R*.9);s+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${(1.1+rnd()*.5).toFixed(2)})">${WD.mountain}</g>`}
  for(let k=0;k<3;k++){const [x,y]=at(li*2+k*2.1,R*(.55+rnd()*.3));for(let t=0;t<6;t++)s+=`<g transform="translate(${(x+(t%3)*14-14).toFixed(0)} ${(y+Math.floor(t/3)*12).toFixed(0)}) scale(.8)">${L.id==="zeraim"||L.id==="kodashim"?WD.olive:L.id==="taharos"?WD.cypress:WD.olive}</g>`}
  for(let k=0;k<3;k++){const [x,y]=at(li*1.3+k*2.3+1,R*(.45+rnd()*.35));s+=`<g class="mdet">${[0,1,2,3].map(t=>`<g transform="translate(${(x+(t%2)*20-10).toFixed(0)} ${(y+Math.floor(t/2)*14).toFixed(0)}) scale(.75)">${L.id==="nezikin"?WD.flathouse:WD.house}</g>`).join("")}</g>`}
  /* animals and people at closer zoom */
  for(let k=0;k<3;k++){const [x,y]=at(rnd()*6.28,R*(.3+rnd()*.5));s+=`<g class="mdet" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(.8)">${WD[["sheep","sheep","donkey"][k]]}</g>`}
  /* landmark islet with a bridge */
  const dir=L.cy<M.H/2?1:-1,ix=L.cx+R*.62,iy=L.cy+dir*(R*.74+70),bx=L.cx+R*.5,by=L.cy+dir*R*.62;
  s+=`<path d="M${bx.toFixed(0)} ${by.toFixed(0)} L${ix.toFixed(0)} ${(iy-dir*20).toFixed(0)}" stroke="#8A5A2B" stroke-width="9"/><path d="M${bx.toFixed(0)} ${by.toFixed(0)} L${ix.toFixed(0)} ${(iy-dir*20).toFixed(0)}" stroke="#C9A06A" stroke-width="5" stroke-dasharray="3 3"/>
   <g transform="translate(${ix.toFixed(0)} ${iy.toFixed(0)})"><path d="${blob(78,li*17+3,10)}" fill="#E8D8A8"/><path d="${blob(66,li*17+5,10)}" fill="${L.c}"/><g transform="translate(0 22) scale(1.5)">${BIGMARK[L.id]||""}</g>
   <g transform="translate(0 52)"><rect x="-58" y="-11" width="116" height="20" rx="10" fill="rgba(255,248,231,.92)" stroke="#C9A34A"/><text y="4" text-anchor="middle" font-size="10" font-weight="800" fill="#3A4664">${{zeraim:"The threshing floor",moed:"Sukkah village",nashim:"The simcha hall",nezikin:"The beis din",kodashim:"Har HaBayis",taharos:"The spring and mikvah"}[L.id]||L.en}</text></g></g>`;
  /* people walking the masechta road (they match your profile) */
  top+=`__WALK${li}__`});
 /* clouds high above, only when far out */
 for(let k=0;k<7;k++){const x=rnd()*M.W,y=rnd()*M.H;top+=`<g class="mcloud" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${(3+rnd()*2).toFixed(1)})" opacity=".55">${WD.cloud}</g>`}
 return {under:s,over:top}}

/* worlds, landmarks and set pieces for Noach and Lech Lecha (chumash units 6–17) */
(()=>{const g=(s,x=0,y=0)=>`<g transform="translate(${x} ${y}) scale(${s})">`;
 const U=[
  {ground:"#86B85E",ground2:"#76A852",deco:["olive","olive","tree","bush","flowers","sheep"],mark:`${g(.8,0,-6)}${PR.ark}</g>`,note:"Noach builds the teivah"},
  {ground:"#5E7A9A",ground2:"#4E6A8A",night:1,stream:false,deco:["reed","rocks","cloud","puddle"],mark:`${g(.75,0,-10)}${PR.arkfloat}</g>${g(.8,0,4)}${PR.flood}</g>`,note:"The Mabul"},
  {ground:"#8AAE7A",ground2:"#7A9E6A",deco:["mountain","olive","puddle","bush","flowers"],mark:`${g(1.3,0,0)}${WD.mountain}</g>${g(1.4,-6,-58)}${PR.dove}</g>`,note:"The raven, the dove and the olive leaf"},
  {ground:"#8FC06A",ground2:"#7FB05A",deco:["vine","vine","flowers","olive","sheep"],mark:`${g(.55,0,0)}${PR.rainbow}</g>`,note:"The bris of the rainbow"},
  {ground:"#A8B86A",ground2:"#98A85A",deco:["house","flathouse","tent","palm","sheep"],mark:`${g(1,0,-30)}${PR.globe}</g>`,note:"Seventy nations"},
  {ground:"#D8B87A",ground2:"#C8A86A",deco:["flathouse","palm","reed","rocks","field"],mark:`${g(.8,0,0)}${PR.tower}</g>`,note:"The tower of Bavel"},
  {ground:"#C9B46E",ground2:"#B9A45E",deco:["palm","tent","sheep","rocks","olive"],mark:`${g(1.2,-24,0)}${PR.camel}</g>${g(1.2,30,0)}${WD.tent}</g>`,note:"Avram sets out"},
  {ground:"#A8C06A",ground2:"#98B05A",deco:["sheep","sheep","tent","olive","river"],mark:`${g(1,-20,0)}${WD.tent}</g>${g(.7,26,0)}${PR.altar}</g>`,note:"Avram and Lot part ways"},
  {ground:"#C8B48A",ground2:"#B8A47A",deco:["rocks","palm","tent","bush"],mark:`${[-30,0,30].map(x=>g(1,x,-8)+PR.crown2+"</g>").join("")}${g(.8,0,8)}${PR.bread}</g>`,note:"Avram saves Lot; Malki-Tzedek"},
  {ground:"#3E5A7A",ground2:"#2E4A6A",night:1,deco:["star","star","tent","rocks","olive"],mark:`${g(1,-24,0)}${PR.furnace}</g>${g(1,26,0)}${PR.torch}</g>`,note:"Count the stars"},
  {ground:"#C9B07A",ground2:"#B9A06A",deco:["palm","rocks","well","bush"],mark:`${g(1.3,0,0)}${PR.well2}</g>${g(1,36,0)}${WD.palm}</g>`,note:"The well of Lachai Ro'i"},
  {ground:"#A8C46A",ground2:"#98B45A",deco:["tent","olive","flowers","sheep","star"],mark:`${g(1.3,0,0)}${WD.tent}</g>${[[-30,-50],[30,-46],[0,-64]].map(([x,y])=>g(1.2,x,y)+WD.star+"</g>").join("")}`,note:"Avram becomes Avraham"}];
 WORLDS.chumash.units=(WORLDS.chumash.units||[]).slice(0,6).concat(U);
 const sp=(s)=>[s];
 Object.assign(SP,{
  c6:[`<g>${g(.9)}${PR.ark}</g></g>`,`<g>${[-50,-20,10,40].map(x=>g(1.1,x,0)+WD.olive+"</g>").join("")}${g(1.2,60,0)}${PR.bricks.replace(/#C9744A/g,"#A8743E")}</g></g>`],
  c7:[`<g>${g(.9,0,-10)}${PR.arkfloat}</g>${g(.9,0,10)}${PR.flood}</g></g>`,`<g>${g(1)}${PR.rain}</g>${g(.8,0,20)}${PR.flood}</g></g>`],
  c8:[`<g>${g(1.6)}${WD.mountain}</g>${g(.6,0,-40)}${PR.ark}</g></g>`,`<g>${g(2,-30,-30)}${PR.raven}</g>${g(2,40,-60)}${PR.dove}</g></g>`],
  c9:[`<g>${g(.8)}${PR.rainbow}</g></g>`,`<g>${g(1)}${PR.vineyard}</g></g>`],
  c10:[`<g>${g(1.4,0,-30)}${PR.globe}</g></g>`,`<g>${[-40,0,40].map(x=>g(1,x,0)+WD.flathouse+"</g>").join("")}</g>`],
  c11:[`<g>${g(1)}${PR.tower}</g>${g(1,70,0)}${PR.bricks}</g></g>`],
  c12:[`<g>${g(1.2,-40,0)}${PR.camel}</g>${g(1.2,10,0)}${WD.sheep}</g>${g(1.2,50,0)}${WD.tent}</g></g>`,`<g>${g(1)}${PR.altar}</g>${g(1,60,0)}${WD.olive}</g></g>`],
  c13:[`<g>${[-50,-25,0,25,50].map(x=>g(1,x,0)+WD.sheep+"</g>").join("")}</g>`,`<g>${g(1.4)}${WD.mountain}</g>${g(1.2,50,4)}${WD.tent}</g></g>`],
  c14:[`<g>${[-36,0,36].map(x=>g(1.2,x,-20)+PR.crown2+"</g>").join("")}${g(.7,0,0)}${PR.sword}</g></g>`,`<g>${g(1,-20,0)}${PR.bread}</g>${g(1,24,-6)}${PR.wine}</g></g>`],
  c15:[`<g>${g(1.2,-30,0)}${PR.furnace}</g>${g(1.2,30,0)}${PR.torch}</g></g>`,`<g>${[[-60,-60],[-20,-80],[20,-66],[60,-84],[0,-40],[40,-40]].map(([x,y])=>g(1.6,x,y)+WD.star+"</g>").join("")}</g>`],
  c16:[`<g>${g(1.6)}${PR.well2}</g>${g(1.2,-50,0)}${WD.palm}</g>${g(1.2,50,0)}${WD.palm}</g></g>`],
  c17:[`<g>${g(1.6)}${WD.tent}</g>${[[-50,-50],[50,-56],[0,-80]].map(([x,y])=>g(1.6,x,y)+WD.star+"</g>").join("")}</g>`]});
})();

/* worlds and landmarks for Chayei Sarah (chumash units 18–19) */
(()=>{const g=(s,x=0,y=0)=>`<g transform="translate(${x} ${y}) scale(${s})">`;
 const U=[{ground:"#B8B07A",ground2:"#A8A06A",deco:["olive","rocks","tree","house","bush"],mark:`${g(.8,0,-2)}${PR.cave}</g>`,note:"Me'aras HaMachpelah in Chevron"},
  {ground:"#C9B07A",ground2:"#B9A06A",deco:["palm","rocks","well","sheep","bush"],mark:`${g(1.2,-22,0)}${PR.well2}</g>${g(1,26,0)}${PR.camel}</g>`,note:"Eliezer at the well"}];
 const W=WORLDS.chumash.units||(WORLDS.chumash.units=[]);while(W.length<18)W.push({});W[23]=U[0];W[24]=U[1];
 Object.assign(SP,{
  c23:[`<g>${g(1.4)}${PR.cave}</g>${g(1.1,-90,0)}${WD.olive}</g>${g(1.1,90,0)}${WD.olive}</g></g>`,`<g>${g(1.4)}${PR.coins}</g>${g(1,-60,0)}${WD.house}</g></g>`],
  c24:[`<g>${g(1.5)}${PR.well2}</g>${g(.7,0,-26)}${PR.jug}</g>${g(1.2,-70,0)}${PR.camel}</g>${g(1.2,70,0)}${PR.camel}</g></g>`,`<g>${g(1.2,0,-30)}${PR.jewels}</g>${g(1,60,0)}${PR.trough}</g></g>`]});
})();

/* question balance: wrong answers rewritten to be as long as the right one; about half of true/false questions are now false */
