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
import { useChannels } from '../use-channels';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';
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

    it('return channels from cache', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Channel[]>(json as [[ string, Channel[] ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getChannels: () => Promise.resolve(params.json),
              setChannels: jest.fn()
            } as unknown as CacheService,
            graph: {
              getChannels: () => Promise.resolve(new Map())
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useChannels);
        const [ getChannels ] = result.current;
        const channels = await getChannels(params.keys);
        expect(channels).toEqual(params.json);
      });
    });

    it('return channels from graph', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Channel[]>(json as [[ string, Channel[] ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getChannels: () => Promise.resolve(new Map()),
              setChannels: jest.fn()
            } as unknown as CacheService,
            graph: {
              getChannels: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useChannels);
        const [ getChannels ] = result.current;
        const channels = await getChannels(params.keys);
        expect(channels).toEqual(params.json);
      });
    });

    it('throw error if failed', async () => {
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
              getChannels: () => {
                throw new Error(params.error);
              },
              setChannels: jest.fn()
            } as unknown as CacheService,
            graph: {
              getChannels: jest.fn()
            } as unknown as GraphService
          }
        });
      act(() => {
        const { result } = renderHook(useChannels);
        const [ getChannels ] = result.current;
        expect(getChannels(params.keys)).rejects.toThrow(params.error);
      });
    });

  });

});
