//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { app, HostClientType } from '@microsoft/teams-js';

export function inTeams(): boolean {
  if (window.parent === window.self &&
      Object.prototype.hasOwnProperty.call(window, 'nativeInterface')) {
    return true;
  }
  if (window.navigator.userAgent.includes('Teams/')) {
    return true;
  }
  if (window.name === 'embedded-page-container') {
    return true;
  }
  if (window.name === 'extension-tab-frame') {
    return true;
  }
  return false;
}

export function isPC(context: app.Context): boolean {
  switch (context.app.host.clientType) {
    case HostClientType.desktop:
    case HostClientType.web:
      return true;
    default:
      return false;
  }
}
