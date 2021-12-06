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
import { Team, VisibilityType } from '../types/entity';

export const useTeams = (): [
  (keys: string[]) => Promise<Map<string, Team>>
] => {

  const { services } = useServiceContext();

  const getTeams = React.useCallback(async (keys: string[]) => {
    const cache = await services.cache.getTeams(keys);
    const graph = await services.graph
      .getTeams(keys.filter((key) => !cache.has(key)))
      .then((map) => new Map(Array.from(map)
        .map<[string, Team]>(([ key, value ]) => ([
          key,
          {
            id: value.id,
            displayName: value.displayName ?? null,
            description: value.description ?? null,
            internalId: value.internalId ?? null,
            visibility: value.visibility as VisibilityType ?? null,
            webUrl: value.webUrl ?? null
          }
        ]))));
    Array.from(graph)
      .forEach(([ key, value ]) => services.cache.setTeam(key, value));
    return new Map<string, Team>([
      ...Array.from(cache),
      ...Array.from(graph)
    ]);
  }, [
    services
  ]);

  return [
    getTeams
  ];

};
