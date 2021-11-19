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
import { useErrorContext } from '../contexts/error-context';
import { useReducerContext } from '../contexts/reducer-context';
import { useServiceContext } from '../contexts/service-context';
// Reducers
import { putTeams } from '../reducers/action';
// Types
import { Team, VisibilityType } from '../types/entity';

export const useTeams = (): [
  (keys: string[]) => Promise<Map<string, Team> | undefined>,
  (values: Map<string, Team>) => Promise<void>
] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const getTeams = React.useCallback(async (keys: string[]) => {
    if (!setError) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      const table = new Map<string, Team>();
      const locals = await service.local.getTeams(keys);
      const servers = await service.server.getTeams(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (key) => {
        const server = servers.get(key);
        if (server) {
          if (server.id) {
            const value = {
              id: server.id,
              displayName: server.displayName ?? null,
              description: server.description ?? null,
              internalId: server.internalId ?? null,
              visibility: server.visibility as VisibilityType ?? null,
              webUrl: server.webUrl ?? null
            };
            table.set(key, value);
            await service.local.putTeam(key, value);
          }
        }
        const local = locals.get(key);
        if (local) {
          table.set(key, local);
        }
      });
      return table;
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Object.prototype.toString.call(error);
      setError(message);
    }
  }, [
    setError,
    service
  ]);

  const dispatchTeams = React.useCallback(async (values: Map<string, Team>) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    try {
      dispatch(putTeams(values));
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Object.prototype.toString.call(error);
      setError(message);
    }
  }, [
    setError,
    dispatch
  ]);

  return [
    getTeams,
    dispatchTeams
  ];

};
