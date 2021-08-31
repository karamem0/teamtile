//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import * as microsoftTeams from '@microsoft/teams-js';
import { decode } from 'jsonwebtoken';

const getClientToken = (): Promise<string> =>
  new Promise<string>((resolve, reject) =>
    microsoftTeams.authentication.getAuthToken({
      successCallback: (token) => resolve(token),
      failureCallback: (error) => reject(error)
    })
  );

const getServerToken = async (token: string): Promise<string> =>
  await getServerTokenSilent(token) ??
  await getServerTokenRedirect();

const getServerTokenSilent = async (token: string): Promise<string | undefined> => {
  const response = await fetch(
  `${process.env.REACT_APP_SERVER_URL}/token`,
  {
    method: 'POST',
    body: token,
    headers: {
      Authorization: `Bearer ${token}`
    },
    mode: 'cors'
  }
  );
  if (response.ok) {
    return await response.text();
  }
  if (response.status === 403) {
    return undefined;
  }
  throw await response.text();
};

const getServerTokenRedirect = (): Promise<string> =>
  new Promise<string>((resolve, reject) =>
    microsoftTeams.authentication.authenticate({
      url: `${window.location.origin}/auth/login`,
      width: 600,
      height: 535,
      successCallback: (token) => token ? resolve(token) : reject(token),
      failureCallback: (error) => reject(error)
    })
  );

const getCachedToken = (): string | undefined => {
  const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_CLIENT_ID);
  if (!token) {
    return;
  }
  const jwt = decode(token) as { [key: string]: string };
  if (!jwt) {
    return;
  }
  const exp = Number.parseInt(jwt.exp);
  const now = Date.now();
  if (now >= exp * 1000) {
    return undefined;
  }
  return token;
};

const setCachedToken = (token: string): void => {
  sessionStorage.setItem(process.env.REACT_APP_AUTH_CLIENT_ID, token);
};

export {
  getClientToken,
  getServerToken,
  getCachedToken,
  setCachedToken
};
