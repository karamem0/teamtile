//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory({ basename: '' });

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APP_INSIGHTS_INSTRUMENTATION_KEY,
    extensions: [ reactPlugin ],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});

appInsights.loadAppInsights();

export const AppInsights = withAITracking(
  reactPlugin,
  ({ children }): React.ReactElement | null => (
    <React.Fragment>
      {children}
    </React.Fragment>
  ),
  'AppInsights');
