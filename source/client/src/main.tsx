//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import ReactDOM from 'react-dom/client';

import { Global, css } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import * as ress from 'ress';
import TeamsAuthenticator from './common/components/TeamsAuthenticator';
import TeamsInitializer from './common/components/TeamsInitializer';
import DrawerProvider from './common/providers/DrawerProvider';
import ToastProvider from './common/providers/ToastProvider';
import LoginCallbackPage from './features/auth/pages/LoginCallbackPage';
import LoginRedirectPage from './features/auth/pages/LoginRedirectPage';
import Error404Page from './features/error/pages/Error404Page';
import Error500Page from './features/error/pages/Error500Page';
import HomePage from './features/home/pages/HomePage';
import TeamPage from './features/team/pages/TeamPage';
import IntlProvider from './providers/IntlProvider';
import MsalProvider from './providers/MsalProvider';
import StoreProvider from './providers/StoreProvider';
import TelemetryProvider from './providers/TelemetryProvider';
import ThemeProvider from './providers/ThemeProvider';

ReactDOM
  .createRoot(document.getElementById('root') as Element)
  .render(
    <React.StrictMode>
      <Global styles={ress} />
      <TelemetryProvider>
        <BrowserRouter>
          <TeamsInitializer>
            {
              (inTeams) => (
                <IntlProvider>
                  <ThemeProvider>
                    <MsalProvider>
                      <ErrorBoundary
                        fallbackRender={(props) => (
                          <Error500Page error={props.error instanceof Error ? props.error : undefined} />
                        )}>
                        <Routes>
                          {
                            inTeams ? (
                              <Route
                                path="/"
                                element={(
                                  <div
                                    css={css`
                                    padding: 0.5rem;
                                    @media (width >= 600px) {
                                      padding: 1rem;
                                    }
                                  `}>
                                    <TeamsAuthenticator>
                                      <StoreProvider>
                                        <ToastProvider>
                                          <DrawerProvider>
                                            <TeamPage />
                                          </DrawerProvider>
                                        </ToastProvider>
                                      </StoreProvider>
                                    </TeamsAuthenticator>
                                  </div>
                                )} />
                            ) : (
                              <Route
                                path="/"
                                element={(
                                  <HomePage />
                                )} />
                            )
                          }
                          <Route
                            path="/auth/login"
                            element={(
                              <LoginRedirectPage />)} />
                          <Route
                            path="/auth/callback"
                            element={(
                              <LoginCallbackPage />)} />
                          <Route
                            path="*"
                            element={(
                              <Error404Page />
                            )} />
                        </Routes>
                      </ErrorBoundary>
                    </MsalProvider>
                  </ThemeProvider>
                </IntlProvider>
              )
            }
          </TeamsInitializer>
        </BrowserRouter>
      </TelemetryProvider>
    </React.StrictMode>
  );
