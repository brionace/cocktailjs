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
  // clear any cached versions
  delete require.cache[require.resolve(absComp)];
  let mod;
  try {
    mod = require(absComp);
  } catch (err) {
    console.error("Error requiring component:", err.message);
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
