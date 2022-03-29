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

import { ReducerContextProvider } from '../../contexts/reducer-context';
import { ServiceContextProvider } from '../../contexts/service-context';
import { CallbackPage } from '../callback-page';
import { ErrorBar } from '../error-bar';
import { HomePage } from '../home-page';
import { LoginPage } from '../login-page';
import { MainPage } from '../main-page';

interface RouterProps {
  error: string | null | undefined,
  inTeams: boolean | null | undefined
}

export default React.memo(function Router ({
  error,
  inTeams
}: RouterProps): React.ReactElement | null {

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
    default:
      return null;
  }

});
