//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import CardPopup from '../presenter';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('CardPopup', () => {

  it('create shapshot', () => {
    const params = {
      items: [],
      renderer: () => <React.Fragment />,
      trigger: <button role="button" />,
      onInputChange: jest.fn(),
      onOpenChange: jest.fn()
    };
    render(<CardPopup {...params} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
