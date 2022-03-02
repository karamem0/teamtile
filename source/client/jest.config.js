module.exports = {
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      isolatedModules: 'disabled'
    }
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage'
      }
    ]
  ],
  snapshotSerializers: [
    '@emotion/jest/serializer'
  ],
  testMatch: [
    '**/*.test.ts',
    '**/*.test.tsx'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
