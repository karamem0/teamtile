//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import { render } from '@testing-library/react';

import Presenter from './CardMenuItem.presenter';

it('should match the snapshot', () => {
  const params = {
    icon: (
      <div data-testid="test-Icon" />
    ),
    title: 'Title'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
