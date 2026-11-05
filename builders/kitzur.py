import json,re,sys
S=sys.argv[1]
d=json.load(open('/root/.claude/uploads/2f85c243-fd0c-5295-92c9-c1a2f4837ee0/755fee71-attachment.txt'))
HE=[h.replace("הָאֱלֹהִים","הָאֱלֹקִים") for h in d["he"]]
assert "הָאֱלֹקִים" in HE[0]
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
    t=drop_cites(t).replace("(","").replace(")","")
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
SEC=[
 (["שויתי","כי אין ישיבת","וכן אין דבורו","כל שכן כאשר","כמו שנאמר","בודאי מיד"],
  ['"I have set Hashem',"For we cannot compare","Similarly, his conversation","How much more so",'as it is said: "If a person',"[Bearing this in mind]"]),
 (["וגם בשכבו","ומיד כשיעור","כמו שאמר הכתוב","פרוש","ובעודו על משכבו","(ואף על פי","ויפסיק"],
  ["Also, while lying in bed","and as soon as you awaken","as it is said in Scripture","This verse teaches","While still in bed you should recite","(Even though your hands","You should pause slightly"]),
 (["יהודה בן תימא","עז כנמר פרושו","קל כנשר","רץ כצבי כנגד","וגבור כארי כנגד","ואמר שתחזק"],
  ["Yehudah son of Taima",'"Bold as a leopard" means','"Light as an eagle"','"Swift as a deer"','"Strong as a lion" is',"He also states"]),
 (["לכן צריך","ויתחכם עליו","כי היצר הרע הוא יודע","ולכן כל בעל נפש","וישים אל לבו","וכן אם צריך","על אחת כמה וכמה","והמרגיל"],
  ["Therefore, it is imperative","and be outsmarted","The evil impulse knows","Therefore every sensitive person","You should realize that","Similarly, if you would need","How much more so should","Once you accustom"]),
 (["אם אפשר לו","וכמו שהקדוש","ואם אי אפשר","וגם לאחר חצות","ושעור משניות","ואם אינו בר הכי","וטוב מעט","תנא רבי חיא","עוד אמרו","ובלילות הקצרים"],
  ["If you are able to awaken","For the Holy One","If you cannot rise at midnight","You may recite Tikun","A lesson in Mishnah","If you are not capable","A little learning","Rabbi Chiyah taught","It was also said","During the short nights"]),
 (["מזמורי","אפלו מי","וסומא"],["Chapters of the Psalms","Even someone who knows","However, a blind person"]),
 (["יש למחות","אלא יש לומר"],["We must object","Rather, the proper"]),
]
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

LESSONS=[
L("k1","Shivisi: before the King","Siman 1 · Se'if 1",[0],[
 (0,[("שויתי ה' לנגדי תמיד","“I have set Hashem before me always”"),("הוא כלל גדול בתורה","is a great principle in the Torah"),("ובמעלות הצדיקים","and among the qualities of the tzaddikim"),("אשר הולכים לפני","who walk before G-d."),("כי אין ישיבת האדם","For the way a person sits,"),("תנועתו ועסקיו","moves and goes about his affairs"),("והוא לבדו בביתו","when he is alone in his house"),("כמו ישיבתו","is not like how he sits, moves and acts"),("כאשר הוא לפני מלך גדול","when he is before a great king.")],
  ["Key idea","The Kitzur opens with the pasuk from Tehillim. The Shulchan Aruch (Orach Chaim 1) begins the same way: before any specific halacha, know Whose presence you are in."]),
 (0,[("וכן אין דבורו","Likewise, his speech"),("והרחבת פיו","and his free talk"),("בהיותו עם אנשי ביתו וקרוביו","with his household and relatives"),("כמו בהיותו במושב המלך","is not like in the king's court,"),("כי אז משגיח בודאי","for then he surely watches"),("על כל תנועותיו ודבוריו","all his movements and words"),("שיהיו מתקנים כראוי","that they be proper and fitting."),("כל שכן כאשר ישים האדם אל לבו","How much more so when a person takes to heart"),("כי המלך הגדול הקדוש ברוך הוא","that the great King, HaKadosh Baruch Hu,"),("אשר מלא כל הארץ כבודו","Whose glory fills the whole earth,"),("עומד עליו ורואה במעשיו","stands over him and sees his deeds"),("כמו שנאמר אם יסתר איש במסתרים ואני לא אראנו נאם ה'","as it says: “If a man hides in secret places, will I not see him? says Hashem.”"),("הלוא את השמים ואת הארץ אני מלא","“Do I not fill the heavens and the earth?”"),("בודאי מיד תגיע אליו היראה","Then awe will surely come to him at once,"),("וההכנעה מפחד השם יתברך","and humility before Hashem,"),("ויבוש ממנו","and he will be ashamed before Him.")],
  ["The kal vachomer","If a person is careful in front of a human king, how much more so before the King of kings, Who sees everything, even in hidden places."])],
 [mc("What does the Kitzur call “שויתי ה' לנגדי תמיד”?",["A great principle in the Torah","A minhag of some communities","Advice for tzaddikim only","Something for Shabbos"],"הוא כלל גדול בתורה."),
  mc("What comparison does the Kitzur use?",["How a person acts alone at home vs. before a great king","A talmid before his rebbe","A soldier before battle","A merchant in the market"],"כי אין ישיבת האדם... והוא לבדו בביתו, כמו... לפני מלך גדול."),
  order("Build the opening words","I have set Hashem before me always",["שויתי","ה'","לנגדי","תמיד"],["לפני"]),
  match("Match the words",[["לבדו בביתו","alone in his house"],["לפני מלך גדול","before a great king"],["במושב המלך","in the king's court"],["אנשי ביתו","his household"]]),
  tf("A person is more careful with his speech in the king's court than with his own family.",True,"כי אז משגיח בודאי על כל תנועותיו ודבוריו."),
  fill("Complete the phrase","כל שכן כאשר ישים האדם אל","",["לבו","ביתו","מלכו"],"ישים אל לבו — takes to heart."),
  mc("What does “Do I not fill the heavens and the earth?” teach here?",["Hashem sees a person even in hidden places","Heaven and earth last forever","One should daven outdoors","The King is only in the heavens"],"אם יסתר איש במסתרים ואני לא אראנו."),
  mc("What should this awareness bring a person to?",["Awe, humility, and shame before sinning","Fear of other people","Sadness","Pride"],"היראה וההכנעה... ויבוש ממנו.")]),
L("k2","Modeh Ani","Siman 1 · Se'if 2",[1],[
 (1,[("וגם בשכבו על משכבו","Even while lying in bed"),("ידע לפני מי הוא שוכב","he should know before Whom he lies."),("ומיד כשיעור משנתו","As soon as he wakes from sleep"),("יזכר חסדי ה'","he should remember Hashem's kindnesses"),("אשר עשה עמו","that He did with him:"),("שהחזיר לו את נשמתו","He returned his soul to him,"),("אשר הפקידה אצלו עיפה","which he entrusted to Him weary,"),("והחזירה לו חדשה ורגועה","and returned it new and refreshed"),("כדי לעבד עבודתו","so he can serve Him"),("בכל יכלתו ולשרתו כל היום","with all his strength, the whole day,"),("כי זה כל האדם","for this is the whole of man.")],
  ["Key idea","Sleep is like handing over a deposit. Each morning Hashem gives the neshamah back refreshed, so that we can use the day to serve Him."]),
 (1,[("כמו שאמר הכתוב חדשים לבקרים רבה אמונתך","As the pasuk says: “They are new every morning; great is Your faithfulness.”"),("פרוש בכל בקר נעשה האדם בריה חדשה","Meaning: every morning a person becomes a new creation."),("ויודה בכל בקר","He should thank Hashem every morning for this."),("ובעודו על משכבו יאמר","While still in bed he says:"),("מודה אני לפניך מלך חי וקים","“I thank You, living and eternal King,"),("שהחזרת בי נשמתי בחמלה","for You have returned my soul to me with compassion;"),("רבה אמונתך","great is Your faithfulness.”"),("ואף על פי שעדין אין ידיו נקיות","Even though his hands are not yet washed,"),("יכול לומר זאת כיון שאין בו שם","he may say this, since it has no Name of Hashem."),("ויפסיק מעט בין תבת בחמלה לתבת רבה","He pauses slightly between בחמלה and רבה.")],
  ["In practice","Modeh Ani is said right away, still in bed, before negel vasser. It has no Name of Hashem, which is why it may be said before washing."])],
 [mc("When does a person say Modeh Ani?",["As soon as he wakes, still in bed","After washing negel vasser","After getting dressed","In shul"],"ובעודו על משכבו יאמר."),
  match("Match the words",[["עיפה","weary"],["חדשה ורגועה","new and refreshed"],["בחמלה","with compassion"],["משכבו","his bed"]]),
  mc("What does “חדשים לבקרים” teach, according to the Kitzur?",["Every morning a person becomes a new creation","Mornings are the best time to learn","Wear new clothes in the morning","New korbanos were brought each morning"],"בכל בקר נעשה האדם בריה חדשה."),
  order("Build the start of Modeh Ani","I thank You, living and eternal King",["מודה אני","לפניך","מלך","חי וקים"],["רבה"]),
  fill("Complete Modeh Ani","שהחזרת בי נשמתי","רבה אמונתך",["בחמלה","בשמחה","באהבה"],"בחמלה — with compassion."),
  mc("Why may Modeh Ani be said before washing the hands?",["It has no Name of Hashem","It is very short","Hands are clean at night","It is said quietly"],"כיון שאין בו שם."),
  tf("The Kitzur says to pause slightly between “בחמלה” and “רבה”.",True,"ויפסיק מעט בין תבת בחמלה לתבת רבה.")]),
L("k3","Bold as a leopard","Siman 1 · Se'if 3",[2],[
 (2,[("יהודה בן תימא אומר","Yehudah ben Teima says:"),("הוי עז כנמר","Be bold as a leopard,"),("וקל כנשר","light as an eagle,"),("רץ כצבי","swift as a deer,"),("וגבור כארי","and mighty as a lion"),("לעשות רצון אביך שבשמים","to do the will of your Father in Heaven.")],
  ["Source","This is a mishnah in Pirkei Avos (5:20). The Tur and Shulchan Aruch open with it too, as the attitude for starting the day."]),
 (2,[("עז כנמר פרושו","“Bold as a leopard” means"),("שלא יתביש מפני בני אדם","he should not be embarrassed by people"),("המלעיגים עליו בעבודת ה'","who mock him for serving Hashem."),("קל כנשר כנגד ראות העין","“Light as an eagle” is about what the eye sees:"),("לומר שתהא קל לעצם עיניך מראות ברע","be quick to shut your eyes from seeing evil,"),("כי הוא התחלת העברה","for that is where sin begins:"),("העין רואה והלב חומד","the eye sees, the heart desires,"),("וכלי מעשה גומרים","and the body's limbs complete it."),("רץ כצבי כנגד הרגלים","“Swift as a deer” is about the legs:"),("שרגליך לטוב ירוצו","your feet should run to do good."),("וגבור כארי כנגד הלב","“Mighty as a lion” is about the heart,"),("כי הגבורה בעבודת הבורא","for strength in serving the Creator"),("היא בלב","is in the heart."),("ואמר שתחזק לבך בעבודתו","Strengthen your heart in His service"),("ותתגבר על היצר לנצחו","and overpower the yetzer to defeat it,"),("כגבור המתגבר על שונאו","like a warrior who overpowers his enemy"),("לנצחו ולהפילו לארץ","to defeat him and throw him to the ground.")],
  ["Four animals, four parts of a person","Leopard: not being embarrassed. Eagle: the eyes. Deer: the legs. Lion: the heart."])],
 [mc("Who said “Be bold as a leopard…”?",["Yehudah ben Teima","Rabbi Akiva","Hillel","Ben Zoma"],"יהודה בן תימא אומר."),
  match("Match the animals",[["עז כנמר","bold as a leopard"],["קל כנשר","light as an eagle"],["רץ כצבי","swift as a deer"],["גבור כארי","mighty as a lion"]]),
  fill("Complete the mishnah","הוי עז כנמר וקל כנשר רץ כצבי וגבור","",["כארי","כנשר","כדב"],"וגבור כארי — mighty as a lion."),
  match("What does each animal stand for?",[["Leopard","Not embarrassed by mockers"],["Eagle","The eyes"],["Deer","The legs"],["Lion","The heart"]],False),
  tf("According to the Kitzur, “light as an eagle” is about running to do mitzvos.",False,"That's the deer. The eagle is about quickly shutting your eyes from seeing evil."),
  order("Build the three steps of sin","The eye sees, the heart desires, and the limbs complete it",["העין רואה","והלב חומד","וכלי מעשה","גומרים"],["רץ"]),
  mc("Where does real strength in serving Hashem come from, per the Kitzur?",["The heart","The arms","Wealth","A good night's sleep"],"כי הגבורה בעבודת הבורא היא בלב.")]),
L("k4","Rise like a lion","Siman 1 · Se'if 4",[3],[
 (3,[("לכן צריך האדם להתגבר כארי","So a person must be strong as a lion"),("ומיד כשיעור משנתו","and as soon as he wakes"),("ואמר מודה אני וכו'","(and says Modeh Ani)"),("יקום בזריזות לעבודת הבורא","he should get up quickly to serve the Creator"),("קדם שיתגבר עליו היצר הרע","before the yetzer hara overpowers him"),("בטענות ותואנות לבל יקום","with claims and excuses not to get up."),("ויתחכם עליו להשיאו בחרף","In winter it cleverly tempts him:"),("איך תקום עתה בבקר השכם והקר גדול","“How can you get up so early, when it's so cold?”"),("ובקיץ ישיאנו","In summer it tempts him:"),("איך תקום ממטתך ועדין לא שבעת משנתך","“How can you get out of bed when you haven't had enough sleep?”"),("או בטענות אחרות וכדומה","or other such claims.")],
  ["Key idea","The first test of the day comes right after Modeh Ani. The yetzer hara has a ready excuse for every season."]),
 (3,[("כי היצר הרע הוא יודע היטב","For the yetzer hara knows very well"),("לצוד בני אדם במהמורות בל יקום","how to trap people in pits so they won't get up."),("ולכן כל בעל נפש","So every sensitive person"),("הירא וחרד לדבר ה'","who fears and trembles at Hashem's word"),("צריך להתגבר עליו ולא ישמע לו","must overpower it and not listen to it,"),("ואף אם יכבד עליו הדבר","even if it is hard for him"),("מפני כבדות הגוף ועצלותו","because of a heavy body and laziness,"),("ישים מגמתו רצון מלך מלכי המלכים הקדוש ברוך הוא","he should set his aim on the will of the King of kings, HaKadosh Baruch Hu."),("וישים אל לבו","He should consider:"),("כי אם היה קורא אותו איזה אדם","if someone called him"),("לאיזה עסק שירויח בו ממון","for a deal that would make money,"),("או לגבות חובו","or to collect a debt,"),("או שהיה קורא אותו שיציל את ממונו מן ההפסד","or to save his money from loss,"),("כגון אם נפלה דלקה בעיר וכדומה","such as a fire breaking out in the city,"),("בודאי היה זריז לקום מיד","he would surely jump up at once"),("מפני אהבת ממונו ולא היה מתרשל","out of love for his money, without delay.")],
  ["The test","Notice how quickly we get up for money or an emergency. The same body can get up just as fast for avodas Hashem."]),
 (3,[("וכן אם צריך ללכת לעבודת המלך","Likewise, to go serve the king"),("היה קם בזריזות ולא היה מתרשל","he would get up quickly and not delay,"),("פן יעלילו עליו","so as not to be blamed,"),("או כדי למצא חן בעיני המלך","or to find favor with the king."),("על אחת כמה וכמה","How much more so"),("לעבודת מלך מלכי המלכים הקדוש ברוך הוא","for the service of the King of kings, HaKadosh Baruch Hu,"),("שיש לו להזהר לקום במהירות ובזריזות","that he should take care to get up fast and eagerly."),("והמרגיל את עצמו בדרך הזה","One who trains himself this way"),("ארבע או חמש פעמים","four or five times"),("לא יכבד עליו אחר כך","will not find it hard afterwards."),("והבא לטהר מסיעין לו","One who comes to purify himself is helped from Above.")],
  ["Encouragement","It only takes four or five mornings to build the habit, and Hashem helps anyone who makes the effort."])],
 [mc("What excuse does the yetzer hara use in winter?",["It's too cold to get up so early","You didn't sleep enough","You'll be late anyway","Shul isn't open yet"],"והקר גדול."),
  mc("And in summer?",["You haven't had enough sleep yet","It's too hot","The days are long","Mincha is enough"],"ועדיין לא שבעת משנתך."),
  match("Match the words",[["בזריזות","quickly, eagerly"],["תואנות","excuses"],["דלקה","a fire"],["עצלותו","his laziness"]]),
  tf("The Kitzur says a person would jump out of bed to save his money from a fire.",True,"כגון אם נפלה דלקה בעיר... בודאי היה זריז לקום מיד."),
  order("Build the halacha","He should get up quickly to serve the Creator",["יקום","בזריזות","לעבודת","הבורא"],["בעצלות"]),
  mc("What is the Kitzur's argument from serving a human king?",["If one hurries for a human king, how much more for the King of kings","Kings wake up late, so we may too","One needs the king's permission","Kings reward those who rise early"],"על אחת כמה וכמה לעבודת מלך מלכי המלכים."),
  mc("How many times does it take to get used to rising quickly?",["Four or five times","Once","Forty days","A full year"],"ארבע או חמש פעמים, לא יכבד עליו אחר כך."),
  fill("Complete Chazal's saying","והבא לטהר","לו",["מסיעין","פותחין","מוחלין"],"מסייעין לו — he is helped (Yoma 38b).")]),
L("k5","Chatzos and dawn","Siman 1 · Se'if 5",[4],[
 (4,[("אם אפשר לו להשכים ולקום בחצות הלילה","If he is able to get up at midnight"),("לערך אז תקון חצות מה טוב","to say Tikkun Chatzos then, how good!"),("כמו שנאמר קומי רני בלילה לראש אשמורות וגו'","As it says: “Arise, cry out in the night, at the start of the watches.”"),("וכמו שהקדוש ברוך הוא מקונן בעת ההיא","For HaKadosh Baruch Hu, too, laments at that time,"),("שנאמר ה' ממרום ישאג","as it says: “Hashem roars from on high; from His holy dwelling He gives forth His voice; He roars over His abode.”"),("ואומר אוי לבנים","and He says: “Woe to the children"),("שבעונותיהם החרבתי את ביתי","for whose sins I destroyed My House,"),("ושרפתי את היכלי","burned My Sanctuary,"),("והגליתים לבין האמות","and exiled them among the nations.”")],
  ["What is Tikkun Chatzos?","Tikkun Chatzos is a set of tefillos mourning the churban of the Beis HaMikdash, said around midnight."]),
 (4,[("ואם אי אפשר לו לקום בחצות","If he can't get up at midnight,"),("יתגבר על כל פנים לקום קדם עלות השחר","he should at least push himself to get up before dawn,"),("וכמו שאמר דוד המלך עליו השלום אעירה שחר","as Dovid HaMelech said: “I will awaken the dawn”:"),("אני מעורר את השחר ואין השחר מעורר אותי","I wake the dawn; the dawn does not wake me."),("וגם לאחר חצות הלילה יכול לערך תקון חצות","Tikkun Chatzos may also be said after midnight,"),("ואחר כך יעסק בתורה איש איש כפי יכלתו","and afterwards each person learns Torah as he is able."),("ושעור משניות קודם לכל דבר","A shiur in Mishnayos comes before anything else,"),("ועל ידי זה זוכה לנשמה","and through it one merits the neshamah:"),("משנה אותיות נשמה","משנה has the letters of נשמה."),("ואם אינו בר הכי","If he isn't capable of that,"),("יעסק בתהלים ומעמדות וספרי מוסר","he should say Tehillim and Ma'amados and learn mussar sefarim."),("וטוב מעט בכונה מהרבות בלא כונה","Better a little with kavanah than a lot without kavanah.")],
  ["Nice to notice","מ-ש-נ-ה and נ-ש-מ-ה are the same four letters. Learning Mishnah in the early morning feeds the neshamah."]),
 (4,[("תנא רבי חיא","Rabbi Chiya taught:"),("כל העוסק בתורה בלילה שכינה כנגדו","Whoever learns Torah at night, the Shechinah is opposite him,"),("שנאמר קומי רני בלילה לראש אשמורות","as it says: “Arise, cry out in the night, at the start of the watches;"),("שפכי כמים לבך נכח פני ה'","pour out your heart like water before Hashem.”"),("פרוש שהשכינה היא אז כנגדך","Meaning: the Shechinah is then opposite you."),("עוד אמרו רבותינו זכרונם לברכה","Chazal also said:"),("שכל העוסק בתורה בלילה נקרא עבד ה'","whoever learns Torah at night is called a servant of Hashem,"),("כמו שכתוב כל עבדי ה' העומדים בבית ה' בלילות","as it says: “All servants of Hashem who stand in the House of Hashem at night.”"),("ובלילות הקצרים שאי אפשר לו להשכים כל כך","On short nights, when he can't get up so early,"),("לכל הפחות יתאמץ לקום","he should at least make an effort to get up"),("בעוד שיהיה לו זמן להכין את עצמו","while there is still time to prepare himself"),("ללכת לבית הכנסת להתפלל עם הצבור","to go to shul and daven with the tzibbur.")],
  ["In practice","On short summer nights the minimum is clear: get up in time to prepare and daven with the tzibbur."])],
 [mc("What is the ideal time to get up, according to the Kitzur?",["Midnight, for Tikkun Chatzos","Sunrise","Three hours into the day","Only once it is light"],"אם אפשר לו... לקום בחצות הלילה."),
  match("Match the words",[["תקון חצות","mourning the Beis HaMikdash"],["אעירה שחר","I will awaken the dawn"],["עבד ה'","a servant of Hashem"],["שכינה כנגדו","the Shechinah is opposite him"]]),
  mc("If one can't get up at midnight?",["Push to get up before dawn","Sleep until sunrise","Skip Shacharis","Say Tikkun Chatzos at Mincha"],"יתגבר על כל פנים לקום קודם עלות השחר."),
  fill("Complete Dovid HaMelech's words","אני מעורר את השחר ואין השחר","אותי",["מעורר","מברך","רואה"],"I wake the dawn; the dawn does not wake me."),
  tf("According to the Kitzur, a shiur in Mishnayos comes before every other learning.",True,"ושעור משניות קודם לכל דבר. משנה has the letters of נשמה."),
  order("Build the principle","Better a little with kavanah than a lot without kavanah",["וטוב","מעט","בכונה","מהרבות","בלא כונה"],["בשמחה"]),
  mc("Whoever learns Torah at night is called…",["A servant of Hashem","A tzaddik","A talmid chacham","A shomer"],"נקרא עבד ה'."),
  mc("On short summer nights, what is the minimum?",["Get up in time to daven with the tzibbur","Stay up all night","Say Tikkun Chatzos only","Learn Mishnayos only"],"להתפלל עם הצבור.")]),
L("k6","Tehillim and a beracha","Siman 1 · Se'ifim 6–7",[5,6],[
 (5,[("מזמורי תהלים","Chapters of Tehillim"),("וכן שאר פרשיות מתורה נביאים וכתובים","and other sections of Torah, Nevi'im and Kesuvim"),("שאינם שגורים בפי הכל","that are not fluent on everyone's lips"),("אסור לאמרם בעל פה","may not be said by heart."),("אפלו מי שהוא יודע לאמרם בעל פה","Even one who knows them by heart"),("יש לו לזהר שלא לאמרם בעל פה","should be careful not to say them by heart."),("וסומא מתר","A blind person is permitted.")],
  ["Metsudah note","According to the Mishnah Berurah, Tehillim may be said by heart, since it is like davening. As always, ask your Rav about your own practice."]),
 (6,[("יש למחות ביד האומרים תחנות שבמעמדות","One should object to those who say the supplications of the Ma'amados"),("שמסימים ברוך אתה ה' שומע תפלה","and end “Baruch Atah Hashem, shome'a tefillah.”"),("אלא יש לומר ברוך שומע תפלה","Instead one should say “Baruch shome'a tefillah”"),("בלא שם","without the Name of Hashem.")],
  ["Key idea","A beracha with Hashem's Name may only be said where Chazal set one. Adding the Name on your own would be a beracha l'vatalah."])],
 [mc("Which pesukim may not be said by heart, according to the Kitzur?",["Ones that aren't fluent for everyone","Any pasuk at all","Only pesukim from the Torah","Only Tehillim on Shabbos"],"שאינם שגורים בפי הכל."),
  tf("According to the Kitzur, a blind person may say pesukim by heart.",True,"וסומא מותר."),
  mc("What does the Metsudah note say in the name of the Mishnah Berurah?",["Tehillim may be said by heart, like davening","Tehillim must always be read from a sefer","Tehillim may only be said at night","Tehillim may not be said before davening"],"According to the Mishnah Berurah, Tehillim is like tefillah."),
  match("Match the words",[["בעל פה","by heart"],["שגורים","fluent"],["סומא","a blind person"],["בלא שם","without Hashem's Name"]]),
  mc("How should the Ma'amados supplications end?",["“Baruch shome'a tefillah”, without Hashem's Name","“Baruch Atah Hashem shome'a tefillah”","With Amen only","With no ending at all"],"אלא יש לומר ברוך שומע תפלה בלא שם."),
  fill("Complete the halacha","אלא יש לומר ברוך שומע תפלה בלא","",["שם","כונה","ברכה"],"בלא שם — without Hashem's Name."),
  order("Build the correct ending","Blessed is the One Who hears prayer",["ברוך","שומע","תפלה"],["אתה ה'"])]),
]
SOURCE={"ref":"Kitzur Shulchan Arukh 1","url":"https://www.sefaria.org/Kitzur_Shulchan_Arukh.1",
 "he":{"title":d["heVersionTitle"],"license":d["heLicense"]},"en":{"title":d["versionTitle"],"license":d["license"],"licenseUrl":"https://creativecommons.org/licenses/by/3.0/"}}
js="/* Kitzur Shulchan Aruch, Siman 1 — Hebrew: Torat Emet 357 (Public Domain); English: Metsudah, trans. R' Avrohom Davis (CC-BY). Via Sefaria.\n   Display note: הָאֱלֹהִים is written הָאֱלֹקִים. Phrases and sections are cut from the text by script. */\n"
js+="const K_SOURCE="+json.dumps(SOURCE,ensure_ascii=False)+";\nconst K_SECTIONS="+json.dumps(SECTIONS,ensure_ascii=False)+";\nconst K_LESSONS="+json.dumps(LESSONS,ensure_ascii=False)+";\n"
open(S+'/kitzur.js','w').write(js)
for l in LESSONS: print(l["id"],max(len(x[0]) for x in l["phrases"]))
print(LESSONS[1]["phrases"][7:10]); print(LESSONS[3]["phrases"][2]); print(SECTIONS[4][0])
