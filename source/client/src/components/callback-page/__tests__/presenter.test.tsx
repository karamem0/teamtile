//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import CallbackPage from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('CallbackPage', () => {

  it('create shapshot', () => {
    render(<CallbackPage />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
