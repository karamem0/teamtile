//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './ChannelMenuItem.presenter';

it('should match the snapshot', () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should raise onClick event when click a button', async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  const params = {
    onClick: mock
  };
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByRole('menuitem'));
  expect(mock).toHaveBeenCalled();
});
