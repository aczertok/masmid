import json,re,sys
S=sys.argv[1]
N=int(sys.argv[2]);sys.path.insert(0,S);DM=__import__(sys.argv[3])
d=json.load(open(DM.FILE))
HE=[h.replace("אֱלֹה","אֱלֹק") for h in d["he"]]
NIK=re.compile(r'[֑-ְ֯-ׇֽֿׁׂׅׄ]')
SKIP=re.compile(r"[֑-ְ֯-ׇֽֿׁׂׅׄ,.;:]")
def stripmap(t):
    s=[];m=[]
    for i,ch in enumerate(t):
        if SKIP.match(ch): continue
        s.append(ch);m.append(i)
    return "".join(s),m
def find(t,marker,pos=0):
    s,m=stripmap(t);i=s.find(marker,pos if pos==0 else None) if False else None
    return s,m
CITE=re.compile(r'סימן|סעיף|סדר')
def drop_cites(t):
    def rep(mo):
        return "" if CITE.search(NIK.sub("",mo.group(0))) else mo.group(0)
    return re.sub(r'\s*\([^)]*\)',rep,t)
def clean_phrase(t):
    t=drop_cites(t).replace("(","").replace(")","").replace("[","").replace("]","")
    t=re.sub(r'\s+',' ',t).strip().rstrip(',.:; ').strip()
    return t
def cut(text,markers,endcite=True):
    s,m=stripmap(text);idx=[];pos=0
    for mk in markers:
        i=s.find(mk,pos); assert i>=0,(mk,s[pos:pos+80]); idx.append(i); pos=i+len(mk)
    end=len(s)
    if endcite:
        j=s.rfind("(")
        if j>pos-1 and CITE.search(s[j:]): end=j
    idx.append(end)
    o=lambda k:m[k] if k<len(m) else len(text)
    return [text[o(idx[k]):o(idx[k+1])] for k in range(len(markers))]

# ---------- English: fold footnotes into brackets, strip tags ----------
def fold(t):
    out="";i=0
    while True:
        a=t.find('<sup class="footnote-marker">',i)
        if a<0: out+=t[i:];break
        out+=t[i:a];b=t.find('<i class="footnote">',a);j=b+len('<i class="footnote">');depth=1;k=j
        while depth:
            o=t.find('<i',k);c=t.find('</i>',k)
            if o!=-1 and o<c: depth+=1;k=o+2
            else: depth-=1;k=c+4
        note=re.sub(r'<[^>]+>','',t[j:k-4]).strip().rstrip('.')
        out+=f" [{note}]";i=k
    out=re.sub(r'<[^>]+>','',out)
    return re.sub(r'\s+',' ',out).strip()
EN=[fold(x) for x in d["text"]]

# ---------- sections (ArtScroll view) ----------
SEC=DM.SEC
def ensplit(text,marks):
    idx=[];pos=0
    for mk in marks:
        i=text.find(mk,pos);assert i>=0,(mk,text[pos:pos+90]);idx.append(i);pos=i+len(mk)
    idx[0]=0;idx.append(len(text))
    return [text[idx[k]:idx[k+1]].strip() for k in range(len(marks))]
SECTIONS=[]
for n,(hm,em) in enumerate(SEC):
    hs=[x.strip() for x in cut(HE[n],hm,endcite=False)];es=ensplit(EN[n],em)
    secs=[]
    for h,e in zip(hs,es):
        comm=[];trans="";last=0
        for b in re.finditer(r'\[([^\]]*)\]',e):
            inner=b.group(1)
            if len(inner)<=40: continue
            trans+=e[last:b.start()]
            words=re.sub(r'\[[^\]]*\]','',trans).strip().rstrip(',.:;').split()
            comm.append([" ".join(words[-4:]),inner.strip()]);last=b.end()
        trans+=e[last:];trans=re.sub(r'\s+([,.;:?])',r'\1',re.sub(r'\s{2,}',' ',trans)).strip()
        secs.append({"he":h,"en":trans,"c":comm})
    SECTIONS.append(secs)

# ---------- lessons ----------
def L(id,title,short,parts,cards,qs):
    phrases=[];steps=[]
    for ci,(seif,pairs,note) in enumerate(cards):
        marks=[p[0] for p in pairs]
        nxt=cards[ci+1] if ci+1<len(cards) else None
        if nxt and nxt[0]==seif:
            txts=cut(HE[seif],marks+[nxt[1][0][0]])[:-1]   # stop where the next card begins
        else:
            txts=cut(HE[seif],marks)
        start=len(phrases)
        phrases+= [[clean_phrase(t),g] for t,(_,g) in zip(txts,pairs)]
        steps.append({"t":"learn","from":start,"to":len(phrases),"note":note})
    # interleave: learn card, then half the questions, etc.
    out=[];per=-(-len(qs)//len(steps))
    for i,st in enumerate(steps):
        out.append(st);out+=qs[i*per:(i+1)*per]
    for k,q in enumerate([x for x in out if x["t"]!="learn"]): q["id"]=f"{id}-{k+1}"
    return {"id":id,"title":title,"short":short,"parts":parts,"phrases":phrases,"steps":out}
mc=lambda q,opts,ex:{"t":"mc","q":q,"opts":opts,"a":0,"ex":ex}
tf=lambda q,a,ex:{"t":"tf","q":q,"a":a,"ex":ex}
fill=lambda q,b,a,opts,ex:{"t":"fill","q":q,"before":b,"after":a,"opts":opts,"a":0,"ex":ex}
match=lambda q,pairs,he=True:{"t":"match","q":q,"pairs":pairs,"he":he}
order=lambda q,en,tiles,dec:{"t":"order","q":q,"en":en,"tiles":tiles,"decoys":dec}

LESSONS=DM.LESSONS_DEF(L,mc,tf,fill,match,order)
SOURCE={"ref":f"Kitzur Shulchan Arukh {N}","url":f"https://www.sefaria.org/Kitzur_Shulchan_Arukh.{N}",
 "he":{"title":d["heVersionTitle"],"license":d["heLicense"]},"en":{"title":d["versionTitle"],"license":d["license"],"licenseUrl":"https://creativecommons.org/licenses/by/3.0/"}}
js=f"/* Kitzur Shulchan Aruch, Siman {N} — Hebrew: Torat Emet 357 (Public Domain); English: Metsudah, trans. R' Avrohom Davis (CC-BY). Via Sefaria.\n   Display note: אלהים is written אלקים. Phrases and sections are cut from the text by script. */\n"
P="K_" if N==1 else f"K{N}_"
js+=f"const {P}SOURCE="+json.dumps(SOURCE,ensure_ascii=False)+f";\nconst {P}SECTIONS="+json.dumps(SECTIONS,ensure_ascii=False)+f";\nconst {P}LESSONS="+json.dumps(LESSONS,ensure_ascii=False)+";\n"
open(S+f'/kitzur{N}.js','w').write(js)
for l in LESSONS: print(l["id"],max(len(x[0]) for x in l["phrases"]))

