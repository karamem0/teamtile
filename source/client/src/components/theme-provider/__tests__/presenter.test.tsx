//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { teamsV2Theme } from '@fluentui/react-northstar';

import ThemeProvider from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('ThemeProvider', () => {

  it('create shapshot', async () => {
    const params = {
      children: <React.Fragment />,
      theme: teamsV2Theme
    };
    render(<ThemeProvider {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
