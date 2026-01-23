import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const useDist = process.env.USE_DIST === "1";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      // When USE_DIST=1, point the alias to the built bundle for prod-like testing.
      "@cocktailsrc": useDist
        ? path.resolve(__dirname, "../dist/index.mjs")
        : path.resolve(__dirname, "../src"),
    },
  },
});
