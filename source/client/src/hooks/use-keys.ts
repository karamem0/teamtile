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
import { putKeys } from '../reducers/action';
// Types
import { ItemKey } from '../types/reducer';

export const useKeys = (): [
  () => Promise<ItemKey[] | undefined>,
  (keys: ItemKey[]) => Promise<void>
] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const getKeys = React.useCallback(async () => {
    if (!setError) {
      return;
    }
    if (!service) {
      return;
    }
    try {
      return await service.server.getKeys();
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

  const dispatchKeys = React.useCallback(async (keys: ItemKey[]) => {
    if (!setError) {
      return;
    }
    if (!dispatch) {
      return;
    }
    try {
      dispatch(putKeys(keys));
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
    getKeys,
    dispatchKeys
  ];

};
