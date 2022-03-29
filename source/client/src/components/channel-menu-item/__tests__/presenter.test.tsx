//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Channel } from '../../../types/entity';
import ChannelMenuItem from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('ChannelMenuItem', () => {

  it('create shapshot when menu item is not open', async () => {
    const json = await import('./__jsons__/presenter.test.json');
    const params = {
      channels: json.default as Channel[],
      onClick: jest.fn()
    };
    render(<ChannelMenuItem {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when menu item is open', async () => {
    const json = await import('./__jsons__/presenter.test.json');
    const params = {
      channels: json.default as Channel[],
      onClick: jest.fn()
    };
    render(<ChannelMenuItem {...params} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
