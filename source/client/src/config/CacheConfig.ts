//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import Dexie from 'dexie';

interface CacheConfig {
  database: Dexie,
  timeout: number
}

let config: CacheConfig;

export function getConfig(): CacheConfig {
  if (config == null) {
    config = {
      database: new Dexie('teamtile'),
      timeout: process.env.VITE_CACHE_TIMEOUT || 3600
    };
    config.database.version(8).stores({
      channels: '&id, expired',
      drives: '&id, expired',
      icons: '&id, expired',
      members: '&id, expired',
      pins: '&id',
      teams: '&id, expired'
    });
  }
  return config;
}
