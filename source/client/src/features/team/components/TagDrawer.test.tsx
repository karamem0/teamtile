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

import Presenter from './TagDrawer.presenter';

vi.mock('./TagMemberAccordionItem', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-TagMemberAccordionItem">
      {children}
    </div>
  )
}));

vi.mock('../../../common/components/Drawer', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-Drawer">
      <div data-testid="test-Children">
        {children}
      </div>
    </div>
  )
}));

it('should match the snapshot when the items is not undefined', () => {
  const params = {
    id: '2bd9fd6-8f93-4758-87c3-1fb73740a315',
    items: [
      {
        description: 'Finance Team for Mach 8 Project',
        displayName: 'Finance',
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        memberCount: 2
      }
    ]
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

it('should match the snapshot when the items is undefined', () => {
  const params = {
    id: '2bd9fd6-8f93-4758-87c3-1fb73740a315',
    items: undefined
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

it('should match the snapshot when the items is an empty array', () => {
  const params = {
    id: '2bd9fd6-8f93-4758-87c3-1fb73740a315',
    items: []
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
