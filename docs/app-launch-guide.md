# Masmid: running the website

- **Website:** https://masmid.netlify.app (Netlify, project "masmid")
- **Sign-in and database:** Firebase project `limud-path` (Authentication: email/password and Google; Firestore with the rules in `firestore.rules`)
- **Code:** this GitHub repository. Netlify builds the site from the `main` branch automatically (`netlify.toml`).

## Updating the site
Merge a pull request on GitHub. Netlify rebuilds and publishes in about a minute. Testers get the update the next time they open the app; their progress is never touched.

If Firebase rules change (`firestore.rules`), also paste them into Firebase console → Firestore → Rules → Publish.

## Inviting testers
Send the link with a note:

> You're invited to beta test **Masmid**, a Torah-learning app. Open **https://masmid.netlify.app**, tap **New here? Create an account** (or Continue with Google), and set up your profile.
> To install it on your phone:
> - **iPhone:** open the link in Safari, tap Share, then **Add to Home Screen**.
> - **Android:** open the link in Chrome, tap ⋮, then **Install app**.

**Seeing who signed up:** Firebase console → Authentication → Users.

## Later: App Store and Google Play
The same app can be packaged with Capacitor (`capacitor.config.json`, app ID `com.limudpath.app`):

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap add ios && npx cap add android
npm run app:sync
```

Before a public store release: privacy policy, account deletion, Sign in with Apple, a children's-privacy (COPPA) review, and the Rav review and licensing steps in `sources-and-licensing.md`.
