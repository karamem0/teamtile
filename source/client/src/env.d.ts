//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

declare namespace NodeJS {

  interface ProcessEnv {
    VITE_TELEMETRY_CONNECTION_STRING: string,
    VITE_AUTH_CLIENT_ID: string,
    VITE_AUTH_TENANT_ID: string,
    VITE_CACHE_TIMEOUT: number,
    VITE_CALENDAR_APP_ID: string
  }

}
