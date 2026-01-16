let assets = null;
try {
  // prefer generated bundle map in dist (created by prepare script)
  assets = require("./dist/assets-map");
} catch (err) {
  assets = null;
}

function normalizeName(name, type) {
  // allow callers to pass 'Basil' or 'garnishes/Basil'
  if (!name) return null;
  if (assets && assets[name]) return name;
  if (type) {
    const key = `${type}/${name}`;
    if (assets && assets[key]) return key;
  }
  // try to find by suffix
  if (assets) {
    const keys = Object.keys(assets).filter(
      (k) => k.endsWith(`/${name}`) || k === name
    );
    if (keys.length) return keys[0];
  }
  return name;
}

module.exports = {
  name: "@bace51/cocktailui",
  version: "0.1.0",

  // raw assets map (may be null in dev before prepare)
  assets,

  // List all available asset keys (eg. 'garnishes/Basil')
  list() {
    return assets ? Object.keys(assets) : [];
  },

  // List assets by type: 'garnishes' or 'glasses'
  listByType(type) {
    if (!assets || !type) return [];
    return Object.keys(assets).filter((k) => k.startsWith(`${type}/`));
  },

  // Get the raw SVG string for a named asset.
  // Accepts either full key ('garnishes/Basil') or short name ('Basil')
  getSvg(name, type) {
    if (!assets) return null;
    const key = normalizeName(name, type);
    return assets[key] || null;
  },

  // Convenience alias
  get(name, type) {
    return this.getSvg(name, type);
  },
};
