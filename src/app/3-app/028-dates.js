/* ================= DATES ================= */
const pad=n=>String(n).padStart(2,"0");
const ymd=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
function now(){const d=new Date();d.setDate(d.getDate()+(S.dayOffset||0));return d}
function addDays(s,n){const [y,m,d]=s.split("-").map(Number);const x=new Date(y,m-1,d);x.setDate(x.getDate()+n);return ymd(x)}
function dow(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d).getDay()}
const today=()=>ymd(now());
function restKind(s){if(dow(s)===6)return"Shabbos";return(S.settings.il?YT_ISRAEL:YT_DIASPORA).includes(s)?"Yom Tov":null}

function streakInfo(){const act=new Set(S.active);let d=today(),n=0,pending=false,crossed=false,guard=0;
 if(!act.has(d))d=addDays(d,-1);
 // walk back: learned days count; Shabbos/Yom Tov are skipped (never break); any other missed day ends the streak
 while(guard++<3000){if(act.has(d)){n++;if(pending)crossed=true}else if(restKind(d)){if(n>0)pending=true}else break;d=addDays(d,-1)}
 return{n,crossedRest:crossed,learnedToday:act.has(today())}}

function levelOf(xp){let i=0;for(let k=0;k<LEVELS.length;k++)if(xp>=LEVELS[k][0])i=k;const cur=LEVELS[i][0],next=LEVELS[i+1]?LEVELS[i+1][0]:cur+500;return{lv:i+1,name:LEVELS[i][1],cur,next,pct:Math.min(100,(xp-cur)/(next-cur)*100)}}

