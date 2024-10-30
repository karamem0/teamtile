//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import SidePanel from './SidePanel.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create shapshot of when loading is true', async () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    content: (
      <div data-testid="Content" />
    ),
    mountNode: container,
    loading: true,
    open: true,
    title: (
      <div data-testid="Title" />
    )
  };
  const { asFragment } = render(
    <ThemeProvider>
      <SidePanel {...params} />
    </ThemeProvider>,
    {
      container
    }
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot of when loading is false', async () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    content: (
      <div data-testid="Content" />
    ),
    mountNode: container,
    loading: false,
    open: true,
    title: (
      <div data-testid="Title" />
    )
  };
  const { asFragment } = render(
    <ThemeProvider>
      <SidePanel {...params} />
    </ThemeProvider>,
    {
      container
    }
  );
  expect(asFragment()).toMatchSnapshot();
});
