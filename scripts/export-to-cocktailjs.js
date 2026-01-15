#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const exportRoot = path.join(root, "export", "cocktailjs");

const toCopy = [
  "public/svgs",
  "assets",
  "packages/glass-ui",
  "scripts",
  "data/assets/aliases.json",
];

async function copyItem(src, dest) {
  const stat = await fs.promises.stat(src);
  if (stat.isDirectory()) {
    await fs.promises.mkdir(dest, { recursive: true });
    for (const entry of await fs.promises.readdir(src)) {
      await copyItem(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.copyFile(src, dest);
  }
}

async function writePackageJson() {
  const pkgPath = path.join(exportRoot, "package.json");
  let base = {};
  try {
    const src = path.join(root, "packages", "glass-ui", "package.json");
    base = JSON.parse(await fs.promises.readFile(src, "utf8"));
  } catch (e) {
    // ignore
  }
  const pkg = {
    name: "cocktailjs",
    version: base.version || "0.0.1",
    description: base.description || "Glass and garnish assets for cocktails",
    main: "dist/index.cjs",
    module: "dist/index.js",
    files: ["dist", "assets", "src"],
    scripts: {
      build: "rollup -c",
    },
    license: base.license || "MIT",
  };
  await fs.promises.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
}

async function writeReadme() {
  const md = `# cocktailjs export

This folder is an export of the assets and build tooling for glasses and garnishes.

Next steps:

1. Create a new git repo (cocktailjs) and copy these files into it, or push this folder as the initial commit.
2. Run \`pnpm install\` and \`pnpm run build\` to verify the package builds.
3. Update CI to publish the package (or deploy assets to a CDN).
`;
  await fs.promises.writeFile(path.join(exportRoot, "README.md"), md);
}

async function main() {
  console.log("Exporting assets to", exportRoot);
  await fs.promises.rm(exportRoot, { recursive: true, force: true });
  for (const item of toCopy) {
    const src = path.join(root, item);
    if (!fs.existsSync(src)) {
      console.warn("Skipping missing:", item);
      continue;
    }
    const dest = path.join(exportRoot, item.replace(/^(public\/)*/i, ""));
    await copyItem(src, dest);
  }
  await writePackageJson();
  await writeReadme();
  console.log("Export complete. Review export/cocktailjs before creating new repo.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
