//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Microsoft Teams
import { authentication } from '@microsoft/teams-js';
// Json Web Token
import { decode } from 'jsonwebtoken';

export const getClientToken = (): Promise<string> =>
  authentication.getAuthToken({});

export const getServerToken = async (token: string): Promise<string> => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/token`,
    {
      method: 'POST',
      body: JSON.stringify({
        scope: process.env.REACT_APP_AUTH_SCOPE
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
};

export const getCachedToken = (): string | null => {
  const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_CLIENT_ID);
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
};

export const setCachedToken = (token: string): void => {
  sessionStorage.setItem(process.env.REACT_APP_AUTH_CLIENT_ID, token);
};
