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
import { setChannels } from '../../reducers/action';
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

  it('return channels from local', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, Channel[]>(json as [[ string, Channel[] ]])
    };
    jest
      .spyOn(ReducerContext, 'useReducerContext')
      .mockReturnValue({
        dispatch: params.dispatch
      });
    jest
      .spyOn(ErrorContext, 'useErrorContext')
      .mockReturnValue({
        setError: jest.fn()
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
      const { result, waitForNextUpdate } = renderHook(useChannels);
      await waitForNextUpdate();
      const [ dispatchChannels ] = result.current;
      await dispatchChannels(params.keys);
      expect(params.dispatch).toBeCalledWith(setChannels(params.json));
    });
  });

  it('return channels from server', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
      dispatch: jest.fn(),
      json: new Map<string, Channel[]>(json as [[ string, Channel[] ]])
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
      const { result, waitForNextUpdate } = renderHook(useChannels);
      await waitForNextUpdate();
      const [ dispatchChannels ] = result.current;
      await dispatchChannels(params.keys);
      expect(params.dispatch).toBeCalledWith(setChannels(params.json));
    });
  });

});
