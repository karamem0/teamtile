//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';
import * as microsoftTeams from '@microsoft/teams-js';
import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import * as tokenManager from '../../utils/token-manager';
import { useClient } from '../use-client';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useClient', () => {

  it('return client when token is not cached', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifySuccess')
      .mockReturnValue();
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockReturnValue();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({} as unknown as microsoftGraph.Client);
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

  it('return client when token is cached', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifySuccess')
      .mockReturnValue();
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockReturnValue();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({} as unknown as microsoftGraph.Client);
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
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifySuccess')
      .mockReturnValue();
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockReturnValue();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({} as unknown as microsoftGraph.Client);
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
