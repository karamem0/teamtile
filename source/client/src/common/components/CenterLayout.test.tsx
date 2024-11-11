//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import CenterLayout from './CenterLayout.presenter';
import { render } from '@testing-library/react';

it('should create a shapshot', () => {
  const params = {
    children: (
      <div data-testid="Children" />
    )
  };
  const { asFragment } = render(<CenterLayout {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
