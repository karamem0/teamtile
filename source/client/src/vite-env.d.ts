//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

/// <reference types="vite/client" />

declare module 'ress';

interface ImportMeta {
  env: ImportMetaEnv
}

interface ImportMetaEnv {
  VITE_TELEMETRY_CONNECTION_STRING: string,
  VITE_AUTH_CLIENT_ID: string,
  VITE_AUTH_TENANT_ID: string,
  VITE_CACHE_TIMEOUT: number,
  VITE_CALENDAR_APP_ID: string
}
