//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import TeamsInitializer from './TeamsInitializer.presenter';
import { render } from '@testing-library/react';

it('should create shapshot of when loading is true', async () => {
  const params = {
    children: (
      <div data-testid="Children" />
    ),
    loading: true
  };
  const { asFragment } = render(<TeamsInitializer {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot of when loading is false', async () => {
  const params = {
    children: (
      <div data-testid="Children" />
    ),
    loading: false
  };
  const { asFragment } = render(<TeamsInitializer {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
