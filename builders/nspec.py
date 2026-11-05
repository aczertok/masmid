# Yehoshua 1-5 with Rashi (Metsudah). Same shape as cspec.
G="#2F6B57";P="#7D5CC0";BR="#7A5A3A";BK="#3A2A1A";GR="#9A9A9A";BN="#6B4A2A";W="#F4F1E6";R="#5C8FE8";O="#C98A20"
BOOK=dict(file="josh",rashi="jrashi",prefix="j",VAR="NJ",en="Yehoshua",he="יהושע",chap=[1,2,3,4,5],
 units={1:("Chazak ve'ematz","חזק ואמץ"),2:("The spies and Rachav","המרגלים"),3:("Crossing the Yarden","מעבר הירדן"),4:("Twelve stones","שתים עשרה אבנים"),5:("Gilgal","גלגל")},
 source={"he":{"title":"Tanach with Nikkud; Rashi: Metsudah (The Book of Joshua, 1997)","license":"Public Domain / CC-BY"},"en":{"title":"The Koren Jerusalem Bible (non-commercial; 2:1 adapted per Targum and Rashi); Rashi: Metsudah Publications, 1997","license":"CC-BY-NC / CC-BY","licenseUrl":"https://creativecommons.org/licenses/by-nc/3.0/"}},
 fixes=[("a harlot named Raĥav","an innkeeper named Raĥav (so Targum and Rashi)")],
 siyum='`<div class="hadran">חזק!<br>סיימת יהושע א–ה</div><p class="sub">You\'ve learned the first five perakim of Sefer Yehoshua, with Rashi.</p>`')
def mc(q,o,ex):return {"t":"mc","q":q,"opts":o,"a":0,"ex":ex}
def tf(q,a,ex):return {"t":"tf","q":q,"a":a,"ex":ex}
L=[
(1,"Chazak ve'ematz",[(1,5),(6,9)],[mc("What did Hashem tell Yehoshua to do after Moshe's death?",["Cross the Yarden with the people","Return to Mitzrayim","Build a Mishkan","Wait in the midbar"],"קום עבר את הירדן הזה."),mc("What must never leave Yehoshua's mouth?",["This sefer Torah","His tefillos","Moshe's name","Shiros"],"לא ימוש ספר התורה הזה מפיך.")]),
(1,"Getting ready to cross",[(10,15),(16,18)],[mc("In how many days would they cross the Yarden?",["Three","Seven","Forty","One"],"בעוד שלשת ימים אתם עברים את הירדן הזה."),mc("What did Reuven, Gad and half of Menashe answer?",["All that you command us we will do","We want to stay home","We will think about it","Only if Moshe agrees"],"כל אשר צויתנו נעשה.")]),
(2,"The spies go to Yericho",[(1,4),(5,7)],[mc("Where did Yehoshua send the spies?",["To see the land and Yericho","To Mitzrayim","To the Yam Suf","To Har Sinai"],"לכו ראו את הארץ ואת יריחו."),mc("Where were the spies hidden?",["In the stalks of flax on the roof","In a cave","In a well","In the city gate"],"ותטמנם בפשתי העץ.")]),
(2,"What Canaan had heard",[(8,11),(12,14)],[mc("What had the people of Canaan heard about?",["How Hashem dried up the Yam Suf","That Moshe was alive","That the spies were coming","Nothing at all"],"שמענו את אשר הוביש ה' את מי ים סוף."),mc("What did Rachav ask the spies?",["To swear to save her family","To take her to Mitzrayim","To give her gold","To leave quickly"],"השבעו נא לי בה'.")]),
(2,"The scarlet cord",[(15,18),(19,21)],[mc("What sign would be tied in the window?",["A cord of scarlet thread","A white flag","A candle","A shofar"],"את תקות חוט השני הזה."),tf("The spies were let down by a rope through the window.",True,"ותורדם בחבל בעד החלון.")]),
(2,"The spies return",[(22,24)],[mc("How long did the spies hide in the mountain?",["Three days","Seven days","One night","Forty days"],"וישבו שם שלשת ימים."),mc("What did the spies report to Yehoshua?",["Hashem has given all the land into our hands","The land is too strong","The people are giants","We should turn back"],"כי נתן ה' בידנו את כל הארץ.")]),
(3,"Follow the Aron",[(1,4),(5,8)],[mc("How far did the people stay from the Aron?",["About 2,000 amos","10 amos","A day's walk","No distance"],"כאלפים אמה במדה."),mc("What did Yehoshua tell the people before the crossing?",["Sanctify yourselves, for tomorrow Hashem will do wonders","Pack your tents","Count yourselves","Eat and drink"],"התקדשו כי מחר יעשה ה' בקרבכם נפלאות.")]),
(3,"Twelve men",[(9,13)],[mc("How many men were chosen, one from each tribe?",["Twelve","Seven","Ten","Two"],"שני עשר איש."),tf("When the kohanim's feet touched the water, the Yarden would stand in one heap.",True,"ויעמדו נד אחד.")]),
(3,"The Yarden splits",[(14,17)],[tf("The kohanim stood firmly on dry ground in the middle of the Yarden.",True,"ויעמדו הכהנים... בחרבה בתוך הירדן הכן.")]),
(4,"Twelve stones",[(1,5),(6,9)],[mc("How many stones were taken from the Yarden?",["Twelve","Ten","Seven","Two"],"שתים עשרה אבנים."),mc("Why were the stones set up?",["As a sign when the children ask what they mean","To build a house","To mark the border","For a tower"],"כי ישאלון בניכם מחר לאמר מה האבנים האלה לכם.")]),
(4,"Across the Yarden",[(10,14),(15,18)],[mc("What did Hashem do for Yehoshua that day?",["He made him great in the eyes of all Yisrael","He made him king","He gave him a city","He sent him back to the midbar"],"ביום ההוא גדל ה' את יהושע."),tf("When the kohanim came out of the Yarden, the waters returned to their place.",True,"וישבו מי הירדן למקומם.")]),
(4,"A sign for your children",[(19,24)],[mc("On what date did they come up from the Yarden?",["The tenth of the first month (Nisan)","The first of Tishrei","Pesach night","Shavuos"],"בעשור לחדש הראשון."),mc("Where did they camp?",["Gilgal","Shittim","Yericho","Har Nevo"],"ויחנו בגלגל.")]),
(5,"Fear in Canaan; a bris",[(1,5),(6,9)],[mc("Why did Yehoshua give the people a bris again?",["Those born in the midbar had not had a bris","It was Pesach","Moshe had asked him","Before every battle"],"וכל העם הילדים במדבר... לא מלו."),mc("What was the place named?",["Gilgal","Shittim","Beis El","Ai"],"ויקרא שם המקום ההוא גלגל.")]),
(5,"Pesach and the mon",[(10,12)],[mc("What did Bnei Yisrael eat after Pesach?",["Matzos and parched grain from the land","Mon","Meat","Nothing"],"מצות וקלוי."),tf("The mon stopped the day after they ate from the produce of the land.",True,"וישבת המן ממחרת.")]),
(5,"The commander of Hashem's army",[(13,15)],[mc("Who appeared to Yehoshua near Yericho?",["The commander of Hashem's army","Moshe","A king","A spy"],"אני שר צבא ה'."),mc("What was Yehoshua told to do?",["Take off his shoe, for the place is holy","Raise his sword","Blow a shofar","Build a mizbe'ach"],"של נעלך מעל רגלך.")]),
]
Y=("יהושע",O,GR,"hat")
SC=[
("day",[("jordan",160,0,1)],[Y],[(-1,"משה עבדי מת"),(-1,"קום עבר את הירדן הזה"),(-1,"כאשר הייתי עם משה אהיה עמך")]),
("day",[("sefer",250,112,1)],[("יהושע",O,GR,"hat",120,132,.9)],[(-1,"חזק ואמץ"),(-1,"לא ימוש ספר התורה הזה מפיך"),(-1,"והגית בו יומם ולילה")]),
("day",[("tent",60,132,1),("tent",270,132,1)],[("יהושע",O,GR,"hat",130,132,.85),("השוטרים",R,BN,"hat",200,132,.85)],[(0,"הכינו לכם צידה"),(0,"בעוד שלשת ימים אתם עברים")]),
("day",[],[("ראובן",BR,BN,"hat"),("גד",G,BK,"hat"),("מנשה",P,GR,"hat")],[(1,"כל אשר צויתנו נעשה"),(-1,"רק חזק ואמץ")]),
("dusk",[("walls",210,132,1)],[("",G,BN,"hat",60,132,.8),("",R,BK,"hat",110,132,.8)],[(-1,"לכו ראו את הארץ ואת יריחו"),(-1,"וילכו ויבאו... וישכבו שמה")]),
("night",[("walls",160,132,1.2),("flax",150,26,1.3)],[],[(-1,"ותטמנם בפשתי העץ על הגג"),(-1,"והשער סגרו")]),
("night",[("walls",160,132,1.2)],[],[(-1,"ידעתי כי נתן ה' לכם את הארץ"),(-1,"שמענו... ים סוף")]),
("night",[("walls",160,132,1.2)],[],[(-1,"השבעו נא לי בה'"),(-1,"נפשנו תחתיכם למות")]),
("night",[("walls",160,132,1.2),("cord",197,72,1)],[],[(-1,"ותורדם בחבל בעד החלון"),(-1,"תקות חוט השני")]),
("day",[("walls",160,132,1.2),("cord",197,72,1)],[],[(-1,"ותקשר את תקות השני בחלון")]),
("day",[("mountains",160,124,1)],[("",G,BN,"hat",120,132,.8),("",R,BK,"hat",200,132,.8)],[(-1,"וישבו שם שלשת ימים"),(0,"כי נתן ה' בידנו את כל הארץ")]),
("dawn",[("aron",160,124,1)],[],[(-1,"וישכם יהושע בבקר"),(-1,"כראותכם את ארון ברית ה'"),(-1,"כאלפים אמה")]),
("day",[("aron",110,124,1)],[("יהושע",O,GR,"hat",230,132,.85)],[(0,"התקדשו כי מחר יעשה ה' נפלאות"),(-1,"היום הזה אחל גדלך")]),
("day",[("jordan",160,0,1),("twelve",160,104,1)],[],[(-1,"בזאת תדעון כי אל חי בקרבכם"),(-1,"שנים עשר איש"),(-1,"ויעמדו נד אחד")]),
("day",[("jsplit",160,0,1),("aron",160,104,.8)],[],[(-1,"ויעמדו המים... קמו נד אחד"),(-1,"בחרבה בתוך הירדן")]),
("day",[("jordan",160,0,1),("stones",160,112,1)],[],[(-1,"שתים עשרה אבנים"),(-1,"איש אבן אחת על שכמו")]),
("day",[("stones",160,112,1)],[("",BR,BN,"hat",60,132,.75),("",G,BK,"",260,132,.6)],[(1,"מה האבנים האלה לכם?"),(0,"נכרתו מימי הירדן"),(-1,"לזכרון לבני ישראל עד עולם")]),
("day",[("jsplit",160,0,1),("aron",160,104,.8)],[],[(-1,"ויעבר ארון ה'"),(-1,"ביום ההוא גדל ה' את יהושע")]),
("day",[("jordan",160,0,1)],[],[(-1,"עלו מן הירדן"),(-1,"וישבו מי הירדן למקומם")]),
("day",[("stones",160,112,1),("tent",270,132,.9)],[],[(-1,"בעשור לחדש הראשון"),(-1,"ויחנו בגלגל"),(-1,"למען דעת... יד ה' כי חזקה היא")]),
("dusk",[("walls",160,132,1.2)],[],[(-1,"וימס לבבם"),(-1,"שוב מל את בני ישראל")]),
("day",[("tent",90,132,1),("tent",230,132,1)],[],[(-1,"ארבעים שנה הלכו במדבר"),(-1,"היום גלותי את חרפת מצרים"),(-1,"גלגל")]),
("dusk",[("matzah",110,104,1),("wheat",210,132,1)],[],[(-1,"ויעשו את הפסח"),(-1,"מצות וקלוי"),(-1,"וישבת המן","no")]),
("day",[("walls",270,132,.9),("drawnsword",160,80,1)],[("יהושע",O,GR,"hat",70,132,.85)],[(-1,"וחרבו שלופה בידו"),(-1,"אני שר צבא ה'"),(-1,"של נעלך מעל רגלך")]),
]
