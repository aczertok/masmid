/* Limud Path — standalone app runtime.
   The app was built against a small "window.claude" interface (db, user, room, downloads).
   This file provides the same interface on Firebase: Firebase Auth for sign-in, Firestore for
   saved progress and for "Learn together" presence. The app itself is unchanged. */
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, connectAuthEmulator } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDoc, setDoc, deleteDoc,
  collection, query, where, onSnapshot, serverTimestamp, connectFirestoreEmulator, getDocs, addDoc, limit } from "firebase/firestore";

const cfg = window.LIMUD_FIREBASE || {};
const app = initializeApp(cfg);
const auth = getAuth(app);
let fs;
try { fs = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) }); }
catch (e) { fs = initializeFirestore(app, {}); }
if (window.LIMUD_EMULATOR) { connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true }); if (window.LIMUD_EMULATOR.firestore) connectFirestoreEmulator(fs, "127.0.0.1", 8085); }

/* resolve once Firebase knows whether someone is signed in */
let current = null;
const ready = new Promise(res => { let first = true; onAuthStateChanged(auth, u => { current = u; if (first) { first = false; res(); } }); });

/* ---- db: the app uses collection(path).doc(id).get()/set() ---- */
const dbApi = {
  collection(path) {
    return {
      doc(id) {
        const ref = doc(fs, path + "/" + id);
        return {
          async get() { const s = await getDoc(ref); return { exists: s.exists(), data: () => s.data() }; },
          async set(v) { await setDoc(ref, v); }
        };
      }
    };
  }
};
const userApi = { async id() { return current ? current.uid : null; }, async me() { return { id: current?.uid, name: current?.displayName || "" }; } };

/* ---- downloads: a normal file download ---- */
const downloadsApi = {
  async save({ filename, data }) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: filename.endsWith(".json") ? "application/json" : "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); return { status: "saved" };
  }
};

/* ---- room: live presence for "Learn together", kept in Firestore ----
   rooms/{name}/peers/{uid} = {presence, ts}. A heartbeat keeps you listed; anyone silent for 2 minutes drops off. */
const STALE = 120000, BEAT = 30000;
const roomApi = {
  async join(name) {
    const me = current.uid, col = collection(fs, "rooms", name, "peers"), mine = doc(col, me);
    let pres = {}, beat = null, unsub = null, known = new Map(), left = false;
    const write = () => setDoc(mine, { presence: pres, ts: Date.now(), at: serverTimestamp() }).catch(() => {});
    beat = setInterval(write, BEAT);
    const onHide = () => { if (document.visibilityState === "hidden") deleteDoc(mine).catch(() => {}); else write(); };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", () => deleteDoc(mine).catch(() => {}));
    return {
      async presence(p) { pres = JSON.parse(JSON.stringify(p || {})); await write(); },
      onPeers(fn, onClose) {
        const q = query(col, where("ts", ">", Date.now() - STALE));
        unsub = onSnapshot(q, snap => {
          const now = Date.now(), peers = [], joined = [], updated = [], seen = new Set();
          snap.forEach(d => {
            const v = d.data(); if (!v || now - (v.ts || 0) > STALE) return;
            const p = { peer: d.id, isMe: d.id === me, sameTab: d.id === me, kind: "viewer", presence: v.presence || {} };
            peers.push(p); seen.add(d.id);
            const prev = known.get(d.id), key = JSON.stringify(p.presence);
            if (prev === undefined) joined.push(p); else if (prev !== key) updated.push(p);
            known.set(d.id, key);
          });
          for (const id of [...known.keys()]) if (!seen.has(id)) known.delete(id);
          fn({ peers, joined, updated });
        }, () => { if (!left && onClose) onClose(); });
      },
      async leave() { left = true; clearInterval(beat); document.removeEventListener("visibilitychange", onHide); if (unsub) unsub(); await deleteDoc(mine).catch(() => {}); }
    };
  }
};

/* the interface the app calls */
window.claude = {
  async use(name) {
    await ready;
    if (!current) return name === "downloads" ? downloadsApi : null;
    return { db: dbApi, user: userApi, room: roomApi, downloads: downloadsApi }[name] || null;
  }
};

/* ---- learners: public cards and high fives, within one group (men / women / boys / girls) ----
   community/{group}/people/{uid_profile} = {card (JSON), uid, ts}
   community/{group}/fives/{auto}         = {to, from, uid, nick, ts} */
const okGroup = g => ["man", "woman", "boy", "girl"].includes(g);
window.LimudSocial = {
  async publish(group, id, card) { if (!current || !okGroup(group)) return; await setDoc(doc(fs, "community", group, "people", id), { card: JSON.stringify(card), uid: current.uid, ts: Date.now() }); },
  async remove(group, id) { if (!current || !okGroup(group)) return; await deleteDoc(doc(fs, "community", group, "people", id)).catch(() => {}); },
  async list(group) {
    if (!current || !okGroup(group)) return [];
    const snap = await getDocs(query(collection(fs, "community", group, "people"), where("ts", ">", Date.now() - 30 * 864e5), limit(100)));
    const out = []; snap.forEach(d => { const v = d.data(); try { out.push({ id: d.id, ts: v.ts || 0, card: JSON.parse(v.card || "{}") }); } catch (e) {} });
    return out.sort((a, b) => b.ts - a.ts);
  },
  async five(group, to, from, nick) { if (!current || !okGroup(group)) return; await addDoc(collection(fs, "community", group, "fives"), { to, from, uid: current.uid, nick: String(nick || "").slice(0, 24), ts: Date.now() }); },
  onFives(group, me, cb) {
    if (!current || !okGroup(group)) return () => {};
    return onSnapshot(query(collection(fs, "community", group, "fives"), where("to", "==", me)), snap => {
      const out = []; snap.forEach(d => { const v = d.data(); out.push({ id: d.id, nick: v.nick, ts: v.ts || 0 }); }); cb(out);
    }, () => {});
  }
};

/* sign-in, used by the app's sign-in screen and Settings */
const nice = e => {
  const c = (e && e.code) || "";
  return ({ "auth/invalid-email": "That email address doesn't look right.", "auth/missing-password": "Please enter a password.",
    "auth/weak-password": "Please choose a password of at least 6 characters.", "auth/email-already-in-use": "There's already an account with that email. Try signing in.",
    "auth/invalid-credential": "The email or password is not right.", "auth/wrong-password": "The email or password is not right.",
    "auth/user-not-found": "There's no account with that email yet. Create one below.", "auth/too-many-requests": "Too many tries. Please wait a minute and try again.",
    "auth/popup-closed-by-user": "Google sign-in was closed before it finished.", "auth/network-request-failed": "No internet connection." })[c] || "Something went wrong. Please try again.";
};
window.LimudAuth = {
  ready, get user() { return current; },
  configured: !!(cfg.apiKey && !/PASTE/.test(cfg.apiKey)),
  async signIn(email, pw) { try { await signInWithEmailAndPassword(auth, email.trim(), pw); return null; } catch (e) { return nice(e); } },
  async signUp(email, pw, name) { try { const r = await createUserWithEmailAndPassword(auth, email.trim(), pw); if (name) await updateProfile(r.user, { displayName: name }); return null; } catch (e) { return nice(e); } },
  async google() { try { await signInWithPopup(auth, new GoogleAuthProvider()); return null; } catch (e) { return nice(e); } },
  async reset(email) { try { await sendPasswordResetEmail(auth, email.trim()); return null; } catch (e) { return nice(e); } },
  async signOut() { await signOut(auth); }
};
