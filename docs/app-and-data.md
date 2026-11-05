# Limud: keeping data safe

## How data is kept
- Each learner's progress is saved in two places: in Firebase under that person's own private space, and on the device.
- Publishing a new version of the app does not touch either one. Learners open the new version and continue where they were.
- The saved data has a version number ("v2" is an account with one or more profiles; each profile has its own progress, avatar and town). Older saves are upgraded automatically.
- Once a day the account is also copied to a rotating backup (7 slots). Learners can download a backup file from Settings and restore it later.

## Rules for every change
1. **Never rename or reuse a lesson id, unit key, badge id, avatar item id or building id.** Progress is stored against these ids. Add new ones; retire old ones by hiding them, never by deleting them.
2. **If the shape of saved data changes, add a migration step** in `DATA_MIGRATIONS` and raise `DATA_V`. Old data is always upgraded forward, never discarded.
3. **New settings or fields get defaults** in `fresh()`. Saved data is merged over the defaults.
4. **Unknown items are tolerated.** If an avatar item or building isn't recognized, it falls back to a default instead of breaking.
5. **Before a big release:** play-test a copy of a real older save.

## Profiles
- A new user picks Boy or Girl and an optional age. From 13 (boys) or 12 (girls) and up, the profile counts as a man or a woman.
- This decides avatar options, the people shown on the maps and in the beis medrash, the Learn together group, and which Kitzur simanim are open.
- More profiles can be added for family members. Each one keeps its own progress.

## Before any public launch
- Licensing: get Koren's permission for the NC texts, or replace them.
- A privacy policy and a children's privacy review (COPPA).
- Rabbinic review of all content.
- App stores: account deletion, Sign in with Apple, privacy policy.
