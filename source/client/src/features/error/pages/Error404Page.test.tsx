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

import Error404Page from './Error404Page.presenter';

test('create shapshot', async () => {
  const params = {};
  render(
    <IntlProvider>
      <Error404Page {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
