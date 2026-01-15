import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { normalizeGlass } from "./utils.js";

export default function GlassIcon({ glass, size = 32 } = {}) {
  const key = normalizeGlass(glass);
  const assetPath = path.join(__dirname, "..", "assets", `${key}.svg`);
  try {
    if (fs.existsSync(assetPath)) {
      return fs.readFileSync(assetPath, "utf8");
    }
  } catch (e) {
    // ignore and fallback
  }
  // fallback generic SVG
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    size +
    '" height="' +
    size +
    '"><rect width="100%" height="100%" fill="#EEE"/></svg>'
  );
}
