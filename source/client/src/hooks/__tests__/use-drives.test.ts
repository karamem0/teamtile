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
import * as ServiceContext from '../../contexts/service-context';
// Hooks
import { useDrives } from '../use-drives';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';
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

    it('return drives from cache', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Drive>(json as [[ string, Drive ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getDrives: () => Promise.resolve(params.json),
              putDrive: jest.fn()
            } as unknown as CacheService,
            graph: {
              getDrives: () => Promise.resolve(new Map())
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useDrives);
        const [ getDrives ] = result.current;
        const drives = await getDrives(params.keys);
        expect(drives).toEqual(params.json);
      });
    });

    it('return drives from graph', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Drive>(json as [[ string, Drive ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getDrives: () => Promise.resolve(new Map()),
              setDrive: jest.fn()
            } as unknown as CacheService,
            graph: {
              getDrives: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useDrives);
        const [ getDrives ] = result.current;
        const drives = await getDrives(params.keys);
        expect(drives).toEqual(params.json);
      });
    });

    it('return error if failed', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        error: 'Something went wrong'
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getDrives: () => {
                throw new Error(params.error);
              },
              setDrives: jest.fn()
            } as unknown as CacheService,
            graph: {
              getDrives: jest.fn()
            } as unknown as GraphService
          }
        });
      act(() => {
        const { result } = renderHook(useDrives);
        const [ getDrives ] = result.current;
        expect(getDrives).rejects.toThrow(params.error);
      });
    });

  });

});
