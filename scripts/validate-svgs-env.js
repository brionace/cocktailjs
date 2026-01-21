const fs = require("fs");
const path = require("path");

const checks = [];

function hasModule(name) {
  try {
    require.resolve(name);
    return true;
  } catch (e) {
    return false;
  }
}

checks.push({
  name: "babel.config.json",
  ok: fs.existsSync(path.join(process.cwd(), "babel.config.json")),
});
[
  "@babel/core",
  "@babel/register",
  "react",
  "react-dom",
  "@babel/preset-env",
  "@babel/preset-react",
  "@babel/preset-typescript",
].forEach((m) => {
  checks.push({ name: `module:${m}`, ok: hasModule(m) });
});

checks.push({
  name: "render script",
  ok: fs.existsSync(
    path.join(process.cwd(), "scripts", "render-components-to-svgs.cjs")
  ),
});
checks.push({
  name: "manifest",
  ok: fs.existsSync(
    path.join(process.cwd(), "public", "svgs", "manifest.json")
  ),
});

console.log("SVG build environment validation");
let ok = true;
for (const c of checks) {
  console.log(c.ok ? "OK  " : "MISSING", " - ", c.name);
  if (!c.ok) ok = false;
}
if (!ok) {
  console.log(
    "\nOne or more required items are missing. Run `pnpm install` to install devDependencies, and ensure `babel.config.json` exists."
  );
  process.exit(2);
}
console.log(
  "\nAll checks passed. You can run `pnpm run render:svgs` to regenerate SVGs."
);
process.exit(0);
