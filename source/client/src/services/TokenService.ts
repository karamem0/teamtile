//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { authentication } from '@microsoft/teams-js';
import { jwtDecode } from 'jwt-decode';
import { loginParams } from '../config/MsalConfig';

export async function getClientToken(): Promise<string> {
  return await authentication.getAuthToken();
}

export async function getServerToken(token: string): Promise<string> {
  const response = await fetch(
    '/api/token',
    {
      body: JSON.stringify({
        scope: loginParams.scopes.join(' ')
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    }
  );
  const json = await response.json();
  if (response.ok) {
    return json.token;
  }
  if (response.status === 403) {
    return await authentication.authenticate({
      height: 535,
      url: `${window.location.origin}/auth/login`,
      width: 600
    });
  }
  throw new Error(json.error);
}

export function getCachedToken(): string | undefined {
  const token = sessionStorage.getItem(import.meta.env.VITE_MSAL_CLIENT_ID);
  if (token == null) {
    return;
  }
  const jwt = jwtDecode(token);
  const exp = jwt.exp ?? 0;
  const now = Date.now();
  if (now >= exp * 1000) {
    return;
  }
  return token;
}

export function setCachedToken(token: string): void {
  sessionStorage.setItem(import.meta.env.VITE_MSAL_CLIENT_ID, token);
}
