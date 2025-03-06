//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { expect, it } from 'vitest';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './HomePage.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create a shapshot', () => {
  const params = {};
  const { asFragment } = render(
    <ThemeProvider>
      <IntlProvider>
        <Presenter {...params} />
      </IntlProvider>
    </ThemeProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
