import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Grid } from '@material-ui/core';
import { Loader } from '@fluentui/react-northstar';
import crypto from 'crypto';
import useContext from '../../hooks/useContext';

const Login: React.FC = () => {

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
    <Grid
      className="grid-container"
      container>
      <Grid
        className="grid-item"
        item
        xs={12}>
        <Loader label="Redirecting to consent page..." />
      </Grid>
    </Grid>
  );

};

export default Login;
