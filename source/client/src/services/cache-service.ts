//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Dexie
import Dexie from 'dexie';
// Types
import {
  Channel,
  Drive,
  Member,
  Team
} from '../types/entity';
// Utils
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

  constructor (
    database?: Dexie
  ) {
    this.database = database ?? new Dexie('teamtile');
    this.database.version(3).stores({
      teams: '&id, expired, value.id, value.displayName, value.description, value.internalId, value.visibility, value.webUrl',
      channels: '&id, expired, values.id, values.displayName, values.webUrl',
      members: '&id, expired, values.displayName, values.userId, values.email',
      drives: '&id, expired, value.id, value.webUrl',
      icons: '&id, expired, value'
    });
  }

  async getTeams (keys: string[]): Promise<Map<string, Team>> {
    return new Map(
      await Promise.all(
        await this.database.table<ValueEntity<Team>>('teams')
          .filter((value) => keys.indexOf(value.id) >= 0)
          .filter((value) => Number(value.expired) > Date.now())
          .toArray()
          .then<[string, Team][]>((values) => values.map((value) => ([
            value.id,
            value.value
          ])))
      )
    );
  }

  async setTeam (id: string, value: Team): Promise<void> {
    await this.database.table<ValueEntity<Team>>('teams').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      value: value
    });
  }

  async getChannels (keys: string[]): Promise<Map<string, Channel[]>> {
    return new Map(
      await Promise.all(
        await this.database.table<ArrayEntity<Channel>>('channels')
          .filter((value) => keys.indexOf(value.id) >= 0)
          .filter((value) => Number(value.expired) > Date.now())
          .toArray()
          .then<[string, Channel[]][]>((values) => values.map((value) => ([
            value.id,
            value.values.sort((a, b) => compare(a.displayName, b.displayName))
          ])))
      )
    );
  }

  async setChannels (id: string, values: Channel[]): Promise<void> {
    await this.database.table<ArrayEntity<Channel>>('channels').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      values: values
    });
  }

  async getMembers (keys: string[]): Promise<Map<string, Member[]>> {
    return new Map(
      await Promise.all(
        await this.database.table<ArrayEntity<Member>>('members')
          .filter((value) => keys.indexOf(value.id) >= 0)
          .filter((value) => Number(value.expired) > Date.now())
          .toArray()
          .then<[string, Member[]][]>((values) => values
            .map((value) => ([
              value.id,
              value.values.sort((a, b) => compare(a.displayName, b.displayName))
            ])))
      )
    );
  }

  async setMembers (id: string, values: Member[]): Promise<void> {
    await this.database.table<ArrayEntity<Member>>('members').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      values: values
    });
  }

  async getDrives (keys: string[]): Promise<Map<string, Drive>> {
    return new Map(
      await Promise.all(
        await this.database.table<ValueEntity<Drive>>('drives')
          .filter((value) => keys.indexOf(value.id) >= 0)
          .filter((value) => Number(value.expired) > Date.now())
          .toArray()
          .then<[string, Drive][]>((values) => values
            .map((value) => ([
              value.id,
              value.value
            ])))
      )
    );
  }

  async setDrive (id: string, value: Drive): Promise<void> {
    await this.database.table<ValueEntity<Drive>>('drives').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      value: value
    });
  }

  async getIcons (keys: string[]): Promise<Map<string, string | null>> {
    return new Map(
      await Promise.all(
        await this.database.table<ValueEntity<string | null>>('icons')
          .filter((value) => keys.indexOf(value.id) >= 0)
          .filter((value) => Number(value.expired) > Date.now())
          .toArray()
          .then<[string, string | null][]>((values) => values
            .map((value) => ([
              value.id,
              value.value
            ])))
      )
    );
  }

  async setIcon (id: string, value: string | null): Promise<void> {
    await this.database.table<ValueEntity<string | null>>('icons').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      value: value
    });
  }

}
