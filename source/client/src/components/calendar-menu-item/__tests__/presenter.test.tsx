//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { TeamWithMail } from '../../../types/entity';
import CalendarMenuItem from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('CalendarMenuItem', () => {

  it('create shapshot', async () => {
    const json = await import('./__jsons__/presenter.test.json');
    const params = {
      team: json.default as TeamWithMail,
      loading: false,
      onClick: jest.fn()
    };
    render(<CalendarMenuItem {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
