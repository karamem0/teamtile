//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import CenterLayout from './CenterLayout.presenter';

test('create shapshot', async () => {
  const params = {
    children: <React.Fragment />
  };
  render(<CenterLayout {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
