//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import merge from 'deepmerge';

import {
  Channel,
  Drive,
  Member,
  Tab
} from '../../../types/Entity';
import { Item } from '../../../types/Store';
import {
  mergeItems,
  mergeMembers
} from '../../../utils/Merge';
import {
  mapItemFromGroup,
  mapItemFromIcon,
  mapItemFromTeam,
  mapMemberFromIcon
} from '../mappings/AutoMapperProfile';
import * as cacheService from '../repositories/CacheRepository';
import * as graphService from '../repositories/GraphRepository';

export async function clearCache(): Promise<void> {
  return await cacheService.clearAll();
}

export async function getChannelsFromCache(teamId: string): Promise<Channel[] | undefined> {
  return await cacheService.getChannels(teamId, false);
}

export async function getChannelsFromGraph(teamId: string): Promise<Channel[]> {
  const value = await graphService.getChannels(teamId);
  await cacheService.setChannels(teamId, value);
  return value;
}

export async function getDriveFromCache(teamId: string): Promise<Drive | undefined> {
  return await cacheService.getDrive(teamId, false);
}

export async function getDriveFromGraph(teamId: string): Promise<Drive> {
  const value = await graphService.getDrive(teamId);
  await cacheService.setDrive(teamId, value);
  return value;
}

export async function getItemsFromGroup(): Promise<Item[]> {
  return await graphService
    .getGroups()
    .then((params) => params.map((param) => mapItemFromGroup(param)));
}

export async function getItemsFromCache(items: Item[]): Promise<Item[]> {
  return Promise.all(items
    .map(async (item) => {
      if (item.loading) {
        const team = await cacheService.getTeam(item.id);
        if (team != null) {
          const pin = await cacheService.getPin(item.id);
          return {
            ...merge(item, mapItemFromTeam(team)),
            pinned: pin != null
          };
        }
      }
      return item;
    }));
}

export async function getItemsFromGraph(items: Item[]): Promise<Item[]> {
  const ids = items.filter((item) => item.loading).map((item) => item.id);
  const values = await graphService.getTeams(ids);
  values.forEach(async (value) => value.id && await cacheService.setTeam(value.id, value));
  return merge(
    items,
    values.map((value) => mapItemFromTeam(value)),
    {
      arrayMerge: mergeItems
    });
}

export async function getMembersFromCache(teamId: string): Promise<Member[] | undefined> {
  return await cacheService.getMembers(teamId, false);
}

export async function getMembersFromGraph(teamId: string): Promise<Member[]> {
  const value = await graphService.getMembers(teamId);
  await cacheService.setMembers(teamId, value);
  return value;
}

export async function getMemberIconsFromCache(items: Member[]): Promise<Member[]> {
  return Promise.all(items.map(async (item) => {
    if (item.userId) {
      const cache = await cacheService.getIcon(item.userId);
      if (cache != null) {
        return merge(item, mapMemberFromIcon(cache));
      }
    }
    return item;
  }));
}

export async function getMemberIconsFromGraph(items: Member[]): Promise<Member[]> {
  const ids = items
    .filter((item) => !item.icon)
    .map((item) => item.userId)
    .filter((id): id is Exclude<typeof id, undefined> => Boolean(id));
  const values = await graphService.getMemberIcons(ids);
  values.forEach(async (value) => value.id && await cacheService.setIcon(value.id, value));
  return merge(
    items,
    values.map((value) => mapMemberFromIcon(value)),
    {
      arrayMerge: mergeMembers
    });
}

export async function getTabFromGraph(teamId: string, channelId: string): Promise<Tab[]> {
  return await graphService.getTabs(teamId, channelId);
}

export async function getTeamIconsFromCache(items: Item[]): Promise<Item[]> {
  return Promise.all(items.map(async (item) => {
    const cache = await cacheService.getIcon(item.id);
    if (cache != null) {
      return merge(item, mapItemFromIcon(cache));
    }
    return item;
  }));
}

export async function getTeamIconsFromGraph(items: Item[]): Promise<Item[]> {
  const ids = items
    .filter((item) => !item.value.icon)
    .map((item) => item.id);
  const values = await graphService.getTeamIcons(ids);
  values.forEach(async (value) => value.id && await cacheService.setIcon(value.id, value));
  return merge(
    items,
    values.map((value) => mapItemFromIcon(value)),
    {
      arrayMerge: mergeItems
    });
}

export async function setPin(teamId: string, pinned: boolean): Promise<void> {
  return await cacheService.setPin(teamId, pinned);
}
