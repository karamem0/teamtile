//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app, authentication } from '@microsoft/teams-js';

import { useMsal } from '@azure/msal-react';

import { loginParams } from '../../../config/MsalConfig';

import Presenter from './LoginRedirectPage.presenter';

function LoginRedirectPage() {

  const { instance } = useMsal();

  React.useEffect(() => {
    (async () => {
      await app.initialize();
      try {
        const result = await instance.handleRedirectPromise();
        if (result) {
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
