//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './HomePage.presenter';

it('should match the snapshot', () => {
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
