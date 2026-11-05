/* worlds and landmarks for Vayera (units 18–22) and the rest of Chayei Sarah (25–26) */
(()=>{const g=(s,x=0,y=0)=>`<g transform="translate(${x} ${y}) scale(${s})">`;
 const W=WORLDS.chumash.units||(WORLDS.chumash.units=[]);while(W.length<27)W.push({});
 Object.assign(W,{
  18:{ground:"#A8C06A",ground2:"#98B05A",deco:["tree","tent","sheep","olive","flowers"],mark:`${g(1.1,-24,0)}${WD.tent}</g>${g(1,26,0)}${PR.tree}</g>`,note:"Avraham's tent, open on every side"},
  19:{ground:"#8A7A6A",ground2:"#7A6A5A",night:1,deco:["rocks","ruin","rocks","mountain"],mark:`${g(.7,0,0)}${PR.cityp}</g>${g(.6,0,-30)}${PR.firefall}</g>`,note:"Sedom and Amorah"},
  20:{ground:"#C9B07A",ground2:"#B9A06A",deco:["palm","house","sheep","rocks"],mark:`${g(.9,0,0)}${WD.house}</g>${g(.8,0,-42)}${PR.crown2}</g>`,note:"Gerar, land of the Pelishtim"},
  21:{ground:"#C9B46E",ground2:"#B9A45E",deco:["well","tree","sheep","palm","tent"],mark:`${g(1.2,-22,0)}${PR.well2}</g>${g(1,26,0)}${WD.olive}</g>`,note:"Be'er Sheva and the eshel"},
  22:{ground:"#9AA07A",ground2:"#8A906A",deco:["mountain","rocks","olive","bush"],mark:`${g(1.2,0,0)}${WD.mountain}</g>${g(.7,0,-36)}${PR.altar}</g>`,note:"Har HaMoriah"},
  25:{ground:"#B8B07A",ground2:"#A8A06A",deco:["tent","camel","palm","well"],mark:`${g(1,-20,0)}${PR.camel}</g>${g(1,24,0)}${WD.tent}</g>`,note:"Yitzchak and Rivkah"},
  26:{ground:"#B8A67A",ground2:"#A8966A",deco:["tent","olive","palm","rocks"],mark:`${g(.8,0,0)}${PR.cave}</g>`,note:"Avraham's last years"}});
 Object.assign(SP,{
  c18:[`<g>${g(1.4,-40,0)}${WD.tent}</g>${g(1.4,50,0)}${PR.tree}</g>${g(1,50,4)}${PR.table}</g></g>`,`<g>${g(1.3)}${PR.calf}</g></g>`],
  c19:[`<g>${g(1.1)}${PR.cityp}</g>${g(1,0,-40)}${PR.firefall}</g></g>`,`<g>${g(1.2)}${PR.mountains}</g></g>`],
  c20:[`<g>${g(1.2)}${WD.house}</g>${g(1.2,0,-60)}${PR.crown2}</g></g>`],
  c21:[`<g>${g(1.5,-30,0)}${PR.well2}</g>${g(1.2,40,0)}${PR.tree}</g></g>`,`<g>${g(1.3)}${PR.bow2}</g></g>`],
  c22:[`<g>${g(1.6)}${WD.mountain}</g>${g(1,0,-50)}${PR.altar}</g></g>`,`<g>${g(1.2)}${PR.ramthicket}</g></g>`],
  c25:[`<g>${[-50,0,50].map(x=>g(1.1,x,0)+PR.camel+"</g>").join("")}</g>`],
  c26:[`<g>${g(1.4)}${PR.cave}</g></g>`]});
})();
