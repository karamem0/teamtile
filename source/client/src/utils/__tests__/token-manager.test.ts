//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

global.fetch = jest.fn();

const microsoftTeams = {
  authentication: {
    getAuthToken: jest.fn()
  }
};
jest.mock('@microsoft/teams-js', () => ({
  ...microsoftTeams
}));

import {
  getClientToken,
  getServerToken
} from '../token-manager';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('getClientToken', () => {

  it('return token if succeeded', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA'
    };
    microsoftTeams.authentication.getAuthToken
      .mockResolvedValue(params.token);
    await expect(getClientToken()).resolves.toBe(params.token);
  });

  it('throw error if failed', async () => {
    const params = {
      error: 'Something went wrong'
    };
    microsoftTeams.authentication.getAuthToken
      .mockRejectedValue(params.error);
    await expect(getClientToken()).rejects.toBe(params.error);
  });

});

describe('getServerToken', () => {

  it('throw error if failed', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      error: 'Something went wrong'
    };
    global.fetch = jest.fn()
      .mockRejectedValue(params.error);
    await expect(getServerToken(params.token)).rejects.toBe(params.error);
  });

});
