//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { getConfig } from '../../../config/CacheConfig';
import {
  ArrayEntity,
  Entity,
  ValueEntity
} from '../../../types/Dexie';
import {
  Channel,
  Drive,
  Icon,
  Member,
  Team
} from '../../../types/Entity';

export async function clearAll(): Promise<void> {
  const { database } = getConfig();
  await Promise.all([
    database.table('channels').clear(),
    database.table('drives').clear(),
    database.table('icons').clear(),
    database.table('members').clear(),
    database.table('teams').clear()
  ]);
}

export async function getChannels(id: string, expired?: boolean, timestamp = Date.now()): Promise<Channel[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Channel>>('channels')
    .get(id)
    .then((item) => {
      if (item == null) {
        return undefined;
      }
      switch (expired) {
        case true:
          if (item.expired < timestamp) {
            return item.values;
          }
          break;
        case false:
          if (item.expired >= timestamp) {
            return item.values;
          }
          break;
        default:
          return item.values;
      }
      return undefined;
    });
}

export async function setChannels(id: string, values: Channel[], timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ArrayEntity<Channel>>('channels').put({
    id,
    expired: timestamp + (timeout * 1000),
    values
  });
}

export async function getDrive(id: string, expired?: boolean, timestamp = Date.now()): Promise<Drive | undefined> {
  const { database } = getConfig();
  return await database.table<ValueEntity<Drive>>('drives')
    .get(id)
    .then((item) => {
      if (item == null) {
        return undefined;
      }
      switch (expired) {
        case true:
          if (item.expired < timestamp) {
            return item.value;
          }
          break;
        case false:
          if (item.expired >= timestamp) {
            return item.value;
          }
          break;
        default:
          return item.value;
      }
      return undefined;
    });
}

export async function setDrive(id: string, value: Drive, timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ValueEntity<Drive>>('drives').put({
    id,
    expired: timestamp + (timeout * 1000),
    value
  });
}

export async function getIcon(id: string, expired?: boolean, timestamp = Date.now()): Promise<Icon | undefined> {
  const { database } = getConfig();
  return await database.table<ValueEntity<Icon>>('icons')
    .get(id)
    .then((item) => {
      if (item == null) {
        return undefined;
      }
      switch (expired) {
        case true:
          if (item.expired < timestamp) {
            return item.value;
          }
          break;
        case false:
          if (item.expired >= timestamp) {
            return item.value;
          }
          break;
        default:
          return item.value;
      }
      return undefined;
    })
    .then((item) => item?.data?.startsWith('data:') ? item : undefined);
}

export async function setIcon(id: string, value: Icon, timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ValueEntity<Icon | undefined>>('icons').put({
    id,
    expired: timestamp + (timeout * 1000),
    value
  });
}

export async function getMembers(id: string, expired?: boolean, timestamp = Date.now()): Promise<Member[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Member>>('members')
    .get(id)
    .then((item) => {
      if (item == null) {
        return undefined;
      }
      switch (expired) {
        case true:
          if (item.expired < timestamp) {
            return item.values;
          }
          break;
        case false:
          if (item.expired >= timestamp) {
            return item.values;
          }
          break;
        default:
          return item.values;
      }
      return undefined;
    });
}

export async function setMembers(id: string, values: Member[], timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ArrayEntity<Member>>('members').put({
    id,
    expired: timestamp + (timeout * 1000),
    values
  });
}

export async function getPin(id: string): Promise<Entity | undefined> {
  const { database } = getConfig();
  return await database.table<Entity>('pins').get(id);
}

export async function setPin(id: string, value: boolean): Promise<void> {
  const { database } = getConfig();
  if (value) {
    await database.table<Entity>('pins').put({ id });
  } else {
    await database.table<Entity>('pins').delete(id);
  }
}

export async function getTeam(id: string, expired?: boolean, timestamp = Date.now()): Promise<Team | undefined> {
  const { database } = getConfig();
  return await database.table<ValueEntity<Team>>('teams')
    .get(id)
    .then((item) => {
      if (item == null) {
        return undefined;
      }
      switch (expired) {
        case true:
          if (item.expired < timestamp) {
            return item.value;
          }
          break;
        case false:
          if (item.expired >= timestamp) {
            return item.value;
          }
          break;
        default:
          return item.value;
      }
      return undefined;
    });
}

export async function setTeam(id: string, value: Team, timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ValueEntity<Team>>('teams').put({
    id,
    expired: timestamp + (timeout * 1000),
    value
  });
}
