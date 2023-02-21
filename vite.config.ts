/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/main.ts"),
      name: "ObservableStorage",
      fileName: "observable-storage",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
