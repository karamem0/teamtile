//
// Copyright (c) 2021-2024 karamem0
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
          '@emotion/babel-plugin',
          [
            'formatjs',
            {
              ast: true,
              idInterpolationPattern: '[sha512:contenthash:base64:6]'
            }
          ]
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
        changeOrigin: true,
        secure: false,
        target: 'https://localhost:5001'
      }
    }
  }
});
