//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import IntlProvider from '../../../providers/IntlProvider';
import { MembershipType } from '../../../types/Entity';

import ChannelMenuItem from './ChannelMenuItem.presenter';

test('create shapshot', async () => {
  const params = {
    items: [
      {
        id: '19:09fc54a3141a45d0bc769cf506d2e079@thread.skype',
        displayName: 'General',
        webUrl: 'https://teams.microsoft.com/l/channel/19%3a09fc54a3141a45d0bc769cf506d2e079%40thread.skype/General?groupId=02bd9fd6-8f93-4758-87c3-1fb73740a315&tenantId=dcd219dd-bc68-4b9b-bf0b-4a33a796be35',
        membershipType: MembershipType.standard
      }
    ]
  };
  render(
    <IntlProvider>
      <ChannelMenuItem {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
