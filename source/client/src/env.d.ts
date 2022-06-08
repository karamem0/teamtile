//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

declare namespace NodeJS {

  interface ProcessEnv {
    APP_AUTH_APP_ID: string,
    APP_AUTH_SCOPE: string,
    APP_AUTH_SERVER_URL: string,
    APP_AUTH_TENANT_ID: string,
    APP_CACHE_TIMEOUT: number,
    APP_CHANNEL_CALENDAR_APP_ID: string,
    APP_INSIGHTS_INSTRUMENTATION_KEY: string
  }

}
