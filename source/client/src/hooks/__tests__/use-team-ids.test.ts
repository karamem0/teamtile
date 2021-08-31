//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';
import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import * as AppContext from '../../contexts/app-context';
import { useTeamIds } from '../use-team-ids';
import json from './use-team-ids.test.json';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useTeamIds', () => {

  it('return team IDs', async () => {
    const params = {
      json: json
    };
    const setError = jest.fn();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          count: jest.fn().mockReturnThis(),
          filter: jest.fn().mockReturnThis(),
          header: jest.fn().mockReturnThis(),
          orderby: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          version: jest.fn().mockReturnThis(),
          get: () => Promise.resolve(params.json)
        })
      } as unknown as microsoftGraph.Client);
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockReturnValue({
        client: microsoftGraph.Client.initWithMiddleware({} as microsoftGraph.ClientOptions),
        setClient: undefined,
        error: undefined,
        setError: setError
      });
    const { result, waitForNextUpdate } = renderHook(useTeamIds);
    await waitForNextUpdate();
    const [ teams ] = result.current;
    expect(teams).not.toBeUndefined();
    expect(setError).not.toBeCalled();
  });

  it('return empty and set error when failed', async () => {
    const params = {
      error: 'Something went wrong'
    };
    const setError = jest.fn();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          count: jest.fn().mockReturnThis(),
          filter: jest.fn().mockReturnThis(),
          header: jest.fn().mockReturnThis(),
          orderby: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          version: jest.fn().mockReturnThis(),
          get: () => Promise.reject(new Error(params.error))
        })
      } as unknown as microsoftGraph.Client);
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockReturnValue({
        client: microsoftGraph.Client.initWithMiddleware({} as microsoftGraph.ClientOptions),
        setClient: undefined,
        error: undefined,
        setError: setError
      });
    const { result, waitForNextUpdate } = renderHook(useTeamIds);
    await waitForNextUpdate();
    const [ teams ] = result.current;
    expect(teams).toStrictEqual([]);
    expect(setError).toBeCalled();
  });

});
