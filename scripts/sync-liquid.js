#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const argv = process.argv.slice(2);
const watchMode = argv.includes("--watch");

const repoRoot = path.resolve(__dirname, "..");
const src = path.join(
  repoRoot,
  "packages",
  "cocktail-ui",
  "src",
  "components",
  "Liquid.jsx",
);
const dest = path.join(
  repoRoot,
  "packages",
  "cocktailjs-react",
  "src",
  "components",
  "Liquid.jsx",
);

function transformSource(srcText) {
  let out = String(srcText);

  // Source is now DOM SVG (from cocktail-ui), same format as destination.
  // No tag conversion needed — just normalize line endings.
  out = out.replace(/\r\n/g, "\n");
  if (!out.endsWith("\n")) out += "\n";
  return out;
}

function syncOnce() {
  try {
    const srcText = fs.readFileSync(src, "utf8");
    const transformed = transformSource(srcText);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, transformed, "utf8");
    console.log(`Synced Liquid -> ${path.relative(process.cwd(), dest)}`);
  } catch (e) {
    console.error("Failed to sync Liquid:", e && e.message ? e.message : e);
  }
}

if (watchMode) {
  // lazy require so script still runs where chokidar not installed
  const chokidar = require("chokidar");
  console.log("Watching", src);
  syncOnce();
  chokidar.watch(src).on("change", (p) => {
    console.log("Change detected:", p);
    syncOnce();
  });
} else {
  syncOnce();
}
