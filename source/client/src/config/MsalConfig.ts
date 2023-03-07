//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    authority: `https://login.microsoftonline.com/${process.env.VITE_AUTH_TENANT_ID}`,
    clientId: process.env.VITE_AUTH_CLIENT_ID,
    knownAuthorities: [
      `https://login.microsoftonline.com/${process.env.VITE_AUTH_TENANT_ID}`
    ],
    redirectUri: `${window.location.origin}/auth/callback`
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage
  }
};

export const loginParams = {
  scopes: [
    'Channel.ReadBasic.All',
    'Group.Read.All',
    'Team.ReadBasic.All',
    'TeamMember.Read.All',
    'User.Read',
    'User.ReadBasic.All'
  ]
};
