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
    this.cacheService = new CacheService();
  }

  async getChannels (keys: ItemKey[]): Promise<Map<string, Channel[]>> {
    const cache = await this.cacheService.getChannels(keys);
    const graph = await this.graphService
      .getChannels(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map<[string, Channel[]]>(([ key, values ]) => ([
          key,
          values.map((value) => ({
            id: value.id,
            displayName: value.displayName ?? null,
            webUrl: value.webUrl ?? null,
            membershipType: value.membershipType as MembershipType ?? null
          }))
        ]))));
    Array.from(graph)
      .forEach(([ key, values ]) => this.cacheService.setChannels(key, values));
    return new Map<string, Channel[]>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }

  async getDrives (keys: ItemKey[]): Promise<Map<string, Drive>> {
    const cache = await this.cacheService.getDrives(keys);
    const graph = await this.graphService
      .getDrives(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map<[string, Drive]>(([ key, value ]) => ([
          key,
          {
            id: value.id,
            webUrl: value.webUrl ?? null
          }
        ]))));
    Array.from(graph)
      .forEach(([ key, value ]) => this.cacheService.setDrive(key, value));
    return new Map<string, Drive>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }

  async getKeys (): Promise<ItemKey[]> {
    return await this.graphService.getKeys();
  }

  async getMemberIcons (keys: string[]): Promise<Map<string, string|null>> {
    const cache = await this.cacheService.getIcons(keys);
    const graph = await this.graphService
      .getMemberIcons(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map(([ key, value ]) => ([
          key,
          value
        ]))));
    Array.from(graph)
      .forEach(([ key, value ]) => this.cacheService.setIcon(key, value));
    return new Map<string, string | null>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }

  async getMembers (keys: ItemKey[]): Promise<Map<string, Member[]>> {
    const cache = await this.cacheService.getMembers(keys);
    const graph = await this.graphService
      .getMembers(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map<[string, Member[]]>(([ key, value ]) => ([
          key,
          value.map((value) => ({
            id: value.id,
            displayName: value.displayName ?? null,
            userId: value.userId ?? null,
            email: value.email ?? null
          }))
        ]))));
    Array.from(graph)
      .forEach(([ key, values ]) => this.cacheService.setMembers(key, values));
    return new Map<string, Member[]>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }

  async getTeamIcons (keys: string[]): Promise<Map<string, string | null>> {
    const cache = await this.cacheService.getIcons(keys);
    const graph = await this.graphService
      .getTeamIcons(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map(([ key, value ]) => ([
          key,
          value
        ]))));
    Array.from(graph)
      .forEach(([ key, value ]) => this.cacheService.setIcon(key, value));
    return new Map<string, string | null>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }

  async getTeams (keys: string[]): Promise<Map<string, Team>> {
    const cache = await this.cacheService.getTeams(keys);
    const graph = await this.graphService
      .getTeams(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map<[string, Team]>(([ key, value ]) => ([
          key,
          {
            id: value.id,
            displayName: value.displayName ?? null,
            description: value.description ?? null,
            internalId: value.internalId ?? null,
            visibility: value.visibility as VisibilityType ?? null,
            webUrl: value.webUrl ?? null
          }
        ]))));
    Array.from(graph)
      .forEach(([ key, value ]) => this.cacheService.setTeam(key, value));
    return new Map<string, Team>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }

}
