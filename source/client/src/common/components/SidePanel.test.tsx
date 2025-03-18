//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../providers/IntlProvider';
import Presenter from './SidePanel.presenter';
import ThemeProvider from '../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

it('should create a shapshot when the loading parameter is true', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    content: (
      <div data-testid="test-Content" />
    ),
    mountNode: container,
    loading: true,
    open: true,
    title: (
      <div data-testid="test-Title" />
    )
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.queryByTestId('test-Content')).not.toBeInTheDocument();
});

it('should create a shapshot when the loading parameter is false', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const params = {
    content: (
      <div data-testid="test-Content" />
    ),
    mountNode: container,
    loading: false,
    open: true,
    title: (
      <div data-testid="test-Title" />
    )
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>,
    {
      container
    }
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByTestId('test-Content')).toBeInTheDocument();
});

it('should raise onOpenChange event when click a close button', async () => {
  const container = document.body.appendChild(document.createElement('div'));
  const user = userEvent.setup();
  const mock = vi.fn();
  const params = {
    content: (
      <div data-testid="test-Content" />
    ),
    mountNode: container,
    loading: false,
    open: true,
    title: (
      <div data-testid="test-Title" />
    ),
    onOpenChange: mock
  };
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByRole('button'));
  expect(mock).toHaveBeenCalledWith(expect.anything(), false);
});
