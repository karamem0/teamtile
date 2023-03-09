//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Error500Page from './Error500Page.presenter';

test('create shapshot', async () => {
  const params = {};
  render(
    <IntlProvider>
      <ThemeProvider>
        <Error500Page {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
