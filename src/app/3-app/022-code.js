const C4_UNITS=[
 {key:"c-v18",lessons:C4V18_LESSONS,source:CSOURCE4,sections:C4V18_SECTIONS,unit:{s:"Vayera · Perek 18 · 4 lessons",t:"Avraham's guests",he:"הכנסת אורחים"},masteryBy:"lesson",parsha:"Vayera",
  ref:x=>`Bereishis 18:${x+1}`,fullHe:x=>`בראשית יח:${hebNum(x+1)}`,partNames:[],revId:"c4v18-chazara",testId:"c4v18-siyum",revShort:"Review the perek",testTitle:"Perek 18 test",
  siyumHTML:`<div class="hadran">סיימת פרק יח</div><p class="sub">You've finished Bereishis, Perek 18, with Rashi.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek 18",unitWord:"perek"},
 {key:"c-v19",lessons:C4V19_LESSONS,source:CSOURCE4,sections:C4V19_SECTIONS,unit:{s:"Vayera · Perek 19 · 3 lessons",t:"Sedom",he:"סדום"},masteryBy:"lesson",parsha:"Vayera",
  ref:x=>`Bereishis 19:${x+1}`,fullHe:x=>`בראשית יט:${hebNum(x+1)}`,partNames:[],revId:"c4v19-chazara",testId:"c4v19-siyum",revShort:"Review the perek",testTitle:"Perek 19 test",
  siyumHTML:`<div class="hadran">סיימת פרק יט</div><p class="sub">You've finished Bereishis, Perek 19, with Rashi.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek 19",unitWord:"perek"},
 {key:"c-v20",lessons:C4V20_LESSONS,source:CSOURCE4,sections:C4V20_SECTIONS,unit:{s:"Vayera · Perek 20 · 2 lessons",t:"Avraham in Gerar",he:"גרר"},masteryBy:"lesson",parsha:"Vayera",
  ref:x=>`Bereishis 20:${x+1}`,fullHe:x=>`בראשית כ:${hebNum(x+1)}`,partNames:[],revId:"c4v20-chazara",testId:"c4v20-siyum",revShort:"Review the perek",testTitle:"Perek 20 test",
  siyumHTML:`<div class="hadran">סיימת פרק כ</div><p class="sub">You've finished Bereishis, Perek 20, with Rashi.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek 20",unitWord:"perek"},
 {key:"c-v21",lessons:C4V21_LESSONS,source:CSOURCE4,sections:C4V21_SECTIONS,unit:{s:"Vayera · Perek 21 · 3 lessons",t:"Yitzchak is born",he:"לידת יצחק"},masteryBy:"lesson",parsha:"Vayera",
  ref:x=>`Bereishis 21:${x+1}`,fullHe:x=>`בראשית כא:${hebNum(x+1)}`,partNames:[],revId:"c4v21-chazara",testId:"c4v21-siyum",revShort:"Review the perek",testTitle:"Perek 21 test",
  siyumHTML:`<div class="hadran">סיימת פרק כא</div><p class="sub">You've finished Bereishis, Perek 21, with Rashi.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek 21",unitWord:"perek"},
 {key:"c-v22",lessons:C4V22_LESSONS,source:CSOURCE4,sections:C4V22_SECTIONS,unit:{s:"Vayera · Perek 22 · 5 lessons",t:"The Akeidah",he:"עקדת יצחק"},masteryBy:"lesson",parsha:"Vayera",
  ref:x=>`Bereishis 22:${x+1}`,fullHe:x=>`בראשית כב:${hebNum(x+1)}`,partNames:[],revId:"c4v22-chazara",testId:"c4v22-siyum",revShort:"Review the perek",testTitle:"Siyum Parashas Vayera",
  siyumHTML:`<div class="hadran">חזק!<br>סיימת פרשת וירא</div><p class="sub">You've learned all of Parashas Vayera, with Rashi.</p>`,doneSmall:"Parashah complete",doneTitle:"You finished Parashas Vayera",unitWord:"perek"},
 {key:"c-s24b",lessons:C4S24B_LESSONS,source:CSOURCE4,sections:C4S24B_SECTIONS,unit:{s:"Chayei Sarah · Perek 24 · 5 lessons",t:"A wife for Yitzchak",he:"ויקח את רבקה"},masteryBy:"lesson",parsha:"Chayei Sarah",
  ref:x=>`Bereishis 24:${x+1}`,fullHe:x=>`בראשית כד:${hebNum(x+1)}`,partNames:[],revId:"c4s24b-chazara",testId:"c4s24b-siyum",revShort:"Review the perek",testTitle:"Perek 24 test",
  siyumHTML:`<div class="hadran">סיימת פרק כד</div><p class="sub">You've finished Bereishis, Perek 24, with Rashi.</p>`,doneSmall:"Perek complete",doneTitle:"You finished Perek 24",unitWord:"perek"},
 {key:"c-s25",lessons:C4S25_LESSONS,source:CSOURCE4,sections:C4S25_SECTIONS,unit:{s:"Chayei Sarah · Perek 25 · 2 lessons",t:"Avraham's last years",he:"תולדות ישמעאל"},masteryBy:"lesson",parsha:"Chayei Sarah",
  ref:x=>`Bereishis 25:${x+1}`,fullHe:x=>`בראשית כה:${hebNum(x+1)}`,partNames:[],revId:"c4s25-chazara",testId:"c4s25-siyum",revShort:"Review the perek",testTitle:"Siyum Parashas Chayei Sarah",
  siyumHTML:`<div class="hadran">חזק!<br>סיימת פרשת חיי שרה</div><p class="sub">You've learned all of Parashas Chayei Sarah, with Rashi.</p>`,doneSmall:"Parashah complete",doneTitle:"You finished Parashas Chayei Sarah",unitWord:"perek"},
];
const HEB=["א","ב","ג","ד","ה","ו","ז","ח","ט","י","יא","יב"];
const K_UNITS=[
 {key:"k-s1",lessons:K_LESSONS,source:K_SOURCE,sections:K_SECTIONS,unit:{s:"Siman 1 · 6 lessons",t:"Waking up in the morning",he:"השכמת הבקר"},
  ref:p=>`Kitzur 1:${p+1}`,fullHe:p=>`קיצור שו"ע א:${HEB[p]}`,partNames:[0,1,2,3,4,5,6].map(i=>"סעיף "+HEB[i]),revId:"k1-chazara",testId:"k1-siyum",revShort:"Review the siman",testTitle:"Siman 1 test",
  siyumHTML:`<div class="hadran">סיימת סימן א׳</div><p class="sub">You've learned the whole first siman of the Kitzur Shulchan Aruch, in order, se'if by se'if.</p>`,doneSmall:"Siman complete",doneTitle:"You finished Siman 1",unitWord:"siman"},
 {key:"k-s2",lessons:K2_LESSONS,source:K2_SOURCE,sections:K2_SECTIONS,unit:{s:"Siman 2 · 6 lessons",t:"Washing hands in the morning",he:"נטילת ידים"},
  ref:p=>`Kitzur 2:${p+1}`,fullHe:p=>`קיצור שו"ע ב:${HEB[p]}`,partNames:[0,1,2,3,4,5,6,7,8].map(i=>"סעיף "+HEB[i]),revId:"k2-chazara",testId:"k2-siyum",revShort:"Review the siman",testTitle:"Siman 2 test",
  siyumHTML:`<div class="hadran">סיימת סימן ב׳</div><p class="sub">You've learned the whole second siman of the Kitzur Shulchan Aruch: netilas yadayim in the morning.</p>`,doneSmall:"Siman complete",doneTitle:"You finished Siman 2",unitWord:"siman"}
];
