import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.tsx",
      formats: ["umd"],
      fileName(_, __) {
        return "spreadsheet.js";
      },
      name: "spreadsheet",
    },
  },
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
});
