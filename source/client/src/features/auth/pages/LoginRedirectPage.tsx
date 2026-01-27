//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useMsal } from '@azure/msal-react';
import { app, authentication } from '@microsoft/teams-js';
import { loginParams } from '../../../config/MsalConfig';

import Presenter from './LoginRedirectPage.presenter';

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
