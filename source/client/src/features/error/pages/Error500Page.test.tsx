//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Error500Page from './Error500Page.presenter';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create shapshot', async () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Error500Page {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
