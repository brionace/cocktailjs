#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const assetsRoot = path.join(projectRoot, "assets");
const targetRoot = path.join(
  projectRoot,
  "packages",
  "cocktailjs-react",
  "src",
  "components",
);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readDirFiles(dir) {
  try {
    return fs.readdirSync(dir).filter((f) => /\.(js|jsx|ts|tsx)$/.test(f));
  } catch (e) {
    return [];
  }
}

const tagMap = {
  Svg: "svg",
  Rect: "rect",
  Path: "path",
  Defs: "defs",
  LinearGradient: "linearGradient",
  Stop: "stop",
  G: "g",
  Circle: "circle",
  Ellipse: "ellipse",
  Polygon: "polygon",
  Line: "line",
  Text: "text",
};

function transformContent(src) {
  // remove react-native-svg import
  src = src.replace(
    /import\s+Svg\s*,\s*\{[^}]+\}\s*from\s+['"]react-native-svg['"];?/g,
    "",
  );
  src = src.replace(
    /import\s+\{[^}]+\}\s*from\s+['"]react-native-svg['"];?/g,
    "",
  );
  // replace Svg imports like: import Svg, { Rect } from "react-native-svg";
  src = src.replace(/import\s+Svg\s*from\s+['"]react-native-svg['"];?/, "");

  // Replace tag names
  for (const [from, to] of Object.entries(tagMap)) {
    const openRe = new RegExp(`<${from}(\\b|[ \t>])`, "g");
    const closeRe = new RegExp(`</${from}>`, "g");
    src = src.replace(openRe, `<${to}$1`);
    src = src.replace(closeRe, `</${to}>`);
  }

  // If file used Svg component as wrapper, ensure svg has xmlns
  src = src.replace(/<svg([^>]*?)>/, (m, attrs) => {
    if (/xmlns=/.test(attrs)) return `<svg${attrs}>`;
    return `<svg xmlns=\"http://www.w3.org/2000/svg\"${attrs}>`;
  });

  // adjust default export extension hint (no-op)
  return src;
}

function copyAndTransform(srcPath, destPath) {
  const src = fs.readFileSync(srcPath, "utf8");
  const out = transformContent(src);
  fs.writeFileSync(destPath, out, "utf8");
  console.log("Wrote", destPath);
}

function copyDirAssets(type) {
  const srcDir = path.join(assetsRoot, type);
  const destDir = path.join(targetRoot, type);
  ensureDir(destDir);
  const files = readDirFiles(srcDir);
  files.forEach((f) => {
    const src = path.join(srcDir, f);
    const base = path.basename(f, path.extname(f));
    const dest = path.join(destDir, `${base}.jsx`);
    copyAndTransform(src, dest);
  });
}

function copySingle(fileName, destRel) {
  const src = path.join(projectRoot, fileName);
  const dest = path.join(
    projectRoot,
    "packages",
    "cocktailjs-react",
    "src",
    destRel,
  );
  ensureDir(path.dirname(dest));
  copyAndTransform(src, dest);
}

function generateIndex() {
  const compRoot = path.join(
    projectRoot,
    "packages",
    "cocktailjs-react",
    "src",
  );
  const glassesDir = path.join(compRoot, "components", "glasses");

  const imports = [];
  const exports = [];

  function addFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jsx"));
    files.forEach((f) => {
      const name = path.basename(f, ".jsx");
      const rel = `./components/${path.basename(dir)}/${f}`;
      imports.push(`import ${name} from '${rel}';`);
      exports.push(name);
    });
  }

  addFiles(glassesDir);

  // Always include Liquid if present
  if (fs.existsSync(path.join(compRoot, "components", "Liquid.jsx"))) {
    imports.unshift(`import Liquid from './components/Liquid';`);
    exports.unshift("Liquid");
  }

  const indexSource = `${imports.join("\n")}\n\nexport { ${exports.join(", ")} };\n\nexport default { ${exports.join(", ")} };\n`;
  fs.writeFileSync(path.join(compRoot, "index.js"), indexSource, "utf8");
  console.log("Wrote", path.join(compRoot, "index.js"));
}

function main() {
  ensureDir(targetRoot);
  console.log("Copying glasses...");
  copyDirAssets("glasses");

  // copy Liquid and utils
  try {
    copySingle("assets/Liquid.js", "components/Liquid.jsx");
  } catch (e) {
    console.warn("Liquid not copied:", e.message);
  }
  try {
    copySingle("utils/theme.js", "utils/theme.js");
  } catch (e) {
    console.warn("theme not copied:", e.message);
  }

  generateIndex();
  console.log("Export to cocktailjs-react complete.");
}

main();
