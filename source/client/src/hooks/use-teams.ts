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

export const useTeams = (): [ (keys: string[]) => Promise<void> ] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const dispatchTeams = React.useCallback(async (keys: string[]) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      const payload = new Map<string, Team>();
      const locals = await service.local.getTeams(keys);
      const servers = await service.server.getTeams(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (key) => {
        const server = servers.get(key);
        if (server) {
          const value = {
            id: server.id,
            displayName: server.displayName ?? undefined,
            description: server.description ?? undefined,
            internalId: server.internalId ?? undefined,
            visibility: server.visibility as VisibilityType ?? undefined,
            webUrl: server.webUrl ?? undefined
          };
          payload.set(key, value);
          await service.local.putTeam(key, value);
        }
        const local = locals.get(key);
        if (local) {
          payload.set(key, local);
        }
      });
      dispatch(putTeams(payload));
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Object.prototype.toString.call(error);
      setError(message);
    }
  }, [
    setError,
    dispatch,
    service
  ]);

  return [
    dispatchTeams
  ];

};
