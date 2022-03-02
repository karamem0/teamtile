//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { CardMenuItem } from '../card-menu-item';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('CardMenuItem', () => {

  it('create shapshot', () => {
    const params = {
      icon: 'icon',
      content: 'content',
      onClick: jest.fn()
    };
    render(<CardMenuItem {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
