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
import { useMemberIcons } from '../use-member-icons';
// Reducers
import { putMemberIcons } from '../../reducers/action';
// Services
import { LocalService } from '../../services/local-service';
import { ServerService } from '../../services/server-service';
// JSON
import json from './use-member-icons.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useMemberIcons', () => {

  describe('getMemberIcons', () => {

    it('return icons from local', async () => {
      const params = {
        keys: [
          '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          '626cbf8c-5dde-46b0-8385-9e40d64736fe',
          '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
              getMemberIcons: () => Promise.resolve(new Map<string, string | null>(
                params.keys.map((id) => [ id, undefined ])
              ))
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMemberIcons);
        const [ getMemberIcons ] = result.current;
        const icons = await getMemberIcons(params.keys);
        expect(icons).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return icons from server', async () => {
      const params = {
        keys: [
          '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          '626cbf8c-5dde-46b0-8385-9e40d64736fe',
          '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
              getMemberIcons: () => Promise.resolve(params.json)
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMemberIcons);
        const [ getMemberIcons ] = result.current;
        const icons = await getMemberIcons(params.keys);
        expect(icons).toEqual(params.json);
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return error if failed', async () => {
      const params = {
        keys: [
          '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          '626cbf8c-5dde-46b0-8385-9e40d64736fe',
          '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
              getMemberIcons: jest.fn()
            } as unknown as ServerService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMemberIcons);
        const [ getMemberIcons ] = result.current;
        await getMemberIcons(params.keys);
        expect(params.setError).toBeCalled();
      });
    });

  });

  describe('dispatchMemberIcons', () => {

    it('dispatch icons if succeeded', async () => {
      const params = {
        key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
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
        const { result } = renderHook(useMemberIcons);
        const [ , dispatchMemberIcons ] = result.current;
        await dispatchMemberIcons(params.key, params.json);
        expect(params.dispatch).toBeCalledWith(putMemberIcons({
          key: params.key,
          value: params.json
        }));
        expect(params.setError).not.toBeCalled();
      });
    });

    it('return error if failed', async () => {
      const params = {
        key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
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
        const { result } = renderHook(useMemberIcons);
        const [ , dispatchMemberIcons ] = result.current;
        await dispatchMemberIcons(params.key, params.json);
        expect(params.setError).toBeCalled();
      });
    });

  });

});
