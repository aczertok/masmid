/* Ner: optional, accessible character interactions. No learner records or IDs are changed. */
const NER_LINES = {
 home: [
  ["cheer","Yasher koach! Every little step counts."],
  ["think","Ready for a little Torah challenge?"],
  ["happy","You and I make a great learning team!"],
  ["cheer","Let's make today's learning shine!"],
  ["happy","A few minutes of learning can go a long way!"]
 ],
 feedback: [
  ["cheer","Nice effort! Keep going!"],
  ["happy","Every answer helps you grow."],
  ["think","Take your time. You've got this!"],
  ["cheer","I'm cheering you on!"]
 ],
 finish: [
  ["cheer","You did it! Yasher koach!"],
  ["happy","Look how much you've learned!"],
  ["cheer","One more step on your Torah journey!"]
 ]
};
const _nerTapCount={home:0,feedback:0,finish:0};
function nerButton(kind,mood){
 const safe=NER_LINES[kind]?kind:"home";
 return `<div class="ner-interactive ner-${safe}">
  <button type="button" class="ner-tap" data-ner-tap="${safe}" aria-label="Tap Ner for encouragement" title="Tap Ner for encouragement">${ner(mood)}<span class="ner-touch-hint" aria-hidden="true">✦</span></button>
  <span class="ner-response" data-ner-response role="status" aria-live="polite"></span>
 </div>`;
}
document.addEventListener("click",e=>{
 const btn=e.target.closest?.("[data-ner-tap]");if(!btn)return;
 const kind=btn.dataset.nerTap,lines=NER_LINES[kind];if(!lines)return;
 const entry=lines[_nerTapCount[kind]++%lines.length],box=btn.closest(".ner-interactive"),text=box?.querySelector("[data-ner-response]");
 if(!box||!text)return;
 const reduce=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
 btn.innerHTML=ner(entry[0])+'<span class="ner-touch-hint" aria-hidden="true">✦</span>';
 box.classList.remove("ner-reacting");
 if(!reduce){void box.offsetWidth;box.classList.add("ner-reacting");}
 text.textContent=typeof T==="function"?T(entry[1]):entry[1];
 const old=box._nerClear;if(old)clearTimeout(old);
 box._nerClear=setTimeout(()=>{box.classList.remove("ner-reacting");text.textContent="";},4100);
});

/* Persistent corner companion in lessons, practice and tests. */
let _nerCompanionTimer=0;
function nerCompanionMount(){
 const overlay=document.querySelector("#ov");if(!overlay)return null;
 let dock=document.querySelector("#ner-companion");
 if(!dock){
  dock=document.createElement("aside");dock.id="ner-companion";dock.className="ner-companion";
  dock.setAttribute("aria-label","Ner learning companion");
  dock.innerHTML=`<button type="button" class="ner-companion-button" aria-label="Give Ner a high five" title="Give Ner a high five"><span class="ner-companion-character">${ner("happy")}</span><span class="ner-companion-spark" aria-hidden="true">✦</span></button><span class="ner-companion-bubble" role="status" aria-live="polite"></span><span class="ner-companion-meter" aria-hidden="true"><span></span></span>`;
  overlay.appendChild(dock);
  dock.querySelector("button").addEventListener("click",()=>{
   const lines=NER_LINES.feedback,[mood,message]=lines[_nerTapCount.feedback++%lines.length];
   nerCompanionReact(mood,message,"highfive");
  });
 }
 return dock;
}
function nerCompanionReact(mood,message,action){
 const dock=document.querySelector("#ner-companion");if(!dock)return;
 const character=dock.querySelector(".ner-companion-character"),bubble=dock.querySelector(".ner-companion-bubble");
 if(!character||!bubble)return;
 character.innerHTML=ner(mood||"happy");
 dock.classList.remove("ner-perform-cheer","ner-perform-think","ner-perform-highfive","ner-perform-wave");
 const motion=action||(mood==="cheer"?"cheer":mood==="think"?"think":"wave");
 if(!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches){void dock.offsetWidth;dock.classList.add("ner-perform-"+motion)}
 bubble.textContent=message?(typeof T==="function"?T(message):message):"";
 clearTimeout(_nerCompanionTimer);
 _nerCompanionTimer=setTimeout(()=>{if(!dock.isConnected)return;dock.classList.remove("ner-perform-cheer","ner-perform-think","ner-perform-highfive","ner-perform-wave");bubble.textContent="";},3000);
}
function nerCompanionStep(step){
 const dock=nerCompanionMount();if(!dock)return;
 const done=R?R.doneCount:0,total=R?Math.max(1,R.total):1;
 dock.style.setProperty("--ner-progress",Math.round(100*done/total)+"%");
 dock.classList.toggle("ner-companion-learning",!!step&&step.t==="learn");
 if(done>0&&done%4===0&&dock.dataset.milestone!==String(done)){
  dock.dataset.milestone=String(done);
  nerCompanionReact("cheer","You're making progress!","wave");
 }
}
function nerCompanionAnswer(correct){
 nerCompanionReact(correct?"cheer":"think",correct?"Yasher koach! That was terrific!":"Almost! Let's learn from this one.",correct?"cheer":"think");
}
function nerCompanionFinish(passed){
 nerCompanionReact(passed?"cheer":"think",passed?"You did it! Yasher koach!":"You can try again. I'll be cheering!",passed?"cheer":"think");
}
