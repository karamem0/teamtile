//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamIcon from '../TeamIcon';

describe('TeamIcon', () => {

  it('render without icon', () => {
    const params = {
      name: 'HR Taskforce',
      icon: undefined
    };
    render(<TeamIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('span');
  });

  it('render with icon', () => {
    const params = {
      name: 'HR Taskforce',
      icon: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    render(<TeamIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('img');
  });

});
