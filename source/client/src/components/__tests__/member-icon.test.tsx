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
import { MemberIcon } from '../member-icon';
// Hooks
import * as useBlobUrl from '../../hooks/use-blob-url';

describe('MemberIcon', () => {

  it('render without icon', () => {
    const params = {
      name: 'Megan Bowen',
      icon: undefined
    };
    jest
      .spyOn(useBlobUrl, 'useBlobUrl')
      .mockReturnValue([ params.icon ]);
    render(<MemberIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('span');
  });

  it('render with icon', () => {
    const params = {
      name: 'Megan Bowen',
      icon: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    jest
      .spyOn(useBlobUrl, 'useBlobUrl')
      .mockReturnValue([ params.icon ]);
    render(<MemberIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('img');
  });

});
