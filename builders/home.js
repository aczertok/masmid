/* ================= SIGN-UP, "WHO'S LEARNING?", AND THE HOME MENU ================= */
function courseNext(c){const last=(S.lastUnit||{})[c.id];const order=c.units.map((u,ui)=>ui).sort((a,b)=>(c.units[b].key===last)-(c.units[a].key===last));
 for(const ui of order){const u=c.units[ui];const i=u.nodes.findIndex((n,k)=>nodeState(u,k)==="open");if(i>=0)return{ui,i}}return null}
function coursePct(c){let d=0,t=0;c.units.forEach(u=>{t+=u.nodes.length;d+=u.nodes.filter(n=>S.lessons[n.id]?.done).length});return t?d/t:0}
/* sign-up: one friendly page. mode "first" = the person opening the app; "add" = a new profile for someone else on this account */
function signUp(mode){const first=mode!=="add";let g=null,skin=1,hair=0,subj=[],goal=30;
 const cat=()=>catOf({gender:g,age:($("#wage")||{}).value?.trim()||null})||(g==="f"?"girl":"boy");
 const prev=()=>{const el=$("#wav");if(el)el.innerHTML=avatarSVG(avClean({base:cat(),skin,hair}),"","-30 -108 60 112")};
 $("#layer").innerHTML=`<div class="signup" role="dialog" aria-modal="true" aria-label="Create a profile"><div class="su-in wrap">
  <div class="su-hero">${first?`<span class="he su-bh">ברוכים הבאים</span><h1>Welcome to Limud Path</h1><p>Create your profile to start learning. It takes a minute.</p>`:`<h1>New profile</h1><p>For someone else learning here. Each profile has its own progress, avatar and town.</p>`}</div>
  <div class="su-card"><div class="su-av" id="wav" aria-hidden="true"></div>
   <label class="field" for="wname">${first?"Your name":"Name"}<input type="text" id="wname" maxlength="24" autocomplete="given-name" placeholder="e.g. Moshe or Chaya"></label>
   <div class="field">Boy or girl<div class="seg big2" id="wprof"><button data-v="m" aria-pressed="false">Boy</button><button data-v="f" aria-pressed="false">Girl</button></div></div>
   <label class="field" for="wage">Age <span class="small">(optional)</span><input type="text" inputmode="numeric" id="wage" maxlength="3" placeholder="e.g. 11"></label>
   <div class="field">Look<div class="su-sw" id="wskin">${AV_SKIN.map((c,i)=>`<button data-v="${i}" aria-pressed="${i===skin}" style="--sw:${c}" aria-label="Skin tone ${i+1}"></button>`).join("")}</div>
    <div class="su-sw" id="whair">${AV_HAIR.map((c,i)=>`<button data-v="${i}" aria-pressed="${i===hair}" style="--sw:${c}" aria-label="Hair color ${i+1}"></button>`).join("")}</div><small class="small">More hats, clothes and accessories unlock as you learn.</small></div></div>
  <div class="su-card"><div class="field">What would you like to learn?<div class="su-subj" id="wsubj">${SUBJECTS.map(s=>`<button data-v="${s.id}" aria-pressed="false" ${s.live?"":"disabled"} style="--c:${s.c}"><svg viewBox="0 0 64 64" aria-hidden="true">${SUBJ_ART[s.id]}</svg><span class="he">${s.he}</span><b>${s.en}</b>${s.live?"":"<small>Coming soon</small>"}</button>`).join("")}</div><small class="small">Pick one or more. You can switch anytime from Home.</small></div>
   <div class="field">Daily goal<div class="seg" id="wgoal">${[[20,"Casual"],[30,"Regular"],[50,"Serious"]].map(([v,n])=>`<button data-v="${v}" aria-pressed="${v===goal}">${n}<small>${v} XP</small></button>`).join("")}</div></div></div>
  <button class="btn block" id="wgo">${first?"Create my profile":"Add profile"}</button>${first?"":`<button class="btn ghost block" id="wback">Cancel</button>`}
  <p class="small su-note">Your profile and progress are saved to your account, so they're here on any device where you open Limud Path. ${first?"Family members can each get their own profile from Home or Settings.":""}</p></div></div>`;
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
  <p>Level ${lv.lv} · ${lv.name} · ${st.n||0}-day streak</p></div>
  <div class="h-ring" aria-label="Today's goal ${tx} of ${goal} XP"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="24" cy="24" r="20" fill="none" stroke="var(--gold)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pct)}" transform="rotate(-90 24 24)"/></svg><span>${tx}/${goal}</span></div></section>
 ${nn?`<section class="h-cont" style="--c:${(SUBJECTS.find(s=>s.id===cc.id)||{}).c||"var(--blue)"}"><div class="h-art">${scene(nn.lesson?((STEP_SCENES[nn.lesson.id]||[])[0]||nn.lesson.id):nn.kind==="review"?"chazara":"siyum")}</div>
  <div class="h-ct"><small>${coursePct(cc)>0?"Continue":"Start"} · ${esc(cc.chip.t)}</small><h2>${esc(nn.lesson?nn.lesson.title:nn.title)}</h2><p>${esc(cc.units[nx.ui].unit.t)} · ${Math.round(coursePct(cc)*100)}% of the course</p>
  <div class="h-cb"><button class="btn" id="hGo">${coursePct(cc)>0?"Continue":"Start"}</button><button class="btn ghost" data-hpath="${cc.id}">See the path</button></div></div></section>`:""}
 <h2 class="h-sec">Learn</h2>
 <div class="h-grid">${SUBJECTS.map(s=>{const c=COURSES[s.id],ok=s.live&&c,p=ok?coursePct(c):0;return `<button class="h-subj ${ok?"":"soon"} ${s.id===S.course?"cur":""}" data-hsubj="${s.id}" style="--c:${s.c}">
  <span class="h-top"><span class="he">${s.he}</span><svg viewBox="0 0 64 64" aria-hidden="true">${SUBJ_ART[s.id]}</svg></span><b>${s.en}</b><small>${ok?esc(c.chip.s):"Coming soon"}</small>
  ${ok?`<span class="h-bar"><i style="width:${Math.round(p*100)}%"></i></span><span class="h-pc">${p>0?Math.round(p*100)+"%":(mine.includes(s.id)?"Picked · start here":"Open")}</span>`:""}</button>`}).join("")}</div>
 <h2 class="h-sec">Explore</h2>
 <div class="h-tiles">
  <button class="h-tile" id="hWorld"><span>🌍</span><b>The whole world</b><small>Every subject as a continent</small></button>
  <button class="h-tile" id="hMap"><span>🗺️</span><b>Map</b><small>${esc(ZEDATA[cc.id]?ZEDATA[cc.id].t:cc.chip.t)}</small></button>
  <button class="h-tile" data-go="town"><span>🏘️</span><b>My town</b><small>Build with what you learn</small></button>
  <button class="h-tile" data-go="progress"><span>📊</span><b>Progress</b><small>Badges, streaks, siyumim</small></button>
  <button class="h-tile" id="hTogether"><span>👥</span><b>Learn together</b><small>${S.settings.together?"On":"See who's learning now"}</small></button>
  <button class="h-tile" id="hAvatar"><span>🧑</span><b>My avatar</b><small>Unlock new looks</small></button>
  <button class="h-tile" id="hWho"><span>👪</span><b>Profiles</b><small>${Object.keys(ACC.profiles).length>1?Object.keys(ACC.profiles).length+" on this account":"Add someone in your family"}</small></button>
  <button class="h-tile" id="hSettings"><span>⚙️</span><b>Settings</b><small>Goal, calendar, backup</small></button>
 </div></main>`}
function bindHome(){const go=$("#hGo");if(go)go.onclick=()=>{const cc=COURSES[S.course];setCourse(cc.id);const nx=courseNext(cc);if(nx)openNode(nx.ui,nx.i)};
 document.querySelectorAll("[data-hpath]").forEach(b=>b.onclick=()=>{S.course=b.dataset.hpath;save();tab="learn";render();scrollTo(0,0)});
 document.querySelectorAll("[data-hsubj]").forEach(b=>b.onclick=()=>{const id=b.dataset.hsubj,s=SUBJECTS.find(x=>x.id===id);if(!(s.live&&COURSES[id])){subjectSheet(id);return}S.course=id;save();tab="learn";render();scrollTo(0,0)});
 $("#hWorld").onclick=globeView;$("#hMap").onclick=()=>{setCourse(S.course);shasMap()};$("#hTogether").onclick=()=>ltSheet(!S.settings.together);
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
