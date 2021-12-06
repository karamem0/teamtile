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

export const useTeamIcons = (): [
  (keys: string[]) => Promise<Map<string, string | null>>
] => {

  const { services } = useServiceContext();

  const getTeamIcons = React.useCallback(async (keys: string[]) => {
    const cache = await services.cache.getIcons(keys);
    const graph = await services.graph
      .getTeamIcons(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map(([ key, value ]) => ([
          key,
          value
        ]))));
    Array.from(graph)
      .forEach(([ key, value ]) => services.cache.setIcon(key, value));
    return new Map<string, string | null>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }, [
    services
  ]);

  return [
    getTeamIcons
  ];

};
