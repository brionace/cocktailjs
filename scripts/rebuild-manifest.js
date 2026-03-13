const fs = require("fs");
const path = require("path");

try {
  const sourceRoot = path.join(
    process.cwd(),
    "packages",
    "cocktail-ui",
    "svgs",
  );
  const svgsRoot = path.join(process.cwd(), "public", "svgs");
  const manifest = {};

  for (const type of ["glasses"]) {
    const srcDir = path.join(sourceRoot, type);
    if (!fs.existsSync(srcDir)) continue;
    manifest[type] = manifest[type] || {};
    for (const name of fs.readdirSync(srcDir)) {
      const ext = path.extname(name).toLowerCase();
      if (ext !== ".svg") continue;
      const base = path.basename(name, ext);
      const candidate = path.join(svgsRoot, type, `${base}.svg`);
      if (fs.existsSync(candidate)) {
        const relp = path.relative(svgsRoot, candidate).replace(/\\/g, "/");
        manifest[type][base] = { svgPath: `/svgs/${relp}` };
      } else {
        manifest[type][base] = null;
      }
    }
  }

  const manifestPath = path.join("public", "svgs", "manifest.json");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Wrote", manifestPath);
} catch (e) {
  console.error("Failed to rebuild manifest:", e);
  process.exit(1);
}
