/* ================= SCREENS ================= */
let tab="home";
(()=>{const st=document.createElement("style");st.textContent=`.gate{min-height:80vh;max-width:420px;margin:0 auto;padding:40px 20px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px;text-align:center}
.gate h1{margin:0;font-size:28px}.gate p{margin:0}.gate .btn{width:100%;text-decoration:none;text-align:center}.gate-he{font-family:var(--f-he);font-size:48px;font-weight:900;color:var(--tech,#2457A6)}
.gate-spin{width:28px;height:28px;border-radius:50%;border:4px solid var(--line);border-top-color:var(--blue,#2457A6);animation:spin 1s linear infinite;margin-top:6px}
.lh-prev{display:block;margin:0 auto}.hero .hero-scene[hidden]{display:none}.hero.compact .hero-b{padding-top:14px}
.h-cont.row .h-ct{display:grid;grid-template-columns:auto 1fr;column-gap:12px}.h-ic{grid-row:1/5;width:56px;height:56px;border-radius:16px;background:color-mix(in srgb,var(--c) 14%,#fff);display:grid;place-items:center}.h-ic svg{width:42px;height:42px}.h-cont.row .h-cb{grid-column:1/-1;margin-top:4px}`;document.head.appendChild(st)})();
function render(){try{if(S&&S.badges)evalBadges(id=>{S.badges[id]=today()})}catch(e){}try{if(AUTH==="in"&&window.LimudSocial&&profile())socStart()}catch(e){}const nav=document.querySelector("nav.tabs");if(nav)nav.hidden=AUTH==="pending"||AUTH==="out";
 if(AUTH==="pending"){$("#app").innerHTML=`<div class="gate"><span class="he gate-he">מתמיד</span><h1>Masmid</h1><p class="sub">Signing you in…</p><span class="gate-spin"></span></div>`;return}
 if(AUTH==="out"&&window.LimudAuth){signInView();return}
 if(AUTH==="out"){$("#app").innerHTML=`<div class="gate"><span class="he gate-he">מתמיד</span><h1>Masmid</h1><p>Welcome!</p>
  <p class="sub">You're not signed in here, so your progress can't be saved to an account. You can still learn: your profile is kept on this device.</p>
  <div class="langtop">${langPick()}</div><button class="btn block" id="gateLocal">Start learning on this device</button><p class="small">Your profile and progress are saved on this phone or computer.</p><button class="linkbtn" id="gateRe">I'm signed in to Claude — try again</button></div>`;$("#gateRe").onclick=()=>location.reload();$("#gateLocal").onclick=()=>{try{localStorage.setItem(KEY2+".local","1")}catch(e){}AUTH="local";render()};return}
 setCourse(S.course);document.querySelectorAll(".tab").forEach(b=>b.setAttribute("aria-current",b.dataset.tab===tab?"page":"false"));
 const app=$("#app");app.innerHTML=topBar()+(tab==="home"?homeView():tab==="learn"?learnView():tab==="subjects"?subjectsView():tab==="town"?townView():progressView());bind();if(tab==="home")bindHome();if(tab==="learn")bindWorld();if(tab==="town")bindTown();checkUnlocks();
 if(!S.welcomed&&!curP().gender){if(!$(".signup"))signUp("first")}else if(Object.keys(ACC.profiles).length>1&&!PICKED){PICKED=true;whoSheet()}else if(!profile()&&!$("#layer").innerHTML)profileSheet()}
const badgeCount=()=>BADGES.filter(b=>S.badges[b.id]).length;
function overallAcc(){const v=Object.values(S.lessons).filter(x=>x.acc!=null);return v.length?Math.round(v.reduce((a,x)=>a+x.acc,0)/v.length):0}
function statsCard(){const L=levelOf(S.xp),st=streakInfo(),tx=S.daily[today()]||0,n=badgeCount();
 const next=BADGES.find(b=>!S.badges[b.id]);const nextName=LEVELS[L.lv]?LEVELS[L.lv][1]:null;
 return `<section class="card scard" aria-label="Your stats">
 <div class="lvl"><div class="lv"><small>Level</small><b>${L.lv}</b></div><div class="info"><div><strong>${L.name}</strong><span>${nextName?`${L.next-S.xp} XP to ${nextName}`:"Top level"}</span></div><div class="bar"><i style="width:${L.pct}%"></i></div></div></div>
 <div class="tiles4">
  <button class="t4" data-go="progress" style="color:var(--gold-deep)">${I.fire}<b>${streakNow().n}</b><small>${streakNow().label}</small></button>
  <button class="t4" data-go="progress" style="color:var(--tech)">${I.bolt}<b>${tx}</b><small>XP today</small></button>
  <button class="t4" data-go="progress" style="color:var(--karti)">${I.target}<b>${overallAcc()}%</b><small>Accuracy</small></button>
  <button class="t4" data-go="progress" style="color:var(--rest)">${I.medal}<b>${n}/${BADGES.length}</b><small>Badges</small></button></div>
 <div class="bstrip"><div class="row">${BADGES.filter(b=>S.badges[b.id]).slice(-14).concat(BADGES.filter(b=>!S.badges[b.id]).slice(0,6)).map(b=>`<span class="mini ${S.badges[b.id]?"":"off"}" title="${esc(b.name)}">${b.he.length>2?b.he.slice(0,2):b.he}</span>`).join("")}</div></div>
 ${next?`<p class="nextb">Next badge: <b>${esc(next.name)}</b> · ${esc(next.d)}</p>`:`<p class="nextb"><b>Every badge earned.</b> Yasher koach!</p>`}
 </section>`}
function topBar(){const st=streakInfo();return `<header class="top"><div class="wrap">
 <button class="course-chip home-btn" data-go="home" aria-label="Home"><span class="badge"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z"/></svg></span></button>
 <button class="stat fire ${st.learnedToday?"":"off"}" data-go="progress" aria-label="${st.n} day streak">${I.fire}${st.n}</button>
 <button class="stat xp" data-go="progress" aria-label="${S.xp} XP">${I.bolt}${S.xp}</button>
 <button class="stat bdgs" data-go="progress" aria-label="${badgeCount()} badges">${I.medal}${badgeCount()}</button>
 <button class="topav" id="topAv" aria-label="My avatar">${avatarSVG(myAvatar(),"","-24 -100 48 48")}</button><button class="iconbtn" id="openSettings" aria-label="Settings">${I.gear}</button></div>${tab==="home"||tab==="learn"?subjBar():""}</header>`}

(()=>{const st=document.createElement("style");st.textContent=`.sbar{border-top:1px solid var(--line);background:var(--bg)}
.sbar-in{display:flex;gap:6px;overflow-x:auto;padding:6px max(16px,env(safe-area-inset-left,0px)) 8px;scrollbar-width:none;scroll-snap-type:x proximity}.sbar-in::-webkit-scrollbar{display:none}
.sb{flex:none;scroll-snap-align:center;position:relative;display:flex;flex-direction:column;align-items:center;gap:0;min-width:74px;padding:5px 10px 9px;border-radius:14px;border:2px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;overflow:hidden}
.sb .he{font-family:var(--f-he);font-weight:900;font-size:16px;line-height:1.15;color:var(--c)}.sb .en{font-size:11px;font-weight:800}
.sb i{position:absolute;left:8px;right:8px;bottom:4px;height:3px;border-radius:2px;background:linear-gradient(90deg,var(--c) var(--p),var(--line) var(--p))}
.sb small{position:absolute;bottom:1px;left:0;right:0;font-size:8.5px;font-weight:800;color:var(--muted);text-align:center}
.sb.cur{border-color:var(--c)}.sb.on{background:var(--c);border-color:var(--c)}.sb.on .he,.sb.on .en{color:#fff}.sb.on i{background:linear-gradient(90deg,#fff var(--p),rgba(255,255,255,.35) var(--p))}
.sb.soon{opacity:.55}`;document.head.appendChild(st)})();
/* the subject menu: always at the top of Home and Learn, so you can switch anytime */
function subjBar(){return `<nav class="sbar" aria-label="Subjects"><div class="sbar-in">${SUBJECTS.map(s=>{const c=COURSES[s.id],ok=s.live&&c,p=ok?coursePct(c):0,on=ok&&s.id===S.course&&tab==="learn";
  return `<button class="sb ${on?"on":""} ${s.id===S.course?"cur":""} ${ok?"":"soon"}" data-sb="${s.id}" style="--c:${s.c}" ${on?'aria-current="page"':""}><span class="he">${s.he}</span><span class="en">${esc(s.en)}</span>${ok?`<i style="--p:${Math.round(p*100)}%"></i>`:`<small>Soon</small>`}</button>`}).join("")}</div></nav>`}

function restBanner(){const t=today(),rk=restKind(t),tomorrow=restKind(addDays(t,1));const h=now().getHours();
 if(rk==="Shabbos"&&h>=19)return banner("Shavua tov!","Your streak was kept over Shabbos. Pick up where you left off.");
 if(rk)return banner(rk==="Shabbos"?"Good Shabbos":"Good Yom Tov",`Your streak is protected today. No reminders, no pressure.`);
 if(tomorrow)return banner(`${tomorrow} begins tonight`,`Your streak is safe over ${tomorrow}. A lesson before candle lighting keeps it going.`);
 const y=addDays(t,-1);if(restKind(y)&&streakInfo().n>0)return banner("Welcome back",`Your streak carried through ${restKind(y)}.`);return""}
const banner=(b,p)=>`<div class="banner">${ner("rest")}<p><b>${esc(b)}</b>${esc(p)}</p></div>`;

function learnView(){const tx=S.daily[today()]||0,goal=S.settings.goal,pct=Math.min(1,tx/goal),C=2*Math.PI*27,due=dueItems().length;
 const anyDone=courseLessons().some(l=>S.lessons[l.id]?.done);
 const cur=findCurrent();
 return `<main class="wrap stack">${raceBar(cur)}<button class="btn ghost block ix-big" data-index>📑 Index · jump to any ${esc(CRS.units[0]?.unitWord||"part")}</button>${restBanner()}${heroCard(cur,anyDone)}${statsCard()}${togetherCard()}
 <section class="card"><div class="goal"><div class="ring"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="none" stroke="var(--line)" stroke-width="8"/><circle cx="32" cy="32" r="27" fill="none" stroke="var(--gold)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pct)}"/></svg><span>${tx}/${goal}</span></div>
 <div><h3>${pct>=1?"Daily goal met. Yasher koach!":"Today's goal"}</h3><p>${pct>=1?"Anything more is extra credit.":`${goal-tx} XP to go${S.settings.name?", "+esc(S.settings.name):""}.`}</p></div></div>
 ${anyDone?`<button class="btn ${due?"green":"ghost"} block review-btn" id="review">${I.repeat} ${due?`Chazarah · ${due} due`:"Practice weak spots"}</button>`:""}</section>
 ${worldBanner()}${unitsWindowHTML(cur,anyDone)}
 <section class="unit locked"><div><small>${CRS.next.s}</small><h2>${CRS.next.t}</h2></div><span class="he">${CRS.next.he}</span></section>
 </main>`}
function unitPath(u,ui,cur,anyDone){const offsets=[0,-62,-86,-46,22,72,58,0,-40,-70];const started=u.lessons.some(l=>S.lessons[l.id]?.done);
 return `<section class="unit"><div><small>${u.unit.s}</small><h2>${u.unit.t}</h2>${CRS.units.length>1&&!started?`<p class="unit-note">Open anytime. You don't need to finish the one before.</p>`:""}</div><span class="he">${u.unit.he}</span></section>
 <div class="path">${u.nodes.map((n,i)=>{const st=nodeState(u,i),isCur=!!cur&&cur.ui===ui&&cur.i===i,cls=[n.kind==="review"?"review":"",n.kind==="test"?"test":"",st,isCur?"current":""].join(" ");
  const ic=st==="locked"?I.lock:n.kind==="review"?I.repeat:n.kind==="test"?I.crown:st==="done"?I.check:I.book;
  const stars=S.lessons[n.id]?.stars||0;const title=n.lesson?n.lesson.title:n.title,short=n.lesson?n.lesson.short:n.short;const off=offsets[i]||0;
  return `<button class="node ${cls}" data-node="${ui}:${i}" style="transform:translateX(${off}px)" aria-label="${esc(title)} — ${st}">${isCur?`<span class="start-tag">${anyDone?"Next":"Start"}</span>`:""}<span class="disc">${ic}</span>${isCur?ner(i===0&&!anyDone?"happy":"cheer","buddy").replace('class="ner buddy"',`class="ner buddy" style="${off>0?"right":"left"}:calc(100% + 14px)"`):""}${st==="done"&&n.kind==="lesson"?`<span class="stars">${[1,2,3].map(k=>`<span class="${k<=stars?"":"off"}">${I.star}</span>`).join("")}</span>`:""}<span class="lbl">${esc(title)}<small>${esc(short)}</small></span></button>`}).join("")}</div>`}

function capHTML(id){const c=(SCENES[id]||SCENES.chazara).cap.split(" · ");return `<span class="cap"><span class="he">${esc(c[0])}</span><span>${esc(c[1]||"")}</span></span>`}
function heroCard(cur,anyDone){
 if(!cur){const u=CRS.units[CRS.units.length-1];return `<section class="hero">${scene("siyum")}${capHTML("siyum")}<div class="hero-b">${ner("cheer")}<div class="t"><small>${u.doneSmall}</small><h2>${u.doneTitle}</h2><button class="btn green" id="heroGo">${I.repeat} Keep it fresh</button></div></div></section>`}
 const n=CRS.units[cur.ui].nodes[cur.i],id=n.lesson?((STEP_SCENES[n.lesson.id]||[])[0]||n.lesson.id):n.kind==="review"?"chazara":"siyum",title=n.lesson?n.lesson.title:n.title;
 const lead=!anyDone?"Your first lesson":n.kind==="review"?"Time to review":n.kind==="test"?"Last step":"Up next";
 return `<section class="hero compact"><div class="hero-b">${ner(anyDone?"happy":"cheer")}<div class="t"><small>${lead}</small><h2>${esc(title)}</h2><button class="btn" id="heroGo" data-hero="${cur.ui}:${cur.i}">${anyDone?"Continue":"Start"}</button></div></div>
 <button class="linkbtn lh-prev" id="heroPrev" data-sid="${id}">▶ Preview the cartoon</button><div class="hero-scene" hidden></div></section>`}
function subjectsView(){return `<main class="wrap stack"><div><h1 class="h1">Choose what to learn</h1><p class="sub">One path per subject. Mishnayos and Halacha are open for testing.</p></div>
 <div class="subjects">${SUBJECTS.map(s=>`<button class="subj ${s.id===S.course?"active":""}" data-subj="${s.id}" style="--c:${s.c}"><span class="top-row"><span class="he">${s.he}</span><svg class="sart" viewBox="0 0 64 64" aria-hidden="true">${SUBJ_ART[s.id]}</svg></span><b>${s.en}</b><small>${esc(s.desc)}</small><span class="pill ${s.live?"":"soon"}">${s.id===S.course?"Learning now":s.live?"Open":"Coming soon"}</span></button>`).join("")}</div>
 <p class="small">Texts come from Sefaria. Only translations licensed for reuse (Public Domain, CC0, CC-BY, CC-BY-SA) are used, with attribution on every source panel.</p></main>`}

function progressView(){const L=levelOf(S.xp),st=streakInfo(),t=today();const start=addDays(t,-dow(t));
 const acc=overallAcc();
 const learned=Object.keys(S.srs).length;
 return `<main class="wrap stack">
 <section class="card levelcard"><div class="lvl-row"><div><small class="sub">Level ${L.lv}</small><b>${L.name}</b></div><span class="sub" style="font-variant-numeric:tabular-nums">${S.xp} / ${L.next} XP</span></div><div class="bar"><i style="width:${L.pct}%"></i></div></section>
 <p class="sec-h">This week</p>
 <section class="card"><div class="week">${[0,1,2,3,4,5,6].map(k=>{const d=addDays(start,k),on=S.active.includes(d),rk=restKind(d);return `<div class="day ${on?"on":""} ${rk?"rest":""} ${d===t?"today":""}" title="${rk||""}"><span class="dot">${rk&&!on?I.candles:on?I.check:""}</span>${["S","M","T","W","T","F","Sh"][k]}</div>`}).join("")}</div>
 ${S.settings.streakMode==="week"?(w=>`<p style="margin:12px 0 0"><b>This week: ${w.thisWeek} of ${w.goal} days${w.thisDone?" ✓":""}</b></p>`)(weekStreakInfo()):""}<p class="small" style="margin-top:12px">Shabbos and Yom Tov never break a streak. They show a candle and are skipped when counting. Calendar: ${S.settings.il?"Eretz Yisrael":"Chutz La'aretz"}.</p></section>
 <div class="stats">
  <div class="st" style="color:var(--gold-deep)">${I.fire}<div><b>${streakNow().n}</b><small>${streakNow().label}</small></div></div>
  <div class="st" style="color:var(--tech)">${I.bolt}<div><b>${S.xp}</b><small>Total XP</small></div></div>
  <div class="st" style="color:var(--karti)">${I.target}<div><b>${acc}%</b><small>Accuracy</small></div></div>
  <div class="st" style="color:var(--rest)">${I.book}<div><b>${learned}</b><small>Items in review</small></div></div></div>
 <p class="sec-h">${CRS.masteryTitle} · ${CRS.chip.t}</p>
 <section class="card mastery">${CRS.units.map(u=>`${CRS.units.length>1?`<p class="unit-h">${esc(u.unit.s.split(" · ")[0])} · ${esc(u.unit.t)}</p>`:""}${(u.masteryBy==="lesson"?u.lessons.map(l=>[l.title,masteryL(u,l),1]):u.partNames.map((h,m)=>[h,mastery(u,m),0])).map(([h,p,isL])=>{return `<div class="mrow"><span class="${isL?"mlt":"he"}">${esc(h)}</span><div class="bar"><i style="width:${p}%"></i></div><span>${p}%</span></div>`}).join("")}`).join("")}
 <p class="small">Mastery grows as you answer correctly on spaced reviews (1, 3, 7, 16, then 35 days apart).</p></section>
 <p class="sec-h">Badges · ${badgeCount()} of ${BADGES.length}</p>
 ${badgesHTML()}
 </main>`}

function bind(){const ta=$("#topAv");if(ta)ta.onclick=avatarStudio;
 document.querySelectorAll("[data-sb]").forEach(b=>b.onclick=()=>{const id=b.dataset.sb,s=SUBJECTS.find(x=>x.id===id);if(!(s.live&&COURSES[id])){subjectSheet(id);return}
  const same=id===S.course&&tab==="learn";S.course=id;save();tab="learn";if(!same)render();scrollTo({top:0,behavior:same?"smooth":"auto"})});
 const hd=document.querySelector("header.top");if(hd)document.documentElement.style.setProperty("--toph",hd.offsetHeight+"px");
 const sc=document.querySelector(".sbar .sb.cur");if(sc)sc.scrollIntoView({inline:"center",block:"nearest"});document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{tab=b.dataset.go;render();scrollTo(0,0)});
 document.querySelectorAll("[data-node]").forEach(b=>b.onclick=()=>{const [u,i]=b.dataset.node.split(":").map(Number);openNode(u,i)});
 document.querySelectorAll("[data-subj]").forEach(b=>b.onclick=()=>subjectSheet(b.dataset.subj));
 const r=$("#review");if(r)r.onclick=()=>startReview(false);
 const hp=$("#heroPrev");if(hp)hp.onclick=()=>{const box=hp.nextElementSibling;if(box.hidden){box.innerHTML=scene(hp.dataset.sid)+capHTML(hp.dataset.sid);box.hidden=false;hp.textContent="Hide the cartoon"}else{box.hidden=true;box.innerHTML="";hp.textContent="▶ Preview the cartoon"}};
 const hg=$("#heroGo");if(hg)hg.onclick=()=>{if(hg.dataset.hero){const [u,i]=hg.dataset.hero.split(":").map(Number);openNode(u,i)}else startReview(false)};
 $("#openSettings").onclick=settingsSheet;bindLT()}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();scrollTo(0,0)});

