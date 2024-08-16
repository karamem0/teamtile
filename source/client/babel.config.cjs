//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

module.exports = {
  'plugins': [
    '@emotion/babel-plugin',
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
};
