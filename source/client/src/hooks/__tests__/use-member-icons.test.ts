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
import { useMemberIcons } from '../use-member-icons';
// Services
import { CacheService } from '../../services/cache-service';
import { GraphService } from '../../services/graph-service';
// JSON
import json from './use-member-icons.test.json';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useMemberIcons', () => {

  describe('getMemberIcons', () => {

    it('return icons from cache', async () => {
      const params = {
        keys: [
          '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          '626cbf8c-5dde-46b0-8385-9e40d64736fe',
          '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
              getMemberIcons: () => Promise.resolve(new Map())
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMemberIcons);
        const [ getMemberIcons ] = result.current;
        const icons = await getMemberIcons(params.keys);
        expect(icons).toEqual(params.json);
      });
    });

    it('return icons from graph', async () => {
      const params = {
        keys: [
          '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          '626cbf8c-5dde-46b0-8385-9e40d64736fe',
          '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
              getMemberIcons: () => Promise.resolve(params.json)
            } as unknown as GraphService
          }
        });
      await act(async () => {
        const { result } = renderHook(useMemberIcons);
        const [ getMemberIcons ] = result.current;
        const icons = await getMemberIcons(params.keys);
        expect(icons).toEqual(params.json);
      });
    });

    it('return error if failed', async () => {
      const params = {
        keys: [
          '87d349ed-44d7-43e1-9a83-5f2406dee5bd',
          '626cbf8c-5dde-46b0-8385-9e40d64736fe',
          '074e56ea-0b50-4461-89e5-c67ae14a2c0b'
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
              getMemberIcons: jest.fn()
            } as unknown as GraphService
          }
        });
      act(() => {
        const { result } = renderHook(useMemberIcons);
        const [ getMemberIcons ] = result.current;
        expect(getMemberIcons).rejects.toThrow(params.error);
      });
    });

  });

});
