//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Client } from '@microsoft/microsoft-graph-client';

import {
  Channel,
  Drive,
  Group,
  Icon,
  Member,
  MembershipType,
  Tab,
  Team,
  VisibilityType
} from '../types/entity';
import {
  ChannelKey,
  ItemKey,
  MemberKey
} from '../types/state';

import { CacheService } from './cache-service';
import { GraphService } from './graph-service';

export class ServiceProvider {

  private graphService: GraphService;

  private cacheService: CacheService;

  constructor (
    client: Client
  ) {
    this.graphService = new GraphService(client);
    this.cacheService = new CacheService(undefined, process.env.APP_CACHE_TIMEOUT);
  }

  async clearCache (): Promise<void> {
    await this.cacheService.clear();
  }

  async getChannelsFromCache (keys: ItemKey[]): Promise<Map<ItemKey, Channel[]>> {
    return await this.cacheService.getChannels(keys);
  }

  async getChannelsFromGraph (keys: ItemKey[]): Promise<Map<ItemKey, Channel[]>> {
    const cache = Array.from(await this.cacheService
      .getChannels(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getChannels(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[ItemKey, Channel[]]>(([ key, values ]) => ([
          key,
          values.map((value) => ({
            id: value.id,
            displayName: value.displayName,
            webUrl: value.webUrl,
            membershipType: value.membershipType as MembershipType
          }))
        ]))));
    await this.cacheService.setChannels(graph);
    return graph;
  }

  async getDrivesFromCache (keys: ItemKey[]): Promise<Map<ItemKey, Drive>> {
    return await this.cacheService.getDrives(keys);
  }

  async getDrivesFromGraph (keys: ItemKey[]): Promise<Map<ItemKey, Drive>> {
    const cache = Array.from(await this.cacheService
      .getDrives(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getDrives(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[ItemKey, Drive]>(([ key, value ]) => ([
          key,
          {
            id: value.id,
            webUrl: value.webUrl
          }
        ]))));
    await this.cacheService.setDrives(graph);
    return graph;
  }

  async getGroupsFromGraph (): Promise<Map<ItemKey, Group>> {
    return await this.graphService
      .getGroups()
      .then((map) => new Map(Array.from(map)
        .map<[ItemKey, Group]>(([ key, value ]) => ([
          key,
          {
            id: value.id,
            mail: value.mail,
            sensitivityLabel: (value.assignedLabels && value.assignedLabels.length > 0)
              ? value.assignedLabels[0].displayName
              : null
          }
        ]))));
  }

  async getMemberIconsFromCache (keys: MemberKey[]): Promise<Map<MemberKey, Icon | null>> {
    return await this.cacheService.getIcons(keys);
  }

  async getMemberIconsFromGraph (keys: MemberKey[]): Promise<Map<MemberKey, Icon | null>> {
    const cache = Array.from(await this.cacheService
      .getIcons(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getMemberIcons(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map(([ key, value ]) => ([
          key,
          value
        ]))));
    await this.cacheService.setIcons(graph);
    return graph;
  }

  async getMembersFromCache (keys: ItemKey[]): Promise<Map<ItemKey, Member[]>> {
    return await this.cacheService.getMembers(keys);
  }

  async getMembersFromGraph (keys: ItemKey[]): Promise<Map<ItemKey, Member[]>> {
    const cache = Array.from(await this.cacheService
      .getMembers(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getMembers(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[ItemKey, Member[]]>(([ key, value ]) => ([
          key,
          value.map((value) => ({
            displayName: value.displayName,
            email: value.email,
            id: value.id,
            userId: value.userId
          }))
        ]))));
    await this.cacheService.setMembers(graph);
    return graph;
  }

  async getTeamIconsFromCache (keys: ItemKey[]): Promise<Map<ItemKey, Icon | null>> {
    return await this.cacheService.getIcons(keys);
  }

  async getTeamIconsFromGraph (keys: ItemKey[]): Promise<Map<ItemKey, Icon | null>> {
    const cache = Array.from(await this.cacheService
      .getIcons(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getTeamIcons(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map(([ key, value ]) => ([
          key,
          value
        ]))));
    this.cacheService.setIcons(graph);
    return graph;
  }

  async getTabs (itemKey: ItemKey, channelKey: ChannelKey): Promise<Tab[]> {
    return await this.graphService
      .getTabs(itemKey, channelKey)
      .then((values) => values.map((value) => ({
        appId: value.teamsApp?.id,
        displayName: value.teamsApp?.displayName,
        id: value.id,
        webUrl: value.webUrl
      })));
  }

  async getTeamsFromCache (keys: ItemKey[]): Promise<Map<ItemKey, Team>> {
    return await this.cacheService.getTeams(keys);
  }

  async getTeamsFromGraph (keys: ItemKey[]): Promise<Map<ItemKey, Team>> {
    const cache = Array.from(await this.cacheService
      .getTeams(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getTeams(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[ItemKey, Team]>(([ key, value ]) => ([
          key,
          {
            description: value.description,
            displayName: value.displayName,
            id: value.id,
            internalId: value.internalId,
            visibility: value.visibility as VisibilityType,
            webUrl: value.webUrl
          }
        ]))));
    await this.cacheService.setTeams(graph);
    return graph;
  }

}
