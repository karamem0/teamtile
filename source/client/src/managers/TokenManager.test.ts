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
  getServerToken,
  setCachedToken
} from '../services/TokenService';
import { Mock } from 'vitest';
import { getAccessToken } from './TokenManager';

vi.mock('../services/TokenService');

describe('getAccessToken', () => {

  it('should get a cached token', async () => {
    const params = {
      token: 'cached_token'
    };
    const expected = {
      token: 'cached_token'
    };
    const mockGetCachedToken = getCachedToken as Mock;
    mockGetCachedToken.mockReturnValue(params.token);
    const actual = await getAccessToken();
    expect(actual).toStrictEqual(expected.token);
  });

  it('should get an exchanged token', async () => {
    const params = {
      clientToken: 'client_token',
      serverToken: 'server_token'
    };
    const expected = {
      token: 'server_token'
    };
    const mockGetCachedToken = getCachedToken as Mock;
    const mockGetClientToken = getClientToken as Mock;
    const mockGetServerToken = getServerToken as Mock;
    const mockSetCachedToken = setCachedToken as Mock;
    mockGetCachedToken.mockReturnValue(undefined);
    mockGetClientToken.mockResolvedValue(params.clientToken);
    mockGetServerToken.mockResolvedValue(params.serverToken);
    const actual = await getAccessToken();
    expect(actual).toStrictEqual(expected.token);
    expect(mockSetCachedToken).toHaveBeenCalled();
  });

});
