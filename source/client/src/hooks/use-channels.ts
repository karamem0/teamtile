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
import { Channel, MembershipType } from '../types/entity';
import { ItemKey } from '../types/state';

export const useChannels = (): [
  (keys: ItemKey[]) => Promise<Map<ItemKey, Channel[]>>
] => {

  const { services } = useServiceContext();

  const getChannels = React.useCallback(async (keys: ItemKey[]) => {
    const cache = await services.cache.getChannels(keys);
    const graph = await services.graph
      .getChannels(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map<[string, Channel[]]>(([ key, values ]) => ([
          key,
          values.map((value) => ({
            id: value.id,
            displayName: value.displayName ?? null,
            webUrl: value.webUrl ?? null,
            membershipType: value.membershipType as MembershipType ?? null
          }))
        ]))));
    Array.from(graph)
      .forEach(([ key, values ]) => services.cache.setChannels(key, values));
    return new Map<string, Channel[]>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }, [
    services
  ]);

  return [
    getChannels
  ];

};
