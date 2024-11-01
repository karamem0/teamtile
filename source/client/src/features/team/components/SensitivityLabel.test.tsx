//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import SensitivityLabel from './SensitivityLabel.presenter';
import { render } from '@testing-library/react';

it('should create shapshot of when value is not undefined', async () => {
  const params = {
    value: 'Restricted'
  };
  const { asFragment } = render(<SensitivityLabel {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot of when value is undefined', async () => {
  const params = {
    value: undefined
  };
  const { asFragment } = render(<SensitivityLabel {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
