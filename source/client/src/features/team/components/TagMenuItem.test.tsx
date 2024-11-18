//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './TagMenuItem.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

jest.mock('./TagMemberAccordionItem', () =>
  function TagMemberAccordionItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-TagMemberAccordionItem">
        {children}
      </div>
    );
  }
);

jest.mock('../../../common/components/SidePanel', () =>
  function SidePanel({ content, renderer }: { content: React.ReactNode, renderer: (props: unknown) => React.ReactNode }) {
    return (
      <div data-testid="test-SidePanel">
        <div data-testid="test-Content">
          {content}
        </div>
        <div data-testid="test-Renderer">
          {renderer({})}
        </div>
      </div>
    );
  }
);

it('should create a shapshot when the items parameter is not undefined', () => {
  const params = {
    id: '2bd9fd6-8f93-4758-87c3-1fb73740a315',
    items: [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        displayName: 'Finance',
        description: 'Finance Team for Mach 8 Project',
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

it('should create a shapshot when the items parameter is undefined', () => {
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

it('should create a shapshot when the items parameter is an empty array', () => {
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
