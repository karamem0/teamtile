//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import Presenter from './TeamsInitializer.presenter';

it('should match the snapshot when the loading is true', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    loading: true
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.queryByTestId('test-Children')).not.toBeInTheDocument();
});

it('should match the snapshot when the loading is false', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    ),
    loading: false
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Children')).toBeInTheDocument();
});
