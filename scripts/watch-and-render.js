#!/usr/bin/env node
/* Watch assets and render changed components into public/svgs.
   Run with: node -r @babel/register scripts/watch-and-render.js
*/

const chokidar = require("chokidar");
const path = require("path");
const { execFile } = require("child_process");

const watchDirs = ["packages/cocktail-ui/svgs/glasses"];
const watcher = chokidar.watch(watchDirs, {
  ignored: /(^|[\\\/])\../,
  ignoreInitial: true,
});

watcher.on("change", (file) => {
  console.log("Changed", file);
  try {
    const fs = require("fs");
    const rel = path.relative(process.cwd(), file);
    const parts = rel.split(path.sep);
    // expect packages/cocktail-ui/svgs/<type>/<name>.svg
    if (parts.length < 5) return;
    const type = parts[3] || "glasses";
    const name = path.basename(file, path.extname(file));
    const destDir = path.join("public", "svgs", type);
    fs.mkdirSync(destDir, { recursive: true });
    const out = path.join(destDir, `${name}.svg`);
    // copy updated svg to public svgs
    fs.copyFileSync(file, out);
    console.log("Copied", rel, "->", out);

    // rebuild manifest using cocktail-ui svgs as authoritative source
    const sourceRoot = path.join(process.cwd(), "packages", "cocktail-ui", "svgs");
    const svgsRoot = path.join(process.cwd(), "public", "svgs");
    const manifest = {};
    for (const t of ["glasses"]) {
      const srcDir = path.join(sourceRoot, t);
      if (!fs.existsSync(srcDir)) continue;
      manifest[t] = manifest[t] || {};
      for (const fname of fs.readdirSync(srcDir)) {
        const ext = path.extname(fname).toLowerCase();
        if (ext !== ".svg") continue;
        const base = path.basename(fname, ext);
        const candidate = path.join(svgsRoot, t, `${base}.svg`);
        if (fs.existsSync(candidate)) {
          const relp = path.relative(svgsRoot, candidate).replace(/\\/g, "/");
          manifest[t][base] = { svgPath: `/svgs/${relp}` };
        } else {
          manifest[t][base] = null;
        }
      }
    }

    const manifestPath = path.join("public", "svgs", "manifest.json");
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    console.log("Updated", manifestPath);

    // notify admin server
    try {
      const http = require("http");
      const payload = JSON.stringify({ type: "render", file: rel });
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port: process.env.PORT || 3000,
          path: "/__notify",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload),
          },
        },
        (res) => res.on("data", () => {}),
      );
      req.on("error", () => {});
      req.write(payload);
      req.end();
    } catch (e) {
      // ignore notify failures in dev tooling
    }
  } catch (e) {
    console.error("Failed handling change", e);
  }
});

watcher.on("ready", () => console.log("Watching", watchDirs.join(", ")));
watcher.on("error", (e) => console.error("Watcher error", e));
