/* ---- story(): a cartoon in several short scenes ("beats"), each matched to a part of the card's text ---- */
let STN=0;
KF.push(`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}.bob{animation:bob 2.2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}.pulse{animation:pulse 2s ease-in-out infinite}
@keyframes rock{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}.rock{transform-box:fill-box;transform-origin:50% 100%;animation:rock 2.4s ease-in-out infinite}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-1.5px)}75%{transform:translateX(1.5px)}}.shake{animation:shake .5s linear infinite}
@keyframes drift{0%{transform:translateX(-8px)}100%{transform:translateX(8px)}}.drift{animation:drift 4s ease-in-out infinite alternate}
@keyframes zz{0%{transform:translate(0,0);opacity:0}30%{opacity:1}100%{transform:translate(10px,-18px);opacity:0}}.zz{animation:zz 2.2s ease-out infinite}`);
function story(key,o){const pre="st"+(++STN),B=o.beats,n=B.length,D=o.beat||6.6,T=n*D,P=t=>+Math.min(100,Math.max(0,t/T*100)).toFixed(2),f=P(.45);
 const win=(a,b,first,last)=>{const pa=P(a),pb=P(b);
  if(n===1)return "0%,100%{opacity:1}";
  if(first)return `0%,${(pb-f).toFixed(2)}%{opacity:1}${pb}%,${(100-f).toFixed(2)}%{opacity:0}100%{opacity:1}`;
  if(last)return `0%,${pa}%{opacity:0}${(pa+f).toFixed(2)}%,${(100-f).toFixed(2)}%{opacity:1}100%{opacity:0}`;
  return `0%,${pa}%{opacity:0}${(pa+f).toFixed(2)}%,${(pb-f).toFixed(2)}%{opacity:1}${pb}%,100%{opacity:0}`};
 const appear=(a,b)=>{const pa=P(a),pb=P(b);return `0%,${pa}%{opacity:0}${(pa+f).toFixed(2)}%,${pb}%{opacity:1}${Math.min(100,pb+f).toFixed(2)}%,100%{opacity:0}`};
 const times=[];
 B.forEach((b,i)=>{const a=i*D,e=a+D;anim(`${pre}-b${i}`,win(a,e,i===0,i===n-1),T,"linear");anim(`${pre}-d${i}`,win(a,e,i===0,i===n-1),T,"linear");
  const m=Math.max(b.seq.length,1),slot=(D-.7)/m,t=[];
  b.seq.forEach((s,j)=>{const s0=a+.35+j*slot;t.push(s0);const keep=s[3]==="keep"||j===m-1;anim(`${pre}-b${i}l${j}`,appear(s0,keep?e-.3:s0+slot+.15),T,"linear")});
  (b.props||[]).forEach((p,k)=>{const x=p[4]||{};if(x.in!=null||x.out!=null){const s0=x.in!=null&&t[x.in]!=null?t[x.in]:a,s1=x.out!=null&&t[x.out]!=null?t[x.out]:e-.3;anim(`${pre}-b${i}p${k}`,appear(s0,s1),T,"linear")}});
  (b.cast||[]).forEach((c,k)=>{const x=c[7]||{};if(x.to!=null){const dx=x.to-(c[4]??160),s0=x.from!=null&&t[x.from]!=null?t[x.from]:a+.2,s1=x.until!=null&&t[x.until]!=null?t[x.until]:e-.6;
    anim(`${pre}-b${i}m${k}`,`0%,${P(s0)}%{transform:translateX(0)}${P(s1)}%,100%{transform:translateX(${dx}px)}`,T,"linear")}
   if(x.in!=null||x.out!=null){const s0=x.in!=null&&t[x.in]!=null?t[x.in]:a,s1=x.out!=null&&t[x.out]!=null?t[x.out]:e-.3;anim(`${pre}-b${i}c${k}`,appear(s0,s1),T,"linear")}});
  times.push(t)});
 return {cap:o.cap,draw(){
  const beats=B.map((b,i)=>{const bg=(BG[b.bg]||BG.day)();const cast=b.cast||[];
   const pos=cast.length===1?[160]:cast.length===2?[95,225]:cast.length===3?[60,160,260]:cast.map((_,k)=>40+k*(240/Math.max(cast.length-1,1)));
   const C=cast.map((c,k)=>{const [name,robe,beard,hat,x,y,s,opt]=c;return {name,robe,beard,hat:hat||"",x:x??pos[k],y:y??132,s:s??.85,o:opt||{}}});
   const props=(b.props||[]).map(([kd,x,y,s,opt],k)=>{const o=opt||{};const inner=`<g transform="translate(${x} ${y}) scale(${s||1})${o.flip?" scale(-1 1)":""}"><g class="${o.cls||""}">${PR[kd]||""}</g></g>`;
     return o.in!=null||o.out!=null?`<g class="${pre}-b${i}p${k}" opacity="0">${inner}</g>`:inner}).join("");
   const people=C.map((c,k)=>{const o=c.o,walk=o.to!=null;
     let fig=man({robe:c.robe,beard:c.beard,hat:c.hat==="hat"?"hat":"",walk,arm:o.arm});
     if(o.pose==="lie")fig=`<g transform="translate(28 -8) rotate(-90)">${fig}</g>`;
     if(o.pose==="bow")fig=`<g transform="rotate(${o.flip?-22:22})">${fig}</g>`;
     const flip=o.flip!=null?o.flip:(walk?o.to<c.x:(c.x>170&&C.length>1));
     let g=`${at(c.x,c.y,c.s,fig,flip)}`;
     if(o.pose==="lie")g+=`<text class="zz" x="${c.x+10}" y="${c.y-24}" font-size="10" font-weight="900" fill="#BFD0FF">z</text>`;
     if(walk)g=`<g class="${pre}-b${i}m${k}">${g}</g>`;
     if(c.name&&!o.nolabel)g+=walk?`<g class="${pre}-b${i}m${k}">${lbl(c.x,Math.min(c.y+11,144),c.name,"#FFF3CF")}</g>`:lbl(c.x,Math.min(c.y+11,144),c.name,"#FFF3CF");
     return o.in!=null||o.out!=null?`<g class="${pre}-b${i}c${k}" opacity="0">${g}</g>`:g}).join("");
   const lines=b.seq.map(([who,text,mark],j)=>{const cls=`${pre}-b${i}l${j}`;
     if(who<0||!C[who]){const w=Math.max(text.length*7.4+22,40),y=b.py||20;return `<g class="${cls}" opacity="0">${pill(160,y,text,"","","#FFFFFF")}${mark==="ok"?ckmark(160+w/2+4,y,"",1):mark==="no"?cross(160+w/2+6,y,"",1):""}</g>`}
     const c=C[who],w=text.length*6.4+20,bx=Math.min(Math.max(c.x,w/2+4),316-w/2),by=Math.max(c.y-56*c.s-18,16);
     const tail=c.x<bx-20?"left":c.x>bx+20?"right":"down";
     return `<g class="${cls}" opacity="0">${bubble(bx,by,text,"",tail,1)}${mark==="ok"?ckmark(bx+w/2+6,by,"",1):mark==="no"?cross(bx+w/2+8,by,"",1):""}</g>`}).join("");
   return `<g class="${pre}-b${i}"${i&&n>1?' opacity="0"':""}>${bg}${props}${people}${lines}</g>`}).join("");
  const dots=n>1?`<g>${B.map((_,i)=>`<circle cx="${160-(n-1)*6+i*12}" cy="144" r="3.2" fill="#FFFFFF" opacity=".45"/><circle class="${pre}-d${i}" cx="${160-(n-1)*6+i*12}" cy="144" r="3.2" fill="#FFFFFF"${i?' opacity="0"':""}/>`).join("")}</g>`:"";
  return `${beats}${dots}`}}}

/* scene-kit pieces for richer stories */
Object.assign(PR,{
 dog:`<g class="shake"><ellipse cx="0" cy="-14" rx="16" ry="8" fill="#8A6A4A"/><circle cx="16" cy="-22" r="7" fill="#8A6A4A"/><path d="M18 -28l4-6 2 7z" fill="#6B4A2A"/><circle cx="19" cy="-23" r="1.2" fill="#16213A"/><rect x="-12" y="-8" width="4" height="8" fill="#6B4A2A"/><rect x="8" y="-8" width="4" height="8" fill="#6B4A2A"/><path d="M-16 -16q-8-4-8-10" stroke="#8A6A4A" stroke-width="3" fill="none"/></g><g class="pulse"><path d="M28 -26l8-4M28 -22h9M28 -18l8 4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/></g>`,
 rooster:`<g class="bob"><ellipse cx="0" cy="-16" rx="12" ry="10" fill="#C98A20"/><circle cx="10" cy="-28" r="6" fill="#C98A20"/><path d="M8 -34l2-5 2 4 2-4 1 6z" fill="#E8E8E8"/><path d="M16 -28l5 1-5 2z" fill="#F4A51C"/><path d="M-12 -18q-10-10-4-18q2 8 8 10z" fill="#2F6B57"/><path d="M-3 -6v6M3 -6v6" stroke="#F4A51C" stroke-width="2"/><circle cx="11" cy="-29" r="1" fill="#16213A"/></g>`,
 horse:`<g class="rock"><ellipse cx="0" cy="-26" rx="26" ry="11" fill="#7A4E2A"/><path d="M20 -32l12-16 8 4-6 14z" fill="#7A4E2A"/><path d="M30 -46l-6 -6" stroke="#4A2E1A" stroke-width="3"/><circle cx="36" cy="-42" r="1.2" fill="#16213A"/>${[-18,-8,8,18].map(x=>`<rect x="${x-2}" y="-18" width="4" height="18" fill="#5A3A1A"/>`).join("")}<path d="M-26 -28q-8 6-6 16" stroke="#4A2E1A" stroke-width="4" fill="none"/></g>`,
 wolf:`<g class="shake"><path d="M-20 -14q0-12 18-12h14l10-8 2 8 8 4-8 4h-12v14h-4v-8h-18v8h-4z" fill="#6E7280"/><circle cx="24" cy="-28" r="1.2" fill="#FFE29A"/><path d="M-20 -16q-10 0-12 -10" stroke="#6E7280" stroke-width="4" fill="none"/></g>`,
 choshen:`<rect x="-20" y="-28" width="40" height="40" rx="3" fill="#C9A34A" stroke="#8A6A2B" stroke-width="2"/>${[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect class="pulse" style="animation-delay:${(r*3+c)*.2}s" x="${-15+c*11}" y="${-23+r*9}" width="8" height="7" rx="1.5" fill="${["#D32F2F","#2E7D32","#1565C0","#F9A825","#6A1B9A","#00838F"][(r*3+c)%6]}"/>`).join("")).join("")}`,
 chuppah:`<path d="M-50 -64h100l-6 8h-88z" fill="#F4F1E6" stroke="#C9BC98" stroke-width="2"/>${[-46,46].map(x=>`<rect x="${x-2}" y="-60" width="4" height="60" fill="#8A5A2B"/>`).join("")}<path d="M-40 -56q40 14 80 0" stroke="#D9C79A" stroke-width="2" fill="none"/>`,
 bars:`<rect x="-30" y="-50" width="60" height="50" fill="#3A3F52"/>${[-20,-10,0,10,20].map(x=>`<rect x="${x-1.5}" y="-50" width="3" height="50" fill="#9AA0AE"/>`).join("")}<rect x="-30" y="-52" width="60" height="4" fill="#9AA0AE"/>`,
 net:`<path d="M-34 -30q34 40 68 0" fill="none" stroke="#C9BC98" stroke-width="2"/>${[-24,-12,0,12,24].map(x=>`<path d="M${x} -30q${x*.1} 22 0 ${20-Math.abs(x)*.4}" stroke="#C9BC98" stroke-width="1.4" fill="none"/>`).join("")}<path d="M-30 -18q30 12 60 0M-22 -6q22 8 44 0" stroke="#C9BC98" stroke-width="1.4" fill="none"/><path d="M-34 -30h68" stroke="#8A5A2B" stroke-width="3"/>`,
 bed2:`<rect x="-40" y="-14" width="80" height="10" rx="3" fill="#A8743E"/><rect x="-42" y="-30" width="6" height="30" rx="2" fill="#8A5A2B"/><rect x="36" y="-22" width="6" height="22" rx="2" fill="#8A5A2B"/><rect x="-34" y="-20" width="24" height="8" rx="4" fill="#E8E2F4"/><rect x="-38" y="-16" width="74" height="5" rx="2" fill="#5C8FE8" opacity=".6"/>`,
 chair:`<rect x="-10" y="-34" width="4" height="34" fill="#8A5A2B"/><rect x="-10" y="-16" width="22" height="4" fill="#A8743E"/><rect x="8" y="-14" width="4" height="14" fill="#8A5A2B"/>`,
 lamp:`<rect x="-2" y="-30" width="4" height="30" fill="#C9A34A"/><path d="M-10 -30h20l-4 -6h-12z" fill="#C9A34A"/><path class="flame" style="transform-origin:0px -36px" d="M0 -48c4 5 4 9 0 12-4-3-4-7 0-12z" fill="#F4A51C"/><circle class="pulse" cy="-40" r="12" fill="#FFE9A8" opacity=".4"/>`,
 minyan:`${Array.from({length:10},(_,i)=>{const x=-90+i*20,y=i%2?0:-4;return `<g transform="translate(${x} ${y})"><circle cy="-24" r="5" fill="#F2C9A0"/><path d="M-5 -29h10v-3h-10z" fill="#14161F"/><path d="M-7 0q0-17 7-17t7 17z" fill="${["#2F6B57","#7D5CC0","#7A5A3A","#5C8FE8","#C98A20"][i%5]}"/><path d="M-7 -8h14" stroke="#F4F1E6" stroke-width="2"/></g>`}).join("")}`,
 shofar:`<path d="M-20 0q10-4 22-14q10-8 14-20l6 2q-2 14-14 24q-12 10-26 12z" fill="#E8D2A0" stroke="#A8865A" stroke-width="1.5"/>`,
 luchos:`<path d="M-26 0v-38q0-8 12-8t12 8v38z" fill="#C9D3E2" stroke="#8A94A8" stroke-width="2"/><path d="M2 0v-38q0-8 12-8t12 8v38z" fill="#C9D3E2" stroke="#8A94A8" stroke-width="2"/>${[0,1,2,3,4].map(r=>`<path d="M-21 ${-32+r*6}h14M7 ${-32+r*6}h14" stroke="#6E7890" stroke-width="1.5"/>`).join("")}`,
 wind:`${[0,1,2].map(i=>`<path class="drift" style="animation-delay:${i*.5}s" d="M-30 ${-10-i*10}q20-8 40 0t30 -4" stroke="#BFE0FF" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".9"/>`).join("")}`,
 firefall:`<path class="pulse" d="M-6 -140l12 0-2 110h-8z" fill="#FFC86A" opacity=".6"/>${[0,1,2].map(i=>`<path class="flame" style="transform-origin:${-12+i*12}px 0px;animation-delay:${i*.25}s" d="M${-12+i*12} 0c-8-10-6-20 0-30 6 10 8 20 0 30z" fill="#F46A1C"/>`).join("")}`,
 spring:`<ellipse cx="0" cy="-4" rx="34" ry="8" fill="#5DA8EE"/><path class="wave" d="M-26 -4q6-3 12 0t12 0 12 0 12 0" stroke="#BFE0FF" stroke-width="2" fill="none"/><path d="M-40 -2q-8-14 6-20h12" fill="#9A9A8A"/>`,
 snakepole:`<rect x="-2" y="-70" width="4" height="70" fill="#8A5A2B"/><path d="M-2 -60q14 6 0 14t0 14 0 14" stroke="#C98A20" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-2" cy="-62" r="4" fill="#C98A20"/>`,
 doors:`<rect x="-30" y="-64" width="60" height="64" fill="#7A5A3A"/><rect x="-26" y="-60" width="25" height="60" fill="#D9B24A" stroke="#A9822A"/><rect x="1" y="-60" width="25" height="60" fill="#D9B24A" stroke="#A9822A"/>`,
 sukkah:`<rect x="-40" y="-60" width="80" height="60" fill="#F4E6C0" stroke="#A8865A" stroke-width="2"/><path d="M-46 -60h92" stroke="#4E7A44" stroke-width="8" stroke-linecap="round"/>${[-34,-14,6,26].map(x=>`<path d="M${x} -64l6 -6 6 6" stroke="#6E9A4E" stroke-width="3" fill="none"/>`).join("")}<rect x="-14" y="-40" width="28" height="40" fill="#E8D8B0"/>`,
 tzitzis:`<rect x="-26" y="-50" width="52" height="34" fill="#F4F1E6" stroke="#C9BC98"/><path d="M-26 -42h52M-26 -24h52" stroke="#1F3A8A" stroke-width="3"/>${[-18,18].map(x=>`<g class="rock" style="transform-origin:${x}px -16px">${[-3,-1,1,3].map(d=>`<path d="M${x+d} -16v${18+Math.abs(d)}" stroke="${d===3?"#2F5BC8":"#FFFFFF"}" stroke-width="1.6"/>`).join("")}</g>`).join("")}`,
 wool:`<g class="bob"><circle cx="-16" cy="-10" r="10" fill="#2F5BC8"/><circle cx="-10" cy="-14" r="7" fill="#3E6FDE"/></g><g class="bob" style="animation-delay:.6s"><circle cx="16" cy="-10" r="10" fill="#FFFFFF" stroke="#D9D9D9"/><circle cx="22" cy="-14" r="7" fill="#FFFFFF" stroke="#D9D9D9"/></g>`,
 pyramids:`<path d="M-80 0l40-50 40 50z" fill="#D9B46A"/><path d="M-10 0l50-64 50 64z" fill="#C9A35A"/><path d="M40 -64l50 64h-30z" fill="#B08E45"/>`,
 gold:`${[[-22,"#E9C65A"],[0,"#C9D3E2"],[22,"#E9C65A"]].map(([x,c])=>`<path d="M${x-8} -22h16l-3 22h-10z" fill="${c}" stroke="rgba(0,0,0,.2)"/><path d="M${x-10} -22h20" stroke="${c}" stroke-width="3"/>`).join("")}<circle class="pulse" cx="-18" cy="-28" r="2" fill="#FFF"/><circle class="pulse" style="animation-delay:.7s" cx="20" cy="-26" r="2" fill="#FFF"/>`,
 thugs:`${[-16,16].map((x,i)=>`<g transform="translate(${x} 0)"><circle cy="-30" r="6" fill="#F2C9A0"/><path d="M-6 -34q6-8 12 0z" fill="#3A2A1A"/><path d="M-9 0v-14q0-10 9-10t9 10v14z" fill="${i?"#6E5A3A":"#5B5B5B"}"/><path d="M-3 -29h2M2 -29h2" stroke="#16213A" stroke-width="1.6"/><path d="M-3 -25q3-2 6 0" stroke="#16213A" stroke-width="1.2" fill="none"/></g>`).join("")}`,
 stack:`${[0,1,2,3].map(i=>`<rect x="${-22+(i%2)*3}" y="${-10-i*10}" width="44" height="9" rx="2" fill="${["#7A2E3A","#1A3F7A","#2F6B57","#8A5A2B"][i]}"/><rect x="${-18+(i%2)*3}" y="${-7-i*10}" width="20" height="2" fill="#E9C65A"/>`).join("")}`,
 knife:`<rect x="-30" y="-6" width="60" height="6" rx="2" fill="#8A5A2B"/><path d="M-6 -8h24l6 4-6 2h-24z" fill="#C9D3E2"/><rect x="-14" y="-9" width="9" height="5" rx="2" fill="#5A3A1A"/><ellipse cx="-20" cy="-10" rx="8" ry="4" fill="#C0504D"/>`,
 grave:`<path d="M-16 0v-30q0-12 16-12t16 12v30z" fill="#9AA0AE"/><path d="M-30 0h60" stroke="#6E7F5A" stroke-width="4"/>`,
 ship:`<g class="rock"><path d="M-40 -14h80l-12 14h-56z" fill="#8A5A2B"/><rect x="-2" y="-56" width="4" height="42" fill="#6B4A2A"/><path d="M2 -54l26 30h-26z" fill="#F4F1E6"/></g><path class="wave" d="M-60 0q10-5 20 0t20 0 20 0 20 0 20 0 20 0" stroke="#BFE0FF" stroke-width="3" fill="none"/>`,
 dates:`<path d="M0 0v-30" stroke="#8A5A2B" stroke-width="3"/>${[[-8,-26],[6,-24],[-4,-18],[8,-14],[-9,-10]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4" ry="6" fill="#8A3A1A"/>`).join("")}`,
 beer:`<path d="M-10 -26h20l-2 26h-16z" fill="#E8A830" stroke="#A8762A"/><path d="M-11 -28q11-8 22 0v4h-22z" fill="#FFFFFF"/><path d="M10 -20q8 0 8 6t-8 6" stroke="#A8762A" stroke-width="3" fill="none"/>`,
 reed:`<g class="rock">${[-10,-4,2,8].map(x=>`<path d="M${x} 0q-2-30 ${x*.4} -50" stroke="#6E9A4E" stroke-width="3" fill="none"/>`).join("")}</g>`,
 fly:`<g class="drift"><ellipse cx="0" cy="0" rx="3" ry="2" fill="#16213A"/><ellipse class="pulse" cx="-2" cy="-3" rx="3" ry="2" fill="#BFD0FF"/><ellipse class="pulse" cx="2" cy="-3" rx="3" ry="2" fill="#BFD0FF"/></g>`,
 flowers:`${[-30,-10,10,30].map((x,i)=>`<path d="M${x} 0v-16" stroke="#4E7A44" stroke-width="2"/><g class="bob" style="animation-delay:${i*.3}s">${[0,72,144,216,288].map(a=>`<circle cx="${x+Math.cos(a*Math.PI/180)*4}" cy="${-20+Math.sin(a*Math.PI/180)*4}" r="3" fill="${["#E57373","#FFD54F","#BA68C8","#4FC3F7"][i]}"/>`).join("")}<circle cx="${x}" cy="-20" r="2.4" fill="#FFF3B8"/></g>`).join("")}`,
 river:`<path d="M-160 0q40-8 80 0t80 0 80 0 80 0v14h-320z" fill="#5DA8EE"/><path class="wave" d="M-150 4q15-5 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0" stroke="#BFE0FF" stroke-width="2" fill="none"/>`,
 crown2:`<path d="M-12 0l-3-14 8 6 7-10 7 10 8-6-3 14z" fill="#E9C65A" stroke="#A9822A"/>`,
 shulx:`<rect x="-46" y="-56" width="92" height="56" fill="#E8D8B0" stroke="#A8865A" stroke-width="2"/><path d="M-52 -56l52 -24 52 24z" fill="#8A5A3A"/><rect x="-12" y="-30" width="24" height="30" rx="12" fill="#6B4A2A"/>${[-34,22].map(x=>`<rect x="${x}" y="-44" width="12" height="16" rx="6" fill="#FFE29A"/>`).join("")}<path d="M-6 -70l6 -10 6 10z M-6 -74l6 10 6 -10z" fill="none" stroke="#1A3F7A" stroke-width="2"/>`,
 barrel:`<path d="M-16 0q-6-22 0-44h32q6 22 0 44z" fill="#9A6A3A" stroke="#6B4423" stroke-width="2"/><path d="M-19 -12h38M-19 -32h38" stroke="#5A3A1A" stroke-width="3"/>`,
 sun2:`<circle r="14" fill="#FFD54F"/><g class="rays" style="transform-origin:0px 0px">${[0,45,90,135,180,225,270,315].map(a=>`<path d="M${(Math.cos(a*Math.PI/180)*18).toFixed(1)} ${(Math.sin(a*Math.PI/180)*18).toFixed(1)}L${(Math.cos(a*Math.PI/180)*24).toFixed(1)} ${(Math.sin(a*Math.PI/180)*24).toFixed(1)}" stroke="#FFD54F" stroke-width="3" stroke-linecap="round"/>`).join("")}</g>`
});
