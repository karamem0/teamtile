//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { css, Global } from '@emotion/react';
import ress from 'ress';

import AppLoader from './common/components/AppLoader';
import Snackbar from './common/components/Snackbar';
import CallbackPage from './features/auth/pages/CallbackPage';
import LoginPage from './features/auth/pages/LoginPage';
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

ReactDOM.render(
  <React.Fragment>
    <Global styles={ress} />
    <Global
      styles={css`
        #root div {
          line-height: 1.25em;
        }
        #root,
        #root > div,
        #root > div > div {
          min-height: 100vh;
        }
        #root .ui-provider > svg {
          display: none;
        }
      `} />
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
                              @media (max-width: 599px) {
                                padding: 0.5rem;
                              }
                              @media (min-width: 600px) {
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
                    element={<LoginPage />}
                    path="/auth/login" />
                  <Route
                    element={<CallbackPage />}
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
  </React.Fragment>,
  document.getElementById('root'));
