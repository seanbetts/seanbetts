import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  const cssModules = {};
  return {
    plugins: [react(), {
      name: 'static-css-module-inventory',
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: '.vite/css-modules.json', source: JSON.stringify(cssModules) });
      },
    }],
    css: { modules: {
      generateScopedName: 'sb_[name]_[local]_[hash:base64:5]',
      getJSON(file, classes) { cssModules[path.relative(root, file).split(path.sep).join('/')] = classes; },
    } },
    build: {
      outDir: 'build',
      assetsDir: 'static',
      target: browserslistToEsbuild(),
    },
    test: {
      // Preserve CRA CI's runInBand scheduling for exhaustive DOM interaction tests.
      fileParallelism: false,
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.js'],
      include: ['src/**/*.test.{js,jsx}'],
    },
  };
});
