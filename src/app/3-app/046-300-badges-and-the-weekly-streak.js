/* ================= 300+ BADGES and the WEEKLY STREAK =================
   Badges come in families with tiers. Each has a test on your stats; new ones are awarded after every lesson. */
function weekStart(d){return addDays(d,-dow(d))}
function weekStreakInfo(){const goal=Math.max(1,+S.settings.weekGoal||3),act=new Set(S.active);
 const days=w=>[0,1,2,3,4,5,6].filter(k=>act.has(addDays(w,k))).length;
 let w=weekStart(today()),n=0,guard=0;const thisWeek=days(w),thisDone=thisWeek>=goal;
 if(thisDone)n++;w=addDays(w,-7);
 while(guard++<600){if(days(w)>=goal){n++;w=addDays(w,-7)}else break}
 return {n,thisWeek,goal,thisDone}}
function streakNow(){if(S.settings.streakMode==="week"){const w=weekStreakInfo();return {n:w.n,unit:"week",label:"Week streak",short:`${w.n}-week streak`,w}}
 const d=streakInfo();return {n:d.n,unit:"day",label:"Day streak",short:`${d.n}-day streak`}}
function bestWeekStreak(){const act=[...new Set(S.active)].sort();if(!act.length)return 0;const goal=Math.max(1,+S.settings.weekGoal||3),cnt={};
 act.forEach(d=>{const w=weekStart(d);cnt[w]=(cnt[w]||0)+1});let best=0,run=0,w=weekStart(act[0]),end=weekStart(today()),g=0;
 while(w<=end&&g++<800){if((cnt[w]||0)>=goal){run++;best=Math.max(best,run)}else if(w!==end)run=0;w=addDays(w,7)}return best}
function badgeCtx(){const per={},done=new Set();let siyum=0,three=0,perfect=0;
 for(const c of Object.values(COURSES)){per[c.id]={d:0,n:0};for(const u of c.units){if(S.lessons[u.testId]?.done){siyum++;done.add(u.key)}
  for(const l of u.lessons){per[c.id].n++;const v=S.lessons[l.id];if(v?.done){per[c.id].d++;if(v.stars>=3)three++}}}}
 const C=S.counts||{},lessons=Object.values(S.lessons).filter(v=>v&&v.done).length;
 let goalDays=0;for(const [d,x] of Object.entries(S.daily||{}))if(x>=S.settings.goal)goalDays++;
 let tn=0;try{tn=town().items.length}catch(e){}
 let av=0;try{const st=avStats();av=avAllItems().filter(x=>reqMet(x.o.req,st)).length}catch(e){}
 return {xp:S.xp,lessons,streak:Math.max(streakInfo().n,S.bestStreak||0),weeks:Math.max(weekStreakInfo().n,bestWeekStreak()),perfect:C.perfect||0,
  days:new Set(S.active).size,reviews:S.reviewAns||0,siyum,per,done,three,goalDays,town:tn,avatar:av,
  early:C.early||0,late:C.late||0,fri:C.fri||0,motzei:C.motzei||0,fivesGiven:C.fivesGiven||0,fivesGot:C.fivesGot||0,friends:C.friendsSeen||0}}
(()=>{const B=BADGES,add=(id,he,name,d,fam,test)=>{if(!B.some(b=>b.id===id))B.push({id,he,name,d,fam,test})};
 const ladder=(fam,key,tiers,he,name,d)=>tiers.forEach((n,i)=>add(`${fam}${n}`,he(n,i),name(n,i),d(n),fam,c=>c[key]>=n));
 const HEBN=n=>{const H=[[400,"ת"],[300,"ש"],[200,"ר"],[100,"ק"],[90,"צ"],[80,"פ"],[70,"ע"],[60,"ס"],[50,"נ"],[40,"מ"],[30,"ל"],[20,"כ"],[10,"י"],[9,"ט"],[8,"ח"],[7,"ז"],[6,"ו"],[5,"ה"],[4,"ד"],[3,"ג"],[2,"ב"],[1,"א"]];if(n>=1000)return (+(n/1000).toFixed(1))+"K";let s="";for(const [v,c] of H)while(n>=v){s+=c;n-=v}return s.replace("יה","טו").replace("יו","טז")};
 const RANKS=["Beginner","Talmid","Student","Learner","Masmid","Ben Torah","Lamdan","Talmid Chacham","Gaon","Rebbi","Rosh Yeshiva","Gadol","Pillar","Ner Tamid","Kesser Torah","Ateres","Chashuv","Nesi","Malach","Shalshelet","Me'or","Shemesh","Kochav","Oz","Hod"];
 ladder("xp","xp",[50,100,200,300,500,750,1000,1500,2000,2500,3000,4000,5000,6500,8000,10000,12500,15000,20000,25000,30000,40000,50000,75000,100000],n=>n>=1000?(+(n/1000).toFixed(1))+"K":String(n),(n,i)=>`${RANKS[i]} · ${n.toLocaleString()} XP`,n=>`Earn ${n.toLocaleString()} XP`);
 ladder("les","lessons",[2,3,5,8,10,15,20,25,30,40,50,60,75,90,100,125,150,175,200,250,300,400,500,750,1000],n=>HEBN(n),n=>`${n} lessons`,n=>`Finish ${n} lessons`);
 ladder("ds","streak",[2,4,5,10,12,14,18,21,25,30,40,50,60,75,90,100,120,150,180,200,250,300,365,500],n=>HEBN(n),n=>`${n}-day streak`,n=>`Learn ${n} days in a row (Shabbos and Yom Tov never break it)`);
 ladder("wk","weeks",[1,2,3,4,6,8,10,12,16,20,26,30,40,52,78,104],n=>n+"w",n=>n===1?"First full week":`${n}-week streak`,n=>`Meet your weekly goal ${n} week${n>1?"s":""} in a row`);
 ladder("pf","perfect",[3,5,10,15,20,30,40,50,75,100,150,200,300,500],n=>"✓"+n,n=>`${n} perfect lessons`,n=>`Finish ${n} lessons with no mistakes`);
 ladder("dy","days",[5,10,18,26,36,50,72,100,150,200,250,300,365,500,613,1000],n=>HEBN(n),n=>n===613?"Taryag days":n===18?"Chai days":`${n} days of learning`,n=>`Learn on ${n} different days`);
 ladder("rv","reviews",[25,50,150,200,300,500,750,1000,1500,2000,3000,5000],n=>n>=1000?(+(n/1000).toFixed(1))+"K":String(n),n=>`${n} chazarah answers`,n=>`Answer ${n} review questions`);
 ladder("sy","siyum",[2,3,4,5,7,10,13,18,25,36,50],n=>HEBN(n),n=>`${n} siyumim`,n=>`Finish ${n} perakim, simanim or sections`);
 ladder("3s","three",[1,5,10,20,35,50,75,100,150,200,300],n=>"★"+n,n=>`${n} three-star lessons`,n=>`Score 95% or more on ${n} lessons`);
 ladder("gl","goalDays",[1,3,7,14,30,50,75,100,150,200,365],n=>"🎯"+n,n=>`Daily goal × ${n}`,n=>`Reach your daily goal on ${n} days`);
 ladder("tw","town",[1,3,5,10,15,20,30,40,50,65,80,100],n=>"🏠"+n,n=>`Builder · ${n}`,n=>`Place ${n} things in your town`);
 ladder("av","avatar",[5,10,20,30,50,75,100,125,150,175,200],n=>String(n),n=>`Wardrobe · ${n}`,n=>`Unlock ${n} avatar extras`);
 ladder("eb","early",[1,5,15,30,60,100],n=>"🌅"+n,n=>`Vasikin · ${n}`,n=>`Learn before 7 in the morning ${n} time${n>1?"s":""}`);
 ladder("no","late",[1,5,15,30,60,100],n=>"🌙"+n,n=>`Night learner · ${n}`,n=>`Learn after 9 at night ${n} time${n>1?"s":""}`);
 ladder("fr","fri",[1,4,10,26,52],n=>"ו"+n,n=>`Erev Shabbos · ${n}`,n=>`Learn on Friday ${n} time${n>1?"s":""}`);
 ladder("ms","motzei",[1,4,10,26,52],n=>"מ"+n,n=>`Motzei Shabbos · ${n}`,n=>`Learn on Motzei Shabbos (Sunday before noon) ${n} time${n>1?"s":""}`);
 ladder("h5g","fivesGiven",[1,5,10,25,50,100,250],n=>"✋"+n,n=>`Encourager · ${n}`,n=>`Give ${n} high five${n>1?"s":""} to other learners`);
 ladder("h5r","fivesGot",[1,5,10,25,50,100,250],n=>"🙌"+n,n=>`Chizuk · ${n}`,n=>`Receive ${n} high five${n>1?"s":""}`);
 /* every unit (perek, parsha section, sugya) and every course */
 const CN={mishnayos:"Mishnah",halacha:"Kitzur",chumash:"Chumash",tanakh:"Nach",gemara:"Gemara"};
 for(const c of Object.values(COURSES)){
  c.units.forEach(u=>add("u-"+u.key,u.unit.he||"✓",u.unit.t,`Finish ${CN[c.id]||c.chip.t}: ${(u.unit.s||"").split(" · ").slice(0,2).join(" · ")}`,"unit",x=>x.done.has(u.key)));
  [5,10,25,50].forEach(n=>add(`c-${c.id}-${n}`,String(n),`${CN[c.id]} · ${n} lessons`,`Finish ${n} ${CN[c.id]} lessons`,"course",x=>(x.per[c.id]||{}).d>=n));
  add(`c-${c.id}-all`,"הדרן",`Hadran: all of ${c.chip.t}`,`Finish every lesson in ${c.chip.t}`,"course",x=>{const p=x.per[c.id]||{};return p.n>0&&p.d>=p.n});
 }
 add("allcourses","כל",`Kol HaTorah`,`Learn at least one lesson in every subject`,"course",x=>Object.values(x.per).every(p=>p.d>0));
})();
const BADGE_FAMS=[["Getting started",b=>!b.fam],["Lessons","les"],["XP","xp"],["Day streaks","ds"],["Week streaks","wk"],["Perfect lessons","pf"],["Three stars","3s"],["Days learned","dy"],["Daily goal","gl"],["Chazarah","rv"],["Siyumim","sy"],["Every perek and section","unit"],["Subjects","course"],["Town","tw"],["Avatar","av"],["Early mornings","eb"],["Late nights","no"],["Erev Shabbos","fr"],["Motzei Shabbos","ms"],["High fives given","h5g"],["High fives received","h5r"]];
function evalBadges(award){let c;try{c=badgeCtx()}catch(e){return}for(const b of BADGES)if(b.test&&!S.badges[b.id]){let ok=false;try{ok=b.test(c)}catch(e){}if(ok)award(b.id)}}
function bumpCounts(R){S.counts=S.counts||{};const C=S.counts,h=new Date().getHours(),d=dow(today());
 if(R.kind==="lesson"&&R.mistakes===0)C.perfect=(C.perfect||0)+1;
 const day=today();C.marks=C.marks||{};const once=k=>{if(C.marks[k]!==day){C.marks[k]=day;C[k]=(C[k]||0)+1}};
 if(h<7)once("early");if(h>=21)once("late");if(d===5)once("fri");if(d===0&&h<12)once("motzei");
 S.bestStreak=Math.max(S.bestStreak||0,streakInfo().n)}
function badgesHTML(){const got=b=>!!S.badges[b.id];
 return BADGE_FAMS.map(([name,f])=>{const list=BADGES.filter(b=>typeof f==="function"?f(b):b.fam===f);if(!list.length)return "";const n=list.filter(got).length;
  return `<details class="bfam" ${n&&n<list.length?"open":""}><summary><b>${esc(name)}</b><span>${n} / ${list.length}</span></summary><div class="badges">${list.map(b=>`<div class="bdg ${got(b)?"":"off"}" title="${esc(b.d)}"><span class="ic">${esc(b.he)}</span>${esc(b.name)}<small>${esc(b.d)}</small></div>`).join("")}</div></details>`}).join("")}
(()=>{const st=document.createElement("style");st.textContent=`.bfam{background:var(--surface);border:2px solid var(--line);border-radius:16px;padding:8px 12px;margin-bottom:8px}.bfam summary{display:flex;justify-content:space-between;align-items:center;cursor:pointer;list-style:none;padding:4px 0}.bfam summary::-webkit-details-marker{display:none}.bfam summary span{font-size:13px;color:var(--muted);font-weight:700}.bfam .badges{margin-top:8px}.bdg .ic{font-size:13px}`;document.head.appendChild(st)})();
