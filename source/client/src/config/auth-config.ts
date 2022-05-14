import { BrowserCacheLocation } from '@azure/msal-browser';

export const authConfig = {
  auth: {
    clientId: process.env.APP_AUTH_APP_ID,
    authority: `https://login.microsoftonline.com/${process.env.APP_AUTH_TENANT_ID}`,
    knownAuthorities: [
      `https://login.microsoftonline.com/${process.env.APP_AUTH_TENANT_ID}`
    ],
    redirectUri: `${window.location.origin}/auth/callback`
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage
  }
};

export const loginConfig = {
  scopes: [ process.env.APP_AUTH_SCOPE ]
};
