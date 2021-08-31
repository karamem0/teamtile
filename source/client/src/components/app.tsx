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
import { AppContextProvider } from '../contexts/app-context';
import { IndexedDbProvider } from '../contexts/indexed-db-context';
import { useTheme } from '../hooks/use-theme';
import ErrorBar from './error-bar';
import Container from './container';
import LoginPanel from './auth/login-panel';
import CallbackPanel from './auth/callback-panel';

const App = (): React.ReactElement => {

  const [ theme ] = useTheme();
  const [ client, setClient ] = React.useState<Client>();
  const [ error, setError ] = React.useState<string>();

  return (
    <Provider theme={theme}>
      <AppContextProvider
        value={{
          client,
          setClient,
          error,
          setError
        }}>
        <IndexedDbProvider>
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
        </IndexedDbProvider>
      </AppContextProvider>
    </Provider>
  );

};

export default App;
