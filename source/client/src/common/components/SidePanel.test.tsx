//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import ThemeProvider from '../../providers/ThemeProvider';

import SidePanel from './SidePanel.presenter';

test('create shapshot', async () => {
  const params = {
    open: true,
    content: <div data-testid="Content" />,
    title: <div data-testid="Title" />
  };
  const { asFragment } = render(
    <ThemeProvider>
      <SidePanel {...params} />
    </ThemeProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
