//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { ArrayEntity, ValueEntity } from '../types/Dexie';

export function getValue<T>(item?: ValueEntity<T>, expired?: boolean, timestamp: number = Date.now()): T | undefined {
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
}

export function getArray<T>(item?: ArrayEntity<T>, expired?: boolean, timestamp: number = Date.now()): T[] | undefined {
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
}
