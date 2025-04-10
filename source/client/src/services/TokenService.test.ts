//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  getCachedToken,
  getClientToken,
  getServerToken
} from './TokenService';
import { Mock } from 'vitest';
import { authentication } from '@microsoft/teams-js';
import { jwtDecode } from 'jwt-decode';

vi.mock('jwt-decode');
vi.mock('@microsoft/teams-js');

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  sessionStorage.clear();
});

describe('getClientToken', () => {

  it('should get a client token', async () => {
    const params = {
      token: 'sample_token'
    };
    const expected = {
      token: 'sample_token'
    };
    const mock = authentication.getAuthToken as Mock;
    mock.mockResolvedValue(params.token);
    const actual = await getClientToken();
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

});

describe('getServerToken', () => {

  it('should get a server token when the server responds with a "200" status code', async () => {
    const params = {
      token: 'sample_token',
      status: 200
    };
    const expected = {
      token: 'sample_token'
    };
    vi.spyOn(global, 'fetch').mockImplementation((url, init) => {
      const headers = init?.headers as Record<string, string>;
      if (init?.method !== 'POST') {
        return Promise.resolve(new Response(
          null,
          {
            status: 405
          }
        ));
      }
      if (!url?.toString()?.endsWith('/api/token')) {
        return Promise.resolve(new Response(
          null,
          {
            status: 404
          }
        ));
      }
      if (headers.Authorization !== `Bearer ${params.token}`) {
        return Promise.resolve(new Response(
          null,
          {
            status: 401
          }
        ));
      }
      if (headers['Content-Type'] !== 'application/json') {
        return Promise.resolve(new Response(
          null,
          {
            status: 400
          }
        ));
      }
      return Promise.resolve(new Response(
        JSON.stringify({
          token: params.token
        }),
        {
          status: params.status
        }
      ));
    });
    const actual = await getServerToken(params.token);
    expect(actual).toStrictEqual(expected.token);
  });

  it('should get a server token when the server responds with a "403" status code', async () => {
    const params = {
      token: 'sample_token',
      status: 403,
      error: 'invalid_grant'
    };
    const expected = {
      token: 'sample_token'
    };
    vi.spyOn(global, 'fetch').mockImplementation((url, init) => {
      const headers = init?.headers as Record<string, string>;
      if (init?.method !== 'POST') {
        return Promise.resolve(new Response(
          null,
          {
            status: 405
          }
        ));
      }
      if (!url?.toString()?.endsWith('/api/token')) {
        return Promise.resolve(new Response(
          null,
          {
            status: 404
          }
        ));
      }
      if (headers.Authorization !== `Bearer ${params.token}`) {
        return Promise.resolve(new Response(
          null,
          {
            status: 401
          }
        ));
      }
      if (headers['Content-Type'] !== 'application/json') {
        return Promise.resolve(new Response(
          null,
          {
            status: 400
          }
        ));
      }
      return Promise.resolve(new Response(
        JSON.stringify({
          error: params.error
        }),
        {
          status: params.status
        }
      ));
    });
    const mock = authentication.authenticate as Mock;
    mock.mockResolvedValue(params.token);
    const actual = await getServerToken(params.token);
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

  it('should raise an error when the server responds with a "500" status code', async () => {
    const params = {
      token: 'sample_token',
      status: 500,
      error: 'unknown_error'
    };
    const expected = {
      error: 'unknown_error'
    };
    vi.spyOn(global, 'fetch').mockImplementation((url, init) => {
      const headers = init?.headers as Record<string, string>;
      if (init?.method !== 'POST') {
        return Promise.resolve(new Response(
          null,
          {
            status: 405
          }
        ));
      }
      if (!url?.toString()?.endsWith('/api/token')) {
        return Promise.resolve(new Response(
          null,
          {
            status: 404
          }
        ));
      }
      if (headers.Authorization !== `Bearer ${params.token}`) {
        return Promise.resolve(new Response(
          null,
          {
            status: 401
          }
        ));
      }
      if (headers['Content-Type'] !== 'application/json') {
        return Promise.resolve(new Response(
          null,
          {
            status: 400
          }
        ));
      }
      return Promise.resolve(new Response(
        JSON.stringify({
          error: params.error
        }),
        {
          status: params.status
        }
      ));
    });
    await getServerToken(params.token).catch((error) => expect(error.message).toBe(expected.error));
  });

});

describe('getCachedToken', () => {

  it('should get a cached token when the token has not expired', () => {
    const params = {
      token: 'sample_token'
    };
    const expected = {
      token: 'sample_token'
    };
    sessionStorage.setItem(import.meta.env.VITE_AUTH_CLIENT_ID, params.token);
    const mockJwtDecode = jwtDecode as Mock;
    mockJwtDecode.mockReturnValue({
      exp: Date.now() / 1000 + 3600
    });
    const actual = getCachedToken();
    expect(mockJwtDecode).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

  it('should get undefined when the token has not been cached', () => {
    const expected = {
      token: undefined
    };
    const actual = getCachedToken();
    expect(actual).toStrictEqual(expected.token);
  });

  it('should get undefined when the token has expired', () => {
    const params = {
      token: 'sample_token'
    };
    const expected = {
      token: undefined
    };
    sessionStorage.setItem(import.meta.env.VITE_AUTH_CLIENT_ID, params.token);
    const mockJwtDecode = jwtDecode as Mock;
    mockJwtDecode.mockReturnValue({
      exp: Date.now() / 1000 - 3600
    });
    const actual = getCachedToken();
    expect(mockJwtDecode).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

});
