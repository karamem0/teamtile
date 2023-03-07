//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { SnackbarType } from '../types/Snackbar';

import Snackbar from './Snackbar.presenter';

test('create shapshot of when text is undefined', async () => {
  const params = {
    text: undefined,
    type: undefined
  };
  render(<Snackbar {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when type is danger', async () => {
  const params = {
    text: 'danger',
    type: SnackbarType.danger
  };
  render(<Snackbar {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when type is warning', async () => {
  const params = {
    text: 'warning',
    type: SnackbarType.warning
  };
  render(<Snackbar {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when type is success', async () => {
  const params = {
    text: 'success',
    type: SnackbarType.success
  };
  render(<Snackbar {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
