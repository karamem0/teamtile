//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import TeamGridItem from './TeamGridItem.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { VisibilityType } from '../../../types/Entity';
import { render } from '@testing-library/react';

jest.mock('./AvatarIcon', () =>
  function AvatarIcon({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="AvatarIcon">
        {children}
      </div>
    );
  });

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

jest.mock('./PinMenuItem', () =>
  function PinMenuItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="PinMenuItem">
        {children}
      </div>
    );
  });

jest.mock('./SensitivityLabel', () =>
  function SensitivityLabel({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="SensitivityLabel">
        {children}
      </div>
    );
  });

jest.mock('./TagMenuItem', () =>
  function TagMenuItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="TagMenuItem">
        {children}
      </div>
    );
  });

jest.mock('./VisibilityIcon', () =>
  function VisibilityIcon({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="VisibilityIcon">
        {children}
      </div>
    );
  });

it('should create a shapshot when loading is true', () => {
  const params = {
    card: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      team: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        archived: false,
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
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <TeamGridItem {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create a shapshot when loading is false', () => {
  const params = {
    card: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      team: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        archived: false,
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
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <TeamGridItem {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
