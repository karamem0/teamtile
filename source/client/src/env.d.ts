//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

declare namespace NodeJS {

  interface ProcessEnv {
    VITE_APPLICATIONINSIGHTS_INSTRUMENTATION_KEY: string,
    VITE_AUTH_CLIENT_ID: string,
    VITE_AUTH_TENANT_ID: string,
    VITE_CACHE_TIMEOUT: number,
    VITE_CALENDAR_APP_ID: string
  }

}
