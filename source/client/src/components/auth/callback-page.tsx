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
import { app, authentication } from '@microsoft/teams-js';
// Fluent UI
import { Loader } from '@fluentui/react-northstar';

export const CallbackPage = (): React.ReactElement | null => {

  React.useEffect(() => {
    (async () => {
      await app.initialize();
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
        authentication.notifySuccess(token);
      } else {
        authentication.notifyFailure(params['error_description'] ?? params.error ?? 'unknown');
      }
    })();
  }, []);

  return (
    <div className="panel panel-center">
      <Loader label="Consent flow complete. Please wait..." />
    </div>
  );

};
