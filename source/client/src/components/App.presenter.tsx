//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import ErrorPage from '../pages/ErrorPage';
import ThemeProvider from '../providers/ThemeProvider';

import AppInsights from './AppInsights';
import Router from './Router';

interface AppProps {
  msal: IPublicClientApplication
}

function App(props: AppProps) {

  const { msal } = props;

  return (
    <AppInsights>
      <MsalProvider instance={msal}>
        <ThemeProvider>
          <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>
            <Router />
          </ErrorBoundary>
        </ThemeProvider>
      </MsalProvider>
    </AppInsights>
  );

}

export default React.memo<AppProps>(App);
