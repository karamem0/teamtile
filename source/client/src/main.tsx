//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import ReactDOM from 'react-dom/client';

import * as ress from 'ress';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { Global, css } from '@emotion/react';
import DrawerProvider from './common/providers/DrawerProvider';
import Error404Page from './features/error/pages/Error404Page';
import Error500Page from './features/error/pages/Error500Page';
import { ErrorBoundary } from 'react-error-boundary';
import HomePage from './features/home/pages/HomePage';
import IntlProvider from './providers/IntlProvider';
import LoginCallbackPage from './features/auth/pages/LoginCallbackPage';
import LoginRedirectPage from './features/auth/pages/LoginRedirectPage';
import MsalProvider from './providers/MsalProvider';
import Snackbar from './common/components/Snackbar';
import SnackbarProvider from './common/providers/SnackbarProvider';
import StoreProvider from './providers/StoreProvider';
import TeamPage from './features/team/pages/TeamPage';
import TeamsAuthenticator from './common/components/TeamsAuthenticator';
import TeamsInitializer from './common/components/TeamsInitializer';
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
                                        <SnackbarProvider>
                                          <DrawerProvider>
                                            <Snackbar />
                                            <TeamPage />
                                          </DrawerProvider>
                                        </SnackbarProvider>
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
