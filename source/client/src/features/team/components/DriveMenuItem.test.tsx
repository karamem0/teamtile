//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import DriveMenuItem from './DriveMenuItem.presenter';
import IntlProvider from '../../../providers/IntlProvider';
import { render } from '@testing-library/react';

it('should create shapshot', async () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <DriveMenuItem {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
