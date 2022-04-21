//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

jest.mock('../../channel-menu-item', () => ({
  ChannelMenuItem: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ChannelMenuItem">
      {children}
    </div>
  )
}));

jest.mock('../../drive-menu-item', () => ({
  DriveMenuItem: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="DriveMenuItem">
      {children}
    </div>
  )
}));

jest.mock('../../member-menu-item', () => ({
  MemberMenuItem: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="MemberMenuItem">
      {children}
    </div>
  )
}));

import React from 'react';

import { render, screen } from '@testing-library/react';

import { Item } from '../../../types/state';
import TeamCard from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('TeamCard', () => {

  it('create shapshot when item is loaded', async () => {
    const json = await import('./__jsons__/presenter.test.json');
    const params = {
      item: json.default as Item
    };
    render(<TeamCard {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when item is loading', () => {
    const params = {
      item: {
        key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: null,
        loading: true,
        visible: true
      }
    };
    render(<TeamCard {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
