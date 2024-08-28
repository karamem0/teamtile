//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import PinMenuItem from './PinMenuItem.presenter';
import { render } from '@testing-library/react';

test('create shapshot of when pinned is true', async () => {
  const params = {
    pinned: true
  };
  const { asFragment } = render(
    <IntlProvider>
      <PinMenuItem {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when pinned is false', async () => {
  const params = {
    pinned: false
  };
  const { asFragment } = render(
    <IntlProvider>
      <PinMenuItem {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when pinned is undefined', async () => {
  const params = {
    pinned: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <PinMenuItem {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
