const fs = require('fs');
const path = require('path');
const dir = path.join('packages', 'cocktailjs-react', 'src', 'components', 'glasses');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
let ok = 0, missing = [];
files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const svgOpenMatch = c.match(/<svg[^>]*>/i);
  if (!svgOpenMatch) missing.push(f + ' (no svg)');
  else {
    const after = c.slice(c.indexOf(svgOpenMatch[0]) + svgOpenMatch[0].length);
    if (/^\s*<g\b/i.test(after)) ok++;
    else missing.push(f);
  }
});
console.log('hasTopLevelG:', ok, '/ total:', files.length);
if (missing.length) {
  console.log('\nMissing or no top-level <g>:');
  missing.forEach(m => console.log(' -', m));
}
