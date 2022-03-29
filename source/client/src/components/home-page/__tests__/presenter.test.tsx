//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import HomePage from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('HomePage', () => {

  it('create shapshot', () => {
    const params = {
      onGitHubClick: jest.fn(),
      onPrivacyClick: jest.fn(),
      onTermsOfUseClick: jest.fn()
    };
    render(<HomePage {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
