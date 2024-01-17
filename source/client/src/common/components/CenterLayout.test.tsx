//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import CenterLayout from './CenterLayout.presenter';

test('create shapshot', async () => {
  const params = {
    children: <React.Fragment />
  };
  const { asFragment } = render(<CenterLayout {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
