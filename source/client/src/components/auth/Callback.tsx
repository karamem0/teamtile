import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Grid } from '@material-ui/core';
import { Loader } from '@fluentui/react-northstar';

const Callback: React.FC = () => {

  React.useEffect(() => {
    microsoftTeams.initialize(() => {
      const params = (() => {
        const params: { [key: string]: string } = {};
        window.location.hash.substr(1).split('&').forEach((item) => {
          const [ key, value ] = item.split('=');
          params[key] = decodeURIComponent(value.replace(/\+/g, '%20'));
        });
        return params;
      })();
      const token = params['access_token'];
      if (token) {
        microsoftTeams.authentication.notifySuccess(token);
      } else {
        microsoftTeams.authentication.notifyFailure(params['error_description']);
      }
    });
  }, []);

  return (
    <Grid
      className="grid-container"
      container>
      <Grid
        className="grid-item"
        item
        xs={12}>
        <Loader label="Consent flow complete. Please wait..." />
      </Grid>
    </Grid>
  );

};

export default Callback;
