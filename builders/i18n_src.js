/* ---- Language: English or Português (Brazil) ----
   The choice is per device (localStorage) and is also kept on the profile.
   Português translates every screen, and the Chumash course (lessons, pesukim, questions).
   Other courses stay in English for now and are marked "em inglês". */
const LANG_KEY="limudpath.lang";
let LANG=(()=>{try{const v=localStorage.getItem(LANG_KEY);if(v==="pt"||v==="en")return v;return /^pt/i.test(navigator.language||"")?"pt":"en"}catch(e){return "en"}})();
document.documentElement.lang=LANG==="pt"?"pt-BR":"en";
const PT_UI=/*PT_UI*/{};
const PT_CH=/*PT_CH*/{};
const PT_COL={"Black":["preto","preta","pretos"],"Navy":["azul-marinho"],"Blue":["azul","azul","azuis"],"Sky blue":["azul-celeste"],"Green":["verde","verde","verdes"],"Leaf green":["verde-folha"],"Burgundy":["bordô"],"Red":["vermelho","vermelha","vermelhos"],"Rose":["rosé"],"Gold":["dourado","dourada","dourados"],"Brown":["marrom","marrom","marrons"],"Tan":["bege"],"Purple":["roxo","roxa","roxos"],"Lilac":["lilás"],"White":["branco","branca","brancos"],"Grey":["cinza"],"Teal":["verde-azulado","verde-azulada","verde-azulados"],"Orange":["laranja"],"Pink":["rosa"],"Plum":["cor de ameixa"],"Olive":["verde-oliva"],"Forest":["verde-floresta"],"Silver":["prateado","prateada","prateados"],"Light gold":["dourado-claro","dourada-clara","dourados-claros"],"Antique gold":["ouro-velho"]};
const PT_ITEM={"kippah":["Kipá",1],"cap":["Boné",0],"tichel":["Tichel",0],"snood":["Snood",0],"beret":["Boina",1],"hat":["Chapéu",0],"headband":["Tiara",1],"hair bow":["Laço",0],"round glasses":["Óculos redondos",2],"square glasses":["Óculos quadrados",2]};
const PT_STATE={locked:"bloqueado",open:"aberto",done:"concluído",current:"atual"};
const PT_FAM={"Siyum":"Siyum"};
const _trCache=new Map();
const _num=/\d[\d,.]*/g;
function _tpl(s){const nums=[];const t=s.replace(_num,m=>{nums.push(m);return "#"});return [t,nums]}
function _fill(t,nums){let i=0;return t.replace(/#/g,()=>nums[i++]??"#")}
function _ptNum(n){return /^\d{1,3}(,\d{3})+$/.test(n)?n.replace(/,/g,"."):n}
function _look(s){
 if(PT_UI[s]!==undefined)return PT_UI[s];if(PT_CH[s]!==undefined)return PT_CH[s];
 const [t,nums]=_tpl(s);if(nums.length){const v=PT_UI[t]!==undefined?PT_UI[t]:PT_CH[t];if(v!==undefined)return _fill(v,nums.map(_ptNum))}
 return null}
function T(s){
 if(LANG!=="pt"||typeof s!=="string")return s;
 if(_trCache.has(s))return _trCache.get(s);
 const r=_tr(s);_trCache.set(s,r);return r}
function _tr(s){
 const m0=s.match(/^(\s*)([\s\S]*?)(\s*)$/);const lead=m0[1],core=m0[2],trail=m0[3];
 if(!core||!/[A-Za-z]{2}/.test(core))return s;
 let v=_look(core);if(v!==null)return lead+v+trail;
 let m;
 if(m=core.match(/^(.+) — (locked|open|done|current)$/))return lead+T(m[1])+" — "+PT_STATE[m[2]]+trail;
 if(m=core.match(/^([^\sA-Za-z0-9"“'(\[]+)\s*(.+)$/u)){const r=T(m[2]);if(r!==m[2])return lead+m[1]+" "+r+trail}
 if(m=core.match(/^(.+?)\s*(:|→|…)$/)){const r=T(m[1]);if(r!==m[1])return lead+r+(m[2]===":"?":":" "+m[2])+trail}
 if(m=core.match(/^(.+?) (round glasses|square glasses|hair bow|kippah|cap|tichel|snood|beret|hat|headband)$/)){const c=PT_COL[m[1]],it=PT_ITEM[m[2]];if(c&&it)return lead+it[0]+" "+(c[it[1]]||c[0])+trail}
 if(m=core.match(/^(\d[\d,.]*) of (\d[\d,.]*) steps · (.+)$/))return lead+m[1]+" de "+m[2]+" passos · "+T(m[3])+trail;
 if(core.includes(" · ")){const parts=core.split(" · ");const out=parts.map(p=>T(p));if(out.some((p,i)=>p!==parts[i]))return lead+out.join(" · ")+trail}
 if(m=core.match(/^Finish Chumash: (.+)$/))return lead+"Termine o Chumash: "+T(m[1])+trail;
 if(m=core.match(/^Learning now · (.+)$/))return lead+"Estudando agora · "+T(m[1])+trail;
 if(m=core.match(/^Open the map · (.+)$/))return lead+"Abrir o mapa · "+T(m[1])+trail;
 if(m=core.match(/^See (.+)'s town$/))return lead+"Ver a cidade de "+m[1]+trail;
 if(m=core.match(/^(.+)'s town$/))return lead+"A cidade de "+m[1]+trail;
 if(m=core.match(/^(.+)'s Town$/))return lead+"A cidade de "+m[1]+trail;
 if(m=core.match(/^You and (.+)$/))return lead+"Você e "+m[1]+trail;
 if(m=core.match(/^Now learning as (.+)$/))return lead+"Agora estudando como "+m[1]+trail;
 if(m=core.match(/^(.+) test$/)){const r=T(m[1]);if(r!==m[1])return lead+"Teste: "+r+trail}
 if(m=core.match(/^Siyum Parashas (.+)$/))return lead+"Siyum da Parashas "+m[1]+trail;
 if(m=core.match(/^(Man|Woman|Boy|Girl) · (.+)$/))return lead+T(m[1])+" · "+T(m[2])+trail;
 return s}
/* translate a rendered subtree */
const _SKIP=new Set(["SCRIPT","STYLE","TEXTAREA","INPUT","CODE"]);
const _heOnly=/^[\s֐-׿\d.,:;!?'"״׳()\[\]–—\-·]*$/;
function _trText(n){const p=n.parentNode;if(!p||_SKIP.has(p.nodeName)||p.closest&&p.closest("[data-notr],.he,.prompt-he"))return;const v=n.nodeValue;if(!v||_heOnly.test(v))return;const r=T(v);if(r!==v)n.nodeValue=r}
function _trEl(el){if(!el.getAttribute)return;for(const a of ["placeholder","aria-label","title"]){const v=el.getAttribute(a);if(v){const r=T(v);if(r!==v)el.setAttribute(a,r)}}}
function trDom(root){if(LANG!=="pt"||!root)return;if(root.nodeType===3){_trText(root);return}if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
 if(root.nodeType===1){if(_SKIP.has(root.nodeName)&&root.nodeName!=="INPUT"&&root.nodeName!=="TEXTAREA")return;_trEl(root)}
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;while(n=w.nextNode()){if(n.nodeType===3)_trText(n);else _trEl(n)}}
let _trObs=null;
function startTr(){if(LANG!=="pt"||_trObs)return;const go=()=>{trDom(document.body);_trObs=new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")_trText(m.target);else if(m.type==="attributes")_trEl(m.target);else m.addedNodes.forEach(trDom)}});
 _trObs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","title"]});document.title=T(document.title)};
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go)}
/* dialogs and toasts */
(()=>{if(LANG!=="pt")return;const c=window.confirm,a=window.alert,p=window.prompt;window.confirm=m=>c.call(window,T(m));window.alert=m=>a.call(window,T(m));window.prompt=(m,d)=>p.call(window,T(m),d)})();
/* the Chumash course itself, swapped at the data level */
function ptCourse(){if(LANG!=="pt"||typeof COURSES==="undefined"||!COURSES.chumash)return;const seen=new Set();
 const tx=s=>{if(typeof s!=="string")return s;const k=s.trim();return PT_CH[k]!==undefined?PT_CH[k]:(PT_UI[k]!==undefined?PT_UI[k]:s)};
 const walk=o=>{if(!o||typeof o!=="object"||seen.has(o))return;seen.add(o);
  if(Array.isArray(o)){for(let i=0;i<o.length;i++){if(typeof o[i]==="string")o[i]=tx(o[i]);else walk(o[i])}return}
  for(const k of Object.keys(o)){if(k==="U"||k==="he"||k==="id"||k==="tiles"||k==="decoys"||k==="before"||k==="after"||k==="scene")continue;if(typeof o[k]==="string")o[k]=tx(o[k]);else walk(o[k])}};
 for(const u of COURSES.chumash.units){walk(u.lessons);(u.sections||[]).forEach(sec=>(Array.isArray(sec)?sec:sec.rows||[]).forEach(r=>{if(r&&typeof r.en==="string")r.en=tx(r.en)}))}}
function setLang(l){if(l!==LANG){try{localStorage.setItem(LANG_KEY,l)}catch(e){}try{if(typeof S!=="undefined"&&S&&S.settings){S.settings.lang=l;save()}}catch(e){}setTimeout(()=>location.reload(),150)}}
function langPick(id){return `<div class="langpick" role="group" aria-label="Language / Idioma" data-notr><button type="button" data-lang="en" aria-pressed="${LANG==="en"}">English</button><button type="button" data-lang="pt" aria-pressed="${LANG==="pt"}">Português</button></div>`}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-lang]");if(b){e.preventDefault();setLang(b.dataset.lang)}},true);
(()=>{const st=document.createElement("style");st.textContent=`.langpick{display:inline-flex;gap:0;border:2px solid var(--line,#D8DFEA);border-radius:999px;overflow:hidden;background:var(--card,#fff)}
.langpick button{border:0;background:transparent;color:var(--ink,#16213A);font:700 14px/1 inherit;font-family:inherit;padding:9px 14px;cursor:pointer;min-height:36px}
.langpick button[aria-pressed="true"]{background:var(--blue,#2457A6);color:#fff}
.langtop{display:flex;justify-content:center;margin:2px 0 10px}.enonly{display:inline-block;font-size:11px;font-weight:700;padding:2px 7px;border-radius:999px;background:var(--line,#E3E6EC);color:var(--muted,#5A6680);vertical-align:2px;margin-left:4px}`;document.head.appendChild(st)})();
startTr();
