//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { expect, it } from 'vitest';
import Presenter from './SensitivityLabel.presenter';
import { render } from '@testing-library/react';

it('should create a shapshot when the label parameter is undefined', () => {
  const params = {
    label: undefined
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when the label parameter is not undefined', () => {
  const params = {
    label: 'Restricted'
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});
