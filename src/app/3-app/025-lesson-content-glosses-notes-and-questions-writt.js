/* ================= LESSON CONTENT (glosses, notes and questions written for this app) ================= */
const M_LESSONS=[
{id:"m1a",mishnah:0,title:"When does the night Shema begin?",short:"Mishnah 1 · Part 1",
 phrases:[["מאימתי","From when"],["קורין את שמע","do we recite the Shema"],["בערבית","in the evening?"],["משעה שהכהנים נכנסים","From the time the kohanim go in"],["לאכול בתרומתן","to eat their terumah"],["עד סוף האשמורה הראשונה","until the end of the first watch"],["דברי ר' אליעזר","— the words of R' Eliezer"],["וחכמים אומרים עד חצות","The Chachamim say: until midnight"],["רבן גמליאל אומר","Rabban Gamliel says"],["עד שיעלה עמוד השחר","until dawn rises"]],
 steps:[
  {t:"learn",from:0,to:5,note:["Bartenura","A kohen who became tamei and went to the mikvah may eat terumah only once the stars come out. So \"when the kohanim go in\" means tzeis hakochavim."]},
  {t:"mc",id:"m1a-1",q:"The evening Shema may be said from…",opts:["When the kohanim go in to eat terumah","Sunset","Midnight","When a person goes to sleep"],a:0,ex:"The Mishnah opens with the kohanim eating their terumah."},
  {t:"mc",id:"m1a-2",q:"What time is \"when the kohanim go in to eat terumah\"?",opts:["When the stars come out","Plag haMincha","Midday","Sunrise"],a:0,ex:"Bartenura: a kohen who immersed may eat terumah once the stars appear."},
  {t:"learn",from:5,to:10,note:["Bartenura","The night has three watches, so \"the first watch\" is the first third of the night. The halacha follows Rabban Gamliel: the whole night is \"when you lie down.\""]},
  {t:"match",id:"m1a-3",q:"Match each Tanna to his view",pairs:[["R' Eliezer","End of the first watch"],["Chachamim","Midnight"],["Rabban Gamliel","Dawn"]],he:false},
  {t:"match",id:"m1a-4",q:"Match the words",pairs:[["בערבית","in the evening"],["חצות","midnight"],["עמוד השחר","dawn"],["בתרומתן","their terumah"]],he:true},
  {t:"order",id:"m1a-5",q:"Build the opening question",en:"From when do we recite the Shema in the evening?",tiles:["מאימתי","קורין","את שמע","בערבית"],decoys:["בשחרית"]},
  {t:"fill",id:"m1a-6",q:"Complete the Chachamim's view",before:"וחכמים אומרים עד",after:"",opts:["חצות","הנץ החמה","שלש שעות"],a:0,ex:"The Chachamim say \"until midnight.\""},
  {t:"tf",id:"m1a-7",q:"According to Bartenura, \"the first watch\" is the first third of the night.",a:true,ex:"The night is divided into three watches."}
 ]},
{id:"m1b",mishnah:0,title:"Rabban Gamliel's sons",short:"Mishnah 1 · Part 2",
 phrases:[["מעשה שבאו בניו מבית המשתה","Once his sons came back from a wedding feast"],["אמרו לו לא קרינו את שמע","They said: we have not recited Shema"],["אמר להם אם לא עלה עמוד השחר","He said: if dawn has not risen"],["חייבין אתם לקרות","you are obligated to recite it"],["ולא זו בלבד אלא","And not only this, but"],["כל מה שאמרו חכמים עד חצות","wherever the Chachamim said \"until midnight\""],["מצותן עד שיעלה עמוד השחר","the mitzvah lasts until dawn"],["הקטר חלבים ואברים","burning the fats and limbs on the Mizbe'ach"],["וכל הנאכלין ליום אחד","and all korbanos eaten for one day"],["אם כן למה אמרו חכמים עד חצות","If so, why did the Chachamim say \"until midnight\"?"],["כדי להרחיק אדם מן העבירה","To keep a person far from sin"]],
 steps:[
  {t:"learn",from:0,to:4,note:["Bartenura","The sons asked: do the Chachamim truly argue, or do they agree with you and only made a fence? Rabban Gamliel answered that they agree with him."]},
  {t:"mc",id:"m1b-1",q:"Where were Rabban Gamliel's sons coming from?",opts:["A wedding feast","The Beis HaMikdash","A long journey","The beis medrash"],a:0,ex:"מבית המשתה — from a feast."},
  {t:"fill",id:"m1b-2",q:"Complete Rabban Gamliel's answer",before:"אם לא עלה עמוד השחר",after:"אתם לקרות",opts:["חייבין","פטורין","רשאין"],a:0,ex:"חייבין — you are obligated."},
  {t:"learn",from:4,to:11,note:["Key idea","The Chachamim's \"midnight\" is a fence. The Torah's limit is dawn; they set an earlier time so a person will not delay and lose the mitzvah."]},
  {t:"mc",id:"m1b-3",q:"Why did the Chachamim say \"until midnight\"?",opts:["To keep a person far from sin","Shema after midnight never counts","Most people are asleep by then","The kohanim finish eating at midnight"],a:0,ex:"כדי להרחיק אדם מן העבירה."},
  {t:"tf",id:"m1b-4",q:"Rabban Gamliel told his sons that the Chachamim actually agree the mitzvah lasts until dawn.",a:true,ex:"Bartenura: the Chachamim hold like him and only made a fence."},
  {t:"match",id:"m1b-5",q:"Match the words",pairs:[["הקטר חלבים","burning the fats"],["בית המשתה","feast"],["להרחיק","to keep far"],["הנאכלין ליום אחד","eaten for one day"]],he:true},
  {t:"order",id:"m1b-6",q:"Build the reason",en:"To keep a person far from sin",tiles:["כדי","להרחיק","אדם","מן העבירה"],decoys:["חצות"]},
  {t:"mc",id:"m1b-7",q:"Bartenura: once nightfall arrives, before saying Shema one should not…",opts:["Sit down to a meal or go to sleep","Learn Torah","Daven Mincha","Speak at all"],a:0,ex:"One may not start a meal, and certainly not sleep, until saying Shema and davening."}
 ]},
{id:"m2",mishnah:1,title:"The morning Shema",short:"Mishnah 2",
 phrases:[["מאימתי קורין את שמע בשחרית","From when do we recite Shema in the morning?"],["משיכיר בין תכלת ללבן","Once one can tell techeles from white"],["רבי אליעזר אומר בין תכלת לכרתי","R' Eliezer: between techeles and leek-green"],["וגומרה עד הנץ החמה","and one finishes it by sunrise"],["רבי יהושע אומר עד שלש שעות","R' Yehoshua: until three hours"],["שכן דרך בני מלכים לעמוד בשלש שעות","for princes rise at three hours"],["הקורא מכאן ואילך לא הפסיד","One who recites later loses nothing"],["כאדם הקורא בתורה","he is like one who reads in the Torah"]],
 steps:[
  {t:"learn",from:0,to:4,note:["Bartenura","The blue and white strands of tzitzis. Where the dye didn't take, some wool stays white; once it's light enough to see the difference, the morning Shema begins."]},
  {t:"mc",id:"m2-1",q:"The morning Shema begins once one can…",opts:["Tell techeles from white","See the sun","Recognize a friend at a distance","Hear the birds"],a:0,ex:"משיכיר בין תכלת ללבן."},
  {t:"fill",id:"m2-2",q:"Complete R' Eliezer's view",before:"בין תכלת",after:"",opts:["לכרתי","ללבן","לירוק"],a:0,ex:"כרתי is leek-green, a shade close to techeles."},
  {t:"learn",from:4,to:8,note:["Halacha","Bartenura: the halacha follows R' Yehoshua, and \"three hours\" means a quarter of the day. Ideally one says Shema right at sunrise, like the vasikin."]},
  {t:"match",id:"m2-3",q:"Match each view",pairs:[["First opinion","Techeles vs. white"],["R' Eliezer","Techeles vs. leek-green"],["R' Yehoshua","Until three hours"]],he:false},
  {t:"mc",id:"m2-4",q:"Why does R' Yehoshua allow until three hours?",opts:["Princes rise then","The sun is fully up","Shacharis ends then","The kohanim begin the korbanos"],a:0,ex:"שכן דרך בני מלכים לעמוד בשלש שעות."},
  {t:"tf",id:"m2-5",q:"\"Three hours\" always means a quarter of the daytime, whether the day is long or short.",a:true,ex:"Bartenura, following the Rambam."},
  {t:"mc",id:"m2-6",q:"What about one who recites after three hours?",opts:["He is rewarded like one reading the Torah","He wasted his time","He must repeat it the next day","He may never say the berachos"],a:0,ex:"לא הפסיד — and Bartenura adds he still says the berachos."},
  {t:"order",id:"m2-7",q:"Build R' Yehoshua's reason",en:"For it is the way of princes to rise at three hours",tiles:["שכן","דרך","בני מלכים","לעמוד","בשלש שעות"],decoys:["הנץ"]}
 ]},
{id:"m3",mishnah:2,title:"Beis Shammai & Beis Hillel",short:"Mishnah 3",
 phrases:[["בית שמאי אומרים","Beis Shammai say"],["בערב כל אדם יטו ויקראו","in the evening everyone reclines and recites"],["ובבוקר יעמדו","and in the morning they stand"],["שנאמר ובשכבך ובקומך","as it says \"when you lie down and when you rise\""],["ובית הלל אומרים כל אדם קורא כדרכו","Beis Hillel: each person recites in his own way"],["שנאמר ובלכתך בדרך","as it says \"and when you walk on the way\""],["אם כן למה נאמר ובשכבך ובקומך","If so, why does it say \"when you lie down and when you rise\"?"],["בשעה שבני אדם שוכבים ובשעה שבני אדם עומדים","At the time people lie down and the time people rise"],["אמר ר' טרפון אני הייתי בא בדרך","R' Tarfon said: I was traveling"],["והטיתי לקרות כדברי בית שמאי","and I reclined to recite like Beis Shammai"],["וסכנתי בעצמי מפני הלסטים","and I endangered myself because of bandits"],["אמרו לו כדי היית לחוב בעצמך","They told him: you deserved to pay with your life"],["שעברת על דברי בית הלל","for you went against Beis Hillel"]],
 steps:[
  {t:"learn",from:0,to:8,note:["Key idea","Beis Shammai read \"lie down / rise\" as posture. Beis Hillel read it as the time of day, so any posture is fine: standing, sitting, reclining, or walking."]},
  {t:"mc",id:"m3-1",q:"How does Beis Hillel read \"ובשכבך ובקומך\"?",opts:["The time people lie down and rise","Recline at night, stand by day","Only at home, never on the road","Say it twice each night"],a:0,ex:"בשעה שבני אדם שוכבים ובשעה שבני אדם עומדים."},
  {t:"fill",id:"m3-2",q:"Complete Beis Shammai's view",before:"בערב כל אדם",after:"ויקראו",opts:["יטו","יעמדו","ישבו"],a:0,ex:"יטו — they recline."},
  {t:"tf",id:"m3-3",q:"According to Beis Hillel, one may say Shema while walking.",a:true,ex:"כל אדם קורא כדרכו, as it says ובלכתך בדרך."},
  {t:"learn",from:8,to:13,note:["Lesson","Halacha follows Beis Hillel. Acting like Beis Shammai here is not an extra chumra; the Chachamim call it a transgression."]},
  {t:"mc",id:"m3-4",q:"What did R' Tarfon do on the road?",opts:["Reclined to say Shema like Beis Shammai","Skipped Shema because of danger","Said Shema while walking","Waited until he got home"],a:0,ex:"והטיתי לקרות כדברי בית שמאי."},
  {t:"mc",id:"m3-5",q:"What does the Chachamim's reply teach?",opts:["Going against Beis Hillel, even as a stringency, is wrong","Travelers are exempt from Shema","Beis Shammai's view is preferred on the road","Danger permits skipping Shema"],a:0,ex:"שעברת על דברי בית הלל."},
  {t:"match",id:"m3-6",q:"Match the words",pairs:[["ובשכבך","when you lie down"],["ובקומך","when you rise"],["ובלכתך בדרך","when you walk on the way"],["הלסטים","the bandits"]],he:true},
  {t:"order",id:"m3-7",q:"Build Beis Hillel's rule",en:"Each person recites in his own way",tiles:["כל אדם","קורא","כדרכו"],decoys:["יטו"]}
 ]},
{id:"m4",mishnah:3,title:"The berachos of Shema",short:"Mishnah 4",
 phrases:[["בשחר מברך שתים לפניה ואחת לאחריה","In the morning: two berachos before it and one after"],["ובערב שתים לפניה ושתים לאחריה","In the evening: two before and two after"],["אחת ארוכה ואחת קצרה","one long and one short"],["מקום שאמרו להאריך אינו רשאי לקצר","Where they said to lengthen, one may not shorten"],["לקצר אינו רשאי להאריך","to shorten, one may not lengthen"],["לחתום אינו רשאי שלא לחתום","to close with \"Baruch,\" one may not leave it out"],["ושלא לחתום אינו רשאי לחתום","not to close, one may not add it"]],
 steps:[
  {t:"learn",from:0,to:3,note:["Bartenura","Morning: יוצר אור and אהבה before, אמת ויציב after. Evening: מעריב ערבים and אהבת עולם before, אמת ואמונה and השכיבנו after."]},
  {t:"mc",id:"m4-1",q:"How many berachos surround the morning Shema?",opts:["Two before, one after","One before, two after","Two before, two after","One before, one after"],a:0,ex:"בשחר מברך שתים לפניה ואחת לאחריה."},
  {t:"match",id:"m4-2",q:"Match each beracha to its place",pairs:[["יוצר אור","Morning, before"],["אמת ויציב","Morning, after"],["מעריב ערבים","Evening, before"],["השכיבנו","Evening, after"]],he:true},
  {t:"fill",id:"m4-3",q:"Complete the morning rule",before:"בשחר מברך שתים לפניה",after:"לאחריה",opts:["ואחת","ושתים","ושלש"],a:0,ex:"One beracha after: אמת ויציב."},
  {t:"learn",from:3,to:7,note:["Key idea","Chazal fixed each beracha's form. Its length, and whether it opens or closes with \"Baruch,\" may not be changed."]},
  {t:"mc",id:"m4-4",q:"Bartenura: \"one long and one short\" refers to…",opts:["The two berachos before Shema","The two berachos after Shema at night","Shema and Shemoneh Esrei","The morning and evening Shema"],a:0,ex:"יוצר אור is long; אהבה is short."},
  {t:"tf",id:"m4-5",q:"A beracha over fruit opens and closes with \"Baruch.\"",a:false,ex:"Bartenura: berachos over fruit and mitzvos do not close with \"Baruch.\""},
  {t:"mc",id:"m4-6",q:"How many berachos of Shema are said in a full day?",opts:["Seven","Five","Six","Eight"],a:0,ex:"2 + 1 in the morning and 2 + 2 at night. The Yerushalmi connects this to \"שבע ביום הללתיך.\""},
  {t:"order",id:"m4-7",q:"Build the rule",en:"Where they said to lengthen, one may not shorten",tiles:["מקום שאמרו","להאריך","אינו רשאי","לקצר"],decoys:["לחתום"]}
 ]},
{id:"m5",mishnah:4,title:"Yetzias Mitzrayim at night",short:"Mishnah 5",
 phrases:[["מזכירין יציאת מצרים בלילות","We mention the Exodus at night"],["אמר ר' אלעזר בן עזריה","R' Elazar ben Azarya said"],["הרי אני כבן שבעים שנה","I am like a man of seventy"],["ולא זכיתי","yet I did not prevail"],["שתאמר יציאת מצרים בלילות","[to prove] the Exodus should be said at night"],["עד שדרשה בן זומא","until Ben Zoma expounded it"],["למען תזכור את יום צאתך מארץ מצרים כל ימי חייך","\"So you remember the day you left Egypt all the days of your life\""],["ימי חייך הימים","\"the days of your life\": the days"],["כל ימי חייך הלילות","\"ALL the days of your life\": the nights"],["וחכמים אומרים ימי חייך העולם הזה","The Chachamim: \"the days of your life\": this world"],["כל ימי חייך להביא לימות המשיח","\"all\": to include the days of Mashiach"]],
 steps:[
  {t:"learn",from:0,to:6,note:["Bartenura","R' Elazar ben Azarya was young. On the day he became Nasi his hair turned white so he would look the part, which is why he says \"like seventy.\""]},
  {t:"mc",id:"m5-1",q:"Why did R' Elazar ben Azarya say \"like seventy\"?",opts:["His hair turned white the day he became Nasi","He was exactly seventy","He had learned for seventy years","He had seventy talmidim"],a:0,ex:"Bartenura: he only looked old."},
  {t:"tf",id:"m5-2",q:"We say the parsha of tzitzis at night even though night is not the time for tzitzis.",a:true,ex:"Bartenura: it's said at night because it mentions Yetzias Mitzrayim."},
  {t:"learn",from:6,to:11,note:["You know this one","This mishnah appears in the Haggadah, right before \"Baruch HaMakom.\""]},
  {t:"mc",id:"m5-3",q:"What does Ben Zoma learn from the extra word כל?",opts:["The nights","The days of Mashiach","Shabbos and Yom Tov","Every generation"],a:0,ex:"כל ימי חייך — הלילות."},
  {t:"mc",id:"m5-4",q:"What do the Chachamim learn from כל?",opts:["The days of Mashiach","The nights","Olam Haba","Yom Tov"],a:0,ex:"כל ימי חייך להביא לימות המשיח."},
  {t:"match",id:"m5-5",q:"Match the derashos",pairs:[["ימי חייך","the days"],["Ben Zoma: כל","the nights"],["Chachamim: כל","days of Mashiach"],["ולא זכיתי","I did not prevail"]],he:true},
  {t:"fill",id:"m5-6",q:"Complete the Chachamim's derasha",before:"כל ימי חייך להביא",after:"",opts:["לימות המשיח","ללילות","לעולם הבא"],a:0,ex:"להביא לימות המשיח."},
  {t:"order",id:"m5-7",q:"Build the opening",en:"We mention the Exodus from Egypt at night",tiles:["מזכירין","יציאת מצרים","בלילות"],decoys:["בימים"]}
 ]}
];

M_LESSONS.forEach(l=>l.parts=[l.mishnah]);
const COURSES={
 mishnayos:{id:"mishnayos",chip:{b:"מ",t:"Mishnah Berachos",s:"9 perakim · ברכות"},fullTitle:"Full mishnah with translation and Bartenura",commHe:"ברטנורא",commToggle:"Bartenura",enLabel:"English and Bartenura",masteryTitle:"Mastery by mishnah",
  next:{s:"Next masechta · coming later",t:"Seder Zeraim continues",he:"פאה"},
  units:[{key:"m-p1",lessons:M_LESSONS,source:SOURCE,sections:SECTIONS,unit:{s:"Perek 1 · 6 lessons",t:"The times of Kriyas Shema",he:"מאימתי"},
   ref:p=>`Berachos 1:${p+1}`,fullHe:p=>`משנה ברכות א:${HEB[p]}`,partNames:[0,1,2,3,4].map(i=>"משנה "+HEB[i]),revId:"chazara",testId:"siyum",revShort:"Review the perek",testTitle:"Siyum Perek",
   siyumHTML:`<div class="hadran">הדרן עלך<br>פרק מאימתי</div><p class="sub">"We will return to you, Perek Meimasai." You've completed the first perek of Berachos.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek Meimasai",unitWord:"perek"},...MB_UNITS]},
 halacha:{id:"halacha",chip:{b:"ה",t:"Kitzur Shulchan Aruch",s:"Orach Chaim · in order"},fullTitle:"Full se'if with translation and notes",commHe:"הערה",commToggle:"Notes",enLabel:"English and notes",masteryTitle:"Mastery by se'if",
  next:{s:"After Siman 221",t:"A siyum on the whole Kitzur",he:"הדרן עלך קיצור שלחן ערוך"},
  units:K_UNITS},
 chumash:{id:"chumash",chip:{b:"ח",t:"Chumash with Rashi",s:"Bereishis to Chayei Sarah · 5 parshiyos"},fullTitle:"Full pesukim with translation and Rashi",commHe:"רש״י",commToggle:"Rashi",enLabel:"English and Rashi",masteryTitle:"Mastery by lesson",
  next:{s:"Parashas Toldos · coming later",t:"Yaakov and Esav",he:"תולדות"},
  units:[...C_UNITS,...C2_UNITS,...C4_UNITS.slice(0,5),...C3_UNITS,...C4_UNITS.slice(5)]},
 tanakh:{id:"tanakh",chip:{b:"נ",t:"Nach · Yehoshua",s:"Perakim 1–5 · יהושע"},fullTitle:"Full pesukim with translation and Rashi",commHe:"רש״י",commToggle:"Rashi",enLabel:"English and Rashi",masteryTitle:"Mastery by lesson",
  next:{s:"Yehoshua 6 · coming later",t:"The walls of Yericho",he:"יריחו"},
  units:NJ_UNITS},
 gemara:{id:"gemara",chip:{b:"ג",t:"Gemara Berachos",s:"Perek Meimasai · 2a–13a"},fullTitle:"Full amud with translation (Steinsaltz)",commHe:"הערה",commToggle:"Notes",enLabel:"English (Steinsaltz)",masteryTitle:"Mastery by lesson",
  next:{s:"Perek 2 · coming later",t:"Hayah Korei",he:"היה קורא"},
  units:GB_UNITS}
};
const ALLQ={};
Object.values(COURSES).forEach(c=>c.units.forEach(u=>{u.course=c.id;u.nodes=[...u.lessons.map(l=>({id:l.id,kind:"lesson",lesson:l})),...(u.revId?[{id:u.revId,kind:"review",title:"Chazarah",short:u.revShort},{id:u.testId,kind:"test",title:u.testTitle,short:"Pass at 80% to finish"}]:[])];
 u.lessons.forEach(l=>{l.U=u;l.steps.forEach(s=>{if(s.id){s.lesson=l.id;s.course=c.id;s.unit=u.key;ALLQ[s.id]=s}})})}));
let CRS;
function setCourse(id){CRS=COURSES[id]||COURSES.mishnayos}
const courseLessons=()=>CRS.units.flatMap(u=>u.lessons);

const SUBJECTS=[
 {id:"mishnayos",he:"משניות",en:"Mishnayos",c:"var(--tech)",live:true,desc:"Berachos, perek by perek, with Bartenura.",plan:["All of Maseches Berachos, perakim 1–9 (live now)","Siyum Masechta at the end of Perek 9","Seder Zeraim, then Moed","Mishnah Yomis track"]},
 {id:"halacha",he:"הלכה",en:"Halacha",c:"var(--karti)",live:true,desc:"The whole Kitzur Shulchan Aruch, all 221 simanim, in order.",plan:["All 221 simanim (live now)","Line by line: Hebrew with the Metsudah English","Seasonal units before each Yom Tov","Minhag setting and \"ask your Rav\" notes"]},
 {id:"chumash",he:"חומש",en:"Chumash",c:"var(--gold-deep)",live:true,desc:"Bereishis, Noach, Lech Lecha, Vayera and Chayei Sarah with Rashi, pasuk by pasuk.",plan:["Parshiyos Bereishis, Noach, Lech Lecha, Vayera and Chayei Sarah with Rashi (live now)","The rest of Sefer Bereishis, pasuk by pasuk","Weekly parsha track tied to the calendar","Shnayim Mikra review mode"]},
 {id:"tanakh",he:'נ"ך',en:"Nach",c:"var(--rest)",live:true,desc:"Navi with Rashi, pasuk by pasuk.",plan:["Yehoshua 1–5 with Rashi (live now)","The rest of Sefer Yehoshua","Shoftim, Shmuel and Melachim","Tehillim vocabulary"]},
 {id:"gemara",he:"גמרא",en:"Gemara",c:"var(--err)",live:true,desc:"Berachos with the Steinsaltz translation, amud by amud.",plan:["Berachos Perek 1, 2a–13a (live now)","Perek 2, Hayah Korei","Aramaic word bank and the flow of a sugya","Daf Yomi track"]},
 {id:"mussar",he:"מוסר",en:"Mussar",c:"var(--muted)",desc:"Middos, one idea a day.",plan:["Pirkei Avos","Mesillas Yesharim","Short daily reflection prompts"]}
];

const LEVELS=[[0,"Maschil"],[60,"Talmid"],[160,"Shakdan"],[320,"Masmid"],[550,"Baki"],[850,"Lamdan"],[1250,"Ben Torah"]];
const BADGES=[
 {id:"first",he:"א",name:"Reishis",d:"Finish your first lesson"},
 {id:"mishnah1",he:"משנה",name:"Mishnah Rishonah",d:"Finish both parts of Mishnah 1"},
 {id:"perfect",he:"✓",name:"Perfect",d:"A lesson with no mistakes"},
 {id:"streak3",he:"ג",name:"Chazakah",d:"A 3-day streak"},
 {id:"shabbos",he:"ש",name:"Shomer Streak",d:"Keep a streak across Shabbos or Yom Tov"},
 {id:"streak7",he:"ז",name:"Full Week",d:"A 7-day streak"},
 {id:"chazara",he:"חזרה",name:"Chazarah",d:"Finish a review session"},
 {id:"meah",he:"קא",name:"Me'ah V'Echad",d:"Answer 101 review questions"},
 {id:"siyum",he:"הדרן",name:"Siyum",d:"Finish a perek or a siman"}
];

