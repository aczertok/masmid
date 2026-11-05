/* ================= WORLDS: each course is a world; each unit is a region you claim ================= */
const WD={ /* decoration pieces, feet/base at (0,0) */
 olive:`<rect x="-3" y="-22" width="6" height="22" rx="2" fill="#7A5A3A"/><ellipse cy="-30" rx="18" ry="12" fill="#7E9A5A"/><ellipse cx="-9" cy="-24" rx="10" ry="7" fill="#8DAA66"/><circle cx="6" cy="-32" r="2" fill="#3E4A2A"/><circle cx="-6" cy="-27" r="2" fill="#3E4A2A"/>`,
 palm:`<path d="M0 0q-4-22 2-44" stroke="#8A6A3A" stroke-width="5" fill="none"/><g class="rock" style="transform-origin:2px -44px">${[-150,-110,-70,-30,10].map(a=>`<path d="M2 -44q${Math.cos(a*Math.PI/180)*14} ${Math.sin(a*Math.PI/180)*14-6} ${Math.cos(a*Math.PI/180)*26} ${Math.sin(a*Math.PI/180)*26+6}" stroke="#4E8A3A" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("")}</g><circle cx="0" cy="-42" r="3" fill="#8A3A1A"/><circle cx="5" cy="-41" r="3" fill="#8A3A1A"/>`,
 wheat:`${[-14,-7,0,7,14].map((x,i)=>`<g class="rock" style="animation-delay:${i*.2}s"><path d="M${x} 0v-18" stroke="#C9A040" stroke-width="2"/><ellipse cx="${x}" cy="-21" rx="2.6" ry="6" fill="#E3B84A"/></g>`).join("")}`,
 vine:`${[-16,0,16].map(x=>`<path d="M${x} 0v-18" stroke="#6B4A2A" stroke-width="2.5"/><circle cx="${x}" cy="-20" r="8" fill="#5E9A44"/><g fill="#6A3A8A"><circle cx="${x-2}" cy="-14" r="2.4"/><circle cx="${x+2}" cy="-14" r="2.4"/><circle cx="${x}" cy="-10" r="2.4"/></g>`).join("")}<path d="M-22 -16h44" stroke="#8A6A3A" stroke-width="1.5"/>`,
 field:`<path d="M-30 0l8-14h52l-8 14z" fill="#B88A4A"/>${[0,1,2].map(r=>`<path d="M${-27+r*3} ${-4-r*4}h${50-r*2}" stroke="#9A6E36" stroke-width="1.5"/>`).join("")}`,
 house:`<rect x="-14" y="-18" width="28" height="18" fill="#E7D3AE"/><path d="M-17 -17l17-12 17 12z" fill="#B85A3A"/><rect x="-4" y="-10" width="8" height="10" fill="#7A4E2A"/><rect class="win" x="6" y="-14" width="5" height="5" fill="#FFE29A"/>`,
 flathouse:`<rect x="-16" y="-20" width="32" height="20" fill="#D8BE8A"/><rect x="-18" y="-22" width="36" height="3" fill="#B89A62"/><rect x="-4" y="-11" width="8" height="11" rx="4" fill="#6B4A2A"/><rect class="win" x="-12" y="-16" width="5" height="5" fill="#FFE29A"/>`,
 well:`<ellipse cy="-2" rx="12" ry="4" fill="#5A6070"/><rect x="-12" y="-12" width="24" height="10" fill="#9AA0AE"/><path d="M-10 -12v-14h20v14" stroke="#7A5A3A" stroke-width="2.5" fill="none"/><path d="M0 -26v8" stroke="#7A5A3A" stroke-width="1.5"/>`,
 rocks:`<ellipse cx="-6" cy="-4" rx="9" ry="6" fill="#A8A29A"/><ellipse cx="7" cy="-3" rx="6" ry="4" fill="#9A948C"/>`,
 bush:`<circle cx="-6" cy="-6" r="7" fill="#5E9A44"/><circle cx="5" cy="-7" r="8" fill="#6AAA4E"/><circle cx="0" cy="-12" r="6" fill="#74B456"/>`,
 flowers:`${[-8,0,8].map((x,i)=>`<path d="M${x} 0v-8" stroke="#4E7A44" stroke-width="1.5"/><circle cx="${x}" cy="-10" r="3" fill="${["#E57373","#FFD54F","#BA68C8"][i]}"/>`).join("")}`,
 sheep:`<g class="bob"><ellipse cy="-8" rx="10" ry="7" fill="#FFFFFF" stroke="#D9D9D9"/><circle cx="10" cy="-11" r="4" fill="#3A3A3A"/><rect x="-6" y="-3" width="2" height="4" fill="#3A3A3A"/><rect x="4" y="-3" width="2" height="4" fill="#3A3A3A"/></g>`,
 tent:`<path d="M-16 0l16-22 16 22z" fill="#C98A20"/><path d="M0 0l-5-8h10z" fill="#7A4E12"/>`,
 hill:`<path d="M-50 0q50-46 100 0z" fill="var(--wh,#9DBE6A)"/>`,
 cloud:`<g class="drift"><ellipse rx="22" ry="8" fill="#FFFFFF" opacity=".9"/><ellipse cx="-9" cy="-5" rx="11" ry="8" fill="#FFFFFF" opacity=".9"/><ellipse cx="8" cy="-6" rx="12" ry="9" fill="#FFFFFF" opacity=".9"/></g>`,
 bird:`<path class="bob" d="M-8 0q4-5 8 0q4-5 8 0" stroke="#3A2A1A" stroke-width="1.6" fill="none"/>`,
 reed:`<g class="rock">${[-4,0,4].map(x=>`<path d="M${x} 0q-1-14 ${x*.5} -22" stroke="#6E9A4E" stroke-width="2" fill="none"/>`).join("")}</g>`,
 dome:`<rect x="-20" y="-24" width="40" height="24" fill="#D8BE8A"/><path d="M-14 -24q14-22 28 0z" fill="#3E6FB8"/><rect class="win" x="-14" y="-16" width="6" height="8" rx="3" fill="#FFE29A"/><rect class="win" style="animation-delay:1s" x="8" y="-16" width="6" height="8" rx="3" fill="#FFE29A"/><rect x="-4" y="-12" width="8" height="12" rx="4" fill="#6B4A2A"/>`,
 lamp:`<rect x="-1.5" y="-26" width="3" height="26" fill="#5A5A6A"/><rect x="-5" y="-32" width="10" height="7" rx="2" fill="#FFE29A"/><circle class="pulse" cy="-28" r="9" fill="#FFE9A8" opacity=".4"/>`,
 star:`<path class="tw" d="M0 -6l1.6 4.4L6 -1.4 1.6 0 0 4.4-1.6 0-6-1.4-1.6-1.6z" fill="#FFF3B8"/>`
};
const WORLDS={
 mishnayos:{name:"Seder Zeraim",he:"עולם הזרעים",tag:"Plant each perek and bring in the harvest",verb:"Harvested",sky:["#9CCBF4","#E9F4FF"],ground:"#9DC46A",ground2:"#8AB65A",road:"#E2C58C",edge:"#C7A666",flag:"#2F6B57",
  deco:["wheat","wheat","olive","vine","field","palm","house","well","sheep","bush","flowers","rocks"],
  land:(u,f,done)=>`${[-36,-12,12,36].map((x,k)=>`<g transform="translate(${x} 0)">${f>k/4||done?(f>=.99||done?WD.wheat:`<g transform="scale(1 ${Math.max(.35,f)})">${WD.wheat.replace(/#E3B84A/g,"#8CC25A").replace(/#C9A040/g,"#5E9A44")}</g>`):`<path d="M-14 0h28" stroke="#9A6E36" stroke-width="3"/>`}</g>`).join("")}<path d="M-52 2h104" stroke="#9A6E36" stroke-width="4"/>${done?`<g transform="translate(0 -6)"><path d="M-6 0l6-26 6 26z" fill="#E3B84A" stroke="#B08E45"/><path d="M-8 -12h16" stroke="#B08E45" stroke-width="3"/></g>`:""}`},
 halacha:{name:"A day, in order",he:"עולם ההלכה",tag:"Walk through the day, siman by siman",verb:"Mastered",sky:["#F6C877","#FFE9C2"],ground:"#B8C98A",ground2:"#A8BC78",road:"#D9D2C4",edge:"#B8AE9C",flag:"#4E9A33",
  deco:["house","house","flathouse","lamp","bush","flowers","olive","well","cloud"],
  land:(u,f,done)=>`<rect x="-40" y="-46" width="80" height="46" fill="#E7D3AE"/><path d="M-46 -44l46-28 46 28z" fill="#8A5A3A"/><rect x="-10" y="-26" width="20" height="26" rx="10" fill="#6B4A2A"/>${[-30,20].map((x,k)=>`<rect x="${x}" y="-38" width="10" height="12" rx="5" fill="${f>(k+1)/3||done?"#FFE29A":"#5A6070"}"/>`).join("")}<text y="-52" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="13" fill="#FFF8E7">${u.unit.he}</text>`},
 chumash:{name:"Bereishis",he:"עולם הבריאה",tag:"Watch the world fill up, perek by perek",verb:"Completed",sky:["#7FB6EE","#E6F2FF"],ground:"#86B85E",ground2:"#76A852",road:"#E8D9B0",edge:"#C9B788",flag:"#C98A20",
  deco:["olive","bush","flowers","bird","cloud","sheep","palm","rocks","reed"],
  land:(u,f,done,ui)=>{const L=[`<circle r="26" cy="-34" fill="#FFF7D6"/>${[0,45,90,135,180,225,270,315].map(a=>`<path d="M${Math.cos(a*Math.PI/180)*30} ${-34+Math.sin(a*Math.PI/180)*30}l${Math.cos(a*Math.PI/180)*10} ${Math.sin(a*Math.PI/180)*10}" stroke="#FFE08A" stroke-width="4" stroke-linecap="round"/>`).join("")}`,
   `${WD.olive.replace(/#7E9A5A/g,"#4E8A3A")}<g transform="translate(-34 0)">${WD.palm}</g><g transform="translate(34 0)">${WD.olive}</g><path d="M-60 4q60-10 120 0" stroke="#5DA8EE" stroke-width="6" fill="none"/>`,
   `<g transform="scale(1.6)">${WD.olive}</g><circle cx="10" cy="-50" r="4" fill="#C0392B"/><circle cx="-12" cy="-44" r="4" fill="#C0392B"/>`,
   `<rect x="-44" y="-20" width="30" height="20" fill="#9AA0AE"/><rect x="14" y="-20" width="30" height="20" fill="#9AA0AE"/><path class="flame" style="transform-origin:29px -20px" d="M29 -20c-6-8-4-16 0-22 4 6 6 14 0 22z" fill="#F46A1C"/><g transform="translate(-29 -20)">${WD.sheep}</g>`,
   `<rect x="-30" y="-44" width="60" height="44" rx="4" fill="#FBF6E8" stroke="#8A5A2B" stroke-width="3"/>${[0,1,2,3,4].map(r=>`<path d="M-22 ${-36+r*8}h44" stroke="#C9BC98" stroke-width="2"/>`).join("")}`,
   `<path d="M-50 -8h100l-12 12h-76z" fill="#8A5A2B"/><rect x="-30" y="-30" width="60" height="22" fill="#A8743E"/><path d="M-34 -30l34-14 34 14z" fill="#6B4423"/>`];return L[ui%L.length]}},
 tanakh:{name:"Eretz Yisrael",he:"ארץ ישראל",tag:"Cross the Yarden and claim the land, perek by perek",verb:"Claimed",sky:["#8CC2F2","#F3EFD8"],ground:"#C9B46E",ground2:"#B9A45E",road:"#EADBB0",edge:"#C9B07A",flag:"#7D5CC0",
  deco:["palm","olive","rocks","tent","sheep","bush","vine","field","hill"],
  land:(u,f,done,ui)=>{const L=[`${[-34,0,34].map(x=>`<g transform="translate(${x} 0) scale(1.3)">${WD.tent}</g>`).join("")}`,
   `<rect x="-50" y="-48" width="100" height="48" fill="#B9925E"/>${[-50,-30,-10,10,30].map(x=>`<rect x="${x}" y="-56" width="10" height="8" fill="#B9925E"/>`).join("")}<rect x="-10" y="-20" width="20" height="20" rx="10" fill="#5A3E22"/><rect x="24" y="-40" width="10" height="10" fill="#FFE29A"/><path d="M29 -30q4 10 0 20" stroke="#D32F2F" stroke-width="3" fill="none"/>`,
   `<path d="M-60 0h40V-40q-8 6-14 0t-12 6v34zM60 0h-40V-40q8 6 14 0t12 6v34z" fill="#5DA8EE"/><rect x="-20" y="-6" width="40" height="6" fill="#C9A85A"/><g transform="translate(0 -14) scale(.6)"><rect x="-28" y="-30" width="56" height="30" rx="2" fill="#D9B24A"/></g>`,
   `${[[-26,0,14],[0,0,15],[26,0,14],[-13,-20,13],[13,-20,13],[0,-38,12]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y-6}" rx="${r}" ry="${r*.8}" fill="#A0A6B2" stroke="#7E8494" stroke-width="2"/>`).join("")}`,
   `${[-30,0,30].map(x=>`<g transform="translate(${x} 0)">${WD.tent}</g>`).join("")}<ellipse cx="0" cy="-34" rx="22" ry="10" fill="#E8C98A" stroke="#C49A55"/>`];return L[ui%L.length]}},
 gemara:{name:"Bavel",he:"ישיבות בבל",tag:"Light up the yeshivos along the Pras, one daf at a time",verb:"Lit up",sky:["#F2B26A","#FCE6C2"],ground:"#D2B87A",ground2:"#C4A86A",road:"#EBDDBA",edge:"#C8B184",flag:"#CF4237",
  deco:["palm","palm","flathouse","flathouse","reed","rocks","well","dome","bush"],
  land:(u,f,done)=>`<rect x="-50" y="-44" width="100" height="44" fill="#D8BE8A"/><path d="M-30 -44q30-36 60 0z" fill="#3E6FB8"/><path d="M0 -76v-10M-5 -82h10" stroke="#C9A34A" stroke-width="2"/>${[-40,-22,14,32].map((x,k)=>`<rect class="${f>(k+1)/5||done?"win":""}" x="${x}" y="-34" width="8" height="12" rx="4" fill="${f>(k+1)/5||done?"#FFE29A":"#5A6070"}"/>`).join("")}<rect x="-8" y="-22" width="16" height="22" rx="8" fill="#6B4A2A"/><text y="-50" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="11" fill="#FFF8E7">${u.unit.he.length<14?u.unit.he:""}</text>`}
};
const WSTEP=118,WTOP=70,WBOT=170,WOFF=[0,-70,-96,-52,22,82,64,0,-46,-84];
let wSeed=1;const wRnd=()=>(wSeed=(wSeed*9301+49297)%233280)/233280;
function worldOf(){return WORLDS[CRS.id]||WORLDS.mishnayos}
function unitProgress(u){const n=u.nodes.length,d=u.nodes.filter((x,i)=>S.lessons[x.id]?.done).length;return {d,n,f:d/n,done:!!S.lessons[u.testId]?.done}}
function worldBanner(){const W=worldOf(),P=CRS.units.map(unitProgress),claimed=P.filter(p=>p.done).length,pct=Math.round(P.reduce((a,p)=>a+p.f,0)/P.length*100);
 const here=LT.room?LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.pos&&p.presence.pos.c===CRS.id).length:0;
 return `<section class="wbanner" style="--wa:${W.sky[0]};--wb:${W.ground}"><div class="wb-t"><small>World</small><h2>${W.name}</h2><p>${W.tag}</p></div><span class="he">${W.he}</span>
 <div class="wb-map">${CRS.units.map((u,ui)=>{const p=P[ui];return `<button class="wb-reg ${p.done?"won":p.d?"part":""}" data-jump="${ui}" title="${esc(u.unit.t)}"><svg viewBox="-60 -70 120 80" aria-hidden="true">${W.land(u,p.f,p.done,ui)}${p.done?`<g transform="translate(46 -40)"><path d="M0 0v-26" stroke="#3A2A1A" stroke-width="2.5"/><path d="M0 -26h18l-5 6 5 6H0z" fill="${W.flag}"/></g>`:""}</svg><i style="width:${Math.round(p.f*100)}%"></i></button>`}).join("")}</div>
 <div class="wb-stats"><span><b>${claimed}</b>/${P.length} ${W.verb.toLowerCase()}</span><span><b>${pct}%</b> of the world</span>${here?`<span class="wb-live"><span class="live"></span><b>${here}</b> here now</span>`:""}</div></section>`}
function regionView(u,ui,cur,anyDone){const W=worldOf(),p=unitProgress(u),N=u.nodes.length,H=WTOP+(N-1)*WSTEP+WBOT;
 const pts=u.nodes.map((n,i)=>[WOFF[i%WOFF.length],WTOP+i*WSTEP]);const last=pts[N-1],lx=last[0]>0?-70:70,ly=H-40;
 let d=`M${pts[0][0]} -10 L${pts[0][0]} ${pts[0][1]}`;
 for(let i=1;i<N;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i];d+=` C${x0} ${y0+WSTEP*.5} ${x1} ${y1-WSTEP*.5} ${x1} ${y1}`}
 d+=` C${last[0]} ${last[1]+60} ${lx} ${ly-60} ${lx} ${ly-14}`;
 const roadX=y=>{if(y<=pts[0][1])return pts[0][0];for(let i=1;i<N;i++)if(y<=pts[i][1]){const t=(y-pts[i-1][1])/WSTEP;return pts[i-1][0]+(pts[i][0]-pts[i-1][0])*(3*t*t-2*t*t*t)}return lx};
 wSeed=17+ui*131+CRS.id.length*7;let deco="";const taken=[];
 for(let k=0;k<70&&taken.length<Math.round(H/34);k++){const x=-175+wRnd()*350,y=30+wRnd()*(H-60);
  if(Math.abs(x-roadX(y))<62||(Math.abs(x-lx)<80&&y>ly-110)||taken.some(([a,b])=>Math.hypot(a-x,b-y)<46))continue;
  taken.push([x,y]);const kind=W.deco[Math.floor(wRnd()*W.deco.length)],s=.8+wRnd()*.5;
  const sky=kind==="cloud"||kind==="bird";deco+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${(sky?s:s).toFixed(2)})"${sky?"":""}>${WD[kind]}</g>`}
 deco=deco.split("</g><g transform").length?deco:deco;
 const sorted=deco; /* drawn in random order; fine at this size */
 const fog=!p.d&&!(cur&&cur.ui===ui)?`<rect x="-400" y="0" width="800" height="${H}" fill="#E8EEF6" opacity=".38"/>`:"";
 const flag=p.done?`<g class="wflag" transform="translate(${lx+52} ${ly})"><path d="M0 0v-70" stroke="#3A2A1A" stroke-width="3"/><g class="wave-flag"><path d="M0 -70h40l-9 11 9 11H0z" fill="${W.flag}"/><text x="16" y="-55" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">✓</text></g></g>`:"";
 const nodes=u.nodes.map((n,i)=>{const st=nodeState(u,i),isCur=!!cur&&cur.ui===ui&&cur.i===i,cls=[n.kind==="review"?"review":"",n.kind==="test"?"test":"",st,isCur?"current":""].join(" ");
  const ic=st==="locked"?I.lock:n.kind==="review"?I.repeat:n.kind==="test"?I.crown:st==="done"?I.check:I.book;
  const stars=S.lessons[n.id]?.stars||0;const title=n.lesson?n.lesson.title:n.title,short=n.lesson?n.lesson.short:n.short;const [x,y]=pts[i];
  return `<button class="node wnode ${cls}" data-node="${ui}:${i}" style="left:calc(50% + ${x}px);top:${y}px" aria-label="${esc(title)} — ${st}">${isCur?`<span class="start-tag">${anyDone?"Next":"Start"}</span>`:""}<span class="disc">${ic}</span>${isCur?ner(i===0&&!anyDone?"happy":"cheer","buddy").replace('class="ner buddy"',`class="ner buddy" style="${x>0?"right":"left"}:calc(100% + 10px)"`):""}${st==="done"&&n.kind==="lesson"?`<span class="stars">${[1,2,3].map(k=>`<span class="${k<=stars?"":"off"}">${I.star}</span>`).join("")}</span>`:""}<span class="lbl">${esc(title)}<small>${esc(short)}</small></span></button>`}).join("");
 const started=p.d>0;
 return `<section class="unit wunit${p.done?" won":""}" id="reg${ui}" style="--wf:${W.flag}"><div><small>${u.unit.s}</small><h2>${u.unit.t}</h2>${CRS.units.length>1&&!started?`<p class="unit-note">Open anytime. You don't need to finish the one before.</p>`:""}
  <div class="wprog"><i style="width:${Math.round(p.f*100)}%"></i></div><p class="unit-note">${p.done?`${W.verb} ✓`:`${p.d} of ${p.n} steps`}</p></div><span class="he">${u.unit.he}</span></section>
 <div class="region" style="height:${H}px"><svg class="terrain" viewBox="-200 0 400 ${H}" style="height:${H}px" aria-hidden="true" preserveAspectRatio="xMidYMin slice">
  <defs><linearGradient id="wg${ui}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${W.ground}"/><stop offset="1" stop-color="${W.ground2}"/></linearGradient></defs>
  <rect x="-400" y="0" width="800" height="${H}" fill="url(#wg${ui})"/>
  ${CRS.id==="gemara"||CRS.id==="tanakh"?`<path d="M${CRS.id==="gemara"?150:-150} 0 q30 ${H/4} 0 ${H/2} t0 ${H/2}" stroke="#5DA8EE" stroke-width="26" fill="none" opacity=".85"/><path class="wave" d="M${CRS.id==="gemara"?150:-150} 0 q30 ${H/4} 0 ${H/2} t0 ${H/2}" stroke="#BFE0FF" stroke-width="2" fill="none" stroke-dasharray="10 14"/>`:""}
  ${deco}
  <path d="${d}" stroke="${W.edge}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${W.road}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-dasharray="2 12" opacity=".7" stroke-linecap="round"/>
  <g transform="translate(${lx} ${ly})"><ellipse cy="2" rx="70" ry="10" fill="#000" opacity=".08"/><g class="${p.done?"wlit":""}" ${p.done||p.d?"":'opacity=".55"'}>${W.land(u,p.f,p.done,ui)}</g></g>
  ${flag}${fog}</svg>
  ${nodes}<div class="wpeers" data-u="${ui}"></div></div>`}
function drawWorldPeers(){document.querySelectorAll(".wpeers").forEach(el=>{const ui=+el.dataset.u,u=CRS.units[ui];if(!u){el.innerHTML="";return}
  const list=LT.room?LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.pos&&p.presence.pos.c===CRS.id&&p.presence.pos.u===u.key):[];
  const byNode={};list.forEach(p=>{const i=Math.max(0,Math.min(u.nodes.length-1,+p.presence.pos.i||0));(byNode[i]=byNode[i]||[]).push(p)});
  const now=Date.now();
  el.innerHTML=Object.entries(byNode).map(([i,ps])=>{const x=WOFF[i%WOFF.length],y=WTOP+i*WSTEP,side=x>0?-1:1;
   return ps.slice(0,4).map((p,k)=>{const nick=ltStr(p.presence.nick,24)||"A fellow learner",cool=(LT.cool[p.peer]||0)>now;
    return `<button class="wpeer" data-hi="${esc(p.peer)}" style="left:calc(50% + ${x+side*(70+k*30)}px);top:${y-18+k*6}px;--pc:${ltColor(nick)}" title="${esc(nick)} — tap for a Yasher Koach" ${cool?"disabled":""}><span class="av">${esc(nick.slice(0,1).toUpperCase())}</span><span class="nk">${esc(nick.split(" ")[0])}</span></button>`}).join("")+(ps.length>4?`<span class="wpeer more" style="left:calc(50% + ${x+side*190}px);top:${y-10}px">+${ps.length-4}</span>`:"")}).join("");
  el.querySelectorAll("[data-hi]").forEach(b=>b.onclick=e=>{e.stopPropagation();ltSendHi(b.dataset.hi)})})}
function bindWorld(){document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>{const t=$("#reg"+b.dataset.jump);if(t)t.scrollIntoView({behavior:"smooth",block:"start"})});
 S.claimSeen=S.claimSeen||{};let fresh=null;
 CRS.units.forEach((u,ui)=>{if(S.lessons[u.testId]?.done&&!S.claimSeen[u.key]){S.claimSeen[u.key]=1;fresh=ui}});
 if(fresh!=null){save();const W=worldOf(),el=$("#reg"+fresh);if(el){el.nextElementSibling?.classList.add("claiming");setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"start"}),300)}
  const d=document.createElement("div");d.className="hitoast";d.setAttribute("role","status");d.innerHTML=`${ner("cheer")}<p><b>${esc(CRS.units[fresh].unit.t)}</b> — ${W.verb.toLowerCase()}! Your flag is up.</p>`;document.body.appendChild(d);setTimeout(()=>d.remove(),4200)}
 drawWorldPeers()}
