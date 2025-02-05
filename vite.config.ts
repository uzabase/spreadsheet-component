import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.tsx",
      formats: ["iife"],
      fileName() {
        return "spreadsheet.js";
      },
      name: "spreadsheet",
    },
  },
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
});
