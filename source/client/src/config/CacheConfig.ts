//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import Dexie from 'dexie';
import env from '../env';

interface CacheConfig {
  database: Dexie,
  timeout: number
}

let config: CacheConfig;

export function getConfig(): CacheConfig {
  if (config == null) {
    config = {
      database: new Dexie('teamtile'),
      timeout: env.VITE_CACHE_TIMEOUT ?? 3600
    };
    config.database.version(9).stores({
      channels: '&id, expired',
      drives: '&id, expired',
      groups: '&id, expired',
      icons: '&id, expired',
      members: '&id, expired',
      pins: '&id',
      tags: '&id, expired',
      tagmembers: '&id, expired',
      teams: '&id, expired'
    });
  }
  return config;
}
