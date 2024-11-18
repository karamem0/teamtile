//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import { MembershipType } from '../../../types/Entity';
import Presenter from './ChannelMenuItem.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

jest.mock('../../../common/components/SidePanel', () =>
  function SidePanel({ content, renderer }: { content: React.ReactNode, renderer: (props: unknown) => React.ReactNode }) {
    return (
      <div data-testid="test-SidePanel">
        <div data-testid="test-Content">
          {content}
        </div>
        <div data-testid="test-Renderer">
          {renderer({})}
        </div>
      </div>
    );
  }
);

it('should create a shapshot when the items parameter is not undefined', () => {
  const params = {
    items: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        membershipType: 'standard' as MembershipType,
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
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

it('should create a shapshot when the items parameter is undefined', () => {
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

it('should create a shapshot when the items parameter is an empty array', () => {
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
  const mock = jest.fn();
  const params = {
    items: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        membershipType: 'standard' as MembershipType,
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ],
    onClick: mock
  };
  render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByText(params.items[0].displayName));
  expect(mock).toHaveBeenCalledWith(expect.anything(), params.items[0]);
});

it('should raise onFilterChange event when enter text in search box', async () => {
  const user = userEvent.setup();
  const mock = jest.fn();
  const params = {
    items: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        membershipType: 'standard' as MembershipType,
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      }
    ],
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
  await user.keyboard(params.items[0].displayName);
  expect(mock).toHaveBeenCalledWith(expect.anything(), params.items[0].displayName);
});
