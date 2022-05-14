//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { Drive } from '../../../types/entity';
import DriveMenuItem from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('DriveMenuItem', () => {

  it('create shapshot', async () => {
    const json = await import('./__jsons__/presenter.test.json');
    const params = {
      drive: json.default as Drive,
      onClick: jest.fn()
    };
    render(<DriveMenuItem {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
