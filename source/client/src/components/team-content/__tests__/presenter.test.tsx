//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import TeamContent from '../presenter';

jest.mock('../../team-card', () => ({
  TeamCard: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="TeamCard">
      {children}
    </div>
  )
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('TeamContent', () => {

  it('create shapshot', () => {
    const params = {
      items: [
        {
          key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          value: null,
          loading: false,
          visible: true
        }
      ]
    };
    render(<TeamContent {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
