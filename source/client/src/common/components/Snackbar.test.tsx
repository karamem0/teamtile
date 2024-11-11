//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../providers/IntlProvider';
import { MessageBarIntent } from '@fluentui/react-components';
import Snackbar from './Snackbar.presenter';
import { render } from '@testing-library/react';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

it('should create a shapshot when text is undefined', () => {
  const params = {
    intent: undefined,
    text: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when type is error', () => {
  const params = {
    intent: 'error' as MessageBarIntent,
    text: 'error'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when type is warning', () => {
  const params = {
    intent: 'warning' as MessageBarIntent,
    text: 'warning'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when type is success', () => {
  const params = {
    intent: 'success' as MessageBarIntent,
    text: 'success'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
