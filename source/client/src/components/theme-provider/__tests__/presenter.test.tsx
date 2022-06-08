//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { themeNames } from '@fluentui/react-teams';

import ThemeProvider from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('ThemeProvider', () => {

  it('create shapshot', async () => {
    const params = {
      children: <React.Fragment />,
      lang: 'en-US',
      themeName: themeNames.Default
    };
    render(<ThemeProvider {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
