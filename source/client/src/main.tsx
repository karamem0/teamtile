//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from 'react-error-boundary';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import { Global, css } from '@emotion/react';
import * as ress from 'ress';

import AppLoader from './common/components/AppLoader';
import Snackbar from './common/components/Snackbar';
import LoginCallbackPage from './features/auth/pages/LoginCallbackPage';
import LoginRedirectPage from './features/auth/pages/LoginRedirectPage';
import Error404Page from './features/error/pages/Error404Page';
import Error500Page from './features/error/pages/Error500Page';
import HomePage from './features/home/pages/HomePage';
import TeamPage from './features/team/pages/TeamPage';
import IntlProvider from './providers/IntlProvider';
import MsalProvider from './providers/MsalProvider';
import ReducerProvider from './providers/ReducerProvider';
import SnackbarProvider from './providers/SnackbarProvider';
import TelemetryProvider from './providers/TelemetryProvider';
import ThemeProvider from './providers/ThemeProvider';
import { inTeams } from './utils/Teams';

ReactDOM
  .createRoot(document.getElementById('root') as Element)
  .render(
    <React.StrictMode>
      <Global styles={ress} />
      <BrowserRouter>
        <TelemetryProvider>
          <IntlProvider>
            <ThemeProvider>
              <MsalProvider>
                <ErrorBoundary fallbackRender={(props) => <Error500Page {...props} />}>
                  <Routes>
                    {
                      inTeams() ? (
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
                              <ReducerProvider>
                                <SnackbarProvider>
                                  <Snackbar />
                                  <AppLoader>
                                    <TeamPage />
                                  </AppLoader>
                                </SnackbarProvider>
                              </ReducerProvider>
                            </div>
                          )} />
                      ) : (
                        <Route
                          element={<HomePage />}
                          path="/" />
                      )
                    }
                    <Route
                      element={<LoginRedirectPage />}
                      path="/auth/login" />
                    <Route
                      element={<LoginCallbackPage />}
                      path="/auth/callback" />
                    <Route
                      element={<Error404Page />}
                      path="*" />
                  </Routes>
                </ErrorBoundary>
              </MsalProvider>
            </ThemeProvider>
          </IntlProvider>
        </TelemetryProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
