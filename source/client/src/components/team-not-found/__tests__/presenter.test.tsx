//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { Provider, themeNames } from '@fluentui/react-teams';

import TeamNotFound from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('TeamNotFound', () => {

  it('create shapshot', () => {
    render(
      <Provider
        lang="en-US"
        themeName={themeNames.Default}>
        <TeamNotFound />
      </Provider>
    );
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
