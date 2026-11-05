/* ================= KITZUR SHULCHAN ARUCH, SIMANIM 3–221 =================
   Read-and-review format: each se'if is shown line by line (Hebrew with the Metsudah English under it),
   with questions made from the text. The texts load from kitzur-data.js the first time they're needed.
   Simanim 145–162 (marriage, family purity, mikvah) are for Man and Woman profiles only and have no questions. */
const KZ={ready:false,loading:null,kid:null};
const isKid=()=>["boy","girl"].includes(profile&&profile());
const kzHeb=n=>{const o=[[400,'ת'],[300,'ש'],[200,'ר'],[100,'ק'],[90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],[40,'מ'],[30,'ל'],[20,'כ'],[10,'י'],[9,'ט'],[8,'ח'],[7,'ז'],[6,'ו'],[5,'ה'],[4,'ד'],[3,'ג'],[2,'ב'],[1,'א']];let s="";for(const [v,c] of o)while(n>=v){if(n===15||n===16){s+=n===15?"טו":"טז";n=0;break}s+=c;n-=v}return s.length>1?s.slice(0,-1)+"״"+s.slice(-1):s+"׳"};
const KZ_SOURCE={ref:"Kitzur Shulchan Arukh",url:"https://www.sefaria.org/Kitzur_Shulchan_Arukh",he:{title:"Torat Emet 357",license:"Public Domain"},en:{title:"Kitzur Shulchan Aruch, trans. Rabbi Avrohom Davis, Metsudah Pub., 1996",license:"CC-BY",licenseUrl:"https://creativecommons.org/licenses/by/3.0/"}};
KZ_META.forEach(([N,he,en,adult,groups,nq,nse,noen])=>{
 const q=nq.reduce((a,b)=>a+b,0),src=Object.assign({},KZ_SOURCE,{ref:"Kitzur Shulchan Arukh "+N,url:"https://www.sefaria.org/Kitzur_Shulchan_Arukh."+N});
 const lessons=groups.map(([a,b],j)=>({id:`k${N}-${j+1}`,title:en,short:`Siman ${N} · ${a===b?"Se'if "+(a+1):"Se'ifim "+(a+1)+"–"+(b+1)}`,parts:Array.from({length:b-a+1},(_,k)=>a+k),phrases:[],steps:[],noScene:1,kz:{N,a,b,j}}));
 K_UNITS.push({key:"k-s"+N,lessons,source:src,sections:[],lazy:1,kzN:N,adult:!!adult,noen:!!noen,
  unit:{s:`Siman ${N} · ${lessons.length} lesson${lessons.length>1?"s":""}${adult?" · Adults":""}`,t:en,he},
  ref:p=>`Kitzur ${N}:${p+1}`,fullHe:p=>`קיצור שו"ע ${kzHeb(N)}:${kzHeb(p+1)}`,partNames:Array.from({length:nse},(_,i)=>"סעיף "+kzHeb(i+1)),
  revId:q?`k${N}-chazara`:null,testId:q?`k${N}-siyum`:null,revShort:"Review the siman",testTitle:`Siman ${N} test`,
  siyumHTML:`<div class="hadran">סיימת סימן ${kzHeb(N)}</div><p class="sub">You've learned Siman ${N} of the Kitzur Shulchan Aruch: ${en}.</p>`,doneSmall:"Siman complete",doneTitle:`You finished Siman ${N}`,unitWord:"siman"})});
function kzLoad(){if(KZ.ready)return Promise.resolve();if(KZ.loading)return KZ.loading;
 KZ.loading=new Promise((res,rej)=>{if(window.KZ_DATA){kzFill();res();return}
  window.kzLoaded=()=>{try{kzFill()}catch(e){console.error(e)}res()};
  const s=document.createElement("script");s.src="kitzur-data.js";s.async=true;s.onerror=()=>{KZ.loading=null;rej(new Error("load"))};document.head.appendChild(s)});
 return KZ.loading}
function kzTrunc(s,n){s=String(s||"").trim();if(s.length<=n)return s;const c=s.slice(0,n).replace(/\s+\S*$/,"").replace(/[,;:]$/,"");return c+"…"}
function kzFill(){const D=window.KZ_DATA;if(!D)return;KZ.kid=isKid();
 const en=r=>{const s=D[r[0]];if(!s)return "";const c=s.s[r[1]];return c&&c[0][r[2]]?c[0][r[2]][1]:""};
 const hide="[This se'if is learned with a parent or Rav.]";
 for(const u of K_UNITS){if(!u.lazy)continue;const d=D[u.kzN];if(!d)continue;
  /* the full se'if view: every line with its translation, then the Metsudah notes */
  u.sections=d.s.map(([ch,notes,sens])=>ch.map(([h,e],k)=>({he:h,en:(sens&&KZ.kid)?hide:(e||(u.noen?"[An approved English translation of this siman isn't available yet.]":"")),c:k===ch.length-1&&!(sens&&KZ.kid)?notes.map(n=>["",n,""]):[]})));
  u.lessons.forEach(l=>{const {a,b,j}=l.kz,phrases=[],steps=[];
   for(let i=a;i<=b;i++){const [ch,,sens]=d.s[i],from=phrases.length;ch.forEach(([h,e])=>phrases.push([h,(sens&&KZ.kid)?hide:(e||"—")]));
    steps.push({t:"learn",from,to:phrases.length,mref:i,note:i===0?["Ask your Rav","The Kitzur teaches the halacha as it was practiced in its time and place. For how to act, follow your Rav and your family's minhag."]:null})}
   const Q=(d.q[j]||[]).map((q,k)=>{let s;
    if(q.t==="mc")s={t:"mc",q:`What does this mean? «${q.h}…»`,opts:q.r.map(r=>kzTrunc(en(r),q.L)),a:0,ex:`Se'if ${q.r[0][1]+1}: ${kzTrunc(en(q.r[0]),170)}`};
    else if(q.t==="fill")s={t:"fill",q:"Fill in the missing word",before:q.b,after:q.f,opts:q.o,a:0,ex:q.x?kzTrunc(en(q.x),170):""};
    else if(q.t==="match")s={t:"match",q:"Match each halacha to its translation",pairs:q.p.map(([h,r])=>[h,kzTrunc(en(r),46)]),he:true};
    else s={t:"order",q:`Build the opening of Se'if ${q.s+1}`,en:q.x?kzTrunc(en(q.x),90):"",tiles:q.w,decoys:[q.d]};
    s.id=`${l.id}-${k+1}`;s.lesson=l.id;s.course="halacha";s.unit=u.key;ALLQ[s.id]=s;return s});
   const per=Math.ceil(Q.length/steps.length)||0,out=[];steps.forEach((st,i)=>{out.push(st);out.push(...Q.slice(i*per,(i+1)*per))});
   l.phrases=phrases;l.steps=out})}
 KZ.ready=true}
/* load quietly after start-up, so reviews and the map have everything */
setTimeout(()=>{kzLoad().catch(()=>{})},2500);
