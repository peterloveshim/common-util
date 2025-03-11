/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "common-util",
      fileName: "common-util",
    },
  },
  plugins: [
    dts({
      exclude: ["src/test", "**/*.test.ts"], // 타입 선언 빌드 과정에서 제외
    }),
  ],
  test: {
    // ...
  },
});
