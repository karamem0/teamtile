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
import { useTeams } from '../use-teams';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';
// Types
import { Team } from '../../types/entity';
// JSON
import json from './use-teams.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useTeams', () => {

  describe('getTeams', () => {

    it('return teams from cache', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Team>(json as [[ string, Team ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getTeams: () => Promise.resolve(params.json),
              setTeam: jest.fn()
            } as unknown as CacheService,
            graph: {
              getTeams: () => Promise.resolve(new Map())
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeams);
        const [ getTeams ] = result.current;
        const teams = await getTeams(params.keys);
        expect(teams).toEqual(params.json);
      });
    });

    it('return teams from graph', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Team>(json as [[ string, Team ]])
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getTeams: () => Promise.resolve(new Map()),
              setTeam: jest.fn()
            } as unknown as CacheService,
            graph: {
              getTeams: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeams);
        const [ getTeams ] = result.current;
        const teams = await getTeams(params.keys);
        expect(teams).toEqual(params.json);
      });
    });

    it('return error if failed', async () => {
      const params = {
        keys: [
          '02bd9fd6-8f93-4758-87c3-1fb73740a315',
          '13be6971-79db-4f33-9d41-b25589ca25af',
          '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
        ],
        json: new Map<string, Team>(json as [[ string, Team ]]),
        error: 'Something went wrong'
      };
      jest
        .spyOn(ServiceContext, 'useServiceContext')
        .mockReturnValue({
          services: {
            cache: {
              getTeams: () => {
                throw new Error(params.error);
              },
              setTeam: jest.fn()
            } as unknown as CacheService,
            graph: {
              getTeams: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useTeams);
        const [ getTeams ] = result.current;
        expect(getTeams).rejects.toThrow(params.error);
      });
    });

  });

});
