//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as jwtDecode from 'jwt-decode';
import * as teamsjs from '@microsoft/teams-js';
import {
  getCachedToken,
  getClientToken,
  getServerToken
} from './TokenService';
import fetchMock from 'jest-fetch-mock';

jest.mock('jwt-decode');
jest.mock('@microsoft/teams-js');

beforeEach(() => {
  jest.resetModules();
  fetchMock.mockClear();
});

describe('getClientToken', () => {

  it('should retrieve a client token', async () => {
    const params = {
      token: 'sample_token'
    };
    const expected = {
      token: 'sample_token'
    };
    const mock = teamsjs.authentication.getAuthToken as unknown as jest.Mock;
    mock.mockResolvedValue(params.token);
    const actual = await getClientToken();
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

});

describe('getServerToken', () => {

  it('should retrieve a server token when the server responds with a "200" status code', async () => {
    const params = {
      token: 'sample_token',
      status: 200
    };
    const expected = {
      token: 'sample_token'
    };
    fetchMock.doMock((req) => {
      if (req.method !== 'POST') {
        return Promise.resolve({
          status: 405
        });
      }
      if (!req.url.endsWith('/api/token')) {
        return Promise.resolve({
          status: 404
        });
      }
      if (req.headers.get('Authorization') !== `Bearer ${params.token}`) {
        return Promise.resolve({
          status: 401
        });
      }
      if (req.headers.get('Content-Type') !== 'application/json') {
        return Promise.resolve({
          status: 400
        });
      }
      return Promise.resolve({
        status: params.status,
        body: JSON.stringify(
          {
            token: params.token
          }
        )
      });
    });
    const actual = await getServerToken(params.token);
    expect(actual).toStrictEqual(expected.token);
  });

  it('should retrieve a server token when the server responds with a "403" status code', async () => {
    const params = {
      token: 'sample_token',
      status: 403,
      error: 'invalid_grant'
    };
    const expected = {
      token: 'sample_token'
    };
    fetchMock.doMock((req) => {
      if (req.method !== 'POST') {
        return Promise.resolve({
          status: 405
        });
      }
      if (!req.url.endsWith('/api/token')) {
        return Promise.resolve({
          status: 404
        });
      }
      if (req.headers.get('Authorization') !== `Bearer ${params.token}`) {
        return Promise.resolve({
          status: 401
        });
      }
      if (req.headers.get('Content-Type') !== 'application/json') {
        return Promise.resolve({
          status: 400
        });
      }
      return Promise.resolve({
        status: params.status,
        body: JSON.stringify(
          {
            error: params.error
          }
        )
      });
    });
    const mock = teamsjs.authentication.authenticate as unknown as jest.Mock;
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
    fetchMock.doMock((req) => {
      if (req.method !== 'POST') {
        return Promise.resolve({
          status: 405
        });
      }
      if (!req.url.endsWith('/api/token')) {
        return Promise.resolve({
          status: 404
        });
      }
      if (req.headers.get('Authorization') !== `Bearer ${params.token}`) {
        return Promise.resolve({
          status: 401
        });
      }
      if (req.headers.get('Content-Type') !== 'application/json') {
        return Promise.resolve({
          status: 400
        });
      }
      return Promise.resolve({
        status: params.status,
        body: JSON.stringify(
          {
            error: params.error
          }
        )
      });
    });
    await getServerToken(params.token).catch((error) => expect(error.message).toBe(expected.error));
  });

});

describe('getCachedToken', () => {

  it('should retrieve a cached token when the token has not been expired', () => {
    const params = {
      token: 'sample_token'
    };
    const expected = {
      token: 'sample_token'
    };
    const mockGetItem = sessionStorage.getItem as jest.Mock;
    mockGetItem.mockReturnValue(params.token);
    const mockJwtDecode = jwtDecode.jwtDecode as jest.Mock;
    mockJwtDecode.mockReturnValue({
      exp: Date.now() / 1000 + 3600
    });
    const actual = getCachedToken();
    expect(mockGetItem).toHaveBeenCalled();
    expect(mockJwtDecode).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

  it('should retrieve undefined when the token has not been cached', () => {
    const params = {
      token: undefined
    };
    const expected = {
      token: undefined
    };
    const mock = sessionStorage.getItem as jest.Mock;
    mock.mockReturnValue(params.token);
    const actual = getCachedToken();
    expect(mock).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

  it('should retrieve undefined when the token has been expired', () => {
    const params = {
      token: 'sample_token'
    };
    const expected = {
      token: undefined
    };
    const mockGetItem = sessionStorage.getItem as jest.Mock;
    mockGetItem.mockReturnValue(params.token);
    const mockJwtDecode = jwtDecode.jwtDecode as jest.Mock;
    mockJwtDecode.mockReturnValue({
      exp: Date.now() / 1000 - 3600
    });
    const actual = getCachedToken();
    expect(mockGetItem).toHaveBeenCalled();
    expect(mockJwtDecode).toHaveBeenCalled();
    expect(actual).toStrictEqual(expected.token);
  });

});
