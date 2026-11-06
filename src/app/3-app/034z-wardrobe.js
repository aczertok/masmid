/* ================= WARDROBE: more hats, sheitels and outfits =================
   New ids only (never rename them: they are saved on learners' avatars).
   Outfits are a new avatar part, "outfit"; the colour still comes from the Clothes colour (top). */
AVO.head.push(
 /* men */
 {id:"homburg",n:"Homburg",for:"m",req:{lessons:12}},{id:"kneitch",n:"Pinched hat",for:"m",req:{xp:800}},{id:"biber",n:"Biber hat",for:"m",req:{streak:7}},
 {id:"samet",n:"Velvet samet hat",for:"m",req:{xp:1600}},{id:"velvet",n:"Velvet kippah",for:"mb",req:{lessons:3}},{id:"sefardi",n:"Sefardi kippah",for:"mb",req:{lessons:9}},
 {id:"bukharian",n:"Bukharian kippah",for:"mb",req:{streak:4}},{id:"bsamet",n:"Boy's Shabbos hat",for:"b",req:{xp:700}},
 /* women */
 {id:"sh_shabbos",n:"Shabbos sheitel",for:"w",req:{badge:"shabbos"}},{id:"sh_bangs",n:"Sheitel with bangs",for:"w",req:{lessons:3}},{id:"sh_layer",n:"Layered sheitel",for:"w",req:{lessons:10}},
 {id:"sh_curly",n:"Curly sheitel",for:"w",req:{xp:900}},{id:"sh_hat",n:"Sheitel and Shabbos hat",for:"w",req:{siyum:3}},{id:"pillbox",n:"Sheitel and pillbox hat",for:"w",req:{xp:2000}},
 {id:"tichel_knot",n:"Knotted tichel",for:"w",req:{streak:4}},{id:"turban",n:"Turban wrap",for:"w",req:{lessons:20}},{id:"shpitzel",n:"Tichel and shpitzel",for:"w",req:{siyum:5}},
 /* girls */
 {id:"pigtails",n:"Pigtails",for:"g",req:{lessons:3}},{id:"bun",n:"Bun",for:"g",req:{lessons:10}},{id:"curls",n:"Curls",for:"g",req:{xp:700}},{id:"bandbow",n:"Headband with bow",for:"g",req:{streak:7}});
AV_DEF.outfit="std";
AVO.outfit=[
 {id:"std",n:"Suit",for:"m"},{id:"std",n:"Shirt",for:"b"},{id:"std",n:"Blouse and skirt",for:"w"},{id:"std",n:"Dress",for:"g"},
 /* men */
 {id:"bekishe",n:"Bekishe",for:"m",req:{lessons:8}},{id:"bekishe_s",n:"Shabbos bekishe and gartel",for:"m",req:{badge:"shabbos"}},{id:"kapote",n:"Kapote",for:"m",req:{xp:900}},
 {id:"rekel",n:"Rekel (long frock)",for:"mb",req:{lessons:14}},{id:"vest",n:"Vest and tie",for:"mb",req:{lessons:4}},{id:"sweater",n:"Sweater",for:"mb",req:{streak:3}},
 {id:"tallis",n:"Tallis",for:"m",req:{course:"halacha",lessons:2}},{id:"suit",n:"Suit and tie",for:"b",req:{xp:500}},{id:"bshabbos",n:"Shabbos suit",for:"b",req:{badge:"shabbos"}},
 /* women */
 {id:"dress",n:"Dress",for:"w",req:{lessons:3}},{id:"wshabbos",n:"Shabbos dress",for:"w",req:{badge:"shabbos"}},{id:"cardigan",n:"Cardigan",for:"w",req:{lessons:9}},
 {id:"wsuit",n:"Skirt suit",for:"w",req:{xp:1000}},{id:"robe",n:"Shabbos robe",for:"w",req:{streak:7}},
 /* girls */
 {id:"jumper",n:"School jumper",for:"g",req:{lessons:3}},{id:"gshabbos",n:"Shabbos dress",for:"g",req:{badge:"shabbos"}},{id:"gsweater",n:"Sweater and skirt",for:"g",req:{streak:3}},{id:"gpleat",n:"Pleated skirt and blouse",for:"g",req:{lessons:10}}];
/* the same id "std" appears once per profile; avFits picks the right one */

/* outfits: return {body, sleeve, over} or null for the standard look */
function avOutfit(a,k,child,tc,sk){const o=a.outfit||"std";if(o==="std")return null;
 const W="#F4F1E6",feetM=`<ellipse cx="-5" cy="-1" rx="7" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="7" ry="3" fill="#0E1018"/>`,legsM=`<rect x="-9" y="-30" width="8" height="28" rx="3" fill="#1F2433"/><rect x="1" y="-30" width="8" height="28" rx="3" fill="#1F2433"/>`;
 const shirtV=`<path d="M-5 -65l5 13 5-13z" fill="${W}"/>`,tie=c=>`<path d="M-1 -62h2l1 12-2 3-2-3z" fill="${c||"#7A2E3A"}"/>`;
 const torso=c=>`<path d="M-16 -58q0-6 6-7h20q6 1 6 7v30h-32z" fill="${c}"/>`;
 if(k==="m"){
  if(o==="bekishe"||o==="bekishe_s"){const c=o==="bekishe_s"?"#1B1D26":"#111217";
   const stripes=o==="bekishe_s"?Array.from({length:8},(_,i)=>`<path d="M${-14+i*4} -60v52" stroke="#3A3F52" stroke-width=".8" opacity=".55"/>`).join(""):"";
   return {body:legsM+feetM+`<path d="M-16 -58q0-6 6-7h20q6 1 6 7l3 50h-38z" fill="${c}"/>${stripes}<path d="M-5 -65q-4 14-1 30M5 -65q4 14 1 30" stroke="#2C2F3B" stroke-width="3" fill="none"/>${shirtV}${o==="bekishe_s"?`<rect x="-17" y="-40" width="34" height="3.5" fill="#050608"/><path d="M8 -38l3 7M10 -38l4 6" stroke="#050608" stroke-width="1.6"/>`:""}`,sleeve:c}}
  if(o==="kapote")return {body:legsM+feetM+`<path d="M-16 -58q0-6 6-7h20q6 1 6 7l2 46h-36z" fill="#1B2233"/>${shirtV}<path d="M-4 -64v52" stroke="#121826" stroke-width="1.2"/>${[-56,-50,-44,-38].map(y=>`<circle cx="-2" cy="${y}" r="1.1" fill="#9AA0AE"/>`).join("")}`,sleeve:"#1B2233"};
  if(o==="rekel")return {body:legsM+feetM+`<path d="M-16 -58q0-6 6-7h20q6 1 6 7l3 44h-38z" fill="#121318"/><path d="M-5 -65l-4 16 4-4M5 -65l4 16-4-4" fill="#2A2D38"/>${shirtV}${child?"":tie("#1A3F7A")}`,sleeve:"#121318"};
  if(o==="vest")return {body:legsM+feetM+torso(W)+`<path d="M-14 -60h8l6 16 6-16h8v32h-28z" fill="${child?"#1A3F7A":tc}"/>${tie()}${[-48,-42,-36].map(y=>`<circle cx="0" cy="${y}" r="1" fill="#E9C65A"/>`).join("")}`,sleeve:W};
  if(o==="sweater")return {body:legsM+feetM+torso(child?"#2F6B57":tc)+`<path d="M-6 -65l6 12 6-12z" fill="${W}"/><path d="M-6 -65l6 12 6-12" stroke="rgba(0,0,0,.18)" stroke-width="2" fill="none"/><rect x="-16" y="-32" width="32" height="4" fill="rgba(0,0,0,.15)"/>`,sleeve:child?"#2F6B57":tc};
  if(o==="suit"||o==="bshabbos"){const c=o==="bshabbos"?"#111217":(tc==="#F4F1E6"?"#1A3F7A":tc);return {body:legsM+feetM+torso(c)+shirtV+tie(o==="bshabbos"?"#C9D3E2":"#7A2E3A")+`<path d="M-5 -65l-3 14M5 -65l3 14" stroke="rgba(255,255,255,.12)" stroke-width="2"/>`,sleeve:c}}
  if(o==="tallis")return {body:null,over:`<path d="M-19 -63q19-6 38 0l3 30q-22 6-44 0z" fill="#F7F5EE"/><path d="M-21 -40q21 5 42 0M-21 -37q21 5 42 0" stroke="#16213A" stroke-width="1.5" fill="none"/><path d="M-9 -67h18v5h-18z" fill="#C9D3E2"/><path d="M-9 -66h18" stroke="#9AA6BF" stroke-width=".8" stroke-dasharray="1.5 1.5"/>${[-20,20].map(x=>`<path d="M${x} -34v10M${x+1} -34v9" stroke="#F7F5EE" stroke-width="1"/>`).join("")}`}}
 if(k==="w"){const legs=`<ellipse cx="-5" cy="-1" rx="6" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="6" ry="3" fill="#0E1018"/><rect x="-7" y="-10" width="5" height="8" fill="#3A2A22"/><rect x="2" y="-10" width="5" height="8" fill="#3A2A22"/>`;
  if(o==="dress"||o==="wshabbos"){const lace=o==="wshabbos"?`<path d="M-8 -65q2 4 4 0q2 4 4 0q2 4 4 0q2 4 4 0" stroke="${W}" stroke-width="2.4" fill="none"/><path d="M-18 -10h36" stroke="#E9C65A" stroke-width="2"/><path d="M-16 -38h32" stroke="#E9C65A" stroke-width="1.6"/>`:`<path d="M-4 -65q4 4 8 0" stroke="${W}" stroke-width="2" fill="none"/><path d="M-15 -38h30" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`;
   return {body:legs+`<path d="M-15 -58q0-6 6-7h18q6 1 6 7l5 50h-40z" fill="${tc}"/>${lace}`,sleeve:tc}}
  if(o==="cardigan")return {body:legs+`<path d="M-12 -38h24l7 30h-38z" fill="#2B3350"/><path d="M-15 -58q0-6 6-7h18q6 1 6 7v22h-30z" fill="${W}"/><path d="M-15 -58q0-6 6-7h4l-1 30h-9zM15 -58q0-6-6-7h-4l1 30h9z" fill="${tc}"/>${[-54,-48,-42].map(y=>`<circle cx="-5" cy="${y}" r="1" fill="#E9C65A"/>`).join("")}`,sleeve:tc};
  if(o==="wsuit")return {body:legs+`<path d="M-12 -38h24l7 30h-38z" fill="${tc}"/><path d="M-15 -58q0-6 6-7h18q6 1 6 7v24h-30z" fill="${tc}"/><path d="M-4 -65l4 9 4-9" fill="${W}"/><path d="M-4 -65l-3 12M4 -65l3 12" stroke="rgba(0,0,0,.22)" stroke-width="1.8"/>${[-48,-42].map(y=>`<circle cx="0" cy="${y}" r="1.1" fill="#E9C65A"/>`).join("")}`,sleeve:tc};
  if(o==="robe")return {body:`<ellipse cx="-5" cy="-1" rx="6" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="6" ry="3" fill="#0E1018"/><path d="M-15 -58q0-6 6-7h18q6 1 6 7l6 56h-42z" fill="${tc}"/>${Array.from({length:14},(_,i)=>`<circle cx="${-14+(i%5)*7+(Math.floor(i/5)%2)*3}" cy="${-52+Math.floor(i/5)*16}" r="1.4" fill="rgba(255,255,255,.55)"/>`).join("")}<path d="M0 -62v58" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/><path d="M-6 -65q6 5 12 0" stroke="${W}" stroke-width="2.4" fill="none"/>`,sleeve:tc}}
 if(k==="g"){const legs=`<ellipse cx="-5" cy="-1" rx="6" ry="3" fill="#0E1018"/><ellipse cx="5" cy="-1" rx="6" ry="3" fill="#0E1018"/><rect x="-7" y="-14" width="5" height="12" fill="#3A3F52"/><rect x="2" y="-14" width="5" height="12" fill="#3A3F52"/>`;
  if(o==="jumper")return {body:legs+`<path d="M-13 -58q0-6 6-7h14q6 1 6 7l5 44h-36z" fill="${W}"/><path d="M-11 -52h22l5 38h-32z" fill="${tc==="#F4F1E6"?"#1A3F7A":tc}"/><path d="M-9 -52l1-12M9 -52l-1-12" stroke="${tc==="#F4F1E6"?"#1A3F7A":tc}" stroke-width="3"/><path d="M-8 -65q8 5 16 0" stroke="${W}" stroke-width="2" fill="none"/>`,sleeve:W};
  if(o==="gshabbos")return {body:legs+`<path d="M-13 -58q0-6 6-7h14q6 1 6 7l5 44h-36z" fill="${tc}"/><path d="M-8 -65q2 4 4 0q2 4 4 0q2 4 4 0q2 4 4 0" stroke="${W}" stroke-width="2.2" fill="none"/><rect x="-14" y="-40" width="28" height="4" fill="#E57373"/><path d="M8 -38l6-4v8zM8 -38l-4-4v8z" fill="#E57373"/><path d="M-18 -16h36" stroke="${W}" stroke-width="2" stroke-dasharray="2 2"/>`,sleeve:tc};
  if(o==="gsweater"||o==="gpleat"){const top=o==="gsweater"?tc:W,sk2=o==="gsweater"?"#2B3350":tc;return {body:legs+`<path d="M-12 -38h24l6 24h-36z" fill="${sk2}"/>${o==="gpleat"?[-8,-3,2,7].map(x=>`<path d="M${x} -36l-1 22" stroke="rgba(0,0,0,.18)" stroke-width="1"/>`).join(""):""}<path d="M-13 -58q0-6 6-7h14q6 1 6 7v22h-26z" fill="${top}"/><path d="M-6 -65q6 5 12 0" stroke="${o==="gsweater"?W:"#C9D3E2"}" stroke-width="2" fill="none"/>`,sleeve:top}}}
 return null}

/* new hats and hair, drawn on top of the head */
function avHeadX(hy,hc,tc){const black="#14161F",gold="#E3B84A";
 const hairCap=`<path d="M-15 ${hy+2}q-2-14 15-14t15 14q-4-6-15-6t-15 6z" fill="${hc}"/>`;
 return {
  homburg:`<path d="M-19 ${hy-12}q19-4 38 0q-1 4-5 4h-28q-4 0-5-4z" fill="${black}"/><path d="M-11 ${hy-12}l1-12q10-4 20 0l1 12z" fill="${black}"/><path d="M-6 ${hy-23}q6 3 12 0" stroke="#3A3F52" stroke-width="1.6" fill="none"/><rect x="-11" y="${hy-15}" width="22" height="3" fill="#2A2D38"/>`,
  kneitch:`<rect x="-20" y="${hy-12}" width="40" height="4" rx="2" fill="${black}"/><path d="M-11 ${hy-12}l2-12q3 4 9 4t9-4l2 12z" fill="${black}"/><rect x="-11" y="${hy-15}" width="22" height="3" fill="#3A3F52"/>`,
  biber:`<ellipse cy="${hy-11}" rx="23" ry="4" fill="${black}"/><path d="M-11 ${hy-12}q0-15 11-15t11 15z" fill="${black}"/><path d="M-6 ${hy-23}q4-3 9-1" stroke="rgba(255,255,255,.18)" stroke-width="2" fill="none"/><path d="M-11 ${hy-14}h22" stroke="#3A3F52" stroke-width="2.4"/>`,
  samet:`<ellipse cy="${hy-11}" rx="19" ry="3.5" fill="#0B0C10"/><path d="M-10 ${hy-12}q0-11 10-11t10 11z" fill="#0B0C10"/><path d="M-6 ${hy-19}q5-4 10-2" stroke="rgba(255,255,255,.22)" stroke-width="2" fill="none"/>`,
  velvet:`<path d="M-12 ${hy-8}q12-13 24 0q-12-3-24 0z" fill="#0B0C10"/><path d="M-6 ${hy-13}q5-3 10-1" stroke="rgba(255,255,255,.3)" stroke-width="1.6" fill="none"/>`,
  sefardi:`<path d="M-12 ${hy-8}q12-11 24 0z" fill="${tc==="#F4F1E6"?"#1A3F7A":tc}"/>${[-6,0,6].map(x=>`<circle cx="${x}" cy="${hy-11}" r="1.1" fill="${gold}"/>`).join("")}`,
  bukharian:`<rect x="-11" y="${hy-21}" width="22" height="11" rx="2" fill="#7A2E3A"/><path d="M-11 ${hy-16}l3-3 3 3 3-3 3 3 3-3 3 3 3-3 2 2" stroke="${gold}" stroke-width="1.3" fill="none"/><path d="M-11 ${hy-12}h22" stroke="#2457A6" stroke-width="2"/>`,
  bsamet:`<ellipse cy="${hy-11}" rx="17" ry="3.2" fill="#0B0C10"/><path d="M-9 ${hy-12}q0-10 9-10t9 10z" fill="#0B0C10"/>`,
  sh_shabbos:`<path d="M-16 ${hy+8}q-4-25 16-25t16 25q-5-6-6-14q-6 2-12-5q-3 6-8 6q-1 7-6 13z" fill="${hc}"/><path d="M2 ${hy-14}q7 1 11 9M-4 ${hy-15}q-6 2-9 8" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>`,
  sh_bangs:`<path d="M-15 ${hy+6}q-3-22 15-22t15 22q-3-6-4-11h-22q-1 5-4 11z" fill="${hc}"/><path d="M-12 ${hy-6}q12 4 24 0v-5q-12-5-24 0z" fill="${hc}"/><path d="M-8 ${hy-7}v-3M-3 ${hy-6}v-4M3 ${hy-6}v-4M8 ${hy-7}v-3" stroke="rgba(0,0,0,.18)" stroke-width="1"/>`,
  sh_layer:`<path d="M-16 ${hy+12}q-3-28 16-28t16 28l-4-4-2 3-3-14q-7 4-14 0l-3 14-2-3z" fill="${hc}"/>`,
  sh_curly:`<path d="M-15 ${hy+6}q-3-22 15-22t15 22q-4-4-6-12q-9 4-18 0q-2 8-6 12z" fill="${hc}"/>${[[-15,hy],[-16,hy+6],[15,hy],[16,hy+6],[-9,hy-14],[0,hy-17],[9,hy-14]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.4" fill="${hc}"/><circle cx="${x}" cy="${y}" r="1.6" fill="rgba(0,0,0,.14)"/>`).join("")}`,
  sh_hat:`<path d="M-15 ${hy+8}q-3-24 15-24t15 24q-4-6-5-14q-10 5-20 0q-1 8-5 14z" fill="${hc}"/><ellipse cy="${hy-12}" rx="21" ry="4" fill="#3A2A5A"/><path d="M-10 ${hy-13}q10-13 20 0z" fill="#3A2A5A"/><circle cx="9" cy="${hy-14}" r="3.2" fill="#F48FB1"/><circle cx="9" cy="${hy-14}" r="1.3" fill="${gold}"/>`,
  pillbox:`<path d="M-15 ${hy+6}q-3-22 15-22t15 22q-4-4-6-12q-9 4-18 0q-2 8-6 12z" fill="${hc}"/><rect x="0" y="${hy-23}" width="14" height="7" rx="2" fill="${tc==="#F4F1E6"?"#7A2E3A":tc}" transform="rotate(12 7 ${hy-19})"/><path d="M1 ${hy-17}q6 3 12 0" stroke="${gold}" stroke-width="1" fill="none"/>`,
  tichel_knot:`<path d="M-15 ${hy+2}q-2-20 15-20t15 20q-3-8-15-8t-15 8z" fill="${tc}"/><circle cx="12" cy="${hy-9}" r="4.5" fill="${tc}"/><path d="M13 ${hy-6}q5 7 3 15M11 ${hy-6}q1 8-2 13" stroke="${tc}" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="12" cy="${hy-9}" r="4.5" fill="rgba(0,0,0,.12)"/><path d="M-12 ${hy-6}q12-6 24 0" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>`,
  turban:`<path d="M-15 ${hy+1}q-3-24 15-24t15 24q-4-7-15-7t-15 7z" fill="${tc}"/><path d="M-13 ${hy-6}q8-10 20-4M-10 ${hy-14}q10-6 20 2M-4 ${hy-21}q8 2 12 8" stroke="rgba(0,0,0,.18)" stroke-width="1.6" fill="none"/>`,
  shpitzel:`<path d="M-14 ${hy-4}q14-6 28 0v-4q-14-5-28 0z" fill="${hc}"/><path d="M-15 ${hy+2}q-2-22 15-22t15 22q-3-10-15-11t-15 11z" fill="${tc}"/><path d="M-13 ${hy-9}q13-7 26 0" stroke="rgba(255,255,255,.4)" stroke-width="2" fill="none"/>`,
  pigtails:`<path d="M-13 ${hy+2}q-1-15 13-15t13 15q-3-7-13-8t-13 8z" fill="${hc}"/>${[-1,1].map(s=>`<path d="M${s*13} ${hy-2}q${s*7} 4 ${s*5} 16" stroke="${hc}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="${s*13}" cy="${hy-2}" r="2.2" fill="#E57373"/>`).join("")}`,
  bun:`<path d="M-13 ${hy+2}q-1-15 13-15t13 15q-3-7-13-8t-13 8z" fill="${hc}"/><circle cy="${hy-17}" r="6" fill="${hc}"/><path d="M-4 ${hy-17}q4 3 8 0" stroke="rgba(0,0,0,.18)" stroke-width="1" fill="none"/>`,
  curls:`<path d="M-13 ${hy+2}q-1-15 13-15t13 15q-3-7-13-8t-13 8z" fill="${hc}"/>${[[-13,hy+2],[-14,hy+8],[13,hy+2],[14,hy+8],[-7,hy-12],[2,hy-14],[9,hy-11]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.2" fill="${hc}"/>`).join("")}`,
  bandbow:`<path d="M-13 ${hy+4}q-1-17 13-17t13 17q-3-7-13-8t-13 8z" fill="${hc}"/><path d="M-12 ${hy-6}q12-9 24 0" stroke="#E57373" stroke-width="3" fill="none"/><path d="M7 ${hy-11}l7-5v10zM7 ${hy-11}l-6-5v10z" fill="#E57373"/><circle cx="7" cy="${hy-11}" r="1.6" fill="#C0392B"/>`}}
/* longer sheitels and hair that fall behind the shoulders */
function avBackX(a,hy,hc){const h=a.head;
 if(h==="sh_shabbos")return `<path d="M-16 ${hy-2}q-6 26 0 42h32q6-16 0-42z" fill="${hc}"/>`;
 if(h==="sh_layer")return `<path d="M-15 ${hy-2}q-4 18 0 26h30q4-8 0-26z" fill="${hc}"/>`;
 if(h==="sh_hat")return `<path d="M-15 ${hy-2}q-3 24 2 34h26q5-10 2-34z" fill="${hc}"/>`;
 return ""}
