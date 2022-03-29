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
  Icon,
  Member,
  MembershipType,
  Team,
  VisibilityType
} from '../types/entity';
import { ItemKey } from '../types/state';

import { CacheService } from './cache-service';
import { GraphService } from './graph-service';

export class ServiceProvider {

  private graphService: GraphService;

  private cacheService: CacheService;

  constructor (
    client: Client
  ) {
    this.graphService = new GraphService(client);
    this.cacheService = new CacheService(undefined, process.env.REACT_APP_CACHE_TIMEOUT);
  }

  async clearCache (): Promise<void> {
    await this.cacheService.clear();
  }

  async getChannelsFromCache (keys: ItemKey[]): Promise<Map<string, Channel[]>> {
    return await this.cacheService.getChannels(keys);
  }

  async getChannelsFromGraph (keys: ItemKey[]): Promise<Map<string, Channel[]>> {
    const cache = Array.from(await this.cacheService
      .getChannels(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getChannels(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[string, Channel[]]>(([ key, values ]) => ([
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

  async getDrivesFromCache (keys: ItemKey[]): Promise<Map<string, Drive>> {
    return await this.cacheService.getDrives(keys);
  }

  async getDrivesFromGraph (keys: ItemKey[]): Promise<Map<string, Drive>> {
    const cache = Array.from(await this.cacheService
      .getDrives(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getDrives(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[string, Drive]>(([ key, value ]) => ([
          key,
          {
            id: value.id,
            webUrl: value.webUrl
          }
        ]))));
    await this.cacheService.setDrives(graph);
    return graph;
  }

  async getKeys (): Promise<ItemKey[]> {
    return await this.graphService.getKeys();
  }

  async getMemberIconsFromCache (keys: string[]): Promise<Map<string, Icon | null>> {
    return await this.cacheService.getIcons(keys);
  }

  async getMemberIconsFromGraph (keys: string[]): Promise<Map<string, Icon | null>> {
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

  async getMembersFromCache (keys: ItemKey[]): Promise<Map<string, Member[]>> {
    return await this.cacheService.getMembers(keys);
  }

  async getMembersFromGraph (keys: ItemKey[]): Promise<Map<string, Member[]>> {
    const cache = Array.from(await this.cacheService
      .getMembers(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getMembers(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[string, Member[]]>(([ key, value ]) => ([
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

  async getTeamIconsFromCache (keys: string[]): Promise<Map<string, Icon | null>> {
    return await this.cacheService.getIcons(keys);
  }

  async getTeamIconsFromGraph (keys: string[]): Promise<Map<string, Icon | null>> {
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

  async getTeamsFromCache (keys: string[]): Promise<Map<string, Team>> {
    return await this.cacheService.getTeams(keys);
  }

  async getTeamsFromGraph (keys: string[]): Promise<Map<string, Team>> {
    const cache = Array.from(await this.cacheService
      .getTeams(keys, false)
      .then((map) => map.keys()));
    const graph = await this.graphService
      .getTeams(keys.filter((key) => cache.indexOf(key) < 0))
      .then((map) => new Map(Array.from(map)
        .map<[string, Team]>(([ key, value ]) => ([
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
