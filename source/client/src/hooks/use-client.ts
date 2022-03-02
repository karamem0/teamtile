//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Client } from '@microsoft/microsoft-graph-client';
import { app } from '@microsoft/teams-js';

import {
  getCachedToken,
  getClientToken,
  getServerToken,
  setCachedToken
} from '../utils/token-manager';

export const useClient = (): [ Client | null, string | null ] => {

  const [ client, setClient ] = React.useState<Client | null>(null);
  const [ error, setError ] = React.useState<string | null>(null);

  const getAccessToken = React.useCallback(async () => {
    let token = getCachedToken();
    if (!token) {
      const clientToken = await getClientToken();
      const serverToken = await getServerToken(clientToken);
      setCachedToken(serverToken);
      token = serverToken;
    }
    return token;
  }, []);

  React.useEffect(() => {
    (async () => {
      await app.initialize();
      try {
        await getAccessToken();
        setClient(Client.initWithMiddleware({
          authProvider: {
            getAccessToken: getAccessToken
          }
        }));
        app.notifySuccess();
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        setError(message);
        app.notifyFailure({
          reason: app.FailedReason.AuthFailed,
          message: message
        });
      }
    })();
  }, [
    getAccessToken
  ]);

  return [
    client,
    error
  ];

};
