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

import MemberMenuItem from './MemberMenuItem.presenter';

test('create shapshot', async () => {
  const params = {
    items: [
      {
        id: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        displayName: 'Adele Vance',
        userId: '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        email: 'AdeleV@M365x214355.onmicrosoft.com'
      }
    ]
  };
  render(
    <IntlProvider>
      <MemberMenuItem {...params} />
    </IntlProvider>
  );
  expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
});
