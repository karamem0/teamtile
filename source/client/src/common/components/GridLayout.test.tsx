//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Presenter from './GridLayout.presenter';

it('should create a shapshot', () => {
  const params = {
    children: (
      <div data-testid="test-Children" />
    )
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Children')).toBeInTheDocument();
});
