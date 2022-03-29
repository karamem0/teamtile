//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useErrorContext } from '../contexts/error-context';
import { useReducerContext } from '../contexts/reducer-context';
import { useServiceContext } from '../contexts/service-context';
import { KeyValue } from '../types/common';
import { ItemKey, ItemValue } from '../types/state';

interface ItemLoaderValue {
  loadItems: (force: boolean) => Promise<void>,
  loadMemberIcons: (item: KeyValue<ItemKey, ItemValue>) => Promise<void>
}

export const useItemLoader = (): ItemLoaderValue => {

  const { setError } = useErrorContext();
  const { dispatchers } = useReducerContext();
  const { services } = useServiceContext();

  const loadItems = React.useCallback(async (force: boolean) => {
    try {
      dispatchers.dispatchLoadingKeys(true);
      if (force) {
        await services.clearCache();
      }
      const keys = await services.getKeys();
      dispatchers.dispatchKeys(keys);
      dispatchers.dispatchLoadingKeys(false);
      const [
        cacheTeams,
        cacheTeamIcons,
        cacheChannels,
        cacheDrives,
        cacheMembers
      ] = await Promise.all([
        services.getTeamsFromCache(keys),
        services.getTeamIconsFromCache(keys),
        services.getChannelsFromCache(keys),
        services.getDrivesFromCache(keys),
        services.getMembersFromCache(keys)
      ]);
      dispatchers.dispatchTeams(cacheTeams);
      dispatchers.dispatchTeamIcons(cacheTeamIcons);
      dispatchers.dispatchChannels(cacheChannels);
      dispatchers.dispatchDrives(cacheDrives);
      dispatchers.dispatchMembers(cacheMembers);
      dispatchers.dispatchLoadingValues(new Map(Array
        .from(cacheTeams.keys())
        .map((key) => [ key, false ])));
      const [
        graphTeams,
        graphTeamIcons,
        graphChannels,
        graphDrives,
        graphMembers
      ] = await Promise.all([
        services.getTeamsFromGraph(keys),
        services.getTeamIconsFromGraph(keys),
        services.getChannelsFromGraph(keys),
        services.getDrivesFromGraph(keys),
        services.getMembersFromGraph(keys)
      ]);
      dispatchers.dispatchTeams(graphTeams);
      dispatchers.dispatchTeamIcons(graphTeamIcons);
      dispatchers.dispatchChannels(graphChannels);
      dispatchers.dispatchDrives(graphDrives);
      dispatchers.dispatchMembers(graphMembers);
      dispatchers.dispatchLoadingValues(new Map(Array
        .from(graphTeams.keys())
        .map((key) => [ key, false ])));
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Object.prototype.toString.call(error);
      setError(message);
    } finally {
      dispatchers.dispatchLoadingKeys(false);
    }
  }, [
    setError,
    dispatchers,
    services
  ]);

  const loadMemberIcons = React.useCallback(async ({ key, value }: KeyValue<ItemKey, ItemValue>) => {
    try {
      if (!value.members) {
        return;
      }
      const keys = value.members
        .map(member => member.userId)
        .filter((key): key is Exclude<typeof key, null | undefined> => Boolean(key));
      dispatchers.dispatchMemberIcons({
        key: key,
        value: await services.getMemberIconsFromCache(keys)
      });
      dispatchers.dispatchMemberIcons({
        key: key,
        value: await services.getMemberIconsFromGraph(keys)
      });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Object.prototype.toString.call(error);
      setError(message);
    }
  }, [
    setError,
    dispatchers,
    services
  ]);

  return {
    loadItems,
    loadMemberIcons
  };

};
