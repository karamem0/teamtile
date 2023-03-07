//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from '../config/MsalConfig';

import Presenter from './App.presenter';

function App() {

  return (
    <Presenter msal={new PublicClientApplication(msalConfig)} />
  );

}

export default App;
