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
import Presenter from './PinMenuItem.presenter';
import { render } from '@testing-library/react';

it('should create a shapshot when the pinned parameter is true', () => {
  const params = {
    pinned: true
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when the pinned parameter is false', () => {
  const params = {
    pinned: false
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when the pinned parameter is undefined', () => {
  const params = {
    pinned: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
