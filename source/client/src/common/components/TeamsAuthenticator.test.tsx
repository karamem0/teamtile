//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import TeamsAuthenticator from './TeamsAuthenticator.presenter';
import { render } from '@testing-library/react';

it('should create a shapshot when loading is true', () => {
  const params = {
    children: (
      <div data-testid="Children" />
    ),
    loading: true
  };
  const { asFragment } = render(<TeamsAuthenticator {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when loading is false', () => {
  const params = {
    children: (
      <div data-testid="Children" />
    ),
    loading: false
  };
  const { asFragment } = render(<TeamsAuthenticator {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
