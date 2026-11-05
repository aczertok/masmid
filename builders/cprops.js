/* extra scene-kit pieces for Chumash */
BG.space=()=>{const s=uid("s");return `<defs><radialGradient id="${s}" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#1B2550"/><stop offset="1" stop-color="#05081A"/></radialGradient></defs><rect width="320" height="150" fill="url(#${s})"/>${starField(16,320,150,41)}`};
Object.assign(PR,{
 earth:`<circle r="34" fill="#2E5B8E"/><path d="M-20 -18q10-8 20 2t-4 18q-12 6-18-6zM8 10q12-6 18 4-4 12-14 8z" fill="#4E7A44" opacity=".8"/><circle r="34" fill="none" stroke="#9CC3EC" stroke-width="2" opacity=".5"/>`,
 light:`<g class="rays" style="transform-origin:0px 0px">${[-60,-40,-20,0,20,40,60].map(a=>`<path d="M0 0L${(Math.sin(a*Math.PI/180)*170).toFixed(0)} ${(Math.cos(a*Math.PI/180)*170).toFixed(0)}" stroke="#FFF3B8" stroke-width="16" opacity=".35"/>`).join("")}</g><circle r="22" fill="#FFF7D6"/>`,
 waters:`<rect x="-160" y="0" width="320" height="26" fill="#5DA8EE" opacity=".85"/><path class="wave" d="M-150 26q15-6 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0" stroke="#BFE0FF" stroke-width="2" fill="none"/><rect x="-160" y="104" width="320" height="46" fill="#3E86D0"/>`,
 land:`<path d="M-90 0q20-40 90-44t90 44z" fill="#8FB86A"/><path d="M-60 -16q20-18 40-12" stroke="#6E9A4E" stroke-width="3" fill="none"/>`,
 stars:`${starField(40,320,90,77).replace(/cx="([\d.]+)"/g,(m,x)=>`cx="${(+x-160).toFixed(1)}"`)}`,
 moon:`${moonIcon(0,0,12,"#3B2C6E")}`,
 bird:`<path class="sway" d="M-16 0q8-10 16 0q8-10 16 0" stroke="#3A2A1A" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 lion:A.lion,deer:A.deer,leopard:A.leopard,eagle:A.eagle,
 candles:`<g transform="translate(-14 0)">${PR.candle}</g><g transform="translate(14 0)">${PR.candle}</g><rect x="-26" y="0" width="52" height="5" rx="2" fill="#C9A34A"/>`,
 mist:`${[0,1,2].map(i=>`<ellipse class="tw" style="animation-delay:${i*.7}s" cx="${-80+i*80}" cy="${-i*8}" rx="70" ry="12" fill="#FFFFFF" opacity=".6"/>`).join("")}`,
 lifetree:`<circle cy="-56" r="40" fill="#FFE9A8" opacity=".35"/>${PR.tree}`,
 rivers:`<circle cx="0" cy="60" r="14" fill="#5DA8EE"/>${[[-150,20],[-60,150],[60,150],[150,20]].map(([x,y])=>`<path d="M0 60Q${x/2} ${(60+y)/2+10} ${x} ${y}" stroke="#5DA8EE" stroke-width="7" fill="none"/>`).join("")}<path d="M0 60v-20" stroke="#5DA8EE" stroke-width="7"/>`,
 thorns:`${[-30,-10,10,30].map(x=>`<path d="M${x} 0l-6-26 6 8 6-14 2 20 6-10z" fill="#6E5A3A"/>`).join("")}`,
 sword:`<g class="spin" style="transform-origin:0px 0px"><rect x="-3" y="-34" width="6" height="56" rx="2" fill="#C9D3E2"/><path d="M-10 18h20" stroke="#8A5A2B" stroke-width="5"/></g>${[0,1,2].map(i=>`<path class="flame" style="transform-origin:0px 0px;animation-delay:${i*.3}s" d="M${-20+i*20} -30c6 8 8 14 0 22-8-8-6-14 0-22z" fill="#F46A1C" opacity=".8"/>`).join("")}`,
 sheep:`<ellipse cx="0" cy="-16" rx="22" ry="14" fill="#FFFFFF" stroke="#D9D9D9"/><circle cx="20" cy="-22" r="8" fill="#3A3A3A"/><rect x="-14" y="-6" width="4" height="12" fill="#3A3A3A"/><rect x="10" y="-6" width="4" height="12" fill="#3A3A3A"/>`,
 altar:`<rect x="-30" y="-34" width="60" height="34" fill="#9AA0AE"/>${[0,1].map(r=>`<path d="M-30 ${-11-r*11}h60" stroke="#7E8494" stroke-width="2"/>`).join("")}<g class="flame" style="transform-origin:0px -34px"><path d="M-12 -34c2-14 10-16 8-28 9 8 12 16 6 26 3-3 4-8 3-12 7 8 6 14 2 14z" fill="#F4A51C"/></g>${[0,1,2].map(i=>`<circle class="mnote" style="animation-delay:${i*.8}s" cx="${-4+i*5}" cy="-70" r="${4+i}" fill="#C9C3D8" opacity=".5"/>`).join("")}`,
 cityp:`<rect x="-26" y="-50" width="22" height="50" fill="#B98A5A"/><rect x="0" y="-38" width="26" height="38" fill="#A87444"/><rect x="-20" y="-40" width="8" height="8" fill="#FFE29A"/><rect x="8" y="-28" width="8" height="8" fill="#FFE29A"/>`,
 tent:`<path d="M-30 0l30-40 30 40z" fill="#C98A20"/><path d="M0 0l-8-12h16z" fill="#7A4E12"/>`,
 harp:`<path d="M-12 0V-44q22 4 26 36l-2 8z" fill="none" stroke="#8A5A2B" stroke-width="4" stroke-linejoin="round"/>${[-6,0,6].map(x=>`<path d="M${x} -2V${-38+(x+6)*1.2}" stroke="#C9A65E" stroke-width="1.5"/>`).join("")}`,
 anvil:`<path d="M-24 -20h44q-6 8-14 8v12h8v6h-30v-6h8v-12q-12 0-16-8z" fill="#5B6378"/><rect x="18" y="-40" width="5" height="22" fill="#8A5A2B" transform="rotate(30 20 -30)"/><rect x="14" y="-46" width="14" height="8" fill="#9AA0AE" transform="rotate(30 20 -30)"/>`,
 scroll:`<rect x="-46" y="-34" width="10" height="68" rx="5" fill="#8A5A2B"/><rect x="36" y="-34" width="10" height="68" rx="5" fill="#8A5A2B"/><rect x="-38" y="-28" width="76" height="56" fill="#FBF6E8"/>${[-18,-8,2,12].map(y=>`<path d="M-30 ${y}h60" stroke="#C9BC98" stroke-width="2"/>`).join("")}`,
 glow:`<circle cy="-40" r="44" fill="#FFE9A8" opacity=".45"/>`
});
