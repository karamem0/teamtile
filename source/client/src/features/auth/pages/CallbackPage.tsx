//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import { useMsal } from '@azure/msal-react';

import Presenter from './CallbackPage.presenter';

function CallbackPage() {

  const { instance } = useMsal();

  React.useEffect(() => {
    (async () => {
      await app.initialize();
      await instance.handleRedirectPromise();
    })();
  }, [
    instance
  ]);

  return (
    <Presenter />
  );

}

export default CallbackPage;
