//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import LoaderPanel from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('LoaderPanel', () => {

  it('create shapshot', () => {
    render(<LoaderPanel />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
