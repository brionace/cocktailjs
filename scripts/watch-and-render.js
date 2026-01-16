#!/usr/bin/env node
/* Watch assets and render changed components into public/svgs.
   Run with: node -r @babel/register scripts/watch-and-render.js
*/

const chokidar = require("chokidar");
const path = require("path");
const { execFile } = require("child_process");

const watchDirs = ["assets/glasses", "assets/garnishes"];
const watcher = chokidar.watch(watchDirs, {
  ignored: /(^|[\\\/])\../,
  ignoreInitial: true,
});

watcher.on("change", (file) => {
  console.log("Changed", file);
  const rel = path.relative(process.cwd(), file);
  const parts = rel.split(path.sep);
  // expect assets/<type>/<Name>.*
  if (parts.length < 3) return;
  const type = parts[1];
  const name = path.basename(file, path.extname(file));
  const out = path.join("public", "svgs", type, `${name}.svg`);
  execFile(
    "node",
    ["-r", "@babel/register", "scripts/render-component-to-svg.js", rel, out],
    (err, stdout, stderr) => {
      if (err) console.error("render error", err);
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
      // rebuild manifest after render
      try {
        const fs = require("fs");
        const path = require("path");
        const svgsRoot = path.join("public", "svgs");
        function walk(dir, obj) {
          for (const name of fs.readdirSync(dir)) {
            const p = path.join(dir, name);
            if (fs.statSync(p).isDirectory()) {
              walk(p, obj);
            } else if (name.endsWith(".svg")) {
              const relp = path.relative(svgsRoot, p).replace(/\\\\/g, "/");
              const key = relp.replace(/\.svg$/i, "");
              obj[key] = `/svgs/${relp}`;
            }
          }
        }
        const manifest = {};
        if (fs.existsSync(svgsRoot)) walk(svgsRoot, manifest);
        const manifestPath = path.join("public", "svgs", "manifest.json");
        fs.writeFileSync(
          manifestPath,
          JSON.stringify(manifest, null, 2),
          "utf8"
        );
        console.log("Updated", manifestPath);
      } catch (e) {
        console.error("Failed to update manifest", e);
      }
    }
  );
});

watcher.on("ready", () => console.log("Watching", watchDirs.join(", ")));
watcher.on("error", (e) => console.error("Watcher error", e));
