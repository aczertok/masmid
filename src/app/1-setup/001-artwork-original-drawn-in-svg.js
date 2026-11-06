/* ================= ARTWORK (original, drawn in SVG) ================= */
let _uid=0;const uid=p=>p+"_"+(++_uid);
function starField(n,w,h,seed){let r=seed||7;const rnd=()=>(r=(r*9301+49297)%233280)/233280;let s="";
 for(let i=0;i<n;i++){const x=rnd()*w,y=rnd()*h,z=rnd()*1.5+.5;s+=`<circle class="tw" style="animation-delay:${(rnd()*3).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z.toFixed(1)}" fill="#fff"/>`}return s}
function sky(id,a,b){return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`}

/* Sifri (ספרי): Masmid's original blue-and-gold Sefer buddy.
   ner(mood, cls) remains as a compatibility alias for existing lesson code. */
function sifri(mood="happy",cls=""){
 const modes=["happy","cheer","think","sad","rest"];
 const state=modes.includes(mood)?mood:"happy";
 const cheering=state==="cheer",thinking=state==="think",concerned=state==="sad",sleepy=state==="rest";
 const id=uid("sifri");
 const brows=thinking
  ?'<path d="M50 65q8-7 15-3M80 60q8-6 17-1"/>'
  :concerned?'<path d="M51 63l14 4M80 67l15-4"/>'
  :cheering?'<path d="M49 65q9-9 17-2M80 63q9-9 17 0"/>'
  :'<path d="M50 65q8-6 16-1M80 64q8-6 16-1"/>';
 const eyes=sleepy
  ?'<path d="M52 79q8 7 15 0M80 79q8 7 15 0" fill="none" stroke="#23304E" stroke-width="3.4" stroke-linecap="round"/>'
  :cheering?'<path d="M51 79q8-11 16 0M80 79q8-11 16 0" fill="none" stroke="#23304E" stroke-width="3.8" stroke-linecap="round"/>'
  :'<g class="sifri-eyes"><ellipse cx="59" cy="79" rx="11" ry="14" fill="#FFFDFB"/><ellipse cx="88" cy="79" rx="11" ry="14" fill="#FFFDFB"/><ellipse cx="'+(thinking?62:61)+'" cy="'+(thinking?77:82)+'" rx="6.2" ry="8.7" fill="#32233D"/><ellipse cx="'+(thinking?91:90)+'" cy="'+(thinking?77:82)+'" rx="6.2" ry="8.7" fill="#32233D"/><circle cx="'+(thinking?64:62)+'" cy="'+(thinking?73:77)+'" r="2.8" fill="#FFFDF9"/><circle cx="'+(thinking?93:91)+'" cy="'+(thinking?73:77)+'" r="2.8" fill="#FFFDF9"/></g>';
 const mouth=cheering
  ?'<path d="M66 98q8 18 18 0z" fill="#6D2949"/><path d="M70 109q6-5 11 0" stroke="#FFA0AA" stroke-width="3.1" fill="none"/>'
  :thinking?'<circle cx="76" cy="103" r="4.4" fill="#6D2949"/>'
  :concerned?'<path d="M68 105q8-6 16 0" stroke="#6D2949" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
  :sleepy?'<path d="M70 101q6 5 13 0" stroke="#6D2949" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
  :'<path d="M66 99q10 13 20 0" stroke="#6D2949" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
 const arms=cheering
  ?'<g class="sifri-arms"><path d="M35 90Q19 79 17 65M113 90q15-11 15-26" fill="none" stroke="#A86B35" stroke-width="7" stroke-linecap="round"/><g fill="#FFFEF8" stroke="#B5A8B2" stroke-width="1.5"><ellipse cx="16" cy="62" rx="7" ry="8"/><ellipse cx="129" cy="61" rx="7" ry="8"/></g><g fill="none" stroke="#FFFEF8" stroke-width="3.5" stroke-linecap="round"><path d="M10 60L6 51M17 57v-9M23 59l5-9M124 58l-5-8M131 55v-9M135 58l5-8"/></g></g>'
  :thinking
  ?'<g class="sifri-arms"><path d="M35 93Q20 105 16 94M113 92q14-4 7-20" fill="none" stroke="#A86B35" stroke-width="7" stroke-linecap="round"/><g fill="#FFFEF8" stroke="#B5A8B2" stroke-width="1.5"><ellipse cx="16" cy="94" rx="8" ry="6"/><ellipse cx="118" cy="72" rx="7" ry="6"/></g></g>'
  :'<g class="sifri-arms"><path d="M35 91Q19 99 14 91M113 92q15 8 20-2" fill="none" stroke="#A86B35" stroke-width="7" stroke-linecap="round"/><g fill="#FFFEF8" stroke="#B5A8B2" stroke-width="1.5"><ellipse cx="13" cy="90" rx="8" ry="6"/><ellipse cx="133" cy="90" rx="8" ry="6"/></g><path d="M10 87l-5-5M137 87l5-5" fill="none" stroke="#FFFEF8" stroke-width="4" stroke-linecap="round"/></g>';
 const stars=cheering?'<g class="sifri-sparkles" fill="#FFCD39"><path d="M15 29l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/><path d="M125 15l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></g>':"";
 return '<svg class="ner sifri sifri-'+state+' '+cls+'" viewBox="0 0 148 162" aria-hidden="true">'+
 '<defs><linearGradient id="'+id+'cover" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#549BEE"/><stop offset=".25" stop-color="#2872DB"/><stop offset=".63" stop-color="#2054B5"/><stop offset="1" stop-color="#112A7B"/></linearGradient>'+
 '<linearGradient id="'+id+'pages" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFBE6"/><stop offset="1" stop-color="#E2C48D"/></linearGradient>'+
 '<linearGradient id="'+id+'gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6A8"/><stop offset=".48" stop-color="#EFB733"/><stop offset="1" stop-color="#AD711B"/></linearGradient>'+
 '<radialGradient id="'+id+'shine"><stop offset="0" stop-color="#FFE99A" stop-opacity=".75"/><stop offset="1" stop-color="#FFE99A" stop-opacity="0"/></radialGradient></defs>'+
 '<ellipse class="sifri-glow" cx="74" cy="82" rx="72" ry="69" fill="url(#'+id+'shine)"/>'+stars+
 '<g class="sifri-feet"><path d="M59 128l-5 19M99 127l5 20" stroke="#97602D" stroke-width="8" stroke-linecap="round"/>'+
 '<path d="M33 147q7-14 20-10l16 11q4 9-7 11H39q-13 0-6-12zM91 148q10-14 25-9l10 10q3 9-10 10H96q-13-1-5-11z" fill="#244C96" stroke="#122957" stroke-width="2.5"/>'+
 '<path d="M38 153h26M96 153h25" stroke="#D5E8FD" stroke-width="3.2" stroke-linecap="round"/></g>'+arms+
 '<g class="sifri-bookmark"><path d="M42 20q-10-11-5-18q6-7 12 1q5 12 9 31l-12 12-9-12z" fill="#F35958" stroke="#B83144" stroke-width="2.2"/><path d="M42 5q-1 12 7 25" stroke="#FFB4B0" stroke-width="3" stroke-linecap="round" fill="none"/></g>'+
 '<g class="sifri-book"><path d="M29 29l13-7q4-2 9 0l68 6q8 1 8 12v88q-1 10-11 12l-76-5q-11-1-11-12z" fill="#102F72" stroke="#0B2159" stroke-width="3"/>'+
 '<path d="M112 33l12-2q8 4 8 12v85q-3 10-14 11l-7-6z" fill="url(#'+id+'pages)" stroke="#936B34" stroke-width="2.5"/>'+
 '<path d="M117 46h9M117 50h9M117 119h9M117 123h9" stroke="#BCA579" stroke-width="1.7" stroke-linecap="round"/>'+
 '<rect x="33" y="26" width="89" height="110" rx="13" fill="url(#'+id+'gold)" stroke="#8D5E1E" stroke-width="2.3"/>'+
 '<rect x="38" y="31" width="79" height="100" rx="10" fill="url(#'+id+'cover)" stroke="#F9D567" stroke-width="2.2"/>'+
 '<rect x="45" y="38" width="65" height="86" rx="7" fill="none" stroke="#F1C44F" stroke-width="1.8" opacity=".95"/>'+
 '<path d="M48 41h13M94 41h13M48 121h13M94 121h13" stroke="#FFDC69" stroke-width="2.4" stroke-linecap="round"/>'+
 '<path d="M53 47q22-11 49 0" stroke="#A8D4FF" stroke-width="2.5" opacity=".4" fill="none"/>'+
 '<path d="M75 42l2 4 4 1-4 2-2 4-2-4-4-2 4-1z" fill="#FFE17A"/>'+
 '<path d="M41 48v48" stroke="#A9D9FF" stroke-width="3" stroke-linecap="round" opacity=".18"/>'+
 '<ellipse cx="48" cy="96" rx="9" ry="5" fill="#FF9EAC" opacity=".37"/><ellipse cx="103" cy="96" rx="9" ry="5" fill="#FF9EAC" opacity=".37"/>'+
 '<g stroke="#203466" stroke-width="3.1" stroke-linecap="round" fill="none">'+brows+'</g>'+eyes+mouth+
 '<g class="sifri-book-icon" fill="none" stroke="#FFE27F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M66 115q8-4 14 1q6-5 14-1v11q-9-2-14 3q-5-5-14-3z"/><path d="M80 116v13"/></g>'+
 '</g></svg>';
}
function ner(mood="happy",cls=""){return sifri(mood,cls)}


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


