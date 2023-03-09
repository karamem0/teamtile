//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider as Provider } from '@azure/msal-react';

import { msalConfig } from '../config/MsalConfig';

function MsalProvider(props: React.PropsWithChildren<unknown>) {

  const { children } = props;

  return (
    <Provider instance={new PublicClientApplication(msalConfig)}>
      {children}
    </Provider>
  );

}

export default MsalProvider;
