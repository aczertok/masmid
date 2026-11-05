import json,re,sys,random
S=sys.argv[1];sys.path.insert(0,S);import cspec4 as C
random.seed(23)
NIK=re.compile(r"[֑-ְ֯-ׇֽֿׁׂׅׄ]")
def letters(t):
    s=[];m=[]
    for i,ch in enumerate(t):
        if NIK.match(ch):continue
        s.append(ch);m.append(i)
    return "".join(s),m
def names(t):
    s,m=letters(t);out=list(t)
    for mo in reversed(list(re.finditer(r'יהוה',s))):
        a=m[mo.start()];b=m[mo.end()-1]+1
        while b<len(t) and NIK.match(t[b]):b+=1
        out[a:b]=list("ה'")
    t2="".join(out);s,m=letters(t2);out=list(t2)
    for mo in re.finditer(r'(?<![א-ת])[ובלכמהש]{0,2}אלה(?=(ים|י|יך|ינו|יכם|יהם|יו)(?![א-ת]))',s):
        out[m[mo.end()-1]]='ק'
    return "".join(out)
tag=lambda x:re.sub(r'\s+',' ',re.sub(r'<[^>]+>','',x)).strip()
def en_names(t):return names(re.sub(r'\bElohim\b','Elokim',t))
SENS=re.compile(r'intima|intercourse|cohabit|lust|naked|relations|marital|steril|seduc|genital|womb|pregnan|conceiv|lain with|lay with|bestial|came upon|desire|copulat|seed of|mate\b|bear children|castrat|sodom(ized|y)|foreskin|circumcis|uncover|immoral|adulter|harlot|semen|lewd|orifice|concubin',re.I)
def excerpt(t,n=250):
    if len(t)<=n:return t
    c=max(t.rfind('. ',0,n),t.rfind('; ',0,n))
    return t[:c+1] if c>80 else t[:t.rfind(' ',0,n)]+"…"
def rashi(c,v):
    try:d=json.load(open(f'{S}/sef2/rashi/{c}.{v}.json'))
    except FileNotFoundError:return []
    he=d.get('he',[]);en=d.get('text',[])
    he=[he] if isinstance(he,str) else he;en=[en] if isinstance(en,str) else en
    out=[]
    for h,e in zip(he,en):
        mo=re.match(r'\s*<b>(.*?)</b>(.*)',e,re.S)
        lem,body=(tag(mo.group(1)).rstrip('. '),tag(mo.group(2))) if mo else ("",tag(e))
        out.append([en_names(lem),en_names(body),names(tag(h))])
    return out
plainw=lambda h:[w for w in re.sub(r'[׃,.:;]','',h).split() if w]
CH={};ALLW=[]
for c in sorted(C.LIMIT):
    d=json.load(open(f'{S}/sef2/gen{c}.json'));rows=[]
    for v in range(C.LIMIT[c]):
        e=d['text'][v]
        if (c,v+1) in C.REPLACE:e=C.REPLACE[(c,v+1)]
        for a,b_ in C.FIX.get((c,v+1),[]):
            assert a in e,(c,v+1,a);e=e.replace(a,b_)
        rows.append((names(d['he'][v]).replace('׃','').strip(),en_names(tag(e)).strip()))
    CH[c]=rows
    for h,_ in rows:ALLW+=[w for w in plainw(h) if len(letters(w)[0])>=3]
HEB={18:'יח',19:'יט',20:'כ',21:'כא',22:'כב',24:'כד',25:'כה'}
order=list(C.UNITS.keys());units=[];scenes=[];ncards=0
for uk in order:
    t,he,c,v0,parsha=C.UNITS[uk]
    secs=[{"he":h,"en":e,"c":rashi(c,v+1)} for v,(h,e) in enumerate(CH[c])]
    SECW=[[x] for x in secs]
    lessons=[]
    for (u2,title,cards,mq,beats) in [x for x in C.L if x[0]==uk]:
        lid=f"c{uk}-{len(lessons)+1}";phrases=[];steps=[];sids=[]
        for ci,(a,b_) in enumerate(cards):
            start=len(phrases)
            for v in range(a,b_+1):phrases.append([CH[c][v-1][0],CH[c][v-1][1]])
            note=None
            for v in range(a,b_+1):
                if (c,v) in C.NO_NOTES:continue
                for lem,body,_ in secs[v-1]["c"]:
                    if len(body)>75 and not SENS.search(lem+" "+body) and not re.search(r"punctuat|vowel|chataf|kometz|is written|as the Targum translates|similar to",body):
                        note=["Rashi",(f"“{lem}” — " if lem else "")+excerpt(body)];break
                if note:break
            steps.append({"t":"learn","from":start,"to":len(phrases),"note":note,"mref":a-1})
            sid=f"{lid}-{len(sids)}";sids.append(sid);ncards+=1
            scenes.append(("__story",(sid,{"cap":f"בראשית {HEB[c]} · {title}","beats":beats[ci]})))
        ok=[v for (a,b_) in cards for v in range(a,b_+1) if (c,v) not in C.NO_NOTES]
        auto=[];ws=[]
        if ok:
            a0=ok[0];w=plainw(CH[c][a0-1][0]);tiles=w[:4]
            pool=[x for v in ok for x in plainw(CH[c][v-1][0]) if x not in tiles]
            auto=[{"t":"order","q":"Build the start of the pasuk","en":CH[c][a0-1][1][:90]+("…" if len(CH[c][a0-1][1])>90 else ""),"tiles":tiles,"decoys":[random.choice(pool)] if pool else []}]
            vv=ok[len(ok)//2];ws=plainw(CH[c][vv-1][0])
        if len(ws)>=4:
            ans=ws[-1];ds=[x for x in random.sample(ALLW,120) if letters(x)[0]!=letters(ans)[0] and x not in ws];ds=list(dict.fromkeys(ds))[:2]
            auto.append({"t":"fill","q":f"Complete the pasuk ({c}:{vv})","before":" ".join(ws[:-1]),"after":"","opts":[ans]+ds,"a":0,"ex":" ".join(ws)})
        qs=auto[:1]+mq+auto[1:]
        per=-(-len(qs)//len(steps));out=[]
        for i,st in enumerate(steps):out.append(st);out+=qs[i*per:(i+1)*per]
        k=0
        for st in out:
            if st["t"]!="learn":k+=1;st["id"]=f"{lid}-{k}"
        parts=sorted(set(v-1 for (a,b_) in cards for v in range(a,b_+1)))
        rng=f"{c}:{cards[0][0]}–{cards[-1][1]}"
        lessons.append({"id":lid,"title":title,"short":f"{parsha} · {rng}","parts":parts,"phrases":phrases,"steps":out})
        scenes.append(("__steps",(lid,sids)))
    units.append((uk,t,he,c,v0,parsha,lessons,SECW))
js="/* Parashas Vayera (Bereishis 18–22) and the rest of Chayei Sarah (24:31–25:18) — Hebrew: Tanach with Nikkud (PD); English: Metsudah Chumash and Metsudah Rashi (CC-BY), a few verses worded modestly. ה' and אלקים are written for the Names. */\n"
js+='const CSOURCE4={"ref":"Genesis 18:1-22:24; 24:31-25:18","url":"https://www.sefaria.org/Genesis.18","he":{"title":"Tanach with Nikkud; Rashi: Metsudah Rashi Chumash","license":"Public Domain / CC-BY"},"en":{"title":"Metsudah Chumash and Metsudah Rashi, Metsudah Publications, 2009 (a few verses in ch. 18–25 worded modestly; 19:31–36 learned with a rebbe)","license":"CC-BY","licenseUrl":"https://creativecommons.org/licenses/by/3.0/"}};\n'
for uk,t,he,c,v0,parsha,lessons,secs in units:
    V=uk.upper()
    js+=f"const C4{V}_SECTIONS={json.dumps(secs,ensure_ascii=False)};\nconst C4{V}_LESSONS={json.dumps(lessons,ensure_ascii=False)};\n"
js+="const C4_UNITS=[\n"
for i,(uk,t,he,c,v0,parsha,lessons,secs) in enumerate(units):
    V=uk.upper();n=len(lessons);lastp=(i+1==len(units)) or units[i+1][5]!=parsha
    siy=(f'`<div class="hadran">חזק!<br>סיימת פרשת {"וירא" if parsha=="Vayera" else "חיי שרה"}</div><p class="sub">You\'ve learned all of Parashas {parsha}, with Rashi.</p>`' if lastp else f'`<div class="hadran">סיימת פרק {HEB[c]}</div><p class="sub">You\'ve finished Bereishis, Perek {c}, with Rashi.</p>`')
    js+=(f' {{key:"c-{uk}",lessons:C4{V}_LESSONS,source:CSOURCE4,sections:C4{V}_SECTIONS,unit:{{s:"{parsha} · Perek {c} · {n} lesson{"s" if n>1 else ""}",t:{json.dumps(t)},he:"{he}"}},masteryBy:"lesson",parsha:"{parsha}",\n'
         f'  ref:x=>`Bereishis {c}:${{x+1}}`,fullHe:x=>`בראשית {HEB[c]}:${{hebNum(x+1)}}`,partNames:[],revId:"c4{uk}-chazara",testId:"c4{uk}-siyum",revShort:"Review the perek",testTitle:"{"Siyum Parashas "+parsha if lastp else f"Perek {c} test"}",\n'
         f'  siyumHTML:{siy},doneSmall:"{"Parashah complete" if lastp else "Perek complete"}",doneTitle:"{"You finished Parashas "+parsha if lastp else f"You finished Perek {c}"}",unitWord:"perek"}},\n')
js+="];\n"
open(S+'/c4_data.js','w').write(js)
sj="/* cartoons for Vayera and the rest of Chayei Sarah */\n"
for k,v in scenes:
    if k=="__steps":sj+=f'STEP_SCENES["{v[0]}"]={json.dumps(v[1])};\n'
    else:sj+=f'SCENES["{v[0]}"]=story("{v[0]}",{json.dumps(v[1],ensure_ascii=False)});\n'
open(S+'/c4_scenes.js','w').write(sj)
print("units",len(units),"lessons",sum(len(u[6]) for u in units),"cards",ncards,"bytes",len(js))
