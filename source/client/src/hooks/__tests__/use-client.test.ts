//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';

import { app } from '@microsoft/teams-js';

import * as tokenManager from '../../utils/token-manager';
import { useClient } from '../use-client';

jest.mock('@microsoft/teams-js', () => ({
  app: {
    initialize: jest.fn(),
    notifySuccess: jest.fn(),
    notifyFailure: jest.fn(),
    FailedReason: {
      AuthFailed: 'AuthFailed'
    }
  }
}));

jest.mock('@microsoft/microsoft-graph-client', () => ({
  Client: {
    initWithMiddleware: jest.fn().mockReturnValue({})
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useClient', () => {

  it('return client if token is not cached', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    jest
      .spyOn(tokenManager, 'getClientToken')
      .mockResolvedValue(params.clientToken);
    jest
      .spyOn(tokenManager, 'getServerToken')
      .mockResolvedValue(params.serverToken);
    jest
      .spyOn(tokenManager, 'getCachedToken')
      .mockReturnValue(null);
    jest
      .spyOn(tokenManager, 'setCachedToken')
      .mockReturnValue();
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).not.toBeNull();
    expect(error).toBeNull();
    expect(app.initialize).toBeCalled();
    expect(app.notifySuccess).toBeCalled();
    expect(app.notifyFailure).not.toBeCalled();
  });

  it('return client if token is cached', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    jest
      .spyOn(tokenManager, 'getCachedToken')
      .mockReturnValue(params.clientToken);
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).not.toBeNull();
    expect(error).toBeNull();
    expect(app.initialize).toBeCalled();
    expect(app.notifySuccess).toBeCalled();
    expect(app.notifyFailure).not.toBeCalled();
  });

  it('return error if failed', async () => {
    const params = {
      error: 'Something went wrong.'
    };
    jest
      .spyOn(tokenManager, 'getCachedToken')
      .mockImplementation(() => {
        throw new Error(params.error);
      });
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).toBeNull();
    expect(error).not.toBeNull();
    expect(app.initialize).toBeCalled();
    expect(app.notifySuccess).not.toBeCalled();
    expect(app.notifyFailure).toBeCalled();
  });

});
