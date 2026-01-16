let assets = null;
try {
  // prefer generated bundle map in dist (created by prepare script)
  assets = require("./dist/assets-map");
} catch (err) {
  assets = null;
}

module.exports = {
  name: "@cocktailjs/cocktail-ui",
  version: "0.1.0",
  assets, // null when not generated
  get(name) {
    if (!this.assets) return null;
    return this.assets[name] || null;
  },
};
