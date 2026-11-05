import { build } from "esbuild";
await build({ entryPoints: ["src/shim.js"], bundle: true, format: "iife", outfile: "public/shim.js", alias: { "firebase/firestore": "./test/fake-firestore.js" } });
console.log("test shim built");
