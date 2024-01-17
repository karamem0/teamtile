//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import IntlProvider from '../../../providers/IntlProvider';

import CardMenuItem from './CardMenuItem.presenter';

test('create shapshot', async () => {
  const params = {
    children: <div data-testid="Children" />,
    icon: <div data-testid="Icon" />
  };
  const { asFragment } = render(
    <IntlProvider>
      <CardMenuItem {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
