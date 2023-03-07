//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { VisibilityType } from '../../../types/Entity';

import TeamCard from './TeamCard.presenter';

jest.mock('./CalendarMenuItem', () =>
  function CalendarMenuItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="CalendarMenuItem">
        {children}
      </div>
    );
  });

jest.mock('./ChannelMenuItem', () =>
  function ChannelMenuItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="ChannelMenuItem">
        {children}
      </div>
    );
  });

jest.mock('./DriveMenuItem', () =>
  function DriveMenuItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="DriveMenuItem">
        {children}
      </div>
    );
  });

jest.mock('./MemberMenuItem', () =>
  function MemberMenuItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="MemberMenuItem">
        {children}
      </div>
    );
  });

test('create shapshot of when item loading is true', async () => {
  const params = {
    item: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      value: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        sensitivityLabel: 'Restricted',
        visibility: 'private' as VisibilityType,
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      },
      loading: false,
      visible: true
    }
  };
  render(<TeamCard {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when item loading is false', async () => {
  const params = {
    item: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      value: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        displayName: 'HR Taskforce',
        description: 'Welcome to the HR Taskforce team.',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        sensitivityLabel: 'Restricted',
        visibility: 'private' as VisibilityType,
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      },
      loading: true,
      visible: true
    }
  };
  render(<TeamCard {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
