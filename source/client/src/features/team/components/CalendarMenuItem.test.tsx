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

import CalendarMenuItem from './CalendarMenuItem.presenter';

test('create shapshot of when loading is true', async () => {
  const params = {
    loading: true
  };
  render(
    <IntlProvider>
      <CalendarMenuItem {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when loading is false', async () => {
  const params = {
    loading: false
  };
  render(
    <IntlProvider>
      <CalendarMenuItem {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
