//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import Router from '../presenter';

jest.mock('../../home-page', () => ({
  HomePage: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="HomePage">
      {children}
    </div>
  )
}));

jest.mock('../../main-page', () => ({
  MainPage: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="MainPage">
      {children}
    </div>
  )
}));

jest.mock('../../../contexts/reducer-context', () => ({
  ReducerContextProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ReducerContextProvider">
      {children}
    </div>
  )
}));

jest.mock('../../../contexts/service-context', () => ({
  ServiceContextProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ServiceContextProvider">
      {children}
    </div>
  )
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Router', () => {

  it('create shapshot if app is in teams', () => {
    const params = {
      error: undefined,
      inTeams: true
    };
    render(<Router {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot if app is not in teams', () => {
    const params = {
      error: undefined,
      inTeams: false
    };
    render(<Router {...params} />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
