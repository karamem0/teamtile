//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  getCachedToken,
  getClientToken,
  getServerToken,
  setCachedToken
} from '../services/TokenService';

export async function getAccessToken(): Promise<string> {
  const token = getCachedToken();
  if (token) {
    return token;
  }
  const clientToken = await getClientToken();
  const serverToken = await getServerToken(clientToken);
  setCachedToken(serverToken);
  return serverToken;
}
