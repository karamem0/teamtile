//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { expect, it } from 'vitest';
import Presenter from './LoaderPanel.presenter';
import { render } from '@testing-library/react';

it('should create a shapshot', () => {
  const params = {};
  const { asFragment } = render(
    <Presenter {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});
