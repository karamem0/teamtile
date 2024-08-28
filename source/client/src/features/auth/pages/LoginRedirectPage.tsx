//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app, authentication } from '@microsoft/teams-js';
import Presenter from './LoginRedirectPage.presenter';
import { loginParams } from '../../../config/MsalConfig';
import { useMsal } from '@azure/msal-react';

function LoginRedirectPage() {

  const { instance } = useMsal();

  React.useEffect(() => {
    (async () => {
      await app.initialize();
      try {
        const result = await instance.handleRedirectPromise();
        if (result != null) {
          authentication.notifySuccess(result.accessToken);
        } else {
          await instance.acquireTokenRedirect(loginParams);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : Object.prototype.toString.call(error);
        console.error(message);
        authentication.notifyFailure(message);
      }
    })();
  }, [
    instance
  ]);

  return (
    <Presenter />
  );

}

export default LoginRedirectPage;
