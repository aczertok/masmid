"""Kitzur Shulchan Aruch, simanim 3-221, in the 'read and review' format.
Hebrew: Torat Emet 357 (Public Domain). English: Metsudah, trans. R' Avrohom Davis (CC-BY). Via Sefaria.
Each se'if is cut into sentence pairs (Hebrew sentence(s) with the matching English), ArtScroll style.
Questions are made from the text itself; sensitive se'ifim and the adults-only simanim get none.
Output: kz_meta.js (small, goes in the app) and kitzur-data.js (the texts and questions, loaded on demand)."""
import json,re,random,sys,os
D=os.path.dirname(os.path.abspath(__file__))+'/ksa/'
OUT=sys.argv[1] if len(sys.argv)>1 else os.path.dirname(os.path.abspath(__file__))
idx=json.load(open(D+'index.json'))['alt_structs']['Topic']['nodes']
TITLES={}
for i,x in enumerate(idx,1):
    t={y['lang']:y['text'].strip() for y in x['titles']}
    en=re.sub(r'^Chapter \d+\s*','',t['en']).strip().rstrip('.')
    en=re.sub(r'\s+',' ',en);he=re.sub(r'^\[[^\]]*\]\s*','',t['he']).strip()
    TITLES[i]=(he,en)
ADULT={145,148,150,151,152,153,154,155,156,157,158,159,160,161,162}
NIK=re.compile(r'[֑-ׇ]')
def plain(h):return NIK.sub('',h)
SENS=re.compile(r'marital|cohabit|intima|relations with|conjugal|semen|seminal|menstru|nidd|discharg|nocturnal|erotic|lust|naked|nude|private parts|genital|sexual|seclu|immoral|harlot|prostitut|adulter|incest|forbidden relations|lewd|arous|erection|testicle|circumcis.*organ|organ of|membrum|breast|nurs(e|ing) (her|a)|pregnan|childbirth|miscarr|birth canal|womb|virgin|bridal chamber|bedroom|impure woman|zav|keri|emission|urinat|excret|feces|faeces|bowel|lavatory|bathroom|privy|toilet|buttock|undress|unclothed|exposed',re.I)
HSENS=re.compile(r'תשמיש|נדה|זרע|ערו|ערוה|זנות|ביאה|יחוד|נשק|חיבוק')
def godname(h):
    h=re.sub(r'(א[֑-ׇ]*לּ?ֹ)ה',r'\1ק',h)
    h=re.sub(r'אלה(ים|י|ינו|יך|יכם)',r'אלק\1',h)
    return h
CITE=re.compile(r'סימן|סעיף|סי\'|ס"ק|הלכות|רמב"ם|ש"ך|ט"ז|מ"א|מג"א|שו"ע|חיי"א|חי"א|דה"ח|פמ"ג|לבוש|ב"י|רמ"א|א"ר|ט"ז|נה"ש|מ"ב|ט"ז|גמרא|טור|ע"ש|ע"ז|שם\)')
def drop_cites(h):
    def rep(mo):
        p=plain(mo.group(0))
        return '' if CITE.search(p) or re.search(r'[א-ת]"[א-ת]',p) and len(p)<60 else mo.group(0)
    h=re.sub(r'\s*\([^()]*\)',rep,h)
    return re.sub(r'\s+',' ',h).replace(' ,',',').replace(' .','.').strip()
def fold(t):
    """English: footnotes out (kept separately as notes), tags stripped."""
    notes=[];out='';i=0
    while True:
        a=t.find('<sup class="footnote-marker">',i)
        if a<0: out+=t[i:];break
        out+=t[i:a];b=t.find('<i class="footnote">',a)
        if b<0: out+=t[a:];break
        j=b+len('<i class="footnote">');depth=1;k=j
        while depth:
            o=t.find('<i',k);c=t.find('</i>',k)
            if c<0: k=len(t)+4;break
            if o!=-1 and o<c: depth+=1;k=o+2
            else: depth-=1;k=c+4
        note=re.sub(r'<[^>]+>','',t[j:k-4]).strip()
        if note: notes.append(re.sub(r'\s+',' ',note))
        i=k
    out=re.sub(r'<[^>]+>','',out).replace('&nbsp;',' ').replace('&amp;','&')
    out=re.sub(r'\s+',' ',out).strip().replace(' ,',',').replace(' .','.')
    out=out.replace('Elohim','Elokim')
    return out,notes
# ---- sentence splitting and alignment (length-based, Gale-Church style) ----
def he_sents(h):
    parts=re.split(r'(?<=[.:?])\s+',h)
    return [p for p in (x.strip() for x in parts) if p]
def en_sents(e):
    parts=re.split(r'(?<=[.?!;:])["”’)\]]?\s+(?=[A-Z"“(\[]|\d)',e)
    return [p for p in (x.strip() for x in parts) if p]
def align(H,E,r):
    hl=[max(1,len(plain(x))) for x in H];el=[max(1,len(x)) for x in E]
    n,m=len(H),len(E);INF=1e18
    C=[[INF]*(m+1) for _ in range(n+1)];B=[[None]*(m+1) for _ in range(n+1)];C[0][0]=0
    moves=[(1,1,0),(1,2,.8),(2,1,.8),(2,2,1.6),(1,3,2),(3,1,2),(3,2,2.6),(2,3,2.6)]
    for i in range(n+1):
        for j in range(m+1):
            if C[i][j]>=INF:continue
            for a,b,pen in moves:
                if i+a>n or j+b>m:continue
                lh=sum(hl[i:i+a]);le=sum(el[j:j+b])
                d=(le-lh*r)/((lh*r+le)/2)
                c=C[i][j]+d*d*4+pen
                if c<C[i+a][j+b]:C[i+a][j+b]=c;B[i+a][j+b]=(a,b)
    if C[n][m]>=INF:return [(H,E)]
    out=[];i,j=n,m
    while i or j:
        a,b=B[i][j];out.append((H[i-a:i],E[j-b:j]));i-=a;j-=b
    return out[::-1],C[n][m]/max(1,len(out))
def chunks(h,e,r):
    H=he_sents(h);E=en_sents(e)
    if not e:return [[h,'']]
    if len(H)<=1 or len(E)<=1:return [[h,e]]
    res=align(H,E,r)
    if isinstance(res,list):return [[h,e]]
    pairs,cost=res
    if cost>1.2:return [[h,e]]   # alignment unsure: keep the se'if whole
    P=[[' '.join(a),' '.join(b)] for a,b in pairs]
    # merge very short pieces into their neighbor so the page reads in natural steps
    out=[]
    for p in P:
        if out and (len(plain(p[0]))<45 or len(plain(out[-1][0]))<45):
            out[-1]=[out[-1][0]+' '+p[0],out[-1][1]+' '+p[1]]
        else: out.append(p)
    return out
# ---- questions from the text ----
STOP=set('את של על לא כי אם או אל עד מן גם זה זו הוא היא הם הן כל לו לה בו בה אשר ואת ולא כן אין יש מה מי אני אתה כמו שלא אבל אלא וכן וגם ואם אף כדי עוד רק כבר אחר אחרי לפני בין בלא שאין שיש אותו אותה אותם ביום שהוא שהיא דבר אפילו מכל מקום משום לכן ולכן יותר צריך צריכין מותר אסור יכול'.split())
def hw(h):return [w for w in re.split(r'\s+',plain(drop_cites(h)).replace('־',' ')) if w]
def cleanw(w):return re.sub(r'[,.:;?!"()\[\]׳״\']','',w)
def trunc(s,n):
    s=s.strip()
    if len(s)<=n:return s
    c=s[:n].rsplit(' ',1)[0].rstrip(',;:')
    return c+'…'
def make_questions(N,lesson_seifim,SE,rng,pool_en,pool_w):
    qs=[]
    pairs=[(si,k,p) for si in lesson_seifim for k,p in enumerate(SE[si]['ch']) if not SE[si]['sens']]
    rng.shuffle(pairs)
    # 1. which translation matches this Hebrew?
    for si,k,(h,e) in pairs:
        if len([q for q in qs if q['t']=='mc'])>=max(1,len(lesson_seifim)) :break
        if not e or len(e)<40:continue
        heq=' '.join(hw(h)[:9])
        others=[x for x in pool_en if x[0]!=e and abs(len(x[0])-len(e))<len(e)*.8+60]
        if len(others)<3:others=[x for x in pool_en if x[0]!=e]
        if len(others)<3:continue
        ds=rng.sample(others,3);L=min(120,max(70,len(e)))
        if len(set([trunc(e,L)]+[trunc(x[0],L) for x in ds]))<4:continue
        qs.append({'t':'mc','h':heq,'r':[[N,si,k]]+[x[1] for x in ds],'L':L})
    # 2. fill in the missing word
    for si,k,(h,e) in pairs:
        if len([q for q in qs if q['t']=='fill'])>=max(1,len(lesson_seifim)):break
        W=hw(h)
        cand=[i for i,w in enumerate(W) if 4<=len(cleanw(w))<=9 and cleanw(w) not in STOP and i>=3 and not re.search(r'[׳"\']',w)]
        if not cand:continue
        i=rng.choice(cand);ans=cleanw(W[i])
        ctx=set(cleanw(x) for x in W)
        alts=[w for w in pool_w if w not in ctx and abs(len(w)-len(ans))<=2 and w!=ans]
        if len(alts)<2:continue
        d=rng.sample(alts,2)
        qs.append({'t':'fill','b':' '.join(W[max(0,i-6):i]),'f':' '.join(W[i+1:i+4]),'o':[ans]+d,'x':[N,si,k] if e else None})
    # 3. match Hebrew openings to their English (needs 3+ pieces)
    mp=[(si,k,h) for si,k,(h,e) in pairs if e and len(hw(h))>=4][:4]
    if len(mp)>=3:
        qs.append({'t':'match','p':[[' '.join(hw(h)[:4])+'…',[N,si,k]] for si,k,h in mp]})
    # 4. put the opening words in order
    for si in lesson_seifim:
        if SE[si]['sens']:continue
        W=[cleanw(w) for w in hw(SE[si]['ch'][0][0])[:5]]
        if len(W)==5 and len(set(W))==5 and all(W):
            dec=[w for w in pool_w if w not in W]
            if dec:
                qs.append({'t':'order','s':si,'w':W,'d':rng.choice(dec),'x':[N,si,0] if SE[si]['ch'][0][1] else None})
                break
    return qs[:8]
meta=[];data={};ALL={}
rng=random.Random(5)
for N in range(3,222):
    d=json.load(open(D+f's{N}.json'))
    HE=[godname(h) for h in d['he']];ENraw=d['text'] if len(d['text'])==len(HE) else ['']*len(HE)
    EN=[fold(x) for x in ENraw]
    tot_h=sum(len(plain(drop_cites(h))) for h in HE);tot_e=sum(len(e) for e,_ in EN)
    r=(tot_e/tot_h) if tot_h and tot_e else 1.6
    SE=[]
    for h,(e,notes) in zip(HE,EN):
        hc=drop_cites(h);ch=chunks(hc,e,r) if e else [[hc,'']]
        sens=bool(SENS.search(e) or HSENS.search(plain(h))) or N in ADULT
        SE.append({'ch':ch,'notes':notes,'sens':sens})
    ALL[N]=(SE,bool(ENraw and ENraw[0]))
for N in range(3,222):
    SE,hasen=ALL[N]
    groups=[];cur=[];size=0
    for i,s in enumerate(SE):
        L=sum(len(plain(a)) for a,_ in s['ch'])
        if cur and (size+L>800 or len(cur)>=4):groups.append(cur);cur=[];size=0
        cur.append(i);size+=L
    if cur:groups.append(cur)
    if len(groups)>1 and sum(len(plain(a)) for i in groups[-1] for a,_ in SE[i]['ch'])<220:
        last=groups.pop();groups[-1]+=last
    pool_en=[(e,[N,si,k]) for si,s in enumerate(SE) if not s['sens'] for k,(_,e) in enumerate(s['ch']) if e]
    if len(pool_en)<6:
        for M in (N-1,N+1,N-2,N+2):
            if 3<=M<=221 and M not in ADULT:
                pool_en+=[(e,[M,si,k]) for si,s in enumerate(ALL[M][0]) if not s['sens'] for k,(_,e) in enumerate(s['ch']) if e][:20]
    pool_w=sorted(set(cleanw(w) for s in SE for a,_ in s['ch'] for w in hw(a) if 4<=len(cleanw(w))<=9 and cleanw(w) not in STOP and not re.search(r'[׳"\']',w)))
    Q=[[] if N in ADULT else make_questions(N,g,SE,rng,pool_en,pool_w) for g in groups]
    he,en=TITLES[N]
    meta.append([N,he,en,1 if N in ADULT else 0,[[g[0],g[-1]] for g in groups],[len(q) for q in Q],len(SE),0 if hasen else 1])
    data[N]={'s':[[s['ch'],s['notes'],1 if s['sens'] else 0] for s in SE],'q':Q}
js='/* Kitzur Shulchan Aruch, simanim 3-221 — Hebrew: Torat Emet 357 (Public Domain); English: Metsudah, trans. R\' Avrohom Davis, 1996 (CC-BY). Via Sefaria. Cut into sentence pairs and questions by script for this app. */\n'
js+='window.KZ_DATA='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';if(window.kzLoaded)window.kzLoaded();\n'
open(OUT+'/kitzur-data.js','w').write(js)
open(OUT+'/kz_meta.js','w').write('const KZ_META='+json.dumps(meta,ensure_ascii=False,separators=(',',':'))+';\n')
L=sum(len(m[4]) for m in meta);Qn=sum(sum(m[5]) for m in meta)
print('simanim',len(meta),'lessons',L,'questions',Qn,'data MB',round(len(js.encode())/1e6,2),'meta KB',round(len(json.dumps(meta,ensure_ascii=False).encode())/1e3,1))
