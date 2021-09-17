//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import * as microsoftTeams from '@microsoft/teams-js';
import {
  getClientToken,
  getServerToken
} from '../token-manager';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('getClientToken', () => {

  it('return token if succeeded', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) => {
        if (authTokenRequest.successCallback) {
          authTokenRequest.successCallback(params.token);
        }
      });
    await expect(getClientToken()).resolves.toBe(params.token);
  });

  it('throw error if failed', async () => {
    const params = {
      error: 'Something went wrong'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) => {
        if (authTokenRequest.failureCallback) {
          authTokenRequest.failureCallback(params.error);
        }
      });
    await expect(getClientToken()).rejects.toBe(params.error);
  });

});

describe('getServerToken', () => {

  it('throw error if failed', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      error: 'Something went wrong'
    };
    global.fetch = jest
      .fn()
      .mockRejectedValue(params.error);
    await expect(getServerToken(params.token)).rejects.toBe(params.error);
  });

});
