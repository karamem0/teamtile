//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Client } from '@microsoft/microsoft-graph-client';
import {
  getClientToken,
  getServerToken,
  getCachedToken,
  setCachedToken
} from '../utils/token-manager';

const useClient = (): [ Client | undefined, string | undefined ] => {

  const [ client, setClient ] = React.useState<Client>();
  const [ error, setError ] = React.useState<string>();

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
    microsoftTeams.initialize(async () => {
      try {
        await getAccessToken();
        setClient(Client.initWithMiddleware({
          authProvider: {
            getAccessToken: getAccessToken
          }
        }));
        microsoftTeams.appInitialization.notifySuccess();
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        console.error(message);
        setError(message);
        microsoftTeams.appInitialization.notifyFailure({
          reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
          message: message
        });
      }
    });
  }, [ getAccessToken ]);

  return [
    client,
    error
  ];

};

export { useClient };
