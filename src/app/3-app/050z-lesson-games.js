/* ================= GAMES, SOUNDS AND COMBOS =================
   - Sounds and a little vibration for right and wrong answers (Settings → Sounds turns them off).
   - A combo meter: answer several in a row right the first time for bonus XP.
   - Three review games built from lessons you've finished: Memory match, Word bubbles, Pasuk race.
   Nothing here changes lesson ids or saved progress; game XP is capped each day. */

/* ---- sounds (made in the browser, no files) ---- */
const SFX={ctx:null};
const soundOn=()=>S.settings.sound!==false;
function sfx(name,level){if(!soundOn())return;try{
 const A=SFX.ctx||(SFX.ctx=new (window.AudioContext||window.webkitAudioContext)());if(A.state==="suspended")A.resume();
 const t0=A.currentTime;
 const tone=(f,at,dur,type,vol,slide)=>{const o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t0+at);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t0+at+dur);
  g.gain.setValueAtTime(0,t0+at);g.gain.linearRampToValueAtTime(vol||.18,t0+at+.015);g.gain.exponentialRampToValueAtTime(.0008,t0+at+dur);o.connect(g).connect(A.destination);o.start(t0+at);o.stop(t0+at+dur+.02)};
 if(name==="right"){tone(784,0,.12,"triangle",.2);tone(1175,.09,.22,"triangle",.2)}
 else if(name==="wrong"){tone(260,0,.22,"sine",.16,170)}
 else if(name==="combo"){const base=[523,659,784,1047,1319];const n=Math.min(5,2+(level||0));for(let i=0;i<n;i++)tone(base[i],i*.07,.16,"square",.07)}
 else if(name==="finish"){[523,659,784,1047].forEach((f,i)=>tone(f,i*.12,i===3?.5:.16,"triangle",.2))}
 else if(name==="pop"){tone(900,0,.08,"sine",.18,1500)}
 else if(name==="flip"){tone(420,0,.05,"square",.06)}
 else if(name==="tick"){tone(1200,0,.03,"square",.04)}
}catch(e){}}
function buzz(p){if(!soundOn())return;try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}

/* ---- combo meter inside lessons, reviews and tests ---- */
const _gRunSteps=runSteps,_gResolve=resolve,_gFinish=finish;
runSteps=function(run){_gRunSteps(run);R.combo=0;R.comboBest=0;R.comboBonus=0;
 const sc=$("#lscore");if(sc&&!$("#lsound")){const b=document.createElement("button");b.className="iconbtn lsound";b.id="lsound";b.setAttribute("aria-label",soundOn()?"Sound on":"Sound off");b.textContent=soundOn()?"🔊":"🔇";
  b.onclick=()=>{S.settings.sound=!soundOn();save();b.textContent=soundOn()?"🔊":"🔇";b.setAttribute("aria-label",soundOn()?"Sound on":"Sound off");if(soundOn())sfx("tick")};sc.parentNode.insertBefore(b,sc)}
 const c=document.createElement("span");c.className="lcombo";c.id="lcombo";c.hidden=true;if(sc)sc.parentNode.insertBefore(c,sc)};
resolve=function(s,ok,isMatch){const first=R&&!R.firstTry.hasOwnProperty(s.id);_gResolve(s,ok,isMatch);if(!R)return;
 if(first){if(ok){R.combo++;R.comboBest=Math.max(R.comboBest,R.combo);if(R.combo>=3)R.comboBonus+=Math.min(5,R.combo-2)}else R.combo=0}
 const c=$("#lcombo");if(c){c.hidden=R.combo<2;c.textContent="🔥 ×"+R.combo;c.classList.remove("pump");void c.offsetWidth;if(R.combo>=2)c.classList.add("pump")}
 if(ok&&first&&R.combo>=3&&R.combo%2===1){sfx("combo",R.combo-3);buzz([12,30,12]);comboBurst(R.combo)}
 else if(ok){sfx("right");buzz(12)}else{sfx("wrong");buzz([25,40,25])}};
function comboBurst(n){const b=document.createElement("div");b.className="comboburst";b.innerHTML=`<b>${n} in a row!</b><small>Combo bonus</small>`;const ov=$("#ov");if(!ov)return;ov.appendChild(b);setTimeout(()=>b.remove(),1300)}
finish=function(){const bonus=(R&&R.comboBonus)||0,best=(R&&R.comboBest)||0;_gFinish();
 const t=today();if(bonus){S.xp+=bonus;S.daily[t]=(S.daily[t]||0)+bonus;save();const tile=document.querySelector(".tiles3 .et b");if(tile){const m=tile.textContent.match(/\d+/);if(m)tile.textContent="+"+(+m[0]+bonus)}}
 const w=document.querySelector(".endwrap");if(w&&best>=3){const p=document.createElement("p");p.className="sub combo-line";p.innerHTML=`🔥 Best combo: <b>${best} in a row</b>${bonus?` · +${bonus} bonus XP`:""}`;w.appendChild(p)}
 sfx("finish");
 const f=$("#lfoot");if(f&&gamePool().ok){const g=document.createElement("button");g.className="btn ghost block";g.id="finGame";g.textContent="🎮 Play a game with what you learned";g.style.marginTop="8px";g.onclick=()=>{closeRun();gamesSheet()};f.appendChild(g)}};

/* ---- what the games are made of: lessons you've already finished ---- */
function gamePool(){const out={pairs:[],mpairs:[],orders:[],ok:false};if(!CRS)return out;const seen=new Set();
 const add=(h,e)=>{const hh=String(h||"").replace(/[\u0591-\u05AF\u05BD\u05BF\u05C0\u05C3-\u05C7]/g,"").replace(/[׃:]\s*$/,"").trim(),ee=String(e||"").replace(/\[[^\]]*\]/g,"").replace(/\s+/g," ").trim();
  if(!hh||!ee||seen.has(hh)||/learned with a|^—$/.test(ee))return;seen.add(hh);
  if(hh.length<=64&&ee.length<=90)out.mpairs.push([hh,ee]);if(hh.length<=34&&ee.length<=60)out.pairs.push([hh,ee])};
 const L=CRS.units.flatMap(u=>u.lessons).filter(l=>S.lessons[l.id]?.done&&l.steps&&l.steps.length);
 for(const l of L){
  l.steps.forEach(s=>{if(s.t==="match"&&s.pairs&&s.he!==false)s.pairs.forEach(([a,b])=>add(a,b));
   if(s.t==="order"&&s.tiles&&s.tiles.length>=3&&s.tiles.length<=7)out.orders.push(s)});
  (l.phrases||[]).forEach(([h,e])=>add(h,e))}
 out.ok=out.mpairs.length>=4||out.orders.length>=3;return out}
const GAMES=[{id:"memory",icon:"🧠",name:"Memory match",desc:"Flip the cards and match each Hebrew phrase to its meaning.",need:p=>p.mpairs.length>=4},
 {id:"bubbles",icon:"🫧",name:"Word bubbles",desc:"Pop the bubble with the right Hebrew before it floats away.",need:p=>p.mpairs.length>=4},
 {id:"race",icon:"🏁",name:"Pasuk race",desc:"Put the words in order as fast as you can.",need:p=>p.orders.length>=3}];
function gameXP(score){const t=today();S.gameXP=S.gameXP||{};const used=S.gameXP[t]||0,cap=30,xp=Math.max(0,Math.min(cap-used,Math.round(score/10)));
 if(xp){S.gameXP[t]=used+xp;S.xp+=xp;S.daily[t]=(S.daily[t]||0)+xp;if(!S.active.includes(t))S.active.push(t)}save();return {xp,capped:used+xp>=cap}}
function gamesSheet(){const P=gamePool();
 sheet(`<h3>🎮 Games</h3><p class="sub">Play with what you've learned in ${esc(CRS.chip.t)}. Games give up to 30 XP a day.</p>
  ${P.ok?`<div class="glist">${GAMES.map(g=>{const can=g.need(P);return `<button class="gpick" data-game="${g.id}" ${can?"":"disabled"}><span class="gpick-i">${g.icon}</span><span><b>${esc(g.name)}</b><small>${can?esc(g.desc):"Finish a few more lessons to unlock this game."}</small></span></button>`}).join("")}</div>`
  :`<p class="mc-soon">Finish a lesson or two first, and the games will use what you learned.</p>`}`,()=>{
  document.querySelectorAll("[data-game]").forEach(b=>b.onclick=()=>{closeSheet();playGame(b.dataset.game)})})}
/* ---- a game screen, sharing the lesson overlay look ---- */
function gameShell(title){const l=$("#layer");l.innerHTML=`<div class="overlay" id="ov"><div class="inner"><div class="lhead wrap"><button class="iconbtn" id="gquit" aria-label="Close the game">${I.x}</button><div class="gtitle"><b>${esc(title)}</b></div><span class="gtimer" id="gtimer"></span><span class="lscore" id="gscore">0</span></div><div class="lbody wrap" id="gbody"></div><div class="lfoot wrap" id="gfoot"></div></div></div>`;
 document.body.style.overflow="hidden";const G={alive:true,score:0,timers:[]};$("#gquit").onclick=()=>gameEnd(G,true);return G}
function gameEnd(G,quit){G.alive=false;G.timers.forEach(clearInterval);G.timers.forEach(clearTimeout);
 if(quit){$("#layer").innerHTML="";document.body.style.overflow="";render();return}
 const r=gameXP(G.score);sfx("finish");if(G.score>0)confetti();
 $("#gbody").innerHTML=`<div class="endwrap">${typeof nerButton==="function"?nerButton("finish","cheer"):""}<h2>${esc(G.doneTitle||"Great game!")}</h2>
  <div class="tiles3"><div class="et" style="--c:var(--gold)"><div>Score</div><b>${G.score}</b></div><div class="et" style="--c:var(--karti)"><div>XP</div><b>+${r.xp}</b></div><div class="et" style="--c:var(--gold-deep)"><div>${esc(G.statLabel||"Best")}</div><b>${esc(String(G.stat||"—"))}</b></div></div>
  ${r.capped?`<p class="sub">That's today's game XP. Learning a new lesson earns more!</p>`:""}</div>`;
 $("#gtimer").textContent="";$("#gfoot").innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn ghost" id="gagain">Play again</button><button class="btn" id="gdone">Done</button></div>`;
 $("#gagain").onclick=()=>playGame(G.id);$("#gdone").onclick=()=>{$("#layer").innerHTML="";document.body.style.overflow="";render()}}
function setScore(G,n){G.score=Math.max(0,n);const s=$("#gscore");if(s){s.textContent=G.score;s.classList.remove("pump");void s.offsetWidth;s.classList.add("pump")}}
function countdown(G,secs,onEnd){let left=secs;const el=$("#gtimer");el.textContent="⏱ "+left;const iv=setInterval(()=>{if(!G.alive)return clearInterval(iv);left--;el.textContent="⏱ "+left;if(left<=5&&left>0)sfx("tick");if(left<=0){clearInterval(iv);onEnd()}},1000);G.timers.push(iv)}
function playGame(id){const P=gamePool();const g=GAMES.find(x=>x.id===id);if(!g||!g.need(P)){toast("Finish a few more lessons to unlock this game.");return}
 if(id==="memory")memoryGame(P);else if(id==="bubbles")bubbleGame(P);else raceGame(P)}

/* 1. Memory match: 6 pairs, flip two at a time */
function memoryGame(P){const G=gameShell("Memory match");G.id="memory";const pairs=shuffle((P.pairs.length>=6?P.pairs:P.mpairs).slice()).slice(0,6);if(pairs.length<6)$("#layer").classList.add("mem-small");let moves=0,open=[],found=0,lock=false;const t0=Date.now();
 const cards=shuffle(pairs.flatMap(([h,e],i)=>[{i,he:1,t:h},{i,he:0,t:e}]));
 $("#gbody").innerHTML=`<p class="sub">Match each Hebrew phrase to its meaning.</p><div class="mem">${cards.map((c,k)=>`<button class="memc" data-k="${k}" aria-label="Card ${k+1}"><span class="memf">?</span><span class="memb ${c.he?"he":""}">${esc(c.t)}</span></button>`).join("")}</div>`;
 $("#gfoot").innerHTML=`<p class="small" style="text-align:center" id="gmoves">Moves: 0</p>`;
 document.querySelectorAll(".memc").forEach(b=>b.onclick=()=>{if(lock||b.classList.contains("up")||b.classList.contains("got"))return;sfx("flip");b.classList.add("up");open.push(b);
  if(open.length===2){moves++;$("#gmoves").textContent="Moves: "+moves;const [a,c]=open.map(x=>cards[+x.dataset.k]);
   if(a.i===c.i&&a.he!==c.he){open.forEach(x=>x.classList.add("got"));open=[];found++;sfx("right");buzz(12);setScore(G,G.score+20);
    if(found===pairs.length){const secs=Math.round((Date.now()-t0)/1000);setScore(G,G.score+Math.max(0,60-Math.max(0,moves-6)*5)+Math.max(0,60-secs));G.doneTitle="All matched!";G.statLabel="Moves";G.stat=moves;setTimeout(()=>gameEnd(G),700)}}
   else{lock=true;sfx("wrong");setTimeout(()=>{open.forEach(x=>x.classList.remove("up"));open=[];lock=false},850)}}})}

/* 2. Word bubbles: tap the Hebrew that means the English word shown; 45 seconds */
function bubbleGame(P){const G=gameShell("Word bubbles");G.id="bubbles";let streak=0,best=0;
 $("#gbody").innerHTML=`<div class="bub-q"><small>Pop the Hebrew for</small><b id="bq"></b></div><div class="bub-sky" id="bsky"></div>`;
 $("#gfoot").innerHTML=`<p class="small" style="text-align:center">Tap the right bubble before it floats away</p>`;
 const src=P.pairs.length>=4?P.pairs:P.mpairs,long=src!==P.pairs;
 const round=()=>{if(!G.alive)return;const sky=$("#bsky");if(!sky)return;sky.classList.toggle("long",long);const pick=shuffle(src.slice()).slice(0,long?3:4),ans=pick[0];$("#bq").textContent=ans[1];
  sky.innerHTML="";shuffle(pick.slice()).forEach((p,k)=>{const b=document.createElement("button");b.className="bub he";b.textContent=p[0];b.style.left=long?(3+k*32)+"%":(6+k*23)+"%";b.style.animationDuration=(6+Math.random()*2.5)+"s";b.style.animationDelay=(k*.25)+"s";
   b.onclick=()=>{if(!G.alive||b.classList.contains("popped"))return;if(p===ans){b.classList.add("popped");sfx("pop");buzz(10);streak++;best=Math.max(best,streak);setScore(G,G.score+10+Math.min(10,streak*2));setTimeout(round,350)}
    else{b.classList.add("miss");sfx("wrong");buzz([20,30,20]);streak=0;setScore(G,G.score-3)}};
   b.addEventListener("animationend",()=>{if(p===ans&&G.alive&&!b.classList.contains("popped")){streak=0;round()}});sky.appendChild(b)})};
 round();countdown(G,45,()=>{G.doneTitle="Time's up!";G.statLabel="Best streak";G.stat=best;gameEnd(G)})}

/* 3. Pasuk race: build as many phrases in order as you can in 60 seconds */
function raceGame(P){const G=gameShell("Pasuk race");G.id="race";let solved=0;const items=shuffle(P.orders.slice());let qi=0;
 const next=()=>{if(!G.alive)return;const s=items[qi++%items.length];let ans=[];const tiles=shuffle([...s.tiles,...(s.decoys||[])].map((w,k)=>({w,k})));
  const draw=()=>{$("#gbody").innerHTML=`<p class="sub">${esc(s.en||s.q||"Put the words in order")}</p><div class="answer he" id="rans">${ans.map(k=>`<button class="tile" data-a="${k}">${esc(tiles[k].w)}</button>`).join("")||'<span class="small">Tap the words in order</span>'}</div><div class="bank he">${tiles.map((t,k)=>`<button class="tile" data-t="${k}" ${ans.includes(k)?"disabled":""}>${esc(t.w)}</button>`).join("")}</div>`;
   document.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{ans.push(+b.dataset.t);sfx("tick");
    if(ans.length===s.tiles.length){const ok=ans.map(k=>tiles[k].w).join("|")===s.tiles.join("|");if(ok){solved++;sfx("right");buzz(12);setScore(G,G.score+15+s.tiles.length*2);$("#rans").classList.add("good");setTimeout(next,450);return}else{sfx("wrong");buzz([20,30,20]);$("#rans")&&$("#rans").classList.add("shake");setTimeout(()=>{ans=[];draw()},450);return}}draw()});
   document.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{ans=ans.filter(k=>k!==+b.dataset.a);draw()})};draw()};
 $("#gfoot").innerHTML=`<button class="btn ghost block" id="rskip">Skip this one</button>`;$("#rskip").onclick=()=>next();
 next();countdown(G,60,()=>{G.doneTitle="Race over!";G.statLabel="Built";G.stat=solved;gameEnd(G)})}

/* ---- bigger, friendlier text for Boy and Girl profiles ---- */
const _gRender=render;render=function(){_gRender.apply(this,arguments);try{document.body.classList.toggle("kidmode",typeof isKid==="function"&&isKid())}catch(e){}};

(()=>{const st=document.createElement("style");st.textContent=`.lsound{width:34px;height:34px;font-size:16px;padding:0;flex:none}
.lcombo{flex:none;font-weight:900;font-size:14px;color:#D9480F;background:#FFF1E6;border:2px solid #FFC9A3;border-radius:999px;padding:3px 9px}
.lcombo.pump,.lscore.pump{animation:gpump .35s ease-out}@keyframes gpump{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}
.comboburst{position:absolute;left:50%;top:32%;transform:translate(-50%,-50%);z-index:30;text-align:center;background:linear-gradient(135deg,#FF922B,#F03E3E);color:#fff;padding:14px 22px;border-radius:22px;box-shadow:0 10px 30px rgba(240,62,62,.4);animation:gburst 1.3s ease-out forwards;pointer-events:none}
.comboburst b{display:block;font-size:24px}.comboburst small{font-weight:800;opacity:.9}
@keyframes gburst{0%{opacity:0;transform:translate(-50%,-30%) scale(.6)}15%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}70%{opacity:1}100%{opacity:0;transform:translate(-50%,-80%) scale(1)}}
.combo-line{margin-top:6px}
.glist{display:grid;gap:10px;margin-top:10px}.gpick{display:flex;gap:12px;align-items:center;text-align:left;border:2px solid var(--line);border-bottom-width:4px;border-radius:18px;background:var(--surface);color:var(--ink);padding:12px;cursor:pointer;font:inherit}
.gpick:disabled{opacity:.5;cursor:default}.gpick-i{font-size:34px}.gpick b{display:block;font-size:16px}.gpick small{color:var(--muted)}
.gtitle{flex:1;text-align:center;font-size:16px}.gtimer{font-weight:900;min-width:52px;text-align:right}
.mem{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}
.memc{position:relative;min-height:96px;border:0;background:none;padding:0;perspective:600px;cursor:pointer;font:inherit}
.memf,.memb{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:14px;padding:6px;backface-visibility:hidden;transition:transform .35s;font-weight:800;text-align:center;line-height:1.25}
.memf{background:linear-gradient(135deg,var(--tech),#5C7CFA);color:#fff;font-size:28px}
.memb{background:var(--surface);border:2px solid var(--line);color:var(--ink);transform:rotateY(180deg);font-size:12px;overflow:hidden}.memb.he{font-family:"Frank Ruhl Libre",serif;font-size:17px;direction:rtl}
.memc.up .memf,.memc.got .memf{transform:rotateY(180deg)}.memc.up .memb,.memc.got .memb{transform:rotateY(0)}.memc.got .memb{border-color:var(--karti);background:#EBFBEE}
.bub-q{text-align:center;margin:6px 0 4px}.bub-q small{display:block;color:var(--muted);font-weight:700}.bub-q b{font-size:20px}
.bub-sky{position:relative;height:min(58vh,440px);border-radius:20px;background:linear-gradient(#E7F5FF,#D0EBFF);overflow:hidden;margin-top:8px}
.bub{position:absolute;bottom:-90px;width:22%;min-width:76px;aspect-ratio:1;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:radial-gradient(circle at 30% 30%,#fff,#A5D8FF 45%,#74C0FC);color:#0B3A6B;font-family:"Frank Ruhl Libre",serif;font-weight:900;font-size:17px;padding:6px;cursor:pointer;box-shadow:0 6px 16px rgba(34,139,230,.25);animation:bubup 7s linear forwards}
.bub.popped{animation:bubpop .3s ease-out forwards}.bub.miss{animation:bubmiss .4s ease-out;background:radial-gradient(circle at 30% 30%,#fff,#FFC9C9 45%,#FF8787)}
@keyframes bubup{0%{transform:translateY(0)}100%{transform:translateY(calc(-1 * min(58vh,440px) - 120px))}}
.bub-sky.long .bub{width:31%;min-width:0;aspect-ratio:auto;min-height:96px;border-radius:28px;font-size:15px;line-height:1.3}
@keyframes bubpop{to{transform:scale(1.6);opacity:0}}@keyframes bubmiss{0%,100%{margin-left:0}25%{margin-left:-6px}75%{margin-left:6px}}
#rans.good{border-color:var(--karti);background:#EBFBEE}#rans.shake{animation:bubmiss .4s}
body.kidmode .ph .he{font-size:26px}body.kidmode .qtext{font-size:22px}body.kidmode .opt{font-size:17px}body.kidmode .phrases.line .ph .gl{font-size:16px}
@media (prefers-reduced-motion:reduce){.bub{animation-duration:12s!important}.memf,.memb{transition:none}}`;document.head.appendChild(st)})();

/* Portuguese for everything above */
if(typeof PT_UI!=="undefined")Object.assign(PT_UI,{"🎮 Games":"🎮 Jogos","Games":"Jogos","Play with what you learned":"Jogue com o que você aprendeu","🎮 Play a game with what you learned":"🎮 Jogue com o que você aprendeu",
 "Memory match":"Jogo da memória","Word bubbles":"Bolhas de palavras","Pasuk race":"Corrida do pasuk",
 "Flip the cards and match each Hebrew phrase to its meaning.":"Vire as cartas e ligue cada frase em hebraico ao seu significado.","Pop the bubble with the right Hebrew before it floats away.":"Estoure a bolha com o hebraico certo antes que ela suba.","Put the words in order as fast as you can.":"Coloque as palavras em ordem o mais rápido que puder.",
 "Finish a few more lessons to unlock this game.":"Termine mais algumas lições para liberar este jogo.","Finish a lesson or two first, and the games will use what you learned.":"Termine uma ou duas lições primeiro, e os jogos vão usar o que você aprendeu.",
 "Match each Hebrew phrase to its meaning.":"Ligue cada frase em hebraico ao seu significado.","Pop the Hebrew for":"Estoure o hebraico de","Tap the right bubble before it floats away":"Toque na bolha certa antes que ela suba",
 "Tap the words in order":"Toque nas palavras em ordem","Skip this one":"Pular esta","Play again":"Jogar de novo","Done":"Pronto","Score":"Pontos","Moves":"Jogadas","Best streak":"Melhor sequência","Built":"Montadas",
 "All matched!":"Tudo combinado!","Time's up!":"Acabou o tempo!","Race over!":"Fim da corrida!","Great game!":"Ótimo jogo!","That's today's game XP. Learning a new lesson earns more!":"Esse é o XP de jogos de hoje. Estudar uma lição nova dá mais!",
 "Combo bonus":"Bônus de sequência","Moves: #":"Jogadas: #","# in a row!":"# seguidas!","Sounds (and a little buzz) for right and wrong answers":"Sons (e uma vibração leve) para respostas certas e erradas","Sound on":"Som ligado","Sound off":"Som desligado","Sounds":"Sons","Close the game":"Fechar o jogo"});
/* the Sounds switch in Settings */
document.addEventListener("change",e=>{if(e.target&&e.target.id==="ssound"){S.settings.sound=e.target.checked;save();if(e.target.checked)sfx("right")}});
