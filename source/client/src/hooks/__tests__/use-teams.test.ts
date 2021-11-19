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

  describe('getTeams', () => {

    it('return teams from local', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Team>(json as [[ string, Team ]]),
        setError: jest.fn()
      };
      jest
        .spyOn(ErrorContext, 'useErrorContext')
        .mockReturnValue({
          setError: params.setError
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
        const [ getTeams ] = result.current;
        const teams = await getTeams(params.keys);
        expect(teams).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return teams from server', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Team>(json as [[ string, Team ]]),
        setError: jest.fn()
      };
      jest
        .spyOn(ErrorContext, 'useErrorContext')
        .mockReturnValue({
          setError: params.setError
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
        const [ getTeams ] = result.current;
        const teams = await getTeams(params.keys);
        expect(teams).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return error if failed', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Team>(json as [[ string, Team ]]),
        error: 'Something went wrong',
        setError: jest.fn()
      };
      jest
        .spyOn(ErrorContext, 'useErrorContext')
        .mockReturnValue({
          setError: params.setError
        });
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          service: {
            local: {
              getTeams: () => {
                throw new Error(params.error);
              },
              putTeam: jest.fn()
            } as unknown as LocalService,
            server: {
              getTeams: () => Promise.resolve(params.json)
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeams);
        const [ getTeams ] = result.current;
        await getTeams(params.keys);
        expect(params.setError).toBeCalled();
      });
    });

  });

  describe('dispatchTeams', () => {

    it('dispatch teams if succeeded', async () => {
      const params = {
        json: new Map<string, Team>(json as [[ string, Team ]]),
        setError: jest.fn(),
        dispatch: jest.fn()
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
      await act(async () => {
        const { result } = renderHook(useTeams);
        const [ , dispatchTeams ] = result.current;
        await dispatchTeams(params.json);
        expect(params.dispatch).toBeCalledWith(putTeams(params.json));
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return error if failed', async () => {
      const params = {
        json: new Map<string, Team>(json as [[ string, Team ]]),
        error: 'Something went wrong',
        setError: jest.fn()
      };
      jest
        .spyOn(ErrorContext, 'useErrorContext')
        .mockReturnValue({
          setError: params.setError
        });
      jest
        .spyOn(ReducerContext, 'useReducerContext')
        .mockReturnValue({
          dispatch: () => {
            throw new Error(params.error);
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeams);
        const [ , dispatchTeams ] = result.current;
        await dispatchTeams(params.json);
        expect(params.setError).toBeCalled();
      });
    });

  });

});
