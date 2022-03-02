//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Loader } from '@fluentui/react-northstar';

import { nanoid } from 'nanoid';

import { CenterLayout } from '../center-layout';

export const LoginPage = (): React.ReactElement | null => {

  React.useEffect(() => {
    const url = `https://login.microsoftonline.com/${process.env.REACT_APP_AUTH_TENANT_ID}/oauth2/v2.0/authorize`;
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_AUTH_APP_ID,
      response_type: 'token',
      scope: process.env.REACT_APP_AUTH_SCOPE,
      redirect_uri: `${window.location.origin}/auth/callback`,
      nonce: nanoid(16)
    }).toString();
    window.location.assign(`${url}?${params}`);
  }, [ ]);

  return (
    <CenterLayout>
      <Loader label="Redirecting to consent page..." />
    </CenterLayout>
  );

};
