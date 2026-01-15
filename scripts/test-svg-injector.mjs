#!/usr/bin/env node
// Small test script to exercise the server-side SVG injector by calling
// `getGlass('PilsnerGlass', { includeSvg: true, liquidColour: '#cfc' })`

import path from "path";

async function run() {
  try {
    const mod = await import("../src/services/assetsService.js");
    const sanitizer = await import("../src/utils/colorSanitizer.js");
    const getGlass = mod.getGlass;
    if (typeof getGlass !== "function") {
      console.error("getGlass not found in assetsService");
      process.exit(2);
    }

    const color = "#cfc";
    const clean = sanitizer.sanitizeColor
      ? sanitizer.sanitizeColor(color)
      : sanitizer.default(color);

    const res = await getGlass("PilsnerGlass", {
      includeSvg: true,
      liquidColour: color,
    });
    if (!res) {
      console.error("Asset not found");
      process.exit(3);
    }
    const svg = res.svg || "";
    console.log("--- SVG START ---");
    console.log(svg.slice(0, 2000));
    console.log("--- SVG END ---");

    const hasLiquidClass =
      svg.includes('class="liquid"') || svg.includes("class='liquid'");
    console.log("sanitized color expected:", clean);
    console.log("hasLiquidClass:", hasLiquidClass);
    console.log(
      "svg contains sanitized color:",
      clean ? svg.includes(clean) : false
    );

    if (!hasLiquidClass) {
      console.error("FAIL: .liquid element not present in SVG");
      process.exit(4);
    }
    if (clean && svg.includes(clean)) {
      console.log(`PASS: sanitized color ${clean} injected into SVG`);
      process.exit(0);
    }

    console.error("FAIL: sanitized color not found in SVG");
    process.exit(5);
  } catch (e) {
    console.error("ERROR running test:", e);
    process.exit(1);
  }
}

run();
