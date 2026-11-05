/* ================= LEARNERS: see each other, high five, compare towns =================
   Each profile can publish a small public card (first name, avatar, level, streak, badges, what they're learning, their town).
   Only learners in the same group see each other (men, women, boys, girls). It can be turned off in Settings.
   In the Masmid app the cards live in the app's database, so you see everyone who learned recently; online = active in the last 3 minutes.
   In the Claude version, you see whoever has "Learn together" on right now. */
const SOC={list:[],at:0,loading:false,seen:{},timer:null};
const socOn=()=>S.settings.community!==false;
function socMyId(){const u=window.LimudAuth&&LimudAuth.user?LimudAuth.user.uid:"local";return u+"_"+ACC.active}
function socCard(){const L=levelOf(S.xp),u=(()=>{try{const nx=courseNext(CRS);return nx?CRS.units[nx.ui].unit.t:""}catch(e){return ""}})();
 const T=(()=>{try{const t=town();return {items:t.items.slice(0,400).map(x=>({k:x.k,x:x.x,y:x.y})),name:t.name||"",ext:t.ext||0}}catch(e){return {items:[]}}})();
 const pos=(()=>{try{return ltPos()}catch(e){return null}})(),ctx=(()=>{try{return badgeCtx()}catch(e){return {}}})();
 const bi=id=>BADGES.findIndex(x=>x.id===id);const best={};Object.keys(S.badges).forEach(id=>{const b=BADGES[bi(id)];if(!b)return;const f=b.fam||"start";if(!best[f]||bi(id)>bi(best[f]))best[f]=id});
 const recent=Object.values(best).sort((a,b)=>String(S.badges[b]).localeCompare(String(S.badges[a]))||bi(b)-bi(a)).slice(0,8).map(id=>BADGES[bi(id)]).map(x=>({he:x.he,name:x.name}));
 return {nick:ltStr(curP().name||S.settings.name,24)||"A learner",av:myAvatar(),lv:L.lv,lvName:L.name,xp:S.xp,streak:streakNow().short,badges:Object.keys(S.badges).length,
  unitKey:pos?pos.u:"",best:Math.max(S.bestStreak||0,streakInfo().n),siyum:ctx.siyum||0,lessons:ctx.lessons||0,days:ctx.days||0,recent,
  course:CRS?CRS.chip.t:"",courseId:CRS?CRS.id:"",unit:u,town:T,townTitle:(()=>{try{return townTitle().t[1]}catch(e){return ""}})()}}
async function socPublish(){if(!window.LimudSocial||!profile())return;try{if(socOn())await LimudSocial.publish(profile(),socMyId(),socCard());else await LimudSocial.remove(profile(),socMyId())}catch(e){}}
async function socLoad(force){if(!window.LimudSocial||!profile()||SOC.loading)return SOC.list;if(!force&&Date.now()-SOC.at<45000)return SOC.list;
 SOC.loading=true;try{SOC.list=(await LimudSocial.list(profile())).filter(x=>x.id!==socMyId()&&x.card);SOC.at=Date.now()}catch(e){}SOC.loading=false;return SOC.list}
/* everyone you can see: app learners + whoever is online through Learn together */
function socAll(){const out=new Map(),now=Date.now();
 SOC.list.forEach(x=>out.set(x.id,{id:x.id,card:x.card,online:now-x.ts<180000,ts:x.ts,src:"db"}));
 if(LT.room)LT.peers.filter(p=>!p.isMe&&p.presence).forEach(p=>{const pr=p.presence;const card=pr.card||{nick:ltStr(pr.nick,24)||"A fellow learner",av:pr.av,lv:pr.lvl,streak:pr.streak?pr.streak+"-day streak":"",course:pr.course};
  out.set("p:"+p.peer,{id:"p:"+p.peer,peer:p.peer,card,online:true,ts:now,src:"room"})});
 return [...out.values()].sort((a,b)=>(b.online-a.online)||(b.ts-a.ts))}
const socAgo=ts=>{const m=Math.round((Date.now()-ts)/60000);return m<3?"Learning now":m<60?`${m} min ago`:m<1440?`${Math.round(m/60)} h ago`:`${Math.round(m/1440)} d ago`};
async function socFive(p){const now=Date.now();SOC.cool=SOC.cool||{};if((SOC.cool[p.id]||0)>now){toast("You just sent one. Try again in a bit.");return}SOC.cool[p.id]=now+20000;
 if(p.src==="room"){ltSendHi(p.peer)}
 else if(window.LimudSocial){try{await LimudSocial.five(profile(),p.id,socMyId(),ltStr(curP().name||S.settings.name,24)||"A learner");toast("✋ High five sent!")}catch(e){toast("Couldn't send. Check your connection.");return}}
 S.counts=S.counts||{};S.counts.fivesGiven=(S.counts.fivesGiven||0)+1;save()}
function socGotFive(nick){S.counts=S.counts||{};S.counts.fivesGot=(S.counts.fivesGot||0)+1;save();
 const d=document.createElement("div");d.className="hitoast";d.setAttribute("role","status");d.innerHTML=`<span style="font-size:34px">✋</span><p><b>${esc(nick)}</b> gave you a high five!</p>`;document.body.appendChild(d);setTimeout(()=>d.remove(),3800)}
function socStart(){if(SOC.started||!window.LimudSocial)return;SOC.started=true;
 const beat=()=>{if(document.visibilityState==="visible")socPublish()};beat();SOC.timer=setInterval(beat,90000);document.addEventListener("visibilitychange",beat);
 let seen={};try{seen=JSON.parse(localStorage.getItem("limudpath.fives")||"{}")}catch(e){}
 const watch=()=>{if(!profile())return;try{LimudSocial.onFives(profile(),socMyId(),list=>{let ch=false;const fresh=[];list.forEach(f=>{if(!seen[f.id]){seen[f.id]=1;ch=true;if(Date.now()-f.ts<7*864e5)fresh.push(ltStr(f.nick,24)||"A learner")}});
   if(fresh.length){S.counts=S.counts||{};S.counts.fivesGot=(S.counts.fivesGot||0)+fresh.length-1;socGotFive(fresh.length>1?`${fresh[0]} and ${fresh.length-1} other${fresh.length>2?"s":""}`:fresh[0])}if(ch)try{localStorage.setItem("limudpath.fives",JSON.stringify(seen))}catch(e){}})}catch(e){}};watch()}
/* people screens */
function socRow(p){const c=p.card;return `<button class="lrn" data-lrn="${esc(p.id)}"><span class="lrn-av">${avatarSVG(Object.assign({},c.av||{},{base:profile()||"man"}),"","-30 -108 60 112")}${p.online?`<i class="on" aria-label="online"></i>`:""}</span>
 <span class="lrn-t"><b>${esc(c.nick||"A learner")}</b><small>Level ${c.lv||1}${c.streak?` · ${esc(c.streak)}`:""}</small><small>${p.online?"🟢 ":""}${esc(socAgo(p.ts))}${c.course?` · ${esc(c.course)}`:""}</small></span><span class="lrn-go">›</span></button>`}
async function communitySheet(){SOC.back=null;const draw=()=>{const L=socAll();sheet(`<h3>Learners</h3><p class="sub" style="margin-top:-4px">${esc(PROFILES[profile()]||"")} learning with Masmid. Tap someone to see their avatar, level and town, or send a high five.</p>
  <div class="lrn-list">${L.length?L.map(socRow).join(""):`<p class="small" style="text-align:center;padding:18px 0">${window.LimudSocial?(SOC.loading?"Loading…":"No one else here yet. Invite a friend!"):"Turn on <b>Learn together</b> to see who's learning right now."}</p>`}</div>
  <label class="row2 soc-tog"><span class="small">Show me to other learners<br><span class="sub">First name, avatar, level and town only</span></span><input type="checkbox" id="socme" ${socOn()?"checked":""}></label>
  ${window.LimudSocial?"":`<button class="btn ghost block" id="socLT">${S.settings.together?"Learn together is on":"Turn on Learn together"}</button>`}
  <button class="btn block" id="socDone">Done</button>`,()=>{
  document.querySelectorAll("[data-lrn]").forEach(b=>b.onclick=()=>{const p=socAll().find(x=>x.id===b.dataset.lrn);if(p)learnerSheet(p)});
  $("#socme").onchange=e=>{S.settings.community=e.target.checked;save();socPublish();toast(e.target.checked?"Others in your group can see your card":"You're hidden from other learners")};
  const lt=$("#socLT");if(lt)lt.onclick=()=>{closeSheet();ltSheet(true)};$("#socDone").onclick=closeSheet})};
 draw();if(window.LimudSocial){await socLoad(true);if($(".lrn-list"))draw()}}
function learnerSheet(p,opt){opt=opt||{};SOC.back=opt.back||SOC.back||null;const c=p.card,me=socCard(),av=Object.assign({},c.av||{},{base:profile()||"man"});
 sheet(`<div class="lrn-head"><span class="lrn-big">${avatarSVG(av,"big")}</span><div><h3 style="margin:0">${esc(c.nick||"A learner")}</h3><p class="sub" style="margin:2px 0">${p.online?"🟢 Learning now":esc(socAgo(p.ts))}</p>${c.unit||c.course?`<p class="small" style="margin:0">${esc(c.course||"")}${c.unit?` · ${esc(c.unit)}`:""}</p>`:""}</div></div>
  <div class="lrn-stats"><div><b>${c.lv||1}</b><small>${esc(c.lvName||"Level")}</small></div><div><b>${(c.xp||0).toLocaleString()}</b><small>XP</small></div><div><b>${esc((c.streak||"–").split(" ")[0])}</b><small>${esc((c.streak||"streak").split(" ").slice(1).join(" ")||"streak")}</small></div><div><b>${c.badges||0}</b><small>Badges</small></div></div>
  ${c.recent&&c.recent.length||c.siyum||c.lessons?`<p class="sec-h">Accomplishments</p><div class="lrn-acc">${c.lessons?`<span><b>${c.lessons}</b> lessons</span>`:""}${c.siyum?`<span><b>${c.siyum}</b> siyumim</span>`:""}${c.best?`<span><b>${c.best}</b> best streak</span>`:""}${c.days?`<span><b>${c.days}</b> days learned</span>`:""}</div>
   ${(c.recent||[]).length?`<div class="lrn-bdg">${c.recent.map(x=>`<span class="bdg"><span class="ic">${esc(x.he)}</span>${esc(x.name)}</span>`).join("")}</div>`:""}`:""}
  <button class="btn block" id="lf5">✋ High five</button>
  ${c.town&&c.town.items?`<button class="btn ghost block" id="ltown">🏘️ See ${esc(c.nick||"their")}'s town</button>`:""}
  <p class="sec-h">You and ${esc(c.nick||"them")}</p>
  <table class="lrn-cmp"><tr><th></th><th>You</th><th>${esc(c.nick||"Them")}</th></tr>
   <tr><td>Level</td><td>${me.lv}</td><td>${c.lv||1}</td></tr><tr><td>XP</td><td>${me.xp.toLocaleString()}</td><td>${(c.xp||0).toLocaleString()}</td></tr>
   <tr><td>Streak</td><td>${esc(me.streak)}</td><td>${esc(c.streak||"–")}</td></tr><tr><td>Badges</td><td>${me.badges}</td><td>${c.badges||0}</td></tr>
   ${c.town?`<tr><td>Town</td><td>${esc(me.townTitle)} · ${me.town.items.length}</td><td>${esc(c.townTitle||"")} · ${(c.town.items||[]).length}</td></tr>`:""}</table>
  <button class="btn ghost block" id="lback">${SOC.back?(typeof SOC.back==="function"?(SOC.backLabel||"Back"):"Back to the map"):"Back to learners"}</button>`,()=>{
  $("#lf5").onclick=()=>socFive(p);const t=$("#ltown");if(t)t.onclick=()=>theirTownSheet(p);$("#lback").onclick=()=>{const b=SOC.back;SOC.back=null;if(typeof b==="function"){closeSheet();b()}else if(b){closeSheet();setCourse(b);shasMap()}else communitySheet()}})}
function theirTownSVG(c){const keep=S,keepTP=typeof TP!=="undefined"?TP:null;let out="";
 try{S=Object.assign({},keep,{town:{items:(c.town.items||[]).slice(),name:c.town.name||"",ext:c.town.ext||0},xp:c.xp||0});TP=null;out=townSVG()}catch(e){out=""}finally{S=keep;TP=keepTP}return out}
function theirTownSheet(p){const c=p.card;sheet(`<h3>${esc(c.town.name||((c.nick||"Their")+"'s town"))}</h3><p class="sub" style="margin-top:-4px">${esc(c.townTitle||"")} · ${(c.town.items||[]).length} things built</p>
  <div class="townwrap lrn-town">${theirTownSVG(c)||`<p class="small">This town is still empty.</p>`}</div>
  <div class="row2"><button class="btn ghost" id="tback">Back</button><button class="btn" id="tmine">My town</button></div>`,()=>{
  const w=document.querySelector(".lrn-town");if(w)requestAnimationFrame(()=>{w.scrollLeft=(w.scrollWidth-w.clientWidth)/2});
  $("#tback").onclick=()=>learnerSheet(p,{back:SOC.back});$("#tmine").onclick=()=>{closeSheet();tab="town";render();scrollTo(0,0)}})}
(()=>{const st=document.createElement("style");st.textContent=`.lrn-list{display:flex;flex-direction:column;gap:8px;margin:10px 0;max-height:50vh;overflow:auto}
.lrn{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;border:2px solid var(--line);background:var(--surface);border-radius:14px;padding:8px 10px;text-align:left;color:var(--ink);cursor:pointer}
.lrn-av{position:relative;width:46px;height:50px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#FFF8E7,#E9F2FF);overflow:hidden;display:block}.lrn-av svg{width:100%;height:100%}
.lrn-av .on{position:absolute;right:2px;bottom:4px;width:11px;height:11px;border-radius:50%;background:#2E9E5B;border:2px solid #fff}
.lrn-t{display:flex;flex-direction:column;min-width:0}.lrn-t b{font-size:15px}.lrn-t small{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lrn-go{font-size:22px;color:var(--muted)}
.soc-tog{align-items:center;gap:10px;padding:8px 0}.soc-tog input{width:22px;height:22px}
.lrn-head{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;margin-bottom:10px}.lrn-big{width:96px;height:104px;display:block}.lrn-big svg{width:100%;height:100%}
.lrn-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px}.lrn-stats div{border:2px solid var(--line);border-radius:12px;padding:6px 4px;text-align:center}.lrn-stats b{display:block;font-size:17px}.lrn-stats small{font-size:10.5px;color:var(--muted)}
.lrn-cmp{width:100%;border-collapse:collapse;font-size:13.5px;margin-bottom:10px}.lrn-cmp th,.lrn-cmp td{padding:6px 4px;border-bottom:1px solid var(--line);text-align:center}.lrn-cmp td:first-child,.lrn-cmp th:first-child{text-align:left;color:var(--muted)}
.lrn-town{max-height:46vh;overflow:auto;border-radius:14px;margin:8px 0}.lrn-town svg{min-width:520px}
#lf5{margin-bottom:8px}`;document.head.appendChild(st)})();
/* worlds and landmarks for Vayera (units 18–22) and the rest of Chayei Sarah (25–26) */
(()=>{const g=(s,x=0,y=0)=>`<g transform="translate(${x} ${y}) scale(${s})">`;
 const W=WORLDS.chumash.units||(WORLDS.chumash.units=[]);while(W.length<27)W.push({});
 Object.assign(W,{
  18:{ground:"#A8C06A",ground2:"#98B05A",deco:["tree","tent","sheep","olive","flowers"],mark:`${g(1.1,-24,0)}${WD.tent}</g>${g(1,26,0)}${PR.tree}</g>`,note:"Avraham's tent, open on every side"},
  19:{ground:"#8A7A6A",ground2:"#7A6A5A",night:1,deco:["rocks","ruin","rocks","mountain"],mark:`${g(.7,0,0)}${PR.cityp}</g>${g(.6,0,-30)}${PR.firefall}</g>`,note:"Sedom and Amorah"},
  20:{ground:"#C9B07A",ground2:"#B9A06A",deco:["palm","house","sheep","rocks"],mark:`${g(.9,0,0)}${WD.house}</g>${g(.8,0,-42)}${PR.crown2}</g>`,note:"Gerar, land of the Pelishtim"},
  21:{ground:"#C9B46E",ground2:"#B9A45E",deco:["well","tree","sheep","palm","tent"],mark:`${g(1.2,-22,0)}${PR.well2}</g>${g(1,26,0)}${WD.olive}</g>`,note:"Be'er Sheva and the eshel"},
  22:{ground:"#9AA07A",ground2:"#8A906A",deco:["mountain","rocks","olive","bush"],mark:`${g(1.2,0,0)}${WD.mountain}</g>${g(.7,0,-36)}${PR.altar}</g>`,note:"Har HaMoriah"},
  25:{ground:"#B8B07A",ground2:"#A8A06A",deco:["tent","camel","palm","well"],mark:`${g(1,-20,0)}${PR.camel}</g>${g(1,24,0)}${WD.tent}</g>`,note:"Yitzchak and Rivkah"},
  26:{ground:"#B8A67A",ground2:"#A8966A",deco:["tent","olive","palm","rocks"],mark:`${g(.8,0,0)}${PR.cave}</g>`,note:"Avraham's last years"}});
 Object.assign(SP,{
  c18:[`<g>${g(1.4,-40,0)}${WD.tent}</g>${g(1.4,50,0)}${PR.tree}</g>${g(1,50,4)}${PR.table}</g></g>`,`<g>${g(1.3)}${PR.calf}</g></g>`],
  c19:[`<g>${g(1.1)}${PR.cityp}</g>${g(1,0,-40)}${PR.firefall}</g></g>`,`<g>${g(1.2)}${PR.mountains}</g></g>`],
  c20:[`<g>${g(1.2)}${WD.house}</g>${g(1.2,0,-60)}${PR.crown2}</g></g>`],
  c21:[`<g>${g(1.5,-30,0)}${PR.well2}</g>${g(1.2,40,0)}${PR.tree}</g></g>`,`<g>${g(1.3)}${PR.bow2}</g></g>`],
  c22:[`<g>${g(1.6)}${WD.mountain}</g>${g(1,0,-50)}${PR.altar}</g></g>`,`<g>${g(1.2)}${PR.ramthicket}</g></g>`],
  c25:[`<g>${[-50,0,50].map(x=>g(1.1,x,0)+PR.camel+"</g>").join("")}</g>`],
  c26:[`<g>${g(1.4)}${PR.cave}</g></g>`]});
})();

(()=>{const st=document.createElement("style");st.textContent=`.mppl{position:absolute;left:8px;right:8px;top:8px;z-index:2;background:rgba(255,255,255,.94);border:2px solid var(--line);border-radius:14px;padding:6px 8px;box-shadow:0 4px 12px rgba(0,0,0,.12)}.mppl[hidden]{display:none}
.mppl-t{font-size:12px;color:var(--muted);font-weight:700}.mppl-r{display:flex;gap:6px;overflow-x:auto;padding-top:4px;scrollbar-width:none}.mppl-r::-webkit-scrollbar{display:none}
.mppl-p{flex:none;position:relative;border:0;background:none;padding:0;display:flex;flex-direction:column;align-items:center;cursor:pointer;color:var(--ink)}.mppl-p svg{width:38px;height:42px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#FFF8E7,#E9F2FF)}
.mppl-p i{position:absolute;right:2px;top:30px;width:10px;height:10px;border-radius:50%;background:#2E9E5B;border:2px solid #fff}.mppl-p small{font-size:10px;font-weight:700;max-width:46px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mpp{cursor:pointer}.lrn-acc{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}.lrn-acc span{border:2px solid var(--line);border-radius:999px;padding:3px 10px;font-size:12.5px}
.lrn-bdg{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}.lrn-bdg .bdg{display:flex;align-items:center;gap:6px;width:auto;padding:4px 10px 4px 4px;font-size:12px}.lrn-bdg .bdg .ic{width:26px;height:26px;font-size:11px}`;document.head.appendChild(st)})();
