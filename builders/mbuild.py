import json,re,sys,random
S=sys.argv[1];sys.path.insert(0,S)
import mspec
random.seed(7)
SKIP=re.compile(r"[֑-ְ֯-ׇֽֿׁׂׅׄ,.;:]")
def stripmap(t):
    s=[];m=[]
    for i,ch in enumerate(t):
        if SKIP.match(ch):continue
        s.append(ch);m.append(i)
    return "".join(s),m
def cut(text,marks):
    s,m=stripmap(text);idx=[];pos=0
    for mk in marks:
        i=s.find(mk,pos);assert i>=0,(mk,s[pos:pos+70]);idx.append(i);pos=i+len(mk)
    idx[0]=0;idx.append(len(s))
    o=lambda k:m[k] if k<len(m) else len(text)
    return [text[o(idx[k]):o(idx[k+1])].strip() for k in range(len(marks))]
def ensplit(text,marks):
    # match markers ignoring [bracketed] glosses, then map back to positions in the raw text
    keep=[];m=[];depth=0
    for i,ch in enumerate(text):
        if ch=='[':depth=1;continue
        if ch==']':depth=0;continue
        if depth:continue
        keep.append(ch);m.append(i)
    st="".join(keep);norm=re.sub(r'\s+',' ',st)
    # collapse whitespace while keeping a map
    s2=[];m2=[];prev=False
    for ch,i in zip(st,m):
        sp=ch.isspace()
        if sp and prev:continue
        s2.append(' ' if sp else ch);m2.append(i);prev=sp
    s2="".join(s2)
    idx=[];pos=0
    for mk in marks:
        i=s2.find(mk,pos)
        if i<0:i=s2.lower().find(mk.lower(),pos)
        assert i>=0,(mk,s2[pos:pos+90]);idx.append(m2[i]);pos=i+len(mk)
    idx[0]=0;idx.append(len(text))
    return [text[idx[k]:idx[k+1]].strip() for k in range(len(marks))]
NAME=re.compile(r'(?<![א-ת])([ולבה]?)אלה(ים|ינו|יך|י)(?![א-ת])')
def names(t):return NAME.sub(r'\1אלק\2',t)
def tidy(t):return re.sub(r'\s+([,.;:?])',r'\1',re.sub(r'\s{2,}',' ',t)).replace(',,',',').replace('..','.').strip()
def section(h,e):
    comm=[];trans="";last=0
    for b in re.finditer(r'\[([^\]]*)\]',e):
        inner=b.group(1)
        if len(inner)<=40:continue
        trans+=e[last:b.start()]
        words=re.sub(r'\[[^\]]*\]','',trans).strip().rstrip(',.:;—- ').split()
        comm.append([" ".join(words[-4:]).strip("—-,:;\" “”"),inner.strip()]);last=b.end()
    trans+=e[last:]
    return {"he":h,"en":tidy(trans),"c":comm}
def excerpt(t,n=240):
    t=t.strip()
    if len(t)<=n:return t
    cutp=max(t.rfind('. ',0,n),t.rfind('; ',0,n))
    return t[:cutp+1] if cutp>80 else t[:t.rfind(' ',0,n)]+"…"
plain=lambda h:re.sub(r'[^א-ת\' ]','',SKIP.sub('',h)).split()
OUT=[];ALLWORDS=[]
data={}
for p in range(2,10):
    d=json.load(open(f'{S}/sef/mb{p}.json'))
    data[p]=d
    for h in d['he']:ALLWORDS+= [w for w in plain(names(h)) if len(w)>=3]
units=[]
for p in range(2,10):
    d=data[p];secs=[]
    for i,(h,e) in enumerate(zip(d['he'],d['text'])):
        sp=mspec.M[(p,i+1)]
        hs=cut(names(h),sp['he']);es=ensplit(e,sp['en']);assert len(hs)==len(es)
        secs.append([section(a,b) for a,b in zip(hs,es)])
    lessons=[]
    for li,(title,mlist) in enumerate(mspec.LESSONS[p]):
        lid=f"b{p}-{li+1}";phrases=[];cards=[];scenes=[]
        for (pp,mi) in mlist:
            sp=mspec.M[(pp,mi)];ss=secs[mi-1]
            spl=sp.get('split');spl=[spl] if isinstance(spl,int) else (spl or [])
            bounds=[0]+spl+[len(ss)]
            for k in range(len(bounds)-1):
                part=ss[bounds[k]:bounds[k+1]];start=len(phrases)
                for x in part:
                    g=re.sub(r'\s*\[[^\]]*\]','',x["en"]).strip()
                    phrases.append([re.sub(r'\s*\([^)]*\)','',x["he"]).rstrip(':. '),g or x["en"]])
                note=None
                for x in part:
                    if x["c"]:
                        lem,txt=x["c"][0];note=["Bartenura",(f"“{lem}” — " if lem else "")+excerpt(txt)];break
                cards.append({"t":"learn","from":start,"to":len(phrases),"note":note,"mref":mi-1})
                scenes.append(sp['scenes'][k] if k<len(sp['scenes']) else sp['scenes'][-1])
        # auto questions
        auto=[]
        first=secs[mlist[0][1]-1][0];w=plain(first["he"])
        if len(w)>=3:
            take=w[:min(len(w),6)];tiles=[]
            i=0
            while i<len(take):
                n=2 if len(take)-i>3 and len(take)>=5 else 1
                tiles.append(" ".join(take[i:i+n]));i+=n
            pool=[x for (pp,mi) in mlist for s_ in secs[mi-1][1:] for x in plain(s_["he"]) if x not in take and len(x)>=3]
            dec=[random.choice(pool)] if pool else []
            en=re.sub(r'\s*\[[^\]]*\]','',first["en"]);en=en if len(en)<=90 else en[:en.rfind(' ',0,90)]+"…"
            auto.append({"t":"order","q":"Build the opening words","en":en,"tiles":tiles[:4],"decoys":dec})
        cand=[s_ for (pp,mi) in mlist for s_ in secs[mi-1] if len(plain(s_["he"]))>=4]
        if cand:
            s_=cand[len(cand)//2];ws=plain(s_["he"]);ans=ws[-1]
            ds=[x for x in random.sample(ALLWORDS,60) if x!=ans and x not in ws][:2]
            auto.append({"t":"fill","q":"Complete the mishnah","before":" ".join(ws[:-1]),"after":"","opts":[ans]+ds,"a":0,"ex":" ".join(ws)})
        qs=auto[:1]+mspec.Q.get((p,li),[])+auto[1:]
        per=-(-len(qs)//len(cards));steps=[]
        for i,c in enumerate(cards):steps.append(c);steps+=qs[i*per:(i+1)*per]
        k=0
        for st in steps:
            if st["t"]!="learn":k+=1;st["id"]=f"{lid}-{k}"
        parts=sorted(set(mi-1 for (pp,mi) in mlist))
        short=f"Perek {p} · Mishnah {mlist[0][1]}"+(f"–{mlist[-1][1]}" if len(mlist)>1 else "")
        lessons.append({"id":lid,"title":title,"short":short,"parts":parts,"phrases":phrases,"steps":steps})
        for k2,sc in enumerate(scenes):
            bg,props,cast,seq=sc
            OUT.append(("scene",f"{lid}-{k2}",{"bg":bg,"props":props,"cast":cast,"seq":seq,"cap":f"ברכות {['','א','ב','ג','ד','ה','ו','ז','ח','ט'][p]} · {title}"}))
        OUT.append(("steps",lid,[f"{lid}-{k2}" for k2 in range(len(scenes))]))
    units.append((p,lessons,secs))
# ---- emit JS
HEB=['','א','ב','ג','ד','ה','ו','ז','ח','ט']
js="/* Mishnah Berachos perakim 2–9 — Vilna text (PD), R' Shraga Silverstein with Bartenura (CC-BY), via Sefaria. Built by script; אלהים is written אלקים. */\n"
for p,lessons,secs in units:
    js+=f"const MB{p}_SECTIONS={json.dumps(secs,ensure_ascii=False)};\nconst MB{p}_LESSONS={json.dumps(lessons,ensure_ascii=False)};\n"
js+="const MB_UNITS=[\n"
for p,lessons,secs in units:
    pk=mspec.PEREK[p];n=len(lessons)
    last=p==9
    siy=(f'`<div class="hadran">הדרן עלך מסכת ברכות</div><p class="sub">You\'ve finished all nine perakim of Maseches Berachos. Mazel tov!</p>`' if last else
         f'`<div class="hadran">הדרן עלך<br>פרק {pk["he"]}</div><p class="sub">You\'ve completed Perek {p} of Berachos.</p>`')
    js+=(f' {{key:"m-p{p}",lessons:MB{p}_LESSONS,source:SOURCE,sections:MB{p}_SECTIONS,unit:{{s:"Perek {p} · {n} lessons",t:{json.dumps(pk["t"])},he:"{pk["he"]}"}},\n'
         f'  ref:x=>`Berachos {p}:${{x+1}}`,fullHe:x=>`משנה ברכות {HEB[p]}:${{HEB[x]}}`,partNames:{json.dumps(["משנה "+HEB[i+1] for i in range(len(secs))],ensure_ascii=False)},revId:"m{p}-chazara",testId:"m{p}-siyum",revShort:"Review the perek",testTitle:"{"Siyum Masechta" if last else f"Siyum Perek {p}"}",\n'
         f'  siyumHTML:{siy},doneSmall:"{"Masechta complete" if last else "Perek complete"}",doneTitle:"{"You finished Maseches Berachos" if last else f"You finished Perek {p}"}",unitWord:"perek"}},\n')
js+="];\n"
open(S+'/mishnah_data.js','w').write(js)
sj="/* cartoons for Mishnah Berachos 2–9 (built from the scene kit) */\n"
for kind,k,v in OUT:
    if kind=="scene":sj+=f'SCENES["{k}"]=tpl("{k}",{json.dumps(v,ensure_ascii=False)});\n'
    else:sj+=f'STEP_SCENES["{k}"]={json.dumps(v)};\n'
open(S+'/mishnah_scenes.js','w').write(sj)
print("lessons",sum(len(l) for _,l,_ in units),"cards",sum(1 for k,_,_ in OUT if k=="scene"),"bytes",len(js),len(sj))
for p,lessons,secs in units[:1]:
    print(json.dumps(lessons[0]["steps"][0],ensure_ascii=False)[:300]);print(lessons[0]["phrases"][:2])
