/* ================= LESSON ENGINE ================= */
let R=null; // run state
function openNode(ui,i){if(CRS.units[ui]&&CRS.units[ui].lazy){if(!KZ.ready){if(CRS.units[ui].adult&&isKid()){toast("This siman is learned with a parent or Rav.");return}toast("Loading the Kitzur…");kzLoad().then(()=>openNode(ui,i)).catch(()=>toast("Couldn't load the Kitzur. Check your connection and try again."));return}if(KZ.kid!==isKid())kzFill()}
 const u=CRS.units[ui],st=nodeState(u,i),n=u.nodes[i];if(st!=="locked"){LT.pos={c:CRS.id,u:u.key,i}}if(st==="locked"){if(u.adult&&isKid()){toast("This siman is learned with a parent or Rav.");return}toast(n.kind==="lesson"?"Finish the lesson before this one to unlock it":"Finish every lesson in this "+u.unitWord+" first");return}
 if(n.kind==="lesson")startLesson(n.lesson);else if(n.kind==="review")startReview(true,u);else startTest(u)}
function startLesson(l){runSteps({kind:"lesson",id:l.id,lesson:l,unit:l.U,steps:l.steps.map(s=>({...s}))})}
function poolDone(u){return Object.values(ALLQ).filter(q=>(u?q.unit===u.key:q.course===CRS.id)&&S.lessons[q.lesson]?.done)}
function startReview(isNode,u){let ids=dueItems().filter(id=>!isNode||ALLQ[id].unit===u.key);if(ids.length<8){const extra=poolDone(isNode?u:null).map(q=>q.id).filter(id=>!ids.includes(id)).sort((a,b)=>((S.srs[a]||{}).box||0)-((S.srs[b]||{}).box||0));ids=ids.concat(shuffle(extra.slice(0,12))).slice(0,8)}else ids=ids.slice(0,10);
 if(!ids.length){toast("Finish a lesson first");return}
 runSteps({kind:"review",id:isNode?u.revId:null,unit:isNode?u:null,steps:shuffle(ids).map(id=>({...ALLQ[id]}))})}
function startTest(u){const ids=shuffle(Object.keys(ALLQ).filter(k=>ALLQ[k].unit===u.key)).slice(0,10);runSteps({kind:"test",id:u.testId,unit:u,steps:ids.map(id=>({...ALLQ[id]}))})}

function runSteps(run){ltDoing(run.kind==="lesson"?run.lesson.title:run.kind==="review"?"Chazarah":"Test");R=Object.assign(run,{i:0,queue:run.steps.slice(),total:run.steps.length,doneCount:0,correct:0,answered:0,firstTry:{},mistakes:0});
 const l=$("#layer");l.innerHTML=`<div class="overlay" id="ov"><div class="inner"><div class="lhead wrap"><button class="iconbtn" id="quit" aria-label="Quit lesson">${I.x}</button><div class="bar"><i id="pbar" style="width:0%"></i></div><span class="ltchip" id="ltchip" hidden></span><span class="lscore" id="lscore" aria-label="Correct answers">${I.check}0</span></div><div class="lbody wrap" id="lbody"></div><div class="lfoot wrap" id="lfoot"></div></div></div>`;
 document.body.style.overflow="hidden";$("#quit").onclick=quitAsk;refreshLT();showStep()}
function quitAsk(){const f=$("#lfoot");f.className="lfoot wrap";f.innerHTML=`<div class="fb"><b>Leave this lesson?</b><p>You'll lose this lesson's progress.</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn ghost" id="stay">Keep learning</button><button class="btn red" id="leave">Leave</button></div>`;
 $("#stay").onclick=()=>showStep(true);$("#leave").onclick=closeRun}
function closeRun(){ltDoing("Browsing");R=null;$("#layer").innerHTML="";document.body.style.overflow="";render()}
function setBar(){$("#pbar").style.width=(R.doneCount/R.total*100)+"%"}

let cur=null; // current question interaction state
function showStep(keep){setBar();if(!R.queue.length)return finish();const s=R.queue[0];const body=$("#lbody");
 if(!keep){body.scrollTop=0;cur={s,sel:null,ans:[],matched:0,err:0,pick:null}}
 const f=$("#lfoot");f.className="lfoot wrap";
 if(s.t==="learn"){body.innerHTML=learnCard(s);f.innerHTML=`<button class="btn block" id="cont">Continue</button>`;bindLearn();$("#cont").onclick=()=>{R.queue.shift();R.doneCount++;showStep()};return}
 if(!keep)body.innerHTML=qHTML(s);
 f.innerHTML=s.t==="match"?`<p class="small" style="text-align:center">Tap a pair to match</p>`:`<button class="btn green block" id="check" ${cur.sel==null&&!(s.t==="order"&&cur.ans.length)?"disabled":""}>Check</button>`;
 bindQ(s);if(s.t!=="match")$("#check").onclick=()=>check(s)}

function learnCard(s){const l=R.lesson,U=l.U,parts=l.parts,ph=l.phrases.slice(s.from,s.to);
 const li=l.steps.filter(x=>x.t==="learn").findIndex(x=>x.from===s.from);const sid=(STEP_SCENES[l.id]||[])[li]||l.id;
 const fmtEn=t=>esc(t).replace(/\[([^\]]*)\]/g,'<span class="inl">[$1]</span>');
 const fmtHe=t=>esc(t).replace(/\(([^)]*)\)/g,'<span class="vref">($1)</span>');
 const lastLearn=l.steps.filter(x=>x.t==="learn").length-1;
 const refPart=s.mref!=null?s.mref:(parts.length>1?parts[Math.min(li,parts.length-1)]:parts[0]);
 return `${l.noScene?"":`<div class="lscene">${scene(sid)}${capHTML(sid)}</div>`}<div class="qkind">New learning</div><h2 class="qtext">${esc(l.title)}</h2>
 <div class="source-box"><div class="ref"><span>${U.ref(refPart)}</span><span>${li>0&&(parts.length===1||l.steps.filter(x=>x.t==="learn")[li-1].mref===s.mref)?"continued":""}</span></div>
 <div class="phrases${readLine()?" line":""}">${ph.map((p,k)=>`<button class="ph" data-ph="${k}"><span class="he">${esc(p[0])}</span><span class="gl">${esc(p[1])}</span></button>`).join("")}</div>
 <p class="hint"><span>${readLine()?"Line by line, each with its translation.":"Tap a phrase to see its meaning."}${l.noScene?"":" ▶ jumps the cartoon to it."}</span><button class="linkbtn" id="readMode">${readLine()?"Quiz me":"Line by line"}</button><button class="linkbtn" id="revealAll"${readLine()?" hidden":""}>Show all</button></p></div>
 ${s.note?`<div class="note"><b>${esc(s.note[0])}</b>${esc(s.note[1])}</div>`:""}
 <details class="full"><summary>${CRS.fullTitle}</summary>
 ${parts.map((m,pi)=>`<div class="fullhead"><span class="he">${U.fullHe(m)}</span>${pi===0?`<label class="toggle"><input type="checkbox" id="bt" checked> ${CRS.commToggle}</label>`:""}</div>
 <div class="msecs">${U.sections[m].map(x=>`<section class="msec"><p class="he mhe">${fmtHe(x.he)}</p><p class="men">${fmtEn(x.en)}</p>${x.c.map(c=>`<div class="bcomm"><span class="blab">${CRS.commHe}</span>${c[2]?`<p class="he rhe">${esc(c[2])}</p>`:""}${c[0]?`<b>${esc(c[0])}</b> — `:""}${fmtEn(c[1])}</div>`).join("")}</section>`).join("")}</div>`).join("")}
 <p class="attrib">Hebrew: ${U.source.he.title}, ${U.source.he.license}. ${CRS.enLabel}: ${U.source.en.title}, ${U.source.en.license}. Via Sefaria. Divided into sections for this app.</p></details>`}
/* tapping a phrase jumps the cartoon to the moment that shows it; while it plays, the phrase being shown lights up */
const HSTOP=new Set(["את","של","על","לא","כי","אם","או","אל","עד","מן","גם","זה","זו","הוא","היא","הם","כל","לו","לה","בו","בה","אשר","ואת","ולא","כן","אין","יש","מה","מי","אני","אתה"]);
function heWords(s){return String(s||"").replace(/[\u0591-\u05C7]/g,"").replace(/[^\u05D0-\u05EA\s]/g," ").split(/\s+/).filter(w=>w.length>1&&!HSTOP.has(w))}
const heBase=w=>w.length>3&&"והבלמשכ".includes(w[0])?w.slice(1):w;
(()=>{const st=document.createElement("style");st.textContent=`.ph.ph-link .he::after{content:"▶";font-size:.5em;vertical-align:super;margin-inline-start:4px;color:var(--blue,#2457A6);opacity:.55}
.ph.ph-live{border-color:#E3B84A!important;background:rgba(255,213,79,.22)!important;box-shadow:0 0 0 2px rgba(227,184,74,.35)}
.scpip{position:fixed;z-index:40;top:calc(env(safe-area-inset-top,0px) + 58px);right:12px;width:min(62vw,260px);border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.3);border:2px solid #fff;background:#fff;animation:zin .25s ease-out}.scpip[hidden]{display:none}.scpip svg{display:block;width:100%;height:auto}.scpip-x{position:absolute;top:4px;right:4px;width:24px;height:24px;border-radius:50%;border:0;background:rgba(22,33,58,.7);color:#fff;font-size:12px;cursor:pointer}
@keyframes seekflash{0%{filter:brightness(1.35)}100%{filter:none}}svg.scene.seek{animation:seekflash .5s ease-out}`;document.head.appendChild(st)})();
function linkScene(){const svg=document.querySelector(".lscene svg.scene");if(!svg)return;const sc=SCENES[svg.dataset.sid];if(!sc||!sc.marks||!sc.T)return;
 const phs=[...document.querySelectorAll(".ph")];let M,best;
 if(sc.phBeat&&sc.nb>1){/* explicit: each phrase has its own scene */
  M=Array.from({length:sc.nb},(_,i)=>({t:i*sc.D+.45,beat:i}));best=phs.map((_,k)=>sc.phBeat[Math.min(k,sc.phBeat.length-1)])}
 else{M=sc.marks.map(m=>{const w=heWords(m.text);return {...m,w:new Set(w),b:new Set(w.map(heBase))}});if(!M.some(m=>m.w.size)&&!(sc.nb>1))return;
  best=phs.map(b=>{const w=heWords(b.querySelector(".he")?.textContent);let bi=-1,bs=0;
   M.forEach((m,i)=>{let s=0;w.forEach(x=>{if(m.w.has(x))s+=1;else if(m.b.has(heBase(x)))s+=.7});s=s/Math.max(1,Math.min(w.length,m.w.size)*.5+.5);if(s>bs+.01){bs=s;bi=i}});return bs>=.6?bi:-1});
  /* phrases with no word match follow the order of the card: place them between their matched neighbours */
  if(sc.nb>1&&phs.length>1){const firstOfBeat=b=>M.findIndex(m=>m.beat===b);
   best=best.map((v,k)=>{if(v>=0)return v;let p=-1,q=-1;for(let j=k-1;j>=0;j--)if(best[j]>=0){p=best[j];break}for(let j=k+1;j<best.length;j++)if(best[j]>=0){q=best[j];break}
    if(p<0&&q<0)return firstOfBeat(Math.min(sc.nb-1,Math.floor(k*sc.nb/phs.length)));if(p<0)return Math.max(0,firstOfBeat(Math.max(0,M[q].beat-1)));
    const nxt=M.findIndex((m,i)=>i>p&&m.beat>M[p].beat);return nxt>=0&&(q<0||nxt<=q)?nxt:p})}}
 const tlOf=el=>el&&el.getAnimations?el.getAnimations({subtree:true}).filter(a=>Math.abs((a.effect?.getTiming().duration||0)-sc.T*1000)<5):[];
 /* a small floating copy of the cartoon when the big one has scrolled out of view */
 let pip=null,seen=true;const pipSvg=()=>pip&&!pip.hidden?pip.querySelector("svg"):null;
 const io=new IntersectionObserver(es=>{seen=es[0].isIntersecting;if(seen&&pip)pip.hidden=true},{threshold:.35});io.observe(svg);
 const showPip=()=>{if(!pip){pip=document.createElement("div");pip.className="scpip";pip.innerHTML=`${scene(svg.dataset.sid)}<button class="scpip-x" aria-label="Close">✕</button>`;document.body.appendChild(pip);pip.querySelector(".scpip-x").onclick=()=>pip.hidden=true}pip.hidden=false};
 const seek=t=>{[svg,pipSvg()].forEach(el=>{tlOf(el).forEach(a=>{a.currentTime=t;a.play()});if(el){el.classList.remove("seek");void el.getBBox();el.classList.add("seek")}})};
 const tl=()=>tlOf(pipSvg()||svg);
 phs.forEach((b,k)=>{if(best[k]<0)return;b.classList.add("ph-link");b.addEventListener("click",()=>{const r=svg.getBoundingClientRect();if(r.bottom<r.height*.6+60||r.top>innerHeight*.7)showPip();seek(M[best[k]].t*1000);tick()})});
 const tick=()=>{if(!svg.isConnected){clearInterval(iv);io.disconnect();if(pip)pip.remove();return}const a=tl()[0];if(!a)return;const now=((a.currentTime||0)%(sc.T*1000))/1000;let cur=-1;M.forEach((m,i)=>{if(m.t-.5<=now)cur=i});
  const beat=cur>=0&&M[cur].beat!=null?M[cur].beat:null;
  const exp=!!(sc.phBeat&&sc.nb>1);phs.forEach((b,k)=>b.classList.toggle("ph-live",best[k]>=0&&(exp?(beat!=null&&M[best[k]].beat===beat):best[k]===cur)))};
 /* tapping the cartoon itself moves to the next scene */
 if(sc.nb>1){svg.style.cursor="pointer";svg.addEventListener("click",()=>{const a=tl()[0];if(!a)return;const now=((a.currentTime||0)%(sc.T*1000))/1000;seek(((Math.floor(now/sc.D)+1)%sc.nb)*sc.D*1000+450);tick()})}
 const iv=setInterval(tick,250);tick()}
function bindLearn(){linkScene();document.querySelectorAll(".ph").forEach(b=>b.onclick=()=>{b.classList.toggle("open");const all=[...document.querySelectorAll(".ph")];$("#revealAll").textContent=all.every(x=>x.classList.contains("open"))?"Hide all":"Show all"});
 $("#revealAll").onclick=e=>{const all=[...document.querySelectorAll(".ph")];const show=!all.every(b=>b.classList.contains("open"));all.forEach(b=>b.classList.toggle("open",show));e.target.textContent=show?"Hide all":"Show all"};
 const bt=$("#bt");if(bt)bt.onchange=()=>document.querySelectorAll(".bcomm").forEach(x=>x.hidden=!bt.checked);
 const rm=$("#readMode");if(rm)rm.onclick=()=>{S.settings.lineRead=!readLine();save();const box=document.querySelector(".phrases");if(box)box.classList.toggle("line",readLine());rm.textContent=readLine()?"Quiz me":"Line by line";const ra=$("#revealAll");if(ra)ra.hidden=readLine();const sp=rm.parentNode.querySelector("span");if(sp)sp.firstChild.nodeValue=readLine()?"Line by line, each with its translation.":"Tap a phrase to see its meaning."}}
const readLine=()=>S.settings.lineRead!==false;
(()=>{const st=document.createElement("style");st.textContent=`.phrases.line{display:flex;flex-direction:column;gap:0;direction:rtl}
.phrases.line .ph{width:100%;align-items:stretch;border-width:0 0 1px;border-radius:0;background:transparent;padding:10px 2px;gap:4px;border-color:var(--line)}
.phrases.line .ph:last-child{border-bottom:0}
.phrases.line .ph .he{text-align:right;font-size:22px;line-height:1.55}
.phrases.line .ph .gl{visibility:visible;height:auto;text-align:left;font-size:15px;line-height:1.45;color:var(--ink);opacity:.82}
.phrases.line .ph.ph-live{background:rgba(255,213,79,.18)!important}
.hint .linkbtn+.linkbtn{margin-inline-start:10px}`;document.head.appendChild(st)})();

const KIND={mc:"Choose the answer",tf:"True or false",match:"Match",order:"Build the phrase",fill:"Fill in the missing words"};
function qHTML(s){let h=`<div class="qkind">${R.kind==="review"?"Chazarah · ":""}${KIND[s.t]}</div><h2 class="qtext">${txt(s.q)}</h2>`;
 if(s.t==="mc"){cur.order=shuffle(s.opts.map((_,i)=>i));h+=`<div class="opts">${cur.order.map((oi,k)=>`<button class="opt" data-o="${oi}"><span class="k">${k+1}</span>${txt(s.opts[oi])}</button>`).join("")}</div>`}
 if(s.t==="tf")h+=`<div class="tf"><button class="opt" data-o="1">True</button><button class="opt" data-o="0">False</button></div>`;
 if(s.t==="fill"){cur.order=shuffle(s.opts.map((_,i)=>i));h+=`<p class="he fillsent">${esc(s.before)} <span class="blank" id="blank">&nbsp;</span> ${esc(s.after)}</p><div class="opts">${cur.order.map(oi=>`<button class="opt" data-o="${oi}" style="justify-content:center">${txt(s.opts[oi])}</button>`).join("")}</div>`}
 if(s.t==="order"){cur.tiles=shuffle(s.tiles.concat(s.decoys||[]).map((w,i)=>({w,i})));h+=`<p class="prompt-en">${esc(s.en)}</p><div class="answer-line" id="aline"></div><div class="bank" id="bank">${cur.tiles.map((t,k)=>`<button class="tile" data-t="${k}">${esc(t.w)}</button>`).join("")}</div>`}
 if(s.t==="match"){const L=shuffle(s.pairs.map((p,i)=>({v:p[0],i}))),Rr=shuffle(s.pairs.map((p,i)=>({v:p[1],i})));h+=`<div class="match"><div class="col">${L.map(x=>`<button class="mt" data-side="L" data-i="${x.i}">${txt(x.v)}</button>`).join("")}</div><div class="col">${Rr.map(x=>`<button class="mt" data-side="R" data-i="${x.i}">${txt(x.v)}</button>`).join("")}</div></div>`}
 return h}
function enableCheck(on){const c=$("#check");if(c)c.disabled=!on}
function bindQ(s){if(s.t==="mc"||s.t==="tf"||s.t==="fill"){document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(cur.locked)return;document.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");cur.sel=+b.dataset.o;
  if(s.t==="fill")$("#blank").innerHTML=esc(s.opts[cur.sel]);enableCheck(true)});
  document.onkeydown=e=>{if(!R||cur.locked)return;const n=+e.key;const bs=document.querySelectorAll(".opt");if(n>=1&&n<=bs.length)bs[n-1].click();if(e.key==="Enter"&&$("#check")&&!$("#check").disabled)$("#check").click()}}
 if(s.t==="order"){const draw=()=>{$("#aline").innerHTML=cur.ans.map((k,j)=>`<button class="tile" data-a="${j}">${esc(cur.tiles[k].w)}</button>`).join("");
   document.querySelectorAll("#bank .tile").forEach(b=>b.classList.toggle("used",cur.ans.includes(+b.dataset.t)));
   document.querySelectorAll("#aline .tile").forEach(b=>b.onclick=()=>{if(cur.locked)return;cur.ans.splice(+b.dataset.a,1);draw()});enableCheck(cur.ans.length>0)};
  document.querySelectorAll("#bank .tile").forEach(b=>b.onclick=()=>{if(cur.locked)return;const k=+b.dataset.t;if(!cur.ans.includes(k)){cur.ans.push(k);draw()}});draw()}
 if(s.t==="match"){document.querySelectorAll(".mt").forEach(b=>b.onclick=()=>{if(b.classList.contains("gone"))return;
  if(!cur.pick||cur.pick.dataset.side===b.dataset.side){if(cur.pick)cur.pick.classList.remove("sel");cur.pick=b;b.classList.add("sel");return}
  const a=cur.pick;cur.pick=null;a.classList.remove("sel");
  if(a.dataset.i===b.dataset.i){a.classList.add("gone");b.classList.add("gone");cur.matched++;if(cur.matched===s.pairs.length)resolve(s,cur.err===0,true)}
  else{cur.err++;[a,b].forEach(x=>{x.classList.remove("shake");void x.offsetWidth;x.classList.add("shake")})}})}}

function check(s){let ok;if(s.t==="mc"||s.t==="fill")ok=cur.sel===s.a;if(s.t==="tf")ok=(cur.sel===1)===s.a;
 if(s.t==="order"){const want=s.tiles.join("|"),got=cur.ans.map(k=>cur.tiles[k].w).join("|");ok=want===got}
 if(s.t!=="order"){document.querySelectorAll(".opt").forEach(b=>{const o=+b.dataset.o;const right=s.t==="tf"?((o===1)===s.a):o===s.a;if(right)b.classList.add("right");else if(b.classList.contains("sel"))b.classList.add("wrong")})}
 resolve(s,ok,false)}

function resolve(s,ok,isMatch){cur.locked=true;document.onkeydown=null;const first=!R.firstTry.hasOwnProperty(s.id);
 if(first){R.firstTry[s.id]=ok;R.answered++;if(ok)R.correct++;else R.mistakes++;grade(s.id,ok);if(R.kind==="review")S.reviewAns++;const sc=$("#lscore");if(sc)sc.innerHTML=I.check+R.correct}
 const f=$("#lfoot");f.className="lfoot wrap "+(ok?"ok":"bad");
 const answer=s.t==="tf"?(s.a?"True":"False"):s.t==="order"?s.tiles.join(" "):s.t==="match"?"":s.opts[s.a];
 const praise=["Yasher koach!","Excellent!","Right!","Well done!"][Math.floor(Math.random()*4)];
 f.innerHTML=`<div class="fbrow">${nerButton("feedback",ok?"cheer":"think")}<div class="fb" style="flex:1;min-width:0"><b>${ok?I.check:I.x}${ok?praise:isMatch?"Matched, with a few slips":"Not quite"}</b>${!ok&&answer?`<p>Answer: ${txt(answer)}</p>`:""}${s.ex?`<p>${txt(s.ex)}</p>`:""}</div></div><button class="btn ${ok?"green":"red"} block" id="next">Continue</button>`;
 $("#next").focus();
 $("#next").onclick=()=>{const done=R.queue.shift();if(ok||isMatch){R.doneCount++}else if(R.kind!=="test"){R.queue.push({...done})}else R.doneCount++;showStep()}}

