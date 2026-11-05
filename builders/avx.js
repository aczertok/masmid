/* ================= MORE AVATAR OPTIONS (200+ per profile): colours of kippot, hats, tichels, headbands,
   glasses, new things to hold, and backgrounds. Most start locked and open with learning. ================= */
const AVX_NAMES={"#14161F":"Black","#1A3F7A":"Navy","#2457A6":"Blue","#5DA8EE":"Sky blue","#2F6B57":"Green","#6AAA4E":"Leaf green","#7A2E3A":"Burgundy","#C0392B":"Red","#E57373":"Rose","#E3A312":"Gold","#8A5A2B":"Brown","#C9A06A":"Tan","#7D5CC0":"Purple","#B39DDB":"Lilac","#F4F1E6":"White","#9AA0AE":"Grey","#0F5257":"Teal","#E07A1F":"Orange","#F48FB1":"Pink","#3B2A5A":"Plum","#556B2F":"Olive","#264D3F":"Forest","#C9D3E2":"Silver","#E9C65A":"Light gold"};
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
AV_DEF.bg=0;
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
