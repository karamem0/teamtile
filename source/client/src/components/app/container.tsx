//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { PublicClientApplication } from '@azure/msal-browser';

import { authConfig } from '../../config/auth-config';

import Presenter from './presenter';

export default function App (): React.ReactElement | null {

  return (
    <Presenter instance={new PublicClientApplication(authConfig)} />
  );

}
