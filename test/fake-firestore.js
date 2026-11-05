// Test double for firebase/firestore: an in-memory store shared by all tabs through localStorage,
// enforcing the same access rules as firestore.rules (using the signed-in Auth emulator user).
import { getAuth } from "firebase/auth";
const K = "__fakefs";
const load = () => JSON.parse(localStorage.getItem(K) || "{}");
const store = (o) => { localStorage.setItem(K, JSON.stringify(o)); bc.postMessage(1); listeners.forEach(f => f()); };
const bc = new BroadcastChannel("fakefs"); const listeners = new Set(); bc.onmessage = () => listeners.forEach(f => f());
let fsApp = null;
const uid = () => getAuth(fsApp).currentUser?.uid || null;
const G = ["man", "woman", "boy", "girl"];
function allowed(path, op, v) {
  const s = path.split("/"), u = uid(); if (!u) return false;
  if (s[0] === "data" && s[1] === "users" && s.length === 4) return s[2] === u;
  if (s[0] === "rooms" && s[2] === "peers" && s.length === 4) return op === "read" || s[3] === u;
  if (s[0] === "community" && G.includes(s[1]) && s[2] === "people" && s.length === 4) return op === "read" || (s[3].startsWith(u + "_") && (op === "delete" || (v && v.uid === u)));
  if (s[0] === "community" && G.includes(s[1]) && s[2] === "fives" && s.length === 4) return op === "read" || (op === "create" && v && v.uid === u);
  return false;
}
const deny = () => { const e = new Error("Missing or insufficient permissions."); e.code = "permission-denied"; return e; };
export function initializeFirestore(app) { fsApp = app; return { app }; }
export const persistentLocalCache = () => ({}), persistentMultipleTabManager = () => ({}), connectFirestoreEmulator = () => {};
export const serverTimestamp = () => Date.now();
export function doc(base, ...rest) { const path = typeof base === "object" && base.path ? [base.path, ...rest].join("/") : rest.join("/"); return { path }; }
export function collection(_fs, ...segs) { return { path: segs.join("/") }; }
export async function getDoc(ref) { if (!allowed(ref.path, "read")) throw deny(); const o = load(); return { exists: () => ref.path in o, data: () => o[ref.path] }; }
export async function setDoc(ref, v) { if (!allowed(ref.path, "write", v)) throw deny(); const o = load(); o[ref.path] = JSON.parse(JSON.stringify(v)); store(o); }
export async function addDoc(col, v) { const p = col.path + "/" + Math.random().toString(36).slice(2); if (!allowed(p, "create", v)) throw deny(); const o = load(); o[p] = JSON.parse(JSON.stringify(v)); store(o); return { id: p.split("/").pop() }; }
export async function deleteDoc(ref) { if (!allowed(ref.path, "delete")) throw deny(); const o = load(); delete o[ref.path]; store(o); }
export const where = (f, op, v) => ({ w: [f, op, v] });
export const limit = n => ({ lim: n });
export const query = (col, ...cs) => ({ path: col.path, cs });
const run = q => { const o = load(); let ks = Object.keys(o).filter(k => k.startsWith(q.path + "/") && k.split("/").length === q.path.split("/").length + 1);
  for (const c of q.cs || []) { if (c.w) { const [f, op, v] = c.w; ks = ks.filter(k => op === ">" ? o[k][f] > v : op === "==" ? o[k][f] === v : true); } if (c.lim) ks = ks.slice(0, c.lim); }
  return ks.map(k => ({ id: k.split("/").pop(), data: () => o[k] })); };
export async function getDocs(q) { if (!allowed(q.path + "/x", "read")) throw deny(); const d = run(q); return { forEach: f => d.forEach(f) }; }
export function onSnapshot(q, next, err) {
  if (!allowed(q.path + "/x", "read")) { setTimeout(() => err && err(deny())); return () => {}; }
  const go = () => { const d = run(q); next({ forEach: f => d.forEach(f) }); };
  listeners.add(go); setTimeout(go); return () => listeners.delete(go);
}
