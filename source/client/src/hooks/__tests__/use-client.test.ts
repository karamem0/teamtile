//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

/* eslint-disable import/first */

// Microsoft Teams
const microsoftTeams = {
  initialize: jest.fn(),
  appInitialization: {
    notifySuccess: jest.fn(),
    notifyFailure: jest.fn(),
    FailedReason: {
      AuthFailed: 'AuthFailed'
    }
  }
};
jest.mock('@microsoft/teams-js', () => ({
  __esModule: true,
  ...microsoftTeams
}));
// Microsoft Graph
const microsoftGraph = {
  Client: {
    initWithMiddleware: jest.fn()
  }
};
jest.mock('@microsoft/microsoft-graph-client', () => ({
  __esModule: true,
  ...microsoftGraph
}));

// Testing Library
import { renderHook } from '@testing-library/react-hooks';
// Hooks
import { useClient } from '../use-client';
// Urils
import * as tokenManager from '../../utils/token-manager';

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
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftGraph.Client.initWithMiddleware
      .mockReturnValue({});
    jest
      .spyOn(tokenManager, 'getClientToken')
      .mockResolvedValue(params.clientToken);
    jest
      .spyOn(tokenManager, 'getServerToken')
      .mockResolvedValue(params.serverToken);
    jest
      .spyOn(tokenManager, 'getCachedToken')
      .mockReturnValue(undefined);
    jest
      .spyOn(tokenManager, 'setCachedToken')
      .mockReturnValue();
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).not.toBeUndefined();
    expect(error).toBeUndefined();
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.appInitialization.notifySuccess).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).not.toBeCalled();
  });

  it('return client if token is cached', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftGraph.Client.initWithMiddleware
      .mockReturnValue({});
    jest
      .spyOn(tokenManager, 'getCachedToken')
      .mockReturnValue(params.clientToken);
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).not.toBeUndefined();
    expect(error).toBeUndefined();
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.appInitialization.notifySuccess).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).not.toBeCalled();
  });

  it('return error if failed', async () => {
    const params = {
      error: 'Something went wrong'
    };
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftGraph.Client.initWithMiddleware
      .mockReturnValue({});
    jest
      .spyOn(tokenManager, 'getCachedToken')
      .mockImplementation(() => {
        throw new Error(params.error);
      });
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).toBeUndefined();
    expect(error).not.toBeUndefined();
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.appInitialization.notifySuccess).not.toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).toBeCalled();
  });

});
