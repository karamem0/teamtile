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

  describe('getTeamIcons', () => {

    it('return icons from local', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, string>(json as [[ string, string ]]),
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
              getIcons: () => Promise.resolve(params.json),
              putIcon: jest.fn()
            } as unknown as LocalService,
            server: {
              getTeamIcons: () => Promise.resolve(new Map<string, string | null>(
                params.keys.map((id) => [ id, undefined ])
              ))
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeamIcons);
        const [ getTeamIcons ] = result.current;
        const icons = await getTeamIcons(params.keys);
        expect(icons).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return icons from server', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, string>(json as [[ string, string ]]),
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
              getIcons: () => Promise.resolve(new Map<string, string | null>(
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
        const [ getTeamIcons ] = result.current;
        const icons = await getTeamIcons(params.keys);
        expect(icons).toEqual(params.json);
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
              getIcons: () => {
                throw new Error(params.error);
              },
              putIcon: jest.fn()
            } as unknown as LocalService,
            server: {
              getTeamIcons: () => jest.fn()
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeamIcons);
        const [ getTeamIcons ] = result.current;
        await getTeamIcons(params.keys);
        expect(params.setError).toBeCalled();
      });
    });

  });

  describe('dispatchTeamIcons', () => {

    it('dispatch icons if succeeded', async () => {
      const params = {
        json: new Map<string, string>(json as [[ string, string ]]),
        setError: jest.fn(),
        dispatch: jest.fn()
      };
      jest
        .spyOn(ErrorContext, 'useErrorContext')
        .mockReturnValue({
          setError: params.setError
        });
      jest
        .spyOn(ReducerContext, 'useReducerContext')
        .mockReturnValue({
          dispatch: params.dispatch
        });
      await act(async () => {
        const { result } = renderHook(useTeamIcons);
        const [ , dispatchTeamIcons ] = result.current;
        await dispatchTeamIcons(params.json);
        expect(params.dispatch).toBeCalledWith(putTeamIcons(params.json));
      });
    });

    it('return error if failed', async () => {
      const params = {
        json: new Map<string, string>(json as [[ string, string ]]),
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
        const { result } = renderHook(useTeamIcons);
        const [ , dispatchTeamIcons ] = result.current;
        await dispatchTeamIcons(params.json);
        expect(params.setError).toBeCalled();
      });
    });

  });

});
