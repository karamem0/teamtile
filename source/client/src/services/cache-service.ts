//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import Dexie from 'dexie';

import {
  Channel,
  Drive,
  Icon,
  Member,
  Team
} from '../types/entity';
import { compare } from '../utils/compare';

interface ValueEntity<T> {
  id: string,
  expired: number,
  value: T
}

interface ArrayEntity<T> {
  id: string,
  expired: number,
  values: T[]
}

export class CacheService {

  readonly database: Dexie;

  readonly timeout: number;

  constructor (
    database?: Dexie,
    timeout?: number
  ) {
    this.database = database || new Dexie('teamtile');
    this.database.version(5).stores({
      channels: '&id, expired, values.displayName, values.id, values.webUrl',
      drives: '&id, expired, value.id, value.webUrl',
      icons: '&id, expired, value.data, value.type',
      members: '&id, expired, values.displayName, values.email, values.userId',
      teams: '&id, expired, value.description, value.displayName, value.id, value.internalId, value.visibility, value.webUrl'
    });
    this.timeout = timeout || 3600;
  }

  async clear (): Promise<void> {
    await Promise.all(this.database.tables.map((table) => table.clear()));
  }

  async getChannels (
    keys: string[],
    expired?: boolean | undefined,
    timestamp: number = Date.now()
  ): Promise<Map<string, Channel[]>> {
    return new Map(
      await Promise.all<[string, Channel[]][]>(
        await this.database.table<ArrayEntity<Channel>>('channels')
          .filter((entity) => keys.indexOf(entity.id) >= 0)
          .filter((entity) => {
            switch (expired) {
              case true:
                return entity.expired < timestamp;
              case false:
                return entity.expired >= timestamp;
              default:
                return true;
            }
          })
          .toArray()
          .then((entities) => entities.map((entity) => ([
            entity.id,
            entity.values.sort((a, b) => compare(a.displayName, b.displayName))
          ])))
      )
    );
  }

  async setChannels (
    entities: Map<string, Channel[]>,
    timestamp: number = Date.now()
  ): Promise<void> {
    entities.forEach(async (values, key) =>
      await this.database.table<ArrayEntity<Channel>>('channels').put({
        expired: timestamp + (this.timeout * 1000),
        id: key,
        values: values
      }));
  }

  async getDrives (
    keys: string[],
    expired?: boolean | undefined,
    timestamp: number = Date.now()
  ): Promise<Map<string, Drive>> {
    return new Map(
      await Promise.all<[string, Drive][]>(
        await this.database.table<ValueEntity<Drive>>('drives')
          .filter((entity) => keys.indexOf(entity.id) >= 0)
          .filter((entity) => {
            switch (expired) {
              case true:
                return entity.expired < timestamp;
              case false:
                return entity.expired >= timestamp;
              default:
                return true;
            }
          })
          .toArray()
          .then((entities) => entities.map((entity) => ([ entity.id, entity.value ])))
      )
    );
  }

  async setDrives (
    entities: Map<string, Drive>,
    timestamp: number = Date.now()
  ): Promise<void> {
    entities.forEach(async (value, key) =>
      await this.database.table<ValueEntity<Drive>>('drives').put({
        expired: timestamp + (this.timeout * 1000),
        id: key,
        value: value
      }));
  }

  async getIcons (
    keys: string[],
    expired?: boolean | undefined,
    timestamp: number = Date.now()
  ): Promise<Map<string, Icon | null>> {
    return new Map(
      await Promise.all<[string, Icon | null][]>(
        await this.database.table<ValueEntity<Icon | null>>('icons')
          .filter((entity) => keys.indexOf(entity.id) >= 0)
          .filter((entity) => {
            switch (expired) {
              case true:
                return entity.expired < timestamp;
              case false:
                return entity.expired >= timestamp;
              default:
                return true;
            }
          })
          .toArray()
          .then((entities) => entities.map((entity) => ([ entity.id, entity.value ])))
      )
    );
  }

  async setIcons (
    entities: Map<string, Icon | null>,
    timestamp: number = Date.now()
  ): Promise<void> {
    entities.forEach(async (value, key) =>
      await this.database.table<ValueEntity<Icon | null>>('icons').put({
        expired: timestamp + (this.timeout * 1000),
        id: key,
        value: value
      }));
  }

  async getMembers (
    keys: string[],
    expired?: boolean | undefined,
    timestamp: number = Date.now()
  ): Promise<Map<string, Member[]>> {
    return new Map(
      await Promise.all<[string, Member[]][]>(
        await this.database.table<ArrayEntity<Member>>('members')
          .filter((entity) => keys.indexOf(entity.id) >= 0)
          .filter((entity) => {
            switch (expired) {
              case true:
                return entity.expired < timestamp;
              case false:
                return entity.expired >= timestamp;
              default:
                return true;
            }
          })
          .toArray()
          .then((entities) => entities.map((entity) => ([
            entity.id,
            entity.values.sort((a, b) => compare(a.displayName, b.displayName))
          ])))
      )
    );
  }

  async setMembers (
    entities: Map<string, Member[]>,
    timestamp: number = Date.now()
  ): Promise<void> {
    entities.forEach(async (values, key) =>
      await this.database.table<ArrayEntity<Member>>('members').put({
        expired: timestamp + (this.timeout * 1000),
        id: key,
        values: values
      }));
  }

  async getTeams (
    keys: string[],
    expired?: boolean | undefined,
    timestamp: number = Date.now()
  ): Promise<Map<string, Team>> {
    return new Map(
      await Promise.all<[string, Team][]>(
        await this.database.table<ValueEntity<Team>>('teams')
          .filter((entity) => keys.indexOf(entity.id) >= 0)
          .filter((entity) => {
            switch (expired) {
              case true:
                return entity.expired < timestamp;
              case false:
                return entity.expired >= timestamp;
              default:
                return true;
            }
          })
          .toArray()
          .then((entities) => entities.map((entity) => ([ entity.id, entity.value ])))
      )
    );
  }

  async setTeams (
    entities: Map<string, Team>,
    timestamp: number = Date.now()
  ): Promise<void> {
    entities.forEach(async (value, key) =>
      await this.database.table<ValueEntity<Team>>('teams').put({
        expired: timestamp + (this.timeout * 1000),
        id: key,
        value: value
      }));
  }

}
