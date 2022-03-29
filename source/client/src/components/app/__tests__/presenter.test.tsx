//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

jest.mock('@azure/msal-browser', () => ({
  PublicClientApplication: jest.fn()
}));

jest.mock('@azure/msal-react', () => ({
  MsalProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="MsalProvider">
      {children}
    </div>
  )
}));

jest.mock('../../app-insights', () => ({
  AppInsights: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="AppInsights">
      {children}
    </div>
  )
}));

jest.mock('../../router', () => ({
  Router: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="Router">
      {children}
    </div>
  )
}));

jest.mock('../../../config/auth-config', () => ({
  authConfig: {}
}));

jest.mock('../../../contexts/error-context', () => ({
  ErrorContextProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ErrorContextProvider">
      {children}
    </div>
  )
}));

jest.mock('../../theme-provider', () => ({
  ThemeProvider: ({ children }: React.PropsWithChildren<unknown>) => (
    <div data-testid="ThemeProvider">
      {children}
    </div>
  )
}));

import React from 'react';

import { render, screen } from '@testing-library/react';

import App from '../presenter';

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
