import { renderHook } from '@testing-library/react-hooks';
import * as microsoftTeams from '@microsoft/teams-js';
import useToken from '../useToken';

describe('useToken', () => {

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
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      text: () => Promise.resolve(params.serverToken)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useToken());
    await waitForNextUpdate();
    const [ token, error ] = result.current;
    expect(token).toBe(params.serverToken);
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
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 403
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useToken());
    await waitForNextUpdate();
    const [ token, error ] = result.current;
    expect(token).toBe(params.serverToken);
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
    const { result } = renderHook(() => useToken());
    const [ token, error ] = result.current;
    expect(token).toBeUndefined();
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
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 500,
      text: () => Promise.resolve(params.error)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useToken());
    await waitForNextUpdate();
    const [ token, error ] = result.current;
    expect(token).toBeUndefined();
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
    global.fetch = jest.fn(() => Promise.reject(params.error));
    const { result, waitForNextUpdate } = renderHook(() => useToken());
    await waitForNextUpdate();
    const [ token, error ] = result.current;
    expect(token).toBeUndefined();
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
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 403
    } as Response));
    const { result, waitForNextUpdate } = renderHook(() => useToken());
    await waitForNextUpdate();
    const [ token, error ] = result.current;
    expect(token).toBeUndefined();
    expect(error).toBe(params.error);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.authentication.getAuthToken).toBeCalled();
    expect(microsoftTeams.authentication.authenticate).toBeCalled();
    expect(microsoftTeams.appInitialization.notifyFailure).toBeCalled();
  });

});
