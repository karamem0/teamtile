import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from '@fluentui/react-northstar';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import useContext from '../hooks/useContext';
import useTheme from '../hooks/useTheme';
import Container from './Container';
import Login from './auth/Login';
import Callback from './auth/Callback';

const App: React.FC = () => {

  const [ context ] = useContext();
  const [ theme ] = useTheme({ context });

  return (
    <ScopedCssBaseline>
      <Provider theme={theme}>
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
      </Provider>
    </ScopedCssBaseline>
  );

};

export default App;
