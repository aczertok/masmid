/* ================= MY TOWN: an isometric Jewish town you build with bricks earned by learning ================= */
const TA=34,TB=17;
function shade(hex,f){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;r=Math.round(r*f);g=Math.round(g*f);b=Math.round(b*f);return "#"+((1<<24)+(Math.min(255,r)<<16)+(Math.min(255,g)<<8)+Math.min(255,b)).toString(16).slice(1)}
/* point on the left face (u: 0 left corner → 1 front corner) and right face (u: 0 front → 1 right corner), v = height above ground */
const LF=(u,v,a=TA,b=TB)=>[-a+a*u,b*u-v],RF=(u,v,a=TA,b=TB)=>[a*u,b-b*u-v];
const poly=(pts,fill,extra="")=>`<polygon points="${pts.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ")}" fill="${fill}" ${extra}/>`;
function faceRect(F,u0,u1,v0,v1,fill,extra){return poly([F(u0,v0),F(u1,v0),F(u1,v1),F(u0,v1)],fill,extra)}
function bldg(o){const k=o.k||.82,a=TA*k,b=TB*k,h=o.h||30,w=o.w||"#E7D3AE",rc=o.rc||"#B85A3A";
 const L=(u,v)=>LF(u,v,a,b),Rr=(u,v)=>RF(u,v,a,b);let s="";
 s+=poly([[-a,0],[0,b],[0,b-h],[-a,-h]],w)+poly([[0,b],[a,0],[a,-h],[0,b-h]],shade(w,.82));
 /* windows */
 const rows=o.rows||1,wins=o.wins||2,wc=o.wc||"#FFE29A";
 for(let r=0;r<rows;r++){const v0=10+r*((h-14)/rows),v1=v0+Math.min(9,(h-14)/rows-4);
  for(let i=0;i<wins;i++){const u0=.12+i*(.76/wins),u1=u0+.76/wins*.55;
   s+=faceRect(L,u0,u1,v0,v1,(r+i)%3===1?shade(wc,.85):wc,o.arch?'rx="3"':"");
   s+=faceRect(Rr,1-u1,1-u0,v0,v1,shade(wc,.75))}}
 /* door on left face */
 if(o.door!==false)s+=faceRect(L,.42,.58,0,Math.min(16,h*.5),o.dc||"#6B4A2A");
 /* roof */
 const top=[[-a,-h],[0,-b-h],[a,-h],[0,b-h]];
 if(o.roof==="flat"||o.roof==="dome"||!o.roof){s+=poly(top,o.tc||shade(w,.7));s+=`<path d="M${-a} ${-h}L0 ${b-h}L${a} ${-h}" stroke="${shade(w,.6)}" stroke-width="2" fill="none"/>`}
 if(o.roof==="gable"){const rh=o.rh||16,M1=[-a/2,-h-b/2-rh],M2=[a/2,-h+b/2-rh];s+=poly([M1,M2,[a,-h],[0,-b-h]],shade(rc,.75))+poly([[0,b-h],M2,[a,-h]],shade(w,.75))+poly([[-a,-h],[0,b-h],M2,M1],rc)}
 if(o.roof==="pyramid"){const rh=o.rh||18;s+=poly([[-a,-h],[0,b-h],[0,-h-rh]],rc)+poly([[0,b-h],[a,-h],[0,-h-rh]],shade(rc,.8))}
 if(o.roof==="dome"){const dr=o.dr||a*.55;s+=`<path d="M${-dr} ${-h}a${dr} ${dr*.9} 0 0 1 ${2*dr} 0z" fill="${o.dome||"#3E6FB8"}"/><ellipse cy="${-h}" rx="${dr}" ry="${dr*.3}" fill="${shade(o.dome||"#3E6FB8",.8)}"/>`}
 /* Magen David on top */
 if(o.star){const y=o.roof==="dome"?-h-(o.dr||a*.55)-8:o.roof==="gable"?-h-(o.rh||16)-b/2-10:o.roof==="pyramid"?-h-(o.rh||18)-8:-h-8;
  s+=`<path d="M-5 ${y+3}l5-8 5 8zM-5 ${y-2}l5 8 5-8z" fill="none" stroke="#2457A6" stroke-width="1.6"/>`}
 /* sign above the door, skewed onto the left face */
 if(o.sign){const [sx,sy]=L(.5,Math.min(16,h*.5)+9);const w2=Math.max(26,o.sign.length*7+8);
  s+=`<g transform="translate(${sx.toFixed(1)} ${sy.toFixed(1)}) skewY(26.57)"><rect x="${-w2/2}" y="-7" width="${w2}" height="13" rx="2" fill="${o.sc||"#FFF8E7"}" stroke="rgba(0,0,0,.25)"/><text y="3.5" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="9" fill="${o.st||"#16213A"}">${o.sign}</text></g>`}
 return s+(o.extra||"")}
const flatTile=(fill,extra="")=>poly([[-TA,0],[0,-TB],[TA,0],[0,TB]],fill)+extra;
/* catalog: cat, cost in bricks, req to unlock */
const TOWN_ITEMS=[
 {id:"road",cat:"Streets",n:"Road",cost:1,draw:()=>flatTile("#8E939E",`<path d="M-17 -8.5L17 8.5" stroke="#F4F1E6" stroke-width="1.5" stroke-dasharray="4 4"/>`),flat:1},
 {id:"path",cat:"Streets",n:"Stone path",cost:1,draw:()=>flatTile("#D9CDB4",[[-12,0],[0,-5],[12,0],[0,6],[-4,-1]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="2.5" fill="#BFB295"/>`).join("")),flat:1},
 {id:"tree",cat:"Nature",n:"Tree",cost:3,draw:()=>`<rect x="-2.5" y="-20" width="5" height="20" fill="#6B4423"/><circle cy="-28" r="13" fill="#3E7A34"/><circle cx="-7" cy="-22" r="8" fill="#4A8A3C"/><circle cx="6" cy="-33" r="7" fill="#5A9A48"/>`},
 {id:"palm",cat:"Nature",n:"Palm tree",cost:4,req:{lessons:9},draw:()=>WD.palm},
 {id:"flowers",cat:"Nature",n:"Flower bed",req:{lessons:2},cost:2,draw:()=>flatTile("#7DAE5E",`<g transform="translate(0 2)">${WD.flowers}</g>`)},
 {id:"bench",cat:"Nature",n:"Bench",req:{lessons:3},cost:3,draw:()=>`<path d="M-14 -6l14 7 14-7" stroke="#8A5A2B" stroke-width="4" fill="none"/><path d="M-14 -12l14 7 14-7" stroke="#A8743E" stroke-width="3" fill="none"/><path d="M-12 -5v6M12 -5v6" stroke="#5A3A1A" stroke-width="2"/>`},
 {id:"lamp",cat:"Nature",n:"Street lamp",cost:3,req:{lessons:6},draw:()=>WD.lamp},
 {id:"fountain",cat:"Nature",n:"Fountain",cost:20,req:{xp:900},draw:()=>`<ellipse cy="-2" rx="22" ry="11" fill="#9AA0AE"/><ellipse cy="-4" rx="18" ry="8" fill="#5DA8EE"/><rect x="-3" y="-22" width="6" height="18" fill="#9AA0AE"/><path class="pulse" d="M0 -22q-10 2-12 14M0 -22q10 2 12 14" stroke="#BFE0FF" stroke-width="2" fill="none"/>`},
 {id:"park",cat:"Nature",n:"Playground",cost:25,req:{lessons:14},draw:()=>flatTile("#86B85E",`<path d="M-12 -2v-18M6 -10v-18M-12 -20l18 -8" stroke="#C0392B" stroke-width="2.5"/><path d="M-6 -19v10M0 -22v10" stroke="#5A5A6A" stroke-width="1"/><rect x="-8" y="-9" width="5" height="2" fill="#2457A6"/><path d="M8 -4l10 5" stroke="#E3A312" stroke-width="4" stroke-linecap="round"/>`)},
 {id:"eruv",cat:"Nature",n:"Eruv pole",cost:4,req:{course:"halacha",lessons:4},draw:()=>`<path d="M0 0v-46" stroke="#6B6B6B" stroke-width="2.5"/><path d="M0 -44l-28 14M0 -44l28 14" stroke="#FFFFFF" stroke-width="1" opacity=".9"/>`},
 {id:"sukkah",cat:"Yom Tov",n:"Sukkah",cost:12,req:{siyum:2},draw:()=>bldg({h:20,w:"#F4E6C0",roof:"flat",tc:"#4E7A44",wins:1,door:false,extra:`<path d="M-24 -21l24 11 24 -11" stroke="#6E9A4E" stroke-width="5" fill="none" stroke-linecap="round"/>`})},
 {id:"house",cat:"Homes",n:"Small house",cost:15,draw:()=>bldg({h:24,w:"#E7D3AE",roof:"gable",rc:"#B85A3A",wins:1})},
 {id:"duplex",cat:"Homes",n:"Two-family house",cost:25,req:{lessons:6},draw:()=>bldg({h:34,w:"#F0E2C8",roof:"gable",rc:"#5A6A8A",rows:2,wins:2})},
 {id:"apts",cat:"Homes",n:"Apartment building",cost:45,req:{xp:700},draw:()=>bldg({h:66,w:"#D8D2C4",roof:"flat",rows:4,wins:3,extra:poly([LF(.1,30),LF(.4,30),LF(.4,26),LF(.1,26)],"#8A5A2B")})},
 {id:"villa",cat:"Homes",n:"Villa with sukkah porch",cost:60,req:{xp:2200},draw:()=>bldg({h:30,w:"#FFF8E7",roof:"pyramid",rc:"#C0392B",wins:2,rows:1,k:.95})},
 {id:"shtiebel",cat:"Shuls",n:"Shtiebel",cost:20,draw:()=>bldg({h:26,w:"#E2D2B0",roof:"gable",rc:"#6B4423",wins:2,sign:"שטיבל",star:1})},
 {id:"shul",cat:"Shuls",n:"Big shul",cost:70,req:{lessons:12},draw:()=>bldg({h:52,w:"#E8D8B0",roof:"gable",rc:"#3E5A8A",rh:20,rows:2,wins:2,arch:1,sign:"בית הכנסת",star:1,k:.95})},
 {id:"sefshul",cat:"Shuls",n:"Sefardi beis knesses",cost:60,req:{xp:900},draw:()=>bldg({h:40,w:"#F6F2EA",roof:"dome",dome:"#2E86C1",rows:1,wins:3,arch:1,sign:"בית כנסת",star:1})},
 {id:"kloiz",cat:"Shuls",n:"Chassidish kloiz",cost:50,req:{siyum:2},draw:()=>bldg({h:38,w:"#D9C49A",roof:"pyramid",rc:"#2F6B57",rows:2,wins:2,sign:"קלויז",star:1})},
 {id:"bmedrash",cat:"Shuls",n:"Beis medrash",cost:55,req:{course:"gemara",lessons:5},draw:()=>bldg({h:44,w:"#E7D8B8",roof:"flat",rows:2,wins:3,arch:1,sign:"בית המדרש",star:1,wc:"#FFF0B0"})},
 {id:"cheder",cat:"Learning",n:"Cheder",cost:30,req:{lessons:3},draw:()=>bldg({h:28,w:"#F2E2B8",roof:"gable",rc:"#E3A312",wins:2,sign:"חדר"})},
 {id:"tt",cat:"Learning",n:"Talmud Torah",cost:45,req:{lessons:10},draw:()=>bldg({h:40,w:"#E8E0CC",roof:"flat",rows:2,wins:3,sign:"תלמוד תורה"})},
 {id:"by",cat:"Learning",n:"Bais Yaakov",cost:45,req:{lessons:10},draw:()=>bldg({h:40,w:"#F2E0E4",roof:"flat",rows:2,wins:3,sign:"בית יעקב",wc:"#FFEBC0"})},
 {id:"yeshiva",cat:"Learning",n:"Yeshiva",cost:90,req:{course:"gemara",lessons:12},draw:()=>bldg({h:60,w:"#E0D4B8",roof:"dome",dome:"#8A5A2B",rows:3,wins:3,arch:1,sign:"ישיבה",star:1,k:.95})},
 {id:"kollel",cat:"Learning",n:"Kollel",cost:60,req:{siyum:4},draw:()=>bldg({h:40,w:"#E8DCC0",roof:"gable",rc:"#2457A6",rows:2,wins:2,sign:"כולל"})},
 {id:"library",cat:"Learning",n:"Seforim library",cost:40,req:{xp:600},draw:()=>bldg({h:36,w:"#C9B48A",roof:"flat",rows:2,wins:2,sign:"ספרייה",extra:poly([LF(.15,10),LF(.85,10),LF(.85,12),LF(.15,12)],"#7A2E3A")})},
 {id:"mikvah",cat:"Community",n:"Mikvah",cost:50,req:{course:"halacha",lessons:6},draw:()=>bldg({h:28,w:"#E8EEF4",roof:"flat",wins:2,sign:"מקוה",wc:"#BFE0FF",extra:`<path class="wave" d="M${-TA*.5} ${-34}q4-3 8 0t8 0" stroke="#5DA8EE" stroke-width="2" fill="none"/>`})},
 {id:"gemach",cat:"Community",n:"Gemach",cost:25,req:{badge:"perfect"},draw:()=>bldg({h:24,w:"#F4E6C0",roof:"gable",rc:"#4E9A33",wins:1,sign:"גמ״ח"})},
 {id:"bank",cat:"Community",n:"Bank",cost:50,req:{xp:1200},draw:()=>bldg({h:42,w:"#E6E6E6",roof:"pyramid",rc:"#9AA0AE",rows:2,wins:3,sign:"בנק",extra:[.15,.38,.62,.85].map(u=>faceRect(LF,u-.03,u+.03,0,30,"#FFFFFF")).join("")})},
 {id:"hatzolah",cat:"Community",n:"Hatzolah station",cost:40,req:{lessons:16},draw:()=>bldg({h:28,w:"#F4F4F4",roof:"flat",wins:2,sign:"הצלה",sc:"#D32F2F",st:"#FFFFFF",extra:`<g transform="translate(20 4)"><rect x="-10" y="-12" width="20" height="10" rx="2" fill="#FFFFFF" stroke="#D32F2F"/><path d="M-4 -7h8M0 -11v8" stroke="#D32F2F" stroke-width="2"/></g>`})},
 {id:"hall",cat:"Community",n:"Simcha hall",cost:70,req:{siyum:3},draw:()=>bldg({h:36,w:"#F6EAD8",roof:"gable",rc:"#7D5CC0",rows:1,wins:3,arch:1,sign:"אולם שמחות",k:.95})},
 {id:"gym",cat:"Community",n:"Gym",cost:40,req:{streak:5},draw:()=>bldg({h:30,w:"#D8E4F0",roof:"flat",wins:3,sign:"כושר",extra:`<g transform="translate(-6 -38)"><rect x="-8" y="-1.5" width="16" height="3" fill="#3A3F52"/><rect x="-11" y="-5" width="4" height="10" rx="1" fill="#3A3F52"/><rect x="7" y="-5" width="4" height="10" rx="1" fill="#3A3F52"/></g>`})},
 {id:"cityhall",cat:"Community",n:"Town hall",cost:100,req:{siyum:6},draw:()=>bldg({h:56,w:"#EDE4D0",roof:"dome",dome:"#C9A34A",rows:2,wins:3,arch:1,sign:"עירייה",k:1})},
 {id:"bakery",cat:"Shops",n:"Bakery",cost:20,req:{lessons:4},draw:()=>bldg({h:24,w:"#F4D8A8",roof:"gable",rc:"#C98A20",wins:1,sign:"מאפייה",extra:`<path d="M10 -40v-10h6v10" fill="#9AA0AE"/>`})},
 {id:"grocery",cat:"Shops",n:"Kosher grocery",cost:25,req:{lessons:5},draw:()=>bldg({h:24,w:"#E0EED8",roof:"flat",wins:2,sign:"מכולת"})},
 {id:"pizza",cat:"Shops",n:"Pizza shop",cost:25,req:{lessons:8},draw:()=>bldg({h:24,w:"#F8E0C8",roof:"flat",wins:2,sign:"פיצה",sc:"#C0392B",st:"#FFFFFF"})},
 {id:"judaica",cat:"Shops",n:"Seforim & Judaica",cost:30,req:{xp:500},draw:()=>bldg({h:26,w:"#E8E0F2",roof:"gable",rc:"#5A3A8A",wins:2,sign:"יודאיקה"})},
 {id:"butcher",cat:"Shops",n:"Kosher butcher",cost:25,req:{lessons:11},draw:()=>bldg({h:24,w:"#F2E2E2",roof:"flat",wins:2,sign:"אטליז"})},
 {id:"wine",cat:"Shops",n:"Wine store",cost:30,req:{xp:1000},draw:()=>bldg({h:24,w:"#EADBE8",roof:"gable",rc:"#6A1B4A",wins:2,sign:"יין"})}
 /* ---- more homes ---- */
 ,{id:"cottage",cat:"Homes",n:"Cottage",cost:12,req:{lessons:2},draw:()=>bldg({h:20,w:"#F4E6C0",roof:"gable",rc:"#4E7A44",wins:1,k:.7})},
 {id:"rowhouses",cat:"Homes",n:"Row houses",cost:40,req:{lessons:9},draw:()=>bldg({h:34,w:"#E8C9A8",roof:"gable",rc:"#7A3A2A",rows:2,wins:3,k:.98})},
 {id:"brownstone",cat:"Homes",n:"Brownstone with stoop",cost:55,req:{xp:800},draw:()=>bldg({h:50,w:"#8A5A4A",roof:"flat",rows:3,wins:2,wc:"#FFE6A8",extra:poly([LF(.38,0),LF(.62,0),LF(.62,8),LF(.38,8)],"#6A4A3A")})},
 {id:"garden",cat:"Homes",n:"Garden apartments",cost:70,req:{siyum:2},draw:()=>bldg({h:40,w:"#F2EEE4",roof:"flat",tc:"#6AAA4E",rows:2,wins:3})},
 {id:"tower",cat:"Homes",n:"Tall apartment tower",cost:140,req:{xp:2400},draw:()=>bldg({h:110,w:"#D8DEE8",roof:"flat",rows:8,wins:3,k:.85})},
 {id:"mansion",cat:"Homes",n:"Big family home",cost:120,req:{xp:3200},draw:()=>bldg({h:40,w:"#FFF8E7",roof:"pyramid",rc:"#3E5A8A",rows:2,wins:3,k:1})},
 /* ---- more shuls ---- */
 {id:"shtieblach",cat:"Shuls",n:"Shtieblach (many minyanim)",cost:90,req:{lessons:25},draw:()=>bldg({h:44,w:"#E2D2B0",roof:"flat",rows:3,wins:4,sign:"שטיבלך",star:1,k:1})},
 {id:"teimani",cat:"Shuls",n:"Teimani beis knesses",cost:70,req:{xp:1100},draw:()=>bldg({h:34,w:"#FAF7F0",roof:"flat",rows:1,wins:3,arch:1,sign:"בית כנסת",star:1,wc:"#BFE0FF"})},
 {id:"grand",cat:"Shuls",n:"Grand synagogue",cost:220,req:{xp:3000},draw:()=>bldg({h:64,w:"#E8C9A0",roof:"gable",rc:"#8A3A2A",rh:22,rows:3,wins:3,arch:1,sign:"בית הכנסת הגדול",star:1,k:1,extra:`${[-30,30].map(x=>`<rect x="${x-5}" y="-96" width="10" height="34" fill="#C9A070"/><ellipse cx="${x}" cy="-98" rx="8" ry="10" fill="#2F6B57"/>`).join("")}`})},
 /* ---- more learning ---- */
 {id:"gan",cat:"Learning",n:"Gan (preschool)",cost:35,req:{lessons:8},draw:()=>bldg({h:24,w:"#FFF0C8",roof:"gable",rc:"#E57373",wins:2,sign:"גן",extra:`<circle cx="-14" cy="-30" r="4" fill="#64B5F6"/><circle cx="-6" cy="-34" r="4" fill="#FFD54F"/>`})},
 {id:"seminary",cat:"Learning",n:"Seminary",cost:90,req:{siyum:3},draw:()=>bldg({h:48,w:"#F2E8F0",roof:"flat",rows:3,wins:3,sign:"סמינר"})},
 {id:"dorm",cat:"Learning",n:"Yeshiva dormitory",cost:100,req:{xp:1600},draw:()=>bldg({h:58,w:"#E8DCC8",roof:"flat",rows:4,wins:3,sign:"פנימייה"})},
 /* ---- more community ---- */
 {id:"bikur",cat:"Community",n:"Bikur cholim house",cost:45,req:{lessons:12},draw:()=>bldg({h:26,w:"#F4ECE0",roof:"gable",rc:"#C0392B",wins:2,sign:"ביקור חולים"})},
 {id:"hospital",cat:"Community",n:"Hospital",cost:180,req:{xp:2200},draw:()=>bldg({h:70,w:"#F4F6F8",roof:"flat",rows:5,wins:3,k:1,sign:"בית חולים",extra:`<path d="M-5 -82l5-8 5 8zM-5 -86l5 8 5-8z" fill="#D32F2F"/>`})},
 {id:"fire",cat:"Community",n:"Fire station",cost:70,req:{xp:900},draw:()=>bldg({h:30,w:"#C0392B",roof:"flat",wins:2,sign:"כבאות",dc:"#F4F4F4"})},
 {id:"post",cat:"Community",n:"Post office",cost:40,req:{lessons:10},draw:()=>bldg({h:26,w:"#E8E0C8",roof:"flat",wins:2,sign:"דואר",sc:"#E3A312"})},
 {id:"sofer",cat:"Community",n:"Sofer STaM",cost:45,req:{course:"mishnayos",lessons:12},draw:()=>bldg({h:24,w:"#F4EAD4",roof:"gable",rc:"#5A3A22",wins:1,sign:"סופר סת״ם"})},
 {id:"matzah",cat:"Community",n:"Matzah bakery",cost:55,req:{siyum:2},draw:()=>bldg({h:26,w:"#EADAB8",roof:"gable",rc:"#8A5A2B",wins:2,sign:"מצות",extra:`<path d="M12 -44v-12h7v10" fill="#9AA0AE"/><circle class="mnote" cx="16" cy="-62" r="4" fill="#C9C3D8" opacity=".6"/>`})},
 {id:"shatnez",cat:"Community",n:"Shatnez lab",cost:40,req:{xp:1100},draw:()=>bldg({h:24,w:"#E4E8F4",roof:"flat",wins:2,sign:"שעטנז"})},
 {id:"pantry",cat:"Community",n:"Tomchei Shabbos",cost:50,req:{lessons:20},draw:()=>bldg({h:26,w:"#F4E6C0",roof:"gable",rc:"#2F6B57",wins:2,sign:"תומכי שבת"})},
 {id:"oldage",cat:"Community",n:"Home for the elderly",cost:90,req:{xp:1800},draw:()=>bldg({h:40,w:"#F2EEE4",roof:"pyramid",rc:"#7A5A3A",rows:2,wins:3,sign:"בית אבות"})},
 {id:"keilim",cat:"Community",n:"Keilim mikvah",cost:30,req:{course:"halacha",lessons:8},draw:()=>flatTile("#D9CDB4",`<ellipse cy="0" rx="18" ry="9" fill="#9AA0AE"/><ellipse cy="-1" rx="14" ry="6" fill="#5DA8EE"/><path d="M-6 -10h12l-2 6h-8z" fill="#C9D3E2"/>`)},
 {id:"station",cat:"Community",n:"Train station",cost:200,req:{xp:2800},draw:()=>bldg({h:36,w:"#D8C8A8",roof:"gable",rc:"#3A3F52",rows:1,wins:4,arch:1,k:1,sign:"רכבת",extra:`<path d="M-34 14l34 17 34-17" stroke="#5A5A6A" stroke-width="3" fill="none"/>`})},
 {id:"watertower",cat:"Community",n:"Water tower",cost:45,req:{xp:700},draw:()=>`<path d="M-10 0l4-40M10 0l-4-40M-8 -14h16M-7 -26h14" stroke="#6B6B6B" stroke-width="2.5"/><ellipse cy="-52" rx="16" ry="14" fill="#5DA8EE"/><ellipse cy="-62" rx="10" ry="4" fill="#BFE0FF"/>`},
 {id:"clock",cat:"Community",n:"Clock tower",cost:110,req:{siyum:5},draw:()=>bldg({h:84,w:"#E0D0B0",roof:"pyramid",rc:"#3A3F52",rh:20,rows:1,wins:1,k:.6,extra:`<circle cx="-10" cy="-70" r="7" fill="#FFF8E7" stroke="#3A3F52"/><path d="M-10 -70v-5M-10 -70h4" stroke="#3A3F52" stroke-width="1.4"/>`})},
 /* ---- more shops ---- */
 {id:"supermarket",cat:"Shops",n:"Kosher supermarket",cost:80,req:{xp:900},draw:()=>bldg({h:30,w:"#E8F0E0",roof:"flat",wins:4,k:1,sign:"סופר כשר",sc:"#2F6B57",st:"#FFFFFF"})},
 {id:"fish",cat:"Shops",n:"Fish store",cost:30,req:{lessons:9},draw:()=>bldg({h:24,w:"#DCEAF4",roof:"flat",wins:2,sign:"דגים"})},
 {id:"icecream",cat:"Shops",n:"Ice cream shop",cost:30,req:{streak:5},draw:()=>bldg({h:24,w:"#FCE4EC",roof:"gable",rc:"#F48FB1",wins:2,sign:"גלידה"})},
 {id:"coffee",cat:"Shops",n:"Coffee shop",cost:30,req:{lessons:11},draw:()=>bldg({h:24,w:"#E8D8C8",roof:"flat",wins:2,sign:"קפה",sc:"#5A3A22",st:"#FFFFFF"})},
 {id:"clothing",cat:"Shops",n:"Clothing store",cost:40,req:{xp:700},draw:()=>bldg({h:28,w:"#F0E8F4",roof:"flat",wins:2,sign:"בגדים"})},
 {id:"shoes",cat:"Shops",n:"Shoe store",cost:35,req:{xp:750},draw:()=>bldg({h:24,w:"#EDE4D8",roof:"flat",wins:2,sign:"נעליים"})},
 {id:"toys",cat:"Shops",n:"Toy store",cost:40,req:{lessons:16},draw:()=>bldg({h:24,w:"#FFF4C8",roof:"gable",rc:"#64B5F6",wins:2,sign:"צעצועים"})},
 {id:"florist",cat:"Shops",n:"Florist",cost:30,req:{streak:7},draw:()=>bldg({h:22,w:"#F4F8EC",roof:"gable",rc:"#BA68C8",wins:2,sign:"פרחים",extra:`<g transform="translate(-16 6) scale(.7)">${WD.flowers}</g>`})},
 {id:"pharmacy",cat:"Shops",n:"Pharmacy",cost:45,req:{xp:1300},draw:()=>bldg({h:26,w:"#EAF4EA",roof:"flat",wins:2,sign:"בית מרקחת"})},
 /* ---- parks and sports ---- */
 {id:"pond",cat:"Parks",n:"Duck pond",cost:30,req:{xp:500},draw:()=>flatTile("#86B85E",`<ellipse cy="0" rx="24" ry="11" fill="#5DA8EE"/><g class="drift"><ellipse cx="-4" cy="-2" rx="4" ry="2.5" fill="#FFFFFF"/><circle cx="-1" cy="-5" r="2" fill="#2F6B57"/></g>`)},
 {id:"ballfield",cat:"Parks",n:"Ball field",cost:45,req:{streak:4},draw:()=>flatTile("#6AAA4E",`<path d="M-24 0L0 -12 24 0 0 12z" fill="none" stroke="#FFFFFF" stroke-width="1.5"/><circle r="4" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>`)},
 {id:"court",cat:"Parks",n:"Basketball court",cost:40,req:{lessons:12},draw:()=>flatTile("#C97A4A",`<path d="M-20 0L0 -10 20 0 0 10z" fill="none" stroke="#FFFFFF" stroke-width="1.2"/><path d="M16 -2v-20" stroke="#5A5A6A" stroke-width="2"/><rect x="12" y="-26" width="8" height="6" fill="#FFFFFF" stroke="#5A5A6A"/>`)},
 {id:"cgarden",cat:"Parks",n:"Community garden",cost:25,req:{course:"chumash",lessons:5},draw:()=>flatTile("#8A6A3A",`<g transform="translate(0 4) scale(.8)">${WD.veg}</g>`)},
 {id:"picnic",cat:"Parks",n:"Picnic table",cost:8,req:{lessons:3},draw:()=>WD.table2},
 {id:"gazebo",cat:"Parks",n:"Gazebo",cost:40,req:{xp:800},draw:()=>`<path d="M-18 0v-22M18 0v-22M0 9v-22M0 -9v-22" stroke="#F4F1E6" stroke-width="3"/><path d="M-24 -22l24-16 24 16-24 12z" fill="#A8743E"/>`},
 {id:"oak",cat:"Parks",n:"Big old tree",cost:10,req:{lessons:7},draw:()=>`<rect x="-4" y="-26" width="8" height="26" fill="#6B4423"/><circle cy="-40" r="20" fill="#3E7A34"/><circle cx="-12" cy="-30" r="12" fill="#4A8A3C"/><circle cx="12" cy="-34" r="13" fill="#4A8A3C"/>`},
 {id:"hedge",cat:"Parks",n:"Hedge",cost:2,req:{lessons:2},draw:()=>`<path d="M-26 -2l26 13 26-13-26-13z" fill="#4E8A3A"/><path d="M-26 -2v-8l26 13v8zM26 -2v-8l-26 13v8z" fill="#3E7A34"/>`},
 {id:"menorahart",cat:"Parks",n:"Menorah sculpture",cost:60,req:{siyum:2},draw:()=>`<rect x="-14" y="-4" width="28" height="6" fill="#9AA0AE"/><path d="M0 -4v-34" stroke="#C9A34A" stroke-width="3"/>${[8,16,24].map(r=>`<path d="M${-r} -38q0 ${r} ${r} ${r}q${r} 0 ${r} ${-r}" stroke="#C9A34A" stroke-width="2.5" fill="none"/>`).join("")}`},
 /* ---- Yom Tov ---- */
 {id:"chanukiah",cat:"Yom Tov",n:"Giant chanukiah",cost:50,req:{xp:900},draw:()=>`<rect x="-2" y="-40" width="4" height="40" fill="#C9A34A"/><path d="M-26 -40h52" stroke="#C9A34A" stroke-width="3"/>${[-24,-18,-12,-6,6,12,18,24,0].map((x,i)=>`<path class="flame" style="transform-origin:${x}px -44px" d="M${x} ${i===8?-56:-50}c3 4 3 6 0 8-3-2-3-4 0-8z" fill="#F4A51C"/>`).join("")}<rect x="-3" y="-50" width="6" height="10" fill="#C9A34A"/>`},
 {id:"bonfire",cat:"Yom Tov",n:"Lag BaOmer bonfire",cost:20,req:{streak:6},draw:()=>`<path d="M-14 0l28-8M-14 -8l28 8" stroke="#6B4423" stroke-width="4"/>${[0,1,2].map(i=>`<path class="flame" style="transform-origin:${-8+i*8}px -4px;animation-delay:${i*.2}s" d="M${-8+i*8} -4c-6-8-4-16 0-24 4 8 6 16 0 24z" fill="${i%2?"#F4A51C":"#F46A1C"}"/>`).join("")}`},
 {id:"purim",cat:"Yom Tov",n:"Mishloach manos stand",cost:25,req:{lessons:18},draw:()=>`<path d="M-18 0v-18h36v18" fill="#F4E6C0"/><path d="M-22 -18h44l-6-10h-32z" fill="#7D5CC0"/>${[-10,0,10].map((x,i)=>`<rect x="${x-4}" y="-14" width="8" height="8" fill="${["#E57373","#FFD54F","#64B5F6"][i]}"/>`).join("")}`},
 {id:"flags",cat:"Yom Tov",n:"Simchas Torah arch",cost:40,req:{siyum:3},draw:()=>`<path d="M-24 0v-34q24-20 48 0v34" stroke="#2457A6" stroke-width="3" fill="none"/>${[-18,-8,2,12].map((x,i)=>`<path d="M${x} -34l8 2-8 4z" fill="${["#E57373","#FFD54F","#64B5F6","#81C784"][i]}"/>`).join("")}`},
 /* ---- vehicles ---- */
 {id:"car",cat:"Streets",n:"Car",cost:15,req:{xp:400},draw:()=>`<path d="M-16 -2l16 8 16-8-16-8z" fill="#3E6FB8"/><path d="M-16 -2v-6l16 8v6zM16 -2v-6l-16 8v6z" fill="#2E5A98"/><path d="M-8 -10l8 4 8-4-8-4z" fill="#BFE0FF"/>`},
 {id:"bus",cat:"Streets",n:"School bus",cost:30,req:{lessons:13},draw:()=>`<path d="M-24 -2l16 8 24-12-16-8z" fill="#F4B400"/><path d="M-24 -2v-12l16 8v12zM16 -14v-12 l-24 12v12z" fill="#E0A000"/><path d="M-22 -10l12 6M-4 -2l16-8" stroke="#BFE0FF" stroke-width="3"/>`},
 {id:"crosswalk",cat:"Streets",n:"Crosswalk",cost:2,req:{lessons:5},draw:()=>flatTile("#8E939E",[-12,-4,4,12].map(x=>`<path d="M${x-4} ${x/2-2}l8 4" stroke="#FFFFFF" stroke-width="3"/>`).join("")),flat:1}

];
const TCATS=["Homes","Shuls","Learning","Community","Shops","Parks","Yom Tov","Nature","Streets"];
function townSize(){return Math.min(32,5+levelOf(S.xp).lv+2*(town().ext||0))}
const expandCost=()=>Math.round(60*Math.pow((town().ext||0)+1,1.35));
const TTITLES=[[0,"Shtetl","שטעטל"],[10,"Kehillah","קהילה"],[25,"Town","עיירה"],[50,"City","עיר"],[90,"Ir V'Em B'Yisrael","עיר ואם בישראל"]];
function townTitle(){const n=town().items.filter(it=>{const t=TOWN_ITEMS.find(x=>x.id===it.k);return t&&!t.flat&&t.cat!=="Nature"}).length;let r=TTITLES[0];TTITLES.forEach(t=>{if(n>=t[0])r=t});return {n,t:r}}
function town(){S.town=S.town||{items:[],name:""};if(!Array.isArray(S.town.items))S.town.items=[];return S.town}
function bricksUsed(){return town().items.reduce((a,it)=>{const t=TOWN_ITEMS.find(x=>x.id===it.k);return a+(t?t.cost:0)},0)}
function bricks(){return Math.max(0,S.xp-bricksUsed()-(town().land||0))}
let TP=null,townZoom=1; /* TP: placing {k, from:index|null} */
function townSVG(){const N=townSize(),T=town();const occ={};T.items.forEach((it,i)=>{if(it.x<N&&it.y<N)occ[it.x+","+it.y]=i});
 const W=N*TA*2+40,H=N*TB*2+160,ox=W/2,oy=130;let ground="",items=[];
 for(let x=0;x<N;x++)for(let y=0;y<N;y++){const cx=(x-y)*TA,cy=(x+y)*TB,free=occ[x+","+y]==null;
  ground+=`<g transform="translate(${cx} ${cy})">${poly([[-TA,0],[0,-TB],[TA,0],[0,TB]],(x+y)%2?"#8DBF5A":"#86B755","stroke=\"rgba(0,0,0,.06)\"")}${TP&&free?`<polygon class="tfree" data-t="${x},${y}" points="${-TA},0 0,${-TB} ${TA},0 0,${TB}"/>`:""}</g>`}
 T.items.forEach((it,i)=>{if(it.x>=N||it.y>=N)return;const t=TOWN_ITEMS.find(z=>z.id===it.k);if(!t)return;items.push({d:it.x+it.y+(t.flat?-.5:0),s:`<g class="titem ${TP&&TP.from===i?"lift":""}" data-i="${i}" transform="translate(${(it.x-it.y)*TA} ${(it.x+it.y)*TB})">${t.draw()}</g>`})});
 /* people walking on the roads — they match your profile */
 const roads=new Set(T.items.filter(it=>(it.k==="road"||it.k==="path"||it.k==="crosswalk")&&it.x<N&&it.y<N).map(it=>it.x+","+it.y));
 const rl=[...roads];let seed=rl.length*7+3;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
 for(let k=0;k<Math.min(8,Math.floor(rl.length/2));k++){let cur=rl[Math.floor(rnd()*rl.length)];const chain=[cur];
  for(let st=0;st<6;st++){const [x,y]=cur.split(",").map(Number);const nb=[[x+1,y],[x-1,y],[x,y+1],[x,y-1]].map(p=>p.join(",")).filter(p=>roads.has(p)&&!chain.includes(p));if(!nb.length)break;cur=nb[Math.floor(rnd()*nb.length)];chain.push(cur)}
  if(chain.length<2)continue;const pts=[...chain,...chain.slice(0,-1).reverse()].map(p=>{const [x,y]=p.split(",").map(Number);return `${(x-y)*TA} ${(x+y)*TB}`});
  const look=avClean({base:profile()||"man",top:Math.floor(rnd()*10),head:"",hair:Math.floor(rnd()*3),skin:Math.floor(rnd()*5),beard:["none","short","full"][Math.floor(rnd()*3)]});
  items.push({d:999,s:`<g><animateTransform attributeName="transform" type="translate" values="${pts.join(";")}" dur="${pts.length*2.2}s" repeatCount="indefinite"/><g transform="scale(.32)"><g class="hop">${avatar(look)}</g></g></g>`})}
 items.sort((a,b)=>a.d-b.d);
 /* me, standing at the town center */
 const me=`<g transform="translate(0 ${2*(N-1)*TB+10}) scale(.6)"><g class="bob">${avatar(myAvatar())}</g></g>`;
 const side=`${poly([[-N*TA,(N-1)*TB],[0,(2*N-1)*TB],[0,(2*N-1)*TB+14],[-N*TA,(N-1)*TB+14]],"#7A5A3A")}${poly([[0,(2*N-1)*TB],[N*TA,(N-1)*TB],[N*TA,(N-1)*TB+14],[0,(2*N-1)*TB+14]],"#5A3E22")}`;
 const hr=now().getHours(),night=hr>=19||hr<6;
 return `<svg class="townsvg${night?" night":""}" viewBox="${-ox} ${-oy} ${W} ${H}" style="width:${Math.round(W*townZoom)}px">
  ${[0,1,2].map(i=>`<g transform="translate(${-W/2+60+i*W/3} ${-oy+30+i*14})">${WD.cloud}</g>`).join("")}
  ${night?`<g>${Array.from({length:30},(_,k)=>`<circle class="tw" cx="${-W/2+((k*97)%W)}" cy="${-oy+((k*53)%110)}" r="1.4" fill="#FFF"/>`).join("")}<circle cx="${W/2-60}" cy="${-oy+40}" r="14" fill="#F7E7AE"/></g>`:""}
  ${side}<g transform="translate(0 0)">${ground}${items.map(x=>x.s).join("")}${me}</g>${night?`<rect x="${-ox}" y="${-oy}" width="${W}" height="${H}" fill="#0A1636" opacity=".32" pointer-events="none"/>`:""}</svg>`}
function townView(){const T=town(),N=townSize(),b=bricks(),st=avStats();const next=TOWN_ITEMS.filter(t=>!reqMet(t.req,st)).sort((x,y)=>(x.req.xp||0)-(y.req.xp||0))[0];
 return `<main class="wrap stack"><section class="card townhead"><div class="th-me" id="avOpen">${avatarSVG(myAvatar(),"me")}</div><div class="th-t"><small>My town</small><h2>${esc(T.name||((S.settings.name?S.settings.name+"'s ":"")+"Town"))}</h2>
  <p><span class="ttl">${townTitle().t[1]}</span> <span class="he" dir="rtl">${townTitle().t[2]}</span> · ${townTitle().n} buildings</p><p><b class="brick">${b}</b> bricks · ${N}×${N} plots</p></div></section>
  ${TP?`<div class="tplace"><span>${TP.from!=null?"Tap a free plot to move it":"Tap a free plot to build your "+esc(TOWN_ITEMS.find(t=>t.id===TP.k).n)}</span><button class="btn ghost" id="tcancel">Cancel</button></div>`:""}
  <div class="townwrap" id="townwrap">${townSVG()}</div>
  <div class="tbar"><button class="btn" id="tbuild">${I.plus||"+"} Build</button><button class="iconbtn" id="tzo" aria-label="Zoom out">−</button><button class="iconbtn" id="tzi" aria-label="Zoom in">+</button><button class="btn ghost" id="texp">Expand land · ${expandCost()}</button></div>
  <section class="card"><h3>How it works</h3><p class="small">Every XP you earn learning is a brick. Spend bricks on shuls, schools, a mikvah, shops and homes, and place them anywhere on your plots. Your town grows as your level goes up, and you can buy more land anytime. Build roads and people will walk along them. The more you build, the bigger your title: Shtetl, Kehillah, Town, City. Removing a building gives back all its bricks.${next?` Next to unlock: <b>${esc(next.n)}</b> at ${esc(reqText(next.req))}.`:""}</p></section></main>`}
function buildSheet(cat){cat=cat||"Homes";const st=avStats(),b=bricks();
 sheet(`<h3>Build</h3><p class="sub"><b class="brick">${b}</b> bricks</p><div class="avs-tabs">${TCATS.map(c=>`<button data-tc="${c}" aria-pressed="${c===cat}">${c}</button>`).join("")}</div>
 <div class="avs-grid tgrid">${TOWN_ITEMS.filter(t=>t.cat===cat).map(t=>{const ok=reqMet(t.req,st),afford=b>=t.cost;
  return `<button class="avo ${ok?"":"locked"}" data-tk="${t.id}"><svg viewBox="-40 -80 80 100" aria-hidden="true">${t.draw()}</svg><small>${esc(t.n)}</small><em class="cost ${afford?"":"short"}">${t.cost} bricks</em>${ok?"":`<em>${I.lock}${esc(reqText(t.req))}</em>`}</button>`}).join("")}</div>`,()=>{
  document.querySelectorAll("[data-tc]").forEach(x=>x.onclick=()=>buildSheet(x.dataset.tc));
  document.querySelectorAll("[data-tk]").forEach(x=>x.onclick=()=>{const t=TOWN_ITEMS.find(z=>z.id===x.dataset.tk);
   if(!reqMet(t.req)){toast("Unlocks with "+reqText(t.req));return}if(bricks()<t.cost){toast(`You need ${t.cost-bricks()} more bricks. Keep learning!`);return}
   TP={k:t.id,from:null};closeSheet();render()})})}
function itemSheet(i){const it=town().items[i],t=TOWN_ITEMS.find(z=>z.id===it.k);
 sheet(`<div class="avs-prev"><svg viewBox="-40 -80 80 100" style="width:90px" aria-hidden="true">${t.draw()}</svg><div><h3>${esc(t.n)}</h3><p class="sub">Built for ${t.cost} bricks.</p></div></div>
  <div class="row2"><button class="btn" id="tmove">Move</button><button class="btn ghost" id="tdel">Remove (+${t.cost} bricks)</button></div>`,()=>{
  $("#tmove").onclick=()=>{TP={k:it.k,from:i};closeSheet();render()};
  $("#tdel").onclick=()=>{town().items.splice(i,1);save();closeSheet();toast(`${t.n} removed`);render()}})}
function bindTown(){const w=$("#townwrap");if(!w)return;
 if(!bindTown.centered){bindTown.centered=1}
 requestAnimationFrame(()=>{w.scrollLeft=(w.scrollWidth-w.clientWidth)/2});
 w.querySelectorAll("[data-t]").forEach(p=>p.onclick=e=>{e.stopPropagation();const [x,y]=p.dataset.t.split(",").map(Number);const T=town();
  if(TP.from!=null){const it=T.items[TP.from];it.x=x;it.y=y}else{const t=TOWN_ITEMS.find(z=>z.id===TP.k);if(bricks()<t.cost){toast("Not enough bricks");return}T.items.push({k:TP.k,x,y});toast(`${t.n} built!`)}
  const keepRoad=TP.from==null&&(TP.k==="road"||TP.k==="path")&&bricks()>=1;TP=keepRoad?TP:null;save();render()});
 if(!TP)w.querySelectorAll("[data-i]").forEach(g=>g.onclick=()=>itemSheet(+g.dataset.i));
 const c=$("#tcancel");if(c)c.onclick=()=>{TP=null;render()};
 $("#tbuild").onclick=()=>buildSheet();
 $("#texp").onclick=()=>{const c=expandCost();if(townSize()>=32){toast("Your town is as big as it gets!");return}if(bricks()<c){toast(`Expanding needs ${c} bricks. You have ${bricks()}.`);return}const T=town();T.ext=(T.ext||0)+1;T.land=(T.land||0)+c;save();toast("New land added on every side!");render()};$("#avOpen").onclick=avatarStudio;
 $("#tzi").onclick=()=>{townZoom=Math.min(2.2,townZoom*1.25);render()};$("#tzo").onclick=()=>{townZoom=Math.max(.5,townZoom/1.25);render()}}
