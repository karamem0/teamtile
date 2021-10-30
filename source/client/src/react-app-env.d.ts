//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

/// <reference types="react-scripts" />
declare namespace NodeJS {

  interface ProcessEnv {
    REACT_APP_SERVER_URL: string,
    REACT_APP_AUTH_CLIENT_ID: string,
    REACT_APP_AUTH_TENANT_ID: string,
    REACT_APP_AUTH_SCOPE: string
  }

}
