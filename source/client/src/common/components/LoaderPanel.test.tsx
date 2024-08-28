//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import LoaderPanel from './LoaderPanel.presenter';
import { render } from '@testing-library/react';

test('create shapshot', async () => {
  const params = {};
  const { asFragment } = render(
    <LoaderPanel {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});
