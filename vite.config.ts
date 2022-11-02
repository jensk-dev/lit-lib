import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import packageProcess from "@jensk/rollup-plugin-package-process";
import { defineConfig } from "vitest/config";

const OUT_DIR = `dist`;
const PACKAGE_DIR = `${OUT_DIR}/package`;
const BUNDLE_DIR = `${OUT_DIR}/bundle`;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    target: "es2019",
    minify: false,
    rollupOptions: {
      external: /^lit/,
      output: {
        dir: PACKAGE_DIR,
        preserveModules: true,
        inlineDynamicImports: false,
        entryFileNames: "[name].js",
        format: "es",
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    include: ["test/**/*.test.ts"],
  },
  plugins: [
    // copy over the types into the dist folder
    copy({
      targets: [{ src: "types/*", dest: PACKAGE_DIR }],
      hook: "generateBundle",
    }),

    // strip inaccurate information from dist bundle
    packageProcess({
      output: {
        dir: `${PACKAGE_DIR}`,
        replaceExisting: true,
      },
      process: inputPackage => {
        inputPackage.peerDependencies = inputPackage.dependencies;

        delete inputPackage.devDependencies;
        delete inputPackage.dependencies;
        delete inputPackage.scripts;

        return inputPackage;
      },
    }),
    // deletes the types folder generated by typescript
    del({
      targets: "types",
      hook: "writeBundle",
    }),
  ],
});
