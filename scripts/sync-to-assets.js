#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const srcDir = path.join(
  repoRoot,
  "packages",
  "cocktail-ui",
  "src",
  "components",
  "glasses",
);
const destDir = path.join(repoRoot, "assets", "glasses");

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
    const openRe = new RegExp(`<${dom}(\\s|>|\\/)`, "g");
    if (openRe.test(src)) used.add(rn);
  }
  return used;
}

function transformSource(srcText) {
  let out = String(srcText);

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

function main() {
  console.log("Syncing cocktail-ui glasses -> assets/glasses");
  console.log("Source:", path.relative(repoRoot, srcDir));
  console.log("Destination:", path.relative(repoRoot, destDir));
  console.log("");

  fs.mkdirSync(destDir, { recursive: true });

  const files = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(jsx|js)$/.test(f) && !f.includes(".bak"));

  for (const f of files) {
    const srcPath = path.join(srcDir, f);
    const srcText = fs.readFileSync(srcPath, "utf8");
    const transformed = transformSource(srcText);
    // Assets use .js extension
    const destName = path.basename(f, path.extname(f)) + ".js";
    const destPath = path.join(destDir, destName);
    fs.writeFileSync(destPath, transformed, "utf8");
    console.log(
      "Synced",
      path.relative(repoRoot, srcPath),
      "->",
      path.relative(repoRoot, destPath),
    );
  }

  console.log("\nDone! Synced", files.length, "glasses to assets/glasses/");
}

main();
