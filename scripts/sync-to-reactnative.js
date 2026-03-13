#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(repoRoot, "packages", "cocktail-ui", "src");
const destRoot = path.join(
  repoRoot,
  "packages",
  "cocktailjs-reactnative",
  "src",
);

// DOM SVG tag → react-native-svg PascalCase component
const tagMap = {
  svg: "Svg",
  path: "Path",
  rect: "Rect",
  circle: "Circle",
  ellipse: "Ellipse",
  g: "G",
  line: "Line",
  polygon: "Polygon",
  polyline: "Polyline",
  defs: "Defs",
  linearGradient: "LinearGradient",
  radialGradient: "RadialGradient",
  stop: "Stop",
  use: "Use",
  text: "Text",
  tspan: "TSpan",
};

function detectUsedTags(src) {
  const used = new Set();
  for (const [dom, rn] of Object.entries(tagMap)) {
    // Match opening tags like <svg, <path, <rect — must NOT be preceded by
    // a word-char (avoids matching inside attribute values or other words).
    const openRe = new RegExp(`<${dom}(\\s|>|\\/)`, "g");
    if (openRe.test(src)) used.add(rn);
  }
  return used;
}

function transformSource(srcText) {
  let out = String(srcText);

  // Detect which SVG tags are used before transforming
  const usedTags = detectUsedTags(out);

  // Replace DOM SVG tags with react-native-svg PascalCase equivalents
  for (const [dom, rn] of Object.entries(tagMap)) {
    const openRe = new RegExp(`<${dom}(\\b|[ \\t>/])`, "g");
    out = out.replace(openRe, `<${rn}$1`);
    const closeRe = new RegExp(`</${dom}>`, "g");
    out = out.replace(closeRe, `</${rn}>`);
  }

  // Build the react-native-svg import line
  const hasSvg = usedTags.has("Svg");
  const namedImports = Array.from(usedTags)
    .filter((t) => t !== "Svg")
    .sort();

  let rnImport = "";
  if (hasSvg && namedImports.length) {
    rnImport = `import Svg, { ${namedImports.join(", ")} } from "react-native-svg";`;
  } else if (hasSvg) {
    rnImport = `import Svg from "react-native-svg";`;
  } else if (namedImports.length) {
    rnImport = `import { ${namedImports.join(", ")} } from "react-native-svg";`;
  }

  // Replace existing React import with React + react-native-svg import
  if (rnImport) {
    out = out.replace(
      /import\s+React\s+from\s+["']react["'];?\s*\n/,
      `import React from "react";\n${rnImport}\n`,
    );
  }

  // Normalize line endings
  out = out.replace(/\r\n/g, "\n");
  if (!out.endsWith("\n")) out += "\n";
  return out;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function syncGlasses() {
  const srcDir = path.join(srcRoot, "components", "glasses");
  const destDir = path.join(destRoot, "components", "glasses");
  ensureDir(destDir);

  const files = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(jsx|js)$/.test(f) && !f.includes(".bak"));

  for (const f of files) {
    const srcPath = path.join(srcDir, f);
    const srcText = fs.readFileSync(srcPath, "utf8");
    const transformed = transformSource(srcText);
    const destPath = path.join(destDir, f);
    fs.writeFileSync(destPath, transformed, "utf8");
    console.log(
      "Synced",
      path.relative(repoRoot, srcPath),
      "->",
      path.relative(repoRoot, destPath),
    );
  }

  return files;
}

function syncLiquid() {
  const srcPath = path.join(srcRoot, "components", "Liquid.jsx");
  const destDir = path.join(destRoot, "components");
  ensureDir(destDir);

  if (!fs.existsSync(srcPath)) {
    console.warn("Liquid.jsx not found at", srcPath);
    return;
  }

  const srcText = fs.readFileSync(srcPath, "utf8");
  const transformed = transformSource(srcText);
  const destPath = path.join(destDir, "Liquid.jsx");
  fs.writeFileSync(destPath, transformed, "utf8");
  console.log(
    "Synced",
    path.relative(repoRoot, srcPath),
    "->",
    path.relative(repoRoot, destPath),
  );
}

function syncUtils() {
  const srcDir = path.join(srcRoot, "utils");
  const destDir = path.join(destRoot, "utils");
  ensureDir(destDir);

  if (!fs.existsSync(srcDir)) return;

  const files = fs.readdirSync(srcDir).filter((f) => /\.(js|jsx)$/.test(f));
  for (const f of files) {
    const srcPath = path.join(srcDir, f);
    const destPath = path.join(destDir, f);
    fs.copyFileSync(srcPath, destPath);
    console.log(
      "Copied",
      path.relative(repoRoot, srcPath),
      "->",
      path.relative(repoRoot, destPath),
    );
  }
}

function syncGlassesMetadata() {
  const srcPath = path.join(srcRoot, "glasses.js");
  const destPath = path.join(destRoot, "glasses.js");
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(
      "Copied",
      path.relative(repoRoot, srcPath),
      "->",
      path.relative(repoRoot, destPath),
    );
  }
}

function generateIndex(glassFiles) {
  const destDir = destRoot;
  const names = glassFiles.map((f) => path.basename(f, path.extname(f))).sort();

  const imports = [
    `import Liquid from "./components/Liquid";`,
    ...names.map((n) => `import ${n} from "./components/glasses/${n}.jsx";`),
    `import glasses from "./glasses";`,
  ];

  const allExports = ["Liquid", ...names, "glasses"];

  const lines = [
    ...imports,
    "",
    "export {",
    ...allExports.map((e) => `  ${e},`),
    "};",
    "",
    "export default {",
    ...allExports.map((e) => `  ${e},`),
    "};",
    "",
  ];

  const indexPath = path.join(destDir, "index.js");
  fs.writeFileSync(indexPath, lines.join("\n"), "utf8");
  console.log("Generated", path.relative(repoRoot, indexPath));
}

function main() {
  console.log("Syncing cocktail-ui -> cocktailjs-reactnative");
  console.log("Source:", path.relative(repoRoot, srcRoot));
  console.log("Destination:", path.relative(repoRoot, destRoot));
  console.log("");

  const glassFiles = syncGlasses();
  syncLiquid();
  syncUtils();
  syncGlassesMetadata();
  generateIndex(glassFiles);

  console.log(
    "\nDone! Synced",
    glassFiles.length,
    "glasses + Liquid + utils + index",
  );
}

main();
