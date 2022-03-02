//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Loader } from '@fluentui/react-northstar';

import { app, authentication } from '@microsoft/teams-js';

import { CenterLayout } from '../center-layout';

export const CallbackPage = (): React.ReactElement | null => {

  React.useEffect(() => {
    (async () => {
      await app.initialize();
      const params = (() => {
        const params: { [key: string]: string } = {};
        window.location.hash.substring(1).split('&').forEach((item) => {
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
    <div>
      <CenterLayout>
        <Loader label="Consent flow complete. Please wait..." />
      </CenterLayout>
    </div>
  );

};
