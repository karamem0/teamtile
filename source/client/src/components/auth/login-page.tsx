//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Microsoft Teams
import * as microsoftTeams from '@microsoft/teams-js';
// Fluent UI
import { Loader } from '@fluentui/react-northstar';
// Crypto
import crypto from 'crypto';
// Hooks
import { useContext } from '../../hooks/use-context';

export const LoginPage = (): React.ReactElement | null => {

  const [ context ] = useContext();

  React.useEffect(() => {
    if (!context) {
      return;
    }
    microsoftTeams.initialize(() => {
      const url = `https://login.microsoftonline.com/${context.tid}/oauth2/v2.0/authorize`;
      const params = new URLSearchParams({
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        response_type: 'token',
        scope: process.env.REACT_APP_AUTH_SCOPE,
        redirect_uri: `${window.location.origin}/auth/callback`,
        nonce: crypto.randomBytes(16).toString('base64')
      }).toString();
      window.location.assign(`${url}?${params}`);
    });
  }, [ context ]);

  return (
    <div className="panel panel-center">
      <Loader label="Redirecting to consent page..." />
    </div>
  );

};
