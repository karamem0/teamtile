//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ErrorContextProvider } from '../contexts/error-context';
import { ThemeProvider } from '../providers/theme-provider';

import { AppInsights } from './app-insights';
import { Container } from './container';

export const App = (): React.ReactElement | null => {

  return (
    <AppInsights>
      <ThemeProvider>
        <ErrorContextProvider>
          <Container />
        </ErrorContextProvider>
      </ThemeProvider>
    </AppInsights>
  );

};
