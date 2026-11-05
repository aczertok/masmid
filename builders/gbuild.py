import json,re,sys,random
S=sys.argv[1];sys.path.insert(0,S);import gspec as G, gstory as GS
random.seed(13)
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
tag=lambda x:re.sub(r'[ \t]+',' ',re.sub(r'<[^>]+>','',x.replace('<br>',' '))).strip()
def en_names(t):return re.sub(r'\bElohim\b','Elokim',t)
plainw=lambda h:[w for w in re.sub(r'[׃,.:;?!״"“”—\-()\[\]]',' ',h).split() if w and len(letters(w)[0])>=2]
HEB=['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג']
def heamud(a):n=int(a[:-1]);return f"ברכות {HEB[n]}{'.' if a[-1]=='a' else ':'}"
SEG={}
for a in G.DAF:
    d=json.load(open(f'{S}/sef/ber{a}.json'));n=G.LAST.get(a,len(d['he']))
    rows=[]
    for i in range(n):
        e=d['text'][i]
        for x,y in G.FIX.get((a,i),[]):
            assert x in e,(a,i,x[:40]);e=e.replace(x,y)
        rows.append((names(tag(d['he'][i])),en_names(tag(e))))
    SEG[a]=rows
ALLW=[w for a in G.DAF for h,_ in SEG[a] for w in plainw(h) if len(letters(w)[0])>=3]
units=[];scenes=[];ncards=0
for ui,(a0,a1,ut,uhe) in enumerate(G.UNITS):
    dafs=G.DAF[G.DAF.index(a0):G.DAF.index(a1)+1]
    secs=[[{"he":h,"en":e,"c":[]} for h,e in SEG[a]] for a in dafs]
    lessons=[]
    for di,a in enumerate(dafs):
        cards=G.C[a];rows=SEG[a]
        groups=[cards] if len(cards)<4 else [cards[:(len(cards)+1)//2],cards[(len(cards)+1)//2:]]
        for gi,grp in enumerate(groups):
            lid=f"gb{a}{'' if len(groups)==1 else 'ab'[gi]}";phrases=[];steps=[];sids=[];mq=[]
            for (st,title,sc,q) in grp:
                k=cards.index((st,title,sc,q));en=cards[k+1][0] if k+1<len(cards) else len(rows)
                f=len(phrases)
                for i in range(st,en):phrases.append([rows[i][0],rows[i][1]])
                steps.append({"t":"learn","from":f,"to":len(phrases),"note":None,"mref":di})
                sid=f"{lid}-{len(sids)}";sids.append(sid);ncards+=1
                bg,props,cast,seq=sc
                cast=[(c,)+(("#2F6B57","#7D5CC0","#7A5A3A")[j%3],("#9A9A9A","#3A2A1A","#6B4A2A")[j%3],"hat") if isinstance(c,str) else c for j,c in enumerate(cast)]
                cast=[tuple(x) if not isinstance(x,tuple) or len(x)>1 else x for x in cast]
                if (a,k) in GS.ST:scenes.append(('__story',(sid,{"cap":f"{heamud(a)} · {title}","beats":GS.ST[(a,k)]})));mq.append(q);continue
                scenes.append((sid,{"bg":bg,"props":[list(p) for p in props],"cast":[list(c) for c in cast],"seq":[list(s) for s in seq],"cap":f"{heamud(a)} · {title}"}))
                mq.append(q)
            title=grp[0][1]
            first=grp[0][0];w=plainw(rows[first][0]);tiles=w[:4]
            pool=[x for x in plainw(" ".join(p[0] for p in phrases)) if x not in tiles]
            auto=[{"t":"order","q":"Build the start of the line","en":rows[first][1][:110]+("…" if len(rows[first][1])>110 else ""),"tiles":tiles,"decoys":[random.choice(pool)] if pool else []}] if len(tiles)>=3 else []
            # fill: a short line from the middle of the lesson
            cand=[i for i in range(grp[0][0],(cards[cards.index(grp[-1])+1][0] if cards.index(grp[-1])+1<len(cards) else len(rows))) if 4<=len(plainw(rows[i][0]))<=14]
            if cand:
                i=cand[len(cand)//2];ws=plainw(rows[i][0]);ans=ws[-1]
                ds=[x for x in random.sample(ALLW,120) if letters(x)[0]!=letters(ans)[0] and x not in ws]
                ds=list(dict.fromkeys(ds))[:2]
                auto.append({"t":"fill","q":f"Complete the line ({a})","before":" ".join(ws[:-1]),"after":"","opts":[ans]+ds,"a":0,"ex":" ".join(ws)})
            qs=auto[:1]+mq+auto[1:]
            per=-(-len(qs)//len(steps));out=[]
            for i,stp in enumerate(steps):out.append(stp);out+=qs[i*per:(i+1)*per]
            k=0
            for stp in out:
                if stp["t"]!="learn":k+=1;stp["id"]=f"{lid}-{k}"
            lessons.append({"id":lid,"title":title,"short":f"Berachos {a}","parts":[di],"phrases":phrases,"steps":out})
            scenes.append(("__steps",(lid,sids)))
    units.append((ui+1,dafs,ut,uhe,lessons,secs))
V="GB"
js="/* Gemara Berachos, Perek Meimasai (2a–13a) — Aramaic and English: William Davidson Edition (Koren Noé Talmud, Steinsaltz), CC-BY-NC, via Sefaria; a few English lines adapted for modesty. ה' and אלקים are written for the Names. */\n"
js+='const GBSOURCE={"ref":"Berakhot 2a-13a","url":"https://www.sefaria.org/Berakhot.2a","he":{"title":"William Davidson Edition — Vocalized Aramaic (Koren Steinsaltz)","license":"CC-BY-NC"},"en":{"title":"William Davidson Edition — English (Koren Noé Talmud, Rabbi Adin Even-Israel Steinsaltz); a few lines adapted for modesty","license":"CC-BY-NC","licenseUrl":"https://creativecommons.org/licenses/by-nc/4.0/"}};\n'
for u,dafs,ut,uhe,lessons,secs in units:
    js+=f"const {V}{u}_SECTIONS={json.dumps(secs,ensure_ascii=False)};\nconst {V}{u}_LESSONS={json.dumps(lessons,ensure_ascii=False)};\n"
js+=f"const {V}_UNITS=[\n"
for u,dafs,ut,uhe,lessons,secs in units:
    last=u==len(units);n=len(lessons);rng=f"{dafs[0]}–{dafs[-1]}"
    siy='`<div class="hadran">הדרן עלך<br>פרק מאימתי</div><p class="sub">You\'ve learned the whole first perek of Gemara Berachos.</p>`' if last else f'`<div class="hadran">חזק!</div><p class="sub">You\'ve finished Berachos {rng}.</p>`'
    js+=(f' {{key:"gb-{u}",lessons:{V}{u}_LESSONS,source:GBSOURCE,sections:{V}{u}_SECTIONS,unit:{{s:"Daf {rng} · {n} lessons",t:{json.dumps(ut)},he:"{uhe}"}},masteryBy:"lesson",\n'
         f'  ref:x=>"Berachos "+{json.dumps(dafs)}[x],fullHe:x=>{json.dumps([heamud(a) for a in dafs],ensure_ascii=False)}[x],partNames:[],revId:"gb{u}-chazara",testId:"gb{u}-siyum",revShort:"Review these dafim",testTitle:"{"Siyum Perek" if last else f"Berachos {rng} test"}",\n'
         f'  siyumHTML:{siy},doneSmall:"{"Perek complete" if last else "Section complete"}",doneTitle:"{"Hadran alach Meimasai" if last else f"You finished Berachos {rng}"}",unitWord:"section"}},\n')
js+="];\n"
open(S+'/gb_data.js','w').write(js)
sj="/* cartoons for Gemara Berachos perek 1 */\n"
for k,v in scenes:
    if k=="__story":sj+=f'SCENES["{v[0]}"]=story("{v[0]}",{json.dumps(v[1],ensure_ascii=False)});\n'
    elif k=="__steps":sj+=f'STEP_SCENES["{v[0]}"]={json.dumps(v[1])};\n'
    else:sj+=f'SCENES["{k}"]=tpl("{k}",{json.dumps(v,ensure_ascii=False)});\n'
open(S+'/gb_scenes.js','w').write(sj)
print("units",len(units),"lessons",sum(len(x[4]) for x in units),"cards",ncards,"bytes",len(js))
