//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import NotFoundPage from './NotFoundPage.presenter';

test('create shapshot', async () => {
  const params = {};
  render(<NotFoundPage {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
