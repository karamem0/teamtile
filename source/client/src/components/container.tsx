//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// React Router
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
// Contexts
import { useErrorContext } from '../contexts/error-context';
// Components
import { CallbackPage } from './auth/callback-page';
import { ErrorBar } from './error-bar';
import { LoginPage } from './auth/login-page';
import { MainPage } from './main-page';

export const Container = (): React.ReactElement | null => {

  const { error } = useErrorContext();

  return (
    <div className="container">
      {
        error && (
          <ErrorBar />
        )
      }
      <BrowserRouter>
        <Switch>
          <Route
            component={MainPage}
            exact
            path="/" />
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
    </div>
  );

};
