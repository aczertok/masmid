/* ================= SIGN-UP, "WHO'S LEARNING?", AND THE HOME MENU ================= */
function courseNext(c){const last=(S.lastUnit||{})[c.id];const order=c.units.map((u,ui)=>ui).sort((a,b)=>(c.units[b].key===last)-(c.units[a].key===last));
 for(const ui of order){const u=c.units[ui];const i=u.nodes.findIndex((n,k)=>nodeState(u,k)==="open");if(i>=0)return{ui,i}}return null}
function coursePct(c){let d=0,t=0;c.units.forEach(u=>{t+=u.nodes.length;d+=u.nodes.filter(n=>S.lessons[n.id]?.done).length});return t?d/t:0}
/* sign-up: one friendly page. mode "first" = the person opening the app; "add" = a new profile for someone else on this account */

/* sign-in screen for the standalone app (email and password, or Google) */
function signInView(){if(!LimudAuth.configured){$("#app").innerHTML=`<div class="gate"><span class="he gate-he">מתמיד</span><h1>Almost ready</h1><p class="sub">This site isn't connected to its sign-in service yet. Paste your Firebase settings into <b>firebase-config.js</b> and upload the folder again.</p></div>`;return}let mode="in";const draw=()=>{$("#app").innerHTML=`<div class="gate"><span class="he gate-he">מתמיד</span><h1>Masmid</h1><div class="langtop">${langPick()}</div>
 <p class="sub">${mode==="in"?"Sign in to keep learning.":mode==="up"?"Create your account. Each learner gets their own profile and progress.":"We'll email you a link to choose a new password."}</p>
 <form id="authF" class="authf" novalidate>${mode==="up"?`<label class="field" for="aname">Your name<input id="aname" autocomplete="given-name" maxlength="24" placeholder="e.g. Moshe"></label>`:""}
  <label class="field" for="aemail">Email<input id="aemail" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com"></label>
  ${mode!=="reset"?`<label class="field" for="apw">Password<input id="apw" type="password" autocomplete="${mode==="up"?"new-password":"current-password"}" placeholder="${mode==="up"?"At least 6 characters":""}"></label>`:""}
  <p class="aerr" id="aerr" role="alert"></p>
  <button class="btn block" id="ago" type="submit">${mode==="in"?"Sign in":mode==="up"?"Create account":"Send reset link"}</button></form>
 ${mode!=="reset"?`<div class="aor"><span>or</span></div><button class="btn ghost block" id="agoogle"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style="vertical-align:-3px;margin-right:6px"><path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h6a5.1 5.1 0 0 1-2.2 3.4v2.8h3.6c2.1-2 3.2-4.9 3.2-8.2z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z"/></svg>Continue with Google</button>`:""}
 <div class="alinks">${mode==="in"?`<button class="linkbtn" data-am="up">New here? Create an account</button><button class="linkbtn" data-am="reset">Forgot password?</button>`:`<button class="linkbtn" data-am="in">I already have an account</button>`}</div></div>`;
 const err=$("#aerr"),busy=b=>{$("#ago").disabled=b};
 const done=async e=>{if(e){err.textContent=e;busy(false);return}err.textContent="";location.reload()};
 $("#authF").onsubmit=async ev=>{ev.preventDefault();busy(true);const em=$("#aemail").value;
  if(mode==="reset"){const e=await LimudAuth.reset(em);busy(false);err.textContent=e||"Check your email for the reset link.";return}
  const pw=$("#apw").value;if(mode==="up"){const n=$("#aname").value.trim();if(!n){err.textContent="Please add your name.";busy(false);return}try{localStorage.setItem("limudpath.signupName",n)}catch(x){}done(await LimudAuth.signUp(em,pw,n))}else done(await LimudAuth.signIn(em,pw))};
 const g=$("#agoogle");if(g)g.onclick=async()=>done(await LimudAuth.google());
 document.querySelectorAll("[data-am]").forEach(b=>b.onclick=()=>{mode=b.dataset.am;draw()})};draw()}
(()=>{const st=document.createElement("style");st.textContent=`.authf{width:100%;display:flex;flex-direction:column;gap:8px;text-align:left}.authf input{width:100%}
.aerr{min-height:1.2em;margin:0;color:var(--err,#C0392B);font-size:13px;text-align:center}.aor{display:flex;align-items:center;gap:8px;width:100%;color:var(--muted);font-size:12px}.aor::before,.aor::after{content:"";flex:1;height:1px;background:var(--line)}
.alinks{display:flex;flex-direction:column;gap:4px;margin-top:4px}`;document.head.appendChild(st)})();
function signUp(mode){const first=mode!=="add";let g=null,skin=1,hair=0,subj=[],goal=30;
 const cat=()=>catOf({gender:g,age:($("#wage")||{}).value?.trim()||null})||(g==="f"?"girl":"boy");
 const prev=()=>{const el=$("#wav");if(el)el.innerHTML=avatarSVG(avClean({base:cat(),skin,hair}),"","-30 -108 60 112")};
 $("#layer").innerHTML=`<div class="signup" role="dialog" aria-modal="true" aria-label="Create a profile"><div class="su-in wrap">
  <div class="su-hero">${first?`<span class="he su-bh">ברוכים הבאים</span><h1>Welcome to Masmid</h1><p>Create your profile to start learning. It takes a minute.</p><div class="langtop">${langPick()}</div>`:`<h1>New profile</h1><p>For someone else learning here. Each profile has its own progress, avatar and town.</p>`}</div>
  <div class="su-card"><div class="su-av" id="wav" aria-hidden="true"></div>
   <label class="field" for="wname">${first?"Your name":"Name"}<input type="text" id="wname" maxlength="24" autocomplete="given-name" placeholder="e.g. Moshe or Chaya" value="${first?esc((()=>{try{return localStorage.getItem("limudpath.signupName")||window.LimudAuth?.user?.displayName||""}catch(e){return ""}})()):""}"></label>
   <div class="field">Boy or girl<div class="seg big2" id="wprof"><button data-v="m" aria-pressed="false">Boy</button><button data-v="f" aria-pressed="false">Girl</button></div></div>
   <label class="field" for="wage">Age <span class="small">(optional)</span><input type="text" inputmode="numeric" id="wage" maxlength="3" placeholder="e.g. 11"></label>
   <div class="field">Look<div class="su-sw" id="wskin">${AV_SKIN.map((c,i)=>`<button data-v="${i}" aria-pressed="${i===skin}" style="--sw:${c}" aria-label="Skin tone ${i+1}"></button>`).join("")}</div>
    <div class="su-sw" id="whair">${AV_HAIR.map((c,i)=>`<button data-v="${i}" aria-pressed="${i===hair}" style="--sw:${c}" aria-label="Hair color ${i+1}"></button>`).join("")}</div><small class="small">More hats, clothes and accessories unlock as you learn.</small></div></div>
  <div class="su-card"><div class="field">What would you like to learn?<div class="su-subj" id="wsubj">${SUBJECTS.map(s=>`<button data-v="${s.id}" aria-pressed="false" ${s.live?"":"disabled"} style="--c:${s.c}"><svg viewBox="0 0 64 64" aria-hidden="true">${SUBJ_ART[s.id]}</svg><span class="he">${s.he}</span><b>${s.en}</b>${s.live?"":"<small>Coming soon</small>"}</button>`).join("")}</div><small class="small">Pick one or more. You can switch anytime from Home.</small></div>
   <div class="field">Daily goal<div class="seg" id="wgoal">${[[20,"Casual"],[30,"Regular"],[50,"Serious"]].map(([v,n])=>`<button data-v="${v}" aria-pressed="${v===goal}">${n}<small>${v} XP</small></button>`).join("")}</div></div></div>
  <button class="btn block" id="wgo">${first?"Create my profile":"Add profile"}</button>${first?"":`<button class="btn ghost block" id="wback">Cancel</button>`}
  <p class="small su-note">Your profile and progress are saved to your account, so they're here on any device where you open Masmid. ${first?"Family members can each get their own profile from Home or Settings.":""}</p></div></div>`;
 document.body.style.overflow="hidden";prev();
 segBind("#wprof",v=>{g=v;prev()});$("#wage").oninput=prev;segBind("#wgoal",v=>goal=+v);
 const sw=(sel,set)=>document.querySelectorAll(sel+" button").forEach(b=>b.onclick=()=>{document.querySelectorAll(sel+" button").forEach(x=>x.setAttribute("aria-pressed",x===b));set(+b.dataset.v);prev()});
 sw("#wskin",v=>skin=v);sw("#whair",v=>hair=v);
 document.querySelectorAll("#wsubj button").forEach(b=>b.onclick=()=>{const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);subj=on?[...subj,b.dataset.v]:subj.filter(x=>x!==b.dataset.v)});
 const bk=$("#wback");if(bk)bk.onclick=()=>{document.body.style.overflow="";closeSheet()};
 $("#wgo").onclick=()=>{const n=$("#wname").value.trim().slice(0,24),ag=$("#wage").value.trim();
  if(!n){toast("Please add a name");$("#wname").focus();return}if(!g){toast("Please choose Boy or Girl");return}if(ag&&(isNaN(+ag)||+ag<3||+ag>120)){toast("Please enter an age in numbers");return}
  let p;if(first){p=curP();}else{const id=pid(),d=fresh();d.v=DATA_V;p={id,name:n,gender:g,age:null,cat:null,created:Date.now(),data:d};ACC.profiles[id]=p}
  p.name=n;p.gender=g;p.age=ag?+ag:null;p.cat=null;
  const d=p.data;d.welcomed=true;d.settings.name=n;d.settings.goal=goal;d.subjects=subj;if(subj[0])d.course=subj[0];d.avatar=avClean({base:catOf(p),skin,hair});
  PICKED=true;document.body.style.overflow="";closeSheet();
  if(first){save();tab="home";render();scrollTo(0,0);toast(`Welcome, ${n}!`)}else{save();tab="home";switchProfile(p.id)}}}
/* "Who's learning?" when an account has more than one profile */
let PICKED=false;
function whoSheet(){const ps=Object.values(ACC.profiles).sort((a,b)=>a.created-b.created);
 $("#layer").innerHTML=`<div class="signup" role="dialog" aria-modal="true" aria-label="Who's learning?"><div class="su-in wrap"><div class="su-hero"><h1>Who's learning?</h1><p>Pick your profile.</p></div>
  <div class="who">${ps.map(p=>{const c=catOf(p)||"boy";return `<button class="who-p" data-who="${p.id}"><span class="who-av">${avatarSVG(Object.assign({},p.data.avatar||{},{base:c}),"","-30 -108 60 112")}</span><b>${esc(p.name||"My profile")}</b><small>${p.data.xp} XP</small></button>`}).join("")}
  <button class="who-p who-add" id="whoAdd"><span class="who-av">+</span><b>New profile</b><small>Sign up</small></button></div></div></div>`;
 document.body.style.overflow="hidden";
 document.querySelectorAll("[data-who]").forEach(b=>b.onclick=()=>{PICKED=true;document.body.style.overflow="";closeSheet();tab="home";if(b.dataset.who===ACC.active)render();else switchProfile(b.dataset.who)});
 $("#whoAdd").onclick=()=>signUp("add")}
/* the home menu */
function homeView(){const lv=levelOf(S.xp),st=streakInfo(),tx=S.daily[today()]||0,goal=S.settings.goal,pct=Math.min(1,tx/goal),C=2*Math.PI*20;
 const name=curP().name||S.settings.name||"";
 const live=SUBJECTS.filter(s=>s.live&&COURSES[s.id]);const mine=(S.subjects||[]).filter(id=>COURSES[id]);
 const cc=COURSES[S.course]||COURSES[live[0].id],nx=courseNext(cc),nn=nx?cc.units[nx.ui].nodes[nx.i]:null;
 const started=live.filter(s=>coursePct(COURSES[s.id])>0||s.id===S.course);
 return `<main class="wrap stack home">
 <section class="h-hi"><button class="h-av" id="hProfile" aria-label="My profile">${avatarSVG(myAvatar(),"","-30 -108 60 112")}</button><div><small>${["Boker tov","Shalom","Erev tov"][new Date().getHours()<12?0:new Date().getHours()<18?1:2]}${name?",":""}</small><h1>${esc(name||"Welcome")}</h1>
  <p>Level ${lv.lv} · ${lv.name} · ${streakNow().short}</p></div>
  <div class="h-ring" aria-label="Today's goal ${tx} of ${goal} XP"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="24" cy="24" r="20" fill="none" stroke="var(--gold)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pct)}" transform="rotate(-90 24 24)"/></svg><span>${tx}/${goal}</span></div></section>
 <section class="masmid-coach" aria-label="Your learning buddy">
  <div class="masmid-coach-art">${nerButton("home",pct>=1?"cheer":"happy")}</div>
  <div class="masmid-coach-copy">
   <span class="masmid-coach-label">MEET SIFRI · YOUR LEARNING BUDDY</span>
   <h2>${pct>=1?"Yasher koach! You did it!":tx>0?"You're on a roll!":"Ready for a Torah adventure?"}</h2>
   <p>${pct>=1?"Today's goal is complete. Keep exploring!":tx>0?"Just "+Math.max(0,goal-tx)+" more XP to reach your daily goal.":"One little lesson is a great place to start."}</p>
   <div class="masmid-quest"><span aria-hidden="true">✦</span><div><b>Today's mission</b><small>${pct>=1?"Mission complete!":Math.max(0,goal-tx)+" XP until your goal"}</small></div><span class="masmid-quest-pct">${Math.round(pct*100)}%</span></div>
   <div class="masmid-quest-track" role="progressbar" aria-label="Daily learning goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct*100)}"><i style="width:${Math.round(pct*100)}%"></i></div>
  </div>
 </section>
 ${nn?`<section class="h-cont row" style="--c:${(SUBJECTS.find(s=>s.id===cc.id)||{}).c||"var(--blue)"}">
  <div class="h-ct"><span class="h-ic"><svg viewBox="0 0 64 64" aria-hidden="true">${SUBJ_ART[cc.id]||""}</svg></span><small>${coursePct(cc)>0?"Continue":"Start"} · ${esc(cc.chip.t)}</small><h2>${esc(nn.lesson?nn.lesson.title:nn.title)}</h2><p>${esc(cc.units[nx.ui].unit.t)} · ${Math.round(coursePct(cc)*100)}% of the course</p>
  <div class="h-cb"><button class="btn" id="hGo">${coursePct(cc)>0?"Continue":"Start"}</button><button class="btn ghost" data-hpath="${cc.id}">See the path</button></div></div></section>`:""}
 <h2 class="h-sec">Explore</h2>
 <div class="h-tiles">
  <button class="h-tile" id="hGames"><span>🎮</span><b>Games</b><small>Play with what you learned</small></button>
  <button class="h-tile" id="hWorld"><span>🌍</span><b>The whole world</b><small>Every subject as a continent</small></button>
  <button class="h-tile" id="hMap"><span>🗺️</span><b>Map</b><small>${esc(ZEDATA[cc.id]?ZEDATA[cc.id].t:cc.chip.t)}</small></button>
  <button class="h-tile" data-go="town"><span>🏘️</span><b>My town</b><small>Build with what you learn</small></button>
  <button class="h-tile" data-go="progress"><span>📊</span><b>Progress</b><small>Badges, streaks, siyumim</small></button>
  <button class="h-tile" id="hTogether"><span>👥</span><b>Learners</b><small>${(n=>n?`${n} learning now`:"See others, high five")(socAll().filter(p=>p.online).length)}</small></button>
  <button class="h-tile" id="hAvatar"><span>🧑</span><b>My avatar</b><small>Unlock new looks</small></button>
  <button class="h-tile" id="hWho"><span>👪</span><b>Profiles</b><small>${Object.keys(ACC.profiles).length>1?Object.keys(ACC.profiles).length+" on this account":"Add someone in your family"}</small></button>
  <button class="h-tile" id="hSettings"><span>⚙️</span><b>Settings</b><small>Goal, calendar, backup</small></button>
 </div></main>`}
function bindHome(){const go=$("#hGo");if(go)go.onclick=()=>{const cc=COURSES[S.course];setCourse(cc.id);const nx=courseNext(cc);if(nx)openNode(nx.ui,nx.i)};
 document.querySelectorAll("[data-hpath]").forEach(b=>b.onclick=()=>{S.course=b.dataset.hpath;save();tab="learn";render();scrollTo(0,0)});
 document.querySelectorAll("[data-hsubj]").forEach(b=>b.onclick=()=>{const id=b.dataset.hsubj,s=SUBJECTS.find(x=>x.id===id);if(!(s.live&&COURSES[id])){subjectSheet(id);return}S.course=id;save();tab="learn";render();scrollTo(0,0)});
 $("#hWorld").onclick=globeView;const hg=$("#hGames");if(hg)hg.onclick=()=>gamesSheet();$("#hMap").onclick=()=>{setCourse(S.course);shasMap()};$("#hTogether").onclick=()=>communitySheet();
 $("#hAvatar").onclick=avatarStudio;$("#hProfile").onclick=()=>profileSheet();$("#hSettings").onclick=settingsSheet;
 $("#hWho").onclick=()=>Object.keys(ACC.profiles).length>1?whoSheet():signUp("add")}
(()=>{const st=document.createElement("style");st.textContent=`
.signup{position:fixed;inset:0;z-index:70;overflow:auto;background:linear-gradient(180deg,#DCEBFF,#FBF6E8 60%);animation:zin .3s ease-out}
.su-in{max-width:520px;margin:0 auto;padding-top:calc(env(safe-area-inset-top,0px) + 22px);padding-bottom:40px;display:flex;flex-direction:column;gap:14px}
.su-hero{text-align:center}.su-hero h1{margin:4px 0 2px;font-size:26px}.su-hero p{margin:0;color:var(--muted)}.su-bh{font-family:var(--f-he);font-size:38px;font-weight:900;color:var(--tech,#2457A6)}
.su-card{background:var(--surface);border:2px solid var(--line);border-radius:20px;padding:14px;display:flex;flex-direction:column;gap:10px}
.su-av{width:110px;height:120px;margin:0 auto;border-radius:50%;background:radial-gradient(circle at 50% 40%,#FFF8E7,#E9F2FF);display:grid;place-items:center;overflow:hidden}.su-av svg{width:100%;height:100%}
.su-sw{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0}.su-sw button{width:32px;height:32px;border-radius:50%;border:3px solid #fff;background:var(--sw);box-shadow:0 0 0 2px var(--line);cursor:pointer}.su-sw button[aria-pressed="true"]{box-shadow:0 0 0 3px var(--blue,#2457A6)}
.su-subj{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px}
.su-subj button{border:2px solid var(--line);background:var(--surface);border-radius:14px;padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;color:var(--ink)}
.su-subj button svg{width:34px;height:34px}.su-subj .he{font-family:var(--f-he);font-weight:900;font-size:15px;color:var(--c)}.su-subj b{font-size:12px}.su-subj small{font-size:10px;color:var(--muted)}
.su-subj button[aria-pressed="true"]{border-color:var(--c);background:color-mix(in srgb,var(--c) 12%,#fff);box-shadow:0 0 0 2px var(--c)}.su-subj button:disabled{opacity:.5;cursor:default}
.su-note{text-align:center}
.who{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.who-p{border:2px solid var(--line);background:var(--surface);border-radius:20px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;color:var(--ink)}
.who-av{width:96px;height:104px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#FFF8E7,#E9F2FF);display:grid;place-items:center;overflow:hidden;font-size:40px;font-weight:300;color:var(--muted)}.who-av svg{width:100%;height:100%}
.who-p small{color:var(--muted)}
.home .h-hi{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;background:var(--surface);border:2px solid var(--line);border-radius:20px;padding:12px}
.h-av{width:64px;height:70px;border-radius:50%;border:0;background:radial-gradient(circle at 50% 40%,#FFF8E7,#E9F2FF);overflow:hidden;cursor:pointer;padding:0}.h-av svg{width:100%;height:100%}
.h-hi small{font-size:12px;color:var(--muted);font-weight:700}.h-hi h1{margin:0;font-size:22px}.h-hi p{margin:2px 0 0;font-size:12.5px;color:var(--muted)}
.h-ring{position:relative;width:52px;height:52px}.h-ring svg{width:100%;height:100%}.h-ring span{position:absolute;inset:0;display:grid;place-items:center;font-size:10.5px;font-weight:800}
.h-cont{border-radius:20px;overflow:hidden;border:2px solid var(--line);background:var(--surface)}
.h-art svg{display:block;width:100%;height:auto}.h-ct{padding:12px 14px 14px}.h-ct small{font-size:11.5px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--c)}.h-ct h2{margin:2px 0;font-size:19px}.h-ct p{margin:0 0 10px;font-size:13px;color:var(--muted)}
.h-cb{display:flex;gap:8px}.h-cb .btn{flex:1}
.h-sec{font-size:17px;margin:6px 0 -2px}
.h-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.h-subj{position:relative;text-align:left;border:2px solid var(--line);background:var(--surface);border-radius:18px;padding:10px 12px 12px;cursor:pointer;color:var(--ink);display:flex;flex-direction:column;gap:2px}
.h-subj.cur{border-color:var(--c);box-shadow:0 0 0 2px color-mix(in srgb,var(--c) 40%,transparent)}.h-subj.soon{opacity:.6}
.h-top{display:flex;justify-content:space-between;align-items:center}.h-top .he{font-family:var(--f-he);font-weight:900;font-size:22px;color:var(--c)}.h-top svg{width:40px;height:40px}
.h-subj b{font-size:15px}.h-subj small{font-size:11.5px;color:var(--muted);line-height:1.25}
.h-bar{height:6px;border-radius:3px;background:var(--line);overflow:hidden;margin-top:6px}.h-bar i{display:block;height:100%;background:var(--c)}.h-pc{font-size:11px;font-weight:800;color:var(--muted)}
.h-tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.h-tile{border:2px solid var(--line);background:var(--surface);border-radius:16px;padding:10px 12px;text-align:left;cursor:pointer;color:var(--ink);display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:10px;align-items:center}
.h-tile span{grid-row:1/3;font-size:24px}.h-tile b{font-size:14px}.h-tile small{font-size:11.5px;color:var(--muted)}`;document.head.appendChild(st)})();
function worldBanner(){const W=worldOf(),P=CRS.units.map(unitProgress),claimed=P.filter(p=>p.done).length,pct=Math.round(P.reduce((a,p)=>a+p.f,0)/P.length*100);
 const here=LT.room?LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.pos&&p.presence.pos.c===CRS.id).length:0;
 return `<section class="wbanner" style="--wa:${W.sky[0]};--wb:${W.ground}"><div class="wb-t"><small>World</small><h2>${W.name}</h2><p>${W.tag}</p></div><span class="he">${W.he}</span>
 <div class="wb-map">${CRS.units.map((u,ui)=>{const p=P[ui];return `<button class="wb-reg ${p.done?"won":p.d?"part":""}" data-jump="${ui}" title="${esc(u.unit.t)}"><span class="wr-n">${esc((u.unit.s||"").split(" · ")[0]||String(ui+1))}</span><svg viewBox="-60 -70 120 80" aria-hidden="true">${((W.units||[])[ui]||{}).mark||W.land(u,Math.max(p.f,.999),true,ui)}${p.done?`<g transform="translate(46 -40)"><path d="M0 0v-26" stroke="#3A2A1A" stroke-width="2.5"/><path d="M0 -26h18l-5 6 5 6H0z" fill="${W.flag}"/></g>`:""}</svg><span class="wr-he">${u.unit.he||""}</span><span class="wr-t">${esc(u.unit.t)}</span><span class="wr-p">${p.done?"✓ done":p.d?`${p.d}/${p.n}`:"Not started"}</span><i style="width:${Math.round(p.f*100)}%"></i></button>`}).join("")}</div>
 <button class="wb-zoom wb-earth" id="earthOut">🌍 The whole world · every subject</button><button class="wb-zoom" id="zoomOut">🗺️ Open the map · ${CRS.id==="mishnayos"?"all of Shas Mishnayos":ZEDATA[CRS.id]?ZEDATA[CRS.id].t:"Whole map"}</button><div class="wb-stats"><span><b>${claimed}</b>/${P.length} ${W.verb.toLowerCase()}</span><span><b>${pct}%</b> of the world</span>${here?`<span class="wb-live"><span class="live"></span><b>${here}</b> here now</span>`:""}</div></section>`}
/* long courses (the Kitzur) show one section at a time, with a row of sections to switch */
const SECSEL={};
function unitSections(){const Z=ZEDATA[CRS.id];return CRS.units.length>40&&Z&&Z.items.every(it=>it.u)?Z.items:null}
function secFor(ui){const s=unitSections();if(!s)return;const k=s.findIndex(it=>ui>=it.u[0]&&ui<it.u[1]);if(k>=0)SECSEL[CRS.id]=k}
function unitsWindowHTML(cur,anyDone){const secs=unitSections();if(!secs)return CRS.units.map((u,ui)=>regionView(u,ui,cur,anyDone)).join("");
 let k=SECSEL[CRS.id];if(k==null||!secs[k]){const ui=cur?cur.ui:0;k=Math.max(0,secs.findIndex(it=>ui>=it.u[0]&&ui<it.u[1]))}
 const it=secs[k],done=x=>CRS.units.slice(x.u[0],x.u[1]).every(u=>unitProgress(u).done);
 return `<div class="secbar" role="tablist" aria-label="Sections">${secs.map((x,i)=>`<button class="mtab ${i===k?"on":""}" role="tab" aria-selected="${i===k}" data-sec="${i}"><span class="he">${x.he}</span> ${esc(x.en)}${done(x)?" ✓":""}</button>`).join("")}</div>
  <p class="secsub">${esc(it.lbl)} · ${esc(it.en)}</p>`+CRS.units.slice(it.u[0],it.u[1]).map((u,j)=>regionView(u,it.u[0]+j,cur,anyDone)).join("")
  +(k<secs.length-1?`<button class="btn ghost block secnext" data-sec="${k+1}">Next section: ${esc(secs[k+1].en)} →</button>`:"")}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-sec]");if(!b)return;SECSEL[CRS.id]=+b.dataset.sec;render();setTimeout(()=>{const s=document.querySelector(".secbar");if(s){s.scrollIntoView({block:"start"});const on=s.querySelector(".on");if(on)on.scrollIntoView({inline:"center",block:"nearest"})}},30)});
(()=>{const st=document.createElement("style");st.textContent=`.secbar{display:flex;gap:6px;overflow-x:auto;padding:8px 2px;margin:6px 0 2px;scrollbar-width:none}.secbar::-webkit-scrollbar{display:none}.secbar .mtab{flex:none}.secbar .he{font-family:"Frank Ruhl Libre",serif;font-weight:900}
.secsub{margin:2px 4px 8px;color:var(--muted);font-weight:700;font-size:13px}.secnext{margin:10px 0 18px}`;document.head.appendChild(st)})();
function regionView(u,ui,cur,anyDone){const W=Object.assign({},worldOf(),(worldOf().units||[])[ui]||{}),p=unitProgress(u),N=u.nodes.length,H=WTOP+(N-1)*WSTEP+WBOT;
 const pts=u.nodes.map((n,i)=>[WOFF[i%WOFF.length],WTOP+i*WSTEP]);const last=pts[N-1],lx=last[0]>0?-70:70,ly=H-40;
 let d=`M${pts[0][0]} -10 L${pts[0][0]} ${pts[0][1]}`;
 for(let i=1;i<N;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i];d+=` C${x0} ${y0+WSTEP*.5} ${x1} ${y1-WSTEP*.5} ${x1} ${y1}`}
 d+=` C${last[0]} ${last[1]+60} ${lx} ${ly-60} ${lx} ${ly-14}`;
 const roadX=y=>{if(y<=pts[0][1])return pts[0][0];for(let i=1;i<N;i++)if(y<=pts[i][1]){const t=(y-pts[i-1][1])/WSTEP;return pts[i-1][0]+(pts[i][0]-pts[i-1][0])*(3*t*t-2*t*t*t)}return lx};
 wSeed=17+ui*131+CRS.id.length*7;let deco="",rich="";const taken=[];
 /* rolling hills in lighter and darker shades */
 for(let k=0;k<4;k++){const y=60+wRnd()*(H-120),x=-260+wRnd()*520,r=120+wRnd()*120;rich+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${r.toFixed(0)}" ry="${(r*.45).toFixed(0)}" fill="${shade(W.ground,k%2?1.08:.93)}" opacity=".7"/>`}
 /* a stream crossing the region, with a bridge where the road meets it */
 if(N>=3&&W.stream!==false){const sy=WTOP+WSTEP*(1.5+(ui%2)),bx=roadX(sy);rich+=`<path d="M-400 ${sy} q100 -26 200 0 t200 0 t200 0 t200 0" stroke="#5DA8EE" stroke-width="16" fill="none" opacity=".9"/><path class="wave" d="M-400 ${sy} q100 -26 200 0 t200 0 t200 0 t200 0" stroke="#BFE0FF" stroke-width="2" fill="none" stroke-dasharray="8 14"/>`;
  taken.push([bx,sy]);rich+=`__BRIDGE${bx.toFixed(0)},${sy.toFixed(0)}__`}
 /* patchwork fields */
 if(W.fields!==false&&(CRS.id==="mishnayos"||CRS.id==="tanakh"||CRS.id==="chumash")){for(let k=0;k<5;k++){const y=60+wRnd()*(H-160),x=-280+wRnd()*560;if(Math.abs(x-roadX(y))<110)continue;const c=["#C9A85A","#8FBF5A","#B88A4A","#A8C86A"][k%4];
  rich+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><path d="M-50 0l20-24h70l-20 24z" fill="${c}" opacity=".85"/>${[0,1,2,3].map(r=>`<path d="M${-44+r*5} ${-4-r*5}h62" stroke="${shade(c,.85)}" stroke-width="1.6"/>`).join("")}</g>`;taken.push([x,y])}}
 /* big set pieces for this perek */
 const sets=(SP[(SPKEY[CRS.id]||"m")+ui]||[]);let setsSVG="";
 sets.forEach((svgp,j)=>{const y=WTOP+WSTEP*.6+j*Math.max(WSTEP*1.6,(H-WBOT-WTOP)/Math.max(1,sets.length)),rx=roadX(y),x=Math.max(-125,Math.min(125,rx>0?rx-155:rx+155));
  setsSVG+=`<g transform="translate(${x.toFixed(0)} ${(y+40).toFixed(0)}) scale(.95)">${svgp}</g>`;taken.push([x,y+10],[x-50,y+10],[x+50,y+10],[x,y-40])});
 /* forest clusters */
 for(let k=0;k<2;k++){const y=80+wRnd()*(H-200),x=(wRnd()>.5?1:-1)*(210+wRnd()*70);for(let t=0;t<5;t++)rich+=`<g transform="translate(${(x+(t%3)*18-18).toFixed(0)} ${(y+Math.floor(t/3)*16).toFixed(0)}) scale(.9)">${W.night?WD.cypress:WD.olive}</g>`}
 for(let k=0;k<160&&taken.length<Math.round(H/20);k++){const x=-300+wRnd()*600,y=30+wRnd()*(H-60);
  if(Math.abs(x-roadX(y))<62||(Math.abs(x-lx)<80&&y>ly-110)||taken.some(([a,b])=>Math.hypot(a-x,b-y)<52))continue;
  taken.push([x,y]);const kind=W.deco[Math.floor(wRnd()*W.deco.length)],s=.8+wRnd()*.5;
  const sky=kind==="cloud"||kind==="bird";deco+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${(sky?s:s).toFixed(2)})"${sky?"":""}>${WD[kind]}</g>`}
 deco=deco.split("</g><g transform").length?deco:deco;
 const sorted=deco; /* drawn in random order; fine at this size */
 const night=W.night?`<rect x="-400" y="0" width="800" height="${H}" fill="#0A1636" opacity=".28"/>${Array.from({length:Math.round(H/40)},(_,k)=>`<g transform="translate(${(-300+((k*137)%600))} ${20+((k*211)%(H-40))})">${WD.star}</g>`).join("")}`:"";
 const emb=W.emblem&&!sets.length?`<g transform="translate(${lx+(lx>0?-96:96)} ${ly-34})"><circle r="24" fill="#FFF8E7" opacity=".9" stroke="${W.flag}" stroke-width="2"/><g transform="translate(0 6)">${W.emblem}</g></g>`:"";
 const fog=!p.d&&!(cur&&cur.ui===ui)?`<rect x="-400" y="0" width="800" height="${H}" fill="#E8EEF6" opacity=".18"/>`:"";
 const flag=p.done?`<g class="wflag" transform="translate(${lx+52} ${ly})"><path d="M0 0v-70" stroke="#3A2A1A" stroke-width="3"/><g class="wave-flag"><path d="M0 -70h40l-9 11 9 11H0z" fill="${W.flag}"/><text x="16" y="-55" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">✓</text></g></g>`:"";
 const nodes=u.nodes.map((n,i)=>{const st=nodeState(u,i),isCur=!!cur&&cur.ui===ui&&cur.i===i,cls=[n.kind==="review"?"review":"",n.kind==="test"?"test":"",st,isCur?"current":""].join(" ");
  const ic=st==="locked"?I.lock:n.kind==="review"?I.repeat:n.kind==="test"?I.crown:st==="done"?I.check:I.book;
  const stars=S.lessons[n.id]?.stars||0;const title=n.lesson?n.lesson.title:n.title,short=n.lesson?n.lesson.short:n.short;const [x,y]=pts[i];
  return `<button class="node wnode ${cls}" data-node="${ui}:${i}" style="left:calc(50% + ${x}px);top:${y}px" aria-label="${esc(title)} — ${st}">${isCur?`<span class="start-tag">${anyDone?"Next":"Start"}</span>`:""}<span class="disc">${ic}</span>${isCur?`<span class="buddy wav" style="${x>0?"right":"left"}:calc(100% + 6px)">${avatarSVG(myAvatar())}</span>`:""}${st==="done"&&n.kind==="lesson"?`<span class="stars">${[1,2,3].map(k=>`<span class="${k<=stars?"":"off"}">${I.star}</span>`).join("")}</span>`:""}<span class="lbl">${esc(title)}<small>${esc(short)}</small></span></button>`}).join("");
 const started=p.d>0;
 return `<section class="unit wunit${p.done?" won":""}" id="reg${ui}" style="--wf:${W.flag}"><div><small>${u.unit.s}</small><h2>${u.unit.t}</h2>${CRS.units.length>1&&!started?`<p class="unit-note">Open anytime. You don't need to finish the one before.</p>`:""}
  <div class="wprog"><i style="width:${Math.round(p.f*100)}%"></i></div><p class="unit-note">${p.done?`${W.verb} ✓`:`${p.d} of ${p.n} steps`}${W.note?` · ${esc(W.note)}`:""}</p></div><span class="he">${u.unit.he}</span></section>
 <div class="region" style="height:${H}px"><svg class="terrain" viewBox="-400 0 800 ${H}" width="800" height="${H}" aria-hidden="true">
  <defs><linearGradient id="wg${ui}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${W.ground}"/><stop offset="1" stop-color="${W.ground2}"/></linearGradient></defs>
  <rect x="-400" y="0" width="800" height="${H}" fill="url(#wg${ui})"/>
  ${CRS.id==="gemara"||CRS.id==="tanakh"?`<path d="M${CRS.id==="gemara"?150:-150} 0 q30 ${H/4} 0 ${H/2} t0 ${H/2}" stroke="#5DA8EE" stroke-width="26" fill="none" opacity=".85"/><path class="wave" d="M${CRS.id==="gemara"?150:-150} 0 q30 ${H/4} 0 ${H/2} t0 ${H/2}" stroke="#BFE0FF" stroke-width="2" fill="none" stroke-dasharray="10 14"/>`:""}
  ${rich.replace(/__BRIDGE[^_]+__/g,"")}${deco}${setsSVG}
  <path d="${d}" stroke="${W.edge}" stroke-width="34" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${W.road}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-dasharray="2 12" opacity=".7" stroke-linecap="round"/>
  <g transform="translate(${lx} ${ly})"><ellipse cy="2" rx="70" ry="10" fill="#000" opacity=".08"/><g class="${p.done?"wlit":""}" ${p.done||p.d?"":'opacity=".55"'}>${W.mark||W.land(u,p.f,p.done,ui)}</g></g>
  ${(rich.match(/__BRIDGE([-\d]+),([-\d]+)__/)||[]).length?(()=>{const m=rich.match(/__BRIDGE([-\d]+),([-\d]+)__/);const bx=+m[1],by=+m[2];return `<g transform="translate(${bx} ${by})"><rect x="-22" y="-10" width="44" height="20" rx="3" fill="#A8743E"/><path d="M-22 -10h44M-22 10h44" stroke="#6B4423" stroke-width="3"/>${[-16,-8,0,8,16].map(x=>`<path d="M${x} -10v20" stroke="#8A5A2B" stroke-width="1.2"/>`).join("")}</g>`})():""}
  ${[0,1].map(k=>`<g><animateMotion dur="${70+k*25}s" begin="${-k*30}s" repeatCount="indefinite" path="${d}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"/><g transform="scale(.3)"><g class="hop">${avatar(npcLook(ui*7+k+1))}</g></g></g>`).join("")}
  <g transform="translate(0 ${40+(ui*53)%Math.max(60,H-200)})"><g class="flyby" style="animation-delay:${-ui*3}s">${[0,1,2].map(i=>`<g transform="translate(${i*14} ${i%2*8})">${WD.bird}</g>`).join("")}</g></g>
  ${emb}${flag}${night}${fog}</svg>
  ${nodes}<div class="wpeers" data-u="${ui}"></div></div>`}
function drawWorldPeers(){document.querySelectorAll(".wpeers").forEach(el=>{const ui=+el.dataset.u,u=CRS.units[ui];if(!u){el.innerHTML="";return}
  const list=LT.room?LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.pos&&p.presence.pos.c===CRS.id&&p.presence.pos.u===u.key):[];
  const byNode={};list.forEach(p=>{const i=Math.max(0,Math.min(u.nodes.length-1,+p.presence.pos.i||0));(byNode[i]=byNode[i]||[]).push(p)});
  const now=Date.now();
  el.innerHTML=Object.entries(byNode).map(([i,ps])=>{const x=WOFF[i%WOFF.length],y=WTOP+i*WSTEP,side=x>0?-1:1,m=Math.min(ps.length,4);
   const dn=el.parentElement.querySelector(`[data-node="${ui}:${i}"] .disc`),rr=el.parentElement.getBoundingClientRect();let cy=y,cx=rr.width/2+x,rw=72;const isCur=!!el.parentElement.querySelector(`[data-node="${ui}:${i}"].current`),gap=isCur?100:34;if(dn){const r=dn.getBoundingClientRect();cy=r.top-rr.top+r.height/2;cx=r.left-rr.left+r.width/2;rw=r.width}
   return ps.slice(0,4).map((p,k)=>{const nick=ltStr(p.presence.nick,24)||"A fellow learner",cool=(LT.cool[p.peer]||0)>now;
    return `<button class="wpeer" data-hi="${esc(p.peer)}" style="left:${cx+side*(rw/2+gap)}px;top:${cy+(k-(m-1)/2)*42}px;--pc:${ltColor(nick)}" title="${esc(nick)} — tap for a Yasher Koach" ${cool?"disabled":""}><span class="av">${p.presence.av?avatarSVG(Object.assign({},p.presence.av,{base:profile()||"man"}),"","-26 -106 52 64"):esc(nick.slice(0,1).toUpperCase())}</span><span class="nk">${esc(nick.split(" ")[0])}</span></button>`}).join("")+(ps.length>4?`<span class="wpeer more" style="left:${cx+side*(rw/2+gap)}px;top:${cy+2.3*42}px">+${ps.length-4}</span>`:"")}).join("");
  el.querySelectorAll("[data-hi]").forEach(b=>b.onclick=e=>{e.stopPropagation();ltSendHi(b.dataset.hi)})})}
function bindWorld(){const zo=$("#zoomOut");if(zo)zo.onclick=shasMap;const eo=$("#earthOut");if(eo)eo.onclick=globeView;document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>{if(!$("#reg"+b.dataset.jump)&&typeof secFor==="function"){secFor(+b.dataset.jump);render();setTimeout(()=>{const t=$("#reg"+b.dataset.jump);if(t)t.scrollIntoView({behavior:"smooth",block:"start"})},60);return}const t=$("#reg"+b.dataset.jump);if(t){t.scrollIntoView({behavior:"smooth",block:"start"});t.classList.add("flash");setTimeout(()=>t.classList.remove("flash"),1600)}});
 S.claimSeen=S.claimSeen||{};let fresh=null;
 CRS.units.forEach((u,ui)=>{if(S.lessons[u.testId]?.done&&!S.claimSeen[u.key]){S.claimSeen[u.key]=1;fresh=ui}});
 if(fresh!=null){save();const W=worldOf(),el=$("#reg"+fresh);if(el){el.nextElementSibling?.classList.add("claiming");setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"start"}),300)}
  const d=document.createElement("div");d.className="hitoast";d.setAttribute("role","status");d.innerHTML=`${ner("cheer")}<p><b>${esc(CRS.units[fresh].unit.t)}</b> — ${W.verb.toLowerCase()}! Your flag is up.</p>`;document.body.appendChild(d);setTimeout(()=>d.remove(),4200)}
 drawWorldPeers()}

