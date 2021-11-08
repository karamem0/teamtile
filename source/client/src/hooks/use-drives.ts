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

export const useDrives = (): [ (keys: string[]) => Promise<void> ] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const dispatchDrives = React.useCallback(async (keys: string[]) => {
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
      const payload = new Map<string, Drive>();
      const locals = await service.local.getDrives(keys);
      const servers = await service.server.getDrives(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (id) => {
        const server = servers.get(id);
        if (server) {
          const value = {
            id: server.id,
            webUrl: server.webUrl ?? undefined
          };
          payload.set(id, value);
          await service.local.putDrive(id, value);
        }
        const local = locals.get(id);
        if (local) {
          payload.set(id, local);
        }
      });
      dispatch(putDrives(payload));
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
    dispatchDrives
  ];

};
