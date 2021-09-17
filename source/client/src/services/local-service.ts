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
  id?: string,
  expired?: number,
  value?: T
}

interface ArrayEntity<T> {
  id?: string,
  expired?: number,
  values?: T[]
}

export class LocalService {

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

  async getTeams (keys: string[]): Promise<Map<string, Team | undefined>> {
    return new Map(
      await Promise.all(keys.map(async (id) => {
        const value = await this.database.table<ValueEntity<Team>>('teams')
          .where({ id: id })
          .filter((value) => Number(value.expired) > Date.now())
          .first();
        return [ id, value?.value ] as [ string, Team | undefined ];
      }))
    );
  }

  async putTeam (id: string, value: Team): Promise<void> {
    await this.database.table<ValueEntity<Team>>('teams').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      value: value
    });
  }

  async getChannels (keys: string[]): Promise<Map<string, Channel[] | undefined>> {
    return new Map(
      await Promise.all(keys.map(async (id) => {
        const value = await this.database.table<ArrayEntity<Channel>>('channels')
          .where({ id: id })
          .filter((value) => Number(value.expired) > Date.now())
          .first();
        return [
          id,
          value?.values?.sort((a, b) => compare(a.displayName, b.displayName))
        ] as [ string, Channel[] | undefined ];
      }))
    );
  }

  async putChannels (id: string, values: Channel[]): Promise<void> {
    await this.database.table<ArrayEntity<Channel>>('channels').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      values: values
    });
  }

  async getMembers (keys: string[]): Promise<Map<string, Member[] | undefined>> {
    return new Map(
      await Promise.all(keys.map(async (id) => {
        const value = await this.database.table<ArrayEntity<Member>>('members')
          .where({ id: id })
          .filter((value) => Number(value.expired) > Date.now())
          .first();
        return [
          id,
          value?.values?.sort((a, b) => compare(a.displayName, b.displayName))
        ] as [ string, Member[] | undefined ];
      }))
    );
  }

  async putMembers (id: string, values: Member[]): Promise<void> {
    await this.database.table<ArrayEntity<Member>>('members').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      values: values
    });
  }

  async getDrives (keys: string[]): Promise<Map<string, Drive | undefined>> {
    return new Map(
      await Promise.all(keys.map(async (id) => {
        const value = await this.database.table<ValueEntity<Drive>>('drives')
          .where({ id: id })
          .filter((value) => Number(value.expired) > Date.now())
          .first();
        return [ id, value?.value ] as [ string, Drive | undefined ];
      }))
    );
  }

  async putDrive (id: string, value: Drive): Promise<void> {
    await this.database.table<ValueEntity<Drive>>('drives').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      value: value
    });
  }

  async getIcons (keys: string[]): Promise<Map<string, string | undefined>> {
    return new Map(
      await Promise.all(keys.map(async (id) => {
        const value = await this.database.table<ValueEntity<string>>('icons')
          .where({ id: id })
          .filter((value) => Number(value.expired) > Date.now())
          .first();
        return [ id, value?.value ] as [ string, string | undefined ];
      }))
    );
  }

  async putIcon (id: string, value: string): Promise<void> {
    await this.database.table<ValueEntity<string>>('icons').put({
      id: id,
      expired: Date.now() + (3600 * 1000),
      value: value
    });
  }

}
