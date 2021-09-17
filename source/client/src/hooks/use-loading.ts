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
import { useReducerContext } from '../contexts/reducer-context';
// Reducers
import { setLoading } from '../reducers/action';

export const useLoading = (): [ (loading: boolean) => void ] => {

  const { dispatch } = useReducerContext();

  const dispatchLoading = React.useCallback((loading: boolean) => {
    if (!dispatch) {
      return;
    }
    dispatch(setLoading(loading));
  }, [ dispatch ]);

  return [
    dispatchLoading
  ];

};
