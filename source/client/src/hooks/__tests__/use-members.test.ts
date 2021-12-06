//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/membertile/blob/master/LICENSE
//

// Testing Library
import { act, renderHook } from '@testing-library/react-hooks';
// Contexts
import * as ServiceContext from '../../contexts/service-context';
// Hooks
import { useMembers } from '../use-members';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';
// Types
import { Member } from '../../types/entity';
// JSON
import json from './use-members.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useMembers', () => {

  describe('getMembers', () => {

    it('return members from cache', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Member[]>(json as [[ string, Member[] ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getMembers: () => Promise.resolve(params.json),
              setMembers: jest.fn()
            } as unknown as CacheService,
            graph: {
              getMembers: () => Promise.resolve(new Map())
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMembers);
        const [ getMembers ] = result.current;
        const members = await getMembers(params.keys);
        expect(members).toEqual(params.json);
      });
    });

    it('return members from graph', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Member[]>(json as [[ string, Member[] ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getMembers: () => Promise.resolve(new Map()),
              setMembers: jest.fn()
            } as unknown as CacheService,
            graph: {
              getMembers: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMembers);
        const [ getMembers ] = result.current;
        const members = await getMembers(params.keys);
        expect(members).toEqual(params.json);
      });
    });

    it('return error if failed', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Member[]>(json as [[ string, Member[] ]]),
        error: 'Something went wrong'
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getMembers: () => {
                throw new Error(params.error);
              },
              setMembers: jest.fn()
            } as unknown as CacheService,
            graph: {
              getMembers: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      act(() => {
        const { result } = renderHook(useMembers);
        const [ getMembers ] = result.current;
        expect(getMembers).rejects.toThrow(params.error);
      });
    });

  });

});
