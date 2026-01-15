#!/usr/bin/env node
import { getGlass } from "../src/services/assetsService.js";
import process from "process";

async function run() {
  const cases = [
    { name: "PilsnerGlass", colour: "#cfc", expected: "#ccffcc" },
    { name: "TikiGlass", colour: "#f06292", expected: "#f06292" },
  ];

  let failed = false;

  for (const c of cases) {
    try {
      const asset = await getGlass(c.name, {
        includeSvg: true,
        liquidColour: c.colour,
      });
      const svg = asset?.svg || "";
      const hasClass =
        /class=\"?\.?liquid\"?/.test(svg) ||
        /class=\'?(?:\.|)liquid\'?/.test(svg) ||
        /\.liquid/.test(svg);
      const hasColor = svg.toLowerCase().includes(c.expected.toLowerCase());
      console.log(`--- ${c.name} ---`);
      console.log("hasLiquidClass:", hasClass);
      console.log("svg contains sanitized color:", hasColor);
      if (!hasClass || !hasColor) {
        console.error(`FAIL: ${c.name} injection missing`);
        failed = true;
      } else {
        console.log(`PASS: ${c.name}`);
      }
    } catch (e) {
      console.error(`Error for ${c.name}:`, e?.message || e);
      failed = true;
    }
  }

  if (failed) {
    console.error("One or more tests failed");
    process.exit(1);
  }
  console.log("All tests passed");
  process.exit(0);
}

run();
