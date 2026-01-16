const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const publicSvgs = path.join(repoRoot, "public", "svgs");
const pkgDist = path.join(repoRoot, "packages", "cocktail-ui", "dist");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function buildAssetsMap(svgsRoot, outFile) {
  const map = {};
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) {
        walk(p);
      } else if (name.endsWith(".svg")) {
        const rel = path.relative(svgsRoot, p).replace(/\\/g, "/");
        const key = rel.replace(/\.svg$/i, "");
        const svg = fs.readFileSync(p, "utf8");
        map[key] = svg;
      }
    }
  }
  walk(svgsRoot);
  const content = "module.exports = " + JSON.stringify(map, null, 2) + ";\n";
  fs.writeFileSync(outFile, content, "utf8");
}

function main() {
  if (!fs.existsSync(publicSvgs)) {
    console.error("No public/svgs directory found. Run renderer first.");
    process.exit(1);
  }
  ensureDir(pkgDist);
  // Copy svgs
  const destSvgs = path.join(pkgDist, "svgs");
  copyDir(publicSvgs, destSvgs);
  // Build assets map
  const outMap = path.join(pkgDist, "assets-map.js");
  buildAssetsMap(publicSvgs, outMap);
  console.log("Exported svgs to", destSvgs);
  console.log("Wrote assets map to", outMap);
}

if (require.main === module) main();
