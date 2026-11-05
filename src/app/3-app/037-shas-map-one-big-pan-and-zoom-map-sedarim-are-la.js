/* ================= SHAS MAP: one big pan-and-zoom map; sedarim are lands, masechtos are territories, perakim are plots ================= */
const SHAS=[
 {id:"zeraim",he:"זרעים",en:"Zeraim",c:"#9DC46A",c2:"#86B055",deco:["wheat","olive","vine","field","palm","sheep"],cx:390,cy:420,m:[["ברכות","Berachos",9,"shul"],["פאה","Peah",8,"peah"],["דמאי","Demai",7,"market"],["כלאים","Kilayim",9,"kilayim"],["שביעית","Sheviis",10,"shmita"],["תרומות","Terumos",11,"terumah"],["מעשרות","Maasros",5,"baskets"],["מעשר שני","Maaser Sheni",5,"yerushalayim"],["חלה","Challah",4,"challah"],["ערלה","Orlah",3,"orlah"],["ביכורים","Bikkurim",4,"bikkurim"]]},
 {id:"moed",he:"מועד",en:"Moed",c:"#E8C27A",c2:"#D8B068",deco:["palm","olive","house","flowers","lamp","bush"],cx:1040,cy:380,m:[["שבת","Shabbos",24,"candles"],["עירובין","Eruvin",10,"eruv"],["פסחים","Pesachim",10,"matzah"],["שקלים","Shekalim",8,"coin"],["יומא","Yoma",8,"kohen"],["סוכה","Sukkah",5,"sukkah"],["ביצה","Beitzah",5,"egg"],["ראש השנה","Rosh Hashanah",4,"shofar"],["תענית","Taanis",4,"rain"],["מגילה","Megillah",4,"megillah"],["מועד קטן","Moed Katan",3,"tent"],["חגיגה","Chagigah",3,"olah"]]},
 {id:"nashim",he:"נשים",en:"Nashim",c:"#E2B8B0",c2:"#D4A8A0",deco:["house","house","flowers","olive","bush","lamp"],cx:1690,cy:430,m:[["יבמות","Yevamos",16,"houses"],["כתובות","Kesubos",13,"kesubah"],["נדרים","Nedarim",11,"seal"],["נזיר","Nazir",9,"nazir"],["סוטה","Sotah",9,"cup"],["גיטין","Gittin",9,"scroll"],["קידושין","Kiddushin",4,"ring"]]},
 {id:"nezikin",he:"נזיקין",en:"Nezikin",c:"#C8B48A",c2:"#B8A47A",deco:["flathouse","rocks","olive","well","house","bush"],cx:400,cy:1220,m:[["בבא קמא","Bava Kamma",10,"ox"],["בבא מציעא","Bava Metzia",10,"found"],["בבא בתרא","Bava Basra",10,"wall"],["סנהדרין","Sanhedrin",11,"sanhedrin"],["מכות","Makkos",3,"refuge"],["שבועות","Shevuos",8,"oath"],["עדיות","Eduyos",8,"witness"],["עבודה זרה","Avodah Zarah",5,"fence"],["אבות","Avos",6,"sinai"],["הוריות","Horayos",3,"gavel"]]},
 {id:"kodashim",he:"קדשים",en:"Kodashim",c:"#EADFC0",c2:"#DCCFAE",deco:["olive","sheep","flowers","rocks","palm","bush"],cx:1050,cy:1180,m:[["זבחים","Zevachim",14,"altar"],["מנחות","Menachos",13,"flour"],["חולין","Chullin",12,"knife"],["בכורות","Bechoros",9,"lamb"],["ערכין","Arachin",9,"coin"],["תמורה","Temurah",7,"twolambs"],["כריתות","Kerisos",6,"scroll"],["מעילה","Meilah",6,"coin"],["תמיד","Tamid",7,"fire"],["מדות","Middos",5,"mikdash"],["קנים","Kinnim",3,"birds"]]},
 {id:"taharos",he:"טהרות",en:"Taharos",c:"#A8D4C8",c2:"#98C4B8",deco:["well","reed","olive","puddle","bush","flowers"],cx:1700,cy:1230,m:[["כלים","Keilim",30,"vessels"],["אהלות","Ohalos",18,"tent"],["נגעים","Negaim",14,"house"],["פרה","Parah",12,"heifer"],["טהרות","Taharos",10,"loaf"],["מקואות","Mikvaos",10,"mikvah"],["נדה","Niddah",10,"calendar"],["מכשירין","Machshirin",6,"drops"],["זבים","Zavim",5,"bench"],["טבול יום","Tevul Yom",4,"sunset"],["ידים","Yadayim",4,"washcup"],["עוקצין","Uktzin",3,"stems"]]}];
const MI=Object.assign({},ZICON,{
 candles:`<rect x="-10" y="-26" width="5" height="22" fill="#FFF8E7"/><rect x="5" y="-26" width="5" height="22" fill="#FFF8E7"/><path class="flame" d="M-7.5 -36c4 4 4 7 0 9-4-2-4-5 0-9zM7.5 -36c4 4 4 7 0 9-4-2-4-5 0-9z" fill="#F4A51C"/><rect x="-16" y="-4" width="32" height="5" rx="2" fill="#C9A34A"/>`,
 eruv:`<path d="M-24 0v-34M24 0v-34" stroke="#6B6B6B" stroke-width="3"/><path d="M-24 -32h48" stroke="#FFF" stroke-width="1.4"/>`,
 matzah:`<ellipse cy="-8" rx="24" ry="10" fill="#E8C98A" stroke="#C49A55" stroke-width="2"/>${[[-10,-10],[0,-6],[10,-10],[-4,-12]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="#9A6A2B"/>`).join("")}`,
 coin:`<circle cy="-12" r="13" fill="#E9C65A" stroke="#A9822A" stroke-width="2"/><text y="-8" text-anchor="middle" font-size="12" font-weight="900" fill="#8A6A1A">½</text>`,
 kohen:`<g transform="scale(.42)">${avatar({base:"man",head:"kipw",top:0,beard:"full"})}</g><path d="M-14 -8h28" stroke="#C9A34A" stroke-width="2"/>`,
 sukkah:`<rect x="-22" y="-24" width="44" height="24" fill="#F4E6C0" stroke="#A8865A"/><path d="M-26 -24h52" stroke="#4E7A44" stroke-width="6" stroke-linecap="round"/>`,
 egg:`<ellipse cy="-14" rx="10" ry="13" fill="#FFF8E7" stroke="#D9CBA4" stroke-width="2"/>`,
 shofar:`<path d="M-22 -6q16-2 30-24l6 4q-10 22-36 26z" fill="#E8D2A0" stroke="#A8865A"/>`,
 rain:`<g transform="translate(0 -24) scale(.7)">${WD.cloud}</g>${[-10,0,10].map(x=>`<path d="M${x} -14l-3 9" stroke="#5DA8EE" stroke-width="2"/>`).join("")}`,
 megillah:`<rect x="-26" y="-26" width="8" height="26" rx="4" fill="#8A5A2B"/><rect x="-18" y="-22" width="40" height="18" fill="#FBF6E8" stroke="#C9BC98"/><path d="M-12 -16h28M-12 -10h28" stroke="#C9BC98"/>`,
 olah:`<rect x="-18" y="-22" width="36" height="22" fill="#9AA0AE"/><path class="flame" style="transform-origin:0px -22px" d="M0 -22c-6-8-4-14 0-20 4 6 6 12 0 20z" fill="#F46A1C"/>`,
 houses:`${[-14,14].map(x=>`<g transform="translate(${x} 0) scale(.8)">${WD.house}</g>`).join("")}`,
 kesubah:`<rect x="-18" y="-30" width="36" height="30" rx="3" fill="#FBF6E8" stroke="#C9A34A" stroke-width="2"/><path d="M-12 -22h24M-12 -16h24M-12 -10h16" stroke="#C9BC98"/><circle cx="10" cy="-8" r="4" fill="#C0392B"/>`,
 seal:`<rect x="-16" y="-28" width="32" height="26" rx="3" fill="#FBF6E8" stroke="#C9BC98"/><circle cy="-8" r="7" fill="#C0392B"/>`,
 nazir:`<g fill="#6A3A8A"><circle cx="-4" cy="-18" r="4"/><circle cx="4" cy="-18" r="4"/><circle cy="-11" r="4"/></g><path d="M-14 -28l28 26M14 -28l-28 26" stroke="#C0392B" stroke-width="3"/>`,
 cup:`<path d="M-10 -26h20l-3 16h-14z" fill="#C9D3E2" stroke="#8A94A8"/><rect x="-2" y="-10" width="4" height="8" fill="#C9D3E2"/><rect x="-8" y="-3" width="16" height="3" fill="#C9D3E2"/>`,
 scroll:`<rect x="-24" y="-28" width="7" height="28" rx="3" fill="#8A5A2B"/><rect x="17" y="-28" width="7" height="28" rx="3" fill="#8A5A2B"/><rect x="-17" y="-24" width="34" height="20" fill="#FBF6E8"/>`,
 ring:`<circle cy="-12" r="10" fill="none" stroke="#E9C65A" stroke-width="4"/><path d="M0 -26l4 4-4 4-4-4z" fill="#BFE0FF"/>`,
 ox:`<ellipse cy="-14" rx="18" ry="9" fill="#8A5A3A"/><circle cx="18" cy="-18" r="7" fill="#8A5A3A"/><path d="M14 -24l-4-6M22 -24l4-6" stroke="#E8D2A0" stroke-width="2"/>${[-12,-4,6,12].map(x=>`<rect x="${x-1.5}" y="-8" width="3" height="8" fill="#6A3A2A"/>`).join("")}`,
 found:`<path d="M-14 -4l6-16h16l6 16z" fill="#7A5A3A"/><circle cx="8" cy="-24" r="6" fill="#E9C65A"/><text x="8" y="-21" text-anchor="middle" font-size="8" font-weight="900" fill="#8A6A1A">?</text>`,
 wall:`<rect x="-26" y="-20" width="52" height="20" fill="#C9B07A"/>${[0,1].map(r=>`<path d="M-26 ${-7-r*7}h52" stroke="#A88E58"/>`).join("")}<g transform="translate(-30 0) scale(.6)">${WD.house}</g><g transform="translate(30 0) scale(.6)">${WD.house}</g>`,
 sanhedrin:`${Array.from({length:7},(_,i)=>{const a=Math.PI*(i/6);return `<circle cx="${(-Math.cos(a)*22).toFixed(1)}" cy="${(-Math.sin(a)*12-6).toFixed(1)}" r="4" fill="#2F3A55"/>`}).join("")}<path d="M-26 -2q26 16 52 0" stroke="#8A6A3A" stroke-width="3" fill="none"/>`,
 refuge:`${WD.walls}<path d="M-40 4h20" stroke="#C9A34A" stroke-width="3" marker-end=""/>`,
 oath:`<path d="M-4 -30h8v22h-8z" fill="#F2C9A0"/><path d="M-4 -30v-6M0 -30v-8M4 -30v-6" stroke="#F2C9A0" stroke-width="3" stroke-linecap="round"/><rect x="-14" y="-10" width="28" height="10" fill="#7A2E3A"/>`,
 witness:`<g transform="translate(-10 0) scale(.32)">${avatar({base:"man",head:"fedora",beard:"full"})}</g><g transform="translate(10 0) scale(.32)">${avatar({base:"man",head:"fedora",beard:"short",top:1})}</g>`,
 fence:`<path d="M-24 0v-22M-12 0v-22M0 0v-22M12 0v-22M24 0v-22M-28 -16h56M-28 -6h56" stroke="#8A5A2B" stroke-width="2.5"/>`,
 sinai:`<path d="M-30 0l30-36 30 36z" fill="#9A8A7A"/><path d="M-6 -30l6-6 6 6z" fill="#FFF"/><g transform="translate(0 -40) scale(.5)">${WD.cloud}</g>`,
 gavel:`<rect x="-18" y="-4" width="36" height="5" fill="#8A5A2B"/><rect x="-6" y="-26" width="18" height="8" rx="2" fill="#6B4423" transform="rotate(-20 3 -22)"/><rect x="2" y="-20" width="3" height="16" fill="#8A5A2B" transform="rotate(-20 3 -12)"/>`,
 altar:`<rect x="-20" y="-24" width="40" height="24" fill="#9AA0AE"/><path d="M-20 -24l-4-4M20 -24l4-4" stroke="#9AA0AE" stroke-width="4"/><path class="flame" style="transform-origin:0px -24px" d="M0 -24c-6-8-4-14 0-20 4 6 6 12 0 20z" fill="#F46A1C"/>`,
 flour:`<path d="M-16 0q-2-16 16-16t16 16z" fill="#C9A34A"/><path d="M-12 -14q12-12 24 0" fill="#FFF8E7"/>`,
 knife:`<path d="M-26 -10h40l8 4-8 4h-40z" fill="#C9D3E2" stroke="#8A94A8"/><rect x="-34" y="-12" width="10" height="8" rx="2" fill="#5A3A1A"/>`,
 lamb:WD.sheep.replace('class="bob"','transform="scale(1.4)"'),
 twolambs:`<g transform="translate(-12 0)">${WD.sheep}</g><g transform="translate(12 0)">${WD.sheep}</g>`,
 fire:`${[0,1,2].map(i=>`<path class="flame" style="transform-origin:${-10+i*10}px 0px;animation-delay:${i*.25}s" d="M${-10+i*10} 0c-7-10-5-18 0-26 5 8 7 16 0 26z" fill="${i%2?"#F4A51C":"#F46A1C"}"/>`).join("")}`,
 birds:`<path d="M-14 -16q5-6 10 0q5-6 10 0M2 -26q5-6 10 0q5-6 10 0" stroke="#3A2A1A" stroke-width="2" fill="none"/><path d="M-20 0h40l-4 -6h-32z" fill="#A8743E"/>`,
 vessels:`${[[-16,"#C9A34A"],[0,"#9AA0AE"],[16,"#B5562F"]].map(([x,c])=>`<path d="M${x-7} -20h14l-2 20h-10z" fill="${c}"/>`).join("")}`,
 heifer:`<ellipse cy="-14" rx="18" ry="9" fill="#C0392B"/><circle cx="18" cy="-18" r="7" fill="#C0392B"/>${[-12,-4,6,12].map(x=>`<rect x="${x-1.5}" y="-8" width="3" height="8" fill="#8A2A1E"/>`).join("")}`,
 loaf:`<path d="M-20 -2q0-16 20-16t20 16z" fill="#D8963F"/><path d="M-10 -8l4-6M0 -10l4-6M10 -8l4-6" stroke="#B5762A" stroke-width="2"/>`,
 mikvah:`<rect x="-22" y="-14" width="44" height="14" fill="#9AA0AE"/><rect x="-18" y="-12" width="36" height="10" fill="#5DA8EE"/><path d="M-22 -14l-4-6v20" stroke="#9AA0AE" stroke-width="2"/>`,
 calendar:`<rect x="-16" y="-28" width="32" height="28" rx="3" fill="#FFF" stroke="#9AA8BE"/><rect x="-16" y="-28" width="32" height="7" fill="#2457A6"/>${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${-12+c*7}" y="${-18+r*6}" width="4" height="3" fill="#C9D3E2"/>`).join("")).join("")}`,
 drops:`<g transform="scale(.7)">${WD.wheat}</g>${[-10,2,12].map((x,i)=>`<path d="M${x} ${-34+i*4}q3 5 0 7q-3-2 0-7z" fill="#5DA8EE"/>`).join("")}`,
 bench:`<path d="M-20 -10h40M-20 -16h40" stroke="#A8743E" stroke-width="4"/><path d="M-16 -10v10M16 -10v10" stroke="#6B4423" stroke-width="3"/>`,
 sunset:`<path d="M-24 0a24 24 0 0 1 48 0z" fill="#F6A05A"/><path d="M-30 0h60" stroke="#5DA8EE" stroke-width="5"/>`,
 washcup:`<path d="M-10 -24h20l-2 18h-16z" fill="#C9D3E2" stroke="#8A94A8"/><path d="M10 -20q8 0 8 6t-8 6" stroke="#8A94A8" stroke-width="2.5" fill="none"/>${[-4,2].map(x=>`<path d="M${x} -4v6" stroke="#5DA8EE" stroke-width="2"/>`).join("")}`,
 stems:`${[-12,0,12].map((x,i)=>`<circle cx="${x}" cy="-10" r="7" fill="${["#C0392B","#E3B84A","#7A4A6E"][i]}"/><path d="M${x} -17q2-6 5-8" stroke="#4E7A34" stroke-width="2" fill="none"/>`).join("")}`,
 house:WD.house.replace('<rect x="-14"','<rect x="-14"'),tent:`<g transform="scale(1.3)">${WD.tent}</g>`
});
function blob(r,seed,pts=14){let s=seed;const rnd=()=>(s=(s*9301+49297)%233280)/233280;const P=[];for(let i=0;i<pts;i++){const a=i/pts*Math.PI*2,rr=r*(0.82+rnd()*0.3);P.push([Math.cos(a)*rr,Math.sin(a)*rr*0.78])}
 let d=`M${((P[pts-1][0]+P[0][0])/2).toFixed(1)} ${((P[pts-1][1]+P[0][1])/2).toFixed(1)}`;for(let i=0;i<pts;i++){const p=P[i],q=P[(i+1)%pts];d+=` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0]+q[0])/2).toFixed(1)} ${((p[1]+q[1])/2).toFixed(1)}`}return d+"z"}
/* map data for each course: lands → territories → plots */
function mapModel(){
 if(CRS.id==="mishnayos"){const P=CRS.units.map(unitProgress),dots=zoomProgress().dots;
  return {title:"Shas Mishnayos",he:"ששה סדרי משנה",W:2100,H:1640,sea:1,lands:SHAS.map(L=>({...L,items:L.m.map(([he,en,n,ic],k)=>({he,en,n,ic,live:L.id==="zeraim"&&k===0,plots:L.id==="zeraim"&&k===0?P.map(p=>p.f):null,dots:L.id==="zeraim"&&k===0?dots:null}))}))}}
 const Z=ZEDATA[CRS.id];if(!Z)return null;const pr=zoomProgress();
 return {title:Z.t,he:Z.he,W:1100,H:900,sea:1,lands:[{id:CRS.id,he:Z.he,en:Z.t,c:worldOf().ground,c2:worldOf().ground2,deco:worldOf().deco,cx:550,cy:460,R:Math.max(300,Z.items.length*40),items:Z.items.map(it=>({he:it.he,en:it.en,n:it.n,ic:it.icon,live:!!it.live,u:it.u,u0:it.u?it.u[0]:0,plots:it.live?(it.u?CRS.units.slice(it.u[0],it.u[1]).map(x=>unitProgress(x).f):pr.plots):null,lbl:it.lbl}))}]}}
