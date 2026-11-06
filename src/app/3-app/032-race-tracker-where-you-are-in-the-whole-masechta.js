/* ================= RACE TRACKER: where you are in the whole masechta / sefer, and who else is on the course ================= */
function raceBar(cur){const U=CRS.units;if(!U.length)return "";
 const sizes=U.map(u=>u.nodes.length),tot=sizes.reduce((a,b)=>a+b,0),before=k=>sizes.slice(0,k).reduce((a,b)=>a+b,0);
 const doneN=U.reduce((a,u)=>a+u.nodes.filter(n=>S.lessons[n.id]?.done).length,0),me=doneN/tot;
 const curU=cur?U[cur.ui]:null,where=curU?`${(curU.unit.s||"").split(" · ")[0]} · ${curU.nodes[cur.i]?.lesson?curU.nodes[cur.i].lesson.short.split(" · ").slice(-1)[0]:curU.unit.t}`:"Finished!";
 const peers=LT.room?LT.peers.filter(p=>!p.isMe&&p.presence&&p.presence.pos&&p.presence.pos.c===CRS.id).map(p=>{const k=U.findIndex(u=>u.key===p.presence.pos.u);if(k<0)return null;
   return {p,f:Math.min(1,(before(k)+Math.max(0,+p.presence.pos.i||0))/tot),nick:ltStr(p.presence.nick,24)||"Learner"}}).filter(Boolean):[];
 const ahead=peers.filter(x=>x.f>me+.0001).length,place=ahead+1,of=peers.length+1;
 const ord=n=>n+(["th","st","nd","rd"][(n%100>10&&n%100<14)?0:Math.min(n%10,4)%4]||"th");
 const title=CRS.id==="mishnayos"?"Maseches Berachos":ZEDATA[CRS.id]?ZEDATA[CRS.id].t:CRS.chip.t;
 const SECS=typeof unitSections==="function"?unitSections():null;
 const seg=SECS?SECS.map((it,k)=>{const us=U.slice(it.u[0],it.u[1]),n=us.reduce((a,u)=>a+u.nodes.length,0),d=us.reduce((a,u)=>a+u.nodes.filter(x=>S.lessons[x.id]?.done).length,0);return `<button class="rc-seg ${d>=n?"won":""}" data-jump="${it.u[0]}" style="flex:${n}" aria-label="${esc(it.en)}"><i style="width:${Math.round(d/n*100)}%"></i><span>${k+1}</span></button>`}).join("")
  :U.map((u,k)=>{const p=unitProgress(u);return `<button class="rc-seg ${p.done?"won":""}" data-jump="${k}" style="flex:${sizes[k]}" aria-label="${esc(u.unit.t)}"><i style="width:${Math.round(p.f*100)}%"></i><span>${k+1}</span></button>`}).join("");
 const dots=peers.slice(0,8).map(x=>`<span class="rc-peer" style="left:${(x.f*100).toFixed(1)}%;--pc:${ltColor(x.nick)}" title="${esc(x.nick)}">${x.p.presence.av?avatarSVG(Object.assign({},x.p.presence.av,{base:profile()||"man"}),"","-24 -100 48 48"):esc(x.nick.slice(0,1).toUpperCase())}</span>`).join("");
 return `<section class="racebar" aria-label="Your place in ${esc(title)}"><div class="rc-top"><b>🏁 ${esc(title)}</b><button class="rc-idx" data-index aria-label="Index: jump to any part">📑 Index</button><span class="rc-pct">${Math.round(me*100)}%${of>1?` · <b>${ord(place)}</b> of ${of}`:""}</span></div><div class="rc-where">${curU?"You're at ":""}<b>${esc(where)}</b>${of>1?` · ${of-1} other${of>2?"s":""} on the course`:""}</div>
  <div class="rc-track"><div class="rc-segs">${seg}</div>${dots}<span class="rc-me" style="left:${(me*100).toFixed(1)}%">${avatarSVG(myAvatar(),"","-24 -100 48 48")}</span><span class="rc-flag">🏁</span></div></section>`}
(()=>{const st=document.createElement("style");st.textContent=`.racebar{position:sticky;top:calc(env(safe-area-inset-top,0px) + var(--toph,62px) + 6px);z-index:4;background:var(--surface);border:2px solid var(--line);border-radius:16px;padding:8px 12px 10px;box-shadow:0 6px 16px rgba(22,33,58,.08)}
.rc-top{display:flex;align-items:baseline;gap:8px;font-size:13.5px;white-space:nowrap}.rc-top .rc-pct{margin-left:auto;font-weight:800;font-size:13px}.rc-where{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}.rc-where b{color:var(--ink)}
.rc-track{position:relative;margin:16px 18px 0 6px;height:14px}
.rc-segs{display:flex;gap:3px;height:100%}
.rc-seg{position:relative;border:0;padding:0;border-radius:7px;background:var(--line);overflow:hidden;cursor:pointer;min-width:8px}
.rc-seg i{position:absolute;left:0;top:0;bottom:0;background:var(--karti,#3CA35A)}.rc-seg.won i{background:var(--gold,#E3B84A)}
.rc-seg span{position:relative;font-size:9px;font-weight:800;color:#3A4664;line-height:14px}
.rc-me,.rc-peer{position:absolute;bottom:4px;transform:translateX(-50%);width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--blue,#2457A6);overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.2);z-index:2;pointer-events:none}
.rc-me svg,.rc-peer svg{width:100%;height:100%}
.rc-peer{width:24px;height:24px;border-color:var(--pc,#7D5CC0);z-index:1;display:grid;place-items:center;font-size:11px;font-weight:800;opacity:.92}
.rc-flag{position:absolute;right:-18px;top:-4px;font-size:14px}
.wunit{scroll-margin-top:calc(var(--toph,62px) + 96px)}.wunit.flash{animation:regflash 1.6s ease-out}`;document.head.appendChild(st)})();
