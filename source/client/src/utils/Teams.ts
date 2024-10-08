//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { HostClientType, app } from '@microsoft/teams-js';

export function isPC(context: app.Context): boolean {
  switch (context.app.host.clientType) {
    case HostClientType.desktop:
    case HostClientType.web:
      return true;
    default:
      return false;
  }
}
