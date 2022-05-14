//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import SensitivityLabel from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('MembershipIcon', () => {

  it('create shapshot when MembershipType is not null', () => {
    const params = {
      sensitivityLabel: 'Restricted'
    };
    render(<SensitivityLabel {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when MembershipType is null', () => {
    const params = {
      sensitivityLabel: undefined
    };
    render(<SensitivityLabel {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
