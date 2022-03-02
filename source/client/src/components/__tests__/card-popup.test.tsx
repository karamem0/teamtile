//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { CardPopup } from '../card-popup';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('CardPopup', () => {

  it('create shapshot', () => {
    const params = {
      values: [],
      renderer: () => <React.Fragment />,
      predicate: jest.fn(),
      trigger: <button role="button" />,
      onOpenChange: jest.fn()
    };
    render(<CardPopup {...params} />);
    screen.getByRole('button').click();
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
