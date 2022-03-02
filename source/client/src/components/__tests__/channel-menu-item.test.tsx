//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { ItemValue } from '../../types/state';
import { ChannelMenuItem } from '../channel-menu-item';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('ChannelMenuItem', () => {

  it('create shapshot', async () => {
    const json = await import('./__jsons__/channel-menu-item.json');
    const params = {
      item: {
        key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        value: json.default as ItemValue
      }
    };
    render(<ChannelMenuItem {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
