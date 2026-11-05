// Put src/app/ back together into one page (the same as the old single file).
import { readFileSync, readdirSync } from "fs";
export function assemble(dir) {
  const read = f => readFileSync(`${dir}/${f}`, "utf8");
  let page = read("page.html").replace("/*STYLE*/", () => read("style.css"));
  for (const d of readdirSync(dir).filter(x => /^\d-/.test(x)).sort()) {
    const n = d.split("-")[0];
    const js = readdirSync(`${dir}/${d}`).filter(f => f.endsWith(".js")).sort().map(f => read(`${d}/${f}`).replace(/\n$/, "")).join("\n");
    page = page.replace(`/*SCRIPT${n}*/`, () => js);
  }
  return page;
}
