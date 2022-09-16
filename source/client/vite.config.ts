//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import fs from 'fs';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';

export default defineConfig({
  build: {
    outDir: 'dist',
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
      prefix: 'VITE'
    })
  ],
  server: {
    https: {
      cert: fs.readFileSync('./cert/localhost.crt'),
      key: fs.readFileSync('./cert/localhost.key')
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
