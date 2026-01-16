//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { IConfig, IConfiguration } from '@microsoft/applicationinsights-web';

const connectionString = import.meta.env.VITE_TELEMETRY_CONNECTION_STRING;

export const telemetryConfig: IConfiguration & IConfig = {
  connectionString,
  disableFetchTracking: false,
  enableAutoRouteTracking: true,
  enableRequestHeaderTracking: true,
  enableResponseHeaderTracking: true
};
