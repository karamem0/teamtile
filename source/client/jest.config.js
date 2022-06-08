module.exports = {
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
  testEnvironment: 'jsdom',
  testMatch: [
    '**/*.test.ts',
    '**/*.test.tsx'
  ],
  transformIgnorePatterns: [
    'node_modules/@fluentui/react-teams/'
  ]
};
