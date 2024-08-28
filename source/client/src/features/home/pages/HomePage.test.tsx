//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import HomePage from './HomePage.presenter';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

test('create shapshot', async () => {
  const params = {};
  const { asFragment } = render(
    <ThemeProvider>
      <IntlProvider>
        <HomePage {...params} />
      </IntlProvider>
    </ThemeProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
