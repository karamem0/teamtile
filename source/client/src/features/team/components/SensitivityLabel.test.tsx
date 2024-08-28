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

test('create shapshot of when SensitivityLabel is not null', async () => {
  const params = {
    value: 'Restricted'
  };
  const { asFragment } = render(<SensitivityLabel {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when SensitivityLabel is undefined', async () => {
  const params = {
    value: undefined
  };
  const { asFragment } = render(<SensitivityLabel {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
