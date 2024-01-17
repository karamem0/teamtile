//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import IntlProvider from '../../../providers/IntlProvider';

import LoginRedirectPage from './LoginRedirectPage.presenter';

test('create shapshot', async () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <LoginRedirectPage {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
