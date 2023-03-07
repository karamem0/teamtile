//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import crypto from 'crypto';

import { render, screen } from '@testing-library/react';

import { PublicClientApplication } from '@azure/msal-browser';

import App from './App.presenter';

jest.mock('./AppInsights', () =>
  function AppInsights({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="AppInsights">
        {children}
      </div>
    );
  });

jest.mock('./Router', () =>
  function Router({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="Router">
        {children}
      </div>
    );
  });

global.crypto = crypto as Crypto;

test('create shapshot', async () => {
  const params = {
    msal: new PublicClientApplication({
      auth: {
        clientId: '00000000-0000-0000-0000-000000000000'
      }
    })
  };
  render(<App {...params} />);
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
