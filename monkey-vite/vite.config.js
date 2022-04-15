// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      formats: ["iife", "es", "umd"],
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "MyLib",
      fileName: (format) => `my-lib.${format}.js`,
    },
    watch: {},
  },
});
