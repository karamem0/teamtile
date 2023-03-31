//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import IntlProvider from '../../providers/IntlProvider';
import { SnackbarType } from '../../types/Snackbar';

import Snackbar from './Snackbar.presenter';

test('create shapshot of when text is undefined', async () => {
  const params = {
    text: undefined,
    type: undefined
  };
  render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when type is error', async () => {
  const params = {
    text: 'error',
    type: SnackbarType.error
  };
  render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when type is warning', async () => {
  const params = {
    text: 'warning',
    type: SnackbarType.warning
  };
  render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when type is success', async () => {
  const params = {
    text: 'success',
    type: SnackbarType.success
  };
  render(
    <IntlProvider>
      <Snackbar {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
