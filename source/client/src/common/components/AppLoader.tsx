//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './AppLoader.presenter';
import { app } from '@microsoft/teams-js';
import { getAccessToken } from '../../managers/TokenManager';

function AppLoader(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ loading, setLoading ] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await app.initialize();
        await getAccessToken();
        app.notifyAppLoaded();
        app.notifySuccess();
      } catch (error) {
        app.notifyFailure({
          reason: app.FailedReason.AuthFailed,
          message: error instanceof Error ? error.message : Object.prototype.toString.call(error)
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Presenter loading={loading}>
      {children}
    </Presenter>
  );

}

export default AppLoader;
