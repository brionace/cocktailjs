#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const watchMode = argv.includes('--watch');

const repoRoot = path.resolve(__dirname, '..');
const src = path.join(repoRoot, 'assets', 'Liquid.js');
const dest = path.join(
  repoRoot,
  'packages',
  'cocktailjs-react',
  'src',
  'components',
  'Liquid.jsx'
);

function transformSource(srcText) {
  let out = String(srcText);

  // Replace react-native-svg import with plain React import
  out = out.replace(/import\s+React[\s\S]*?;\s*\n\s*import\s+Svg[\s\S]*?from\s+"react-native-svg";?/m, 'import React from "react";\n');

  // Map React Native SVG components to DOM SVG tags
  const tagMap = {
    Defs: 'defs',
    LinearGradient: 'linearGradient',
    Stop: 'stop',
    Path: 'path',
    Svg: 'svg',
  };
  for (const [from, to] of Object.entries(tagMap)) {
    // opening tags
    const openRe = new RegExp(`<\\s*${from}\\b`, 'g');
    out = out.replace(openRe, `<${to}`);
    // closing tags
    const closeRe = new RegExp(`<\\/\\s*${from}\\s*>`, 'g');
    out = out.replace(closeRe, `</${to}>`);
  }

  // Replace JSX component names in self-closing form (e.g. <Stop />)
  // (covered by opening tag replace above)

  // Some tiny cleanups: prefer double quotes consistently for imports
  out = out.replace(/export default function\s+Liquid\(/, 'export default function Liquid(');

  // Ensure file ends with a single newline
  out = out.replace(/\r\n/g, '\n');
  if (!out.endsWith('\n')) out += '\n';
  return out;
}

function syncOnce() {
  try {
    const srcText = fs.readFileSync(src, 'utf8');
    const transformed = transformSource(srcText);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, transformed, 'utf8');
    console.log(`Synced Liquid -> ${path.relative(process.cwd(), dest)}`);
  } catch (e) {
    console.error('Failed to sync Liquid:', e && e.message ? e.message : e);
  }
}

if (watchMode) {
  // lazy require so script still runs where chokidar not installed
  const chokidar = require('chokidar');
  console.log('Watching', src);
  syncOnce();
  chokidar.watch(src).on('change', (p) => {
    console.log('Change detected:', p);
    syncOnce();
  });
} else {
  syncOnce();
}
