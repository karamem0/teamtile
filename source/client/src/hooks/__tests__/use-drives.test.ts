//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/channeltile/blob/master/LICENSE
//

// Testing Library
import { act, renderHook } from '@testing-library/react-hooks';
// Contexts
import * as ErrorContext from '../../contexts/error-context';
import * as ReducerContext from '../../contexts/reducer-context';
import * as ServiceContext from '../../contexts/service-context';
// Hooks
import { useDrives } from '../use-drives';
// Reducers
import { putDrives } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';
// Types
import { Drive } from '../../types/entity';
// JSON
import json from './use-drives.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useDrives', () => {

  describe('getDrives', () => {

    it('return drives from local', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Drive>(json as [[ string, Drive ]]),
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
              getDrives: () => Promise.resolve(params.json),
              putDrive: jest.fn()
            } as unknown as LocalService,
            server: {
              getDrives: () => Promise.resolve(new Map<string, Drive | undefined>(
                params.keys.map((id) => [ id, undefined ])
              ))
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useDrives);
        const [ getDrives ] = result.current;
        const drives = await getDrives(params.keys);
        expect(drives).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return drives from server', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Drive>(json as [[ string, Drive ]]),
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
              getDrives: () => Promise.resolve(new Map<string, Drive | undefined>(
                params.keys.map((id) => [ id, undefined ])
              )),
              putDrive: jest.fn()
            } as unknown as LocalService,
            server: {
              getDrives: () => Promise.resolve(params.json)
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useDrives);
        const [ getDrives ] = result.current;
        const drives = await getDrives(params.keys);
        expect(drives).toEqual(params.json);
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
              getDrives: () => {
                throw new Error(params.error);
              },
              putDrives: jest.fn()
            } as unknown as LocalService,
            server: {
              getDrives: jest.fn()
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useDrives);
        const [ getDrives ] = result.current;
        await getDrives(params.keys);
        expect(params.setError).toBeCalled();
      });
    });

  });

  describe('dispatchDrives', () => {

    it('dispatch drives if succeeded', async () => {
      const params = {
        json: new Map<string, Drive>(json as [[ string, Drive ]]),
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
        const { result } = renderHook(useDrives);
        const [ , dispatchDrives ] = result.current;
        await dispatchDrives(params.json);
        expect(params.dispatch).toBeCalledWith(putDrives(params.json));
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return error if failed', async () => {
      const params = {
        json: new Map<string, Drive>(json as [[ string, Drive ]]),
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
        const { result } = renderHook(useDrives);
        const [ , dispatchDrives ] = result.current;
        await dispatchDrives(params.json);
        expect(params.setError).toBeCalled();
      });
    });

  });

});
