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
import { useChannels } from '../use-channels';
// Reducers
import { putChannels } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';
// Types
import { Channel } from '../../types/entity';
// JSON
import json from './use-channels.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useChannels', () => {

  describe('getChannels', () => {

    it('return channels from local', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Channel[]>(json as [[ string, Channel[] ]]),
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
              getChannels: () => Promise.resolve(params.json),
              putChannels: jest.fn()
            } as unknown as LocalService,
            server: {
              getChannels: () => Promise.resolve(new Map<string, Channel[] | undefined>(
                params.keys.map((id) => [ id, undefined ])
              ))
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useChannels);
        const [ getChannels ] = result.current;
        const channels = await getChannels(params.keys);
        expect(channels).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return channels from server', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Channel[]>(json as [[ string, Channel[] ]]),
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
              getChannels: () => Promise.resolve(new Map<string, Channel[] | undefined>(
                params.keys.map((id) => [ id, undefined ])
              )),
              putChannels: jest.fn()
            } as unknown as LocalService,
            server: {
              getChannels: () => Promise.resolve(params.json)
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useChannels);
        const [ getChannels ] = result.current;
        const channels = await getChannels(params.keys);
        expect(channels).toEqual(params.json);
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
              getChannels: () => {
                throw new Error(params.error);
              },
              putChannels: jest.fn()
            } as unknown as LocalService,
            server: {
              getChannels: jest.fn()
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useChannels);
        const [ getChannels ] = result.current;
        await getChannels(params.keys);
        expect(params.setError).toBeCalled();
      });
    });

  });

  describe('dispatchChannels', () => {

    it('dispatch channels if succeeded', async () => {
      const params = {
        json: new Map<string, Channel[]>(json as [[ string, Channel[] ]]),
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
        const { result } = renderHook(useChannels);
        const [ , dispatchChannels ] = result.current;
        await dispatchChannels(params.json);
        expect(params.dispatch).toBeCalledWith(putChannels(params.json));
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return error if failed', async () => {
      const params = {
        json: new Map<string, Channel[]>(json as [[ string, Channel[] ]]),
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
        const { result } = renderHook(useChannels);
        const [ , dispatchChannels ] = result.current;
        await dispatchChannels(params.json);
        expect(params.setError).toBeCalled();
      });
    });

  });

});
