//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as cacheService from '../repositories/CacheRepository';
import * as graphService from '../repositories/GraphRepository';
import {
  Channel,
  Drive,
  Member,
  Tab,
  Tag
} from '../../../types/Entity';
import {
  mapCardFromGroup,
  mapCardFromIcon,
  mapCardFromTeam,
  mapCardFromTeamInfo,
  mapMemberFromIcon
} from '../mappings/AutoMapperProfile';
import {
  margeCards,
  mergeMembers
} from '../../../utils/Merge';
import { TeamCard } from '../../../types/Store';
import merge from 'deepmerge';

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

export async function getCardsFromTeamInfos(): Promise<TeamCard[]> {
  const values = await graphService.getTeamInfos();
  return values.map((value) => mapCardFromTeamInfo(value));
}

export async function getCardsFromCache(items: TeamCard[]): Promise<TeamCard[]> {
  return Promise.all(items
    .map(async (item) => {
      if (item.loading) {
        const group = await cacheService.getGroup(item.id);
        const team = await cacheService.getTeam(item.id);
        if (group != null && team != null) {
          item = merge(item, mapCardFromGroup(group));
          item = merge(item, mapCardFromTeam(team));
          return item;
        }
      }
      return item;
    }));
}

export async function getCardsFromGroup(items: TeamCard[]): Promise<TeamCard[]> {
  const ids = items.filter((item) => item.loading).map((item) => item.id);
  const values = await graphService.getGroups(ids);
  values.forEach(async (value) => value.id && await cacheService.setGroup(value.id, value));
  return merge(
    items,
    values.map((value) => mapCardFromGroup(value)),
    {
      arrayMerge: margeCards
    });
}

export async function getCardsFromTeam(items: TeamCard[]): Promise<TeamCard[]> {
  const ids = items.filter((item) => item.loading).map((item) => item.id);
  const values = await graphService.getTeams(ids);
  values.forEach(async (value) => value.id && await cacheService.setTeam(value.id, value));
  return merge(
    items,
    values.map((value) => mapCardFromTeam(value)),
    {
      arrayMerge: margeCards
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
    .filter((item) => item.icon == null)
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

export async function getPins(items: TeamCard[]): Promise<TeamCard[]> {
  return Promise.all(items.map(async (item) => {
    const pinned = await cacheService.getPin(item.id);
    return {
      ...item,
      pinned: pinned != null
    };
  }));
}

export async function getTabFromGraph(teamId: string, channelId: string): Promise<Tab[]> {
  return await graphService.getTabs(teamId, channelId);
}

export async function getTeamIconsFromCache(items: TeamCard[]): Promise<TeamCard[]> {
  return Promise.all(items.map(async (item) => {
    const cache = await cacheService.getIcon(item.id);
    if (cache != null) {
      return merge(item, mapCardFromIcon(cache));
    }
    return item;
  }));
}

export async function getTagsFromCache(teamId: string): Promise<Tag[] | undefined> {
  return await cacheService.getTags(teamId, false);
}

export async function getTagsFromGraph(teamId: string): Promise<Tag[]> {
  const value = await graphService.getTags(teamId);
  await cacheService.setTags(teamId, value);
  return value;
}

export async function getTagMembersFromCache(tagId: string): Promise<Member[] | undefined> {
  return await cacheService.getTagMembers(tagId, false);
}

export async function getTagMembersFromGraph(teamId: string, tagId: string): Promise<Member[]> {
  const value = await graphService.getTagMembers(teamId, tagId);
  await cacheService.setTagMembers(tagId, value);
  return value;
}

export async function getTeamIconsFromGraph(items: TeamCard[]): Promise<TeamCard[]> {
  const ids = items
    .filter((item) => item.team.icon == null)
    .map((item) => item.id);
  const values = await graphService.getTeamIcons(ids);
  values.forEach(async (value) => value.id && await cacheService.setIcon(value.id, value));
  return merge(
    items,
    values.map((value) => mapCardFromIcon(value)),
    {
      arrayMerge: margeCards
    });
}

export async function setPin(teamId: string, pinned: boolean): Promise<void> {
  return await cacheService.setPin(teamId, pinned);
}
