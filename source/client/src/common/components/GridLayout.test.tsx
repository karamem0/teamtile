//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import GridLayout from './GridLayout.presenter';

test('create shapshot', async () => {
  const params = {
    children: <React.Fragment />
  };
  const { asFragment } = render(<GridLayout {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
