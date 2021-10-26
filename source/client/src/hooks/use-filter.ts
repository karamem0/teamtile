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
import { setFilter } from '../reducers/action';

export const useFilter = (): [ (filter?: string) => void ] => {

  const { dispatch } = useReducerContext();

  const dispatchFilter = React.useCallback((filter?: string) => {
    if (!dispatch) {
      return;
    }
    dispatch(setFilter(filter));
  }, [ dispatch ]);

  return [
    dispatchFilter
  ];

};
