//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { HomePage } from '../home-page';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('GridLayout', () => {

  it('create shapshot', () => {
    render(<HomePage />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
