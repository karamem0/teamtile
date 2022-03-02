//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import { css } from '@emotion/react';

import { useErrorContext } from '../contexts/error-context';
import { ReducerContextProvider } from '../contexts/reducer-context';
import { ServiceContextProvider } from '../contexts/service-context';
import { useInTeams } from '../hooks/use-in-teams';

import { CallbackPage } from './auth/callback-page';
import { LoginPage } from './auth/login-page';
import { ErrorBar } from './error-bar';
import { HomePage } from './home-page';
import { MainPage } from './main-page';

export const Container = (): React.ReactElement | null => {

  const { error } = useErrorContext();
  const { inTeams } = useInTeams();

  switch (inTeams) {
    case true:
      return (
        <div
          css={css`
            @media (max-width: 599px) {
              padding: 0.5rem;
            }
            @media (min-width: 600px) {
              padding: 1rem;
            }
          `}>
          {
            error && (
              <ErrorBar />
            )
          }
          <ReducerContextProvider>
            <ServiceContextProvider>
              <MainPage />
            </ServiceContextProvider>
          </ReducerContextProvider>
        </div>
      );
    case false:
      return (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/">
              <HomePage />
            </Route>
            <Route
              component={LoginPage}
              exact
              path="/auth/login" />
            <Route
              component={CallbackPage}
              exact
              path="/auth/callback" />
          </Switch>
        </BrowserRouter>
      );
    case null:
      return null;
  }

};
