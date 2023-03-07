//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import { css } from '@emotion/react';

import CallbackPage from '../features/auth/pages/CallbackPage';
import LoginPage from '../features/auth/pages/LoginPage';
import HomePage from '../features/home/pages/HomePage';
import TeamPage from '../features/team/pages/TeamPage';
import NotFoundPage from '../pages/NotFoundPage';
import ReducerProvider from '../providers/ReducerProvider';
import SnackbarProvider from '../providers/SnackbarProvider';

import AppLoader from './AppLoader';
import Snackbar from './Snackbar';

interface RouterProps {
  inTeams?: boolean
}

function Router(props: RouterProps) {

  const { inTeams } = props;

  return (
    <BrowserRouter>
      <Routes>
        {
          inTeams ? (
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
          element={<NotFoundPage />}
          path="*" />
      </Routes>
    </BrowserRouter>
  );

}

export default React.memo(Router);
