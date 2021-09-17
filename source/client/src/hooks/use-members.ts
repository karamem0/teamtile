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
import { setMembers } from '../reducers/action';
// Types
import { Member } from '../types/entity';

export const useMembers = (): [ (keys: string[]) => Promise<void> ] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const dispatchMembers = React.useCallback(async (keys: string[]) => {
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
      const payload = new Map<string, Member[]>();
      const locals = await service.local.getMembers(keys);
      const servers = await service.server.getMembers(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (id) => {
        const server = servers.get(id);
        if (server) {
          const values = server.map((value) => ({
            id: value.id,
            displayName: value.displayName ?? undefined,
            userId: value.userId ?? undefined,
            email: value.email ?? undefined
          }));
          payload.set(id, values);
          await service.local.putMembers(id, values);
        }
        const local = locals.get(id);
        if (local) {
          payload.set(id, local);
        }
      });
      dispatch(setMembers(payload));
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : Object.prototype.toString.call(error);
      console.error(message);
      setError(message);
    }
  }, [
    setError,
    dispatch,
    service
  ]);

  return [
    dispatchMembers
  ];

};
