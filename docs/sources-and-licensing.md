# Limud app: text sources and licensing

Checked against Sefaria's license field for each version (October–November 2026).

## In use
| Course | Hebrew / Aramaic | English | Notes |
|---|---|---|---|
| Mishnah Berachos 1–9 | Mishnah, ed. Romm, Vilna 1913 (Public Domain) | The Mishna with Obadiah Bartenura, R' Shraga Silverstein (CC-BY) | Bartenura appears in brackets inside the Silverstein English. |
| Kitzur Shulchan Aruch, all 221 simanim | Torat Emet 357, vowelized (Public Domain) | Metsudah, trans. R' Avrohom Davis, 1996 (CC-BY) | Simanim 1–2 are hand-made lessons. Simanim 3–221 are cut into sentence pairs and questions by `builders/kzbuild.py` (output `src/kitzur-data.js`). **Siman 32 is Hebrew only:** Metsudah has no English for it, and the other English versions are community translations or unlicensed. Confirm the CC-BY status with Sefaria or Metsudah before launch. |
| Chumash: Bereishis, Noach, Lech Lecha, Vayera, Chayei Sarah with Rashi | Tanach with Nikkud (Public Domain) | Metsudah Chumash and Metsudah Rashi, 2009 (CC-BY) | Sensitive Rashis are kept in the full view only. Modesty adaptations are listed in `builders/cspec2.py` and `builders/cspec4.py` (FIX, NO_NOTES, REPLACE). Bereishis 19:31–36 reads "[This pasuk is learned with a rebbe or teacher.]" |
| Nach: Yehoshua 1–5 with Rashi | Tanach with Nikkud (Public Domain); Rashi Hebrew via Metsudah | The Koren Jerusalem Bible (CC-BY-NC); Rashi: *The Book of Joshua*, Metsudah Publications 1997 (CC-BY) | **Adapted at 2:1:** "an innkeeper named Rachav (so Targum and Rashi)". |
| Gemara Berachos, Perek 1 (2a–13a) | William Davidson Edition, Vocalized Aramaic (CC-BY-NC) | William Davidson Edition, English (Koren Noé Talmud, R' Adin Even-Israel Steinsaltz), CC-BY-NC | Six lines are adapted for modesty: 3a, 8b, 10a, 10b (twice), 12b. The list is in `builders/gspec.py` (FIX). |

## Portuguese
- The Portuguese Chumash (lessons, pesukim, notes, questions) is the app's own translation, adapted from the Metsudah English (CC-BY allows adaptations with attribution). The source line in the app says so. It needs review by a Portuguese-speaking Rav.
- The full Rashi text in the Chumash, and all other courses, are still English in Portuguese mode.

Names: in display, the Tetragrammaton is written ה' and אלהים is written אלקים. English "Elohim" is written "Elokim".

## Non-commercial (NC) texts
- **Used in the free beta:** the Koren Jerusalem Bible and the Koren/Steinsaltz Gemara. Get Koren's permission, or replace these texts, before any paid release.
- **Not used:** Koren/Steinsaltz Mishnah English; Peninei Halacha (consider asking Yeshivat Har Bracha for permission).

## Not usable
- JPS 1917 and JPS 1985 (not Orthodox translations)
- Community translations
- Versions with no license listed
- Radak on Yehoshua (license unknown)
- Metzudat David (only a community translation is available)

## Rules
- CC-BY texts need attribution to the publisher and translator (not to Sefaria).
- NC texts may not be used in a paid or commercial app.
