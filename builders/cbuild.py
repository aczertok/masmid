import json,re,sys,random
S=sys.argv[1];sys.path.insert(0,S);import cspec
random.seed(11)
NIK=re.compile(r"[֑-ְ֯-ׇֽֿׁׂׅׄ]")
def letters(t):
    s=[];m=[]
    for i,ch in enumerate(t):
        if NIK.match(ch):continue
        s.append(ch);m.append(i)
    return "".join(s),m
def names(t):
    s,m=letters(t);out=list(t)
    # Tetragrammaton -> ה'
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
SENS=re.compile(r'intima|intercourse|cohabit|lust|naked|relations|marital|steril|seduc|genital|womb|pregnan|conceiv|lain with|lay with|bestial|came upon|desire|copulat|seed of|mate\b|bear children',re.I)
def excerpt(t,n=250):
    if len(t)<=n:return t
    c=max(t.rfind('. ',0,n),t.rfind('; ',0,n))
    return t[:c+1] if c>80 else t[:t.rfind(' ',0,n)]+"…"
def rashi(c,v):
    try:d=json.load(open(f'{S}/sef/rashi/{c}.{v}.json'))
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
units=[];scenes=[];sc_i=0;ALLW=[]
CH={}
for c in range(1,7):
    d=json.load(open(f'{S}/sef/gen{c}.json'));n=8 if c==6 else len(d['he'])
    CH[c]=[(names(d['he'][v]).replace('׃','').strip(),en_names(d['text'][v]).strip()) for v in range(n)]
    for h,_ in CH[c]:ALLW+=[w for w in plainw(h) if len(letters(w)[0])>=3]
for c in range(1,7):
    secs=[{"he":h,"en":e,"c":rashi(c,v+1)} for v,(h,e) in enumerate(CH[c])]
    SECW=[[x] for x in secs]
    lessons=[]
    for (ch,title,cards,mq) in [x for x in cspec.L if x[0]==c]:
        lid=f"g{c}-{len(lessons)+1}";phrases=[];steps=[];sids=[]
        for (a,b) in cards:
            start=len(phrases)
            for v in range(a,b+1):phrases.append([CH[c][v-1][0],CH[c][v-1][1]])
            note=None
            for v in range(a,b+1):
                for lem,body,_ in secs[v-1]["c"]:
                    if len(body)>40 and not SENS.search(lem+" "+body):
                        note=["Rashi",(f"“{lem}” — " if lem else "")+excerpt(body)];break
                if note:break
            steps.append({"t":"learn","from":start,"to":len(phrases),"note":note,"mref":a-1})
            sid=f"{lid}-{len(sids)}";sids.append(sid)
            bg,props,cast,seq=cspec.SC[sc_i];sc_i+=1
            scenes.append((sid,{"bg":bg,"props":props,"cast":cast,"seq":seq,"cap":f"בראשית {['','א','ב','ג','ד','ה','ו'][c]} · {title}"}))
        a0=cards[0][0];w=plainw(CH[c][a0-1][0])
        tiles=w[:4] if len(w)>=4 else w
        pool=[x for (a,b) in cards for v in range(a,b+1) for x in plainw(CH[c][v-1][0]) if x not in tiles]
        auto=[{"t":"order","q":"Build the start of the pasuk","en":CH[c][a0-1][1][:90]+("…" if len(CH[c][a0-1][1])>90 else ""),"tiles":tiles,"decoys":[random.choice(pool)] if pool else []}]
        allv=[v for (a,b) in cards for v in range(a,b+1)]
        vv=allv[len(allv)//2];ws=plainw(CH[c][vv-1][0])
        if len(ws)>=4:
            ans=ws[-1];ds=[x for x in random.sample(ALLW,80) if letters(x)[0]!=letters(ans)[0] and x not in ws][:2]
            auto.append({"t":"fill","q":f"Complete the pasuk ({c}:{vv})","before":" ".join(ws[:-1]),"after":"","opts":[ans]+ds,"a":0,"ex":" ".join(ws)})
        qs=auto[:1]+mq+auto[1:]
        learn=steps;per=-(-len(qs)//len(learn));out=[]
        for i,st in enumerate(learn):out.append(st);out+=qs[i*per:(i+1)*per]
        k=0
        for st in out:
            if st["t"]!="learn":k+=1;st["id"]=f"{lid}-{k}"
        parts=sorted(set(v-1 for (a,b) in cards for v in range(a,b+1)))
        rng=f"{c}:{cards[0][0]}–{cards[-1][1]}"
        lessons.append({"id":lid,"title":title,"short":f"Bereishis {rng}","parts":parts,"phrases":phrases,"steps":out})
        scenes.append(("__steps",(lid,sids)))
    units.append((c,lessons,SECW))
assert sc_i==len(cspec.SC),(sc_i,len(cspec.SC))
HEB=['','א','ב','ג','ד','ה','ו']
js="/* Parashas Bereishis 1:1–6:8 — Hebrew: Tanach with Nikkud (PD); English: Metsudah Chumash and Metsudah Rashi (CC-BY), via Sefaria. ה' and אלקים are written for the Names. */\n"
js+='const CSOURCE={"ref":"Genesis 1-6","url":"https://www.sefaria.org/Genesis.1","he":{"title":"Tanach with Nikkud; Rashi: Metsudah Rashi Chumash","license":"Public Domain / CC-BY"},"en":{"title":"Metsudah Chumash and Metsudah Rashi, Metsudah Publications, 2009","license":"CC-BY","licenseUrl":"https://creativecommons.org/licenses/by/3.0/"}};\n'
js+="const hebNum=n=>{const o=[[400,'ת'],[300,'ש'],[200,'ר'],[100,'ק'],[90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],[40,'מ'],[30,'ל'],[20,'כ'],[10,'י'],[9,'ט'],[8,'ח'],[7,'ז'],[6,'ו'],[5,'ה'],[4,'ד'],[3,'ג'],[2,'ב'],[1,'א']];let s='';if(n%100===15){return (n>15?hebNum(n-15):'')+'טו'}if(n%100===16){return (n>16?hebNum(n-16):'')+'טז'}for(const [v,l] of o)while(n>=v){s+=l;n-=v}return s};\n"
for c,lessons,secs in units:
    js+=f"const CG{c}_SECTIONS={json.dumps(secs,ensure_ascii=False)};\nconst CG{c}_LESSONS={json.dumps(lessons,ensure_ascii=False)};\n"
js+="const C_UNITS=[\n"
for c,lessons,secs in units:
    t,he=cspec.UNITS[c];last=c==6;n=len(lessons)
    siy='`<div class="hadran">חזק!<br>סיימת פרשת בראשית</div><p class="sub">You\'ve learned all of Parashas Bereishis, with Rashi.</p>`' if last else f'`<div class="hadran">סיימת פרק {HEB[c]}</div><p class="sub">You\'ve finished Bereishis, Perek {c}, with Rashi.</p>`'
    js+=(f' {{key:"c-g{c}",lessons:CG{c}_LESSONS,source:CSOURCE,sections:CG{c}_SECTIONS,unit:{{s:"Perek {c} · {n} lesson{"s" if n>1 else ""}",t:{json.dumps(t)},he:"{he}"}},masteryBy:"lesson",\n'
         f'  ref:x=>`Bereishis {c}:${{x+1}}`,fullHe:x=>`בראשית {HEB[c]}:${{hebNum(x+1)}}`,partNames:[],revId:"c{c}-chazara",testId:"c{c}-siyum",revShort:"Review the perek",testTitle:"{"Siyum Parashah" if last else f"Perek {c} test"}",\n'
         f'  siyumHTML:{siy},doneSmall:"{"Parashah complete" if last else "Perek complete"}",doneTitle:"{"You finished Parashas Bereishis" if last else f"You finished Perek {c}"}",unitWord:"perek"}},\n')
js+="];\n"
open(S+'/chumash_data.js','w').write(js)
sj="/* cartoons for Parashas Bereishis */\n"
for k,v in scenes:
    if k=="__steps":sj+=f'STEP_SCENES["{v[0]}"]={json.dumps(v[1])};\n'
    else:sj+=f'SCENES["{k}"]=tpl("{k}",{json.dumps(v,ensure_ascii=False)});\n'
open(S+'/chumash_scenes.js','w').write(sj)
print("units",len(units),"lessons",sum(len(l) for _,l,_ in units),"cards",sc_i,"bytes",len(js))
print(CH[2][3][0]);print(CH[1][0]);print(units[0][2][0]["c"][0][:2])
