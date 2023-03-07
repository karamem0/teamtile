//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import SidePanel from './SidePanel.presenter';

test('create shapshot', async () => {
  const params = {
    open: true,
    content: <div data-testid="Content" />,
    title: <div data-testid="Title" />
  };
  render(<SidePanel {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
