//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { VisibilityType } from '../../types/entity';
import { VisibilityIcon } from '../visibility-icon';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('VisibilityIcon', () => {

  it('create shapshot when VisibilityType is public', () => {
    const params = {
      visibility: VisibilityType.public
    };
    render(<VisibilityIcon {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot when MembershipType is private', () => {
    const params = {
      visibility: VisibilityType.private
    };
    render(<VisibilityIcon {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
