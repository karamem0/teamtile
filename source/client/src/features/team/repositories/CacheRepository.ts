//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  ArrayEntity,
  Entity,
  ValueEntity
} from '../../../types/Dexie';
import {
  Channel,
  Drive,
  Group,
  Icon,
  Member,
  Tag,
  Team
} from '../../../types/Entity';
import { getArray, getValue } from '../../../utils/Dexie';
import { getConfig } from '../../../config/CacheConfig';

export async function clearAll(): Promise<void> {
  const { database } = getConfig();
  await Promise.all([
    database.table('channels').clear(),
    database.table('drives').clear(),
    database.table('groups').clear(),
    database.table('icons').clear(),
    database.table('members').clear(),
    database.table('tags').clear(),
    database.table('tagmembers').clear(),
    database.table('teams').clear()
  ]);
}

export async function getChannels(id: string, expired?: boolean, timestamp?: number): Promise<Channel[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Channel>>('channels')
    .get(id)
    .then((item) => getArray(item, expired, timestamp));
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
    .then((item) => getValue(item, expired, timestamp));
}

export async function setDrive(id: string, value: Drive, timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ValueEntity<Drive>>('drives').put({
    id,
    expired: timestamp + (timeout * 1000),
    value
  });
}

export async function getGroup(id: string, expired?: boolean, timestamp = Date.now()): Promise<Group | undefined> {
  const { database } = getConfig();
  return await database.table<ValueEntity<Group>>('groups')
    .get(id)
    .then((item) => getValue(item, expired, timestamp));
}

export async function setGroup(id: string, value: Group, timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ValueEntity<Group>>('groups').put({
    id,
    expired: timestamp + (timeout * 1000),
    value
  });
}

export async function getIcon(id: string, expired?: boolean, timestamp = Date.now()): Promise<Icon | undefined> {
  const { database } = getConfig();
  return await database.table<ValueEntity<Icon>>('icons')
    .get(id)
    .then((item) => getValue(item, expired, timestamp))
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

export async function getMembers(id: string, expired?: boolean, timestamp?: number): Promise<Member[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Member>>('members')
    .get(id)
    .then((item) => getArray(item, expired, timestamp));
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

export async function getOwners(id: string, expired?: boolean, timestamp?: number): Promise<Member[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Member>>('owners')
    .get(id)
    .then((item) => getArray(item, expired, timestamp));
}

export async function setOwners(id: string, values: Member[], timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ArrayEntity<Member>>('owners').put({
    id,
    expired: timestamp + (timeout * 1000),
    values
  });
}

export async function getTags(id: string, expired?: boolean, timestamp = Date.now()): Promise<Tag[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Tag>>('tags')
    .get(id)
    .then((item) => getArray(item, expired, timestamp));
}

export async function setTags(id: string, values: Tag[], timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ArrayEntity<Tag>>('tags').put({
    id,
    expired: timestamp + (timeout * 1000),
    values
  });
}

export async function getTagMembers(id: string, expired?: boolean, timestamp = Date.now()): Promise<Member[] | undefined> {
  const { database } = getConfig();
  return await database.table<ArrayEntity<Member>>('tagmembers')
    .get(id)
    .then((item) => getArray(item, expired, timestamp));
}

export async function setTagMembers(id: string, values: Member[], timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ArrayEntity<Member>>('tagmembers').put({
    id,
    expired: timestamp + (timeout * 1000),
    values
  });
}

export async function getTeam(id: string, expired?: boolean, timestamp = Date.now()): Promise<Team | undefined> {
  const { database } = getConfig();
  return await database.table<ValueEntity<Team>>('teams')
    .get(id)
    .then((item) => getValue(item, expired, timestamp));
}

export async function setTeam(id: string, value: Team, timestamp = Date.now()): Promise<void> {
  const { database, timeout } = getConfig();
  await database.table<ValueEntity<Team>>('teams').put({
    id,
    expired: timestamp + (timeout * 1000),
    value
  });
}
