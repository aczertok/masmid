// Builds the website into public/ (and the single-file Claude version into dist/limud.html).
// The app lives in src/app/ as many small files; tools/assemble.mjs joins them back into one page.
import { build } from "esbuild";
import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from "fs";
import { assemble } from "./tools/assemble.mjs";
const version = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
await build({ entryPoints: ["src/shim.js"], bundle: true, minify: true, format: "iife", target: ["es2019"], outfile: "public/shim.js", legalComments: "none" });
mkdirSync("public", { recursive: true }); mkdirSync("dist", { recursive: true });
const page = assemble("src/app");
writeFileSync("dist/limud.html", page);
const app = page.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#2457A6"><meta name="description" content="Learn Mishnah, Gemara, Chumash, Nach and Halacha, step by step.">
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icons/favicon.png"><link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Masmid"><meta name="apple-mobile-web-app-status-bar-style" content="default">
<style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}*,*::before,*::after{box-sizing:inherit}body{margin:0}</style>
<script src="firebase-config.js"></script><script src="shim.js?v=${version}"></script>
</head><body>
${app}
<script>if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js");</script>
</body></html>`;
writeFileSync("public/index.html", html);
writeFileSync("public/manifest.webmanifest", JSON.stringify({
  name: "Masmid", short_name: "Masmid", description: "Learn Mishnah, Gemara, Chumash, Nach and Halacha, step by step.",
  start_url: "./", scope: "./", display: "standalone", orientation: "portrait", background_color: "#F3F6FB", theme_color: "#2457A6",
  icons: [{ src: "icons/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }]
}, null, 1));
writeFileSync("public/sw.js", `/* offline support: the app opens without a connection; progress syncs when it's back */
const V="limud-${version}",SHELL=["./","index.html","shim.js?v=${version}","firebase-config.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin||u.pathname.startsWith("/__/"))return;
 if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put("index.html",c));return r}).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r})))});
`);
copyFileSync(existsSync("src/firebase-config.js") ? "src/firebase-config.js" : "firebase-config.example.js", "public/firebase-config.js");
console.log("built", version, (html.length / 1e6).toFixed(2) + "MB");
if (existsSync("src/kitzur-data.js")) copyFileSync("src/kitzur-data.js", "public/kitzur-data.js");
