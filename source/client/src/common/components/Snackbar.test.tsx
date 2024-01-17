//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import IntlProvider from '../../providers/IntlProvider';
import { SnackbarType } from '../../types/Snackbar';

import Snackbar from './Snackbar.presenter';

test('create shapshot of when text is undefined', async () => {
  const params = {
    text: undefined,
    type: undefined
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
    text: 'error',
    type: SnackbarType.error
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
    text: 'warning',
    type: SnackbarType.warning
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
    text: 'success',
    type: SnackbarType.success
  };
  const { asFragment } = render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
