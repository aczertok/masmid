/* ================= HELPERS ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const isHe=s=>/[\u0590-\u05FF]/.test(s)&&!/[A-Za-z]/.test(s);
const txt=s=>isHe(s)?`<span class="he">${esc(s)}</span>`:esc(s);
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
function nodeState(u,i){const n=u.nodes[i];if(u.adult&&typeof isKid==="function"&&isKid())return"locked";if(n.kind==="lesson")return S.lessons[n.id]?.done?"done":(i===0||S.lessons[u.nodes[i-1].id]?.done?"open":"locked");
 const allDone=u.lessons.every(l=>S.lessons[l.id]?.done);if(!allDone)return"locked";
 if(n.kind==="review")return S.lessons[u.revId]?.done?"done":"open";
 return S.lessons[u.testId]?.done?"done":(S.lessons[u.revId]?.done?"open":"locked")}
function findCurrent(){const last=(S.lastUnit||{})[CRS.id];
 const order=CRS.units.map((u,ui)=>ui).sort((a,b)=>(CRS.units[b].key===last)-(CRS.units[a].key===last));
 for(const ui of order){const u=CRS.units[ui];const i=u.nodes.findIndex((n,k)=>nodeState(u,k)==="open");if(i>=0)return{ui,i}}
 return null}

