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
import { useKeys } from '../use-keys';
// Reducers
import { putKeys } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useKeys', () => {

  it('return keys if succeeded', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ],
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
    jest
      .spyOn(ServiceContext, 'useServiceContext')
      .mockReturnValue({
        service: {
          local: {} as LocalService,
          server: {
            getKeys: () => Promise.resolve(params.keys)
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useKeys);
      const [ getKeys ] = result.current;
      await getKeys();
      expect(params.dispatch).toBeCalledWith(putKeys(params.keys));
    });
  });

  it('return error if failed', async () => {
    const params = {
      dispatch: jest.fn(),
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
        dispatch: params.dispatch
      });
    jest
      .spyOn(ServiceContext, 'useServiceContext')
      .mockReturnValue({
        service: {
          local: {} as LocalService,
          server: {
            getKeys: () => {
              throw new Error(params.error);
            }
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useKeys);
      const [ getKeys ] = result.current;
      await getKeys();
      expect(params.setError).toBeCalled();
    });
  });

});
