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
