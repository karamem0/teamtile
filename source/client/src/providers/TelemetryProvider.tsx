//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import env from '../env';

const reactPlugin = new ReactPlugin();
const connectionString = env.VITE_TELEMETRY_CONNECTION_STRING;
if (connectionString != null && connectionString.length > 0) {
  const appInsights = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: true,
      extensions: [ reactPlugin ]
    }
  });
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}

function TelemetryProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return children;

}

export default withAITracking(reactPlugin, TelemetryProvider);
