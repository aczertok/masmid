/* ================= FINISH & REWARDS ================= */
function finish(){if(R.kind==="lesson")ltFinished(R.lesson.title);const acc=R.answered?Math.round(R.correct/R.answered*100):100;const t=today();let xp=0,earned=[];
 const award=id=>{if(!S.badges[id]){S.badges[id]=t;earned.push(BADGES.find(b=>b.id===id).name)}};
 let passed=true;
 if(R.kind==="lesson"){xp=10+R.correct+(R.mistakes===0?5:0);const prev=S.lessons[R.id]||{};const stars=acc>=95?3:acc>=80?2:1;
  S.lessons[R.id]={done:true,acc:Math.max(acc,prev.acc||0),stars:Math.max(stars,prev.stars||0)};award("first");if(R.mistakes===0)award("perfect");
  if(S.lessons.m1a?.done&&S.lessons.m1b?.done)award("mishnah1")}
 else if(R.kind==="review"){xp=5+R.correct;award("chazara");if(R.id)S.lessons[R.id]={done:true,acc};if(S.reviewAns>=101)award("meah")}
 else{passed=acc>=80;xp=passed?20+R.correct:R.correct;if(passed){S.lessons[R.unit.testId]={done:true,acc};award("siyum")}}
 if(R.unit){S.lastUnit=Object.assign({},S.lastUnit,{[CRS.id]:R.unit.key})}
 const before=streakInfo().n;S.xp+=xp;S.daily[t]=(S.daily[t]||0)+xp;if(!S.active.includes(t))S.active.push(t);
 const st=streakInfo();if(st.n>=3)award("streak3");if(st.n>=7)award("streak7");if(st.crossedRest)award("shabbos");bumpCounts(R);evalBadges(award);save();try{socPublish()}catch(e){}
 const goalHit=S.daily[t]>=S.settings.goal&&S.daily[t]-xp<S.settings.goal;
 const siyum=R.kind==="test"&&passed;
 $("#pbar").style.width="100%";
 $("#lbody").innerHTML=`<div class="endwrap">${siyum?`<div class="siyum-art">${scene("siyum")}</div>${R.unit.siyumHTML}`:R.kind==="test"?`${ner("sad")}<h2 style="color:var(--ink)">Almost there</h2><p class="sub">You need 80% to finish the ${R.unit.unitWord}. Review and try again.</p>`:`${ner("cheer")}<h2>${R.kind==="review"?"Chazarah complete!":"Lesson complete!"}</h2>`}
 <div class="tiles3"><div class="et" style="--c:var(--gold)"><div>XP</div><b>+${xp}</b></div><div class="et" style="--c:var(--karti)"><div>Accuracy</div><b>${acc}%</b></div><div class="et" style="--c:var(--gold-deep)"><div>Streak</div><b>${S.settings.streakMode==="week"?weekStreakInfo().n+"w":st.n+(st.n>before?" ↑":"")}</b></div></div>
 ${goalHit?`<p class="sub"><b>Daily goal met.</b></p>`:""}
 ${earned.length?`<p class="sec-h">New badge${earned.length>1?"s":""}</p><div class="newbadges">${earned.map(b=>`<span>${esc(b)}</span>`).join("")}</div>`:""}</div>`;
 const f=$("#lfoot");f.className="lfoot wrap";f.innerHTML=`<button class="btn block ${siyum?"gold":""}" id="fin">Continue</button>`;$("#fin").onclick=closeRun;
 if(R.kind!=="test"||passed)confetti()}

function confetti(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const c=document.createElement("canvas");c.className="confetti";document.body.appendChild(c);const x=c.getContext("2d");const W=c.width=innerWidth*devicePixelRatio,H=c.height=innerHeight*devicePixelRatio;
 const cs=getComputedStyle(document.documentElement),cols=["--gold","--tech","--karti","--rest"].map(v=>cs.getPropertyValue(v).trim());
 const P=Array.from({length:90},()=>({x:W/2,y:H*.35,vx:(Math.random()-.5)*16*devicePixelRatio,vy:(-Math.random()*14-4)*devicePixelRatio,r:(4+Math.random()*5)*devicePixelRatio,c:cols[Math.floor(Math.random()*4)],a:Math.random()*6}));let f=0;
 (function tick(){x.clearRect(0,0,W,H);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.45*devicePixelRatio;p.a+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore()});if(++f<110)requestAnimationFrame(tick);else c.remove()})()}

