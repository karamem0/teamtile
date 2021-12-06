//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Contexts
import { useServiceContext } from '../contexts/service-context';
// Types
import { Drive } from '../types/entity';
import { ItemKey } from '../types/state';

export const useDrives = (): [
  (keys: ItemKey[]) => Promise<Map<ItemKey, Drive>>
] => {

  const { services } = useServiceContext();

  const getDrives = React.useCallback(async (keys: ItemKey[]) => {
    const cache = await services.cache.getDrives(keys);
    const graph = await services.graph
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
      .forEach(([ key, value ]) => services.cache.setDrive(key, value));
    return new Map<string, Drive>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }, [
    services
  ]);

  return [
    getDrives
  ];

};
