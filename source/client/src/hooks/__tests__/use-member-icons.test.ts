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

  it('return icons from local', async () => {
    const params = {
      key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      keys: [
        '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        '626cbf8c-5dde-46b0-8385-9e40d64736fe',
        '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
            getMemberIcons: () => Promise.resolve(new Map<string, string | undefined>(
              params.keys.map((id) => [ id, undefined ])
            ))
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useMemberIcons);
      const [ dispatchMemberIcons ] = result.current;
      await dispatchMemberIcons(params.key, params.keys);
      expect(params.dispatch).toBeCalledWith(putMemberIcons({
        key: params.key,
        value: params.json
      }));
    });
  });

  it('return icons from server', async () => {
    const params = {
      key: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      keys: [
        '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
        '626cbf8c-5dde-46b0-8385-9e40d64736fe',
        '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
            getMemberIcons: () => Promise.resolve(params.json)
          } as unknown as ServerService
        }
      });
    await act(async () => {
      const { result } = renderHook(useMemberIcons);
      const [ dispatchMemberIcons ] = result.current;
      await dispatchMemberIcons(params.key, params.keys);
      expect(params.dispatch).toBeCalledWith(putMemberIcons({
        key: params.key,
        value: params.json
      }));
    });
  });

});
