import { readFile, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "about.html", "packages.html", "package.html", "gallery.html", "contact.html"];
const required = [...pages, "css/style.css", "css/responsive.css", "js/data.js", "js/components.js", "js/main.js", "js/package-detail.js"];
const errors = [];

for (const file of required) {
  try { await access(join(root, file)); } catch { errors.push(`Missing file: ${file}`); }
}

for (const page of pages) {
  const html = await readFile(join(root, page), "utf8");
  if (!/<html lang="en">/.test(html)) errors.push(`${page}: missing lang`);
  if (!/<meta name="viewport"/.test(html)) errors.push(`${page}: missing viewport`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${page}: missing title`);
  if (!/<h1[\s>]/.test(html)) errors.push(`${page}: missing h1`);
  for (const match of html.matchAll(/(?:href|src)="([^"#?]+)"/g)) {
    const ref = match[1];
    if (/^(https?:|mailto:|tel:|data:|\/)/.test(ref)) continue;
    try { await access(join(root, ref)); } catch { errors.push(`${page}: broken local reference ${ref}`); }
  }
}

for (const script of ["js/data.js", "js/components.js", "js/main.js", "js/package-detail.js"]) {
  const source = await readFile(join(root, script), "utf8");
  try { new Function(source.replace(/^import .*$/gm, "").replace(/^export /gm, "")); }
  catch (error) { errors.push(`${script}: syntax check failed: ${error.message}`); }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OK: ${pages.length} pages and ${required.length} required files passed static checks.`);
