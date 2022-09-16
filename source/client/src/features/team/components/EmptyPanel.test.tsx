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

import EmptyPanel from './EmptyPanel.presenter';

test('create shapshot', async () => {
  const params = {};
  render(
    <Provider
      lang="en-US"
      themeName={themeNames.Default}>
      <EmptyPanel {...params} />
    </Provider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
