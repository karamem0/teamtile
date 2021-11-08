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

export const useChannels = (): [ (keys: string[]) => Promise<void> ] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const dispatchChannels = React.useCallback(async (keys: string[]) => {
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
      const payload = new Map<string, Channel[]>();
      const locals = await service.local.getChannels(keys);
      const servers = await service.server.getChannels(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ]));
      keys.forEach(async (id) => {
        const server = servers.get(id);
        if (server) {
          const values = server.map((value) => ({
            id: value.id,
            displayName: value.displayName ?? undefined,
            webUrl: value.webUrl ?? undefined,
            membershipType: value.membershipType as MembershipType ?? undefined
          }));
          payload.set(id, values);
          await service.local.putChannels(id, values);
        }
        const local = locals.get(id);
        if (local) {
          payload.set(id, local);
        }
      });
      dispatch(putChannels(payload));
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
    dispatchChannels
  ];

};
