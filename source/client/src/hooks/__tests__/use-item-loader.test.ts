//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';

import { useErrorContext } from '../../contexts/error-context';
import { useReducerContext } from '../../contexts/reducer-context';
import { useServiceContext } from '../../contexts/service-context';
import { KeyValue } from '../../types/common';
import { Group, Team } from '../../types/entity';
import { ItemKey, ItemValue } from '../../types/state';
import { useItemLoader } from '../use-item-loader';

jest.mock('../../contexts/error-context', () => ({
  useErrorContext: jest.fn().mockReturnValue({
    setError: jest.fn()
  })
}));

jest.mock('../../contexts/reducer-context', () => ({
  useReducerContext: jest.fn().mockReturnValue({
    dispatchers: {
      dispatchChannels: jest.fn(),
      dispatchDrives: jest.fn(),
      dispatchGroups: jest.fn(),
      dispatchItemFilter: jest.fn(),
      dispatchLoadingKeys: jest.fn(),
      dispatchLoadingValues: jest.fn(),
      dispatchMemberIcons: jest.fn(),
      dispatchMembers: jest.fn(),
      dispatchTeamIcons: jest.fn(),
      dispatchTeams: jest.fn()
    }
  })
}));

jest.mock('../../contexts/service-context', () => ({
  useServiceContext: jest.fn().mockReturnValue({
    services: {
      clearCache: jest.fn(),
      getChannelsFromCache: jest.fn(),
      getChannelsFromGraph: jest.fn(),
      getDrivesFromCache: jest.fn(),
      getDrivesFromGraph: jest.fn(),
      getGroupsFromGraph: jest.fn(),
      getMemberIconsFromCache: jest.fn(),
      getMemberIconsFromGraph: jest.fn(),
      getMembersFromCache: jest.fn(),
      getMembersFromGraph: jest.fn(),
      getTeamIconsFromCache: jest.fn(),
      getTeamIconsFromGraph: jest.fn(),
      getTeamsFromCache: jest.fn(),
      getTeamsFromGraph: jest.fn()
    }
  })
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('loadItems', () => {

  it('unforced load items if succeeded', async () => {
    const { services } = useServiceContext();
    const { dispatchers } = useReducerContext();
    const getGroupsFromGraph = services.getGroupsFromGraph as jest.Mock;
    getGroupsFromGraph.mockResolvedValue(new Map<string, Group>());
    const getTeamsFromCache = services.getTeamsFromCache as jest.Mock;
    getTeamsFromCache.mockResolvedValue(new Map<string, Team>());
    const getTeamsFromGraph = services.getGroupsFromGraph as jest.Mock;
    getTeamsFromGraph.mockResolvedValue(new Map<string, Team>());
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    await loadItems(false);
    expect(services.clearCache).not.toBeCalled();
    expect(dispatchers.dispatchGroups).toBeCalled();
    expect(dispatchers.dispatchLoadingKeys).toBeCalled();
    expect(dispatchers.dispatchLoadingValues).toBeCalled();
    expect(dispatchers.dispatchTeams).toBeCalled();
    expect(dispatchers.dispatchTeamIcons).toBeCalled();
    expect(dispatchers.dispatchChannels).toBeCalled();
    expect(dispatchers.dispatchMembers).toBeCalled();
    expect(dispatchers.dispatchDrives).toBeCalled();
  });

  it('forced load items if succeeded', async () => {
    const { services } = useServiceContext();
    const { dispatchers } = useReducerContext();
    const getGroupsFromGraph = services.getGroupsFromGraph as jest.Mock;
    getGroupsFromGraph.mockResolvedValue(new Map<string, Group>());
    const getTeamsFromCache = services.getTeamsFromCache as jest.Mock;
    getTeamsFromCache.mockResolvedValue(new Map<string, Team>());
    const getTeamsFromGraph = services.getGroupsFromGraph as jest.Mock;
    getTeamsFromGraph.mockResolvedValue(new Map<string, Team>());
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    await loadItems(true);
    expect(services.clearCache).toBeCalled();
    expect(dispatchers.dispatchGroups).toBeCalled();
    expect(dispatchers.dispatchLoadingKeys).toBeCalled();
    expect(dispatchers.dispatchLoadingValues).toBeCalled();
    expect(dispatchers.dispatchTeams).toBeCalled();
    expect(dispatchers.dispatchTeamIcons).toBeCalled();
    expect(dispatchers.dispatchChannels).toBeCalled();
    expect(dispatchers.dispatchMembers).toBeCalled();
    expect(dispatchers.dispatchDrives).toBeCalled();
  });

  it('return error if failed', async () => {
    const params = {
      error: 'Something went wrong.'
    };
    const { services } = useServiceContext();
    const { setError } = useErrorContext();
    const getGroupsFromGraph = services.getGroupsFromGraph as jest.Mock;
    getGroupsFromGraph.mockRejectedValue(new Error(params.error));
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    await loadItems(false);
    expect(setError).toBeCalled();
  });

});

describe('loadMemberIcons', () => {

  it('load member icons if succeeded', async () => {
    const json = await import('./__jsons__/use-item-loader.test.json');
    const params = {
      item: json.default as KeyValue<ItemKey, ItemValue>
    };
    const { dispatchers } = useReducerContext();
    const { result } = renderHook(useItemLoader);
    const { loadMemberIcons } = result.current;
    await loadMemberIcons(params.item);
    expect(dispatchers.dispatchMemberIcons).toBeCalled();
  });

  it('return error if failed', async () => {
    const json = await import('./__jsons__/use-item-loader.test.json');
    const params = {
      item: json.default as KeyValue<ItemKey, ItemValue>,
      error: 'Something went wrong.'
    };
    const { services } = useServiceContext();
    const { setError } = useErrorContext();
    const getMemberIconsFromCache = services.getMemberIconsFromCache as jest.Mock;
    getMemberIconsFromCache.mockRejectedValue(new Error(params.error));
    const { result } = renderHook(useItemLoader);
    const { loadMemberIcons } = result.current;
    await loadMemberIcons(params.item);
    expect(setError).toBeCalled();
  });

});
