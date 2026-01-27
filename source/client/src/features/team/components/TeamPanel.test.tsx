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

import Presenter from './TeamPanel.presenter';

vi.mock('./DrawerFactory', () => ({
  default: () => (
    <div data-testid="test-DrawerFactory" />
  )
}));

vi.mock('./TeamGrid', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-TeamGrid">
      {children}
    </div>
  )
}));

it('should match the snapshot', () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
