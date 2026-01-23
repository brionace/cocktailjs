#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const watchMode = argv.includes('--watch');

const repoRoot = path.resolve(__dirname, '..');
const assetDirs = [
  path.join(repoRoot, 'assets', 'glasses'),
];

function transformSource(srcText) {
  let out = String(srcText);

  // Replace react-native-svg import with React import
  out = out.replace(/import\s+React[\s\S]*?;?\s*\n\s*import\s+Svg[\s\S]*?from\s+"react-native-svg";?/m, 'import React from "react";\n');
  out = out.replace(/import\s+Svg\s*,\s*\{[\s\S]*?\}\s*from\s+"react-native-svg";?/m, 'import React from "react";\n');

  // Map react-native-svg component names to DOM SVG tags
  const tagMap = {
    Svg: 'svg',
    Path: 'path',
    Rect: 'rect',
    Circle: 'circle',
    Ellipse: 'ellipse',
    G: 'g',
    Line: 'line',
    Polygon: 'polygon',
    Polyline: 'polyline',
    Defs: 'defs',
    LinearGradient: 'linearGradient',
    RadialGradient: 'radialGradient',
    Stop: 'stop',
    Use: 'use',
    Text: 'text',
    TSpan: 'tspan',
  };

  for (const [from, to] of Object.entries(tagMap)) {
    const openRe = new RegExp(`<\\s*${from}\\b`, 'g');
    out = out.replace(openRe, `<${to}`);
    const closeRe = new RegExp(`<\\/\\s*${from}\\s*>`, 'g');
    out = out.replace(closeRe, `</${to}>`);
  }

  // Remove any leftover react-native-svg references (named imports etc.)
  out = out.replace(/from\s+"react-native-svg";?/g, '');

  // Normalize line endings
  out = out.replace(/\r\n/g, '\n');
  if (!out.endsWith('\n')) out += '\n';
  return out;
}

function syncFile(srcFile) {
  try {
    const rel = path.relative(repoRoot, srcFile);
    const parts = rel.split(path.sep);
    // assets/<type>/<Name>.js
    if (parts.length < 3) return;
    const type = parts[1];
    const name = path.basename(srcFile, path.extname(srcFile));
    const destDir = path.join(repoRoot, 'packages', 'cocktailjs-react', 'src', 'components', type);
    const destFile = path.join(destDir, `${name}.jsx`);
    const srcText = fs.readFileSync(srcFile, 'utf8');
    const transformed = transformSource(srcText);
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(destFile, transformed, 'utf8');
    console.log('Synced', srcFile, '->', destFile);
  } catch (e) {
    console.error('Failed to sync', srcFile, e && e.message ? e.message : e);
  }
}

function syncAll() {
  for (const dir of assetDirs) {
    try {
      const files = fs.readdirSync(dir);
      for (const f of files) {
        const p = path.join(dir, f);
        const st = fs.statSync(p);
        if (st.isFile() && /\.(js|jsx|ts|tsx)$/.test(f)) syncFile(p);
      }
    } catch (e) {
      // ignore missing dirs
    }
  }
}

if (watchMode) {
  const chokidar = require('chokidar');
  console.log('Watching asset dirs for sync:', assetDirs.join(', '));
  syncAll();
  chokidar.watch(assetDirs, { ignored: /(^|[\\\/])\../, ignoreInitial: true })
    .on('add', syncFile)
    .on('change', syncFile)
    .on('unlink', (p) => {
      // remove corresponding package file
      const rel = path.relative(repoRoot, p);
      const parts = rel.split(path.sep);
      if (parts.length < 3) return;
      const type = parts[1];
      const name = path.basename(p, path.extname(p));
      const dest = path.join(repoRoot, 'packages', 'cocktailjs-react', 'src', 'components', type, name + '.jsx');
      try { fs.unlinkSync(dest); console.log('Removed', dest); } catch (e) {}
    });
} else {
  syncAll();
}
