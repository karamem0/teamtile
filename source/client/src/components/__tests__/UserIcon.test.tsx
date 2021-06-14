//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { render, screen } from '@testing-library/react';
import UserIcon from '../UserIcon';
import * as useUserIcon from '../../hooks/useUserIcon';

describe('UserIcon', () => {

  it('render without icon', () => {
    const params = {
      id: '48d31887-5fad-4d73-a9f5-3c356e68a038',
      name: 'Megan Bowen',
      icon: undefined
    };
    jest
      .spyOn(useUserIcon, 'default')
      .mockReturnValue([ params.icon ]);
    render(<UserIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('span');
  });

  it('render with icon', () => {
    const params = {
      id: '48d31887-5fad-4d73-a9f5-3c356e68a038',
      name: 'Megan Bowen',
      icon: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    jest
      .spyOn(useUserIcon, 'default')
      .mockReturnValue([ params.icon ]);
    render(<UserIcon {...params} />);
    expect(screen.getByTitle(params.name).localName).toBe('img');
  });

});
