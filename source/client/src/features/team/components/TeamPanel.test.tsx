//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import TeamPanel from './TeamPanel.presenter';

jest.mock('./TeamGrid', () =>
  function TeamGrid({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="TeamGrid">
        {children}
      </div>
    );
  });

test('create shapshot', async () => {
  const params = {};
  const { asFragment } = render(<TeamPanel {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
