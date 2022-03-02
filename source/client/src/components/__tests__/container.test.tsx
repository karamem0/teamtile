//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

jest.mock('../home-page', () => ({
  HomePage: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="HomePage">
      {children}
    </div>
  )
}));

jest.mock('../main-page', () => ({
  MainPage: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="MainPage">
      {children}
    </div>
  )
}));

const errorContextValue = {
  setError: jest.fn()
};
jest.mock('../../contexts/error-context', () => ({
  useErrorContext: jest.fn().mockReturnValue(errorContextValue)
}));

jest.mock('../../contexts/reducer-context', () => ({
  ReducerContextProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ReducerContextProvider">
      {children}
    </div>
  )
}));

jest.mock('../../contexts/service-context', () => ({
  ServiceContextProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ServiceContextProvider">
      {children}
    </div>
  )
}));

const inTeamsValue = {
  inTeams: null as boolean | null
};
jest.mock('../../hooks/use-in-teams', () => ({
  useInTeams: jest.fn().mockReturnValue(inTeamsValue)
}));

import React from 'react';

import { render, screen } from '@testing-library/react';

import { Container } from '../container';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('Container', () => {

  it('create shapshot if app is in teams', () => {
    inTeamsValue.inTeams = true;
    render(<Container />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

  it('create shapshot if app is not in teams', () => {
    inTeamsValue.inTeams = false;
    render(<Container />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
