//
// Copyright (c) 2021-2025 karamem0
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

  const { inProgress, instance } = useMsal();

  React.useEffect(() => {
    (async () => {
      if (inProgress !== 'none') {
        return;
      }
      try {
        await app.initialize();
        await instance.acquireTokenRedirect(loginParams);
      } catch (error) {
        const message = error instanceof Error ? error.message : Object.prototype.toString.call(error);
        console.error(message);
        authentication.notifyFailure(message);
      }
    })();
  }, [
    inProgress,
    instance
  ]);

  return (
    <Presenter />
  );

}

export default LoginRedirectPage;
