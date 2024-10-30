//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import MemberMenuItem from './MemberMenuItem.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

jest.mock('../../../common/components/SidePanel', () =>
  function SidePanel({ content, renderer }: { content: React.ReactNode, renderer: (props: unknown) => React.ReactNode }) {
    return (
      <div data-testid="SidePanel">
        <div data-testid="Content">
          {content}
        </div>
        <div data-testid="Renderer">
          {renderer({})}
        </div>
      </div>
    );
  });

it('should create shapshot', async () => {
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
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <MemberMenuItem {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
