/* ================= SCENE KIT: data-driven cartoons (background + props + speakers + timed lines) ================= */
const BG={
 day:()=>{const s=uid("s");return `<defs>${sky(s,"#7FB6EE","#E6F2FF")}</defs><rect width="320" height="150" fill="url(#${s})"/><path d="M0 118Q80 108 160 118T320 114V150H0z" fill="#7DAE5E"/>`},
 field:()=>{const s=uid("s");return `<defs>${sky(s,"#8CC2F2","#F3EFD8")}</defs><rect width="320" height="150" fill="url(#${s})"/><path d="M0 112h320v38H0z" fill="#C9A85A"/>${[118,126,134,142].map(y=>`<path d="M0 ${y}h320" stroke="#B08E45" stroke-width="2"/>`).join("")}`},
 night:()=>{const s=uid("s");return `<defs>${sky(s,"#0A1636","#2B4A88")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(30,320,90,uid("x").length*7)}${moonIcon(278,28,10,"#14275A")}<path d="M0 120Q80 110 160 120T320 116V150H0z" fill="#16295A"/>`},
 dawn:()=>{const s=uid("s");return `<defs>${sky(s,"#3A6CC0","#F6C877")}</defs><rect width="320" height="150" fill="url(#${s})"/><circle cx="270" cy="112" r="16" fill="#FFE08A"/><path d="M0 116Q80 106 160 116T320 112V150H0z" fill="#5E8C46"/>`},
 dusk:()=>{const s=uid("s");return `<defs>${sky(s,"#3B2C6E","#F29A62")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(10,320,40,5)}<path d="M0 116Q80 104 160 116T320 110V150H0z" fill="#5B3A5E"/>`},
 storm:()=>{const s=uid("s");return `<defs>${sky(s,"#3A4258","#8A93A8")}</defs><rect width="320" height="150" fill="url(#${s})"/><path class="blink" d="M200 10l-14 30h12l-10 26 26-36h-12l10-20z" fill="#FFE27A"/><ellipse cx="90" cy="26" rx="40" ry="14" fill="#5B6378"/><ellipse cx="200" cy="18" rx="46" ry="14" fill="#5B6378"/><path d="M0 120h320v30H0z" fill="#5E7A50"/>`},
 indoor:()=>`${room("#E3D2B0","#9C7650")}<rect x="250" y="24" width="48" height="40" rx="3" fill="#CFE6FF" stroke="#6B4A2A" stroke-width="4"/>`,
 shul:()=>`${room("#E9DCC0","#8A6A48")}<rect x="130" y="16" width="60" height="84" rx="6" fill="#6B2F3A"/><path d="M136 22h48v72h-48z" fill="#8A3A48"/><path d="M160 34l6 10h-12zM160 58l-6-10h12z" fill="#F1BD3C"/><rect x="128" y="10" width="64" height="8" rx="3" fill="#B07D06"/>`,
 sea:()=>{const s=uid("s");return `<defs>${sky(s,"#7FB6EE","#E6F2FF")}</defs><rect width="320" height="150" fill="url(#${s})"/><path d="M0 104h320v46H0z" fill="#3E86D0"/><path class="wave" d="M0 112q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" stroke="#BFE0FF" stroke-width="2" fill="none"/>`},
 temple:()=>{const s=uid("s");return `<defs>${sky(s,"#9CC9F2","#FFF3D6")}</defs><rect width="320" height="150" fill="url(#${s})"/><rect x="20" y="44" width="280" height="80" fill="#E3C98E"/>${[0,1,2,3,4,5,6].map(r=>[...Array(8)].map((_,c)=>`<rect x="${22+c*36-(r%2)*18}" y="${46+r*11}" width="34" height="9" rx="1" fill="#D9BE80" opacity=".8"/>`).join("")).join("")}<path d="M130 124V80q30-26 60 0v44z" fill="#8A5A2B"/><path d="M134 124V82q26-22 52 0v42z" fill="#F1BD3C" opacity=".35"/><path d="M0 124h320v26H0z" fill="#C9A46A"/>`},
 city:()=>{const s=uid("s");return `<defs>${sky(s,"#E9B87A","#FFE9C2")}</defs><rect width="320" height="150" fill="url(#${s})"/>${[[10,70,40],[54,58,34],[92,74,30],[226,62,36],[266,72,44]].map(([x,y,w])=>`<rect x="${x}" y="${y}" width="${w}" height="${124-y}" fill="#B98A5A"/><rect x="${x+8}" y="${y+10}" width="8" height="10" fill="#FFE29A"/>`).join("")}<path d="M0 124h320v26H0z" fill="#A88A5A"/>`}
};
const PR={
 sefer:`<path d="M-22 -6q22-8 22 0v18q0-8-22 0z" fill="#FBF6E8" stroke="#8A5A2B"/><path d="M22 -6q-22-8-22 0v18q0-8 22 0z" fill="#F2EBD6" stroke="#8A5A2B"/>`,
 tree:`<rect x="-5" y="-40" width="10" height="40" fill="#6B4423"/><circle cy="-52" r="24" fill="#3E7A34"/><circle cx="-18" cy="-42" r="14" fill="#4A8A3C"/><circle cx="18" cy="-42" r="14" fill="#4A8A3C"/>${[[-10,-56],[8,-48],[14,-62],[-16,-40]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="#E8636B"/>`).join("")}`,
 wall:`<rect x="-30" y="-56" width="60" height="56" fill="#C9B07A"/>${[0,1,2,3].map(r=>`<path d="M-30 ${-14*r-14}h60" stroke="#A88E58" stroke-width="2"/>`).join("")}`,
 crown:`<path d="M-16 6l3-14 7 7 6-12 6 12 7-7 3 14z" fill="#F1BD3C" stroke="#B07D06"/>`,
 candle:`<rect x="-3" y="-16" width="6" height="16" rx="2" fill="#FFF8E7"/><g class="flame" style="transform-origin:0px -16px"><path d="M0 -28c3.5 4.5 4.5 8 0 12-4.5-4-3.5-7.5 0-12z" fill="#F4A51C"/></g><circle cy="-20" r="12" fill="#FFD866" opacity=".2"/>`,
 tefillin:`<rect x="-10" y="-10" width="20" height="20" rx="2" fill="#1F2433"/><path d="M10 0q16 4 10 20" stroke="#1F2433" stroke-width="3" fill="none"/><text y="5" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="12" fill="#F1BD3C">ש</text>`,
 mezuzah:`<rect x="-5" y="-18" width="10" height="36" rx="3" fill="#C9A34A" stroke="#8A6A22"/><text y="4" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="9" fill="#5A4410">ש</text>`,
 bread:`<path d="M-24 4q0-16 24-16t24 16z" fill="#D8963F"/><path d="M-14 -2l4-6M-2 -4l4-6M10 -2l4-6" stroke="#B5762A" stroke-width="2"/>`,
 pool:`<path d="M-60 0h120v-12q-60-10-120 0z" fill="#5DA8EE"/><path class="wave" d="M-50 -6q10-4 20 0t20 0 20 0 20 0" stroke="#BFE0FF" stroke-width="2" fill="none"/>`,
 mikveh:`<rect x="-36" y="-44" width="72" height="44" fill="#D9C9A6"/><path d="M-42 -42l42-22 42 22z" fill="#8A5A2B"/><rect x="-8" y="-24" width="16" height="24" fill="#6B4A2A"/><text y="-30" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="10" fill="#5B4A1E">מקוה</text>`,
 sun:`${sunIcon(0,0,11)}`,
 rock:`<path d="M-40 0q4-30 34-34t46 20l2 14z" fill="#6E5A6E"/>`,
 donkey:`<ellipse cx="0" cy="-26" rx="26" ry="12" fill="#8E8A86"/><rect x="-20" y="-18" width="5" height="18" fill="#7A7672"/><rect x="14" y="-18" width="5" height="18" fill="#7A7672"/><path d="M20 -32l12-14 6 4-8 16z" fill="#8E8A86"/><path d="M30 -46l-2-10 4 2zM35 -44l2-10 2 8z" fill="#7A7672"/><circle cx="33" cy="-40" r="1.5" fill="#1A1A1A"/>`,
 boat:`<path d="M-50 0h100l-14 18h-72z" fill="#8A5A2B"/><rect x="-2" y="-46" width="4" height="46" fill="#6B4423"/><path d="M2 -44l30 34h-30z" fill="#FBF6E8"/>`,
 snake:`<path d="M-30 0q10-10 20 0t20 0 14-6" stroke="#4E9A33" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="26" cy="-6" r="5" fill="#4E9A33"/><circle cx="27" cy="-7" r="1.2" fill="#1A1A1A"/>`,
 cloud:`<ellipse rx="34" ry="13" fill="#FFFFFF"/><ellipse cx="-16" cy="-8" rx="16" ry="12" fill="#FFFFFF"/><ellipse cx="12" cy="-10" rx="18" ry="13" fill="#FFFFFF"/>${[-20,-6,8,22].map((x,i)=>`<path class="tw" style="animation-delay:${i*.3}s" d="M${x} 16l-3 8" stroke="#5DA8EE" stroke-width="2.5" stroke-linecap="round"/>`).join("")}`,
 havdalah:`<path d="M-8 -30q-6 30 0 30M0 -30v30M8 -30q6 30 0 30" stroke="#FFF8E7" stroke-width="4" fill="none"/><g class="flame" style="transform-origin:0px -30px"><path d="M0 -48c6 7 8 12 0 18-8-6-6-11 0-18z" fill="#F4A51C"/></g><rect x="22" y="-14" width="14" height="14" rx="2" fill="#C9A34A"/><path d="M29 -14v-8" stroke="#C9A34A" stroke-width="3"/>`,
 amud:`<path d="M-22 0v-40h44v40z" fill="#8A5A2B"/><path d="M-26 -40h52l-6 -10h-40z" fill="#A87444"/>`,
 grapes:`${[[0,0],[-7,-8],[7,-8],[-12,-16],[0,-16],[12,-16],[-6,-24],[6,-24]].map(([x,y])=>`<circle cx="${x}" cy="${y+10}" r="6" fill="#7D4FA8"/>`).join("")}<path d="M0 -20v-8" stroke="#4E7A34" stroke-width="3"/>`,
 veg:`<path d="M-8 0q-10-20 4-30M8 0q12-18-2-30M0 0v-34" stroke="#4E9A33" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-14 0h28l-4 14h-20z" fill="#E8862C"/>`,
 apple:`<circle r="13" fill="#D9413A"/><path d="M0 -12q2-8 8-10" stroke="#6B4423" stroke-width="2.5" fill="none"/><ellipse cx="7" cy="-16" rx="5" ry="2.5" fill="#4E9A33"/>`,
 milk:`<path d="M-10 -26h20l4 8v26h-28v-26z" fill="#FFFFFF" stroke="#9AA8BE"/><rect x="-14" y="-6" width="28" height="10" fill="#7FC0F5"/>`,
 cheese:`<path d="M-20 6l40 0-6-22z" fill="#F7C948" stroke="#D9A72A"/><circle cx="2" cy="-2" r="2.5" fill="#D9A72A"/>`,
 eggs:`<ellipse cx="-9" cy="-4" rx="8" ry="10" fill="#FFF8E7" stroke="#D9CBA4"/><ellipse cx="8" cy="-2" rx="8" ry="10" fill="#FFF8E7" stroke="#D9CBA4"/>`,
 figs:`<path d="M0 -14q14 4 10 16q-4 8-10 8t-10-8q-4-12 10-16z" fill="#7A4A6E"/><path d="M0 -14v-6" stroke="#4E7A34" stroke-width="2.5"/>`,
 pom:`<circle r="12" fill="#C2353B"/><path d="M-4 -12l4 -6 4 6" fill="#C2353B"/>`,
 table:`<rect x="-46" y="-16" width="92" height="7" rx="2" fill="#8A5A2B"/><rect x="-40" y="-9" width="6" height="18" fill="#6B4423"/><rect x="34" y="-9" width="6" height="18" fill="#6B4423"/>`,
 wine:`<path d="M-10 -26h20q0 16-10 18q-10-2-10-18z" fill="#C0C6D4"/><path d="M-8 -22h16q-1 10-8 12q-7-2-8-12z" fill="#8A1C32"/><rect x="-1.5" y="-8" width="3" height="10" fill="#C0C6D4"/><rect x="-8" y="2" width="16" height="3" rx="1.5" fill="#C0C6D4"/>`,
 cup:`<path d="M-12 -14h24l-3 22h-18z" fill="#C9D3E2" stroke="#6E7C94" stroke-width="1.5"/><path d="M-12 -10q-8 0-8 6t8 6M12 -10q8 0 8 6t-8 6" stroke="#6E7C94" stroke-width="2.5" fill="none"/>`,
 towel:`<rect x="-14" y="-24" width="28" height="34" rx="4" fill="#E8636B"/><path d="M-14 -16h28M-14 2h28" stroke="#fff" stroke-width="2"/>`,
 pillow:`<rect x="-24" y="-12" width="48" height="20" rx="9" fill="#EADFFF" stroke="#B9A2F0"/>`,
 broom:`<rect x="-2" y="-58" width="4" height="44" fill="#8A5A2B"/><path d="M-14 0l6-16h16l6 16z" fill="#E7B95A"/>`,
 fish:`<path d="M-24 0q18-16 36 0q-18 16-36 0z" fill="#9AB8D8"/><path d="M12 0l12-10v20z" fill="#9AB8D8"/><circle cx="-14" cy="-2" r="2" fill="#1A1A1A"/>`,
 water:`<path d="M-12 -24h24l-3 30h-18z" fill="#DCEEFF" stroke="#9AA8BE"/><rect x="-10" y="-10" width="20" height="15" fill="#7FC0F5"/>`,
 olive:`<ellipse rx="7" ry="10" fill="#6B7A2A"/>`,
 egg:`<ellipse rx="10" ry="13" fill="#FFF8E7" stroke="#D9CBA4"/>`,
 split:`<path d="M-160 4q20-40 40-30t40 10 30 10l-40 56h-70z" fill="#2E6FB8"/><path d="M160 4q-20-40-40-30t-40 10-30 10l40 56h70z" fill="#2E6FB8"/><path d="M-30 50l12-40h36l12 40z" fill="#D9B77A"/>`,
 mountains:`<path d="M-160 0l50-56 40 40 40-52 50 60 40-36 40 44z" fill="#6E7F5A"/><path d="M-70 -68l10 10h-20zM-70 -68" fill="#FFFFFF"/>`,
 letter:`<rect x="-20" y="-14" width="40" height="28" rx="3" fill="#FFFFFF" stroke="#9AA8BE"/><path d="M-20 -14l20 16 20-16" stroke="#9AA8BE" fill="none"/>`,
 house:`<rect x="-34" y="-46" width="68" height="46" fill="#E7D3AE"/><path d="M-40 -44l40-26 40 26z" fill="#B03A30"/><rect x="-8" y="-24" width="16" height="24" fill="#8A5A2B"/><rect x="14" y="-36" width="12" height="10" fill="#CFE6FF"/>`,
 vessels:`<path d="M-26 0h20l-3-18h-14z" fill="#C9A34A"/><path d="M4 0q-6-10 0-22h14q6 12 0 22z" fill="#9AA8BE"/>`,
 gate:`<rect x="-40" y="-70" width="80" height="70" fill="#C9B07A"/><path d="M-20 0v-40q20-22 40 0v40z" fill="#6B4A2A"/><rect x="-44" y="-76" width="88" height="8" fill="#A88E58"/>`,
 heart:`<path class="q6-beat" d="M0 18c-20-14-28-24-24-34 4-9 16-10 24-1 8-9 20-8 24 1 4 10-4 20-24 34z" fill="#E8636B"/>`,
 wheat:`${[-10,0,10].map(x=>`<path d="M${x} 0v-40" stroke="#C9A34A" stroke-width="2.5"/>${[0,1,2,3].map(k=>`<ellipse cx="${x-3}" cy="${-36+k*7}" rx="3" ry="5" fill="#E2B85A"/><ellipse cx="${x+3}" cy="${-33+k*7}" rx="3" ry="5" fill="#E2B85A"/>`).join("")}`).join("")}`
};
let TPLN=0;
function tpl(key,o){const pre="tk"+(++TPLN);const n=Math.max(o.seq.length,1),slot=86/n;
 o.seq.forEach((_,i)=>show(`${pre}-s${i}`,6+i*slot,i===n-1?94:6+(i+1)*slot));
 anim(`${pre}-in`,"0%{opacity:0;transform:translateY(8px)}6%,94%{opacity:1;transform:translateY(0)}100%{opacity:1}");
 return {cap:o.cap,draw(){
  const bg=(BG[o.bg]||BG.day)();const cast=o.cast||[];
  const pos=cast.length===1?[160]:cast.length===2?[95,225]:[60,160,260];
  const C=cast.map((c,i)=>{const [name,robe,beard,hat,x,y,s]=c;return {name,robe,beard,hat:hat||"",x:x??pos[i],y:y??132,s:s??.9}});
  const props=(o.props||[]).map(([k,x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s||1})">${PR[k]||""}</g>`).join("");
  const people=C.map((c,i)=>`${at(c.x,c.y,c.s,man({robe:c.robe,beard:c.beard,hat:c.hat==="hat"?"hat":""}),c.x>170&&C.length>1)}${c.name?lbl(c.x,Math.min(c.y+11,144),c.name,"#FFF3CF"):""}`).join("");
  const lines=o.seq.map(([who,text,mark],i)=>{const cls=`${pre}-s${i}`;
   if(who<0||!C[who]){const w=Math.max(text.length*7.4+22,40),x=160;return `<g class="${cls}" opacity="0">${pill(x,20,text,"","","#FFFFFF")}${mark==="ok"?ckmark(x+w/2+4,20,"",1):mark==="no"?cross(x+w/2+6,20,"",1):""}</g>`}
   const c=C[who],w=text.length*6.4+20,bx=Math.min(Math.max(c.x,w/2+4),316-w/2),by=Math.max(c.y-56*c.s-18,16);
   const tail=c.x<bx-20?"left":c.x>bx+20?"right":"down";
   return `<g class="${cls}" opacity="0">${bubble(bx,by,text,"",tail,1)}${mark==="ok"?ckmark(bx+w/2+6,by,"",1):mark==="no"?cross(bx+w/2+8,by,"",1):""}</g>`}).join("");
  return `${bg}${props}<g class="${pre}-in">${people}</g>${lines}${curtain("#E6F2FF")}`}}}
