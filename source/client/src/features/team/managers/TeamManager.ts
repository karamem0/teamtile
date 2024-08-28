//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import * as teamService from '../services/TeamService';
import {
  Channel,
  Drive,
  Member,
  Tab
} from '../../../types/Entity';
import { Item } from '../../../types/Store';

export async function clearCache() {
  return await Promise.resolve()
    .then(async () => await teamService.clearCache());
}

export async function getChannels(teamId: string): Promise<Channel[]> {
  return await Promise.resolve()
    .then(async () => teamService.getChannelsFromCache(teamId))
    .then(async (values) => values ?? await teamService.getChannelsFromGraph(teamId));
}

export async function getDrive(teamId: string): Promise<Drive | undefined> {
  return await Promise.resolve()
    .then(async () => teamService.getDriveFromCache(teamId))
    .then(async (value) => value ?? await teamService.getDriveFromGraph(teamId))
    .catch(() => undefined);
}

export async function getItems(): Promise<Item[]> {
  return await Promise.resolve()
    .then(async () => teamService.getItemsFromGroup())
    .then(async (values) => await teamService.getItemsFromCache(values))
    .then(async (values) => await teamService.getItemsFromGraph(values))
    .then((values) => values.filter((value) => !value.loading))
    .then(async (values) => await teamService.getTeamIconsFromCache(values))
    .then(async (values) => await teamService.getTeamIconsFromGraph(values));
}

export async function getMembers(teamId: string): Promise<Member[]> {
  return await Promise.resolve()
    .then(async () => teamService.getMembersFromCache(teamId))
    .then(async (values) => values ?? await teamService.getMembersFromGraph(teamId))
    .then(async (values) => teamService.getMemberIconsFromCache(values))
    .then(async (values) => teamService.getMemberIconsFromGraph(values));
}

export async function getTab(teamId: string, channelId: string, appId: string): Promise<Tab | undefined> {
  return await Promise.resolve()
    .then(async () => teamService.getTabFromGraph(teamId, channelId))
    .then((values) => values.find((value) => value.appId === appId));
}

export async function setPin(teamId: string, pinned: boolean) {
  return await Promise.resolve()
    .then(async () => await teamService.setPin(teamId, pinned));
}
