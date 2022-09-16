//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { VisibilityType } from '../../../types/Entity';

import TeamGrid from './TeamGrid.presenter';

jest.mock('./TeamCard', () =>
  function TeamCard({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="TeamCard">
        {children}
      </div>
    );
  });

test('create shapshot', async () => {
  const params = {
    items: [
      {
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
    ]
  };
  render(<TeamGrid {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
