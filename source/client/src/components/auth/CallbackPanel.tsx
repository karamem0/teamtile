//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Loader } from '@fluentui/react-northstar';

const CallbackPanel: React.FC = () => {

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
        microsoftTeams.authentication.notifyFailure(params['error_description'] ?? params.error ?? 'unknown');
      }
    });
  }, []);

  return (
    <div className="panel panel-center">
      <Loader label="Consent flow complete. Please wait..." />
    </div>
  );

};

export default CallbackPanel;
