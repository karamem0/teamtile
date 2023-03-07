//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Client } from '@microsoft/microsoft-graph-client';

import { getAccessToken } from '../managers/TokenManager';

interface GraphConfig {
  client: Client
}

let config: GraphConfig;

export function getConfig(): GraphConfig {
  if (!config) {
    config = {
      client: Client.initWithMiddleware({
        authProvider: {
          getAccessToken
        }
      })
    };
  }
  return config;
}
