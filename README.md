# Masmid

A Torah-learning app: Mishnah, Gemara, Chumash with Rashi, Nach and the Kitzur Shulchan Aruch, step by step, with a world map, a town, avatars and learning together. In English and Portuguese.

**Live site:** https://masmid.netlify.app

## How changes reach the website
1. Claude or ChatGPT makes a change on a branch and opens a **pull request** here on GitHub.
2. Netlify posts a **deploy preview** link on the pull request, so you can try the change first.
3. When it looks right, click **Merge pull request**. Netlify rebuilds the site and it's live in about a minute.

Testers' progress is never touched by an update.

To work on the app with Claude or ChatGPT, connect GitHub in each one and point it at this repository. Both read `AGENTS.md` first.

## What's where
| Folder | What it is |
|---|---|
| `src/app/` | The app, split into small numbered files |
| `src/shim.js` | Sign-in, saving and learners (Firebase) |
| `src/kitzur-data.js` | Kitzur simanim 3–221 |
| `builders/` | Scripts that produced the lesson content |
| `docs/` | Content standards, licensing, data rules, launch guide |
| `test/` | Automated tests |

See `AGENTS.md` for the technical details and rules.
