//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import { App } from '../app';

jest.mock('../app-insights', () => ({
  AppInsights: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="AppInsights">
      {children}
    </div>
  )
}));

jest.mock('../container', () => ({
  Container: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="Container">
      {children}
    </div>
  )
}));

jest.mock('../../contexts/error-context', () => ({
  ErrorContextProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ErrorContextProvider">
      {children}
    </div>
  )
}));

jest.mock('../../providers/theme-provider', () => ({
  ThemeProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ThemeProvider">
      {children}
    </div>
  )
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('App', () => {

  it('create shapshot', () => {
    render(<App />);
    expect(screen.queryAllByText(/^.*$/)[0]).toMatchSnapshot();
  });

});
