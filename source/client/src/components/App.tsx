//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from '@fluentui/react-northstar';
import { Client } from '@microsoft/microsoft-graph-client';
import AppContext from '../contexts/AppContext';
import useTheme from '../hooks/useTheme';
import ErrorBar from './ErrorBar';
import Container from './Container';
import LoginPanel from './auth/LoginPanel';
import CallbackPanel from './auth/CallbackPanel';

const App: React.FC = () => {

  const [ theme ] = useTheme();
  const [ client, setClient ] = React.useState<Client>();
  const [ error, setError ] = React.useState<string>();

  return (
    <Provider theme={theme}>
      <AppContext.Provider
        value={[
          client,
          setClient,
          error,
          setError
        ]}>
        <div className="container">
          {
            error && <ErrorBar />
          }
          <BrowserRouter>
            <Switch>
              <Route
                component={Container}
                exact
                path="/" />
              <Route
                component={LoginPanel}
                exact
                path="/auth/login" />
              <Route
                component={CallbackPanel}
                exact
                path="/auth/callback" />
            </Switch>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </Provider>
  );

};

export default App;
