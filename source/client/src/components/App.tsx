import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Provider } from '@fluentui/react-northstar';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import AppContext from '../contexts/AppContext';
import useContext from '../hooks/useContext';
import useTheme from '../hooks/useTheme';
import Error from './Error';
import Container from './Container';
import Login from './auth/Login';
import Callback from './auth/Callback';

const App: React.FC = () => {

  const [ context ] = useContext();
  const [ theme ] = useTheme({ context });
  const [ token, setToken ] = React.useState<string>();
  const [ error, setError ] = React.useState<string>();

  return (
    <ScopedCssBaseline>
      <Provider theme={theme}>
        <AppContext.Provider
          value={[
            token,
            setToken,
            error,
            setError
          ]}>
          <Grid
            className="grid-container"
            container>
            {
              error && <Error />
            }
            <BrowserRouter>
              <Switch>
                <Route
                  component={Container}
                  exact
                  path="/" />
                <Route
                  component={Login}
                  exact
                  path="/auth/login" />
                <Route
                  component={Callback}
                  exact
                  path="/auth/callback" />
              </Switch>
            </BrowserRouter>
          </Grid>
        </AppContext.Provider>
      </Provider>
    </ScopedCssBaseline>
  );

};

export default App;
