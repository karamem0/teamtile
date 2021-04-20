import { decode } from 'jsonwebtoken';

const LOCAL_STORAGE_KEY = 'access_token';

const getCachedToken = (): string | undefined => {
  const cachedToken = sessionStorage.getItem(LOCAL_STORAGE_KEY);
  if (!cachedToken) {
    return;
  }
  const decodedToken = decode(cachedToken) as { [key: string]: string };
  if (!decodedToken) {
    return;
  }
  const exp = Number.parseInt(decodedToken.exp);
  const now = Date.now();
  if (now >= exp * 1000) {
    return undefined;
  }
  return cachedToken;
};

const setCachedToken = (token: string): void => {
  sessionStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export {
  getCachedToken,
  setCachedToken
};
