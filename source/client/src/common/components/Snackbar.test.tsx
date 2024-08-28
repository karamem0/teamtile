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

test('create shapshot of when text is undefined', async () => {
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

test('create shapshot of when type is error', async () => {
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

test('create shapshot of when type is warning', async () => {
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

test('create shapshot of when type is success', async () => {
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
