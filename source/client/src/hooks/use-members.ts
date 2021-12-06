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
import { ItemKey } from '../types/state';
import { Member } from '../types/entity';

export const useMembers = (): [
  (keys: ItemKey[]) => Promise<Map<ItemKey, Member[]>>
] => {

  const { services } = useServiceContext();

  const getMembers = React.useCallback(async (keys: ItemKey[]) => {
    const cache = await services.cache.getMembers(keys);
    const graph = await services.graph
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
      .forEach(([ key, values ]) => services.cache.setMembers(key, values));
    return new Map<string, Member[]>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }, [
    services
  ]);

  return [
    getMembers
  ];

};
