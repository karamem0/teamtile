//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';

import Presenter from './MemberDrawer.presenter';

vi.mock('../../../common/components/Drawer', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="test-Drawer">
      <div data-testid="test-Children">
        {children}
      </div>
    </div>
  )
}));

it('should match the snapshot when the items is not undefined', () => {
  const params = {
    items: [
      {
        displayName: 'Adele Vance',
        email: 'AdeleV@M365x214355.onmicrosoft.com',
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
      }
    ]
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the items is undefined', () => {
  const params = {
    items: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the items is an empty array', () => {
  const params = {
    items: []
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should raise onClick event when click an item', async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  const item = {
    displayName: 'Adele Vance',
    email: 'AdeleV@M365x214355.onmicrosoft.com',
    id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
    userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
  };
  const params = {
    items: [ item ],
    onClick: mock
  };
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByText(item.displayName));
  expect(mock).toHaveBeenCalledWith(expect.anything(), item);
});

it('should raise onFilterChange event when enter text in search box', async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  const item = {
    displayName: 'Adele Vance',
    email: 'AdeleV@M365x214355.onmicrosoft.com',
    id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
    userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd'
  };
  const params = {
    items: [ item ],
    onFilterChange: mock
  };
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByPlaceholderText(/Search/));
  await user.keyboard(item.displayName);
  expect(mock).toHaveBeenCalledWith(expect.anything(), item.displayName);
});
