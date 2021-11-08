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
import { useTeams } from '../use-teams';
// Reducers
import { putTeams } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';
// Types
import { Team } from '../../types/entity';
// JSON
import json from './use-teams.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useTeams', () => {

  it('return teams from local', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, Team>(json as [[ string, Team ]])
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
            getTeams: () => Promise.resolve(params.json),
            putTeam: jest.fn()
          } as unknown as LocalService,
          server: {
            getTeams: () => Promise.resolve(new Map<string, Team | undefined>(
              params.keys.map((key) => [ key, undefined ])
            ))
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useTeams);
      const [ dispatchTeams ] = result.current;
      await dispatchTeams(params.keys);
      expect(params.dispatch).toBeCalledWith(putTeams(params.json));
    });
  });

  it('return teams from server', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, Team>(json as [[ string, Team ]])
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
            getTeams: () => Promise.resolve(new Map<string, Team | undefined>(
              params.keys.map((id) => [ id, undefined ])
            )),
            putTeam: jest.fn()
          } as unknown as LocalService,
          server: {
            getTeams: () => Promise.resolve(params.json)
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useTeams);
      const [ dispatchTeams ] = result.current;
      await dispatchTeams(params.keys);
      expect(params.dispatch).toBeCalledWith(putTeams(params.json));
    });
  });

});
