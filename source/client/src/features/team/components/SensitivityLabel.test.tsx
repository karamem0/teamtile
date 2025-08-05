//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import Presenter from './SensitivityLabel.presenter';

it('should match the snapshot when the label is undefined', () => {
  const params = {
    label: undefined
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the label is not undefined', () => {
  const params = {
    label: 'Restricted'
  };
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});
