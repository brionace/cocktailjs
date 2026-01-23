#!/usr/bin/env node
/* Watch assets and render changed components into public/svgs.
   Run with: node -r @babel/register scripts/watch-and-render.js
*/

const chokidar = require("chokidar");
const path = require("path");
const { execFile } = require("child_process");

const watchDirs = ["assets/glasses"];
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

        // Prefer authoritative source: assets directory listing.
        // This prevents stale or auxiliary SVGs in public/svgs (like
        // GlassTemplate.svg or legacy Coupe.svg) from being exposed as
        // canonical assets. We map each asset file under assets/<type>
        // to public/svgs/<type>/<Base>.svg when present.
        const assetsRoot = path.join(process.cwd(), "assets");
        const svgsRoot = path.join(process.cwd(), "public", "svgs");
        const manifest = {};

        for (const type of ["glasses"]) {
          const srcDir = path.join(assetsRoot, type);
          if (!fs.existsSync(srcDir)) continue;
          manifest[type] = manifest[type] || {};
          for (const name of fs.readdirSync(srcDir)) {
            const ext = path.extname(name).toLowerCase();
            if (![".js", ".jsx", ".ts", ".tsx"].includes(ext)) continue;
            const base = path.basename(name, ext);
            const candidate = path.join(svgsRoot, type, `${base}.svg`);
            if (fs.existsSync(candidate)) {
              const relp = path
                .relative(svgsRoot, candidate)
                .replace(/\\\\/g, "/");
              manifest[type][base] = { svgPath: `/svgs/${relp}` };
            } else {
              // if svg not present yet, still include placeholder (optional)
              manifest[type][base] = null;
            }
          }
        }

        const manifestPath = path.join("public", "svgs", "manifest.json");
        fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
        fs.writeFileSync(
          manifestPath,
          JSON.stringify(manifest, null, 2),
          "utf8"
        );
        console.log("Updated", manifestPath);
        // Notify local admin server so connected admin UIs can refresh.
        try {
          const http = require('http');
          const payload = JSON.stringify({ type: 'render', file: rel });
          const req = http.request({
            hostname: '127.0.0.1',
            port: process.env.PORT || 3000,
            path: '/__notify',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(payload),
            },
          }, (res) => {
            // drain
            res.on('data', () => {});
          });
          req.on('error', () => {});
          req.write(payload);
          req.end();
        } catch (e) {
          // ignore notify failures in dev tooling
        }
      } catch (e) {
        console.error("Failed to update manifest", e);
      }
    }
  );
});

watcher.on("ready", () => console.log("Watching", watchDirs.join(", ")));
watcher.on("error", (e) => console.error("Watcher error", e));
