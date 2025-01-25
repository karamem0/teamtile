//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export default {
  'automock': false,
  'moduleNameMapper': {
    '^dexie$': '<rootDir>/node_modules/dexie'
  },
  'coverageDirectory': 'coverage',
  'reporters': [
    'default',
    [
      'jest-junit',
      {
        'outputDirectory': 'test'
      }
    ]
  ],
  'setupFiles': [
    './jest.setup.mjs'
  ],
  'snapshotSerializers': [
    '@emotion/jest/serializer'
  ],
  'testEnvironment': 'jsdom',
  'testMatch': [
    '**/*.test.ts',
    '**/*.test.tsx'
  ],
  'transform': {
    '^.+\\.(?:js|jsx|mjs|ts|tsx)$': [
      'babel-jest',
      {
        'plugins': [
          [
            'formatjs',
            {
              'ast': true,
              'idInterpolationPattern': '[sha512:contenthash:base64:6]'
            }
          ]
        ],
        'presets': [
          [
            '@babel/preset-env',
            {
              'targets': {
                'node': 'current'
              }
            }
          ],
          '@babel/preset-react',
          '@babel/preset-typescript',
          '@emotion/babel-preset-css-prop'
        ]
      }
    ]
  },
  'transformIgnorePatterns': [
    '/node_modules/(?!@fluentui)'
  ]
};
