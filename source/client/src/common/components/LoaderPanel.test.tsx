//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import LoaderPanel from './LoaderPanel.presenter';

test('create shapshot', async () => {
  const params = {};
  const { asFragment } = render(
    <LoaderPanel {...params} />
  );
  expect(asFragment()).toMatchSnapshot();
});
