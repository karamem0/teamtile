//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import SensitivityLabel from './SensitivityLabel.presenter';

test('create shapshot of when SensitivityLabel is not null', async () => {
  const params = {
    value: 'Restricted'
  };
  render(<SensitivityLabel {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when SensitivityLabel is undefined', async () => {
  const params = {
    value: undefined
  };
  render(<SensitivityLabel {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
