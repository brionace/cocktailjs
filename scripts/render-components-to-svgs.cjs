#!/usr/bin/env node
/*
  This script uses @babel/register to transpile JSX imports on the fly,
  imports each component under assets/glasses and assets/garnishes, and
  uses ReactDOMServer.renderToStaticMarkup to render the component tree to
  an SVG string which is written to public/svgs/.../*.svg.

  It expects components to default-export a React component.
*/
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

// Register babel for JSX -> JS using automatic runtime
require("@babel/register")({
  presets: [
    ["@babel/preset-env", { targets: { node: "14" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
  extensions: [".js", ".jsx", ".ts", ".tsx"],
});

// Ensure React is available globally for modules that expect it
global.React = require("react");

const React = require("react");
const ReactDOMServer = require("react-dom/server");

// Load theme shim so components that reference `theme` globally or via import
// have a value available during server-side rendering.
try {
  // require the project's utils/theme which also assigns global.theme and
  // provides both named and default exports (see utils/theme.js)
  require(path.join(repoRoot, "utils", "theme"));
} catch (e) {
  // ignore if missing
}

const repoRoot = process.cwd();
const dirs = [
  {
    src: path.join(repoRoot, "assets", "garnishes"),
    dest: path.join(repoRoot, "public", "svgs", "garnishes"),
  },
  {
    src: path.join(repoRoot, "assets", "glasses"),
    dest: path.join(repoRoot, "public", "svgs", "glasses"),
  },
];

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function processEntry(srcFile, destFile) {
  try {
    // clear from require cache to allow re-running
    delete require.cache[require.resolve(srcFile)];
    const comp = require(srcFile);
    const Component = comp && comp.default ? comp.default : comp;
    // If the module doesn't export a callable React component (e.g., it
    // exports a map of named elements or utilities), skip it and return a
    // clear status so the caller can continue.
    if (!Component || typeof Component !== "function") {
      return { status: "not-component" };
    }
    const element = React.createElement(Component, {});
    const markup = ReactDOMServer.renderToStaticMarkup(element);
    // If markup doesn't contain <svg>, attempt to find nested svg tags
    if (!markup.includes("<svg")) {
      return { status: "no-svg-output", markup };
    }
    // Ensure xml header and pretty-ish formatting
    let svgText = markup.startsWith("<?xml")
      ? markup
      : `<?xml version="1.0" encoding="UTF-8"?>\n${markup}`;

    // Post-process: normalize whitespace inside quoted attribute values
    // to avoid newlines inside attributes which can break some XML parsers
    // (e.g. react-native-svg on iOS). Collapse runs of whitespace to a
    // single space and trim leading/trailing space inside each quoted value.
    svgText = svgText.replace(/(["'])([\s\S]*?)\1/g, (m, quote, val) => {
      const cleaned = val.replace(/\s+/g, " ").trim();
      return quote + cleaned + quote;
    });

    await fsp.writeFile(destFile, svgText, "utf8");
    return { status: "ok" };
  } catch (e) {
    return { status: "error", error: String(e) };
  }
}

async function run() {
  const summary = [];
  for (const d of dirs) {
    await ensureDir(d.dest);
    let files = [];
    try {
      files = await fsp.readdir(d.src);
    } catch (e) {
      console.warn("No directory", d.src);
      continue;
    }
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      // process common component script extensions (.js/.jsx/.ts/.tsx)
      if (![".js", ".jsx", ".ts", ".tsx"].includes(ext)) continue;
      const srcPath = path.join(d.src, f);
      const base = path.basename(f, ext);
      const destPath = path.join(d.dest, base + ".svg");
      const res = await processEntry(srcPath, destPath);
      summary.push({ file: srcPath, dest: destPath, ...res });
      console.log(f, res.status, res.error ? res.error : "");
    }
  }
  console.log("Done. Summary:", summary.length, "items");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
