/* ================= INDEX: jump to any sefer, parasha, perek or siman =================
   Opens from the 📑 Index button on the progress bar at the top of Learn.
   Also gives every Chumash perek its number in English and Hebrew. */
function heNum(n){n=+n;if(!(n>0))return "";let s="";const H=[[400,"ת"],[300,"ש"],[200,"ר"],[100,"ק"],[90,"צ"],[80,"פ"],[70,"ע"],[60,"ס"],[50,"נ"],[40,"מ"],[30,"ל"],[20,"כ"],[10,"י"],[9,"ט"],[8,"ח"],[7,"ז"],[6,"ו"],[5,"ה"],[4,"ד"],[3,"ג"],[2,"ב"],[1,"א"]];
 while(n>=400){s+="ת";n-=400}if(n%100===15||n%100===16){for(const [v,c] of H)if(v>=100&&n>=v){s+=c;n-=v}s+=n===15?"טו":"טז";return s}
 for(const [v,c] of H)while(n>=v){s+=c;n-=v}return s}
const CH_SEFARIM=[["בראשית","Bereishis"],["שמות","Shemos"],["ויקרא","Vayikra"],["במדבר","Bamidbar"],["דברים","Devarim"]];
/* the groups of a course: parshiyos, sections of the Kitzur, sefarim… */
function ixGroups(c){c=c||CRS;const Z=ZEDATA[c.id],items=Z&&Z.items||[];const withU=items.filter(it=>it.u);
 if(withU.length)return {groups:withU.map(it=>({he:it.he,en:it.en,u:it.u})),later:items.filter(it=>!it.u&&!it.live)};
 return {groups:[{he:"",en:"",u:[0,c.units.length]}],later:items.filter(it=>!it.live)}}
function ixGroupOf(ui,c){const g=ixGroups(c).groups;return g.find(x=>ui>=x.u[0]&&ui<x.u[1])||null}
/* "Perek 6" / "Siman 12" / "Daf 2a–3a" from a unit, plus the Hebrew */
function unitNum(u){const parts=String(u.unit.s||"").split(" · ");const p=parts.find(x=>/^(Perek|Siman|Daf|Chapter)\b/.test(x))||"";
 const m=p.match(/^(Perek|Siman)\s+(\d+)/);const he=m?(m[1]==="Perek"?"פרק ":"סימן ")+heNum(m[2]):"";return {en:p,he}}
function lessonCount(u){const m=String(u.unit.s||"").match(/\d+ lessons?$/);return m?m[0]:""}
/* the small line over each unit on the path */
function unitSmall(u,ui){if(CRS.id!=="chumash")return u.unit.s;const g=ixGroupOf(ui),n=unitNum(u);
 return `${g?`Parashas ${esc(g.en)} · `:""}${esc(n.en)}${lessonCount(u)?" · "+esc(lessonCount(u)):""}<span class="ux-he">${g?`פרשת ${g.he}`:""}${g&&n.he?" · ":""}${n.he}</span>`}
/* the caption under each lesson on the path */
function nodeCap(n){if(!n.lesson)return esc(n.short||"");let s=n.lesson.short||"";
 if(CRS.id==="chumash"){const m=s.match(/(\d+):(\d+)(?:[–-](\d+))?$/);if(m)s=`Perek ${m[1]} · ${m[1]}:${m[2]}${m[3]?"–"+m[3]:""}`}
 const ph=(n.lesson.phrases||[])[0],he=ph&&ph[0]?String(ph[0]).replace(/[֑-ֽֿ֯׀׃-ׇ]/g,"").replace(/־/g," ").split(/\s+/).slice(0,3).join(" "):"";
 return esc(s)+(he?`<span class="he nh">${esc(he)}…</span>`:"")}
function ixTitle(){return CRS.id==="mishnayos"?"Maseches Berachos":ZEDATA[CRS.id]?ZEDATA[CRS.id].t:CRS.chip.t}
function seferIndex(){const {groups,later}=ixGroups(),cur=findCurrent();
 const row=(u,ui)=>{const p=unitProgress(u),n=unitNum(u),isCur=cur&&cur.ui===ui;
  return `<button class="ix-r ${p.done?"done":""} ${isCur?"cur":""}" data-ixu="${ui}"><span class="ix-n">${esc(n.en||String(ui+1))}${n.he?`<span class="he">${n.he}</span>`:""}</span><span class="ix-t"><span class="he">${u.unit.he||""}</span><b>${esc(u.unit.t)}</b></span><span class="ix-s">${p.done?"✓":isCur?"▶":p.d?`${p.d}/${p.n}`:""}</span></button>`};
 const grp=g=>{const us=CRS.units.slice(g.u[0],g.u[1]),d=us.filter(u=>unitProgress(u).done).length,open=cur&&cur.ui>=g.u[0]&&cur.ui<g.u[1];
  const head=g.en?`<summary class="ix-gh"><span class="he">${CRS.id==="chumash"?"פרשת ":""}${g.he}</span><b>${CRS.id==="chumash"?"Parashas ":""}${esc(g.en)}</b><small>${d}/${us.length}${d===us.length?" ✓":""}</small></summary>`:"";
  const rows=us.map((u,j)=>row(u,g.u[0]+j)).join("");return g.en?`<details class="ix-g" ${open||groups.length<=6?"open":""}>${head}${rows}</details>`:`<div class="ix-g">${rows}</div>`};
 const soon=later.length?`<div class="ix-later"><small>Coming later</small>${later.map(it=>`<span><span class="he">${it.he||""}</span> ${esc(it.en||"")}</span>`).join("")}</div>`:"";
 const sefer=CRS.id==="chumash"?`<div class="ix-sefarim">${CH_SEFARIM.map(([he,en],i)=>`<span class="${i?"soon":"on"}"><span class="he">${he}</span>${esc(en)}${i?"<small>Coming later</small>":""}</span>`).join("")}</div>`:"";
 sheet(`<div class="ix"><h3>📑 Index</h3><p class="sub">${esc(ixTitle())} · tap any ${esc(CRS.units[0]?.unitWord||"part")} to go there</p>${sefer}${groups.map(grp).join("")}${soon}</div>`,()=>{
  document.querySelectorAll("[data-ixu]").forEach(b=>b.onclick=()=>{closeSheet();jumpUnit(+b.dataset.ixu)});
  const c=document.querySelector(".ix-r.cur");if(c)setTimeout(()=>c.scrollIntoView({block:"center"}),60)})}
function jumpUnit(ui){if(tab!=="learn"){tab="learn";render()}
 if(!$("#reg"+ui)&&typeof secFor==="function"){secFor(ui);render()}
 setTimeout(()=>{const t=$("#reg"+ui);if(t){t.scrollIntoView({behavior:"smooth",block:"start"});t.classList.add("flash");setTimeout(()=>t.classList.remove("flash"),1600)}},60)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-index]");if(b){e.preventDefault();seferIndex()}});
(()=>{const st=document.createElement("style");st.textContent=`.rc-idx{margin-left:8px;border:2px solid var(--line);background:var(--surface);color:var(--ink);font-weight:800;font-size:12.5px;border-radius:999px;padding:3px 10px;cursor:pointer;flex:none}
.rc-top .rc-pct{margin-left:auto}
.ux-he{display:block;font-family:"Frank Ruhl Libre",serif;font-size:15px;letter-spacing:0;text-transform:none;margin-top:2px;direction:rtl;text-align:left}
.wnode .lbl .nh{display:block;font-family:"Frank Ruhl Libre",serif;font-size:13px;font-weight:700;color:var(--ink);direction:rtl;margin-top:1px}
.ix h3{margin:0}.ix .he{font-family:"Frank Ruhl Libre",serif}
.ix-sefarim{display:flex;gap:6px;overflow-x:auto;padding:6px 0 10px;scrollbar-width:none}.ix-sefarim>span{flex:none;display:flex;flex-direction:column;align-items:center;border:2px solid var(--line);border-radius:14px;padding:6px 10px;font-weight:800;font-size:12px;min-width:74px}
.ix-sefarim>span .he{font-size:18px;font-weight:900}.ix-sefarim .on{border-color:var(--gold,#C9A34A);background:var(--gold-soft,#FFF6DB)}.ix-sefarim .soon{opacity:.5}.ix-sefarim small{font-size:10px;color:var(--muted)}
.ix-g{border:2px solid var(--line);border-radius:16px;margin:8px 0;overflow:hidden;background:var(--surface)}
.ix-gh{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;font-size:15px;list-style:none;background:var(--bg-soft,rgba(0,0,0,.03))}.ix-gh::-webkit-details-marker{display:none}
.ix-gh .he{font-size:19px;font-weight:900}.ix-gh small{margin-left:auto;color:var(--muted);font-weight:800}.ix-gh:after{content:"▾";color:var(--muted);margin-left:6px}details:not([open])>.ix-gh:after{content:"▸"}
.ix-r{display:grid;grid-template-columns:74px 1fr 34px;gap:8px;align-items:center;width:100%;text-align:left;border:0;border-top:1px solid var(--line);background:none;padding:9px 12px;color:var(--ink);cursor:pointer;min-height:48px}
.ix-r:hover{background:rgba(0,0,0,.03)}.ix-r.cur{background:var(--gold-soft,#FFF6DB)}
.ix-n{font-weight:800;font-size:12.5px;color:var(--muted);line-height:1.2}.ix-n .he{display:block;font-size:15px;color:var(--ink)}
.ix-t{min-width:0;line-height:1.25}.ix-t .he{display:block;font-size:16px;font-weight:700;direction:rtl;text-align:left}.ix-t b{font-size:14px}
.ix-s{text-align:right;font-weight:800;color:var(--muted);font-size:13px}.ix-r.done .ix-s{color:var(--green,#3B923C)}
.ix-later{margin:12px 2px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}.ix-later small{width:100%;color:var(--muted);font-weight:800}.ix-later>span{border:1.5px dashed var(--line);border-radius:999px;padding:3px 9px;font-size:12.5px;opacity:.75}`;document.head.appendChild(st)})();
