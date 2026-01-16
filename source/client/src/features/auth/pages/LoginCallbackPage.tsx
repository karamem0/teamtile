//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app, authentication } from '@microsoft/teams-js';
import { loginParams } from '../../../config/MsalConfig';
import { useMsal } from '@azure/msal-react';

import Presenter from './LoginCallbackPage.presenter';

function LoginCallbackPage() {

  const {
    accounts,
    inProgress,
    instance
  } = useMsal();

  React.useEffect(() => {
    (async () => {
      if (inProgress !== 'none') {
        return;
      }
      try {
        await app.initialize();
        const account = accounts[0];
        if (account != null) {
          const result = await instance.acquireTokenSilent({
            ...loginParams,
            account
          });
          if (result != null) {
            authentication.notifySuccess(result.accessToken);
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : Object.prototype.toString.call(error);
        console.error(message);
        authentication.notifyFailure(message);
      }
    })();
  }, [
    accounts,
    inProgress,
    instance
  ]);

  return (
    <Presenter />
  );

}

export default LoginCallbackPage;
