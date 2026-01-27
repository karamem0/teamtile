//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { VisibilityType } from '../../../types/Entity';

import Presenter from './TeamGridItem.presenter';

vi.mock('./AvatarIcon', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-AvatarIcon">
      {children}
    </div>
  )
}));

vi.mock('./CalendarMenuItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-CalendarMenuItem">
      {children}
    </div>
  )
}));

vi.mock('./ChannelMenuItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-ChannelMenuItem">
      {children}
    </div>
  )
}));

vi.mock('./DriveMenuItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-DriveMenuItem">
      {children}
    </div>
  )
}));

vi.mock('./MemberMenuItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-MemberMenuItem">
      {children}
    </div>
  )
}));

vi.mock('./PinMenuItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-PinMenuItem">
      {children}
    </div>
  )
}));

vi.mock('./SensitivityLabel', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-SensitivityLabel">
      {children}
    </div>
  )
}));

vi.mock('./TagMenuItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-TagMenuItem">
      {children}
    </div>
  )
}));

vi.mock('./VisibilityIcon', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-VisibilityIcon">
      {children}
    </div>
  )
}));

it('should match the snapshot when the loading is true', () => {
  const params = {
    card: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      loading: true,
      team: {
        archived: false,
        description: 'Welcome to the HR Taskforce team.',
        displayName: 'HR Taskforce',
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        sensitivityLabel: 'Restricted',
        visibility: 'private' as VisibilityType,
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      },
      visible: true
    }
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

it('should match the snapshot when the loading is false', () => {
  const params = {
    card: {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      loading: false,
      team: {
        archived: false,
        description: 'Welcome to the HR Taskforce team.',
        displayName: 'HR Taskforce',
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        sensitivityLabel: 'Restricted',
        visibility: 'private' as VisibilityType,
        webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
      },
      visible: true
    }
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
