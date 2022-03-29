//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

const errorContextValue = {
  setError: jest.fn()
};
jest.mock('../../contexts/error-context', () => ({
  useErrorContext: jest.fn().mockReturnValue(errorContextValue)
}));

const reducerContextValue = {
  dispatchers: {
    dispatchChannels: jest.fn(),
    dispatchDrives: jest.fn(),
    dispatchItemFilter: jest.fn(),
    dispatchKeys: jest.fn(),
    dispatchLoadingKeys: jest.fn(),
    dispatchLoadingValues: jest.fn(),
    dispatchMemberIcons: jest.fn(),
    dispatchMembers: jest.fn(),
    dispatchTeamIcons: jest.fn(),
    dispatchTeams: jest.fn()
  }
};
jest.mock('../../contexts/reducer-context', () => ({
  useReducerContext: jest.fn().mockReturnValue(reducerContextValue)
}));

const serviceContextValue = {
  services: {
    clearCache: jest.fn(),
    getChannelsFromCache: jest.fn(),
    getChannelsFromGraph: jest.fn(),
    getDrivesFromCache: jest.fn(),
    getDrivesFromGraph: jest.fn(),
    getKeys: jest.fn(),
    getMemberIconsFromCache: jest.fn(),
    getMemberIconsFromGraph: jest.fn(),
    getMembersFromCache: jest.fn(),
    getMembersFromGraph: jest.fn(),
    getTeamIconsFromCache: jest.fn(),
    getTeamIconsFromGraph: jest.fn(),
    getTeamsFromCache: jest.fn(),
    getTeamsFromGraph: jest.fn()
  }
};
jest.mock('../../contexts/service-context', () => ({
  useServiceContext: jest.fn().mockReturnValue(serviceContextValue)
}));

import { renderHook } from '@testing-library/react-hooks';

import { KeyValue } from '../../types/common';
import { Team } from '../../types/entity';
import { ItemKey, ItemValue } from '../../types/state';
import { useItemLoader } from '../use-item-loader';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('loadItems', () => {

  it('unforced load items if succeeded', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ]
    };
    serviceContextValue.services
      .getKeys
      .mockResolvedValue(params.keys);
    serviceContextValue.services
      .getTeamsFromCache
      .mockResolvedValue(new Map<string, Team>());
    serviceContextValue.services
      .getTeamsFromGraph
      .mockResolvedValue(new Map<string, Team>());
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    await loadItems(false);
    expect(serviceContextValue.services.clearCache).not.toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchKeys).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchLoadingKeys).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchLoadingValues).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchTeams).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchTeamIcons).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchChannels).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchMembers).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchDrives).toBeCalled();
  });

  it('forced load items if succeeded', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ]
    };
    serviceContextValue.services
      .getKeys
      .mockResolvedValue(params.keys);
    serviceContextValue.services
      .getTeamsFromCache
      .mockResolvedValue(new Map<string, Team>());
    serviceContextValue.services
      .getTeamsFromGraph
      .mockResolvedValue(new Map<string, Team>());
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    await loadItems(true);
    expect(serviceContextValue.services.clearCache).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchKeys).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchLoadingKeys).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchLoadingValues).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchTeams).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchTeamIcons).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchChannels).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchMembers).toBeCalled();
    expect(reducerContextValue.dispatchers.dispatchDrives).toBeCalled();
  });

  it('return error if failed', async () => {
    const params = {
      error: 'Something went wrong.'
    };
    serviceContextValue.services
      .getKeys
      .mockRejectedValue(new Error(params.error));
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    await loadItems(false);
    expect(errorContextValue.setError).toBeCalled();
  });

});

describe('loadMemberIcons', () => {

  it('load member icons if succeeded', async () => {
    const json = await import('./__jsons__/use-item-loader.test.json');
    const params = {
      item: json.default as KeyValue<ItemKey, ItemValue>
    };
    const { result } = renderHook(useItemLoader);
    const { loadMemberIcons } = result.current;
    await loadMemberIcons(params.item);
    expect(reducerContextValue.dispatchers.dispatchMemberIcons).toBeCalled();
  });

  it('return error if failed', async () => {
    const json = await import('./__jsons__/use-item-loader.test.json');
    const params = {
      item: json.default as KeyValue<ItemKey, ItemValue>,
      error: 'Something went wrong.'
    };
    serviceContextValue.services
      .getMemberIconsFromCache
      .mockRejectedValue(new Error(params.error));
    const { result } = renderHook(useItemLoader);
    const { loadMemberIcons } = result.current;
    await loadMemberIcons(params.item);
    expect(errorContextValue.setError).toBeCalled();
  });

});
