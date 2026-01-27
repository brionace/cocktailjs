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

const repoRoot = process.cwd();

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
const dirs = [
  {
    src: path.join(repoRoot, "packages", "cocktailjs-react", "src", "components", "glasses"),
    dest: path.join(repoRoot, "public", "svgs", "glasses"),
  },
];

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function processEntry(srcFile, destFile) {
  try {
    // Transpile each source to CommonJS into .tmp_render so that imports
    // and JSX are resolved consistently at runtime.
    const babel = require("@babel/core");
    const rel = path.relative(repoRoot, srcFile);
    const tmpPath = path.join(repoRoot, ".tmp_render", rel);
    await fsp.mkdir(path.dirname(tmpPath), { recursive: true });
    const result = babel.transformFileSync(srcFile, {
      filename: srcFile,
      configFile: true,
      babelrc: true,
      ast: false,
      sourceMaps: false,
    });
    if (!result || !result.code) throw new Error("Babel transform failed");
    await fsp.writeFile(tmpPath, result.code, "utf8");
    // Mirror project-local helper directories (e.g., utils) so relative
    // imports inside transpiled modules resolve to real files when required
    const srcUtils = path.join(repoRoot, "utils");
    const destUtils = path.join(repoRoot, ".tmp_render", "utils");
    try {
      if (fs.existsSync(srcUtils)) {
        if (fsp.cp) {
          await fsp.cp(srcUtils, destUtils, { recursive: true });
        } else {
          const copyRecursive = async (src, dest) => {
            const stat = await fsp.stat(src);
            if (stat.isDirectory()) {
              await fsp.mkdir(dest, { recursive: true });
              const items = await fsp.readdir(src);
              for (const it of items)
                await copyRecursive(path.join(src, it), path.join(dest, it));
            } else {
              await fsp.copyFile(src, dest);
            }
          };
          await copyRecursive(srcUtils, destUtils);
        }
      }
    } catch (e) {
      console.warn(
        "Warning: failed to mirror utils into .tmp_render:",
        e && e.message ? e.message : e,
      );
    }

    // clear from require cache and require the transpiled file
    delete require.cache[require.resolve(tmpPath)];
    const comp = require(tmpPath);
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
  // Prepare a .tmp_render workspace by copying the entire assets tree and
  // transpiling source files to CommonJS so relative imports among components
  // resolve during require.
  const tmpRoot = path.join(repoRoot, ".tmp_render");
  try {
    // remove any previous tmp_render to avoid stale files
    if (fs.existsSync(tmpRoot)) {
      await fsp.rm(tmpRoot, { recursive: true, force: true });
    }
    // copy assets -> .tmp_render/assets
    const srcAssets = path.join(repoRoot, "assets");
    const destAssets = path.join(tmpRoot, "assets");
    // also copy project-local helpers so relative imports like ../../utils/*
    // inside transpiled modules resolve to the mirrored files
    const srcUtils = path.join(repoRoot, "utils");
    const destUtils = path.join(tmpRoot, "utils");
    const copyRecursive = async (src, dest) => {
      const stat = await fsp.stat(src);
      if (stat.isDirectory()) {
        await fsp.mkdir(dest, { recursive: true });
        const items = await fsp.readdir(src);
        for (const it of items)
          await copyRecursive(path.join(src, it), path.join(dest, it));
      } else {
        await fsp.copyFile(src, dest);
      }
    };
    await copyRecursive(srcAssets, destAssets);
    if (fs.existsSync(srcUtils)) {
      await copyRecursive(srcUtils, destUtils);
    }

    // Transpile all JS/TS files under .tmp_render/assets to CommonJS
    const babel = require("@babel/core");
    const walk = async (dir) => {
      const items = await fsp.readdir(dir);
      for (const it of items) {
        const p = path.join(dir, it);
        const st = await fsp.stat(p);
        if (st.isDirectory()) await walk(p);
        else {
          const ext = path.extname(p).toLowerCase();
          if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
            const result = babel.transformFileSync(p, {
              filename: p,
              configFile: true,
              babelrc: true,
              ast: false,
              sourceMaps: false,
            });
            if (result && result.code)
              await fsp.writeFile(p, result.code, "utf8");
          }
        }
      }
    };
    await walk(destAssets);
  } catch (e) {
    console.warn(
      "Preparing .tmp_render failed:",
      e && e.message ? e.message : e,
    );
  }
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
