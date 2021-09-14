//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';
import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import Dexie from 'dexie';
import * as AppContext from '../../contexts/app-context';
import * as IndexedDbContext from '../../contexts/indexed-db-context';
import { useTeam } from '../use-team';
import json from './use-team.test.json';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useTeam', () => {

  it('return team from server', async () => {
    const params = {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      json: json,
      url: 'https://developer.microsoft.com/85003a80-9e86-4d59-a4a9-97553797bbe3'
    };
    const setError = jest.fn();
    jest
      .spyOn(microsoftGraph, 'BatchResponseContent')
      .mockReturnValue({
        getResponses: () => new Map<string, Response>(
          params.json.responses.map((item) => ([
            item.id,
            new Response(
              typeof (item.body) === 'string'
                ? item.body
                : JSON.stringify(item.body),
              {
                status: item.status
              })
          ]))
        )
      } as unknown as microsoftGraph.BatchResponseContent);
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          version: jest.fn().mockReturnThis(),
          post: () => Promise.resolve()
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
    jest
      .spyOn(IndexedDbContext, 'useIndexedDb')
      .mockReturnValue({
        db: {
          table: () => ({
            get: () => Promise.resolve(undefined) as unknown as Dexie.Promise,
            put: () => Promise.resolve()
          }) as unknown as Dexie.Table
        } as unknown as Dexie
      });
    URL.createObjectURL = jest.fn(() => params.url);
    const { result, waitForNextUpdate } = renderHook(
      useTeam,
      {
        initialProps: {
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ team ] = result.current;
    expect(team).not.toBeUndefined();
    expect(setError).not.toBeCalled();
  });

  it('return team from IndexedDB', async () => {
    const params = {
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      team: {
        id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        icon: {},
        channels: {},
        members: {},
        drive: {},
        timestamp: Date.now()
      }
    };
    const setError = jest.fn();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({} as unknown as microsoftGraph.Client);
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockReturnValue({
        client: microsoftGraph.Client.initWithMiddleware({} as microsoftGraph.ClientOptions),
        setClient: undefined,
        error: undefined,
        setError: setError
      });
    jest
      .spyOn(IndexedDbContext, 'useIndexedDb')
      .mockReturnValue({
        db: {
          table: () => ({
            get: () => Promise.resolve(params.team) as unknown as Dexie.Promise,
            put: () => Promise.resolve()
          }) as unknown as Dexie.Table
        } as unknown as Dexie
      });
    const { result, waitForNextUpdate } = renderHook(
      useTeam,
      {
        initialProps: {
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ team ] = result.current;
    expect(team).not.toBeUndefined();
    expect(setError).not.toBeCalled();
  });

});
