//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ApplicationInsights, IExceptionTelemetry, ITraceTelemetry } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import env from '../env';

const reactPlugin = new ReactPlugin();

interface TelemetryContextState {
  trackException: (telemetry: IExceptionTelemetry) => void,
  trackTrace: (telemetry: ITraceTelemetry) => void
}

const TelemetryContext = React.createContext<TelemetryContextState | undefined>(undefined);

export const useTelemetry = (): TelemetryContextState => {
  const value = React.useContext(TelemetryContext);
  if (value == null) {
    throw new Error('The context is not initialzed: TelemetryContext');
  }
  return value;
};

function TelemetryProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const appInsights = React.useMemo(() => {
    const connectionString = env.VITE_TELEMETRY_CONNECTION_STRING;
    if (connectionString.length === 0) {
      return undefined;
    }
    const appInsights = new ApplicationInsights({
      config: {
        connectionString,
        enableAutoRouteTracking: true,
        extensions: [ reactPlugin ]
      }
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
    return appInsights;
  }, []);

  const value = React.useMemo(() => ({
    trackException: (telemetry: IExceptionTelemetry) => appInsights?.trackException(telemetry),
    trackTrace: (telemetry: ITraceTelemetry) => appInsights?.trackTrace(telemetry)
  }), [
    appInsights
  ]);

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );

}

export default withAITracking(reactPlugin, TelemetryProvider);
