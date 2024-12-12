import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.tsx",
      fileName: "index.js",
      formats: ["iife"],
      name: "spreadsheet.js",
    }
  }
});
