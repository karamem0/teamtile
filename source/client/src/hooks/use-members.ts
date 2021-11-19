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
import { putMembers } from '../reducers/action';
// Types
import { ItemKey } from '../types/reducer';
import { Member } from '../types/entity';

export const useMembers = (): [
  (keys: ItemKey[]) => Promise<Map<ItemKey, Member[]> | undefined>,
  (values: Map<ItemKey, Member[]>) => Promise<void>
] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const getMembers = React.useCallback(async (keys: ItemKey[]) => {
    if (!setError) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      const table = new Map<ItemKey, Member[]>();
      const locals = await service.local.getMembers(keys);
      const servers = await service.server.getMembers(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (id) => {
        const server = servers.get(id);
        if (server) {
          const values = server
            .map((value) => (
              value.id
                ? {
                    id: value.id,
                    displayName: value.displayName ?? null,
                    userId: value.userId ?? null,
                    email: value.email ?? null
                  }
                : undefined))
            .filter((value): value is Exclude<typeof value, undefined> => Boolean(value));
          table.set(id, values);
          await service.local.putMembers(id, values);
        }
        const local = locals.get(id);
        if (local) {
          table.set(id, local);
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

  const dispatchMembers = React.useCallback(async (values: Map<ItemKey, Member[]>) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    try {
      dispatch(putMembers(values));
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
    getMembers,
    dispatchMembers
  ];

};
