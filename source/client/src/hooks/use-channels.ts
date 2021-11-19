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
import { putChannels } from '../reducers/action';
// Types
import { Channel, MembershipType } from '../types/entity';
import { ItemKey } from '../types/reducer';

export const useChannels = (): [
  (keys: ItemKey[]) => Promise<Map<ItemKey, Channel[]> | undefined>,
  (values: Map<ItemKey, Channel[]>) => Promise<void>
] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const getChannels = React.useCallback(async (keys: ItemKey[]) => {
    if (!setError) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      const table = new Map<ItemKey, Channel[]>();
      const locals = await service.local.getChannels(keys);
      const servers = await service.server.getChannels(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ]));
      keys.forEach(async (id) => {
        const server = servers.get(id);
        if (server) {
          const values = server
            .map((value) => (
              value.id
                ? {
                    id: value.id,
                    displayName: value.displayName ?? null,
                    webUrl: value.webUrl ?? null,
                    membershipType: value.membershipType as MembershipType ?? null
                  }
                : undefined
            ))
            .filter((value): value is Exclude<typeof value, undefined> => Boolean(value));
          table.set(id, values);
          await service.local.putChannels(id, values);
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

  const dispatchChannels = React.useCallback(async (values: Map<ItemKey, Channel[]>) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    try {
      dispatch(putChannels(values));
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
    getChannels,
    dispatchChannels
  ];

};
