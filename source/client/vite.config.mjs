//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig({
  'build': {
    'outDir': 'build',
    'sourcemap': true
  },
  'optimizeDeps': {
    'esbuildOptions': {
      'define': {
        'global': 'globalThis'
      }
    }
  },
  'plugins': [
    react({
      'jsxImportSource': '@emotion/react',
      'plugins': [
        [
          '@swc/plugin-emotion',
          {
            'autoLabel': 'dev-only',
            'labelFormat': '[local]',
            'sourceMap': true
          }
        ],
        [
          '@swc/plugin-formatjs',
          {
            'ast': true,
            'idInterpolationPattern': '[sha512:contenthash:base64:6]'
          }
        ]
      ]
    })
  ],
  'server': {
    'https': {
      'cert': fs.readFileSync('./cert/localhost.crt'),
      'key': fs.readFileSync('./cert/localhost.key')
    },
    'port': process.env.PORT ? Number(process.env.PORT) : 5173,
    'proxy': {
      '/api': {
        'changeOrigin': true,
        'secure': false,
        'target': 'https://localhost:5001'
      }
    }
  },
  'test': {
    'coverage': {
      'reporter': [
        'json'
      ],
      'reportsDirectory': './coverage'
    },
    'environment': 'jsdom',
    'globals': true,
    'outputFile': './test/junit.xml',
    'pool': 'threads',
    'setupFiles': [
      './vitest.setup.mjs'
    ]
  }
});
