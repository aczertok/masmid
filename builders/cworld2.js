/* worlds, landmarks and set pieces for Noach and Lech Lecha (chumash units 6–17) */
(()=>{const g=(s,x=0,y=0)=>`<g transform="translate(${x} ${y}) scale(${s})">`;
 const U=[
  {ground:"#86B85E",ground2:"#76A852",deco:["olive","olive","tree","bush","flowers","sheep"],mark:`${g(.8,0,-6)}${PR.ark}</g>`,note:"Noach builds the teivah"},
  {ground:"#5E7A9A",ground2:"#4E6A8A",night:1,stream:false,deco:["reed","rocks","cloud","puddle"],mark:`${g(.75,0,-10)}${PR.arkfloat}</g>${g(.8,0,4)}${PR.flood}</g>`,note:"The Mabul"},
  {ground:"#8AAE7A",ground2:"#7A9E6A",deco:["mountain","olive","puddle","bush","flowers"],mark:`${g(1.3,0,0)}${WD.mountain}</g>${g(1.4,-6,-58)}${PR.dove}</g>`,note:"The raven, the dove and the olive leaf"},
  {ground:"#8FC06A",ground2:"#7FB05A",deco:["vine","vine","flowers","olive","sheep"],mark:`${g(.55,0,0)}${PR.rainbow}</g>`,note:"The bris of the rainbow"},
  {ground:"#A8B86A",ground2:"#98A85A",deco:["house","flathouse","tent","palm","sheep"],mark:`${g(1,0,-30)}${PR.globe}</g>`,note:"Seventy nations"},
  {ground:"#D8B87A",ground2:"#C8A86A",deco:["flathouse","palm","reed","rocks","field"],mark:`${g(.8,0,0)}${PR.tower}</g>`,note:"The tower of Bavel"},
  {ground:"#C9B46E",ground2:"#B9A45E",deco:["palm","tent","sheep","rocks","olive"],mark:`${g(1.2,-24,0)}${PR.camel}</g>${g(1.2,30,0)}${WD.tent}</g>`,note:"Avram sets out"},
  {ground:"#A8C06A",ground2:"#98B05A",deco:["sheep","sheep","tent","olive","river"],mark:`${g(1,-20,0)}${WD.tent}</g>${g(.7,26,0)}${PR.altar}</g>`,note:"Avram and Lot part ways"},
  {ground:"#C8B48A",ground2:"#B8A47A",deco:["rocks","palm","tent","bush"],mark:`${[-30,0,30].map(x=>g(1,x,-8)+PR.crown2+"</g>").join("")}${g(.8,0,8)}${PR.bread}</g>`,note:"Avram saves Lot; Malki-Tzedek"},
  {ground:"#3E5A7A",ground2:"#2E4A6A",night:1,deco:["star","star","tent","rocks","olive"],mark:`${g(1,-24,0)}${PR.furnace}</g>${g(1,26,0)}${PR.torch}</g>`,note:"Count the stars"},
  {ground:"#C9B07A",ground2:"#B9A06A",deco:["palm","rocks","well","bush"],mark:`${g(1.3,0,0)}${PR.well2}</g>${g(1,36,0)}${WD.palm}</g>`,note:"The well of Lachai Ro'i"},
  {ground:"#A8C46A",ground2:"#98B45A",deco:["tent","olive","flowers","sheep","star"],mark:`${g(1.3,0,0)}${WD.tent}</g>${[[-30,-50],[30,-46],[0,-64]].map(([x,y])=>g(1.2,x,y)+WD.star+"</g>").join("")}`,note:"Avram becomes Avraham"}];
 WORLDS.chumash.units=(WORLDS.chumash.units||[]).slice(0,6).concat(U);
 const sp=(s)=>[s];
 Object.assign(SP,{
  c6:[`<g>${g(.9)}${PR.ark}</g></g>`,`<g>${[-50,-20,10,40].map(x=>g(1.1,x,0)+WD.olive+"</g>").join("")}${g(1.2,60,0)}${PR.bricks.replace(/#C9744A/g,"#A8743E")}</g></g>`],
  c7:[`<g>${g(.9,0,-10)}${PR.arkfloat}</g>${g(.9,0,10)}${PR.flood}</g></g>`,`<g>${g(1)}${PR.rain}</g>${g(.8,0,20)}${PR.flood}</g></g>`],
  c8:[`<g>${g(1.6)}${WD.mountain}</g>${g(.6,0,-40)}${PR.ark}</g></g>`,`<g>${g(2,-30,-30)}${PR.raven}</g>${g(2,40,-60)}${PR.dove}</g></g>`],
  c9:[`<g>${g(.8)}${PR.rainbow}</g></g>`,`<g>${g(1)}${PR.vineyard}</g></g>`],
  c10:[`<g>${g(1.4,0,-30)}${PR.globe}</g></g>`,`<g>${[-40,0,40].map(x=>g(1,x,0)+WD.flathouse+"</g>").join("")}</g>`],
  c11:[`<g>${g(1)}${PR.tower}</g>${g(1,70,0)}${PR.bricks}</g></g>`],
  c12:[`<g>${g(1.2,-40,0)}${PR.camel}</g>${g(1.2,10,0)}${WD.sheep}</g>${g(1.2,50,0)}${WD.tent}</g></g>`,`<g>${g(1)}${PR.altar}</g>${g(1,60,0)}${WD.olive}</g></g>`],
  c13:[`<g>${[-50,-25,0,25,50].map(x=>g(1,x,0)+WD.sheep+"</g>").join("")}</g>`,`<g>${g(1.4)}${WD.mountain}</g>${g(1.2,50,4)}${WD.tent}</g></g>`],
  c14:[`<g>${[-36,0,36].map(x=>g(1.2,x,-20)+PR.crown2+"</g>").join("")}${g(.7,0,0)}${PR.sword}</g></g>`,`<g>${g(1,-20,0)}${PR.bread}</g>${g(1,24,-6)}${PR.wine}</g></g>`],
  c15:[`<g>${g(1.2,-30,0)}${PR.furnace}</g>${g(1.2,30,0)}${PR.torch}</g></g>`,`<g>${[[-60,-60],[-20,-80],[20,-66],[60,-84],[0,-40],[40,-40]].map(([x,y])=>g(1.6,x,y)+WD.star+"</g>").join("")}</g>`],
  c16:[`<g>${g(1.6)}${PR.well2}</g>${g(1.2,-50,0)}${WD.palm}</g>${g(1.2,50,0)}${WD.palm}</g></g>`],
  c17:[`<g>${g(1.6)}${WD.tent}</g>${[[-50,-50],[50,-56],[0,-80]].map(([x,y])=>g(1.6,x,y)+WD.star+"</g>").join("")}</g>`]});
})();
