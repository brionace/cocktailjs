#!/usr/bin/env node
/**
 * Sync glass components FROM cocktail-ui (source of truth) TO cocktailjs-react.
 * Both use DOM SVG format so no tag transformation is needed — just a file copy.
 * Usage: node scripts/sync-assets.js [--watch]
 */
const fs = require("fs");
const path = require("path");
const argv = process.argv.slice(2);
const watchMode = argv.includes("--watch");

const repoRoot = path.resolve(__dirname, "..");
const srcDirs = [
  path.join(
    repoRoot,
    "packages",
    "cocktail-ui",
    "src",
    "components",
    "glasses",
  ),
];
const destBase = path.join(
  repoRoot,
  "packages",
  "cocktailjs-react",
  "src",
  "components",
  "glasses",
);

function syncFile(srcFile) {
  try {
    const name = path.basename(srcFile, path.extname(srcFile));
    if (name.includes(".bak")) return;
    const destFile = path.join(destBase, `${name}.jsx`);
    const srcText = fs.readFileSync(srcFile, "utf8");
    // Both are DOM SVG — normalize line endings only
    let out = srcText.replace(/\r\n/g, "\n");
    if (!out.endsWith("\n")) out += "\n";
    fs.mkdirSync(destBase, { recursive: true });
    fs.writeFileSync(destFile, out, "utf8");
    console.log(
      "Synced",
      path.relative(repoRoot, srcFile),
      "->",
      path.relative(repoRoot, destFile),
    );
  } catch (e) {
    console.error("Failed to sync", srcFile, e && e.message ? e.message : e);
  }
}

function syncAll() {
  for (const dir of srcDirs) {
    try {
      const files = fs.readdirSync(dir);
      for (const f of files) {
        const p = path.join(dir, f);
        const st = fs.statSync(p);
        if (st.isFile() && /\.(js|jsx)$/.test(f) && !f.includes(".bak")) {
          syncFile(p);
        }
      }
    } catch (e) {
      // ignore missing dirs
    }
  }
}

if (watchMode) {
  const chokidar = require("chokidar");
  console.log("Watching cocktail-ui glasses for sync:", srcDirs.join(", "));
  syncAll();
  chokidar
    .watch(srcDirs, { ignored: /(^|[\\\/])\../, ignoreInitial: true })
    .on("add", syncFile)
    .on("change", syncFile)
    .on("unlink", (p) => {
      const name = path.basename(p, path.extname(p));
      const dest = path.join(destBase, name + ".jsx");
      try {
        fs.unlinkSync(dest);
        console.log("Removed", path.relative(repoRoot, dest));
      } catch (e) {}
    });
} else {
  syncAll();
}
