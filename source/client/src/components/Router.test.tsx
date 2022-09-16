//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import Router from './Router.presenter';

jest.mock('./AppLoader', () =>
  function AppLoader({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="AppLoader">
        {children}
      </div>
    );
  });

jest.mock('./Snackbar', () =>
  function Snackbar({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="Snackbar">
        {children}
      </div>
    );
  });

jest.mock('../features/auth/pages/CallbackPage', () =>
  function CallbackPage({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="CallbackPage">
        {children}
      </div>
    );
  });

jest.mock('../features/auth/pages/LoginPage', () =>
  function LoginPage({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="LoginPage">
        {children}
      </div>
    );
  });

jest.mock('../features/home/pages/HomePage', () =>
  function HomePage({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="HomePage">
        {children}
      </div>
    );
  });

jest.mock('../features/team/pages/TeamPage', () =>
  function TeamPage({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="TeamPage">
        {children}
      </div>
    );
  });

jest.mock('../pages/NotFoundPage', () =>
  function NotFoundPage({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="NotFoundPage">
        {children}
      </div>
    );
  });

jest.mock('../providers/ReducerProvider', () =>
  function ReducerProvider({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="ReducerProvider">
        {children}
      </div>
    );
  });

jest.mock('../providers/SnackbarProvider', () =>
  function SnackbarProvider({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="SnackbarProvider">
        {children}
      </div>
    );
  });

test('create shapshot of when app is in teams', async () => {
  const params = {
    inTeams: true
  };
  render(<Router {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when app is not in teams', async () => {
  const params = {
    inTeams: false
  };
  render(<Router {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
