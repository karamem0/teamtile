//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as teamsjs from '@microsoft/teams-js';
import {
  getClientToken,
  getServerToken
} from './TokenService';
import fetchMock from 'jest-fetch-mock';

jest.mock('@microsoft/teams-js');

beforeEach(() => {
  jest.resetModules();
  fetchMock.mockClear();
});

it('should get client token', async () => {
  const params = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };
  const expected = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };
  const mock = teamsjs.authentication.getAuthToken as unknown as jest.Mock;
  mock.mockResolvedValue(params.token);
  const actual = await getClientToken();
  expect(mock).toHaveBeenCalled();
  expect(actual).toStrictEqual(expected.token);
});

it('should get server token when server returns 200', async () => {
  const params = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    status: 200
  };
  const expected = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
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

it('should get server token when server returns 200', async () => {
  const params = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    status: 403,
    error: 'invalid_grant'
  };
  const expected = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
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

it('should get server token when server returns 500', async () => {
  const params = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
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
