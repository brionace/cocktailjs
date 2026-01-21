const fs = require("fs");
const path = require("path");

const manifestPath = path.join(
  process.cwd(),
  "public",
  "svgs",
  "manifest.json"
);
if (!fs.existsSync(manifestPath)) {
  console.error("manifest not found");
  process.exit(2);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const report = [];
for (const type of Object.keys(manifest)) {
  for (const name of Object.keys(manifest[type])) {
    const entry = manifest[type][name];
    if (!entry) {
      report.push({ type, name, status: "no-entry" });
      continue;
    }
    if (!entry.svgPath) {
      report.push({ type, name, status: "no-svgPath" });
      continue;
    }
    const svgFile = path.join(
      process.cwd(),
      "public",
      entry.svgPath.replace(/^\//, "")
    );
    if (!fs.existsSync(svgFile))
      report.push({ type, name, status: "missing-file", svgFile });
    else {
      const txt = fs.readFileSync(svgFile, "utf8");
      const hasSvg = /<svg[\s>]/i.test(txt);
      report.push({
        type,
        name,
        status: hasSvg ? "ok" : "no-svg-in-file",
        svgFile,
      });
    }
  }
}

const groups = report.reduce((acc, r) => {
  acc[r.status] = acc[r.status] || [];
  acc[r.status].push(r);
  return acc;
}, {});
console.log("SVGS REPORT");
for (const k of Object.keys(groups)) {
  console.log(`\n== ${k} (${groups[k].length})`);
  groups[k]
    .slice(0, 50)
    .forEach((r) =>
      console.log(`${r.type}/${r.name}${r.svgFile ? " -> " + r.svgFile : ""}`)
    );
}
process.exit(0);
