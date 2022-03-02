//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import * as ErrorContext from '../../contexts/error-context';
import { ErrorBar } from '../error-bar';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('ErrorBar', () => {

  it('create shapshot', () => {
    jest
      .spyOn(ErrorContext, 'useErrorContext')
      .mockReturnValue({
        error: 'something went wrong',
        setError: jest.fn()
      });
    render(<ErrorBar />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
