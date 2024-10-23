//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import TagMenuItem from './TagMenuItem.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import userEvent from '@testing-library/user-event';

jest.mock('./TagMemberAccordionItem', () =>
  function TagMemberAccordionItem({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="TagMemberAccordionItem">
        {children}
      </div>
    );
  });

const setup = (jsx: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(jsx)
});

it('should create shapshot of when loading is true', async () => {
  const params = {
    id: '2bd9fd6-8f93-4758-87c3-1fb73740a315',
    items: [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        displayName: 'Finance',
        description: 'Finance Team for Mach 8 Project',
        memberCount: 2
      }
    ],
    loading: false
  };
  const { asFragment, user } = setup(
    <IntlProvider>
      <ThemeProvider>
        <TagMenuItem {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByRole('button'));
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot of when loading is false', async () => {
  const params = {
    id: '2bd9fd6-8f93-4758-87c3-1fb73740a315',
    items: [
      {
        id: 'MjQzMmI1N2ItMGFiZC00M2RiLWFhN2ItMTZlYWRkMTE1ZDM0IyM3ZDg4M2Q4Yi1hMTc5LTRkZDctOTNiMy1hOGQzZGUxYTIxMmUjI3RhY29VSjN2RGk==',
        displayName: 'Finance',
        description: 'Finance Team for Mach 8 Project',
        memberCount: 2
      }
    ],
    loading: false
  };
  const { asFragment, user } = setup(
    <IntlProvider>
      <ThemeProvider>
        <TagMenuItem {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  await user.click(screen.getByRole('button'));
  expect(asFragment()).toMatchSnapshot();
});
