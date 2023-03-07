//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import AppLoader from './AppLoader.presenter';

test('create shapshot of when loading is true', async () => {
  const params = {
    children: <div data-testid="Children" />,
    loading: true
  };
  render(<AppLoader {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when loading is false', async () => {
  const params = {
    children: <div data-testid="Children" />,
    loading: false
  };
  render(<AppLoader {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
