/* ================= AVATARS: unlockable, modest, built from parts ================= */
const AV_SKIN=["#F7D7B5","#F2C9A0","#E0AC7E","#C68B5E","#8D5A3B"];
const AV_HAIR=["#2B1D14","#5A3A22","#8A5A2B","#C9A35A","#B5562F","#9A9A9A","#E8E8E8"];
const AV_TOP=["#1F2433","#2F3A55","#3E4A3A","#5A3A3A","#2457A6","#7D5CC0","#2F6B57","#8A5A2B","#C0392B","#E3A312"];
/* more clothing and hair colours (ids are positions, so new colours are only ever added at the end) */
AV_TOP.push("#0E3B5C","#1B5E8A","#3D7EB8","#5C9BD1","#14532D","#1F7A4D","#3FA36B","#6E8B3D","#4A3B2A","#6B4E31","#8C6A45","#B08A5A","#5E2129","#8E2F3C","#B5475A","#D9707F","#3B2A5A","#55407D","#7A63A8","#2F2F2F","#4A4A4A","#6E6E6E","#9E9E9E","#D9D4C7","#F2EEE4","#0F5257","#178A8F","#E07A1F","#C9A23A","#7D4E9E","#1C2E4A","#2B4D6E","#5A6E7D","#7A5C3E","#A0522D","#C65D3B","#8F9779","#556B2F","#264D3F","#3C1F2E");
AV_HAIR.push("#3B2A20","#6E4630","#A0703C","#D8B26E","#7A2E1A","#4A4A4A","#2E2E3A");
/* req: {xp}, {lessons}, {streak}, {siyum}, {badge}, {course,lessons} — all count learning done */
const PROFILES={man:"Men",woman:"Women",boy:"Boys",girl:"Girls"};
const PROFILE_ONE={man:"Man",woman:"Woman",boy:"Boy",girl:"Girl"};
function profile(){return catOf(curP())}
/* req: {xp}, {lessons}, {streak}, {siyum}, {badge}, {course,lessons} — all count learning done. Most things start locked. */
const AVO={
 base:[{id:"man",n:"Man"},{id:"woman",n:"Woman"},{id:"boy",n:"Boy"},{id:"girl",n:"Girl"}],
 head:[
  {id:"kip",n:"Black kippah",for:"mb"},{id:"kipk",n:"Knitted kippah",for:"mb",req:{lessons:6}},{id:"kipw",n:"White kippah",for:"mb",req:{lessons:14}},
  {id:"cap",n:"Cap",for:"mb",req:{streak:5}},{id:"fedora",n:"Black hat",for:"m",req:{xp:400}},{id:"bors",n:"Wide-brim hat",for:"m",req:{xp:1200}},
  {id:"shtreimel",n:"Shtreimel",for:"m",req:{siyum:4}},{id:"spodik",n:"Spodik",for:"m",req:{siyum:7}},{id:"bfedora",n:"Bar mitzvah hat",for:"b",req:{siyum:3}},
  {id:"sh_bob",n:"Short sheitel",for:"w"},{id:"sh_long",n:"Long sheitel",for:"w",req:{lessons:6}},{id:"sh_wave",n:"Wavy sheitel",for:"w",req:{xp:600}},
  {id:"tichel",n:"Tichel",for:"w",req:{lessons:14}},{id:"snood",n:"Snood",for:"w",req:{streak:5}},{id:"what",n:"Hat",for:"w",req:{siyum:2}},{id:"beret",n:"Beret",for:"w",req:{xp:1200}},
  {id:"pony",n:"Ponytail",for:"g"},{id:"braid",n:"Braid",for:"g",req:{lessons:6}},{id:"band",n:"Headband",for:"g",req:{xp:400}},{id:"bow",n:"Hair bow",for:"g",req:{streak:5}}],
 beard:[{id:"none",n:"No beard"},{id:"stub",n:"Stubble",req:{lessons:8}},{id:"short",n:"Short beard",req:{xp:500}},{id:"full",n:"Full beard",req:{siyum:3}},{id:"long",n:"Long beard",req:{xp:2500}}],
 peyos:[{id:"none",n:"Tucked"},{id:"short",n:"Short peyos",req:{lessons:5}},{id:"curl",n:"Curly peyos",req:{streak:7}},{id:"long",n:"Long peyos",req:{siyum:3}}],
 eyes:[{id:"none",n:"No glasses"},{id:"round",n:"Round glasses",req:{lessons:10}},{id:"square",n:"Square glasses",req:{xp:800}}],
 item:[{id:"none",n:"Nothing"},{id:"sefer",n:"Sefer",req:{lessons:4}},{id:"siddur",n:"Siddur",req:{lessons:8}},{id:"tzedakah",n:"Tzedakah box",req:{badge:"perfect"}},
  {id:"mishnayos",n:"Mishnayos",req:{course:"mishnayos",lessons:10}},{id:"chumash",n:"Chumash",req:{course:"chumash",lessons:8}},{id:"gemara",n:"Gemara",for:"mb",req:{course:"gemara",lessons:8}},
  {id:"tefillin",n:"Tefillin",for:"m",req:{course:"halacha",lessons:6}},{id:"candles",n:"Shabbos candles",for:"wg",req:{badge:"shabbos"}},{id:"challah",n:"Challah",for:"wg",req:{lessons:15}},
  {id:"kiddush",n:"Kiddush cup",for:"mb",req:{xp:1500}},{id:"lulav",n:"Lulav and esrog",req:{siyum:2}},{id:"shofar",n:"Shofar",req:{streak:10}},{id:"megillah",n:"Megillah",req:{siyum:5}}],
 skin:AV_SKIN.map((c,i)=>({id:i,n:"Skin "+(i+1),sw:c})),
 hair:AV_HAIR.map((c,i)=>({id:i,n:"Color "+(i+1),sw:c,req:i<2?null:i<4?{lessons:10}:{xp:1000}})),
 top:AV_TOP.map((c,i)=>({id:i,n:"Color "+(i+1),sw:c,req:i<2?null:i<4?{lessons:6}:i<7?{xp:600}:{siyum:2}}))
};
/* ================= MORE AVATAR OPTIONS (200+ per profile): colours of kippot, hats, tichels, headbands,
   glasses, new things to hold, and backgrounds. Most start locked and open with learning. ================= */
const AVX_NAMES={"#14161F":"Black","#1A3F7A":"Navy","#2457A6":"Blue","#5DA8EE":"Sky blue","#2F6B57":"Green","#6AAA4E":"Leaf green","#7A2E3A":"Burgundy","#C0392B":"Red","#E57373":"Rose","#E3A312":"Gold","#8A5A2B":"Brown","#C9A06A":"Tan","#7D5CC0":"Purple","#B39DDB":"Lilac","#F4F1E6":"White","#9AA0AE":"Grey","#0F5257":"Teal","#E07A1F":"Orange","#F48FB1":"Pink","#3B2A5A":"Plum","#556B2F":"Olive","#264D3F":"Forest","#C9D3E2":"Silver","#E9C65A":"Light gold","#C9A34A":"Antique gold"};
const AVX_C=Object.keys(AVX_NAMES);
/* unlock ladder: spreads options from easy to hard, so there is always something new to earn */
const AVX_REQ=k=>{const L=[{lessons:2},{lessons:4},{xp:150},{lessons:8},{streak:3},{xp:350},{lessons:12},{siyum:1},{xp:600},{lessons:18},{streak:5},{xp:900},{lessons:25},{siyum:2},{xp:1300},{streak:7},{lessons:35},{xp:1800},{siyum:3},{lessons:45},{xp:2500},{streak:10},{lessons:60},{siyum:5},{xp:3500},{streak:14},{lessons:80},{xp:5000},{siyum:7},{lessons:100},{xp:7000},{streak:21},{siyum:10},{xp:10000},{lessons:150},{streak:30}];return L[k%L.length]};
(()=>{const add=(cat,o)=>{if(!AVO[cat].some(x=>x.id===o.id))AVO[cat].push(o)};
 const fam=(base,label,forK,cols,start)=>cols.forEach((c,i)=>add("head",{id:base+"~"+c,n:AVX_NAMES[c]+" "+label,for:forK,req:AVX_REQ(start+i)}));
 fam("kip","kippah","mb",AVX_C.filter(c=>c!=="#14161F"),0);
 fam("cap","cap","mb",["#1A3F7A","#2457A6","#2F6B57","#7A2E3A","#C0392B","#14161F","#8A5A2B","#9AA0AE","#E07A1F","#0F5257"],5);
 fam("tichel","tichel","w",AVX_C,0);
 fam("snood","snood","w",AVX_C.slice(0,14),4);
 fam("beret","beret","w",["#14161F","#1A3F7A","#2F6B57","#C0392B","#7D5CC0","#8A5A2B","#9AA0AE","#E07A1F"],8);
 fam("what","hat","w",["#14161F","#1A3F7A","#7A2E3A","#2F6B57","#8A5A2B","#9AA0AE","#7D5CC0","#C9A06A"],10);
 fam("band","headband","g",AVX_C.slice(0,16),0);
 fam("bow","hair bow","g",AVX_C.slice(2,18),3);
 const gl=["#2457A6","#7A2E3A","#2F6B57","#8A5A2B","#C9A34A","#9AA0AE","#7D5CC0","#C0392B","#0F5257","#F48FB1"];
 gl.forEach((c,i)=>{add("eyes",{id:"round~"+c,n:AVX_NAMES[c]+" round glasses",req:AVX_REQ(6+i*2)});add("eyes",{id:"square~"+c,n:AVX_NAMES[c]+" square glasses",req:AVX_REQ(7+i*2)})});
 [["dreidel","Dreidel"],["menorah","Menorah"],["matzah","Matzah"],["honey","Honey jar"],["apple","Apple"],["pomegranate","Pomegranate"],["gragger","Gragger"],["havdalah","Havdalah candle"],["torah","Sefer Torah"],["quill","Quill"],["lantern","Lantern"],["stack","Stack of seforim"],["esrogbox","Esrog box"],["tehillim","Tehillim"],["bentcher","Bentcher"],["tambourine","Tambourine",{for:"wg"}],["flowers","Flowers",{for:"wg"}],["seforimbag","Seforim bag",{for:"mb"}]].forEach(([id,n,x],i)=>add("item",Object.assign({id,n,req:AVX_REQ(3+i*2)},x||{})));
 /* backgrounds behind your avatar on cards */
 AVO.bg=[{id:0,n:"Plain",sw:"#FFF8E7"}];
 const BGS=[["Sky","#CFE6FF"],["Mint","#D8F3E3"],["Sand","#F3E3C3"],["Rose","#F8D7DE"],["Lavender","#E6DCF7"],["Peach","#FFE0C7"],["Sea","#BFE0F0"],["Meadow","#CFEAB8"],["Lemon","#FFF3B0"],["Stone","#E3E6EC"],
  ["Sunrise","linear-gradient(#FFD6A5,#FFF3C4)"],["Dusk","linear-gradient(#5A4A8A,#F4A08A)"],["Night","linear-gradient(#0E1A3A,#2B3F7A)"],["Ocean","linear-gradient(#1B5E8A,#5DA8EE)"],["Forest","linear-gradient(#1F5A3A,#7FB05A)"],["Desert","linear-gradient(#E8C27A,#C98A4A)"],["Snow","linear-gradient(#FFFFFF,#DCE8F5)"],["Gold","linear-gradient(#E9C65A,#FFF0B8)"],["Techeles","linear-gradient(#2457A6,#8FB8F0)"],["Shabbos","linear-gradient(#1A2240,#3A2A5A)"],
  ["Yerushalayim","linear-gradient(#F3E3C3,#D8C29A)"],["Kotel","linear-gradient(#E8D8B0,#BFA678)"],["Har Sinai","linear-gradient(#8A7A6A,#D8C8A8)"],["Yarden","linear-gradient(#5DA8EE,#8FBF5A)"],["Galil","linear-gradient(#7FB05A,#CFEAB8)"],["Midbar","linear-gradient(#F0D59A,#E0A860)"],["Rainbow","linear-gradient(90deg,#F8B4B4,#FFE29A,#B9E6B0,#B4D2F8,#D4C2F4)"],["Stars","radial-gradient(circle at 30% 30%,#FFF 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,#FFF 0 2px,transparent 3px),linear-gradient(#0E1A3A,#24366E)"],["Candles","radial-gradient(circle at 50% 70%,#FFD54F,#F4A51C 30%,#3A2A5A 70%)"],["Sukkah","repeating-linear-gradient(90deg,#8A6A3A 0 6px,#CFEAB8 6px 18px)"],
  ["Tallis","repeating-linear-gradient(0deg,#F4F1E6 0 10px,#1A3F7A 10px 14px,#F4F1E6 14px 22px)"],["Chess","repeating-conic-gradient(#E3E6EC 0 25%,#FFF 0 50%) 0 0/20px 20px"],["Dots","radial-gradient(#C9D3E2 2px,transparent 3px) 0 0/12px 12px,#F7FAFF"],["Waves","repeating-radial-gradient(circle at 50% 120%,#BFE0F0 0 8px,#DFF1F8 8px 16px)"],["Sunset","linear-gradient(#F46A1C,#F4A51C,#5A4A8A)"],["Aurora","linear-gradient(135deg,#1B5E8A,#3FA36B,#7D5CC0)"],["Royal","linear-gradient(#3B2A5A,#7D5CC0)"],["Crimson","linear-gradient(#5E2129,#B5475A)"],["Olive grove","linear-gradient(#556B2F,#C9D18A)"],["Marble","linear-gradient(135deg,#F2EEE4,#D9D4C7 40%,#F2EEE4 60%,#C9C2B0)"],
  ["Parchment","linear-gradient(#FBF6E8,#EFE2C0)"],["Gan Eden","linear-gradient(#8FD0FF,#7FB05A 70%)"],["Mabul","linear-gradient(#5E7A9A,#2E4A6A)"],["Keshes","linear-gradient(#5DA8EE,#FFFFFF 60%)"],["Shamayim","linear-gradient(#8FD0FF,#FFFFFF)"]];
 BGS.forEach(([n,sw],i)=>AVO.bg.push({id:i+1,n,sw,req:AVX_REQ(i)}));
})();
/* draw helpers for colour variants */
const AVX_MAIN={kip:["#14161F"],cap:["#5A5A6A","#4A4A5A"],bow:["#E57373"],beret:["#7A2E3A"],what:["#3A2A5A"]};
function avxShade(c,k){const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r*k);g=Math.round(g*k);b=Math.round(b*k);return "#"+[r,g,b].map(x=>Math.max(0,Math.min(255,x)).toString(16).padStart(2,"0")).join("")}
function avxRecolor(svg,base,col,tc){const m=AVX_MAIN[base]||[tc];return m.reduce((s,c,i)=>s.split(c).join(i?avxShade(col,.8):col),svg)}
const AVX_ITEMS={
 dreidel:`<path d="M13 -50h10v10l-5 7-5-7z" fill="#2457A6"/><rect x="17" y="-55" width="2" height="5" fill="#8A5A2B"/><text x="18" y="-41" text-anchor="middle" font-size="7" font-weight="900" fill="#FFF">נ</text>`,
 menorah:`<path d="M18 -34v-14M10 -48q0 8 8 8t8-8M13 -48q0 5 5 5t5-5" stroke="#C9A34A" stroke-width="1.6" fill="none"/>${[10,13,18,23,26].map(x=>`<path class="flame" d="M${x} -52c1.5 1.5 1.5 3 0 4-1.5-1-1.5-2.5 0-4z" fill="#F4A51C"/>`).join("")}<rect x="14" y="-35" width="8" height="2" fill="#C9A34A"/>`,
 matzah:`<rect x="9" y="-50" width="18" height="15" rx="1" fill="#E8C98A"/>${[0,1,2].map(r=>`<path d="M11 ${-46+r*4}h14" stroke="#B5762A" stroke-width="1" stroke-dasharray="1 2"/>`).join("")}`,
 honey:`<rect x="11" y="-47" width="13" height="13" rx="3" fill="#E3A312" opacity=".9"/><rect x="10" y="-50" width="15" height="4" rx="1" fill="#8A5A2B"/><path d="M14 -42h7" stroke="#FFF3B8" stroke-width="1.5"/>`,
 apple:`<circle cx="18" cy="-41" r="7" fill="#C0392B"/><path d="M18 -48q1-4 4-4" stroke="#5A3A1A" stroke-width="1.5" fill="none"/><ellipse cx="21" cy="-49" rx="3" ry="1.5" fill="#4E8A3A"/>`,
 pomegranate:`<circle cx="18" cy="-41" r="7" fill="#9E2A3A"/><path d="M15 -48l1.5-3 1.5 2 1.5-2 1.5 3z" fill="#7A1E2A"/>`,
 gragger:`<rect x="17" y="-38" width="3" height="10" fill="#8A5A2B"/><rect x="11" y="-50" width="14" height="10" rx="2" fill="#E07A1F"/><path d="M12 -45h12" stroke="#FFF3B8" stroke-width="1.5"/>`,
 havdalah:`<path d="M14 -34l3-18M19 -34l-1-18M23 -34l-4-18" stroke="#F4E6C0" stroke-width="2.4"/><path class="flame" d="M18 -58c3 3 3 6 0 7-3-1-3-4 0-7z" fill="#F46A1C"/>`,
 torah:`<rect x="10" y="-54" width="4" height="22" rx="2" fill="#8A5A2B"/><rect x="22" y="-54" width="4" height="22" rx="2" fill="#8A5A2B"/><rect x="13" y="-50" width="10" height="16" fill="#7A2E3A"/><path d="M15 -46h6M15 -42h6" stroke="#E9C65A" stroke-width="1.2"/><circle cx="12" cy="-55" r="2" fill="#E9C65A"/><circle cx="24" cy="-55" r="2" fill="#E9C65A"/>`,
 quill:`<path d="M12 -32q4-18 16-26q-4 14-14 26z" fill="#F4F1E6" stroke="#C9BC98"/><path d="M12 -32l5-9" stroke="#5A3A1A" stroke-width="1"/>`,
 lantern:`<rect x="12" y="-48" width="12" height="14" rx="2" fill="#FFE29A" stroke="#5A3A1A" stroke-width="1.5"/><path d="M15 -48q3-5 6 0" stroke="#5A3A1A" stroke-width="1.5" fill="none"/><path class="flame" d="M18 -44c2 2 2 4 0 5-2-1-2-3 0-5z" fill="#F46A1C"/>`,
 stack:`<rect x="9" y="-38" width="18" height="5" rx="1" fill="#1A3F7A"/><rect x="10" y="-43" width="16" height="5" rx="1" fill="#7A2E3A"/><rect x="11" y="-48" width="14" height="5" rx="1" fill="#2F6B57"/><rect x="12" y="-53" width="12" height="5" rx="1" fill="#5A2E1A"/>`,
 esrogbox:`<rect x="9" y="-46" width="18" height="12" rx="3" fill="#C9D3E2" stroke="#8A94A8"/><path d="M11 -40h14" stroke="#8A94A8"/><ellipse cx="18" cy="-48" rx="4" ry="2" fill="#E8D040"/>`,
 tehillim:`<rect x="12" y="-51" width="13" height="17" rx="2" fill="#3B2A5A"/><text x="18.5" y="-40" text-anchor="middle" font-size="6" font-weight="900" fill="#E9C65A">תהלים</text>`,
 bentcher:`<rect x="12" y="-48" width="12" height="13" rx="2" fill="#F4F1E6" stroke="#C9A34A"/><path d="M15 -44h6M15 -41h6" stroke="#C9A34A" stroke-width="1.2"/>`,
 tambourine:`<circle cx="18" cy="-42" r="8" fill="#F4E6C0" stroke="#C9A34A" stroke-width="2"/>${[0,1,2,3].map(i=>`<circle cx="${18+8*Math.cos(i*1.57)}" cy="${-42+8*Math.sin(i*1.57)}" r="1.6" fill="#C9A34A"/>`).join("")}`,
 flowers:`${[[14,-50,"#F48FB1"],[20,-53,"#FFD54F"],[24,-48,"#B39DDB"]].map(([x,y,c])=>`<path d="M18 -34L${x} ${y+4}" stroke="#4E8A3A" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="3.2" fill="${c}"/>`).join("")}`,
 seforimbag:`<rect x="10" y="-50" width="17" height="16" rx="3" fill="#1A3F7A"/><path d="M13 -50q5-6 11 0" stroke="#1A3F7A" stroke-width="2" fill="none"/><path d="M13 -42h11" stroke="#E9C65A" stroke-width="1.5"/>`};
function avBg(a){const o=(AVO.bg||[]).find(x=>x.id===(a&&a.bg));return o&&o.id?o.sw:""}

const AV_DEF={base:"man",skin:1,hair:0,top:0,head:"kip",beard:"none",peyos:"none",eyes:"none",item:"none",bg:0};
function avStats(){const L=Object.entries(S.lessons).filter(([k,v])=>v&&v.done);let siyum=0;const per={};
 Object.values(COURSES).forEach(c=>c.units.forEach(u=>{if(S.lessons[u.testId]?.done)siyum++;u.lessons.forEach(l=>{if(S.lessons[l.id]?.done)per[c.id]=(per[c.id]||0)+1})}));
 return {xp:S.xp,lessons:L.length,streak:Math.max(streakInfo().n,S.bestStreak||0),siyum,per}}
function reqMet(r,st){if(!r)return true;st=st||avStats();
 if(r.course)return (st.per[r.course]||0)>=r.lessons;if(r.xp!=null)return st.xp>=r.xp;if(r.lessons!=null)return st.lessons>=r.lessons;
 if(r.streak!=null)return st.streak>=r.streak;if(r.siyum!=null)return st.siyum>=r.siyum;if(r.badge)return !!S.badges[r.badge];return true}
function reqText(r){if(!r)return "";const C={halacha:"Halacha",gemara:"Gemara",chumash:"Chumash",tanakh:"Nach",mishnayos:"Mishnah"};
 if(r.course)return `${r.lessons} ${C[r.course]} lessons`;if(r.xp!=null)return `${r.xp} XP`;if(r.lessons!=null)return `${r.lessons} lesson${r.lessons>1?"s":""}`;
 if(r.streak!=null)return `${r.streak}-day streak`;if(r.siyum!=null)return `${r.siyum} siyum${r.siyum>1?"im":""}`;if(r.badge){const b=BADGES.find(x=>x.id===r.badge);return `the ${b?b.name:r.badge} badge`}return ""}
const avKind=b=>b==="woman"?"w":b==="girl"?"g":b==="boy"?"b":"m";
const avFits=(o,kd)=>!o.for||o.for.includes(kd);
function avClean(a){const o=Object.assign({},AV_DEF,a||{});const ok=(cat,v)=>AVO[cat].some(x=>x.id===v);
 for(const k of Object.keys(AV_DEF))if(!ok(k,o[k]))o[k]=AV_DEF[k];const kd=avKind(o.base);
 const hd=AVO.head.find(x=>x.id===o.head);if(!hd||!avFits(hd,kd))o.head=kd==="w"?"sh_bob":kd==="g"?"pony":"kip";
 if(kd!=="m")o.beard="none";if(kd==="w"||kd==="g")o.peyos="none";
 const it=AVO.item.find(x=>x.id===o.item);if(it&&!avFits(it,kd))o.item="none";return o}
function myAvatar(){return avClean(Object.assign({},S.avatar||{},{base:profile()||"man"}))}
/* draw: feet at (0,0), about 100 units tall for adults */
function avatar(a){const BK=!!(a&&a.back);a=avClean(a);const HC=String(a.head).split("~"),EC=String(a.eyes).split("~");a=Object.assign({},a,{head:HC[0],eyes:EC[0]});const hcol=HC[1],ecol=EC[1];const k=(x=>x==="b"?"m":x)(avKind(a.base)),child=a.base==="boy"||a.base==="girl",sk=AV_SKIN[a.skin],hc=AV_HAIR[a.hair],tc=AV_TOP[a.top];
 const hy=-74,ink="#16213A";let s="";
 /* legs and body */
 if(k==="m"){s+=`<rect x="-9" y="-30" width="8" height="28" rx="3" fill="#1F2433"/><rect x="1" y="-30" width="8" height="28" rx="3" fill="#1F2433"/><ellipse cx="-5" cy="-1" rx="7" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="7" ry="3" fill="#0E1018"/>
  <path d="M-16 -58q0-6 6-7h20q6 1 6 7v30h-32z" fill="${child?"#F4F1E6":tc}"/>${child?`<rect x="-16" y="-34" width="32" height="6" fill="#1F2433"/>`:`<path d="M-5 -65l5 14 5-14z" fill="#F4F1E6"/><path d="M-1 -62h2l1 12-2 3-2-3z" fill="#7A2E3A"/><path d="M0 -51v22" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`}
  ${[-13,13].map(x=>`<path d="M${x} -30v${10}M${x+(x<0?2:-2)} -30v12" stroke="#F4F1E6" stroke-width="1.2"/>`).join("")}`}
 else if(k==="w"){s+=`<ellipse cx="-5" cy="-1" rx="6" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="6" ry="3" fill="#0E1018"/><rect x="-7" y="-10" width="5" height="8" fill="#3A2A22"/><rect x="2" y="-10" width="5" height="8" fill="#3A2A22"/>
  <path d="M-12 -38h24l7 30h-38z" fill="${AV_TOP[(a.top+1)%AV_TOP.length]}"/><path d="M-15 -58q0-6 6-7h18q6 1 6 7v22h-30z" fill="${tc}"/><path d="M-4 -65q4 4 8 0" stroke="#F4F1E6" stroke-width="2" fill="none"/>`}
 else{s+=`<ellipse cx="-5" cy="-1" rx="6" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="6" ry="3" fill="#0E1018"/><rect x="-7" y="-14" width="5" height="12" fill="#3A3F52"/><rect x="2" y="-14" width="5" height="12" fill="#3A3F52"/>
  <path d="M-13 -58q0-6 6-7h14q6 1 6 7l5 44h-36z" fill="${tc}"/><path d="M-8 -65h16v6q-8 4-16 0z" fill="#F4F1E6"/>`}
 /* arms */
 const sleeve=k==="g"?"#F4F1E6":child?"#F4F1E6":tc;
 s+=`<path d="M-15 -60q-7 10-7 24" stroke="${sleeve}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="-22" cy="-34" r="4" fill="${sk}"/>`;
 const holding=a.item!=="none"&&a.item!=="tefillin";
 s+=holding?`<path d="M15 -60q8 6 4 16" stroke="${sleeve}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="16" cy="-42" r="4" fill="${sk}"/>`:`<path d="M15 -60q7 10 7 24" stroke="${sleeve}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="22" cy="-34" r="4" fill="${sk}"/>`;
 /* back hair (women's sheitels / girls) */
 if(a.head==="sh_long")s+=`<path d="M-15 ${hy-2}q-3 24 2 34h26q5-10 2-34z" fill="${hc}"/>`;
 if(a.head==="sh_wave")s+=`<path d="M-16 ${hy-2}q-6 10 0 16t-2 14h36q-4-6 0-14t0-16z" fill="${hc}"/>`;
 if(a.head==="pony")s+=`<path d="M10 ${hy-6}q14 6 8 26q-4-10-10-16z" fill="${hc}"/>`;
 if(a.head==="braid")s+=`<g fill="${hc}">${[0,1,2,3].map(i=>`<ellipse cx="13" cy="${hy+4+i*7}" rx="3.5" ry="4.5"/>`).join("")}</g>`;
 /* neck and head */
 s+=`<rect x="-4" y="${hy+10}" width="8" height="8" fill="${sk}"/><circle cy="${hy}" r="13" fill="${sk}"/>`;
 /* hair on top for men/boys */
 if(k==="m")s+=`<path d="M-13 ${hy-1}q1-13 13-13t13 13q-4-6-13-6t-13 6z" fill="${hc}"/>`;
 /* face (or the back of the head) */
 if(BK)s+=`<circle cy="${hy}" r="13" fill="${hc}"/><circle cx="-13" cy="${hy+1}" r="2.6" fill="${sk}"/><circle cx="13" cy="${hy+1}" r="2.6" fill="${sk}"/>`;else s+=`<circle cx="-4.5" cy="${hy-1}" r="1.6" fill="${ink}"/><circle cx="4.5" cy="${hy-1}" r="1.6" fill="${ink}"/><path d="M-4 ${hy+5}q4 3 8 0" stroke="${ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="-8" cy="${hy+3}" r="2" fill="#F29A8A" opacity=".45"/><circle cx="8" cy="${hy+3}" r="2" fill="#F29A8A" opacity=".45"/>`;
 /* peyos */
 if(a.peyos==="short")s+=`<path d="M-12 ${hy-2}v9M12 ${hy-2}v9" stroke="${hc}" stroke-width="3" stroke-linecap="round"/>`;
 if(a.peyos==="curl")s+=[-12,12].map(x=>`<path d="M${x} ${hy-2}q${x<0?-4:4} 4 0 7t0 7" stroke="${hc}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join("");
 if(a.peyos==="long")s+=[-12,12].map(x=>`<path d="M${x} ${hy-2}q${x<0?-5:5} 8 0 14t${x<0?-2:2} 12" stroke="${hc}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join("");
 /* beard */
 const bc=hc;if(BK){a.beard="none";a.eyes="none"}
 if(a.beard==="stub")s+=`<path d="M-11 ${hy+3}q11 14 22 0" stroke="${bc}" stroke-width="3" fill="none" opacity=".45"/>`;
 if(a.beard==="short")s+=`<path d="M-12 ${hy+1}q0 14 12 15q12-1 12-15q-3 6-12 6t-12-6z" fill="${bc}"/><path d="M-4 ${hy+6}q4 2 8 0" stroke="${sk}" stroke-width="1.5" fill="none"/>`;
 if(a.beard==="full")s+=`<path d="M-13 ${hy+2}q-1 20 13 24q14-2 13-22q-3 7-13 7t-13-7z" fill="${bc}"/><path d="M-4 ${hy+6}q4 2 8 0" stroke="${sk}" stroke-width="1.5" fill="none"/>`;
 if(a.beard==="long")s+=`<path d="M-13 ${hy+2}q-2 32 13 40q15-6 13-38q-3 7-13 7t-13-7z" fill="${bc}"/><path d="M-4 ${hy+6}q4 2 8 0" stroke="${sk}" stroke-width="1.5" fill="none"/>`;
 /* glasses */
 if(a.eyes==="round")s+=`<g stroke="${ecol||ink}" stroke-width="1.3" fill="none"><circle cx="-4.5" cy="${hy-1}" r="3.6"/><circle cx="4.5" cy="${hy-1}" r="3.6"/><path d="M-1 ${hy-1}h2"/></g>`;
 if(a.eyes==="square")s+=`<g stroke="${ecol||ink}" stroke-width="1.5" fill="none"><rect x="-9" y="${hy-4.5}" width="7.5" height="6" rx="1.5"/><rect x="1.5" y="${hy-4.5}" width="7.5" height="6" rx="1.5"/><path d="M-1.5 ${hy-2}h3"/></g>`;
 /* headwear */
 const H={kip:`<path d="M-8 ${hy-11}q8-6 16 0z" fill="#14161F"/>`,kipk:`<path d="M-8 ${hy-11}q8-6 16 0z" fill="${tc==="#1F2433"?"#2457A6":tc}"/><path d="M-6 ${hy-12}h12" stroke="#FFF" stroke-width="1" stroke-dasharray="2 2"/>`,
  kipw:`<path d="M-8 ${hy-11}q8-6 16 0z" fill="#F4F1E6" stroke="#D9D9D9"/>`,
  fedora:`<rect x="-19" y="${hy-12}" width="38" height="4" rx="2" fill="#14161F"/><path d="M-11 ${hy-12}l1-12q10-4 20 0l1 12z" fill="#14161F"/><rect x="-11" y="${hy-15}" width="22" height="3" fill="#3A3F52"/>`,
  bors:`<ellipse cy="${hy-11}" rx="24" ry="4" fill="#14161F"/><path d="M-11 ${hy-12}q0-14 11-14t11 14z" fill="#14161F"/><path d="M-10 ${hy-14}h20" stroke="#3A3F52" stroke-width="2"/>`,
  cap:`<path d="M-13 ${hy-8}q0-10 13-10t13 10z" fill="#5A5A6A"/><path d="M-2 ${hy-8}h17q2 3-2 4h-15z" fill="#4A4A5A"/>`,
  shtreimel:`<ellipse cy="${hy-11}" rx="22" ry="6" fill="#6B4423"/>${[-18,-12,-6,0,6,12,18].map(x=>`<path d="M${x} ${hy-15}v6" stroke="#4A2E1A" stroke-width="2"/>`).join("")}<path d="M-9 ${hy-15}q9-12 18 0z" fill="#14161F"/>`,
  spodik:`<path d="M-13 ${hy-10}l2-24h22l2 24z" fill="#5A3A22"/>${[-9,-4,1,6].map(x=>`<path d="M${x} ${hy-32}v22" stroke="#3A2414" stroke-width="2"/>`).join("")}`,
  sh_bob:`<path d="M-15 ${hy+6}q-3-22 15-22t15 22q-4-4-6-12q-9 4-18 0q-2 8-6 12z" fill="${hc}"/>`,
  sh_long:`<path d="M-15 ${hy+8}q-3-24 15-24t15 24q-4-6-5-14q-10 5-20 0q-1 8-5 14z" fill="${hc}"/>`,
  sh_wave:`<path d="M-16 ${hy+6}q-4-24 16-24t16 24q-5-6-6-13q-10 5-20 0q-1 7-6 13z" fill="${hc}"/><path d="M-10 ${hy-12}q4 4 8 0t8 0" stroke="rgba(255,255,255,.25)" stroke-width="2" fill="none"/>`,
  tichel:`<path d="M-15 ${hy+2}q-2-20 15-20t15 20q-3-8-15-8t-15 8z" fill="${tc}"/><path d="M12 ${hy-6}q8 6 4 18l-4-4" fill="${tc}"/><path d="M-12 ${hy-6}q12-6 24 0" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>`,
  snood:`<path d="M-14 ${hy}q-2-18 14-18t14 18q-4-6-14-6t-14 6z" fill="${tc}"/><path d="M8 ${hy-10}q14 4 10 22q-10 0-12-14z" fill="${tc}"/>`,
  what:`<path d="M-15 ${hy+2}q-2-14 15-14t15 14q-4-6-15-6t-15 6z" fill="${hc}"/><ellipse cy="${hy-10}" rx="20" ry="4" fill="#3A2A5A"/><path d="M-10 ${hy-11}q10-14 20 0z" fill="#3A2A5A"/><path d="M-10 ${hy-12}h20" stroke="#C9A34A" stroke-width="1.5"/>`,
  beret:`<path d="M-15 ${hy+2}q-2-14 15-14t15 14q-4-6-15-6t-15 6z" fill="${hc}"/><ellipse cx="2" cy="${hy-12}" rx="15" ry="6" fill="#7A2E3A"/>`,
  pony:`<path d="M-13 ${hy+2}q-1-15 13-15t13 15q-3-7-13-8t-13 8z" fill="${hc}"/>`,
  braid:`<path d="M-13 ${hy+2}q-1-15 13-15t13 15q-3-7-13-8t-13 8z" fill="${hc}"/>`,
  bfedora:`<rect x="-16" y="${hy-12}" width="32" height="4" rx="2" fill="#14161F"/><path d="M-10 ${hy-12}l1-10q9-3 18 0l1 10z" fill="#14161F"/>`,
  bow:`<path d="M-13 ${hy+2}q-1-15 13-15t13 15q-3-7-13-8t-13 8z" fill="${hc}"/><path d="M6 ${hy-12}l8-5v10zM6 ${hy-12}l-6-6v12z" fill="#E57373"/>`,
  band:`<path d="M-13 ${hy+4}q-1-17 13-17t13 17q-3-7-13-8t-13 8z" fill="${hc}"/><path d="M-12 ${hy-6}q12-9 24 0" stroke="${tc}" stroke-width="3" fill="none"/>`};
 s+=hcol?avxRecolor(H[a.head]||"",a.head,hcol,tc):(H[a.head]||"");
 if(a.item==="tefillin")s+=`<rect x="-4" y="${hy-17}" width="8" height="8" fill="#14161F"/><path d="M-12 ${hy-8}q12 4 24 0" stroke="#14161F" stroke-width="1.5" fill="none"/><path d="M-20 -50l4 14M-21 -44l6 2M-22 -38l6 2" stroke="#14161F" stroke-width="2"/><rect x="-22" y="-56" width="6" height="6" fill="#14161F"/>`;
 /* held items */
 const IT={sefer:`<rect x="12" y="-52" width="14" height="18" rx="2" fill="#7A2E3A"/><rect x="14" y="-50" width="10" height="2" fill="#E9C65A"/>`,
  siddur:`<rect x="13" y="-50" width="11" height="15" rx="2" fill="#1A3F7A"/><path d="M16 -44h5" stroke="#E9C65A" stroke-width="1.5"/>`,
  gemara:`<rect x="10" y="-54" width="18" height="22" rx="2" fill="#5A2E1A"/><rect x="12" y="-50" width="14" height="2" fill="#E9C65A"/><rect x="12" y="-46" width="14" height="2" fill="#E9C65A"/>`,
  chumash:`<rect x="11" y="-52" width="15" height="19" rx="2" fill="#2F6B57"/><rect x="13" y="-48" width="11" height="2" fill="#E9C65A"/>`,
  tzedakah:`<rect x="11" y="-48" width="13" height="14" rx="2" fill="#2457A6"/><rect x="15" y="-48" width="5" height="2" fill="#0E1018"/><text x="17.5" y="-37" text-anchor="middle" font-size="6" font-weight="900" fill="#FFF">צ</text>`,
  candles:`<rect x="10" y="-44" width="3" height="10" fill="#FFF8E7"/><rect x="18" y="-44" width="3" height="10" fill="#FFF8E7"/><path class="flame" d="M11.5 -50c2 2 2 4 0 5-2-1-2-3 0-5zM19.5 -50c2 2 2 4 0 5-2-1-2-3 0-5z" fill="#F4A51C"/><rect x="8" y="-34" width="15" height="3" fill="#C9A34A"/>`,
  lulav:`<path d="M19 -30v-46" stroke="#4E8A3A" stroke-width="4"/><path d="M17 -60l-6 -10M21 -58l6 -10" stroke="#6AAA4E" stroke-width="2"/><ellipse cx="12" cy="-40" rx="6" ry="5" fill="#E8D040"/>`,
  mishnayos:`<rect x="11" y="-52" width="15" height="19" rx="2" fill="#1A3F7A"/><rect x="13" y="-48" width="11" height="2" fill="#E9C65A"/>`,
  kiddush:`<path d="M12 -50h12l-2 9h-8z" fill="#C9D3E2" stroke="#8A94A8"/><rect x="17" y="-41" width="2" height="6" fill="#C9D3E2"/><rect x="14" y="-35" width="8" height="2" fill="#C9D3E2"/><rect x="13" y="-49" width="10" height="4" fill="#7A2E3A"/>`,
  challah:`<path d="M9 -38q0-8 7-8h6q7 0 7 8z" fill="#D8963F"/><path d="M11 -42q3 3 6 0t6 0" stroke="#B5762A" stroke-width="1.5" fill="none"/>`,
  megillah:`<rect x="10" y="-52" width="4" height="20" rx="2" fill="#8A5A2B"/><rect x="14" y="-50" width="12" height="16" fill="#FBF6E8" stroke="#C9BC98"/>`,
  shofar:`<path d="M10 -40q8-2 14-14l4 2q-4 14-17 16z" fill="#E8D2A0" stroke="#A8865A"/>`};Object.assign(IT,AVX_ITEMS);
 s+=IT[a.item]||"";
 return child?`<g transform="scale(.82)">${s}</g>`:s}
function avatarSVG(a,cls="",vb="-30 -112 60 116"){const bg=avBg(a);return `<svg class="avsvg ${cls}" viewBox="${vb}" aria-hidden="true"${bg?` style="background:${bg};border-radius:50%"`:""}>${avatar(a)}</svg>`}
/* unlocks — toast once when something new opens */
function avAllItems(){const kd=avKind(profile()||"man"),out=[];for(const cat of ["head","beard","peyos","eyes","item","hair","top","bg"]){if(cat==="beard"&&kd!=="m")continue;if(cat==="peyos"&&(kd==="w"||kd==="g"))continue;AVO[cat].forEach(o=>{if(o.req&&avFits(o,kd))out.push({cat,o})})}return out}
function checkUnlocks(){S.unlockSeen=S.unlockSeen||{};const st=avStats();const fresh=[];
 avAllItems().forEach(({cat,o})=>{const key=cat+":"+o.id;if(!S.unlockSeen[key]&&reqMet(o.req,st)){S.unlockSeen[key]=1;fresh.push(o.n)}});
 if(typeof TOWN_ITEMS!=="undefined")TOWN_ITEMS.forEach(t=>{const key="town:"+t.id;if(t.req&&!S.unlockSeen[key]&&reqMet(t.req,st)){S.unlockSeen[key]=1;fresh.push(t.n)}});
 if(fresh.length&&S.unlockInit){save();const d=document.createElement("div");d.className="hitoast";d.setAttribute("role","status");
  d.innerHTML=`${avatarSVG(myAvatar(),"","-30 -112 60 116")}<p><b>New unlocked!</b> ${esc(fresh.slice(0,3).join(", "))}${fresh.length>3?` and ${fresh.length-3} more`:""}</p>`;document.body.appendChild(d);setTimeout(()=>d.remove(),4200)}
 else if(!S.unlockInit){S.unlockInit=1;save()}}
let avTab="head";
function avatarStudio(){const a=myAvatar(),st=avStats(),kd=avKind(a.base);
 const cats=[["head",kd==="w"?"Sheitel & hats":kd==="g"?"Hair":"Kippah & hats"],...(kd==="m"?[["beard","Beard"]]:[]),...(kd==="m"||kd==="b"?[["peyos","Peyos"]]:[]),["eyes","Glasses"],["item","Holding"],["skin","Skin"],["hair","Hair color"],["top","Clothes"],["bg","Background"]];
 if(!cats.some(c=>c[0]===avTab))avTab="head";
 const opts=AVO[avTab].filter(o=>avFits(o,kd));
 const unlocked=avAllItems().filter(x=>reqMet(x.o.req,st)).length,total=avAllItems().length;
 sheet(`<div class="avs"><div class="avs-prev">${avatarSVG(a,"big")}<div><h3>Your avatar</h3><p class="small" style="margin:0">${PROFILE_ONE[profile()||"man"]} · change in Settings</p><p class="sub">${unlocked} of ${total} extras unlocked. Learn more to open the rest.</p><input type="text" id="avnick" maxlength="24" placeholder="Your name" value="${esc(S.settings.name||"")}" aria-label="Your name"></div></div>
  <div class="avs-tabs">${cats.map(([k,n])=>`<button data-avt="${k}" aria-pressed="${k===avTab}">${n}</button>`).join("")}</div>
  <div class="avs-grid">${opts.map(o=>{const ok=reqMet(o.req,st),sel=a[avTab]===o.id;const prev=Object.assign({},a,{[avTab]:o.id});
   return `<button class="avo ${sel?"sel":""} ${ok?"":"locked"}" data-avo="${o.id}" ${ok?"":"aria-disabled=\"true\""}>${o.sw?`<span class="sw" style="background:${o.sw}"></span>`:avatarSVG(prev,"","-30 -112 60 116")}<small>${esc(o.n)}</small>${ok?"":`<em>${I.lock}${esc(reqText(o.req))}</em>`}</button>`}).join("")}</div>
  <button class="btn block" id="avdone">Done</button></div>`,()=>{
  document.querySelectorAll("[data-avt]").forEach(b=>b.onclick=()=>{avTab=b.dataset.avt;avatarStudio()});
  document.querySelectorAll("[data-avo]").forEach(b=>b.onclick=()=>{const o=AVO[avTab].find(x=>String(x.id)===b.dataset.avo);if(!o)return;if(!reqMet(o.req)){toast("Unlocks with "+reqText(o.req));return}
   S.avatar=avClean(Object.assign({},a,{[avTab]:o.id}));save();if(typeof ltPresence==="function")ltPresence();avatarStudio()});
  $("#avnick").onchange=e=>{S.settings.name=e.target.value.trim().slice(0,24);save()};
  $("#avdone").onclick=()=>{closeSheet();render()}})}
