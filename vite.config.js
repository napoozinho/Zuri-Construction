import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import stringPlugin from "vite-plugin-string";

export default defineConfig({
  plugins: [
    stringPlugin({
      include: ["**/*.css"],
    }),
    viteSingleFile(),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/main.js",
      output: {
        entryFileNames: "bundle.js",
      },
    },
    minify: false,
  },
});
