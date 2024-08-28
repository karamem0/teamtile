//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import hooks from 'eslint-plugin-hooks';
import js from '@eslint/js';
import path from 'path';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...fixupConfigRules(compat.extends(
    'plugin:@stylistic/recommended-extends',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:testing-library/react'
  )),
  {
    'plugins': {
      hooks
    },
    'languageOptions': {
      'globals': {
        ...globals.browser,
        ...globals.jest
      }
    },
    'settings': {
      'react': {
        'version': 'detect'
      }
    },
    'rules': {
      'dot-notation': [
        'error',
        {
          'allowPattern': '^[a-z]+(_[a-z]+)+$'
        }
      ],
      'key-spacing': [
        'error',
        {
          'afterColon': true
        }
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'no-alert': 'error',
      'no-console': [
        'warn',
        {
          'allow': [
            'error'
          ]
        }
      ],
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-var': 'error',
      'sort-imports': [
        'error',
        {
          'allowSeparatedGroups': true
        }
      ],
      'space-before-function-paren': [
        'error',
        {
          'anonymous': 'never',
          'named': 'never',
          'asyncArrow': 'always'
        }
      ],
      '@stylistic/arrow-parens': [
        'error',
        'always'
      ],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/array-bracket-spacing': [
        'error',
        'always',
        {
          'arraysInArrays': false
        }
      ],
      '@stylistic/brace-style': [
        'error',
        '1tbs'
      ],
      '@stylistic/comma-dangle': [
        'error',
        'never'
      ],
      '@stylistic/indent': [
        'error',
        2
      ],
      '@stylistic/indent-binary-ops': [
        'error',
        4
      ],
      '@stylistic/jsx-closing-bracket-location': [
        'error',
        'after-props'
      ],
      '@stylistic/jsx-first-prop-new-line': [
        'error',
        'multiline'
      ],
      '@stylistic/jsx-indent-props': [
        'error',
        2
      ],
      '@stylistic/jsx-max-props-per-line': [
        'error',
        {
          'maximum': 1
        }
      ],
      '@stylistic/jsx-sort-props': [
        'error',
        {
          'callbacksLast': true,
          'multiline': 'last',
          'reservedFirst': true
        }
      ],
      '@stylistic/jsx-tag-spacing': [
        'error',
        {
          'beforeSelfClosing': 'always'
        }
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          'multiline': {
            'delimiter': 'comma',
            'requireLast': false
          },
          'singleline': {
            'delimiter': 'comma',
            'requireLast': false
          }
        }
      ],
      '@stylistic/multiline-ternary': [
        'error',
        'never'
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after'
      ],
      '@stylistic/padded-blocks': 'off',
      '@stylistic/quotes': [
        'error',
        'single'
      ],
      '@stylistic/quote-props': [
        'error',
        'consistent'
      ],
      '@stylistic/semi': [
        'error',
        'always'
      ],
      '@typescript-eslint/array-type': [
        'error',
        {
          'default': 'array'
        }
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      'hooks/sort': [
        'error',
        {
          'groups': [
            'useContext',
            'useReducer',
            'useState',
            'useMemo',
            'useRef',
            'useCallback',
            'useEffect'
          ]
        }
      ],
      'react/no-unknown-property': [
        'error',
        {
          'ignore': [
            'css'
          ]
        }
      ],
      'react/prop-types': 'off',
      'sonarjs/max-switch-cases': 'warn',
      'sonarjs/no-collapsible-if': 'warn',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-small-switch': 'warn',
      'sonarjs/prefer-single-boolean-return': 'off'
    }
  }
];
