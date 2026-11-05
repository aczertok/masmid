import json,re,sys,random
S=sys.argv[1];sys.path.insert(0,S);import nspec as cspec;B=cspec.BOOK
try:
    import jstory as STORY
except ImportError:STORY=None
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
    try:d=json.load(open(f'{S}/sef/{B["rashi"]}/{c}.{v}.json'))
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
def fixen(t):
    for a,b in B['fixes']:t=t.replace(a,b)
    return t
for c in B['chap']:
    d=json.load(open(f'{S}/sef/{B["file"]}{c}.json'));n=len(d['he'])
    CH[c]=[(names(d['he'][v]).replace('׃','').strip(),fixen(en_names(d['text'][v])).strip()) for v in range(n)]
    for h,_ in CH[c]:ALLW+=[w for w in plainw(h) if len(letters(w)[0])>=3]
for c in B['chap']:
    secs=[{"he":h,"en":e,"c":rashi(c,v+1)} for v,(h,e) in enumerate(CH[c])]
    SECW=[[x] for x in secs]
    lessons=[]
    for (ch,title,cards,mq) in [x for x in cspec.L if x[0]==c]:
        lid=f"{B['prefix']}{c}-{len(lessons)+1}";phrases=[];steps=[];sids=[]
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
            cap=f"{B['he']} {['','א','ב','ג','ד','ה','ו'][c]} · {title}"
            if STORY:scenes.append(("__story",(sid,{"cap":cap,"beats":STORY.ST[sc_i-1]})))
            else:scenes.append((sid,{"bg":bg,"props":props,"cast":cast,"seq":seq,"cap":cap}))
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
        lessons.append({"id":lid,"title":title,"short":f"{B['en']} {rng}","parts":parts,"phrases":phrases,"steps":out})
        scenes.append(("__steps",(lid,sids)))
    units.append((c,lessons,SECW))
assert sc_i==len(cspec.SC),(sc_i,len(cspec.SC))
HEB=['','א','ב','ג','ד','ה','ו']
V=B['VAR']
js=f"/* {B['en']} {B['chap'][0]}–{B['chap'][-1]} with Rashi — Hebrew: Tanach with Nikkud (PD); English: {B['source']['en']['title']}. Names written ה' / אלקים. */\n"
js+=f"const {V}SOURCE="+json.dumps(B['source'],ensure_ascii=False)+";\n"
for c,lessons,secs in units:
    js+=f"const {V}{c}_SECTIONS={json.dumps(secs,ensure_ascii=False)};\nconst {V}{c}_LESSONS={json.dumps(lessons,ensure_ascii=False)};\n"
js+=f"const {V}_UNITS=[\n"
for c,lessons,secs in units:
    t,he=B['units'][c];last=c==B['chap'][-1];n=len(lessons)
    siy=B['siyum'] if last else f'`<div class="hadran">סיימת פרק {HEB[c]}</div><p class="sub">You\'ve finished {B["en"]}, Perek {c}, with Rashi.</p>`'
    js+=(f' {{key:"{B["prefix"]}-{c}",lessons:{V}{c}_LESSONS,source:{V}SOURCE,sections:{V}{c}_SECTIONS,unit:{{s:"Perek {c} · {n} lesson{"s" if n>1 else ""}",t:{json.dumps(t)},he:"{he}"}},masteryBy:"lesson",\n'
         f'  ref:x=>`{B["en"]} {c}:${{x+1}}`,fullHe:x=>`{B["he"]} {HEB[c]}:${{hebNum(x+1)}}`,partNames:[],revId:"{B["prefix"]}{c}-chazara",testId:"{B["prefix"]}{c}-siyum",revShort:"Review the perek",testTitle:"Perek {c} test",\n'
         f'  siyumHTML:{siy},doneSmall:"Perek complete",doneTitle:"You finished {B["en"]} {c}",unitWord:"perek"}},\n')
js+="];\n"
open(S+f'/{B["prefix"]}_data.js','w').write(js)
sj=f"/* cartoons for {B['en']} */\n"
for k,v in scenes:
    if k=="__story":sj+=f'SCENES["{v[0]}"]=story("{v[0]}",{json.dumps(v[1],ensure_ascii=False)});\n'
    elif k=="__steps":sj+=f'STEP_SCENES["{v[0]}"]={json.dumps(v[1])};\n'
    else:sj+=f'SCENES["{k}"]=tpl("{k}",{json.dumps(v,ensure_ascii=False)});\n'
open(S+f'/{B["prefix"]}_scenes.js','w').write(sj)
print("units",len(units),"lessons",sum(len(l) for _,l,_ in units),"cards",sc_i,"bytes",len(js))
print(CH[2][0][1])
