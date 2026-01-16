const path = require("path");
const fs = require("fs");
const express = require("express");
const { spawn } = require("child_process");

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

const publicDir = path.join(__dirname, "public");
const svgsDir = path.join(publicDir, "svgs");
const manifestPath = path.join(svgsDir, "manifest.json");

app.use(express.json());
app.use(express.static(publicDir));

app.get("/api/assets", (req, res) => {
  try {
    const includeSvg =
      req.query.includeSvg === "1" || req.query.includeSvg === "true";
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (includeSvg) {
      // embed svg content for each entry
      const out = { glasses: {}, garnishes: {} };
      for (const type of Object.keys(manifest)) {
        for (const key of Object.keys(manifest[type])) {
          const entry = Object.assign({}, manifest[type][key]);
          try {
            const svgFile = path.join(
              publicDir,
              entry.svgPath.replace(/^\//, "")
            );
            if (fs.existsSync(svgFile))
              entry.svg = fs.readFileSync(svgFile, "utf8");
          } catch (e) {
            // ignore read errors
          }
          out[type][key] = entry;
        }
      }
      return res.json({ data: out });
    }
    res.json({ data: manifest });
  } catch (err) {
    res.status(500).json({ error: "Manifest not found" });
  }
});

// GET single asset
app.get("/api/assets/:type/:name", (req, res) => {
  try {
    const includeSvg =
      req.query.includeSvg === "1" || req.query.includeSvg === "true";
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const { type, name } = req.params;
    if (!manifest[type] || !manifest[type][name])
      return res.status(404).json({ error: "Not found" });
    const entry = Object.assign({}, manifest[type][name]);
    if (includeSvg && entry.svgPath) {
      try {
        const svgFile = path.join(publicDir, entry.svgPath.replace(/^\//, ""));
        if (fs.existsSync(svgFile))
          entry.svg = fs.readFileSync(svgFile, "utf8");
      } catch (e) {}
    }
    return res.json({ asset: entry });
  } catch (err) {
    return res.status(500).json({ error: "Manifest read error" });
  }
});

// PUT update single asset (blurb and/or svg)
app.put("/api/assets/:type/:name", (req, res) => {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const { type, name } = req.params;
    if (!manifest[type] || !manifest[type][name])
      return res.status(404).json({ error: "Not found" });
    const entry = manifest[type][name];
    const { blurb, svg } = req.body || {};
    if (typeof blurb === "string") entry.blurb = blurb;
    if (typeof svg === "string") {
      // write svg file
      const targetDir = path.join(publicDir, "svgs", type);
      if (!fs.existsSync(targetDir))
        fs.mkdirSync(targetDir, { recursive: true });
      const targetPath = path.join(targetDir, `${name}.svg`);
      fs.writeFileSync(targetPath, svg, "utf8");
      entry.svgPath = `/svgs/${type}/${name}.svg`;
    }
    // write manifest back
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    const out = Object.assign({}, entry);
    if (typeof svg === "string") out.svg = svg;
    return res.json({ status: "ok", asset: out });
  } catch (err) {
    console.error("Failed to update asset", err);
    return res.status(500).json({ status: "error", message: String(err) });
  }
});

app.post("/api/render", (req, res) => {
  // Trigger the SSR renderer script to rebuild svgs into public/svgs
  const renderer = path.join(
    __dirname,
    "scripts",
    "render-components-to-svgs.cjs"
  );
  if (!fs.existsSync(renderer))
    return res.status(500).json({ error: "Renderer not found" });

  const child = spawn("node", [renderer], { stdio: "inherit" });
  child.on("close", (code) => {
    if (code === 0) return res.json({ ok: true });
    res.status(500).json({ ok: false, code });
  });
});

function tryListen(startPort, attempts = 10) {
  let p = startPort;
  const tryOne = () => {
    const server = app.listen(p, () => {
      console.log(`CocktailJS admin server running at http://localhost:${p}`);
    });
    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.warn(`Port ${p} in use, trying ${p + 1}...`);
        p += 1;
        if (p < startPort + attempts) return tryOne();
        console.error("No available ports found");
        process.exit(1);
      } else {
        console.error("Server error", err);
        process.exit(1);
      }
    });
  };
  tryOne();
}

tryListen(DEFAULT_PORT, 20);

module.exports = app;
