/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import path from 'path';
export default defineConfig({
  cacheDir: '../node_modules/.vite/react-app',

  server: {
    port: 4200,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '.cert/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '.cert/server.crt')),
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    coverage: {
      provider: 'istanbul',
    },
    globals: true,
    cache: {
      dir: '../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
