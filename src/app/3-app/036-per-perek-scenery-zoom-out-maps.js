/* ================= PER-PEREK SCENERY + ZOOM-OUT MAPS ================= */
Object.assign(WD,{
 cypress:`<rect x="-2" y="-8" width="4" height="8" fill="#5A3A22"/><path d="M0 -46q9 18 6 38h-12q-3-20 6-38z" fill="#3E5A3A"/>`,
 veg:`${[-12,-4,4,12].map((x,i)=>`<path d="M${x} 0q-3-8 0-12q3 4 0 12" fill="#4E8A3A"/><circle cx="${x}" cy="-2" r="${i%2?3:3.6}" fill="${["#E8763A","#C0392B","#8A3A8A","#E3B84A"][i]}"/>`).join("")}`,
 rainbow:`${["#E57373","#FFB74D","#FFF176","#81C784","#64B5F6","#9575CD"].map((c,i)=>`<path d="M${-40+i*4} 0a${40-i*4} ${34-i*4} 0 0 1 ${2*(40-i*4)} 0" stroke="${c}" stroke-width="4" fill="none" opacity=".8"/>`).join("")}`,
 mountain:`<path d="M-44 0l26-40 14 16 12-24 36 48z" fill="#7E8A9A"/><path d="M-18 -40l6 9-6-2-5 4zM8 -48l7 10-7-3-5 4z" fill="#FFFFFF"/>`,
 puddle:`<ellipse cy="-2" rx="16" ry="5" fill="#9CC8EE" opacity=".8"/><ellipse cx="-4" cy="-3" rx="5" ry="1.5" fill="#FFFFFF" opacity=".7"/>`,
 havdalah:`<rect x="-3" y="-24" width="6" height="24" fill="#F4E6C0"/><path d="M-3 -24l6 4M-3 -18l6 4M-3 -12l6 4" stroke="#2457A6" stroke-width="1.5"/><path class="flame" style="transform-origin:0px -26px" d="M0 -36c5 5 5 9 0 12-5-3-5-7 0-12z" fill="#F4A51C"/><circle class="pulse" cy="-30" r="12" fill="#FFE9A8" opacity=".35"/>`,
 table2:`<path d="M-18 -10l18 9 18-9-18-9z" fill="#A8743E"/><path d="M-16 -9v9M16 -9v9M0 -1v9" stroke="#6B4423" stroke-width="2"/><circle cx="-5" cy="-13" r="3" fill="#D8963F"/><path d="M5 -18h4l-1 6h-2z" fill="#7A2E3A"/>`,
 ladder:`${WD.olive}<path d="M10 0l6-30M18 0l6-30M11 -6h8M13 -14h8M15 -22h8" stroke="#8A5A2B" stroke-width="1.6"/>`,
 sefer2:`<g transform="translate(0 -6)"><path d="M-14 -4q14-5 14 0v12q0-5-14 0z" fill="#FBF6E8" stroke="#8A5A2B"/><path d="M14 -4q-14-5-14 0v12q0-5 14 0z" fill="#F2EBD6" stroke="#8A5A2B"/></g>`,
 walls:`<rect x="-34" y="-30" width="68" height="30" fill="#C9B07A"/>${[-34,-20,-6,8,22].map(x=>`<rect x="${x}" y="-36" width="8" height="6" fill="#C9B07A"/>`).join("")}<rect x="-6" y="-14" width="12" height="14" rx="6" fill="#6B4A2A"/>`,
 thorn:`${[-10,0,10].map(x=>`<path d="M${x} 0l-4-14 4 5 3-9 2 13 4-6-3 11z" fill="#7A6A3A"/>`).join("")}`,
 donkey:`<ellipse cx="0" cy="-14" rx="14" ry="7" fill="#8E8A86"/><rect x="-11" y="-9" width="3" height="9" fill="#7A7672"/><rect x="8" y="-9" width="3" height="9" fill="#7A7672"/><path d="M12 -18l8-10 4 2-4 8z" fill="#8E8A86"/><path d="M19 -28l-1-6M22 -27l1-6" stroke="#6A6662" stroke-width="2"/>`
});
/* each region's own scenery: ground colors, decorations, night, and an emblem by the landmark */
WORLDS.mishnayos.units=[
 {ground:"#3E5A4A",ground2:"#2E4A3E",night:1,deco:["house","house","lamp","olive","wheat","bush","star","star"],emblem:`<circle r="9" fill="#F7E7AE"/><circle cx="4" cy="-3" r="8" fill="#2E4A3E"/>${[[-20,-8],[16,-14],[24,4]].map(([x,y])=>`<g transform="translate(${x} ${y})">${WD.star}</g>`).join("")}`,note:"Kriyas Shema at night"},
 {deco:["ladder","ladder","olive","sefer2","wheat","field","bush","flowers"],emblem:WD.sefer2,note:"Reading Shema while learning, and workers in the treetops"},
 {ground:"#8AA07A",ground2:"#7A9070",deco:["cypress","cypress","rocks","bush","olive","cypress"],emblem:WD.cypress,note:"Who is exempt, and why"},
 {ground:"#B9B26A",ground2:"#A9A25A",deco:["dome","olive","house","flowers","wheat","bush"],emblem:`<circle r="10" fill="#FFD54F"/><path d="M-18 6h36" stroke="#C98A20" stroke-width="3"/>`,note:"The times of tefillah"},
 {ground:"#7EB45A",ground2:"#6EA44E",deco:["puddle","puddle","cloud","reed","bush","house","dome"],emblem:`<g transform="scale(.6)">${WD.cloud}</g><path d="M-6 6l-3 8M2 6l-3 8M10 6l-3 8" stroke="#5DA8EE" stroke-width="2"/>`,note:"Praying with seriousness, and rain"},
 {ground:"#9CC86A",ground2:"#8CB85A",deco:["veg","veg","vine","olive","palm","wheat","field","flowers"],emblem:`<path d="M-14 0h28l-4 10h-20z" fill="#A8743E"/><circle cx="-6" cy="-2" r="5" fill="#C0392B"/><circle cx="4" cy="-3" r="5" fill="#E3B84A"/><circle cx="0" cy="-8" r="4" fill="#7A4A6E"/>`,note:"The bracha for each food"},
 {deco:["table2","table2","house","vine","olive","flowers","bush"],emblem:`${[-10,0,10].map(x=>`<path d="M${x-3} -8h6l-1 8h-4z" fill="#7A2E3A"/>`).join("")}`,note:"Zimun after a meal"},
 {ground:"#5E6A8A",ground2:"#4E5A7A",night:1,deco:["havdalah","house","house","lamp","star","olive","bush"],emblem:WD.havdalah,note:"Beis Shammai and Beis Hillel at the meal; Havdalah"},
 {ground:"#8FBF6A",ground2:"#7FAF5A",deco:["mountain","mountain","rainbow","cloud","bird","rocks","bush"],emblem:`<g transform="scale(.5)">${WD.rainbow}</g>`,note:"Brachos on what we see and hear"}];
WORLDS.gemara.units=[
 {ground:"#6A6A5A",ground2:"#5A5A4A",night:1,deco:["flathouse","palm","lamp","star","reed","flathouse"]},
 {ground:"#4A5A6A",ground2:"#3A4A5A",night:1,deco:["flathouse","palm","star","star","reed","dome"]},
 {deco:["flathouse","palm","bush","reed","well","flathouse"]},
 {deco:["dome","dome","palm","flathouse","lamp","reed"]},
 {ground:"#D8A86A",ground2:"#C8985A",deco:["palm","donkey","flathouse","reed","rocks","palm"]},
 {deco:["donkey","palm","rocks","tent","reed","flathouse"]},
 {ground:"#E0C890",ground2:"#D0B880",deco:["walls","dome","palm","flathouse","lamp","olive"]}];
WORLDS.chumash.units=[
 {ground:"#5E7AA8",ground2:"#4E6A98",night:1,deco:["star","star","cloud","rocks","star","bush"]},
 {ground:"#6AB45A",ground2:"#5AA44E",deco:["olive","palm","flowers","flowers","bird","reed","bush"]},
 {ground:"#A8A06A",ground2:"#98905A",deco:["thorn","thorn","rocks","olive","bush"]},
 {ground:"#9CBF6A",ground2:"#8CAF5A",deco:["field","wheat","sheep","sheep","bush","rocks"]},
 {deco:["house","house","field","sheep","olive","flowers"]},
 {ground:"#7A8A7A",ground2:"#6A7A6A",deco:["cloud","cloud","rocks","olive","bush","house"]}];
WORLDS.tanakh.units=[
 {deco:["tent","tent","sheep","rocks","palm","bush"]},
 {deco:["palm","palm","walls","field","rocks","flowers"]},
 {ground:"#B9B46E",deco:["reed","reed","palm","rocks","tent","bush"]},
 {deco:["rocks","rocks","tent","palm","bush","sheep"]},
 {ground:"#A8BE6E",ground2:"#98AE5E",deco:["wheat","field","tent","palm","sheep","flowers"]}];
WORLDS.halacha.units=[
 {ground:"#C9C08A",ground2:"#B9B07A",deco:["house","house","lamp","flowers","olive","cloud"]},
 {ground:"#A8C8A8",ground2:"#98B898",deco:["well","well","puddle","house","flowers","bush"]}];

/* ---------- zoom-out maps ---------- */
const ZEDATA={
 mishnayos:{t:"Seder Zeraim",he:"סדר זרעים",sub:"Eleven masechtos about the land and its produce. Berachos comes first.",items:[
  {he:"ברכות",en:"Berachos",n:9,live:1,icon:"shul"},{he:"פאה",en:"Peah",n:8,icon:"peah"},{he:"דמאי",en:"Demai",n:7,icon:"market"},{he:"כלאים",en:"Kilayim",n:9,icon:"kilayim"},
  {he:"שביעית",en:"Sheviis",n:10,icon:"shmita"},{he:"תרומות",en:"Terumos",n:11,icon:"terumah"},{he:"מעשרות",en:"Maasros",n:5,icon:"baskets"},{he:"מעשר שני",en:"Maaser Sheni",n:5,icon:"yerushalayim"},
  {he:"חלה",en:"Challah",n:4,icon:"challah"},{he:"ערלה",en:"Orlah",n:3,icon:"orlah"},{he:"ביכורים",en:"Bikkurim",n:4,icon:"bikkurim"}]},
 chumash:{t:"Sefer Bereishis",he:"ספר בראשית",sub:"Twelve parshiyos. The first five, Bereishis to Chayei Sarah, are open now.",items:["בראשית","נח","לך לך","וירא","חיי שרה","תולדות","ויצא","וישלח","וישב","מקץ","ויגש","ויחי"].map((h,i)=>({he:h,en:["Bereishis","Noach","Lech Lecha","Vayera","Chayei Sarah","Toldos","Vayetzei","Vayishlach","Vayeshev","Miketz","Vayigash","Vayechi"][i],n:[6,6,6,5,4][i]||1,lbl:["6 sections","6 sections","6 sections","5 perakim","4 sections"][i]||"Parashah",live:i<5,u:[[0,6],[6,12],[12,18],[18,23],[23,27]][i]||null,icon:["creation","ark","tent","tent","tent","well","ladder","tent","sheaves","sheaves","sheaves","tent"][i]}))},
 tanakh:{t:"Nevi'im Rishonim",he:"נביאים ראשונים",sub:"From crossing the Yarden to the kings of Yehudah and Yisrael.",items:[
  {he:"יהושע",en:"Yehoshua",n:24,live:1,icon:"walls"},{he:"שופטים",en:"Shoftim",n:21,icon:"palm"},{he:"שמואל א",en:"Shmuel I",n:31,icon:"harp"},{he:"שמואל ב",en:"Shmuel II",n:24,icon:"crown"},{he:"מלכים א",en:"Melachim I",n:22,icon:"mikdash"},{he:"מלכים ב",en:"Melachim II",n:25,icon:"crown"}]},
 gemara:{t:"Maseches Berachos",he:"מסכת ברכות",sub:"Nine perakim of Gemara. Perek Meimasai is open now.",items:["מאימתי","היה קורא","מי שמתו","תפלת השחר","אין עומדין","כיצד מברכין","שלשה שאכלו","אלו דברים","הרואה"].map((h,i)=>({he:"פרק "+h,en:"Perek "+(i+1),n:1,live:i===0,icon:"yeshiva",lbl:"Daf "+["2a–13a","13a–17b","17b–26a","26a–30b","30b–34b","35a–45a","45a–51b","51b–53b","54a–64a"][i]}))},
 halacha:{t:"Kitzur Shulchan Aruch",he:"קיצור שלחן ערוך",sub:"All 221 simanim, in order, in 18 sections.",items:[{"he": "השכמה ותפלה", "en": "Morning and tefillah", "n": 26, "live": 1, "icon": "washcup", "u": [0, 26], "lbl": "Simanim 1–26"}, {"he": "תורה ומדות", "en": "Torah and middos", "n": 8, "live": 1, "icon": "scroll", "u": [26, 34], "lbl": "Simanim 27–34"}, {"he": "סעודה וכשרות", "en": "Meals and kashrus", "n": 13, "live": 1, "icon": "loaf", "u": [34, 47], "lbl": "Simanim 35–47"}, {"he": "ברכות", "en": "Brachos", "n": 14, "live": 1, "icon": "cup", "u": [47, 61], "lbl": "Simanim 48–61"}, {"he": "משא ומתן ונדרים", "en": "Business and vows", "n": 7, "live": 1, "icon": "coin", "u": [61, 68], "lbl": "Simanim 62–68"}, {"he": "מנחה ומעריב", "en": "Minchah and Maariv", "n": 3, "live": 1, "icon": "sunset", "u": [68, 71], "lbl": "Simanim 69–71"}, {"he": "שבת", "en": "Shabbos", "n": 25, "live": 1, "icon": "candles", "u": [71, 96], "lbl": "Simanim 72–96"}, {"he": "ראש חדש ויום טוב", "en": "Rosh Chodesh and Yom Tov", "n": 10, "live": 1, "icon": "moed", "u": [96, 106], "lbl": "Simanim 97–106"}, {"he": "פסח וספירה", "en": "Pesach and Sefirah", "n": 14, "live": 1, "icon": "matzah", "u": [106, 120], "lbl": "Simanim 107–120"}, {"he": "תעניות", "en": "Fast days", "n": 7, "live": 1, "icon": "calendar", "u": [120, 127], "lbl": "Simanim 121–127"}, {"he": "ימים נוראים", "en": "Yamim Noraim", "n": 6, "live": 1, "icon": "shofar", "u": [127, 133], "lbl": "Simanim 128–133"}, {"he": "סכות", "en": "Sukkos", "n": 5, "live": 1, "icon": "sukkah", "u": [133, 138], "lbl": "Simanim 134–138"}, {"he": "חנכה ופורים", "en": "Chanukah and Purim", "n": 4, "live": 1, "icon": "megillah", "u": [138, 142], "lbl": "Simanim 139–142"}, {"he": "כבוד ובית", "en": "Honor and the home", "n": 20, "live": 1, "icon": "ring", "u": [142, 162], "lbl": "Simanim 143–162"}, {"he": "מילה וחנוך", "en": "Bris and chinuch", "n": 9, "live": 1, "icon": "seal", "u": [162, 171], "lbl": "Simanim 163–171"}, {"he": "שדה ובהמה", "en": "Field and animals", "n": 7, "live": 1, "icon": "stems", "u": [171, 178], "lbl": "Simanim 172–178"}, {"he": "ממון ונזיקין", "en": "Money and damages", "n": 13, "live": 1, "icon": "gavel", "u": [178, 191], "lbl": "Simanim 179–191"}, {"he": "חולים ואבלות", "en": "The sick and mourning", "n": 30, "live": 1, "icon": "tent", "u": [191, 221], "lbl": "Simanim 192–221"}]}};
const ZICON={
 shul:`<g transform="scale(1.3)">${WD.dome}</g>${[[-30,-40],[26,-46],[34,-30]].map(([x,y])=>`<g transform="translate(${x} ${y})">${WD.star}</g>`).join("")}`,
 peah:`<g transform="scale(1.2)">${WD.wheat}</g><path d="M14 4l14-8" stroke="#8A6A3A" stroke-width="2"/><g transform="translate(24 0) scale(.5)">${avatar({base:"man",item:"none",head:"cap",top:7})}</g>`,
 market:`<path d="M-26 0v-22h52v22" fill="#E7D3AE"/><path d="M-30 -22h60l-6-10h-48z" fill="#C0392B"/>${WD.veg}`,
 kilayim:`<g transform="translate(-14 0)">${WD.vine}</g><g transform="translate(18 0) scale(.8)">${WD.wheat}</g><path d="M2 -26v26" stroke="#8A6A3A" stroke-width="2" stroke-dasharray="3 3"/>`,
 shmita:`<path d="M-30 0l8-14h44l-8 14z" fill="#B88A4A"/><rect x="-2" y="-34" width="3" height="22" fill="#6B4423"/><rect x="-16" y="-42" width="32" height="12" rx="2" fill="#FFF8E7" stroke="#8A5A2B"/><text y="-33" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="9" fill="#16213A">שמיטה</text>`,
 terumah:`<path d="M-16 0l4-18h24l4 18z" fill="#C9A34A"/><circle cx="-6" cy="-20" r="5" fill="#E3B84A"/><circle cx="4" cy="-22" r="5" fill="#D8963F"/><g transform="translate(26 0) scale(.5)">${avatar({base:"man",head:"kipw",top:0,beard:"full"})}</g>`,
 baskets:`${[-22,0,22].map((x,i)=>`<path d="M${x-9} 0l2-14h14l2 14z" fill="${i===1?"#E3B84A":"#A8743E"}"/>`).join("")}<text y="-22" text-anchor="middle" font-size="11" font-weight="900" fill="#16213A">1/10</text>`,
 yerushalayim:WD.walls+`<circle cx="24" cy="-6" r="5" fill="#E9C65A" stroke="#A9822A"/><circle cx="30" cy="-2" r="5" fill="#E9C65A" stroke="#A9822A"/>`,
 challah:`<path d="M-26 0q-2-14 12-14h28q14 0 12 14z" fill="#D8963F"/><path d="M-18 -10q6 6 12 0t12 0 12 0" stroke="#B5762A" stroke-width="2" fill="none"/>`,
 orlah:`<path d="M0 0v-16" stroke="#6B4423" stroke-width="3"/><circle cy="-22" r="9" fill="#6AAA4E"/><path d="M-20 0v-14M20 0v-14M-20 -10h40M-20 -4h40" stroke="#A8743E" stroke-width="2"/>`,
 bikkurim:`<path d="M-18 0q-2-16 18-16t18 16z" fill="#C9A34A"/><circle cx="-8" cy="-18" r="5" fill="#7A4A6E"/><circle cx="2" cy="-20" r="5" fill="#C0392B"/><circle cx="10" cy="-17" r="4" fill="#E3B84A"/><path d="M-6 -22q8-10 14 0" stroke="#4E8A3A" stroke-width="2" fill="none"/>`,
 creation:`<circle cy="-18" r="12" fill="#FFF7D6"/>${[0,60,120,180,240,300].map(a=>`<path d="M${Math.cos(a*Math.PI/180)*16} ${-18+Math.sin(a*Math.PI/180)*16}l${Math.cos(a*Math.PI/180)*6} ${Math.sin(a*Math.PI/180)*6}" stroke="#FFE08A" stroke-width="3"/>`).join("")}`,
 ark:`<path d="M-30 -10h60l-8 10h-44z" fill="#8A5A2B"/><rect x="-18" y="-24" width="36" height="14" fill="#A8743E"/><path d="M-22 -24l22-8 22 8z" fill="#6B4423"/>`,
 tent:WD.tent+`<g transform="translate(24 0)">${WD.palm}</g>`,well:WD.well+`<g transform="translate(24 0)">${WD.sheep}</g>`,
 ladder:`<path d="M-6 0l10-40M6 0l10-40M-4 -8h12M-1 -18h12M2 -28h12" stroke="#C9A34A" stroke-width="2"/>${WD.star}`,
 sheaves:`${[-16,0,16].map(x=>`<g transform="translate(${x} 0) scale(.6)">${WD.wheat}</g>`).join("")}`,
 walls:WD.walls+`<path d="M18 -26q3 8 0 16" stroke="#D32F2F" stroke-width="2" fill="none"/>`,palm:WD.palm+`<g transform="translate(-22 0)">${WD.tent}</g>`,
 harp:`<path d="M-8 0V-30q16 3 18 24l-2 6z" fill="none" stroke="#8A5A2B" stroke-width="3"/>${[-4,0,4].map(x=>`<path d="M${x} -2V${-26+(x+4)*1.2}" stroke="#C9A65E" stroke-width="1.2"/>`).join("")}`,
 crown:`<path d="M-16 0l-4-20 10 8 10-14 10 14 10-8-4 20z" fill="#F1BD3C" stroke="#B07D06"/>`,
 mikdash:`<rect x="-24" y="-30" width="48" height="30" fill="#EDE4D0"/><rect x="-8" y="-46" width="16" height="16" fill="#EDE4D0"/><rect x="-6" y="-18" width="12" height="18" fill="#C9A34A"/>`,
 yeshiva:`<g transform="scale(1.2)">${WD.dome}</g>`,book:`<g transform="scale(1.6)">${WD.sefer2}</g>`};
function zoomProgress(){/* per live item: array of plot fractions, and mishnah dots for Mishnayos */
 const P=CRS.units.map(unitProgress);
 if(CRS.id==="gemara")return {plots:[P.reduce((a,p)=>a+p.f,0)/P.length]};
 if(CRS.id==="chumash")return {plots:P.map(p=>p.f)};
 if(CRS.id==="halacha")return {plots:P.map(p=>p.f)};
 if(CRS.id==="mishnayos")return {plots:P.map(p=>p.f),dots:CRS.units.map(u=>u.sections.map((_,m)=>{const ls=u.lessons.filter(l=>l.parts.includes(m));return ls.length&&ls.every(l=>S.lessons[l.id]?.done)}))};
 return {plots:P.map(p=>p.f)}}
function zoomMap(){const Z=ZEDATA[CRS.id];if(!Z)return;const pr=zoomProgress();
 const W=360,rowH=178,H=110+Z.items.length*rowH+30;let s="";
 /* river and road */
 let road=`M180 100`;Z.items.forEach((it,i)=>{const y=170+i*rowH,x=i%2?220:130;road+=` S${i%2?110:250} ${y-rowH/2} ${x} ${y}`});
 s+=`<path d="M${W-12} 0 q-16 ${H/4} 0 ${H/2} t0 ${H/2}" stroke="#5DA8EE" stroke-width="16" fill="none" opacity=".75"/><path class="wave" d="M${W-12} 0 q-16 ${H/4} 0 ${H/2} t0 ${H/2}" stroke="#BFE0FF" stroke-width="2" fill="none" stroke-dasharray="10 14"/>`;
 s+=`<path d="${road}" stroke="#C7A666" stroke-width="16" fill="none" stroke-linecap="round"/><path d="${road}" stroke="#E2C58C" stroke-width="11" fill="none" stroke-linecap="round"/>`;
 Z.items.forEach((it,i)=>{const y=170+i*rowH,x=i%2?220:130,live=it.live;
  const n=it.n,per=Math.min(n,n>40?20:n),rows=Math.ceil(n/per),sz=n>40?7:Math.min(18,120/per);let plots="";
  for(let k=0;k<n;k++){const r=Math.floor(k/per),c=k%per,f=live&&pr.plots[k]!=null?pr.plots[k]:0,px=-((per*sz+(per-1)*3)/2)+c*(sz+3),py=40+r*(sz+3);
   plots+=`<rect x="${px.toFixed(1)}" y="${py}" width="${sz}" height="${sz}" rx="2" fill="${live?(f>=.999?"#E3B84A":f>0?"#9CCB6A":"#F4F1E6"):"#D8DCE4"}" stroke="${live?"#8A6A3A":"#B9C3D4"}" stroke-width="1"/>`;
   if(CRS.id==="mishnayos"&&live&&pr.dots&&pr.dots[k]){const d=pr.dots[k];d.forEach((ok,m)=>{plots+=`<circle cx="${(px+3+(m%3)*(sz-6)/2).toFixed(1)}" cy="${(py+3+Math.floor(m/3)*4).toFixed(1)}" r="1.4" fill="${ok?"#B07D06":"#C9BC98"}"/>`})}}
  const done=live?Math.round(pr.plots.slice(0,n).reduce((a,f)=>a+(f||0),0)/n*100):0;
  s+=`<g class="zitem ${live?"live":"soon"}" data-z="${i}" transform="translate(${x} ${y})"><ellipse cy="12" rx="104" ry="${44+rows*6}" fill="${live?"#9DC46A":"#C9CFC0"}" opacity="${live?1:.8}"/>
   <g transform="translate(0 18) scale(1.15)" ${live?"":'style="filter:grayscale(1);opacity:.55"'}>${ZICON[it.icon]||""}</g>
   <text y="-56" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="17" fill="#16213A">${it.he}</text>
   <rect x="-92" y="-52" width="184" height="16" rx="8" fill="rgba(255,255,255,.8)"/><text y="-40" text-anchor="middle" font-size="10.5" font-weight="700" fill="#3A4664">${it.en} · ${it.lbl||`${n} ${CRS.id==="halacha"?"simanim":"perakim"}`}${live?` · ${done}%`:" · coming"}</text>${plots}
   ${live?`<g transform="translate(78 -40)"><path d="M0 0v-26" stroke="#3A2A1A" stroke-width="2"/><path d="M0 -26h18l-5 6 5 6H0z" fill="${worldOf().flag}"/></g>`:""}</g>`});
 const lay=$("#layer");lay.innerHTML=`<div class="zoomv" role="dialog" aria-modal="true" aria-label="${esc(Z.t)}"><div class="zv-h wrap"><div><small>Zoomed out</small><h2>${Z.t}</h2><p>${Z.sub}</p></div><span class="he">${Z.he}</span><button class="iconbtn" id="zclose" aria-label="Close">✕</button></div>
  <div class="zv-b"><svg viewBox="0 0 ${W} ${H}" class="zsvg"><defs><linearGradient id="zg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B8D890"/><stop offset="1" stop-color="#9DC46A"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#zg)"/>
  ${Array.from({length:26},(_,k)=>{const x=(k*97)%W,y=60+(k*173)%(H-80);const kind=["olive","bush","flowers","rocks","sheep","cloud"][k%6];return `<g transform="translate(${x} ${y}) scale(.7)" opacity=".7">${WD[kind]}</g>`}).join("")}
  <g id="zgrp" style="transform-origin:180px 150px">${s}</g></svg></div></div>`;
 document.body.style.overflow="hidden";
 const close=()=>{lay.innerHTML="";document.body.style.overflow=""};
 $("#zclose").onclick=close;
 lay.querySelectorAll("[data-z]").forEach(g=>g.onclick=()=>{const it=Z.items[+g.dataset.z];
  if(!it.live){toast(`${it.en} is coming soon`);return}
  const grp=$("#zgrp"),i=+g.dataset.z,x=i%2?220:130,y=170+i*rowH;grp.style.transformOrigin=`${x}px ${y}px`;grp.classList.add("zooming");
  setTimeout(()=>{close();const t=$(".wbanner");if(t)t.scrollIntoView({behavior:"smooth",block:"start"})},650)})}

