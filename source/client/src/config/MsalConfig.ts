//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    authority: import.meta.env.VITE_MSAL_AUTHORITY,
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    knownAuthorities: [
      import.meta.env.VITE_MSAL_AUTHORITY
    ],
    redirectUri: `${window.location.origin}/auth/callback`,
    navigateToLoginRequestUrl: false
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
    'TeamworkTag.Read',
    'User.Read',
    'User.ReadBasic.All'
  ]
};
