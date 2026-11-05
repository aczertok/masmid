/* ================= ARTWORK (original, drawn in SVG) ================= */
let _uid=0;const uid=p=>p+"_"+(++_uid);
function starField(n,w,h,seed){let r=seed||7;const rnd=()=>(r=(r*9301+49297)%233280)/233280;let s="";
 for(let i=0;i<n;i++){const x=rnd()*w,y=rnd()*h,z=rnd()*1.5+.5;s+=`<circle class="tw" style="animation-delay:${(rnd()*3).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z.toFixed(1)}" fill="#fff"/>`}return s}
function sky(id,a,b){return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`}

/* Ner, the app's candle mascot. moods: happy, cheer, think, sad, rest */
function ner(mood="happy",cls=""){const g=uid("glow");
 const eyes=mood==="rest"?`<path d="M38 63q4 4 8 0M54 63q4 4 8 0" stroke="#16213A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  :mood==="think"?`<circle cx="44" cy="61" r="3.6" fill="#16213A"/><circle cx="58" cy="61" r="3.6" fill="#16213A"/><circle cx="45" cy="59.8" r="1.2" fill="#fff"/><circle cx="59" cy="59.8" r="1.2" fill="#fff"/>`
  :`<circle cx="43" cy="63" r="3.8" fill="#16213A"/><circle cx="57" cy="63" r="3.8" fill="#16213A"/><circle cx="44.2" cy="61.6" r="1.3" fill="#fff"/><circle cx="58.2" cy="61.6" r="1.3" fill="#fff"/>`;
 const mouth={happy:`<path d="M44 74q6 6 12 0" stroke="#16213A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  cheer:`<path d="M42 72q8 12 16 0z" fill="#16213A"/><path d="M45.5 76q4.5 3 9 0" fill="#E8636B"/>`,
  think:`<circle cx="52" cy="76" r="2.6" fill="#16213A"/>`,
  sad:`<path d="M44 78q6-5 12 0" stroke="#16213A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  rest:`<path d="M45 74q5 4 10 0" stroke="#16213A" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}[mood];
 const big=mood==="cheer"?1.18:mood==="sad"?.78:1;
 const arms=mood==="cheer"?`<path d="M34 70l-12-14M66 70l12-14" stroke="#E9D9B0" stroke-width="5" stroke-linecap="round"/><circle cx="21" cy="55" r="3.5" fill="#FFF8E7"/><circle cx="79" cy="55" r="3.5" fill="#FFF8E7"/>`:"";
 const zz=mood==="rest"?`<text x="70" y="30" font-family="Rubik,sans-serif" font-weight="800" font-size="13" fill="currentColor" opacity=".7">z</text><text x="79" y="20" font-family="Rubik,sans-serif" font-weight="800" font-size="10" fill="currentColor" opacity=".5">z</text>`:"";
 const spark=mood==="cheer"?`<path class="tw" d="M14 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F1BD3C"/><path class="tw" style="animation-delay:.6s" d="M86 34l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#F1BD3C"/>`:"";
 return `<svg class="ner ${cls}" viewBox="0 0 100 124" aria-hidden="true"><defs><radialGradient id="${g}"><stop offset="0" stop-color="#FFD866" stop-opacity=".55"/><stop offset="1" stop-color="#FFD866" stop-opacity="0"/></radialGradient></defs>
 <circle cx="50" cy="${mood==="rest"?28:24}" r="${26*big}" fill="url(#${g})"/>${spark}${arms}
 <g style="transform-origin:50px 40px;transform:scale(${big})"><g class="flame"><path d="M50 8c10 13 13 22 0 32-13-10-10-19 0-32z" fill="#F4A51C"/><path d="M50 20c5 7 6 12 0 17-6-5-5-10 0-17z" fill="#FFF0B8"/></g></g>
 <path d="M50 39v4" stroke="#3B2A10" stroke-width="2"/>
 <rect x="32" y="42" width="36" height="62" rx="10" fill="#FFF8E7" stroke="#E9D9B0" stroke-width="2"/>
 <path d="M60 44c4 2 6 6 6 9-3-1-5-3-6-5z" fill="#F3E7C7"/>
 ${eyes}<ellipse cx="38" cy="71" rx="4" ry="2.6" fill="#F2A1A7" opacity=".65"/><ellipse cx="62" cy="71" rx="4" ry="2.6" fill="#F2A1A7" opacity=".65"/>${mouth}
 <path d="M22 106h56l-6 10H28z" fill="#E3A312"/><rect x="18" y="102" width="64" height="6" rx="3" fill="#F1BD3C"/>${zz}</svg>`}

const SCENES={
 m1a:{cap:"צאת הכוכבים · nightfall",draw(){const s=uid("s");return `<defs>${sky(s,"#0A1636","#2B4A88")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(46,320,95,11)}
  <circle cx="262" cy="34" r="15" fill="#F7E7AE"/><circle cx="270" cy="29" r="13.5" fill="#0F1E45"/>
  <path d="M0 112Q70 84 140 104T320 100V150H0z" fill="#16295A"/>
  <g fill="#0D1B40"><rect x="40" y="88" width="26" height="30"/><path d="M38 89l15-12 15 12z"/><rect x="72" y="80" width="34" height="38"/><path d="M72 81q17-20 34 0z"/><rect x="112" y="92" width="22" height="26"/></g>
  <g fill="#F2C14E"><rect class="win" x="47" y="96" width="5" height="7"/><rect class="win" style="animation-delay:1s" x="56" y="96" width="5" height="7"/><rect x="84" y="94" width="10" height="14" rx="5"/><rect class="win" style="animation-delay:2s" x="119" y="99" width="6" height="7"/></g>
  <path d="M0 132Q90 118 170 128T320 124V150H0z" fill="#0A1430"/>`}},
 m1b:{cap:"בית המשתה · the walk home",draw(){const s=uid("s"),d=uid("d");return `<defs>${sky(s,"#1B1440","#4A2F6E")}<radialGradient id="${d}" cx="1" cy="1" r="1"><stop offset="0" stop-color="#FF9F6B" stop-opacity=".75"/><stop offset="1" stop-color="#FF9F6B" stop-opacity="0"/></radialGradient></defs>
  <rect width="320" height="150" fill="url(#${s})"/><rect width="320" height="150" fill="url(#${d})"/>${starField(28,320,70,5)}
  <path d="M10 18Q80 46 160 22T310 24" stroke="#C9B37A" stroke-width="1.2" fill="none"/>
  ${[30,62,96,130,164,198,232,266,296].map((x,i)=>`<circle class="tw" style="animation-delay:${i*.3}s" cx="${x}" cy="${[22,31,37,33,24,29,33,30,25][i]}" r="4" fill="#FFD66B"/>`).join("")}
  <path d="M0 116Q100 96 200 112T320 106V150H0z" fill="#2A1D4D"/>
  <rect x="30" y="66" width="96" height="52" fill="#3A2A62"/><path d="M24 68l54-26 54 26z" fill="#2E2152"/>
  <rect x="44" y="80" width="14" height="14" rx="2" fill="#FFCF66"/><rect x="98" y="80" width="14" height="14" rx="2" fill="#FFCF66"/><path d="M70 118V92q8-10 16 0v26z" fill="#FFE29A"/>
  <path d="M78 118Q150 124 200 134T320 140V150H64z" fill="#C79A5A" opacity=".55"/>
  <path d="M0 136Q120 126 220 140T320 138V150H0z" fill="#1B1236"/>`}},
 m2:{cap:"תכלת ולבן · first light",draw(){const s=uid("s");return `<defs>${sky(s,"#2F5EAE","#F6C877")}</defs><rect width="320" height="150" fill="url(#${s})"/>
  <g class="rays" style="transform-origin:150px 116px">${[...Array(9)].map((_,i)=>{const a=Math.PI*(i+1)/10;return `<path d="M150 116L${(150+170*Math.cos(a)).toFixed(0)} ${(116-170*Math.sin(a)).toFixed(0)}" stroke="#FFF3CF" stroke-width="7" opacity=".22"/>`}).join("")}</g>
  <circle cx="150" cy="118" r="26" fill="#FFE08A"/><circle cx="150" cy="118" r="20" fill="#FFF1C2"/>
  <path d="M0 112Q80 98 160 114T320 106V150H0z" fill="#5E8C46"/><path d="M0 130Q100 118 200 130T320 128V150H0z" fill="#467534"/>
  <rect x="236" y="0" width="70" height="10" fill="#F4F1E6"/>
  <g class="sway" style="transform-origin:262px 8px"><path d="M258 8q-4 30 2 60t-2 56" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M266 8q4 30-2 60t3 56" stroke="#2457A6" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="262" cy="22" rx="7" ry="4" fill="#F4F1E6"/><ellipse cx="262" cy="40" rx="6" ry="3.4" fill="#F4F1E6"/></g>
  <g class="sway" style="transform-origin:292px 8px;animation-delay:.7s"><path d="M288 8q-3 26 2 50t-1 44" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M296 8q3 26-2 50t2 44" stroke="#2457A6" stroke-width="3" fill="none" stroke-linecap="round"/></g>`}},
 m3:{cap:"ובלכתך בדרך · on the road",draw(){const s=uid("s");return `<defs>${sky(s,"#3B2C6E","#F29A62")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(14,320,40,3)}
  <circle cx="64" cy="70" r="18" fill="#FFD39A" opacity=".9"/>
  <path d="M0 98Q60 80 130 92T260 86T320 92V150H0z" fill="#7A4E72"/>
  <path d="M0 114Q90 100 180 112T320 108V150H0z" fill="#5B3A5E"/>
  <path d="M150 92q-6 8 2 14t-14 14-34 30h54q4-12 12-22t-4-20 0-16z" fill="#E7B77D" opacity=".85"/>
  <path d="M210 150q6-40 40-46t52 10l18 36z" fill="#3A2440"/>
  <g class="blink"><ellipse cx="248" cy="126" rx="3.2" ry="2.2" fill="#FFE27A"/><ellipse cx="258" cy="126" rx="3.2" ry="2.2" fill="#FFE27A"/></g>
  <g class="blink" style="animation-delay:1.3s"><ellipse cx="280" cy="132" rx="3" ry="2" fill="#FFE27A"/><ellipse cx="289" cy="132" rx="3" ry="2" fill="#FFE27A"/></g>
  <path d="M40 150l6-34" stroke="#6B4423" stroke-width="3"/><path d="M28 116h26l4 5-4 5H28z" fill="#C98B4E"/>`}},
 m4:{cap:"ברכות קריאת שמע · seven berachos",draw(){const s=uid("s");const dot=(x,y,c,dl)=>`<circle class="tw" style="animation-delay:${dl}s" cx="${x}" cy="${y}" r="6" fill="${c}"/>`;return `<defs>${sky(s,"#1F3E78","#6C5BB0")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(16,320,150,9)}
  <path d="M160 46q-50-18-112-6v92q62-12 112 6z" fill="#FBF6E8"/><path d="M160 46q50-18 112-6v92q-62-12-112 6z" fill="#F2EBD6"/><path d="M160 46v92" stroke="#D9CBA4" stroke-width="2"/>
  <circle cx="104" cy="74" r="13" fill="#F7B733"/>${[...Array(8)].map((_,i)=>{const a=i*Math.PI/4;return `<path d="M${(104+17*Math.cos(a)).toFixed(1)} ${(74+17*Math.sin(a)).toFixed(1)}L${(104+22*Math.cos(a)).toFixed(1)} ${(74+22*Math.sin(a)).toFixed(1)}" stroke="#F7B733" stroke-width="3" stroke-linecap="round"/>`}).join("")}
  ${dot(84,108,"#2457A6",0)}${dot(100,108,"#2457A6",.3)}${dot(124,108,"#4E9A33",.6)}
  <circle cx="216" cy="74" r="13" fill="#7D5CC0"/><circle cx="222" cy="69" r="11" fill="#F2EBD6"/>
  ${dot(188,108,"#2457A6",.2)}${dot(204,108,"#2457A6",.5)}${dot(228,108,"#4E9A33",.8)}${dot(244,108,"#4E9A33",1.1)}
  <text x="104" y="128" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="11" fill="#5B6884">שחרית</text><text x="216" y="128" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="11" fill="#5B6884">ערבית</text>`}},
 m5:{cap:"יציאת מצרים · by night",draw(){const s=uid("s"),w=uid("w");return `<defs>${sky(s,"#0B1534","#27406F")}${sky(w,"#4C8FD6","#1C4E8F")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(50,320,90,21)}
  <circle cx="60" cy="32" r="13" fill="#F7E7AE"/>
  <path d="M190 96l18-22 18 22zM218 96l14-16 14 16zM248 96l10-12 10 12z" fill="#2E2A4F"/>
  <path d="M0 96h320v54H0z" fill="#1B3566"/>
  <path d="M146 96h28l40 54H106z" fill="#D9B77A"/>
  <path d="M0 150V90q20-14 40-4t40-6 30 8 36 8l-40 54z" fill="url(#${w})"/><path d="M320 150V90q-20-14-40-4t-40-6-30 8-36 8l40 54z" fill="url(#${w})"/>
  <path class="wave" d="M6 92q14-8 28 0t28 0 28 0" stroke="#BFE0FF" stroke-width="2" fill="none" opacity=".7"/><path class="wave" style="animation-delay:.8s" d="M230 92q14-8 28 0t28 0 28 0" stroke="#BFE0FF" stroke-width="2" fill="none" opacity=".7"/>
  ${[150,156,162,168].map((x,i)=>`<circle cx="${x+(i%2)*2}" cy="${104+i*10}" r="1.6" fill="#8A6A3A"/>`).join("")}`}},
 chazara:{cap:"חזרה · review",draw(){const s=uid("s");return `<defs>${sky(s,"#2E7A3C","#7DC25E")}</defs><rect width="320" height="150" fill="url(#${s})"/>
  <circle class="spin" style="transform-origin:160px 80px" cx="160" cy="80" r="56" stroke="#E4F2DB" stroke-width="6" stroke-dasharray="24 14" fill="none" opacity=".55"/>
  <rect x="112" y="104" width="96" height="16" rx="3" fill="#1A3F7A"/><rect x="118" y="88" width="86" height="16" rx="3" fill="#B03A30"/><rect x="108" y="72" width="92" height="16" rx="3" fill="#E3A312"/><rect x="120" y="56" width="80" height="16" rx="3" fill="#7D5CC0"/>
  ${[64,80,96,112].map(y=>`<rect x="${y===112?118:y===96?124:y===80?114:126}" y="${y-4}" width="4" height="8" fill="#FFF3CF" opacity=".8"/>`).join("")}`}},
 siyum:{cap:"סיום · completion",draw(){const s=uid("s");return `<defs>${sky(s,"#4B2E94","#D18A2C")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(22,320,150,4)}
  <path d="M160 70q-48-18-104-6v70q56-10 104 6z" fill="#FBF6E8"/><path d="M160 70q48-18 104-6v70q-56-10-104 6z" fill="#F2EBD6"/><path d="M160 70v70" stroke="#D9CBA4" stroke-width="2"/>
  ${[86,96,106,116].map(y=>`<path d="M76 ${y}q36-6 72 0M172 ${y}q36-6 72 0" stroke="#C9BC98" stroke-width="2" fill="none"/>`).join("")}
  <g class="bob"><path d="M128 46l10 9 22-26 22 26 10-9-6 26h-52z" fill="#F1BD3C"/><circle cx="160" cy="27" r="4" fill="#FFF0B8"/><circle cx="128" cy="44" r="3.5" fill="#FFF0B8"/><circle cx="192" cy="44" r="3.5" fill="#FFF0B8"/></g>`}}
};
function scene(id,cls=""){const sc=SCENES[id]||SCENES.chazara;return `<svg class="scene ${cls}" data-sid="${SCENES[id]?id:"chazara"}" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(sc.cap)}">${sc.draw()}</svg>`}

/* small subject illustrations (64×64) */
const SUBJ_ART={
 mishnayos:`<rect x="10" y="40" width="44" height="10" rx="2" fill="#1A3F7A"/><rect x="14" y="30" width="38" height="10" rx="2" fill="#2457A6"/><rect x="8" y="20" width="42" height="10" rx="2" fill="#5C8FE8"/><rect x="40" y="22" width="3" height="6" fill="#FFF3CF"/><path d="M48 8l2 4 4 1.6-4 1.6-2 4-2-4-4-1.6 4-1.6z" fill="#F1BD3C"/>`,
 halacha:`<rect x="17" y="20" width="9" height="30" rx="2" fill="#FFF8E7" stroke="#D9CBA4"/><rect x="38" y="20" width="9" height="30" rx="2" fill="#FFF8E7" stroke="#D9CBA4"/><path d="M21.5 6c4 5 4 8 0 12-4-4-4-7 0-12zM42.5 6c4 5 4 8 0 12-4-4-4-7 0-12z" fill="#F4A51C"/><path d="M10 52h44l-4 6H14z" fill="#E3A312"/>`,
 chumash:`<rect x="8" y="12" width="8" height="42" rx="4" fill="#8A5A2B"/><rect x="48" y="12" width="8" height="42" rx="4" fill="#8A5A2B"/><rect x="15" y="16" width="34" height="34" fill="#FBF6E8"/>${[22,28,34,40].map(y=>`<path d="M20 ${y}h24" stroke="#C9BC98" stroke-width="2"/>`).join("")}`,
 tanakh:`<path d="M18 54V16q14-8 28 6l4 32z" fill="none" stroke="#8A5A2B" stroke-width="4" stroke-linejoin="round"/>${[24,30,36,42].map(x=>`<path d="M${x} ${54}V${20+(x-24)*.4}" stroke="#C9A65E" stroke-width="1.6"/>`).join("")}<path d="M14 54h40" stroke="#6B4423" stroke-width="5" stroke-linecap="round"/>`,
 gemara:`<rect x="8" y="10" width="48" height="44" rx="3" fill="#FBF6E8" stroke="#D9CBA4" stroke-width="2"/><rect x="22" y="20" width="20" height="24" fill="#E8DFC4"/>${[16,22,28,34,40,46].map(y=>`<path d="M12 ${y}h7M45 ${y}h7" stroke="#C9BC98" stroke-width="2"/>`).join("")}${[25,30,35,40].map(y=>`<path d="M25 ${y}h14" stroke="#9C8E6A" stroke-width="2"/>`).join("")}`,
 mussar:`<path d="M32 54C14 42 8 32 12 22c4-9 15-9 20 0 5-9 16-9 20 0 4 10-2 20-20 32z" fill="#E8636B"/><path d="M32 18c5 6 6 10 0 15-6-5-5-9 0-15z" fill="#FFD866"/>`
};


