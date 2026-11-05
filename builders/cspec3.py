# Parashas Chayei Sarah, the first 50 pesukim (Bereishis 23:1–24:30), with Rashi. Lessons, questions and story cartoons.
# Standards: Sarah, Rivkah and the other women are never drawn. Rivkah's actions appear only through objects (her pitcher,
# the trough, the camels drinking) and narrator lines. 24:2, 24:9 and 24:16 get no Rashi card, no questions and no picture of their content.
from gstory import M,P,b
def mc(q,o,ex=""):return {"t":"mc","q":q,"opts":o,"a":0,"ex":ex}
def tf(q,a,ex=""):return {"t":"tf","q":q,"a":a,"ex":ex}
AVR=lambda x,**o:M("אברהם",x,4,**o)
CHEIS=lambda x,**o:M("בני חת",x,6,hat="",**o)
EFRON=lambda x,**o:M("עפרון",x,2,hat="",**o)
ELI=lambda x,**o:M("אליעזר",x,3,**o)
LAVAN=lambda x,**o:M("לבן",x,7,hat="",**o)
UNITS={
 "s23":("Me'aras HaMachpelah","מערת המכפלה",23,1,"Chayei Sarah"),
 "s24":("Eliezer at the well","העבד והבאר",24,1,"Chayei Sarah")}
LIMIT={23:20,24:30}
FIX={(24,16):[("The girl was very good looking—a virgin—no man had known her.","The girl was very fine, and unmarried.")]}
NO_NOTES={(24,2),(24,9),(24,16)}
L=[
# ---------------- PEREK 23 ----------------
("s23","The life of Sarah",[(1,2),(3,6)],
 [mc("How old was Sarah when she passed away?",["127","100","90","175"],"Rashi: at 100 she was like 20 in sin, and at 20 like 7 in beauty. All her years were equally good."),
  mc("Where did Sarah pass away?",["Kiryas Arba, which is Chevron","Be'er Sheva","Charan","Shechem"]),
  mc("What did the sons of Cheis call Avraham?",["A prince of Hashem among us","A stranger","A king","A shepherd"])],
 [[b("dusk",[P("tent",160,132,1.2)],[],"ויהיו חיי שרה","מאה שנה ועשרים שנה ושבע שנים","שני חיי שרה"),
   b("dusk",[P("house",90),P("house",240),P("tent",165,132,.8)],[AVR(165,pose="bow")],"ותמת שרה בקרית ארבע","הוא חברון","ויבא אברהם לספד לשרה ולבכתה")],
  [b("city",[P("gate",230)],[AVR(80),CHEIS(240)],(0,"גר ותושב אנכי עמכם"),(0,"תנו לי אחזת קבר עמכם")),
   b("city",[P("gate",230)],[AVR(80),CHEIS(240)],(1,"שמענו אדני"),(1,"נשיא אלקים אתה בתוכנו"),(1,"במבחר קברינו קבר את מתך"))]]),
("s23","Avraham asks for the cave",[(7,9),(10,11)],
 [mc("Which cave did Avraham ask for?",["Me'aras HaMachpelah","The cave of Eliyahu","A cave in Be'er Sheva","A cave near Charan"],"Machpelah means 'double': a cave with an upper level and a lower one, or a cave for couples (Rashi)."),
  mc("Who owned the cave?",["Ephron, son of Tzochar","Avimelech","Malki-Tzedek","Lot"]),
  tf("Avraham asked to pay the full price for the cave.",True)],
 [[b("city",[P("gate",240)],[AVR(90,pose="bow"),CHEIS(240)],"ויקם אברהם וישתחו לעם הארץ"),
   b("city",[P("gate",240)],[AVR(90),CHEIS(240)],(0,"ופגעו לי בעפרון בן צחר")),
   b("field",[P("cave",200,132,1.1),P("tree",80)],[AVR(120)],"ויתן לי את מערת המכפלה","אשר בקצה שדהו","בכסף מלא")],
  [b("city",[P("gate",160,132,1)],[EFRON(90),CHEIS(240)],"ועפרון ישב בתוך בני חת","לעיני כל באי שער עירו"),
   b("field",[P("cave",230,132,.9)],[EFRON(80),AVR(170)],(0,"לא אדני שמעני"),(0,"השדה נתתי לך — והמערה אשר בו"),(0,"קבר מתך"))]]),
("s23","Four hundred shekel",[(12,16)],
 [mc("How much silver did Avraham pay Ephron?",["400 shekel","40 shekel","100 shekel","Nothing; it was a gift"]),
  tf("Ephron said a lot but in the end took full payment.",True,"Rashi: he said much but did not even do a little; he took large shekels."),
  mc("What does 'עובר לסוחר' mean?",["Coins accepted by merchants everywhere","A gift","A loan","Gold jewelry"])],
 [[b("city",[P("gate",240)],[AVR(90,pose="bow"),CHEIS(240)],"וישתחו אברהם לפני עם הארץ"),
   b("city",[P("coins",160,120,1.2)],[AVR(80),EFRON(240)],(0,"נתתי כסף השדה — קח ממני"),(0,"ואקברה את מתי שמה")),
   b("city",[P("coins",160,120,1)],[EFRON(240),AVR(80)],(0,"ארץ ארבע מאת שקל כסף"),(0,"ביני ובינך מה הוא?")),
   b("city",[P("coins",130,118,1.4),P("coins",190,118,1.4)],[AVR(70,arm="up"),EFRON(250)],"וישקל אברהם לעפרן את הכסף","ארבע מאות שקל כסף","עבר לסחר")]]),
("s23","Avraham's field and cave",[(17,20)],
 [mc("What was included in the sale?",["The field, the cave and all its trees","Only the cave","Only the field","A house in Chevron"]),
  tf("Me'aras HaMachpelah is in Chevron.",True),
  mc("Who did Avraham bury in Me'aras HaMachpelah here?",["Sarah his wife","Terach","Lot","Nachor"])],
 [[b("field",[P("cave",160,132,1.2),P("tree",60),P("tree",270),P("tree",230,132,.8)],[],"ויקם שדה עפרון אשר במכפלה","השדה והמערה","וכל העץ אשר בשדה"),
   b("city",[P("gate",230)],[AVR(90),CHEIS(240)],"לאברהם למקנה","לעיני בני חת"),
   b("dusk",[P("cave",200,132,1.1),P("tree",60)],[AVR(100,pose="bow")],"ואחרי כן קבר אברהם את שרה אשתו","אל מערת שדה המכפלה","הוא חברון בארץ כנען")]]),
# ---------------- PEREK 24 ----------------
("s24","Avraham's oath",[(1,4),(5,9)],
 [mc("How did Hashem bless Avraham?",["With everything (בכל)","Only with wealth","Only with children","Only with long life"]),
  mc("Where did Avraham send his servant to find a wife for Yitzchak?",["To Avraham's land and birthplace","To Canaan","To Mitzrayim","To the Pelishtim"]),
  tf("Avraham allowed Yitzchak to leave Eretz Yisrael.",False,"Avraham said: 'Take care, do not bring my son back there.'")],
 [[b("day",[P("tent",250),P("sheep",80),P("camel",150,132,.8)],[AVR(200)],"ואברהם זקן בא בימים","וה' ברך את אברהם בכל"),
   b("day",[P("tent",260)],[AVR(90),ELI(210)],(0,"לא תקח אשה לבני מבנות הכנעני"),(0,"כי אל ארצי ואל מולדתי תלך"))],
  [b("day",[P("tent",260)],[AVR(90),ELI(210)],(1,"אולי לא תאבה האשה ללכת אחרי?"),(0,"השמר לך פן תשיב את בני שמה")),
   b("day",[P("mountains",160,124,.8)],[AVR(90),ELI(220)],(0,"ה' אלקי השמים... ישלח מלאכו לפניך"),(0,"ולקחת אשה לבני משם")),
   b("day",[P("tent",260)],[AVR(90),ELI(210)],"וישבע לו על הדבר הזה")]]),
("s24","Eliezer sets out",[(10,14)],
 [mc("How many camels did Eliezer take?",["Ten","Two","Seven","Forty"]),
  mc("Where did Eliezer make the camels kneel?",["By a well of water outside the city","Inside the city","At a river","Near a tent"]),
  mc("What sign did Eliezer ask for?",["The girl who offers water to him and to his camels","The tallest girl","The first girl to come","A girl wearing gold"],"The sign shows kindness: she would give even the camels to drink.")],
 [[b("day",[P("camel",80),P("camel",130),P("camel",180)],[ELI(250,to=290)],"ויקח העבד עשרה גמלים","וכל טוב אדניו בידו","וילך אל ארם נהרים אל עיר נחור"),
   b("dusk",[P("well2",210,132,1.2),P("camel",70,132,.9),P("camel",120,132,.9),P("house",290,132,.7)],[ELI(170)],"ויברך הגמלים מחוץ לעיר","אל באר המים לעת ערב"),
   b("dusk",[P("well2",230,132,1.1),P("camel",70,132,.8)],[ELI(150,arm="up")],(0,"ה' אלקי אדני אברהם"),(0,"הקרה נא לפני היום"),(0,"ועשה חסד עם אדני אברהם")),
   b("dusk",[P("well2",230,132,1.1),P("jug",190,118,1)],[ELI(110)],(0,"הטי נא כדך ואשתה"),"ואמרה: שתה — וגם גמליך אשקה","אתה הכחת לעבדך ליצחק")]]),
("s24","At the well",[(15,18),(19,21)],
 [mc("What did Rivkah offer after giving Eliezer water?",["To draw water for all his camels","To bring him bread","To show him the way","To call her father"]),
  tf("Rivkah came out before Eliezer finished his tefillah.",True,"'He had not yet finished speaking, and behold Rivkah came out.'"),
  mc("What did Eliezer do while the camels drank?",["He watched silently, waiting to see if Hashem made his way successful","He went into the city","He fed the camels himself","He sang"])],
 [[b("dusk",[P("well2",230,132,1.1),P("jug",230,82,1,cls="bob",**{"in":1})],[ELI(100)],(0,"ויהי הוא טרם כלה לדבר"),"והנה רבקה יצאת","וכדה על שכמה"),
   b("dusk",[P("well2",210,132,1.2),P("jug",210,96,1,cls="bob")],[],"ותרד העינה","ותמלא כדה ותעל"),
   b("dusk",[P("well2",240,132,1),P("jug",170,100,1)],[ELI(110,to=140)],"וירץ העבד לקראתה",(0,"הגמיאיני נא מעט מים מכדך"),"ותאמר: שתה אדני")],
  [b("dusk",[P("well2",250,132,1),P("trough",130,128,1.1),P("jug",140,104,1,cls="bob")],[],"ותאמר: גם לגמליך אשאב","עד אם כלו לשתת"),
   b("dusk",[P("trough",150,128,1.3),P("camel",70,132,.8),P("camel",230,132,.8,flip=1),P("well2",290,132,.6)],[],"ותמהר ותער כדה אל השקת","ותשאב לכל גמליו"),
   b("dusk",[P("camel",230,132,.9),P("trough",230,128,.9)],[ELI(90)],"והאיש משתאה לה מחריש","לדעת ההצליח ה' דרכו אם לא")]]),
("s24","The gifts",[(22,25)],
 [mc("What did Eliezer give?",["A gold nose ring and two bracelets","Silver coins","A camel","A new garment"],"Rashi: the two bracelets hint at the two Luchos, and their ten shekel at the Ten Commandments."),
  mc("Whose daughter was Rivkah?",["Besuel, son of Nachor","Lavan","Ephron","Lot"]),
  tf("Rivkah said there was room for them to spend the night.",True)],
 [[b("dusk",[P("jewels",160,96,1.4,cls="bob"),P("camel",60,132,.7),P("camel",270,132,.7)],[],"ויקח האיש נזם זהב","בקע משקלו","ושני צמידים — עשרה זהב משקלם"),
   b("dusk",[P("well2",250,132,1)],[ELI(110)],(0,"בת מי את? הגידי נא לי"),(0,"היש בית אביך מקום לנו ללין?")),
   b("dusk",[P("well2",250,132,1),P("wheat",70),P("house",150,132,.7)],[],"בת בתואל אנכי","גם תבן גם מספוא רב עמנו","גם מקום ללון")]]),
("s24","Baruch Hashem",[(26,30)],
 [mc("What did Eliezer do when he heard the answer?",["He bowed and thanked Hashem","He ran home","He gave more gifts","He asked for food"]),
  mc("Who was Rivkah's brother?",["Lavan","Besuel","Nachor","Eliezer"]),
  tf("Lavan ran out to Eliezer after he saw the jewelry.",True,"Rashi: he saw the gold and set his eyes on the money.")],
 [[b("dusk",[P("well2",250,132,1),P("camel",60,132,.7)],[ELI(150,pose="bow")],"ויקד האיש","וישתחו לה'"),
   b("dusk",[P("well2",250,132,1)],[ELI(130,arm="up")],(0,"ברוך ה' אלקי אדני אברהם"),(0,"אשר לא עזב חסדו ואמתו"),(0,"אנכי בדרך נחני ה'")),
   b("dusk",[P("house",230,132,1)],[],"ותרץ הנערה","ותגד לבית אמה כדברים האלה"),
   b("dusk",[P("house",270,132,.8),P("jewels",210,80,.9,cls="bob")],[LAVAN(250,to=170)],"ולרבקה אח ושמו לבן","וירץ לבן אל האיש החוצה"),
   b("dusk",[P("well2",270,132,.9),P("camel",210,132,.8)],[LAVAN(80),ELI(150)],"ויבא אל האיש","והנה עמד על הגמלים על העין")]]),
]
