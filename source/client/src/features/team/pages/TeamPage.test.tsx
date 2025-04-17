//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './TeamPage.presenter';
import { VisibilityType } from '../../../types/Entity';
import { render } from '@testing-library/react';

vi.mock('../../../common/components/LoaderPanel', () => ({
  default: () => (
    <div data-testid="test-LoaderPanel" />
  )
}));

vi.mock('../components/TeamPanel', () => ({
  default: () => (
    <div data-testid="test-TeamPanel" />
  )
}));

vi.mock('../components/EmptyPanel', () => ({
  default: () => (
    <div data-testid="test-EmptyPanel" />
  )
}));

it('should match the snapshot when loading is true', () => {
  const params = {
    loading: true
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the loading is false and the cards is not empty', () => {
  const params = {
    cards: [
      {
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
    ],
    loading: false
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the loading is false and the cards is empty', () => {
  const params = {
    cards: [],
    loading: false
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the loading is undefined', () => {
  const params = {
    loading: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
