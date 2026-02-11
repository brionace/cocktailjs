#!/usr/bin/env node
/*
 Render each React JSX component to static SVG using @babel/register + ReactDOMServer,
 measure child bbox via Puppeteer, compute delta to canonical baseline, and apply safe
 top-level <g transform> or flag large deltas. Backups created with .bak-render
 and a report is written to scripts/svg-render-report.json
*/
require('@babel/register')({
  presets: [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env')
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const fs = require('fs').promises;
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const puppeteer = require('puppeteer');

const GLASSES_DIR = path.join(process.cwd(), 'packages', 'cocktailjs-react', 'src', 'components', 'glasses');
const BACKUP_SUFFIX = '.bak-render';
const REPORT_PATH = path.join('scripts', 'svg-render-report.json');
const CANONICAL_BASELINE = 58;
const CANONICAL_HEIGHT = 64;
const SAFE_THRESHOLD = 12;

function findSvgRange(src) {
  const openIdx = src.indexOf('<svg');
  if (openIdx === -1) return null;
  const openEnd = src.indexOf('>', openIdx);
  if (openEnd === -1) return null;
  const closeIdx = src.lastIndexOf('</svg>');
  if (closeIdx === -1) return null;
  return { start: openIdx, openEnd: openEnd + 1, end: closeIdx + 6 };
}

async function measureSvg(svgContent, browser) {
  const html = `<!doctype html><html><body style="margin:0"><div id="root">${svgContent}</div></body></html>`;
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 20));
  const result = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (!svg) return { ok: false, reason: 'no-svg' };
    const children = Array.from(svg.children).filter(n => n.nodeName.toLowerCase() !== 'defs');
    const firstG = children.find(n => n.nodeName.toLowerCase() === 'g');
    const target = firstG || svg;
    try {
      let bbox = target.getBBox();
      let stroke = parseFloat(window.getComputedStyle(target).strokeWidth) || 0;
      const isTiny = !(bbox.width > 0.5 && bbox.height > 0.5) || bbox.y <= 1;
      if (isTiny) {
        const selectors = ['path','rect','circle','ellipse','line','polyline','polygon','text'];
        const elems = Array.from(svg.querySelectorAll(selectors.join(',')));
        if (elems.length > 0) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          elems.forEach(el => {
            try {
              const b = el.getBBox();
              if (b.width === 0 && b.height === 0) return;
              minX = Math.min(minX, b.x);
              minY = Math.min(minY, b.y);
              maxX = Math.max(maxX, b.x + b.width);
              maxY = Math.max(maxY, b.y + b.height);
            } catch (e) {}
          });
          if (minX !== Infinity) {
            bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
            stroke = elems.reduce((s, el) => Math.max(s, parseFloat(window.getComputedStyle(el).strokeWidth) || 0), stroke);
          }
        }
      }
      return { ok: true, bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height }, stroke };
    } catch (err) {
      return { ok: false, reason: 'getBBox-failed', err: String(err) };
    }
  });
  await page.close();
  return result;
}

function addTranslateToExisting(transformAttr, delta) {
  const t = transformAttr || '';
  const translateMatch = t.match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
  if (translateMatch) {
    const newY = parseFloat(translateMatch[2]) + delta;
    return t.replace(translateMatch[0], `translate(0,${Number(newY.toFixed(3))})`);
  }
  return `translate(0,${Number(delta.toFixed(3))}) ${t}`.trim();
}

async function applyDeltaToSource(filePath, delta) {
  let content = await fs.readFile(filePath, 'utf8');
  const svgOpenMatch = content.match(/<svg[\s\S]*?>/i);
  if (!svgOpenMatch) throw new Error('no svg open');
  const svgOpen = svgOpenMatch[0];
  const openIndex = content.indexOf(svgOpen) + svgOpen.length;
  const svgCloseIndex = content.lastIndexOf('</svg>');
  if (svgCloseIndex === -1) throw new Error('no svg close');
  const after = content.slice(openIndex);
  const gMatch = after.match(/^\s*<g[^>]*>/i);
  if (gMatch) {
    const gTag = gMatch[0];
    const startOfG = openIndex + after.indexOf(gTag);
    const endOfG = startOfG + gTag.length;
    let newGTag = gTag;
    if (/transform\s*=\s*"[^"]*translate\(/i.test(gTag)) {
      newGTag = gTag.replace(/transform\s*=\s*"([^"]*)"/i, (m, grp) => {
        const replaced = grp.replace(/translate\(\s*[-\d.]+(?:\s*,\s*[-\d.]+)?\s*\)/i, `translate(0,${delta})`);
        return `transform="${replaced}"`;
      });
    } else if (/transform\s*=\s*"[^"]*"/i.test(gTag)) {
      newGTag = gTag.replace(/(transform\s*=\s*")([^\"]*)(")/i, (m, p1, p2, p3) => `${p1}${p2} translate(0,${delta})${p3}`);
    } else {
      newGTag = gTag.replace(/<g/i, `<g transform="translate(0,${delta})"`);
    }
    content = content.slice(0, startOfG) + newGTag + content.slice(endOfG);
  } else {
    const before = content.slice(0, openIndex);
    const inner = content.slice(openIndex, svgCloseIndex);
    const afterClose = content.slice(svgCloseIndex);
    content = `${before}\n<g transform="translate(0,${delta})">\n${inner}\n</g>\n${afterClose}`;
  }
  await fs.writeFile(filePath + BACKUP_SUFFIX, content, 'utf8');
  await fs.writeFile(filePath, content, 'utf8');
}

async function main() {
  const files = await fs.readdir(GLASSES_DIR);
  const jsxFiles = files.filter(f => f.endsWith('.jsx'));
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const results = [];
  for (const f of jsxFiles) {
    const full = path.join(GLASSES_DIR, f);
    try {
      // require the component and render to static markup
      delete require.cache[require.resolve(full)];
      const mod = require(full);
      const Comp = mod && (mod.default || mod);
      if (!Comp) {
        results.push({ file: full, applied: false, reason: 'no-export' });
        continue;
      }
      const element = React.createElement(Comp, { size: 64 });
      const svgMarkup = ReactDOMServer.renderToStaticMarkup(element);
      // extract svg
      const svgr = svgMarkup.match(/<svg[\s\S]*?>[\s\S]*<\/svg>/i);
      if (!svgr) {
        results.push({ file: full, applied: false, reason: 'no-svg-in-render' });
        continue;
      }
      const svg = svgr[0];
      const measured = await measureSvg(svg, browser);
      if (!measured.ok) {
        results.push({ file: full, applied: false, reason: measured.reason });
        continue;
      }
      const vbMatch = svg.match(/viewBox\s*=\s*"([^"]+)"/i);
      const vbParts = vbMatch ? vbMatch[1].split(/\s+/).map(Number) : [0,0,64,64];
      const vbH = vbParts[3] || 64;
      const targetY = Math.round((CANONICAL_BASELINE / CANONICAL_HEIGHT) * vbH);
      const bbox = measured.bbox;
      const margin = Math.max(1, measured.stroke / 2, 1);
      const visualBottom = bbox.y + bbox.height + margin;
      const delta = Math.round(targetY - visualBottom);
      if (Math.abs(delta) > SAFE_THRESHOLD) {
        results.push({ file: full, applied: false, reason: 'delta-too-large', delta, visualBottom, targetY });
        continue;
      }
      // apply to source file
      await applyDeltaToSource(full, delta);
      results.push({ file: full, applied: true, delta, visualBottom, targetY });
    } catch (err) {
      results.push({ file: full, applied: false, reason: 'exception', err: String(err) });
    }
  }
  await browser.close();
  await fs.writeFile(REPORT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log('done. report:', REPORT_PATH);
}

main().catch(err => { console.error(err); process.exit(1); });
