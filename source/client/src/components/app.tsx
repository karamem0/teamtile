//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Fluent UI
import { Provider } from '@fluentui/react-northstar';
// Components
import { Container } from './container';
// Contexts
import { ErrorContextProvider } from '../contexts/error-context';
// Hooks
import { useTheme } from '../hooks/use-theme';

export const App = (): React.ReactElement | null => {

  const [ theme ] = useTheme();

  return (
    <Provider theme={theme}>
      <ErrorContextProvider>
        <Container />
      </ErrorContextProvider>
    </Provider>
  );

};
