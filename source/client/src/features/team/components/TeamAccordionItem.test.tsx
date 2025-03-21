//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Accordion } from '@fluentui/react-components';
import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './TeamAccordionItem.presenter';
import { VisibilityType } from '../../../types/Entity';
import { render } from '@testing-library/react';

vi.mock('./TeamGridItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-TeamGridItem">
      {children}
    </div>
  )
}));

it('should create a shapshot', () => {
  const params = {
    header: 'Pinned',
    items: [
      {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        pinned: true,
        loading: false,
        value: {
          id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          archived: false,
          displayName: 'HR Taskforce',
          description: 'Welcome to the HR Taskforce team.',
          internalId: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
          sensitivityLabel: 'Restricted',
          visibility: 'private' as VisibilityType,
          webUrl: 'https://teams.microsoft.com/l/team/19:09fc54a3141a45d0bc769cf506d2e079%40thread.skype/conversations?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35'
        },
        visible: true
      }
    ],
    value: 'pinned'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Accordion defaultOpenItems={[ params.value ]}>
        <Presenter {...params} />
      </Accordion>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
