import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from '@fluentui/react-northstar';
import AppContext from '../contexts/AppContext';
import useContext from '../hooks/useContext';
import useTheme from '../hooks/useTheme';
import ErrorBar from './ErrorBar';
import Container from './Container';
import LoginPanel from './auth/LoginPanel';
import CallbackPanel from './auth/CallbackPanel';

const App: React.FC = () => {

  const [ context ] = useContext();
  const [ theme ] = useTheme({ context });
  const [ token, setToken ] = React.useState<string>();
  const [ error, setError ] = React.useState<string>();

  return (
    <Provider theme={theme}>
      <AppContext.Provider
        value={[
          token,
          setToken,
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
