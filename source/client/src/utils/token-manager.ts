//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { authentication } from '@microsoft/teams-js';

import decode from 'jwt-decode';

export function getClientToken (): Promise<string> {
  return authentication.getAuthToken({});
}

export async function getServerToken (token: string): Promise<string> {
  const response = await fetch(
    `${process.env.APP_AUTH_SERVER_URL}/token`,
    {
      method: 'POST',
      body: JSON.stringify({
        scope: process.env.APP_AUTH_SCOPE
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }
  );
  const json = await response.json();
  if (response.ok) {
    return json.token;
  }
  if (response.status === 403) {
    return authentication.authenticate({
      url: `${window.location.origin}/auth/login`,
      width: 600,
      height: 535
    });
  }
  throw new Error(json.error);
}

export function getCachedToken (): string | null {
  const token = sessionStorage.getItem(process.env.APP_AUTH_APP_ID);
  if (!token) {
    return null;
  }
  const jwt = decode(token) as { [key: string]: string };
  if (!jwt) {
    return null;
  }
  const exp = Number.parseInt(jwt.exp);
  const now = Date.now();
  if (now >= exp * 1000) {
    return null;
  }
  return token;
}

export function setCachedToken (token: string): void {
  sessionStorage.setItem(process.env.APP_AUTH_APP_ID, token);
}
