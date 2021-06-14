//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';
import * as microsoftTeams from '@microsoft/teams-js';
import * as tokenCache from '../../utils/TokenCache';
import useClient from '../useClient';

describe('useClient', () => {

  beforeEach(() => {
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
  });

  it('return token if succeeded single sign-on', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) =>
        authTokenRequest.successCallback &&
        authTokenRequest.successCallback(params.clientToken));
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifySuccess')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'getCachedToken')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'setCachedToken')
      .mockImplementation(() => undefined);
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      text: () => Promise.resolve(params.serverToken)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).not.toBeUndefined();
    expect(error).toBeUndefined();
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.appInitialization.notifySuccess).toBeCalled();
  });

  it('return token if succeeded consent', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      serverToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) =>
        authTokenRequest.successCallback &&
        authTokenRequest.successCallback(params.clientToken));
    jest
      .spyOn(microsoftTeams.authentication, 'authenticate')
      .mockImplementation((authenticateParameters) =>
        authenticateParameters?.successCallback &&
        authenticateParameters?.successCallback(params.serverToken));
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifySuccess')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'getCachedToken')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'setCachedToken')
      .mockImplementation(() => undefined);
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 403
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).not.toBeUndefined();
    expect(error).toBeUndefined();
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.authentication.authenticate).toBeCalled();
    expect(microsoftTeams.appInitialization.notifySuccess).toBeCalled();
  });

  it('return error if failed single sign-on', async () => {
    const params = {
      error: 'Something went wrong'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) =>
        authTokenRequest.failureCallback &&
        authTokenRequest.failureCallback(params.error));
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'getCachedToken')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'setCachedToken')
      .mockImplementation(() => undefined);
    const { result } = renderHook(() => useClient());
    const [ client, error ] = result.current;
    expect(client).toBeUndefined();
    expect(error).toBe(params.error);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).toBeCalled();
  });

  it('return error if failed token convertion', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      error: 'Something went wrong'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) =>
        authTokenRequest.successCallback &&
        authTokenRequest.successCallback(params.clientToken));
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'getCachedToken')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'setCachedToken')
      .mockImplementation(() => undefined);
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 500,
      text: () => Promise.resolve(params.error)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).toBeUndefined();
    expect(error).toBe(params.error);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).toBeCalled();
  });

  it('return error if unexpected exception ocurrerd', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      error: 'Something went wrong'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) =>
        authTokenRequest.successCallback &&
        authTokenRequest.successCallback(params.clientToken));
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'getCachedToken')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'setCachedToken')
      .mockImplementation(() => undefined);
    global.fetch = jest.fn(() => Promise.reject(params.error));
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).toBeUndefined();
    expect(error).toBe(params.error);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).toBeCalled();
  });

  it('return error if cancelled consent', async () => {
    const params = {
      clientToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ0xJRU5UVE9LRU4ifQ.ZO9wyYFJTSl-Q9nvS2D3UIDvOBr9rl3CQTxjcUpQ8HA',
      error: 'Something went wrong'
    };
    jest
      .spyOn(microsoftTeams.authentication, 'getAuthToken')
      .mockImplementation((authTokenRequest) =>
        authTokenRequest.successCallback &&
        authTokenRequest.successCallback(params.clientToken));
    jest
      .spyOn(microsoftTeams.authentication, 'authenticate')
      .mockImplementation((authenticateParameters) =>
        authenticateParameters?.failureCallback &&
        authenticateParameters?.failureCallback(params.error));
    jest
      .spyOn(microsoftTeams.appInitialization, 'notifyFailure')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'getCachedToken')
      .mockImplementation(() => undefined);
    jest
      .spyOn(tokenCache, 'setCachedToken')
      .mockImplementation(() => undefined);
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 403
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useClient());
    await waitForNextUpdate();
    const [ client, error ] = result.current;
    expect(client).toBeUndefined();
    expect(error).toBe(params.error);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.authentication.authenticate).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).toBeCalled();
  });

});
