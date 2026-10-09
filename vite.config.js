import { defineConfig } from "vite";

// Relative base so the bundle works when served from a subpath
// (GitHub Pages project sites live at /<repo>/, not at the domain root).
export default defineConfig({
  base: "./",
});
