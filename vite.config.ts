import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.tsx",
      formats: ["iife"],
      fileName(_, __) {
        return "spreadsheet.js";
      },
      name: "spreadsheet",
    }
  }
});
