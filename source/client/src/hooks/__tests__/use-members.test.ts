//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/membertile/blob/master/LICENSE
//

// Testing Library
import { act, renderHook } from '@testing-library/react-hooks';
// Contexts
import * as ErrorContext from '../../contexts/error-context';
import * as ReducerContext from '../../contexts/reducer-context';
import * as ServiceContext from '../../contexts/service-context';
// Hooks
import { useMembers } from '../use-members';
// Reducers
import { setMembers } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';
// Types
import { Member } from '../../types/entity';
// JSON
import json from './use-members.test.json';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useMembers', () => {

  it('return members from local', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, Member[]>(json as [[ string, Member[] ]])
    };
    jest
      .spyOn(ErrorContext, 'useErrorContext')
      .mockReturnValue({
        setError: jest.fn()
      });
    jest
      .spyOn(ReducerContext, 'useReducerContext')
      .mockReturnValue({
        dispatch: params.dispatch
      });
    jest
      .spyOn(ServiceContext, 'useServiceContext')
      .mockReturnValue({
        service: {
          local: {
            getMembers: () => Promise.resolve(params.json),
            putMembers: jest.fn()
          } as unknown as LocalService,
          server: {
            getMembers: () => Promise.resolve(new Map<string, Member[] | undefined>(
              params.keys.map((id) => [ id, undefined ])
            ))
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(useMembers);
      await waitForNextUpdate();
      const [ dispatchMembers ] = result.current;
      await dispatchMembers(params.keys);
      expect(params.dispatch).toBeCalledWith(setMembers(params.json));
    });
  });

  it('return members from server', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, Member[]>(json as [[ string, Member[] ]])
    };
    jest
      .spyOn(ErrorContext, 'useErrorContext')
      .mockReturnValue({
        setError: jest.fn()
      });
    jest
      .spyOn(ReducerContext, 'useReducerContext')
      .mockReturnValue({
        dispatch: params.dispatch
      });
    jest
      .spyOn(ServiceContext, 'useServiceContext')
      .mockReturnValue({
        service: {
          local: {
            getMembers: () => Promise.resolve(new Map<string, Member[] | undefined>(
              params.keys.map((id) => [ id, undefined ])
            )),
            putMembers: jest.fn()
          } as unknown as LocalService,
          server: {
            getMembers: () => Promise.resolve(params.json)
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(useMembers);
      await waitForNextUpdate();
      const [ dispatchMembers ] = result.current;
      await dispatchMembers(params.keys);
      expect(params.dispatch).toBeCalledWith(setMembers(params.json));
    });
  });

});
