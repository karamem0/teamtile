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
import { setKeys } from '../reducers/action';

export const useKeys = (): [ () => Promise<void> ] => {

  const { setError } = useErrorContext();
  const { dispatch } = useReducerContext();
  const { service } = useServiceContext();

  const dispatchKeys = React.useCallback(async () => {
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
      dispatch(setKeys(await service?.server.getKeys()));
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
    dispatchKeys
  ];

};
