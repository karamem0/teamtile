//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Testing Library
import { act, renderHook } from '@testing-library/react-hooks';
// Contexts
import * as ErrorContext from '../../contexts/error-context';
import * as ReducerContext from '../../contexts/reducer-context';
import * as ServiceContext from '../../contexts/service-context';
// Hooks
import { useTeamIcons } from '../use-team-icons';
// Reducers
import { putTeamIcons } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';
// JSON
import json from './use-team-icons.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useTeamIcons', () => {

  it('return icons from local', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, string>(json as [[ string, string ]])
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
            getIcons: () => Promise.resolve(params.json),
            putIcon: jest.fn()
          } as unknown as LocalService,
          server: {
            getTeamIcons: () => Promise.resolve(new Map<string, string | undefined>(
              params.keys.map((id) => [ id, undefined ])
            ))
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useTeamIcons);
      const [ dispatchTeamIcons ] = result.current;
      await dispatchTeamIcons(params.keys);
      expect(params.dispatch).toBeCalledWith(putTeamIcons(params.json));
    });
  });

  it('return icons from server', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, string>(json as [[ string, string ]])
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
            getIcons: () => Promise.resolve(new Map<string, string | undefined>(
              params.keys.map((id) => [ id, undefined ])
            )),
            putIcon: jest.fn()
          } as unknown as LocalService,
          server: {
            getTeamIcons: () => Promise.resolve(params.json)
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useTeamIcons);
      const [ dispatchTeamIcons ] = result.current;
      await dispatchTeamIcons(params.keys);
      expect(params.dispatch).toBeCalledWith(putTeamIcons(params.json));
    });
  });

});
