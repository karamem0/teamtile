//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import AppLoader from './AppLoader.presenter';

test('create shapshot of when loading is true', async () => {
  const params = {
    children: <div data-testid="Children" />,
    loading: true
  };
  const { asFragment } = render(<AppLoader {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when loading is false', async () => {
  const params = {
    children: <div data-testid="Children" />,
    loading: false
  };
  const { asFragment } = render(<AppLoader {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
