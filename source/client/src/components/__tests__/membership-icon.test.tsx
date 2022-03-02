//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { MembershipType } from '../../types/entity';
import { MembershipIcon } from '../membership-icon';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('MembershipIcon', () => {

  it('create shapshot when MembershipType is standard', () => {
    const params = {
      membership: MembershipType.standard
    };
    render(<MembershipIcon {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when MembershipType is private', () => {
    const params = {
      membership: MembershipType.private
    };
    render(<MembershipIcon {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
