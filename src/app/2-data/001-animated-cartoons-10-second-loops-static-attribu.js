/* ================= ANIMATED CARTOONS (10-second loops; static attributes = the final frame, used when motion is reduced) ================= */
const KF=[];
function anim(cls,frames,dur=10,ease="ease-in-out"){KF.push(`@keyframes ${cls}{${frames}}.${cls}{animation:${cls} ${dur}s ${ease} infinite}`)}
function show(cls,a,b=94){anim(cls,`0%,${a}%{opacity:0}${a+2.5}%,${b}%{opacity:1}${Math.min(b+3,100)}%,100%{opacity:0}`)}
function hideAt(cls,a,b){anim(cls,`0%,${a}%{opacity:1}${b}%,100%{opacity:0}`)}
anim("curtain","0%{opacity:1}5%,93%{opacity:0}100%{opacity:1}");
KF.push(`@keyframes legA{0%,100%{transform:rotate(-24deg)}50%{transform:rotate(24deg)}}.legA,.legB{transform-box:fill-box;transform-origin:50% 0;animation:legA .55s ease-in-out infinite}.legB{animation-delay:-.275s}
@keyframes hop{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}.hop{animation:hop .55s ease-in-out infinite}
@keyframes eat{0%,40%,100%{transform:translate(0,0)}60%,80%{transform:translate(-2px,-7px)}}.eat{animation:eat 1.6s ease-in-out infinite}
@keyframes mnote{0%{transform:translate(0,0);opacity:0}20%{opacity:1}100%{transform:translate(6px,-26px);opacity:0}}.mnote{animation:mnote 2.4s ease-out infinite}`);

const SK="#F2C9A0";
/* a cartoon man: feet at (0,0), about 56 units tall. o: robe, beard, hat ("kippah"|"hat"), walk, arm ("down"|"up"|"eat"), hold (svg), beardTop (svg overlay) */
function man(o={}){const robe=o.robe||"#3E6FB8",beard=o.beard||"#3B2A1A",w=o.walk;
 const beardPath="M-6.5 -41Q-7 -30 0 -28.5Q7 -30 6.5 -41Q4 -36.5 0 -36.5Q-4 -36.5 -6.5 -41z";
 const hat=o.hat==="hat"?`<rect x="-10" y="-47.5" width="20" height="2.6" rx="1.2" fill="#14161F"/><path d="M-6.2 -47.5L-5.4 -55Q0 -57 5.4 -55L6.2 -47.5z" fill="#14161F"/><rect x="-5.6" y="-49.6" width="11.2" height="1.6" fill="#3A3F52"/>`
  :`<path d="M-6.2 -45.6Q0 -51.6 6.2 -45.6z" fill="#1F2433"/>`;
 const arm=o.arm==="up"?`<path d="M6 -31L12 -40" stroke="${robe}" stroke-width="4.4" stroke-linecap="round"/><circle cx="12.6" cy="-41" r="2.4" fill="${SK}"/>`
  :`<path d="M6.5 -31L9.5 -19" stroke="${robe}" stroke-width="4.4" stroke-linecap="round"/><circle cx="9.8" cy="-18" r="2.3" fill="${SK}"/>`;
 return `<g class="${w?"hop":""}">
  <g class="${w?"legA":""}"><rect x="-5.2" y="-14" width="4.4" height="14" rx="2.2" fill="#2A2D3E"/><rect x="-6.2" y="-2" width="6" height="2.6" rx="1.3" fill="#14161F"/></g>
  <g class="${w?"legB":""}"><rect x="0.8" y="-14" width="4.4" height="14" rx="2.2" fill="#2A2D3E"/><rect x="0.6" y="-2" width="6" height="2.6" rx="1.3" fill="#14161F"/></g>
  <path d="M-6.5 -31L-9.5 -19" stroke="${robe}" stroke-width="4.4" stroke-linecap="round"/>
  <path d="M-10.5 -12L-7.8 -33Q0 -37.5 7.8 -33L10.5 -12z" fill="${robe}"/><rect x="-10" y="-19" width="20" height="2.6" fill="rgba(0,0,0,.22)"/>
  <path d="M-3 -17v6M-1 -17v7M1 -17v7M3 -17v6" stroke="#fff" stroke-width=".8" opacity=".9"/>
  ${arm}${o.hold||""}
  <circle cx="0" cy="-41" r="7.2" fill="${SK}"/><circle cx="6.6" cy="-41" r="1.6" fill="#E8B48A"/>
  <path d="${beardPath}" fill="${beard}"/>${o.beardTop?o.beardTop(beardPath):""}
  <circle cx="2.8" cy="-42.6" r="1.05" fill="#1A1A1A"/><circle cx="-1.6" cy="-42.6" r="1.05" fill="#1A1A1A"/><path d="M1.6 -38.4q1.4.8 2.6 0" stroke="#8A4A2A" stroke-width=".8" fill="none"/>
  ${hat}</g>`}
const at=(x,y,s,inner,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">${inner}</g>`;
function bubble(x,y,text,cls,tail="down",op=1){const w=Math.round(text.length*6.4+20);
 const t=tail==="left"?`M${x-w/2+10} ${y+8}l-8 7 14-4z`:tail==="right"?`M${x+w/2-10} ${y+8}l8 7-14-4z`:`M${x-5} ${y+8}l2 8 8-8z`;
 return `<g class="${cls}" opacity="${op}"><path d="${t}" fill="#fff" stroke="#16213A" stroke-width="1.4"/><rect x="${x-w/2}" y="${y-13}" width="${w}" height="22" rx="11" fill="#fff" stroke="#16213A" stroke-width="1.4"/><path d="${t}" fill="#fff"/><text x="${x}" y="${y+3.2}" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="12" fill="#16213A">${text}</text></g>`}
const curtain=c=>`<rect class="curtain" width="320" height="150" fill="${c}" opacity="0"/>`;

/* ---- 1:1a · kohanim leave the mikvah at sunset, the stars come out, they go home and eat terumah ---- */
hideAt("a-day",6,26);
anim("a-sun","0%{transform:translateY(-58px);opacity:1}24%{transform:translateY(0);opacity:1}27%,100%{transform:translateY(0);opacity:0}");
anim("a-stars","0%,24%{opacity:0}33%,100%{opacity:1}");
anim("a-walk","0%,28%{transform:translateX(0);opacity:0}31%{transform:translateX(0);opacity:1}60%{transform:translateX(164px);opacity:1}64%,100%{transform:translateX(170px);opacity:0}","10","linear");
anim("a-door","0%,57%{opacity:0}60%,65%{opacity:1}69%,100%{opacity:0}");
hideAt("a-windark",64,68);
show("a-tag",72);
SCENES.m1a={cap:"צאת הכוכבים · the kohanim go in to eat",draw(){const n=uid("n"),d=uid("d"),cl=uid("c");return `<defs>${sky(n,"#0A1636","#2B4A88")}${sky(d,"#F08A5D","#FFD08A")}<clipPath id="${cl}"><rect x="244" y="76" width="48" height="30" rx="3"/></clipPath></defs>
 <rect width="320" height="150" fill="url(#${n})"/><rect class="a-day" width="320" height="150" fill="url(#${d})" opacity="0"/>
 <circle class="a-sun" cx="160" cy="122" r="17" fill="#FFE08A" opacity="0"/>
 <g class="a-stars">${starField(40,320,80,11)}<circle cx="168" cy="26" r="11" fill="#F7E7AE"/><circle cx="174" cy="22" r="10" fill="#183064"/></g>
 <path d="M0 112Q70 92 150 106T320 100V150H0z" fill="#16295A"/>
 <rect x="12" y="68" width="62" height="50" fill="#33457A"/><path d="M8 70q35-30 70 0z" fill="#2A3A6B"/><rect x="36" y="94" width="15" height="24" rx="7" fill="#0D1B40"/>
 <rect x="22" y="78" width="42" height="12" rx="3" fill="#E7D8AE"/><text x="43" y="87.6" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="10" fill="#33457A">מקוה</text>
 <rect x="194" y="70" width="110" height="48" fill="#3A4D85"/><path d="M188 72l61-28 61 28z" fill="#2C3C6E"/>
 <rect x="212" y="92" width="16" height="26" rx="2" fill="#1D2A52"/><rect class="a-door" x="212" y="92" width="16" height="26" rx="2" fill="#FFD66B" opacity="0"/>
 <g clip-path="url(#${cl})"><rect x="244" y="76" width="48" height="30" fill="#FFD27A"/>
  <g transform="translate(256 106) scale(.62)"><path d="M-12 0q0-18 12-18t12 18z" fill="#FFFFFF"/><circle cy="-26" r="8" fill="${SK}"/><path d="M-7 -26q-1 12 7 13 8-1 7-13-3 5-7 5t-7-5z" fill="#ECECEC"/><path d="M-6.5 -31q6.5-6 13 0z" fill="#1F2433"/><g class="eat"><path d="M8 -6l6 -10" stroke="#fff" stroke-width="5" stroke-linecap="round"/><ellipse cx="15" cy="-17" rx="5" ry="3" fill="#D8963F"/></g></g>
  <g transform="translate(280 106) scale(.58)"><path d="M-12 0q0-18 12-18t12 18z" fill="#E9EEF8"/><circle cy="-26" r="8" fill="${SK}"/><path d="M-7 -26q-1 12 7 13 8-1 7-13-3 5-7 5t-7-5z" fill="#5A3A22"/><path d="M-6.5 -31q6.5-6 13 0z" fill="#1F2433"/><g class="eat" style="animation-delay:-.8s"><path d="M-8 -6l-6 -10" stroke="#E9EEF8" stroke-width="5" stroke-linecap="round"/><ellipse cx="-15" cy="-17" rx="5" ry="3" fill="#D8963F"/></g></g>
  <rect x="244" y="101" width="48" height="5" fill="#9A6A3A"/><ellipse cx="268" cy="100" rx="7" ry="2.6" fill="#D8963F"/></g>
 <rect class="a-windark" x="244" y="76" width="48" height="30" rx="3" fill="#1D2A52" opacity="0"/><rect x="244" y="76" width="48" height="30" rx="3" fill="none" stroke="#2C3C6E" stroke-width="3"/>
 <g class="a-tag"><rect x="246" y="56" width="44" height="16" rx="8" fill="#F1BD3C"/><text x="268" y="68" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="11" fill="#2B1E00">תרומה</text></g>
 <path d="M0 128Q90 116 170 124T320 120V150H0z" fill="#0F1E45"/>
 <g transform="translate(44 120)"><g class="a-walk" opacity="0">${at(0,0,.78,man({robe:"#F4F1E6",beard:"#ECECEC",walk:1}))}${at(-20,0,.74,man({robe:"#E9EEF8",beard:"#5A3A22",walk:1}))}</g></g>
 ${curtain("#0A1430")}`}};

/* ---- 1:1b · Rabban Gamliel's sons come home late from the wedding ---- */
anim("b-walk","0%,4%{transform:translateX(0);opacity:0}6%{transform:translateX(0);opacity:1}36%{transform:translateX(96px);opacity:1}37%,100%{transform:translateX(96px);opacity:0}","10","linear");
show("b-stand",36);show("b-q",41,60);show("b-a",65);
anim("b-dawn","0%{opacity:0}100%{opacity:.5}","10","linear");
SCENES.m1b={cap:"בית המשתה · \"we didn't say Shema!\"",draw(){const s=uid("s"),g=uid("g");return `<defs>${sky(s,"#1B1440","#3E2A68")}<radialGradient id="${g}" cx="1" cy="1" r="1"><stop offset="0" stop-color="#FF9F6B"/><stop offset="1" stop-color="#FF9F6B" stop-opacity="0"/></radialGradient></defs>
 <rect width="320" height="150" fill="url(#${s})"/><rect class="b-dawn" width="320" height="150" fill="url(#${g})" opacity=".5"/>${starField(30,320,70,5)}
 <path d="M0 112Q100 96 200 108T320 102V150H0z" fill="#2A1D4D"/>
 <rect x="10" y="62" width="96" height="56" fill="#4A3678"/><path d="M4 64l54-26 54 26z" fill="#3A2A62"/>
 <rect x="22" y="76" width="14" height="14" rx="2" fill="#FFCF66"/><rect x="80" y="76" width="14" height="14" rx="2" fill="#FFCF66"/><path d="M50 118V92q8-10 16 0v26z" fill="#FFE29A"/>
 ${[0,1,2].map(i=>`<text class="mnote" style="animation-delay:${i*.8}s" x="${40+i*18}" y="58" font-size="13" fill="#FFD66B">♪</text>`).join("")}
 ${[16,38,60,82,100].map((x,i)=>`<circle class="tw" style="animation-delay:${i*.4}s" cx="${x}" cy="${44+Math.abs(2-i)*3}" r="3" fill="#FFD66B"/>`).join("")}
 <rect x="226" y="66" width="86" height="52" fill="#3F3170"/><path d="M220 68l49-24 49 24z" fill="#31265A"/><rect x="246" y="90" width="16" height="28" rx="2" fill="#FFD27A"/><rect x="282" y="80" width="14" height="13" rx="2" fill="#FFCF66"/>
 <path d="M0 130Q100 120 200 128T320 126V150H0z" fill="#1B1236"/>
 ${at(254,120,.82,man({robe:"#2F6B57",beard:"#F2F2F2",hat:"hat"}),true)}
 <g transform="translate(70 122)"><g class="b-walk" opacity="0">${at(0,0,.74,man({robe:"#3E6FB8",beard:"#6B4A2A",walk:1}))}${at(-18,0,.72,man({robe:"#8A4FB0",beard:"#3B2A1A",walk:1}))}</g></g>
 <g class="b-stand">${at(166,122,.74,man({robe:"#3E6FB8",beard:"#6B4A2A"}))}${at(148,122,.72,man({robe:"#8A4FB0",beard:"#3B2A1A"}))}</g>
 ${bubble(152,64,"לא קרינו את שמע!","b-q","down",0)}${bubble(230,52,"חייבין אתם לקרות!","b-a","right",1)}
 ${curtain("#140E2C")}`}};

/* ---- 1:2 · first light: telling techeles from white; the princes wake at three hours ---- */
hideAt("c-night",4,46);hideAt("c-stars",4,40);
anim("c-sun","0%,52%{transform:translateY(44px)}80%,100%{transform:translateY(0)}");
hideAt("c-gray",38,46);show("c-ok",48);
anim("c-crown","0%,82%{opacity:0;transform:scale(.2)}87%{opacity:1;transform:scale(1.2)}90%,94%{opacity:1;transform:scale(1)}97%,100%{opacity:0}");
SCENES.m2={cap:"תכלת ולבן · telling blue from white",draw(){const s=uid("s"),n=uid("n");
 const strands=(c1,c2,cls)=>`<g class="${cls||""}" ${cls?'opacity="0"':""}><path d="M10 -42q-3 14 1 24t-1 14" stroke="${c1}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M14 -42q3 14-1 24t2 14" stroke="${c2}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`;
 return `<defs>${sky(s,"#3A6CC0","#F6C877")}${sky(n,"#0A1636","#33467A")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 <g class="c-sun"><circle cx="70" cy="108" r="20" fill="#FFE08A"/><circle cx="70" cy="108" r="15" fill="#FFF1C2"/></g>
 <rect class="c-night" width="320" height="150" fill="url(#${n})" opacity="0"/><g class="c-stars" opacity="0">${starField(30,320,80,17)}</g>
 <path d="M0 110Q80 96 160 112T320 104V150H0z" fill="#5E8C46"/>
 <rect x="236" y="60" width="66" height="54" fill="#C9B07A"/><rect x="230" y="44" width="16" height="70" fill="#B89C62"/><rect x="292" y="44" width="16" height="70" fill="#B89C62"/>
 <path d="M228 44h20l-10-12zM290 44h20l-10-12z" fill="#2457A6"/><rect x="261" y="74" width="16" height="18" rx="8" fill="#FFD27A"/>
 <g class="c-crown" style="transform-origin:269px 60px"><path d="M259 64l3-10 4 5 3-7 3 7 4-5 3 10z" fill="#F1BD3C" stroke="#B07D06" stroke-width="1"/></g>
 <path d="M0 128Q100 118 200 128T320 126V150H0z" fill="#467534"/>
 <g transform="translate(140 132) scale(1.05)">${man({robe:"#7A5A3A",beard:"#8A8A8A",arm:"up",hold:strands("#FFFFFF","#2457A6")+strands("#9AA3B5","#9AA3B5","c-gray")})}</g>
 ${bubble(196,48,"✓ תכלת · לבן","c-ok","left",1)}
 ${curtain("#0A1636")}`}};

/* ---- 1:3 · R' Tarfon reclines on the road like Beis Shammai, and the bandits appear ---- */
anim("r-walk","0%,3%{transform:translateX(0);opacity:0}5%{transform:translateX(0);opacity:1}28%{transform:translateX(104px);opacity:1}29%,100%{transform:translateX(104px);opacity:0}","10","linear");
show("r-lie",29,62);show("r-say",34,55);show("r-eyes",50,92);show("r-up",63,69);
anim("r-run","0%,69%{transform:translateX(0);opacity:0}70%{transform:translateX(0);opacity:1}88%{transform:translateX(-150px);opacity:1}90%,100%{transform:translateX(-160px);opacity:0}","10","linear");
SCENES.m3={cap:"ובלכתך בדרך · R' Tarfon on the road",draw(){const s=uid("s");return `<defs>${sky(s,"#3B2C6E","#F29A62")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(12,320,40,3)}
 <circle cx="270" cy="62" r="16" fill="#FFD39A"/>
 <path d="M0 98Q60 82 130 92T260 86T320 92V150H0z" fill="#7A4E72"/><path d="M0 114Q90 102 180 112T320 108V150H0z" fill="#5B3A5E"/>
 <path d="M0 128Q100 122 200 126T320 124V150H0z" fill="#E2B57A" opacity=".55"/>
 <path d="M198 150q6-44 40-50t54 12l28 38z" fill="#3A2440"/>
 <g class="r-eyes"><g class="blink"><ellipse cx="238" cy="118" rx="3.2" ry="2.2" fill="#FFE27A"/><ellipse cx="248" cy="118" rx="3.2" ry="2.2" fill="#FFE27A"/></g><g class="blink" style="animation-delay:1.1s"><ellipse cx="270" cy="124" rx="3" ry="2" fill="#FFE27A"/><ellipse cx="279" cy="124" rx="3" ry="2" fill="#FFE27A"/></g></g>
 <g transform="translate(26 132)"><g class="r-walk" opacity="0">${at(0,0,.82,man({robe:"#5C4A8A",beard:"#9A9A9A",hat:"hat",walk:1}))}</g></g>
 <g class="r-lie" opacity="1"><g transform="translate(140 125) rotate(-90)">${at(0,0,.82,man({robe:"#5C4A8A",beard:"#9A9A9A",hat:"hat"}))}</g></g>
 ${bubble(110,82,"שמע ישראל...","r-say","right",1)}
 <g class="r-up" opacity="0">${at(132,132,.82,man({robe:"#5C4A8A",beard:"#9A9A9A",hat:"hat",arm:"up"}))}<text x="146" y="72" font-family="Rubik,sans-serif" font-weight="900" font-size="22" fill="#FFE27A">!</text></g>
 <g transform="translate(132 132)"><g class="r-run" opacity="0">${at(0,0,.82,man({robe:"#5C4A8A",beard:"#9A9A9A",hat:"hat",walk:1}),true)}</g></g>
 ${curtain("#2A1D4D")}`}};

/* ---- 1:4 · seven berachos light up: 2 + 1 by day, 2 + 2 by night ---- */
const c4=[["d1",8],["d2",14],["ds",20],["d3",26],["mo",38],["e1",44],["e2",50],["es",56],["e3",62],["e4",68],["sev",76]];
c4.forEach(([k,t])=>show("f-"+k,t));
SCENES.m4={cap:"ברכות קריאת שמע · counting the berachos",draw(){const s=uid("s");
 const dot=(x,k,c)=>`<g class="f-${k}"><circle cx="${x}" cy="104" r="7" fill="${c}"/><circle cx="${x}" cy="104" r="11" fill="${c}" opacity=".25"/></g>`;
 const shema=(x,k)=>`<g class="f-${k}"><rect x="${x-14}" y="96" width="28" height="16" rx="3" fill="#E9DFC2" stroke="#B9A878"/><text x="${x}" y="108" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="10" fill="#5B4A1E">שמע</text></g>`;
 return `<defs>${sky(s,"#1F3E78","#6C5BB0")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(16,320,150,9)}
 <path d="M160 40q-52-18-118-6v100q66-12 118 6z" fill="#FBF6E8"/><path d="M160 40q52-18 118-6v100q-66-12-118 6z" fill="#F2EBD6"/><path d="M160 40v100" stroke="#D9CBA4" stroke-width="2"/>
 <g class="f-d1"><circle cx="100" cy="66" r="12" fill="#F7B733"/>${[...Array(8)].map((_,i)=>{const a=i*Math.PI/4;return `<path d="M${(100+16*Math.cos(a)).toFixed(1)} ${(66+16*Math.sin(a)).toFixed(1)}L${(100+21*Math.cos(a)).toFixed(1)} ${(66+21*Math.sin(a)).toFixed(1)}" stroke="#F7B733" stroke-width="3" stroke-linecap="round"/>`}).join("")}</g>
 <g class="f-mo"><circle cx="220" cy="66" r="12" fill="#7D5CC0"/><circle cx="226" cy="61" r="10.5" fill="#F2EBD6"/></g>
 ${dot(140,"d1","#2457A6")}${dot(122,"d2","#2457A6")}${shema(98,"ds")}${dot(72,"d3","#4E9A33")}
 ${dot(266,"e1","#2457A6")}${dot(248,"e2","#2457A6")}${shema(224,"es")}${dot(200,"e3","#4E9A33")}${dot(182,"e4","#4E9A33")}
 <text x="100" y="130" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="11" fill="#5B6884">שחרית</text><text x="222" y="130" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="11" fill="#5B6884">ערבית</text>
 <g class="f-sev"><circle cx="160" cy="24" r="17" fill="#F1BD3C" stroke="#FFF0B8" stroke-width="3"/><text x="160" y="31" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="900" font-size="20" fill="#2B1E00">7</text></g>
 ${curtain("#1F3E78")}`}};

/* ---- 1:5 · R' Elazar ben Azarya's beard turns white; Ben Zoma: "all the days" includes the nights ---- */
hideAt("e-black",16,30);show("e-spark",16,32);show("e-say",33,56);hideAt("e-day",58,68);show("e-stars",60);show("e-bz",66);
SCENES.m5={cap:"כבן שבעים שנה · the nights too",draw(){const d=uid("d"),n=uid("n");return `<defs>${sky(n,"#0B1534","#27406F")}${sky(d,"#7FB6EE","#CFE6FF")}</defs>
 <rect width="320" height="150" fill="#5A4636"/><rect y="118" width="320" height="32" fill="#3E2F24"/>
 ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${i*40}" y="0" width="2" height="118" fill="#4D3B2D"/>`).join("")}
 <rect x="196" y="18" width="108" height="66" rx="4" fill="url(#${n})"/><g class="e-stars">${starField(14,100,56,21).replace(/cx="([\d.]+)" cy="([\d.]+)"/g,(m,x,y)=>`cx="${(+x+200).toFixed(1)}" cy="${(+y+22).toFixed(1)}"`)}<circle cx="284" cy="34" r="8" fill="#F7E7AE"/></g>
 <rect class="e-day" x="196" y="18" width="108" height="66" rx="4" fill="url(#${d})" opacity="0"/>
 <path d="M196 51h108M250 18v66" stroke="#3E2F24" stroke-width="4"/><rect x="196" y="18" width="108" height="66" rx="4" fill="none" stroke="#3E2F24" stroke-width="6"/>
 <path d="M150 120l10-34h26l10 34z" fill="#8A5A2B"/><path d="M152 86q21-9 42 0l-3 8q-18-6-36 0z" fill="#FBF6E8"/>
 ${at(108,124,1.05,man({robe:"#6A3FA0",beard:"#F4F4F4",hat:"hat",beardTop:p=>`<path class="e-black" d="${p}" fill="#2A1C12" opacity="0"/>`}))}
 <g class="e-spark">${[[96,72],[120,70],[108,64]].map(([x,y],i)=>`<path class="tw" style="animation-delay:${i*.25}s" d="M${x} ${y-5}l1.6 3.4 3.4 1.6-3.4 1.6-1.6 3.4-1.6-3.4-3.4-1.6 3.4-1.6z" fill="#FFF7D6"/>`).join("")}</g>
 ${at(226,124,1,man({robe:"#2F6B57",beard:"#7A4A22"}),true)}
 ${bubble(98,30,"כבן שבעים שנה","e-say","down",0)}${bubble(214,58,"כל ימי חייך – הלילות!","e-bz","down",1)}
 ${curtain("#2A1C12")}`}};

/* ---- second-half cartoons: one for every learning card ---- */
function pill(x,y,he,sub,cls,bg="#fff",fg="#16213A",op=1){const w=Math.max(he.length*7.4,(sub||"").length*5.6)+22,h=sub?30:20;
 return `<g class="${cls}" opacity="${op}"><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${bg}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
 <text x="${x}" y="${sub?y-1.5:y+4}" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="12" fill="${fg}">${he}</text>
 ${sub?`<text x="${x}" y="${y+10}" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="9" fill="${fg}" opacity=".75">${sub}</text>`:""}</g>`}
const ckmark=(x,y,cls,op=1)=>`<g class="${cls}" opacity="${op}"><circle cx="${x}" cy="${y}" r="8" fill="#4E9A33" stroke="#fff" stroke-width="2"/><path d="M${x-3.5} ${y}l2.5 2.6 4.6-5" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const cross=(x,y,cls,op=1)=>`<g class="${cls}" opacity="${op}"><circle cx="${x}" cy="${y}" r="10" fill="#CF4237" stroke="#fff" stroke-width="2"/><path d="M${x-4} ${y-4}l8 8M${x+4} ${y-4}l-8 8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></g>`;
const sunIcon=(x,y,r=9)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#F7B733"/>${[...Array(8)].map((_,i)=>{const a=i*Math.PI/4;return `<path d="M${(x+(r+3)*Math.cos(a)).toFixed(1)} ${(y+(r+3)*Math.sin(a)).toFixed(1)}L${(x+(r+7)*Math.cos(a)).toFixed(1)} ${(y+(r+7)*Math.sin(a)).toFixed(1)}" stroke="#F7B733" stroke-width="2.4" stroke-linecap="round"/>`}).join("")}`;
const moonIcon=(x,y,r=9,bg="#1F3E78")=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#F7E7AE"/><circle cx="${x+r*.45}" cy="${y-r*.35}" r="${r*.85}" fill="${bg}"/>`;

/* 1:1 part 2 · the moon crosses the night; each Tanna's deadline lights up */
anim("w-moon","0%{transform:rotate(-86deg)}86%,100%{transform:rotate(86deg)}","10","linear");
KF.push(".w-moon{transform-origin:160px 132px}");
show("w-p1",27);show("w-p2",42);show("w-p3",81);
show("w-u1",27);hideAt("w-d1",27,29.5);show("w-u2",42);hideAt("w-d2",42,44.5);show("w-u3",81);hideAt("w-d3",81,83.5);
anim("w-dawn","0%,70%{opacity:0}90%,100%{opacity:.85}");
SCENES.m1a2={cap:"שלש משמרות · how long is the night?",draw(){const s=uid("s"),g=uid("g");const R=110,pt=a=>[160+R*Math.sin(a*Math.PI/180),132-R*Math.cos(a*Math.PI/180)];
 const tick=(a,c)=>{const [x,y]=pt(a);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${c}" stroke="#fff" stroke-width="1.5"/>`};
 const elder=(x,robe,beard,k)=>`<g class="w-d${k}">${at(x,146,.6,man({robe,beard,hat:"hat"}))}</g><g class="w-u${k}" opacity="0">${at(x,146,.6,man({robe,beard,hat:"hat",arm:"up"}))}</g>`;
 return `<defs>${sky(s,"#0A1636","#27407A")}<radialGradient id="${g}" cx="1" cy="1" r="1.1"><stop offset="0" stop-color="#FFB37A"/><stop offset="1" stop-color="#FFB37A" stop-opacity="0"/></radialGradient></defs>
 <rect width="320" height="150" fill="url(#${s})"/><rect class="w-dawn" width="320" height="150" fill="url(#${g})" opacity=".85"/>${starField(36,320,110,13)}
 <path d="M${pt(-88).join(" ")}A${R} ${R} 0 0 1 ${pt(88).join(" ")}" stroke="#9FB4E0" stroke-width="1.5" stroke-dasharray="3 5" fill="none" opacity=".7"/>
 ${tick(-30,"#5C8FE8")}${tick(0,"#B9A2F0")}${tick(80,"#F1BD3C")}
 <g class="w-moon"><g transform="translate(160 ${132-R})">${moonIcon(0,0,10,"#132656")}</g></g>
 <path d="M0 126Q80 116 160 124T320 120V150H0z" fill="#0F1E45"/>
 ${elder(56,"#5C8FE8","#4A3020",1)}${elder(160,"#8A6FD0","#9A9A9A",2)}${elder(264,"#C98A20","#ECECEC",3)}
 ${pill(70,72,"ר' אליעזר","סוף האשמורה הראשונה","w-p1","#DCE8FF")}${pill(160,96,"חכמים","חצות","w-p2","#EADFFF")}${pill(252,72,"רבן גמליאל","עד שיעלה עמוד השחר","w-p3","#FFE9B0")}
 ${curtain("#0A1636")}`}};

/* 1:1 part 2b · the Mizbe'ach burns all night; the Chachamim put a fence at midnight */
anim("g-fill","0%,4%{transform:scaleX(0)}88%,100%{transform:scaleX(1)}","10","linear");
KF.push(".g-fill{transform-box:fill-box;transform-origin:0 50%}");
anim("g-fence","0%,44%{opacity:0;transform:translateY(-16px)}48%,94%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}");
show("g-why",50);show("g-dawn",86);anim("g-sky","0%,72%{opacity:0}92%,100%{opacity:.8}");
SCENES.m1b2={cap:"להרחיק אדם מן העבירה · the fence",draw(){const s=uid("s"),g=uid("g");
 return `<defs>${sky(s,"#120E30","#33285E")}<radialGradient id="${g}" cx="1" cy="1" r="1.1"><stop offset="0" stop-color="#FF9F6B"/><stop offset="1" stop-color="#FF9F6B" stop-opacity="0"/></radialGradient></defs>
 <rect width="320" height="150" fill="url(#${s})"/><rect class="g-sky" width="320" height="150" fill="url(#${g})" opacity=".8"/>${starField(24,320,90,8)}
 <rect x="24" y="22" width="272" height="8" rx="4" fill="#2C2650"/><rect class="g-fill" x="24" y="22" width="272" height="8" rx="4" fill="#F1BD3C"/>
 <circle cx="24" cy="26" r="5" fill="#9FB4E0"/><circle cx="160" cy="26" r="5" fill="#B9A2F0"/><circle cx="296" cy="26" r="5" fill="#FFB37A"/>
 <text x="14" y="44" text-anchor="end" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="9" fill="#C9D3EE">צאת הכוכבים</text><text x="160" y="44" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="9" fill="#C9D3EE">חצות</text><text x="306" y="44" text-anchor="start" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="700" font-size="9" fill="#C9D3EE">עמוד השחר</text>
 <g class="g-fence">${[148,156,164,172].map(x=>`<path d="M${x-3} 34V12l3-4 3 4v22z" fill="#C98B4E" stroke="#7A4E25"/>`).join("")}<rect x="142" y="16" width="36" height="3" fill="#7A4E25"/><rect x="142" y="27" width="36" height="3" fill="#7A4E25"/></g>
 ${pill(160,66,"גדר","להרחיק אדם מן העבירה","g-why","#EADFFF")}${pill(250,98,"מצותן","עד שיעלה עמוד השחר","g-dawn","#FFE9B0")}
 <path d="M0 128Q100 118 200 126T320 122V150H0z" fill="#1B1236"/>
 <path d="M40 132l10-34h54l10 34z" fill="#8C8F9C"/><rect x="46" y="94" width="62" height="8" fill="#A7AAB6"/><path d="M114 132l40-30h8l-40 30z" fill="#7A7D8A"/>
 <path d="M50 98l4-6 4 6M96 98l4-6 4 6" fill="#A7AAB6"/>
 <g class="flame" style="transform-origin:77px 94px"><path d="M64 94c2-12 8-14 6-24 7 6 10 12 7 18 3-3 4-7 3-11 6 7 6 13 3 17z" fill="#F4A51C"/><path d="M70 94c1-6 4-8 4-13 4 4 5 8 2 13z" fill="#FFE08A"/></g>
 ${[0,1,2].map(i=>`<circle class="mnote" style="animation-delay:${i*.8}s" cx="${74+i*6}" cy="64" r="${4+i}" fill="#C9C3D8" opacity=".5"/>`).join("")}
 ${at(150,132,.7,man({robe:"#F4F1E6",beard:"#4A3020",arm:"up",hold:`<rect x="10" y="-48" width="8" height="5" rx="2" fill="#B5503A"/>`}),true)}
 ${curtain("#120E30")}`}};

/* 1:2 part 2 · the sun climbs three hours, the palace wakes; later reading is like learning Torah */
anim("h-sun","0%{transform:translate(0,40px)}38%,100%{transform:translate(70px,-20px)}");
show("h-1",10,52);show("h-2",20,52);show("h-3",30,52);
anim("h-shl","0%,34%{transform:scaleX(1)}40%,94%{transform:scaleX(0)}100%{transform:scaleX(1)}");
KF.push(".h-shl,.h-shr{transform-box:fill-box}.h-shl{transform-origin:0 50%}.h-shr{transform-origin:100% 50%;animation:h-shl 10s ease-in-out infinite}");
show("h-crown",38,94);show("h-yh",40,52);
show("h-read",54);show("h-glow",60);show("h-torah",64);
SCENES.m2b={cap:"עד שלש שעות · and after that?",draw(){const s=uid("s");
 const num=(x,n,k)=>`<g class="h-${k}" opacity="0"><circle cx="${x}" cy="20" r="10" fill="#F1BD3C" stroke="#fff" stroke-width="2"/><text x="${x}" y="24.5" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="12" fill="#2B1E00">${n}</text></g><circle cx="${x}" cy="20" r="10" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>`;
 return `<defs>${sky(s,"#4C8FE0","#CFE6FF")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 <g class="h-sun">${sunIcon(40,96,13)}</g>
 ${num(22,1,1)}${num(48,2,2)}${num(74,3,3)}
 <path d="M0 112Q80 100 160 114T320 106V150H0z" fill="#6AA04E"/>
 <rect x="200" y="54" width="104" height="62" fill="#D9BE86"/><rect x="194" y="34" width="18" height="82" fill="#C9A96A"/><rect x="292" y="34" width="18" height="82" fill="#C9A96A"/>
 <path d="M192 34h22l-11-13zM290 34h22l-11-13z" fill="#2457A6"/>
 <rect x="236" y="70" width="32" height="24" rx="3" fill="#FFE29A"/><rect class="h-shl" x="236" y="70" width="16" height="24" fill="#8A5A2B"/><rect class="h-shr" x="252" y="70" width="16" height="24" fill="#8A5A2B"/>
 <g class="h-crown" opacity="0"><path d="M240 64l3-11 5 6 4-8 4 8 5-6 3 11z" fill="#F1BD3C" stroke="#B07D06"/></g>
 ${pill(160,104,"ר' יהושע","עד שלש שעות","h-yh","#FFF3CF")}
 <path d="M0 130Q100 120 200 130T320 128V150H0z" fill="#4E8A3A"/>
 <g class="h-read" opacity="0">${at(128,140,.95,man({robe:"#3E6FB8",beard:"#6B4A2A",arm:"up",hold:`<path d="M6 -46l8 3 8-3v11l-8 3-8-3z" fill="#FBF6E8" stroke="#8A5A2B"/><path d="M14 -43v11" stroke="#8A5A2B"/>`}))}</g>
 <g class="h-glow" opacity="0">${[0,1,2,3].map(i=>`<path class="tw" style="animation-delay:${i*.3}s" d="M${136+i*7} ${70-i%2*8}l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" fill="#FFF7D6"/>`).join("")}</g>
 ${pill(160,30,"לא הפסיד","כאדם הקורא בתורה","h-torah","#E4F2DB")}
 ${curtain("#4C8FE0")}`}};

/* 1:3 part 1 · Beis Shammai (posture) vs Beis Hillel (any way at all) */
hideAt("i-night",46,52);
show("i-moon",0,46);show("i-sun",50);
show("i-lie",4,46);show("i-stand",52);show("i-ck1",14,46);show("i-ck2",60);
show("i-walk",4,32);show("i-rec",34,62);show("i-up",64);show("i-c1",12,32);show("i-c2",42,62);show("i-c3",72);
show("i-rule",80);
SCENES.m3a={cap:"בית שמאי ובית הלל · how to say Shema",draw(){const s=uid("s"),n=uid("n");
 const tarf=o=>man(Object.assign({robe:"#5C4A8A",beard:"#5A3A22",hat:"hat"},o));const hil=o=>man(Object.assign({robe:"#2F6B57",beard:"#9A9A9A",hat:"hat"},o));
 return `<defs>${sky(s,"#6FA8E8","#D4E9FF")}${sky(n,"#0D1A3C","#2B4278")}</defs>
 <rect width="320" height="150" fill="url(#${s})"/><rect class="i-night" width="320" height="150" fill="url(#${n})" opacity="0"/>
 <g class="i-moon">${moonIcon(160,40,10,"#1A2C5A")}</g><g class="i-sun" opacity="0">${sunIcon(160,40,10)}</g>
 <path d="M0 116h320v34H0z" fill="#7D9B5A"/><path d="M160 116h160v34H160z" fill="#C9A46A"/>
 <path d="M160 4v146" stroke="#fff" stroke-width="3" stroke-dasharray="6 5" opacity=".8"/>
 ${pill(80,16,"בית שמאי","","","#FFF3CF")}${pill(240,16,"בית הלל","","","#E4F2DB")}
 <g class="i-lie"><g transform="translate(70 128) rotate(-90)">${at(0,0,.78,tarf({}))}</g>${pill(84,66,"ובשכבך","","","#DCE8FF")}</g>
 <g class="i-stand" opacity="0">${at(80,132,.85,tarf({}))}${pill(80,66,"ובקומך","","","#FFF3CF")}</g>
 ${ckmark(112,104,"i-ck1",0)}${ckmark(108,96,"i-ck2",0)}
 <g class="i-walk">${at(240,132,.85,hil({walk:1}))}</g>
 <g class="i-rec" opacity="0"><g transform="translate(228 128) rotate(-90)">${at(0,0,.78,hil({}))}</g></g>
 <g class="i-up" opacity="0">${at(240,132,.85,hil({}))}</g>
 ${ckmark(270,96,"i-c1",0)}${ckmark(278,104,"i-c2",0)}${ckmark(270,96,"i-c3",0)}
 ${pill(240,66,"כל אדם קורא כדרכו","","i-rule","#E4F2DB",undefined,0)}
 ${curtain("#2B4278")}`}};

/* 1:4 part 2 · don't shorten the long, don't lengthen the short, keep the חתימה */
anim("j-sc","0%,6%{transform:translateX(130px);opacity:0}9%{opacity:1}20%,40%{transform:translateX(0);opacity:1}44%,100%{transform:translateX(0);opacity:0}");
show("j-x1",22,46);show("j-t1",24,46);
anim("j-ext","0%,48%{transform:scaleX(0);opacity:0}50%{opacity:1}58%,74%{transform:scaleX(1);opacity:1}78%,100%{transform:scaleX(1);opacity:0}");
KF.push(".j-ext{transform-box:fill-box;transform-origin:0 50%}");
show("j-x2",60,78);show("j-t2",62,78);
anim("j-seal","0%,80%{opacity:0;transform:scale(2.4)}84%,94%{opacity:1;transform:scale(1)}97%,100%{opacity:0}");
KF.push(".j-seal{transform-box:fill-box;transform-origin:50% 50%}");show("j-t3",84);
SCENES.m4b={cap:"להאריך ולקצר · the form of each beracha",draw(){const s=uid("s");
 const lines=(x,y,w)=>[0,1,2].map(i=>`<path d="M${x+8} ${y+6+i*6}h${w-16}" stroke="#C9BC98" stroke-width="2"/>`).join("");
 return `<defs>${sky(s,"#26407A","#5D4FA8")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(14,320,150,6)}
 <text x="300" y="36" text-anchor="start" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="12" fill="#EADFFF">ארוכה</text>
 <rect x="28" y="42" width="236" height="22" rx="4" fill="#FBF6E8"/>${lines(28,42,236)}
 <g class="j-seal" opacity="0"><circle cx="270" cy="53" r="14" fill="#B03A30" stroke="#F1BD3C" stroke-width="2"/><text x="270" y="57" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="9.5" fill="#FFF3CF">ברוך</text></g>
 <g class="j-sc"><g transform="translate(150 53)"><circle cx="-8" cy="-14" r="5" fill="none" stroke="#D0D4DE" stroke-width="3"/><circle cx="8" cy="-14" r="5" fill="none" stroke="#D0D4DE" stroke-width="3"/><path d="M-5 -10L4 8M5 -10L-4 8" stroke="#E7EAF0" stroke-width="3.5" stroke-linecap="round"/></g></g>
 ${cross(150,53,"j-x1",0)}${pill(150,86,"אינו רשאי לקצר","","j-t1","#FBE4E1")}
 <text x="300" y="108" text-anchor="start" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="12" fill="#EADFFF">קצרה</text>
 <rect x="28" y="114" width="110" height="22" rx="4" fill="#FBF6E8"/>${lines(28,114,110)}
 <rect class="j-ext" x="138" y="114" width="96" height="22" rx="4" fill="#FBF6E8" opacity="0" stroke="#CF4237" stroke-dasharray="4 3"/>
 ${cross(188,125,"j-x2",0)}${pill(188,98,"אינו רשאי להאריך","","j-t2","#FBE4E1")}
 ${pill(236,80,"לחתום","אינו רשאי שלא לחתום","j-t3","#FFF3CF")}
 ${curtain("#26407A")}`}};

/* 1:5 part 2 · the two derashos on "כל ימי חייך" */
show("k-a",3,47);show("k-s1",6,47);show("k-s2",9,47);show("k-s3",12,47);
anim("k-kol1","0%,15%{opacity:0;transform:translateY(-30px)}19%,46%{opacity:1;transform:translateY(0)}49%,100%{opacity:0}");
show("k-m1",22,47);show("k-m2",25,47);show("k-m3",28,47);show("k-ra",32,47);
show("k-b",52);show("k-w",56);
anim("k-kol2","0%,62%{opacity:0;transform:translateY(-30px)}66%,94%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}");
show("k-city",70);show("k-rb",76);
SCENES.m5b={cap:"כל ימי חייך · two derashos",draw(){const s=uid("s");
 const kol=k=>`<g class="${k}" opacity="0"><rect x="146" y="30" width="28" height="22" rx="6" fill="#F1BD3C"/><text x="160" y="46" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="15" fill="#2B1E00">כל</text></g>`;
 return `<defs>${sky(s,"#1F3E78","#5A4FA0")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(16,320,150,15)}
 <g class="k-a">${pill(160,14,"בן זומא","","","#DCE8FF")}${pill(160,124,"ימי חייך – הימים","","","#FFF3CF")}</g>
 <g class="k-s1">${sunIcon(56,88,9)}</g><g class="k-s2">${sunIcon(136,88,9)}</g><g class="k-s3">${sunIcon(216,88,9)}</g>
 ${kol("k-kol1")}
 <g class="k-m1" opacity="0">${moonIcon(96,88,9,"#2E4688")}</g><g class="k-m2" opacity="0">${moonIcon(176,88,9,"#33498E")}</g><g class="k-m3" opacity="0">${moonIcon(256,88,9,"#384C92")}</g>
 ${pill(160,144,"כל – הלילות","","k-ra","#EADFFF",undefined,0)}
 <g class="k-b" opacity="0"><rect width="320" height="150" fill="url(#${s})"/>${pill(160,14,"חכמים","","","#E4F2DB")}</g>
 <g class="k-w" opacity="0"><circle cx="76" cy="86" r="22" fill="#3E86D0"/><path d="M62 74q8 4 10 12t-6 14M84 68q-4 8 4 14t10 4" fill="#5FAE4E"/><circle cx="76" cy="86" r="22" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>${pill(76,124,"ימי חייך","העולם הזה","","#FFF3CF")}</g>
 ${kol("k-kol2")}
 <g class="k-city" opacity="0"><circle cx="244" cy="86" r="30" fill="#FFE08A" opacity=".35"/><path d="M214 108V82h8v-8h8v8h8V70l6-8 6 8v12h8v-8h8v8h8v26z" fill="#F1BD3C" stroke="#B07D06"/>${[226,242,258].map(x=>`<rect x="${x}" y="94" width="6" height="14" rx="3" fill="#B07D06"/>`).join("")}${pill(244,124,"כל","להביא לימות המשיח","k-rb","#E4F2DB",undefined,0)}</g>
 ${curtain("#1F3E78")}`}};
const STEP_SCENES={m1a:["m1a","m1a2"],m1b:["m1b","m1b2"],m2:["m2","m2b"],m3:["m3a","m3"],m4:["m4","m4b"],m5:["m5","m5b"]};

/* ---- Halacha: Kitzur Siman 1 cartoons ---- */
const A={
 leopard:`<circle cx="-12" cy="-13" r="5.5" fill="#E8B23A"/><circle cx="12" cy="-13" r="5.5" fill="#E8B23A"/><circle r="17" fill="#F2C14E"/>${[[-9,-6],[8,-8],[-11,6],[11,5],[0,-12],[-4,11],[5,12]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#7A4A12"/>`).join("")}<ellipse cx="0" cy="6" rx="7" ry="5" fill="#FBE3A8"/><circle cx="-6" cy="-2" r="2.2" fill="#1A1A1A"/><circle cx="6" cy="-2" r="2.2" fill="#1A1A1A"/><path d="M-2.5 3h5l-2.5 3z" fill="#7A4A12"/>`,
 eagle:`<path d="M-30 4Q-18 -14 0 -2Q18 -14 30 4Q14 0 0 10Q-14 0 -30 4z" fill="#7A4E25"/><circle cy="-8" r="10" fill="#FFFFFF" stroke="#D8D8D8"/><path d="M-3 -6l6 0-3 7z" fill="#F1BD3C"/><circle cx="-4" cy="-10" r="1.8" fill="#1A1A1A"/><circle cx="4" cy="-10" r="1.8" fill="#1A1A1A"/>`,
 deer:`<path d="M-8 -14l-6-14M-11 -21l-7-3M8 -14l6-14M11 -21l7-3" stroke="#7A4E25" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="-14" cy="-10" rx="6" ry="3.5" fill="#A86A3A" transform="rotate(-25 -14 -10)"/><ellipse cx="14" cy="-10" rx="6" ry="3.5" fill="#A86A3A" transform="rotate(25 14 -10)"/><ellipse rx="12" ry="16" fill="#B87A44"/><ellipse cy="8" rx="7" ry="6" fill="#E9C9A0"/><circle cx="-5" cy="-3" r="2" fill="#1A1A1A"/><circle cx="5" cy="-3" r="2" fill="#1A1A1A"/><ellipse cy="6" rx="2.6" ry="2" fill="#3A2412"/>`,
 lion:`<circle r="20" fill="#C9781E"/><circle cx="-10" cy="-11" r="4.5" fill="#F2B14C"/><circle cx="10" cy="-11" r="4.5" fill="#F2B14C"/><circle r="13" fill="#F2B14C"/><ellipse cy="6" rx="7" ry="5" fill="#FBE0A8"/><circle cx="-5" cy="-2" r="2" fill="#1A1A1A"/><circle cx="5" cy="-2" r="2" fill="#1A1A1A"/><path d="M-2.5 3h5l-2.5 3z" fill="#7A4A12"/>`
};
const animal=(k,x,y,s=1,cls="")=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">${A[k]}</g></g>`;
const lbl=(x,y,t,bg="#FFF3CF")=>{const w=t.length*6.6+14;return `<rect x="${x-w/2}" y="${y-10}" width="${w}" height="20" rx="10" fill="${bg}" stroke="rgba(0,0,0,.25)"/><text x="${x}" y="${y+4}" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="11" fill="#16213A">${t}</text>`};
const bed=(x,y,w=120)=>`<rect x="${x}" y="${y-30}" width="10" height="40" rx="3" fill="#8A5A2B"/><rect x="${x}" y="${y-6}" width="${w}" height="14" rx="3" fill="#A8743E"/><rect x="${x+w-8}" y="${y-18}" width="8" height="28" rx="3" fill="#8A5A2B"/><rect x="${x+12}" y="${y-16}" width="22" height="10" rx="5" fill="#FFFFFF"/>`;
const lying=(x,y,o={})=>`<g transform="translate(${x} ${y}) rotate(-90)">${at(0,0,1,man(Object.assign({robe:"#5C8FE8",beard:"#6B4A2A"},o)))}</g>`;
const blanket=(x,y,w,c="#7D5CC0")=>`<path d="M${x} ${y}h${w}q6 0 6 6v8h-${w+6}v-8q0-6 6-6z" fill="${c}"/>`;
const room=(c1,c2)=>`<rect width="320" height="150" fill="${c1}"/><rect y="118" width="320" height="32" fill="${c2}"/>`;
const win=(x,y,w,h,inner)=>{const cl=uid("cl");return `<defs><clipPath id="${cl}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/></clipPath></defs><g clip-path="url(#${cl})">${inner}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="#6B4A2A" stroke-width="5"/><path d="M${x+w/2} ${y}v${h}M${x} ${y+h/2}h${w}" stroke="#6B4A2A" stroke-width="3"/>`};

/* k1a · alone at home vs. before a great king */
anim("q1-dl","0%,48%{opacity:0}52%,94%{opacity:.6}100%{opacity:0}");anim("q1-dr","0%,44%{opacity:.6}50%,100%{opacity:0}");show("q1-p1",6,46);show("q1-p2",52);
anim("q1-lean","0%,100%{transform:rotate(-10deg)}50%{transform:rotate(-14deg)}","3");
SCENES.k1a={cap:"לפני מלך גדול · before a great king",draw(){
 return `<rect width="160" height="150" fill="#E9D7B8"/><rect y="118" width="160" height="32" fill="#B98A57"/><rect x="160" width="160" height="150" fill="#5B3C8F"/><rect x="160" y="118" width="160" height="32" fill="#3E2A66"/>
 <path d="M160 0v150" stroke="#fff" stroke-width="3" opacity=".7"/>
 <rect x="20" y="78" width="56" height="44" rx="10" fill="#9C5B3B"/><rect x="14" y="96" width="68" height="26" rx="8" fill="#B66E4A"/>
 <g style="transform-origin:62px 132px" class="q1-lean">${at(62,132,.85,man({robe:"#5C8FE8",beard:"#6B4A2A",arm:"up"}))}</g>
 <rect x="104" y="40" width="34" height="26" rx="3" fill="#CFE6FF" stroke="#8A5A2B" stroke-width="3"/>
 <path d="M266 118V48q0-14 14-14h12q14 0 14 14v70z" fill="#B03A30" stroke="#F1BD3C" stroke-width="3"/>
 ${at(286,124,.85,man({robe:"#B03A30",beard:"#D8D8D8"}),true)}<path d="M276 76l3-9 4 5 3-8 3 8 4-5 3 9z" fill="#F1BD3C" stroke="#B07D06"/>
 <path d="M170 132h90" stroke="#F1BD3C" stroke-width="5"/>
 ${at(222,132,.85,man({robe:"#5C8FE8",beard:"#6B4A2A",hat:"hat"}))}
 <rect class="q1-dl" width="160" height="150" fill="#10182E" opacity=".55"/><rect class="q1-dr" x="160" width="160" height="150" fill="#10182E" opacity=".55"/>
 ${pill(80,20,"לבדו בביתו","","q1-p1","#FFF3CF")}${pill(240,20,"לפני מלך גדול","","q1-p2","#EADFFF",undefined,0)}
 ${curtain("#2A1D4D")}`}};

/* k1b · "Do I not fill the heavens and the earth?" */
anim("q2-rays","0%,10%{opacity:0;transform:scaleY(.2)}34%,94%{opacity:1;transform:scaleY(1)}100%{opacity:0}");
KF.push(".q2-rays{transform-origin:160px 0px}");
show("q2-p1",8,50);show("q2-p2",52);
anim("q2-man","0%,58%{transform:translateX(0)}70%,100%{transform:translateX(-56px)}");
SCENES.k1b={cap:"מלא כל הארץ כבודו · His glory fills the earth",draw(){const s=uid("s"),g=uid("g");
 return `<defs>${sky(s,"#2C4E8E","#8FB7E8")}<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".85"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></linearGradient></defs>
 <rect width="320" height="150" fill="url(#${s})"/>
 <g class="q2-rays">${[-70,-45,-22,0,22,45,70].map(a=>`<path d="M160 0L${160+Math.tan(a*Math.PI/180)*150-14} 150h28z" fill="url(#${g})" opacity=".55"/>`).join("")}</g>
 <path d="M0 112Q80 100 160 112T320 106V150H0z" fill="#5E8C46"/>
 <g class="q2-man">${at(262,128,.8,man({robe:"#7A5A3A",beard:"#4A3020"}))}</g>
 <rect x="252" y="62" width="14" height="66" fill="#6B4423"/><circle cx="259" cy="56" r="28" fill="#3E7A34"/><circle cx="240" cy="66" r="18" fill="#4A8A3C"/><circle cx="280" cy="68" r="18" fill="#4A8A3C"/>
 ${pill(110,42,"אם יסתר איש במסתרים","","q2-p1","#FFF3CF")}${pill(120,42,"הלוא את השמים ואת הארץ אני מלא","","q2-p2","#FFF3CF",undefined,0)}
 ${curtain("#2C4E8E")}`}};

/* k2a · the neshamah returns new and refreshed */
hideAt("q3-night",40,50);show("q3-z",0,40);
anim("q3-soul","0%,42%{transform:translate(0,0);opacity:0}46%{opacity:1}62%{transform:translate(-118px,52px);opacity:1}68%,100%{transform:translate(-118px,52px);opacity:0}");
show("q3-spark",64);show("q3-p",66);
SCENES.k2a={cap:"שהחזיר לו את נשמתו · a new morning",draw(){const n=uid("n"),d=uid("d"),gl=uid("gl");
 return `<defs>${sky(d,"#8FC3F2","#FFE7B0")}${sky(n,"#0D1A3C","#2B4278")}<radialGradient id="${gl}"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#FFF3B8"/><stop offset="1" stop-color="#FFF3B8" stop-opacity="0"/></radialGradient></defs>
 ${room("#D9C6A3","#9C7650")}
 ${win(214,22,76,58,`<rect x="214" y="22" width="76" height="58" fill="url(#${d})"/>${sunIcon(252,58,9)}<rect class="q3-night" x="214" y="22" width="76" height="58" fill="url(#${n})"/><g class="q3-night">${moonIcon(266,38,7,"#1B2E5E")}</g>`)}
 ${bed(40,118,110)}${lying(104,106)}${blanket(74,94,44)}
 <g class="q3-z"><text x="104" y="62" font-family="Rubik,sans-serif" font-weight="800" font-size="14" fill="#5B6884">z</text><text x="114" y="50" font-family="Rubik,sans-serif" font-weight="800" font-size="11" fill="#5B6884" opacity=".7">z</text></g>
 <g class="q3-soul"><circle cx="252" cy="52" r="10" fill="url(#${gl})"/><circle cx="252" cy="52" r="4" fill="#FFFFFF"/></g>
 <g class="q3-spark">${[[60,74],[78,66],[70,86]].map(([x,y],i)=>`<path class="tw" style="animation-delay:${i*.3}s" d="M${x} ${y-5}l1.6 3.4 3.4 1.6-3.4 1.6-1.6 3.4-1.6-3.4-3.4-1.6 3.4-1.6z" fill="#F1BD3C"/>`).join("")}</g>
 ${pill(140,30,"חדשה ורגועה","new and refreshed","q3-p","#FFF3CF")}
 ${curtain("#0D1A3C")}`}};

/* k2b · Modeh Ani, still in bed */
show("q4-b1",8,40);show("q4-b2",44,78);show("q4-cup",80);show("q4-p",82);
SCENES.k2b={cap:"מודה אני · still in bed",draw(){const d=uid("d");
 return `<defs>${sky(d,"#8FC3F2","#FFE7B0")}</defs>${room("#E3D2B0","#9C7650")}
 ${win(232,20,64,50,`<rect x="232" y="20" width="64" height="50" fill="url(#${d})"/>${sunIcon(262,52,8)}`)}
 ${bed(70,118,160)}${at(108,112,.9,man({robe:"#F4F1E6",beard:"#6B4A2A"}))}${blanket(84,96,140)}
 <g class="q4-cup"><path d="M250 104h20l-3 14h-14z" fill="#C9D3E2" stroke="#7D8AA0"/><path d="M270 106q6 0 6 5t-6 5" stroke="#7D8AA0" stroke-width="2" fill="none"/><ellipse cx="260" cy="122" rx="22" ry="5" fill="#9AA8BE"/></g>
 ${bubble(170,34,"מודה אני לפניך מלך חי וקים","q4-b1","left",1)}${bubble(172,34,"שהחזרת בי נשמתי בחמלה ‖ רבה אמונתך","q4-b2","left",0)}
 ${pill(170,40,"אין בו שם","before negel vasser","q4-p","#E4F2DB",undefined,0)}
 ${curtain("#8FC3F2")}`}};

/* k3a · four animals */
[["lp",8],["eg",24],["dr",40],["ln",56]].forEach(([k,t])=>show("q5-"+k,t));show("q5-top",74);
SCENES.k3a={cap:"עז כנמר · four animals",draw(){const s=uid("s");
 const col=(x,k,he,cls)=>`<g class="${cls}" opacity="0">${animal(k,x,72,1.05,"bob")}${lbl(x,112,he)}</g>`;
 return `<defs>${sky(s,"#7FB6EE","#E6F2FF")}</defs><rect width="320" height="150" fill="url(#${s})"/><path d="M0 124Q80 114 160 124T320 120V150H0z" fill="#7DAE5E"/>
 ${col(272,"leopard","עז כנמר","q5-lp")}${col(198,"eagle","קל כנשר","q5-eg")}${col(124,"deer","רץ כצבי","q5-dr")}${col(50,"lion","גבור כארי","q5-ln")}
 ${pill(160,20,"לעשות רצון אביך שבשמים","","q5-top","#EADFFF",undefined,0)}
 ${curtain("#7FB6EE")}`}};

/* k3b · eyes, legs, heart */
show("q6-e",4,32);anim("q6-st","0%,33%{opacity:1}34%,58%{opacity:0}60%,100%{opacity:1}");show("q6-w",34,58);show("q6-l",34,58);show("q6-h",62);
anim("q6-lid","0%,10%{transform:scaleY(0)}16%,26%{transform:scaleY(1)}32%,100%{transform:scaleY(0)}");KF.push(".q6-lid{transform-box:fill-box;transform-origin:50% 0}");
anim("q6-beat","0%,100%{transform:scale(1)}50%{transform:scale(1.18)}","1.1");KF.push(".q6-beat{transform-box:fill-box;transform-origin:50% 50%}");
SCENES.k3b={cap:"העין, הרגלים, הלב · eyes, legs, heart",draw(){const s=uid("s");
 return `<defs>${sky(s,"#3E6FB8","#9CC3EC")}</defs><rect width="320" height="150" fill="url(#${s})"/><path d="M0 128h320v22H0z" fill="#6A9E4E"/>
 <g class="q6-st">${at(110,140,1.55,man({robe:"#2F6B57",beard:"#5A3A22",hat:"hat"}))}</g>
 <g class="q6-w" opacity="0">${at(110,140,1.55,man({robe:"#2F6B57",beard:"#5A3A22",hat:"hat",walk:1}))}</g>
 <g class="q6-e"><rect class="q6-lid" x="104" y="69" width="14" height="5" rx="2" fill="${SK}"/><circle cx="110" cy="74" r="20" fill="none" stroke="#F1BD3C" stroke-width="3" stroke-dasharray="5 4"/>${animal("eagle",226,58,.8)}${pill(226,96,"קל כנשר","the eyes: shut them from evil","","#FFF3CF")}</g>
 <g class="q6-l" opacity="0"><ellipse cx="110" cy="128" rx="22" ry="12" fill="none" stroke="#F1BD3C" stroke-width="3" stroke-dasharray="5 4"/>${animal("deer",226,56,.85)}${pill(226,96,"רץ כצבי","the legs: run to do good","","#FFF3CF")}</g>
 <g class="q6-h" opacity="0"><path class="q6-beat" d="M110 106c-8-6-11-10-9-14 2-4 7-4 9 0 2-4 7-4 9 0 2 4-1 8-9 14z" fill="#E8636B" stroke="#fff" stroke-width="1.5"/>${animal("lion",226,58,.8)}${pill(226,96,"גבור כארי","the heart: strength to serve","","#FFF3CF")}</g>
 ${curtain("#3E6FB8")}`}};

/* k4a · the yetzer's excuses, winter and summer; then up like a lion */
hideAt("q7-w",40,46);show("q7-s",42,72);show("q7-b1",8,38);show("q7-b2",46,70);
anim("q7-lie","0%,72%{opacity:1}75%,100%{opacity:0}");show("q7-up",74);show("q7-p",76);
anim("q7-snow","0%{transform:translateY(-20px)}100%{transform:translateY(60px)}","2.2","linear");
SCENES.k4a={cap:"בטענות ותואנות · the excuses",draw(){const sw=uid("w"),ss=uid("s");
 return `<defs>${sky(sw,"#8C9BB5","#D6DEEA")}${sky(ss,"#7FC0F5","#FFE3A0")}</defs>${room("#D9C6A3","#9C7650")}
 ${win(222,18,80,62,`<rect x="222" y="18" width="80" height="62" fill="url(#${ss})"/>${sunIcon(262,48,10)}<g class="q7-w"><rect x="222" y="18" width="80" height="62" fill="url(#${sw})"/><g class="q7-snow">${[230,246,262,278,294,238,270,286].map((x,i)=>`<circle cx="${x}" cy="${10+(i%3)*14}" r="2" fill="#fff"/>`).join("")}</g></g>`)}
 ${bed(30,118,110)}<g class="q7-lie">${lying(94,106)}${blanket(64,94,44)}</g>
 <g class="q7-up" opacity="0">${blanket(64,94,44)}${at(196,124,.95,man({robe:"#5C8FE8",beard:"#6B4A2A",arm:"up"}))}${animal("lion",150,44,.7)}</g>
 ${bubble(120,40,"והקר גדול!","q7-b1","down",1)}${bubble(120,40,"עדיין לא שבעת משנתך!","q7-b2","down",0)}
 ${pill(110,70,"יקום בזריזות","","q7-p","#E4F2DB",undefined,0)}
 ${curtain("#6B5A44")}`}};

/* k4b · "if a fire broke out in the city…" */
show("q8-fire",6);show("q8-p1",10,94);
anim("q8-run","0%,16%{transform:translateX(0)}52%,100%{transform:translateX(150px)}","10","linear");
show("q8-bag",30);show("q8-p2",58);
SCENES.k4b={cap:"דלקה בעיר · how fast we run for money",draw(){const s=uid("s");
 const fl=(x,y,s2,dl)=>`<g class="flame" style="transform-origin:${x}px ${y}px;animation-delay:${dl}s"><path d="M${x-10*s2} ${y}c0-14 8-16 6-28 9 7 13 15 9 22 4-3 5-8 4-13 7 8 7 14 3 19z" fill="#F46A1C"/><path d="M${x-4*s2} ${y}c1-6 4-8 4-13 4 4 5 8 2 13z" fill="#FFD866"/></g>`;
 return `<defs>${sky(s,"#1B1440","#4A2F6E")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(18,320,60,12)}
 <path d="M0 120h320v30H0z" fill="#2A1D4D"/>
 <rect x="20" y="78" width="54" height="42" fill="#3F3170"/><path d="M14 80l33-22 33 22z" fill="#31265A"/><rect x="40" y="96" width="12" height="24" fill="#FFD27A"/>
 <rect x="232" y="70" width="70" height="50" fill="#4A3678"/><path d="M226 72l41-26 41 26z" fill="#3A2A62"/><rect x="258" y="96" width="16" height="24" fill="#2A1D4D"/>
 <g class="q8-fire" opacity="0">${fl(246,72,1,0)}${fl(272,58,1.2,.3)}${fl(294,70,1,.6)}<rect x="232" y="70" width="70" height="50" fill="#FF9F6B" opacity=".25"/></g>
 <g class="q8-bag" opacity="0"><path d="M212 118q-12 0-12-12 0-10 10-14l-4-6h12l-4 6q10 4 10 14 0 12-12 12z" fill="#C9A34A" stroke="#8A6A22"/><text x="210" y="112" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="10" fill="#5A4410">$</text></g>
 <g transform="translate(40 128)"><g class="q8-run">${at(0,0,.8,man({robe:"#5C8FE8",beard:"#6B4A2A",walk:1}))}</g></g>
 ${pill(266,26,"דלקה בעיר!","","q8-p1","#FBE4E1",undefined,0)}${pill(120,44,"בודאי היה זריז לקום מיד","","q8-p2","#FFF3CF",undefined,0)}
 ${curtain("#1B1440")}`}};

/* k4c · serving the king; four or five mornings */
anim("q9-walk","0%,4%{transform:translateX(0);opacity:1}34%{transform:translateX(150px);opacity:1}38%,100%{transform:translateX(150px);opacity:0}","10","linear");
show("q9-p1",6,38);hideAt("q9-pal",38,44);
[46,52,58,64,70].forEach((t,i)=>show("q9-d"+i,t));show("q9-p2",62);show("q9-p3",80);
SCENES.k4c={cap:"מלך מלכי המלכים · building the habit",draw(){const s=uid("s"),n=uid("n");
 return `<defs>${sky(s,"#4C8FE0","#CFE6FF")}${sky(n,"#2B3C78","#7A6FC0")}</defs><rect width="320" height="150" fill="url(#${n})"/>
 <g class="q9-pal"><rect width="320" height="150" fill="url(#${s})"/><path d="M0 120h320v30H0z" fill="#6AA04E"/>
 <rect x="222" y="56" width="84" height="64" fill="#D9BE86"/><rect x="216" y="38" width="16" height="82" fill="#C9A96A"/><rect x="296" y="38" width="16" height="82" fill="#C9A96A"/><path d="M214 38h20l-10-12zM294 38h20l-10-12z" fill="#2457A6"/><path d="M252 120V96q12-12 24 0v24z" fill="#8A5A2B"/><path d="M254 52l3-9 4 5 3-8 3 8 4-5 3 9z" fill="#F1BD3C"/>
 <g transform="translate(50 128)"><g class="q9-walk">${at(0,0,.8,man({robe:"#5C8FE8",beard:"#6B4A2A",hat:"hat",walk:1}))}</g></g>
 ${pill(110,30,"לעבודת המלך","","q9-p1","#FFF3CF",undefined,0)}</g>
 ${[0,1,2,3,4].map(i=>`<g class="q9-d${i}" opacity="0">${sunIcon(48+i*56,70,9)}<text x="${48+i*56}" y="104" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="13" fill="#FFF3CF">${i+1}</text></g>`).join("")}
 ${pill(160,24,"ארבע או חמש פעמים","","q9-p2","#FFF3CF",undefined,0)}${pill(160,128,"והבא לטהר מסייעין לו","","q9-p3","#E4F2DB",undefined,0)}
 ${curtain("#2B3C78")}`}};

/* k5a · Tikkun Chatzos */
show("q10-p1",8,28);show("q10-p2",30,56);show("q10-p3",58);
SCENES.k5a={cap:"תקון חצות · midnight",draw(){const s=uid("s"),cl=uid("c");
 return `<defs>${sky(s,"#070E26","#1E2F5C")}<clipPath id="${cl}"><rect x="-20" y="-70" width="40" height="58"/></clipPath></defs><rect width="320" height="150" fill="url(#${s})"/>${starField(40,320,70,31)}
 ${moonIcon(160,24,11,"#0C1734")}
 ${[0,1,2,3,4].map(r=>[...Array(9)].map((_,c)=>`<rect x="${c*36-(r%2)*18}" y="${58+r*13}" width="34" height="11" rx="2" fill="#B9A57A" opacity="${.55+((r*7+c*3)%5)*.06}"/>`).join("")).join("")}
 <path d="M0 122h320v28H0z" fill="#3A3142"/>
 <g transform="translate(150 134) scale(.9)"><g clip-path="url(#${cl})">${man({robe:"#3A3F52",beard:"#5A3A22",hat:"hat"})}</g><ellipse cx="0" cy="-8" rx="16" ry="6" fill="#2A2D3E"/></g>
 <rect x="182" y="112" width="6" height="16" rx="2" fill="#FFF8E7"/><g class="flame" style="transform-origin:185px 112px"><path d="M185 98c4 5 5 9 0 13-5-4-4-8 0-13z" fill="#F4A51C"/></g><circle cx="185" cy="106" r="16" fill="#FFD866" opacity=".18"/>
 ${pill(160,50,"חצות הלילה","","q10-p1","#DCE8FF",undefined,0)}${pill(160,50,"תקון חצות","for the Beis HaMikdash","q10-p2","#FFF3CF",undefined,0)}${pill(160,50,"החרבתי את ביתי","","q10-p3","#EADFFF",undefined,0)}
 ${curtain("#070E26")}`}};

/* k5b · "I wake the dawn"; משנה = נשמה */
anim("q11-sky","0%,10%{opacity:0}42%,100%{opacity:1}");show("q11-b",10,44);show("q11-lt",48);
anim("q11-m","0%,62%{transform:translateX(0)}74%,100%{transform:translateX(-80px)}");anim("q11-n","0%,62%{transform:translateX(0)}74%,100%{transform:translateX(80px)}");
show("q11-w1",50,66);show("q11-w2",76);
SCENES.k5b={cap:"אעירה שחר · I wake the dawn",draw(){const n=uid("n"),d=uid("d");
 const tile=(x,ch,cls)=>`<g class="${cls}"><rect x="${x-17}" y="40" width="34" height="40" rx="8" fill="#FBF6E8" stroke="#B07D06" stroke-width="2"/><text x="${x}" y="70" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="26" fill="#2457A6">${ch}</text></g>`;
 return `<defs>${sky(n,"#0A1636","#27407A")}${sky(d,"#4E6FB0","#FFC98A")}</defs><rect width="320" height="150" fill="url(#${n})"/><rect class="q11-sky" width="320" height="150" fill="url(#${d})"/>${starField(24,320,60,8)}
 <path d="M0 122h320v28H0z" fill="#3E2F24"/>
 <rect x="150" y="96" width="90" height="8" fill="#8A5A2B"/><rect x="156" y="104" width="6" height="22" fill="#8A5A2B"/><rect x="228" y="104" width="6" height="22" fill="#8A5A2B"/>
 <path d="M188 96l12-4 12 4v-10l-12 4-12-4z" fill="#FBF6E8" stroke="#8A5A2B"/>
 <rect x="222" y="84" width="5" height="12" fill="#FFF8E7"/><g class="flame" style="transform-origin:224px 84px"><path d="M224.5 74c3 4 4 7 0 10-4-3-3-6 0-10z" fill="#F4A51C"/></g>
 ${at(130,130,.9,man({robe:"#3E6FB8",beard:"#6B4A2A",hat:"hat"}))}
 ${bubble(110,30,"אני מעורר את השחר","q11-b","down",1)}
 <g class="q11-lt" opacity="0"><rect width="320" height="150" fill="#1F3E78" opacity=".88"/>
  ${tile(220,"מ","q11-m")}${tile(180,"ש","")}${tile(140,"נ","q11-n")}${tile(100,"ה","")}
  ${pill(160,110,"משנה","","q11-w1","#FFF3CF",undefined,0)}${pill(160,110,"נשמה","משנה אותיות נשמה","q11-w2","#E4F2DB",undefined,0)}</g>
 ${curtain("#0A1636")}`}};

/* k5c · learning at night; on short nights, daven with the tzibbur */
show("q12-p1",10,46);show("q12-p2",24,46);hideAt("q12-night",46,52);
anim("q12-walk","0%,52%{transform:translateX(0);opacity:0}54%{opacity:1}86%,100%{transform:translateX(130px);opacity:1}","10","linear");show("q12-p3",60);
SCENES.k5c={cap:"עבד ה' · learning at night",draw(){const n=uid("n"),d=uid("d"),g=uid("g");
 return `<defs>${sky(n,"#0A1636","#27407A")}${sky(d,"#7FC0F5","#FFE7B0")}<radialGradient id="${g}"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".7"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient></defs>
 <rect width="320" height="150" fill="url(#${d})"/>${sunIcon(60,40,10)}<path d="M0 120h320v30H0z" fill="#6AA04E"/>
 <rect x="200" y="58" width="100" height="62" fill="#D9C9A6"/><path d="M194 60l56-30 56 30z" fill="#8A5A2B"/><path d="M240 120V96q10-12 20 0v24z" fill="#8A5A2B"/><text x="250" y="52" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="10" fill="#FFF3CF">בית הכנסת</text>
 <g transform="translate(40 128)"><g class="q12-walk" opacity="0">${at(0,0,.8,man({robe:"#3E6FB8",beard:"#6B4A2A",hat:"hat",walk:1}))}</g></g>
 ${pill(110,30,"להתפלל עם הצבור","","q12-p3","#E4F2DB",undefined,0)}
 <g class="q12-night"><rect width="320" height="150" fill="url(#${n})"/>${starField(30,320,70,19)}<path d="M0 120h320v30H0z" fill="#1B2440"/>
  <rect x="90" y="52" width="140" height="68" fill="#3A4D85"/><path d="M84 54l76-32 76 32z" fill="#2C3C6E"/>
  <circle cx="160" cy="84" r="60" fill="url(#${g})"/>
  ${[108,146,184].map(x=>`<rect x="${x}" y="66" width="28" height="30" rx="3" fill="#FFD27A"/>`).join("")}
  ${at(122,94,.42,man({robe:"#3E6FB8",beard:"#6B4A2A",hat:"hat",arm:"up"}))}${at(198,94,.42,man({robe:"#2F6B57",beard:"#9A9A9A",hat:"hat",arm:"up"}),true)}
  ${pill(160,14,"שכינה כנגדו","","q12-p1","#FFF3CF",undefined,0)}${pill(160,138,"נקרא עבד ה'","","q12-p2","#EADFFF",undefined,0)}</g>
 ${curtain("#0A1636")}`}};

/* k6a · Tehillim from a sefer */
show("q13-ck",12,48);show("q13-p1",14,48);show("q13-p2",52);
SCENES.k6a={cap:"מזמורי תהלים · from a sefer",draw(){const s=uid("s");
 return `<defs>${sky(s,"#3E6FB8","#9CC3EC")}</defs>${room("#E3D2B0","#9C7650")}
 <rect x="20" y="20" width="90" height="98" fill="#8A5A2B"/>${[0,1,2].map(r=>[...Array(6)].map((_,c)=>`<rect x="${26+c*13}" y="${26+r*31}" width="10" height="26" fill="${["#B03A30","#2457A6","#2F6B57","#7D5CC0","#C98A20","#5B3C8F"][(r+c)%6]}"/>`).join("")).join("")}
 ${at(170,130,1.15,man({robe:"#2F6B57",beard:"#5A3A22",hat:"hat",arm:"up",hold:`<path d="M4 -50l9 3 9-3v12l-9 3-9-3z" fill="#FBF6E8" stroke="#8A5A2B"/><path d="M13 -47v12" stroke="#8A5A2B"/>`}))}
 <text x="200" y="74" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="8" fill="#5B4A1E">תהלים</text>
 ${ckmark(232,56,"q13-ck",0)}${pill(256,90,"מתוך הספר","the Kitzur","q13-p1","#FFF3CF",undefined,0)}
 ${pill(244,90,"תהלים בעל פה","Mishnah Berurah: like tefillah","q13-p2","#E4F2DB",undefined,0)}
 ${curtain("#6B5A44")}`}};

/* k6b · "Baruch shome'a tefillah", without the Name */
show("q14-l1",6);show("q14-x",24);show("q14-l2",44);show("q14-ck",58);show("q14-p",66);
SCENES.k6b={cap:"בלא שם · ending the tefillah",draw(){const s=uid("s");
 const line=(y,t,cls)=>`<g class="${cls}" opacity="0"><rect x="50" y="${y-16}" width="220" height="30" rx="8" fill="#FBF6E8" stroke="#D9CBA4"/><text x="160" y="${y+4}" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="15" fill="#16213A">${t}</text></g>`;
 return `<defs>${sky(s,"#26407A","#5D4FA8")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(14,320,150,6)}
 ${line(40,"ברוך אתה ה' שומע תפלה","q14-l1")}${cross(276,40,"q14-x",0)}
 ${line(88,"ברוך שומע תפלה","q14-l2")}${ckmark(276,88,"q14-ck",0)}
 ${pill(160,130,"בלא שם","without Hashem's Name","q14-p","#E4F2DB",undefined,0)}
 ${curtain("#26407A")}`}};
Object.assign(STEP_SCENES,{k1:["k1a","k1b"],k2:["k2a","k2b"],k3:["k3a","k3b"],k4:["k4a","k4b","k4c"],k5:["k5a","k5b","k5c"],k6:["k6a","k6b"]});

KF.push(".scene .flame{animation:flick 1.3s ease-in-out infinite}");

/* ---- Halacha: Kitzur Siman 2 cartoons (netilas yadayim) ---- */
const cup=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-12 -14h24l-3 22h-18z" fill="#C9D3E2" stroke="#6E7C94" stroke-width="1.5"/><path d="M-12 -10q-8 0-8 6t8 6M12 -10q8 0 8 6t-8 6" stroke="#6E7C94" stroke-width="2.5" fill="none"/><rect x="-12" y="-16" width="24" height="3" rx="1.5" fill="#9AA8BE"/></g>`;
const basin=(x,y,w=60)=>`<path d="M${x-w/2} ${y}h${w}l-6 16h-${w-12}z" fill="#9AA8BE" stroke="#6E7C94" stroke-width="1.5"/>`;
const hand=(x,y,s=1,flip=false)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})"><rect x="-9" y="-6" width="18" height="22" rx="7" fill="${SK}"/>${[-7.5,-2.5,2.5,7.5].map((fx,i)=>`<rect x="${fx-2.2}" y="${-22+Math.abs(i-1.5)*2}" width="4.4" height="20" rx="2.2" fill="${SK}"/>`).join("")}<rect x="7" y="-6" width="4.4" height="14" rx="2.2" fill="${SK}" transform="rotate(30 9 2)"/><rect x="-6" y="12" width="12" height="16" fill="#3E6FB8"/></g>`;
const stream=(x,y,h,cls)=>`<rect class="${cls}" x="${x-2}" y="${y}" width="4" height="${h}" rx="2" fill="#7FC0F5" opacity="0"/>`;
const drops=(x,y,cls)=>`<g class="${cls}" opacity="0">${[[0,0],[8,6],[-7,8],[3,14]].map(([dx,dy])=>`<path d="M${x+dx} ${y+dy}q3 4 0 6q-3-2 0-6z" fill="#7FC0F5"/>`).join("")}</g>`;

/* n1a · like a kohen at the kiyor */
show("z1-a",4,46);show("z1-b",50);show("z1-s1",10,44);show("z1-s2",60);show("z1-p1",14,46);show("z1-p2",62);
SCENES.n1a={cap:"כמו כהן מן הכיור · a new avodah each morning",draw(){const s=uid("s");
 return `<defs>${sky(s,"#E9C98A","#FBEFD2")}</defs><rect width="320" height="150" fill="url(#${s})"/><rect y="118" width="320" height="32" fill="#C9A46A"/>
 <g class="z1-a"><rect x="20" y="30" width="130" height="88" fill="#E6D2A4"/>${[0,1,2].map(i=>`<rect x="${28+i*44}" y="38" width="26" height="80" fill="#D9C08C"/>`).join("")}
  <rect x="88" y="70" width="10" height="48" fill="#B87333"/><ellipse cx="93" cy="70" rx="28" ry="8" fill="#C88A44" stroke="#8A5A2B"/><rect x="104" y="72" width="10" height="5" fill="#B87333"/>
  ${stream(112,77,30,"z1-s1")}
  <g transform="translate(130 124)">${at(0,0,.85,man({robe:"#F4F1E6",beard:"#5A3A22",arm:"up"}),true)}</g><ellipse cx="130" cy="84" rx="9" ry="5" fill="#FFFFFF"/>
  ${pill(84,20,"כהן · כיור","","z1-p1","#FFF3CF")}</g>
 <g class="z1-b" opacity="0"><rect x="170" y="30" width="140" height="88" fill="#D9C6A3"/>${bed(178,118,70)}
  ${at(270,124,.85,man({robe:"#5C8FE8",beard:"#6B4A2A"}))}<g transform="translate(250 92)">${cup(0,0,.9)}</g>${stream(244,100,16,"z1-s2")}${basin(246,116,30)}
  ${pill(240,20,"כל בוקר · מן הכלי","","z1-p2","#E4F2DB")}</g>
 ${curtain("#E9C98A")}`}};

/* n1b · three times, alternating */
const alt=[0,1,0,1,0,1];
anim("z2-cup",alt.map((h,i)=>`${8+i*12}%{transform:translateX(${h?110:0}px)}${14+i*12}%{transform:translateX(${h?110:0}px)}`).join("")+"86%,100%{transform:translateX(0)}");
alt.forEach((h,i)=>anim(`z2-w${i}`,`0%,${9+i*12}%{opacity:0}${10+i*12}%,${15+i*12}%{opacity:1}${16+i*12}%,100%{opacity:0}`));
[0,1,2].forEach(i=>show(`z2-n${i}`,20+i*24));show("z2-p",80);
SCENES.n1b={cap:"שלש פעמים בסרוגים · three times, alternating",draw(){const s=uid("s");
 return `<defs>${sky(s,"#DCE8FF","#F3F6FB")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 ${hand(104,92,1.4)}${hand(214,92,1.4,true)}
 <text x="104" y="146" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="12" fill="#2457A6">ימין</text><text x="214" y="146" text-anchor="middle" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="12" fill="#2457A6">שמאל</text>
 <g class="z2-cup"><g transform="rotate(-25 120 44)">${cup(120,44,1.1)}</g>${alt.map((h,i)=>`<rect class="z2-w${i}" x="102" y="52" width="5" height="22" rx="2.5" fill="#5DA8EE" opacity="0"/>`).join("")}</g>
 ${[0,1,2].map(i=>`<g class="z2-n${i}" opacity="0"><circle cx="${136+i*24}" cy="20" r="10" fill="#2457A6"/><text x="${136+i*24}" y="24.5" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="12" fill="#fff">${i+1}</text></g>`).join("")}
 ${pill(160,66,"בסרוגים","right, left · ×3","z2-p","#FFF3CF",undefined,0)}
 ${curtain("#DCE8FF")}`}};

/* n2a · the tallis katan first, no beracha yet */
show("z3-tk",14);show("z3-p1",20);show("z3-p2",54);
SCENES.n2a={cap:"טלית קטן · the first garment",draw(){const s=uid("s");
 return `${room("#E3D2B0","#9C7650")}${bed(20,118,90)}
 ${at(200,132,1.4,man({robe:"#F4F1E6",beard:"#6B4A2A"}))}
 <g class="z3-tk" opacity="0"><rect x="187" y="76" width="26" height="38" rx="3" fill="#FFFFFF" stroke="#C9C9C9"/><path d="M190 76h20" stroke="#1F2433" stroke-width="2"/><path d="M190 108h20" stroke="#1F2433" stroke-width="2"/>${[189,211].map(x=>`<path d="M${x} 114v14M${x+2} 114v12" stroke="#FFFFFF" stroke-width="1.4"/>`).join("")}</g>
 ${pill(96,46,"טלית קטן","the first garment","z3-p1","#FFF3CF",undefined,0)}${pill(96,84,"לא יברך עליו","hands not washed yet","z3-p2","#FBE4E1",undefined,0)}
 ${curtain("#9C7650")}`}};

/* n2b · step by step, and how far */
show("z4-s1",6,52);show("z4-q1",6,18);show("z4-q2",19,30);show("z4-q3",31,52);
anim("z4-cup","0%,6%{transform:translate(110px,0)}14%,20%{transform:translate(0,0)}26%,48%{transform:translate(0,0)}100%{transform:translate(0,0)}");
show("z4-w",30,50);show("z4-big",56);show("z4-l1",62);show("z4-l2",76);
SCENES.n2b={cap:"בדרך זה · the order of washing",draw(){const s=uid("s");
 return `<defs>${sky(s,"#DCE8FF","#F3F6FB")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 ${pill(160,20,"נוטל בימינו","","z4-q1","#FFF3CF",undefined,0)}${pill(160,20,"נותנו לשמאלו","","z4-q2","#FFF3CF",undefined,0)}${pill(160,20,"שופך על ימין","","z4-q3","#E4F2DB",undefined,0)}
 <g class="z4-s1">${hand(104,110,1.3)}${hand(214,110,1.3,true)}<g class="z4-cup"><g transform="rotate(-25 120 54)">${cup(120,54,1.1)}</g></g><rect class="z4-w" x="102" y="62" width="5" height="22" rx="2.5" fill="#5DA8EE" opacity="0"/></g>
 <g class="z4-big" opacity="0"><rect width="320" height="150" fill="#F3F6FB"/>${hand(160,94,2.2)}
  <path class="z4-l1" d="M128 118h64" stroke="#4E9A33" stroke-width="3" opacity="0"/><path class="z4-l2" d="M128 66h64" stroke="#E3A312" stroke-width="3" stroke-dasharray="5 4" opacity="0"/>
  <g class="z4-l1" opacity="0">${pill(262,118,"עד פרק הזרוע","best: to the wrist","","#E4F2DB")}</g><g class="z4-l2" opacity="0">${pill(60,66,"קשרי אצבעותיו","under pressure","","#FFF3CF")}</g></g>
 ${curtain("#DCE8FF")}`}};

/* n2c · face, mouth, towel */
show("z5-d1",8,40);show("z5-p1",10,40);show("z5-d2",42,66);show("z5-p2",44,66);
anim("z5-towel","0%,68%{opacity:0;transform:translateX(60px)}74%,92%{opacity:1;transform:translateX(0)}96%,100%{opacity:0}");show("z5-p3",72);
SCENES.n2c={cap:"לכבוד יוצרו · face and mouth",draw(){const s=uid("s");
 return `${room("#DDE7F0","#8FA3BC")}<rect x="150" y="18" width="60" height="46" rx="6" fill="#CFE6FF" stroke="#8FA3BC" stroke-width="3"/>
 ${at(110,132,1.5,man({robe:"#5C8FE8",beard:"#6B4A2A",arm:"up"}))}${basin(180,110,70)}
 ${drops(118,52,"z5-d1")}${drops(116,70,"z5-d2")}
 <g class="z5-towel" opacity="0"><rect x="110" y="56" width="30" height="40" rx="4" fill="#E8636B"/><path d="M110 64h30M110 88h30" stroke="#fff" stroke-width="2"/></g>
 ${pill(226,40,"רוחץ פניו","in honor of the Creator","z5-p1","#FFF3CF",undefined,0)}${pill(226,40,"ירחץ פיו","to say the Name in purity","z5-p2","#E4F2DB",undefined,0)}${pill(226,40,"מנגב ידיו ופניו","dry hands and face well","z5-p3","#EADFFF",undefined,0)}
 ${curtain("#DDE7F0")}`}};

/* n3a · into a vessel; pour it out where no one walks */
anim("z6-lvl","0%,6%{transform:scaleY(0)}36%,100%{transform:scaleY(1)}");KF.push(".z6-lvl{transform-box:fill-box;transform-origin:50% 100%}");
show("z6-s",6,36);hideAt("z6-a",44,50);show("z6-b",50);show("z6-x",58);show("z6-ok",70);show("z6-p",74);
anim("z6-pour","0%,62%{transform:rotate(0)}70%,94%{transform:rotate(-55deg)}100%{transform:rotate(0)}");KF.push(".z6-pour{transform-origin:236px 98px}");
SCENES.n3a={cap:"לתוך כלי · into a vessel",draw(){const s=uid("s");
 return `<defs>${sky(s,"#9CC9F2","#E6F2FF")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 <g class="z6-a">${hand(130,70,1.1)}${hand(190,70,1.1,true)}${stream(160,40,60,"z6-s")}<rect class="z6-lvl" x="128" y="112" width="64" height="10" fill="#7FC0F5"/>${basin(160,106,80)}${pill(160,22,"לתוך כלי","","","#FFF3CF")}</g>
 <g class="z6-b" opacity="0"><path d="M0 120h320v30H0z" fill="#7DAE5E"/><path d="M20 150l40-30h40l-30 30z" fill="#D9C08C"/>${[[48,138],[62,128],[76,140]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="3" ry="5" fill="#A88A5A"/>`).join("")}
  ${cross(70,108,"z6-x",0)}<circle cx="280" cy="112" r="20" fill="#3E7A34"/><circle cx="262" cy="118" r="14" fill="#4A8A3C"/>
  ${at(208,132,.95,man({robe:"#5C8FE8",beard:"#6B4A2A",arm:"up"}))}<g class="z6-pour">${basin(236,92,34)}</g>${ckmark(296,82,"z6-ok",0)}
  ${pill(160,30,"במקום שאין בני אדם הולכים","","z6-p","#E4F2DB",undefined,0)}</g>
 ${curtain("#9CC9F2")}`}};

/* n3b · don't touch before washing */
anim("z7-hand","0%,4%{transform:translate(60px,40px)}20%,40%{transform:translate(0,0)}48%,100%{transform:translate(60px,40px)}");
show("z7-x",20,44);show("z7-p1",22,44);show("z7-cup",48,70);show("z7-ok",72);show("z7-p2",74);
SCENES.n3b={cap:"קודם נטילה · hands off until washing",draw(){const s=uid("s");
 return `<defs>${sky(s,"#FBEFD2","#FFF8E7")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 <circle cx="110" cy="76" r="44" fill="${SK}"/><circle cx="96" cy="66" r="4" fill="#1A1A1A"/><circle cx="124" cy="66" r="4" fill="#1A1A1A"/><path d="M110 70v12l-5 3" stroke="#C98A60" stroke-width="2" fill="none"/><path d="M98 96q12 8 24 0" stroke="#8A4A2A" stroke-width="2.5" fill="none"/><ellipse cx="66" cy="76" rx="6" ry="10" fill="#E8B48A"/><ellipse cx="154" cy="76" rx="6" ry="10" fill="#E8B48A"/><path d="M68 50q42-36 84 0q-42-14-84 0z" fill="#1F2433"/>
 <ellipse cx="230" cy="118" rx="36" ry="12" fill="#D8963F"/><path d="M196 118q34-30 68 0z" fill="#E7A94F"/>
 <g class="z7-hand">${hand(160,96,1.2,true)}</g>${cross(160,42,"z7-x",0)}
 <g class="z7-cup" opacity="0"><g transform="rotate(-25 250 40)">${cup(250,40,1)}</g><rect x="236" y="48" width="4" height="22" rx="2" fill="#5DA8EE"/></g>
 ${ckmark(160,42,"z7-ok",0)}
 ${pill(230,20,"לא יגע קודם נטילה","","z7-p1","#FBE4E1",undefined,0)}${pill(230,20,"אחר נטילה ✓","","z7-p2","#E4F2DB",undefined,0)}
 ${curtain("#FBEFD2")}`}};

/* n4a · the ideal, and under pressure */
show("z8-a",4);show("z8-ck1",20);show("z8-b",46);show("z8-ck2",66);show("z8-p",74);
SCENES.n4a={cap:"כח גברא · the ideal, and under pressure",draw(){const s=uid("s");
 return `<defs>${sky(s,"#DCE8FF","#F3F6FB")}</defs><rect width="320" height="150" fill="url(#${s})"/><path d="M160 0v150" stroke="#fff" stroke-width="3"/>
 <g class="z8-a" opacity="0">${pill(80,18,"לכתחילה","the ideal","","#E4F2DB")}${at(52,122,.95,man({robe:"#5C8FE8",beard:"#6B4A2A",arm:"up"}))}<g transform="rotate(-25 92 66)">${cup(92,66,1)}</g><rect x="98" y="74" width="4" height="26" rx="2" fill="#5DA8EE"/>${basin(104,108,40)}
  <text x="80" y="144" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="10" fill="#2457A6">כלי · מים · כח גברא</text></g>${ckmark(140,40,"z8-ck1",0)}
 <g class="z8-b" opacity="0">${pill(240,18,"בשעת הדחק","under pressure","","#FFF3CF")}<path d="M206 60h28v8h-6v8h-16v-8h-6z" fill="#9AA8BE"/><rect x="219" y="76" width="4" height="34" rx="2" fill="#5DA8EE"/>${hand(222,124,.9)}
  <path d="M262 76h18l2 50h-22z" fill="#A9D3F5" stroke="#6E7C94"/><rect x="266" y="68" width="10" height="8" fill="#6E7C94"/></g>${ckmark(296,40,"z8-ck2",0)}
 ${pill(240,140,"על נטילת ידים","","z8-p","#E4F2DB",undefined,0)}
 ${curtain("#DCE8FF")}`}};

/* n4b · river, snow, or wiping */
show("z9-r",4);show("z9-sn",24);show("z9-wp",44);show("z9-p",54,70);show("z9-later",72);
SCENES.n4b={cap:"נהר, שלג, או קינוח · other ways",draw(){const s=uid("s");
 const panel=(x,cls,inner,he,sub)=>`<g class="${cls}" opacity="0"><rect x="${x-48}" y="10" width="96" height="104" rx="10" fill="#FFFFFF" opacity=".75"/>${inner}${lbl(x,98,he)}${sub?`<text x="${x}" y="126" text-anchor="middle" font-family="Rubik,sans-serif" font-size="9" fill="#5B6884">${sub}</text>`:""}</g>`;
 return `<defs>${sky(s,"#7FB6EE","#E6F2FF")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 ${panel(266,"z9-r",`<path d="M222 64q22-10 44 0t44 0v20h-88z" fill="#3E86D0"/><path class="wave" d="M226 70q10-5 20 0t20 0 20 0" stroke="#BFE0FF" stroke-width="2" fill="none"/>${hand(266,64,.8)}`,"נהר","dip ×3")}
 ${panel(160,"z9-sn",`<path d="M118 84q42-24 84 0v6h-84z" fill="#FFFFFF" stroke="#C9D3E2"/>${[130,150,170,190].map((x,i)=>`<circle class="tw" style="animation-delay:${i*.3}s" cx="${x}" cy="${30+i%2*12}" r="3" fill="#FFFFFF" stroke="#C9D3E2"/>`).join("")}${hand(160,72,.8)}`,"שלג","even snow")}
 ${panel(54,"z9-wp",`<rect x="30" y="34" width="48" height="36" rx="4" fill="#E8636B"/><path d="M30 44h48M30 62h48" stroke="#fff" stroke-width="2"/>${hand(54,80,.8)}`,"אין מים כלל","wipe the hands")}
 ${pill(160,140,"על נקיות ידים","","z9-p","#FFF3CF",undefined,0)}${pill(160,140,"אחר כך: נוטל שוב בלי ברכה","","z9-later","#E4F2DB",undefined,0)}
 ${curtain("#7FB6EE")}`}};

/* n5a · the order of the morning berachos */
show("z10-w",4,30);show("z10-x",12,30);
[0,1,2,3].forEach(i=>show(`z10-c${i}`,34+i*12));
SCENES.n5a={cap:"ברכי נפשי · the beracha comes after",draw(){const s=uid("s");
 const card=(i,t)=>`<g class="z10-c${i}" opacity="0"><rect x="${240-i*0}" y="${14+i*32}" width="0" height="0"/><rect x="80" y="${14+i*32}" width="200" height="26" rx="8" fill="#FBF6E8" stroke="#D9CBA4"/><circle cx="262" cy="${27+i*32}" r="9" fill="#2457A6"/><text x="262" y="${31+i*32}" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="11" fill="#fff">${i+1}</text><text x="170" y="${32+i*32}" text-anchor="middle" direction="rtl" font-family="Frank Ruhl Libre,serif" font-weight="900" font-size="14" fill="#16213A">${t}</text></g>`;
 return `<defs>${sky(s,"#26407A","#5D4FA8")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(14,320,150,6)}
 <g class="z10-w"><g transform="rotate(-25 150 60)">${cup(150,60,1.4)}</g><rect x="140" y="70" width="5" height="30" rx="2.5" fill="#5DA8EE"/>${pill(160,124,"בשעת נטילה: בלי ברכה עדיין","","","#FBE4E1")}</g>${cross(196,50,"z10-x",0)}
 ${card(0,"על נטילת ידים")}${card(1,"אשר יצר")}${card(2,"ברכות התורה")}${card(3,"אלקי נשמה")}
 ${curtain("#26407A")}`}};

/* n6a · cases of doubt */
show("z11-a",4);show("z11-b",24);show("z11-c",44);show("z11-d",66);
SCENES.n6a={cap:"ספק · wash without a beracha",draw(){const s=uid("s");
 const tile=(x,cls,inner,he)=>`<g class="${cls}" opacity="0"><rect x="${x-46}" y="12" width="92" height="94" rx="10" fill="#FFFFFF" opacity=".12"/>${inner}${lbl(x,94,he,"#DCE8FF")}</g>`;
 return `<defs>${sky(s,"#14224A","#3A4D85")}</defs><rect width="320" height="150" fill="url(#${s})"/>${starField(20,320,60,27)}
 ${tile(264,"z11-a",`${moonIcon(250,36,9,"#1E2C58")}${sunIcon(282,56,7)}<circle cx="262" cy="64" r="10" fill="${SK}"/><circle cx="258" cy="62" r="1.6" fill="#1A1A1A"/><circle cx="266" cy="62" r="1.6" fill="#1A1A1A"/>`,"ער עד היום")}
 ${tile(160,"z11-b",`<rect x="128" y="54" width="64" height="16" rx="6" fill="#9C5B3B"/><rect x="124" y="44" width="12" height="26" rx="5" fill="#B66E4A"/><circle cx="160" cy="38" r="14" fill="#FFFFFF"/><path d="M160 38V28M160 38l7 4" stroke="#16213A" stroke-width="2"/>`,"שתין נשמין")}
 ${tile(56,"z11-c",`${moonIcon(56,34,9,"#1E2C58")}<circle cx="56" cy="62" r="10" fill="${SK}"/><circle cx="52" cy="60" r="1.6" fill="#1A1A1A"/><circle cx="60" cy="60" r="1.6" fill="#1A1A1A"/><text x="72" y="52" font-family="Rubik,sans-serif" font-weight="800" font-size="10" fill="#FFE27A">!</text>`,"ער כל הלילה")}
 ${pill(160,132,"ספק: 3× בסרוגים, בלי ברכה","","z11-d","#FFF3CF",undefined,0)}
 ${curtain("#14224A")}`}};

/* n6b · when the hands need washing */
const ICONS=[
 ["קם מהמטה",`<rect x="-18" y="-4" width="36" height="10" rx="3" fill="#A8743E"/><rect x="-18" y="-14" width="6" height="20" fill="#8A5A2B"/><rect x="-10" y="-10" width="12" height="6" rx="3" fill="#fff"/><rect x="0" y="-10" width="18" height="6" rx="2" fill="#7D5CC0"/>`],
 ["בית הכסא",`<rect x="-12" y="-18" width="24" height="34" rx="2" fill="#8A5A2B"/><circle cx="7" cy="0" r="2" fill="#F1BD3C"/>`],
 ["צפרניו",`<rect x="-16" y="-4" width="32" height="8" rx="4" fill="#9AA8BE"/><rect x="-16" y="-10" width="30" height="5" rx="2.5" fill="#C9D3E2" transform="rotate(-10 0 -7)"/>`],
 ["שערותיו",`<circle cx="-9" cy="8" r="6" fill="none" stroke="#5B6884" stroke-width="3"/><circle cx="9" cy="8" r="6" fill="none" stroke="#5B6884" stroke-width="3"/><path d="M-5 3L8 -16M5 3L-8 -16" stroke="#9AA8BE" stroke-width="4" stroke-linecap="round"/>`],
 ["מנעליו",`<path d="M-18 8v-8q0-6 8-6l6-8h8v14q12 0 14 8z" fill="#3A2412"/>`],
 ["בית הקברות",`<path d="M-12 14v-22q0-10 12-10t12 10v22z" fill="#9AA0AE"/><path d="M-5 -4h10" stroke="#6E7488" stroke-width="2"/>`],
 ["מרחץ",`<path d="M-20 -2h40v6q0 12-12 12h-16q-12 0-12-12z" fill="#FFFFFF" stroke="#9AA8BE"/><path d="M-14 -2v-12q0-4 4-4" stroke="#9AA8BE" stroke-width="2" fill="none"/>`],
 ["חופף ראשו",`<circle cy="2" r="12" fill="${SK}"/>${[-8,0,8].map(x=>`<circle cx="${x}" cy="-12" r="5" fill="#FFFFFF" stroke="#C9D3E2"/>`).join("")}`]
];
ICONS.forEach((_,i)=>show(`z12-i${i}`,4+i*8));show("z12-cup",72);
SCENES.n6b={cap:"צריכין נטילת ידים · times to wash",draw(){const s=uid("s");
 return `<defs>${sky(s,"#E6F2FF","#F3F6FB")}</defs><rect width="320" height="150" fill="url(#${s})"/>
 ${ICONS.map(([he,svg],i)=>{const x=280-(i%4)*76,y=i<4?38:96;return `<g class="z12-i${i}" opacity="0"><circle cx="${x}" cy="${y}" r="24" fill="#FFFFFF" stroke="#DAE2EE" stroke-width="2"/><g transform="translate(${x} ${y-2})">${svg}</g>${lbl(x,y+30,he,"#FFF3CF")}</g>`}).join("")}
 <g class="z12-cup" opacity="0"><rect width="320" height="150" fill="#1F3E78" opacity=".85"/><g transform="rotate(-25 160 60)">${cup(160,60,1.6)}</g><rect x="148" y="74" width="5" height="34" rx="2.5" fill="#5DA8EE"/>${pill(160,124,"נטילת ידים במים","","","#E4F2DB")}</g>
 ${curtain("#E6F2FF")}`}};
Object.assign(STEP_SCENES,{s2a:["n1a","n1b"],s2b:["n2a","n2b","n2c"],s2c:["n3a","n3b"],s2d:["n4a","n4b"],s2e:["n5a"],s2f:["n6a","n6b"]});

