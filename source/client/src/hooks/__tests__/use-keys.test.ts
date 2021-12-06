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
import * as ServiceContext from '../../contexts/service-context';
// Hooks
import { useKeys } from '../use-keys';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useKeys', () => {

  describe('getKeys', () => {

    it('return keys if succeeded', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ]
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {} as CacheService,
            graph: {
              getKeys: () => Promise.resolve(params.keys)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useKeys);
        const [ getKeys ] = result.current;
        const keys = await getKeys();
        expect(keys).toEqual(params.keys);
      });
    });

    it('return error if failed', async () => {
      const params = {
        error: 'Something went wrong'
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {} as CacheService,
            graph: {
              getKeys: () => {
                throw new Error(params.error);
              }
            } as unknown as GraphService
          }
        });
      act(() => {
        const { result } = renderHook(useKeys);
        const [ getKeys ] = result.current;
        expect(getKeys).rejects.toThrow(params.error);
      });
    });

  });

});
