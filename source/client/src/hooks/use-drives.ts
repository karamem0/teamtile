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
import { putDrives } from '../reducers/action';
// Types
import { Drive } from '../types/entity';
import { ItemKey } from '../types/reducer';

export const useDrives = (): [
  (keys: ItemKey[]) => Promise<Map<ItemKey, Drive> | undefined>,
  (values: Map<ItemKey, Drive>) => Promise<void>
] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const getDrives = React.useCallback(async (keys: ItemKey[]) => {
    if (!setError) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      const table = new Map<ItemKey, Drive>();
      const locals = await service.local.getDrives(keys);
      const servers = await service.server.getDrives(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (id) => {
        const server = servers.get(id);
        if (server) {
          if (server.id) {
            const value = {
              id: server.id,
              webUrl: server.webUrl ?? null
            };
            table.set(id, value);
            await service.local.putDrive(id, value);
          }
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

  const dispatchDrives = React.useCallback(async (values: Map<string, Drive>) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    try {
      dispatch(putDrives(values));
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
    getDrives,
    dispatchDrives
  ];

};
