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
import { putTeamIcons } from '../reducers/action';

export const useTeamIcons = (): [
  (keys: string[]) => Promise<Map<string, string> | undefined>,
  (values: Map<string, string>) => Promise<void>
] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const getTeamIcons = React.useCallback(async (keys: string[]) => {
    if (!setError) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      const table = new Map<string, string>();
      const locals = await service.local.getIcons(keys);
      const servers = await service.server.getTeamIcons(
        Array
          .from(locals)
          .flatMap(([ key, value ]) => value ? [] : [ key ])
      );
      keys.forEach(async (key) => {
        const server = servers.get(key);
        if (server) {
          table.set(key, server);
          await service.local.putIcon(key, server);
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

  const dispatchTeamIcons = React.useCallback(async (values: Map<string, string>) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    try {
      dispatch(putTeamIcons(values));
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
    getTeamIcons,
    dispatchTeamIcons
  ];

};
