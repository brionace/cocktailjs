#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

const repoRoot = process.cwd();
const assetsDirs = [
  {
    src: path.join(repoRoot, "packages", "cocktailjs-react", "src", "components", "glasses"),
    dest: path.join(repoRoot, "public", "svgs", "glasses"),
  },
];

const camelMap = {
  className: "class",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  fillRule: "fill-rule",
  clipRule: "clip-rule",
  viewBox: "viewBox", // keep as-is, case sensitive
};

function convertAttributes(svg) {
  // replace {"..."} or {'...'} with "..."
  svg = svg.replace(/\{\s*"([^"]*)"\s*\}/g, '"$1"');
  svg = svg.replace(/\{\s*'([^']*)'\s*\}/g, '"$1"');

  // basic camelCase -> kebab-case replacements
  for (const [k, v] of Object.entries(camelMap)) {
    const re = new RegExp("\\b" + k + "\\s*=", "g");
    svg = svg.replace(re, v + "=");
  }

  // remove JSX fragments like {...} that are not simple strings
  svg = svg.replace(/=\{[^}]*\}/g, '=""');

  // ensure xmlns is present
  if (!/xmlns=/.test(svg.slice(0, 200))) {
    svg = svg.replace(
      /<svg(\s|>)/,
      '<svg xmlns="http://www.w3.org/2000/svg"$1',
    );
  }

  return svg;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processDir(srcDir, destDir) {
  const out = [];
  await ensureDir(destDir);
  let files;
  try {
    files = await fs.readdir(srcDir);
  } catch (e) {
    console.warn("No source directory", srcDir);
    return out;
  }

  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (![".js", ".jsx", ".ts", ".tsx"].includes(ext)) continue;
    const srcPath = path.join(srcDir, f);
    const base = path.basename(f, ext);
    const destPath = path.join(destDir, base + ".svg");
    try {
      const raw = await fs.readFile(srcPath, "utf8");
      const start = raw.indexOf("<svg");
      if (start === -1) {
        console.warn("No <svg> in", srcPath, "— skipping");
        out.push({ file: f, status: "no-svg" });
        continue;
      }
      const end = raw.indexOf("</svg>", start);
      if (end === -1) {
        console.warn("Malformed <svg> in", srcPath, "— skipping");
        out.push({ file: f, status: "malformed" });
        continue;
      }
      const svgRaw = raw.slice(start, end + 6);
      const svg = convertAttributes(svgRaw);
      await fs.writeFile(destPath, svg, "utf8");
      out.push({ file: f, status: "ok", dest: destPath });
    } catch (e) {
      console.error("Failed processing", srcPath, e && e.message);
      out.push({ file: f, status: "error", error: String(e) });
    }
  }

  return out;
}

async function main() {
  const summary = {};
  for (const d of assetsDirs) {
    const res = await processDir(d.src, d.dest);
    summary[d.src] = res;
  }
  console.log("Conversion summary:");
  for (const [k, v] of Object.entries(summary)) {
    console.log(k, v.length, "files");
    for (const r of v) {
      console.log(
        " -",
        r.file,
        r.status,
        r.dest ? "-> " + r.dest : r.error || "",
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
