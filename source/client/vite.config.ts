import fs from 'fs';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          '@emotion/babel-plugin'
        ]
      }
    }),
    env({
      prefix: 'APP'
    })
  ],
  server: {
    open: false,
    https: {
      cert: fs.readFileSync('./cert/localhost.crt'),
      key: fs.readFileSync('./cert/localhost.key')
    }
  }
});
