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

it('should create a shapshot when pinned is true', () => {
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

it('should create a shapshot when pinned is false', () => {
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

it('should create a shapshot when pinned is undefined', () => {
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
