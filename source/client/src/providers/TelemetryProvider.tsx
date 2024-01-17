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

const reactPlugin = new ReactPlugin();
const connectionString = process.env.VITE_TELEMETRY_CONNECTION_STRING;
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

function TelemetryProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default withAITracking(reactPlugin, TelemetryProvider);
