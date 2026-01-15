import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const pkgRoot = path.dirname(__filename);

export default {
  input: path.join(pkgRoot, "src", "index.js"),
  external: [],
  plugins: [
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: "assets/**/*", dest: "dist/assets" }],
      verbose: true,
    }),
    terser(),
  ],
  output: [
    {
      file: path.join(pkgRoot, "dist", "index.js"),
      format: "esm",
      sourcemap: false,
    },
    {
      file: path.join(pkgRoot, "dist", "index.cjs"),
      format: "cjs",
      sourcemap: false,
    },
  ],
};
