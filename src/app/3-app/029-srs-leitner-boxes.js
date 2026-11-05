/* ================= SRS (Leitner boxes) ================= */
const BOX_DAYS=[0,1,3,7,16,35];
function grade(qid,ok){const it=S.srs[qid]||{box:0,due:today()};it.box=ok?Math.min(5,it.box+1):1;it.due=addDays(today(),BOX_DAYS[it.box]);S.srs[qid]=it}
function dueItems(){const t=today();return Object.entries(S.srs).filter(([k,v])=>v.due<=t&&ALLQ[k]&&ALLQ[k].course===CRS.id).sort((a,b)=>a[1].due.localeCompare(b[1].due)).map(([k])=>k)}
function masteryL(u,l){const qs=Object.values(ALLQ).filter(q=>q.lesson===l.id);if(!qs.length)return 0;const sum=qs.reduce((a,q)=>a+((S.srs[q.id]||{}).box||0),0);return Math.round(sum/(qs.length*5)*100)}
function mastery(u,m){const qs=Object.values(ALLQ).filter(q=>q.unit===u.key&&u.lessons.find(l=>l.id===q.lesson).parts.includes(m));if(!qs.length)return 0;const sum=qs.reduce((a,q)=>a+((S.srs[q.id]||{}).box||0),0);return Math.round(sum/(qs.length*5)*100)}

