//
// Copyright (c) 2021-2024 karamem0
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
    '^.+\\.(?:js|mjs|ts|jsx|tsx)$': 'babel-jest'
  },
  'transformIgnorePatterns': [
    '/node_modules/(?!@fluentui)'
  ]
};
