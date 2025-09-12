//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  AppInsightsContext,
  ReactPlugin,
  withAITracking
} from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { telemetryConfig } from '../config/TelemetryConfig';

const reactPlugin = new ReactPlugin();

try {
  const appInsights = new ApplicationInsights({
    config: {
      ...telemetryConfig,
      extensions: [
        reactPlugin
      ]
    }
  });
  appInsights.loadAppInsights();
  appInsights.trackPageView();
} catch (error) {
  console.error(error);
}

function TelemetryProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );

}

export default withAITracking(reactPlugin, TelemetryProvider);
