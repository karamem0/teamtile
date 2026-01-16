//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider as Provider } from '@azure/msal-react';
import { msalConfig } from '../config/MsalConfig';

function MsalProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ instance, setInstance ] = React.useState<IPublicClientApplication>();

  React.useEffect(() => {
    (async () => {
      const instance = new PublicClientApplication(msalConfig);
      await instance.initialize();
      setInstance(instance);
    })();
  }, []);

  return instance ? (
    <Provider instance={instance}>
      {children}
    </Provider>
  ) : null;

}

export default MsalProvider;
