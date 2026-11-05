/* ================= LEARN TOGETHER (opt-in, live; nickname only, no chat) =================
   Uses the room capability. Everything travels in presence (anyone can set it), so even
   view-only testers can send a Yasher Koach. Nothing here is stored except your own counts. */
const LT={room:null,peers:[],me:null,status:"off",feed:[],seenHi:{},seenFin:{},cool:{},lastSend:0,hiN:0,finN:0,hiObj:null,finObj:null,doing:"Browsing"};
const GROUPS={all:"Everyone",men:"Men only",women:"Women only"};
const ltStr=(v,n)=>typeof v==="string"?v.replace(/[\u0000-\u001f]/g,"").slice(0,n):"";
async function ltWait(){for(let k=0;k<30&&!window.claude?.use;k++)await new Promise(r=>setTimeout(r,100));return window.claude?.use?window.claude:null}
async function ltJoin(){if(!S.settings.together||LT.room)return;LT.status="connecting";refreshLT();
 try{const c=await ltWait();const lobby=c?await c.use("room"):null;if(!lobby){LT.status="unavailable";refreshLT();return}
  if(!profile()){LT.status="off";profileSheet();return}const room=await lobby.join("chevrah-"+profile());
  if(!S.settings.together){room.leave().catch(()=>{});LT.status="off";refreshLT();return}
  LT.room=room;LT.status="on";
  room.onPeers(ltPeers,()=>{LT.room=null;LT.status="unavailable";refreshLT()});
  ltPresence();refreshLT()}catch(e){LT.status="unavailable";refreshLT()}}
async function ltLeave(){const r=LT.room;LT.room=null;LT.peers=[];LT.feed=[];LT.status="off";if(r){try{await r.leave()}catch(e){}}refreshLT()}
function ltPos(){if(R&&LT.pos)return LT.pos;if(!CRS)return null;const c=findCurrent();return c?{c:CRS.id,u:CRS.units[c.ui].key,i:c.i}:{c:CRS.id,u:CRS.units[CRS.units.length-1].key,i:CRS.units[CRS.units.length-1].nodes.length-1}}
function ltPresence(){if(!LT.room)return;const st=streakInfo();
 LT.room.presence({card:(c=>{c.town.items=c.town.items.slice(0,150);return c})(socCard()),nick:ltStr(S.settings.name,24)||"A fellow learner",course:CRS?CRS.chip.t:"",doing:LT.doing,streak:st.n,lvl:levelOf(S.xp).lv,hi:LT.hiObj,fin:LT.finObj,pos:ltPos(),av:myAvatar()}).catch(()=>{})}
function ltPeers(ch){LT.peers=ch.peers.filter(p=>p.kind==="viewer");const me=ch.peers.find(p=>p.isMe&&p.sameTab);if(me)LT.me=me.peer;
 const fresh=new Set(ch.joined.map(p=>p.peer));
 [...ch.joined,...ch.updated].forEach(p=>{if(p.isMe)return;const pr=p.presence||{},nick=ltStr(pr.nick,24)||"A fellow learner";
  const hi=pr.hi;if(hi&&typeof hi==="object"&&typeof hi.n==="number"){const seen=LT.seenHi[p.peer];LT.seenHi[p.peer]=Math.max(seen||0,hi.n);
   if(!fresh.has(p.peer)&&hi.to===LT.me&&hi.n>(seen||0))ltGotHi(nick)}
  const fin=pr.fin;if(fin&&typeof fin==="object"&&typeof fin.n==="number"){const seen=LT.seenFin[p.peer];LT.seenFin[p.peer]=Math.max(seen||0,fin.n);
   if(!fresh.has(p.peer)&&fin.n>(seen||0)){LT.feed.unshift({peer:p.peer,nick,t:ltStr(fin.t,60),at:Date.now()});LT.feed=LT.feed.slice(0,6)}}});
 refreshLT()}
function ltGotHi(nick){S.hiGot=(S.hiGot||0)+1;S.counts=S.counts||{};S.counts.fivesGot=(S.counts.fivesGot||0)+1;save();
 const d=document.createElement("div");d.className="hitoast";d.setAttribute("role","status");d.innerHTML=`${ner("cheer")}<p><b>${esc(nick)}</b> gave you a high five ✋</p>`;document.body.appendChild(d);setTimeout(()=>d.remove(),3800);refreshLT()}
function ltSendHi(peer){const now=Date.now();if(!LT.room||(LT.cool[peer]||0)>now)return;if(now-LT.lastSend<1500){toast("One moment…");return}
 LT.lastSend=now;LT.cool[peer]=now+30000;LT.hiN++;LT.hiObj={to:peer,n:LT.hiN};ltPresence();S.hiGave=(S.hiGave||0)+1;save();toast("✋ High five sent!");refreshLT();setTimeout(refreshLT,30100)}
function ltFinished(title){if(!LT.room)return;LT.finN++;LT.finObj={t:title,n:LT.finN};ltPresence()}
function ltDoing(d){LT.doing=d;ltPresence()}
const ltColor=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return `hsl(${h} 55% 45%)`};
function togetherCard(){
 if(!S.settings.together)return `<section class="card lt" id="ltCard"><div class="lt-h"><span class="lt-ic">${I.people}</span><div><h3>Learn together</h3><p>See who else is learning right now, and give them a Yasher Koach. Only a nickname is shown. No chat, no photos.</p></div></div><button class="btn block" id="ltJoin">Join</button></section>`;
 if(LT.status!=="on")return `<section class="card lt" id="ltCard"><div class="lt-h"><span class="lt-ic">${I.people}</span><div><h3>Learn together</h3><p>${LT.status==="connecting"?"Connecting…":"Learn together works for signed-in people you've shared the app with. It isn't available in this view."}</p></div></div>${LT.status==="unavailable"?`<button class="linkbtn" id="ltLeave">Turn off</button>`:""}</section>`;
 const others=LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.nick!==undefined).slice(0,8),now=Date.now();
 return `<section class="card lt" id="ltCard"><div class="lt-top"><h3><span class="live"></span>Learning now · ${others.length}</h3><span class="lt-grp">${PROFILES[profile()]||""} only</span></div>
 ${others.length?`<ul class="lt-list">${others.map(p=>{const pr=p.presence,nick=ltStr(pr.nick,24)||"A fellow learner",cool=(LT.cool[p.peer]||0)>now;
  return `<li><span class="av" style="background:${ltColor(nick)}">${esc(nick.slice(0,1).toUpperCase())}</span><div class="who"><b>${esc(nick)}${p.guest?' <small>guest</small>':""}</b><small>${esc(ltStr(pr.doing,60)||"Browsing")} · ${esc(ltStr(pr.course,40))}</small></div><span class="lt-st">${I.fire}${Number(pr.streak)||0}</span><button class="hi" data-hi="${esc(p.peer)}" ${cool?"disabled":""}>${cool?"Sent":"👋 Yasher Koach"}</button></li>`}).join("")}</ul>`
  :`<p class="lt-empty">No one else is learning right now. When others open the app, they'll show up here.</p>`}
 ${LT.feed.length?`<div class="lt-feed">${LT.feed.map(f=>`<p>⭐ <b>${esc(f.nick)}</b> finished <i>${esc(f.t)}</i>${LT.peers.some(p=>p.peer===f.peer)&&!((LT.cool[f.peer]||0)>now)?` <button class="hi sm" data-hi="${esc(f.peer)}">👋</button>`:""}</p>`).join("")}</div>`:""}
 <div class="lt-foot"><span>Yasher Koachs received: <b>${S.hiGot||0}</b> · given: <b>${S.hiGave||0}</b></span><button class="linkbtn" id="ltSetup">Settings</button></div></section>`}
function bindLT(){const j=$("#ltJoin");if(j)j.onclick=()=>ltSheet(true);const s=$("#ltSetup");if(s)s.onclick=()=>ltSheet(false);const l=$("#ltLeave");if(l)l.onclick=()=>{S.settings.together=false;save();ltLeave()};
 document.querySelectorAll("[data-hi]").forEach(b=>b.onclick=()=>ltSendHi(b.dataset.hi))}
function refreshLT(){if(typeof drawWorldPeers==="function")drawWorldPeers();const el=$("#ltCard");if(el){el.outerHTML=togetherCard();bindLT()}const c=$("#ltchip");if(c){const n=LT.room?LT.peers.filter(p=>!p.isMe).length:0;c.hidden=!n;c.innerHTML=`${I.people}${n}`}}
function ltSheet(joining){sheet(`<h3>Learn together</h3><p class="sub">Others will see your nickname, what you're learning, and your streak. Nothing else is shared, and there's no chat. You can turn this off anytime.</p>
 <label class="field" for="ltnick">Nickname<input type="text" id="ltnick" maxlength="24" autocomplete="off" placeholder="e.g. Moshe from Monsey" value="${esc(S.settings.name||"")}"></label>
 <p class="small">You'll only see, and be seen by, other <b>${(PROFILES[profile()]||"").toLowerCase()}</b>, based on your profile. Profiles are on the honor system.</p>
 <button class="btn block" id="ltGo">${joining?"Join":"Save"}</button>${joining?"":`<button class="btn ghost block" id="ltOff">Stop learning together</button>`}`,()=>{
  const grp=profile();
  $("#ltGo").onclick=async()=>{const nick=$("#ltnick").value.trim();if(!nick){$("#ltnick").focus();toast("Pick a nickname first");return}
   S.settings.name=nick.slice(0,24);curP().name=curP().name||S.settings.name;const changed=grp!==S.settings.group;S.settings.group=grp;S.settings.together=true;save();closeSheet();
   if(changed&&LT.room)await ltLeave();if(!LT.room)ltJoin();else{ltPresence();refreshLT()}};
  const off=$("#ltOff");if(off)off.onclick=()=>{S.settings.together=false;save();closeSheet();ltLeave()}})}

render();
if(S.settings.together)ltJoin();

