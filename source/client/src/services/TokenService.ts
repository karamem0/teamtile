//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { authentication } from '@microsoft/teams-js';

import decode from 'jwt-decode';

import { loginParams } from '../config/MsalConfig';

export async function getClientToken(): Promise<string> {
  return await authentication.getAuthToken();
}

export async function getServerToken(token: string): Promise<string> {
  const response = await fetch(
    '/api/token',
    {
      method: 'POST',
      body: JSON.stringify({
        scope: loginParams.scopes.join(' ')
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

export function getCachedToken(): string | undefined {
  const token = sessionStorage.getItem(process.env.VITE_AUTH_CLIENT_ID);
  if (!token) {
    return;
  }
  const jwt = decode(token) as Record<string, string>;
  if (!jwt) {
    return;
  }
  const exp = Number.parseInt(jwt.exp);
  const now = Date.now();
  if (now >= exp * 1000) {
    return;
  }
  return token;
}

export function setCachedToken(token: string): void {
  sessionStorage.setItem(process.env.VITE_AUTH_CLIENT_ID, token);
}
