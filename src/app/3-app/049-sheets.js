/* ================= SHEETS ================= */
function sheet(html,after){const l=$("#layer");l.innerHTML=`<div class="sheet-bg" id="sbg"><div class="sheet wrap" role="dialog" aria-modal="true">${html}</div></div>`;
 $("#sbg").onclick=e=>{if(e.target.id==="sbg")closeSheet()};after&&after()}
const closeSheet=()=>{$("#layer").innerHTML=""};
function subjectSheet(id){const s=SUBJECTS.find(x=>x.id===id);sheet(`<div><svg class="sart" viewBox="0 0 64 64" aria-hidden="true">${SUBJ_ART[s.id]}</svg><span class="he" style="font-size:34px;font-weight:900;color:${s.c};display:block">${s.he}</span><h3>${s.en}</h3><p class="sub">${esc(s.desc)}</p></div>
 <p class="sec-h">Planned path</p><ol class="plan">${s.plan.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>
 ${s.live?`<button class="btn block" id="sgo">${s.id===S.course?"Continue learning":"Switch to "+s.en}</button>`:`<p class="small">This subject isn't built yet in the prototype. The lesson engine is shared, so new subjects need content, not new code.</p><button class="btn ghost block" id="sgo">Back</button>`}`,()=>$("#sgo").onclick=()=>{closeSheet();if(s.live){S.course=s.id;save();tab="learn";render();scrollTo(0,0)}})}
function welcome(){sheet(`<div style="text-align:center;display:flex;flex-direction:column;gap:8px;align-items:center">${ner("cheer").replace('class="ner "','class="ner" style="width:96px;height:auto;color:var(--muted)"')}<span class="he" style="font-size:40px;font-weight:900;color:var(--tech)">ברוכים הבאים</span><h3>Welcome to Limud Path</h3><p class="sub">Are you a boy or a girl?</p></div>
 <div class="seg big2" id="wprof"><button data-v="m" aria-pressed="false">Boy</button><button data-v="f" aria-pressed="false">Girl</button></div>
 <p class="small" style="text-align:center">That's all for now. You can add your name and age, or more profiles for your family, anytime in Settings.</p>
 <button class="btn block" id="wgo">Begin</button>`,()=>{let g=null;segBind("#wprof",v=>g=v);
  $("#wgo").onclick=()=>{if(!g){toast("Please choose Boy or Girl");return}const p=curP();p.gender=g;p.cat=null;S.welcomed=true;S.avatar=avClean({base:catOf(p)});save();closeSheet();render()}})}
/* edit one profile: name, boy/girl, age. Progress stays with the profile. */
function profileSheet(id){const p=ACC.profiles[id||ACC.active]||curP(),isCur=p.id===ACC.active;
 sheet(`<h3>${p.name?esc(p.name):"Profile"}</h3><p class="sub">Your avatar, the people you see on the map, and who you learn together with all follow this profile. Your progress always stays with it.</p>
 <label class="field" for="pname">Name<input type="text" id="pname" maxlength="24" autocomplete="off" value="${esc(p.name||"")}" placeholder="e.g. Moshe"></label>
 <div class="field">Boy or girl<div class="seg" id="pgen"><button data-v="m" aria-pressed="${p.gender==="m"}">Boy</button><button data-v="f" aria-pressed="${p.gender==="f"}">Girl</button></div></div>
 <label class="field" for="page">Age (optional)<input type="text" inputmode="numeric" id="page" maxlength="3" value="${p.age??""}" placeholder="e.g. 11"><small class="small">From bar mitzvah (13) or bas mitzvah (12) and up, the avatar and the Learn together group are for adults.</small></label>
 <p class="small" id="pcat"></p>
 <button class="btn block" id="pgo">Save</button>${!isCur?`<button class="btn ghost block" id="puse">Learn as ${esc(p.name||"this profile")}</button>`:""}${Object.keys(ACC.profiles).length>1&&!isCur?`<button class="btn red block" id="pdel">Delete this profile</button><div id="pdelc"></div>`:""}`,()=>{
  let g=p.gender;segBind("#pgen",v=>{g=v;show()});const show=()=>{const c=catOf({gender:g,age:$("#page").value.trim()||null});$("#pcat").textContent=c?`Shown as: ${PROFILE_ONE[c]}`:""};$("#page").oninput=show;show();
  $("#pgo").onclick=async()=>{if(!g){toast("Please choose Boy or Girl");return}const before=catOf(p);const ag=$("#page").value.trim();if(ag&&(isNaN(+ag)||+ag<3||+ag>120)){toast("Please enter an age in numbers");return}
   p.name=$("#pname").value.trim().slice(0,24);p.gender=g;p.age=ag?+ag:null;p.cat=null;p.data.settings.name=p.name;p.data.avatar=avClean(Object.assign({},p.data.avatar||{},{base:catOf(p)}));
   save();closeSheet();if(isCur&&before!==catOf(p)&&LT.room){await ltLeave();if(S.settings.together)ltJoin()}render();toast("Profile saved")};
  const u=$("#puse");if(u)u.onclick=()=>switchProfile(p.id);
  const d=$("#pdel");if(d)d.onclick=()=>{$("#pdelc").innerHTML=`<div class="row2"><span class="small">Delete ${esc(p.name||"this profile")} and all of its progress?</span><button class="btn red sm" id="pdy">Delete</button></div>`;$("#pdy").onclick=()=>{delete ACC.profiles[p.id];save();closeSheet();render();toast("Profile deleted")}}})}
function addProfileSheet(){sheet(`<h3>Add a profile</h3><p class="sub">For someone else learning on this device. Each profile has its own progress, avatar and town. Your own profile doesn't change.</p>
 <label class="field" for="nname">Name<input type="text" id="nname" maxlength="24" autocomplete="off" placeholder="e.g. Chaya"></label>
 <div class="field">Boy or girl<div class="seg" id="ngen"><button data-v="m" aria-pressed="false">Boy</button><button data-v="f" aria-pressed="false">Girl</button></div></div>
 <button class="btn block" id="ngo">Add profile</button>`,()=>{let g=null;segBind("#ngen",v=>g=v);
  $("#ngo").onclick=()=>{const n=$("#nname").value.trim().slice(0,24);if(!n){toast("Please add a name");return}if(!g){toast("Please choose Boy or Girl");return}
   const id=pid(),d=fresh();d.welcomed=true;d.settings.name=n;d.v=DATA_V;const p={id,name:n,gender:g,age:null,cat:null,created:Date.now(),data:d};d.avatar=avClean({base:catOf(p)});ACC.profiles[id]=p;save();switchProfile(id)}})}
function profilesBlock(){return `<div class="field">Profiles<div class="plist">${Object.values(ACC.profiles).sort((a,b)=>a.created-b.created).map(p=>{const c=catOf(p);
  return `<button class="prow ${p.id===ACC.active?"on":""}" data-pedit="${p.id}"><span class="pav">${avatarSVG(Object.assign({},p.data.avatar||{},{base:c||"boy"}),"","-24 -100 48 52")}</span><span class="pt"><b>${esc(p.name||"My profile")}</b><small>${c?PROFILE_ONE[c]:"Not set"}${p.age?` · ${p.age}`:""} · ${p.data.xp} XP${p.id===ACC.active?" · learning now":""}</small></span><span class="pe">Edit</span></button>`}).join("")}</div>
  <button class="btn ghost block" id="padd">+ Add a profile</button></div>`}
function segBind(sel,fn){document.querySelectorAll(sel+" button").forEach(b=>b.onclick=()=>{document.querySelectorAll(sel+" button").forEach(x=>x.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true");fn(b.dataset.v)})}
function settingsSheet(){sheet(`<h3>Settings</h3>${window.LimudAuth&&LimudAuth.user?`<div class="row2"><span class="small">Signed in as <b>${esc(LimudAuth.user.email||LimudAuth.user.displayName||"")}</b></span><button class="btn ghost sm" id="sOut">Sign out</button></div>`:""}
 ${profilesBlock()}
 <div class="field">Language · Idioma<div>${langPick()}</div></div>
 <label class="field row2" for="ssound"><span>Sounds<br><small class="small">Sounds (and a little buzz) for right and wrong answers</small></span><input type="checkbox" id="ssound" ${S.settings.sound!==false?"checked":""}></label>
 <div class="field">Daily goal<div class="seg" id="sgoal">${[[20,"Casual"],[30,"Regular"],[50,"Serious"]].map(([v,n])=>`<button data-v="${v}" aria-pressed="${S.settings.goal===v}">${n}<small>${v} XP</small></button>`).join("")}</div></div>
 <div class="field">Streak<div class="seg" id="sstreak"><button data-v="day" aria-pressed="${S.settings.streakMode!=="week"}">Daily<small>learn every day</small></button><button data-v="week" aria-pressed="${S.settings.streakMode==="week"}">Weekly<small>days per week</small></button></div>
  <div class="seg" id="sweek" style="margin-top:8px;${S.settings.streakMode==="week"?"":"display:none"}">${[2,3,4,5].map(v=>`<button data-v="${v}" aria-pressed="${(+S.settings.weekGoal||3)===v}">${v} days<small>a week</small></button>`).join("")}</div></div>
 <div class="field">Yom Tov calendar<div class="seg" id="sil"><button data-v="0" aria-pressed="${!S.settings.il}">Chutz La'aretz</button><button data-v="1" aria-pressed="${S.settings.il}">Eretz Yisrael</button></div></div>
 <div class="field">Your data<p class="small">Everything is saved to your account and on this device, and it stays through every app update. You can also keep your own copy.</p><div class="row2"><button class="btn ghost sm" id="sexp">Download a backup</button><label class="btn ghost sm" for="simp" style="cursor:pointer">Restore a backup<input type="file" id="simp" accept="application/json" hidden></label></div></div>
 <div class="tester"><b>Tester tools</b><p class="small">Simulated date: ${today()} (${["Sun","Mon","Tue","Wed","Thu","Fri","Shabbos"][dow(today())]})${restKind(today())?" · "+restKind(today()):""}</p>
 <div class="row"><button class="btn ghost sm" id="tPrev">− 1 day</button><button class="btn ghost sm" id="tNext">+ 1 day</button><button class="btn ghost sm" id="tReal">Real date</button></div>
 <div class="row"><button class="btn red sm" id="tReset">Reset progress</button></div><div id="resetConfirm"></div></div>
 <div><p class="sec-h">Sources</p><p class="small" style="margin-top:8px">${Object.values(COURSES).map(c=>{const src=c.units[0].source;return `<b>${c.chip.t}:</b> Hebrew: ${src.he.title} (${src.he.license}). English: ${src.en.title}, licensed <a href="${src.en.licenseUrl}" target="_blank" rel="noopener">${src.en.license}</a>. `}).join("")}All retrieved from the <a href="https://www.sefaria.org" target="_blank" rel="noopener">Sefaria API</a>. In the Kitzur, the Name אלהים is written אלקים. Glosses, notes and questions were written for this app. Powered by Sefaria; not developed by Sefaria.</p></div>
 <button class="btn block" id="sDone">Done</button>`,()=>{
  segBind("#sgoal",v=>{S.settings.goal=+v;save()});segBind("#sstreak",v=>{S.settings.streakMode=v;save();$("#sweek").style.display=v==="week"?"":"none"});segBind("#sweek",v=>{S.settings.weekGoal=+v;save()});const so=$("#sOut");if(so)so.onclick=async()=>{await LimudAuth.signOut();try{localStorage.removeItem(KEY2);localStorage.removeItem("limudpath.signupName")}catch(e){}location.reload()};document.querySelectorAll("[data-pedit]").forEach(b=>b.onclick=()=>profileSheet(b.dataset.pedit));$("#padd").onclick=addProfileSheet;
  $("#sexp").onclick=exportData;$("#simp").onchange=e=>{const fl=e.target.files[0];if(fl)importData(fl)};segBind("#sil",v=>{S.settings.il=v==="1";save()});
  
  const shift=n=>{S.dayOffset=n===0?0:(S.dayOffset||0)+n;save();render();settingsSheet()};
  $("#tPrev").onclick=()=>shift(-1);$("#tNext").onclick=()=>shift(1);$("#tReal").onclick=()=>shift(0);
  $("#tReset").onclick=()=>{$("#resetConfirm").innerHTML=`<div class="row"><span class="small">Erase all XP, streaks and lessons for this profile?</span><button class="btn red sm" id="tYes">Erase</button><button class="btn ghost sm" id="tNo">Keep</button></div>`;
   $("#tYes").onclick=()=>{curP().data=fresh();S=curP().data;S.welcomed=true;save();closeSheet();render();toast("Progress reset")};$("#tNo").onclick=()=>$("#resetConfirm").innerHTML=""};
  $("#sDone").onclick=()=>{closeSheet();render()}})}

