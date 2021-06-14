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
import { getCachedToken, setCachedToken } from '../utils/TokenCache';

const useClient = (): [ Client | undefined, string | undefined ] => {

  const [ token, setToken ] = React.useState<string>();
  const [ client, setClient ] = React.useState<Client>();
  const [ error, setError ] = React.useState<string>();

  const handleFailureSingleSignOn = React.useCallback((value: string) => {
    setError(value);
    microsoftTeams.appInitialization.notifyFailure({
      reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
      message: value
    });
  }, []);

  const handleSuccessSingleSignOn = React.useCallback((clientToken: string) => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/token`,
          {
            method: 'POST',
            body: clientToken,
            headers: {
              Authorization: `Bearer ${clientToken}`
            },
            mode: 'cors'
          }
        );
        if (response.ok) {
          const serverToken = await response.text();
          setCachedToken(serverToken);
          setToken(serverToken);
          microsoftTeams.appInitialization.notifySuccess();
        } else {
          if (response.status === 403) {
            microsoftTeams.authentication.authenticate({
              url: `${window.location.origin}/auth/login`,
              width: 600,
              height: 535,
              successCallback: handleSuccessConsent,
              failureCallback: handleFailureConsent
            });
          } else {
            handleFailureSingleSignOn(await response.text());
          }
        }
      } catch (error) {
        handleFailureSingleSignOn(error.toString());
      }
    })();
  }, [ handleFailureSingleSignOn ]);

  const handleFailureConsent = (value: string | undefined) => {
    setError(value);
    microsoftTeams.appInitialization.notifyFailure({
      reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
      message: value
    });
  };

  const handleSuccessConsent = (value: string | undefined) => {
    if (!value) {
      return;
    }
    setCachedToken(value);
    setToken(value);
    microsoftTeams.appInitialization.notifySuccess();
  };

  React.useEffect(() => {
    microsoftTeams.initialize(() => {
      const cachedToken = getCachedToken();
      if (cachedToken) {
        setToken(cachedToken);
        microsoftTeams.appInitialization.notifySuccess();
      } else {
        microsoftTeams.authentication.getAuthToken({
          successCallback: handleSuccessSingleSignOn,
          failureCallback: handleFailureSingleSignOn
        });
      }
    });
  }, [ handleSuccessSingleSignOn, handleFailureSingleSignOn ]);

  React.useEffect(() => {
    if (!token) {
      return;
    }
    setClient(Client.initWithMiddleware({
      authProvider: {
        getAccessToken: () => Promise.resolve(token)
      }
    }));
  }, [ token ]);

  return [
    client,
    error
  ];

};

export default useClient;
