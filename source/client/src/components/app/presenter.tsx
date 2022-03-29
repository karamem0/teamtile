//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { ErrorContextProvider } from '../../contexts/error-context';
import { AppInsights } from '../app-insights';
import { Router } from '../router';
import { ThemeProvider } from '../theme-provider';

interface AppProps {
  instance: IPublicClientApplication
}

export default React.memo(function App ({
  instance
}: AppProps): React.ReactElement | null {

  return (
    <AppInsights>
      <MsalProvider instance={instance}>
        <ThemeProvider>
          <ErrorContextProvider>
            <Router />
          </ErrorContextProvider>
        </ThemeProvider>
      </MsalProvider>
    </AppInsights>
  );

});
