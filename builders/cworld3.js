/* worlds and landmarks for Chayei Sarah (chumash units 18–19) */
(()=>{const g=(s,x=0,y=0)=>`<g transform="translate(${x} ${y}) scale(${s})">`;
 const U=[{ground:"#B8B07A",ground2:"#A8A06A",deco:["olive","rocks","tree","house","bush"],mark:`${g(.8,0,-2)}${PR.cave}</g>`,note:"Me'aras HaMachpelah in Chevron"},
  {ground:"#C9B07A",ground2:"#B9A06A",deco:["palm","rocks","well","sheep","bush"],mark:`${g(1.2,-22,0)}${PR.well2}</g>${g(1,26,0)}${PR.camel}</g>`,note:"Eliezer at the well"}];
 const W=WORLDS.chumash.units||(WORLDS.chumash.units=[]);while(W.length<18)W.push({});W[18]=U[0];W[19]=U[1];
 Object.assign(SP,{
  c18:[`<g>${g(1.4)}${PR.cave}</g>${g(1.1,-90,0)}${WD.olive}</g>${g(1.1,90,0)}${WD.olive}</g></g>`,`<g>${g(1.4)}${PR.coins}</g>${g(1,-60,0)}${WD.house}</g></g>`],
  c19:[`<g>${g(1.5)}${PR.well2}</g>${g(.7,0,-26)}${PR.jug}</g>${g(1.2,-70,0)}${PR.camel}</g>${g(1.2,70,0)}${PR.camel}</g></g>`,`<g>${g(1.2,0,-30)}${PR.jewels}</g>${g(1,60,0)}${PR.trough}</g></g>`]});
})();
