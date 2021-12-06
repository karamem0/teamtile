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
import { useTeamIcons } from '../use-team-icons';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';
// JSON
import json from './use-team-icons.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useTeamIcons', () => {

  describe('getTeamIcons', () => {

    it('return icons from cache', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, string>(json as [[ string, string ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getIcons: () => Promise.resolve(params.json),
              putIcon: jest.fn()
            } as unknown as CacheService,
            graph: {
              getTeamIcons: () => Promise.resolve(new Map())
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeamIcons);
        const [ getTeamIcons ] = result.current;
        const icons = await getTeamIcons(params.keys);
        expect(icons).toEqual(params.json);
      });
    });

    it('return icons from graph', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, string>(json as [[ string, string ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getIcons: () => Promise.resolve(new Map()),
              setIcon: jest.fn()
            } as unknown as CacheService,
            graph: {
              getTeamIcons: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeamIcons);
        const [ getTeamIcons ] = result.current;
        const icons = await getTeamIcons(params.keys);
        expect(icons).toEqual(params.json);
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
              getIcons: () => {
                throw new Error(params.error);
              },
              putIcon: jest.fn()
            } as unknown as CacheService,
            graph: {
              getTeamIcons: () => jest.fn()
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeamIcons);
        const [ getTeamIcons ] = result.current;
        expect(getTeamIcons).rejects.toThrow(params.error);
      });
    });

  });

});
