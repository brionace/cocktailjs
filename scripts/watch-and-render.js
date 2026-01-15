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
    }
  );
});

watcher.on("ready", () => console.log("Watching", watchDirs.join(", ")));
watcher.on("error", (e) => console.error("Watcher error", e));
