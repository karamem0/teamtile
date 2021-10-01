//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Testing Library
import { render, screen } from '@testing-library/react';
// Components
import { TeamIcon } from '../team-icon';
// Hooks
import * as useBlobUrl from '../../hooks/use-blob-url';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('TeamIcon', () => {

  it('render without icon', () => {
    const params = {
      name: 'HR Taskforce',
      icon: undefined
    };
    jest
      .spyOn(useBlobUrl, 'useBlobUrl')
      .mockReturnValue([ params.icon ]);
    render(<TeamIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('span');
  });

  it('render with icon', () => {
    const params = {
      name: 'HR Taskforce',
      icon: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    jest
      .spyOn(useBlobUrl, 'useBlobUrl')
      .mockReturnValue([ params.icon ]);
    render(<TeamIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('img');
  });

});
