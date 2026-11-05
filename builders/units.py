import sys,re
S=sys.argv[1];p='/home/claude/limud.html';s=open(p).read()
def between(a,b):
    i=s.index(a);j=s.index(b,i);return s[i:j]
def rep(old,new):
    global s
    assert s.count(old)==1,old[:70];s=s.replace(old,new)
# rebuilt Kitzur data
kz=open(S+'/kitzur.js').read()
old_kz=s[s.index('/* Kitzur Shulchan Aruch, Siman 1'):s.index('/* ================= LESSON CONTENT')]
rep(old_kz,kz+'\n')
# courses -> units
rep(between('const COURSES={','\nconst SUBJECTS'),r'''const COURSES={
 mishnayos:{id:"mishnayos",chip:{b:"מ",t:"Mishnah Berachos",s:"Perek 1 · מאימתי"},fullTitle:"Full mishnah with translation and Bartenura",commHe:"ברטנורא",commToggle:"Bartenura",enLabel:"English and Bartenura",masteryTitle:"Mastery by mishnah",
  next:{s:"Perek 2 · coming soon",t:"Kavanah and interruptions",he:"היה קורא"},
  units:[{key:"m-p1",lessons:M_LESSONS,source:SOURCE,sections:SECTIONS,unit:{s:"Perek 1 · 6 lessons",t:"The times of Kriyas Shema",he:"מאימתי"},
   ref:p=>`Berachos 1:${p+1}`,fullHe:p=>`משנה ברכות א:${HEB[p]}`,partNames:[0,1,2,3,4].map(i=>"משנה "+HEB[i]),revId:"chazara",testId:"siyum",revShort:"Review the perek",testTitle:"Siyum Perek",
   siyumHTML:`<div class="hadran">הדרן עלך<br>פרק מאימתי</div><p class="sub">"We will return to you, Perek Meimasai." You've completed the first perek of Berachos.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek Meimasai",unitWord:"perek"}]},
 halacha:{id:"halacha",chip:{b:"ה",t:"Kitzur Shulchan Aruch",s:"Orach Chaim · in order"},fullTitle:"Full se'if with translation and notes",commHe:"הערה",commToggle:"Notes",enLabel:"English and notes",masteryTitle:"Mastery by se'if",
  next:{s:"Siman 2 · coming soon",t:"Washing hands in the morning",he:"נטילת ידים"},
  units:K_UNITS}
};
const ALLQ={};
Object.values(COURSES).forEach(c=>c.units.forEach(u=>{u.course=c.id;u.nodes=[...u.lessons.map(l=>({id:l.id,kind:"lesson",lesson:l})),{id:u.revId,kind:"review",title:"Chazarah",short:u.revShort},{id:u.testId,kind:"test",title:u.testTitle,short:"Pass at 80% to finish"}];
 u.lessons.forEach(l=>{l.U=u;l.steps.forEach(s=>{if(s.id){s.lesson=l.id;s.course=c.id;s.unit=u.key;ALLQ[s.id]=s}})})}));
let CRS;
function setCourse(id){CRS=COURSES[id]||COURSES.mishnayos}
const courseLessons=()=>CRS.units.flatMap(u=>u.lessons);
''')
rep(between('function mastery(m){','\n'),'function mastery(u,m){const qs=Object.values(ALLQ).filter(q=>q.unit===u.key&&u.lessons.find(l=>l.id===q.lesson).parts.includes(m));if(!qs.length)return 0;const sum=qs.reduce((a,q)=>a+((S.srs[q.id]||{}).box||0),0);return Math.round(sum/(qs.length*5)*100)}')
rep(between('function nodeState(i){','\n\n'),'''function nodeState(u,i){const n=u.nodes[i];if(n.kind==="lesson")return S.lessons[n.id]?.done?"done":(i===0||S.lessons[u.nodes[i-1].id]?.done?"open":"locked");
 const allDone=u.lessons.every(l=>S.lessons[l.id]?.done);if(!allDone)return"locked";
 if(n.kind==="review")return S.lessons[u.revId]?.done?"done":"open";
 return S.lessons[u.testId]?.done?"done":(S.lessons[u.revId]?.done?"open":"locked")}
function findCurrent(){const last=(S.lastUnit||{})[CRS.id];const order=CRS.units.map((u,ui)=>ui).sort((a,b)=>(CRS.units[b].key===last)-(CRS.units[a].key===last));
 for(const ui of order){const u=CRS.units[ui];const i=u.nodes.findIndex((n,k)=>nodeState(u,k)==="open");if(i>=0&&!(i===0&&ui!==order[0]&&!u.lessons.some(l=>S.lessons[l.id]?.done)&&order.length>1&&CRS.units[order[0]].nodes.some((n,k)=>nodeState(CRS.units[order[0]],k)==="open")))return{ui,i}}
 return null}''')
lv=between('function learnView(){','\nfunction capHTML')
new_lv=lv.replace(' const anyDone=LESSONS.some(l=>S.lessons[l.id]?.done);\n let current=NODES.findIndex((n,i)=>nodeState(i)==="open");',' const anyDone=courseLessons().some(l=>S.lessons[l.id]?.done);\n const cur=findCurrent();')
new_lv=new_lv.replace('${heroCard(current,anyDone)}','${heroCard(cur,anyDone)}')
a=new_lv.index(' <section class="unit"><div>');b=new_lv.index(' <section class="unit locked">')
path_block=new_lv[a:b]
path_block=path_block.replace('${CRS.unit.s}','${u.unit.s}').replace('${CRS.unit.t}','${u.unit.t}').replace('${CRS.unit.he}','${u.unit.he}')
path_block=path_block.replace('${NODES.map((n,i)=>{const st=nodeState(i)','${u.nodes.map((n,i)=>{const st=nodeState(u,i),isCur=cur&&cur.ui===ui&&cur.i===i')
path_block=path_block.replace('i===current?"current":""','isCur?"current":""').replace('${i===current?`<span class="start-tag">','${isCur?`<span class="start-tag">').replace('${i===current?ner(','${isCur?ner(')
path_block=path_block.replace('data-node="${i}"','data-node="${ui}:${i}"')
assert 'current' not in path_block.replace('"current"',''),path_block
new_lv=new_lv[:a]+'${CRS.units.map((u,ui)=>`'+path_block.replace('`','\\`').replace('${','\\${').replace('\\${u.','${u.').replace('\\${ui','${ui')+'`).join("")}\n'+new_lv[b:]
s=s.replace(lv,new_lv)
open(S+'/lv_debug.txt','w').write(new_lv)
open(p,'w').write(s)
