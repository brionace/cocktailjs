#!/usr/bin/env node
/* Renders a JS/TSX React component to a static SVG file.
   Usage: node -r @babel/register scripts/render-component-to-svg.js <componentPath> <outSvgPath>
   Example: node -r @babel/register scripts/render-component-to-svg.js assets/glasses/CollinsGlass.js public/svgs/glasses/CollinsGlass.svg
*/

const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

async function main() {
  const compPath = process.argv[2];
  const outPath = process.argv[3];
  if (!compPath || !outPath) {
    console.error(
      "Usage: node -r @babel/register scripts/render-component-to-svg.js <componentPath> <outSvgPath>"
    );
    process.exit(2);
  }

  const absComp = path.resolve(compPath);

  // Transpile to CommonJS into .tmp_render to avoid import interop/runtime JSX issues
  const babel = require("@babel/core");
  const tmpRoot = path.join(process.cwd(), ".tmp_render");
  const rel = path.relative(process.cwd(), absComp);
  const tmpPath = path.join(tmpRoot, rel);
  try {
    await fs.promises.mkdir(path.dirname(tmpPath), { recursive: true });
    const result = babel.transformFileSync(absComp, {
      filename: absComp,
      configFile: true,
      babelrc: true,
      ast: false,
      sourceMaps: false,
    });
    if (!result || !result.code) throw new Error("Babel transform failed");
    await fs.promises.writeFile(tmpPath, result.code, "utf8");
    // Mirror project-local helper directories (e.g., utils) so relative
    // imports inside transpiled modules resolve to real files.
    const srcUtils = path.join(process.cwd(), "utils");
    const destUtils = path.join(process.cwd(), ".tmp_render", "utils");
    try {
      if (fs.existsSync(srcUtils)) {
        // use recursive copy if available
        if (fs.promises.cp) {
          await fs.promises.cp(srcUtils, destUtils, { recursive: true });
        } else {
          // fallback: simple recursive copy
          const copyRecursive = async (src, dest) => {
            const stat = await fs.promises.stat(src);
            if (stat.isDirectory()) {
              await fs.promises.mkdir(dest, { recursive: true });
              const items = await fs.promises.readdir(src);
              for (const it of items)
                await copyRecursive(path.join(src, it), path.join(dest, it));
            } else {
              await fs.promises.copyFile(src, dest);
            }
          };
          await copyRecursive(srcUtils, destUtils);
        }
      }
    } catch (e) {
      // Non-fatal: proceed even if copying helpers fails
      console.warn(
        "Warning: failed to mirror utils into .tmp_render:",
        e && e.message ? e.message : e
      );
    }
  } catch (err) {
    console.error(
      "Error transpiling component:",
      err && err.message ? err.message : String(err)
    );
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  }

  // clear any cached versions and require the transpiled file
  delete require.cache[require.resolve(tmpPath)];
  let mod;
  try {
    mod = require(tmpPath);
  } catch (err) {
    console.error("Error requiring transpiled component:", err.message);
    console.error(err.stack);
    process.exit(1);
  }

  const Component = mod && (mod.default || mod) ? mod.default || mod : mod;

  if (!Component) {
    console.error(
      "Component did not export a React component default:",
      compPath
    );
    process.exit(1);
  }

  try {
    // Render with safe defaults: size 300 to match admin preview
    const element = React.createElement(Component, {
      size: 300,
      garnish: null,
    });
    let svgHtml = ReactDOMServer.renderToStaticMarkup(element);
    // Ensure outer <svg> has xmlns if missing
    if (!/^<svg[\s>]/i.test(svgHtml)) {
      svgHtml = `<svg xmlns="http://www.w3.org/2000/svg">${svgHtml}</svg>`;
    } else if (!/xmlns=/.test(svgHtml)) {
      svgHtml = svgHtml.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }

    await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
    await fs.promises.writeFile(outPath, svgHtml, "utf8");
    console.log("Wrote", outPath);
  } catch (err) {
    console.error("Render error:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
